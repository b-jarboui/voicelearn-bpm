// OPER621 Business Process Management - Week 9 question bank.
// Topic: The Innovate Phase - Framework Phase 5.
// Sources: Week 9 slides, delivery plan, Jeston Chapter 17.
// Running case: Qasr Hospitality Group and Qasr Marina.
// Author: Prof. Bassem Jarboui.
//
// COURSE LEARNING OUTCOMES
// S1: Design a framework for BPM and explain and assess related phases
//     in the context of a regional company.
// S2: Integrate new technologies to manage organizational changes.
//
// WEEKLY OUTCOMES
// O1: Design a to-be process that addresses root causes rather than symptoms.
//     Primary CLO: S1. Supporting CLO: S2.
// O2: Evaluate incremental against radical redesign options on benefit
//     and feasibility.
//     Primary CLO: S1. Supporting CLO: S2.
// O3: Integrate technology options into a redesigned process.
//     Primary CLO: S2. Supporting CLO: S1.
//
// LESSON AND SECTION MAPPING
// l1: O1a, O1b, O1c. Outcome O1. Primary CLO S1.
// l2: O2a, O2b, O2c. Outcome O2. Primary CLO S1.
// l3: O3a, O3b, O3c. Outcome O3. Primary CLO S2.
// l4: O2d, O2e. Outcome O2. Primary CLO S1.
//
// QUESTION AUTHORING RULES
// Each section contains 13 questions.
// Types: mcq, tf, drop, visual, order, match.
// No question type may exceed 30 percent of the complete bank.
// Every question has exactly one correct response.
// Correct MCQ and visual options are written at index zero.
// Correct dropdown choices are written at index zero.
// Ordering items are written in the correct sequence.
// Matching pairs are written with their correct associations.
// The player shuffles answer options at runtime.
// Every question includes a full-sentence explanation.
// Difficulty: 1 = recall, 2 = application, 3 = analysis.
// Every question is tagged to its section, outcome, and CLO.
// Tags are normalised from ADAPTIVE.sections and ADAPTIVE.outcomes.
// Every question points to its section's remedial micro-lessons.
// Use plain human language and plausible incorrect answers.
// Do not repeat question stems.
// Never contradict the Week 9 slides or delivery plan.
// Distinguish projected benefits from achieved performance.
//
// Week 9 question identifiers use W9 followed by section and item number.
// Example: W9O1a-01.
// Runtime section identifiers remain O1a, O1b, O1c, and so on.
//
// The Week 1 question schema and helper names are preserved.

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
  // O1a - From Understand to Innovate
  // Outcome O1. Primary CLO S1.
  // ============================================================

  M(
    "W9O1a-01", "O1a", 1,
    "What is the main purpose of the Innovate phase in BPM?",
    [
      "Design a future process that addresses the causes of poor performance",
      "Document the current process without proposing changes",
      "Implement a new system before investigating the problem",
      "Measure employee productivity without changing the workflow"
    ],
    "Innovate uses evidence from Understand to design how the process should work in the future. The aim is to address underlying causes rather than simply make existing activities faster."
  );

  M(
    "W9O1a-02", "O1a", 2,
    "Qasr Marina finds that corporate rate approvals delay guest arrival. Which proposal best addresses the underlying cause?",
    [
      "Confirm agreed corporate rates during booking, before guests arrive",
      "Ask reception employees to speak more quickly with waiting guests",
      "Place more chairs near the reception desk",
      "Give reception employees a target for shorter conversations"
    ],
    "Moving routine rate confirmation to booking removes the need for that approval during arrival. The other proposals may change the experience of waiting without removing its cause."
  );

  M(
    "W9O1a-03", "O1a", 3,
    "A hospital shortens patient registration, but patients still wait for missing approvals. What should the redesign team investigate?",
    [
      "Why approval information is unavailable when patients need the next service",
      "Whether registration employees can type even faster",
      "Whether the hospital should stop measuring total waiting time",
      "Whether patients would prefer a more attractive waiting room"
    ],
    "The continuing delay suggests that approval availability is a structural constraint. A credible redesign investigates when approvals should happen and how their results reach the next activity."
  );

  TF(
    "W9O1a-04", "O1a", 1,
    "The Innovate phase uses findings from Understand to propose how the future process should operate.",
    true,
    "True. Understand investigates the existing process and its problems. Innovate uses those findings to design a better future arrangement."
  );

  TF(
    "W9O1a-05", "O1a", 2,
    "A proposed to-be process can be considered successful as soon as its diagram has been approved.",
    false,
    "False. An approved diagram describes a proposed future process. Later development, implementation, and performance evidence are needed to establish whether it works."
  );

  DR(
    "W9O1a-06", "O1a", 1,
    "The {1} phase investigates why the current process performs poorly, while {2} designs how it should work.",
    [
      ["Understand", "Implement", "Develop"],
      ["Innovate", "Realise value", "Organisation strategy"]
    ],
    "Understand identifies current problems and their causes. Innovate uses that evidence to develop a proposed future process."
  );

  DR(
    "W9O1a-07", "O1a", 2,
    "A redesign that removes the cause of waiting addresses a {1}, while making the waiting area more comfortable mainly addresses a {2}.",
    [
      ["root cause", "performance target", "departmental budget"],
      ["symptom", "process trigger", "regulatory requirement"]
    ],
    "Removing the cause changes why the delay occurs. Improving waiting conditions may help customers feel more comfortable, but it does not necessarily remove the delay."
  );

  V(
    "W9O1a-08", "O1a", 2,
    "Which diagram best shows the relationship between Understand and Innovate?",
    [
      [
        D.flow([
          "Current process",
          "Root causes",
          "Future design",
          "+To-be proposal"
        ]),
        "Investigate the current process, identify root causes, and develop a future design"
      ],
      [
        D.flow([
          "Buy technology",
          "Train employees",
          "Investigate causes",
          "+Design process"
        ]),
        "Purchase technology and train employees before investigating the problem"
      ],
      [
        D.flow([
          "Current process",
          "Copy activities",
          "Keep handoffs",
          "+Same process"
        ]),
        "Copy the existing activities and preserve their unnecessary handoffs"
      ],
      [
        D.flow([
          "Choose solution",
          "Implement",
          "Measure waiting",
          "+Find causes"
        ]),
        "Implement a preferred solution before identifying the causes of delay"
      ]
    ],
    "The appropriate sequence begins with evidence about the existing process and its root causes. That evidence informs the proposed to-be design."
  );

  V(
    "W9O1a-09", "O1a", 3,
    "Which picture best shows a redesign that removes Qasr's arrival-time corporate rate approval delay?",
    [
      [
        D.flow([
          "Booking created",
          "Rate confirmed",
          "Guest arrives",
          "+Room assigned"
        ]),
        "The corporate rate is confirmed during booking before the guest arrives"
      ],
      [
        D.flow([
          "Guest arrives",
          "Approval requested",
          "Guest waits",
          "+Rate confirmed"
        ]),
        "The corporate rate is requested only after the guest arrives"
      ],
      [
        D.flow([
          "Guest arrives",
          "Queue shortened",
          "Approval requested",
          "+Guest waits"
        ]),
        "Reception becomes faster but the rate approval still occurs during arrival"
      ],
      [
        D.flow([
          "Guest arrives",
          "Details repeated",
          "Revenue contacted",
          "+Approval received"
        ]),
        "The guest repeats details while reception contacts revenue for approval"
      ]
    ],
    "Confirming the rate during booking changes the timing of the activity responsible for waiting. The other diagrams preserve approval during arrival."
  );

  OR(
    "W9O1a-10", "O1a", 2,
    "Put these activities in the logical order for developing a root-cause-based to-be process.",
    [
      "Examine evidence about current process performance",
      "Identify the causes of unnecessary waiting",
      "Develop changes that address those causes",
      "Describe the proposed future workflow",
      "Test the assumptions behind the proposed design"
    ],
    "A credible design begins with evidence and root causes. The team then develops a future workflow and examines whether its assumptions are realistic."
  );

  OR(
    "W9O1a-11", "O1a", 3,
    "Arrange these activities to show how Qasr could move routine corporate rate approval before guest arrival.",
    [
      "A corporate guest makes a booking",
      "The system checks the agreed corporate rate",
      "The approved rate becomes available in the booking record",
      "The guest arrives with the rate already confirmed"
    ],
    "Moving rate confirmation into booking allows the information to be available before arrival. This avoids making the guest wait for a routine approval at reception."
  );

  MA(
    "W9O1a-12", "O1a", 2,
    "Match each BPM concept to its meaning in the Innovate phase.",
    [
      ["Understand", "Investigates the existing process and its problems"],
      ["Root cause", "The underlying condition responsible for a problem"],
      ["To-be process", "The proposed way work should operate"],
      ["Innovate", "Designs changes intended to address identified causes"]
    ],
    "Understand provides evidence about the current process. Innovate uses that evidence to design a future process addressing the underlying causes."
  );

  MA(
    "W9O1a-13", "O1a", 3,
    "Match each Qasr proposal to the problem it is mainly intended to address.",
    [
      ["Earlier rate confirmation", "Approval waiting during guest arrival"],
      ["Shared booking information", "Repeated entry and searching for guest details"],
      ["Coordinated room readiness", "Uncertainty about whether the room is available"],
      ["Human exception handling", "Guests whose circumstances require additional assistance"]
    ],
    "Each proposed change should be linked to a specific process problem or necessary service requirement. This connection makes the redesign rationale clear and testable."
  );


  // ============================================================
  // O1b - Three levels of ambition
  // Outcome O1. Primary CLO S1.
  // ============================================================

  M(
    "W9O1b-01", "O1b", 1,
    "Which description best fits improving existing process steps?",
    [
      "Making current activities more efficient without fundamentally changing the workflow",
      "Replacing the entire customer service model",
      "Removing every existing activity regardless of its purpose",
      "Introducing a completely different organisational strategy"
    ],
    "Improving existing steps strengthens execution while retaining the basic process structure. More ambitious redesign changes the workflow or rethinks the service itself."
  );

  M(
    "W9O1b-02", "O1b", 2,
    "A university replaces repeated departmental document requests with one shared verification record. What level of ambition does this illustrate?",
    [
      "Redesigning the workflow",
      "Improving the appearance of existing forms",
      "Rethinking the university's entire educational mission",
      "Leaving the process unchanged"
    ],
    "A shared verification record changes information flows and removes repeated handoffs. This is workflow redesign rather than merely improving individual activities."
  );

  M(
    "W9O1b-03", "O1b", 3,
    "A hotel wants eligible guests to reach their rooms without conventional reception. Which interpretation is strongest?",
    [
      "The proposal rethinks the arrival service rather than simply accelerating check-in",
      "The proposal only improves employee typing speed",
      "The proposal preserves every existing reception activity",
      "The proposal removes the need for any identity verification"
    ],
    "Making conventional reception optional changes the guest's service experience. Necessary verification and assistance must still be preserved."
  );

  TF(
    "W9O1b-04", "O1b", 1,
    "A more ambitious redesign always produces a better organisational decision than a modest improvement.",
    false,
    "False. Greater ambition may create larger benefits, but it can also increase cost, uncertainty, and delivery requirements. The appropriate choice depends on the causes and feasibility."
  );

  TF(
    "W9O1b-05", "O1b", 2,
    "Changing the sequence of activities and removing unnecessary handoffs can constitute workflow redesign.",
    true,
    "True. Workflow redesign changes how activities connect and when work occurs. It goes beyond simply performing existing steps more quickly."
  );

  DR(
    "W9O1b-06", "O1b", 1,
    "Making an existing activity faster is usually process {1}, while changing how activities connect is workflow {2}.",
    [
      ["improvement", "implementation", "measurement"],
      ["redesign", "documentation", "monitoring"]
    ],
    "Process improvement strengthens existing activities. Workflow redesign changes the structure or connections between activities."
  );

  DR(
    "W9O1b-07", "O1b", 2,
    "Rethinking a service may create {1} potential benefits, but it generally involves {2} delivery risk.",
    [
      ["greater", "guaranteed", "negligible"],
      ["higher", "zero", "irrelevant"]
    ],
    "More ambitious redesign can create substantial potential value. However, its broader changes usually introduce stronger dependencies and greater delivery uncertainty."
  );

  V(
    "W9O1b-08", "O1b", 2,
    "Which diagram best represents workflow redesign rather than merely faster execution of existing steps?",
    [
      [
        D.flow([
          "Booking created",
          "Rate verified",
          "Guest arrives",
          "+Room assigned"
        ]),
        "Move rate verification into booking so it no longer delays arrival"
      ],
      [
        D.flow([
          "Guest arrives",
          "Faster typing",
          "Rate approval",
          "+Room assigned"
        ]),
        "Retain the same arrival activities but type guest information faster"
      ],
      [
        D.flow([
          "Guest arrives",
          "Rate approval",
          "Faster printing",
          "+Room assigned"
        ]),
        "Retain the approval sequence and print documents more quickly"
      ],
      [
        D.flow([
          "Guest arrives",
          "Queue organised",
          "Rate approval",
          "+Room assigned"
        ]),
        "Organise the reception queue while retaining the existing approval dependency"
      ]
    ],
    "Moving rate verification before arrival changes the workflow and removes an unnecessary arrival-time dependency. The other options mainly improve existing activities."
  );

  V(
    "W9O1b-09", "O1b", 3,
    "Which picture best represents rethinking the hotel arrival service?",
    [
      [
        D.flow([
          "Pre-arrival checks",
          "Room confirmed",
          "Guest arrives",
          "+Direct room access"
        ]),
        "Eligible guests complete appropriate checks earlier and proceed directly to their rooms"
      ],
      [
        D.flow([
          "Guest arrives",
          "Reception queue",
          "Faster check-in",
          "+Key issued"
        ]),
        "Guests continue conventional reception with faster transactions"
      ],
      [
        D.flow([
          "Guest arrives",
          "Paper form",
          "Form checked",
          "+Key issued"
        ]),
        "Guests continue completing paper forms at reception"
      ],
      [
        D.flow([
          "Guest arrives",
          "Reception kiosk",
          "Desk approval",
          "+Key issued"
        ]),
        "Guests use a kiosk but still depend on conventional desk approval"
      ]
    ],
    "The correct design questions whether conventional reception is necessary for eligible guests. It changes the service experience while retaining essential checks."
  );

  OR(
    "W9O1b-10", "O1b", 2,
    "Arrange these redesign approaches from the least structural change to the greatest.",
    [
      "Improve execution of existing activities",
      "Redesign the workflow and its handoffs",
      "Rethink the customer service experience"
    ],
    "Improvement retains the basic workflow, redesign changes its structure, and rethinking the service challenges the traditional customer journey."
  );

  OR(
    "W9O1b-11", "O1b", 3,
    "Put these activities in a sensible sequence for deciding how ambitious a redesign should be.",
    [
      "Identify the causes of poor performance",
      "Consider different levels of redesign ambition",
      "Estimate benefits and implementation requirements",
      "Evaluate feasibility and important risks",
      "Select an ambition level that can be justified"
    ],
    "Redesign ambition should follow an understanding of the problem. Management then compares alternatives and selects a level of change supported by benefits and feasibility."
  );

  MA(
    "W9O1b-12", "O1b", 2,
    "Match each level of redesign ambition to its characteristic change.",
    [
      ["Improve existing steps", "Strengthen execution without changing the basic workflow"],
      ["Redesign the workflow", "Change activity sequence and departmental handoffs"],
      ["Rethink the service", "Question whether the traditional customer journey remains necessary"]
    ],
    "The levels differ in how much of the existing process they challenge. Greater ambition changes more of the workflow or customer experience."
  );

  MA(
  "W9O1b-13", "O1b", 3,
  "Match each proposed Qasr change to the level of ambition it best illustrates.",
  [
    ["Train reception staff to scan identity documents faster", "Improve existing steps"],
    ["Collect guest details before arrival", "Redesign the workflow"],
    ["Let ready guests go straight to their rooms", "Rethink the service"]
  ],
  "Faster scanning improves an existing activity. Collecting details before arrival changes the workflow, while letting ready guests go straight to their rooms rethinks the service itself."
);


  // ============================================================
  // O1c - Designing Qasr's future arrival
  // Outcome O1. Primary CLO S1.
  // ============================================================

  M(
    "W9O1c-01", "O1c", 1,
    "What should be the central design anchor for Qasr Marina's future arrival process?",
    [
      "The guest reaching the correct room without unnecessary waiting",
      "The number of forms reception employees complete",
      "The number of transactions performed at the front desk",
      "The amount of time spent printing room keys"
    ],
    "The process should be designed around the outcome the guest values. Reception activities are means of delivering that outcome, not the outcome itself."
  );

  M(
    "W9O1c-02", "O1c", 2,
    "Qasr wants to reduce repeated requests for guest information. Which design change is most appropriate?",
    [
      "Use a shared booking record containing appropriately verified information",
      "Ask each department to create its own independent guest record",
      "Require guests to complete the same form at every handoff",
      "Move repeated data entry to another reception counter"
    ],
    "A shared booking record can reduce repeated entry and searching when authorised departments use reliable information. Separate records preserve the underlying duplication."
  );

  M(
    "W9O1c-03", "O1c", 3,
    "Qasr proposes removing repeated identification checks. What must the redesign team establish before accepting this change?",
    [
      "Necessary verification remains effective and compliant with applicable requirements",
      "All identity checks can be removed whenever guests prefer faster service",
      "Reception employees will no longer need to assist unusual bookings",
      "The hotel can replace every verification decision with guest satisfaction ratings"
    ],
    "Redesign should remove unnecessary repetition without weakening mandatory controls. The team must demonstrate that the proposed verification arrangement remains appropriate."
  );

  TF(
    "W9O1c-04", "O1c", 1,
    "A to-be process should preserve every existing activity because employees are already familiar with it.",
    false,
    "False. Innovate questions whether existing activities remain necessary. Familiarity alone does not justify retaining work that creates no value or necessary protection."
  );

  TF(
    "W9O1c-05", "O1c", 2,
    "Moving suitable guest checks before arrival can reduce the work that must be completed while the guest waits.",
    true,
    "True. Earlier checks can remove activities from the arrival journey, provided necessary controls and appropriate exception handling remain effective."
  );

  DR(
    "W9O1c-06", "O1c", 1,
    "A to-be process should focus on the customer's desired {1} rather than preserving every existing {2}.",
    [
      ["outcome", "department", "software licence"],
      ["activity", "benefit", "customer"]
    ],
    "The desired customer outcome guides the future design. Existing activities should remain only when they provide value or meet a necessary requirement."
  );

  DR(
    "W9O1c-07", "O1c", 2,
    "Confirming a corporate rate during booking changes the {1} of approval, while a shared record reduces repeated {2}.",
    [
      ["timing", "cost estimate", "department name"],
      ["information entry", "customer demand", "room capacity"]
    ],
    "Earlier rate confirmation changes when approval happens. A shared record reduces unnecessary repetition of information across departments."
  );

  V(
    "W9O1c-08", "O1c", 2,
    "Which diagram best represents a future arrival process designed around the guest's outcome?",
    [
      [
        D.flow([
          "Pre-arrival details",
          "Rate confirmed",
          "Room ready",
          "Identity verified",
          "+Guest settled"
        ]),
        "Coordinate earlier checks and room readiness so the guest can reach the room"
      ],
      [
        D.flow([
          "Guest arrives",
          "Details repeated",
          "Revenue contacted",
          "Room searched",
          "+Key issued"
        ]),
        "Keep repeated entry and departmental searching during arrival"
      ],
      [
        D.flow([
          "Guest arrives",
          "Form printed",
          "Form copied",
          "Form filed",
          "+Desk finished"
        ]),
        "Concentrate on completing reception paperwork rather than the guest's outcome"
      ],
      [
        D.flow([
          "Guest arrives",
          "Approval requested",
          "Guest waits",
          "Approval repeated",
          "+Key issued"
        ]),
        "Preserve repeated approval activities after the guest reaches reception"
      ]
    ],
    "The appropriate future process coordinates necessary work around the guest's journey into a ready room. The other options preserve avoidable waiting or focus on internal transactions."
  );

  V(
    "W9O1c-09", "O1c", 3,
    "Which diagram best preserves necessary controls while providing an alternative when digital arrival cannot proceed?",
    [
      [
        D.flow([
          "Digital check",
          "Exception detected",
          "Human review",
          "+Safe resolution"
        ]),
        "An unsuccessful digital check leads to authorised assistance and appropriate verification"
      ],
      [
        D.flow([
          "Digital check",
          "Exception detected",
          "Ignore problem",
          "+Room access"
        ]),
        "An unsuccessful check is ignored so the guest can enter the room"
      ],
      [
        D.flow([
          "Digital check",
          "Exception detected",
          "Guest retries",
          "+Guest retries"
        ]),
        "The guest repeatedly attempts the same unsuccessful verification without assistance"
      ],
      [
        D.flow([
          "Digital check",
          "Exception detected",
          "Booking deleted",
          "+Process ends"
        ]),
        "An unsuccessful check automatically ends the booking without review"
      ]
    ],
    "A workable redesign includes an authorised route for resolving exceptions. It should preserve necessary verification while helping guests who cannot complete the standard digital process."
  );

  OR(
  "W9O1c-10", "O1c", 2,
  "Put these proposed Qasr arrival activities in their logical order.",
  [
    "A corporate guest books and the agreed rate is confirmed automatically",
    "The guest pre-registers online before travelling",
    "The guest verifies identity at a kiosk on arrival",
    "The guest receives access to a ready room"
  ],
  "The agreed rate is confirmed when the booking is made, and the guest then pre-registers before travelling. Identity is verified on arrival, and room access comes last because the earlier checks must be complete."
);

  OR(
    "W9O1c-11", "O1c", 3,
    "Arrange these design decisions in a sensible sequence for removing unnecessary activities.",
    [
      "Identify the customer's desired outcome",
      "Examine which existing activities support that outcome",
      "Identify repeated work and unnecessary handoffs",
      "Preserve necessary controls while changing the workflow",
      "Test whether the proposed process can operate reliably"
    ],
    "Customer value guides the redesign. The team then challenges unnecessary work, retains essential safeguards, and tests whether the proposed workflow is feasible."
  );

  MA(
    "W9O1c-12", "O1c", 2,
    "Match each Qasr design element to its main purpose.",
    [
      ["Pre-arrival information collection", "Reduce information entry while the guest waits"],
      ["Automated corporate rate confirmation", "Remove routine approval delays during arrival"],
      ["Shared booking record", "Make verified information available across authorised functions"],
      ["Human assistance route", "Resolve cases that cannot follow standard digital arrival"]
    ],
    "The design elements address different process needs. Together they can reduce unnecessary waiting while preserving coordination and assistance."
  );

  MA(
    "W9O1c-13", "O1c", 3,
    "Match each redesign question to the decision it helps Qasr make.",
    [
      ["Is this activity necessary?", "Remove work that serves no required purpose"],
      ["Who should perform this activity?", "Assign responsibility to the appropriate role"],
      ["When should this activity happen?", "Move suitable checks before guest arrival"],
      ["What risk remains if we remove it?", "Preserve essential verification and safeguards"]
    ],
    "A strong to-be design challenges existing activities while examining responsibilities, timing, and necessary controls. These questions help distinguish genuine simplification from unsafe shortcuts."
  );

  // ============================================================
  // O2a - Comparing redesign alternatives
  // Outcome O2. Primary CLO S1.
  // ============================================================

  M(
    "W9O2a-01", "O2a", 1,
    "Which four considerations are central when comparing process redesign alternatives?",
    [
      "Expected benefit, cost, risk, and implementation time",
      "Employee age, office location, department size, and job titles",
      "Software appearance, supplier reputation, advertising, and branding",
      "Meeting frequency, presentation length, team names, and reporting style"
    ],
    "Redesign alternatives should be compared through their expected benefits, costs, risks, and delivery times. Feasibility then determines whether the organisation can realistically deliver those benefits."
  );

  M(
    "W9O2a-02", "O2a", 2,
    "A clinic proposes an expensive digital appointment system. What should management establish before approving it?",
    [
      "Whether its expected benefits justify the investment and the clinic can operate it reliably",
      "Whether the system has more features than competing products",
      "Whether employees find the demonstration visually attractive",
      "Whether purchasing the system would make the clinic appear innovative"
    ],
    "A technology proposal should be evaluated through the improvements it can deliver and the resources needed to achieve them. Attractive features do not establish organisational value."
  );

  M(
    "W9O2a-03", "O2a", 3,
    "A redesign promises major savings but depends on technology the organisation cannot currently support. What is the strongest conclusion?",
    [
      "The potential benefit is attractive, but feasibility must be established before commitment",
      "The projected savings prove that implementation will succeed",
      "The organisation should ignore technology dependencies because benefits are large",
      "The proposal must be rejected permanently without investigating alternatives"
    ],
    "Expected benefits do not guarantee successful delivery. Management should investigate whether the required capabilities can be developed at an acceptable cost and risk."
  );

  TF(
    "W9O2a-04", "O2a", 1,
    "The redesign option with the lowest implementation cost is always the best organisational choice.",
    false,
    "False. A cheaper option may preserve important causes of poor performance. Management must consider benefits, risks, delivery time, and feasibility alongside cost."
  );

  TF(
    "W9O2a-05", "O2a", 2,
    "A proposal's implementation time matters because customers continue experiencing current problems while the organisation prepares its redesign.",
    true,
    "True. A longer implementation period delays the expected benefits. The organisation should consider when customers can realistically experience improvement."
  );

  DR(
    "W9O2a-06", "O2a", 1,
    "The expected {1} describes what a redesign could improve, while implementation {2} describes resources required to deliver it.",
    [
      ["benefit", "risk", "deadline"],
      ["cost", "customer", "outcome"]
    ],
    "Expected benefit concerns the improvement a design may deliver. Implementation cost concerns the resources needed to develop and introduce the proposed process."
  );

  DR(
    "W9O2a-07", "O2a", 2,
    "A redesign is {1} when the organisation can realistically deliver it, while {2} concerns uncertainty about what might go wrong.",
    [
      ["feasible", "radical", "automated"],
      ["risk", "benefit", "baseline"]
    ],
    "Feasibility concerns practical deliverability. Risk concerns uncertainty and the possible consequences of unsuccessful implementation or operation."
  );

  V(
    "W9O2a-08", "O2a", 2,
    "Which diagram shows a sound process for comparing redesign alternatives?",
    [
      [
        D.flow([
          "Identify options",
          "Estimate benefits",
          "Assess requirements",
          "Compare risks",
          "+Justify choice"
        ]),
        "Compare alternatives through expected benefits, delivery requirements, and risks before selecting one"
      ],
      [
        D.flow([
          "Choose technology",
          "Approve budget",
          "Implement",
          "+Investigate causes"
        ]),
        "Purchase and implement technology before examining the process problem"
      ],
      [
        D.flow([
          "Choose cheapest",
          "Ignore risks",
          "Announce success",
          "+Stop evaluation"
        ]),
        "Select the cheapest option without examining its risks or expected benefits"
      ],
      [
        D.flow([
          "Choose fastest",
          "Ignore dependencies",
          "Begin delivery",
          "+Assume success"
        ]),
        "Select the fastest proposal without examining whether the organisation can deliver it"
      ]
    ],
    "A disciplined comparison evaluates alternatives before committing to one. Expected benefits must be considered alongside resources, uncertainty, and practical delivery conditions."
  );

  V(
    "W9O2a-09", "O2a", 3,
    "Which picture best illustrates a redesign proposal with an unresolved feasibility problem?",
    [
      [
        D.flow([
          "Digital redesign",
          "!System unavailable",
          "Delivery blocked"
        ]),
        "The proposed digital process depends on a system that is not available"
      ],
      [
        D.flow([
          "Shared data",
          "Staff trained",
          "+Process ready"
        ]),
        "The required information and employee capabilities are available"
      ],
      [
        D.flow([
          "Checks defined",
          "Exceptions assigned",
          "+Process tested"
        ]),
        "Necessary controls and exception responsibilities have been established"
      ],
      [
        D.flow([
          "Resources approved",
          "Dependencies met",
          "+Delivery prepared"
        ]),
        "The required resources and dependencies have been addressed"
      ]
    ],
    "The unavailable system creates an unresolved dependency that could prevent delivery. The other diagrams describe conditions supporting implementation readiness."
  );

  OR(
    "W9O2a-10", "O2a", 2,
    "Put these activities in a sensible order for evaluating competing redesign proposals.",
    [
      "Define the process problem and desired outcome",
      "Develop alternative future designs",
      "Estimate the benefits of each alternative",
      "Assess costs, risks, timing, and feasibility",
      "Recommend an option with a clear justification"
    ],
    "The evaluation begins with the problem and possible solutions. Management then compares expected value and delivery requirements before making a justified recommendation."
  );

  OR(
    "W9O2a-11", "O2a", 3,
    "A retailer is considering automated returns. Arrange these steps for testing whether its business case is credible.",
    [
      "Identify the delays the redesign intends to remove",
      "Estimate the expected reduction in return-processing time",
      "Identify technology and employee requirements",
      "Examine implementation risks and operating constraints",
      "Decide whether the expected benefits justify the commitment"
    ],
    "A credible business case links the proposed improvement to the underlying problem. It then considers practical requirements and risks before supporting investment."
  );

  MA(
    "W9O2a-12", "O2a", 2,
    "Match each evaluation criterion to the question it helps management answer.",
    [
      ["Expected benefit", "What improvement could the design deliver?"],
      ["Cost", "What resources will the design require?"],
      ["Risk", "What could go wrong and with what consequences?"],
      ["Implementation time", "When could the organisation deliver the change?"]
    ],
    "These criteria provide complementary perspectives on redesign alternatives. A proposal should not be selected using only one dimension."
  );

  MA(
    "W9O2a-13", "O2a", 3,
    "Match each concern about a proposed redesign to the evaluation dimension it mainly affects.",
    [
      ["Employees need extensive training", "Implementation cost and capability requirements"],
      ["The system may fail during peak demand", "Operational risk"],
      ["Customers could receive service much faster", "Expected benefit"],
      ["Supplier installation requires several months", "Implementation time"]
    ],
    "Each concern affects the attractiveness or deliverability of the proposed process. Management should consider these dimensions together when making its decision."
  );


  // ============================================================
  // O2b - Qasr's two competing designs
  // Outcome O2. Primary CLO S1.
  // ============================================================

  M(
    "W9O2b-01", "O2b", 1,
    "What is the current average lobby-to-room journey time in Qasr Marina's Week 9 case?",
    [
      "82 minutes",
      "44 minutes",
      "22 minutes",
      "18 minutes"
    ],
    "The current average lobby-to-room journey takes 82 minutes. The 44-minute and 22-minute figures are projected outcomes for the competing designs."
  );

  M(
    "W9O2b-02", "O2b", 2,
    "Which statement accurately describes Design A in the Qasr case?",
    [
      "It targets a 44-minute journey after an estimated 18-week implementation",
      "It targets a 22-minute journey after an estimated 14-month implementation",
      "It eliminates all conventional reception activities immediately",
      "It guarantees that every guest will complete arrival without assistance"
    ],
    "Design A improves the existing reception-centred journey. Its projected average is 44 minutes, with an estimated implementation period of 18 weeks."
  );

  M(
    "W9O2b-03", "O2b", 3,
    "Why might Qasr prefer Design B despite its longer implementation period?",
    [
      "It addresses more of the arrival journey and targets a substantially shorter average time",
      "It requires no changes to employee responsibilities or technology",
      "It guarantees that implementation will be easier than Design A",
      "It removes every regulatory and guest verification requirement"
    ],
    "Design B rethinks the arrival experience and targets 22 minutes. Its greater potential benefit must be weighed against longer delivery and stronger organisational dependencies."
  );

  TF(
    "W9O2b-04", "O2b", 1,
    "Design B's projected average lobby-to-room journey is 22 minutes.",
    true,
    "True. Design B targets a 22-minute average journey, compared with the current 82-minute baseline. This remains a projection rather than an achieved result."
  );

  TF(
  "W9O2b-05", "O2b", 2,
  "Only Design B removes the 47-minute rate-approval wait that affects 61 percent of Qasr's cases.",
  false,
  "False. Both designs remove the 47-minute rate-approval wait, because Design A also requests rate approval automatically at booking. The difference between them lies in how much of the remaining journey each design changes."
);

  DR(
    "W9O2b-06", "O2b", 1,
    "Design A targets an average journey of {1} minutes, while Design B targets {2} minutes.",
    [
      ["44", "82", "22"],
      ["22", "44", "82"]
    ],
    "Design A targets 44 minutes and Design B targets 22 minutes. Both are compared with the current 82-minute lobby-to-room baseline."
  );

  DR(
    "W9O2b-07", "O2b", 2,
    "Design A has an estimated implementation period of {1}, while Design B requires approximately {2}.",
    [
      ["18 weeks", "14 months", "18 months"],
      ["14 months", "18 weeks", "14 weeks"]
    ],
    "The delivery plan compares Design A's estimated 18 weeks with Design B's approximately 14 months. Their different schedules affect when Qasr could realise the expected benefits."
  );

  V(
  "W9O2b-08", "O2b", 2,
  "Which chart correctly represents the current Qasr journey and the two projected redesign outcomes?",
  [
    [D.bars(["Current", "Design A", "Design B"], [82, 44, 22], "minutes"),
      "Current journey 82 minutes, Design A 44 minutes, and Design B 22 minutes"],
    [D.bars(["Current", "Design A", "Design B"], [22, 44, 82], "minutes"),
      "Current journey 22 minutes, Design A 44 minutes, and Design B 82 minutes"],
    [D.bars(["Current", "Design A", "Design B"], [82, 22, 44], "minutes"),
      "Current journey 82 minutes, Design A 22 minutes, and Design B 44 minutes"],
    [D.bars(["Current", "Design A", "Design B"], [44, 82, 22], "minutes"),
      "Current journey 44 minutes, Design A 82 minutes, and Design B 22 minutes"]
  ],
  "The Week 9 case uses 82 minutes as the current average. Design A is modelled at 44 minutes, while Design B is modelled at 22 minutes."
);

  V(
    "W9O2b-09", "O2b", 3,
    "Which diagram best represents the more ambitious Design B arrival experience?",
    [
      [
        D.flow([
          "Pre-arrival checks",
          "Room confirmed",
          "Guest arrives",
          "+Direct access"
        ]),
        "Eligible guests complete appropriate checks before arrival and proceed directly to their rooms"
      ],
      [
        D.flow([
          "Guest arrives",
          "Reception queue",
          "Rate approval",
          "+Key issued"
        ]),
        "Guests complete conventional reception activities after arrival"
      ],
      [
        D.flow([
          "Guest arrives",
          "Kiosk used",
          "Desk approval",
          "+Key issued"
        ]),
        "Guests use a kiosk but still depend on conventional desk approval"
      ],
      [
        D.flow([
          "Guest arrives",
          "Details repeated",
          "Room searched",
          "+Key issued"
        ]),
        "Guests repeat information and wait for room confirmation at reception"
      ]
    ],
    "Design B changes the arrival experience by moving appropriate checks earlier and allowing eligible guests to avoid conventional reception. Necessary controls and assistance remain essential."
  );

  OR(
    "W9O2b-10", "O2b", 2,
    "Arrange these stages of the proposed Design B journey in their logical order.",
    [
      "The guest completes suitable pre-arrival information requirements",
      "The booking and required checks are confirmed",
      "The hotel confirms that a suitable room is ready",
      "The guest arrives and completes any remaining required verification",
      "The eligible guest receives appropriate room access"
    ],
    "Design B coordinates necessary checks and room readiness around the guest's journey. The exact operating arrangement must still preserve verification and appropriate assistance."
  );

  OR(
    "W9O2b-11", "O2b", 3,
    "Put these steps in a sensible order for presenting Qasr's two designs to management.",
    [
      "Establish the current 82-minute journey as the baseline",
      "Describe how Design A changes the existing process",
      "Describe how Design B changes the arrival experience",
      "Compare projected benefits and implementation requirements",
      "Explain the risks and assumptions behind each alternative"
    ],
    "A fair comparison starts with the same baseline and explains each proposal. Management then considers the projected improvements and the conditions required to deliver them."
  );

  MA(
    "W9O2b-12", "O2b", 2,
    "Match each Qasr figure to its correct meaning.",
    [
      ["82 minutes", "Current average lobby-to-room journey"],
      ["44 minutes", "Design A projected average journey"],
      ["22 minutes", "Design B projected average journey"],
      ["18 weeks", "Design A estimated implementation period"]
    ],
    "The figures distinguish current performance from projected redesign outcomes and implementation time. Mixing these measures would undermine the comparison."
  );

  MA(
  "W9O2b-13", "O2b", 3,
  "Match each figure from the Qasr case to its correct meaning.",
  [
    ["1", "Functions that must change under Design A"],
    ["4", "Functions that must change under Design B"],
    ["74 percent", "Guests expected to skip the desk under Design B"],
    ["26 percent", "Guests who would still need desk help under Design B"]
  ],
  "Design A changes one function, while Design B changes four. Under Design B, 74 percent of guests are expected to skip the desk, and the remaining 26 percent would still need help there."
);


  // ============================================================
  // O2c - The quick-win trap
  // Outcome O2. Primary CLO S1.
  // ============================================================

  M(
    "W9O2c-01", "O2c", 1,
    "What makes a quick improvement become a trap during process redesign?",
    [
      "It creates commitments that make a more valuable future design harder to achieve",
      "It produces any visible benefit before the full redesign is complete",
      "It requires employees to learn a useful new skill",
      "It improves information quality across departments"
    ],
    "A quick win becomes problematic when its investments, systems, or routines obstruct the intended future process. Early improvements that strengthen reusable capabilities can be valuable."
  );

  M(
    "W9O2c-02", "O2c", 2,
    "Qasr considers buying kiosk software that cannot integrate with its intended future arrival system. What is the main concern?",
    [
      "The investment may create replacement costs and reinforce the existing reception workflow",
      "The kiosk will necessarily eliminate every arrival delay",
      "The future redesign will no longer require employee involvement",
      "The hotel must abandon all technology-enabled improvements"
    ],
    "Technology tied exclusively to the existing workflow may become difficult or expensive to replace. Management should assess compatibility with the intended future process."
  );

  M(
    "W9O2c-03", "O2c", 3,
    "Which early Qasr improvement would most clearly support a later move toward Design B?",
    [
      "Improve booking data accuracy and establish reliable shared information",
      "Purchase equipment that works only with the existing reception process",
      "Create a separate guest database that cannot exchange information",
      "Train employees only in procedures the future process intends to remove"
    ],
    "Reliable booking information supports both current operations and the more ambitious arrival redesign. It builds a reusable capability rather than locking the hotel into outdated arrangements."
  );

  TF(
    "W9O2c-04", "O2c", 1,
    "A quick win is always undesirable when an organisation is planning a larger redesign.",
    false,
    "False. Quick wins can provide early benefits and strengthen confidence. They become problematic when they create unnecessary barriers to the intended future process."
  );

  TF(
    "W9O2c-05", "O2c", 2,
    "Money already spent on an earlier improvement should not automatically determine which future redesign is preferable.",
    true,
    "True. Sunk costs are expenditures that cannot be recovered. Future decisions should focus on expected benefits, remaining costs, risks, and feasibility."
  );

  DR(
    "W9O2c-06", "O2c", 1,
    "A {1} is an early improvement that produces visible progress, while {2} describes a commitment that makes changing direction difficult.",
    [
      ["quick win", "baseline", "process owner"],
      ["lock-in", "customer value", "process mapping"]
    ],
    "A quick win delivers an early benefit. Lock-in occurs when previous investments or arrangements make a different future design harder or more expensive to adopt."
  );

  DR(
    "W9O2c-07", "O2c", 2,
    "Money already spent that cannot be recovered is a {1}, while the value sacrificed by choosing one option over another is its {2}.",
    [
      ["sunk cost", "future benefit", "performance baseline"],
      ["opportunity cost", "implementation target", "process boundary"]
    ],
    "A sunk cost is an unrecoverable past expenditure. Opportunity cost concerns the value of an alternative that is given up when resources are committed elsewhere."
  );

  V(
    "W9O2c-08", "O2c", 2,
    "Which diagram best illustrates a quick win that prepares Qasr for a more ambitious arrival redesign?",
    [
      [
        D.flow([
          "Improve data",
          "Train employees",
          "Integrate systems",
          "+Future arrival"
        ]),
        "Build reliable information and employee capabilities that remain useful in the future process"
      ],
      [
        D.flow([
          "Buy old-system kiosk",
          "Create dependency",
          "Replace equipment",
          "+Extra cost"
        ]),
        "Purchase technology that must later be replaced because it cannot support the intended redesign"
      ],
      [
        D.flow([
          "Duplicate records",
          "Preserve handoffs",
          "Add another system",
          "+More complexity"
        ]),
        "Add separate systems and retain the existing information problems"
      ],
      [
        D.flow([
          "Train old routines",
          "Redesign process",
          "Retrain employees",
          "+Repeat work"
        ]),
        "Train employees exclusively in procedures that the future process intends to replace"
      ]
    ],
    "A compatible quick win strengthens capabilities that the future design will need. Improving information and employee readiness can support transformation rather than obstruct it."
  );

  V(
    "W9O2c-09", "O2c", 3,
    "Which picture best represents the risk of implementing an incompatible temporary system before a larger redesign?",
    [
      [
        D.flow([
          "Temporary system",
          "!Incompatible",
          "Replacement needed",
          "+Extra rework"
        ]),
        "The temporary system cannot support the future design and creates additional replacement work"
      ],
      [
        D.flow([
          "Shared data",
          "Compatible systems",
          "+Future supported"
        ]),
        "Early technology supports the later process without unnecessary replacement"
      ],
      [
        D.flow([
          "Staff prepared",
          "Responsibilities clear",
          "+Change supported"
        ]),
        "Employees gain capabilities that remain useful after redesign"
      ],
      [
        D.flow([
          "Controls reviewed",
          "Exceptions defined",
          "+Design strengthened"
        ]),
        "Early preparation improves the feasibility of the intended future process"
      ]
    ],
    "The incompatible temporary system creates additional work and cost when the organisation moves toward its intended redesign. This is a central risk of the quick-win trap."
  );

  OR(
    "W9O2c-10", "O2c", 2,
    "Arrange these events to show how an apparently useful quick win can create lock-in.",
    [
      "Management approves an improvement based on the existing workflow",
      "The organisation invests in specialised technology",
      "Employees adopt routines built around that technology",
      "A more ambitious redesign requires a different workflow",
      "Management faces replacement costs and resistance to change"
    ],
    "Lock-in can emerge when early investments and routines become difficult to replace. A later redesign may then face costs and resistance created by the earlier improvement."
  );

  OR(
    "W9O2c-11", "O2c", 3,
    "Put these steps in a sensible order for deciding whether Design A should precede Design B.",
    [
      "Identify which Design A improvements would remain useful under Design B",
      "Examine technology compatibility and contractual commitments",
      "Estimate additional costs and organisational disruption",
      "Assess whether early benefits justify those consequences",
      "Recommend a staged approach only if its risks are acceptable"
    ],
    "A staged approach should be assessed for future compatibility and total consequences. It is defensible when early benefits justify the commitments without unnecessarily obstructing the intended redesign."
  );

  MA(
    "W9O2c-12", "O2c", 2,
    "Match each potential quick-win consequence to the concept it illustrates.",
    [
      ["Unrecoverable expenditure on obsolete equipment", "Sunk cost"],
      ["Resources unavailable for the future redesign", "Opportunity cost"],
      ["Difficulty replacing systems tied to old routines", "Lock-in"],
      ["Employee frustration from repeated changes", "Change fatigue"]
    ],
    "Quick improvements can create financial and organisational consequences beyond their immediate costs. Recognising these effects supports more defensible redesign decisions."
  );

  MA(
    "W9O2c-13", "O2c", 3,
    "Match each proposed early Qasr activity to its likely relationship with Design B.",
    [
      ["Correct inaccurate booking information", "Builds a reusable capability"],
      ["Train employees to resolve unusual guest requests", "Strengthens future exception handling"],
      ["Purchase software incompatible with future room access", "Creates potential technology lock-in"],
      ["Commit to long-term equipment needed only by conventional reception", "Creates a potential future replacement burden"]
    ],
    "Early improvements should be evaluated for their contribution to the intended future process. Reusable information and capabilities can support Design B, while incompatible investments may make it harder to deliver."
  );

// ============================================================
  // O3a - Technology that changes the process
  // Outcome O3. Primary CLO S2.
  // ============================================================

  M(
    "W9O3a-01", "O3a", 1,
    "What is the strongest reason to introduce technology during process redesign?",
    [
      "To enable a better workflow that addresses the causes of poor performance",
      "To replace every employee involved in the existing process",
      "To purchase the most advanced system available",
      "To make the existing activities look more modern"
    ],
    "Technology creates value when it supports a better process. Automating unnecessary activities may preserve the problems that redesign should remove."
  );

  M(
    "W9O3a-02", "O3a", 2,
    "A supermarket installs faster scanners, but customers still wait for missing products. What should the redesign team investigate?",
    [
      "Whether stock availability can be checked before customers arrive",
      "Whether employees can scan the same products repeatedly",
      "Whether the collection counter needs brighter lighting",
      "Whether customers should stop reporting missing products"
    ],
    "Earlier stock verification addresses the information problem responsible for waiting. Faster scanning cannot make unavailable products ready for collection."
  );

  M(
    "W9O3a-03", "O3a", 3,
    "Qasr proposes automated corporate rate confirmation. Which condition is most important for making this change reliable?",
    [
      "The system applies approved rate rules and routes unusual bookings for human review",
      "The system approves every requested rate without checking agreed conditions",
      "Reception employees lose access to all booking information",
      "Guests become responsible for resolving incorrect corporate agreements"
    ],
    "Automation should apply established rules consistently while preserving appropriate review of exceptions. Reliable information and clear responsibility remain essential."
  );

  TF(
    "W9O3a-04", "O3a", 1,
    "Introducing a kiosk automatically means that an organisation has fundamentally redesigned its service.",
    false,
    "False. A kiosk may simply automate activities within the existing process. Fundamental redesign changes how the service is delivered and which activities customers must complete."
  );

  TF(
    "W9O3a-05", "O3a", 2,
    "Shared information can reduce repeated work when authorised departments use the same reliable records.",
    true,
    "True. Shared records allow departments to reuse appropriately verified information. Their value depends on accuracy, access controls, and reliable coordination."
  );

  DR(
    "W9O3a-06", "O3a", 1,
    "Technology-enabled redesign changes how {1} is performed, while simple automation may only make an existing {2} faster.",
    [
      ["work", "advertising", "budgeting"],
      ["activity", "organisation", "customer"]
    ],
    "Technology-enabled redesign changes the workflow or service experience. Simple automation can improve an individual activity without changing the underlying process."
  );

  DR(
    "W9O3a-07", "O3a", 2,
    "A shared booking record reduces repeated {1}, while automated rate confirmation can move routine approval to an {2} stage.",
    [
      ["information entry", "room cleaning", "guest demand"],
      ["earlier", "unrelated", "later"]
    ],
    "Shared records reduce unnecessary duplication. Earlier automated approval can prevent routine rate decisions from delaying guest arrival."
  );

  V(
    "W9O3a-08", "O3a", 2,
    "Which diagram best illustrates technology changing the process rather than merely speeding up reception?",
    [
      [
        D.flow([
          "Booking created",
          "Rate confirmed",
          "Room prepared",
          "+Guest arrives"
        ]),
        "Use connected information to complete appropriate checks before arrival"
      ],
      [
        D.flow([
          "Guest arrives",
          "Faster typing",
          "Rate approval",
          "+Room assigned"
        ]),
        "Make reception typing faster while retaining arrival-time approval"
      ],
      [
        D.flow([
          "Guest arrives",
          "Kiosk used",
          "Approval requested",
          "+Guest waits"
        ]),
        "Introduce a kiosk while preserving the approval delay"
      ],
      [
        D.flow([
          "Guest arrives",
          "Details repeated",
          "Faster printing",
          "+Key issued"
        ]),
        "Improve document printing while retaining repeated information entry"
      ]
    ],
    "The correct design changes when necessary work occurs and how information reaches departments. The other options mainly accelerate activities within the existing workflow."
  );

  V(
    "W9O3a-09", "O3a", 3,
    "Which diagram best represents reliable automated approval with appropriate exception handling?",
    [
      [
        D.flow([
          "Booking checked",
          "Rules applied",
          "Exception reviewed",
          "+Decision recorded"
        ]),
        "Apply approved rules and route cases needing judgement to an authorised employee"
      ],
      [
        D.flow([
          "Booking received",
          "All rates approved",
          "No checks",
          "+Decision recorded"
        ]),
        "Approve every booking without checking the agreed conditions"
      ],
      [
        D.flow([
          "Booking received",
          "Information ignored",
          "Approval assumed",
          "+Guest arrives"
        ]),
        "Assume approval even when necessary information is unavailable"
      ],
      [
        D.flow([
          "Booking received",
          "Rules unavailable",
          "Approval skipped",
          "+Room assigned"
        ]),
        "Skip approval whenever the system cannot apply its rules"
      ]
    ],
    "Reliable automation applies authorised decision rules and provides a route for cases requiring human judgement. It does not eliminate necessary controls."
  );

  OR(
    "W9O3a-10", "O3a", 2,
    "Arrange these steps for introducing technology into a redesigned process.",
    [
      "Identify the customer outcome and underlying process problem",
      "Design a workflow that addresses the problem",
      "Identify technology capabilities needed by that workflow",
      "Define information requirements and exception responsibilities",
      "Test whether the proposed technology supports the process reliably"
    ],
    "The desired process should guide technology selection. Information dependencies, controls, and exceptions must then be tested before implementation."
  );

  OR(
    "W9O3a-11", "O3a", 3,
    "Put these activities in a logical order for preparing a digital hotel arrival.",
    [
      "The guest submits suitable information before arrival",
      "The system verifies the booking against approved conditions",
      "The hotel confirms that the assigned room is ready",
      "The guest completes any remaining required verification",
      "The system enables appropriate room access"
    ],
    "Digital arrival requires coordinated booking information, room readiness, and necessary verification. Room access should follow confirmation that the required conditions are satisfied."
  );

  MA(
    "W9O3a-12", "O3a", 2,
    "Match each technology capability to its main process contribution.",
    [
      ["Shared booking record", "Reduces repeated entry of verified information"],
      ["Automated rate confirmation", "Moves routine approval away from arrival"],
      ["Mobile room access", "Can remove the conventional key collection transaction"],
      ["Kiosk", "Allows suitable arrival activities through self-service"]
    ],
    "Each technology supports a different process activity. Its value depends on whether the resulting workflow reduces unnecessary work while preserving necessary controls."
  );

  MA(
    "W9O3a-13", "O3a", 3,
    "Match each technology risk to the design response that best addresses it.",
    [
      ["Inaccurate booking information", "Establish reliable data verification"],
      ["Unusual corporate rate", "Provide authorised human review"],
      ["Disconnected room-readiness system", "Ensure reliable information integration"],
      ["Mobile access unavailable", "Provide a safe alternative access route"]
    ],
    "Technology-enabled redesign requires reliable information and appropriate responses to exceptions. These safeguards should be designed into the process rather than added after failure."
  );


  // ============================================================
  // O3b - Constraints and exceptions
  // Outcome O3. Primary CLO S2.
  // ============================================================

  M(
    "W9O3b-01", "O3b", 1,
    "What is a process exception?",
    [
      "A situation requiring different handling because the normal workflow cannot proceed",
      "An activity that always occurs exactly as planned",
      "A performance improvement that needs no verification",
      "A routine transaction completed without employee involvement"
    ],
    "An exception occurs when the standard process cannot handle a case appropriately. A workable redesign provides a defined route for resolving such situations."
  );

  M(
    "W9O3b-02", "O3b", 2,
    "A guest's identification cannot be verified digitally at Qasr Marina. What should the redesigned process provide?",
    [
      "A controlled route to authorised human assistance and appropriate verification",
      "Automatic room access without completing necessary checks",
      "Repeated unsuccessful attempts without employee assistance",
      "Immediate cancellation of the guest's booking without review"
    ],
    "An unsuccessful digital check should trigger appropriate assistance. Necessary identity verification must remain effective even when the standard technology cannot complete it."
  );

  M(
    "W9O3b-03", "O3b", 3,
    "Qasr's mobile access system receives room-readiness information late. What is the most important design response?",
    [
      "Require reliable confirmation of room readiness before enabling access",
      "Enable access whenever the guest reaches the hotel",
      "Assume every room is ready at the advertised check-in time",
      "Remove housekeeping from the redesigned process"
    ],
    "Room access depends on accurate readiness information. The process should not authorise entry based on an unsupported assumption that a room is available."
  );

  TF(
    "W9O3b-04", "O3b", 1,
    "A redesigned digital service should include an alternative route for customers who cannot use the standard technology.",
    true,
    "True. Accessible assistance and reliable exception handling are necessary for a workable customer-centred process."
  );

  TF(
    "W9O3b-05", "O3b", 2,
    "An ambitious redesign can ignore regulatory requirements when its projected customer benefits are sufficiently large.",
    false,
    "False. Necessary legal and regulatory controls remain applicable. Redesign may change how requirements are satisfied, but it cannot simply disregard them."
  );

  DR(
    "W9O3b-06", "O3b", 1,
    "A situation that cannot follow the normal workflow is an {1}, while an alternative route used when the preferred route fails is a {2}.",
    [
      ["exception", "outcome", "baseline"],
      ["fallback", "target", "benefit"]
    ],
    "An exception requires different handling. A fallback provides a workable way to continue when the preferred process cannot proceed."
  );

  DR(
    "W9O3b-07", "O3b", 2,
    "A regulatory requirement is a process {1}, while the ability of employees and systems to support a proposed design affects its {2}.",
    [
      ["constraint", "benefit", "customer preference"],
      ["feasibility", "appearance", "baseline"]
    ],
    "Regulatory requirements constrain how activities may be performed. Employee capabilities and system readiness help determine whether the proposed design is feasible."
  );

  V(
    "W9O3b-08", "O3b", 2,
    "Which diagram shows an appropriate response when digital guest verification fails?",
    [
      [
        D.flow([
          "Digital check",
          "Exception detected",
          "Human review",
          "+Safe resolution"
        ]),
        "Route the exception to authorised assistance while preserving necessary verification"
      ],
      [
        D.flow([
          "Digital check",
          "Exception detected",
          "Ignore failure",
          "+Room access"
        ]),
        "Ignore unsuccessful verification and enable room access"
      ],
      [
        D.flow([
          "Digital check",
          "Exception detected",
          "Guest retries",
          "+Guest retries"
        ]),
        "Require repeated attempts without providing an alternative"
      ],
      [
        D.flow([
          "Digital check",
          "Exception detected",
          "Booking deleted",
          "+Process ends"
        ]),
        "Delete the booking automatically without investigating the problem"
      ]
    ],
    "A reliable exception route provides human assistance and preserves required controls. Ignoring verification or leaving guests without support is not an acceptable redesign."
  );

  V(
    "W9O3b-09", "O3b", 3,
    "Which picture best illustrates a dependency that must be satisfied before mobile room access?",
    [
      [
        D.flow([
          "Room prepared",
          "Readiness confirmed",
          "Access authorised",
          "+Guest enters"
        ]),
        "Confirm room readiness before enabling guest access"
      ],
      [
        D.flow([
          "Guest arrives",
          "Access authorised",
          "Room checked",
          "+Cleaning begins"
        ]),
        "Enable access before confirming that the room is ready"
      ],
      [
        D.flow([
          "Booking received",
          "Access authorised",
          "Identity ignored",
          "+Guest enters"
        ]),
        "Provide room access without completing necessary verification"
      ],
      [
        D.flow([
          "Guest arrives",
          "Status unknown",
          "Access authorised",
          "+Room searched"
        ]),
        "Authorise access while room availability remains unknown"
      ]
    ],
    "Room readiness must be confirmed before the system provides access. Reliable sequencing prevents the redesigned process from creating new service failures."
  );

  OR(
    "W9O3b-10", "O3b", 2,
    "Arrange these steps for handling a digital arrival exception.",
    [
      "The standard digital process detects a problem",
      "The system directs the case to an appropriate assistance route",
      "An authorised employee examines the information",
      "The employee completes or arranges necessary verification",
      "The guest receives an appropriate resolution"
    ],
    "Exception handling requires a clear route from detection to responsible review and resolution. Necessary controls must remain effective throughout."
  );

  OR(
    "W9O3b-11", "O3b", 3,
    "Put these activities in a sensible order for assessing whether a redesigned process can handle operational constraints.",
    [
      "Identify the normal workflow and its essential dependencies",
      "Identify regulatory, contractual, and technology requirements",
      "Examine employee capabilities and customer assistance needs",
      "Design appropriate controls and fallback arrangements",
      "Test the proposed process under realistic conditions"
    ],
    "Feasibility assessment identifies the conditions required for successful operation. The team then incorporates safeguards and tests whether the proposed workflow can handle realistic constraints."
  );

  MA(
    "W9O3b-12", "O3b", 2,
    "Match each constraint to the requirement it creates for Qasr's redesign.",
    [
      ["Mandatory identity verification", "Preserve appropriate verification controls"],
      ["Disconnected hotel systems", "Establish reliable information exchange"],
      ["Employees need new capabilities", "Provide suitable preparation and training"],
      ["Guests needing personal assistance", "Maintain an accessible human service route"]
    ],
    "Each constraint affects how the future process must operate. A credible design addresses these requirements before implementation."
  );

  MA(
    "W9O3b-13", "O3b", 3,
    "Match each exception to the most appropriate response.",
    [
      ["Digital identity check fails", "Authorised employee reviews the case"],
      ["Assigned room is not ready", "Room allocation is reviewed before access"],
      ["Corporate booking information conflicts", "Responsible staff investigate the discrepancy"],
      ["Guest cannot use mobile access", "An appropriate alternative access method is provided"]
    ],
    "Exception handling should respond to the actual problem without bypassing essential controls. Clear responsibility helps prevent cases from becoming trapped between departments."
  );


  // ============================================================
  // O3c - Testing before implementation
  // Outcome O3. Primary CLO S2.
  // ============================================================

  M(
    "W9O3c-01", "O3c", 1,
    "Why should a proposed to-be process be tested before implementation?",
    [
      "To discover weaknesses and assess whether it can operate under realistic conditions",
      "To guarantee that every future problem has been eliminated",
      "To avoid defining employee responsibilities",
      "To prove that projected benefits have already been achieved"
    ],
    "Testing examines the feasibility of the proposed process and reveals weaknesses before live operation. It does not guarantee perfect performance or establish benefits that have not yet been achieved."
  );

  M(
    "W9O3c-02", "O3c", 2,
    "A museum's digital entry system works for one visitor but fails when several groups arrive together. What did the initial demonstration overlook?",
    [
      "Peak-demand capacity and the ability to handle simultaneous arrivals",
      "The colour of the digital ticket interface",
      "The museum's advertising strategy",
      "The number of exhibitions in the building"
    ],
    "A successful individual transaction does not demonstrate that the process can handle concentrated demand. Testing should examine capacity and coordination under realistic pressure."
  );

  M(
  "W9O3c-03", "O3c", 3,
  "Why should housekeeping take part in Qasr's arrival redesign workshop?",
  [
    "Guests cannot receive rooms that are not ready, so housekeeping understands a condition the design depends on",
    "Housekeeping can approve corporate rates while the booking is being made",
    "Housekeeping staff are needed to operate the identity-checking kiosks",
    "Housekeeping should replace reception as the route for guests needing help"
  ],
  "A redesigned arrival only works if rooms are ready when guests reach them. Including housekeeping brings frontline knowledge of room readiness into the workshop, so weak points are found before launch."
);

  TF(
    "W9O3c-04", "O3c", 1,
    "A successful demonstration of one normal transaction proves that a redesigned process is ready for full implementation.",
    false,
    "False. A normal transaction does not establish performance during peak demand, unusual cases, technology failures, or other realistic operating conditions."
  );

  TF(
    "W9O3c-05", "O3c", 2,
    "Frontline employees can help identify practical exceptions and dependencies that process diagrams may overlook.",
    true,
    "True. Frontline employees understand recurring difficulties and operational conditions. Their knowledge can improve the realism of design testing."
  );

  DR(
    "W9O3c-06", "O3c", 1,
    "Testing a redesigned process under unusually concentrated demand examines its {1}, while testing unusual cases examines its {2}.",
    [
      ["capacity", "branding", "budget"],
      ["exception handling", "advertising", "presentation style"]
    ],
    "Peak-demand testing examines whether the process has sufficient capacity. Exception testing examines whether unusual cases can be resolved safely and effectively."
  );

  DR(
    "W9O3c-07", "O3c", 2,
    "A projected journey time is a {1}, while observed performance after the process operates provides {2} about actual results.",
    [
      ["target", "guarantee", "completed benefit"],
      ["evidence", "assumption", "advertising"]
    ],
    "A target states intended future performance. Actual operating results provide evidence about whether the redesigned process achieves that target."
  );

  V(
    "W9O3c-08", "O3c", 2,
    "Which diagram best represents testing a redesigned process before implementation?",
    [
      [
        D.flow([
          "Proposed design",
          "Realistic scenarios",
          "Weaknesses found",
          "+Design revised"
        ]),
        "Challenge the proposed process with realistic cases and revise weaknesses"
      ],
      [
        D.flow([
          "Proposed design",
          "Approve immediately",
          "Assume success",
          "+Stop testing"
        ]),
        "Approve the process without examining difficult operating conditions"
      ],
      [
        D.flow([
          "Proposed design",
          "One demonstration",
          "Declare success",
          "+Implement"
        ]),
        "Treat one successful demonstration as sufficient evidence"
      ],
      [
        D.flow([
          "Proposed design",
          "Ignore exceptions",
          "Remove fallback",
          "+Implement"
        ]),
        "Exclude unusual cases and remove alternative handling arrangements"
      ]
    ],
    "Useful testing challenges assumptions and identifies weaknesses that can be corrected before implementation. It should not merely confirm that an ideal demonstration works."
  );

  V(
    "W9O3c-09", "O3c", 3,
    "Which picture best represents a useful test of Qasr's proposed assistance route?",
    [
      [
        D.flow([
          "Guest needs help",
          "Employee available",
          "Issue reviewed",
          "+Guest settled"
        ]),
        "Test whether guests needing assistance receive timely and appropriate resolution"
      ],
      [
        D.flow([
          "Digital guest",
          "Checks succeed",
          "Room ready",
          "+Guest settled"
        ]),
        "Demonstrate only the standard digital journey without testing assistance"
      ],
      [
        D.flow([
          "Guest needs help",
          "No employee",
          "Guest retries",
          "+Guest waits"
        ]),
        "Leave guests without assistance when the standard process fails"
      ],
      [
        D.flow([
          "Guest needs help",
          "Verification skipped",
          "Access enabled",
          "+Guest enters"
        ]),
        "Resolve assistance requests by bypassing necessary verification"
      ]
    ],
    "A useful assistance test examines whether employees can resolve unusual cases while preserving required controls. It should reflect the needs of guests who cannot follow the standard digital route."
  );

  OR(
    "W9O3c-10", "O3c", 2,
    "Arrange these steps for conducting a realistic test of a proposed process.",
    [
      "Identify the intended outcome and important assumptions",
      "Select realistic normal and difficult scenarios",
      "Run the proposed workflow through those scenarios",
      "Record failures, delays, and unclear responsibilities",
      "Revise the design and retest important weaknesses"
    ],
    "Testing should examine assumptions through realistic cases. Findings are used to improve the proposed process before the organisation commits to implementation."
  );

  OR(
    "W9O3c-11", "O3c", 3,
    "Put these activities in order for testing Qasr's response to a mobile access failure.",
    [
      "Simulate a failure of the mobile room access service",
      "Observe how the problem is detected and communicated",
      "Check whether responsible employees can provide an alternative",
      "Verify that identity and room-access controls remain effective",
      "Record weaknesses and revise the fallback process"
    ],
    "A meaningful failure test examines detection, responsibility, safe continuation, and recovery. The results should inform improvements to the proposed fallback arrangement."
  );

  MA(
    "W9O3c-12", "O3c", 2,
    "Match each testing scenario to the process capability it mainly examines.",
    [
      ["Several coaches arrive together", "Peak-demand capacity"],
      ["Guest identification cannot be verified digitally", "Exception handling"],
      ["Room-readiness information arrives late", "System coordination"],
      ["Mobile access becomes unavailable", "Fallback reliability"]
    ],
    "Different scenarios test different assumptions about the proposed process. Together they provide a more realistic assessment of operational feasibility."
  );

  MA(
    "W9O3c-13", "O3c", 3,
    "Match each testing finding to the most appropriate design response.",
    [
      ["One employee becomes overloaded with exceptions", "Review assistance capacity and responsibilities"],
      ["Booking records contain conflicting information", "Strengthen information verification and ownership"],
      ["Guests cannot obtain access during system failure", "Develop a safe alternative access route"],
      ["The projected journey time is not achieved", "Investigate causes and revise the design or target"]
    ],
    "Testing findings should lead to specific design decisions. The objective is to improve feasibility and performance rather than conceal evidence that challenges the proposal."
  );

// ============================================================
  // O2d - Choosing the defensible design
  // Outcome O2. Primary CLO S1.
  // ============================================================

  M(
    "W9O2d-01", "O2d", 1,
    "What makes a process redesign recommendation defensible?",
    [
      "It explains the expected benefits, feasibility, alternatives, and accepted risks",
      "It selects the proposal with the most impressive technology",
      "It avoids discussing weaknesses in the preferred option",
      "It assumes that the largest projected improvement will be achieved"
    ],
    "A defensible recommendation connects expected benefits with practical delivery conditions. It also explains why the selected option is preferable and which risks the organisation accepts."
  );

  M(
  "W9O2d-02", "O2d", 2,
  "Design B's system work also serves a January regulatory rule due in 11 months. What does this mean for Qasr's decision?",
  [
    "The overlap may save effort, but it adds deadline risk, so the plan must protect the January date",
    "The overlap removes all delivery risk from Design B because the work is required anyway",
    "The overlap is irrelevant because regulation sits outside process design",
    "The overlap applies equally to Design A, so it cannot help distinguish the two designs"
  ],
  "Sharing system work with the January rule could save effort, but it also ties Design B to a date that cannot move. Only Design B overlaps the regulatory work, so a defensible recommendation must explain how that deadline will be protected."
);

  M(
    "W9O2d-03", "O2d", 3,
    "Qasr conditionally prefers Design B, but digital identity verification remains unproven. What is the strongest recommendation?",
    [
      "Support Design B only after the necessary verification arrangements demonstrate compliance and reliability",
      "Implement Design B immediately because its projected journey time is shorter",
      "Remove identity verification from the future process",
      "Reject all technology-enabled redesign without examining possible solutions"
    ],
    "A conditional recommendation recognises the potential value of Design B while requiring critical dependencies to be demonstrated. Necessary verification cannot be ignored to achieve faster arrival."
  );

  TF(
    "W9O2d-04", "O2d", 1,
    "A redesign recommendation should identify the risk the organisation knowingly accepts by choosing its preferred option.",
    true,
    "True. Every redesign alternative involves trade-offs. A defensible recommendation makes the accepted risk explicit rather than presenting the preferred option as risk-free."
  );

  TF(
    "W9O2d-05", "O2d", 2,
    "Because Design B targets 22 minutes, Qasr can treat that journey time as an achieved result when recommending it.",
    false,
    "False. The 22-minute figure is a projected target. Qasr must distinguish expected performance from results demonstrated through implementation and measurement."
  );

  DR(
    "W9O2d-06", "O2d", 1,
    "A defensible recommendation explains the preferred {1} and the {2} accepted by selecting it.",
    [
      ["option", "department", "software brand"],
      ["risk", "guarantee", "advertisement"]
    ],
    "Management should explain why an option is preferable and what uncertainty or disadvantage it knowingly accepts. This makes the decision transparent and accountable."
  );

  DR(
    "W9O2d-07", "O2d", 2,
    "Design A offers {1} relief, while Design B promises a {2} redesign of the arrival experience.",
    [
      ["earlier", "guaranteed", "more radical"],
      ["more ambitious", "risk-free", "less demanding"]
    ],
    "Design A has the shorter estimated implementation period. Design B changes more of the guest journey and offers greater projected benefits, but requires stronger delivery capabilities."
  );

  V(
    "W9O2d-08", "O2d", 2,
    "Which diagram best represents a disciplined redesign decision?",
    [
      [
        D.flow([
          "Compare options",
          "Assess feasibility",
          "Identify risks",
          "+Justify choice"
        ]),
        "Compare alternatives, examine delivery conditions, and explain the accepted risk"
      ],
      [
        D.flow([
          "Choose largest gain",
          "Ignore dependencies",
          "Approve immediately",
          "+Assume success"
        ]),
        "Select the largest projected improvement without examining feasibility"
      ],
      [
        D.flow([
          "Choose cheapest",
          "Ignore benefits",
          "Avoid discussion",
          "+Approve"
        ]),
        "Select the cheapest proposal without considering its expected value"
      ],
      [
        D.flow([
          "Choose technology",
          "Announce target",
          "Ignore uncertainty",
          "+Implement"
        ]),
        "Select technology and treat projected performance as guaranteed"
      ]
    ],
    "A defensible decision follows a comparison of benefits, feasibility, and risks. Management should explain why the preferred option is justified under actual organisational conditions."
  );

  V(
    "W9O2d-09", "O2d", 3,
    "Which picture best represents a conditional recommendation for Qasr's more ambitious Design B?",
    [
      [
        D.flow([
          "Prefer Design B",
          "Verify dependencies",
          "Test safeguards",
          "+Authorise delivery"
        ]),
        "Support Design B subject to demonstrating critical capabilities and controls"
      ],
      [
        D.flow([
          "Prefer Design B",
          "Skip verification",
          "Enable access",
          "+Assume success"
        ]),
        "Approve Design B while bypassing unresolved identity verification"
      ],
      [
        D.flow([
          "Prefer Design B",
          "Ignore staff needs",
          "Remove assistance",
          "+Launch"
        ]),
        "Proceed without addressing employee readiness or guest assistance"
      ],
      [
        D.flow([
          "Prefer Design B",
          "Declare 22 minutes",
          "Record success",
          "+Stop testing"
        ]),
        "Treat the projected 22-minute journey as an achieved result"
      ]
    ],
    "Conditional support recognises Design B's potential while requiring essential dependencies to be demonstrated. Verification, employee readiness, and exception handling remain necessary."
  );

  OR(
    "W9O2d-10", "O2d", 2,
    "Arrange these activities in a sensible order for preparing a defensible redesign recommendation.",
    [
      "Establish the process problem and desired outcome",
      "Compare the proposed redesign alternatives",
      "Assess expected benefits and delivery requirements",
      "Identify important uncertainties and accepted risks",
      "Recommend an option with a clear justification"
    ],
    "A sound recommendation follows evidence about the problem and alternatives. It connects expected value with feasibility and makes the accepted risk explicit."
  );

  OR(
    "W9O2d-11", "O2d", 3,
    "Put these steps in order for developing a conditional recommendation for Design B.",
    [
      "Identify the structural problems Design B intends to address",
      "Estimate its expected benefits against the current baseline",
      "Identify critical technology and organisational dependencies",
      "Define the evidence required to demonstrate those dependencies",
      "Recommend Design B subject to satisfactory evidence"
    ],
    "Conditional approval should be grounded in expected value and explicit delivery conditions. Management should know what must be demonstrated before committing to implementation."
  );

  MA(
    "W9O2d-12", "O2d", 2,
    "Match each Qasr redesign option to the risk management would principally accept.",
    [
      ["Design A", "Some structural arrival delays may remain"],
      ["Design B", "Greater implementation complexity and a longer delivery period"],
      ["Design A followed by Design B", "Early investments may create duplication or lock-in"]
    ],
    "Each alternative creates a different risk profile. A defensible decision explains which risk is accepted and why the expected benefits justify it."
  );

  MA(
    "W9O2d-13", "O2d", 3,
    "Match each management concern to the evidence that would strengthen a redesign recommendation.",
    [
      ["Projected journey time", "A clearly defined baseline and credible performance estimate"],
      ["Digital identity verification", "Evidence that necessary checks can operate reliably"],
      ["Employee readiness", "A realistic assessment of required skills and preparation"],
      ["Guest assistance", "A workable route for customers needing human support"]
    ],
    "A credible recommendation depends on evidence about expected benefits and delivery conditions. These requirements help management judge whether the preferred design is realistic."
  );


  // ============================================================
  // O2e - The Innovate handover
  // Outcome O2. Primary CLO S1.
  // ============================================================

  M(
    "W9O2e-01", "O2e", 1,
    "What is the main purpose of the Innovate handover?",
    [
      "Communicate the proposed future process, its rationale, targets, and delivery requirements",
      "Declare that all projected benefits have already been achieved",
      "Replace the need for implementation planning and testing",
      "Document only the technology selected for the redesign"
    ],
    "The Innovate handover prepares the proposed design for later development and implementation. It communicates what should change, why it matters, and what remains necessary."
  );

  M(
  "W9O2e-02", "O2e", 2,
  "Which later phase uses the measurable improvement target in the Innovate handover to check whether the promised time saving happens?",
  [
    "Realize Value",
    "People",
    "Implement",
    "Understand"
  ],
  "The Realize Value phase compares actual performance with the target, such as Design B's modelled 22 minutes against today's 82. The People and Implement phases use other parts of the handover, and Understand comes before Innovate."
);

  M(
    "W9O2e-03", "O2e", 3,
    "Qasr's handover includes a 22-minute target for Design B. What additional information is essential for evaluating success?",
    [
      "The current 82-minute baseline and a consistent method for measuring the complete journey",
      "The number of slides used to present the redesign",
      "The personal preferences of the technology supplier",
      "The number of employees attending the approval meeting"
    ],
    "The 82-minute baseline establishes current performance. A consistent measurement method allows later results to be compared fairly with the proposed 22-minute target."
  );

  TF(
    "W9O2e-04", "O2e", 1,
    "The Innovate handover should distinguish a proposed future process from a process that has already been implemented.",
    true,
    "True. Innovate produces a justified future design. Later work must develop, implement, and evaluate the proposed changes."
  );

  TF(
    "W9O2e-05", "O2e", 2,
    "A handover is complete when it contains a process map, even if responsibilities, controls, and unresolved dependencies are missing.",
    false,
    "False. A process map is important but insufficient on its own. The handover should also explain responsibilities, design rationale, targets, constraints, and unresolved requirements."
  );

  DR(
    "W9O2e-06", "O2e", 1,
    "A performance {1} records the starting level, while a {2} states the improvement the redesigned process aims to achieve.",
    [
      ["baseline", "benefit", "risk"],
      ["target", "root cause", "constraint"]
    ],
    "A baseline describes current measured performance. A target describes intended future performance that must later be evaluated."
  );

  DR(
    "W9O2e-07", "O2e", 2,
    "The Innovate handover should explain the design {1} and identify unresolved {2} before implementation.",
    [
      ["rationale", "advertising", "appearance"],
      ["dependencies", "achievements", "guarantees"]
    ],
    "The rationale explains why the design was selected. Unresolved dependencies identify conditions that later work must address before the process can operate reliably."
  );

  V(
    "W9O2e-08", "O2e", 2,
    "Which diagram best represents the information needed for a useful Innovate handover?",
    [
      [
        D.flow([
          "To-be process",
          "Design rationale",
          "Targets and risks",
          "+Delivery requirements"
        ]),
        "Document the proposed process, its justification, expected outcomes, and delivery conditions"
      ],
      [
        D.flow([
          "Select software",
          "Draw logo",
          "Announce success",
          "+Close project"
        ]),
        "Focus on technology presentation and declare the redesign complete"
      ],
      [
        D.flow([
          "Draw process",
          "Ignore ownership",
          "Remove controls",
          "+Implement"
        ]),
        "Provide a diagram without responsibilities or necessary safeguards"
      ],
      [
        D.flow([
          "Announce target",
          "Assume benefits",
          "Skip testing",
          "+Close project"
        ]),
        "Treat the intended performance as proof that the redesign has succeeded"
      ]
    ],
    "A strong handover includes the proposed workflow and the information needed to develop it responsibly. The rationale, targets, risks, and requirements support later implementation decisions."
  );

  V(
    "W9O2e-09", "O2e", 3,
    "Which picture best illustrates a future process that includes necessary exception handling?",
    [
      [
        D.flow([
          "Digital arrival",
          "Problem detected",
          "Employee assists",
          "+Safe resolution"
        ]),
        "The proposed process provides authorised assistance when standard digital arrival cannot proceed"
      ],
      [
        D.flow([
          "Digital arrival",
          "Problem detected",
          "Guest retries",
          "+Guest waits"
        ]),
        "The proposed process leaves guests repeating unsuccessful digital checks"
      ],
      [
        D.flow([
          "Digital arrival",
          "Problem detected",
          "Verification skipped",
          "+Access enabled"
        ]),
        "The proposed process bypasses necessary verification when a problem occurs"
      ],
      [
        D.flow([
          "Digital arrival",
          "Problem detected",
          "No owner",
          "+Case unresolved"
        ]),
        "The proposed process leaves exceptions without a responsible employee"
      ]
    ],
    "The future workflow must show how exceptions are handled safely and who is responsible. A handover that omits this route leaves an important operational requirement unresolved."
  );

  OR(
    "W9O2e-10", "O2e", 2,
    "Arrange these activities in a sensible order for preparing an Innovate handover.",
    [
      "Document the proposed future workflow",
      "Explain how the design addresses identified root causes",
      "Record the performance baseline and proposed targets",
      "Identify responsibilities, controls, and unresolved dependencies",
      "Communicate the design and requirements to the delivery team"
    ],
    "The handover should explain the future process and why it was selected. It must also provide measurable expectations and practical requirements for subsequent delivery."
  );

  OR(
    "W9O2e-11", "O2e", 3,
    "Put these activities in order for preparing Qasr's redesigned arrival process for later implementation.",
    [
      "Confirm the preferred to-be arrival design",
      "Document departmental responsibilities and information handoffs",
      "Define performance targets and necessary safeguards",
      "Identify technology, training, and exception-handling requirements",
      "Hand the justified proposal to the team responsible for delivery"
    ],
    "A credible handover translates the preferred design into clear responsibilities and requirements. It prepares later implementation without claiming that the proposed benefits have already been achieved."
  );

  MA(
    "W9O2e-12", "O2e", 2,
    "Match each handover element to its main purpose.",
    [
      ["To-be process map", "Shows how future activities and handoffs should operate"],
      ["Design rationale", "Explains why the proposed changes address identified problems"],
      ["Performance target", "States the improvement the process aims to achieve"],
      ["Dependency register", "Identifies conditions that must be resolved for delivery"]
    ],
    "These handover elements serve different purposes. Together they make the proposed process understandable, measurable, and more realistic to implement."
  );

  MA(
    "W9O2e-13", "O2e", 3,
    "Match each Qasr handover requirement to the risk it helps control.",
    [
      ["Clear responsibility for rate discrepancies", "Unresolved problems moving between departments"],
      ["Reliable room-readiness information", "Access being enabled before a room is ready"],
      ["Accessible guest assistance", "Customers being excluded by the digital process"],
      ["Consistent journey-time measurement", "Unreliable claims about achieved improvement"]
    ],
    "A strong handover identifies practical safeguards and measurement requirements. These help the organisation implement the intended process and evaluate whether its expected benefits are realised."
  );

  // ============================================================
  // Normalise all questions to the documented Week 1 schema.
  // ============================================================

  const A = window.ADAPTIVE;

  B.forEach((x) => {

    x.lo = A.sections[x.sec].lo;
    x.clo = A.outcomes[x.lo].clo;
    x.outcome = A.outcomes[x.lo].full;
    x.rem = `review:${x.sec}`;

    if (x.type === "mcq" || x.type === "visual") {
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