(function () {
  "use strict";

  const PROVIDERS = Object.freeze({
    gemini: Object.freeze({
      id: "gemini",
      label: "Gemini",
      company: "Google",
      keyStorage: "voicelearn.ai.gemini"
    }),
    groq: Object.freeze({
      id: "groq",
      label: "Groq",
      company: "Groq",
      keyStorage: "voicelearn.ai.groq"
    })
  });

  const ERROR_CODES_FOR_OFFER = Object.freeze([
    "QUOTA",
    "BUSY",
    "TIMEOUT",
    "BLOCKED",
    "EMPTY",
    "BAD_JSON",
    "HTTP",
    "KEY_REJECTED"
  ]);

  const FALLBACK_MODELS = Object.freeze({
    gemini: Object.freeze([
      "gemini-3.8-flash",
      "gemini-3.5-flash",
      "gemini-2.5-flash"
    ]),
    groq: Object.freeze([
      "openai/gpt-oss-120b",
      "llama-3.3-70b-versatile"
    ])
  });

  const GEMINI_BASE =
    "https://generativelanguage.googleapis.com/v1beta";

  const GROQ_BASE =
    "https://api.groq.com/openai/v1";

  const REQUEST_TIMEOUT = 60000;
  const MAX_MODEL_ATTEMPTS = 2;
  const MAX_CANDIDATES = 3;

  const REQUIREMENT_STATUSES = new Set([
    "addressed",
    "partial",
    "missing",
    "unclear"
  ]);

  const CLAIM_JUDGEMENTS = new Set([
    "supported",
    "defensible",
    "defensible_but_under_supported",
    "contradicted_by_case",
    "weak_causal_connection",
    "unsupported_assumption",
    "outside_question",
    "unclear"
  ]);

  const ERROR_MESSAGES = Object.freeze({
    NO_KEY:
      "Please add your own API key in Settings.",
    KEY_REJECTED:
      "The provider did not accept your API key.",
    QUOTA:
      "The provider has reached a usage limit.",
    BUSY:
      "The provider is busy at the moment.",
    TIMEOUT:
      "The request took too long and was stopped.",
    OFFLINE:
      "Your device appears to be offline.",
    BLOCKED:
      "Your browser could not connect to the provider.",
    EMPTY:
      "The provider did not return usable feedback.",
    BAD_JSON:
      "The provider returned feedback in a format that could not be checked.",
    PROMPT_MISSING:
      "The feedback instructions are not available in this version of the app.",
    HTTP:
      "The provider could not complete the request."
  });

  const modelCache = new Map();

  class S2Error extends Error {
    constructor(code, options = {}) {
      const safeCode = Object.prototype.hasOwnProperty.call(
        ERROR_MESSAGES,
        code
      ) ? code : "HTTP";

      const status = Number.isInteger(options.status)
        ? options.status
        : null;

      const provider = PROVIDERS[options.provider]
        ? options.provider
        : null;

      const model = typeof options.model === "string"
        ? options.model
        : "";

      let message = ERROR_MESSAGES[safeCode];

      if (safeCode === "HTTP") {
        if (status !== null) {
          message += " HTTP " + status + ".";
        }

        const detail = safeDetail(options.detail);

        if (detail) {
          message += " " + detail;
        }
      }

      super(message);

      this.name = "S2Error";
      this.code = safeCode;
      this.status = status;
      this.provider = provider;
      this.model = model;
    }
  }

  function getKey(id) {
    const provider = PROVIDERS[id];

    if (!provider) {
      return "";
    }

    try {
      return String(
        window.localStorage.getItem(provider.keyStorage) || ""
      ).trim();
    } catch (_) {
      return "";
    }
  }

  function hasKey(id) {
    return getKey(id).length > 0;
  }

  function keyFingerprint(key) {
    // Two independent 32-bit accumulators provide a short,
    // non-reversible cache identifier. The key is never cached.
    let a = 0x811c9dc5;
    let b = 0x9e3779b9;

    for (let i = 0; i < key.length; i++) {
      const c = key.charCodeAt(i);

      a = Math.imul(a ^ c, 0x01000193);
      b = Math.imul(b ^ c, 0x85ebca6b);
      b ^= b >>> 13;
    }

    return (
      (a >>> 0).toString(16).padStart(8, "0") +
      (b >>> 0).toString(16).padStart(8, "0")
    );
  }

  function currentFingerprint(id) {
    return keyFingerprint(getKey(id));
  }

  function clearChangedCache(id, fingerprint) {
    const cached = modelCache.get(id);

    if (cached && cached.fingerprint !== fingerprint) {
      modelCache.delete(id);
    }
  }

  function defaultFetch(url, options) {
    // Resolve window.fetch at call time, not when this module loads.
    return window.fetch(url, options);
  }

  function fetchFunction(fetchImpl) {
    return typeof fetchImpl === "function"
      ? fetchImpl
      : defaultFetch;
  }

  function isOffline() {
    try {
      return typeof navigator !== "undefined" &&
        navigator.onLine === false;
    } catch (_) {
      return false;
    }
  }

  function safeDetail(value) {
    if (typeof value !== "string") {
      return "";
    }

    let text = value;

    // Remove the current keys before any message can be displayed.
    for (const id of Object.keys(PROVIDERS)) {
      const key = getKey(id);

      if (key) {
        text = text.split(key).join("[removed]");
      }
    }

    // Remove common API-key formats and credential assignments.
    text = text
      .replace(/AIza[0-9A-Za-z_-]{15,}/g, "[removed]")
      .replace(/gsk_[0-9A-Za-z_-]+/gi, "[removed]")
      .replace(/sk-[0-9A-Za-z_-]{12,}/gi, "[removed]")
      .replace(
        /Bearer\s+[^\s,;"']+/gi,
        "Bearer [removed]"
      )
      .replace(
        /\b(api[_ -]?key|access[_ -]?token|authorization|secret)\s*[:=]\s*["']?[^\s,;"']+/gi,
        "$1: [removed]"
      )
      .replace(
        /(?:key|token|secret)\s+["'][^"']+["']/gi,
        "credential [removed]"
      )
      .replace(
        /\b[A-Za-z0-9_-]{48,}\b/g,
        "[removed]"
      )
      .replace(/[\r\n\t]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return text.slice(0, 160);
  }

  function normalizeError(error, provider, model, signal) {
    if (error instanceof S2Error) {
      return error;
    }

    if (
      signal &&
      signal.aborted &&
      signal.reason instanceof S2Error
    ) {
      return signal.reason;
    }

    if (
      error &&
      (error.name === "AbortError" ||
       error.name === "TimeoutError")
    ) {
      return new S2Error("TIMEOUT", {
        provider,
        model
      });
    }

    if (error instanceof TypeError ||
        (error && error.name === "TypeError")) {
      return new S2Error(
        isOffline() ? "OFFLINE" : "BLOCKED",
        { provider, model }
      );
    }

    return new S2Error("HTTP", {
      provider,
      model
    });
  }

  function ensureProvider(id) {
    if (!Object.prototype.hasOwnProperty.call(PROVIDERS, id)) {
      throw new S2Error("HTTP");
    }

    return PROVIDERS[id];
  }

  function requestHeaders(id, key, jsonBody) {
    const headers = {};

    if (jsonBody) {
      headers["Content-Type"] = "application/json";
    }

    if (id === "gemini") {
      headers["x-goog-api-key"] = key;
    } else {
      headers.Authorization = "Bearer " + key;
    }

    return headers;
  }

  async function readJson(response, provider, model) {
    try {
      return await response.json();
    } catch (_) {
      throw new S2Error("BAD_JSON", {
        provider,
        model
      });
    }
  }

  async function responseError(response, provider, model) {
    const status = Number(response.status) || 0;

    if (status === 401 || status === 403) {
      return new S2Error("KEY_REJECTED", {
        status,
        provider,
        model
      });
    }

    if (status === 429) {
      return new S2Error("QUOTA", {
        status,
        provider,
        model
      });
    }

    if (status === 503 || status >= 500) {
      return new S2Error("BUSY", {
        status,
        provider,
        model
      });
    }

    let detail = "";
    let keyInvalid = false;

    try {
      const body = await response.json();

      if (typeof body?.error?.message === "string") {
        detail = body.error.message;
      } else if (typeof body?.message === "string") {
        detail = body.message;
      }
      keyInvalid = status === 400 && (
        (Array.isArray(body?.error?.details) &&
          body.error.details.some(d => /API_KEY_(INVALID|EXPIRED)/.test(String(d?.reason || "")))) ||
        /api key (not valid|expired|invalid)/i.test(detail));
    } catch (_) {
      // A provider may return an empty or non-JSON error body.
    }

    if (keyInvalid) {
      return new S2Error("KEY_REJECTED", { status, provider, model });
    }

    return new S2Error("HTTP", {
      status,
      provider,
      model,
      detail
    });
  }

  async function checkedFetch(
    url,
    options,
    provider,
    model,
    fetchImpl
  ) {
    let response;

    try {
      response = await fetchFunction(fetchImpl)(url, options);
    } catch (error) {
      throw normalizeError(
        error,
        provider,
        model,
        options.signal
      );
    }

    if (
      !response ||
      typeof response.ok !== "boolean" ||
      typeof response.status !== "number"
    ) {
      throw new S2Error("HTTP", {
        provider,
        model
      });
    }

    return response;
  }

  function uniqueIds(ids) {
    if (!Array.isArray(ids)) {
      return [];
    }

    const result = [];
    const seen = new Set();

    for (const value of ids) {
      if (typeof value !== "string") {
        continue;
      }

      const id = value.trim();

      if (!id || seen.has(id)) {
        continue;
      }

      seen.add(id);
      result.push(id);
    }

    return result;
  }

  function pickModels(id, ids) {
    ensureProvider(id);

    const available = uniqueIds(ids);

    if (id === "gemini") {
      const excluded =
        /lite|image|live|tts|audio|embedding|thinking-exp|vision/i;

      const candidates = [];

      for (const originalId of available) {
        const name = originalId.replace(/^models\//, "");

        if (excluded.test(name)) {
          continue;
        }

        const match = name.match(
          /^gemini-(\d+(?:\.\d+)?)-flash(?:-(preview|latest))?$/i
        );

        if (!match) {
          continue;
        }

        // dotted compare: 3.10 is newer than 3.9
        const version = match[1].split(".").reduce((acc, part, i) => acc + Number(part) / Math.pow(1000, i), 0);

        if (!Number.isFinite(version)) {
          continue;
        }

        const suffix = (match[2] || "").toLowerCase();

        const stability =
          suffix === "" ? 0 :
          suffix === "latest" ? 1 : 2;

        candidates.push({
          id: name,
          version,
          stability
        });
      }

      candidates.sort((a, b) => {
        if (b.version !== a.version) {
          return b.version - a.version;
        }

        if (a.stability !== b.stability) {
          return a.stability - b.stability;
        }

        return a.id.localeCompare(b.id);
      });

      return uniqueIds(
        candidates.map(item => item.id)
      ).slice(0, MAX_CANDIDATES);
    }

    const preferred = [
      "openai/gpt-oss-120b",
      "llama-3.3-70b-versatile",
      "openai/gpt-oss-20b"
    ];

    const availableSet = new Set(available);
    const result = [];

    for (const name of preferred) {
      if (availableSet.has(name)) {
        result.push(name);
      }
    }

    const otherLargeLlamas = available
      .filter(name =>
        !result.includes(name) &&
        /llama/i.test(name) &&
        /70b/i.test(name)
      )
      .sort((a, b) => a.localeCompare(b));

    return result
      .concat(otherLargeLlamas)
      .slice(0, MAX_CANDIDATES);
  }

  async function listModels(id, opts = {}) {
    ensureProvider(id);

    const key = getKey(id);

    if (!key) {
      throw new S2Error("NO_KEY", {
        provider: id
      });
    }

    const fingerprint = keyFingerprint(key);
    clearChangedCache(id, fingerprint);

    const fetchImpl = fetchFunction(opts.fetchImpl);
    const signal = opts.signal;

    if (id === "groq") {
      const response = await checkedFetch(
        GROQ_BASE + "/models",
        {
          method: "GET",
          headers: requestHeaders(id, key, false),
          signal
        },
        id,
        "",
        fetchImpl
      );

      if (!response.ok) {
        throw await responseError(response, id, "");
      }

      const data = await readJson(response, id, "");

      return uniqueIds(
        Array.isArray(data?.data)
          ? data.data.map(item => item?.id)
          : []
      );
    }

    const ids = [];
    const seenTokens = new Set();

    let pageToken = "";

    do {
      const query = new URLSearchParams();
      query.set("pageSize", "1000");

      if (pageToken) {
        query.set("pageToken", pageToken);
      }

      const response = await checkedFetch(
        GEMINI_BASE + "/models?" + query.toString(),
        {
          method: "GET",
          headers: requestHeaders(id, key, false),
          signal
        },
        id,
        "",
        fetchImpl
      );

      if (!response.ok) {
        throw await responseError(response, id, "");
      }

      const data = await readJson(response, id, "");

      if (Array.isArray(data?.models)) {
        for (const model of data.models) {
          if (
            typeof model?.name === "string" &&
            Array.isArray(model.supportedGenerationMethods) &&
            model.supportedGenerationMethods.includes(
              "generateContent"
            )
          ) {
            ids.push(model.name.replace(/^models\//, ""));
          }
        }
      }

      const next = typeof data?.nextPageToken === "string"
        ? data.nextPageToken
        : "";

      if (!next || seenTokens.has(next)) {
        break;
      }

      seenTokens.add(next);
      pageToken = next;
    } while (true);

    return uniqueIds(ids);
  }

  async function discoverModels(id, opts, fingerprint) {
    clearChangedCache(id, fingerprint);

    const cached = modelCache.get(id);

    if (
      cached &&
      cached.fingerprint === fingerprint &&
      cached.models.length
    ) {
      return cached.models.slice();
    }

    let models = [];

    try {
      const listed = await listModels(id, opts);
      models = pickModels(id, listed);
    } catch (error) {
      const normalized = normalizeError(error, id, "", opts.signal);

      // Invalid credentials, cancellation, and timeout must not
      // be disguised as an ordinary discovery failure.
      if (
        normalized.code === "KEY_REJECTED" ||
        normalized.code === "NO_KEY" ||
        normalized.code === "TIMEOUT"
      ) {
        throw normalized;
      }

      if (opts.signal?.aborted) {
        throw normalized;
      }

      models = [];
    }

    const fromListing = models.length > 0;
    if (!fromListing) {
      models = FALLBACK_MODELS[id].slice();
    }

    // Cache only listed models, never the fallback, and never for an old key.
    if (fromListing && currentFingerprint(id) === fingerprint) {
      modelCache.set(id, {
        fingerprint,
        models: models.slice()
      });
    }

    return models;
  }

  function parseModelJson(text) {
    const value = typeof text === "string"
      ? text.trim()
      : "";

    if (!value) {
      throw new S2Error("BAD_JSON");
    }

    try {
      return JSON.parse(value);
    } catch (_) {
      // Some providers surround otherwise valid JSON with prose.
    }

    const fenced = value.match(
      /```(?:json)?\s*([\s\S]*?)```/i
    );

    if (fenced) {
      try {
        return JSON.parse(fenced[1].trim());
      } catch (_) {
        // Continue to the object-substring recovery.
      }
    }

    const start = value.indexOf("{");
    const end = value.lastIndexOf("}");

    if (start >= 0 && end > start) {
      try {
        return JSON.parse(value.slice(start, end + 1));
      } catch (_) {
        // The recovered substring is not valid JSON.
      }
    }

    throw new S2Error("BAD_JSON");
  }

  function clampText(value, max) {
    if (typeof value !== "string") {
      return "";
    }

    const text = value.trim();

    if (text.length <= max) {
      return text;
    }

    return text.slice(0, Math.max(0, max - 1)).trimEnd() + "…";
  }

  function verifyQuote(value, answer) {
    if (typeof value !== "string") {
      return "";
    }

    const quote = value.trim();
    const source = typeof answer === "string" ? answer : "";

    if (!quote || !source.includes(quote)) {
      return "";
    }

    return quote;
  }

  function validateReview(raw, payload) {
    if (
      !raw ||
      typeof raw !== "object" ||
      Array.isArray(raw)
    ) {
      throw new S2Error("BAD_JSON");
    }

    const hasReq = Array.isArray(raw.requirements) && raw.requirements.length > 0;
    const hasNext = typeof raw.nextStep === "string" && raw.nextStep.trim() !== "";
    if (!hasReq && !hasNext) {
      throw new S2Error("BAD_JSON");
    }

    const expectedRequirements =
      Array.isArray(payload?.requirements)
        ? payload.requirements
        : [];

    const suppliedEvidence =
      Array.isArray(payload?.evidence)
        ? payload.evidence
        : [];

    const answer =
      typeof payload?.answer === "string"
        ? payload.answer
        : "";

    const allowedRequirements = new Map();

    for (const item of expectedRequirements) {
      if (
        item &&
        typeof item.id === "string" &&
        !allowedRequirements.has(item.id)
      ) {
        allowedRequirements.set(
          item.id,
          typeof item.text === "string" ? item.text : ""
        );
      }
    }

    const allowedEvidence = new Map();

    for (const item of suppliedEvidence) {
      if (
        item &&
        typeof item.id === "string" &&
        !allowedEvidence.has(item.id)
      ) {
        allowedEvidence.set(
          item.id,
          typeof item.text === "string" ? item.text : ""
        );
      }
    }

    const position = {
      summary: clampText(raw.position?.summary, 300),
      studentQuote: verifyQuote(
        raw.position?.studentQuote,
        answer
      )
    };

    const returnedRequirements = new Map();

    if (Array.isArray(raw.requirements)) {
      for (const item of raw.requirements) {
        if (
          !item ||
          !allowedRequirements.has(item.id) ||
          returnedRequirements.has(item.id)
        ) {
          continue;
        }

        if (!REQUIREMENT_STATUSES.has(item.status)) {
          continue;
        }

        returnedRequirements.set(item.id, {
          id: item.id,
          text: allowedRequirements.get(item.id),
          status: item.status,
          studentQuote: verifyQuote(
            item.studentQuote,
            answer
          ),
          comment: clampText(item.comment, 420)
        });
      }
    }

    const requirements = [];

    for (const [id, text] of allowedRequirements) {
      if (returnedRequirements.has(id)) {
        requirements.push(returnedRequirements.get(id));
      } else {
        requirements.push({
          id,
          text,
          status: "unclear",
          studentQuote: "",
          comment:
            "The AI did not return a comment for this part of the question."
        });
      }
    }

    const claims = [];

    if (Array.isArray(raw.claims)) {
      for (const item of raw.claims) {
        if (claims.length >= 6) {
          break;
        }

        if (
          !item ||
          !CLAIM_JUDGEMENTS.has(item.judgement)
        ) {
          continue;
        }

        const evidence = [];
        const seenEvidence = new Set();

        // Accept both the older evidenceIds format and the
        // newer evidence array, but rebuild every evidence item
        // from the trusted case payload.
        const evidenceInput = Array.isArray(item.evidence)
          ? item.evidence
          : Array.isArray(item.evidenceIds)
            ? item.evidenceIds
            : [];

        for (const entry of evidenceInput) {
          const evidenceId =
            typeof entry === "string"
              ? entry
              : entry && typeof entry.id === "string"
                ? entry.id
                : "";

          if (
            !allowedEvidence.has(evidenceId) ||
            seenEvidence.has(evidenceId)
          ) {
            continue;
          }

          seenEvidence.add(evidenceId);

          evidence.push({
            id: evidenceId,
            text: allowedEvidence.get(evidenceId)
          });
        }

        const claim = {
          studentQuote: verifyQuote(
            item.studentQuote,
            answer
          ),
          judgement: item.judgement,
          evidence,
          explanation: clampText(item.explanation, 520)
        };

        if (claim.studentQuote || claim.explanation) {
          claims.push(claim);
        }
      }
    }

    function cleanList(value) {
      if (!Array.isArray(value)) {
        return [];
      }

      return value
        .filter(item => typeof item === "string")
        .map(item => clampText(item, 300))
        .filter(Boolean)
        .slice(0, 3);
    }

    return {
      position,
      requirements,
      claims,
      tradeoff: {
        identified: raw.tradeoff?.identified === true,
        comment: clampText(raw.tradeoff?.comment, 420)
      },
      alternativeView: {
        credible: raw.alternativeView?.credible === true,
        comment: clampText(
          raw.alternativeView?.comment,
          420
        )
      },
      strengths: cleanList(raw.strengths),
      gaps: cleanList(raw.gaps),
      nextStep: clampText(raw.nextStep, 420)
    };
  }

  function buildEvidence(caseData) {
    const evidence = [];

    const situation = Array.isArray(caseData?.situation)
      ? caseData.situation
      : [];

    situation.forEach((text, index) => {
      evidence.push({
        id: "S" + (index + 1),
        text: String(text ?? "")
      });
    });

    const exhibit = Array.isArray(caseData?.exhibit)
      ? caseData.exhibit
      : [];

    exhibit.slice(1).forEach((row, index) => {
      evidence.push({
        id: "E" + (index + 1),
        text: Array.isArray(row)
          ? row.map(cell => String(cell ?? "")).join(" | ")
          : String(row ?? "")
      });
    });

    return evidence;
  }

  function buildPayload(weekData, kind, qIndex, answer) {
    if (
      !weekData ||
      typeof weekData !== "object" ||
      (kind !== "class" && kind !== "forum")
    ) {
      throw new S2Error("HTTP");
    }

    const week = Number(weekData.week);

    if (!Number.isInteger(week) || week < 1) {
      throw new S2Error("HTTP");
    }

    let caseData;
    let question;
    let questionId;
    let contract;
    let teachingPoints;

    if (kind === "class") {
      caseData = weekData.classCase;

      const questions = Array.isArray(caseData?.questions)
        ? caseData.questions
        : [];

      const index = Number(qIndex);

      if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= questions.length
      ) {
        throw new S2Error("HTTP");
      }

      question = String(questions[index] ?? "");
      questionId = "W" + week + "-C" + (index + 1);

      contract = caseData.contracts?.[index] || {
        asks: [{
          text: question,
          kind: "prose",
          options: []
        }],
        contradictions: [],
        taskType: "multi_requirement"
      };

      teachingPoints =
        caseData.questionPoints?.[index]?.lookFor || [];
    } else {
      caseData = weekData.forumCase;

      const questions = Array.isArray(caseData?.questions)
        ? caseData.questions
        : [];

      question = questions
        .map((text, index) =>
          "Q" + (index + 1) + ". " + String(text ?? "")
        )
        .join("\n");

      questionId = "W" + week + "-FORUM";

      contract = caseData?.contract || {
        asks: questions.map(text => ({
          text: String(text ?? ""),
          kind: "prose",
          options: []
        })),
        contradictions: [],
        taskType: "forum_multi_question"
      };

      teachingPoints = caseData.lookFor || [];
    }

    const asks = Array.isArray(contract.asks)
      ? contract.asks
      : [];

    const points = Array.isArray(teachingPoints)
      ? teachingPoints
      : [];

    return {
      course: "OPER621 - Business Process Management",
      week,
      questionId,
      question,
      requirements: asks.map((ask, index) => ({
        id: "R" + (index + 1),
        text: String(ask?.text ?? "")
      })),
      evidence: buildEvidence(caseData),
      teachingPoints: points.map((point, index) => {
        const claim = String(point?.claim ?? "");
        const because = String(point?.because ?? "");

        return {
          id: "T" + (index + 1),
          text: because
            ? claim + ". " + because
            : claim
        };
      }),
      taskType: contract.taskType ||
        (kind === "forum"
          ? "forum_multi_question"
          : "multi_requirement"),
      answer: String(answer ?? "")
    };
  }

  function geminiResponseText(data) {
    const parts = data?.candidates?.[0]?.content?.parts;

    if (!Array.isArray(parts)) {
      return "";
    }

    return parts
      .filter(part => part && part.thought !== true)
      .map(part =>
        typeof part.text === "string" ? part.text : ""
      )
      .join("")
      .trim();
  }

  function groqResponseText(data) {
    const content = data?.choices?.[0]?.message?.content;

    return typeof content === "string"
      ? content.trim()
      : "";
  }

  function geminiBody(text, schema, includeSchema) {
    const generationConfig = {
      temperature: 0.2,
      maxOutputTokens: 8192,
      responseMimeType: "application/json"
    };

    if (includeSchema) {
      generationConfig.responseJsonSchema = schema;
    }

    return {
      contents: [{
        role: "user",
        parts: [{ text }]
      }],
      generationConfig
    };
  }

  function groqBody(model, text, schema, advanced) {
    const body = {
      model,
      messages: [{
        role: "user",
        content: text
      }],
      temperature: 0.2,
      max_completion_tokens: 4096,
      response_format: {
        type: "json_object"
      }
    };

    if (advanced && model.includes("gpt-oss")) {
      body.response_format = {
        type: "json_schema",
        json_schema: {
          name: "review",
          strict: false,
          schema
        }
      };

      body.reasoning_effort = "medium";
    }

    return body;
  }

  async function callGemini(
    model,
    key,
    text,
    schema,
    fetchImpl,
    signal
  ) {
    const url =
      GEMINI_BASE +
      "/models/" +
      encodeURIComponent(model) +
      ":generateContent";

    const headers = requestHeaders("gemini", key, true);

    for (let formatAttempt = 0; formatAttempt < 2; formatAttempt++) {
      const response = await checkedFetch(
        url,
        {
          method: "POST",
          headers,
          body: JSON.stringify(
            geminiBody(
              text,
              schema,
              formatAttempt === 0
            )
          ),
          signal
        },
        "gemini",
        model,
        fetchImpl
      );

      if (
        response.status === 400 &&
        formatAttempt === 0
      ) {
        continue;
      }

      if (!response.ok) {
        throw await responseError(
          response,
          "gemini",
          model
        );
      }

      const data = await readJson(
        response,
        "gemini",
        model
      );

      const result = geminiResponseText(data);

      if (!result) {
        throw new S2Error("EMPTY", {
          provider: "gemini",
          model
        });
      }

      return result;
    }

    throw new S2Error("HTTP", {
      provider: "gemini",
      model
    });
  }

  async function callGroq(
    model,
    key,
    text,
    schema,
    fetchImpl,
    signal
  ) {
    const url = GROQ_BASE + "/chat/completions";
    const headers = requestHeaders("groq", key, true);

    for (let formatAttempt = 0; formatAttempt < 2; formatAttempt++) {
      const response = await checkedFetch(
        url,
        {
          method: "POST",
          headers,
          body: JSON.stringify(
            groqBody(
              model,
              text,
              schema,
              formatAttempt === 0
            )
          ),
          signal
        },
        "groq",
        model,
        fetchImpl
      );

      if (
        response.status === 400 &&
        formatAttempt === 0
      ) {
        continue;
      }

      if (!response.ok) {
        throw await responseError(
          response,
          "groq",
          model
        );
      }

      const data = await readJson(
        response,
        "groq",
        model
      );

      const result = groqResponseText(data);

      if (!result) {
        throw new S2Error("EMPTY", {
          provider: "groq",
          model
        });
      }

      return result;
    }

    throw new S2Error("HTTP", {
      provider: "groq",
      model
    });
  }

  function shouldTryNextModel(error) {
    if (!(error instanceof S2Error)) {
      return false;
    }

    if (
      error.code === "QUOTA" ||
      error.code === "BUSY"
    ) {
      return true;
    }

    return (
      error.code === "HTTP" &&
      (
        error.status === 404 ||
        error.status === 429 ||
        error.status === 503 ||
        error.status >= 500
      )
    );
  }

  function createRequestScope(externalSignal) {
    const controller = new AbortController();

    let timedOut = false;
    let cancelled = false;

    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT);

    function externalAbort() {
      cancelled = true;
      controller.abort();
    }

    if (externalSignal) {
      if (externalSignal.aborted) {
        externalAbort();
      } else {
        externalSignal.addEventListener(
          "abort",
          externalAbort,
          { once: true }
        );
      }
    }

    return {
      signal: controller.signal,

      get timedOut() {
        return timedOut;
      },

      get cancelled() {
        return cancelled;
      },

      cleanup() {
        clearTimeout(timeout);

        if (externalSignal) {
          externalSignal.removeEventListener(
            "abort",
            externalAbort
          );
        }
      }
    };
  }

  async function review(id, payload, opts = {}) {
    const provider = ensureProvider(id);
    const key = getKey(id);

    if (!key) {
      throw new S2Error("NO_KEY", {
        provider: id
      });
    }

    const promptModule = window.S2_PROMPT;

    if (
      !promptModule ||
      typeof promptModule.render !== "function" ||
      !promptModule.schema ||
      typeof promptModule.schema !== "object"
    ) {
      throw new S2Error("PROMPT_MISSING", {
        provider: id
      });
    }

    const scope = createRequestScope(opts.signal);
    const fingerprint = keyFingerprint(key);
    const fetchImpl = fetchFunction(opts.fetchImpl);

    let activeModel = "";

    try {
      if (scope.signal.aborted) {
        throw new S2Error("TIMEOUT", {
          provider: id
        });
      }

      let text;

      try {
        text = promptModule.render(payload);
      } catch (_) {
        throw new S2Error("PROMPT_MISSING", {
          provider: id
        });
      }

      if (typeof text !== "string" || !text.trim()) {
        throw new S2Error("PROMPT_MISSING", {
          provider: id
        });
      }

      const schema = promptModule.schema;

      const models = await discoverModels(
        id,
        {
          fetchImpl,
          signal: scope.signal
        },
        fingerprint
      );

      if (!models.length) {
        throw new S2Error("EMPTY", {
          provider: id
        });
      }

      const candidates = models.slice(
        0,
        MAX_MODEL_ATTEMPTS
      );

      let lastError = null;

      for (let index = 0; index < candidates.length; index++) {
        activeModel = candidates[index];

        if (scope.signal.aborted) {
          throw new S2Error("TIMEOUT", {
            provider: id,
            model: activeModel
          });
        }

        try {
          const responseText = id === "gemini"
            ? await callGemini(
                activeModel,
                key,
                text,
                schema,
                fetchImpl,
                scope.signal
              )
            : await callGroq(
                activeModel,
                key,
                text,
                schema,
                fetchImpl,
                scope.signal
              );

          let parsed;

          try {
            parsed = parseModelJson(responseText);
          } catch (_) {
            throw new S2Error("BAD_JSON", {
              provider: id,
              model: activeModel
            });
          }

          let validated;

          try {
            validated = validateReview(parsed, payload);
          } catch (_) {
            throw new S2Error("BAD_JSON", {
              provider: id,
              model: activeModel
            });
          }

          return {
            review: validated,
            provider: id,
            label: provider.label,
            model: activeModel,
            at: Date.now()
          };
        } catch (error) {
          const normalized = normalizeError(
            error,
            id,
            activeModel,
            scope.signal
          );

          lastError = normalized;
          if (normalized.status === 404) { modelCache.delete(id); }

          if (
            index + 1 >= candidates.length ||
            !shouldTryNextModel(normalized)
          ) {
            throw normalized;
          }
        }
      }

      throw lastError || new S2Error("EMPTY", {
        provider: id,
        model: activeModel
      });
    } catch (error) {
      if (scope.timedOut || scope.cancelled) {
        throw new S2Error("TIMEOUT", {
          provider: id,
          model: activeModel
        });
      }

      throw normalizeError(
        error,
        id,
        activeModel,
        scope.signal
      );
    } finally {
      scope.cleanup();
    }
  }

  function friendlyError(error, providerId) {
    const id = PROVIDERS[providerId]
      ? providerId
      : PROVIDERS[error?.provider]
        ? error.provider
        : "gemini";

    const name = id === "gemini"
      ? "Gemini"
      : "Groq";

    const fullName = id === "gemini"
      ? "Google Gemini"
      : "Groq";

    const code = error instanceof S2Error
      ? error.code
      : typeof error?.code === "string"
        ? error.code
        : "HTTP";

    let message;

    switch (code) {
      case "NO_KEY":
        message =
          "Please add your " + name +
          " API key in Settings before asking for feedback.";
        break;

      case "KEY_REJECTED":
        message =
          name +
          " did not accept your key. Please check or replace it in Settings.";
        break;

      case "QUOTA":
        message =
          fullName +
          " has reached a usage limit for your key. Please try again later or check your provider account.";
        break;

      case "BUSY":
        message =
          fullName +
          " is busy right now. Please try again in a little while.";
        break;

      case "TIMEOUT":
        message =
          fullName +
          " took too long to reply, so the request was stopped. Please try again when you are ready.";
        break;

      case "OFFLINE":
        message =
          "Your device appears to be offline, so " +
          fullName +
          " could not be reached. Please reconnect to the internet and try again.";
        break;

      case "BLOCKED":
        message =
          "Your browser could not connect to " +
          fullName +
          ". Please check your internet connection or try another browser.";
        break;

      case "EMPTY":
        message =
          fullName +
          " replied without usable feedback. Please try again.";
        break;

      case "BAD_JSON":
        message =
          fullName +
          " replied, but the feedback could not be checked safely. Please try again.";
        break;

      case "PROMPT_MISSING":
        message =
          "The feedback instructions are missing from this version of VoiceLearn, so " +
          fullName +
          " could not review your essay.";
        break;

      case "HTTP": {
        const status = Number.isInteger(error?.status)
          ? error.status
          : null;

        message =
          fullName +
          " could not complete the request" +
          (status !== null ? " (HTTP " + status + ")" : "") +
          ". Please try again later.";

        break;
      }

      default:
        message =
          fullName +
          " could not complete the feedback request. Please try again.";
    }

    return (
      message +
      " Your essay and local check are safe on this device."
    );
  }

  window.S2Providers = Object.freeze({
    PROVIDERS,
    S2Error,
    ERROR_CODES_FOR_OFFER,

    getKey,
    hasKey,
    listModels,
    pickModels,
    review,
    parseModelJson,
    validateReview,
    buildPayload,
    friendlyError,

    __test: Object.freeze({
      pickModels,
      parseModelJson,
      validateReview
    })
  });
})();
