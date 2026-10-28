// W12-bank
//
// OPER621 Week 12 - The Implement Phase. Question bank, 12 items per part.
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



// W12O1a · From a tested process to everyday operations
// Lesson l1: Choosing how to arrive
// Outcome O1 [S2]: Evaluate implementation approaches against risk,
// benefit and organisational readiness.
// Correct answers are authored first; the player shuffles options.
 
M("W12O1a-01", "W12O1a", 1,
  "What is the central purpose of the Implement phase in the BPM framework?",
  [
    "Introduce the developed process into everyday organisational operations while managing the transition",
    "Develop alternative future process designs before selecting an operating arrangement",
    "Build the technical capability required to support the approved process design",
    "Establish that every expected business benefit has already been achieved"
  ],
  "Implement introduces the capability prepared during Develop into everyday organisational operations. It requires coordinated deployment, employee preparation and operational support. Designing the future process belongs to Innovate, building and testing its capability belongs to Develop, and establishing realised benefits belongs to Realize Value.");
 
M("W12O1a-02", "W12O1a", 2,
  "Qasr's redesigned arrival process has passed development testing. Why should the operations director still question readiness for wider implementation?",
  [
    "Successful testing does not establish that employees and operating arrangements can manage the process during everyday service",
    "Successful testing proves that the process design must be reconsidered before any property can introduce it",
    "The Implement phase requires the organisation to replace every manual activity with automated processing",
    "The development team must demonstrate realised financial benefits before any operational transition can begin"
  ],
  "Development testing provides evidence about the prepared operating capability, but everyday operations introduce real demand, employee adjustment and unexpected problems. Qasr must consider training, operational support and continuity before wider deployment. Technical readiness is necessary but does not automatically establish organisational readiness.");
 
M("W12O1a-03", "W12O1a", 3,
  "Qasr's kiosks operate correctly, but reception employees struggle to resolve unusual arrivals during busy periods. Which management response best reflects the purpose of Implement?",
  [
    "Strengthen employee preparation, operational support and escalation arrangements while monitoring the complete arrival process",
    "Declare implementation successful because the kiosk software performs its required technical functions",
    "Transfer responsibility for all unusual arrivals to the later Realize Value phase without providing immediate support",
    "Abandon the approved arrival process because any need for human intervention proves that implementation has failed"
  ],
  "Implementation must make the complete redesigned process dependable during actual operations. Qasr needs employees who understand their responsibilities, accessible support and effective escalation when unusual arrivals cannot follow normal processing. Working kiosk technology alone does not establish reliable guest service, while necessary human intervention does not automatically invalidate the redesigned process.");
 
TF("W12O1a-04", "W12O1a", 1,
  "Implement is phase eight of the ten-phase BPM framework, following Develop and preceding Realize Value.",
  true,
  "This statement is true. Develop is phase seven and prepares the tested operating capability. Implement is phase eight and introduces that capability into everyday operations. Realize Value follows implementation and examines whether the expected benefits have actually been achieved.");
 
TF("W12O1a-05", "W12O1a", 2,
  "Once Qasr introduces its redesigned arrival process at every property, successful benefits realisation can be assumed without examining operational performance.",
  false,
  "This statement is false. Introducing a process into everyday operations does not establish that its intended benefits have materialised. Qasr must distinguish deployment from actual performance improvement. Realize Value examines the benefits achieved, while Sustainable Performance addresses their continuing management and improvement.");
 
DR("W12O1a-06", "W12O1a", 1,
  "In the BPM framework, {1} builds and tests the operating capability, while {2} introduces that capability into everyday operations.",
  [
    ["Develop", "Innovate", "Realize Value"],
    ["Implement", "Understand", "Launch Pad"]
  ],
  "Develop prepares the systems, rules, procedures and other capabilities required to operate the approved process. Implement then introduces that prepared capability into everyday organisational practice. These phases are connected, but their responsibilities are different.");
 
DR("W12O1a-07", "W12O1a", 3,
  "Qasr's implementation requires {1} to coordinate deployment activities and {2} to help employees understand and adopt changed working practices.",
  [
    ["project management", "benefits accounting", "process classification"],
    ["people change management", "software procurement", "financial reconciliation"]
  ],
  "Project management coordinates the activities, resources and commitments involved in deployment. People change management supports employees as they understand and adopt new responsibilities and working practices. Both responsibilities remain important throughout the BPM framework, alongside leadership.");
 
V("W12O1a-08", "W12O1a", 2,
  "Which diagram correctly identifies the Implement phase within the ten-phase BPM framework?",
  [
    [
      D.route([7]),
      "Implement is highlighted as phase eight of the BPM framework"
    ],
    [
      D.route([6]),
      "Develop is highlighted as the phase currently being investigated"
    ],
    [
      D.route([8]),
      "Realize Value is highlighted as the phase currently being investigated"
    ],
    [
      D.route([5]),
      "People is highlighted as the phase currently being investigated"
    ]
  ],
  "Implement occupies phase eight of the ten-phase BPM framework. It follows Develop, which prepares the operating capability, and precedes Realize Value, which examines whether the intended business benefits have been achieved. The other diagrams identify different framework phases.");
 
V("W12O1a-09", "W12O1a", 3,
  "Which diagram best represents a responsible transition from Qasr's tested arrival process to everyday operations?",
  [
    [
      D.flow([
        "Tested|capability",
        "Prepare|employees",
        "Establish|support",
        "Introduce|process",
        "Monitor|operation"
      ]),
      "Prepare employees and support arrangements before introducing and monitoring the redesigned process"
    ],
    [
      D.flow([
        "Tested|capability",
        "Install|kiosks",
        "Declare|success"
      ]),
      "Treat successful installation as sufficient evidence of complete implementation success"
    ],
    [
      D.flow([
        "Tested|capability",
        "Introduce|process",
        "Train|employees later",
        "Investigate|problems later"
      ]),
      "Introduce the process before preparing employees or establishing operational support"
    ],
    [
      D.flow([
        "Tested|capability",
        "Assume|benefits",
        "Close|programme"
      ]),
      "Assume that development testing establishes realised benefits and justifies immediate programme closure"
    ]
  ],
  "A responsible implementation prepares employees and operational support before introducing the redesigned process into everyday service. Qasr must then monitor how the process performs and address emerging problems. Installation alone, postponed preparation and assumed benefits do not establish dependable implementation.");
 
OR("W12O1a-10", "W12O1a", 2,
  "Put these BPM activities in the framework sequence leading from an improved process design to the evaluation of realised benefits.",
  [
    "Establish the intended future process during Innovate",
    "Define the responsibilities supporting the redesigned process during People",
    "Build and test the operating capability during Develop",
    "Introduce the developed process into everyday operations during Implement",
    "Evaluate whether the expected benefits have been achieved during Realize Value"
  ],
  "Innovate establishes the future process design, and People addresses the responsibilities required to support it. Develop prepares and tests the operating capability. Implement introduces that capability into everyday operations, while Realize Value subsequently examines whether the intended improvements have actually been achieved.");
 
MA("W12O1a-11", "W12O1a", 2,
  "Match each BPM phase to its principal responsibility in Qasr's process improvement programme.",
  [
    [
      "Innovate",
      "Establishes the intended future arrival process design"
    ],
    [
      "Develop",
      "Builds and tests the operating capability needed to perform the approved design"
    ],
    [
      "Implement",
      "Introduces the developed arrival process into everyday operations"
    ],
    [
      "Realize Value",
      "Examines whether the expected business improvements have actually been achieved"
    ]
  ],
  "Innovate determines how the improved process should operate, while Develop prepares the capability required to perform that design. Implement introduces the capability into actual organisational practice. Realize Value then evaluates the benefits achieved rather than assuming that deployment itself demonstrates improvement.");
 
MA("W12O1a-12", "W12O1a", 3,
  "Match each implementation concern at Qasr to the management responsibility that most directly addresses it.",
  [
    [
      "Deployment activities require coordinated resources and timing",
      "Project management coordinates implementation activities and commitments"
    ],
    [
      "Employees are uncertain about their changed responsibilities",
      "People change management supports understanding and adoption of the new process"
    ],
    [
      "Operational departments disagree about priorities during the transition",
      "Leadership provides direction and resolves decisions beyond individual employees' authority"
    ],
    [
      "Reception employees encounter unfamiliar problems during actual guest arrivals",
      "Operational support and escalation arrangements provide dependable assistance"
    ]
  ],
  "Implementation combines several responsibilities rather than relying on technology alone. Project management coordinates deployment, people change management supports employee adoption, and leadership resolves organisational priorities. Operational support and escalation help employees manage unfamiliar problems while the redesigned process becomes everyday practice.");

// W12O1b · Four ways to go live
// Lesson l1: Choosing how to arrive
// Outcome O1 [S2]: Evaluate implementation approaches against risk,
// benefit and organisational readiness.
// Correct answers are authored first; the player shuffles options.
 
M("W12O1b-01", "W12O1b", 1,
  "Which implementation approach concentrates the transition into one coordinated cutover?",
  [
    "Big bang",
    "Phased",
    "Parallel",
    "Pilot then roll"
  ],
  "Big bang introduces the redesigned process through one coordinated transition. This avoids a prolonged sequence of cutovers but concentrates implementation exposure because all affected operations change together.");
 
M("W12O1b-02", "W12O1b", 2,
  "Why can phased implementation create substantial operating costs even when individual deployment waves are relatively small?",
  [
    "The organisation must manage repeated transitions while temporarily supporting different operating arrangements",
    "The organisation must complete every deployment simultaneously and absorb one concentrated failure",
    "The organisation must independently process every transaction through two fully operational systems",
    "The organisation must stop all operational activity until the entire redesigned process has been implemented"
  ],
  "Phased implementation spreads deployment across several smaller transitions. Each wave creates another opportunity for implementation difficulties, while the organisation temporarily maintains different ways of working. These repeated exposures and sustained dual-operation costs are important disadvantages.");
 
M("W12O1b-03", "W12O1b", 3,
  "Qasr wants to preserve its existing arrival process while introducing the redesigned process. What is the strongest reason to question whether parallel running is feasible?",
  [
    "The same guest arrival may not be independently completed through two competing operating processes",
    "Parallel running necessarily exposes every property to the same concentrated cutover failure",
    "Parallel running prevents employees from identifying problems in the redesigned arrival process",
    "Parallel running requires every property to complete a separate pilot before any wider deployment"
  ],
  "Parallel running is the safest implementation approach when it is feasible, but it is frequently impossible when a resource or transaction can only be consumed once. A guest arrival cannot automatically be completed independently through two processes without considering conflicting records and operating consequences.");
 
TF("W12O1b-04", "W12O1b", 1,
  "Big-bang implementation avoids repeated cutovers but creates maximum concentrated exposure if the redesigned process fails.",
  true,
  "This statement is true. Big bang uses one coordinated transition, avoiding repeated deployment waves and their continuing reconciliation burden. Its major disadvantage is concentrated exposure because a serious problem can affect the entire population converted during that transition.");
 
TF("W12O1b-05", "W12O1b", 2,
  "Phased implementation eliminates implementation risk because only a limited number of operating locations change during each wave.",
  false,
  "This statement is false. Phased implementation limits exposure during individual transitions, but each wave creates another opportunity for failure. The organisation also faces the sustained cost of supporting different operating arrangements until deployment is complete.");
 
DR("W12O1b-06", "W12O1b", 1,
  "The implementation approach that operates the old and redesigned processes together is called {1}, while the approach that changes all affected operations during one coordinated transition is called {2}.",
  [
    ["parallel", "phased", "pilot then roll"],
    ["big bang", "parallel", "phased"]
  ],
  "Parallel implementation keeps the old and redesigned processes operating together during the transition. Big bang instead introduces the redesigned process through one coordinated cutover, concentrating implementation exposure into that transition.");
 
DR("W12O1b-07", "W12O1b", 3,
  "Pilot then roll offers the benefit of {1}, but its principal timeline disadvantage is {2}.",
  [
    ["learning from limited operational deployment", "eliminating all future implementation risks", "avoiding every need for employee support"],
    ["the slowest overall implementation timeline", "an unavoidable simultaneous cutover at every site", "the permanent operation of two identical processes"]
  ],
  "Pilot then roll introduces the redesigned process at limited scale so the organisation can observe results and improve preparations before wider deployment. Its principal disadvantage is the slowest overall timeline because learning and adjustment occur before broader implementation.");
 
V("W12O1b-08", "W12O1b", 2,
  "Which diagram represents phased implementation rather than big bang, parallel running or pilot then roll?",
  [
    [
      D.flow(["Wave A|changes", "Wave B|changes", "Wave C|changes", "All sites|operating"]),
      "Several groups change during separate deployment waves"
    ],
    [
      D.flow(["All sites|prepare", "Single|cutover", "All sites|operate"]),
      "All affected sites change during one coordinated transition"
    ],
    [
      D.hier([
        ["Old process", "Continues operating"],
        ["New process", "Operates simultaneously"]
      ]),
      "Existing and redesigned processes operate together"
    ],
    [
      D.flow(["Limited|pilot", "Review|learning", "Improve|approach", "Wider|rollout"]),
      "Limited deployment produces learning before wider implementation"
    ]
  ],
  "Phased implementation introduces the redesigned process through several smaller transitions. The other diagrams represent big bang, parallel running and pilot then roll. The defining feature of phased implementation is the sequence of deployment waves rather than one simultaneous cutover.");
 
V("W12O1b-09", "W12O1b", 3,
  "Which visual comparison correctly represents the principal trade-offs among the four implementation approaches?",
  [
    [
      D.hier([
        ["Big bang", "Concentrated exposure"],
        ["Phased", "Repeated exposure and dual-operation costs"],
        ["Parallel", "Safest, but sometimes impossible"],
        ["Pilot then roll", "Learning with the slowest timeline"]
      ]),
      "Each approach has a distinct combination of implementation risk and operating consequences"
    ],
    [
      D.hier([
        ["Big bang", "No operational exposure"],
        ["Phased", "No repeated transitions"],
        ["Parallel", "Always feasible"],
        ["Pilot then roll", "Fastest overall timeline"]
      ]),
      "Every approach removes its characteristic implementation disadvantage"
    ],
    [
      D.hier([
        ["Big bang", "Permanent dual operation"],
        ["Phased", "One simultaneous cutover"],
        ["Parallel", "No reconciliation required"],
        ["Pilot then roll", "No learning opportunity"]
      ]),
      "The approaches have consequences inconsistent with their defining characteristics"
    ],
    [
      D.hier([
        ["Big bang", "No need for preparation"],
        ["Phased", "No need for monitoring"],
        ["Parallel", "No need for coordination"],
        ["Pilot then roll", "No need for operational support"]
      ]),
      "Selecting an implementation approach removes the need for ordinary implementation management"
    ]
  ],
  "Big bang concentrates exposure in one transition, while phased implementation creates repeated exposure and sustained dual-operation costs. Parallel running provides the strongest protection when feasible, but some transactions cannot be independently repeated. Pilot then roll provides operational learning at the cost of the slowest overall timeline.");
 
OR("W12O1b-10", "W12O1b", 2,
  "Arrange these activities into a logical pilot-then-roll implementation sequence.",
  [
    "Select a limited operating location for the pilot",
    "Introduce the redesigned process at the pilot location",
    "Observe operational performance and employee difficulties",
    "Use the pilot evidence to improve wider implementation preparations",
    "Extend the redesigned process to additional operating locations"
  ],
  "Pilot then roll begins with limited operational deployment and uses the resulting evidence to improve wider implementation. The organisation observes real performance and employee difficulties before committing additional locations. This learning opportunity is valuable, although the staged approach extends the overall implementation timeline.");
 
MA("W12O1b-11", "W12O1b", 2,
  "Match each implementation approach to its defining operating arrangement.",
  [
    [
      "Big bang",
      "All affected operations change during one coordinated transition"
    ],
    [
      "Phased",
      "Different groups change through several smaller deployment waves"
    ],
    [
      "Parallel",
      "Existing and redesigned processes operate together during transition"
    ],
    [
      "Pilot then roll",
      "Limited deployment generates learning before wider implementation"
    ]
  ],
  "Big bang concentrates deployment into one cutover, while phased implementation spreads conversion across several waves. Parallel running retains the existing process alongside the redesigned arrangement. Pilot then roll deliberately uses limited operational experience to inform wider deployment.");
 
MA("W12O1b-12", "W12O1b", 3,
  "Match each implementation concern to the approach whose characteristic trade-off it most directly illustrates.",
  [
    [
      "A serious cutover problem could disrupt every location changing simultaneously",
      "Big bang"
    ],
    [
      "The organisation repeatedly manages transitions and supports different operating arrangements",
      "Phased"
    ],
    [
      "The same transaction cannot safely be completed independently through two competing processes",
      "Parallel"
    ],
    [
      "The organisation gains operational learning but requires the longest overall deployment timeline",
      "Pilot then roll"
    ]
  ],
  "The four approaches expose organisations to different implementation trade-offs. Big bang concentrates risk, phased implementation repeats transition exposure and dual-operation costs, parallel running may be infeasible for non-repeatable transactions, and pilot then roll exchanges implementation speed for learning from limited operational deployment.");

// W12O1c · The factor that decides the rollout
// Lesson l1: Choosing how to arrive
// Outcome O1 [S2]: Evaluate implementation approaches against risk,
// benefit and organisational readiness.
// Correct answers are authored first; the player shuffles options.
 
M("W12O1c-01", "W12O1c", 1,
  "Which factor represents a hard external constraint on Qasr's implementation schedule?",
  [
    "The tourism authority's digital guest record requirement taking effect on 1 January",
    "The project team's preference for completing deployment through one coordinated event",
    "The programme director's desire to demonstrate rapid implementation progress",
    "The possibility that employees may need additional guidance during the transition"
  ],
  "The tourism authority's digital guest record requirement establishes a hard external deadline for Qasr. This limits scheduling flexibility because compliant arrangements must be operating by 1 January. Management preferences and ordinary implementation concerns may influence the approach, but they do not establish the external deadline.");
 
M("W12O1c-02", "W12O1c", 2,
  "An organisation previously experienced a failed rollout, and employees now distrust another major change. Which implementation consideration becomes particularly important?",
  [
    "Using credible evidence from limited deployment to help rebuild organisational confidence",
    "Concentrating every operating location into one transition to avoid discussing earlier problems",
    "Removing employee involvement because previous failure makes operational feedback unreliable",
    "Assuming that successful technical testing automatically eliminates employee concerns"
  ],
  "Low organisational confidence following failure is an important implementation-selection factor. A limited pilot can provide visible operational evidence and demonstrate learning before wider deployment. This does not guarantee success, but it offers a more credible basis for rebuilding confidence than unsupported assurances.");
 
M("W12O1c-03", "W12O1c", 3,
  "Qasr faces a January deadline, differences between properties and uncertainty about operating two arrival processes independently. What is the most defensible basis for choosing its rollout approach?",
  [
    "Identify the binding constraint and compare how each approach manages the resulting operational risks",
    "Choose the fastest approach because an external deadline automatically outweighs every operating concern",
    "Choose parallel running because it is the safest approach regardless of transaction feasibility",
    "Choose the approach preferred by the programme director without examining site variation or recovery arrangements"
  ],
  "Implementation approaches must be evaluated against the organisation's actual constraints. Qasr's deadline encourages progress, but property differences and parallel-running feasibility affect operational exposure. A defensible recommendation identifies the binding constraint, explains the trade-offs and considers credible recovery arrangements.");
 
TF("W12O1c-04", "W12O1c", 1,
  "Variation between implementation sites can affect whether experience from a successful pilot transfers directly to other locations.",
  true,
  "This statement is true. Sites may differ in physical arrangements, demand patterns and approved process variants. Pilot evidence is useful, but managers must assess whether the conditions represented by the pilot are sufficiently similar to those at later implementation locations.");
 
TF("W12O1c-05", "W12O1c", 2,
  "A hard regulatory deadline removes the need to evaluate operational readiness because compliance timing determines the implementation approach automatically.",
  false,
  "This statement is false. A hard deadline limits scheduling flexibility but does not remove the consequences of operational failure. Managers must still assess readiness, implementation risks, site differences and recovery arrangements before defending a rollout approach.");
 
DR("W12O1c-06", "W12O1c", 1,
  "The condition that most seriously limits which implementation options remain defensible is called the {1}, while the cost of maintaining and coordinating different operating arrangements is a {2} consideration.",
  [
    ["binding constraint", "go/no-go criterion", "registered variant"],
    ["reconciliation", "rollback", "performance dip"]
  ],
  "A binding constraint is the condition that most seriously restricts the organisation's defensible implementation choices. Reconciliation costs arise when different processes or operating arrangements must be maintained and coordinated during the transition.");
 
DR("W12O1c-07", "W12O1c", 3,
  "When the same transaction cannot be independently completed through two competing processes, {1} may be infeasible, making credible {2} especially important.",
  [
    ["parallel running", "pilot learning", "phased deployment"],
    ["rollback planning", "sponsor communication", "adoption tracking"]
  ],
  "Parallel running may be impossible when a resource or transaction can only be consumed once. Where the existing and redesigned processes cannot operate independently, rollback has to carry the safety that parallel running would have given. That is why rollback must be planned and rehearsed rather than assumed to be available.");
 
V("W12O1c-08", "W12O1c", 2,
  "Which diagram correctly represents the five implementation-selection factors?",
  [
    [
      D.hier([
        ["Deadline", "External timing constraint"],
        ["Parallel feasibility", "Whether transactions can be repeated"],
        ["Confidence", "Trust following previous failure"],
        ["Site variation", "Differences between locations"],
        ["Reconciliation", "Cost of multiple arrangements"]
      ]),
      "The five factors concern deadlines, parallel feasibility, organisational confidence, site variation and reconciliation costs"
    ],
    [
      D.hier([
        ["Deadline", "Employee preference"],
        ["Parallel feasibility", "Marketing expenditure"],
        ["Confidence", "Property ownership"],
        ["Site variation", "Financial reporting"],
        ["Reconciliation", "Guest satisfaction"]
      ]),
      "The factors are replaced with unrelated operating and financial considerations"
    ],
    [
      D.hier([
        ["Deadline", "Optional scheduling preference"],
        ["Parallel feasibility", "Always guaranteed"],
        ["Confidence", "Irrelevant after testing"],
        ["Site variation", "Always negligible"],
        ["Reconciliation", "Always costless"]
      ]),
      "The factors are treated as insignificant or automatically resolved"
    ],
    [
      D.hier([
        ["Deadline", "Determines every decision"],
        ["Parallel feasibility", "Never matters"],
        ["Confidence", "Always decisive"],
        ["Site variation", "Can be ignored"],
        ["Reconciliation", "Never requires resources"]
      ]),
      "The factors are assigned unsupported universal priorities"
    ]
  ],
  "The five implementation-selection factors are hard external deadlines, the feasibility of parallel running, low organisational confidence following failure, variation between implementation sites and high reconciliation costs. Their importance depends on the organisation's operating conditions.");
 
V("W12O1c-09", "W12O1c", 3,
  "Which decision diagram best represents how Qasr should evaluate competing rollout constraints?",
  [
    [
      D.flow([
        "Identify|constraints",
        "Assess|operational exposure",
        "Determine|binding factor",
        "Compare|approaches",
        "Justify|recommendation"
      ]),
      "Assess the constraints and identify the binding factor before defending an implementation approach"
    ],
    [
      D.flow([
        "Choose|fastest method",
        "Ignore|site differences",
        "Assume|readiness",
        "Begin|deployment"
      ]),
      "Select speed without evaluating organisational readiness or site variation"
    ],
    [
      D.flow([
        "Choose|parallel",
        "Assume|repeatable transactions",
        "Ignore|reconciliation",
        "Begin|deployment"
      ]),
      "Assume parallel running is feasible without examining transaction constraints"
    ],
    [
      D.flow([
        "Select|preferred method",
        "Dismiss|alternatives",
        "Avoid|recovery planning",
        "Declare|success"
      ]),
      "Treat managerial preference as sufficient justification for the implementation decision"
    ]
  ],
  "A defensible implementation decision begins by identifying the organisation's constraints and evaluating their operational consequences. Managers then determine which constraint most seriously limits the available options, compare the approaches and justify their recommendation. Speed or managerial preference alone cannot replace that analysis.");
 
OR("W12O1c-10", "W12O1c", 2,
  "Arrange these activities into a logical process for selecting an implementation approach.",
  [
    "Identify the organisation's implementation constraints",
    "Assess how the constraints affect operational risk and readiness",
    "Determine which constraint most seriously limits the available options",
    "Compare implementation approaches against the binding constraint",
    "Justify the preferred approach and its recovery arrangements"
  ],
  "Implementation selection begins with understanding the organisation's constraints. Managers assess the resulting risks, identify the binding constraint and compare available approaches. The recommendation must then explain its trade-offs and the recovery arrangements needed if serious problems arise.");
 
MA("W12O1c-11", "W12O1c", 2,
  "Match each implementation-selection factor to the concern it raises for management.",
  [
    [
      "Hard external deadline",
      "Limits the time available for deployment, learning and recovery"
    ],
    [
      "Impossibility of parallel running",
      "Prevents independent operation of competing processes for the same transaction"
    ],
    [
      "Low organisational confidence",
      "Creates a need for credible evidence that the redesigned process can operate successfully"
    ],
    [
      "Variation between implementation sites",
      "Limits direct transfer of pilot experience to locations with different operating conditions"
    ],
    [
      "High reconciliation costs",
      "Makes prolonged support for different operating arrangements expensive"
    ]
  ],
  "Each selection factor creates a distinct implementation concern. Deadlines restrict time, transaction characteristics affect parallel feasibility, previous failure can undermine confidence, site differences limit transferability, and reconciliation costs increase the burden of maintaining multiple operating arrangements.");
 
MA("W12O1c-12", "W12O1c", 3,
  "Match each implementation-selection factor to the approach it pushes toward in the Week 12 selection table.",
  [
    ["A hard external deadline", "Big bang, or a phased plan that finishes before the deadline"],
    ["Parallel running is impossible", "A pilot, with heavier investment in rollback"],
    ["Low organisational confidence after a past failure", "A pilot that delivers a visible early success"],
    ["High variation between sites", "A phased rollout, so each site's variation can be met"],
    ["Expensive reconciliation between the old and new processes", "Big bang, because one cutover carries no reconciliation burden"]
  ],
  "Each factor pushes the decision toward a different approach. A hard deadline favours big bang or a phased plan that finishes in time, and when parallel running is impossible a pilot with stronger rollback must supply the missing safety. Low confidence after a failure calls for a pilot with a visible early success, high site variation favours phasing so each site can be prepared, and expensive reconciliation favours big bang because it avoids running two ways of working. Because real factors often point in different directions, managers must state which one they treated as binding.");

// W12O2a · The performance dip nobody wants to announce
// Lesson l2: The first weeks after go-live
// Outcome O2 [K3]: Devise a training and change approach that supports go-live.
// Correct answers are authored first; the player shuffles options.
 
M("W12O2a-01", "W12O2a", 1,
  "What does the implementation performance dip describe?",
  [
    "A temporary deterioration in operational performance while employees adjust to the redesigned process",
    "A permanent decline in performance that necessarily follows every process redesign",
    "The reduction in project expenditure that occurs when development activities are completed",
    "An improvement in operational performance that always begins immediately after go-live"
  ],
  "The implementation performance dip describes the temporary deterioration that may occur when employees begin using unfamiliar procedures. Learning, coordination and adjustment can initially slow operations before performance recovers. The dip does not automatically establish that the redesigned process is defective.");
 
M("W12O2a-02", "W12O2a", 2,
  "Qasr's reception employees initially take longer to complete familiar tasks using the redesigned process. Which management response best addresses an expected learning dip?",
  [
    "Provide temporary operational support and capacity while monitoring whether performance begins recovering",
    "Declare the implementation unsuccessful because any initial slowdown proves the redesigned process is defective",
    "Remove all employee assistance so reception staff become accustomed to the process more quickly",
    "Stop collecting performance evidence until employees report complete confidence in the new procedures"
  ],
  "An expected learning dip should be anticipated and supported through practical assistance, temporary capacity and performance monitoring. Managers must help employees develop fluency while protecting service continuity. They should also investigate persistent problems rather than automatically treating every slowdown as normal.");
 
M("W12O2a-03", "W12O2a", 3,
  "A sponsor wants to cancel Qasr's implementation after observing poor performance during its most difficult adjustment week. What is the strongest management argument against an immediate decision based only on that week?",
  [
    "An anticipated learning dip should be evaluated alongside its expected duration, operational causes and evidence of recovery",
    "Every performance decline after go-live must be ignored because redesigned processes always recover without intervention",
    "The sponsor should judge success only from technical testing because operational performance is irrelevant during implementation",
    "Employees should be required to work faster because temporary support would conceal the true performance of the process"
  ],
  "A programme judged only during its worst adjustment week may be abandoned before employees have an opportunity to recover. Managers should forecast the dip, provide support and examine evidence of recovery. However, serious or persistent operational failures still require investigation and corrective action.");
 
TF("W12O2a-04", "W12O2a", 1,
  "An initial decline in performance after go-live can occur even when the redesigned process and supporting technology are fundamentally sound.",
  true,
  "This statement is true. Employees may initially work more slowly while learning unfamiliar procedures and coordinating changed responsibilities. A temporary performance dip can therefore reflect adjustment rather than a defective process, although managers must still investigate serious operating problems.");
 
TF("W12O2a-05", "W12O2a", 2,
  "Because the implementation performance dip is expected, managers should treat every operational problem during adjustment as temporary and avoid escalation.",
  false,
  "This statement is false. Anticipating a performance dip does not justify ignoring serious or persistent problems. Managers must distinguish normal learning-related deterioration from failures that threaten operational continuity and require corrective action or escalation.");
 
DR("W12O2a-06", "W12O2a", 1,
  "The temporary decline in performance following go-live is called the {1}, while the employee change curve includes movement from resistance toward {2} and commitment.",
  [
    ["implementation performance dip", "adoption plateau", "rollback boundary"],
    ["exploration", "announcement", "reconciliation"]
  ],
  "The implementation performance dip describes temporary deterioration while employees adjust to changed procedures. The change curve runs from announcement through resistance and exploration to commitment, so announcement comes before resistance rather than after it. Practical support can help employees explore and become confident in the redesigned process.");
 
DR("W12O2a-07", "W12O2a", 3,
  "To prepare for the implementation performance dip, Qasr should forecast its expected {1} and {2}, then arrange temporary operational support.",
  [
    ["depth", "adoption rate", "exception rate"],
    ["duration", "rollback point", "satisfaction score"]
  ],
  "The sponsor must be told the size and the duration of the dip before it happens, or it will be read as failure. Forecasting both lets Qasr resource the dip with extra floor support, temporary capacity and tolerance for slower work. Forecasting does not remove the need to monitor actual performance and investigate serious deviations.");
 
V("W12O2a-08", "W12O2a", 2,
  "Which diagram best represents the implementation performance dip described in the lesson?",
  [
    [
      D.bars([["Before change", 72], ["Go-live", 72], ["Adjustment", 45], ["Recovery", 64], ["Improvement", 85]]),
      "Performance initially declines after go-live before recovering and improving"
    ],
    [
      D.bars([["Before change", 45], ["Go-live", 60], ["Adjustment", 72], ["Recovery", 82], ["Improvement", 90]]),
      "Performance improves continuously without an initial adjustment dip"
    ],
    [
      D.bars([["Before change", 85], ["Go-live", 75], ["Adjustment", 60], ["Recovery", 45], ["Improvement", 30]]),
      "Performance declines continuously without any recovery"
    ],
    [
      D.bars([["Before change", 70], ["Go-live", 70], ["Adjustment", 70], ["Recovery", 70], ["Improvement", 70]]),
      "Performance remains unchanged throughout the implementation transition"
    ]
  ],
  "The implementation performance dip shows an initial deterioration as employees adapt to unfamiliar procedures, followed by recovery as learning and support improve operational performance. The pattern illustrates why managers should anticipate temporary disruption without assuming that every problem will resolve automatically.");
 
V("W12O2a-09", "W12O2a", 3,
  "Which visual management plan best supports Qasr through an anticipated implementation performance dip?",
  [
    [
      D.flow(["Forecast|dip", "Prepare|capacity", "Support|employees", "Monitor|recovery", "Correct|problems"]),
      "Anticipate disruption, provide temporary resources and monitor recovery while correcting serious problems"
    ],
    [
      D.flow(["Promise|instant gains", "Introduce|process", "Ignore|slowdowns", "Declare|success"]),
      "Promise immediate improvement and avoid examining performance deterioration"
    ],
    [
      D.flow(["Introduce|process", "Remove|support", "Demand|speed", "Avoid|escalation"]),
      "Reduce employee assistance and treat faster execution as the only response"
    ],
    [
      D.flow(["Observe|dip", "Assume|failure", "Cancel|programme", "Avoid|investigation"]),
      "Cancel the programme immediately without investigating adjustment or recovery"
    ]
  ],
  "A responsible implementation plan forecasts temporary deterioration and provides operational capacity and employee support. Managers monitor whether performance recovers while investigating problems requiring corrective action. Neither automatic cancellation nor unconditional acceptance of poor performance is defensible.");
 
OR("W12O2a-10", "W12O2a", 2,
  "Arrange these activities into a logical management response to the implementation performance dip.",
  [
    "Forecast the likely depth and duration of the performance dip",
    "Use the forecast to brief the sponsor and size temporary capacity and floor support",
    "Introduce the redesigned process with that support in place",
    "Measure actual performance weekly against the forecast dip",
    "Investigate shortfalls that exceed the forecast and correct their causes"
  ],
  "The forecast comes first because both the sponsor briefing and the resourcing depend on it. The process is then introduced with support already on the floor. Measuring against the forecast shows whether the organisation is moving through an expected dip, and only shortfalls beyond the forecast signal a problem needing investigation and correction.");
 
MA("W12O2a-11", "W12O2a", 2,
  "Match each stage of the employee change curve to its characteristic response.",
  [
    [
      "Announcement",
      "Employees encounter the proposed change and may feel uncertain about its consequences"
    ],
    [
      "Resistance",
      "Employees question unfamiliar procedures or express concern about changed responsibilities"
    ],
    [
      "Exploration",
      "Employees practise the redesigned process and investigate how it works"
    ],
    [
      "Commitment",
      "Employees develop confidence and increasingly adopt the new operating arrangements"
    ]
  ],
  "The change curve illustrates a possible progression from announcement and uncertainty through resistance, exploration and commitment. These stages help managers understand employee responses, although individuals may adjust at different speeds and do not necessarily follow a fixed timetable.");
 
MA("W12O2a-12", "W12O2a", 3,
  "Match each Qasr implementation observation to the most appropriate management interpretation or response.",
  [
    [
      "Reception employees work more slowly while learning unfamiliar procedures",
      "Provide temporary support and monitor whether performance improves with practice"
    ],
    [
      "Employees express concern about changed responsibilities",
      "Use communication and practical assistance to support understanding and adoption"
    ],
    [
      "A sponsor expects immediate improvement from the day of go-live",
      "Explain the anticipated performance dip and establish realistic transition expectations"
    ],
    [
      "A serious operating problem persists despite employee practice and support",
      "Investigate the cause and escalate for corrective action rather than assuming normal adjustment"
    ]
  ],
  "Implementation requires different responses to learning-related slowdowns, employee concerns, unrealistic sponsor expectations and persistent operating failures. Temporary support and communication can assist adjustment, while serious problems require investigation and escalation. Managers must protect operations without confusing an expected performance dip with permission to ignore failures.");

// W12O2b · Training people to use the process — and helping them stay with it
// Lesson l2: The first weeks after go-live
// Outcome O2 [K3]: Devise a training and change approach that supports go-live.
// Correct answers are authored first; the player shuffles options.
 
M("W12O2b-01", "W12O2b", 1,
  "Why should Qasr's go-live training cover assisted arrival exceptions rather than kiosk operation alone?",
  [
    "Employees must perform the complete arrival process, including cases requiring human intervention",
    "Every corporate arrival must be transferred permanently to the technology development team",
    "Technical instruction is unnecessary whenever an assisted operating path exists",
    "Employees should redesign the approved arrival process independently whenever a kiosk rejects a booking"
  ],
  "Effective implementation training reflects the work employees actually perform. Qasr's reception employees need to understand ordinary kiosk arrivals and assisted exceptions, including relevant responsibilities and escalation decisions. Knowing the kiosk interface alone does not establish competence in the complete end-to-end process.");
 
M("W12O2b-02", "W12O2b", 2,
  "A receptionist encounters an unfamiliar corporate booking while guests are waiting. Which support arrangement best protects service during go-live?",
  [
    "Accessible frontline assistance with a clear route to someone authorised to resolve the operating problem",
    "A remote ticket queue that employees must use without any immediate operational assistance",
    "A requirement that reception employees make unauthorised process changes whenever they encounter an exception",
    "A policy of postponing all exception decisions until the initial implementation support period has ended"
  ],
  "Frontline support should be available where employees perform the work. A receptionist handling a waiting guest needs timely assistance and access to appropriate decision authority. Remote technical tickets may be useful for system defects, but they cannot replace immediate operational support when service is at risk.");
 
M("W12O2b-03", "W12O2b", 3,
  "Qasr receives repeated reports that an approved arrival procedure is unclear, although the kiosk software works correctly. What is the most appropriate escalation response?",
  [
    "Refer the issue to someone authorised to clarify or change the process, then communicate the resolution to employees",
    "Send the issue exclusively to a technical specialist because every implementation problem originates in software",
    "Tell employees to stop reporting the problem because repeated questions demonstrate resistance to change",
    "Allow each property to invent its own permanent procedure without involving the authorised process owner"
  ],
  "A functioning system can still support an unclear or unsuitable operating procedure. Qasr must distinguish technical faults from process problems and escalate each to someone with appropriate authority. Communicating completed corrections helps employees understand the approved procedure and strengthens confidence in the implementation.");
 
TF("W12O2b-04", "W12O2b", 1,
  "Completing technical training does not guarantee that employees can manage every operational exception encountered after go-live.",
  true,
  "This statement is true. Employees may understand the technology while remaining uncertain about unusual cases, handovers or decisions requiring authorisation. Effective implementation combines practical training with accessible operational support during actual service.");
 
TF("W12O2b-05", "W12O2b", 2,
  "Once employees complete their training, implementation support should depend entirely on remote ticket queues because frontline assistance discourages independent working.",
  false,
  "This statement is false. The slides emphasise support where the work occurs, particularly during the initial six weeks. Frontline assistance helps employees resolve unfamiliar problems while protecting service continuity. Remote ticket queues alone may be inadequate when immediate operational decisions are required.");
 
DR("W12O2b-06", "W12O2b", 1,
  "Training that prepares employees for their actual responsibilities is called {1}, while assistance available where employees perform their work is called {2}.",
  [
    ["role-based training", "a system demonstration", "a generic induction"],
    ["frontline support", "a remote ticket queue", "a post-project review"]
  ],
  "Role-based training addresses the tasks, exceptions and decisions employees encounter in their actual responsibilities, which a system demonstration or generic induction does not. Frontline support provides practical help where the work happens, rather than through a ticket queue. Together, they help employees operate the redesigned process during the transition.");
 
DR("W12O2b-07", "W12O2b", 3,
  "When a reported difficulty concerns an unsuitable operating procedure rather than malfunctioning technology, escalation should reach {1}, and completed corrections should be {2}.",
  [
    ["someone authorised to change the process", "only the software supplier", "an employee without decision authority"],
    ["communicated visibly to affected employees", "withheld until the project closes", "recorded without informing operational staff"]
  ],
  "Process problems require decisions from people authorised to clarify or change operating procedures. Visible communication of completed fixes demonstrates that employee feedback produces meaningful action. This supports confidence, encourages further reporting and reduces reliance on informal workarounds.");
 
V("W12O2b-08", "W12O2b", 2,
  "Which diagram best represents a suitable support route for an unfamiliar arrival exception at Qasr?",
  [
    [
      D.flow(["Employee|reports", "Frontline|support", "Authorised|decision", "Problem|resolved", "Staff|informed"]),
      "A reported problem reaches practical support, appropriate authority and visible resolution"
    ],
    [
      D.flow(["Employee|reports", "Remote|queue", "No immediate|response", "Guest|waits"]),
      "An unresolved problem remains in a distant queue while service is delayed"
    ],
    [
      D.flow(["Employee|reports", "Employee|changes rules", "No approval|obtained", "Local|workaround"]),
      "An employee independently changes the approved process without authorisation"
    ],
    [
      D.flow(["Employee|reports", "Manager|ignores", "Problem|repeats", "Staff|stop reporting"]),
      "Management ignores recurring problems and receives progressively less operational feedback"
    ]
  ],
  "An effective implementation support route connects frontline employees with practical assistance and appropriate decision authority. Problems should be resolved promptly where possible, and completed corrections should be communicated. This protects service while strengthening employee confidence in the redesigned process.");
 
V("W12O2b-09", "W12O2b", 3,
  "Which visual training and support plan best addresses Qasr's complete go-live requirements?",
  [
    [
      D.hier([
        ["Reception", "Normal arrivals and assisted exceptions"],
        ["Supervisors", "Escalation and operating decisions"],
        ["Frontline support", "Immediate practical assistance"],
        ["Feedback", "Daily reporting and visible corrections"]
      ]),
      "Training covers actual responsibilities while support and feedback continue during implementation"
    ],
    [
      D.hier([
        ["Reception", "Kiosk buttons only"],
        ["Supervisors", "No escalation responsibility"],
        ["Frontline support", "Unavailable after training"],
        ["Feedback", "Collected only at project closure"]
      ]),
      "Training focuses narrowly on technology while operational support is removed"
    ],
    [
      D.hier([
        ["Reception", "Independent process redesign"],
        ["Supervisors", "Avoid operational decisions"],
        ["Frontline support", "Refer every issue remotely"],
        ["Feedback", "Do not communicate fixes"]
      ]),
      "Employees make unauthorised changes while management avoids direct support"
    ],
    [
      D.hier([
        ["Reception", "Memorise system features"],
        ["Supervisors", "Repeat generic training"],
        ["Frontline support", "Wait for external specialists"],
        ["Feedback", "Assume resistance explains problems"]
      ]),
      "Implementation relies on generic instruction and treats operating difficulties as employee resistance"
    ]
  ],
  "Qasr needs training matched to actual employee responsibilities, including normal arrivals, exceptions and escalation. Supervisors require decision authority, frontline employees need immediate assistance, and recurring problems must be reported and corrected. Visible feedback supports confidence and sustained adoption.");
 
OR("W12O2b-10", "W12O2b", 2,
  "Arrange these activities into a logical process for preparing and supporting employees during go-live.",
  [
    "Identify the actual responsibilities and exceptions employees will encounter",
    "Design practical training around those responsibilities and exceptions",
    "Deliver the training and put frontline assistance in place before go-live",
    "Introduce the redesigned process while collecting problems daily",
    "Fix recurring problems and communicate what has been fixed"
  ],
  "Training can only be designed once the real responsibilities and exceptions are known, and it must be delivered, with frontline help in place, before go-live. Daily collection of problems starts when the process is introduced. Fixing recurring problems and communicating the fixes comes last, because it depends on those reports and shows employees that reporting is worth doing.");
 
MA("W12O2b-11", "W12O2b", 2,
  "Match each implementation support responsibility to its principal purpose.",
  [
    [
      "Role-based training",
      "Prepares employees for normal tasks, exceptions and changed responsibilities"
    ],
    [
      "Frontline assistance",
      "Provides practical help where employees encounter operating difficulties"
    ],
    [
      "Process escalation",
      "Connects procedural problems with someone authorised to make operating decisions"
    ],
    [
      "Visible feedback",
      "Shows employees how reported problems have been resolved"
    ]
  ],
  "Role-based training prepares employees for the work they must perform, while frontline assistance supports them during actual operations. Process escalation provides access to appropriate authority, and visible feedback demonstrates that reported problems lead to corrective action. These responsibilities work together to strengthen implementation.");
 
MA("W12O2b-12", "W12O2b", 3,
  "Match each Qasr go-live difficulty to the most appropriate training or support response.",
  [
    [
      "Reception employees know the kiosk interface but cannot manage unusual corporate arrivals",
      "Provide practical training covering the assisted exception path"
    ],
    [
      "An employee encounters an unfamiliar problem while guests continue waiting",
      "Provide accessible assistance where the arrival process is performed"
    ],
    [
      "A recurring problem requires an authorised change to an operating procedure",
      "Escalate the issue to someone with process decision authority"
    ],
    [
      "Employees repeatedly report problems but receive no information about completed fixes",
      "Communicate corrections visibly and explain the resulting operating arrangements"
    ],
    [
      "Employees temporarily require more time to complete unfamiliar activities",
      "Provide additional operating capacity during the adjustment period"
    ]
  ],
  "Different implementation difficulties require different responses. Practical training addresses knowledge gaps, frontline assistance protects service, authorised escalation resolves process questions, visible feedback builds confidence, and temporary capacity accommodates slower work during adjustment. A dependable go-live plan combines these responses rather than relying on technical instruction alone.");

// W12O2c · When adoption stops at sixty-five percent
// Lesson l2: The first weeks after go-live
// Outcome O2 [K3]: Devise a training and change approach that supports go-live.
// Correct answers are authored first; the player shuffles options.
 
M("W12O2c-01", "W12O2c", 1,
  "What proportion of Qasr's pilot arrivals continues through the reception desk rather than the kiosk?",
  [
    "35%",
    "65%",
    "25%",
    "90%"
  ],
  "Qasr's pilot reports 65% kiosk adoption, leaving 35% of arrivals handled at the reception desk. The remaining arrivals are predominantly corporate bookings rejected by the kiosk. This residual population requires investigation before managers decide whether the operating arrangement is acceptable.");
 
M("W12O2c-02", "W12O2c", 2,
  "Qasr's kiosk adoption has plateaued at 65%. Why should management avoid immediately blaming reception employees for resistance?",
  [
    "The remaining arrivals are predominantly corporate bookings rejected by the kiosk",
    "The pilot demonstrates that reception employees have refused every available training opportunity",
    "The redesigned process has already achieved complete adoption across all arrival categories",
    "The tourism authority requires every guest arrival to be completed exclusively through a kiosk"
  ],
  "The pilot evidence indicates that many residual arrivals involve corporate bookings rejected by the kiosk. This suggests a process capability or exception-handling issue rather than automatically demonstrating employee resistance. Management should investigate the affected cases before selecting corrective action.");
 
M("W12O2c-03", "W12O2c", 3,
  "Qasr reports improved guest satisfaction alongside a persistent kiosk adoption plateau. Which conclusion is most defensible?",
  [
    "The improvement is encouraging, but management must still assess the residual arrivals and their operational consequences",
    "The satisfaction improvement proves that every arrival category is adequately supported by the redesigned process",
    "The adoption plateau proves that the entire redesign has failed regardless of guest satisfaction",
    "The two measures cannot coexist because incomplete adoption necessarily reduces overall guest satisfaction"
  ],
  "Guest satisfaction increased from 6.8 to 7.9 while kiosk adoption plateaued at 65%. These findings can coexist because they measure different aspects of the operating process. Management must investigate the remaining 35% of arrivals before determining whether the assisted arrangement is acceptable.");
 
TF("W12O2c-04", "W12O2c", 1,
  "Qasr's pilot shows that an assisted exception takes nine minutes, compared with two minutes for kiosk processing.",
  true,
  "This statement is true. The pilot reports two-minute kiosk processing and nine-minute assisted exception processing. The difference matters when evaluating residual arrivals, but total operating cost cannot be calculated without additional evidence about volumes and staffing.");
 
TF("W12O2c-05", "W12O2c", 2,
  "Every arrival handled through Qasr's assisted exception path should be classified as an unauthorised employee workaround.",
  false,
  "This statement is false. Qasr introduced an assisted exception path following frontline objections, and that path is working. An approved exception arrangement is not equivalent to an informal workaround. Managers must distinguish authorised process variants and exceptions from unapproved alternatives.");
 
DR("W12O2c-06", "W12O2c", 1,
  "Qasr's kiosk adoption has plateaued at {1}, while the remaining {2} of arrivals are handled at the desk.",
  [
    ["65%", "35%", "90%"],
    ["35%", "65%", "10%"]
  ],
  "The pilot reports a kiosk adoption plateau of 65%, leaving 35% of arrivals handled at the desk. The remaining population is predominantly composed of corporate bookings rejected by the kiosk, making investigation of those cases essential.");
 
DR("W12O2c-07", "W12O2c", 3,
  "When employees repeatedly bypass a redesigned process, management should investigate whether the behaviour reflects {1} or {2} before selecting corrective action.",
  [
    ["a training or knowledge gap", "confirmed benefits realisation", "automatic regulatory noncompliance"],
    ["a limitation in the operating process", "successful project closure", "guaranteed employee misconduct"]
  ],
  "Persistent alternatives may arise because employees misunderstand an available procedure or because the intended process cannot adequately handle legitimate cases. These causes require different responses. Management should diagnose the residual population before assuming that additional training will solve the problem.");
 
V("W12O2c-08", "W12O2c", 2,
  "Which visual accurately represents Qasr's reported pilot adoption and residual arrivals?",
  [
    [
      D.hier([
        ["Kiosk adoption", "65%"],
        ["Desk-handled arrivals", "35%"],
        ["Predominant residual case", "Corporate bookings rejected by the kiosk"]
      ]),
      "The reported adoption plateau and residual arrival population"
    ],
    [
      D.hier([
        ["Kiosk adoption", "35%"],
        ["Desk-handled arrivals", "65%"],
        ["Predominant residual case", "Routine kiosk arrivals"]
      ]),
      "The adoption and residual proportions are reversed"
    ],
    [
      D.hier([
        ["Kiosk adoption", "100%"],
        ["Desk-handled arrivals", "0%"],
        ["Predominant residual case", "No exceptions"]
      ]),
      "The redesigned process is represented as having achieved complete kiosk adoption"
    ],
    [
      D.hier([
        ["Kiosk adoption", "65%"],
        ["Desk-handled arrivals", "35%"],
        ["Predominant residual case", "Employees refusing all kiosk training"]
      ]),
      "The reported proportions are combined with an unsupported explanation of employee resistance"
    ]
  ],
  "Qasr's pilot reports 65% kiosk adoption and 35% desk-handled arrivals. The residual population consists predominantly of corporate bookings rejected by the kiosk. The evidence does not establish that employee resistance is the cause of the adoption plateau.");
 
V("W12O2c-09", "W12O2c", 3,
  "Which diagram best represents a responsible management response to Qasr's persistent adoption plateau?",
  [
    [
      D.flow(["Measure|adoption", "Classify|residual cases", "Investigate|causes", "Authorise|response", "Monitor|results"]),
      "Investigate residual cases and their causes before selecting and monitoring corrective action"
    ],
    [
      D.flow(["Observe|plateau", "Assume|resistance", "Repeat|training", "Declare|resolved"]),
      "Treat incomplete adoption as employee resistance without investigating the remaining cases"
    ],
    [
      D.flow(["Observe|plateau", "Ignore|exceptions", "Expand|rollout", "Assume|success"]),
      "Expand implementation without examining the residual population"
    ],
    [
      D.flow(["Observe|plateau", "Ban|assistance", "Require|kiosk use", "Avoid|monitoring"]),
      "Remove assisted processing without addressing corporate bookings rejected by the kiosk"
    ]
  ],
  "A responsible response measures adoption, classifies residual cases and investigates why they remain outside the intended route. Management can then authorise appropriate training, process correction or exception handling and monitor the results. Assuming resistance or prohibiting assistance does not resolve unsupported corporate arrivals.");
 
OR("W12O2c-10", "W12O2c", 2,
  "Arrange these activities into a logical investigation of a persistent adoption plateau.",
  [
    "Measure the proportion of cases using the redesigned process",
    "Identify the cases remaining outside the intended operating route",
    "Classify recurring exceptions and distinguish approved paths from informal workarounds",
    "Investigate whether the causes involve training, procedures or process limitations",
    "Authorise appropriate corrective action and communicate the resulting changes",
    "Continue monitoring adoption and the remaining exception population"
  ],
  "Adoption analysis begins with measurement but must extend to the cases remaining outside the redesigned process. Managers should classify exceptions, investigate their causes and distinguish approved arrangements from informal workarounds. Authorised corrections and continued monitoring establish whether the response addresses the underlying problem.");
 
MA("W12O2c-11", "W12O2c", 2,
  "Match each Qasr pilot measure to its reported value or meaning.",
  [
    [
      "Kiosk adoption",
      "65% of arrivals"
    ],
    [
      "Desk-handled arrivals",
      "35% of arrivals"
    ],
    [
      "Kiosk processing time",
      "2 minutes per arrival"
    ],
    [
      "Assisted exception processing time",
      "9 minutes per arrival"
    ],
    [
      "Guest satisfaction after the pilot",
      "7.9 compared with 6.8 before the pilot"
    ]
  ],
  "The pilot reports 65% kiosk adoption and 35% desk-handled arrivals. Kiosk processing takes two minutes, while assisted exceptions take nine minutes. Guest satisfaction increased from 6.8 to 7.9, showing that improved satisfaction and incomplete kiosk adoption can coexist.");
 
MA("W12O2c-12", "W12O2c", 3,
  "Match each adoption-related observation to the most defensible management interpretation or response.",
  [
    [
      "Employees misunderstand a function already available in the redesigned process",
      "Provide targeted practical training and verify correct use"
    ],
    [
      "The kiosk rejects a legitimate corporate arrival category",
      "Investigate the process limitation and determine an authorised operating response"
    ],
    [
      "Employees create an unapproved alternative to complete difficult transactions",
      "Catalogue the workaround and investigate its underlying cause"
    ],
    [
      "A formally introduced assisted exception path remains necessary",
      "Evaluate its operational consequences without automatically treating it as unauthorised"
    ],
    [
      "Guest satisfaction improves while kiosk adoption remains incomplete",
      "Assess both performance signals and investigate the residual population"
    ]
  ],
  "Incomplete adoption can arise from knowledge gaps, process limitations or continuing exception requirements. These situations require different responses. Qasr should distinguish approved assisted handling from informal workarounds, investigate unsupported corporate arrivals and evaluate adoption alongside guest satisfaction rather than treating one measure as conclusive.");

// W12O1d · A pilot is not fourteen properties
// Lesson l3: Fourteen properties, different realities
// Outcome O1 [S2]: Evaluate implementation approaches against risk,
// benefit and organisational readiness.
// Correct answers are authored first; the player shuffles options.
 
M("W12O1d-01", "W12O1d", 1,
  "What is the principal limitation of using Qasr's two pilot properties as evidence for wider implementation?",
  [
    "Their operating conditions may not represent those of every remaining property",
    "Pilot experience cannot provide any useful evidence about actual process operation",
    "A successful pilot automatically proves that all other properties are ready",
    "The pilot prevents Qasr from using approved process variants at other locations"
  ],
  "Pilot experience provides valuable evidence from actual operations, but its transferability depends on similarities between sites. Marina and Corniche cannot automatically represent the physical arrangements, operating conditions and approved variants of every other Qasr property.");
 
M("W12O1d-02", "W12O1d", 2,
  "Three Qasr heritage properties lack sufficient lobby space for kiosks. Why should their registered assisted-path variants not be treated as implementation failures?",
  [
    "The variants are approved architectural arrangements addressing genuine physical operating constraints",
    "The variants demonstrate that employees have independently rejected the redesigned arrival process",
    "The variants allow each heritage property to abandon the common process without authorisation",
    "The variants prove that kiosk adoption must be identical at every property regardless of physical conditions"
  ],
  "The heritage properties have registered assisted-path variants under Qasr's process architecture. These approved arrangements accommodate genuine physical constraints while preserving process control. They are not equivalent to unauthorised workarounds or uncontrolled local redesign.");
 
M("W12O1d-03", "W12O1d", 3,
  "Qasr has gained experience from several deployments, and managers propose reducing support for every later property. What is the strongest objection?",
  [
    "Later properties may have different readiness and operating risks that require equal or greater support",
    "Later properties must always receive more support regardless of their operating conditions",
    "Accumulated implementation experience has no value for preparing subsequent locations",
    "Once the pilot is complete, employee preparation and operational assistance become unnecessary"
  ],
  "Later sites can benefit from accumulated implementation learning, but they may also have different physical constraints, operating complexity and readiness levels. Support should reflect those conditions rather than automatically decline as deployment progresses.");
 
TF("W12O1d-04", "W12O1d", 1,
  "A registered process variant can preserve the approved process architecture while accommodating a genuine operating constraint.",
  true,
  "This statement is true. Registered variants are formally recognised operating arrangements that address legitimate differences between locations. They support controlled variation without allowing each site to redesign the process independently.");
 
TF("W12O1d-05", "W12O1d", 2,
  "Because Marina and Corniche have piloted Qasr's arrival process, every remaining property can be considered operationally ready without further assessment.",
  false,
  "This statement is false. Pilot evidence must be assessed for transferability because other properties may have different physical arrangements, approved variants and operating conditions. Each site's readiness still requires appropriate evaluation.");
 
DR("W12O1d-06", "W12O1d", 1,
  "The question of whether pilot findings apply to other operating locations concerns pilot {1}, while an approved local operating difference is a registered process {2}.",
  [
    ["generalisability", "adoption", "rollback"],
    ["variant", "defect", "workaround"]
  ],
  "Pilot generalisability concerns whether evidence from limited deployment can reasonably apply to other locations. A registered process variant is an approved arrangement that accommodates a legitimate operating difference while preserving the organisation's process architecture, unlike an unapproved workaround.");
 
DR("W12O1d-07", "W12O1d", 3,
  "When later implementation sites differ substantially from the pilot, managers should assess {1} and allocate support according to {2}.",
  [
    ["local operating conditions", "the pilot sites' conditions only", "the installation calendar"],
    ["site-specific risk and readiness", "a fixed reduction after every deployment", "an equal share for every property"]
  ],
  "Implementation preparation must account for the conditions present at each location, because the pilot site mainly teaches you about the pilot site. Site-specific risk and readiness determine whether additional training, operational support or approved variants are necessary. Later sites tend to receive less attention, so support should be planned deliberately rather than reduced or spread evenly by default.");
 
V("W12O1d-08", "W12O1d", 2,
  "Which diagram best represents responsible transfer of pilot learning to Qasr's remaining properties?",
  [
    [
      D.flow(["Pilot|evidence", "Assess|site conditions", "Confirm|approved variant", "Prepare|support", "Evaluate|readiness"]),
      "Assess local conditions and approved variants before preparing and evaluating each deployment"
    ],
    [
      D.flow(["Pilot|success", "Assume|identical sites", "Copy|arrangements", "Declare|ready"]),
      "Assume that all properties have the same operating conditions as the pilot"
    ],
    [
      D.flow(["Pilot|evidence", "Ignore|exceptions", "Remove|support", "Expand|deployment"]),
      "Ignore unresolved pilot problems and reduce support before wider implementation"
    ],
    [
      D.flow(["Pilot|success", "Allow|local redesign", "Avoid|approval", "Expand|deployment"]),
      "Permit uncontrolled local process changes without architectural approval"
    ]
  ],
  "Responsible pilot transfer requires assessing local operating conditions, confirming approved variants and preparing appropriate support before evaluating readiness. Successful pilot experience cannot replace site-specific assessment or justify uncontrolled local redesign.");
 
V("W12O1d-09", "W12O1d", 3,
  "Which visual comparison correctly distinguishes Qasr's approved heritage variants from unauthorised local workarounds?",
  [
    [
      D.hier([
        ["Registered variant", "Approved assisted path for a genuine physical constraint"],
        ["Unauthorised workaround", "Unapproved alternative requiring investigation"],
        ["Implementation responsibility", "Preserve architecture and prepare the approved arrangement"]
      ]),
      "Approved variation is distinguished from informal alternatives and implemented under process control"
    ],
    [
      D.hier([
        ["Registered variant", "Employee refusal to adopt"],
        ["Unauthorised workaround", "Automatically approved local improvement"],
        ["Implementation responsibility", "Permit unrestricted redesign"]
      ]),
      "Approved variants are incorrectly treated as resistance while workarounds receive automatic approval"
    ],
    [
      D.hier([
        ["Registered variant", "A temporary software defect"],
        ["Unauthorised workaround", "A mandatory standard process"],
        ["Implementation responsibility", "Remove every assisted path"]
      ]),
      "Architectural variation is confused with defects and unsupported standardisation"
    ],
    [
      D.hier([
        ["Registered variant", "Requires no operational preparation"],
        ["Unauthorised workaround", "Requires no investigation"],
        ["Implementation responsibility", "Ignore local operating conditions"]
      ]),
      "Both approved variants and informal alternatives are treated as requiring no management attention"
    ]
  ],
  "Qasr's heritage assisted-path variants are registered architectural arrangements addressing physical constraints. They must be prepared and operated under approved process controls. Informal workarounds are different because they lack authorisation and require investigation before management decides how to respond.");
 
OR("W12O1d-10", "W12O1d", 2,
  "Arrange these activities into a logical readiness assessment for a property joining Qasr's wider rollout.",
  [
    "Review relevant evidence and unresolved lessons from Marina and Corniche",
    "Compare the new property's physical and operating constraints with the pilot's conditions",
    "Confirm the approved process arrangement or registered variant",
    "Prepare employees, procedures and operational support for that arrangement",
    "Evaluate whether the property is ready for implementation"
  ],
  "Site readiness assessment begins with the pilot evidence, because the new property's conditions must be compared against it to see which lessons generalise. Managers then confirm the approved arrangement, prepare the people and support needed to operate it, and evaluate readiness. Pilot success alone cannot replace these steps.");
 
MA("W12O1d-11", "W12O1d", 2,
  "Match each multi-site implementation concept to its meaning.",
  [
    [
      "Pilot generalisability",
      "Whether evidence from limited deployment applies to other operating locations"
    ],
    [
      "Registered process variant",
      "An approved operating difference addressing a legitimate local constraint"
    ],
    [
      "Uncontrolled local redesign",
      "An unapproved change that can undermine process consistency and accountability"
    ],
    [
      "Site readiness",
      "The ability of a location to operate its approved process with suitable people and support"
    ],
    [
      "Implementation support allocation",
      "Distribution of assistance according to local operating risks and preparation needs"
    ]
  ],
  "Multi-site implementation requires managers to assess the transferability of pilot evidence, preserve approved variants and prevent uncontrolled redesign. Site readiness depends on operating capability, while support allocation should reflect the risks and needs of each location.");
 
MA("W12O1d-12", "W12O1d", 3,
  "Match each Qasr implementation observation to the most defensible management response.",
  [
    [
      "A heritage property lacks lobby space for kiosks",
      "Prepare its registered assisted-path variant under the approved architecture"
    ],
    [
      "A later property has unfamiliar operating conditions",
      "Assess whether pilot lessons transfer and whether additional preparation is required"
    ],
    [
      "An employee invents an unapproved alternative arrival procedure",
      "Investigate the workaround rather than treating it as an approved variant"
    ],
    [
      "The implementation team assumes later sites need progressively less assistance",
      "Allocate support according to each property's readiness and operating risk"
    ],
    [
      "Corporate arrival exceptions remain unresolved in the pilot",
      "Examine the implications before reproducing the same limitation across additional properties"
    ]
  ],
  "Qasr must distinguish legitimate architectural variation from unauthorised local changes. Each property requires assessment of operating conditions, readiness and support needs. Unresolved pilot exceptions should inform wider implementation preparations rather than being replicated without investigation.");

// W12O1e · Sequencing the twelve remaining properties
// Lesson l3: Fourteen properties, different realities
// Outcome O1 [S2]: Evaluate implementation approaches against risk,
// benefit and organisational readiness.
// Correct answers are authored first; the player shuffles options.
 
M("W12O1e-01", "W12O1e", 1,
  "How many Qasr properties remain to be deployed after the Marina and Corniche pilots?",
  [
    "12 properties",
    "14 properties",
    "10 properties",
    "8 properties"
  ],
  "Qasr has fourteen properties in total, and Marina and Corniche have already piloted the redesigned arrival process. The remaining rollout therefore covers twelve properties: five standard-layout, three heritage and four peak-occupancy properties.");
 
M("W12O1e-02", "W12O1e", 2,
  "Why are Qasr's five standard-layout properties comparatively straightforward candidates for an early deployment wave?",
  [
    "Exhibit 12 identifies no additional physical or occupancy constraint for this group, although readiness must still be assessed",
    "They have already completed the same pilot as Marina and Corniche and require no further preparation",
    "They are exempt from the tourism authority's digital guest record requirement",
    "Their employees are guaranteed to achieve complete kiosk adoption immediately after go-live"
  ],
  "The five standard-layout properties have no identified constraint in Exhibit 12, making them comparatively straightforward candidates for wider deployment. However, that does not establish automatic readiness. Employee preparation, operational support and relevant pilot limitations still require assessment.");
 
M("W12O1e-03", "W12O1e", 3,
  "Qasr's programme director proposes completing the remaining rollout over eight weeks, leaving three weeks before the January deadline. What is the strongest concern raised by the operations director's question about failure in the eighth week?",
  [
    "A schedule may appear feasible under planned conditions while providing inadequate contingency for a serious late deployment problem",
    "An eight-week rollout automatically violates the January requirement regardless of its actual completion date",
    "A three-week buffer guarantees that every possible operational failure can be corrected before the deadline",
    "The final implementation wave cannot encounter problems because earlier deployments have already produced learning"
  ],
  "The operations director's question tests whether the proposed schedule can withstand disruption rather than merely finish when everything proceeds as planned. A serious problem during the eighth week could consume the remaining buffer. Qasr must therefore evaluate recovery requirements and contingency before accepting the schedule.");
 
TF("W12O1e-04", "W12O1e", 1,
  "Exhibit 12 identifies four Qasr properties with occupancy above 90% through January.",
  true,
  "This statement is true. Four properties face occupancy above 90% through January, and the case states that they cannot absorb a January performance dip. Their operating conditions create an important constraint on rollout timing.");
 
TF("W12O1e-05", "W12O1e", 2,
  "Because Qasr's three heritage properties have registered assisted-path variants, they may be deployed without preparing employees or assessing operational readiness.",
  false,
  "This statement is false. Registered variants are approved operating arrangements, but they still require appropriate preparation. Qasr must confirm the variant, train employees, arrange support and assess readiness before deployment.");
 
DR("W12O1e-06", "W12O1e", 1,
  "Exhibit 12 identifies {1} standard-layout properties and {2} heritage properties among Qasr's twelve remaining deployment locations.",
  [
    ["five", "three", "four"],
    ["three", "five", "two"]
  ],
  "The remaining twelve properties comprise five standard-layout locations, three heritage properties and four peak-occupancy properties. The two pilot properties, Marina and Corniche, are already live and are not part of the remaining deployment count.");
 
DR("W12O1e-07", "W12O1e", 3,
  "Qasr's proposed rollout begins in {1} and lasts eight weeks, leaving a planned {2} before the January regulatory deadline.",
  [
    ["October", "January", "February"],
    ["three-week buffer", "nine-month buffer", "twelve-week buffer"]
  ],
  "The programme director proposes beginning the remaining rollout in October and deploying twelve properties over eight weeks. The schedule would finish in December and leave three weeks before the digital guest record requirement takes effect on 1 January. The adequacy of that buffer remains a management judgement.");
 
V("W12O1e-08", "W12O1e", 2,
  "Which visual correctly represents the property groups in Qasr's Exhibit 12?",
  [
    [
      D.hier([
        ["Already piloted", "2 properties"],
        ["Standard layout", "5 properties"],
        ["Heritage", "3 properties"],
        ["Peak occupancy", "4 properties"]
      ]),
      "The fourteen properties are divided into two pilot sites and twelve remaining locations"
    ],
    [
      D.hier([
        ["Already piloted", "4 properties"],
        ["Standard layout", "5 properties"],
        ["Heritage", "3 properties"],
        ["Peak occupancy", "2 properties"]
      ]),
      "The number of pilot and peak-occupancy properties is reversed"
    ],
    [
      D.hier([
        ["Already piloted", "2 properties"],
        ["Standard layout", "3 properties"],
        ["Heritage", "5 properties"],
        ["Peak occupancy", "4 properties"]
      ]),
      "The standard-layout and heritage group sizes are reversed"
    ],
    [
      D.hier([
        ["Already piloted", "2 properties"],
        ["Standard layout", "5 properties"],
        ["Heritage", "4 properties"],
        ["Peak occupancy", "3 properties"]
      ]),
      "The heritage and peak-occupancy group sizes are reversed"
    ]
  ],
  "Exhibit 12 identifies two pilot properties, five standard-layout properties, three heritage properties and four peak-occupancy properties. These groups total fourteen properties, leaving twelve locations for wider implementation after Marina and Corniche.");
 
V("W12O1e-09", "W12O1e", 3,
  "Which proposed rollout logic best reflects Qasr's operating constraints without treating a candidate sequence as an approved decision?",
  [
    [
      D.flow([
        "Review|pilot evidence",
        "Assess|standard sites",
        "Prepare|heritage variants",
        "Protect|peak occupancy",
        "Confirm|readiness"
      ]),
      "Use pilot learning, assess comparatively straightforward sites, prepare approved variants and protect high-demand operations"
    ],
    [
      D.flow([
        "Ignore|pilot exceptions",
        "Deploy|all sites",
        "Assume|readiness",
        "Close|programme"
      ]),
      "Expand implementation without considering unresolved pilot problems or site readiness"
    ],
    [
      D.flow([
        "Deploy|peak sites in January",
        "Accept|performance dip",
        "Review|later",
        "Assume|compliance"
      ]),
      "Schedule peak-occupancy properties during a period when they cannot absorb implementation disruption"
    ],
    [
      D.flow([
        "Require|identical kiosks",
        "Ignore|heritage constraints",
        "Remove|variants",
        "Deploy|uniformly"
      ]),
      "Disregard registered heritage variants and require unsuitable physical arrangements"
    ]
  ],
  "A defensible candidate sequence considers pilot evidence, local readiness, approved heritage variants and the inability of peak-occupancy properties to absorb a January performance dip. The actual order remains a management decision requiring evidence and justification. The diagram does not represent an already approved Qasr schedule.");
 
OR("W12O1e-10", "W12O1e", 2,
  "Arrange these activities into a logical process for developing Qasr's twelve-property rollout sequence.",
  [
    "Review the Marina and Corniche pilot evidence and unresolved operating concerns",
    "Classify the remaining properties by their Exhibit 12 constraints, noting where pilot lessons may not transfer",
    "Assess readiness and preparation requirements for each property group",
    "Propose deployment waves that protect operations and accommodate approved variants",
    "Test the proposed schedule against the January deadline and credible contingency needs",
    "Present the conditional sequence and its assumptions to the steering group"
  ],
  "A defensible rollout sequence begins with pilot learning, which is then used to classify the remaining sites and see where its lessons may not transfer. Managers assess readiness, develop suitable deployment waves and examine whether the schedule can withstand disruption. The recommendation must make its assumptions and contingency requirements explicit rather than treating planned dates as guaranteed outcomes.");
 
MA("W12O1e-11", "W12O1e", 2,
  "Match each Qasr property group to its defining condition in Exhibit 12.",
  [
    [
      "Marina and Corniche",
      "Two properties that have already piloted the redesigned arrival process"
    ],
    [
      "Five standard-layout properties",
      "Locations with no additional constraint identified in the exhibit"
    ],
    [
      "Three heritage properties",
      "Locations without kiosk space that require registered assisted-path variants"
    ],
    [
      "Four peak-occupancy properties",
      "Locations above 90% occupancy through January that cannot absorb a January performance dip"
    ]
  ],
  "Exhibit 12 distinguishes Qasr's property groups by implementation status and operating constraints. Marina and Corniche are already piloted, standard-layout properties have no identified additional constraint, heritage properties require registered variants, and peak-occupancy properties face exceptional disruption risk through January.");
 
MA("W12O1e-12", "W12O1e", 3,
  "Match each Qasr rollout observation to the most defensible management implication.",
  [
    [
      "Five standard-layout properties have no identified additional constraint",
      "Consider them as comparatively straightforward candidates while still verifying readiness"
    ],
    [
      "Three heritage properties cannot accommodate kiosks",
      "Prepare and assess their registered assisted-path variants"
    ],
    [
      "Four properties remain above 90% occupancy through January",
      "Protect them from deployment timing that creates an unacceptable January performance dip"
    ],
    [
      "The proposed eight-week rollout leaves three weeks before the deadline",
      "Evaluate whether the buffer can accommodate credible late implementation problems"
    ],
    [
      "The pilot still has a 35% desk-handled arrival population",
      "Examine the consequences of unresolved corporate-arrival exceptions before wider replication"
    ]
  ],
  "Qasr's rollout must reflect the different operating constraints identified in Exhibit 12. Standard-layout properties may be comparatively straightforward, heritage variants require preparation, and peak-occupancy sites need protection from January disruption. The proposed buffer and unresolved pilot exceptions must also inform the final sequence and contingency planning.");

// W12O3a · The go-live decision is not a formality
// Lesson l3: Fourteen properties, different realities
// Outcome O3 [S3]: Assess readiness and design contingency for implementation.
// Correct answers are authored first; the player shuffles options.
 
M("W12O3a-01", "W12O3a", 1,
  "What is the principal purpose of a formal go/no-go decision before implementation?",
  [
    "Determine whether predefined readiness conditions are satisfied before authorising operational deployment",
    "Confirm that the scheduled deployment date has arrived regardless of remaining operating concerns",
    "Replace operational readiness assessment with a report of completed technical installation activities",
    "Establish that every expected business benefit has already been realised before the process is introduced"
  ],
  "A formal go/no-go decision assesses predefined readiness conditions using evidence before authorising deployment. It distinguishes a planned implementation date from an accountable decision that the organisation can operate the redesigned process dependably.");
 
M("W12O3a-02", "W12O3a", 2,
  "Qasr's kiosks pass technical testing, but reception employees cannot confidently handle essential corporate arrival exceptions. What does this demonstrate?",
  [
    "Technical readiness does not automatically establish operational readiness",
    "Successful technical testing makes further employee preparation unnecessary",
    "Every operating exception must be removed before the redesigned process can exist",
    "The Realize Value phase should assume responsibility for training employees before go-live"
  ],
  "Technical readiness concerns whether the required systems and functionality are prepared. Operational readiness also requires trained employees, workable procedures, suitable support and access to authorised decisions. Qasr cannot infer complete readiness from successful kiosk testing alone.");
 
M("W12O3a-03", "W12O3a", 3,
  "A Qasr property has an unresolved escalation weakness, and the programme director requests approval to preserve the rollout schedule. Which response best reflects accountable go-live governance?",
  [
    "Assess the weakness against predefined criteria and require an authorised, documented decision on whether deployment may proceed",
    "Approve deployment automatically because the published schedule has already committed project resources",
    "Remove the escalation criterion during the meeting without recording the change or its justification",
    "Ask reception employees to accept responsibility for any unresolved decisions without providing appropriate authority"
  ],
  "Go-live governance requires objective criteria, reliable evidence and named decision authority. An unresolved readiness condition must be assessed rather than quietly ignored. If an authorised waiver is considered, the exception and justification must be recorded, although documentation cannot make unacceptable operational exposure safe.");
 
TF("W12O3a-04", "W12O3a", 1,
  "Go/no-go criteria should be established before the decision meeting so that managers can evaluate readiness against agreed conditions.",
  true,
  "This statement is true. Predefined criteria reduce the risk that managers will redefine readiness under pressure to preserve a deployment date. The decision meeting should examine evidence against those conditions rather than simply endorse completed project activities.");
 
TF("W12O3a-05", "W12O3a", 2,
  "A documented readiness waiver automatically makes an otherwise unsafe implementation acceptable because the remaining risk has been formally recorded.",
  false,
  "This statement is false. A waiver records an authorised exception and its justification, but it does not create missing operational capability or eliminate the consequences of failure. Some unmet conditions may justify postponement rather than approval.");
 
DR("W12O3a-06", "W12O3a", 1,
  "A planned deployment date becomes an authorised go-live only after the responsible decision-maker evaluates predefined {1} and records a {2}.",
  [
    ["readiness criteria", "project milestones", "installation reports"],
    ["go/no-go decision", "status update", "training attendance list"]
  ],
  "Predefined readiness criteria identify the conditions required for dependable operation, which completed milestones or installation reports cannot show on their own. A named authority evaluates the evidence and records whether implementation should proceed or be postponed. The scheduled date alone does not establish readiness.");
 
DR("W12O3a-07", "W12O3a", 3,
  "When Qasr considers proceeding despite an unmet readiness condition, an authorised {1} must include a documented {2}.",
  [
    ["waiver", "rollback trigger", "stop criterion"],
    ["justification", "verbal agreement", "revised deployment date"]
  ],
  "A readiness waiver is an authorised exception to an agreed criterion, and the slides require the waiver and its reason to be recorded. Its justification must be documented so the decision remains transparent and accountable. Recording the waiver does not eliminate the unresolved condition or make unacceptable operational risk safe.");
 
V("W12O3a-08", "W12O3a", 2,
  "Which diagram best represents an accountable go/no-go decision process?",
  [
    [
      D.flow(["Define|criteria", "Collect|evidence", "Review|readiness", "Named|authority", "Record|decision"]),
      "Predefined criteria and evidence support a recorded decision by an authorised person or forum"
    ],
    [
      D.flow(["Choose|date", "Assume|readiness", "Begin|deployment", "Review|later"]),
      "The scheduled date substitutes for readiness evidence"
    ],
    [
      D.flow(["Complete|installation", "Declare|ready", "Ignore|employees", "Launch|process"]),
      "Technical completion is treated as sufficient evidence of operational readiness"
    ],
    [
      D.flow(["Find|weakness", "Remove|criterion", "Avoid|record", "Approve|launch"]),
      "An unmet criterion is silently removed to preserve the deployment schedule"
    ]
  ],
  "A responsible go/no-go process establishes criteria before the meeting, gathers evidence and evaluates readiness through named decision authority. The decision must be recorded. A planned date or completed technical installation cannot substitute for this governance.");
 
V("W12O3a-09", "W12O3a", 3,
  "Which visual readiness assessment best addresses the conditions Qasr should examine before authorising a property to go live?",
  [
    [
      D.hier([
        ["Technical", "Required functionality verified"],
        ["Operational", "Employees and procedures prepared"],
        ["Support", "Assistance and escalation available"],
        ["Contingency", "Recovery arrangements considered"],
        ["Governance", "Named authority and recorded decision"]
      ]),
      "Readiness is assessed across technology, operations, support, contingency and accountable governance"
    ],
    [
      D.hier([
        ["Technical", "Equipment installed"],
        ["Operational", "Assumed ready"],
        ["Support", "Arranged after launch"],
        ["Contingency", "Not discussed"],
        ["Governance", "Date determines approval"]
      ]),
      "Installation and the published date replace operational readiness assessment"
    ],
    [
      D.hier([
        ["Technical", "Supplier reports completion"],
        ["Operational", "Employees decide individually"],
        ["Support", "Remote queue only"],
        ["Contingency", "Assumed unnecessary"],
        ["Governance", "No named authority"]
      ]),
      "Readiness is inferred without clear responsibilities or accountable approval"
    ],
    [
      D.hier([
        ["Technical", "Testing postponed"],
        ["Operational", "Training incomplete"],
        ["Support", "No escalation route"],
        ["Contingency", "Recovery unexamined"],
        ["Governance", "Automatic approval"]
      ]),
      "Deployment proceeds despite multiple unresolved readiness weaknesses"
    ]
  ],
  "A complete readiness assessment considers technical capability, employee preparation, operating procedures, frontline support, escalation and contingency. A named authority must evaluate the evidence and record the go/no-go decision. Technical completion alone is insufficient.");
 
OR("W12O3a-10", "W12O3a", 2,
  "Arrange these activities into a logical sequence for Qasr's formal go-live authorisation.",
  [
    "Agree objective go/no-go criteria and name who decides, and when, well before cutover",
    "Collect evidence on technical, operational and support readiness",
    "Review the evidence against each agreed criterion at the decision meeting",
    "Decide whether any unmet criterion requires postponement or an authorised waiver",
    "Record the decision, and any waiver with its reason"
  ],
  "Criteria and decision authority are fixed in advance because the pressure at a go-live meeting always runs toward going live. Evidence is then gathered and reviewed against those criteria. Only after the review can managers judge unmet conditions, and the decision and any waiver must be recorded to preserve accountability.");
 
MA("W12O3a-11", "W12O3a", 2,
  "Match each go-live governance concept to its meaning.",
  [
    [
      "Technical readiness",
      "Required systems and functionality have been prepared and verified"
    ],
    [
      "Operational readiness",
      "Employees, procedures and operating arrangements can support actual service"
    ],
    [
      "Go/no-go criterion",
      "A predefined condition used to determine whether deployment may proceed"
    ],
    [
      "Decision authority",
      "The named person or authorised forum responsible for approving or postponing deployment"
    ],
    [
      "Readiness waiver",
      "An authorised and documented exception to an agreed readiness condition"
    ]
  ],
  "Technical readiness concerns functioning systems, while operational readiness concerns the organisation's ability to use the redesigned process dependably. Predefined criteria guide the decision, named authority establishes accountability, and documented waivers make accepted exceptions explicit.");
 
MA("W12O3a-12", "W12O3a", 3,
  "Match each Qasr readiness observation to the most defensible governance response.",
  [
    [
      "Kiosk functionality has passed the required technical tests",
      "Treat this as technical evidence without assuming complete operational readiness"
    ],
    [
      "Reception employees cannot manage an essential corporate arrival exception",
      "Assess the unmet operational criterion before authorising deployment"
    ],
    [
      "The programme director wants approval solely because the scheduled date has arrived",
      "Require an evidence-based decision against predefined readiness conditions"
    ],
    [
      "Management considers proceeding despite an unmet but potentially manageable condition",
      "Require authorised evaluation and documentation of any waiver and its justification"
    ],
    [
      "A property lacks an essential capability needed for dependable guest service",
      "Consider a no-go decision rather than treating documentation as a substitute for capability"
    ]
  ],
  "Qasr must distinguish technical completion from operational readiness and evaluate each important condition before deployment. Schedule pressure does not justify automatic approval. Any waiver requires accountable authorisation, while an essential missing capability may make postponement the responsible decision.");

// W12O3b · Eleven hours to go backwards
// Lesson l4: The decision to go live — or stop
// Outcome O3 [S3]: Assess readiness and design contingency for implementation.
// Correct answers are authored first; the player shuffles options.
 
M("W12O3b-01", "W12O3b", 1,
  "What does Qasr's reported eleven-hour rollback rehearsal establish?",
  [
    "Rollback took eleven hours during one rehearsal at Marina without live corporate bookings",
    "Every Qasr property can complete rollback within eleven hours under all operating conditions",
    "Rollback was successfully rehearsed with live corporate bookings across all fourteen properties",
    "The redesigned arrival process can always be reversed without affecting completed transactions"
  ],
  "Qasr rehearsed rollback once at Marina, and that rehearsal required eleven hours. It did not include live corporate bookings. The observed duration therefore provides limited evidence about the tested conditions rather than a guaranteed recovery time across all properties.");
 
M("W12O3b-02", "W12O3b", 2,
  "Why should Qasr distinguish stopping further rollout from initiating rollback?",
  [
    "Stopping prevents additional deployments, while rollback attempts to restore an earlier arrangement at a site already operating the redesign",
    "Stopping rollout always requires reversing every previously completed deployment",
    "Rollback concerns future deployment scheduling, while stopping concerns only technical testing",
    "Both actions are identical and can be initiated without separate operational evidence"
  ],
  "Stopping further rollout suspends additional deployment waves and limits further exposure. Rollback attempts to restore an earlier operating arrangement where the redesigned process is already active. These decisions may require different triggers, feasibility assessments and authorised responses.");
 
M("W12O3b-03", "W12O3b", 3,
  "Qasr is considering wider deployment despite having rehearsed rollback only at Marina without live corporate bookings. Which action most directly addresses this evidence gap?",
  [
    "Rehearse recovery under representative operating conditions, including corporate-booking transactions, before relying on rollback capability",
    "Treat the eleven-hour rehearsal as a guaranteed recovery duration for every property",
    "Remove corporate arrivals from recovery planning because the assisted exception path is already operating",
    "Assume rollback remains feasible indefinitely after the redesigned process begins handling live transactions"
  ],
  "The Marina rehearsal excluded live corporate bookings, leaving an important recovery condition untested. Qasr should strengthen its evidence through representative rehearsal and assessment of affected transactions. A previous successful test does not guarantee recovery under conditions that were not included.");
 
TF("W12O3b-04", "W12O3b", 1,
  "A credible rollback plan requires predefined triggers, accountable authority and rehearsal under relevant operating conditions.",
  true,
  "This statement is true. Rollback must be more than a written intention to restore earlier operations. Managers need measurable conditions for intervention, named decision authority and evidence that recovery procedures work under representative circumstances.");
 
TF("W12O3b-05", "W12O3b", 2,
  "Because Qasr completed one rollback rehearsal, it can assume that rollback remains possible at every property regardless of subsequent transactions.",
  false,
  "This statement is false. The reported rehearsal occurred only at Marina and excluded live corporate bookings. Rollback feasibility can depend on transactions processed after go-live and may eventually reach a point beyond which restoration is impractical.");
 
DR("W12O3b-06", "W12O3b", 1,
  "A predefined condition for suspending additional deployment is a {1}, while restoring an earlier operating arrangement is called {2}.",
  [
    ["stop trigger", "rollback boundary", "readiness waiver"],
    ["rollback", "parallel running", "a phased rollout"]
  ],
  "A stop trigger identifies a condition requiring the organisation to suspend further deployment, whereas a rollback boundary marks the point after which rollback is no longer available. Rollback is a recovery action intended to restore an earlier operating arrangement. The actions are related but distinct and may require separate decisions.");
 
DR("W12O3b-07", "W12O3b", 3,
  "Qasr's rollback rehearsal lasted {1} at {2}, but it did not include live corporate bookings.",
  [
    ["eleven hours", "three weeks", "eight weeks"],
    ["Marina", "every Qasr property", "all heritage properties"]
  ],
  "The case reports one eleven-hour rollback rehearsal at Marina. The rehearsal excluded live corporate bookings, so its duration cannot be treated as a guaranteed recovery time for other properties or different transaction conditions.");
 
V("W12O3b-08", "W12O3b", 2,
  "Which diagram best represents a responsible decision when serious problems emerge during Qasr's rollout?",
  [
    [
      D.flow(["Monitor|conditions", "Assess|stop trigger", "Authorise|response", "Control|exposure", "Verify|readiness"]),
      "Measure the problem, apply agreed criteria, authorise action and verify readiness before resumption"
    ],
    [
      D.flow(["Observe|failure", "Ignore|trigger", "Continue|rollout", "Assume|recovery"]),
      "Continue deployment without examining stopping conditions or recovery"
    ],
    [
      D.flow(["Observe|failure", "Employee|decides alone", "Reverse|transactions", "Avoid|records"]),
      "Allow an employee without designated authority to reverse operations without assessing records"
    ],
    [
      D.flow(["Observe|failure", "Assume|eleven hours", "Declare|safe", "Expand|deployment"]),
      "Treat the Marina rehearsal duration as a universal guarantee"
    ]
  ],
  "A responsible contingency response monitors operating conditions, evaluates predefined triggers and uses named authority to select appropriate action. Managers must control further exposure, address the problem and verify readiness before resuming deployment.");
 
V("W12O3b-09", "W12O3b", 3,
  "Which visual assessment correctly interprets Qasr's existing rollback evidence?",
  [
    [
      D.hier([
        ["Rehearsal", "One at Marina"],
        ["Observed duration", "11 hours"],
        ["Corporate bookings", "Live transactions excluded"],
        ["Conclusion", "Recovery evidence remains incomplete"]
      ]),
      "The rehearsal provides limited evidence and leaves live corporate-booking recovery unverified"
    ],
    [
      D.hier([
        ["Rehearsal", "All fourteen properties"],
        ["Observed duration", "11 hours everywhere"],
        ["Corporate bookings", "Fully tested"],
        ["Conclusion", "Rollback guaranteed"]
      ]),
      "The rehearsal is incorrectly presented as comprehensive and universally reliable"
    ],
    [
      D.hier([
        ["Rehearsal", "One at Marina"],
        ["Observed duration", "11 hours"],
        ["Corporate bookings", "Not included"],
        ["Conclusion", "Further testing unnecessary"]
      ]),
      "The known limitations are acknowledged but incorrectly dismissed"
    ],
    [
      D.hier([
        ["Rehearsal", "One at Marina"],
        ["Observed duration", "11 hours"],
        ["Corporate bookings", "Not included"],
        ["Conclusion", "Rollback always impossible"]
      ]),
      "Limited rehearsal evidence is incorrectly treated as proof that recovery cannot work"
    ]
  ],
  "Qasr has one reported rollback rehearsal at Marina, lasting eleven hours and excluding live corporate bookings. This evidence neither guarantees recovery nor proves it impossible. It establishes the need for further representative rehearsal and feasibility assessment.");
 
OR("W12O3b-10", "W12O3b", 2,
  "Arrange these activities into a logical response when a predefined rollout stopping condition is reached.",
  [
    "Detect and verify the operating condition against the agreed numerical trigger",
    "Notify the named authority responsible for the stopping decision",
    "Suspend additional deployment according to the authorised response",
    "Investigate the failure and determine whether rollback or another recovery action is feasible",
    "Implement the authorised corrective or recovery action",
    "Verify operational readiness before permitting suspended deployment to resume"
  ],
  "A predefined trigger should initiate an accountable response rather than improvised action. Managers verify the condition, involve the authorised decision-maker, control further exposure and assess feasible recovery. Deployment should resume only when evidence supports renewed operational readiness.");
 
MA("W12O3b-11", "W12O3b", 2,
  "Match each implementation contingency concept to its meaning.",
  [
    [
      "Stop trigger",
      "A predefined measurable condition requiring suspension of further deployment"
    ],
    [
      "Rollback trigger",
      "A predefined condition requiring consideration of restoring an earlier operating arrangement"
    ],
    [
      "Rollback rehearsal",
      "A practical test of recovery procedures under specified operating conditions"
    ],
    [
      "Rollback boundary",
      "The point beyond which restoration of the earlier arrangement is no longer feasible"
    ],
    [
      "Decision authority",
      "The named person or authorised forum empowered to approve the contingency response"
    ]
  ],
  "Contingency planning requires clear distinctions between stopping further deployment and restoring earlier operations. Measurable triggers identify when intervention is required, rehearsals test recovery, rollback boundaries establish feasibility limits, and named authority ensures accountable decisions.");
 
MA("W12O3b-12", "W12O3b", 3,
  "Match each Qasr contingency observation to the most defensible management response.",
  [
    [
      "A serious unresolved problem appears before another property is deployed",
      "Assess the predefined stop trigger before exposing additional locations"
    ],
    [
      "The only rollback rehearsal excluded live corporate bookings",
      "Require further representative recovery evidence before relying on rollback"
    ],
    [
      "Live transactions may have changed records after go-live",
      "Assess transaction integrity and whether restoring earlier operations remains feasible"
    ],
    [
      "Managers disagree about who may initiate rollback",
      "Establish explicit decision authority before deployment"
    ],
    [
      "The rollout was suspended after an operating failure",
      "Require evidence of correction and readiness before authorising resumption"
    ]
  ],
  "Qasr's contingency decisions must respond to actual operating evidence. Predefined triggers control additional exposure, representative rehearsal strengthens recovery confidence, transaction analysis establishes rollback feasibility, and named authority ensures accountability. Suspended rollout should resume only after the relevant readiness conditions are satisfied.");

// W12O3c · When can the project team leave?
// Lesson l4: The decision to go live — or stop
// Outcome O3 [S3]: Assess readiness and design contingency for implementation.
// Correct answers are authored first; the player shuffles options.
 
M("W12O3c-01", "W12O3c", 1,
  "Which condition must Qasr satisfy before treating its implementation as ready for operational closure?",
  [
    "A process owner must be appointed and actively operating",
    "The project team must remain permanently responsible for everyday arrivals",
    "Every expected financial benefit must already have been fully realised",
    "All assisted arrival processing must be eliminated regardless of approved exceptions"
  ],
  "The slides require an appointed and operating process owner as a condition of implementation closure. Active ownership establishes continuing accountability after the project team leaves. Closure does not require permanent project dependence or proof that every expected business benefit has already been realised.");
 
M("W12O3c-02", "W12O3c", 2,
  "Why is a documented end-to-end performance measure insufficient by itself for Qasr's implementation closure?",
  [
    "The measure must actually be produced and reviewed during operations",
    "The measure must be replaced by a report containing only kiosk availability",
    "The measure becomes unnecessary once the final property has gone live",
    "The measure must demonstrate that no guest arrival ever requires assisted handling"
  ],
  "Implementation closure requires an end-to-end performance measure that is produced and reviewed. A definition in a project document does not demonstrate continuing operational control. Qasr needs evidence about the complete arrival process, including relevant assisted handling.");
 
M("W12O3c-03", "W12O3c", 3,
  "Qasr has deployed its redesigned process, but outstanding defects have no assigned owners or dates. What is the most defensible closure decision?",
  [
    "Require explicit transfer of each outstanding defect with a named owner and date before closing the implementation",
    "Close immediately because unresolved defects automatically become the responsibility of whichever employee encounters them",
    "Require every minor defect to disappear before any operational ownership can begin",
    "Remove the outstanding defects from the project record so the deployment can be reported as complete"
  ],
  "The slides require outstanding defects to be transferred with named owners and dates. This allows unresolved work to remain visible and accountable after the project team leaves. Closure does not require pretending that every minor defect has vanished, but unassigned defects create an unacceptable accountability gap.");
 
TF("W12O3c-04", "W12O3c", 1,
  "Implementation closure requires exception volumes to be within the range anticipated by the approved process design.",
  true,
  "This statement is true. Exception volumes must be within the designed range before implementation is considered ready for closure. Managers should compare actual exception volumes with the approved operating design rather than assume that any observed level is acceptable.");
 
TF("W12O3c-05", "W12O3c", 2,
  "Once the redesigned process is operating, the project team may retain permanent ownership of operational procedures without transferring responsibility to operations.",
  false,
  "This statement is false. One of the five closure conditions requires operating procedures to be owned by operations rather than the project. Continuing operational ownership helps employees maintain procedures and resolve routine issues without indefinite dependence on implementation specialists.");
 
DR("W12O3c-06", "W12O3c", 1,
  "Before implementation closure, an end-to-end performance measure must be {1}, while operating procedures must be owned by {2}.",
  [
    ["produced and reviewed", "defined but never examined", "replaced by installation reports"],
    ["operations", "the temporary project team indefinitely", "the technology supplier exclusively"]
  ],
  "The closure conditions require an end-to-end performance measure that is actually produced and reviewed. Operating procedures must also transfer into operational ownership. These requirements demonstrate that the organisation can manage the redesigned process after project closure.");
 
DR("W12O3c-07", "W12O3c", 3,
  "Outstanding implementation defects may be transferred into operations only when they have {1} and {2}.",
  [
    ["named owners", "unassigned responsibility", "automatic closure"],
    ["dates", "no follow-up commitments", "assumed completion"]
  ],
  "The slides require outstanding defects to transfer with named owners and dates. These details establish accountability and allow unresolved work to be tracked after the implementation project closes. A defect should not disappear simply because the temporary project team is leaving.");
 
V("W12O3c-08", "W12O3c", 2,
  "Which visual correctly represents the five implementation closure conditions?",
  [
    [
      D.hier([
        ["Process owner", "Appointed and operating"],
        ["Performance", "End-to-end measure produced and reviewed"],
        ["Exceptions", "Within the designed range"],
        ["Procedures", "Owned by operations"],
        ["Defects", "Transferred with owners and dates"]
      ]),
      "All five closure conditions establish operational accountability and control"
    ],
    [
      D.hier([
        ["Process owner", "Named but inactive"],
        ["Performance", "Measure defined but unused"],
        ["Exceptions", "Not monitored"],
        ["Procedures", "Retained by the project"],
        ["Defects", "Unassigned"]
      ]),
      "The closure conditions are replaced with incomplete or unmanaged arrangements"
    ],
    [
      D.hier([
        ["Process owner", "Optional"],
        ["Performance", "Technology availability only"],
        ["Exceptions", "Automatically acceptable"],
        ["Procedures", "Locally improvised"],
        ["Defects", "Deleted at closure"]
      ]),
      "Operational accountability and process control are incorrectly treated as unnecessary"
    ],
    [
      D.hier([
        ["Process owner", "Project manager permanently"],
        ["Performance", "No continuing review"],
        ["Exceptions", "Ignored after launch"],
        ["Procedures", "Supplier-owned only"],
        ["Defects", "No dates required"]
      ]),
      "The organisation remains dependent on temporary project arrangements"
    ]
  ],
  "The five closure conditions require active process ownership, a produced and reviewed end-to-end measure, controlled exception volumes, operational ownership of procedures and explicit transfer of outstanding defects. Together, they establish whether the process can be managed without continued project dependence.");
 
V("W12O3c-09", "W12O3c", 3,
  "Which diagram best represents a responsible transition from Qasr's implementation project into continuing operations?",
  [
    [
      D.flow(["Confirm|ownership", "Review|performance", "Control|exceptions", "Transfer|procedures", "Assign|defects"]),
      "Confirm the five closure conditions before transferring continuing responsibility to operations"
    ],
    [
      D.flow(["Finish|deployment", "Release|project team", "Assume|ownership", "Ignore|defects"]),
      "Treat deployment completion as sufficient for operational closure"
    ],
    [
      D.flow(["Install|kiosks", "Measure|availability", "Close|programme", "Review|later"]),
      "Rely on technology installation and availability without establishing end-to-end control"
    ],
    [
      D.flow(["Complete|schedule", "Remove|project records", "Leave|operations", "Avoid|handover"]),
      "Close the project without transferring procedures or outstanding responsibilities"
    ]
  ],
  "A responsible operational handover confirms active ownership, reviewed end-to-end performance, controlled exceptions, operational procedures and assigned defects. Deployment completion alone does not establish that the redesigned process can be maintained after the project team leaves.");
 
OR("W12O3c-10", "W12O3c", 2,
  "Arrange these steps for transferring an outstanding defect from Qasr's project team to operations.",
  [
    "Record the outstanding defect and its operational impact",
    "Assign a named owner in operations for the defect",
    "Agree a date for its follow-up or resolution with that owner",
    "Transfer responsibility for the defect from the project team to operations",
    "Track the defect to resolution after the project team leaves"
  ],
  "A defect must be recorded before anyone can own it, and an owner must exist before a date can be agreed with them. Responsibility can then transfer formally, and tracking continues in operations after the team leaves. Without this sequence, outstanding defects are simply closed by the project team's departure.");
 
MA("W12O3c-11", "W12O3c", 2,
  "Match each implementation closure condition to its principal purpose.",
  [
    [
      "Operating process owner",
      "Provides continuing accountability for the complete redesigned process"
    ],
    [
      "Reviewed end-to-end performance measure",
      "Provides evidence about how the complete process operates"
    ],
    [
      "Exceptions within the designed range",
      "Demonstrates that exception handling remains within approved operating expectations"
    ],
    [
      "Procedures owned by operations",
      "Ensures continuing responsibility for maintaining everyday working instructions"
    ],
    [
      "Defects transferred with owners and dates",
      "Preserves accountability for unresolved work after project closure"
    ]
  ],
  "Each closure condition addresses a different operational requirement. Active ownership provides accountability, reviewed measures provide performance visibility, controlled exceptions support dependable operation, operational procedures sustain routine work, and assigned defects prevent unresolved problems from becoming unowned.");
 
MA("W12O3c-12", "W12O3c", 3,
  "Match each Qasr handover observation to the most defensible management response.",
  [
    [
      "A process owner has been named but has not begun exercising responsibility",
      "Confirm active ownership before treating the closure condition as satisfied"
    ],
    [
      "The project defined an arrival performance measure but nobody reviews actual results",
      "Produce and review the end-to-end measure during operations"
    ],
    [
      "Corporate arrival exceptions exceed the approved designed operating range",
      "Investigate and control the deviation before confirming closure readiness"
    ],
    [
      "Reception procedures remain maintained exclusively by implementation specialists",
      "Transfer procedure ownership and maintenance responsibility to operations"
    ],
    [
      "Several unresolved defects remain without responsible individuals or follow-up dates",
      "Assign named owners and dates before transferring the outstanding work"
    ]
  ],
  "Qasr must demonstrate that every closure condition is operating in practice rather than merely documented. Active ownership, reviewed measures, controlled exceptions, operational procedures and assigned defects establish the accountability needed for the redesigned process to continue after implementation specialists leave.");

// W12O3d · Fourteen properties, one defensible decision
// Lesson l4: The decision to go live — or stop
// Outcome O3 [S3]: Assess readiness and design contingency for implementation.
// Correct answers are authored first; the player shuffles options.
 
M("W12O3d-01", "W12O3d", 1,
  "Which combination correctly describes Qasr's remaining implementation challenge?",
  [
    "Twelve remaining properties, an eight-week proposed rollout and a three-week buffer before 1 January",
    "Fourteen remaining properties, an eleven-week rollout and no external deadline",
    "Five remaining properties, a three-week rollout and eight months before compliance",
    "Two remaining properties, a nine-month rollout and complete kiosk adoption"
  ],
  "Marina and Corniche have already piloted the redesigned arrival process, leaving twelve properties for wider implementation. The programme director proposes an eight-week rollout beginning in October, with a planned three-week buffer before the tourism authority's requirement takes effect on 1 January.");
 
M("W12O3d-02", "W12O3d", 2,
  "Which candidate rollout approach best reflects Qasr's Exhibit 12 constraints while preserving the need for readiness assessment?",
  [
    "Consider ready standard-layout properties early, prepare registered heritage variants and protect peak-occupancy operations from January disruption",
    "Deploy the peak-occupancy properties during January because high demand provides the strongest implementation test",
    "Require identical kiosk arrangements at heritage properties despite their lack of suitable lobby space",
    "Deploy every remaining property simultaneously without investigating pilot exceptions or operational readiness"
  ],
  "A defensible candidate sequence accounts for the five standard-layout properties, three heritage properties and four peak-occupancy properties. Standard-layout sites may be comparatively straightforward when ready, heritage sites require approved variants, and peak-occupancy operations cannot absorb a January performance dip. The precise sequence remains a conditional management recommendation.");
 
M("W12O3d-03", "W12O3d", 3,
  "Qasr's steering group must decide whether to approve wider rollout despite incomplete kiosk adoption and limited rollback evidence. Which recommendation is most defensible?",
  [
    "Proceed only through evidence-based readiness gates, investigate residual arrivals, establish stopping authority and strengthen recovery evidence",
    "Approve every remaining deployment because improved guest satisfaction proves that all operating risks have disappeared",
    "Abandon the redesigned process because any assisted arrival demonstrates that implementation has failed",
    "Treat the Marina rollback rehearsal as a guaranteed eleven-hour recovery capability across every property"
  ],
  "Qasr has encouraging guest satisfaction evidence but unresolved corporate-arrival exceptions and incomplete rollback testing. A defensible recommendation combines site readiness, investigation of residual cases, measurable stopping conditions, accountable authority and representative recovery evidence. Neither automatic approval nor automatic abandonment follows from the case.");
 
TF("W12O3d-04", "W12O3d", 1,
  "Qasr's improved guest satisfaction and its 65% kiosk adoption plateau can coexist without either measure invalidating the other.",
  true,
  "This statement is true. Guest satisfaction increased from 6.8 to 7.9 while kiosk adoption plateaued at 65%. These measures describe different aspects of the operating process. Management must evaluate the remaining corporate-arrival cases rather than treating either result as conclusive.");
 
TF("W12O3d-05", "W12O3d", 2,
  "Qasr's eleven-hour rollback rehearsal proves that every property can safely restore the previous process within eleven hours after processing live corporate bookings.",
  false,
  "This statement is false. The rehearsal occurred once at Marina and excluded live corporate bookings. Its observed duration cannot establish guaranteed recovery across other properties or different transaction conditions. Additional representative testing and feasibility assessment are necessary.");
 
DR("W12O3d-06", "W12O3d", 1,
  "Exhibit 12 records that {1} properties cannot absorb a performance dip in January, and that the single rollback rehearsal took {2} without live corporate data.",
  [
    ["four", "three", "five"],
    ["eleven hours", "nine minutes", "three weeks"]
  ],
  "Exhibit 12 lists four peak-occupancy properties running above 90% occupancy through January, which is why they cannot absorb a performance dip in that month. It also records one rollback rehearsal, at Marina, that took eleven hours without live corporate data. Together these facts shape both the rollout sequence and the contingency the steering group must design.");
 
DR("W12O3d-07", "W12O3d", 3,
  "Before authorising another Qasr deployment, management should evaluate predefined {1} and confirm accountable {2} for stopping or recovery decisions.",
  [
    ["go/no-go criteria", "installation milestones", "guest satisfaction scores"],
    ["decision authority", "vendor support hours", "training attendance"]
  ],
  "A defensible go-live decision evaluates objective readiness criteria established before the decision meeting. Management must also identify who can authorise stopping, rollback or other contingency actions. Schedule pressure does not replace evidence or accountable decision-making.");
 
V("W12O3d-08", "W12O3d", 2,
  "Which visual correctly summarises the principal evidence Qasr must consider in its final rollout decision?",
  [
    [
      D.hier([
        ["Pilot adoption", "65% kiosk, 35% desk"],
        ["Processing", "2 minutes kiosk, 9 minutes assisted"],
        ["Satisfaction", "6.8 before, 7.9 after"],
        ["Remaining sites", "5 standard, 3 heritage, 4 peak"],
        ["Rollback", "11 hours at Marina, no live corporate bookings"]
      ]),
      "The decision combines actual pilot results, site differences and the limitations of recovery evidence"
    ],
    [
      D.hier([
        ["Pilot adoption", "100% kiosk"],
        ["Processing", "Identical for every arrival"],
        ["Satisfaction", "Unchanged"],
        ["Remaining sites", "12 identical properties"],
        ["Rollback", "Guaranteed everywhere"]
      ]),
      "The case is incorrectly represented as having no unresolved operating constraints"
    ],
    [
      D.hier([
        ["Pilot adoption", "35% kiosk, 65% desk"],
        ["Processing", "9 minutes kiosk, 2 minutes assisted"],
        ["Satisfaction", "7.9 before, 6.8 after"],
        ["Remaining sites", "All heritage"],
        ["Rollback", "Never rehearsed"]
      ]),
      "The pilot measures and property characteristics are incorrectly reversed or altered"
    ],
    [
      D.hier([
        ["Pilot adoption", "65% kiosk"],
        ["Processing", "No exception difference"],
        ["Satisfaction", "Proves complete readiness"],
        ["Remaining sites", "No constraints"],
        ["Rollback", "11-hour universal guarantee"]
      ]),
      "Selected case facts are combined with unsupported conclusions about readiness and recovery"
    ]
  ],
  "The correct summary preserves the reported pilot measures, the three remaining property groups and the limitations of the Marina rollback rehearsal. A defensible decision must consider these findings together rather than selectively using favourable evidence or inventing missing guarantees.");
 
V("W12O3d-09", "W12O3d", 3,
  "Which diagram best represents an integrated and defensible Qasr implementation decision?",
  [
    [
      D.flow([
        "Review|pilot evidence",
        "Assess|site readiness",
        "Choose|rollout waves",
        "Define|stop criteria",
        "Verify|recovery",
        "Transfer|ownership"
      ]),
      "Use operating evidence to sequence deployment, govern contingency and establish continuing accountability"
    ],
    [
      D.flow([
        "Accept|schedule",
        "Assume|readiness",
        "Ignore|exceptions",
        "Deploy|everywhere",
        "Declare|success"
      ]),
      "Treat the proposed schedule as sufficient justification for immediate implementation"
    ],
    [
      D.flow([
        "Choose|fastest approach",
        "Remove|variants",
        "Avoid|training",
        "Ignore|rollback",
        "Close|project"
      ]),
      "Prioritise speed while disregarding employee preparation, approved variants and recovery"
    ],
    [
      D.flow([
        "Review|satisfaction",
        "Assume|full adoption",
        "Cancel|monitoring",
        "Release|project team"
      ]),
      "Use one favourable measure to bypass adoption analysis and operational handover"
    ]
  ],
  "A defensible implementation decision integrates pilot evidence, site readiness, rollout sequencing, stopping conditions, recovery capability and operational ownership. These elements protect service during deployment and ensure the redesigned process remains manageable after the project team leaves.");
 
OR("W12O3d-10", "W12O3d", 2,
  "Arrange these activities into a logical sequence for developing and governing Qasr's final implementation recommendation.",
  [
    "Read the pilot evidence on adoption, satisfaction and the corporate-arrival residual",
    "Use that evidence to judge which remaining property groups are ready, and when",
    "Propose a conditional rollout sequence that finishes before 1 January",
    "Set go/no-go criteria, numerical stop triggers and named authority for that sequence",
    "Authorise each wave at its readiness gate as the rollout proceeds",
    "Transfer ownership, measures, procedures and defects to operations before the team leaves"
  ],
  "Qasr should begin with the pilot evidence, because it shapes the judgement about which property groups are ready. A conditional sequence follows, and its criteria, stop triggers and authority must be set before any wave is authorised. Operational handover comes last, without assuming that deployment itself establishes realised benefits.");
 
MA("W12O3d-11", "W12O3d", 2,
  "Match each Qasr implementation concern to the evidence or decision it requires.",
  [
    [
      "Persistent 65% kiosk adoption",
      "Investigate the residual corporate-arrival population and assisted operating consequences"
    ],
    [
      "Three heritage properties without kiosk space",
      "Prepare and assess the registered assisted-path variants"
    ],
    [
      "Four properties above 90% occupancy through January",
      "Protect their operations from an unacceptable January performance dip"
    ],
    [
      "One eleven-hour rollback rehearsal without live corporate bookings",
      "Strengthen representative recovery evidence before relying on rollback"
    ],
    [
      "A proposed eight-week rollout with a three-week buffer",
      "Evaluate the consequences of late failure and the adequacy of contingency"
    ]
  ],
  "Each Qasr concern requires a specific management response. Residual arrivals require diagnosis, heritage variants require preparation, peak-occupancy sites require careful timing, rollback requires representative evidence, and the proposed schedule requires testing against credible late failures.");
 
MA("W12O3d-12", "W12O3d", 3,
  "Match each stage of Qasr's implementation responsibility to the management decision that best supports it.",
  [
    [
      "Selecting the rollout approach",
      "Compare implementation risks against deadlines, site variation and organisational readiness"
    ],
    [
      "Preparing employees for go-live",
      "Provide practical training, frontline assistance and rapid escalation of operating problems"
    ],
    [
      "Authorising an implementation wave",
      "Apply predefined readiness criteria through named and accountable decision authority"
    ],
    [
      "Responding to serious implementation failure",
      "Use measurable stopping triggers and assess feasible, rehearsed recovery arrangements"
    ],
    [
      "Closing the implementation project",
      "Confirm active ownership, reviewed measures, controlled exceptions, operational procedures and assigned defects"
    ]
  ],
  "Successful implementation requires connected decisions throughout the transition. Managers select a defensible approach, prepare employees, assess readiness, govern failure and establish operational accountability. Completing deployment does not remove the need to manage the process or demonstrate realised benefits in the subsequent BPM phases.");

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
