// W10-bank
//
// OPER621 Week 10 - The People Phase. Question bank, 12 items per part.
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



// W10O1a · A process redesign changes people's jobs
// Lesson l1 · Outcome O1 · CLO K3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O1a-01", "W10O1a", 1,
  "Why can a technically sound process redesign fail when employees continue working under their previous job arrangements?",
  [
    "The existing roles, authority and expectations may not support the work required by the redesigned process",
    "A redesigned process cannot improve performance until every activity is performed entirely by technology",
    "Employees must retain their previous responsibilities until the organisation has completed every BPM framework phase",
    "Technical improvements automatically create resistance whenever employees are assigned different job titles"
  ],
  "A process redesign changes the work employees must perform. If responsibilities, authority and expectations remain aligned with the previous process, employees may continue using familiar practices even when the new technology functions correctly. The People phase addresses these organisational requirements so the intended process can become operational."
);
 
DR("W10O1a-02", "W10O1a", 1,
  "In the ten-phase BPM framework, People is phase {1}. It follows {2}, where the organisation develops the future process design.",
  [
    ["six", "four", "eight"],
    ["Innovate", "Understand", "Implement"]
  ],
  "People is phase six of the BPM framework and follows Innovate, which develops the intended future process. The People phase addresses the organisational arrangements required to perform that design. It is not simply a technical implementation activity."
);
 
V("W10O1a-03", "W10O1a", 1,
  "Which diagram correctly identifies the People phase in the ten-phase BPM framework?",
  [
    [
      D.route([5]),
      "People is highlighted as phase six of the BPM framework"
    ],
    [
      D.route([4]),
      "Innovate is highlighted as the phase currently being investigated"
    ],
    [
      D.route([6]),
      "Develop is highlighted as the phase currently being investigated"
    ],
    [
      D.route([7]),
      "Implement is highlighted as the phase currently being investigated"
    ]
  ],
  "People occupies phase six of the ten-phase BPM framework. It follows Innovate and precedes Develop in the framework sequence. People and Develop must nevertheless remain coordinated because employee responsibilities and supporting technology influence each other."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O1a-04", "W10O1a", 1,
  "Qasr's redesigned arrival process replaces the traditional Front Desk Agent role with a Guest Host role at four pilot properties.",
  true,
  "This statement is true. Twenty-two existing agents have moved into the Guest Host role across four pilot properties. The redesigned responsibilities include greeting arrivals and resolving exceptions that self-service kiosks cannot handle. Changing the role requires corresponding organisational arrangements."
);
 
OR("W10O1a-05", "W10O1a", 2,
  "Arrange these BPM framework phases in their official sequence, beginning with understanding the existing process and ending with implementation.",
  [
    "Understand the existing process and its performance",
    "Innovate by developing the intended future process design",
    "Address redesigned employee responsibilities during People",
    "Develop the capabilities needed to support the approved design",
    "Implement the prepared process in organisational operations"
  ],
  "Understand examines the existing process, while Innovate develops the future design. People addresses the roles and organisational requirements created by that design. Develop prepares the supporting capabilities, and Implement introduces the process into operations. The framework guides connected activities rather than requiring every activity to occur in isolation."
);
 
MA("W10O1a-06", "W10O1a", 2,
  "Match each Qasr arrival activity to the role of people or technology in the redesigned process.",
  [
    [
      "Self-service kiosk",
      "Supports routine guest check-in activities through technology"
    ],
    [
      "Guest Host",
      "Greets arriving guests and resolves exceptions requiring human assistance"
    ],
    [
      "Guest Host's delegated waiver authority",
      "Permits eligible rate discrepancies up to AED 400 to be resolved without referral"
    ],
    [
      "Managerial escalation",
      "Provides a decision route when an exception exceeds the employee's authority"
    ]
  ],
  "The redesigned process combines technology with human judgement. Kiosks support routine check-in, while Guest Hosts assist arrivals and handle exceptions. Their delegated waiver authority permits appropriate local decisions within the AED 400 boundary. Cases beyond that authority require an appropriate escalation route."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O1a-07", "W10O1a", 2,
  "Qasr's kiosks operate correctly, but Guest Hosts repeatedly refer eligible rate discrepancies to managers. What should the programme investigate?",
  [
    "Whether employees have clear decision authority and organisational support for their redesigned responsibilities",
    "Whether the kiosk screens should be redesigned before examining any employee responsibilities",
    "Whether the organisation should automatically restore every responsibility of the previous Front Desk Agent role",
    "Whether repeated referrals prove that employees deliberately oppose the redesigned arrival process"
  ],
  "Repeated escalation may reflect uncertainty about authority, insufficient capability or other operating difficulties. Qasr should investigate the organisational conditions supporting the Guest Host role rather than assume resistance. The People phase examines whether employees can perform the decisions required by the redesigned process."
);
 
TF("W10O1a-08", "W10O1a", 2,
  "Because People is phase six and Develop is phase seven, all employee-role decisions must be completed before any related technology-development work can begin.",
  false,
  "This statement is false. The BPM framework is a guide rather than a rigid sequence of isolated activities. People and Develop should work alongside each other because role responsibilities influence technology requirements, while technical capabilities can affect how employees perform the redesigned process."
);
 
V("W10O1a-09", "W10O1a", 2,
  "Which diagram best represents the relationship between Qasr's redesigned arrival process and the work required from its employees?",
  [
    [
      D.flow([
        "Redesigned|arrival process",
        "New|responsibilities",
        "Aligned|authority",
        "Required|capability",
        "Operational|performance"
      ]),
      "The redesigned process requires aligned responsibilities, authority and capability before employees can perform it reliably"
    ],
    [
      D.flow([
        "Redesigned|arrival process",
        "New|job title",
        "Assume|readiness"
      ]),
      "Changing the employee's job title is treated as sufficient evidence that the redesigned process can operate"
    ],
    [
      D.flow([
        "Kiosk|installed",
        "Ignore|employee roles",
        "Declare|success"
      ]),
      "Installing the kiosk is treated as proof that employee responsibilities no longer need attention"
    ],
    [
      D.flow([
        "Old|responsibilities",
        "New|technology",
        "Preserve|old practices"
      ]),
      "The organisation retains previous responsibilities and practices without assessing their fit with the redesigned process"
    ]
  ],
  "A redesigned process requires corresponding changes in the work employees perform. Qasr must align responsibilities, decision authority and capability with the intended arrival process. A new title or functioning kiosk cannot independently establish that employees are ready to deliver the redesigned guest experience."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O1a-10", "W10O1a", 3,
  "In the BPM framework, {1} addresses the organisational arrangements needed for redesigned work, while {2} prepares the supporting capabilities required to operate the approved design.",
  [
    ["People", "Realize Value", "Process Architecture"],
    ["Develop", "Launch Pad", "Understand"]
  ],
  "People addresses responsibilities and other organisational arrangements required by the redesigned process. Develop prepares the supporting operational capabilities. Their work must remain coordinated because technology and employee responsibilities jointly determine whether the process can operate as intended."
);
 
OR("W10O1a-11", "W10O1a", 3,
  "Put these management activities in a logical sequence for preparing Qasr's employees to perform the redesigned arrival process.",
  [
    "Identify how the redesigned arrival process changes the work Front Desk Agents perform",
    "Turn those changes into defined Guest Host responsibilities",
    "Grant the decision authority that the defined responsibilities require",
    "Train employees to use that authority within their defined responsibilities",
    "Assess whether the trained employees can perform the redesigned responsibilities appropriately"
  ],
  "Each step depends on the one before it. Qasr cannot define responsibilities until it knows how the work has changed, and it cannot grant authority until those responsibilities exist. Training then prepares employees to use that authority, and assessment shows whether they can actually perform the role rather than merely hold a new title."
);
 
MA("W10O1a-12", "W10O1a", 3,
  "Match each BPM framework activity to its contribution to making Qasr's redesigned arrival process operational.",
  [
    [
      "Innovate",
      "Develops the intended future process design"
    ],
    [
      "People",
      "Aligns employee responsibilities and organisational arrangements with the redesigned process"
    ],
    [
      "Develop",
      "Prepares the supporting operational and technical capabilities"
    ],
    [
      "Implement",
      "Introduces the prepared process into everyday organisational operations"
    ]
  ],
  "Innovate establishes the future process design, while People prepares the organisational arrangements required to perform it. Develop prepares the supporting capabilities, and Implement introduces the process into operations. These phases have distinct purposes but must remain coordinated to deliver the intended improvement."
);

// W10O1b · What the People phase must deliver
// Lesson l1 · Outcome O1 · CLO K3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O1b-01", "W10O1b", 1,
  "What is the main purpose of the People phase's organisational deliverables?",
  [
    "Make the redesigned process performable through aligned roles, authority, measures, capability and adoption arrangements",
    "Confirm that the redesigned process diagram has been approved without examining how employees will perform it",
    "Complete the technical development of kiosks before considering changes to employee responsibilities",
    "Demonstrate that all expected process benefits have already been realised before implementation begins"
  ],
  "The People phase prepares the organisational arrangements required to perform the redesigned process. Its outputs include updated role definitions, performance measures and reward arrangements, documented delegated authority, a capability plan and assessment, and an adoption measure with a named owner. These outputs support implementation and subsequent process performance."
);
 
DR("W10O1b-02", "W10O1b", 1,
  "The People phase should produce updated {1} describing redesigned responsibilities and documented {2} specifying which decisions employees may make.",
  [
    ["role definitions and job descriptions", "software licence agreements", "financial benefits forecasts"],
    ["delegated authority", "technology procurement schedules", "guest satisfaction targets"]
  ],
  "Updated role definitions and job descriptions explain the work employees are expected to perform. Documented delegated authority establishes the decisions employees may make within defined limits. Both are required because assigning responsibility does not automatically provide permission to exercise the necessary judgement."
);
 
V("W10O1b-03", "W10O1b", 1,
  "Which diagram best represents the organisational outputs required from the People phase?",
  [
    [
      D.flow([
        "Redesigned|roles",
        "Documented|authority",
        "Aligned|measures",
        "Assessed|capability",
        "Owned|adoption"
      ]),
      "Prepare role definitions, delegated authority, performance arrangements, capability assessment and adoption ownership"
    ],
    [
      D.flow([
        "Process|diagram",
        "Management|approval",
        "Declare|readiness"
      ]),
      "Treat approval of the redesigned process diagram as sufficient evidence of organisational readiness"
    ],
    [
      D.flow([
        "Kiosk|installation",
        "Software|demonstration",
        "People|ready"
      ]),
      "Treat functioning technology as proof that employees can perform the redesigned process"
    ],
    [
      D.flow([
        "Induction|attendance",
        "Training|completed",
        "Adoption|assumed"
      ]),
      "Use completed induction attendance as proof that employees have adopted the redesigned process"
    ]
  ],
  "The People phase produces organisational arrangements that support the redesigned work. These include roles, measures and rewards, formal authority, assessed capability and accountable adoption measurement. Neither process approval, technology installation nor training attendance alone establishes organisational readiness."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O1b-04", "W10O1b", 1,
  "When redesigned responsibilities change materially, the People phase should review job descriptions and consider whether grades and rewards also require adjustment.",
  true,
  "This statement is true. The People phase reviews job descriptions when the work changes materially and considers whether job grades and reward arrangements remain appropriate. Such a review does not automatically require a higher grade, but it ensures that employment arrangements are assessed against the redesigned responsibilities."
);
 
OR("W10O1b-05", "W10O1b", 2,
  "Arrange these activities in a logical sequence for preparing Qasr's Guest Host role to perform the redesigned arrival process.",
  [
    "Identify the responsibilities the redesigned guest arrival process requires",
    "Write those responsibilities into an updated Guest Host role definition and job description",
    "Document the decision authority and escalation boundaries that the updated job description depends on",
    "Set performance measures and review reward for the documented responsibilities and decision rights",
    "Assess whether employees can perform the role as it is now defined, authorised and measured"
  ],
  "Role preparation starts from the work the redesigned process requires. The responsibilities are then written into the role definition, and the authority that role depends on is documented. Measures and reward can only be set once the responsibilities and decision rights are clear, and capability assessment tests the employee against the completed role."
);
 
MA("W10O1b-06", "W10O1b", 2,
  "Match each People-phase deliverable to the organisational problem it is intended to address.",
  [
    [
      "Updated role definition",
      "Employees lack a clear description of their redesigned responsibilities"
    ],
    [
      "Documented delegated authority",
      "Employees are uncertain which decisions they may make without referral"
    ],
    [
      "Revised performance measures",
      "Existing objectives reward behaviour associated with the previous process"
    ],
    [
      "Capability plan and assessment",
      "Management cannot establish whether employees can perform unfamiliar work"
    ]
  ],
  "Each People-phase deliverable addresses a different organisational requirement. Role definitions clarify responsibilities, delegated authority clarifies permitted decisions, performance measures reinforce intended behaviour, and capability assessment establishes whether employees can perform the redesigned work. These arrangements must support one another."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O1b-07", "W10O1b", 2,
  "Qasr has renamed its Front Desk Agents as Guest Hosts, but the AED 400 waiver remains outside the formal delegation schedule. Which People-phase output is missing?",
  [
    "Documented delegated authority specifying the permitted waiver and the escalation boundary",
    "A revised process diagram showing that kiosks can complete routine guest check-ins",
    "A training attendance report confirming that all Guest Hosts participated in induction",
    "A financial benefits forecast estimating the savings expected from automated arrivals"
  ],
  "The redesigned Guest Host role permits eligible rate discrepancies up to AED 400 to be waived without referral. However, that authority must be formally documented so employees understand their decision rights. A process diagram, training attendance record or benefits forecast cannot substitute for the missing delegation arrangement."
);
 
TF("W10O1b-08", "W10O1b", 2,
  "Because all twenty-two Qasr Guest Hosts attended their four-hour induction, the People phase has sufficient evidence that their required capabilities have been demonstrated.",
  false,
  "This statement is false. All twenty-two Guest Hosts attended induction, but their capability was not tested afterwards. Attendance confirms participation in a learning activity rather than the ability to investigate exceptions, exercise appropriate judgement and recognise escalation boundaries. The People phase requires a capability plan and assessment."
);
 
V("W10O1b-09", "W10O1b", 2,
  "Which diagram best represents how Qasr should move from completed induction to credible evidence of Guest Host capability?",
  [
    [
      D.flow([
        "Identify|capability needs",
        "Practise|realistic exceptions",
        "Assess|decisions",
        "Address|gaps"
      ]),
      "Identify the required capabilities, practise realistic cases, assess decisions and address demonstrated gaps"
    ],
    [
      D.flow([
        "Schedule|induction",
        "Record|attendance",
        "Assume|competence"
      ]),
      "Treat participation in the scheduled induction as sufficient proof of decision-making capability"
    ],
    [
      D.flow([
        "Install|kiosks",
        "Confirm|operation",
        "Assume|employee readiness"
      ]),
      "Use functioning kiosk technology as evidence that employees possess the required judgement"
    ],
    [
      D.flow([
        "Rename|positions",
        "Issue|job titles",
        "Declare|capability"
      ]),
      "Treat the assignment of new job titles as evidence that employees can perform their redesigned responsibilities"
    ]
  ],
  "A credible capability plan identifies the knowledge and judgement required by the redesigned role. Realistic practice and assessment establish whether employees can perform the required decisions. Training attendance, technology installation and new job titles do not demonstrate that capability."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O1b-10", "W10O1b", 3,
  "Qasr should measure actual use of the redesigned arrival process through {1} and assign a named {2} responsible for monitoring and reporting it.",
  [
    ["an adoption measure", "an induction attendance register", "a job grading schedule"],
    ["owner", "software demonstrator", "external guest"]
  ],
  "An adoption measure tracks whether actual cases follow the redesigned process. A named owner provides accountability for monitoring and reporting that evidence. This distinction matters because completed implementation activities do not establish that employees and guests are consistently using the intended operating arrangements."
);
 
OR("W10O1b-11", "W10O1b", 3,
  "Put these activities in a logical sequence for establishing meaningful adoption monitoring at Qasr.",
  [
    "Define which guest arrivals should follow the redesigned process",
    "Specify how genuine use of the redesigned process will be measured for those arrivals",
    "Assign a named owner accountable for that adoption measure",
    "Have the owner collect adoption evidence weekly from go-live",
    "Have the owner report the weekly pattern and investigate persistent departures from the intended process"
  ],
  "Adoption cannot be measured until Qasr defines which arrivals should follow the new path, and an owner cannot be accountable for a measure that does not yet exist. The owner then collects evidence weekly from go-live and reports the pattern, so persistent departures are investigated rather than hidden behind completed project milestones."
);
 
MA("W10O1b-12", "W10O1b", 3,
  "Match each People-phase output to its contribution to later BPM implementation and performance.",
  [
    [
      "Updated role definitions and job descriptions",
      "Provide employees with documented responsibilities for operating the redesigned process"
    ],
    [
      "Revised measures and reward arrangements",
      "Encourage behaviour aligned with the intended process outcomes"
    ],
    [
      "Documented decision authority",
      "Enable appropriate local decisions within agreed organisational limits"
    ],
    [
      "Adoption measure with a named owner",
      "Provide accountable evidence about whether the redesigned process is genuinely being used"
    ]
  ],
  "The People phase provides organisational arrangements that support later BPM phases. Role definitions establish responsibilities, performance measures and rewards reinforce intended behaviour, and documented authority enables appropriate decisions. Adoption ownership makes actual process use visible, helping the organisation assess implementation and sustain improved performance."
);

// W10O1c · Who does the work, and who answers for it?
// Lesson l1 · Outcome O1 · CLO K3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O1c-01", "W10O1c", 1,
  "In a RACI matrix, what distinguishes the accountable role from the responsible role?",
  [
    "The accountable role ultimately answers for the activity or decision, while the responsible role performs the work",
    "The accountable role performs every task personally, while the responsible role only receives progress updates",
    "The accountable role provides optional advice, while the responsible role holds final approval authority",
    "The accountable role must belong to senior management, while the responsible role must belong to frontline operations"
  ],
  "In RACI, Responsible identifies who performs the activity, while Accountable identifies who ultimately answers for its result or governing decision. These roles may coincide, but performing an activity does not automatically establish accountability for every related decision. Clear assignments help coordinate work across organisational boundaries."
);
 
DR("W10O1c-02", "W10O1c", 1,
  "In RACI, the letter C identifies a role that is {1}, while the letter I identifies a role that is {2}.",
  [
    ["consulted for relevant advice", "accountable for the final result", "responsible for performing every task"],
    ["informed about relevant progress or decisions", "authorised to approve every exception", "required to perform the activity"]
  ],
  "Consulted roles provide relevant knowledge or advice before an activity or decision is completed. Informed roles receive appropriate updates without necessarily performing or approving the work. Distinguishing these contributions prevents unnecessary approvals and confusion about decision ownership."
);
 
V("W10O1c-03", "W10O1c", 1,
  "Which diagram correctly represents the RACI principle for accountability within a redesigned process activity?",
  [
    [
      D.flow([
        "Activity|defined",
        "Responsible|role performs",
        "One accountable|role answers",
        "Result|reviewed"
      ]),
      "The activity has a responsible performer and exactly one accountable role"
    ],
    [
      D.flow([
        "Activity|defined",
        "Several accountable|roles",
        "Competing|approvals",
        "Result|delayed"
      ]),
      "The activity has several accountable owners with potentially conflicting approval decisions"
    ],
    [
      D.flow([
        "Activity|defined",
        "Consulted|role advises",
        "No accountable|owner",
        "Result|assumed"
      ]),
      "The activity relies on consultation without identifying an accountable role"
    ],
    [
      D.flow([
        "Activity|defined",
        "Everyone|informed",
        "No responsible|performer",
        "Activity|unfinished"
      ]),
      "The activity distributes information without assigning responsibility for performing the work"
    ]
  ],
  "The Week 10 RACI principle requires one accountable role for each activity. Other roles may perform work, provide advice or receive information, but accountability should not be divided among competing owners. This arrangement clarifies who ultimately answers for the activity's result."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O1c-04", "W10O1c", 1,
  "An employee who performs an activity is automatically accountable for every policy decision associated with that activity.",
  false,
  "This statement is false. Responsibility for performing an activity does not automatically establish accountability for every related decision. A Guest Host may investigate a rate discrepancy while another authorised role remains accountable for a policy decision outside the Guest Host's delegated authority."
);
 
OR("W10O1c-05", "W10O1c", 2,
  "Arrange these activities in a logical sequence for clarifying accountability in Qasr's redesigned guest arrival process.",
  [
    "List the activities and decisions that the redesigned arrival process requires",
    "Identify the roles involved in each listed activity",
    "Assign, from those roles, the responsible role that will perform each activity",
    "Review the responsible assignments and name exactly one role to answer for each activity's result",
    "Add consultation, information and escalation routes around the completed assignments"
  ],
  "A useful RACI design starts from the activities the redesigned process requires, not from the old department structure. Once the roles are identified, responsibility and then single accountability can be assigned for each activity. Consultation, information and escalation routes complete the structure around those assignments, so nobody confuses advice with ownership."
);
 
MA("W10O1c-06", "W10O1c", 2,
  "Match each RACI designation to its correct meaning.",
  [
    [
      "Responsible",
      "Performs the work required to complete the activity"
    ],
    [
      "Accountable",
      "Ultimately answers for the activity's result or governing decision"
    ],
    [
      "Consulted",
      "Provides relevant knowledge or advice before the activity or decision is completed"
    ],
    [
      "Informed",
      "Receives relevant updates about progress, decisions or outcomes"
    ]
  ],
  "RACI distinguishes four different contributions to organisational work. Responsible roles perform activities, Accountable roles answer for their results, Consulted roles provide input, and Informed roles receive updates. These distinctions help employees coordinate cross-functional processes without confusing participation with decision ownership."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O1c-07", "W10O1c", 2,
  "A Qasr Guest Host investigates a rate discrepancy that exceeds the employee's delegated authority. What is the most appropriate organisational arrangement?",
  [
    "The Guest Host performs the investigation and follows a defined escalation route to the authorised decision owner",
    "The Guest Host approves the discrepancy because performing the investigation automatically grants final decision authority",
    "Every department involved becomes jointly accountable and must independently approve the same decision",
    "The Guest Host stops investigating because employees cannot perform activities involving decisions outside their authority"
  ],
  "A Guest Host may be responsible for investigating an exception without possessing authority to approve every resulting decision. Cases outside delegated authority require a clear escalation route to the appropriate decision owner. This arrangement preserves useful frontline work while maintaining explicit accountability and decision boundaries."
);
 
TF("W10O1c-08", "W10O1c", 2,
  "Qasr should design its RACI assignments around the redesigned arrival process rather than automatically copy the previous departmental structure.",
  true,
  "This statement is true. RACI should reflect the activities, responsibilities and decisions required by the redesigned process. Simply copying the previous organisational chart could preserve unnecessary handoffs or ambiguous ownership that the redesign was intended to address."
);
 
V("W10O1c-09", "W10O1c", 2,
  "Which diagram best illustrates the appropriate handling of a guest exception requiring advice from another department?",
  [
    [
      D.flow([
        "Guest Host|investigates",
        "Relevant role|consulted",
        "Authorised role|decides",
        "Guest Host|communicates"
      ]),
      "The Guest Host performs the investigation, obtains relevant advice and follows the defined decision authority"
    ],
    [
      D.flow([
        "Guest Host|investigates",
        "All departments|approve",
        "Competing|decisions",
        "Guest|waits"
      ]),
      "Every participating department becomes an independent final approval authority"
    ],
    [
      D.flow([
        "Guest Host|investigates",
        "Consulted role|automatically decides",
        "Accountability|ignored"
      ]),
      "Providing advice automatically transfers accountability to the consulted role"
    ],
    [
      D.flow([
        "Guest Host|investigates",
        "Everyone|informed",
        "No decision|owner",
        "Case|unresolved"
      ]),
      "The organisation distributes information without assigning an authorised decision owner"
    ]
  ],
  "The responsible employee may investigate the exception and consult a role with relevant expertise. The governing decision must remain with the authorised role identified through the organisation's accountability and delegation arrangements. Consultation does not automatically transfer accountability or decision authority."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O1c-10", "W10O1c", 3,
  "A RACI matrix clarifies {1}, while a formal delegation arrangement specifies {2}. Both are needed when a Guest Host handles an exception.",
  [
    ["responsibility and accountability for process activities", "the monetary value of every guest booking", "the employee's annual training attendance"],
    ["which decisions an employee is authorised to make", "which employee has the longest service record", "which department receives the largest operating budget"]
  ],
  "RACI identifies who performs activities and who ultimately answers for their results. Formal delegation establishes the decisions employees may make within defined boundaries. Qasr needs both arrangements because responsibility for investigating a discrepancy does not automatically confer authority to approve every possible resolution."
);
 
OR("W10O1c-11", "W10O1c", 3,
  "Arrange these steps for handling a Qasr rate discrepancy that requires consultation and may exceed the Guest Host's authority.",
  [
    "The Guest Host receives the guest's rate discrepancy",
    "The Guest Host investigates the booking and gathers relevant evidence",
    "The Guest Host obtains appropriate advice when the case requires another function's expertise",
    "The Guest Host checks whether the proposed decision falls within delegated authority",
    "The authorised decision owner resolves any matter outside the Guest Host's authority"
  ],
  "The Guest Host performs the assigned investigation and obtains relevant advice when needed. The employee must then respect the documented decision boundary. A decision outside that boundary belongs with the authorised decision owner. This sequence illustrates how responsibility, consultation and formal authority support coordinated exception handling."
);
 
MA("W10O1c-12", "W10O1c", 3,
  "Match each activity in the Week 10 RACI exhibit to its principal coordination concern.",
  [
    [
      "Define process standard",
      "Establish the requirements governing how the redesigned process should operate"
    ],
    [
      "Build the workflow",
      "Translate the approved process requirements into supporting workflow capabilities"
    ],
    [
      "Monitor performance",
      "Review evidence about how the process operates and whether it achieves intended outcomes"
    ],
    [
      "Escalate exceptions",
      "Direct cases requiring additional authority to an appropriate decision owner"
    ]
  ],
  "The Week 10 RACI exhibit includes defining process standards, building the workflow, monitoring performance and escalating exceptions. Each activity requires clear responsibility and one accountable role. The matrix coordinates operational, technical and managerial contributions without assuming that every participating role owns the final decision."
);

// W10O2a · Authority without ambiguity
// Lesson l2 · Outcome O2 · CLO S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O2a-01", "W10O2a", 1,
  "Why might Qasr's Guest Hosts refer eligible rate discrepancies to managers despite being told they can approve waivers up to AED 400?",
  [
    "The waiver authority is absent from formal delegation, creating uncertainty about whether independent decisions are organisationally supported",
    "The redesigned process requires every rate discrepancy to receive approval from the duty manager regardless of its value",
    "The Guest Host role was designed exclusively for greeting guests and has no responsibility for resolving kiosk exceptions",
    "The kiosk automatically approves every rate discrepancy, making employee decisions unnecessary under the redesigned process"
  ],
  "Guest Hosts may waive eligible rate discrepancies up to AED 400 without referral, but this authority was communicated through a briefing email and remains absent from formal delegation. That mismatch can encourage defensive escalation because employees may feel accountable for decisions without having dependable documentation of their authority."
);
 
DR("W10O2a-02", "W10O2a", 1,
  "In the authority-accountability matrix, high accountability combined with low authority tends to produce {1}, while high authority combined with high accountability supports {2}.",
  [
    ["defensive escalation", "consistent ownership", "unrestricted local discretion"],
    ["ownership and intended performance", "compliance without engagement", "avoidance of every difficult decision"]
  ],
  "High accountability with low authority can encourage defensive escalation because employees face responsibility without sufficient decision rights. High authority combined with high accountability supports ownership because employees can make appropriate decisions while remaining answerable for their outcomes."
);
 
V("W10O2a-03", "W10O2a", 1,
  "Which diagram best represents the authority-accountability arrangement that supports ownership of redesigned process decisions?",
  [
    [
      D.flow([
        "High|authority",
        "High|accountability",
        "Appropriate|ownership"
      ]),
      "Employees possess clear decision rights and remain answerable for the resulting decisions"
    ],
    [
      D.flow([
        "Low|authority",
        "High|accountability",
        "Defensive|escalation"
      ]),
      "Employees face accountability without sufficient authority to make the required decisions"
    ],
    [
      D.flow([
        "High|authority",
        "Low|accountability",
        "Inconsistent|practice"
      ]),
      "Employees possess substantial discretion without corresponding accountability for their decisions"
    ],
    [
      D.flow([
        "Low|authority",
        "Low|accountability",
        "Passive|compliance"
      ]),
      "Employees have little decision authority and limited accountability for process outcomes"
    ]
  ],
  "The Week 10 authority-accountability matrix associates high authority and high accountability with ownership and intended performance. Employees need permission to make appropriate decisions and must remain answerable for their quality. Other combinations can encourage defensive escalation, inconsistent local practice or compliance without engagement."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O2a-04", "W10O2a", 1,
  "At Qasr, the AED 400 waiver authority appears in the formal delegation schedule and the updated Guest Host job descriptions.",
  false,
  "This statement is false. The AED 400 waiver was communicated through a briefing email but remains absent from the formal delegation schedule, job descriptions and performance objectives. The missing documentation creates a mismatch between the redesigned role's expected decisions and the organisation's formal arrangements."
);
 
OR("W10O2a-05", "W10O2a", 2,
  "Arrange these actions in a logical sequence for correcting Qasr's undocumented waiver authority.",
  [
    "Identify the rate-discrepancy decisions that the redesigned Guest Host role is expected to make",
    "Confirm the permitted AED 400 waiver boundary and the conditions governing eligible decisions",
    "Document the authority in the formal delegation schedule",
    "Align the Guest Host role description and escalation arrangements with the documented authority",
    "Communicate the decision rules and assess whether Guest Hosts can apply them appropriately"
  ],
  "Qasr should establish the decisions required by the redesigned role and document their authorised limits. The formal delegation schedule, role description and escalation arrangements must then agree. Communication and practical assessment help employees understand how to exercise their authority appropriately rather than relying solely on an informal briefing."
);
 
MA("W10O2a-06", "W10O2a", 2,
  "Match each authority-accountability combination to the behavioural tendency identified in the Week 10 matrix.",
  [
    [
      "High authority and high accountability",
      "Ownership and intended performance"
    ],
    [
      "Low authority and high accountability",
      "Defensive escalation"
    ],
    [
      "High authority and low accountability",
      "Inconsistent local practice"
    ],
    [
      "Low authority and low accountability",
      "Compliance without engagement and quiet workarounds"
    ]
  ],
  "The authority-accountability matrix illustrates how organisational arrangements influence behaviour. High authority with high accountability supports ownership. High accountability without sufficient authority encourages defensive escalation, while authority without accountability risks inconsistent decisions. Low levels of both can encourage passive compliance and workarounds."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O2a-07", "W10O2a", 2,
  "Nine of Qasr's twenty-two Guest Hosts refer every rate discrepancy to a duty manager. Which conclusion is most defensible?",
  [
    "The pattern warrants investigation of unclear authority, capability and other operating conditions without assuming every employee has the same motive",
    "The nine employees have demonstrated deliberate resistance because repeated escalation can have no other explanation",
    "The pattern proves that every rate discrepancy exceeds the AED 400 delegated waiver limit",
    "The pattern establishes that the kiosks are technically incapable of processing routine guest arrivals"
  ],
  "Nine Guest Hosts consistently refer rate discrepancies upward, but the case does not establish each employee's motive. Missing formal delegation is a documented organisational weakness and a plausible contributor to defensive escalation. Capability and other operating conditions should also be investigated before attributing the behaviour to resistance."
);
 
TF("W10O2a-08", "W10O2a", 2,
  "Giving employees high decision authority without meaningful accountability can encourage inconsistent local practices.",
  true,
  "This statement is true. The authority-accountability matrix associates high authority and low accountability with inconsistent local practice. Employees need clear decision rights, but they must also remain answerable for the appropriateness and quality of their decisions."
);
 
V("W10O2a-09", "W10O2a", 2,
  "Which diagram best represents an appropriate decision arrangement for a Guest Host handling a rate discrepancy?",
  [
    [
      D.flow([
        "Rate|discrepancy",
        "Check|delegation",
        "Eligible|local decision",
        "Outside authority|escalation"
      ]),
      "The Guest Host checks formal authority, resolves eligible cases and escalates decisions outside the delegated boundary"
    ],
    [
      D.flow([
        "Rate|discrepancy",
        "Guest Host|approves all",
        "No authority|check"
      ]),
      "The Guest Host approves every discrepancy without checking the formal decision boundary"
    ],
    [
      D.flow([
        "Rate|discrepancy",
        "All cases|escalated",
        "Manager|decides"
      ]),
      "Every discrepancy is referred to management even when the Guest Host is authorised to resolve it"
    ],
    [
      D.flow([
        "Rate|discrepancy",
        "Briefing email|consulted",
        "Formal delegation|ignored"
      ]),
      "The Guest Host relies entirely on informal communication without respecting documented decision arrangements"
    ]
  ],
  "An appropriate arrangement allows Guest Hosts to resolve eligible discrepancies within formally documented authority while escalating cases outside that boundary. This supports local ownership without creating unrestricted discretion. Qasr must align the delegation schedule, role responsibilities and practical decision guidance."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O2a-10", "W10O2a", 3,
  "A Guest Host who is expected to resolve rate discrepancies but lacks documented permission faces an {1}. Repeated referral may therefore represent {2} rather than proven resistance.",
  [
    ["authority-accountability mismatch", "automated transaction failure", "absence of process ownership"],
    ["defensive escalation", "unrestricted local ownership", "confirmed technical malfunction"]
  ],
  "The redesigned role expects Guest Hosts to exercise judgement, but the waiver authority is not formally documented. This creates an authority-accountability mismatch that can encourage defensive escalation. Repeated referrals are observable behaviour, but they do not establish that employees are deliberately resisting the redesign."
);
 
OR("W10O2a-11", "W10O2a", 3,
  "Arrange these steps for handling a Qasr rate discrepancy through a properly documented delegation arrangement.",
  [
    "The Guest Host receives the rate discrepancy and investigates the relevant booking information",
    "The Guest Host identifies the proposed resolution and checks the applicable decision rules",
    "The Guest Host determines whether the decision falls within the documented AED 400 authority",
    "An eligible decision is resolved locally, while a decision outside authority follows the defined escalation route",
    "The decision and its outcome are recorded for accountability and appropriate review"
  ],
  "The Guest Host should investigate the discrepancy and establish the appropriate decision before applying the documented delegation boundary. Eligible decisions may be resolved locally, while matters beyond authority require escalation. Recording outcomes supports accountability and helps the organisation review decision quality."
);
 
MA("W10O2a-12", "W10O2a", 3,
  "Match each proposed Guest Host role arrangement to the problem it is intended to prevent.",
  [
    [
      "Formal AED 400 delegation",
      "Uncertainty about permission to approve eligible rate discrepancies"
    ],
    [
      "Defined escalation boundary",
      "Unauthorised local decisions involving cases beyond the Guest Host's authority"
    ],
    [
      "Clear decision accountability",
      "Employees exercising authority without being answerable for decision quality"
    ],
    [
      "Realistic decision practice",
      "Employees misunderstanding how to apply the waiver and escalation rules"
    ]
  ],
  "A coherent Guest Host role requires several connected arrangements. Formal delegation establishes permission to decide, escalation boundaries protect decisions outside that permission, accountability supports appropriate judgement, and realistic practice develops the capability to apply the rules. Together, these arrangements reduce uncertainty without encouraging unrestricted approvals."
);

// W10O2b · When the old measure defeats the new design
// Lesson l2 · Outcome O2 · CLO S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O2b-01", "W10O2b", 1,
  "Why can Qasr's inherited check-ins-per-shift measure undermine the redesigned Guest Host role?",
  [
    "It rewards conventional transaction volume rather than the careful resolution of exceptions requiring human judgement",
    "It gives Guest Hosts unrestricted authority to approve rate discrepancies beyond the AED 400 delegation limit",
    "It prevents the kiosks from processing routine guest arrivals unless a manager approves each transaction",
    "It measures guest satisfaction directly and therefore discourages employees from completing routine arrival activities"
  ],
  "The Guest Host role focuses on supporting arrivals and resolving exceptions that kiosks cannot handle. The inherited check-ins-per-shift measure rewards conventional transaction throughput, which may discourage employees from spending time on complicated exceptions. Performance measures should reinforce the contribution required by the redesigned process."
);
 
DR("W10O2b-02", "W10O2b", 1,
  "Qasr's inherited objectives measure {1} and {2}, although Guest Hosts now concentrate on supporting arrivals and resolving kiosk exceptions.",
  [
    ["check-ins completed per shift", "exceptions resolved without escalation", "guest complaints investigated per month"],
    ["average transaction time", "decision quality from exception samples", "percentage of staff completing induction"]
  ],
  "The Guest Hosts' annual objectives were established in January and still measure check-ins completed per shift and average transaction time. These objectives reflect conventional front-desk transactions rather than the redesigned emphasis on exception handling. Kiosk check-ins are also not attributed to individual employees."
);
 
V("W10O2b-03", "W10O2b", 1,
  "Which diagram best represents the performance-measurement arrangement recommended for an employee handling exceptions rejected by automation?",
  [
    [
      D.flow([
        "Eligible|exception",
        "Appropriate|resolution",
        "Quality|sample",
        "Outcome|reviewed"
      ]),
      "Measure appropriate exceptions resolved without unnecessary escalation and check the quality of decisions"
    ],
    [
      D.flow([
        "Complex|exception",
        "Longer|handling time",
        "Lower|throughput",
        "Employee|penalised"
      ]),
      "Continue rewarding transaction throughput even when the redesigned role requires complex exception handling"
    ],
    [
      D.flow([
        "Exception|received",
        "Approve|every case",
        "Increase|resolution count"
      ]),
      "Reward the number of locally approved exceptions without checking authority or decision quality"
    ],
    [
      D.flow([
        "New|resolution target",
        "Keep|old speed target",
        "Competing|objectives"
      ]),
      "Add a new exception measure while retaining the contradictory transaction-speed objective"
    ]
  ],
  "The Week 10 worked example recommends replacing transaction throughput with exceptions resolved without escalation, supported by a quality sample. The quality safeguard protects against inappropriate decisions. The conflicting old objective should be removed explicitly rather than retained alongside the replacement measure."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O2b-04", "W10O2b", 1,
  "At Qasr, kiosk check-ins are attributed to individual Guest Hosts when calculating their inherited check-ins-per-shift performance objective.",
  false,
  "This statement is false. Kiosk check-ins are not attributed to individual employees. The inherited check-ins-per-shift objective therefore does not reliably reflect the Guest Host's contribution to the redesigned arrival process, particularly when employees spend time resolving complicated exceptions."
);
 
OR("W10O2b-05", "W10O2b", 2,
  "Arrange the steps of the Week 10 worked example for repairing a measure that contradicts the design, as applied to the Guest Host role.",
  [
    "Ask what the inherited measure rewards: volume, and therefore simple cases",
    "Ask what the redesign needs: complex cases resolved without escalation",
    "Recognise that the measure and the design are asking for opposite behaviour",
    "Replace the measure with exceptions resolved without escalation, plus a quality sample",
    "Remove the old measure explicitly so that both do not remain in force"
  ],
  "This is the sequence of the Week 10 worked example. The diagnosis compares what the old measure rewards with what the design needs, which reveals that they pull in opposite directions. The repair introduces a measure of exceptions resolved without escalation with a quality sample, and then removes the old measure explicitly, because leaving it in place instructs people to keep the old behaviour."
);
 
MA("W10O2b-06", "W10O2b", 2,
  "Match each performance-measurement feature to its likely influence on Guest Host behaviour.",
  [
    [
      "Check-ins completed per shift",
      "Encourages attention to conventional transaction volume"
    ],
    [
      "Average transaction time",
      "Encourages shorter handling times even when exceptions require investigation"
    ],
    [
      "Appropriate exceptions resolved without unnecessary escalation",
      "Recognises effective handling of eligible cases within delegated authority"
    ],
    [
      "Decision-quality sample",
      "Checks that recorded resolutions follow appropriate rules and authority boundaries"
    ]
  ],
  "Performance measures influence which activities employees prioritise. Transaction volume and speed can discourage careful exception handling, while an appropriate resolution measure recognises the redesigned contribution. A quality sample helps prevent employees from improving their scores through inappropriate approvals or superficial resolutions."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O2b-07", "W10O2b", 2,
  "A Guest Host spends considerable time resolving a difficult kiosk exception correctly but completes fewer conventional check-ins. What does this illustrate?",
  [
    "An employee can contribute to the redesigned process while appearing less productive under an inherited throughput measure",
    "The employee has necessarily performed poorly because every successful Guest Host should maximise transaction volume",
    "The redesigned process has failed technically because complicated exceptions should never require human judgement",
    "The employee must have exceeded the AED 400 waiver authority because the investigation took longer than a routine check-in"
  ],
  "Complex exceptions may require more investigation than routine transactions. A Guest Host can therefore perform valuable redesigned work while recording lower throughput under the previous performance objective. This illustrates why measures must reflect the responsibilities and outcomes employees can reasonably influence."
);
 
TF("W10O2b-08", "W10O2b", 2,
  "Adding an exception-resolution measure while retaining a contradictory transaction-volume objective can leave Guest Hosts facing conflicting performance expectations.",
  true,
  "This statement is true. The Week 10 worked example explicitly recommends removing the old transaction-volume objective. Retaining contradictory measures may continue rewarding familiar activities while simultaneously asking employees to prioritise the redesigned exception-handling work."
);
 
V("W10O2b-09", "W10O2b", 2,
  "Which diagram best explains how an inherited throughput measure can recreate the behaviour the redesigned process was intended to replace?",
  [
    [
      D.flow([
        "Old|throughput target",
        "Complex cases|take longer",
        "Pressure|to avoid",
        "Old behaviour|returns"
      ]),
      "A transaction-volume target can discourage complex exception handling and encourage familiar operating behaviour"
    ],
    [
      D.flow([
        "New|role",
        "Quality|assessment",
        "Appropriate|resolution",
        "Better|alignment"
      ]),
      "A relevant outcome measure and quality assessment support the redesigned responsibilities"
    ],
    [
      D.flow([
        "Formal|delegation",
        "Clear|decision rights",
        "Appropriate|ownership"
      ]),
      "Documented authority helps employees exercise judgement within defined boundaries"
    ],
    [
      D.flow([
        "Realistic|practice",
        "Capability|assessment",
        "Targeted|support"
      ]),
      "Practical assessment identifies whether employees can perform unfamiliar decisions"
    ]
  ],
  "The old throughput objective rewards completing many transactions quickly. Complex exceptions take longer, so employees may experience pressure to avoid them or refer them elsewhere. The resulting behaviour can recreate old process patterns even when employees understand the redesigned responsibilities."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O2b-10", "W10O2b", 3,
  "The Week 10 exception-handler example recommends measuring {1}, supported by {2} to protect the appropriateness of decisions.",
  [
    ["exceptions resolved without escalation", "transactions completed per shift", "training hours attended"],
    ["a quality sample", "an unchanged speed target", "a count of kiosk installations"]
  ],
  "The worked example replaces transaction throughput with exceptions resolved without escalation and adds a quality sample. The outcome measure recognises the intended exception-handling contribution, while the safeguard checks decision quality. Employees should not be rewarded for avoiding necessary escalation or approving cases outside their authority."
);
 
OR("W10O2b-11", "W10O2b", 3,
  "Arrange these steps in a logical sequence for reviewing whether Qasr's proposed exception-resolution measure encourages appropriate behaviour.",
  [
    "Define which exceptions Guest Hosts may resolve within their delegated authority",
    "Specify how an appropriate resolution of those exceptions will be recorded",
    "Set a quality sample that checks the recorded resolutions for accuracy and compliance",
    "Collect resolution and quality-sample evidence after the revised measure is introduced",
    "Use that evidence to judge whether the measure encourages appropriate behaviour or creates unintended effects"
  ],
  "The measure needs clear decision boundaries before Qasr can define what a recorded resolution is, and the quality sample can only check resolutions once they are recorded. Evidence is then collected under the revised measure, and reviewing it shows whether employees are resolving cases appropriately or simply raising their counts."
);
 
MA("W10O2b-12", "W10O2b", 3,
  "Match each proposed management action to the performance-alignment problem it addresses.",
  [
    [
      "Remove the conflicting old throughput objective",
      "Prevents the previous transaction-volume target from continuing to reward displaced work"
    ],
    [
      "Introduce an appropriate exception-resolution measure",
      "Recognises the Guest Host's contribution to handling cases that kiosks cannot complete"
    ],
    [
      "Sample the quality of resolution decisions",
      "Discourages inappropriate approvals made merely to improve the recorded resolution count"
    ],
    [
      "Review grade and reward arrangements",
      "Examines whether employment incentives remain appropriate for the materially changed responsibilities"
    ]
  ],
  "A coherent performance redesign addresses both what employees are measured against and what behaviour those measures encourage. Removing contradictory objectives reduces pressure to perform displaced work. Relevant outcome measures, quality safeguards and a justified reward review help align the Guest Host role with the redesigned arrival process."
);

// W10O2c · Designing a role people can actually perform
// Lesson l2 · Outcome O2 · CLO S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O2c-01", "W10O2c", 1,
  "Which proposal provides the most complete specification for Qasr's redesigned Guest Host role?",
  [
    "Define responsibilities, accountability, delegated authority, reporting, performance measures, reward review and required capability",
    "Update the job title and provide kiosk training while retaining the previous performance objectives and approval arrangements",
    "Increase the job grade and allow Guest Hosts to approve every rate discrepancy without documented limits",
    "Assign Guest Hosts responsibility for all arrival outcomes while leaving decision authority and escalation to informal practice"
  ],
  "A workable role requires more than a new title or job description. Qasr must align responsibilities, accountability, delegated authority, reporting arrangements, measures, rewards and capability. These elements support one another because employees need clear expectations, appropriate permission and practical ability to perform the redesigned work."
);
 
DR("W10O2c-02", "W10O2c", 1,
  "Qasr issued updated Guest Host job descriptions {1} after go-live, while the existing job {2} remained unchanged.",
  [
    ["three weeks", "eleven weeks", "sixteen weeks"],
    ["grade", "title", "location"]
  ],
  "Qasr issued the updated job descriptions three weeks after go-live, and the Guest Host grade remained unchanged. The People phase requires job descriptions to reflect materially changed responsibilities and calls for a review of grade and reward arrangements where appropriate. A review does not automatically justify increasing the grade."
);
 
V("W10O2c-03", "W10O2c", 1,
  "Which diagram best represents a coherent Guest Host role specification?",
  [
    [
      D.flow([
        "Defined|responsibilities",
        "Clear|accountability",
        "Documented|authority",
        "Aligned|measures",
        "Assessed|capability"
      ]),
      "Responsibilities, accountability, authority, measures and capability support the same redesigned role"
    ],
    [
      D.flow([
        "New|job title",
        "Old|objectives",
        "Informal|authority",
        "Assumed|readiness"
      ]),
      "The new role retains previous measures and relies on informal authority and assumed capability"
    ],
    [
      D.flow([
        "Greater|responsibility",
        "No|delegation",
        "Managerial|referrals",
        "Unchanged|work"
      ]),
      "Employees receive additional responsibility without authority to perform the required decisions"
    ],
    [
      D.flow([
        "Kiosk|installed",
        "Induction|attended",
        "Role|complete"
      ]),
      "Technology installation and induction attendance are treated as sufficient evidence of role readiness"
    ]
  ],
  "A complete role specification connects the redesigned responsibilities with accountability, authority, performance expectations and capability. Qasr must also clarify reporting arrangements and review grade and reward. A new title, functioning kiosk or completed induction cannot independently establish that the role is operationally ready."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O2c-04", "W10O2c", 1,
  "Because Qasr's Guest Host grade remains unchanged, the Week 10 evidence proves that every Guest Host should immediately receive a higher grade.",
  false,
  "This statement is false. The unchanged grade establishes that Qasr has not adjusted this employment arrangement, but it does not establish the appropriate replacement grade. The People phase requires a justified review when responsibilities change materially, rather than an automatic increase based solely on a redesigned job title."
);
 
OR("W10O2c-05", "W10O2c", 2,
  "Arrange these activities in a logical sequence for developing a workable Guest Host role specification.",
  [
    "Identify the responsibilities the redesigned guest arrival process requires",
    "Assign accountability and a reporting line for each identified responsibility",
    "Document the decision rights and escalation boundaries that those accountabilities need",
    "Set measures and review grade and reward for the role as now documented",
    "Assess employees through realistic cases against the completed role specification"
  ],
  "The specification begins with the work the redesigned process requires. Accountability and reporting are attached to those responsibilities, and decision rights are then documented so that people can act on what they answer for. Measures and reward follow the documented role, and realistic assessment tests employees against the finished specification."
);
 
MA("W10O2c-06", "W10O2c", 2,
  "Match each Guest Host role-specification element to the question it must answer.",
  [
    [
      "Role responsibilities",
      "What arrival activities and exceptions must the Guest Host handle?"
    ],
    [
      "Delegated authority",
      "Which rate-discrepancy decisions may the Guest Host make without referral?"
    ],
    [
      "Reporting and escalation",
      "Where should the employee obtain support or refer decisions outside authority?"
    ],
    [
      "Performance measures",
      "How will the organisation assess the contribution required by the redesigned role?"
    ]
  ],
  "Each role-specification element addresses a distinct operating requirement. Responsibilities define the work, delegated authority establishes permitted decisions, reporting and escalation clarify support arrangements, and performance measures identify the intended contribution. Together, they make the redesigned role understandable and practically performable."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O2c-07", "W10O2c", 2,
  "Qasr must specify the Guest Host reporting relationship, but the slides do not identify the final reporting line. What should the role designer do?",
  [
    "Recommend and justify an appropriate reporting relationship while clearly identifying it as a proposed design decision",
    "State that Guest Hosts already report directly to the revenue manager because rate discrepancies involve revenue policy",
    "Assume that every Guest Host reports directly to the chief operating officer because the redesigned process crosses departments",
    "Omit reporting and escalation arrangements because a RACI matrix makes organisational support unnecessary"
  ],
  "The Week 10 material requires appropriate reporting and escalation arrangements but does not establish Qasr's final Guest Host reporting line. The designer should therefore propose and justify an arrangement rather than invent an existing one. Reporting must support operational coordination and decisions outside delegated authority."
);
 
TF("W10O2c-08", "W10O2c", 2,
  "A Guest Host role specification can be considered complete once the AED 400 waiver is documented, even if the employee's performance objectives still reward conventional front-desk transactions.",
  false,
  "This statement is false. Formal delegation addresses an important authority gap, but a workable role also requires aligned performance measures and incentives. Qasr's inherited check-ins-per-shift and transaction-time objectives may discourage the exception handling expected from Guest Hosts. The role must be designed as a coherent whole."
);
 
V("W10O2c-09", "W10O2c", 2,
  "Which diagram best represents a proposed Guest Host performance arrangement that supports the redesigned role?",
  [
    [
      D.flow([
        "Eligible|exception",
        "Appropriate|resolution",
        "Quality|sample",
        "Performance|review"
      ]),
      "Recognise appropriate exception resolution while checking decision quality and compliance with delegated authority"
    ],
    [
      D.flow([
        "Guest|exception",
        "Transaction|time",
        "Speed|reward",
        "Quality|ignored"
      ]),
      "Reward speed without considering whether the guest's exception was resolved appropriately"
    ],
    [
      D.flow([
        "Rate|discrepancy",
        "Approve|every case",
        "Resolution|count"
      ]),
      "Reward every local approval regardless of the employee's delegated authority"
    ],
    [
      D.flow([
        "New|role",
        "Old|check-in target",
        "No|review"
      ]),
      "Continue evaluating Guest Hosts exclusively through conventional front-desk transaction volume"
    ]
  ],
  "A proposed measure should recognise eligible exceptions resolved appropriately without unnecessary escalation. Quality sampling is necessary because employees must not be rewarded for inappropriate approvals or decisions beyond their authority. The old transaction objectives should be removed where they contradict the redesigned contribution."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O2c-10", "W10O2c", 3,
  "Qasr's Guest Host specification should formally document the {1} waiver boundary and include a {2} for decisions exceeding the employee's authority.",
  [
    ["AED 400", "AED 4,000", "AED 40"],
    ["defined escalation route", "requirement to approve every case", "prohibition on consulting managers"]
  ],
  "The Guest Host role includes authority to waive eligible rate discrepancies up to AED 400 without referral. That authority should appear in formal delegation arrangements and be supported by a clear escalation route for cases outside the permitted boundary. The specification must enable appropriate local judgement without creating unrestricted approval authority."
);
 
OR("W10O2c-11", "W10O2c", 3,
  "Arrange these management checks in a logical sequence for determining whether the repaired Guest Host role is operationally ready.",
  [
    "Verify that the updated role description reflects the redesigned arrival responsibilities",
    "Check that RACI, reporting and delegated authority are consistent with that verified description",
    "Confirm that measures and the reward review address the work in the verified role",
    "Assess Guest Hosts with realistic cases once the role arrangements are confirmed",
    "Monitor adoption through a named owner to see whether assessed employees perform the intended process"
  ],
  "Each check relies on the previous one. Authority, measures and reward can only be judged against a verified role description, and employees can only be assessed fairly once those arrangements are in place. Adoption monitoring then shows whether assessed employees actually perform the redesigned process in daily operations."
);
 
MA("W10O2c-12", "W10O2c", 3,
  "Match each documented Qasr weakness to the most appropriate proposed role-design correction.",
  [
    [
      "Job descriptions issued three weeks after go-live",
      "Establish timely role definitions aligned with the redesigned process"
    ],
    [
      "AED 400 waiver absent from formal delegation",
      "Document decision rights and escalation boundaries"
    ],
    [
      "Inherited check-in volume and transaction-time objectives",
      "Replace contradictory measures with relevant outcomes and quality safeguards"
    ],
    [
      "Induction completed without capability testing",
      "Assess employee judgement through realistic exception cases"
    ]
  ],
  "The observed weaknesses require different but connected corrections. Updated role definitions clarify responsibilities, formal delegation supports appropriate decisions, revised measures reinforce the intended contribution, and capability assessment establishes readiness. These are proposed repairs; the Week 10 case does not establish that Qasr has already implemented them."
);

// W10O3a · Training for judgement, not just buttons
// Lesson l3 · Outcome O3 · CLOs K3, S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O3a-01", "W10O3a", 1,
  "Why is Qasr's completed four-hour induction insufficient evidence that Guest Hosts are ready for their redesigned responsibilities?",
  [
    "Attendance confirms participation but does not demonstrate the ability to investigate exceptions and exercise appropriate judgement",
    "Induction attendance is irrelevant because the People phase excludes employee training and capability development",
    "Every Guest Host must independently approve all rate discrepancies before the organisation can assess readiness",
    "The induction cannot be considered complete until kiosk adoption reaches one hundred percent at every pilot property"
  ],
  "All twenty-two Guest Hosts attended the four-hour induction, but their capability was not tested afterwards. Attendance demonstrates participation in a learning activity, not competence in handling unfamiliar exceptions. The People phase requires practical capability assessment because the redesigned role involves judgement, delegated authority and appropriate escalation."
);
 
DR("W10O3a-02", "W10O3a", 1,
  "System training explains {1}, while process training explains {2} when employees perform redesigned work.",
  [
    ["how to operate the interface", "why an exception requires escalation", "whether the organisation has achieved its benefits"],
    ["why actions are required and what should happen next", "which buttons appear on the screen", "how many employees attended induction"]
  ],
  "System training develops the ability to operate an interface and complete technical actions. Process training explains why actions are required, what should happen next and when judgement or escalation is necessary. Guest Hosts need both because correct kiosk operation does not automatically produce appropriate exception decisions."
);
 
V("W10O3a-03", "W10O3a", 1,
  "Which diagram best represents a credible approach to developing and demonstrating Guest Host capability?",
  [
    [
      D.flow([
        "Identify|capability gaps",
        "Practise|realistic cases",
        "Assess|judgement",
        "Address|remaining gaps"
      ]),
      "Identify required capabilities, practise realistic exceptions, assess decisions and provide targeted support"
    ],
    [
      D.flow([
        "Schedule|induction",
        "Record|attendance",
        "Declare|readiness"
      ]),
      "Treat attendance at the scheduled induction as sufficient proof of employee competence"
    ],
    [
      D.flow([
        "Demonstrate|kiosk buttons",
        "Confirm|interface use",
        "Assume|decision quality"
      ]),
      "Use correct interface operation as proof that employees can make appropriate exception decisions"
    ],
    [
      D.flow([
        "Issue|job title",
        "Assign|responsibility",
        "Assume|capability"
      ]),
      "Assume that employees acquire the necessary judgement when their redesigned job titles are issued"
    ]
  ],
  "The Week 10 slides emphasise realistic worked examples, safe practice and capability assessment. Employees must demonstrate that they can investigate exceptions, apply decision rules and escalate appropriately. Training attendance, interface familiarity and new job titles cannot independently establish operational readiness."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O3a-04", "W10O3a", 1,
  "Qasr's people workstream was reported green because all twenty-two Guest Hosts attended induction, although their capability had not been tested.",
  true,
  "This statement is true. The people workstream was green on the basis of completed induction attendance. However, no post-induction capability assessment had been conducted. The green status therefore confirms completion of a training activity rather than demonstrated readiness to perform the redesigned Guest Host role."
);
 
OR("W10O3a-05", "W10O3a", 2,
  "Arrange these activities in a logical sequence for developing Guest Hosts' judgement through realistic training.",
  [
    "Identify the exception decisions and capabilities required by the redesigned Guest Host role",
    "Present realistic cases involving rate discrepancies and delegated authority",
    "Allow employees to attempt decisions in a safe practice environment",
    "Provide feedback explaining appropriate decisions and escalation boundaries",
    "Assess whether employees can apply the learning to unfamiliar exception cases"
  ],
  "Effective capability development begins with the decisions employees must perform. Realistic cases allow Guest Hosts to practise applying the process, while feedback helps correct misunderstandings safely. Assessment using unfamiliar cases provides evidence that employees can transfer their learning beyond the examples used during training."
);
 
MA("W10O3a-06", "W10O3a", 2,
  "Match each capability-development activity to the evidence or learning it provides.",
  [
    [
      "System demonstration",
      "Shows employees how to operate the kiosk interface and record actions"
    ],
    [
      "Process explanation",
      "Develops understanding of why actions are required and when escalation is appropriate"
    ],
    [
      "Safe worked-case practice",
      "Allows employees to exercise judgement and learn from mistakes without affecting actual guests"
    ],
    [
      "Practical capability assessment",
      "Tests whether employees can make appropriate decisions in realistic situations"
    ]
  ],
  "Different learning activities serve different purposes. System demonstrations develop interface familiarity, while process explanations establish the reasoning behind actions. Safe practice allows employees to develop judgement, and practical assessment provides evidence that they can apply the required capabilities during redesigned work."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O3a-07", "W10O3a", 2,
  "A Guest Host correctly operates the kiosk but approves a rate discrepancy outside the employee's delegated authority. What does this reveal?",
  [
    "Correct system operation does not establish the process judgement needed to respect decision boundaries",
    "The employee has demonstrated full capability because the kiosk accepted the transaction",
    "The employee should receive unrestricted waiver authority because technical proficiency removes the need for escalation",
    "The redesigned process should eliminate all human exception handling because every judgement error proves automation is preferable"
  ],
  "An employee may understand how to operate the kiosk while misunderstanding when a waiver is appropriate. Process capability includes recognising decision boundaries and escalating cases beyond delegated authority. Practical assessment must therefore examine decision quality rather than only technical completion of transactions."
);
 
TF("W10O3a-08", "W10O3a", 2,
  "Repeated managerial referrals by Guest Hosts prove that all affected employees lack training rather than documented decision authority.",
  false,
  "This statement is false. Repeated referrals may reflect capability gaps, unclear authority or other operating difficulties. Qasr's formal delegation schedule does not document the AED 400 waiver, while individual capability remains untested. The organisation must investigate the causes before assuming that additional training alone will resolve the behaviour."
);
 
V("W10O3a-09", "W10O3a", 2,
  "Which diagram best distinguishes an authority problem from a capability problem when a Guest Host repeatedly escalates rate discrepancies?",
  [
    [
      D.flow([
        "Observe|escalation",
        "Check|formal authority",
        "Assess|judgement",
        "Choose|targeted remedy"
      ]),
      "Investigate documented authority and demonstrated capability before selecting corrective action"
    ],
    [
      D.flow([
        "Observe|escalation",
        "Assume|resistance",
        "Demand|compliance"
      ]),
      "Treat repeated referral as conclusive evidence that employees deliberately oppose the redesign"
    ],
    [
      D.flow([
        "Observe|escalation",
        "Repeat|induction",
        "Ignore|delegation"
      ]),
      "Repeat training without examining whether employees possess formal permission to decide"
    ],
    [
      D.flow([
        "Observe|escalation",
        "Increase|authority",
        "Ignore|decision quality"
      ]),
      "Expand employee authority without checking whether employees can exercise judgement appropriately"
    ]
  ],
  "Repeated escalation does not establish a single cause. An authority gap exists when employees lack clear permission to make expected decisions, while a capability gap exists when employees cannot perform those decisions appropriately. Qasr should investigate both before selecting training, delegation changes or other support."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O3a-10", "W10O3a", 3,
  "A Guest Host who understands the waiver rules but lacks documented permission faces {1}. A Guest Host who has permission but cannot apply the rules correctly faces a {2}.",
  [
    ["an authority gap", "an adoption measurement gap", "a technology procurement gap"],
    ["capability gap", "formal reporting gap", "benefits forecasting gap"]
  ],
  "An authority gap concerns whether employees are formally permitted to make the decisions expected of them. A capability gap concerns whether employees possess the knowledge and judgement to make those decisions appropriately. The distinction matters because formal delegation and capability development address different organisational problems."
);
 
OR("W10O3a-11", "W10O3a", 3,
  "Arrange these management activities in a logical sequence for replacing Qasr's attendance-only readiness report with capability evidence.",
  [
    "Define the decisions and behaviours Guest Hosts must demonstrate",
    "Develop realistic assessment cases covering eligible waivers and required escalation",
    "Observe employees making decisions and explaining their reasoning",
    "Identify individual capability gaps and provide targeted support",
    "Report assessed readiness and unresolved risks to the programme sponsor"
  ],
  "A meaningful readiness assessment begins with clearly defined capabilities. Realistic cases and observed decisions provide evidence about employee judgement. Targeted support addresses identified gaps, while reporting assessed readiness and unresolved risks gives the sponsor a stronger basis for decisions than induction attendance alone."
);
 
MA("W10O3a-12", "W10O3a", 3,
  "Match each Qasr readiness observation to the conclusion it can legitimately support.",
  [
    [
      "All twenty-two Guest Hosts attended induction",
      "The scheduled induction activity was completed for the entire group"
    ],
    [
      "No post-induction capability test was conducted",
      "Individual ability to perform the redesigned decisions remains unverified"
    ],
    [
      "Nine Guest Hosts refer every rate discrepancy",
      "A repeated escalation pattern exists and its causes require investigation"
    ],
    [
      "The AED 400 waiver is absent from formal delegation",
      "The organisation has a documented authority gap requiring correction"
    ]
  ],
  "Each observation supports a different conclusion. Attendance establishes participation, while the absence of assessment leaves capability unverified. Repeated referrals justify investigating their causes but do not prove employee resistance or incompetence. Missing formal delegation is a documented organisational weakness that training alone cannot correct."
);

// W10O3b · One organisation, two processes
// Lesson l3 · Outcome O3 · CLOs K3, S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O3b-01", "W10O3b", 1,
  "What does process adoption measure after a redesigned process has gone live?",
  [
    "The proportion of relevant cases genuinely following the redesigned process",
    "The proportion of employees who attended the scheduled induction",
    "The percentage of planned technology-development activities completed",
    "The proportion of process diagrams formally approved by management"
  ],
  "Adoption measures whether actual cases follow the redesigned process. It differs from implementation milestones, which establish whether planned activities or technical components have been delivered. Adoption evidence helps managers understand whether the organisation has genuinely changed its operating behaviour."
);
 
DR("W10O3b-02", "W10O3b", 1,
  "Eleven weeks after go-live, Qasr reports kiosk adoption of {1}, while {2} of arrivals are handled at the desk.",
  [
    ["65%", "29%", "9%"],
    ["29%", "65%", "11%"]
  ],
  "Qasr reports 65% kiosk adoption and 29% desk-handled arrivals at week eleven. These are observed case figures. The desk-handled share must not automatically be classified as workaround use because some guests may require legitimate assistance after their cases are rejected by the kiosk."
);
 
V("W10O3b-03", "W10O3b", 1,
  "Which diagram best represents the distinction between implementation and adoption?",
  [
    [
      D.flow([
        "Process|implemented",
        "Actual cases|observed",
        "Adoption|measured",
        "Behaviour|evaluated"
      ]),
      "Implementation establishes availability, while adoption examines whether actual cases follow the redesigned process"
    ],
    [
      D.flow([
        "Technology|installed",
        "Milestone|completed",
        "Full adoption|assumed"
      ]),
      "Completing a technical milestone is treated as proof that all relevant cases follow the redesigned process"
    ],
    [
      D.flow([
        "Induction|attended",
        "Employees|registered",
        "Adoption|confirmed"
      ]),
      "Training attendance is treated as sufficient evidence that the redesigned process is being used"
    ],
    [
      D.flow([
        "Process|approved",
        "Design|documented",
        "Benefits|realised"
      ]),
      "Approval of the process design is treated as proof of operational adoption and realised benefits"
    ]
  ],
  "Implementation and adoption answer different questions. Implementation concerns whether the redesigned process has been introduced, while adoption concerns whether actual cases follow it. Qasr therefore needs operating evidence rather than relying exclusively on completed milestones or induction attendance."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O3b-04", "W10O3b", 1,
  "Every desk-handled arrival at Qasr must be classified as an inappropriate workaround because the redesigned process uses self-service kiosks.",
  false,
  "This statement is false. Property managers report that most desk-handled arrivals involve guests whose cases were rejected by the kiosk. Some desk activity may therefore provide legitimate exception assistance. Qasr must classify the cases before determining which represent necessary support and which involve avoidable departures from the intended process."
);
 
OR("W10O3b-05", "W10O3b", 2,
  "Arrange these activities in a logical sequence for investigating alternative arrival paths at Qasr.",
  [
    "Identify arrivals that do not follow the expected kiosk-supported path",
    "Record the type of alternative operating path used",
    "Investigate why the guest or employee followed that path",
    "Distinguish legitimate exception handling from avoidable workarounds",
    "Use the findings to select and monitor appropriate corrective action"
  ],
  "Workaround analysis begins by observing alternative operating paths and recording their characteristics. Investigating causes helps distinguish necessary exception handling from avoidable departures from the redesign. Corrective action should follow that diagnosis rather than assuming that every alternative path represents employee resistance."
);
 
MA("W10O3b-06", "W10O3b", 2,
  "Match each adoption-related concept to its meaning.",
  [
    [
      "Implementation milestone",
      "Evidence that a planned delivery activity or technical component has been completed"
    ],
    [
      "Process adoption",
      "Evidence that actual cases genuinely follow the redesigned process"
    ],
    [
      "Workaround",
      "An alternative method used instead of the intended operating process"
    ],
    [
      "Legitimate exception handling",
      "Necessary human assistance consistent with the redesigned process's operating requirements"
    ]
  ],
  "Implementation milestones establish delivery progress, while adoption measures actual use. Workarounds are alternative methods that may reveal unresolved design or operating problems. Legitimate exception handling should not automatically be treated as an inappropriate workaround because the redesigned process may require human assistance."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O3b-07", "W10O3b", 2,
  "One Qasr pilot property has reinstated a permanent desk position. Which interpretation is most defensible?",
  [
    "The desk may protect necessary guest service or preserve avoidable old practices, so its actual cases must be investigated",
    "The desk proves that every employee at the property has rejected the redesigned arrival process",
    "The desk demonstrates that the redesigned process has achieved full adoption at the property",
    "The desk must be removed immediately because every kiosk-rejected guest should complete check-in without human assistance"
  ],
  "Reinstating the desk has competing interpretations. It may protect service continuity for guests whose exceptions require assistance, or it may encourage unnecessary returns to conventional check-in. The available evidence does not establish which interpretation is correct. Qasr should examine the cases handled before deciding what action is appropriate."
);
 
TF("W10O3b-08", "W10O3b", 2,
  "The sixteen-week adoption and workaround chart in the Week 10 slides represents Qasr's verified operating history.",
  false,
  "This statement is false. The sixteen-week chart is illustrative rather than Qasr's observed operating history. Its adoption plateau near 65% and approximate 9% workaround endpoint must not be attributed to Qasr. The case establishes 65% kiosk adoption at week eleven but does not provide a verified sixteen-week workaround series."
);
 
V("W10O3b-09", "W10O3b", 2,
  "Which diagram best represents an appropriate sponsor response to incomplete adoption?",
  [
    [
      D.flow([
        "Measure|adoption",
        "Classify|exceptions",
        "Investigate|workarounds",
        "Correct|causes",
        "Review|results"
      ]),
      "Use operating evidence to distinguish necessary exceptions from avoidable workarounds and guide corrective action"
    ],
    [
      D.flow([
        "Observe|desk activity",
        "Assume|resistance",
        "Demand|compliance"
      ]),
      "Treat all alternative operating paths as deliberate employee resistance without investigating their causes"
    ],
    [
      D.flow([
        "Kiosk|installed",
        "Project|green",
        "Stop|monitoring"
      ]),
      "Stop monitoring adoption once the technology is operational and delivery milestones are complete"
    ],
    [
      D.flow([
        "Observe|low adoption",
        "Remove|human assistance",
        "Ignore|exceptions"
      ]),
      "Eliminate human assistance without examining whether kiosk-rejected cases require legitimate support"
    ]
  ],
  "The sponsor should use adoption and workaround evidence to understand how the redesigned process operates. Alternative paths must be classified because some may be necessary while others reveal design weaknesses. Corrective action should address identified causes and be evaluated through subsequent operating results."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O3b-10", "W10O3b", 3,
  "The Week 10 slides recommend measuring adoption {1} from go-live and recording workarounds by {2}.",
  [
    ["weekly", "only at project closure", "only after all benefits are realised"],
    ["type and frequency", "employee age and job grade", "training attendance and course duration"]
  ],
  "Adoption should be measured weekly from the beginning of go-live so the programme can identify changes in actual process use. Workarounds should be recorded by type and frequency because different alternative practices may have different causes. This evidence helps the sponsor identify persistent weaknesses and coordinate corrective action."
);
 
OR("W10O3b-11", "W10O3b", 3,
  "Arrange these steps for establishing accountable adoption monitoring during Qasr's pilot.",
  [
    "Define which arrivals should follow the redesigned process",
    "Specify how genuine adoption and alternative paths will be recorded for those arrivals",
    "Assign a named owner accountable for that recording method",
    "Have the owner collect and report the evidence weekly from go-live",
    "Investigate persistent deviations that the weekly reports reveal and coordinate corrective action"
  ],
  "Monitoring starts with a clear definition of the intended path, because adoption and workarounds cannot be recorded without it. A named owner is then made accountable for the recording method and reports weekly from go-live. The weekly reports reveal persistent deviations, which the programme investigates instead of relying on delivery milestones."
);
 
MA("W10O3b-12", "W10O3b", 3,
  "Match each Week 10 observation or illustration to the conclusion it legitimately supports.",
  [
    [
      "Qasr's 65% kiosk adoption at week eleven",
      "The observed proportion of arrivals using kiosks at that point in the pilot"
    ],
    [
      "Qasr's 29% desk-handled arrivals",
      "A reported alternative arrival path whose cases require further classification"
    ],
    [
      "One pilot property reinstated a permanent desk",
      "An operating decision that may protect service or undermine redesign depending on actual use"
    ],
    [
      "Illustrative sixteen-week adoption and workaround chart",
      "A conceptual example of changing adoption and workaround patterns rather than verified Qasr history"
    ]
  ],
  "The Week 10 case establishes specific observations about Qasr at week eleven, including kiosk adoption, desk-handled arrivals and the reinstated desk. These observations require careful interpretation. The separate sixteen-week chart illustrates possible adoption and workaround trends and must not be treated as additional verified Qasr operating data."
);

// W10O3c · The knowledge the redesign might lose
// Lesson l3 · Outcome O3 · CLOs K3, S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O3c-01", "W10O3c", 1,
  "Why should Qasr capture experienced Front Desk Agents' practical knowledge before their roles change materially?",
  [
    "Their experience may contain undocumented judgement about guest exceptions that remains valuable in the redesigned process",
    "Every established front-desk procedure must be preserved unchanged because experienced employees developed it",
    "The redesigned kiosks cannot operate until every experienced employee has approved the technical architecture",
    "Documenting employee knowledge removes the need to define new responsibilities or delegated decision authority"
  ],
  "Experienced employees often possess practical knowledge that formal procedures and system records do not fully capture. Their understanding of unusual guest situations, operational dependencies and appropriate decisions can strengthen the redesigned process. Qasr should preserve useful judgement without automatically retaining inefficient practices from the previous process."
);
 
DR("W10O3c-02", "W10O3c", 1,
  "The People phase should capture experienced employees' knowledge through explicit {1} and realistic {2} before materially changing their roles.",
  [
    ["decision rules", "transaction-volume targets", "job-grade assumptions"],
    ["worked exceptions", "attendance registers", "technology procurement schedules"]
  ],
  "The Week 10 slides recommend capturing practical knowledge through explicit decision rules and worked exceptions. These methods preserve the reasoning employees use when handling unusual situations. They help the organisation transfer valuable expertise into the redesigned process rather than relying entirely on individual memory."
);
 
V("W10O3c-03", "W10O3c", 1,
  "Which diagram best represents a sound approach to preserving practical knowledge during Qasr's role transition?",
  [
    [
      D.flow([
        "Experienced|employee",
        "Practical|reasoning",
        "Worked|exception",
        "Shared|guidance"
      ]),
      "Capture experienced employees' decision reasoning and translate it into reusable guidance"
    ],
    [
      D.flow([
        "Old|role removed",
        "Experience|discarded",
        "New|role introduced"
      ]),
      "Discard previous employee knowledge when the redesigned role replaces the old position"
    ],
    [
      D.flow([
        "Old|procedures",
        "Copy|unchanged",
        "New|process"
      ]),
      "Preserve every previous procedure without assessing whether it supports the redesigned process"
    ],
    [
      D.flow([
        "System|records",
        "All knowledge|assumed",
        "No|employee input"
      ]),
      "Assume that system records contain all the practical judgement needed for the redesigned process"
    ]
  ],
  "The People phase should preserve useful knowledge by capturing how experienced employees recognise and resolve exceptions. Worked cases and decision rules make that reasoning available to others. The objective is to retain valuable expertise while replacing outdated activities and unnecessary handoffs."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O3c-04", "W10O3c", 1,
  "Formal process diagrams and system records necessarily capture all the practical judgement that experienced employees use when resolving unusual cases.",
  false,
  "This statement is false. Process diagrams describe activities and system records capture selected information, but neither necessarily explains the reasoning behind experienced employees' decisions. Practical knowledge may remain undocumented, which is why the People phase recommends capturing decision rules and worked exceptions."
);
 
OR("W10O3c-05", "W10O3c", 2,
  "Arrange these activities in a logical sequence for preserving Guest Hosts' practical exception-handling knowledge.",
  [
    "Identify experienced employees who understand recurring and unusual guest exceptions",
    "Ask them to explain how they recognise problems and evaluate relevant evidence",
    "Document the decision reasoning and appropriate escalation boundaries",
    "Develop worked examples that reflect the redesigned Guest Host responsibilities",
    "Use the examples to support training and assess whether employees can apply the knowledge"
  ],
  "Knowledge capture begins by identifying relevant practical expertise and understanding the reasoning behind decisions. That reasoning can then be documented through decision rules and worked exceptions. Applying the examples during training helps transfer useful knowledge into the redesigned role without preserving unnecessary old practices."
);
 
MA("W10O3c-06", "W10O3c", 2,
  "Match each knowledge-management concept to its meaning in the People phase.",
  [
    [
      "Practical process knowledge",
      "Experience-based understanding of unusual situations and operational dependencies"
    ],
    [
      "Explicit decision rule",
      "Documented guidance explaining when a particular decision or escalation is appropriate"
    ],
    [
      "Worked exception",
      "A realistic case explaining the evidence, reasoning and response to an unusual situation"
    ],
    [
      "Knowledge transfer",
      "Making useful employee expertise available to others performing the redesigned process"
    ]
  ],
  "Practical knowledge develops through experience and may not appear in formal documentation. Decision rules and worked exceptions help make that knowledge explicit. Knowledge transfer allows employees performing the redesigned process to benefit from expertise previously held by particular individuals."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O3c-07", "W10O3c", 2,
  "Two of Qasr's twenty-two Guest Hosts have resigned. Which conclusion is supported by the available evidence?",
  [
    "The departures justify investigating retention and knowledge-loss risks, but the employees' individual reasons for leaving remain unknown",
    "Both employees resigned because they opposed the redesigned Guest Host responsibilities",
    "The resignations prove that the AED 400 waiver authority caused employee dissatisfaction",
    "The departures establish that the redesigned process has permanently lost all practical front-desk knowledge"
  ],
  "The Week 10 case reports two resignations but does not establish the individuals' motives. The departures nevertheless justify investigating retention risks and possible loss of practical expertise. Managers should distinguish observed facts from unverified explanations and address significant risks through the programme's risk arrangements."
);
 
TF("W10O3c-08", "W10O3c", 2,
  "Qasr should preserve every previous front-desk practice because retaining experienced employees' knowledge requires keeping the old process unchanged.",
  false,
  "This statement is false. Knowledge preservation does not mean preserving every previous activity or workaround. Qasr should retain useful judgement about guest exceptions while removing unnecessary handoffs and practices that contradict the redesigned arrival process. Valuable expertise and outdated routines must be distinguished."
);
 
V("W10O3c-09", "W10O3c", 2,
  "Which diagram best represents an appropriate response to uncertainty about employees' future roles?",
  [
    [
      D.flow([
        "Role|uncertainty",
        "Employee|concerns",
        "Retention|risk assessed",
        "Support|planned"
      ]),
      "Investigate transition concerns, assess retention risks and provide appropriate organisational support"
    ],
    [
      D.flow([
        "Role|uncertainty",
        "Assume|resistance",
        "Ignore|concerns"
      ]),
      "Treat uncertainty about future responsibilities as proof of deliberate resistance"
    ],
    [
      D.flow([
        "Employee|resigns",
        "Knowledge|lost",
        "Begin|risk review"
      ]),
      "Delay consideration of retention risks until experienced employees have already departed"
    ],
    [
      D.flow([
        "New|job title",
        "Future|assumed clear",
        "No|discussion"
      ]),
      "Assume that assigning a redesigned job title eliminates uncertainty about employees' future contribution"
    ]
  ],
  "The People phase should help employees understand their place in the redesigned organisation. Uncertainty about future roles may create retention risks that deserve investigation and planned mitigation. Managers should not assume resistance or wait until valuable employees leave before considering knowledge and retention risks."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O3c-10", "W10O3c", 3,
  "Qasr should record significant employee-retention concerns in the programme {1} and capture practical knowledge {2} roles change materially.",
  [
    ["risk register", "transaction register", "kiosk installation checklist"],
    ["before", "only after", "regardless of whether"]
  ],
  "Retention risks belong in the programme risk register because losing experienced employees can threaten implementation and operational continuity. Practical knowledge should be captured before roles change materially, while employees can still explain their reasoning. Waiting until after departures may make important expertise difficult to recover."
);
 
OR("W10O3c-11", "W10O3c", 3,
  "Arrange these management actions in a logical sequence for addressing potential knowledge loss during Qasr's Guest Host transition.",
  [
    "Identify experienced employees who hold knowledge about difficult arrival exceptions",
    "Discuss with them how their knowledge and future responsibilities fit the redesigned process",
    "Capture the decision rules and worked exceptions they explain before their roles change",
    "Use the captured knowledge to judge which departures would be most costly, and record those retention risks",
    "Build the captured rules and worked exceptions into Guest Host guidance, practice and assessment"
  ],
  "Qasr must know who holds the knowledge before it can discuss and capture it, and capture must happen before roles change. The captured knowledge then shows which departures would hurt most, so those retention risks go on the programme risk register. Finally, the rules and worked exceptions are built into guidance, practice and assessment for the new role."
);
 
MA("W10O3c-12", "W10O3c", 3,
  "Match each Qasr observation or proposed action to its appropriate interpretation.",
  [
    [
      "Two Guest Hosts have resigned",
      "An observed departure pattern that warrants investigation without assuming individual motives"
    ],
    [
      "Experienced agents understand unusual booking discrepancies",
      "A potential source of valuable practical knowledge for the redesigned arrival process"
    ],
    [
      "Develop worked examples of difficult guest exceptions",
      "A proposed method for preserving and transferring employee judgement"
    ],
    [
      "Clarify employees' future Guest Host responsibilities",
      "A proposed way to reduce uncertainty about their contribution to the redesigned organisation"
    ]
  ],
  "The resignations are established facts, but their causes remain unverified. Experienced employees may hold valuable knowledge about unusual guest situations. Worked examples can preserve that expertise, while clearer future-role arrangements can address transition uncertainty. These proposed actions support change without assuming that every employee concern represents resistance."
);

// W10O2d · Repairing the Guest Host specification
// Lesson l4 · Outcome O2 · CLO S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O2d-01", "W10O2d", 1,
  "Which proposal most effectively repairs the documented weaknesses in Qasr's Guest Host role?",
  [
    "Formalise decision authority, align responsibilities and measures, review rewards, assess capability and assign adoption ownership",
    "Repeat the four-hour induction while retaining the existing delegation schedule and transaction-based performance objectives",
    "Increase the Guest Host grade automatically and permit every rate discrepancy to be approved without escalation",
    "Restore conventional front-desk responsibilities at all properties and discontinue monitoring redesigned process adoption"
  ],
  "Qasr's weaknesses involve several connected organisational arrangements. The Guest Host role needs documented authority, coherent responsibilities, relevant performance measures, a justified reward review and demonstrated capability. Adoption ownership is also required. Correcting only one element may leave other contradictions that continue undermining the redesigned process."
);
 
DR("W10O2d-02", "W10O2d", 1,
  "Qasr should document the Guest Host's {1} waiver authority in the formal delegation schedule and replace conflicting throughput objectives with measures of {2}.",
  [
    ["AED 400", "AED 4,000", "AED 40"],
    ["appropriate exception resolution", "individual kiosk transactions completed", "induction hours attended"]
  ],
  "Guest Hosts may waive eligible rate discrepancies up to AED 400, but that authority remains absent from formal delegation. The inherited transaction objectives also fail to reflect the redesigned exception-handling responsibilities. A coherent repair should document the decision boundary and introduce relevant outcome measures supported by decision-quality safeguards."
);
 
V("W10O2d-03", "W10O2d", 1,
  "Which diagram best represents a complete repair of Qasr's Guest Host role?",
  [
    [
      D.flow([
        "Role|clarified",
        "Authority|documented",
        "Measures|aligned",
        "Capability|assessed",
        "Adoption|owned"
      ]),
      "Repair responsibilities, delegation, performance arrangements, capability and adoption accountability"
    ],
    [
      D.flow([
        "Induction|repeated",
        "Attendance|recorded",
        "Readiness|assumed"
      ]),
      "Repeat training and treat attendance as sufficient evidence of readiness"
    ],
    [
      D.flow([
        "Job title|updated",
        "Old measures|retained",
        "Authority|informal"
      ]),
      "Update the title while preserving contradictory measures and undocumented authority"
    ],
    [
      D.flow([
        "Waivers|unrestricted",
        "Quality|unchecked",
        "Escalation|removed"
      ]),
      "Expand local decisions without maintaining accountability, quality controls or escalation boundaries"
    ]
  ],
  "A complete repair addresses the organisational arrangements required to perform the redesigned role. Formal authority and aligned measures support appropriate behaviour, while capability assessment tests employee readiness. Adoption ownership helps determine whether the corrected arrangements improve actual operating practice."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O2d-04", "W10O2d", 1,
  "Qasr has already implemented the proposed Guest Host corrections, including revised performance measures and formal AED 400 delegation.",
  false,
  "This statement is false. The Week 10 case documents missing formal delegation and inherited performance objectives. Formalising authority and replacing contradictory measures are proposed corrective actions, not improvements already achieved. Their implementation and effectiveness would require subsequent verification."
);
 
OR("W10O2d-05", "W10O2d", 2,
  "Arrange these actions in a logical sequence for repairing the Guest Host's authority and accountability arrangements.",
  [
    "Identify the decisions Guest Hosts must make under the redesigned arrival process",
    "Clarify the accountable roles and escalation relationships for those decisions",
    "Document the permitted AED 400 waiver and its conditions in formal delegation",
    "Align the job description and operating guidance with the documented decision rights",
    "Assess whether Guest Hosts apply the authority and escalation rules appropriately"
  ],
  "A defensible repair begins by identifying the decisions required by the redesigned role. Accountability and escalation must then be clarified, followed by formal documentation of the permitted authority. Consistent role guidance and practical assessment help ensure employees can exercise their decision rights appropriately."
);
 
MA("W10O2d-06", "W10O2d", 2,
  "Match each documented Qasr weakness to the corrective action that addresses it most directly.",
  [
    [
      "AED 400 waiver absent from formal delegation",
      "Document the permitted decision boundary and escalation arrangements"
    ],
    [
      "Old check-in volume and transaction-time objectives",
      "Replace conflicting measures with relevant outcomes and quality safeguards"
    ],
    [
      "Induction completed without capability testing",
      "Assess judgement through realistic guest exception cases"
    ],
    [
      "Adoption requires accountable monitoring",
      "Assign a named owner to measure and report actual process use"
    ]
  ],
  "Each weakness requires a corresponding organisational correction. Formal delegation addresses unclear authority, revised measures address conflicting incentives, practical assessment addresses unverified capability, and adoption ownership provides accountability for monitoring operating behaviour. The corrections should reinforce one another."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O2d-07", "W10O2d", 2,
  "Why should Qasr include a quality sample when proposing to measure exceptions resolved without unnecessary escalation?",
  [
    "It checks that resolutions are appropriate and remain within delegated authority rather than rewarding resolution counts alone",
    "It ensures every rate discrepancy is approved locally regardless of the amount or circumstances",
    "It allows management to retain the old transaction-volume objective without creating conflicting incentives",
    "It replaces the need for formal delegation because employees can make any decision that improves their resolution count"
  ],
  "A resolution measure without quality safeguards could encourage inappropriate approvals or avoidance of necessary escalation. Quality sampling examines whether decisions respect policy and delegated authority. This protects the intended process outcome while discouraging employees from increasing their recorded performance through unsuitable decisions."
);
 
TF("W10O2d-08", "W10O2d", 2,
  "Qasr should automatically increase every Guest Host's grade because the redesigned role requires more judgement than conventional front-desk transactions.",
  false,
  "This statement is false. Materially changed responsibilities justify reviewing grade and reward arrangements, but the slides do not establish the appropriate revised grade. A justified decision requires evaluating the actual responsibilities and organisational requirements rather than assuming that a new title or greater judgement automatically warrants an increase."
);
 
V("W10O2d-09", "W10O2d", 2,
  "Which diagram best represents an appropriate replacement for Qasr's inherited Guest Host performance objectives?",
  [
    [
      D.flow([
        "Eligible|exception",
        "Appropriate|resolution",
        "Quality|sample",
        "Outcome|review"
      ]),
      "Recognise appropriate exception resolution while checking compliance with decision rules and delegated authority"
    ],
    [
      D.flow([
        "Check-ins|per shift",
        "Average|transaction time",
        "Old targets|retained"
      ]),
      "Continue evaluating Guest Hosts primarily through conventional front-desk transaction measures"
    ],
    [
      D.flow([
        "Every|waiver approved",
        "Resolution|count increases",
        "Quality|ignored"
      ]),
      "Reward local approval of every discrepancy without examining decision quality"
    ],
    [
      D.flow([
        "Induction|attendance",
        "Performance|assumed",
        "No outcome|measurement"
      ]),
      "Treat training participation as sufficient evidence of operational performance"
    ]
  ],
  "The redesigned role requires appropriate resolution of exceptions that kiosks cannot handle. A relevant outcome measure should recognise this contribution while checking decision quality. Contradictory old objectives should be removed because they can continue rewarding conventional transaction behaviour."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O2d-10", "W10O2d", 3,
  "Because the Week 10 slides do not establish the Guest Host's final reporting line, the role designer should present a reporting relationship as {1}, while treating the existing unchanged grade as {2}.",
  [
    ["a justified proposal", "an already implemented arrangement", "a confirmed instruction from the COO"],
    ["an observed fact requiring review", "proof that a higher grade is mandatory", "evidence that rewards have already been redesigned"]
  ],
  "The Guest Host reporting relationship must be defined, but the source does not establish its final arrangement. Any suggested reporting line should therefore be identified as a proposal. The unchanged grade is an observed fact that justifies reviewing employment arrangements, not proof that a particular replacement grade has been approved."
);
 
OR("W10O2d-11", "W10O2d", 3,
  "Arrange these checks in a logical sequence for evaluating whether Qasr's proposed role repair has improved operational readiness.",
  [
    "Verify that responsibilities, accountability and formal decision rights now agree",
    "Confirm that measures and the reward review match those agreed responsibilities and rights",
    "Assess Guest Hosts in realistic cases against the aligned role arrangements",
    "Monitor live exception handling, decision quality and adoption after the assessment",
    "Review the monitoring evidence and address any remaining authority, capability or operating weaknesses"
  ],
  "Measures can only be checked against responsibilities and rights that already agree, and employees can only be assessed against aligned arrangements. Live monitoring then shows whether assessed employees perform the redesigned work, and reviewing that evidence identifies any weaknesses that remain, instead of declaring success from completed documents."
);
 
MA("W10O2d-12", "W10O2d", 3,
  "Match each proposed Guest Host repair to the evidence that would best demonstrate its intended effect.",
  [
    [
      "Formalise the AED 400 waiver",
      "Eligible decisions are made within documented authority and cases beyond it are escalated appropriately"
    ],
    [
      "Replace contradictory performance objectives",
      "Employees are evaluated through relevant exception outcomes with decision-quality safeguards"
    ],
    [
      "Introduce practical capability assessment",
      "Guest Hosts demonstrate appropriate judgement in realistic exception cases"
    ],
    [
      "Assign adoption monitoring ownership",
      "A named owner reports actual process use and investigates persistent alternative operating paths"
    ]
  ],
  "A proposed correction should be evaluated through evidence connected to the weakness it addresses. Formal delegation should support appropriate decisions, revised measures should reinforce redesigned work, and capability assessment should demonstrate judgement. Adoption monitoring should reveal whether the organisation increasingly performs the intended process."
);

// W10O3d · The eleven-week decision
// Lesson l4 · Outcome O3 · CLOs K3, S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O3d-01", "W10O3d", 1,
  "Qasr's people workstream is green because all twenty-two Guest Hosts attended induction. What should the sponsor conclude?",
  [
    "Induction attendance is complete, but operational readiness remains unverified because employee capability was not assessed",
    "The green status proves that all Guest Hosts can independently resolve every eligible rate discrepancy",
    "The completed induction establishes that the redesigned arrival process has achieved full adoption",
    "The green status confirms that the formal delegation schedule and performance objectives have been updated"
  ],
  "All twenty-two Guest Hosts attended the four-hour induction, but no post-induction capability assessment was conducted. The green workstream status therefore confirms completion of a training activity rather than demonstrated readiness. The sponsor needs evidence of employee judgement, appropriate decisions and actual process adoption."
);
 
DR("W10O3d-02", "W10O3d", 1,
  "At week eleven, Qasr reports kiosk adoption of {1}, while {2} of the twenty-two Guest Hosts refer every rate discrepancy to a duty manager.",
  [
    ["65%", "29%", "9%"],
    ["nine", "two", "twenty-two"]
  ],
  "Qasr reports 65% kiosk adoption eleven weeks after go-live. Nine of its twenty-two Guest Hosts refer every rate discrepancy upward. These observations raise questions about process adoption and employee decision-making, but they do not establish the individual reasons for escalation."
);
 
V("W10O3d-03", "W10O3d", 1,
  "Which diagram best represents an evidence-based sponsor decision at Qasr's eleven-week review?",
  [
    [
      D.flow([
        "Review|observations",
        "Investigate|causes",
        "Prioritise|corrections",
        "Assign|owners",
        "Measure|results"
      ]),
      "Use observed evidence to diagnose weaknesses, select accountable corrective action and evaluate improvement"
    ],
    [
      D.flow([
        "Induction|completed",
        "Status|green",
        "Declare|success"
      ]),
      "Treat completed induction attendance as sufficient proof that the People phase has succeeded"
    ],
    [
      D.flow([
        "Escalations|observed",
        "Assume|resistance",
        "Demand|compliance"
      ]),
      "Treat repeated referrals as conclusive evidence of deliberate employee resistance"
    ],
    [
      D.flow([
        "Desk|reinstated",
        "Assume|failure",
        "Remove|desk"
      ]),
      "Remove the reinstated desk without examining whether it provides necessary exception assistance"
    ]
  ],
  "The sponsor should distinguish observed facts from explanations that still require investigation. Qasr has documented weaknesses involving delegation, performance objectives and untested capability. Corrective action should address defensible priorities, have accountable owners and be evaluated through subsequent operating evidence."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O3d-04", "W10O3d", 1,
  "The two Guest Host resignations prove that employees left Qasr because they opposed the redesigned arrival process.",
  false,
  "This statement is false. Qasr reports two resignations, but the available evidence does not establish why those employees left. The departures justify investigating retention and knowledge-loss risks. They do not prove resistance, dissatisfaction or any other particular individual motive."
);
 
OR("W10O3d-05", "W10O3d", 2,
  "Arrange these activities in a logical sequence for conducting Qasr's eleven-week sponsor review.",
  [
    "Separate verified operating observations from assumptions about their causes",
    "Identify documented organisational weaknesses and unresolved evidence gaps",
    "Compare plausible explanations for the observed operating behaviour",
    "Select and justify corrective priorities with accountable owners",
    "Define evidence that will show whether the corrective actions improve performance"
  ],
  "A defensible sponsor review begins with verified evidence and distinguishes it from untested explanations. Documented weaknesses provide a stronger basis for corrective action than assumptions about employee motives. Priorities should be justified, assigned to owners and evaluated through relevant operating measures."
);
 
MA("W10O3d-06", "W10O3d", 2,
  "Match each Qasr observation to the conclusion it legitimately supports.",
  [
    [
      "All twenty-two Guest Hosts attended induction",
      "The scheduled training activity was completed for the entire group"
    ],
    [
      "No post-induction capability assessment occurred",
      "Employees' ability to perform the redesigned decisions remains unverified"
    ],
    [
      "Nine Guest Hosts refer every rate discrepancy",
      "A repeated escalation pattern exists and requires investigation"
    ],
    [
      "The AED 400 waiver is absent from formal delegation",
      "A documented authority gap exists in the Guest Host role"
    ]
  ],
  "The observations support different conclusions. Attendance establishes participation, while missing assessment leaves capability unverified. Repeated referrals demonstrate a behavioural pattern without proving its cause. The absent waiver in formal delegation is a documented organisational weakness that Qasr can address directly."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O3d-07", "W10O3d", 2,
  "The sponsor must choose one immediate correction. Which proposal has the strongest direct support from Qasr's documented evidence?",
  [
    "Formalise the AED 400 waiver authority and its escalation boundary, then assess whether Guest Hosts apply the rules appropriately",
    "Remove the reinstated desk immediately because every desk-handled arrival is an inappropriate workaround",
    "Repeat induction for all Guest Hosts because the nine employees' referrals prove that training was ineffective",
    "Increase every Guest Host's grade because the two resignations prove that inadequate compensation caused the departures"
  ],
  "The AED 400 waiver is absent from formal delegation, making unclear authority an established organisational weakness. Formalising the decision boundary is therefore a defensible priority. Capability assessment should accompany the correction because the individual reasons for repeated escalation remain unverified."
);
 
TF("W10O3d-08", "W10O3d", 2,
  "Qasr's 29% desk-handled arrival share establishes that 29% of guests deliberately bypassed a functioning kiosk.",
  false,
  "This statement is false. Property managers report that most desk-handled arrivals involve guests rejected by the kiosk. Some desk activity may therefore represent legitimate exception handling. Qasr must classify the cases before determining how much activity constitutes avoidable workaround use."
);
 
V("W10O3d-09", "W10O3d", 2,
  "Which diagram best represents a balanced investigation of the permanent desk reinstated at one Qasr pilot property?",
  [
    [
      D.flow([
        "Desk|reinstated",
        "Cases|classified",
        "Reasons|investigated",
        "Service and adoption|evaluated"
      ]),
      "Investigate actual desk activity before deciding whether reinstatement protects service or undermines redesign"
    ],
    [
      D.flow([
        "Desk|reinstated",
        "Resistance|confirmed",
        "Desk|removed"
      ]),
      "Assume that restoring the desk proves employee resistance and requires immediate removal"
    ],
    [
      D.flow([
        "Desk|reinstated",
        "Service|protected",
        "Review|closed"
      ]),
      "Assume that restoring the desk necessarily improves service and requires no further investigation"
    ],
    [
      D.flow([
        "Desk|reinstated",
        "All cases|workarounds",
        "Adoption|ignored"
      ]),
      "Classify every desk-handled case as an inappropriate workaround without examining kiosk exceptions"
    ]
  ],
  "The reinstated desk has two plausible interpretations. It may protect guests whose cases require human assistance, or it may preserve avoidable conventional check-in practices. Qasr needs evidence about actual cases, operating reasons and adoption effects before deciding whether the desk should remain or change."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O3d-10", "W10O3d", 3,
  "A credible replacement for Qasr's attendance-only readiness report should include {1} and {2}, rather than treating induction completion as proof of successful change.",
  [
    ["demonstrated employee capability", "the number of induction invitations issued", "the date of the original training presentation"],
    ["actual process adoption", "the number of slides shown during induction", "the number of employees assigned a new job title"]
  ],
  "Demonstrated capability shows whether employees can perform the decisions required by the redesigned role. Adoption shows whether actual arrivals follow the intended process. Together, these measures provide stronger evidence of organisational change than training attendance alone."
);
 
OR("W10O3d-11", "W10O3d", 3,
  "Arrange these steps for testing whether formalising Qasr's waiver authority improves Guest Host performance.",
  [
    "Document the AED 400 decision boundary and the required escalation arrangements",
    "Communicate the formal authority and provide realistic decision guidance",
    "Assess whether Guest Hosts can distinguish eligible waivers from cases requiring escalation",
    "Monitor actual waiver decisions, unnecessary referrals and decision quality",
    "Review the results and investigate any remaining authority or capability problems"
  ],
  "Formal delegation addresses a documented organisational weakness, but its effectiveness must be demonstrated. Guest Hosts need to understand and apply the revised decision rules. Capability assessment and operating evidence can then show whether decisions improve without encouraging inappropriate approvals or avoidance of necessary escalation."
);
 
MA("W10O3d-12", "W10O3d", 3,
  "Match each proposed sponsor-dashboard indicator to the question it helps answer.",
  [
    [
      "Demonstrated capability",
      "Can Guest Hosts make appropriate exception and escalation decisions?"
    ],
    [
      "Kiosk adoption",
      "What proportion of arrivals genuinely follows the kiosk-supported process?"
    ],
    [
      "Classified workaround frequency",
      "Which alternative operating paths occur and how frequently?"
    ],
    [
      "Decision-quality sample",
      "Are recorded exception resolutions appropriate and within delegated authority?"
    ]
  ],
  "A meaningful sponsor dashboard should distinguish capability, adoption, workarounds and decision quality. Each indicator answers a different question about the redesigned process. Qasr has not yet established all these measures, so proposed indicators must not be presented as already available operating results."
);

// W10O3e · The handover and the next phase
// Lesson l4 · Outcome O3 · CLOs K3, S3
// 12 items: 2 MCQ, 2 true/false, 2 dropdown, 2 visual,
// 2 ordering and 2 matching.
// Correct options are authored first; the player shuffles.
 
// FIRST CHECK
 
M("W10O3e-01", "W10O3e", 1,
  "Which set of deliverables should Qasr carry forward from the People phase to support implementation and sustainable process performance?",
  [
    "Updated roles, aligned measures and rewards, documented authority, assessed capability and adoption ownership",
    "Approved process diagrams, installed kiosks and completed induction attendance without further organisational assessment",
    "Unchanged Front Desk Agent objectives, informal waiver authority and the previous departmental reporting arrangements",
    "A completed benefits forecast, final technology invoices and confirmation that every employee attended the project launch"
  ],
  "The People phase prepares the organisational arrangements required to perform the redesigned process. Its outputs include updated role definitions, revised measures and reward arrangements, documented delegated authority, a capability plan and assessment, and an adoption measure with a named owner. These outputs support implementation, value realisation and sustainable performance."
);
 
DR("W10O3e-02", "W10O3e", 1,
  "In the ten-phase BPM framework, People is phase {1}, and the following phase, {2}, prepares the supporting capabilities required by the approved design.",
  [
    ["six", "seven", "eight"],
    ["Develop", "Implement", "Realize Value"]
  ],
  "People is phase six of the BPM framework, followed by Develop as phase seven. Develop concerns building what has been designed and deciding how much technology to buy, configure or build. The phases must remain coordinated because organisational responsibilities and supporting technology influence one another."
);
 
V("W10O3e-03", "W10O3e", 1,
  "Which diagram best represents the relationship between People and Develop in the BPM framework?",
  [
    [
      D.flow([
        "People|requirements",
        "Technology|requirements",
        "Coordinated|development",
        "Operational|readiness"
      ]),
      "Employee responsibilities and supporting technology are developed together around the redesigned process"
    ],
    [
      D.flow([
        "Technology|completed",
        "Employee roles|ignored",
        "Readiness|assumed"
      ]),
      "Technology is developed without considering the responsibilities employees must perform"
    ],
    [
      D.flow([
        "People|completed",
        "No further|coordination",
        "Develop|isolated"
      ]),
      "People-related requirements are treated as permanently fixed before any development decisions occur"
    ],
    [
      D.flow([
        "Old|responsibilities",
        "New|technology",
        "Old process|preserved"
      ]),
      "Technology is developed around the previous employee responsibilities without considering the redesigned process"
    ]
  ],
  "People and Develop are connected framework phases. The People phase clarifies responsibilities, authority, measures and capability, while Develop prepares supporting components. These requirements must remain coordinated because technology must support the decisions and activities employees are expected to perform."
);
 
 
// REMEDIATION ROUND 1
 
TF("W10O3e-04", "W10O3e", 1,
  "The People phase ends all responsibility for employee readiness before Develop begins, because the BPM framework requires completely isolated phases.",
  false,
  "This statement is false. The BPM framework is a guide rather than a rigid sequence of isolated activities. People and Develop should work alongside each other because technical decisions can affect employee responsibilities, while role and authority requirements influence the supporting systems."
);
 
OR("W10O3e-05", "W10O3e", 2,
  "Arrange these activities in a logical sequence for preparing Qasr's People-phase handover.",
  [
    "Confirm that Guest Host responsibilities and accountability reflect the redesigned arrival process",
    "Document delegated authority, measures and reward arrangements for those confirmed responsibilities",
    "Assess employee capability against the documented role and record unresolved readiness risks",
    "Combine the assessment results with an adoption measure and its named owner into one handover package",
    "Share the completed handover package with the Develop and implementation teams"
  ],
  "Authority, measures and reward must be built on confirmed responsibilities, and capability can only be assessed against a documented role. The assessment results and the adoption measure with its owner then form the handover package. Sharing the completed package with the Develop and implementation teams keeps the people and technology work coordinated."
);
 
MA("W10O3e-06", "W10O3e", 2,
  "Match each People-phase handover output to the requirement it supports.",
  [
    [
      "Updated role definitions and job descriptions",
      "Clarify the responsibilities employees must perform under the redesigned process"
    ],
    [
      "Documented delegated authority",
      "Establish the decisions employees may make and the boundaries requiring escalation"
    ],
    [
      "Capability plan and assessment",
      "Provide evidence of employees' ability to perform unfamiliar work appropriately"
    ],
    [
      "Adoption measure with a named owner",
      "Provide accountable monitoring of actual use of the redesigned process"
    ]
  ],
  "Each People-phase output supports a distinct requirement. Role definitions establish responsibilities, formal delegation clarifies decision rights, capability assessment provides evidence of readiness, and adoption ownership makes actual process use visible. These outputs collectively support implementation and subsequent process performance."
);
 
 
// REMEDIATION ROUND 2
 
M("W10O3e-07", "W10O3e", 2,
  "The Week 10 forum case concerns an unfamiliar organisation. What should a learner do when preparing the initial response?",
  [
    "Use the supplied case and exhibit to justify a role design and explain how its performance measures could influence behaviour",
    "Assume that the unfamiliar organisation has the same employees, waiver limits and kiosk adoption results as Qasr",
    "Describe the People phase without examining the organisation's actual responsibilities or proposed performance measures",
    "Wait until classmates post their answers and reproduce the most popular proposal without examining the case evidence"
  ],
  "The forum case, The Role That Was Never Designed, asks learners to apply People-phase reasoning to an unfamiliar organisation. A defensible response should use the supplied case and exhibit to design an appropriate role and explain the behavioural consequences of its measures. Qasr's specific facts must not be invented for the separate forum case."
);
 
TF("W10O3e-08", "W10O3e", 2,
  "The Week 10 forum requires learners to respond substantively to at least two peers, including a reasoned disagreement that challenges or extends an argument.",
  true,
  "This statement is true. The delivery plan requires substantive responses to at least two peers, while the slides explicitly call for disagreement with at least one peer. Constructive responses should challenge or extend reasoning using case evidence and BPM concepts rather than merely express agreement."
);
 
V("W10O3e-09", "W10O3e", 2,
  "Which diagram best represents a defensible approach to the Week 10 discussion forum?",
  [
    [
      D.flow([
        "Read|case and exhibit",
        "Develop|own argument",
        "Post|response",
        "Challenge|peer reasoning",
        "Review|summary"
      ]),
      "Analyse the unfamiliar case, post an evidence-based response, engage critically with peers and review the facilitator's summary"
    ],
    [
      D.flow([
        "Read|Qasr case",
        "Copy|Qasr facts",
        "Post|forum answer"
      ]),
      "Transfer Qasr's specific operating facts to the unfamiliar organisation without examining its evidence"
    ],
    [
      D.flow([
        "Read|peer answers",
        "Agree|with everyone",
        "Avoid|challenge"
      ]),
      "Respond to classmates through agreement without challenging or extending their reasoning"
    ],
    [
      D.flow([
        "Read|forum title",
        "Invent|case details",
        "Submit|unsupported answer"
      ]),
      "Construct a response using assumed organisational facts instead of the supplied case and exhibit"
    ]
  ],
  "The forum requires learners to apply the People-phase concepts to the evidence supplied in an unfamiliar case. A substantive initial response should be followed by meaningful engagement with at least two peers, including a reasoned disagreement. The facilitator's summary supports reflection at the end of the week."
);
 
 
// REMEDIATION ROUND 3
 
DR("W10O3e-10", "W10O3e", 3,
  "The Week 10 forum uses the case titled {1}, and learners should support their reasoning with {2}.",
  [
    ["The Role That Was Never Designed", "The Guest Host's Eleven-Week Review", "The Kiosk Development Decision"],
    ["Jeston, Chapter 18", "Jeston, Chapter 2", "the kiosk installation checklist"]
  ],
  "The asynchronous forum case is titled The Role That Was Never Designed. Learners must use the supplied case and exhibit and support their reasoning with the relevant core reading, Jeston Chapter 18. The forum provides an opportunity to transfer People-phase concepts beyond the Qasr running case."
);
 
OR("W10O3e-11", "W10O3e", 3,
  "Arrange these steps in a logical sequence for completing the Week 10 forum learning activity.",
  [
    "Read The Role That Was Never Designed and its accompanying exhibit",
    "Develop an evidence-based role and performance-measurement argument using Jeston Chapter 18",
    "Post a substantive initial response by mid-week before examining classmates' contributions",
    "Respond meaningfully to at least two peers and challenge or extend their reasoning",
    "Read the facilitator's end-of-week summary and reflect on the arguments"
  ],
  "The delivery plan requires learners to read the case and exhibit, post a substantive response by mid-week and engage with at least two peers. The slides additionally emphasise reasoned disagreement with at least one peer. The facilitator's summary supports reflection after the discussion."
);
 
MA("W10O3e-12", "W10O3e", 3,
  "Match each BPM framework phase to its contribution after the future process has been designed.",
  [
    [
      "People",
      "Align roles, authority, measures, capability and adoption arrangements with the redesigned process"
    ],
    [
      "Develop",
      "Build, configure or acquire the supporting capabilities required by the approved design"
    ],
    [
      "Implement",
      "Introduce the prepared process and supporting arrangements into organisational operations"
    ],
    [
      "Realize Value",
      "Establish whether the implemented changes deliver the intended process benefits"
    ]
  ],
  "People is phase six, Develop is phase seven, Implement is phase eight and Realize Value is phase nine. These phases have distinct purposes but remain connected. The People-phase handover must provide organisational requirements that support development, implementation and the eventual realisation of process benefits."
);

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
