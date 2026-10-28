// OPER621 Business Process Management — Week 7 question bank.
// Topic: The Launch Pad Phase — Framework Phase 3.
// Sources: Week 7 course.js, Week 7 slides, Week 7 Delivery Plan, and Jeston, Chapter 15.
// CLO K2: Evaluate various factors that impact on the successful implementation of BPM in public and private sector organizations.
// CLO S1: Design a framework for BPM and explain and assess related phases in the context of a regional company.
//
// O1 — Explain how the Launch Pad phase determines where a BPM programme begins.
// O2 — Apply prioritisation criteria when many processes are underperforming.
// O3 — Justify a starting scope and defend it against stakeholders who preferred another.
//
// Sections: O1a–O1c, O2a–O2c, O3a–O3f.
// Exactly 12 questions per section; 144 questions across the complete bank.
// Types: mcq, tf, drop, visual, order, match.
// Authoring convention: correct options and blank choices appear FIRST.
// The player shuffles options at runtime.
// Each question has one correct answer and an explanatory "why".
// Normalisation assigns outcome, CLO, answer, and remediation fields after all questions are added.
 
(() => {
  const D = window.DIAG, B = [];
 
  const add = (type, id, sec, diff, q, body, why) =>
    B.push(Object.assign({ id, sec, diff, type, q, why }, body));
 
  const M = (id, sec, d, q, o, why) =>
    add("mcq", id, sec, d, q, { o }, why);
 
  const TF = (id, sec, d, q, ans, why) =>
    add("tf", id, sec, d, q, { ans }, why);
 
  const DR = (id, sec, d, q, blanks, why) =>
    add("drop", id, sec, d, q, { blanks }, why);
 
  const V = (id, sec, d, q, opts, why) =>
    add("visual", id, sec, d, q, {
      o: opts.map((x) => x[1]),
      svg: opts.map((x) => x[0])
    }, why);
 
  const OR = (id, sec, d, q, items, why) =>
    add("order", id, sec, d, q, { items }, why);
 
  const MA = (id, sec, d, q, pairs, why) =>
    add("match", id, sec, d, q, { pairs }, why);
 
 
  // ============================================================
  // LESSON l1 — THE LAUNCH PAD
  // Outcome O1 | Primary CLO S1 | Supporting CLO K2
  // ============================================================
 
 
  // ------------------------------------------------------------
  // O1a — Why the Launch Pad matters
  // 12 questions
  // ------------------------------------------------------------
 
  M("W7O1a-01", "O1a", 1,
    "What is the central purpose of the Launch Pad phase?",
    [
      "To select and prepare a justified starting process for improvement",
      "To redesign every process identified in the architecture",
      "To implement the technology selected during Process Architecture",
      "To demonstrate that all expected benefits have already been achieved"
    ],
    "The Launch Pad turns strategic priorities and process knowledge into a realistic starting commitment. Detailed investigation and redesign occur in later phases.");
 
  M("W7O1a-02", "O1a", 2,
    "Qasr has several underperforming processes but only one BPM delivery team. What should its steering group do?",
    [
      "Compare the candidates and commit the team to a justified starting project",
      "Begin every candidate simultaneously because all problems matter",
      "Choose whichever department has submitted the most complaints",
      "Wait until every organisational process has reached the same maturity"
    ],
    "Limited delivery capacity makes prioritisation essential. The steering group must select meaningful work that the organisation can realistically support.");
 
  M("W7O1a-03", "O1a", 3,
    "Qasr has completed its Process Architecture work. Why is another decision still necessary before improvement begins?",
    [
      "The architecture identifies processes, but does not determine which project should begin",
      "The architecture automatically authorises the process with the highest transaction volume",
      "The architecture replaces the need for executive sponsorship",
      "The architecture proves which future redesign will deliver the greatest benefit"
    ],
    "Process Architecture establishes the organisational process landscape. Launch Pad uses that context to select and prepare a practical improvement commitment.");
 
  TF("W7O1a-04", "O1a", 1,
    "The Launch Pad follows Organisation Strategy and Process Architecture in the BPM framework.",
    true,
    "The Launch Pad is framework phase three. Organisation Strategy establishes direction, and Process Architecture provides context for selecting where improvement begins.");
 
  TF("W7O1a-05", "O1a", 2,
    "Once a process is selected during Launch Pad, every other organisational problem can safely be ignored.",
    false,
    "Selecting a starting project does not eliminate other problems. Deferred improvements and mandatory obligations still require appropriate management attention.");
 
  DR("W7O1a-06", "O1a", 1,
    "Organisation Strategy establishes the {1}, while Launch Pad establishes a practical {2}.",
    [
      ["strategic direction", "completed redesign", "technical solution"],
      ["starting commitment", "organisation chart", "software specification"]
    ],
    "Strategy explains what the organisation wants to achieve. Launch Pad translates that direction into a justified improvement starting point.");
 
  DR("W7O1a-07", "O1a", 2,
    "A worthwhile starting project must combine meaningful organisational {1} with realistic {2}.",
    [
      ["value", "publicity", "complexity"],
      ["deliverability", "departmental isolation", "unlimited scope"]
    ],
    "A project should contribute to important objectives while remaining achievable with available resources, sponsorship, and organisational capabilities.");
 
  V("W7O1a-08", "O1a", 2,
    "Which diagram correctly shows the framework progression leading to Launch Pad?",
    [
      [
        D.flow(["Organisation|Strategy", "Process|Architecture", "+Launch|Pad"]),
        "Organisation Strategy, then Process Architecture, then Launch Pad"
      ],
      [
        D.flow(["Launch|Pad", "Organisation|Strategy", "Process|Architecture"]),
        "Launch Pad, then Organisation Strategy, then Process Architecture"
      ],
      [
        D.flow(["Process|Architecture", "Launch|Pad", "Organisation|Strategy"]),
        "Process Architecture, then Launch Pad, then Organisation Strategy"
      ],
      [
        D.flow(["Organisation|Strategy", "Launch|Pad", "Process|Architecture"]),
        "Organisation Strategy, then Launch Pad, then Process Architecture"
      ]
    ],
    "The framework begins with Organisation Strategy, continues through Process Architecture, and reaches Launch Pad as phase three.");
 
  V("W7O1a-09", "O1a", 3,
    "Which diagram best represents a realistic Launch Pad decision when Qasr has only one improvement team?",
    [
      [
        D.flow(["Four|candidates", "Evidence|compared", "+One BPM|starting project"]),
        "Four candidates are compared before one starting project is selected"
      ],
      [
        D.flow(["Four|candidates", "Four|projects", "!One|team"]),
        "All four projects begin simultaneously using the same team"
      ],
      [
        D.flow(["Loudest|manager", "Immediate|selection", "!No|comparison"]),
        "The most influential manager determines the project without comparison"
      ],
      [
        D.flow(["Process|Architecture", "Automatic|redesign", "!No|Launch Pad"]),
        "Process Architecture automatically launches redesign without a selection decision"
      ]
    ],
    "Launch Pad compares competing candidates and commits limited BPM capacity to a justified starting project.");
 
  OR("W7O1a-10", "O1a", 2,
    "Put these management activities in the appropriate sequence leading to a BPM starting commitment.",
    [
      "Establish the organisation's strategic direction",
      "Identify and understand its process architecture",
      "Compare candidate improvement processes",
      "Agree a supported starting project"
    ],
    "Strategic direction and process architecture provide the foundation for comparing candidates and establishing the Launch Pad commitment.");
 
  MA("W7O1a-11", "O1a", 2,
    "Match each BPM framework phase to the management question it primarily addresses.",
    [
      ["Organisation Strategy", "What organisational objectives should BPM support?"],
      ["Process Architecture", "How do the organisation's important processes fit together?"],
      ["Launch Pad", "Where should improvement begin, and under what commitments?"],
      ["Understand", "How does the selected process actually work today?"]
    ],
    "Each phase addresses a distinct management question. Launch Pad establishes the starting commitment before Understand investigates actual process performance.");
 
  MA("W7O1a-12", "O1a", 3,
    "Match each proposed starting approach to its principal weakness or strength.",
    [
      ["Launch every candidate", "Spreads limited improvement capacity across too much work"],
      ["Choose the loudest complaint", "Substitutes stakeholder pressure for balanced evidence"],
      ["Select only the easiest task", "May deliver little meaningful strategic value"],
      ["Compare value and readiness", "Supports a realistic and defensible starting commitment"]
    ],
    "A sound Launch Pad decision balances strategic importance with practical delivery conditions rather than relying on urgency, convenience, or managerial influence alone.");
 
 
  // ------------------------------------------------------------
  // O1b — The five decisions that make a project possible
  // 12 questions
  // ------------------------------------------------------------
 
  M("W7O1b-01", "O1b", 1,
    "Which combination best describes the commitments needed to prepare a Launch Pad project?",
    [
      "Selected process, scope, people, measures, expected benefits, and risks",
      "Software supplier, programming language, equipment, and installation date",
      "Departmental budgets, employee rankings, and completed performance appraisals",
      "Detailed redesign, installed systems, verified savings, and project closure"
    ],
    "The Launch Pad establishes a selected process and the commitments needed to investigate it, including scope, accountability, measures, benefits, and risks.");
 
  M("W7O1b-02", "O1b", 2,
    "Qasr's front-office director volunteers to sponsor guest arrival improvement. What is the sponsor's main contribution?",
    [
      "Providing leadership support, securing cooperation, and helping remove delivery barriers",
      "Personally performing every activity within the guest-arrival process",
      "Replacing the process owner after the improvement project closes",
      "Guaranteeing that the proposed benefits have already been achieved"
    ],
    "An executive sponsor enables the improvement project through leadership, resources, decisions, and escalation. Sponsorship does not replace continuing process ownership.");
 
  M("W7O1b-03", "O1b", 3,
    "A project has a committed sponsor but no agreed scope or performance measure. What is the most defensible conclusion?",
    [
      "The project is not fully prepared because important Launch Pad commitments remain unresolved",
      "The sponsor's enthusiasm makes the missing commitments unnecessary",
      "The project has already completed the Understand phase",
      "The team should implement a solution before identifying its boundaries"
    ],
    "Sponsorship is valuable but cannot substitute for a defined project boundary, accountable people, or credible measures of success.");
 
  TF("W7O1b-04", "O1b", 1,
    "A process owner should remain accountable for continuing process performance after the improvement project finishes.",
    true,
    "The process owner has continuing accountability for performance, while the executive sponsor supports the improvement project's delivery.");
 
  TF("W7O1b-05", "O1b", 2,
    "Identifying expected benefits during Launch Pad proves that those benefits have already been delivered.",
    false,
    "Expected benefits describe intended improvements. Demonstrating achieved benefits requires reliable evidence collected after relevant changes occur.");
 
  DR("W7O1b-06", "O1b", 1,
    "The executive {1} supports project delivery, while the process {2} remains accountable for continuing performance.",
    [
      ["sponsor", "analyst", "customer"],
      ["owner", "supplier", "auditor"]
    ],
    "The sponsor enables decisions and cooperation. The process owner remains responsible for performance beyond the improvement project.");
 
  DR("W7O1b-07", "O1b", 2,
    "Before agreeing an improvement target, the team should establish a reliable {1} and identify important delivery {2}.",
    [
      ["baseline", "software licence", "departmental ranking"],
      ["risks", "advertisements", "job titles"]
    ],
    "A baseline establishes current performance, while identifying risks helps managers assess whether the intended improvement is achievable.");
 
  V("W7O1b-08", "O1b", 2,
    "Which diagram best represents the proposed guest-arrival project boundary at Qasr?",
    [
      [
        D.flow(["Booking|confirmed", "Information|shared", "Guest|arrives", "Check-in|completed", "+First night|billed"], { bracket: [0, 4, "Project"] }),
        "From booking confirmation through completion of the first night's billing"
      ],
      [
        D.flow(["Booking|confirmed", "Information|shared", "Guest|arrives", "Check-in|completed", "First night|billed"], { bracket: [2, 3, "Project"] }),
        "Only from the guest arriving until check-in is completed"
      ],
      [
        D.flow(["Booking|confirmed", "Information|shared", "Guest|arrives", "Check-in|completed", "First night|billed"], { bracket: [0, 1, "Project"] }),
        "Only booking confirmation and the initial information handoff"
      ],
      [
        D.flow(["Booking|confirmed", "Information|shared", "Guest|arrives", "Check-in|completed", "First night|billed"], { bracket: [4, 4, "Project"] }),
        "Only completion of the first night's billing"
      ]
    ],
    "Qasr's proposed boundary begins with booking confirmation and ends when the first night's billing is completed, including the relevant handoffs.");
 
  V("W7O1b-09", "O1b", 3,
    "Which picture shows a project prepared with the commitments needed before detailed investigation?",
    [
      [
        D.flow(["Selected|process", "Agreed|boundary", "Accountable|people", "+Measures|and risks"]),
        "A selected process supported by scope, accountable people, measures, and risks"
      ],
      [
        D.flow(["Sponsor|volunteers", "Project|announced", "!No|scope"]),
        "A sponsor announces a project without defining its scope"
      ],
      [
        D.flow(["Solution|purchased", "System|installed", "!No|baseline"]),
        "Technology is installed without establishing current performance"
      ],
      [
        D.flow(["Benefits|promised", "Success|declared", "!No|evidence"]),
        "Expected benefits are declared achieved without evidence"
      ]
    ],
    "A credible Launch Pad commitment identifies what will be improved, who is accountable, how success will be assessed, and which risks remain.");
 
  OR("W7O1b-10", "O1b", 2,
    "Arrange these steps for establishing a credible performance commitment.",
    [
      "Define the performance measure and calculation",
      "Collect reliable evidence of current performance",
      "Agree a realistic improvement target",
      "Assign responsibility for reporting future results"
    ],
    "A consistent measure supports a trustworthy baseline, which informs a realistic target and continuing performance reporting.");
 
  MA("W7O1b-11", "O1b", 2,
    "Match each Launch Pad commitment to its purpose.",
    [
      ["Project boundary", "Defines the work included and excluded"],
      ["Executive sponsor", "Supports decisions and removes organisational barriers"],
      ["Process owner", "Remains accountable for continuing process performance"],
      ["Performance baseline", "Records verified performance before improvement"]
    ],
    "Scope establishes the work, sponsorship enables delivery, ownership provides continuing accountability, and the baseline supports later evaluation.");
 
  MA("W7O1b-12", "O1b", 3,
    "Match each unresolved project issue to the appropriate Launch Pad response.",
    [
      ["Departments disagree about authority", "Clarify decision rights and escalation arrangements"],
      ["Current performance figures are unreliable", "Verify records before confirming the baseline"],
      ["Employees cannot support the proposed workload", "Review capacity and participation commitments"],
      ["Expected customer benefits are unclear", "Define the intended outcomes and suitable measures"]
    ],
    "Launch Pad readiness depends on resolving or explicitly managing important uncertainties about authority, evidence, capacity, and benefits.");
 
 
  // ------------------------------------------------------------
  // O1c — What a completed Launch Pad must deliver
  // 12 questions
  // ------------------------------------------------------------
 
  M("W7O1c-01", "O1c", 1,
    "What is the principal purpose of the Launch Pad decision record?",
    [
      "To document an actionable improvement commitment for the team entering Understand",
      "To replace the investigation of how the selected process currently works",
      "To certify that the redesigned process has already delivered its benefits",
      "To provide the detailed software configuration for implementation"
    ],
    "The decision record connects the selected process with its scope, people, measures, benefits, risks, and outstanding commitments.");
 
  M("W7O1c-02", "O1c", 2,
    "The team cannot establish a trustworthy baseline from existing records. What should the decision record say?",
    [
      "The baseline is unconfirmed, and a responsible person must establish reliable evidence",
      "The team should estimate a convenient baseline and present it as verified",
      "The expected improvement target should be reported as current performance",
      "The project must claim that no performance measurement is necessary"
    ],
    "An honest handover distinguishes verified evidence from unresolved assumptions and assigns responsibility for establishing reliable measures.");
 
  M("W7O1c-03", "O1c", 3,
    "Qasr's steering group receives two drafts: a twelve-page report of ambitions, and one page naming the process, boundary, owner, baseline source and main risk. Which is the stronger Launch Pad output?",
    [
      "The one-page draft, because it is specific enough for the next team to act",
      "The long report, because a Launch Pad document should be as detailed as possible",
      "The long report, because shared ambitions matter more than named responsibilities",
      "Neither draft, because the Launch Pad should deliver the final redesigned process"
    ],
    "The Launch Pad document does not need to be long, but it must be specific enough for the next team to act. The one-page draft names the decisions the Understand team needs, while a report of ambitions leaves that team guessing.");
  TF("W7O1c-04", "O1c", 1,
    "A useful Launch Pad handover distinguishes confirmed commitments from assumptions requiring further investigation.",
    true,
    "The decision record must be honest about what managers have agreed and what the next team still needs to verify.");
 
  TF("W7O1c-05", "O1c", 2,
    "The Launch Pad decision record should prescribe the final redesigned process before Understand begins.",
    false,
    "Launch Pad prepares the improvement commitment. Understand investigates actual activities and causes before detailed redesign decisions are justified.");
 
  DR("W7O1c-06", "O1c", 1,
    "The Launch Pad produces a documented {1} that prepares the team for the {2} phase.",
    [
      ["decision record", "completed redesign", "software installation"],
      ["Understand", "Implement", "Realise Value"]
    ],
    "The decision record provides the agreed starting commitment, while Understand investigates the selected process and its current performance.");
 
  DR("W7O1c-07", "O1c", 2,
    "Expected benefits are {1} until reliable evidence demonstrates that the intended results have been {2}.",
    [
      ["promises", "verified achievements", "completed measurements"],
      ["achieved", "announced", "estimated"]
    ],
    "Expected benefits describe intended outcomes. Actual benefits require reliable evidence demonstrating that performance has improved.");
 
  V("W7O1c-08", "O1c", 2,
    "Which diagram shows the appropriate handover from Launch Pad into Understand?",
    [
      [
        D.flow(["Selected|process", "Scope and|people", "Measures|and risks", "+Understand|investigation"]),
        "A documented project commitment leads into investigation of the current process"
      ],
      [
        D.flow(["Selected|process", "Solution|installed", "+Benefits|claimed"]),
        "The selected process immediately produces a completed solution and claimed benefits"
      ],
      [
        D.flow(["Process|Architecture", "Automatic|redesign", "+Implementation"]),
        "The process architecture automatically produces an implemented redesign"
      ],
      [
        D.flow(["Sponsor|announced", "No|boundary", "!Investigation|begins"]),
        "Investigation begins without an agreed boundary or sufficient commitments"
      ]
    ],
    "Launch Pad establishes the improvement commitment, and Understand uses that commitment to investigate actual process activities and performance.");
 
  V("W7O1c-09", "O1c", 3,
    "Which diagram correctly distinguishes the commitment to measure benefits from their later verification?",
    [
      [
        D.flow(["Launch Pad|measure agreed", "Baseline|verified", "Changes|delivered", "+Realise Value|checked"]),
        "Measures are agreed before improvement, and achieved benefits are verified later"
      ],
      [
        D.flow(["Launch Pad|target agreed", "+Benefits|already achieved"]),
        "Agreeing a target immediately proves that the benefit has been achieved"
      ],
      [
        D.flow(["Project|announced", "Baseline|invented", "+Success|declared"]),
        "The project uses an invented baseline to declare success"
      ],
      [
        D.flow(["Changes|delivered", "Measure|defined later", "!No|comparison"]),
        "The measure is defined only after changes, without a credible comparison"
      ]
    ],
    "The Launch Pad establishes the measurement commitment. Later performance evidence is needed to determine whether the expected benefits were achieved.");
 
  OR("W7O1c-10", "O1c", 2,
    "Put these activities in the appropriate order from Launch Pad preparation to evidence-based improvement.",
    [
      "Document the selected process and agreed commitments",
      "Investigate actual activities and performance during Understand",
      "Develop and implement justified process improvements",
      "Verify whether expected benefits have been achieved"
    ],
    "The framework moves from a prepared commitment to understanding, improvement, and later verification of achieved benefits.");
 
  MA("W7O1c-11", "O1c", 2,
    "Match each part of the Launch Pad decision record to the question it answers.",
    [
      ["Selection rationale", "Why should this process begin now?"],
      ["Scope statement", "Where does the proposed work begin and end?"],
      ["Accountability", "Who supports decisions and owns continuing performance?"],
      ["Measures and benefits", "How will the intended improvement be evaluated?"]
    ],
    "The record should explain the starting choice, proposed boundary, accountable people, and basis for assessing expected results.");
 
  MA("W7O1c-12", "O1c", 3,
    "Match each Launch Pad output to the reason it matters in a later phase.",
    [
      ["Selected process with an agreed boundary", "Defines what the Understand phase will study"],
      ["Executive sponsor and process owner", "Clarifies who will decide and who will own the result"],
      ["Stakeholder map and engagement plan", "Guides consultation and change management"],
      ["Success measure, baseline and target", "Lets the Realise Value phase compare results fairly"]
    ],
    "Each output prepares a later step. The boundary tells Understand what to study, the two leadership roles settle decisions and ownership, the engagement plan guides consultation, and the measure with its baseline lets Realise Value judge results fairly.");
  M("W7O2a-01", "O2a", 1,
    "Which combination provides the strongest basis for selecting an initial BPM improvement project?",
    [
      "Strategic value, deliverability, sponsorship, and visibility of results",
      "Transaction volume, departmental size, software age, and employee seniority",
      "Complaint frequency, project publicity, management preference, and budget size",
      "Technical complexity, implementation cost, departmental authority, and project duration"
    ],
    "The Launch Pad balances strategic value, practical deliverability, committed sponsorship, and visible results when selecting a credible starting project.");
 
  M("W7O2a-02", "O2a", 2,
    "A process could generate substantial benefits, but its improvement depends on an unavailable external supplier. What should the steering group conclude?",
    [
      "The process has potential value, but its deliverability is currently uncertain",
      "The process must be selected because its potential benefits are substantial",
      "The supplier dependency makes the process strategically unimportant",
      "The process should receive the highest feasibility rating because it involves technology"
    ],
    "A valuable process may be unsuitable for immediate improvement when critical resources or dependencies remain unavailable.");
 
  M("W7O2a-03", "O2a", 3,
    "A charity can easily improve stationery purchasing, while emergency assistance delays affect vulnerable families. What is the strongest criticism of choosing stationery?",
    [
      "The project may be deliverable but contribute too little to the charity's mission",
      "Every easy project must be rejected regardless of its potential benefits",
      "Emergency assistance must automatically be selected without checking feasibility",
      "Stationery purchasing cannot qualify as a business process"
    ],
    "Deliverability matters, but an opening project must also create meaningful organisational value. Ease alone does not establish strategic relevance.");
 
  TF("W7O2a-04", "O2a", 1,
    "The process with the greatest theoretical benefit is always the best starting project.",
    false,
    "A high-value candidate may be difficult to deliver because of limited resources, unresolved dependencies, or inadequate sponsorship.");
 
  TF("W7O2a-05", "O2a", 2,
    "A committed executive sponsor can strengthen a project's deliverability by helping resolve cross-departmental barriers.",
    true,
    "Committed sponsorship supports decisions, secures cooperation, and helps the improvement team address organisational obstacles.");
 
  DR("W7O2a-06", "O2a", 1,
    "Strategic value concerns the importance of the expected {1}, while deliverability concerns the organisation's ability to {2} the improvement.",
    [
      ["benefits", "publicity", "departmental hierarchy"],
      ["achieve", "advertise", "postpone"]
    ],
    "Strategic value concerns meaningful organisational benefits, while deliverability concerns whether those benefits can realistically be pursued.");
 
  DR("W7O2a-07", "O2a", 2,
    "A project with strong sponsorship but little strategic contribution may be {1}, yet insufficiently {2}.",
    [
      ["deliverable", "mandatory", "unmeasurable"],
      ["valuable", "complex", "popular"]
    ],
    "Strong sponsorship can support delivery, but it cannot make a low-value project strategically worthwhile.");
 
  V("W7O2a-08", "O2a", 2,
    "Which diagram best represents a balanced Launch Pad selection assessment?",
    [
      [
        D.flow(["Strategic|value", "Delivery|readiness", "Sponsor|support", "+Visible|results"]),
        "Value, deliverability, sponsorship, and visibility are considered together"
      ],
      [
        D.flow(["Complaint|volume", "Loudest|manager", "+Project|selected"]),
        "The project is selected through complaint volume and managerial pressure"
      ],
      [
        D.flow(["Easiest|task", "Shortest|duration", "+Project|selected"]),
        "The easiest and shortest activity automatically becomes the project"
      ],
      [
        D.flow(["Highest|benefit", "Ignore|constraints", "+Project|selected"]),
        "The highest theoretical benefit determines selection regardless of constraints"
      ]
    ],
    "A balanced assessment considers the potential value of improvement alongside the conditions needed to deliver and demonstrate results.");
 
  V("W7O2a-09", "O2a", 3,
    "A school has one improvement team. Which picture shows the most defensible way to begin?",
    [
      [
        D.flow(["Important|objective", "Manageable|scope", "Sponsor|confirmed", "+Project|begins"]),
        "A strategically important project begins with manageable scope and confirmed sponsorship"
      ],
      [
        D.flow(["Important|objective", "!No|resources", "Project|begins"]),
        "A strategically important project begins despite unavailable resources"
      ],
      [
        D.flow(["Easy|activity", "!Little|value", "Project|begins"]),
        "An easy activity begins even though its organisational contribution is insignificant"
      ],
      [
        D.flow(["Many|problems", "All|launched", "!Team|overloaded"]),
        "Every problem becomes a simultaneous project despite limited team capacity"
      ]
    ],
    "The strongest starting commitment combines meaningful strategic contribution with a scope and support arrangements that make delivery realistic.");
 
  OR("W7O2a-10", "O2a", 2,
    "Arrange these activities into a sensible process for evaluating an improvement candidate.",
    [
      "Identify the organisational objective the candidate could support",
      "Examine the potential value of improving the process",
      "Assess delivery conditions and sponsor commitment",
      "Recommend a realistic starting project with supporting evidence"
    ],
    "A credible recommendation connects strategic purpose with potential benefits and practical delivery conditions before committing resources.");
 
  MA("W7O2a-11", "O2a", 2,
    "Match each selection criterion to the question it helps answer.",
    [
      ["Strategic value", "Would improvement contribute meaningfully to organisational objectives?"],
      ["Deliverability", "Can the organisation realistically undertake the proposed work?"],
      ["Sponsorship", "Will an accountable leader support decisions and remove barriers?"],
      ["Visibility", "Can stakeholders recognise and verify the resulting improvement?"]
    ],
    "The selection criteria address different dimensions of project suitability and should be considered together.");
 
  MA("W7O2a-12", "O2a", 3,
    "Match each candidate characteristic to its main implication for prioritisation.",
    [
      ["Substantial benefits but unavailable specialists", "High potential value with uncertain deliverability"],
      ["Committed sponsor but insignificant benefits", "Strong support with limited strategic value"],
      ["Manageable scope and meaningful customer impact", "Promising balance of value and feasibility"],
      ["Regulatory deadline but no sponsor yet", "Mandatory work needing a parallel accountable workstream"]
    ],
    "A balanced assessment separates potential benefits from the conditions needed to achieve them. A regulatory deadline is different again, because it creates mandatory work that may need its own parallel workstream rather than a place in the ranking.");
  V("W7O2c-09", "O2c", 3,
    "The director who championed corporate billing feels overlooked after guest arrival is chosen. Which diagram best limits the political cost of deferring billing?",
    [
      [
        D.flow(["Trade-off|explained", "Deferral|recorded", "+Review date|agreed"]),
        "The trade-off is explained, the deferral recorded, and a date set to reconsider billing"
      ],
      [
        D.flow(["Billing|not mentioned", "Debate|closed", "!Director|disengages"]),
        "Billing is left out of the record so that the debate closes quickly"
      ],
      [
        D.flow(["Both projects|promised", "One team|stretched", "!Delivery|stalls"]),
        "Both projects are promised at once to keep every director content"
      ],
      [
        D.flow(["Billing score|lowered", "Losses|dismissed", "!Trust|damaged"]),
        "Billing's score is lowered and its account losses are dismissed"
      ]
    ],
    "Deferring a process has a political cost, because its champion may withdraw support. Explaining the trade-off, recording the deferral and agreeing when billing will be reconsidered keeps the strongest alternative visible and respected.");
  M("W7O2b-01", "O2b", 1,
    "Which Qasr candidate has documented losses involving two corporate accounts?",
    [
      "Corporate billing",
      "Guest arrival",
      "Housekeeping room release",
      "Digital guest record"
    ],
    "Corporate billing has contributed to losing two corporate accounts, creating a substantial strategic argument for improvement.");
 
  M("W7O2b-02", "O2b", 2,
    "Why is guest arrival an attractive opening BPM candidate at Qasr?",
    [
      "It combines visible customer problems with a volunteered executive sponsor",
      "It requires no cooperation beyond the front desk",
      "It has already achieved its proposed improvement targets",
      "It eliminates every other process problem across the hotel group"
    ],
    "Guest arrival offers a visible customer-facing improvement opportunity, and the front-office director has volunteered to sponsor the work.");
 
  M("W7O2b-03", "O2b", 3,
    "The digital guest record faces a January regulatory deadline but lacks a committed sponsor. What should Qasr do?",
    [
      "Establish accountable leadership and a credible compliance response independently of the BPM starting choice",
      "Ignore the deadline because guest arrival has stronger sponsorship",
      "Assume that selecting guest arrival automatically satisfies the regulatory obligation",
      "Defer all digital guest record activity until the initial BPM project finishes"
    ],
    "Mandatory compliance obligations require appropriate action even when another process is selected for the initial BPM improvement project.");
 
  TF("W7O2b-04", "O2b", 1,
    "Housekeeping room release offers a relatively narrow departmental scope and high operational volume.",
    true,
    "Housekeeping room release is a potentially manageable candidate because of its narrower scope and substantial operational activity.");
 
  TF("W7O2b-05", "O2b", 2,
    "The opposition facing corporate billing means its documented financial consequences no longer matter.",
    false,
    "Leadership opposition creates delivery risk, but it does not remove the strategic importance of losing corporate accounts.");
 
  DR("W7O2b-06", "O2b", 1,
    "At Qasr, guest arrival has a volunteered {1}, while corporate billing faces leadership {2}.",
    [
      ["sponsor", "regulatory deadline", "supplier contract"],
      ["opposition", "unanimous support", "automatic approval"]
    ],
    "Guest arrival benefits from volunteered sponsorship, while opposition to corporate billing creates an important implementation obstacle.");
 
  DR("W7O2b-07", "O2b", 2,
    "The digital guest record presents a mandatory {1} obligation, whereas housekeeping room release offers a relatively {2} departmental scope.",
    [
      ["regulatory", "marketing", "optional"],
      ["narrow", "unlimited", "undefined"]
    ],
    "The digital guest record has a regulatory deadline, while housekeeping room release is comparatively contained within one operational function.");
 
  V("W7O2b-08", "O2b", 2,
    "Which diagram correctly distinguishes Qasr's recommended BPM project from its mandatory compliance work?",
    [
      [
        D.flow(["Guest arrival|BPM candidate", "Other improvements|deferred", "!Guest record|compliance"]),
        "Guest arrival is recommended for BPM while digital guest record compliance remains mandatory"
      ],
      [
        D.flow(["Guest arrival|selected", "Guest record|ignored", "+Compliance|assumed"]),
        "Selecting guest arrival removes the need to address digital guest record compliance"
      ],
      [
        D.flow(["Guest record|mandatory", "All other|work cancelled", "+No|prioritisation"]),
        "The regulatory deadline permanently cancels every other improvement candidate"
      ],
      [
        D.flow(["Room release|selected", "Corporate billing|resolved", "Guest arrival|completed"]),
        "Selecting room release means the other candidates have already been resolved"
      ]
    ],
    "Qasr must distinguish its initial BPM improvement choice from mandatory compliance obligations and other deferred improvements.");
 
  V("W7O2b-09", "O2b", 3,
    "Which diagram best represents the delivery trade-off between Qasr's guest arrival and corporate billing candidates?",
    [
      [
        D.flow(["Guest arrival|sponsor available", "Corporate billing|financial losses", "!Billing|leadership opposition"]),
        "Guest arrival has sponsorship, while billing has financial value but faces leadership opposition"
      ],
      [
        D.flow(["Guest arrival|no sponsor", "Corporate billing|unanimous support", "+No|trade-off"]),
        "Guest arrival lacks sponsorship and billing faces no implementation resistance"
      ],
      [
        D.flow(["Guest arrival|benefits achieved", "Corporate billing|problem solved", "+Both|completed"]),
        "Both candidates have already delivered their expected improvements"
      ],
      [
        D.flow(["Guest arrival|mandatory deadline", "Corporate billing|narrow scope", "+Same|conditions"]),
        "Guest arrival has the regulatory deadline and corporate billing has no leadership challenge"
      ]
    ],
    "The comparison must preserve both corporate billing's documented financial importance and guest arrival's stronger immediate sponsorship.");
 
  OR("W7O2b-10", "O2b", 2,
    "Arrange these steps for Qasr's steering group to handle the four competing candidates responsibly.",
    [
      "Examine the evidence and constraints associated with each candidate",
      "Compare strategic value, feasibility, sponsorship, and visibility",
      "Recommend a justified initial BPM project",
      "Document deferred improvements and mandatory compliance actions"
    ],
    "A defensible decision compares the candidates consistently, selects a realistic starting project, and addresses obligations outside that project.");
 
  MA("W7O2b-11", "O2b", 2,
    "Match each Qasr candidate to its distinctive evidence or constraint.",
    [
      ["Guest arrival", "Visible customer complaints and volunteered front-office sponsorship"],
      ["Corporate billing", "Two lost corporate accounts and leadership opposition"],
      ["Housekeeping room release", "High operational volume and relatively narrow scope"],
      ["Digital guest record", "January regulatory deadline and missing sponsorship"]
    ],
    "Each Qasr candidate has different strategic and delivery characteristics that must be preserved in the prioritisation decision.");
 
  MA("W7O2b-12", "O2b", 3,
    "Match each Qasr management concern to the most appropriate response.",
    [
      ["Corporate billing has caused account losses", "Retain its strategic case and explain any deferral"],
      ["Housekeeping has neutral sponsorship", "Assess whether leadership commitment can be strengthened"],
      ["Guest arrival crosses several departments", "Confirm participation and authority across the relevant handoffs"],
      ["Digital guest record faces a mandatory deadline", "Establish a separately accountable compliance response"]
    ],
    "The steering group must address each candidate's distinctive consequences rather than treating every problem as an interchangeable improvement opportunity.");
 
 
  // ---------------- O2c · Making a defensible first choice ----------------
 
  M("W7O2c-01", "O2c", 1,
    "What is the most defensible initial BPM recommendation for Qasr based on the case evidence?",
    [
      "Guest arrival, subject to confirming its remaining delivery commitments",
      "Corporate billing, because financial losses automatically override feasibility",
      "Housekeeping room release, because the narrowest scope must always win",
      "Digital guest record, because a compliance deadline automatically determines the BPM improvement choice"
    ],
    "Guest arrival combines visible customer problems with volunteered sponsorship, although its readiness conditions still require confirmation.");
 
  M("W7O2c-02", "O2c", 2,
    "The finance director challenges the guest-arrival recommendation by citing two lost corporate accounts. How should the steering group respond?",
    [
      "Acknowledge the financial evidence and explain why guest arrival remains the stronger immediate commitment",
      "Dismiss the objection because corporate billing was not selected",
      "Claim that corporate billing has no strategic value",
      "Remove corporate billing from the decision record to avoid disagreement"
    ],
    "A defensible recommendation addresses the strongest alternative argument and explains the trade-off rather than suppressing inconvenient evidence.");
 
  M("W7O2c-03", "O2c", 3,
    "Qasr's candidate scores favour guest arrival, but cross-departmental cooperation remains unconfirmed. What should management do?",
    [
      "Treat the recommendation as conditional until the required cooperation is secured",
      "Assume the highest score guarantees successful implementation",
      "Remove stakeholder cooperation from the selection criteria",
      "Declare the project completed because the scoring exercise has finished"
    ],
    "A favourable prioritisation score does not eliminate delivery risks. Managers must verify important assumptions before treating the project as fully ready.");
 
  TF("W7O2c-04", "O2c", 1,
    "A defensible starting recommendation should explain why the chosen project begins now and why alternatives are deferred.",
    true,
    "A sound prioritisation decision provides a reasoned selection rationale and makes the consequences for other candidates explicit.");
 
  TF("W7O2c-05", "O2c", 2,
    "Once Qasr selects guest arrival, the digital guest record's January deadline can be postponed without further action.",
    false,
    "A mandatory regulatory deadline requires appropriate management action independently of the initial BPM improvement choice.");
 
  DR("W7O2c-06", "O2c", 1,
    "A defensible recommendation acknowledges the strongest {1} and explains the organisational {2} behind the decision.",
    [
      ["alternative", "advertisement", "software version"],
      ["trade-offs", "job titles", "office locations"]
    ],
    "The steering group must address credible competing arguments and explain the trade-offs supporting its preferred starting project.");
 
  DR("W7O2c-07", "O2c", 2,
    "A prioritisation score should support managerial {1}, not replace evidence about project {2}.",
    [
      ["judgement", "publicity", "seniority"],
      ["readiness", "branding", "popularity"]
    ],
    "Scores organise the comparison, but managers remain responsible for checking whether the project can realistically proceed.");
 
  V("W7O2c-08", "O2c", 2,
    "Which diagram best represents a transparent and defensible Qasr steering-group decision?",
    [
      [
        D.flow(["Evidence|compared", "Guest arrival|recommended", "Alternatives|explained", "+Conditions|recorded"]),
        "The recommendation follows comparison, acknowledges alternatives, and records conditions"
      ],
      [
        D.flow(["Sponsor|volunteers", "Guest arrival|selected", "!Alternatives|ignored"]),
        "Volunteered sponsorship determines selection without examining alternatives"
      ],
      [
        D.flow(["Candidate|scores", "Highest|wins", "!No|readiness check"]),
        "The highest score automatically determines the project without checking readiness"
      ],
      [
        D.flow(["Corporate billing|opposes", "Objection|removed", "+Agreement|claimed"]),
        "The steering group removes opposition from the record and claims unanimous agreement"
      ]
    ],
    "A transparent recommendation connects comparative evidence with a justified choice, credible objections, and explicit readiness conditions.");
 
  OR("W7O2c-10", "O2c", 2,
    "Arrange these steps for defending a starting recommendation against a stakeholder's objection.",
    [
      "Listen to the alternative argument and identify its supporting evidence",
      "Compare that evidence with the original selection criteria",
      "Explain the trade-offs supporting the preferred recommendation",
      "Record the objection, decision, and treatment of deferred work"
    ],
    "A reasoned defence examines opposing evidence, applies consistent criteria, and documents the consequences of the final recommendation.");
 
  MA("W7O2c-11", "O2c", 2,
    "Match each component of a defensible recommendation to its purpose.",
    [
      ["Selection rationale", "Explains why the chosen process should begin now"],
      ["Strongest objection", "Shows that credible alternative evidence was considered"],
      ["Readiness conditions", "Identifies commitments requiring confirmation before delivery"],
      ["Deferred-work decision", "Explains how important unselected problems will be handled"]
    ],
    "A credible recommendation connects the preferred choice with opposing arguments, practical delivery conditions, and the consequences of deferral.");
 
  MA("W7O2c-12", "O2c", 3,
    "Match each statement made during Qasr's final debate to the appropriate management interpretation.",
    [
      ["Guest arrival has volunteered sponsorship", "Evidence supporting immediate delivery readiness"],
      ["Corporate billing has caused account losses", "A serious strategic argument for an alternative"],
      ["The digital guest record has a January deadline", "A mandatory obligation requiring accountable action"],
      ["Guest-arrival cooperation remains unconfirmed", "A condition that must be resolved before full commitment"]
    ],
    "The steering group must distinguish supporting evidence, competing strategic claims, mandatory obligations, and unresolved readiness conditions.");

// ---------------- O3a · Drawing a boundary that solves the problem ----------------
 
  M("W7O3a-01", "O3a", 1,
    "What is the main purpose of defining a process boundary during Launch Pad?",
    [
      "To establish which activities and handoffs the improvement project will investigate",
      "To identify every department that must undergo organisational restructuring",
      "To prescribe the final redesigned process before investigation begins",
      "To exclude all activities performed outside the sponsoring department"
    ],
    "A process boundary defines the proposed starting and ending events, relevant activities, handoffs, and exclusions so that the project remains focused and manageable.");
 
  M("W7O3a-02", "O3a", 2,
    "Why does Qasr's proposed guest-arrival boundary begin when a booking is confirmed?",
    [
      "Booking information and its handoffs may contribute to problems experienced during arrival",
      "Every activity performed by Reservations must become part of the improvement project",
      "The guest-arrival project must redesign the entire booking and marketing system",
      "The confirmed booking proves that the guest's arrival problems have already been resolved"
    ],
    "Starting at booking confirmation allows Qasr to investigate upstream information that may cause arrival problems without expanding into unrelated reservation activities.");
 
  M("W7O3a-03", "O3a", 3,
    "A manager proposes ending Qasr's guest-arrival project when the room key is issued. What is the strongest objection?",
    [
      "It would leave out the first-night billing handoff, where a wrong rate finally reaches the guest's bill",
      "It would automatically pull checkout and post-stay issues into the project",
      "It would make the project too broad, because room allocation is unrelated to arrival",
      "It would prevent the front-office director from acting as sponsor"
    ],
    "The agreed boundary runs from booking confirmation until the first night is billed. Stopping at the room key drops the billing handoff, so a rate error created at booking could still reach the guest without the project ever seeing it.");
  V("W7O3a-08", "O3a", 2,
    "Qasr considers studying the front desk alone. Which diagram shows the main risk of that narrow, one-department boundary?",
    [
      [
        D.flow(["Front desk|improved", "Cause stays|at booking", "!Problem moves|to next handoff"]),
        "The root problem simply moves to the next handoff"
      ],
      [
        D.flow(["Front desk|only", "!Scope keeps|expanding"]),
        "The scope keeps expanding without control"
      ],
      [
        D.flow(["Front desk|only", "!Needs commitment|across functions"]),
        "The project needs commitment across several functions"
      ],
      [
        D.flow(["Front desk|only", "+Root cause|always fixed"]),
        "The root cause is always fixed at reception"
      ]
    ],
    "A one-department boundary is faster to start and easier to agree, but it can push the root problem along to the next handoff. Needing commitment across functions is the risk of an end-to-end boundary, and uncontrolled expansion is the risk of simply following the problem.");
  TF("W7O3a-04", "O3a", 1,
    "A process improvement boundary may cross departmental boundaries without requiring the redesign of every activity in those departments.",
    true,
    "Cross-functional improvement includes relevant handoffs while excluding unrelated departmental activities that would unnecessarily expand the project.");
 
  TF("W7O3a-05", "O3a", 2,
    "A project boundary should remain unchanged even when the Understand phase reveals important causes outside the original scope.",
    false,
    "The proposed boundary should be reviewed when reliable investigation reveals dependencies that materially affect the improvement objective.");
 
  DR("W7O3a-06", "O3a", 1,
    "A useful project boundary identifies the process's {1} and {2} events.",
    [
      ["starting", "most expensive", "most popular"],
      ["ending", "least visible", "most automated"]
    ],
    "Defining the starting and ending events establishes the proposed limits of the process improvement investigation.");
 
  DR("W7O3a-07", "O3a", 2,
    "An effective scope includes relevant cross-functional {1} while excluding activities unrelated to the intended {2}.",
    [
      ["handoffs", "job titles", "budgets"],
      ["outcome", "departmental hierarchy", "software supplier"]
    ],
    "The project should include handoffs that influence its intended outcome without absorbing unrelated organisational work.");
 
  V("W7O3a-09", "O3a", 3,
    "A hospital wants to improve the time patients wait for diagnostic results. Which diagram shows the most appropriate proposed boundary?",
    [
      [
        D.flow(["Sample|received", "Test|completed", "Result|authorised", "+Patient|informed"]),
        "The project follows the result journey from sample receipt to patient notification"
      ],
      [
        D.flow(["Sample|received", "+Test|completed"]),
        "The project ends when laboratory testing finishes"
      ],
      [
        D.flow(["Result|authorised", "+Patient|informed"]),
        "The project examines only communication after authorisation"
      ],
      [
        D.flow(["Patient|admitted", "All|treatment", "Hospital|discharge", "+Follow-up|completed"]),
        "The project includes the patient's entire hospital treatment journey"
      ]
    ],
    "A useful boundary includes the activities and handoffs influencing the patient's result experience without expanding into unrelated hospital services.");
 
  OR("W7O3a-10", "O3a", 2,
    "Arrange these activities into a sensible sequence for defining a manageable improvement boundary.",
    [
      "Identify the customer or organisational outcome requiring improvement",
      "Determine the starting and ending events relevant to that outcome",
      "Identify the activities and handoffs needed to investigate the problem",
      "Document exclusions and confirm the proposed scope with stakeholders"
    ],
    "A defensible boundary begins with the intended outcome, identifies the relevant journey, and makes its inclusions and exclusions explicit.");
 
  MA("W7O3a-11", "O3a", 2,
    "Match each proposed scope characteristic to its main consequence.",
    [
      ["Boundary excludes important upstream information", "Potential causes may remain outside the investigation"],
      ["Boundary includes unrelated departmental work", "Delivery complexity increases unnecessarily"],
      ["Boundary follows the intended customer outcome", "Relevant cross-functional activities remain connected"],
      ["Boundary identifies explicit exclusions", "Stakeholders understand what the project will not redesign"]
    ],
    "Effective scope definition captures the activities needed to investigate the problem while protecting the project from unnecessary expansion.");
 
  MA("W7O3a-12", "O3a", 3,
    "Match each Qasr guest-arrival activity to its appropriate treatment within the proposed scope.",
    [
      ["Confirmed booking information", "Included as the upstream starting point"],
      ["Room readiness information handoff", "Included because it may influence arrival performance"],
      ["Completion of the first night's billing", "Included as the proposed ending event"],
      ["Unrelated post-stay marketing activities", "Excluded because they fall beyond the intended improvement"]
    ],
    "Qasr's boundary includes relevant booking, room readiness, arrival, and billing handoffs while excluding unrelated activities beyond the intended journey.");
 
 
  // ---------------- O3b · The people who can make the project succeed ----------------
 
  M("W7O3b-01", "O3b", 1,
    "On Qasr's stakeholder map, front-line staff have strong interest in the change but limited power. How should the project involve them?",
    [
      "Keep them informed, consult them, and ask them to test the current process and proposed changes",
      "Manage them closely by making every scope and benefit decision with them",
      "Keep them satisfied with occasional concise updates on risks and decisions",
      "Monitor them only at key points because their interest is low"
    ],
    "High interest with limited power places front-line staff in the keep-informed group. The engagement approach is to consult and explain, which includes asking staff to test the current process and the proposed changes.");
  M("W7O3b-02", "O3b", 2,
    "Why must Qasr formally confirm a process owner even though the front-office director has volunteered as sponsor?",
    [
      "Continuing accountability for process performance must remain clear after the project finishes",
      "The sponsor is prohibited from participating in operational improvement decisions",
      "The process owner must personally perform every guest-arrival activity",
      "Formal ownership removes the need for cooperation from other departments"
    ],
    "The sponsor enables the improvement project, while the process owner remains accountable for the process and its continuing performance.");
 
  M("W7O3b-03", "O3b", 3,
    "Qasr's front-office sponsor supports guest arrival, but Revenue refuses to change rate-information procedures. What should the project team do?",
    [
      "Clarify decision rights and use the agreed sponsorship and escalation arrangements to resolve the barrier",
      "Exclude all rate-information activities because Revenue has expressed resistance",
      "Assume the front-office sponsor automatically controls every departmental decision",
      "Proceed with implementation without informing the employees responsible for rate information"
    ],
    "Cross-functional improvement requires appropriate authority, stakeholder participation, and a route for resolving disagreements beyond the project team's control.");
 
  TF("W7O3b-04", "O3b", 1,
    "Employees who perform the process can reveal operational constraints that senior managers may not see in summary reports.",
    true,
    "Frontline participation provides practical evidence about actual activities, handoffs, exceptions, and constraints affecting process performance.");
 
  TF("W7O3b-05", "O3b", 2,
    "Once Qasr appoints an executive sponsor, participation from Reservations, Revenue, and Housekeeping becomes unnecessary.",
    false,
    "Guest arrival crosses several departments, so relevant employees must contribute evidence and support decisions affecting their activities.");
 
  DR("W7O3b-06", "O3b", 1,
    "Stakeholders with high influence and high interest should be managed {1}, while those with high influence but low interest should be kept {2}.",
    [
      ["closely", "occasionally", "anonymously"],
      ["satisfied", "informed", "monitored"]
    ],
    "The influence and interest map places powerful, highly interested people, such as the sponsor and process owner, in the manage-closely group. Powerful people with less direct interest, such as Qasr's legal team, are kept satisfied through concise updates on relevant risks and decisions.");
  DR("W7O3b-07", "O3b", 2,
    "A stakeholder engagement plan should clarify practical {1} and the authority to make or escalate {2}.",
    [
      ["participation", "publicity", "departmental rankings"],
      ["decisions", "advertisements", "attendance records"]
    ],
    "Effective engagement identifies who contributes to the work, who can approve changes, and how unresolved decisions will be escalated.");
 
  V("W7O3b-08", "O3b", 2,
    "Which diagram best represents the leadership and participation needed for Qasr's guest-arrival improvement?",
    [
      [
        D.flow(["Executive|sponsor", "Process|owner", "Cross-functional|participants", "+Continuing|performance"]),
        "The project combines executive support, continuing ownership, and cross-functional participation"
      ],
      [
        D.flow(["Executive|sponsor", "Front desk|only", "!Other|departments excluded"]),
        "The sponsor relies exclusively on front-desk employees despite cross-functional dependencies"
      ],
      [
        D.flow(["Project|team", "No|owner", "+Project|closure"]),
        "The improvement team operates without anyone accountable after closure"
      ],
      [
        D.flow(["Departmental|managers", "Separate|decisions", "!No|escalation"]),
        "Departments make conflicting decisions without agreed escalation arrangements"
      ]
    ],
    "A viable cross-functional project requires leadership support, continuing process accountability, and meaningful participation from relevant stakeholders.");
 
  V("W7O3b-09", "O3b", 3,
    "A bakery chain is improving replenishment across production, distribution, and shops. Which diagram shows the strongest participation arrangement?",
    [
      [
        D.flow(["Operations|sponsor", "Process|owner", "Production and|drivers", "+Shop|employees"]),
        "Leadership and operational representatives participate across the complete replenishment journey"
      ],
      [
        D.flow(["Headquarters|reports", "Managers|decide", "!Frontline|excluded"]),
        "Headquarters designs the changes without consulting operational employees"
      ],
      [
        D.flow(["Shop|employees", "Local|suggestions", "!No|decision authority"]),
        "Frontline employees participate without accountable leadership or decision authority"
      ],
      [
        D.flow(["Transport|manager", "Delivery|costs", "!Customer|outcomes ignored"]),
        "Transport costs dominate while shop constraints and customer outcomes are ignored"
      ]
    ],
    "Effective participation connects leadership authority with the practical knowledge of employees performing the cross-functional process.");
 
  OR("W7O3b-10", "O3b", 2,
    "Arrange these actions into a sensible sequence for establishing Qasr's stakeholder commitments.",
    [
      "Identify the departments and people influencing the guest-arrival journey",
      "Confirm executive sponsorship and continuing process ownership",
      "Agree participation responsibilities and decision rights",
      "Establish escalation arrangements for unresolved cross-functional disagreements"
    ],
    "The project must identify relevant stakeholders, establish accountability, clarify practical participation, and provide a route for resolving barriers.");
 
  MA("W7O3b-11", "O3b", 2,
    "Match each stakeholder role to its main contribution to the improvement project.",
    [
      ["Executive sponsor", "Secures leadership support and helps remove barriers"],
      ["Process owner", "Remains accountable for continuing process performance"],
      ["Frontline employees", "Provide evidence about actual activities and operational constraints"],
      ["Customer representatives", "Explain the experience and outcomes the process should improve"]
    ],
    "Successful BPM combines leadership authority, continuing accountability, operational knowledge, and evidence about customer outcomes.");
 
  MA("W7O3b-12", "O3b", 3,
    "Match each Qasr stakeholder concern to the most appropriate management response.",
    [
      ["Reservations questions upstream information changes", "Clarify its participation and the relevant booking handoffs"],
      ["Revenue disputes authority over rate corrections", "Confirm decision rights and escalation arrangements"],
      ["Housekeeping reports room-readiness constraints", "Include its operational evidence in the investigation"],
      ["Continuing ownership remains unconfirmed", "Formally assign an accountable process owner"]
    ],
    "Each concern requires a response that respects cross-functional dependencies while establishing practical authority and accountability.");
 
 
  // ---------------- O3c · Turning disagreement into an agreed commitment ----------------
 
  M("W7O3c-01", "O3c", 1,
    "What is the strongest response when a stakeholder presents credible evidence against Qasr's guest-arrival recommendation?",
    [
      "Examine the evidence, acknowledge the trade-off, and explain whether the recommendation remains justified",
      "Remove the objection from the decision record to preserve apparent agreement",
      "Treat the stakeholder's disagreement as proof that the selected project must fail",
      "Proceed without considering the objection because the steering group has already expressed a preference"
    ],
    "A defensible Launch Pad commitment examines credible objections and explains how their evidence affects the proposed decision.");
 
  M("W7O3c-02", "O3c", 2,
    "Reservations says booking is not part of guest arrival, yet the rate errors found at check-in began during booking. What should the programme director do?",
    [
      "Keep booking in scope, involve Reservations as joint owner, and record the reason for the boundary",
      "Remove booking from the scope so that Reservations remains comfortable with the project",
      "Keep booking in scope and instruct Reservations to comply without explaining why",
      "Expand the project to redesign every activity that Reservations performs"
    ],
    "Tracing the complaint shows that a front-desk-only scope would not fix the cause. The practical response is to keep booking in scope, involve Reservations as a joint owner, and record the boundary, the reason and the decision.");
  M("W7O3c-03", "O3c", 3,
    "A legal director objects to simplifying business licensing because mandatory checks could be weakened. What is the most responsible response?",
    [
      "Investigate the compliance concern and preserve necessary controls while examining avoidable delays",
      "Exclude legal affairs from the project because its objections create resistance",
      "Remove the statutory checks immediately to demonstrate faster processing",
      "Cancel all investigation because any stakeholder objection makes improvement impossible"
    ],
    "Stakeholder resistance may reveal legitimate risks, so the project should examine the evidence and protect mandatory requirements.");
 
  TF("W7O3c-04", "O3c", 1,
    "Stakeholders can support an agreed improvement investigation without personally preferring the selected project.",
    true,
    "Practical commitment does not require unanimous preference, provided the decision is transparent and responsibilities are agreed.");
 
  TF("W7O3c-05", "O3c", 2,
    "A strong Launch Pad decision should omit unresolved objections because documenting disagreement undermines the project's credibility.",
    false,
    "Recording credible objections strengthens transparency and allows managers to understand the evidence, trade-offs, and remaining risks.");
 
  DR("W7O3c-06", "O3c", 1,
    "Reservations can help investigate the booking {1} without committing to a redesign of its whole {2}.",
    [
      ["handoff", "budget", "brand"],
      ["department", "contract", "logo"]
    ],
    "Including an upstream handoff brings the information that causes arrival errors into the project. It does not turn the project into a redesign of everything Reservations does, which makes its cooperation easier to secure.");
  V("W7O3c-09", "O3c", 3,
    "After reviewing the evidence, Revenue and the front desk still disagree about who should change rate information. Which diagram shows the strongest way forward?",
    [
      [
        D.flow(["Operational|discussion", "Evidence|review", "Sponsor|decision", "+Commitment|recorded"]),
        "The disagreement is escalated to the sponsor, and the decision is recorded"
      ],
      [
        D.flow(["Operational|discussion", "No|agreement", "!Project|paused"]),
        "The project pauses until the two departments agree on their own"
      ],
      [
        D.flow(["Front desk|decides alone", "!Revenue|not consulted"]),
        "The front desk decides alone without consulting Revenue"
      ],
      [
        D.flow(["Sponsor|decides", "Nothing|written down", "!Dispute|returns"]),
        "The sponsor decides, but nothing is written down"
      ]
    ],
    "When discussion and evidence cannot settle a cross-functional dispute, the executive sponsor resolves it, because that role exists to settle disputes and remove barriers. Recording the decision turns it into a commitment that both departments can refer to later.");
  DR("W7O3c-07", "O3c", 2,
    "Stakeholder resistance can provide useful {1}, while agreed decision rights and escalation arrangements support practical {2}.",
    [
      ["evidence", "publicity", "automation"],
      ["commitment", "secrecy", "competition"]
    ],
    "Constructive resistance can expose overlooked risks, while clear governance helps stakeholders act on the resulting decision.");
 
  V("W7O3c-08", "O3c", 2,
    "Which diagram best represents how Qasr should turn a disagreement about its starting project into an actionable commitment?",
    [
      [
        D.flow(["Objection|heard", "Evidence|examined", "Trade-off|explained", "+Commitment|recorded"]),
        "The steering group examines opposing evidence before documenting a justified commitment"
      ],
      [
        D.flow(["Objection|raised", "Concern|dismissed", "+Agreement|claimed"]),
        "The steering group dismisses the objection and claims agreement"
      ],
      [
        D.flow(["Managers|disagree", "Every|project launched", "!Capacity|exceeded"]),
        "Every preferred project begins simultaneously to avoid choosing"
      ],
      [
        D.flow(["Sponsor|decides", "Evidence|ignored", "!No|decision record"]),
        "The sponsor makes an undocumented decision without examining the evidence"
      ]
    ],
    "A defensible commitment emerges from considering evidence, explaining trade-offs, and documenting the resulting decision and responsibilities.");
 
  OR("W7O3c-10", "O3c", 2,
    "Arrange these actions into a sensible sequence for resolving a stakeholder challenge to the proposed project.",
    [
      "Invite the stakeholder to explain the concern and supporting evidence",
      "Examine the concern against the project's objectives and constraints",
      "Refine the proposal or explain why the original recommendation remains justified",
      "Document the decision, responsibilities, and outstanding conditions"
    ],
    "Effective disagreement management uses evidence to strengthen the recommendation and records the resulting commitments transparently.");
 
  MA("W7O3c-11", "O3c", 2,
    "Match each stakeholder behaviour to its most appropriate interpretation.",
    [
      ["A director identifies a missing regulatory control", "Potentially valuable evidence about compliance risk"],
      ["A manager prefers a different strategically important process", "A legitimate competing prioritisation argument"],
      ["Employees explain that proposed changes cannot work operationally", "Practical evidence requiring investigation"],
      ["A sponsor agrees to resolve cross-functional barriers", "A concrete leadership commitment supporting delivery"]
    ],
    "Stakeholder contributions should be evaluated according to their evidence and implications rather than dismissed simply because they complicate the project.");
 
  MA("W7O3c-12", "O3c", 3,
    "Match each unresolved disagreement to the action needed before Qasr can claim a credible project commitment.",
    [
      ["Finance disputes the starting priority", "Record its strongest argument and explain the selection trade-off"],
      ["Revenue questions who may approve rate-information changes", "Clarify decision rights and escalation authority"],
      ["Reservations cannot confirm employee availability", "Agree realistic participation and capacity arrangements"],
      ["Managers disagree about the project's intended results", "Confirm the expected benefits and how they will be measured"]
    ],
    "A credible commitment addresses competing priorities, decision authority, available capacity, and the outcomes the project intends to achieve.");

// ---------------- O3d · Establishing the baseline before redesign ----------------
 
  M("W7O3d-01", "O3d", 1,
    "What is the main purpose of establishing a performance baseline during Launch Pad?",
    [
      "To provide a reliable starting point against which later improvement can be evaluated",
      "To demonstrate that the proposed redesign has already delivered its expected benefits",
      "To replace the need for an agreed improvement target",
      "To identify which department should receive the largest project budget"
    ],
    "A baseline records verified performance before improvement, allowing managers to evaluate whether subsequent changes produce meaningful results.");
 
  M("W7O3d-02", "O3d", 2,
    "Qasr wants to measure the percentage of completed check-ins requiring no correction to the confirmed booking rate. Which calculation is appropriate?",
    [
      "Check-ins without rate corrections divided by all completed check-ins, multiplied by 100",
      "Rate corrections divided by the number of participating hotels, multiplied by 100",
      "Check-ins without rate corrections divided by the number of reception employees, multiplied by 100",
      "Guest complaints divided by the number of booking confirmations, multiplied by 100"
    ],
    "The proposed measure compares completed check-ins without rate corrections against all completed check-ins in the same reporting period.");
 
  M("W7O3d-03", "O3d", 3,
    "Two Qasr hotels report different rate-correction percentages, but they classify corrections differently. What should the programme director do?",
    [
      "Agree consistent definitions and verify the underlying records before comparing performance",
      "Treat the higher percentage as proof that one hotel has a better process",
      "Average the reported percentages without examining their calculations",
      "Exclude the hotel reporting more corrections to improve the programme's results"
    ],
    "Performance comparisons require consistent definitions, reporting periods, and reliable transaction records before differences can be interpreted.");
 
  TF("W7O3d-04", "O3d", 1,
    "An improvement target describes intended future performance rather than an achievement already demonstrated.",
    true,
    "A target states the performance level the organisation intends to reach, while demonstrated improvement requires reliable evidence of actual results.");
 
  TF("W7O3d-05", "O3d", 2,
    "If Qasr cannot obtain reliable historical data, it should invent a reasonable baseline so the project can proceed.",
    false,
    "An unsupported baseline would undermine later evaluation, so Qasr should establish a reliable collection method and document the unresolved evidence.");
 
  DR("W7O3d-06", "O3d", 1,
    "The {1} describes verified performance before improvement, while the {2} describes the intended future performance level.",
    [
      ["baseline", "sponsor", "project boundary"],
      ["target", "process architecture", "stakeholder register"]
    ],
    "The baseline establishes the starting performance level, while the target defines the improvement the organisation intends to achieve.");
 
  DR("W7O3d-07", "O3d", 2,
    "A credible performance measure requires a consistent {1} and reliable transaction {2}.",
    [
      ["definition", "advertisement", "departmental ranking"],
      ["records", "opinions", "promises"]
    ],
    "Consistent measurement definitions and reliable records allow performance to be compared meaningfully across reporting periods.");
 
  V("W7O3d-08", "O3d", 2,
    "Which diagram correctly represents the measurement commitment Qasr should establish?",
    [
      [
        D.flow(["Measure|defined", "Baseline|verified", "Target|agreed", "+Reporting|assigned"]),
        "The measure is defined, the baseline verified, the target agreed, and reporting assigned"
      ],
      [
        D.flow(["Target|announced", "Success|declared", "!No|baseline"]),
        "A target is announced and success declared without establishing current performance"
      ],
      [
        D.flow(["Hotel|reports", "Definitions|differ", "+Results|compared"]),
        "Hotels are compared even though their measurement definitions differ"
      ],
      [
        D.flow(["Benefits|expected", "Baseline|invented", "+Results|approved"]),
        "Expected benefits are supported by an invented baseline"
      ]
    ],
    "Qasr needs an agreed calculation, trustworthy baseline, realistic target, and accountable reporting arrangements.");
 
  V("W7O3d-09", "O3d", 3,
    "A delivery company changes which orders count in its punctuality calculation. Which diagram shows the strongest response?",
    [
      [
        D.flow(["Definitions|reviewed", "Records|verified", "Comparable|baseline", "+Results|evaluated"]),
        "The company restores consistent definitions before evaluating reported improvement"
      ],
      [
        D.flow(["Calculation|changed", "Percentage|rises", "+Success|declared"]),
        "A higher percentage is accepted as improvement despite the changed calculation"
      ],
      [
        D.flow(["Failed orders|excluded", "Performance|reported", "!No|disclosure"]),
        "Failed deliveries are excluded without explaining the measurement change"
      ],
      [
        D.flow(["Customer|complaints", "Records|ignored", "+Target|approved"]),
        "A target is approved without checking transaction records or calculation rules"
      ]
    ],
    "Reliable performance evaluation requires comparable calculations and transparent treatment of relevant transactions.");
 
  OR("W7O3d-10", "O3d", 2,
    "Arrange these activities into a credible sequence for establishing Qasr's rate-correction measurement.",
    [
      "Define what counts as a completed check-in and a rate correction",
      "Collect and verify records from an agreed reporting period",
      "Calculate the baseline using the agreed definition",
      "Agree the improvement target and continuing reporting responsibility"
    ],
    "The team must define the measure and verify its data before establishing a baseline and agreeing how future performance will be assessed.");
 
  MA("W7O3d-11", "O3d", 2,
    "Match each measurement element to its role in evaluating Qasr's guest-arrival improvement.",
    [
      ["Measure definition", "Specifies which transactions and corrections are counted"],
      ["Baseline", "Records verified performance before redesign"],
      ["Target", "States the intended future performance level"],
      ["Reporting responsibility", "Identifies who produces and checks continuing results"]
    ],
    "A credible measurement commitment combines consistent definitions, verified starting performance, intended improvement, and accountable reporting.");
 
  MA("W7O3d-12", "O3d", 3,
    "Match each measurement problem to the most appropriate management response.",
    [
      ["Hotels classify rate corrections differently", "Agree and apply a consistent operational definition"],
      ["Historical transaction records are incomplete", "Verify available evidence and establish reliable collection"],
      ["Managers claim success after announcing a target", "Require evidence of actual performance change"],
      ["Reported percentages improve but complaints continue", "Investigate whether the measure reflects the guest experience"]
    ],
    "Reliable benefit evaluation requires consistent calculations, trustworthy evidence, and attention to whether reported results represent meaningful customer improvement.");
 
 
  // ---------------- O3e · The one-page Launch Pad decision ----------------
 
  M("W7O3e-01", "O3e", 1,
    "What should Qasr's one-page Launch Pad decision record primarily accomplish?",
    [
      "Connect the starting choice with its scope, people, measures, benefits, risks, and outstanding conditions",
      "Provide a complete redesign of every guest-arrival activity before investigation",
      "Demonstrate that the proposed improvements have already achieved their targets",
      "Replace the need for accountable sponsorship and continuing process ownership"
    ],
    "The decision record communicates an actionable improvement commitment while distinguishing confirmed agreements from matters requiring further investigation.");
 
  M("W7O3e-02", "O3e", 2,
    "Which statement best explains why Qasr should document the corporate billing alternative?",
    [
      "Its documented account losses create a serious strategic argument that the steering group must address",
      "Corporate billing has no relevance once guest arrival receives the improvement team",
      "Recording an alternative means Qasr must launch both projects simultaneously",
      "The decision record should include only arguments supporting the preferred candidate"
    ],
    "Corporate billing's financial consequences remain important, so a transparent recommendation must explain the trade-off and treatment of deferred work.");
 
  M("W7O3e-03", "O3e", 3,
    "The steering group supports guest arrival, but the process owner and baseline remain unconfirmed. What should its decision record state?",
    [
      "Guest arrival is conditionally endorsed, with ownership and baseline verification recorded as readiness requirements",
      "Guest arrival is fully ready because the front-office director has volunteered as sponsor",
      "The process owner and baseline can be omitted because they belong entirely to implementation",
      "The expected benefits should be recorded as achieved to justify immediate approval"
    ],
    "Conditional endorsement preserves the recommendation while making unresolved accountability and measurement requirements explicit.");
 
  TF("W7O3e-04", "O3e", 1,
    "The Launch Pad decision record should distinguish the initial BPM project from mandatory compliance work requiring separate action.",
    true,
    "Qasr's digital guest record deadline requires an accountable compliance response even though guest arrival is the recommended BPM starting project.");
 
  TF("W7O3e-05", "O3e", 2,
    "Because the Launch Pad record fits on one page, it may describe the boundary loosely and leave the Understand team to decide where the process starts.",
    false,
    "The record does not need to be long, but it must be specific enough for the next team to act. The agreed boundary defines what the Understand phase will study, so it cannot be left for that team to guess.");
  DR("W7O3e-06", "O3e", 1,
    "The risk line of Qasr's one-page record names the main {1} and states how the team will {2} it.",
    [
      ["barrier", "benefit", "budget"],
      ["address", "advertise", "ignore"]
    ],
    "The one-page summary asks the team to name the main barrier and the response to it. That statement shows the sponsor where intervention may become necessary.");
  V("W7O3f-09", "O3f", 3,
    "Which diagram shows how you are asked to take part in the Week Seven forum?",
    [
      [
        D.flow(["Read the|new case", "Post your own|recommendation", "Read|classmates' posts", "+Reply to two,|challenge one"]),
        "Read the case, post your own view, then reply to two classmates and challenge one"
      ],
      [
        D.flow(["Read|classmates' posts", "Post a|similar view", "+Agree with|two peers"]),
        "Read classmates' posts beforehand, then post a similar view and agree with two peers"
      ],
      [
        D.flow(["Copy Qasr's|answer", "Skip the|exhibit", "+Reply to|one peer"]),
        "Reuse Qasr's answer, skip the exhibit, and reply to one peer"
      ],
      [
        D.flow(["Read the|new case", "Reply to|peers only", "!No post|of your own"]),
        "Read the case and reply to peers without posting your own recommendation"
      ]
    ],
    "You post your own recommendation before reading classmates' posts, then reply substantively to at least two and offer a constructive disagreement with at least one. The forum case is a different organisation, so Qasr's answer cannot simply be reused.");
  DR("W7O3e-07", "O3e", 2,
    "A responsible Launch Pad record separates confirmed {1} from unresolved {2} requiring verification.",
    [
      ["commitments", "complaints", "advertisements"],
      ["assumptions", "achievements", "organisational objectives"]
    ],
    "A credible decision record identifies what management has agreed and what must still be checked before the project can proceed confidently.");
 
  V("W7O3e-08", "O3e", 2,
    "Which diagram best represents the contents of Qasr's actionable Launch Pad handover?",
    [
      [
        D.flow(["Chosen|process", "Agreed|boundary", "People and|authority", "Measures|and risks", "+Understand|phase"]),
        "The handover connects selection, scope, accountability, measurement, and investigation"
      ],
      [
        D.flow(["Sponsor|volunteers", "Project|announced", "!No|ownership"]),
        "The handover relies on sponsorship without confirming continuing accountability"
      ],
      [
        D.flow(["Guest arrival|selected", "Solution|installed", "+Benefits|claimed"]),
        "The handover assumes the solution and benefits are already complete"
      ],
      [
        D.flow(["Candidate|scores", "Highest|selected", "!Alternatives|ignored"]),
        "The handover records only the highest score and ignores competing obligations"
      ]
    ],
    "A useful handover gives the Understand team a defined project commitment supported by people, measures, risks, and a justified starting choice.");
 
  V("W7O3e-09", "O3e", 3,
    "Which diagram shows the correct relationship between Qasr's selected project and its other priorities?",
    [
      [
        D.flow(["Guest arrival|BPM project", "Corporate billing|reconsider", "Room release|defer", "!Guest record|compliance"]),
        "Guest arrival is recommended while deferred improvements and mandatory compliance remain visible"
      ],
      [
        D.flow(["Guest arrival|selected", "Other problems|cancelled", "+No|further action"]),
        "Selecting guest arrival eliminates responsibility for every other problem"
      ],
      [
        D.flow(["Four|candidates", "Four|projects launched", "!One|delivery team"]),
        "All four projects begin simultaneously despite limited improvement capacity"
      ],
      [
        D.flow(["Guest record|deferred", "January|deadline ignored", "+Compliance|assumed"]),
        "The mandatory digital guest record deadline is ignored after BPM prioritisation"
      ]
    ],
    "The decision must distinguish the initial BPM commitment from deferred improvement candidates and regulatory obligations that cannot simply wait.");
 
  OR("W7O3e-10", "O3e", 2,
    "Arrange these activities into a sensible sequence for preparing Qasr's final Launch Pad decision record.",
    [
      "Document the selected process and evidence supporting its selection",
      "Define the proposed boundary and relevant exclusions",
      "Confirm accountable people and performance measurement commitments",
      "Record expected benefits, risks, deferred work, and outstanding conditions"
    ],
    "The record should connect the selection rationale with a manageable scope, accountable delivery arrangements, measurable objectives, and unresolved risks.");
 
  MA("W7O3e-11", "O3e", 2,
    "Match each decision-record component to the question it answers.",
    [
      ["Selection rationale", "Why should guest arrival begin before other candidates?"],
      ["Scope statement", "Which activities and handoffs belong inside the project?"],
      ["Stakeholder commitment", "Who participates, approves changes, and resolves barriers?"],
      ["Measurement commitment", "How will current performance and later results be evaluated?"]
    ],
    "A defensible decision record explains the choice, boundaries, people, and measurement arrangements needed for a credible improvement project.");
 
  MA("W7O3e-12", "O3e", 3,
    "Match each Qasr decision-record statement to its appropriate status.",
    [
      ["Guest arrival is the recommended BPM starting project", "Documented selection recommendation"],
      ["The front-office director has volunteered as sponsor", "Proposed executive sponsorship commitment"],
      ["The rate-correction baseline has not been verified", "Unresolved measurement condition"],
      ["Fewer corrections are expected after improvement", "Anticipated benefit requiring later verification"]
    ],
    "The record must distinguish the recommendation and available sponsorship from unresolved evidence and benefits that remain expectations.");
 
 
  // ---------------- O3f · From Qasr's decision to your forum ----------------
 
  M("W7O3f-01", "O3f", 1,
    "What is the central task in the Week Seven discussion forum?",
    [
      "Recommend and defend a starting process using the new case's evidence and competing alternatives",
      "Repeat Qasr's guest-arrival recommendation without examining the new organisation",
      "Produce a completed technical redesign of every candidate process",
      "Demonstrate that the selected process has already achieved its improvement targets"
    ],
    "The forum requires an evidence-based starting recommendation for an unfamiliar organisation, supported by selection criteria and reasoned treatment of alternatives.");
 
  M("W7O3f-02", "O3f", 2,
    "A classmate recommends a different process and cites evidence you overlooked. What is the strongest response?",
    [
      "Examine the evidence and explain whether it changes your assessment of the trade-offs",
      "Repeat your original recommendation without addressing the alternative",
      "Reject the argument because another student presented it",
      "Agree immediately without checking whether the evidence supports the proposed choice"
    ],
    "Constructive disagreement tests a recommendation by examining competing evidence, assumptions, and organisational consequences.");
 
  M("W7O3f-03", "O3f", 3,
    "During Understand, Qasr discovers that rate corrections originate outside the originally assumed activities. What should the team do?",
    [
      "Investigate the new evidence and reconsider relevant assumptions or boundaries where necessary",
      "Ignore the finding because the Launch Pad decision has already been recorded",
      "Implement the original solution without examining the newly identified cause",
      "Declare the baseline invalid solely because the initial explanation was incorrect"
    ],
    "The BPM framework supports revisiting earlier assumptions when reliable investigation reveals important causes or dependencies.");
 
  TF("W7O3f-04", "O3f", 1,
    "The Week Seven forum asks learners to consider a different organisation rather than automatically transferring Qasr's chosen process.",
    true,
    "The forum case presents its own evidence and constraints, so learners must apply the Launch Pad principles to that organisation.");
 
  TF("W7O3f-05", "O3f", 2,
    "Once the Launch Pad recommendation has been approved, the Understand phase must preserve every original assumption regardless of new evidence.",
    false,
    "Understand investigates actual process performance and may reveal evidence requiring the team to reconsider earlier assumptions or boundaries.");
 
  DR("W7O3f-06", "O3f", 1,
    "The Launch Pad establishes where improvement should {1}, while Understand investigates how the selected process actually {2}.",
    [
      ["begin", "finish", "disappear"],
      ["works", "advertises", "competes"]
    ],
    "Launch Pad establishes the starting commitment, while Understand examines actual activities, handoffs, performance, and causes.");
 
  DR("W7O3f-07", "O3f", 2,
    "A strong forum recommendation uses case {1} and responds constructively to a reasoned {2}.",
    [
      ["evidence", "publicity", "guess"],
      ["alternative", "advertisement", "software installation"]
    ],
    "The forum develops evidence-based prioritisation and the ability to defend a recommendation against credible competing arguments.");
 
  V("W7O3f-08", "O3f", 2,
    "Which diagram best represents the transition from Week Seven's Launch Pad into Week Eight's Understand phase?",
    [
      [
        D.route([2, 3]),
        "Launch Pad establishes the starting commitment, then Understand investigates the current process"
      ],
      [
        D.route([3, 2]),
        "Understand is completed before the Launch Pad starting decision"
      ],
      [
        D.route([2, 8]),
        "Launch Pad moves directly to Realise Value without investigating the current process"
      ],
      [
        D.route([1, 3]),
        "Process Architecture moves directly to Understand without the Launch Pad commitment"
      ]
    ],
    "Week Seven establishes where and why BPM improvement begins, while Week Eight investigates how the selected process actually operates.");
 
  OR("W7O3f-10", "O3f", 2,
    "Arrange these activities into a sensible progression from the Week Seven forum to Week Eight's process investigation.",
    [
      "Examine the unfamiliar organisation's case evidence and candidate processes",
      "Recommend a justified starting scope and address competing arguments",
      "Establish the agreed improvement commitment and measurement basis",
      "Investigate actual activities, handoffs, and causes during Understand"
    ],
    "The learning progression moves from evidence-based prioritisation and project commitment into investigation of the selected process.");
 
  MA("W7O3f-11", "O3f", 2,
    "Match each activity to the appropriate stage of the learner's work.",
    [
      ["Compare candidates using strategic value and deliverability", "Launch Pad prioritisation"],
      ["Defend a recommendation against a classmate's alternative", "Week Seven forum discussion"],
      ["Investigate how employees actually perform the selected work", "Understand phase"],
      ["Reconsider assumptions when investigation reveals new causes", "Evidence-based framework iteration"]
    ],
    "The forum develops defensible prioritisation, while Understand develops evidence about actual process behaviour and may challenge earlier assumptions.");
 
  MA("W7O3f-12", "O3f", 3,
    "Match each forum or handover challenge to the strongest response.",
    [
      ["A classmate identifies a stronger strategic benefit", "Reassess the competing evidence and explain its implications"],
      ["The preferred process has an unclear ending event", "Define the intended outcome and proposed boundary"],
      ["The selected project's baseline remains unverified", "Document the gap and establish reliable measurement evidence"],
      ["Understand reveals a previously overlooked handoff", "Review the relevant assumptions and scope using the new evidence"]
    ],
    "A defensible BPM commitment combines transparent prioritisation, manageable scope, credible measurement, and willingness to learn from later investigation.");
 
 
  // ---------- normalise to the documented schema ----------
  const A = window.ADAPTIVE;
  B.forEach((x) => {
    x.lo = A.sections[x.sec].lo; x.clo = A.outcomes[x.lo].clo; x.outcome = A.outcomes[x.lo].full; x.rem = `review:${x.sec}`;
    if (x.type === "mcq" || x.type === "visual") x.ans = 0;
    if (x.type === "tf") x.o = ["True", "False"];
    if (x.type === "drop") { x.o = x.blanks; x.ans = x.blanks.map((b) => b[0]); }
    if (x.type === "order") { x.o = x.items; x.ans = x.items.slice(); }
    if (x.type === "match") { x.o = x.pairs; x.ans = x.pairs.map((p) => p[1]); }
  });
  A.bank = B;
})();
