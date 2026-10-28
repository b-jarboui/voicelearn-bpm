// W06-bank-base
//
// OPER621 Week 6 — Process Architecture
// Question bank: Lesson l1
//
// Sections:
// W6O1a — Phase 2: The map that tells you where you are
// W6O1b — Architecture versus documentation and process models
// W6O1c — Core, supporting, and management processes
//
// Every item has one correct response and a full explanation.
//
// Types:
// mcq    — Four options, one correct
// tf     — True or false
// drop   — Fill blanks from fixed lists
// visual — Select the correct diagram
// order  — Arrange a sequence in the correct order
// match  — Match each item with its corresponding description
//
// Authoring convention:
// The correct option, blank choice, diagram, sequence, or
// matching relationship is always written FIRST.
// The player shuffles options at runtime.
//
// Visual questions use only functions defined in
// week1_diagrams.js:
// flow, lanes, hier, stairs, org, bars, route, cycle.
//
// After loading, each item is normalised to the Week 1 schema:
// id, clo, lo, sec, diff, type, q, o, ans, why, rem.
//
// This base file contains 33 questions.
// Later lesson items replace the //__MORE_ITEMS__ marker.
//
// ============================================================

(() => {
  "use strict";

  const D = window.DIAG, B = [];

  const add = (type, id, sec, diff, q, body, why) =>
    B.push(Object.assign(
      { id, sec, diff, type, q, why },
      body
    ));

  const M = (id, sec, d, q, o, why) =>
    add("mcq", id, sec, d, q, { o }, why);

  const TF = (id, sec, d, q, ans, why) =>
    add("tf", id, sec, d, q, { ans }, why);

  const DR = (id, sec, d, q, blanks, why) =>
    add("drop", id, sec, d, q, { blanks }, why);

  const V = (id, sec, d, q, opts, why) =>
    add(
      "visual",
      id,
      sec,
      d,
      q,
      {
        o: opts.map((x) => x[1]),
        svg: opts.map((x) => x[0])
      },
      why
    );

  const OR = (id, sec, d, q, items, why) =>
    add("order", id, sec, d, q, { items }, why);

  const MA = (id, sec, d, q, pairs, why) =>
    add("match", id, sec, d, q, { pairs }, why);


  // ==========================================================
  // W6O1a — PHASE 2: THE MAP THAT TELLS YOU WHERE YOU ARE
  //
  // 11 items
  // mcq:    3
  // tf:     2
  // drop:   2
  // visual: 2
  // order:  1
  // match:  1
  // ==========================================================

  M(
    "W6O1a-01",
    "W6O1a",
    1,
    "What is the main purpose of a process architecture?",
    [
      "To show the organisation's major processes, their relationships, and how they support strategy",
      "To describe every employee activity in operational detail",
      "To reproduce the organisation chart using process terminology",
      "To replace strategic planning with a collection of process diagrams"
    ],
    "A process architecture provides a structured view of the organisation's processes and their relationships. It connects process management with strategy, making priorities and dependencies easier to understand."
  );

  M(
    "W6O1a-02",
    "W6O1a",
    2,
    "Qasr has detailed procedures for reservations and reception but cannot explain how they fit together. What is missing?",
    [
      "An agreed process architecture showing the relationships between the processes",
      "A larger collection of departmental operating instructions",
      "A separate organisation chart for every hotel property",
      "A new reception system before the existing processes are examined"
    ],
    "Detailed procedures can explain individual activities without showing how processes connect. Qasr needs an architecture that places those descriptions within an agreed organisational structure."
  );

  M(
    "W6O1a-03",
    "W6O1a",
    3,
    "Qasr proposes redesigning reception before identifying its major processes. Which concern is most defensible?",
    [
      "The redesign may optimise one activity without considering strategic priorities or connected processes",
      "Reception cannot be improved until every employee task has been documented",
      "Process architecture requires Qasr to remove its departmental structure",
      "Every hotel must adopt identical procedures before improvement can begin"
    ],
    "Beginning detailed redesign without architecture can produce local improvements that overlook wider dependencies. Architecture helps Qasr understand where reception belongs and whether the proposed work supports strategic priorities."
  );

  TF(
    "W6O1a-04",
    "W6O1a",
    1,
    "Process Architecture is Phase Two of the BPM framework, following Organisation Strategy.",
    true,
    "This statement is true. Organisation Strategy establishes the direction, while Process Architecture identifies the major processes and relationships needed to support that direction."
  );

  TF(
    "W6O1a-05",
    "W6O1a",
    2,
    "An organisation has a useful process architecture whenever it stores detailed process diagrams in one repository.",
    false,
    "This statement is false. A repository stores documentation, but architecture also requires an agreed structure, meaningful relationships, consistent conventions, and appropriate ownership."
  );

  DR(
    "W6O1a-06",
    "W6O1a",
    1,
    "The BPM framework places Process Architecture after Organisation {1} and before the {2}.",
    [
      [
        "Strategy",
        "Implementation",
        "Measurement"
      ],
      [
        "Launch Pad",
        "Sustainable Performance",
        "Realise Value"
      ]
    ],
    "Organisation Strategy establishes the programme's direction. Process Architecture then develops the organisational map needed before the Launch Pad prepares a focused improvement initiative."
  );

  DR(
    "W6O1a-07",
    "W6O1a",
    2,
    "A process architecture connects processes to organisational {1} and makes their {2} visible.",
    [
      [
        "strategy",
        "job titles",
        "office locations"
      ],
      [
        "relationships",
        "employee salaries",
        "document lengths"
      ]
    ],
    "Architecture connects the process landscape to strategy and identifies relationships between processes. These connections help managers understand priorities and the consequences of proposed changes."
  );

  V(
    "W6O1a-08",
    "W6O1a",
    2,
    "Which diagram correctly locates Process Architecture within the BPM framework?",
    [
      [
        D.route([1]),
        "Process Architecture highlighted as the second phase"
      ],
      [
        D.route([0]),
        "Organisation Strategy highlighted as the opening phase"
      ],
      [
        D.route([2]),
        "Launch Pad highlighted as the third phase"
      ],
      [
        D.route([3]),
        "Understand highlighted as the fourth phase"
      ]
    ],
    "Process Architecture is the second phase, immediately after Organisation Strategy and before the Launch Pad. The correct diagram highlights the second position in the framework."
  );

  V(
    "W6O1a-09",
    "W6O1a",
    3,
    "Which diagram best illustrates an architecture that connects major processes rather than presenting isolated departmental activities?",
    [
      [
        D.flow([
          "Manage|reservations",
          "Deliver|guest arrival",
          "Provide|accommodation",
          "Complete|departure"
        ]),
        "Connected major guest-service processes"
      ],
      [
        D.flow([
          "~Reception",
          "~Revenue",
          "~Housekeeping",
          "~Finance"
        ]),
        "Four disconnected departmental labels"
      ],
      [
        D.flow([
          "Open|record",
          "Enter|number",
          "Click|confirm",
          "Close|screen"
        ]),
        "Detailed computer tasks within one activity"
      ],
      [
        D.org("silo"),
        "An organisation chart focused on departmental reporting"
      ]
    ],
    "The connected process landscape shows major flows and their relationships. Departmental labels and detailed tasks do not, by themselves, provide the wider architectural structure."
  );

  OR(
    "W6O1a-10",
    "W6O1a",
    2,
    "Put these BPM framework phases in their correct sequence.",
    [
      "Organisation Strategy",
      "Process Architecture",
      "Launch Pad",
      "Understand",
      "Innovate"
    ],
    "The framework begins by establishing strategic direction, developing process architecture, and preparing the Launch Pad. Understand and Innovate follow as the programme investigates and redesigns processes."
  );

  MA(
    "W6O1a-11",
    "W6O1a",
    2,
    "Match each architectural contribution to the management decision it supports.",
    [
      [
        "Strategic alignment",
        "Identify which processes support organisational priorities"
      ],
      [
        "Process relationships",
        "Recognise dependencies between connected processes"
      ],
      [
        "Process ownership",
        "Establish accountability for complete process outcomes"
      ],
      [
        "Architectural structure",
        "Locate individual processes within the wider organisation"
      ]
    ],
    "Strategic alignment connects processes with organisational objectives. Relationships reveal dependencies, ownership establishes accountability, and structure places individual processes within the wider landscape."
  );


  // ==========================================================
  // W6O1b — ARCHITECTURE VERSUS DOCUMENTATION AND MODELS
  //
  // 11 items
  // mcq:    3
  // tf:     2
  // drop:   2
  // visual: 2
  // order:  1
  // match:  1
  // ==========================================================

  M(
    "W6O1b-01",
    "W6O1b",
    1,
    "Which statement best distinguishes process architecture from a process model?",
    [
      "Architecture shows the wider process structure, while a model describes how a particular process works",
      "Architecture describes employee tasks, while a model establishes organisational strategy",
      "Architecture and process models are different names for exactly the same document",
      "Architecture replaces detailed process models once its diagrams have been approved"
    ],
    "Process architecture establishes the organisation's broader process structure and relationships. A process model describes the activities, decisions, and flow within a particular process."
  );

  M(
    "W6O1b-02",
    "W6O1b",
    2,
    "Two Qasr analysts use different names for equivalent processes. What should the architecture establish?",
    [
      "Agreed naming conventions and process boundaries",
      "A requirement that every analyst uses different terminology",
      "A rule that departmental names must replace process names",
      "A larger repository without changing the modelling rules"
    ],
    "Naming conventions make descriptions comparable, while agreed boundaries clarify which work each process includes. Without these rules, analysts may create conflicting descriptions of equivalent work."
  );

  M(
    "W6O1b-03",
    "W6O1b",
    3,
    "Qasr has several conflicting diagrams of guest arrival. Which action best establishes a dependable reference?",
    [
      "Verify current practice, resolve disagreements, and approve an authoritative version",
      "Select the longest diagram because it contains the most activities",
      "Treat every diagram as equally authoritative without investigating differences",
      "Combine all diagrams immediately and assume the resulting model is accurate"
    ],
    "An authoritative description must be supported by reliable evidence and recognised approval. Combining disputed models or selecting one by length does not establish factual accuracy."
  );

  TF(
    "W6O1b-04",
    "W6O1b",
    1,
    "A detailed process model can be useful even though it does not show the organisation's complete process architecture.",
    true,
    "This statement is true. A model helps people understand a particular process, while architecture provides the wider structure needed to understand its relationships with other processes."
  );

  TF(
    "W6O1b-05",
    "W6O1b",
    2,
    "The person who draws a process diagram automatically becomes accountable for the process it describes.",
    false,
    "This statement is false. Document authorship does not establish process ownership. An accountable process owner needs a recognised responsibility for the complete process and sufficient authority to coordinate decisions."
  );

  DR(
    "W6O1b-06",
    "W6O1b",
    1,
    "A process {1} describes how particular work happens, while process {2} organises processes within the wider organisation.",
    [
      [
        "model",
        "department",
        "budget"
      ],
      [
        "architecture",
        "automation",
        "recruitment"
      ]
    ],
    "A process model describes a particular flow of work. Process architecture establishes the wider structure in which that process belongs and shows how it relates to other processes."
  );

  DR(
    "W6O1b-07",
    "W6O1b",
    2,
    "An {1} version is officially recognised, while modelling {2} establish shared rules for describing processes.",
    [
      [
        "authoritative",
        "unverified",
        "obsolete"
      ],
      [
        "conventions",
        "departments",
        "budgets"
      ]
    ],
    "An authoritative version is the approved reference for a defined purpose. Modelling conventions establish consistent rules for naming, representing, and comparing process descriptions."
  );

  V(
    "W6O1b-08",
    "W6O1b",
    2,
    "Which diagram represents a broad process structure rather than the detailed activities of one process?",
    [
      [
        D.hier([
          ["Value chain", "Serve guests"],
          ["Process", "Manage arrival"],
          ["Sub-process", "Verify booking"],
          ["Activity", "Check rate"],
          ["Task", "Open record"]
        ], -1),
        "A hierarchy connecting broad organisational work with detailed activities"
      ],
      [
        D.flow([
          "Open|record",
          "Check|booking",
          "Enter|details",
          "Confirm|arrival"
        ]),
        "A sequence of activities within one arrival procedure"
      ],
      [
        D.lanes(
          ["Reception", "Revenue"],
          [
            [0, "Receive"],
            [1, "Verify"],
            [0, "Confirm"]
          ]
        ),
        "A detailed handoff between reception and revenue"
      ],
      [
        D.flow([
          "Open|portal",
          "Enter|code",
          "Click|save"
        ]),
        "Three computer tasks within one activity"
      ]
    ],
    "The hierarchy shows how broad organisational work contains processes, sub-processes, activities, and tasks. The other diagrams describe narrower operational sequences."
  );

  V(
    "W6O1b-09",
    "W6O1b",
    3,
    "Which diagram best illustrates a complete guest arrival process rather than one isolated reception activity?",
    [
      [
        D.flow([
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "+Guest|settled"
        ]),
        "A connected arrival flow ending with the guest settled"
      ],
      [
        D.flow([
          "Open|booking",
          "Read|reference",
          "Close|record"
        ]),
        "A narrow booking-record activity"
      ],
      [
        D.flow([
          "Print|key",
          "Hand|over key"
        ]),
        "Only the final key-handling activities"
      ],
      [
        D.flow([
          "Check|rate",
          "Call|revenue"
        ]),
        "Only a corporate rate verification activity"
      ]
    ],
    "A complete guest arrival model should represent the agreed flow through to its intended outcome. Narrow activities may belong within that process but do not describe the entire journey."
  );

  OR(
    "W6O1b-10",
    "W6O1b",
    2,
    "Arrange these steps for establishing a dependable process description in a sensible sequence.",
    [
      "Agree the process purpose and boundaries",
      "Examine evidence of current operational practice",
      "Resolve factual disagreements in the description",
      "Obtain approval from the accountable authority",
      "Maintain the authoritative description as work changes"
    ],
    "The team should establish a common scope before verifying the work and resolving disputes. Approval then establishes the authoritative reference, which must be maintained as operations change."
  );

  MA(
    "W6O1b-11",
    "W6O1b",
    2,
    "Match each process-documentation concept to its meaning.",
    [
      [
        "Process architecture",
        "The wider structure and relationships of organisational processes"
      ],
      [
        "Process model",
        "A description of activities and decisions within a particular process"
      ],
      [
        "Modelling convention",
        "An agreed rule for describing processes consistently"
      ],
      [
        "Authoritative version",
        "The officially recognised process description for a defined purpose"
      ]
    ],
    "Architecture provides the wider structure, while a model describes particular work. Conventions support consistency, and an authoritative version establishes which approved description should guide decisions."
  );


  // ==========================================================
  // W6O1c — CORE, SUPPORTING, AND MANAGEMENT PROCESSES
  //
  // 11 items
  // mcq:    3
  // tf:     2
  // drop:   2
  // visual: 2
  // order:  1
  // match:  1
  // ==========================================================

  M(
    "W6O1c-01",
    "W6O1c",
    1,
    "Which description best fits a core process?",
    [
      "A process that directly contributes to the value customers purchase from the organisation",
      "A process that always belongs to the largest department",
      "A process that only senior executives are permitted to perform",
      "A process that exists mainly to maintain internal administrative records"
    ],
    "Core processes deliver outcomes that customers recognise and value. Their strategic importance comes from their contribution to the organisation's offering rather than departmental size or status."
  );

  M(
    "W6O1c-02",
    "W6O1c",
    2,
    "Why would payroll normally be supporting at Qasr but core for a specialist payroll service provider?",
    [
      "Because process classification depends on organisational strategy and the value customers purchase",
      "Because payroll is always core whenever employees receive salaries",
      "Because supporting processes are unnecessary in hospitality organisations",
      "Because the number of employees determines whether a process is core"
    ],
    "Qasr's guests purchase accommodation rather than payroll services. Customers of a payroll provider purchase payroll delivery itself, making the same type of work strategically core in that organisation."
  );

  M(
    "W6O1c-03",
    "W6O1c",
    3,
    "Qasr wants to differentiate its guest experience while controlling routine administrative costs. Which approach best follows process classification?",
    [
      "Invest selectively in distinctive core processes and standardise suitable supporting processes",
      "Give every process an identical improvement budget regardless of strategic contribution",
      "Treat every supporting process as unimportant and stop monitoring its performance",
      "Invest only in management processes because executives make strategic decisions"
    ],
    "Core processes may justify distinctive investment when they influence customer choice. Supporting processes still require reliability, but appropriate standardisation can release resources for strategically important improvements."
  );

  TF(
    "W6O1c-04",
    "W6O1c",
    1,
    "Supporting processes can be essential to operations even when they do not normally differentiate the organisation's customer offering.",
    true,
    "This statement is true. Supporting processes provide necessary capabilities and resources. Their importance does not depend on whether customers choose the organisation because of them."
  );

  TF(
    "W6O1c-05",
    "W6O1c",
    2,
    "A process is classified as core whenever its department has a large budget or many employees.",
    false,
    "This statement is false. Core classification depends on customer value and organisational strategy. Departmental size, expenditure, or political influence does not determine whether a process is core."
  );

  DR(
    "W6O1c-06",
    "W6O1c",
    1,
    "Processes that directly create customer value are usually classified as {1}, while processes providing necessary internal capabilities are {2}.",
    [
      [
        "core",
        "management",
        "administrative"
      ],
      [
        "supporting",
        "strategic",
        "customer-facing"
      ]
    ],
    "Core processes deliver outcomes customers value, while supporting processes enable those outcomes. The classification helps managers choose appropriate improvement and investment approaches."
  );

  DR(
    "W6O1c-07",
    "W6O1c",
    2,
    "Strategic planning and performance governance are examples of {1} processes because they establish organisational {2}.",
    [
      [
        "management",
        "supporting",
        "core"
      ],
      [
        "direction",
        "reception schedules",
        "customer reservations"
      ]
    ],
    "Management processes guide and govern organisational work. Strategic planning establishes direction, while performance governance helps managers evaluate and coordinate results."
  );

  V(
    "W6O1c-08",
    "W6O1c",
    2,
    "Which diagram correctly classifies illustrative processes for Qasr Hospitality?",
    [
      [
        D.flow([
          "Core:|guest stay",
          "Support:|payroll",
          "Manage:|strategy"
        ]),
        "Guest stay is core, payroll is supporting, and strategic planning is management"
      ],
      [
        D.flow([
          "Core:|payroll",
          "Support:|strategy",
          "Manage:|guest stay"
        ]),
        "Payroll is core, strategy is supporting, and guest stay is management"
      ],
      [
        D.flow([
          "Core:|strategy",
          "Support:|guest stay",
          "Manage:|payroll"
        ]),
        "Strategy is core, guest stay is supporting, and payroll is management"
      ],
      [
        D.flow([
          "Core:|payroll",
          "Support:|guest stay",
          "Manage:|strategy"
        ]),
        "Payroll is core, guest stay is supporting, and strategy is management"
      ]
    ],
    "Delivering a guest stay is central to Qasr's customer offering. Payroll normally supports operations, while strategic planning is a management process that guides organisational direction."
  );

  V(
    "W6O1c-09",
    "W6O1c",
    3,
    "Which diagram best illustrates how strategy should guide process classification and investment decisions?",
    [
      [
        D.flow([
          "Business|strategy",
          "Classify|processes",
          "Choose|investment",
          "Deliver|value"
        ]),
        "Strategy informs classification, which guides investment toward customer value"
      ],
      [
        D.flow([
          "Department|size",
          "Classify|processes",
          "Choose|investment",
          "Deliver|value"
        ]),
        "Departmental size determines classification and investment"
      ],
      [
        D.flow([
          "Employee|preferences",
          "Classify|processes",
          "Choose|investment",
          "Deliver|value"
        ]),
        "Employee preferences determine which processes are strategically core"
      ],
      [
        D.flow([
          "Existing|budget",
          "Classify|processes",
          "Choose|investment",
          "Deliver|value"
        ]),
        "The existing departmental budget determines the strategic role of processes"
      ]
    ],
    "Process classification should follow organisational strategy and the value customers receive. That classification then helps managers determine where differentiation or standardisation is appropriate."
  );

  OR(
    "W6O1c-10",
    "W6O1c",
    2,
    "Put these management decisions in the logical order for using process classification.",
    [
      "Clarify the organisation's strategy and customer promise",
      "Identify the major processes delivering or enabling that promise",
      "Classify processes as core, supporting, or management",
      "Choose appropriate investment and standardisation approaches",
      "Review whether the decisions support the intended customer value"
    ],
    "Managers should begin with strategy because it determines what customers value. They can then identify and classify processes, make investment choices, and review whether those choices support the intended outcomes."
  );
  MA("W6O1c-11", "W6O1c", 2, "Match each process category or investment approach to its main role in the organisation.", [["Core process", "Directly delivers outcomes that customers value"], ["Supporting process", "Provides resources and capabilities needed for operations"], ["Management process", "Establishes direction and governs organisational performance"], ["Justified standardisation", "Reduces unnecessary differences while preserving required outcomes"]], "Core processes deliver customer value, supporting processes enable operations, and management processes provide direction and governance. Standardisation is an investment approach rather than a category, and it improves consistency when differences do not create meaningful value.");



  // ==========================================================
  // INSERT LATER LESSON QUESTIONS HERE
  // ==========================================================

  // W06-bank-l2

// ============================================================
// W6O2a — THREE LEVELS: KNOWING HOW FAR TO ZOOM IN
//
// 11 items
// mcq: 3 | tf: 2 | drop: 2 | visual: 2 | order: 1 | match: 1
// ============================================================

M(
  "W6O2a-01", "W6O2a", 1,
  "What does granularity mean when designing a process architecture?",
  [
    "The level of detail used to describe a process or its components",
    "The number of departments included in the organisation chart",
    "The financial value assigned to each process improvement project",
    "The number of employees responsible for maintaining process diagrams"
  ],
  "Granularity means the amount of detail represented in a process description. A useful architecture shows enough detail to support management decisions without becoming unnecessarily complicated."
);

M(
  "W6O2a-02", "W6O2a", 2,
  "Qasr's executives need an overview of how fourteen properties deliver guest services. Which modelling level is most appropriate?",
  [
    "A first-level architecture showing major processes and their relationships",
    "A task-level model showing every reception computer operation",
    "A separate diagram of each employee's daily responsibilities",
    "A detailed model of one hotel's corporate rate verification activity"
  ],
  "A first-level architecture helps executives understand major processes and their relationships. Detailed activities are useful for operational investigation but would obscure the broader organisational view."
);

M(
  "W6O2a-03", "W6O2a", 3,
  "One Qasr analyst maps the complete arrival journey, while another maps only reservation verification. What should they establish before comparing their diagrams?",
  [
    "Whether the diagrams describe equivalent process boundaries and levels of detail",
    "Which analyst has produced the diagram containing more activities",
    "Which department employs the greater number of people",
    "Whether both diagrams were created using the same software application"
  ],
  "The analysts are describing different amounts of work. Agreeing the process boundary and architectural level prevents them from mistaking differences in granularity for differences in actual operations."
);

TF(
  "W6O2a-04", "W6O2a", 1,
  "Decomposition divides a broader process into smaller components while preserving their relationship to the whole.",
  true,
  "This statement is true. Decomposition allows managers to examine more detailed work while maintaining its connection to the wider process architecture."
);

TF(
  "W6O2a-05", "W6O2a", 2,
  "The most useful first-level architecture is always the one containing the greatest number of individual employee tasks.",
  false,
  "This statement is false. Excessive detail can make a first-level architecture difficult to understand. The appropriate granularity depends on the management decision being supported."
);

DR(
  "W6O2a-06", "W6O2a", 1,
  "Dividing a broad process into smaller components is called {1}, while the amount of detail shown is called {2}.",
  [
    ["decomposition", "standardisation", "automation"],
    ["granularity", "ownership", "governance"]
  ],
  "Decomposition divides processes into smaller related components. Granularity describes the level of detail represented in those components."
);

DR(
  "W6O2a-07", "W6O2a", 2,
  "A strategic process map normally uses a {1} level of detail, while investigating a particular operational delay may require a {2} level.",
  [
    ["broader", "narrower", "task-only"],
    ["more detailed", "less informative", "department-only"]
  ],
  "Strategic architecture emphasises major processes and their relationships. Operational investigation may require greater detail to identify the activities, decisions, and handoffs contributing to a problem."
);

V(
  "W6O2a-08", "W6O2a", 2,
  "Which diagram shows the correct process hierarchy from broadest to most detailed?",
  [
    [
      D.hier([
        ["Value chain", "Serve guests"],
        ["Process", "Manage arrival"],
        ["Sub-process", "Verify booking"],
        ["Activity", "Check rate"],
        ["Task", "Open record"]
      ], -1),
      "Value chain, process, sub-process, activity, task"
    ],
    [
      D.hier([
        ["Task", "Open record"],
        ["Activity", "Check rate"],
        ["Process", "Manage arrival"],
        ["Value chain", "Serve guests"],
        ["Sub-process", "Verify booking"]
      ], -1),
      "Task, activity, process, value chain, sub-process"
    ],
    [
      D.hier([
        ["Process", "Manage arrival"],
        ["Task", "Open record"],
        ["Value chain", "Serve guests"],
        ["Activity", "Check rate"],
        ["Sub-process", "Verify booking"]
      ], -1),
      "Process, task, value chain, activity, sub-process"
    ],
    [
      D.hier([
        ["Activity", "Check rate"],
        ["Sub-process", "Verify booking"],
        ["Task", "Open record"],
        ["Process", "Manage arrival"],
        ["Value chain", "Serve guests"]
      ], -1),
      "Activity, sub-process, task, process, value chain"
    ]
  ],
  "The hierarchy moves from value chain to process, sub-process, activity, and task. Each successive level describes a smaller component of the wider organisational work."
);

V(
  "W6O2a-09", "W6O2a", 3,
  "Qasr wants to show how a detailed reservation check belongs within the wider guest-service architecture. Which diagram best represents that relationship?",
  [
    [
      D.hier([
        ["Value chain", "Serve guests"],
        ["Process", "Manage arrival"],
        ["Sub-process", "Verify booking"],
        ["Activity", "Check reservation"]
      ], -1),
      "A hierarchy linking reservation checking to guest arrival and the wider value chain"
    ],
    [
      D.flow([
        "Open|record",
        "Read|reference",
        "Confirm|booking"
      ]),
      "A detailed sequence showing only the reservation-checking activity"
    ],
    [
      D.org("silo"),
      "An organisation chart showing separate departmental reporting lines"
    ],
    [
      D.flow([
        "~Reception",
        "~Revenue",
        "~Housekeeping"
      ]),
      "Disconnected departmental labels without a process hierarchy"
    ]
  ],
  "The hierarchy places the detailed reservation check within a sub-process, a broader arrival process, and the value chain. This preserves the relationship between operational detail and organisational purpose."
);

OR(
  "W6O2a-10", "W6O2a", 2,
  "Arrange these Qasr examples from the broadest architectural level to the most detailed.",
  [
    "Serve the guest",
    "Manage guest arrival",
    "Verify the reservation",
    "Check the corporate rate",
    "Open the corporate account record"
  ],
  "Serving the guest represents the broad value chain. Managing arrival is a process, verifying the reservation is a sub-process, checking the rate is an activity, and opening the record is a task."
);

MA(
  "W6O2a-11", "W6O2a", 2,
  "Match each architectural level to the kind of decision it helps Qasr make.",
  [
    [
      "Value chain",
      "Understand the broad work delivering organisational value"
    ],
    [
      "Process",
      "Manage a recognisable end-to-end outcome"
    ],
    [
      "Sub-process",
      "Examine a manageable component of a broader process"
    ],
    [
      "Activity",
      "Investigate a particular piece of operational work"
    ],
    [
      "Task",
      "Understand one specific employee action"
    ]
  ],
  "The architectural hierarchy connects broad organisational value with progressively detailed work. Each level supports decisions requiring a different degree of operational detail."
);


// ============================================================
// W6O2b — PROCESS OWNERSHIP: A TITLE OR REAL AUTHORITY?
//
// 11 items
// mcq: 3 | tf: 2 | drop: 2 | visual: 2 | order: 1 | match: 1
// ============================================================

M(
  "W6O2b-01", "W6O2b", 1,
  "What is the main responsibility of an end-to-end process owner?",
  [
    "Being accountable for the performance and improvement of the complete process across functional boundaries",
    "Personally performing every activity included in the process",
    "Replacing every departmental manager whose employees contribute to the process",
    "Maintaining process diagrams without influencing operational decisions"
  ],
  "A process owner is accountable for the complete process outcome. Employees and functional managers retain their operational responsibilities, while the owner coordinates performance and improvement across departmental boundaries."
);

M(
  "W6O2b-02", "W6O2b", 2,
  "Qasr appoints a guest arrival process owner who cannot influence reservations or housekeeping. What is the principal weakness?",
  [
    "The owner lacks the authority needed to coordinate improvements across the complete process",
    "The owner should personally replace every reservations and housekeeping employee",
    "The architecture should remove guest arrival from its process landscape",
    "The owner should measure reception performance without considering the guest's complete journey"
  ],
  "Accountability without sufficient authority creates ownership in name only. An effective process owner needs recognised decision rights and cooperation across the functions contributing to the process."
);

M(
  "W6O2b-03", "W6O2b", 3,
  "Two Qasr departments disagree about a change affecting guest arrival, and the process owner cannot settle it. What arrangement would help most?",
  [
    "An agreed escalation route to an authority able to resolve cross-functional disagreements",
    "A requirement that each department independently approves its preferred procedure",
    "A rule preventing the process owner from discussing departmental responsibilities",
    "A decision to stop measuring guest arrival until the departments agree voluntarily"
  ],
  "An escalation route identifies how unresolved disagreements reach someone with the authority to decide. It supports effective process governance when the owner cannot resolve a cross-functional issue directly."
);

TF(
  "W6O2b-04", "W6O2b", 1,
  "A process owner can be accountable for the complete guest arrival process while functional managers continue managing their employees.",
  true,
  "This statement is true. Process ownership complements functional management. The owner coordinates the end-to-end outcome, while departmental managers remain responsible for their people and resources."
);

TF(
  "W6O2b-05", "W6O2b", 2,
  "Naming a process owner guarantees effective accountability even when that person has no recognised decision rights.",
  false,
  "This statement is false. A title without sufficient authority does not enable an owner to resolve problems crossing departments. Effective ownership requires decision rights and appropriate governance support."
);

DR(
  "W6O2b-06", "W6O2b", 1,
  "A process owner is accountable for the {1} process, while functional managers remain responsible for their departmental {2}.",
  [
    ["end-to-end", "individual task", "organisation chart"],
    ["activities and resources", "corporate strategy alone", "external customers alone"]
  ],
  "End-to-end ownership focuses on the complete process outcome. Functional managers continue managing the activities, employees, and resources within their departments."
);

DR(
  "W6O2b-07", "W6O2b", 2,
  "Effective process ownership requires recognised {1}, while an escalation route helps resolve unresolved {2}.",
  [
    ["decision rights", "job titles", "office locations"],
    ["cross-functional disagreements", "employee birthdays", "document formatting preferences"]
  ],
  "Decision rights give a process owner practical authority to influence the process. Escalation arrangements help resolve disagreements that cannot be settled at the operational level."
);

V(
  "W6O2b-08", "W6O2b", 2,
  "Which diagram best represents a process owner considering the complete guest journey across departments?",
  [
    [
      D.org("process"),
      "A connected guest journey crossing departmental boundaries"
    ],
    [
      D.org("silo"),
      "Separate departments focusing on their individual reporting lines"
    ],
    [
      D.flow([
        "Open|record",
        "Enter|details",
        "Close|screen"
      ]),
      "A narrow computer activity within reception"
    ],
    [
      D.flow([
        "~Reception",
        "~Revenue",
        "~Housekeeping"
      ]),
      "Separate departmental labels without a connected process"
    ]
  ],
  "End-to-end process ownership concerns the complete flow across contributing departments. The process view shows that connected journey without removing the existing functional structure."
);

V(
  "W6O2b-09", "W6O2b", 3,
  "Which diagram shows the appropriate scope of ownership for a complete guest arrival process?",
  [
    [
      D.flow(
        [
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "Guest|settled"
        ],
        { bracket: [0, 3, "Owner"] }
      ),
      "One owner is accountable from guest arrival through the guest being settled"
    ],
    [
      D.flow(
        [
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "Guest|settled"
        ],
        { bracket: [1, 1, "Owner"] }
      ),
      "Ownership covers only reservation verification"
    ],
    [
      D.flow(
        [
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "Guest|settled"
        ],
        { bracket: [2, 2, "Owner"] }
      ),
      "Ownership covers only room confirmation"
    ],
    [
      D.flow(
        [
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "Guest|settled"
        ],
        { bracket: [3, 3, "Owner"] }
      ),
      "Ownership covers only the final guest-settling activity"
    ]
  ],
  "An end-to-end owner is accountable for the complete process rather than one isolated activity. The correct boundary covers the full arrival journey from its agreed trigger to its intended outcome."
);

OR(
  "W6O2b-10", "W6O2b", 2,
  "Arrange these actions in a sensible sequence for establishing effective process ownership at Qasr.",
  [
    "Define the complete process and its intended outcome",
    "Appoint an accountable process owner",
    "Agree decision rights with the contributing functions",
    "Establish an escalation route for unresolved disagreements",
    "Review end-to-end performance and coordinate improvements"
  ],
  "Qasr should define the process before assigning accountability. The owner then needs agreed authority and escalation arrangements to coordinate improvements and monitor the complete outcome."
);

MA(
  "W6O2b-11", "W6O2b", 2,
  "Match each governance concept to its practical meaning.",
  [
    [
      "Process owner",
      "Accountable for the complete process outcome"
    ],
    [
      "Functional manager",
      "Responsible for departmental people and resources"
    ],
    [
      "Decision rights",
      "Recognised authority to make or influence specified decisions"
    ],
    [
      "Escalation route",
      "A mechanism for resolving disagreements beyond operational authority"
    ],
    [
      "Process governance",
      "Arrangements for accountability, approval, and coordinated decisions"
    ]
  ],
  "Process ownership establishes end-to-end accountability, while functional managers retain departmental responsibilities. Decision rights, escalation routes, and governance arrangements make cross-functional coordination possible."
);


// ============================================================
// W6O2c — STRUCTURE FIRST, DETAIL SECOND
//
// 11 items
// mcq: 3 | tf: 2 | drop: 2 | visual: 2 | order: 1 | match: 1
// ============================================================

M(
  "W6O2c-01", "W6O2c", 1,
  "What is a modelling convention in process architecture?",
  [
    "An agreed rule for naming, representing, or describing processes consistently",
    "A requirement that every department uses a different process name",
    "A software licence needed to draw process diagrams",
    "A financial target assigned to an individual employee"
  ],
  "Modelling conventions establish shared rules for describing processes. They make independently produced models easier to compare, understand, and maintain."
);

M(
  "W6O2c-02", "W6O2c", 2,
  "Why is 'Manage guest arrival' generally a more useful process name than 'Reception administration'?",
  [
    "It describes the work and intended outcome rather than merely naming a department",
    "It guarantees that reception employees will no longer need departmental managers",
    "It proves that every Qasr property follows an identical arrival procedure",
    "It eliminates the need to define process boundaries and ownership"
  ],
  "Process-oriented names describe recognisable work rather than reproducing departmental labels. This helps managers identify processes that may cross several organisational functions."
);

M(
  "W6O2c-03", "W6O2c", 3,
  "Qasr finds several conflicting arrival models, some reflecting local conditions and others possibly outdated. What is the most defensible response?",
  [
    "Verify current practice, agree boundaries, and approve authoritative descriptions with justified local variants",
    "Declare the oldest model authoritative because it has existed for the longest time",
    "Combine all models immediately without investigating their factual disagreements",
    "Allow every property to maintain unlimited undocumented exceptions"
  ],
  "Qasr needs reliable evidence and agreed architectural rules before approving descriptions. Justified local variants can be retained, but they should be documented and linked to the common architecture."
);

TF(
  "W6O2c-04", "W6O2c", 1,
  "Agreeing process names and boundaries before extensive detailed modelling helps different analysts produce comparable descriptions.",
  true,
  "This statement is true. Shared conventions reduce inconsistent terminology and mismatched boundaries, making process descriptions easier to compare and maintain."
);

TF(
  "W6O2c-05", "W6O2c", 2,
  "An authoritative process description must require every Qasr property to perform every activity identically, regardless of local conditions.",
  false,
  "This statement is false. An authoritative architecture can recognise justified local variants. Consistency requires agreed standards and approved differences, not necessarily identical operational arrangements everywhere."
);

DR(
  "W6O2c-06", "W6O2c", 1,
  "A process {1} identifies where work begins and ends, while an authoritative {2} is the officially recognised description.",
  [
    ["boundary", "budget", "department"],
    ["version", "meeting", "job title"]
  ],
  "A process boundary establishes the scope of work being described. An authoritative version is the approved reference that managers and employees should use for its defined purpose."
);

DR(
  "W6O2c-07", "W6O2c", 2,
  "A justified local difference should be recorded as an approved {1}, while outdated descriptions should be subject to controlled {2}.",
  [
    ["variant", "department", "budget"],
    ["revision", "duplication", "concealment"]
  ],
  "An approved variant preserves a legitimate local difference within the common architecture. Controlled revision keeps authoritative descriptions accurate when operational arrangements change."
);

V(
  "W6O2c-08", "W6O2c", 2,
  "Which diagram shows a clearly defined guest arrival boundary beginning with arrival and ending when the guest is settled?",
  [
    [
      D.flow(
        [
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "Guest|settled"
        ],
        { bracket: [0, 3, "Boundary"] }
      ),
      "The boundary covers the complete arrival journey"
    ],
    [
      D.flow(
        [
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "Guest|settled"
        ],
        { bracket: [1, 2, "Boundary"] }
      ),
      "The boundary covers only booking and room verification"
    ],
    [
      D.flow(
        [
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "Guest|settled"
        ],
        { bracket: [0, 1, "Boundary"] }
      ),
      "The boundary ends after booking verification"
    ],
    [
      D.flow(
        [
          "Guest|arrives",
          "Booking|verified",
          "Room|confirmed",
          "Guest|settled"
        ],
        { bracket: [2, 3, "Boundary"] }
      ),
      "The boundary begins only when room confirmation starts"
    ]
  ],
  "The specified arrival process begins when the guest arrives and ends when the guest is settled. A narrower boundary would omit part of the outcome being examined."
);

V(
  "W6O2c-09", "W6O2c", 3,
  "Which diagram best represents a controlled process-description approval cycle rather than uncontrolled documentation?",
  [
    [
      D.flow([
        "Draft|description",
        "Verify|practice",
        "Approve|version",
        "Maintain|record"
      ]),
      "Draft, verify current practice, approve the version, and maintain the record"
    ],
    [
      D.flow([
        "Draft|description",
        "Publish|immediately",
        "Ignore|disputes",
        "Archive|randomly"
      ]),
      "Publish a draft without verification and ignore disagreements"
    ],
    [
      D.flow([
        "Copy|old model",
        "Rename|process",
        "Publish|duplicate",
        "Avoid|review"
      ]),
      "Copy an old model and publish it without reviewing current practice"
    ],
    [
      D.flow([
        "Collect|diagrams",
        "Count|documents",
        "Declare|success",
        "Stop|maintenance"
      ]),
      "Treat the number of stored diagrams as sufficient evidence of success"
    ]
  ],
  "A dependable process description requires verification against current practice, recognised approval, and ongoing maintenance. Merely collecting or copying diagrams does not establish their authority."
);

OR(
  "W6O2c-10", "W6O2c", 2,
  "Arrange these actions for establishing a controlled process repository at Qasr.",
  [
    "Agree the architectural structure and modelling conventions",
    "Define process boundaries and accountable ownership",
    "Document and verify current operational practice",
    "Approve authoritative descriptions and justified variants",
    "Maintain approved records as processes change"
  ],
  "Qasr should establish the structure and responsibilities before extensive documentation. Verification and approval then create dependable references, while maintenance keeps those references useful over time."
);

MA(
  "W6O2c-11", "W6O2c", 2,
  "Match each architectural control to the problem it is intended to prevent.",
  [
    [
      "Naming convention",
      "Equivalent processes described using inconsistent terminology"
    ],
    [
      "Agreed boundary",
      "Models describing different amounts of work without clarification"
    ],
    [
      "Authoritative version",
      "Uncertainty about which approved description should guide decisions"
    ],
    [
      "Registered variant",
      "Justified local differences becoming undocumented exceptions"
    ],
    [
      "Controlled revision",
      "Outdated descriptions remaining in use after approved changes"
    ]
  ],
  "Naming conventions improve consistency, and boundaries establish comparable scope. Authoritative versions clarify approved references, registered variants control local differences, and revisions keep documentation current."
);

// END-BLOCK
// W06-bank-l3

// ============================================================
// W6O3a — WHICH ONE IS THE PROCESS?
//
// 11 items
// mcq: 3 | tf: 2 | drop: 2 | visual: 2 | order: 1 | match: 1
// ============================================================

M(
  "W6O3a-01", "W6O3a", 1,
  "How many documented guest arrival models does Qasr have across its fourteen properties?",
  [
    "Eleven documented models",
    "Fourteen documented models",
    "Nine documented models",
    "Six documented models"
  ],
  "Exhibit 6 identifies eleven documented guest arrival models across Qasr's fourteen properties. The number of models does not establish that the descriptions are accurate, comparable, or authoritative."
);

M(
  "W6O3a-02", "W6O3a", 2,
  "What is the most important concern about the nine arrival models prepared by Qasr's programme analysts?",
  [
    "Six were disputed on factual grounds, raising concerns about their reliability",
    "All nine were verified and approved by accountable process owners",
    "They were produced independently by the property teams using current operational evidence",
    "They represented nine properties that had no guest arrival activities"
  ],
  "Six of the nine analyst-produced models were disputed on factual grounds. Because the analysts used a manual last revised four years ago, Qasr should verify current operational practice before relying on those descriptions."
);

M(
  "W6O3a-03", "W6O3a", 3,
  "Qasr's lead analyst proposes combining eleven arrival models into a twelfth. Which response is most defensible?",
  [
    "Verify disputed descriptions and agree process boundaries before deciding whether a combined model is appropriate",
    "Approve the twelfth model because combining more descriptions automatically improves accuracy",
    "Remove every local variation before examining the operational reasons behind it",
    "Select the oldest diagram because it is most likely to represent established practice"
  ],
  "Combining disputed descriptions does not resolve factual disagreements. Qasr should establish comparable boundaries, verify current practice, and determine which differences are justified before approving an authoritative model."
);

TF(
  "W6O3a-04", "W6O3a", 1,
  "The Marina and Corniche properties have two property-team arrival models, neither disputed on factual grounds.",
  true,
  "This statement is true. Exhibit 6 records two property-team models for Marina and Corniche, with zero factual disputes and a named front office manager."
);

TF(
  "W6O3a-05", "W6O3a", 2,
  "Qasr's repository already identifies an authoritative version for every documented guest arrival process.",
  false,
  "This statement is false. The repository lacks a field identifying authoritative versions. Consequently, managers cannot confidently determine which description should guide process redesign."
);

DR(
  "W6O3a-06", "W6O3a", 1,
  "Qasr has {1} documented arrival models, of which {2} were prepared by programme analysts.",
  [
    ["eleven", "fourteen", "six"],
    ["nine", "two", "three"]
  ],
  "Exhibit 6 identifies eleven documented arrival models. Nine were prepared by programme analysts, while two came from the Marina and Corniche property teams."
);

DR(
  "W6O3a-07", "W6O3a", 2,
  "The analysts used a manual last revised {1} years ago, and {2} of their nine models were disputed on factual grounds.",
  [
    ["four", "two", "six"],
    ["six", "three", "nine"]
  ],
  "The analyst-produced models were based on a manual last revised four years ago. Six of the nine models were disputed on factual grounds, making verification against current operational practice essential."
);

V(
  "W6O3a-08", "W6O3a", 2,
  "Which diagram correctly represents the origin of Qasr's eleven documented arrival models?",
  [
    [
      D.bars(
        ["Property teams", "Programme analysts"],
        [2, 9],
        11
      ),
      "Two property-team models and nine analyst-produced models"
    ],
    [
      D.bars(
        ["Property teams", "Programme analysts"],
        [9, 2],
        11
      ),
      "Nine property-team models and two analyst-produced models"
    ],
    [
      D.bars(
        ["Property teams", "Programme analysts"],
        [5, 6],
        11
      ),
      "Five property-team models and six analyst-produced models"
    ],
    [
      D.bars(
        ["Property teams", "Programme analysts"],
        [3, 8],
        11
      ),
      "Three property-team models and eight analyst-produced models"
    ]
  ],
  "Exhibit 6 identifies two models produced by property teams and nine produced by programme analysts. The correct diagram preserves this distinction and the total of eleven documented models."
);

V(
  "W6O3a-09", "W6O3a", 3,
  "Which diagram correctly shows the factual dispute pattern among Qasr's nine analyst-produced models?",
  [
    [
      D.bars(
        ["Disputed", "Not disputed"],
        [6, 3],
        9
      ),
      "Six disputed models and three models without recorded factual disputes"
    ],
    [
      D.bars(
        ["Disputed", "Not disputed"],
        [3, 6],
        9
      ),
      "Three disputed models and six models without recorded factual disputes"
    ],
    [
      D.bars(
        ["Disputed", "Not disputed"],
        [9, 0],
        9
      ),
      "All nine analyst models were disputed"
    ],
    [
      D.bars(
        ["Disputed", "Not disputed"],
        [0, 9],
        9
      ),
      "None of the analyst models was disputed"
    ]
  ],
  "Six of the nine analyst-produced models were disputed on factual grounds. The other three were not recorded as factually disputed, although that does not by itself establish that they were formally verified or approved."
);

OR(
  "W6O3a-10", "W6O3a", 2,
  "Arrange these actions in a defensible sequence for resolving Qasr's conflicting arrival documentation.",
  [
    "Agree the intended process boundaries and modelling level",
    "Examine existing descriptions against current operational evidence",
    "Investigate and resolve factual disagreements",
    "Identify justified local variations and accountable owners",
    "Approve and maintain authoritative process descriptions"
  ],
  "Qasr should establish comparable scope before verifying current practice. Resolving disputes and identifying justified variations provides the evidence needed to approve dependable descriptions under accountable ownership."
);

MA(
  "W6O3a-11", "W6O3a", 3,
  "Match each Qasr property group to its documented arrival-model evidence.",
  [
    [
      "Marina and Corniche",
      "Two property-team models with zero factual disputes"
    ],
    [
      "Old Town and Heritage",
      "Three analyst models with two factual disputes"
    ],
    [
      "Desert Ridge and Oasis",
      "Four analyst models with three factual disputes"
    ],
    [
      "Airport and City",
      "Two analyst models with one factual dispute"
    ],
    [
      "Remaining three properties",
      "No documented arrival models"
    ]
  ],
  "Exhibit 6 distinguishes the property groups by model origin and factual disputes. Marina and Corniche have two undisputed property-team models, while the other documented groups account for nine analyst models and six factual disputes."
);


// ============================================================
// W6O3b — ONE STANDARD OR FOURTEEN VARIANTS?
//
// 11 items
// mcq: 3 | tf: 2 | drop: 2 | visual: 2 | order: 1 | match: 1
// ============================================================

M(
  "W6O3b-01", "W6O3b", 1,
  "What is a justified local process variant?",
  [
    "An approved difference from a common process supported by genuine operational requirements",
    "Any procedure a local manager prefers, regardless of its consequences",
    "An undocumented exception that employees have followed for several years",
    "A completely separate architecture created whenever a department requests one"
  ],
  "A justified variant is a documented and approved difference supported by evidence of local requirements. It remains connected to the common architecture rather than becoming an uncontrolled exception."
);

M(
  "W6O3b-02", "W6O3b", 2,
  "Marina uses its revenue office for corporate rate verification, while Old Town uses reception. What should Qasr examine before standardising?",
  [
    "Whether both arrangements achieve the required control outcome and whether Old Town's physical constraints justify its variation",
    "Which department has the larger budget and should therefore control every hotel's procedure",
    "Whether Marina's procedure should automatically replace all other arrangements because Marina is the familiar case property",
    "Whether corporate rate verification should be removed everywhere to eliminate differences"
  ],
  "Marina and Old Town use different departmental arrangements for corporate rate verification. Old Town has no back office, so Qasr should investigate whether the difference is operationally justified while ensuring the required control outcome remains dependable."
);

M(
  "W6O3b-03", "W6O3b", 3,
  "Desert Ridge's documented arrival process omits corporate rate verification. What is the most defensible interpretation?",
  [
    "The omission requires investigation because the leisure-oriented customer mix may explain it, but the underlying requirement must be verified",
    "The omission proves that corporate rate verification is unnecessary throughout Qasr",
    "The omission proves that Desert Ridge employees are violating an approved group-wide procedure",
    "The omission means Desert Ridge should have an entirely separate process architecture"
  ],
  "Desert Ridge serves predominantly leisure guests, which may explain the absence of corporate rate verification. Qasr must nevertheless verify the applicable requirements before deciding whether the omission represents a justified variation."
);

TF(
  "W6O3b-04", "W6O3b", 1,
  "A common process architecture can preserve approved local variants without requiring every property to perform every activity identically.",
  true,
  "This statement is true. A common architecture establishes shared purpose, boundaries, and governance while allowing documented differences supported by genuine operational requirements."
);

TF(
  "W6O3b-05", "W6O3b", 2,
  "When two hotels document guest recognition differently, Qasr can immediately conclude that their underlying operational processes are different.",
  false,
  "This statement is false. Different descriptions may reflect inconsistent terminology, different levels of detail, or genuine operational variation. Qasr must establish comparable boundaries and verify actual practice before drawing conclusions."
);

DR(
  "W6O3b-06", "W6O3b", 1,
  "Process {1} establishes an agreed approach to comparable work, while an approved {2} records a justified local difference.",
  [
    ["standardisation", "fragmentation", "duplication"],
    ["variant", "department", "budget"]
  ],
  "Standardisation reduces unnecessary differences in comparable work. An approved variant preserves a legitimate local difference while maintaining its relationship to the common architecture."
);

DR(
  "W6O3b-07", "W6O3b", 2,
  "Before comparing guest recognition descriptions, Qasr should agree the process {1} and the level of {2}.",
  [
    ["boundaries", "salaries", "budgets"],
    ["granularity", "staff seniority", "financial expenditure"]
  ],
  "Process boundaries establish which work is included, while granularity identifies the amount of detail represented. Agreeing both allows Qasr to compare equivalent processes rather than mismatched descriptions."
);

V(
  "W6O3b-08", "W6O3b", 2,
  "Which diagram correctly represents the different responsibility for corporate rate verification at Marina and Old Town?",
  [
    [
      D.lanes(
        ["Revenue", "Reception"],
        [
          [0, "Marina|rate check"],
          [1, "Marina|arrival"],
          [1, "Old Town|rate check"],
          [1, "Old Town|arrival"]
        ]
      ),
      "Marina uses revenue for rate verification, while Old Town uses reception"
    ],
    [
      D.lanes(
        ["Revenue", "Reception"],
        [
          [1, "Marina|rate check"],
          [1, "Marina|arrival"],
          [0, "Old Town|rate check"],
          [1, "Old Town|arrival"]
        ]
      ),
      "Marina uses reception for rate verification, while Old Town uses revenue"
    ],
    [
      D.lanes(
        ["Revenue", "Reception"],
        [
          [0, "Marina|rate check"],
          [1, "Marina|arrival"],
          [0, "Old Town|rate check"],
          [1, "Old Town|arrival"]
        ]
      ),
      "Both properties use the revenue office for rate verification"
    ],
    [
      D.lanes(
        ["Revenue", "Reception"],
        [
          [1, "Marina|rate check"],
          [1, "Marina|arrival"],
          [1, "Old Town|rate check"],
          [1, "Old Town|arrival"]
        ]
      ),
      "Both properties use reception for rate verification"
    ]
  ],
  "Marina assigns corporate rate verification to the revenue office. Old Town assigns the same verification responsibility to the front-desk agent because the heritage property has no back office."
);

V(
  "W6O3b-09", "W6O3b", 3,
  "Which diagram best represents a controlled approach to evaluating local process variation?",
  [
    [
      D.flow([
        "Common|process",
        "Identify|local need",
        "Verify|evidence",
        "Approve|variant"
      ]),
      "Start with the common process, investigate local requirements, verify evidence, and approve justified differences"
    ],
    [
      D.flow([
        "Local|preference",
        "Create|exception",
        "Avoid|review",
        "Ignore|standard"
      ]),
      "Allow local preferences to create exceptions without review"
    ],
    [
      D.flow([
        "Common|process",
        "Require|identical work",
        "Ignore|constraints",
        "Reject|variants"
      ]),
      "Impose identical arrangements without examining local constraints"
    ],
    [
      D.flow([
        "Collect|models",
        "Count|differences",
        "Publish|all",
        "Avoid|ownership"
      ]),
      "Publish every difference without determining whether it is justified"
    ]
  ],
  "A controlled approach begins with the common process and evaluates local requirements using evidence. Legitimate differences can then be approved and registered rather than imposed or accepted automatically."
);

OR(
  "W6O3b-10", "W6O3b", 2,
  "Arrange these decisions for evaluating a proposed local variation at a Qasr property.",
  [
    "Identify the common process outcome and agreed boundary",
    "Describe the proposed local difference",
    "Examine operational evidence and the reason for the difference",
    "Determine whether the variation is justified",
    "Approve and register the variation through process governance"
  ],
  "The common outcome provides the basis for comparison. Qasr can then investigate the difference, assess its justification, and use governance arrangements to approve and maintain an appropriate variant."
);

MA(
  "W6O3b-11", "W6O3b", 3,
  "Match each Qasr observation to the architectural question it raises.",
  [
    [
      "Marina's revenue-office verification",
      "How does the shared control operate through a specialised department?"
    ],
    [
      "Old Town's front-desk verification",
      "Does the absence of a back office justify different responsibility?"
    ],
    [
      "Desert Ridge's omitted verification",
      "Does the leisure-oriented customer mix justify the missing step?"
    ],
    [
      "Different guest recognition descriptions",
      "Are the models describing equivalent work at the same level?"
    ],
    [
      "Undocumented local exceptions",
      "How should approved variations be recorded and governed?"
    ]
  ],
  "Qasr must distinguish differences in responsibility, customer requirements, modelling granularity, and governance. Each observation raises a different question that requires evidence before standardisation or variation can be justified."
);

// END-BLOCK
// W06-bank-l4

// ============================================================
// W6O3c — AN ARCHITECTURE THAT SURVIVES CHANGE
//
// 11 items
// mcq: 3 | tf: 2 | drop: 2 | visual: 2 | order: 1 | match: 1
// ============================================================

M(
  "W6O3c-01", "W6O3c", 1,
  "What is a process dependency in an organisation's architecture?",
  [
    "A relationship in which one process relies on information, resources, or outcomes from another",
    "A requirement that every process belongs to the same department",
    "A rule that processes must always be performed in identical ways",
    "A situation where a process can operate without exchanging information with others"
  ],
  "A dependency exists when one process relies on another process's information, resources, or outcomes. Recognising dependencies helps managers anticipate how changes may affect connected work."
);

M(
  "W6O3c-02", "W6O3c", 2,
  "Qasr plans to change its corporate rate verification rules. What should managers examine before approving the change?",
  [
    "How the change may affect reservations, reception, billing, and the complete guest experience",
    "Only whether the revenue department can complete its own activities faster",
    "Whether the new procedure produces a longer and more detailed process diagram",
    "Whether the change allows every property to eliminate process ownership"
  ],
  "Corporate rate verification may affect information used by several connected processes. The architecture helps managers examine those dependencies before approving changes that could create problems elsewhere."
);

M(
  "W6O3c-03", "W6O3c", 3,
  "Two Qasr improvement programmes propose incompatible changes to overlapping arrival activities. Which response best demonstrates effective process governance?",
  [
    "Use the architecture to identify the overlap and coordinate a decision through accountable process ownership",
    "Allow both programmes to implement their preferred changes independently",
    "Approve whichever proposal was submitted first without examining its consequences",
    "Remove the affected process from the architecture until both programmes are complete"
  ],
  "Process governance establishes how cross-functional decisions are coordinated and approved. A shared architecture reveals overlapping work, while accountable ownership helps resolve conflicting proposals."
);

TF(
  "W6O3c-04", "W6O3c", 1,
  "An architecture can help managers identify processes potentially affected by a proposed operational change.",
  true,
  "This statement is true. Process relationships reveal dependencies that managers should investigate before introducing changes. This supports more informed decisions about possible consequences."
);

TF(
  "W6O3c-05", "W6O3c", 2,
  "Once Qasr approves its process architecture, the diagrams should remain unchanged even when operational practices are revised.",
  false,
  "This statement is false. An architecture must be maintained as processes change. Outdated descriptions can mislead employees and managers, undermining confidence in the approved process structure."
);

DR(
  "W6O3c-06", "W6O3c", 1,
  "The wider set of processes potentially affected by a change is sometimes called its {1}, while relationships between connected processes are called {2}.",
  [
    ["blast radius", "process budget", "staffing ratio"],
    ["dependencies", "job grades", "departmental titles"]
  ],
  "Blast radius describes the wider potential consequences of a proposed change. Dependencies explain how processes rely on information, resources, or outcomes from other processes."
);

DR(
  "W6O3c-07", "W6O3c", 2,
  "Process {1} establishes decision rights and approval arrangements, while controlled {2} keeps authoritative descriptions accurate as operations change.",
  [
    ["governance", "fragmentation", "duplication"],
    ["revision", "abandonment", "concealment"]
  ],
  "Governance determines how decisions are made and approved. Controlled revision ensures that authoritative process descriptions remain dependable after approved operational changes."
);

V(
  "W6O3c-08", "W6O3c", 2,
  "Which diagram best illustrates why changing Qasr's reservation process may affect other guest-service processes?",
  [
    [
      D.flow([
        "Manage|reservations",
        "Prepare|arrival",
        "Complete|check-in",
        "Deliver|stay"
      ]),
      "Connected processes show how reservation information contributes to later guest-service activities"
    ],
    [
      D.flow([
        "~Reservations",
        "~Reception",
        "~Housekeeping",
        "~Finance"
      ]),
      "Disconnected departmental labels without process relationships"
    ],
    [
      D.flow([
        "Open|record",
        "Enter|details",
        "Save|record"
      ]),
      "Only the computer tasks used to update a reservation"
    ],
    [
      D.org("silo"),
      "A departmental reporting structure without the complete guest-service flow"
    ]
  ],
  "The connected process diagram makes dependencies visible. Reservation information may influence arrival preparation, check-in, and the subsequent guest experience."
);

V(
  "W6O3c-09", "W6O3c", 3,
  "Which diagram represents a controlled approach to maintaining an approved local process variation?",
  [
    [
      D.flow([
        "Common|process",
        "Local|requirement",
        "Approved|variant",
        "Ongoing|review"
      ]),
      "A local variation is justified, approved, and reviewed within the common architecture"
    ],
    [
      D.flow([
        "Local|preference",
        "Create|exception",
        "Avoid|approval",
        "Ignore|review"
      ]),
      "An exception is created without approval or subsequent review"
    ],
    [
      D.flow([
        "Common|process",
        "Ignore|constraints",
        "Require|uniformity",
        "Reject|evidence"
      ]),
      "Identical arrangements are imposed without examining local requirements"
    ],
    [
      D.flow([
        "Collect|versions",
        "Publish|duplicates",
        "Remove|ownership",
        "Stop|maintenance"
      ]),
      "Multiple versions are published without accountability or maintenance"
    ]
  ],
  "A controlled variation remains linked to the common process and has a documented operational justification. Approval and ongoing review prevent legitimate exceptions from becoming uncontrolled complexity."
);

OR(
  "W6O3c-10", "W6O3c", 2,
  "Arrange these actions for evaluating a proposed change to Qasr's reservation process.",
  [
    "Identify the proposed change and its intended outcome",
    "Use the architecture to identify affected processes and dependencies",
    "Consult the accountable owners and relevant functional managers",
    "Resolve cross-functional concerns through agreed governance",
    "Approve the change and update authoritative process descriptions"
  ],
  "Managers should clarify the proposed change before examining dependencies and consulting affected functions. Governance supports coordinated approval, while documentation updates keep the architecture aligned with approved operations."
);

MA(
  "W6O3c-11", "W6O3c", 2,
  "Match each architectural management concept to its practical contribution.",
  [
    [
      "Process dependency",
      "Reveals how one process relies on another"
    ],
    [
      "Blast radius",
      "Identifies the wider processes potentially affected by a change"
    ],
    [
      "Process governance",
      "Establishes decision rights and approval arrangements"
    ],
    [
      "Registered variant",
      "Records a justified local difference within the common architecture"
    ],
    [
      "Controlled revision",
      "Keeps approved process descriptions aligned with operational changes"
    ]
  ],
  "Dependencies reveal relationships, while blast radius identifies potential consequences of change. Governance coordinates decisions, registered variants control justified differences, and revision keeps the architecture dependable."
);


// ============================================================
// W6O3d — BUILD THE FIRST-LEVEL MAP
//
// 11 items
// mcq: 3 | tf: 2 | drop: 2 | visual: 2 | order: 1 | match: 1
// ============================================================

M(
  "W6O3d-01", "W6O3d", 1,
  "What should a useful first-level process architecture primarily show?",
  [
    "The organisation's major end-to-end processes and their relationships",
    "Every individual employee task and computer operation",
    "Only the names of departments and their reporting relationships",
    "A separate detailed procedure for every operational exception"
  ],
  "A first-level architecture provides a manageable view of major processes and their relationships. It establishes the structure needed for decisions before detailed activity modelling begins."
);

M(
  "W6O3d-02", "W6O3d", 2,
  "Why should Qasr agree its broad process structure before producing extensive detailed models?",
  [
    "To establish consistent boundaries, relationships, and ownership before detailed documentation expands",
    "To avoid investigating current operational practices at the fourteen properties",
    "To guarantee that every hotel follows identical procedures regardless of local conditions",
    "To replace the need for process owners and authoritative descriptions"
  ],
  "An agreed architecture provides common boundaries, naming conventions, and ownership. Establishing these foundations early reduces incompatible descriptions and unnecessary rework."
);

M(
  "W6O3d-03", "W6O3d", 3,
  "Qasr's executives want to begin improvement work immediately using the eleven existing arrival models. Which recommendation is most defensible?",
  [
    "Establish a reliable first-level architecture, verify disputed descriptions, and clarify ownership before selecting detailed improvement work",
    "Combine the eleven models into a twelfth and assume the resulting description is authoritative",
    "Select the property with the longest diagram and require every hotel to copy its activities",
    "Begin separate redesign projects in every department without examining process relationships"
  ],
  "Qasr's eleven models include nine analyst-produced descriptions, six of which were disputed on factual grounds. A dependable architecture requires verified information, agreed boundaries, and accountable ownership before detailed redesign decisions."
);

TF(
  "W6O3d-04", "W6O3d", 1,
  "A first-level architecture should connect major processes to organisational strategy without describing every individual employee activity.",
  true,
  "This statement is true. A first-level architecture provides the broad organisational view needed for strategic and cross-functional decisions. Detailed activity models can be developed where additional investigation is necessary."
);

TF(
  "W6O3d-05", "W6O3d", 2,
  "An organisation with hundreds of detailed process diagrams necessarily has a complete and dependable process architecture.",
  false,
  "This statement is false. Documentation volume does not establish architectural quality. A useful architecture requires coherent structure, process relationships, ownership, consistent conventions, and authoritative descriptions."
);

DR(
  "W6O3d-06", "W6O3d", 1,
  "A first-level architecture identifies major {1} processes, while {2} divides broader processes into smaller related components.",
  [
    ["end-to-end", "computer-only", "employee-specific"],
    ["decomposition", "duplication", "fragmentation"]
  ],
  "A first-level architecture shows major end-to-end processes and their relationships. Decomposition allows managers to examine smaller components while preserving their connection to the wider structure."
);

DR(
  "W6O3d-07", "W6O3d", 2,
  "Qasr should approve {1} descriptions after verifying current practice and record justified local differences as approved {2}.",
  [
    ["authoritative", "unverified", "obsolete"],
    ["variants", "departments", "budgets"]
  ],
  "Authoritative descriptions provide officially recognised references supported by evidence and approval. Registered variants preserve justified local differences without fragmenting the common architecture."
);

V(
  "W6O3d-08", "W6O3d", 2,
  "Which diagram is the most suitable illustrative first-level architecture for Qasr's guest-service value chain?",
  [
    [
      D.flow([
        "Attract|guests",
        "Manage|reservations",
        "Deliver|guest stay",
        "Complete|departure"
      ]),
      "A broad sequence of major guest-service processes"
    ],
    [
      D.flow([
        "Open|booking",
        "Read|reference",
        "Check|rate",
        "Close|record"
      ]),
      "Detailed computer activities within reservation verification"
    ],
    [
      D.flow([
        "~Reception",
        "~Revenue",
        "~Housekeeping",
        "~Finance"
      ]),
      "Disconnected departmental labels rather than major processes"
    ],
    [
      D.flow([
        "Print|key",
        "Hand|over key",
        "Confirm|receipt"
      ]),
      "A narrow sequence of key-handling activities"
    ]
  ],
  "A first-level architecture should show major processes contributing to organisational value. The broad guest-service sequence is an illustrative starting point, not an already approved Qasr architecture."
);
  V("W6O3d-09", "W6O3d", 1, "Which diagram correctly places Process Architecture before the Launch Pad in the BPM framework?", [[D.flow(["Organisation|Strategy", "Process|Architecture", "Launch|Pad"]), "Organisation Strategy, Process Architecture, then Launch Pad"], [D.flow(["Launch|Pad", "Process|Architecture", "Organisation|Strategy"]), "Launch Pad, Process Architecture, then Organisation Strategy"], [D.flow(["Process|Architecture", "Launch|Pad", "Organisation|Strategy"]), "Process Architecture, Launch Pad, then Organisation Strategy"], [D.flow(["Organisation|Strategy", "Launch|Pad", "Process|Architecture"]), "Organisation Strategy, Launch Pad, then Process Architecture"]], "Organisation Strategy establishes direction, Process Architecture develops the organisational map, and the Launch Pad prepares a focused improvement initiative. This sequence prevents premature detailed improvement work.");


OR(
  "W6O3d-10", "W6O3d", 2,
  "Arrange these actions in a defensible sequence for developing Qasr's initial process architecture.",
  [
    "Clarify the strategic objectives and customer value Qasr must deliver",
    "Identify and agree the major end-to-end process structure",
    "Establish process boundaries, conventions, and accountable ownership",
    "Verify descriptions and approve justified local variations",
    "Maintain the architecture and use it to guide improvement decisions"
  ],
  "The architecture should begin with organisational strategy and major process structure. Agreed boundaries, ownership, verified descriptions, and controlled variations then make it dependable for ongoing management decisions."
);

MA(
  "W6O3d-11", "W6O3d", 3,
  "Match each first-level architecture design decision to the management problem it addresses.",
  [
    [
      "Strategic alignment",
      "Prevents improvement priorities from becoming disconnected from organisational objectives"
    ],
    [
      "Agreed granularity",
      "Prevents comparisons between processes described at incompatible levels"
    ],
    [
      "Process ownership",
      "Establishes accountability across departmental boundaries"
    ],
    [
      "Authoritative descriptions",
      "Reduces uncertainty about which approved process information should guide decisions"
    ],
    [
      "Dependency mapping",
      "Helps managers anticipate the wider consequences of proposed changes"
    ]
  ],
  "Strategic alignment gives the architecture direction, while granularity makes process descriptions comparable. Ownership establishes accountability, authoritative descriptions support reliable decisions, and dependencies reveal the possible effects of change."
);

// END-BLOCK
// W06-bank-topup

TF(
  "W6O1a-12", "W6O1a", 2,
  "Qasr can use process architecture to identify overlapping improvement projects before those projects introduce conflicting changes.",
  true,
  "This statement is true. Process architecture reveals relationships between major processes and helps managers recognise overlapping improvement efforts. This allows Qasr to coordinate investments and avoid changes that undermine the complete guest experience."
);

DR(
  "W6O1b-12", "W6O1b", 2,
  "A process {1} describes activities within a particular process, while an architectural {2} shows how that process fits into broader organisational work.",
  [
    ["model", "budget", "job description"],
    ["hierarchy", "salary scale", "attendance record"]
  ],
  "A process model explains how particular work is performed. An architectural hierarchy connects that work to broader processes and organisational value, allowing managers to understand both operational detail and strategic context."
);

TF(
  "W6O1c-12", "W6O1c", 3,
  "Qasr may reasonably standardise routine supporting processes while investing in distinctive core processes that strengthen its guest experience.",
  true,
  "This statement is true. Core processes may justify differentiated investment because they contribute directly to customer value. Supporting processes remain important, but appropriate standardisation can improve efficiency and release resources for strategically valuable improvements."
);

DR(
  "W6O2a-12", "W6O2a", 3,
  "When Qasr compares arrival diagrams from different properties, the descriptions should represent equivalent process {1} and comparable levels of {2}.",
  [
    ["boundaries", "budgets", "staffing costs"],
    ["granularity", "departmental seniority", "employee experience"]
  ],
  "Equivalent boundaries establish that the models describe the same scope of work. Comparable granularity ensures that differences in modelling detail are not mistaken for genuine operational differences between Qasr properties."
);

TF(
  "W6O2b-12", "W6O2b", 3,
  "A Qasr process owner may need an escalation route when proposed changes affect departments whose managers cannot reach agreement.",
  true,
  "This statement is true. An escalation route allows unresolved cross-functional disagreements to reach an appropriate decision-making authority. It supports effective process ownership without requiring the owner to replace existing functional managers."
);

DR(
  "W6O2c-12", "W6O2c", 3,
  "When Qasr approves a new process description, the previous version should be managed through controlled {1}, while the approved description becomes the {2} reference.",
  [
    ["revision", "duplication", "fragmentation"],
    ["authoritative", "unverified", "informal"]
  ],
  "Controlled revision ensures that changes to process descriptions are recorded and managed. The authoritative version becomes the recognised reference for decisions, reducing the risk of employees relying on obsolete or conflicting information."
);

TF(
  "W6O3a-12", "W6O3a", 3,
  "The absence of a recorded factual dispute proves that a Qasr arrival model has been independently verified and formally approved.",
  false,
  "This statement is false. A model without a recorded dispute is not necessarily verified or authoritative. Qasr must distinguish the absence of objections from evidence of current operational accuracy and recognised approval."
);

DR(
  "W6O3b-12", "W6O3b", 3,
  "When two Qasr properties use different arrangements to achieve the same control outcome, managers should evaluate the operational {1} before approving a local {2}.",
  [
    ["evidence", "preferences alone", "departmental prestige"],
    ["variant", "organisation chart", "budget"]
  ],
  "Different departmental arrangements may achieve the same process outcome. Qasr should investigate whether local conditions justify the difference and formally approve any necessary variant within the common architecture."
);

TF(
  "W6O3c-12", "W6O3c", 3,
  "A process architecture can remain accurate indefinitely without maintenance, provided its original diagrams were approved by senior management.",
  false,
  "This statement is false. Technology, responsibilities, operating procedures, and strategic priorities can change. Process owners must maintain authoritative descriptions and registered variants so the architecture continues to support dependable management decisions."
);

DR(
  "W6O3d-12", "W6O3d", 3,
  "Before Qasr enters the Launch Pad phase, its process architecture should provide an agreed organisational {1} and identify the major process {2} relevant to improvement decisions.",
  [
    ["structure", "salary scale", "attendance schedule"],
    ["relationships", "employee birthdays", "office decorations"]
  ],
  "Process Architecture establishes the organisational structure and relationships needed for coherent BPM decisions. This provides the foundation for the Launch Pad phase, where managers prepare a focused improvement initiative."
);

// END-BLOCK
//__MORE_ITEMS__


  // ==========================================================
  // NORMALISE TO THE DOCUMENTED WEEK 1 SCHEMA
  //
  // Required fields:
  // id, clo, lo, sec, diff, type, q, o, ans, why, rem
  //
  // The correct option is authored first for MCQ and visual.
  // The correct blank choice is authored first for drop.
  // Order items are authored in the correct sequence.
  // Match pairs are authored with their correct relationships.
  //
  // The player handles runtime shuffling.
  // ==========================================================

  const A = window.ADAPTIVE;

  B.forEach((x) => {

    x.lo = A.sections[x.sec].lo;

    x.clo = A.outcomes[x.lo].clo;

    x.outcome = A.outcomes[x.lo].full;

    x.rem = `review:${x.sec}`;

    if (
      x.type === "mcq" ||
      x.type === "visual"
    ) {
      x.ans = 0;
    }

    if (x.type === "tf") {
      x.o = ["True", "False"];
    }

    if (x.type === "drop") {
      x.o = x.blanks;
      x.ans = x.blanks.map((b) => b[0]);
    }

    if (x.type === "order") {
      x.o = x.items;
      x.ans = x.items.slice();
    }

    if (x.type === "match") {
      x.o = x.pairs;
      x.ans = x.pairs.map((p) => p[1]);
    }

  });

  A.bank = B;

})();
// END-BLOCK