// w13-bank
//
// OPER621 Week 13 - The Realize Value Phase. Question bank, 12 items per part.
// Types: mcq, tf, drop, visual, order, match. Correct option is written FIRST; the player shuffles.
// Visual questions use only: flow, lanes, hier, stairs, org, bars, route, cycle.

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



// W13O1a - Going live is not the same as delivering value
// Lesson l1: Benefits are managed, not discovered
// Outcome O1 [S1]: Explain how benefits are defined, tracked and
// realised across a BPM programme.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O1a-01", "W13O1a", 1,
  "What is the central purpose of the Realize Value phase in the BPM framework?",
  [
    "Establish whether the expected business benefits have actually been achieved and can be supported by evidence",
    "Introduce the redesigned process into everyday operations and complete the operational transition",
    "Develop and test the technical capability required to operate the approved process design",
    "Maintain the redesigned process indefinitely without examining its original financial commitments"
  ],
  "Realize Value is phase nine of the BPM framework. It examines whether the expected business benefits have materialised and whether the claims are supported by appropriate evidence. Implement introduces the redesigned process into everyday operations, while Sustainable Performance addresses the continuing management and improvement of performance.");
 
M("W13O1a-02", "W13O1a", 2,
  "Qasr's redesigned arrival process is operating, but the audit committee asks whether the promised financial value has been delivered. What is the most defensible response?",
  [
    "Examine operational improvements and their attributable financial consequences before claiming that the benefits were realised",
    "Treat successful operational deployment as sufficient evidence that the original financial benefits have been achieved",
    "Recognise the original business case estimate because implementation demonstrates that its assumptions were correct",
    "Postpone all financial examination until Sustainable Performance because Realize Value concerns only technical operation"
  ],
  "Successful implementation establishes that the redesigned process has entered operational use. It does not establish that the expected financial consequences have occurred. Qasr must connect measured operational improvements with attributable economic outcomes before presenting its benefits as financially realised.");
 
M("W13O1a-03", "W13O1a", 3,
  "Qasr reports that the redesigned arrival process requires less employee effort, but actual salary expenditure has not been shown to decrease. Which conclusion is most defensible?",
  [
    "The process may have released employee capacity, but a realised labour saving requires evidence of an attributable financial consequence",
    "Every reduction in employee processing time creates an equivalent reduction in salary expenditure",
    "The absence of demonstrated payroll savings proves that the redesigned arrival process produced no operational improvement",
    "The programme may recognise the original labour estimate because released capacity always has the same value as removed expenditure"
  ],
  "Released capacity means that employees may have time available for other productive activities. It is not automatically equivalent to removed labour expenditure. The Realize Value phase distinguishes genuine operational improvement from financial benefits that have actually been captured and demonstrated.");
 
TF("W13O1a-04", "W13O1a", 1,
  "Realize Value is phase nine of the ten-phase BPM framework, following Implement and preceding Sustainable Performance.",
  true,
  "This statement is true. Implement is phase eight and introduces the redesigned process into everyday operations. Realize Value is phase nine and examines whether expected business benefits have been achieved. Sustainable Performance follows and concerns maintaining and improving operational performance.");
 
TF("W13O1a-05", "W13O1a", 2,
  "Because Qasr currently tracks AED 505,000 in benefits, the audit committee can treat that amount as independently verified financial realisation without further examination.",
  false,
  "This statement is false. Qasr's business case promised AED 620,000 annually, while the programme currently reports AED 505,000 in tracked benefits. Tracking a benefit does not automatically establish that its financial consequences have been verified. The committee must examine attribution and supporting financial evidence before recognising realised value.");
 
DR("W13O1a-06", "W13O1a", 1,
  "In the BPM framework, {1} introduces the redesigned process into everyday operations, while {2} examines whether its expected business benefits have materialised.",
  [
    ["Implement", "Develop", "Innovate"],
    ["Realize Value", "Sustainable Performance", "Launch Pad"]
  ],
  "Implement introduces the developed process into actual organisational operations. Realize Value subsequently evaluates whether the intended business benefits have been achieved. These phases have different purposes because operational deployment is not itself evidence of financial realisation.");
 
DR("W13O1a-07", "W13O1a", 3,
  "When Qasr employees complete arrival activities with less effort, the immediate operational result may be {1}; recognising a labour saving requires evidence of {2}.",
  [
    ["released employee capacity", "removed salary expenditure", "additional corporate revenue"],
    ["an attributable reduction in actual labour expenditure", "a completed operational deployment", "an unchanged staffing assumption"]
  ],
  "A redesigned process may release employee capacity by reducing the effort needed for existing work. That capacity does not automatically reduce salary expenditure. A defensible labour saving requires evidence that the improvement produced an attributable financial consequence, rather than relying on the original staffing assumptions.");
 
V("W13O1a-08", "W13O1a", 2,
  "Which diagram correctly identifies the Realize Value phase within the ten-phase BPM framework?",
  [
    [
      D.route([8]),
      "Realize Value is highlighted as phase nine of the BPM framework"
    ],
    [
      D.route([7]),
      "Implement is highlighted as the phase currently being investigated"
    ],
    [
      D.route([9]),
      "Sustainable Performance is highlighted as the phase currently being investigated"
    ],
    [
      D.route([6]),
      "Develop is highlighted as the phase currently being investigated"
    ]
  ],
  "Realize Value occupies phase nine of the ten-phase BPM framework. It follows Implement, which introduces the redesigned process into everyday operations, and precedes Sustainable Performance, which addresses continuing performance management and improvement. The other diagrams highlight different framework phases.");
 
V("W13O1a-09", "W13O1a", 3,
  "Which diagram best represents how Qasr should move from operational improvement toward a defensible claim of realised financial value?",
  [
    [
      D.flow([
        "Process|Improvement",
        "Measure|Outcome",
        "Examine|Attribution",
        "Verify|Financial effect",
        "Report|Realised value"
      ]),
      "Measure the improvement, investigate its contribution and verify the financial consequence before reporting realised value"
    ],
    [
      D.flow([
        "Process|Implemented",
        "Assume|Financial saving",
        "Recognise|Business case",
        "Close|Benefits review"
      ]),
      "Treat operational deployment as sufficient evidence that the original financial estimate has been achieved"
    ],
    [
      D.flow([
        "Employees|Work faster",
        "Calculate|Time released",
        "Recognise|Salary saving",
        "Avoid|Payroll review"
      ]),
      "Convert released employee time directly into recognised labour savings without examining expenditure"
    ],
    [
      D.flow([
        "Benefit|Promised",
        "Programme|Tracks amount",
        "Accept|Reported figure",
        "Skip|Attribution"
      ]),
      "Treat a tracked benefit as financially verified without investigating its contribution or supporting evidence"
    ]
  ],
  "Realize Value requires a defensible connection between operational improvement and the economic benefit being claimed. Qasr must measure the outcome, examine whether the redesigned process contributed to it and verify the relevant financial consequence. Implementation completion, released employee time and tracked amounts do not independently establish realised financial value.");
 
OR("W13O1a-10", "W13O1a", 2,
  "Arrange these BPM framework phases in their established sequence, from preparing the operating capability through maintaining achieved performance.",
  [
    "Develop builds and tests the capability required for the approved process",
    "Implement introduces that capability into everyday organisational operations",
    "Realize Value evaluates whether the expected business benefits have been achieved",
    "Sustainable Performance addresses the continuing maintenance and improvement of operational performance"
  ],
  "The BPM framework places Develop at phase seven, Implement at phase eight, Realize Value at phase nine and Sustainable Performance at phase ten. This established sequence distinguishes preparing a capability, introducing it into operations, evaluating its benefits and sustaining performance. Successful completion of an earlier phase does not automatically establish the outcomes of the following phase.");
 
MA("W13O1a-11", "W13O1a", 2,
  "Match each benefits management concept to its meaning.",
  [
    [
      "Operational improvement",
      "A measurable change in how effectively or efficiently a process performs"
    ],
    [
      "Released capacity",
      "Employee time or other resources made available through more efficient work"
    ],
    [
      "Baseline",
      "The agreed starting position against which subsequent performance is compared"
    ],
    [
      "Benefits traceability",
      "The connection between the original business objective and evidence supporting the claimed outcome"
    ],
    [
      "Financial realisation",
      "An attributable economic benefit supported by evidence of its actual financial consequences"
    ]
  ],
  "Operational improvement describes a change in process performance, while released capacity describes resources made available through that improvement. A baseline provides the starting position for comparison. Benefits traceability connects the original objective with supporting evidence, and financial realisation requires a defensible economic consequence rather than an assumed saving.");
 
MA("W13O1a-12", "W13O1a", 3,
  "Match each Qasr benefits review observation to the most defensible management interpretation.",
  [
    [
      "The redesigned arrival process has entered everyday operations",
      "Implementation progress has been demonstrated, but financial benefits still require examination"
    ],
    [
      "The original business case promised AED 620,000 annually",
      "This is the expected benefit commitment rather than evidence of realised value"
    ],
    [
      "The programme currently tracks AED 505,000 in benefits",
      "The reported amount requires attribution and financial verification before recognition"
    ],
    [
      "Headcount fell by four rather than the eleven originally assumed",
      "The labour claim requires examination of actual staffing expenditure and released capacity"
    ],
    [
      "Seven properties went live within the last four months",
      "Deployment timing may affect benefit maturity but does not guarantee future realisation"
    ]
  ],
  "Qasr's evidence must be interpreted according to what each observation actually establishes. Operational deployment does not prove financial realisation, the original business case is a promise, and tracked benefits require verification. The staffing difference challenges the original labour assumptions, while recent deployment may explain timing without guaranteeing that missing benefits will materialise.");

// W13O1b - The promise, the baseline and the measured result
// Lesson l1: Benefits are managed, not discovered
// Outcome O1 [S1]: Explain how benefits are defined, tracked and
// realised across a BPM programme.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O1b-01", "W13O1b", 1,
  "What is the principal purpose of establishing a baseline before implementing a redesigned business process?",
  [
    "Record the agreed starting position against which subsequent performance can be compared",
    "Guarantee that the financial benefits estimated in the business case will eventually be achieved",
    "Determine the final monetary value of the improvement without measuring actual operating results",
    "Replace the strategic objective with a record of the activities completed during implementation"
  ],
  "A baseline establishes the agreed position before process improvement takes effect. The Week 13 benefits management approach uses this starting point to assess subsequent performance. A baseline supports measurement, but it does not guarantee that the expected benefit will materialise or establish that the redesigned process caused the observed change.");
 
M("W13O1b-02", "W13O1b", 2,
  "Qasr's business case promised AED 620,000 annually, while the programme currently tracks AED 505,000. What does this comparison establish?",
  [
    "The tracked amount is AED 115,000 below the original promise, but the causes of the difference and the financially realised value remain unverified",
    "Qasr has independently verified AED 505,000 in financial benefits and established that no further evidence is required",
    "The AED 115,000 difference represents benefits that will certainly materialise once every property has operated for a full year",
    "The original AED 620,000 estimate has become the realised financial result because the redesigned process entered operations"
  ],
  "The difference between AED 620,000 promised and AED 505,000 tracked is AED 115,000. However, the arithmetic does not explain why the figures differ. The Week 13 benefits review distinguishes original expectations, tracked outcomes and financially verified benefits. Neither the promised amount nor the tracked amount independently establishes realised financial value.");
 
M("W13O1b-03", "W13O1b", 3,
  "Qasr observes an improvement after introducing its redesigned arrival process. Why should management investigate other influences before attributing the entire improvement to BPM?",
  [
    "Other operational or commercial changes may have contributed to the observed result, so the process contribution requires evidence",
    "Every improvement observed after implementation must be attributed equally to all organisational activities",
    "The existence of another possible influence proves that the redesigned process contributed nothing to the improvement",
    "A credible baseline eliminates the possibility that factors other than the redesigned process affected the result"
  ],
  "A baseline supports comparison between the original and subsequent positions, but comparison alone does not establish causation. The Week 13 material emphasises that benefits must be attributable to the process improvement. Other influences may affect observed results, so management should investigate them before assigning financial credit to the BPM programme.");
 
TF("W13O1b-04", "W13O1b", 1,
  "Benefits management should begin when the programme's objectives and expected outcomes are established, rather than waiting until implementation has finished.",
  true,
  "This statement is true. The benefits management approach connects early strategic objectives with baselines, estimates and later measurements. Establishing these arrangements before implementation makes subsequent benefits traceable. Waiting until the Realize Value phase may leave managers without the original measurements or assumptions needed to evaluate the outcome.");
 
TF("W13O1b-05", "W13O1b", 2,
  "Once a measured result improves against its agreed baseline, the organisation can attribute the entire improvement to the redesigned process without examining other causes.",
  false,
  "This statement is false. A baseline establishes the starting position, and subsequent measurement identifies the observed difference. However, other changes may also have influenced the result. The Week 13 discussion distinguishes measurement from attribution, requiring evidence that supports the contribution reasonably assigned to the redesigned process.");
 
DR("W13O1b-06", "W13O1b", 1,
  "The agreed performance position before process improvement is called the {1}, while the outcome observed after the change is the {2}.",
  [
    ["baseline", "benefit estimate", "strategic objective"],
    ["measured result", "original commitment", "implementation activity"]
  ],
  "A baseline records the agreed starting position before the redesigned process changes operations. The measured result describes the outcome subsequently observed. Comparing them helps establish what changed, but the comparison must still be supported by attribution evidence before management claims that the process produced a particular benefit.");
 
DR("W13O1b-07", "W13O1b", 3,
  "In the BPM benefits journey, phase one establishes the {1}, while phase five uses knowledge of the emerging process design to reconsider the {2}.",
  [
    ["strategic objectives", "verified financial results", "operational deployment dates"],
    ["expected benefit estimate", "historical baseline", "final realised expenditure"]
  ],
  "Strategy establishes the business objectives that justify process improvement. During Innovate, knowledge of the proposed future process provides an opportunity to reconsider the expected benefit estimate. This preserves the connection between strategic intention and a realistic financial expectation. Actual benefits are examined later during Realize Value.");
 
V("W13O1b-08", "W13O1b", 2,
  "Which diagram correctly connects the early BPM phases with their benefits management responsibilities?",
  [
    [
      D.hier([
        ["Strategy", "Establish business objectives"],
        ["Launch Pad", "Establish the agreed baseline"],
        ["Innovate", "Reconsider the benefit estimate"],
        ["Realize Value", "Evaluate actual benefits"]
      ]),
      "Strategic objectives, baseline evidence and revised estimates support the later benefits review"
    ],
    [
      D.hier([
        ["Strategy", "Verify final financial savings"],
        ["Launch Pad", "Declare all benefits realised"],
        ["Innovate", "Close the benefits register"],
        ["Realize Value", "Introduce the process design"]
      ]),
      "Financial realisation is incorrectly assigned to the early framework phases"
    ],
    [
      D.hier([
        ["Strategy", "Record final operating expenditure"],
        ["Launch Pad", "Ignore historical performance"],
        ["Innovate", "Preserve every original assumption"],
        ["Realize Value", "Assume the business case was correct"]
      ]),
      "The framework is represented as avoiding baseline measurement and evidence-based revision"
    ],
    [
      D.hier([
        ["Strategy", "Select deployment equipment"],
        ["Launch Pad", "Confirm technical installation"],
        ["Innovate", "Approve operational closure"],
        ["Realize Value", "Transfer software ownership"]
      ]),
      "Technical and implementation activities replace the benefits management responsibilities"
    ]
  ],
  "The benefits management journey begins with strategic objectives during Strategy and an agreed baseline during Launch Pad. Innovate provides an opportunity to reconsider benefit estimates using the proposed process design. Realize Value subsequently examines actual outcomes and their financial consequences. These responsibilities support traceability from the original intention to the demonstrated result.");
 
V("W13O1b-09", "W13O1b", 3,
  "Which diagram best represents a defensible investigation when Qasr reports an improvement against its original baseline?",
  [
    [
      D.flow([
        "Agreed|Baseline",
        "Observed|Result",
        "Calculate|Difference",
        "Investigate|Other causes",
        "Assess|Attribution",
        "Verify|Benefit"
      ]),
      "Compare performance, investigate competing influences and verify the attributable benefit"
    ],
    [
      D.flow([
        "Observed|Improvement",
        "Assume|Process caused it",
        "Recognise|Full saving",
        "Close|Review"
      ]),
      "Treat the observed improvement as sufficient evidence of complete process attribution"
    ],
    [
      D.flow([
        "Original|Estimate",
        "Implement|Process",
        "Repeat|Estimate",
        "Declare|Realisation"
      ]),
      "Use the original estimate as the realised result without examining actual measurements"
    ],
    [
      D.flow([
        "Tracked|Benefit",
        "Ignore|Baseline",
        "Exclude|Other causes",
        "Approve|Financial claim"
      ]),
      "Accept the tracked amount while disregarding the original position and attribution evidence"
    ]
  ],
  "A defensible benefits assessment compares the measured result with the agreed baseline and establishes the observed difference. Management must then examine alternative explanations and assess the contribution attributable to the redesigned process. Only after considering the relevant financial evidence can the organisation defend the realised benefit. Neither a favourable comparison nor a tracked amount independently establishes financial realisation.");
 
OR("W13O1b-10", "W13O1b", 2,
  "Arrange these benefits management activities in the BPM framework sequence from the original strategic intention to the evaluation of realised value.",
  [
    "Establish the business objectives during Strategy",
    "Establish the agreed performance baseline during Launch Pad",
    "Reconsider the expected benefit estimate using the proposed design during Innovate",
    "Introduce the redesigned process into everyday operations during Implement",
    "Evaluate measured outcomes and realised benefits during Realize Value"
  ],
  "The BPM framework places Strategy before Launch Pad, Innovate, Implement and Realize Value. Strategy establishes the business objectives, while Launch Pad provides the agreed baseline. Innovate allows the expected benefits to be reconsidered using the proposed process design. Implement introduces the redesigned process into operations, and Realize Value evaluates the actual benefits. This established framework sequence makes the ordering unambiguous.");
 
MA("W13O1b-11", "W13O1b", 2,
  "Match each element of benefits traceability to the question it helps management answer.",
  [
    [
      "Strategic objective",
      "What business result justified the investment?"
    ],
    [
      "Baseline",
      "What was the agreed performance position before the change?"
    ],
    [
      "Benefit estimate",
      "What economic value was expected from the proposed improvement?"
    ],
    [
      "Measured result",
      "What outcome was observed after the process changed?"
    ],
    [
      "Attribution evidence",
      "How much of the observed outcome can reasonably be credited to the process?"
    ]
  ],
  "Benefits traceability connects the original strategic purpose with the evidence used to evaluate the result. The objective explains why the investment matters, the baseline establishes the starting position, and the estimate records expected value. The measured result describes what happened, while attribution evidence helps determine the contribution reasonably credited to the redesigned process.");
 
MA("W13O1b-12", "W13O1b", 3,
  "Match each Qasr benefits review observation to the most defensible interpretation or evidence requirement.",
  [
    [
      "The business case promised AED 620,000 annually",
      "Preserve this as the original expected benefit commitment"
    ],
    [
      "The programme currently tracks AED 505,000",
      "Examine supporting evidence before treating the reported amount as financially realised"
    ],
    [
      "The difference between the two figures is AED 115,000",
      "Investigate the causes rather than assume the entire difference represents delayed benefits"
    ],
    [
      "Seven properties went live within the last four months",
      "Examine whether the measurement period is sufficient without assuming future benefits are guaranteed"
    ],
    [
      "The programme director and finance director disagree about the reported value",
      "Reconcile operational measurement with attributable financial evidence"
    ]
  ],
  "Qasr's original AED 620,000 commitment and currently tracked AED 505,000 answer different questions. Their AED 115,000 difference is established arithmetically, but its causes remain subject to investigation. Recent deployment makes timing relevant without guaranteeing future realisation. The disagreement between programme and finance perspectives requires evidence connecting operational outcomes with financially defensible benefits.");

// W13O1c - Five kinds of benefit, five different tests
// Lesson l1: Benefits are managed, not discovered
// Outcome O1 [S1]: Explain how benefits are defined, tracked and
// realised across a BPM programme.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O1c-01", "W13O1c", 1,
  "A redesigned process cuts the effort needed for existing work, yet payroll is unchanged and the freed time has not been assigned to anything. How should this improvement be classified?",
  ["Capacity released, which becomes a benefit only once it is redeployed to something measured", "Cost removed, because the reduced effort has already left the operating budget", "Cost avoided, because the freed time proves that a committed spend will not occur", "Revenue gained, because faster work can be attributed to additional sales"],
  "The improvement releases capacity, because the same people now need less time for the same work. The slides are clear that released capacity counts as a benefit only when it is redeployed to something measured. Nothing has left the budget, no committed spend has been stopped and no extra revenue has been shown, so the other categories do not fit.");
 
M("W13O1c-02", "W13O1c", 2,
  "Qasr claims AED 180,000 in retained corporate revenue, but corporate rates fell by four percent during renewal. What is the main implication for benefits realisation?",
  [
    "The contribution of the redesigned process must be distinguished from the possible influence of the pricing change",
    "The entire retained revenue amount must be attributed to BPM because the renewals occurred after implementation",
    "The rate reduction proves that the redesigned process contributed nothing to customer retention",
    "The retained revenue claim can be recognised as an equivalent profit increase without examining costs or attribution"
  ],
  "Qasr's retained corporate revenue claim involves an attribution problem because corporate rates also changed during the renewal period. The redesigned arrival process may have supported retention, but lower prices provide another plausible explanation. The Week 13 benefits review therefore requires evidence of the process contribution and the actual financial consequences before the full claimed amount can be treated as realised value.");
 
M("W13O1c-03", "W13O1c", 3,
  "Qasr claims AED 85,000 from an avoided regulatory penalty, but enforcement remains contingent. Which interpretation is most defensible?",
  [
    "The process may have reduced regulatory risk, but the full penalty amount is not automatically a realised financial saving",
    "The full AED 85,000 must be recognised because the absence of a penalty proves that enforcement was prevented",
    "The absence of enforcement proves that regulatory risk reduction has no organisational value",
    "The claimed penalty amount should be added to retained revenue because both represent additional income generated by BPM"
  ],
  "The Week 13 case distinguishes reduced regulatory exposure from realised financial savings. A contingent penalty represents possible expenditure rather than a cost that would certainly have occurred. Qasr may have achieved valuable risk reduction, but recognising the entire AED 85,000 as a financial saving requires credible evidence of the exposure and the intervention's contribution.");
 
TF("W13O1c-04", "W13O1c", 1,
  "Cost removed and cost avoided describe different benefits because one concerns actual expenditure eliminated, while the other concerns credible expenditure that would otherwise have occurred.",
  true,
  "This statement is true. Cost removed concerns an attributable reduction in expenditure that the organisation was already incurring. Cost avoided concerns expenditure that the organisation would reasonably have incurred without the improvement. The Week 13 benefits discussion requires evidence appropriate to each economic mechanism rather than treating every reduction in resource requirements as an identical saving.");
 
TF("W13O1c-05", "W13O1c", 2,
  "If a BPM programme retains additional revenue, the entire revenue amount can automatically be recognised as an equivalent increase in profit.",
  false,
  "This statement is false. Revenue represents income from business activity, while profit or financial contribution also depends on relevant costs. The Week 13 discussion of Qasr's retained corporate revenue further requires attribution because corporate rates changed during renewal. Retained revenue cannot automatically be treated as an equivalent realised profit or as value entirely caused by the redesigned process.");
 
DR("W13O1c-06", "W13O1c", 1,
  "An attributable reduction in expenditure already being incurred is classified as {1}, while preventing credible expenditure that would otherwise have been incurred is classified as {2}.",
  [
    ["cost removed", "cost avoided", "revenue gained"],
    ["cost avoided", "capacity released", "risk reduced"]
  ],
  "Cost removed means that actual expenditure decreases because of the improvement. Cost avoided means that the organisation prevents expenditure it would otherwise reasonably expect to incur. These categories require different evidence because removing an existing cost differs from demonstrating that a credible future cost was prevented.");
 
DR("W13O1c-07", "W13O1c", 3,
  "When a redesigned process allows existing employees to perform additional work without reducing payroll, the immediate benefit category is {1}; when improved controls lower exposure to an undesirable regulatory event, the category is {2}.",
  [
    ["capacity released", "cost removed", "revenue gained"],
    ["risk reduced", "cost removed", "revenue gained"]
  ],
  "Capacity released describes resources made available through improved efficiency without necessarily reducing expenditure. Risk reduced describes a lower likelihood or consequence of an undesirable event. The Week 13 discussion distinguishes these benefits because released employee time and reduced regulatory exposure do not automatically represent realised cash savings.");
 
V("W13O1c-08", "W13O1c", 2,
  "Which diagram lists the five benefit types that each need their own test?",
  [
    [D.flow(["Cost removed", "Cost avoided", "Revenue gained", "Risk reduced", "Capacity released"]), "The five benefit types, each proved in a different way"],
    [D.flow(["Cost removed", "Cost avoided", "Revenue gained", "Risk reduced", "Go-live achieved"]), "Going live is counted as a benefit type in place of released capacity"],
    [D.flow(["Cost removed", "Revenue gained", "Hours saved", "Staff trained", "Process documented"]), "Activities and operating measures are mixed in with benefit types"],
    [D.flow(["Cost removed", "Cost avoided", "Revenue gained", "Tracked total", "Business case"]), "Report figures are treated as if they were benefit types"]
  ],
  "The five types are cost removed, cost avoided, revenue gained, risk reduced and capacity released, and each one is proved differently. Going live, training staff or saving hours are activities or measures, not benefit types. The tracked total and the business case are figures in a report, so they cannot be categories of benefit either.");
 
V("W13O1c-09", "W13O1c", 3,
  "Which diagram best represents the evidence needed before Qasr can defend its claimed financial benefits?",
  [
    [
      D.flow([
        "Identify|Benefit category",
        "Select|Evidence test",
        "Measure|Outcome",
        "Assess|Attribution",
        "Verify|Financial consequence"
      ]),
      "The benefit category determines the evidence needed to assess its economic contribution"
    ],
    [
      D.flow([
        "Record|Claimed amount",
        "Assume|Full attribution",
        "Recognise|Financial saving",
        "Close|Review"
      ]),
      "Every reported monetary claim is treated as financially realised without further examination"
    ],
    [
      D.flow([
        "Measure|Employee time",
        "Convert|To salary saving",
        "Ignore|Actual expenditure",
        "Approve|Benefit"
      ]),
      "Released employee capacity is automatically converted into a financial saving"
    ],
    [
      D.flow([
        "Identify|Possible penalty",
        "Assume|Certain enforcement",
        "Recognise|Full avoided cost",
        "Skip|Risk evidence"
      ]),
      "A contingent regulatory exposure is automatically recognised as expenditure avoided"
    ]
  ],
  "Different benefits require evidence appropriate to their economic meaning. Cost removal requires actual expenditure evidence, retained revenue requires attribution and financial contribution evidence, and avoided penalties require credible exposure evidence. The Week 13 Realize Value discussion therefore supports identifying the benefit category, measuring the outcome, assessing attribution and verifying the financial consequence before recognising realised value.");
 
OR("W13O1c-10", "W13O1c", 2,
  "Arrange these activities in the logical sequence required to evaluate a claimed financial benefit, from identifying its nature to reporting its realised value.",
  [
    "Identify the claimed benefit and classify its economic category",
    "Determine the evidence needed to test that category of benefit",
    "Measure the relevant operational or business outcome",
    "Assess whether the outcome is reasonably attributable to the process improvement",
    "Verify the financial consequence before reporting realised value"
  ],
  "The Week 13 benefits discussion establishes that different categories require different evidence. Management must identify what kind of benefit is claimed before choosing an appropriate test. It then measures the outcome, investigates the contribution of the redesigned process and examines the relevant financial consequence. Reporting realised value before these checks would confuse operational improvement or estimated potential with demonstrated economic benefit.");
 
MA("W13O1c-11", "W13O1c", 2,
  "Match each benefit category to the economic consequence it describes.",
  [
    [
      "Cost removed",
      "An attributable reduction in expenditure the organisation was already incurring"
    ],
    [
      "Cost avoided",
      "Credible future expenditure prevented by the improvement"
    ],
    [
      "Revenue gained",
      "Additional income generated or retained through an attributable business outcome"
    ],
    [
      "Risk reduced",
      "A lower likelihood or consequence of an undesirable event"
    ],
    [
      "Capacity released",
      "Existing resources becoming available for additional productive work"
    ]
  ],
  "Cost removed concerns existing expenditure, while cost avoided concerns credible expenditure that would otherwise have occurred. Revenue gained concerns income associated with business activity, and risk reduced concerns exposure to undesirable events. Capacity released describes resources made available through efficiency. The categories require separate tests because their economic consequences are not interchangeable.");
 
MA("W13O1c-12", "W13O1c", 3,
  "Match each benefits claim or observation to the evidence needed for a defensible assessment.",
  [
    [
      "Qasr's AED 240,000 front-desk labour claim",
      "Actual staffing expenditure and the financial consequences of the observed headcount change"
    ],
    [
      "Qasr's AED 180,000 retained corporate revenue claim",
      "Evidence of renewal attribution, pricing influence and actual financial contribution"
    ],
    [
      "Qasr's AED 85,000 avoided regulatory penalty claim",
      "Credible regulatory exposure and evidence supporting the claimed avoided expenditure"
    ],
    [
      "Employee time released by a faster process",
      "Evidence showing how the available capacity was used and what measurable value resulted"
    ],
    [
      "A claim that future recruitment expenditure was avoided",
      "Evidence that the additional recruitment would otherwise reasonably have been necessary"
    ]
  ],
  "The Week 13 case illustrates why each benefit category needs an appropriate evidence test. Labour savings require examination of actual expenditure, retained revenue requires attribution and financial assessment, and avoided penalties require credible evidence of contingent exposure. Released capacity needs evidence of its subsequent use, while avoided recruitment expenditure requires a defensible account of what would otherwise have happened. Monetary estimates alone do not establish financial realisation.");

// W13O1d - When two causes change the same result
// Lesson l2: Proving what really changed
// Outcome O1 [S1]: Explain how benefits are defined, tracked and
// realised across a BPM programme.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O1d-01", "W13O1d", 1,
  "An organisation reduces debtor days from 47 to 31 after redesigning collections, but also introduces a late-payment penalty. What can management defensibly conclude?",
  [
    "Debtor days improved by 16 days, but the contribution of the redesigned process requires further investigation",
    "The redesigned collection process independently caused the entire 16-day reduction because it was implemented before the improvement",
    "The late-payment penalty independently caused the entire reduction because customers now face an additional financial consequence",
    "The improvement cannot be recognised as an operational result because more than one intervention occurred during the period"
  ],
  "The debtor-days example illustrates the attribution problem discussed in the Week 13 Realize Value material. The reduction from 47 to 31 days establishes an observed improvement of 16 days. However, both the redesigned collection process and the late-payment penalty may have influenced customer behaviour. The contribution of each intervention cannot be established from the before-and-after comparison alone.");
 
M("W13O1d-02", "W13O1d", 2,
  "Qasr claims AED 180,000 in retained corporate revenue, but corporate rates fell by four percent during renewal. Which investigation would best strengthen the attribution claim?",
  [
    "Examine evidence about renewal decisions and assess the relative influence of service improvement and pricing",
    "Assume that the redesigned arrival process caused every renewal because the contracts continued after implementation",
    "Deduct four percent from the claimed benefit and treat the remaining amount as independently verified process value",
    "Exclude the retained revenue claim entirely because a pricing change proves that the process contributed nothing"
  ],
  "Qasr's corporate renewal claim involves competing possible causes. The redesigned arrival process may have supported retention, while the four percent rate reduction may also have influenced customer decisions. The Week 13 attribution discussion requires evidence about these influences before assigning financial credit. Neither automatic recognition, arbitrary adjustment nor complete rejection follows from the available facts.");
 
M("W13O1d-03", "W13O1d", 3,
  "Why might comparing similar customer groups exposed to different combinations of collection changes improve a benefits assessment?",
  [
    "The comparison may help distinguish the contribution of the redesigned collection process from the effect of the late-payment penalty",
    "The comparison guarantees that every difference between the groups was caused exclusively by the redesigned process",
    "The comparison eliminates the need to establish a baseline or examine differences in customer characteristics",
    "The comparison proves that both interventions contributed equally whenever the groups show improved payment performance"
  ],
  "The debtor-days example demonstrates why a single before-and-after comparison cannot separate simultaneous influences. Comparing sufficiently similar groups exposed to different interventions may provide stronger evidence about their respective contributions. However, differences in customer characteristics and other conditions must still be considered. A comparison improves attribution evidence without automatically establishing complete causal certainty.");
 
TF("W13O1d-04", "W13O1d", 1,
  "An observed improvement after BPM implementation does not establish that the redesigned process caused the entire improvement when another relevant intervention occurred during the same period.",
  true,
  "This statement is true. The Week 13 attribution discussion distinguishes the timing of an improvement from evidence about its causes. In the debtor-days example, both redesigned collections and a new late-payment penalty may influence payment behaviour. Management must investigate competing explanations before assigning the entire observed change to BPM.");
 
TF("W13O1d-05", "W13O1d", 2,
  "If another management intervention may have contributed to an observed improvement, the BPM programme must be assigned zero benefit until its independent contribution can be measured precisely.",
  false,
  "This statement is false. Uncertain attribution does not establish that the redesigned process contributed nothing. The Week 13 material requires management to distinguish demonstrated contribution from unsupported financial credit. Where the evidence cannot establish a precise amount, the programme should report the uncertainty honestly rather than assume either complete success or no contribution.");
 
DR("W13O1d-06", "W13O1d", 1,
  "In the debtor-days example, the reduction from 47 to 31 days establishes an {1}, while determining how much of that reduction resulted from redesigned collections requires an assessment of {2}.",
  [
    ["observed improvement", "verified financial saving", "original benefit estimate"],
    ["attribution", "implementation completion", "staffing capacity"]
  ],
  "The difference between 47 and 31 debtor days is an observed improvement of 16 days. Attribution concerns how much of that improvement can reasonably be credited to the redesigned collection process. Because a late-payment penalty was introduced during the same period, the observed reduction does not independently establish the process contribution.");
 
DR("W13O1d-07", "W13O1d", 3,
  "In Qasr's corporate retention claim, the redesigned arrival process represents a possible {1}, while the four percent corporate rate reduction represents a possible {2}.",
  [
    ["service-related influence", "verified financial result", "regulatory exposure"],
    ["pricing-related influence", "labour cost reduction", "implementation milestone"]
  ],
  "Qasr's redesigned arrival process may have influenced corporate renewal decisions through improved service. The four percent rate reduction provides another plausible influence through pricing. The Week 13 attribution discussion requires management to investigate both explanations rather than assume the entire retained revenue claim belongs to the process improvement.");
 
V("W13O1d-08", "W13O1d", 2,
  "Which diagram best represents the attribution problem in the debtor-days example?",
  [
    [
      D.flow([
        "Redesigned|Collections",
        "Late-payment|Penalty",
        "Observed|16-day reduction",
        "Investigate|Contributions"
      ]),
      "Two interventions may contribute to the observed reduction in debtor days"
    ],
    [
      D.flow([
        "Redesigned|Collections",
        "Observed|16-day reduction",
        "Assign|Full process credit"
      ]),
      "The entire improvement is assigned to the redesigned process without examining the penalty"
    ],
    [
      D.flow([
        "Late-payment|Penalty",
        "Observed|16-day reduction",
        "Assign|Full penalty credit"
      ]),
      "The entire improvement is assigned to the penalty without examining the redesigned process"
    ],
    [
      D.flow([
        "Observed|16-day reduction",
        "Assume|Equal contributions",
        "Recognise|Equal benefits"
      ]),
      "The two interventions are assumed to contribute equally without supporting evidence"
    ]
  ],
  "The debtor-days example contains two plausible influences on the same observed outcome. Redesigned collections and the late-payment penalty may both have encouraged earlier payment. The Week 13 Realize Value discussion therefore requires investigation of their respective contributions. The other diagrams assign unsupported causal credit or assume equal contributions without evidence.");
 
V("W13O1d-09", "W13O1d", 3,
  "Which diagram represents the most defensible approach to evaluating Qasr's retained corporate revenue claim?",
  [
    [
      D.flow([
        "Observe|Renewals",
        "Identify|Service change",
        "Examine|Rate reduction",
        "Assess|Attribution",
        "Verify|Financial contribution"
      ]),
      "Investigate competing influences before assigning financial value to the redesigned process"
    ],
    [
      D.flow([
        "Observe|Renewals",
        "Assume|Process caused them",
        "Recognise|AED 180,000"
      ]),
      "Recognise the entire retained revenue claim without examining pricing or attribution"
    ],
    [
      D.flow([
        "Observe|Rate reduction",
        "Reject|Process contribution",
        "Report|No benefit"
      ]),
      "Treat the pricing change as proof that the redesigned process contributed nothing"
    ],
    [
      D.flow([
        "Record|AED 180,000",
        "Ignore|Renewal reasons",
        "Treat|Revenue as profit",
        "Close|Review"
      ]),
      "Treat reported retained revenue as verified profit without investigating its causes"
    ]
  ],
  "Qasr's two corporate renewals occurred during a period when corporate rates also fell by four percent. The redesigned arrival process may have contributed to retention, but pricing provides another plausible explanation. A defensible assessment investigates both influences and examines the actual financial contribution. The Week 13 material does not support automatic recognition or rejection of the full AED 180,000 claim.");
 
OR("W13O1d-10", "W13O1d", 2,
  "Arrange the steps the worked example uses to separate the redesign from the late-payment penalty.",
  ["Name the late-payment penalty openly as a second possible cause", "Find a group of accounts the penalty did not touch, such as exempt accounts", "Compare the change in debtor days in that group against the whole population", "Credit the redesign with the difference and state the uncertainty that remains"],
  "The worked example begins by naming the confound before anyone else does. You then look for a population the penalty did not reach, because only that group can show what the redesign did on its own. Comparing that group with the whole gives the difference you can attribute, and you report it together with the uncertainty that is left.");
 
MA("W13O1d-11", "W13O1d", 2,
  "Match each attribution concept to its meaning in a benefits review.",
  [
    [
      "Observed improvement",
      "The measured difference between the original performance position and the later result"
    ],
    [
      "Attribution",
      "The assessment of how much of an outcome can reasonably be credited to a particular intervention"
    ],
    [
      "Competing cause",
      "Another change that may have influenced the same measured outcome"
    ],
    [
      "Comparison group",
      "A sufficiently similar group used to investigate the effects of different interventions"
    ],
    [
      "Unresolved uncertainty",
      "A limitation that prevents the available evidence from establishing a fully defensible causal contribution"
    ]
  ],
  "The Week 13 Realize Value discussion requires managers to distinguish what changed from why it changed. Observed improvement establishes the measured difference, while attribution concerns the contribution of a particular intervention. Competing causes may explain part of the same result, and suitable comparison groups can strengthen the investigation. Where evidence remains insufficient, uncertainty should be reported rather than replaced with an unsupported conclusion.");
 
MA("W13O1d-12", "W13O1d", 3,
  "Match each observation from the debtor-days and Qasr examples to its defensible interpretation.",
  [
    [
      "Debtor days fell from 47 to 31",
      "The measured collection period improved by 16 days"
    ],
    [
      "A late-payment penalty was introduced alongside redesigned collections",
      "Another intervention may have influenced customer payment behaviour"
    ],
    [
      "Two corporate renewals occurred at Qasr",
      "Customer retention was observed, but its causes still require investigation"
    ],
    [
      "Qasr reduced corporate rates by four percent",
      "A pricing change provides another plausible influence on renewal decisions"
    ],
    [
      "Qasr claims AED 180,000 in retained corporate revenue",
      "The reported amount requires attribution and financial assessment before recognition"
    ]
  ],
  "The debtor-days example establishes an observed 16-day improvement but includes a competing intervention through the late-payment penalty. Qasr's two corporate renewals similarly represent an observed outcome whose causes require examination because corporate rates also changed. The Week 13 material therefore requires attribution evidence before treating the entire AED 180,000 retained revenue claim as financially realised value from the redesigned process.");

// W13O2a - The gap between promised and tracked
// Lesson l2: Proving what really changed
// Outcome O2 [K2]: Evaluate why expected benefits frequently
// cannot be located after implementation.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O2a-01", "W13O2a", 1,
  "Qasr promised AED 620,000 in annual benefits but currently tracks AED 505,000. What is the most defensible interpretation of the AED 115,000 difference?",
  [
    "It is an unexplained difference requiring investigation of timing, management actions and potentially unrealised expectations",
    "It is entirely a timing difference because seven properties entered operation within the last four months",
    "It represents financial savings already achieved but omitted from the programme's tracking records",
    "It proves that the redesigned arrival process failed to produce any operational improvement"
  ],
  "The difference between AED 620,000 promised and AED 505,000 tracked is AED 115,000. The Week 13 benefits review distinguishes delayed benefits, benefits requiring further management action and expectations that may never be realised. The available Qasr evidence does not establish how much of the difference belongs to any explanation. The tracked amount also requires financial verification.");
 
M("W13O2a-02", "W13O2a", 2,
  "The programme director argues that recent property deployments explain Qasr's benefits gap. What evidence would make this explanation more credible?",
  [
    "Deployment dates, agreed benefit measurement periods and observed progress supporting the expected timing of realisation",
    "The original annual benefits estimate without further evidence because the business case already established the expected value",
    "Confirmation that the redesigned process is operating because successful implementation guarantees eventual financial realisation",
    "An assurance that all missing benefits will appear later without identifying when or how they should become measurable"
  ],
  "Seven of Qasr's fourteen properties went live within the last four months, making timing a relevant consideration. However, recent deployment does not prove that missing benefits will eventually materialise. The Week 13 Realize Value discussion requires managers to examine the measurement period, emerging outcomes and evidence supporting the expected timing of benefits.");
 
M("W13O2a-03", "W13O2a", 3,
  "A redesigned process releases employee capacity, but the organisation continues paying the same salaries. What is the most appropriate management response?",
  [
    "Determine how the released capacity can create measurable value and verify any resulting financial consequence before recognising a saving",
    "Recognise the full expected labour saving because reduced processing effort automatically removes equivalent salary expenditure",
    "Classify the benefit as permanently impossible because released capacity can never create economic value",
    "Increase the original labour estimate because the process has demonstrated that employees can complete work more efficiently"
  ],
  "Released capacity can represent a genuine operational improvement without reducing existing payroll expenditure. The Week 13 discussion explains that some benefits require management decisions before their economic value can be captured. An accountable manager should determine how the capacity will be used and establish the resulting value. Potential future actions must not be reported as financial savings already realised.");
 
TF("W13O2a-04", "W13O2a", 1,
  "The fact that seven of Qasr's fourteen properties went live within the last four months makes benefit timing relevant, but does not establish that the entire reported gap will eventually disappear.",
  true,
  "This statement is true. Recent deployment may affect when benefits become measurable and financially realisable. However, the Week 13 benefits review requires evidence supporting the timing explanation. It does not establish that all missing benefits are delayed or that the original financial expectations will necessarily be achieved.");
 
TF("W13O2a-05", "W13O2a", 2,
  "If a benefit has not appeared in the operating accounts, management should automatically classify it as delayed rather than reconsider the original business case assumptions.",
  false,
  "This statement is false. A missing benefit may be delayed, may require additional management action or may depend on an unrealistic original assumption. The Week 13 Realize Value discussion requires investigation of these different explanations. Automatically classifying every shortfall as delayed would conceal uncertainty and could preserve financial expectations that the evidence no longer supports.");
 
DR("W13O2a-06", "W13O2a", 1,
  "Qasr's original annual benefits promise was AED 620,000 and its currently tracked amount is AED 505,000. The arithmetic difference is {1}, while the financial value actually realised remains {2}.",
  [
    ["AED 115,000", "AED 85,000", "AED 180,000"],
    ["subject to verification", "equal to the original promise", "guaranteed by the tracked amount"]
  ],
  "Subtracting AED 505,000 from AED 620,000 produces an arithmetic difference of AED 115,000. However, neither figure independently establishes the financially realised value. The Week 13 benefits review requires supporting evidence, attribution and financial reconciliation before the organisation can defend the amount actually realised.");
 
DR("W13O2a-07", "W13O2a", 3,
  "A benefit that may emerge after an appropriate measurement period is potentially {1}, while a benefit that depends on an unsupported original assumption may be {2}.",
  [
    ["delayed", "financially verified", "permanently realised"],
    ["unrealisable as originally estimated", "automatically attributable", "already recognised in expenditure"]
  ],
  "A delayed benefit may require additional time before its effects become measurable. However, an expected benefit may also depend on assumptions that actual operating conditions do not support. The Week 13 discussion requires management to distinguish timing from potentially unrealisable expectations instead of treating every missing benefit as guaranteed future value.");
 
V("W13O2a-08", "W13O2a", 2,
  "Which diagram shows the three kinds of shortfall that Qasr should look for inside its benefits gap?",
  [
    [D.flow(["Late, not absent", "Action not yet taken", "Never realisable"]), "Some value is late, some waits on an action, and some was never realisable"],
    [D.flow(["Late, not absent", "Already realised", "Never realisable"]), "Part of the gap is treated as value that has already been realised"],
    [D.flow(["Late, not absent", "Action not yet taken", "Favourable recalculation"]), "The gap is partly closed by recalculating the figures in the programme's favour"],
    [D.flow(["Implementation failure", "No operational change", "No business value"]), "The whole gap is read as proof that the redesign achieved nothing"]
  ],
  "The slides describe three kinds of shortfall: benefits that are late rather than absent, benefits that wait on an action nobody has taken, and benefits that were never realisable. A gap is by definition value not yet realised, so it cannot already be realised. A favourable recalculation is exactly what the slides warn against, and the gap alone does not prove that the redesign failed.");
 
V("W13O2a-09", "W13O2a", 3,
  "Which diagram shows the most defensible process for reviewing Qasr's difference between promised and tracked benefits?",
  [
    [
      D.flow([
        "Identify|Difference",
        "Investigate|Causes",
        "Examine|Evidence",
        "Assign|Actions",
        "Report|Uncertainty"
      ]),
      "Investigate the difference, test explanations and preserve unresolved uncertainty"
    ],
    [
      D.flow([
        "Identify|Difference",
        "Assume|Timing",
        "Recognise|Future benefits",
        "Close|Review"
      ]),
      "Treat the entire difference as delayed without supporting evidence"
    ],
    [
      D.flow([
        "Identify|Difference",
        "Reject|All benefits",
        "Declare|Process failure",
        "Close|Programme"
      ]),
      "Treat the difference as proof that no operational or financial value was created"
    ],
    [
      D.flow([
        "Identify|Difference",
        "Apply|Arbitrary percentage",
        "Approve|Revised total",
        "Ignore|Assumptions"
      ]),
      "Replace the original claim with an unsupported numerical adjustment"
    ]
  ],
  "A defensible benefits review begins by identifying the difference between expected and reported value. Management then investigates possible causes, examines supporting evidence and identifies actions that may be needed. The Week 13 discussion requires unresolved uncertainty to remain visible rather than assigning the entire difference to timing, declaring complete failure or inventing a revised financial amount.");
 
OR("W13O2a-10", "W13O2a", 2,
  "Arrange these activities in the logical sequence for investigating Qasr's benefits gap and preparing a defensible management report.",
  [
    "Establish the original promised amount and the currently tracked amount",
    "Calculate the arithmetic difference between the two reported figures",
    "Investigate possible explanations for the difference",
    "Examine evidence supporting or challenging each explanation",
    "Identify justified management actions for unresolved benefits",
    "Report the supported findings and remaining uncertainty"
  ],
  "The Week 13 benefits review requires management to establish the difference before explaining it. Qasr's original promise and tracked amount provide the figures needed for the arithmetic comparison. Possible explanations must then be investigated and tested against evidence before actions can be justified. The final report should distinguish supported findings from unresolved uncertainty rather than treating the gap as automatically delayed or financially realised.");
 
MA("W13O2a-11", "W13O2a", 2,
  "Match each possible explanation for a missing benefit to the evidence or management response it requires.",
  [
    [
      "Delayed realisation",
      "Examine deployment timing, measurement periods and emerging results"
    ],
    [
      "Released capacity not captured",
      "Determine how available resources will create measurable organisational value"
    ],
    [
      "Unrealistic original assumption",
      "Reconsider the expected benefit using observed operating conditions"
    ],
    [
      "Uncertain attribution",
      "Investigate alternative influences before assigning financial credit to BPM"
    ],
    [
      "Financial reconciliation gap",
      "Compare reported benefits with evidence of actual economic consequences"
    ]
  ],
  "Different explanations for missing benefits require different investigations. Timing requires evidence about measurement periods, while uncaptured capacity requires management action. Unsupported assumptions require reconsideration, uncertain attribution requires examination of competing causes, and financial reconciliation requires evidence connecting reported outcomes with actual economic value. The Week 13 Realize Value discussion treats these as distinct problems rather than interchangeable reasons for a shortfall.");
 
MA("W13O2a-12", "W13O2a", 3,
  "Match each Qasr case observation to the most defensible implication for investigating the benefits gap.",
  [
    [
      "AED 620,000 promised and AED 505,000 tracked",
      "The reported amounts establish an arithmetic difference of AED 115,000"
    ],
    [
      "Seven properties went live within the last four months",
      "Recent deployment makes benefit measurement timing relevant but does not guarantee realisation"
    ],
    [
      "Headcount fell by four rather than the eleven assumed",
      "The labour estimate requires examination against actual staffing and expenditure evidence"
    ],
    [
      "Corporate rates fell by four percent during renewal",
      "Pricing provides another possible influence on the retained revenue claim"
    ],
    [
      "The AED 85,000 avoided penalty remains contingent on enforcement",
      "The claimed financial saving requires evidence of credible regulatory exposure"
    ]
  ],
  "Qasr's benefits gap cannot be explained by the arithmetic difference alone. Recent deployment raises a timing question, while the staffing figures challenge the original labour assumptions. The corporate rate reduction complicates attribution of retained revenue, and contingent enforcement limits automatic recognition of the avoided penalty. The Week 13 case requires each claim to be examined using evidence appropriate to its economic meaning before management reports financially realised value.");

// W13O2b - Why real improvements disappear from the accounts
// Lesson l2: Proving what really changed
// Outcome O2 [K2]: Evaluate why expected benefits frequently
// cannot be located after implementation.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O2b-01", "W13O2b", 1,
  "A redesigned process reduces employee effort, but the organisation continues paying the same salaries. Why might the expected financial benefit remain missing?",
  [
    "The process released capacity, but management has not demonstrated an attributable reduction in expenditure or another economic benefit",
    "The process cannot have improved because employee numbers and salaries remain unchanged",
    "The released employee time must already represent a financial saving because fewer working hours are needed",
    "The implementation team must recognise the original labour estimate regardless of subsequent staffing decisions"
  ],
  "The Week 13 Realize Value discussion distinguishes operational improvement from financial realisation. Employees may complete existing work more efficiently while remaining on the same payroll. Released capacity can be valuable, but its economic consequences require management action and supporting evidence. Reduced effort alone does not establish that salary expenditure has been removed.");
 
M("W13O2b-02", "W13O2b", 2,
  "A BPM project closes successfully, but nobody remains responsible for converting released capacity into measurable business value. What organisational problem does this illustrate?",
  [
    "A benefits ownership gap between delivering process capability and capturing its economic consequences",
    "A technical implementation failure because a project cannot close while any financial benefit remains uncertain",
    "A measurement problem that finance alone must resolve without involving operational management",
    "A strategic success because closing the project transfers every expected financial benefit into the operating budget"
  ],
  "The Week 13 benefits management discussion explains that implementation teams deliver redesigned process capability, while business managers control many decisions needed to capture value. Without an accountable business owner, an operational improvement may remain financially unrealised. Project completion therefore does not replace responsibility for delivering and demonstrating the expected benefit.");
 
M("W13O2b-03", "W13O2b", 3,
  "Why might a BPM programme continue reporting optimistic benefits even when the expected financial results cannot be demonstrated?",
  [
    "Managers may be rewarded for completing implementation and may be reluctant to acknowledge disappointing financial outcomes",
    "Every benefit recorded in a programme report must automatically appear as an equivalent saving in the operating accounts",
    "Financial reconciliation becomes unnecessary once the redesigned process has entered normal operations",
    "Unverified benefits become realised automatically when the original programme sponsor changes responsibilities"
  ],
  "The Week 13 discussion identifies organisational incentives and reporting culture as possible reasons that benefits remain difficult to locate. Managers may focus on implementation milestones rather than realised outcomes, while reluctance to report disappointing results can preserve unsupported estimates. Credible benefits governance requires honest reporting, accountable ownership and evidence of actual financial consequences.");
 
TF("W13O2b-04", "W13O2b", 1,
  "A BPM programme can achieve genuine operational improvement while failing to realise the financial savings originally expected.",
  true,
  "This statement is true. The Week 13 Realize Value discussion distinguishes operational efficiency from financially realised value. A redesigned process may release employee capacity or improve service without reducing actual expenditure. The organisation must demonstrate the economic consequences before claiming that the original financial benefit has been realised.");
 
TF("W13O2b-05", "W13O2b", 2,
  "Once the implementation team has completed its work, responsibility for any unrealised business benefits should end because the process is already operational.",
  false,
  "This statement is false. The Week 13 benefits management discussion requires accountability to continue after implementation. Business managers must remain responsible for decisions that capture value, while finance examines the financial evidence. Ending accountability at project closure can leave genuine improvements without an owner responsible for realising their expected benefits.");
 
DR("W13O2b-06", "W13O2b", 1,
  "When managers are rewarded for {1} rather than realised outcomes, missing benefits go uninvestigated, and reluctance to report shortfalls keeps {2} in the reports.",
  [["implementation milestones", "verified savings", "agreed baselines"], ["optimistic estimates", "reconciled amounts", "measured outcomes"]],
  "If success is defined as reaching implementation milestones, nobody has a reason to look for benefits that never arrived. When reporting a shortfall feels risky, optimistic estimates stay in the reports instead of being challenged. Both problems are organisational rather than technical, which is why the slides say the phase must be designed at the start.");
 
DR("W13O2b-07", "W13O2b", 3,
  "When the implementation team disbands without preserving benefit assumptions, the organisation risks losing {1}; when nobody accepts responsibility for capturing value, it faces {2}.",
  [
    ["benefits traceability", "financial realisation", "operational deployment"],
    ["an ownership gap", "a verified saving", "a completed baseline"]
  ],
  "Benefits traceability connects original objectives and assumptions with subsequent measurements and evidence. Disbanding the implementation team without preserving that information can make later verification difficult. An ownership gap arises when no accountable business manager remains responsible for converting operational improvements into measurable value. Both problems can prevent expected benefits from being demonstrated.");
 
V("W13O2b-08", "W13O2b", 2,
  "Which diagram best explains how an operational improvement can become a financially realised benefit?",
  [
    [
      D.flow([
        "Process|Improvement",
        "Released|Capacity",
        "Business|Decision",
        "Measured|Outcome",
        "Financial|Verification"
      ]),
      "Business management converts operational improvement into measurable value supported by financial evidence"
    ],
    [
      D.flow([
        "Process|Improvement",
        "Released|Capacity",
        "Assume|Salary reduction",
        "Recognise|Full saving"
      ]),
      "Released capacity is automatically treated as removed salary expenditure"
    ],
    [
      D.flow([
        "Process|Implemented",
        "Project|Closed",
        "Assume|Benefits realised",
        "Stop|Measurement"
      ]),
      "Project closure is treated as proof that financial benefits have materialised"
    ],
    [
      D.flow([
        "Original|Estimate",
        "Ignore|Actual expenditure",
        "Repeat|Expected saving",
        "Approve|Benefit"
      ]),
      "The original financial estimate is recognised without examining actual operating consequences"
    ]
  ],
  "The Week 13 Realize Value discussion explains that process improvement can release capacity without automatically removing expenditure. Business managers may need to make decisions about how that capacity will be used. The resulting economic outcome must then be measured and financially verified. The other diagrams incorrectly substitute assumptions, project closure or original estimates for evidence of realised value.");
 
V("W13O2b-09", "W13O2b", 3,
  "Which diagram best represents the responsibilities needed to prevent benefits from disappearing after implementation?",
  [
    [
      D.lanes(["Programme team", "Business management", "Finance"], [[0, "Deliver process capability"], [0, "Preserve implementation evidence"], [1, "Own benefit realisation"], [1, "Make resource decisions"], [2, "Examine financial evidence"], [2, "Reconcile reported value"]]),
      "Programme delivery, business ownership and financial verification remain distinct but connected responsibilities"
    ],
    [
      D.lanes(["Programme team", "Business management", "Finance"], [[0, "Deliver process capability"], [0, "Own every future business decision"], [1, "Observe implementation"], [1, "Avoid benefit accountability"], [2, "Accept reported estimates"], [2, "Avoid reconciliation"]]),
      "The programme team retains all responsibility while business management and finance avoid accountability"
    ],
    [
      D.lanes(["Programme team", "Business management", "Finance"], [[0, "Close implementation"], [0, "Discard benefit assumptions"], [1, "Continue existing arrangements"], [1, "Ignore released capacity"], [2, "Recognise original estimates"], [2, "Skip expenditure evidence"]]),
      "The organisation removes the information and responsibilities needed to demonstrate financial realisation"
    ],
    [
      D.lanes(["Programme team", "Business management", "Finance"], [[0, "Report technical completion"], [0, "Stop benefits monitoring"], [1, "Assume savings occurred"], [1, "Avoid corrective decisions"], [2, "Record programme claims"], [2, "Exclude financial scrutiny"]]),
      "Implementation completion replaces continuing benefits ownership and independent financial examination"
    ]
  ],
  "The Week 13 benefits discussion distinguishes the responsibilities of programme delivery, operational management and finance. The programme team provides process capability and supporting information. Business management remains accountable for decisions that deliver expected outcomes, while finance examines whether claimed monetary benefits are supported by financial evidence. These complementary responsibilities help prevent genuine improvements from becoming financially unverified claims.");
 
OR("W13O2b-10", "W13O2b", 2,
  "Arrange these steps for turning released front-desk time into a benefit that can be defended.",
  ["Measure how much employee time the redesign actually releases", "Have the business owner decide where that time is redeployed", "Measure the result of the redeployed work against its baseline", "Have finance verify any financial consequence before it is reported"],
  "You cannot redeploy time until you know how much was released. Only the business owner can then decide where the time goes, because the programme cannot make that decision. The redeployed work must be measured before anyone can value it, and finance verifies the financial consequence last, before anything is reported as realised.");
 
MA("W13O2b-11", "W13O2b", 2,
  "Match each organisational problem to the reason it can prevent expected benefits from becoming visible.",
  [
    [
      "Unassigned benefit ownership",
      "Nobody remains accountable for converting operational improvement into business value"
    ],
    [
      "Implementation team disbands",
      "Knowledge of original assumptions and supporting evidence may be lost"
    ],
    [
      "Sponsor turnover",
      "Continuity of the original benefit commitments may be disrupted"
    ],
    [
      "Delivery-focused incentives",
      "Managers may prioritise implementation milestones over realised outcomes"
    ],
    [
      "Reluctance to report shortfalls",
      "Unsupported estimates may remain in reports instead of being investigated"
    ]
  ],
  "The Week 13 discussion identifies organisational reasons that expected benefits may remain missing after implementation. Ownership gaps prevent necessary management action, while team closure and sponsor turnover can weaken continuity and traceability. Delivery-focused incentives may direct attention toward project completion, and reluctance to acknowledge shortfalls can preserve optimistic claims. Benefits governance must address these problems through accountability, retained evidence and honest reporting.");
 
MA("W13O2b-12", "W13O2b", 3,
  "Match each Qasr benefits review concern to the management responsibility or evidence needed to address it.",
  [
    [
      "AED 240,000 front-desk labour claim",
      "Examine actual staffing expenditure and the economic consequences of released capacity"
    ],
    [
      "Four fewer employees rather than eleven assumed",
      "Reconcile the original staffing assumption with observed headcount and financial evidence"
    ],
    [
      "Programme director emphasises recent deployment",
      "Investigate whether the benefit measurement period supports a timing explanation"
    ],
    [
      "Finance director questions the reported value",
      "Examine whether tracked benefits reconcile with actual financial consequences"
    ],
    [
      "Benefits remain unresolved after implementation",
      "Maintain accountable business ownership and identify justified follow-up actions"
    ]
  ],
  "Qasr's labour claim requires evidence connecting actual staffing decisions with expenditure rather than relying on the original estimate. The difference between assumed and observed headcount challenges the financial calculation. Recent deployment may affect timing, but it does not guarantee realisation. The finance director's concerns require reconciliation, while unresolved claims need continuing business ownership. The Week 13 Realize Value discussion treats these as distinct responsibilities needed to demonstrate actual value.");

// W13O2c - Four fewer employees, eleven assumed
// Lesson l3: The benefits nobody can find
// Outcome O2 [K2]: Evaluate why expected benefits frequently
// cannot be located after implementation.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O2c-01", "W13O2c", 1,
  "Qasr's labour benefit estimate assumed eleven fewer employees, but actual headcount fell by four. What does this difference establish?",
  [
    "The original staffing assumption was not achieved, and the financial value of the actual reduction requires verification",
    "Exactly four elevenths of the original AED 240,000 labour benefit has been financially realised",
    "The redesigned arrival process produced no operational improvement because the assumed reduction was not achieved",
    "The remaining seven assumed reductions will necessarily occur once every property has operated for a full year"
  ],
  "The Week 13 Qasr case reports an assumed reduction of eleven employees and an observed reduction of four. This establishes a difference between expected and actual staffing outcomes. It does not independently establish the monetary value realised. Employment costs, staffing decisions and actual expenditure must be examined before recognising a financial labour benefit.");
 
M("W13O2c-02", "W13O2c", 2,
  "A manager calculates Qasr's realised labour saving as AED 240,000 multiplied by four divided by eleven. Why is this calculation insufficient?",
  [
    "The calculation assumes proportional employment costs and benefit assumptions that have not been established by the available evidence",
    "The calculation is invalid because headcount changes can never contribute to financial labour savings",
    "The calculation proves that all employees have identical costs and therefore establishes the exact financial saving",
    "The calculation must use fourteen properties instead of eleven employees because deployment coverage determines payroll expenditure"
  ],
  "A proportional calculation produces approximately AED 87,273, but this is not a verified Qasr benefit. The original AED 240,000 estimate may depend on employment costs and assumptions that are not established by the headcount figures alone. The Week 13 Realize Value discussion requires actual financial evidence rather than an unsupported conversion of staffing ratios into realised savings.");
 
M("W13O2c-03", "W13O2c", 3,
  "Qasr's redesigned arrival process may have released employee capacity without achieving the originally assumed staffing reduction. What should an accountable business manager do?",
  [
    "Examine how the released capacity is used and establish any attributable economic consequence before claiming additional value",
    "Recognise the full original labour saving because improved employee productivity automatically removes equivalent payroll expenditure",
    "Reduce staffing until the original numerical assumption is achieved regardless of operational requirements and service needs",
    "Treat all released capacity as worthless because it has not automatically produced the expected reduction in headcount"
  ],
  "Released capacity can represent genuine operational improvement even when staffing reductions differ from the business case. The Week 13 discussion requires business management to determine how that capacity can create measurable organisational value. Any financial benefit must be supported by actual economic consequences. The original estimate does not justify unsupported staffing decisions or automatic recognition of savings.");
 
TF("W13O2c-04", "W13O2c", 1,
  "Qasr's observed reduction of four employees establishes that the original assumption of eleven fewer employees was not fully achieved, but does not independently establish the realised monetary saving.",
  true,
  "This statement is true. The Week 13 case distinguishes the staffing assumption from the observed headcount change. Four fewer employees is an operational staffing observation. The monetary benefit requires evidence of actual employment expenditure and attribution to the redesigned process. The difference in employee numbers cannot independently establish the amount financially realised.");
 
TF("W13O2c-05", "W13O2c", 2,
  "Because seven Qasr properties went live within the last four months, management can recognise the remaining assumed labour savings as guaranteed future benefits.",
  false,
  "This statement is false. Recent deployment makes the timing of benefits relevant, but it does not guarantee additional staffing reductions or financial savings. The Week 13 Realize Value discussion requires evidence supporting expected realisation. Management must not recognise possible future staffing decisions as savings already achieved.");
 
DR("W13O2c-06", "W13O2c", 1,
  "Qasr's original labour estimate assumed a reduction of {1} employees, while the observed headcount reduction was {2} employees.",
  [
    ["eleven", "four", "seven"],
    ["four", "eleven", "fourteen"]
  ],
  "The Week 13 Qasr case states that the original labour benefit assumption involved eleven fewer employees, while actual headcount fell by four. These figures demonstrate that the staffing outcome differed from the original expectation. They do not independently establish how much of the AED 240,000 labour claim was financially realised.");
 
DR("W13O2c-07", "W13O2c", 3,
  "Multiplying the AED 240,000 labour claim by four elevenths gives about {1}, which is {2}.",
  [["AED 87,273", "AED 115,000", "AED 65,455"], ["an illustrative estimate, not a verified saving", "the verified realised labour saving", "the figure finance has already reconciled"]],
  "Four elevenths of AED 240,000 is about AED 87,273. That figure is only an illustration, because it assumes every employee costs the same and that the original calculation holds. A realised saving needs evidence from actual payroll, and nothing in the case shows that finance has reconciled this amount.");
 
V("W13O2c-08", "W13O2c", 2,
  "Which diagram correctly represents Qasr's original staffing assumption and observed headcount reduction?",
  [
    [
      D.bars([
        ["Assumed reduction", 11],
        ["Actual reduction", 4]
      ]),
      "The original assumption involved eleven fewer employees, while the observed reduction was four"
    ],
    [
      D.bars([
        ["Assumed reduction", 4],
        ["Actual reduction", 11]
      ]),
      "The original and observed staffing figures are reversed"
    ],
    [
      D.bars([
        ["Assumed reduction", 11],
        ["Actual reduction", 11]
      ]),
      "The original staffing assumption is shown as fully achieved"
    ],
    [
      D.bars([
        ["Assumed reduction", 14],
        ["Actual reduction", 7]
      ]),
      "The number of properties is incorrectly substituted for the staffing figures"
    ]
  ],
  "The Week 13 Qasr case reports that the original labour benefit assumption involved eleven fewer employees, but actual headcount fell by four. The correct diagram represents these two staffing figures without treating them as verified monetary savings. The other diagrams reverse the figures, assume full achievement or confuse employee reductions with property deployment.");
 
V("W13O2c-09", "W13O2c", 3,
  "Which diagram best represents a defensible assessment of Qasr's AED 240,000 labour benefit claim?",
  [
    [
      D.flow([
        "Original|Labour assumptions",
        "Actual|Staffing changes",
        "Examine|Payroll evidence",
        "Assess|Attribution",
        "Verify|Financial benefit"
      ]),
      "Reconcile the original staffing assumptions with actual expenditure and attributable financial consequences"
    ],
    [
      D.flow([
        "Original|AED 240,000",
        "Divide|By eleven",
        "Multiply|By four",
        "Recognise|Exact saving"
      ]),
      "Treat a proportional headcount calculation as verified financial realisation"
    ],
    [
      D.flow([
        "Process|Improved",
        "Capacity|Released",
        "Assume|Payroll reduced",
        "Approve|Full saving"
      ]),
      "Convert operational efficiency directly into the original financial saving"
    ],
    [
      D.flow([
        "Recent|Deployments",
        "Assume|Future reductions",
        "Recognise|Remaining saving",
        "Close|Review"
      ]),
      "Recognise unverified future staffing reductions as benefits already realised"
    ]
  ],
  "The Week 13 Realize Value discussion requires a connection between the original labour estimate, observed staffing changes and actual financial consequences. Qasr must examine payroll evidence and determine what benefit can reasonably be attributed to the redesigned process. A proportional calculation, released capacity or recent deployment cannot independently establish realised labour savings.");
 
OR("W13O2c-10", "W13O2c", 2,
  "Arrange these steps for testing Qasr's AED 240,000 labour claim.",
  ["Set the eleven-employee assumption beside the actual fall of four", "Examine actual payroll expenditure since the redesign went live", "Judge how much of any change belongs to the redesign", "Report the supported amount and explain the difference that remains"],
  "The comparison of eleven assumed with four actual shows where the claim is weak. Payroll evidence then shows what really left the budget. Only after that can you judge how much of the change the redesign caused, and the report comes last, with the remaining difference explained rather than hidden.");
 
MA("W13O2c-11", "W13O2c", 2,
  "Match each labour benefits concept to its meaning in Qasr's review.",
  [
    [
      "Original staffing assumption",
      "The expected reduction of eleven employees used in the labour benefit estimate"
    ],
    [
      "Observed headcount change",
      "The actual reduction of four employees reported after implementation"
    ],
    [
      "Released capacity",
      "Employee time potentially made available through more efficient arrival processing"
    ],
    [
      "Cost removed",
      "An attributable reduction in actual labour expenditure supported by financial evidence"
    ],
    [
      "Proportional savings estimate",
      "A numerical calculation based on headcount ratios that does not independently verify financial realisation"
    ]
  ],
  "The Week 13 case distinguishes original staffing expectations from observed results. The assumption involved eleven fewer employees, while actual headcount fell by four. Released capacity concerns operational resources made available through efficiency, whereas cost removed requires evidence of actual expenditure reduction. A proportional calculation using staffing numbers alone cannot establish the realised monetary benefit.");
 
MA("W13O2c-12", "W13O2c", 3,
  "Match each proposed management response to the reason it matters when evaluating Qasr's labour claim.",
  [
    [
      "Examine actual payroll expenditure",
      "Determine whether the redesigned process produced an attributable reduction in labour costs"
    ],
    [
      "Investigate released employee capacity",
      "Identify potential organisational value that may exist without a reduction in payroll"
    ],
    [
      "Review the original staffing assumptions",
      "Establish whether the expected financial benefit remains supported by actual operating conditions"
    ],
    [
      "Assign an accountable operational owner",
      "Ensure someone can make justified decisions affecting the use of available resources"
    ],
    [
      "Preserve uncertainty in committee reporting",
      "Avoid presenting unsupported monetary estimates as financially realised savings"
    ]
  ],
  "Qasr's labour claim requires several distinct management responsibilities. Payroll evidence helps establish actual expenditure changes, while released capacity may represent another form of operational value. Reviewing original assumptions explains why the observed staffing outcome differs from expectations. An accountable business owner can consider justified actions, and honest reporting prevents unsupported financial recognition. The Week 13 Realize Value discussion requires these distinctions before the committee can defend the claimed benefit.");

// W13O2d - Two renewals, a rate cut and an avoided fine
// Lesson l3: The benefits nobody can find
// Outcome O2 [K2]: Evaluate why expected benefits frequently
// cannot be located after implementation.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O2d-01", "W13O2d", 1,
  "Qasr reports two corporate renewals and claims AED 180,000 in retained revenue. Corporate rates also fell by four percent. What is the most defensible conclusion?",
  [
    "The renewals are observed outcomes, but the process contribution must be distinguished from the possible influence of lower prices",
    "The entire AED 180,000 is attributable to BPM because the contracts were renewed after the redesigned process entered operation",
    "The four percent rate reduction proves that improved arrival processing contributed nothing to either renewal",
    "The reported AED 180,000 represents verified additional profit because the corporate customers continued their contracts"
  ],
  "The Week 13 Qasr case identifies two corporate renewals and a four percent rate reduction during the renewal quarter. The redesigned arrival process may have contributed to retention, but pricing provides another plausible influence. The renewals establish an observed commercial outcome, not the precise contribution attributable to BPM. Financial recognition also requires examination of actual revenue and relevant costs.");
 
M("W13O2d-02", "W13O2d", 2,
  "Qasr claims AED 85,000 from an avoided regulatory penalty, but enforcement remains contingent. Why should the committee question automatic recognition?",
  [
    "The absence of a penalty does not establish that enforcement would otherwise have occurred or that the entire amount was genuinely avoided",
    "The penalty must be recognised because every possible regulatory exposure becomes a realised saving when no fine is imposed",
    "The claim must be rejected as having no organisational value because risk reduction cannot benefit an organisation",
    "The avoided penalty should be treated as retained corporate revenue because both claims have monetary values"
  ],
  "The Week 13 Realize Value discussion distinguishes reduced regulatory exposure from realised financial savings. A contingent penalty represents possible expenditure, not a cost that would certainly have occurred. Qasr needs credible evidence about the regulatory exposure and the process contribution before recognising an avoided financial cost. Genuine risk reduction may still be valuable even when its monetary value remains uncertain.");
 
M("W13O2d-03", "W13O2d", 3,
  "Why is the distinction between retained revenue and financial contribution important when evaluating Qasr's corporate renewals?",
  [
    "Retained revenue describes income from continued business, while financial contribution also depends on relevant costs and credible attribution",
    "Retained revenue and profit are identical whenever customers renew their contracts after a process improvement",
    "Financial contribution can be calculated by ignoring pricing changes because customer retention already proves BPM attribution",
    "Retained revenue has no economic significance unless every renewed contract produces exactly the same amount of additional profit"
  ],
  "Revenue describes income associated with business activity, while financial contribution considers the economic consequences of generating that income. Qasr's four percent corporate rate reduction may affect the value of retained business. The Week 13 discussion therefore requires evidence of actual financial contribution and the portion reasonably attributable to the redesigned arrival process. Gross retained revenue cannot automatically be treated as equivalent realised profit.");
 
TF("W13O2d-04", "W13O2d", 1,
  "The existence of two corporate renewals does not independently establish that Qasr's redesigned arrival process caused the customers to renew.",
  true,
  "This statement is true. The Week 13 case identifies two corporate renewals, but corporate rates also fell by four percent during the renewal quarter. Both service improvement and pricing may have influenced customer decisions. The programme must investigate attribution before assigning the entire retained revenue claim to the redesigned process.");
 
TF("W13O2d-05", "W13O2d", 2,
  "Because Qasr did not incur the claimed regulatory penalty, the full AED 85,000 can automatically be reported as financially realised savings.",
  false,
  "This statement is false. The Week 13 case states that the avoided regulatory penalty remains contingent on enforcement. The absence of a penalty does not prove that enforcement would otherwise have occurred. A defensible financial claim requires evidence of credible exposure and the contribution of the redesigned process. Reduced risk should not automatically be converted into a realised monetary saving.");
 
DR("W13O2d-06", "W13O2d", 1,
  "Keeping two corporate accounts at a lower rate is evidence of {1}, while the economic value left after relevant costs is the {2}.",
  [["retained revenue", "avoided penalty", "released capacity"], ["financial contribution", "regulatory exposure", "baseline position"]],
  "The two renewals show that revenue was retained, which is an observed commercial outcome. Because the rate was cut by four percent in the same quarter, the value of that business may be lower than before. The financial contribution is what remains after relevant costs, so it has to be assessed separately from the retained revenue figure.");
 
DR("W13O2d-07", "W13O2d", 3,
  "Qasr's AED 85,000 avoided penalty claim concerns a possible {1}, while demonstrating a realised saving requires a credible {2} showing what would reasonably have happened without the improvement.",
  [
    ["regulatory exposure", "retained revenue stream", "labour capacity reduction"],
    ["counterfactual", "implementation milestone", "staffing estimate"]
  ],
  "A regulatory exposure concerns the possibility of an undesirable enforcement outcome. A counterfactual describes what would reasonably have happened without the intervention. Because Qasr's penalty remains contingent on enforcement, the programme cannot automatically treat the entire possible amount as realised savings. The Week 13 discussion requires evidence supporting the exposure and the financial consequence claimed.");
 
V("W13O2d-08", "W13O2d", 2,
  "Which diagram best represents the attribution problem in Qasr's corporate renewals?",
  [
    [
      D.flow([
        "Arrival|Process improvement",
        "Corporate|Rate reduction",
        "Observed|Renewals",
        "Investigate|Contributions"
      ]),
      "Service improvement and pricing may both influence the observed corporate renewals"
    ],
    [
      D.flow([
        "Arrival|Process improvement",
        "Observed|Renewals",
        "Assign|Full BPM credit"
      ]),
      "The entire retention outcome is attributed to BPM without examining the pricing change"
    ],
    [
      D.flow([
        "Corporate|Rate reduction",
        "Observed|Renewals",
        "Reject|Process contribution"
      ]),
      "The pricing change is treated as proof that the redesigned process contributed nothing"
    ],
    [
      D.flow([
        "Reported|AED 180,000",
        "Assume|Full attribution",
        "Recognise|Equivalent profit"
      ]),
      "The retained revenue claim is treated as verified profit without examining attribution or costs"
    ]
  ],
  "Qasr's two corporate renewals occurred during a period when corporate rates also fell by four percent. The redesigned arrival process may have supported retention, but pricing offers another plausible explanation. The Week 13 Realize Value discussion therefore requires examination of competing influences before the programme can defend its attributed financial contribution. The other diagrams assume unsupported causal or financial conclusions.");
 
V("W13O2d-09", "W13O2d", 3,
  "Which diagram best represents the evidence needed to assess Qasr's avoided regulatory penalty claim?",
  [
    [
      D.flow([
        "Possible|Regulatory exposure",
        "Examine|Enforcement likelihood",
        "Assess|Process contribution",
        "Evaluate|Avoided expenditure",
        "Report|Supported value"
      ]),
      "Investigate credible exposure and the intervention's contribution before recognising an avoided financial cost"
    ],
    [
      D.flow([
        "Possible|Penalty",
        "Observe|No enforcement",
        "Recognise|AED 85,000"
      ]),
      "Treat the absence of enforcement as proof that the entire possible penalty was avoided"
    ],
    [
      D.flow([
        "Improved|Compliance",
        "Assume|Certain penalty",
        "Recognise|Full saving"
      ]),
      "Assume enforcement would certainly have occurred without the process improvement"
    ],
    [
      D.flow([
        "Contingent|Exposure",
        "Ignore|Risk reduction",
        "Declare|No organisational value"
      ]),
      "Reject the possibility of valuable risk reduction because the monetary saving remains uncertain"
    ]
  ],
  "The Week 13 case identifies an AED 85,000 avoided regulatory penalty claim whose enforcement remains contingent. A defensible assessment requires evidence of credible exposure, the likelihood or conditions of enforcement and the process contribution. Reduced regulatory risk may be valuable, but the full possible penalty cannot automatically be recognised as a realised financial saving. The correct diagram preserves this distinction.");
 
OR("W13O2d-10", "W13O2d", 2,
  "Arrange these steps for testing Qasr's AED 180,000 retained revenue claim.",
  ["Record the two renewals as the observed outcome", "Gather evidence on why each account decided to renew", "Use that evidence to separate the service effect from the rate cut", "Assess the financial contribution of the share credited to the redesign"],
  "You start from what was observed, the two renewals. Evidence about the reasons for renewing must come before you can separate the service effect from the four percent rate cut. Only the share credited to the redesign is then valued, so the financial assessment comes last.");
 
MA("W13O2d-11", "W13O2d", 2,
  "Match each benefits assessment concept to its meaning.",
  [
    [
      "Observed retention",
      "Evidence that customers continued their commercial relationships"
    ],
    [
      "Attribution",
      "Assessment of how much of an outcome can reasonably be credited to the redesigned process"
    ],
    [
      "Financial contribution",
      "The economic value of business activity after considering relevant financial consequences"
    ],
    [
      "Contingent regulatory exposure",
      "A possible financial consequence that depends on uncertain enforcement conditions"
    ],
    [
      "Counterfactual",
      "A defensible account of what would reasonably have happened without the intervention"
    ]
  ],
  "The Week 13 Realize Value discussion distinguishes observed commercial outcomes from attributable economic value. Retention establishes that business continued, while attribution concerns the process contribution. Financial contribution requires consideration of relevant costs. A contingent regulatory exposure is not automatically a realised cost, and a credible counterfactual helps assess what expenditure the improvement may genuinely have prevented.");
 
MA("W13O2d-12", "W13O2d", 3,
  "Match each Qasr case observation or claim to the evidence needed for a defensible benefits assessment.",
  [
    [
      "Two corporate renewals",
      "Evidence about customer decisions and the reasons for continued business"
    ],
    [
      "Four percent corporate rate reduction",
      "Assessment of how pricing may have influenced renewal decisions"
    ],
    [
      "AED 180,000 retained revenue claim",
      "Attribution evidence and examination of actual financial contribution"
    ],
    [
      "AED 85,000 avoided regulatory penalty claim",
      "Evidence supporting credible regulatory exposure and avoided expenditure"
    ],
    [
      "Penalty contingent on enforcement",
      "Explicit recognition that the full possible amount is not automatically a realised saving"
    ]
  ],
  "Qasr's corporate renewals require investigation because improved arrival processing and lower corporate rates may both have influenced customer decisions. The AED 180,000 retained revenue claim therefore needs attribution and financial assessment. The AED 85,000 avoided penalty claim requires evidence of credible regulatory exposure because enforcement remains contingent. The Week 13 benefits review requires different evidence tests for these claims rather than treating their reported monetary amounts as equally verified financial benefits.");

// W13O2e - Six hundred and twenty, or five hundred and five
// Lesson l3: The benefits nobody can find
// Outcome O2 [K2]: Evaluate why expected benefits frequently
// cannot be located after implementation.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O2e-01", "W13O2e", 1,
  "Qasr's business case promised AED 620,000 annually, while the programme currently tracks AED 505,000. Which statement should the audit committee accept?",
  [
    "The reported difference is AED 115,000, but its causes and the financially verified benefit remain unresolved",
    "The AED 505,000 tracked amount is independently verified because it appears in the programme's benefits report",
    "The AED 115,000 difference is entirely delayed because seven properties went live within the last four months",
    "The original AED 620,000 promise is financially realised because the redesigned arrival process entered operations"
  ],
  "The Week 13 Qasr case establishes an annual promise of AED 620,000 and a currently tracked amount of AED 505,000. Their arithmetic difference is AED 115,000. However, the difference does not establish why the expected benefits remain missing. The tracked amount also requires attribution and financial verification before it can be reported as realised value.");
 
M("W13O2e-02", "W13O2e", 2,
  "The programme director emphasises recent deployment, while the finance director questions financial reconciliation. What is the most defensible audit committee response?",
  [
    "Examine deployment timing and the financial evidence for each benefit claim before deciding what value can be recognised",
    "Accept the programme director's explanation because recent deployment guarantees eventual realisation of the original benefits",
    "Accept the entire tracked amount as verified because the finance director has not established that every claim is incorrect",
    "Reject all programme benefits because disagreement between operations and finance proves that implementation was unsuccessful"
  ],
  "The Week 13 case presents different concerns about the same benefits report. Seven of fourteen properties went live within the last four months, making timing relevant. However, the finance director's reconciliation concerns also require examination. A defensible review investigates both perspectives and evaluates the evidence supporting individual claims rather than automatically accepting either position.");
 
M("W13O2e-03", "W13O2e", 3,
  "Why should Qasr avoid calculating a revised verified benefits total by applying arbitrary deductions to its disputed claims?",
  [
    "A precise revised total is not defensible unless the adjustments reflect evidence about actual financial consequences and attribution",
    "Any revised total below AED 620,000 must be correct because conservative estimates are automatically financially verified",
    "All reported claims must receive identical percentage reductions because they belong to the same BPM programme",
    "The original estimate should remain unchanged because uncertainty cannot affect the amount recognised as realised value"
  ],
  "The Week 13 benefits review identifies different uncertainties within Qasr's labour, retained revenue and avoided penalty claims. Each requires evidence suited to its economic meaning. Applying arbitrary percentages would create false precision without establishing the actual financial consequences. Management should preserve unresolved uncertainty rather than manufacture a reconciled total.");
 
TF("W13O2e-04", "W13O2e", 1,
  "Qasr's AED 505,000 tracked benefits figure and its financially verified realised benefits are not necessarily the same amount.",
  true,
  "This statement is true. The Week 13 Realize Value discussion distinguishes benefits reported by a programme from benefits supported by financial evidence. Qasr's AED 505,000 is a tracked amount, not an independently verified financial result. Attribution, actual expenditure and other relevant economic consequences must be examined before financial recognition.");
 
TF("W13O2e-05", "W13O2e", 2,
  "Because the original business case promised AED 620,000, the audit committee must choose either AED 620,000 or AED 505,000 as the verified realised benefit.",
  false,
  "This statement is false. The two figures describe different things. AED 620,000 is the original annual promise, while AED 505,000 is the amount currently tracked. Neither is automatically the verified financial result. The Week 13 benefits review requires a reconciled explanation showing the promise, reported progress, supporting financial evidence and unresolved differences.");
 
DR("W13O2e-06", "W13O2e", 1,
  "Qasr's annual benefits promise was {1}, while the amount currently tracked by the programme is {2}.",
  [
    ["AED 620,000", "AED 505,000", "AED 240,000"],
    ["AED 505,000", "AED 115,000", "AED 180,000"]
  ],
  "The Week 13 Qasr case states that the original business case promised AED 620,000 annually, while the programme currently reports AED 505,000 in tracked benefits. These figures establish an arithmetic difference of AED 115,000. However, the tracked amount remains subject to financial verification, and the difference requires an evidence-based explanation.");
 
DR("W13O2e-07", "W13O2e", 3,
  "The programme director's explanation primarily concerns {1}, while the finance director's concern primarily concerns {2}.",
  [
    ["benefit timing", "corporate pricing", "regulatory enforcement"],
    ["financial reconciliation", "property deployment scheduling", "technical installation"]
  ],
  "The programme director argues that recent property deployments may explain why expected benefits have not fully emerged. The finance director questions whether the reported amounts reconcile with financial evidence. The Week 13 case requires both concerns to be investigated. Timing may affect measurement, but it cannot substitute for verification of actual financial consequences.");
 
V("W13O2e-08", "W13O2e", 2,
  "Which diagram correctly represents Qasr's reported annual benefits position?",
  [
    [
      D.bars([
        ["Promised", 620],
        ["Tracked", 505],
        ["Difference", 115]
      ]),
      "The original promise exceeds the currently tracked amount by AED 115,000"
    ],
    [
      D.bars([
        ["Promised", 505],
        ["Tracked", 620],
        ["Difference", 115]
      ]),
      "The original promise and tracked amount are reversed"
    ],
    [
      D.bars([
        ["Promised", 620],
        ["Tracked", 620],
        ["Difference", 0]
      ]),
      "The original promise is shown as fully achieved"
    ],
    [
      D.bars([
        ["Promised", 620],
        ["Tracked", 505],
        ["Difference", 85]
      ]),
      "The difference is confused with the avoided regulatory penalty claim"
    ]
  ],
  "The Week 13 case reports AED 620,000 in promised annual benefits and AED 505,000 currently tracked. The arithmetic difference is AED 115,000. The correct diagram presents these amounts in AED thousands. It does not imply that the tracked figure has been independently verified or that the difference has been explained.");
 
V("W13O2e-09", "W13O2e", 3,
  "Which diagram best represents the audit committee's defensible approach to Qasr's disputed benefits?",
  [
    [
      D.flow([
        "Original|Promise",
        "Tracked|Claims",
        "Examine|Evidence",
        "Verify|Financial value",
        "Explain|Unresolved gap"
      ]),
      "Separate the promise, reported claims and verified value while preserving unresolved differences"
    ],
    [
      D.flow([
        "Original|Promise",
        "Assume|Full realisation",
        "Approve|AED 620,000",
        "Close|Review"
      ]),
      "Treat the original business case as proof of realised financial value"
    ],
    [
      D.flow([
        "Tracked|AED 505,000",
        "Assume|Verification",
        "Recognise|Full amount",
        "Ignore|Attribution"
      ]),
      "Treat the programme's tracked amount as financially verified without supporting evidence"
    ],
    [
      D.flow([
        "Difference|AED 115,000",
        "Assume|Timing",
        "Recognise|Future benefit",
        "Close|Review"
      ]),
      "Treat the entire difference as guaranteed future value because deployment is recent"
    ]
  ],
  "The Week 13 Realize Value discussion requires management to distinguish original expectations, tracked benefits and financially verified outcomes. Qasr's audit committee should examine each claim and its supporting evidence before recognising realised value. The remaining difference should be explained honestly rather than attributed automatically to timing or converted into an unsupported financial adjustment.");
 
OR("W13O2e-10", "W13O2e", 2,
  "Arrange these steps for preparing Qasr's benefits report for the audit committee.",
  ["Set the AED 620,000 promise beside the AED 505,000 tracked", "Test each of the three tracked claims against its evidence", "Separate verified value from the claims that remain unresolved", "Report both figures, with an owner and a date for every open item"],
  "The comparison of promise and tracked figure defines the problem. Each of the three claims is then tested, because the total is only as strong as its parts. Verified value can be separated from open claims only after testing, and the report comes last, naming an owner and a date for each open item rather than staying silent.");
 
MA("W13O2e-11", "W13O2e", 2,
  "Match each Qasr benefit figure to its meaning in the audit committee review.",
  [
    [
      "AED 620,000",
      "The annual benefit promised in the original business case"
    ],
    [
      "AED 505,000",
      "The benefit amount currently tracked by the programme"
    ],
    [
      "AED 115,000",
      "The arithmetic difference between promised and tracked benefits"
    ],
    [
      "AED 240,000",
      "The reported front-desk labour benefit claim"
    ],
    [
      "AED 180,000",
      "The reported retained corporate revenue claim"
    ],
    [
      "AED 85,000",
      "The reported avoided regulatory penalty claim"
    ]
  ],
  "The Week 13 Qasr case distinguishes the overall benefits promise, currently tracked amount and arithmetic difference. It also identifies separate claims concerning front-desk labour, retained corporate revenue and an avoided regulatory penalty. These figures have different meanings and should not automatically be treated as verified financial savings. Each component requires appropriate evidence before recognition.");
 
MA("W13O2e-12", "W13O2e", 3,
  "Match each Qasr audit committee concern to the evidence needed for a defensible conclusion.",
  [
    [
      "Seven properties went live within the last four months",
      "Examine whether deployment timing supports the expected benefit measurement period"
    ],
    [
      "Four fewer employees rather than eleven assumed",
      "Reconcile staffing assumptions with actual labour expenditure"
    ],
    [
      "Two corporate renewals with a four percent rate reduction",
      "Investigate pricing influence and the process contribution to retention"
    ],
    [
      "AED 85,000 avoided penalty contingent on enforcement",
      "Assess credible regulatory exposure before recognising avoided expenditure"
    ],
    [
      "Programme and finance directors disagree about reported benefits",
      "Connect operational claims with attributable financial evidence and explain unresolved differences"
    ]
  ],
  "The Week 13 case presents several different reasons that claimed benefits require further examination. Recent deployment raises a timing question, while the staffing figures challenge the original labour assumptions. Corporate pricing complicates attribution of retained revenue, and contingent enforcement limits automatic recognition of the avoided penalty. The programme and finance perspectives should therefore be reconciled through evidence rather than by choosing a preferred headline figure.");

// W13O3a - A benefit needs an owner in the business
// Lesson l4: Making benefits accountable
// Outcome O3 [S1]: Design a benefits management approach
// with accountable ownership.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O3a-01", "W13O3a", 1,
  "What is the principal responsibility of a business benefit owner in a BPM programme?",
  [
    "Remain accountable for achieving the expected business outcome and demonstrating its realisation through appropriate evidence",
    "Complete the technical implementation and transfer all remaining financial responsibility to the project team",
    "Approve the original financial estimate without examining whether the expected benefit subsequently materialises",
    "Record the programme's reported benefits without authority to influence the decisions needed to achieve them"
  ],
  "The Week 13 Realize Value discussion establishes that benefits require accountable business ownership. A benefit owner is responsible for delivering and demonstrating the expected outcome, including investigating shortfalls and initiating justified management actions. Technical implementation alone does not establish financial realisation. Meaningful ownership requires responsibility, decision authority and access to supporting evidence.");
 
M("W13O3a-02", "W13O3a", 2,
  "Qasr's front-desk labour claim assumed eleven fewer employees, but headcount fell by four. Who should remain accountable for investigating how the expected labour benefit can be realised?",
  [
    "An authorised operational business owner who can examine staffing decisions, released capacity and actual economic consequences",
    "The implementation team alone because introducing the redesigned process gives it permanent authority over operational staffing",
    "Finance alone because examining monetary claims automatically transfers responsibility for operational staffing decisions",
    "The audit committee alone because reviewing reported benefits makes it responsible for managing everyday employee deployment"
  ],
  "Qasr's AED 240,000 labour claim requires examination of actual staffing and expenditure rather than reliance on the original assumption. The Week 13 discussion distinguishes programme delivery, business ownership and financial verification. An authorised operational manager should remain accountable for decisions affecting labour benefits, while finance examines the supporting financial evidence. This is a proposed responsibility, not a confirmed Qasr appointment.");
 
M("W13O3a-03", "W13O3a", 3,
  "Why should benefit ownership be agreed before a BPM programme is approved rather than assigned only after implementation?",
  [
    "Early ownership allows responsible managers to challenge assumptions, establish measurements and prepare decisions needed for realisation",
    "Early ownership guarantees that every financial benefit will be achieved regardless of subsequent operating conditions",
    "Assigning ownership before approval eliminates the need for financial verification during the Realize Value phase",
    "Early ownership allows the implementation team to recognise expected benefits before any operational outcomes have been measured"
  ],
  "The Week 13 benefits management approach requires accountability to begin before implementation. Early ownership helps establish credible benefit assumptions, baselines, measurements and responsibilities. It also identifies managers with authority over decisions needed to capture value. Ownership does not guarantee success or replace financial verification, but it reduces the risk that expected benefits become nobody's responsibility after project completion.");
 
TF("W13O3a-04", "W13O3a", 1,
  "A business benefit owner should remain accountable after implementation when the expected benefit has not yet been demonstrated or its financial consequences remain unresolved.",
  true,
  "This statement is true. The Week 13 Realize Value discussion distinguishes completing a project from delivering its expected business benefits. Some outcomes require management action or additional measurement after implementation. Accountability should therefore continue until the benefit is demonstrated, revised using evidence or explicitly reported as unrealised.");
 
TF("W13O3a-05", "W13O3a", 2,
  "Naming a manager as benefit owner is sufficient even when that manager lacks authority over the operational decisions and access to the evidence needed for realisation.",
  false,
  "This statement is false. Meaningful benefit ownership requires more than a name in a register. The Week 13 discussion emphasises responsibility, decision authority and access to reliable information. A manager who cannot influence the relevant business decisions or examine supporting evidence may be unable to deliver or demonstrate the expected outcome.");
 
DR("W13O3a-06", "W13O3a", 1,
  "The {1} remains accountable for delivering the expected business outcome, while {2} examines whether the claimed monetary benefit is supported by financial evidence.",
  [
    ["business benefit owner", "implementation supplier", "technical developer"],
    ["finance", "the implementation supplier", "the software developer"]
  ],
  "The Week 13 benefits management discussion separates responsibility for achieving a business outcome from responsibility for examining its financial consequences. The business benefit owner controls or influences the relevant operational decisions. Finance evaluates whether reported monetary benefits reconcile with appropriate financial evidence. These responsibilities are complementary rather than interchangeable.");
 
DR("W13O3a-07", "W13O3a", 3,
  "Meaningful benefit ownership requires sufficient {1} to influence decisions affecting realisation and access to reliable {2} for demonstrating the outcome.",
  [
    ["decision authority", "technical documentation", "project closure approval"],
    ["performance evidence", "unverified forecasts", "implementation publicity"]
  ],
  "A benefit owner must be able to influence the decisions that determine whether the expected outcome occurs. The owner also needs reliable measurements and supporting evidence to explain what was achieved. The Week 13 Realize Value discussion warns that nominal ownership without authority or information cannot ensure accountable benefits management.");
 
V("W13O3a-08", "W13O3a", 2,
  "Which diagram best represents the responsibilities needed for accountable benefits realisation?",
  [
    [
      D.lanes(["Programme team", "Business owner", "Finance"], [[0, "Deliver process capability"], [0, "Preserve implementation evidence"], [1, "Make operational decisions"], [1, "Deliver expected benefit"], [2, "Examine financial evidence"], [2, "Verify monetary claims"]]),
      "Programme delivery, business ownership and financial verification have distinct but connected responsibilities"
    ],
    [
      D.lanes(["Programme team", "Business owner", "Finance"], [[0, "Deliver process capability"], [0, "Control every future business decision"], [1, "Observe project completion"], [1, "Avoid benefit responsibility"], [2, "Accept original estimates"], [2, "Avoid reconciliation"]]),
      "All accountability is placed on the programme while business management and finance avoid their responsibilities"
    ],
    [
      D.lanes(["Programme team", "Business owner", "Finance"], [[0, "Close implementation"], [0, "Discard benefit assumptions"], [1, "Record reported amounts"], [1, "Avoid management action"], [2, "Recognise every claim"], [2, "Ignore supporting evidence"]]),
      "The arrangement removes the ownership and evidence needed for credible financial realisation"
    ],
    [
      D.lanes(["Programme team", "Business owner", "Finance"], [[0, "Install redesigned process"], [0, "Declare every benefit achieved"], [1, "Transfer responsibility"], [1, "Stop monitoring"], [2, "Repeat programme figures"], [2, "Exclude financial examination"]]),
      "Implementation completion is incorrectly treated as proof that all expected benefits have materialised"
    ]
  ],
  "The Week 13 Realize Value discussion distinguishes the responsibilities of programme teams, business benefit owners and finance. Programme teams deliver process capability and preserve supporting information. Business owners remain accountable for decisions and outcomes, while finance examines the financial evidence. This separation helps prevent operational improvements from being reported as financially realised without appropriate verification.");
 
V("W13O3a-09", "W13O3a", 3,
  "Which diagram best represents how Qasr should establish continuing accountability for a disputed benefit?",
  [
    [
      D.flow([
        "Define|Expected benefit",
        "Assign|Business owner",
        "Confirm|Decision authority",
        "Measure|Actual outcome",
        "Verify|Financial value",
        "Resolve|Remaining gap"
      ]),
      "Assign an authorised owner and retain accountability until the outcome and its financial consequences are resolved"
    ],
    [
      D.flow([
        "Define|Expected benefit",
        "Complete|Implementation",
        "Assume|Benefit realised",
        "Close|Responsibility"
      ]),
      "End benefit accountability when the redesigned process becomes operational"
    ],
    [
      D.flow([
        "Record|Original estimate",
        "Assign|Nominal owner",
        "Ignore|Decision authority",
        "Recognise|Full benefit"
      ]),
      "Treat naming an owner as sufficient even without authority or supporting evidence"
    ],
    [
      D.flow([
        "Identify|Disputed benefit",
        "Transfer|Everything to finance",
        "Avoid|Operational decisions",
        "Close|Management review"
      ]),
      "Make finance solely responsible for operational outcomes it may not control"
    ]
  ],
  "The Week 13 benefits management approach requires ownership to begin with a clearly defined expected outcome. The appointed business manager needs authority to influence realisation and access to measurements. Finance then examines the monetary consequences, while unresolved differences remain subject to accountable action. Project completion or nominal ownership cannot replace this continuing responsibility.");
 
OR("W13O3a-10", "W13O3a", 2,
  "Arrange these steps for giving a benefit a real owner from approval to review.",
  ["Name the business owner in the business case", "Approve the programme with that owner on record", "Take the redesigned process live", "Measure the benefit on the date agreed before go-live", "Report the result, or the shortfall with its owner and a date"],
  "The slides say the owner is named in the business case, before approval, not in the closing report. Approval follows, and then go-live. The benefit is measured on the date agreed in advance, and the report comes last, showing either the result or the shortfall with an owner and a date.");
 
MA("W13O3a-11", "W13O3a", 2,
  "Match each benefits governance role to its principal responsibility.",
  [
    [
      "Business benefit owner",
      "Remain accountable for delivering the expected outcome and explaining unresolved shortfalls"
    ],
    [
      "Programme team",
      "Deliver the redesigned process capability and preserve relevant implementation evidence"
    ],
    [
      "Finance",
      "Examine whether claimed monetary benefits reconcile with financial evidence"
    ],
    [
      "Executive sponsor",
      "Support continuing organisational commitment and the authority needed for benefits realisation"
    ],
    [
      "Audit committee",
      "Review reported benefits, challenge unsupported claims and require accountable explanations"
    ]
  ],
  "The Week 13 benefits management discussion separates the responsibilities needed for credible realisation. Business owners deliver outcomes, programme teams provide capability, and finance examines monetary evidence. Executive sponsorship supports continuing commitment, while the audit committee scrutinises reported results and unresolved differences. These are governance responsibilities rather than confirmed individual appointments within Qasr.");
 
MA("W13O3a-12", "W13O3a", 3,
  "Match each Qasr benefit claim or governance concern to the proposed ownership responsibility it requires.",
  [
    [
      "AED 240,000 front-desk labour claim",
      "An authorised operational owner examines staffing decisions and actual labour expenditure"
    ],
    [
      "AED 180,000 retained corporate revenue claim",
      "A commercial business owner investigates renewal decisions and the influence of pricing"
    ],
    [
      "AED 85,000 avoided regulatory penalty claim",
      "A responsible risk or compliance owner examines credible regulatory exposure and supporting controls"
    ],
    [
      "Financial verification of reported benefits",
      "Finance examines the monetary consequences and challenges unsupported recognition"
    ],
    [
      "Benefits remaining unresolved after implementation",
      "Accountable business management maintains evidence, explains shortfalls and coordinates justified action"
    ]
  ],
  "Qasr's benefit claims involve different operational and financial mechanisms, so their ownership requirements also differ. Labour benefits depend on staffing and expenditure decisions, retained revenue requires commercial attribution, and avoided penalties require evidence of regulatory exposure. Finance examines financial recognition, while business owners remain accountable for delivering outcomes. These are proposed governance assignments, not established appointments in the Qasr case.");

// W13O3b - Building a benefits register that finance can trust
// Lesson l4: Making benefits accountable
// Outcome O3 [S1]: Design a benefits management approach
// with accountable ownership.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O3b-01", "W13O3b", 1,
  "What is the principal purpose of a benefits register during the Realize Value phase?",
  [
    "Connect each expected benefit with its original commitment, accountable owner, measured outcome and supporting financial evidence",
    "Preserve the original business case estimates without reconsidering their assumptions after implementation",
    "Replace financial verification with a list of operational improvements reported by the programme team",
    "Record completed implementation activities and treat them as equivalent to financially realised benefits"
  ],
  "The Week 13 Realize Value discussion presents the benefits register as a tool for maintaining traceability and accountability. Each claim should remain connected to its business objective, baseline, expected value, owner and supporting evidence. The register should distinguish tracked benefits from financially verified results and make unresolved differences visible. Recording a claim does not establish that its value has been realised.");
 
M("W13O3b-02", "W13O3b", 2,
  "Qasr's benefits register records the AED 240,000 labour claim and the observed reduction of four employees rather than eleven assumed. What additional evidence is most important?",
  [
    "Actual labour expenditure and the financial consequences attributable to the observed staffing changes",
    "Confirmation that the redesigned arrival process was implemented successfully at the participating properties",
    "A proportional calculation using four divided by eleven without examining employment costs",
    "A statement that the remaining assumed staffing reductions will occur when all properties have operated longer"
  ],
  "Qasr's original labour claim depended on staffing assumptions that differ from the observed headcount change. The Week 13 case requires examination of actual expenditure rather than a proportional estimate based only on employee numbers. The benefits register should preserve the original assumptions and observed staffing outcome while identifying the financial evidence needed to establish realised value.");
 
M("W13O3b-03", "W13O3b", 3,
  "Qasr's register contains a claimed benefit whose financial value remains uncertain. How should the register treat that claim?",
  [
    "Preserve the reported amount, identify the missing evidence, assign an accountable owner and record the next justified review action",
    "Remove the claim entirely because uncertainty proves that the redesigned process created no organisational value",
    "Recognise the original monetary estimate because the register provides a formal record of the expected benefit",
    "Apply an arbitrary percentage reduction and treat the resulting amount as financially verified"
  ],
  "The Week 13 benefits management discussion requires unresolved claims to remain visible and accountable. A credible register preserves the reported amount while distinguishing it from verified financial value. It should identify the evidence gap, responsible business owner and required follow-up. Uncertainty should not be concealed through deletion, automatic recognition or unsupported numerical adjustments.");
 
TF("W13O3b-04", "W13O3b", 1,
  "A benefits register should preserve the original baseline and benefit assumptions so that later results can be evaluated against the commitments made before implementation.",
  true,
  "This statement is true. The Week 13 Realize Value discussion emphasises benefits traceability from the original business objective and baseline to measured outcomes. Preserving assumptions helps management explain why actual results differ from expectations. Without these records, even genuine operational improvements may become difficult to evaluate or translate into defensible financial claims.");
 
TF("W13O3b-05", "W13O3b", 2,
  "Once a claimed monetary benefit has been entered into the benefits register, finance can treat it as realised without examining attribution or actual financial consequences.",
  false,
  "This statement is false. A benefits register records and tracks claims, but does not independently verify their financial value. The Week 13 discussion requires finance to examine supporting evidence and attribution before recognising realised benefits. A precise amount recorded in the register may remain uncertain, contingent or financially unrealised.");
 
DR("W13O3b-06", "W13O3b", 1,
  "The {1} records the agreed performance position before process improvement, while the {2} identifies the manager accountable for delivering and demonstrating the expected business outcome.",
  [
    ["baseline", "tracked amount", "review date"],
    ["benefit owner", "financial estimate", "measurement period"]
  ],
  "A baseline establishes the agreed starting position against which subsequent performance is compared. A benefit owner is the business manager accountable for delivering and demonstrating the expected outcome. The Week 13 benefits register should preserve both because credible realisation requires measurement as well as continuing management responsibility.");
 
DR("W13O3b-07", "W13O3b", 3,
  "For Qasr's corporate retention claim, the register should record the four percent rate reduction as a possible {1}; for the avoided penalty claim, it should record enforcement as {2}.",
  [
    ["competing influence on attribution", "verified financial saving", "labour expenditure reduction"],
    ["contingent", "certain", "already financially realised"]
  ],
  "Qasr's corporate rate reduction may have influenced renewal decisions alongside the redesigned arrival process. The register should therefore preserve pricing as a competing attribution explanation. The AED 85,000 avoided regulatory penalty remains contingent on enforcement. The Week 13 case requires these uncertainties to be recorded rather than treating either claimed amount as automatically verified financial value.");
 
V("W13O3b-08", "W13O3b", 2,
  "Which diagram best represents the information chain that makes a benefits register useful for financial verification?",
  [
    [
      D.flow([
        "Business|Objective",
        "Original|Baseline",
        "Expected|Benefit",
        "Accountable|Owner",
        "Measured|Outcome",
        "Financial|Evidence"
      ]),
      "The register connects strategic intention, the original position, expected value, ownership and verification"
    ],
    [
      D.flow([
        "Original|Estimate",
        "Process|Implemented",
        "Assume|Full benefit",
        "Recognise|Saving"
      ]),
      "Implementation completion is treated as proof that the original financial estimate was realised"
    ],
    [
      D.flow([
        "Programme|Reports amount",
        "Register|Records amount",
        "Finance|Accepts amount",
        "Close|Review"
      ]),
      "A recorded claim is accepted without examining the underlying financial evidence"
    ],
    [
      D.flow([
        "Operational|Improvement",
        "Ignore|Baseline",
        "Exclude|Attribution",
        "Approve|Financial claim"
      ]),
      "The original starting position and attribution evidence are excluded from the benefits assessment"
    ]
  ],
  "The Week 13 benefits register connects the original objective and baseline with the expected benefit, accountable owner, measured result and financial evidence. This traceability allows management to investigate differences between promises and outcomes. The other diagrams omit essential evidence or incorrectly treat implementation and reported amounts as proof of realised financial value.");
 
V("W13O3b-09", "W13O3b", 3,
  "Which diagram shows a sensible split of duties when Qasr's benefits register is reported?",
  [
    [D.lanes(["Business owner", "Finance", "Audit committee"], [[0, "Update evidence"], [1, "Examine claims"], [2, "Review gaps"], [0, "Act on gaps"]]), "The owner updates and acts, finance examines, and the committee reviews"],
    [D.lanes(["Business owner", "Finance", "Audit committee"], [[0, "Approve totals"], [1, "Update evidence"], [2, "Deliver benefit"], [1, "Act on gaps"]]), "Finance and the committee take on delivery work that belongs to the business"],
    [D.lanes(["Business owner", "Finance", "Audit committee"], [[0, "Report go-live"], [1, "Accept totals"], [2, "Approve claims"], [2, "Close review"]]), "Claims are accepted with no examination and no follow-up"],
    [D.lanes(["Business owner", "Finance", "Audit committee"], [[0, "Examine claims"], [1, "Update evidence"], [2, "Act on gaps"], [0, "Review gaps"]]), "The owner audits its own claims while the committee does the corrective work"]
  ],
  "Only the business can realise a benefit, so the owner keeps the evidence current and acts on any gap. Finance examines the claims independently, and the committee reviews what remains unresolved. The other diagrams either hand delivery to people who cannot realise it, or remove independent examination, so unsupported claims would pass unchallenged.");
 
OR("W13O3b-10", "W13O3b", 2,
  "Arrange these steps in the life of one entry in Qasr's benefits register.",
  ["Enter the objective, baseline and owner before go-live", "Take the redesigned process live", "Have the owner record the measured outcome on its agreed date", "Have finance examine the claim against the accounts", "Present verified and unresolved amounts to the committee"],
  "The slides require the baseline, owner and measurement date to be set before go-live, so the entry starts there. The outcome can only be measured after the process is live. Finance examines the measured claim before anything reaches the committee, which then sees verified and unresolved amounts side by side.");
 
MA("W13O3b-11", "W13O3b", 2,
  "Match each benefits register element to its principal purpose.",
  [
    [
      "Business objective",
      "Explain the organisational result that justified the improvement investment"
    ],
    [
      "Baseline",
      "Preserve the agreed performance position before the redesigned process"
    ],
    [
      "Benefit estimate",
      "Record the expected economic value and the assumptions supporting it"
    ],
    [
      "Accountable owner",
      "Identify the business manager responsible for delivering and explaining the outcome"
    ],
    [
      "Financial evidence",
      "Support assessment of the monetary value actually realised"
    ],
    [
      "Review date and action",
      "Specify when an unresolved claim will be examined and what follow-up is required"
    ]
  ],
  "The Week 13 benefits register connects strategic purpose with measurable and accountable outcomes. The objective explains why the improvement matters, the baseline records the starting position and the estimate preserves expected value. The owner remains responsible for delivery, while financial evidence supports verification. Review dates and actions prevent unresolved benefits from disappearing after implementation.");
 
MA("W13O3b-12", "W13O3b", 3,
  "Match each Qasr benefits register entry to the evidence or qualification it should preserve.",
  [
    [
      "AED 240,000 front-desk labour claim",
      "The original eleven-employee assumption, actual four-employee reduction and required expenditure evidence"
    ],
    [
      "AED 180,000 retained corporate revenue claim",
      "The two renewals, four percent rate reduction and unresolved process attribution"
    ],
    [
      "AED 85,000 avoided regulatory penalty claim",
      "The contingent enforcement exposure and evidence needed to support avoided expenditure"
    ],
    [
      "Seven properties deployed within the last four months",
      "The possible timing effect without assuming that delayed benefits are guaranteed"
    ],
    [
      "AED 115,000 difference between promised and tracked benefits",
      "An unresolved reconciliation requiring explanation rather than an invented allocation"
    ]
  ],
  "The Week 13 Qasr case contains different benefit claims requiring different evidence. The labour claim depends on staffing and expenditure, retained revenue requires pricing and attribution analysis, and the avoided penalty remains contingent on enforcement. Recent deployment makes timing relevant without guaranteeing realisation. The AED 115,000 difference is established arithmetically, but its causes have not been verified. A credible register preserves these distinctions and assigns responsibility for resolving them.");

// W13O3c - The next programme must not repeat the argument
// Lesson l4: Making benefits accountable
// Outcome O3 [S1]: Design a benefits management approach
// with accountable ownership.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 M, 2 TF, 2 DR, 2 V, 1 OR, 2 MA.
 
M("W13O3c-01", "W13O3c", 1,
  "Qasr is preparing a future corporate-billing improvement programme. Which arrangement would best prevent another dispute about promised and realised benefits?",
  [
    "Agree benefit definitions, baselines, accountable business owners and financial verification methods before approving the investment",
    "Allow the implementation team to estimate benefits after deployment and assign ownership when financial questions arise",
    "Recognise the original financial estimates as realised benefits once the redesigned corporate-billing process becomes operational",
    "Transfer all benefit responsibility to finance because operational managers should focus exclusively on process implementation"
  ],
  "The Week 13 Realize Value discussion emphasises that benefits management begins before implementation. A proposed governance approach for Qasr's future corporate-billing programme should establish expected outcomes, credible baselines, accountable business owners and financial evidence requirements before investment approval. These arrangements make benefits traceable and reduce the risk of repeating the current disagreement about reported and realised value.");
 
M("W13O3c-02", "W13O3c", 2,
  "Qasr's programme director argues that recent deployment explains the benefits gap. How should a proposed reporting cycle handle this explanation?",
  [
    "Require evidence about deployment dates, expected measurement periods and observed progress while preserving any unresolved uncertainty",
    "Accept the entire AED 115,000 difference as delayed because seven properties went live within the last four months",
    "Recognise the original AED 620,000 promise because recent deployment guarantees that all expected benefits will eventually appear",
    "Exclude timing from the benefits review because deployment dates cannot influence when operational benefits become measurable"
  ],
  "The Week 13 Qasr case states that seven of fourteen properties went live within the last four months. Recent deployment makes benefit timing relevant, but does not guarantee that missing value will materialise. A credible reporting cycle should examine measurement periods and emerging evidence while distinguishing delayed benefits from unsupported expectations. The causes of the AED 115,000 difference remain unresolved.");
 
M("W13O3c-03", "W13O3c", 3,
  "How should Qasr connect Realize Value with the following Sustainable Performance phase?",
  [
    "Verify and explain the benefits achieved, then maintain business ownership and performance monitoring so those improvements can continue",
    "End all benefit ownership immediately after financial verification because sustained performance is exclusively a technical responsibility",
    "Treat Sustainable Performance as the phase that introduces the redesigned process into everyday operations",
    "Postpone examination of financial benefits until Sustainable Performance because Realize Value concerns only project closure"
  ],
  "Realize Value is phase nine of the BPM framework and examines whether expected benefits have been achieved. Sustainable Performance follows as phase ten and concerns maintaining and improving operational performance. The Week 13 discussion emphasises continuing accountability because benefits may depend on sustained operational discipline after the original implementation programme has finished.");
 
TF("W13O3c-04", "W13O3c", 1,
  "A proposed benefits governance approach should assign accountable business owners and agree evidence requirements before implementation rather than waiting for disputed financial results.",
  true,
  "This statement is true. The Week 13 Realize Value discussion establishes that benefits management should begin when expected outcomes are defined. Early agreement on ownership, baselines, assumptions and measurement methods makes later verification more credible. It also helps prevent benefits from becoming nobody's responsibility after implementation.");
 
TF("W13O3c-05", "W13O3c", 2,
  "Once Qasr's future corporate-billing programme enters operation, the implementation team should become permanently responsible for every business benefit because operational managers no longer need to participate.",
  false,
  "This statement is false. The Week 13 discussion distinguishes programme delivery from business ownership. Implementation teams provide redesigned process capability, while accountable business managers remain responsible for decisions that capture and sustain expected value. Finance examines monetary evidence, but neither programme delivery nor financial verification replaces operational responsibility.");
 
DR("W13O3c-06", "W13O3c", 1,
  "For Qasr's next BPM programme, the expected benefit should have an accountable {1} before investment approval, while its financial value should be assessed using an agreed {2}.",
  [
    ["business owner", "technical supplier", "temporary project observer"],
    ["measurement and verification method", "implementation publicity plan", "unverified savings estimate"]
  ],
  "The Week 13 benefits governance discussion requires expected benefits to be assigned to accountable business managers before implementation. A credible measurement and verification method should also be agreed early. These arrangements connect strategic expectations with responsibility and supporting evidence, reducing the risk of repeating Qasr's disagreement about reported and financially realised value.");
 
DR("W13O3c-07", "W13O3c", 3,
  "In the BPM framework, {1} examines whether promised benefits have actually been achieved, while {2} addresses maintaining and improving performance after implementation.",
  [
    ["Realize Value", "Implement", "Innovate"],
    ["Sustainable Performance", "Launch Pad", "Develop"]
  ],
  "Realize Value is phase nine of the ten-phase BPM framework. It examines the achievement and evidence of expected business benefits. Sustainable Performance follows as phase ten and addresses the continuing maintenance and improvement of operational performance. The Week 13 discussion distinguishes demonstrating value from sustaining the performance that supports it.");
 
V("W13O3c-08", "W13O3c", 2,
  "Which diagram best represents a proposed benefits governance arrangement for Qasr's future corporate-billing programme?",
  [
    [
      D.flow([
        "Define|Business objective",
        "Agree|Baseline",
        "Assign|Benefit owner",
        "Deliver|Process change",
        "Verify|Financial value",
        "Maintain|Accountability"
      ]),
      "Define and assign benefits early, verify their consequences and preserve accountability beyond implementation"
    ],
    [
      D.flow([
        "Approve|Investment",
        "Implement|Process",
        "Invent|Baseline",
        "Assume|Full saving",
        "Close|Responsibility"
      ]),
      "Measurement and ownership are postponed until implementation has finished"
    ],
    [
      D.flow([
        "Estimate|Benefit",
        "Deliver|Process",
        "Recognise|Original estimate",
        "Ignore|Actual outcome"
      ]),
      "The original financial expectation is treated as realised without measuring actual performance"
    ],
    [
      D.flow([
        "Assign|Programme team",
        "Exclude|Business managers",
        "Skip|Financial verification",
        "Declare|Success"
      ]),
      "Business accountability and financial scrutiny are removed from the benefits process"
    ]
  ],
  "The Week 13 benefits management approach requires strategic objectives, agreed baselines and accountable business ownership before implementation. Actual outcomes must subsequently be measured and financially verified. Continuing accountability is necessary because some benefits require further management action or sustained operational performance. The other diagrams repeat the weaknesses that can leave expected value unverified after implementation.");
 
V("W13O3c-09", "W13O3c", 2,
  "After Realize Value, which framework phase is responsible for holding Qasr's achieved gains in place?",
  [
    [D.route([9]), "Sustainable Performance, phase ten, is highlighted"],
    [D.route([8]), "Realize Value, phase nine, is highlighted"],
    [D.route([7]), "Implement, phase eight, is highlighted"],
    [D.route([2]), "Launch Pad, phase three, is highlighted"]
  ],
  "Sustainable Performance is phase ten and follows Realize Value. It deals with why a delivered gain decays and what holds it in place. Realize Value proves the benefit, Implement puts the process into use, and Launch Pad comes much earlier, so none of them sustains the gain.");
 
OR("W13O3c-10", "W13O3c", 2,
  "Arrange these steps for Qasr's proposed corporate-billing programme so the benefits argument does not recur.",
  ["Agree benefits, baselines and owners before funding is approved", "Approve funding for the corporate-billing programme", "Implement the redesigned billing process", "Measure the benefits and reconcile them with finance", "Carry ownership forward into Sustainable Performance"],
  "The slides say benefits management is designed at the start, so the agreements come before funding. Implementation follows approval, and benefits can only be measured and reconciled after go-live. Ownership then continues into Sustainable Performance, because a gain that nobody holds in place can decay.");
 
MA("W13O3c-11", "W13O3c", 2,
  "Match each proposed benefits governance responsibility to its purpose in Qasr's next programme.",
  [
    [
      "Business benefit owner",
      "Remain accountable for achieving the expected outcome and explaining unresolved shortfalls"
    ],
    [
      "Programme team",
      "Deliver process capability and preserve relevant implementation evidence"
    ],
    [
      "Finance",
      "Examine attribution and supporting evidence for claimed monetary benefits"
    ],
    [
      "Audit committee",
      "Review reported results, challenge unsupported claims and require accountable explanations"
    ],
    [
      "Benefits register",
      "Preserve commitments, baselines, ownership, measurements and unresolved actions"
    ],
    [
      "Continuing performance management",
      "Maintain and improve operational results beyond the original implementation programme"
    ]
  ],
  "The Week 13 Realize Value discussion distinguishes the responsibilities needed for credible benefits management. Business owners deliver outcomes, programme teams provide capability and finance examines financial evidence. Committee oversight challenges unresolved claims, while the benefits register preserves traceability. Continuing performance management supports the transition from demonstrating value to sustaining operational results. These are proposed governance responsibilities rather than confirmed Qasr appointments.");
 
MA("W13O3c-12", "W13O3c", 3,
  "Match each lesson from Qasr's current benefits dispute to the safeguard proposed for its next BPM programme.",
  [
    [
      "Original staffing assumptions differed from actual headcount changes",
      "Agree realistic resource assumptions and require evidence of actual labour expenditure"
    ],
    [
      "Corporate renewals occurred alongside a rate reduction",
      "Establish attribution evidence that distinguishes service improvement from pricing influence"
    ],
    [
      "The avoided regulatory penalty remained contingent on enforcement",
      "Separate reduced regulatory exposure from financially verified avoided expenditure"
    ],
    [
      "Seven properties entered operation within the last four months",
      "Agree benefit measurement periods and examine timing without guaranteeing future realisation"
    ],
    [
      "The programme and finance directors disagreed about reported value",
      "Require regular reconciliation between operational claims and financial evidence"
    ],
    [
      "Benefits may remain unresolved after project closure",
      "Maintain accountable business ownership and documented follow-up actions"
    ]
  ],
  "Qasr's Week 13 benefits review demonstrates why different claims require different safeguards. Labour benefits need realistic staffing assumptions and expenditure evidence, while retained revenue requires attribution analysis. Contingent penalties need credible exposure evidence, and recent deployments require appropriate measurement periods. Regular financial reconciliation and continuing business ownership help prevent unresolved benefits from becoming repeated disagreements. The proposed safeguards address the lessons of the current case without assuming that its disputed amounts have already been resolved.");

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
