// W14-bank
//
// OPER621 Week 14 - Sustainable Performance. Question bank, 12 items per part.
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



// W14O1a · Phase ten: when BPM becomes management
// Lesson l1: Why a successful process starts to decay
// Outcome O1 [K1]: Assess how process performance is sustained
// after a programme ends.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O1a-01", "W14O1a", 1,
  "What is the central purpose of the Sustainable Performance phase in the BPM framework?",
  [
    "Maintain and continuously improve process performance after the original improvement programme ends",
    "Confirm that the redesigned process has been installed across every organisational department",
    "Develop and test the technical systems required to operate the approved process design",
    "Calculate the expected financial benefits before deciding whether to launch a BPM programme"
  ],
  "Sustainable Performance makes process management a continuing organisational responsibility after the improvement programme ends. It establishes the ownership, measurement, review and improvement arrangements needed to protect realised benefits. Installing the redesigned process belongs to Implement, while Realize Value examines whether the expected benefits have actually been achieved."
);
 
M("W14O1a-02", "W14O1a", 2,
  "Qasr reduced lobby-to-room arrival time from 82 minutes to 24 minutes, but the measure later increased to 39 minutes. What does this demonstrate?",
  [
    "A genuine improvement can deteriorate when continuing management arrangements do not adequately sustain performance",
    "The original improvement was unsuccessful because every subsequent deterioration invalidates the earlier result",
    "The redesigned process should automatically be abandoned whenever arrival time increases after implementation",
    "The organisation must complete another technical development phase before examining operational performance"
  ],
  "Qasr achieved a genuine improvement when arrival time fell from 82 minutes to 24 minutes. The later increase to 39 minutes shows that achieving a benefit does not guarantee its continuation. Sustainable Performance addresses the continuing management needed to protect and improve results after implementation."
);
 
M("W14O1a-03", "W14O1a", 3,
  "A BPM programme has ended, and its process owner is preparing to leave the organisation. Which arrangement best supports sustainable performance?",
  [
    "Transfer continuing accountability to a named owner with authority to coordinate performance review and improvement across the process",
    "Keep the original project manager informally responsible without establishing operational decision-making authority",
    "Allow individual departments to manage their own activities without reviewing the complete process outcome",
    "Preserve the original process design unchanged and investigate performance only when a new transformation programme begins"
  ],
  "Sustainable Performance requires continuing end-to-end accountability that survives personnel changes and programme closure. A named process owner needs sufficient authority to coordinate operational functions, interpret performance measures and organise corrective action. Informal responsibility, isolated departmental management and an unchanged design do not provide dependable sustainability."
);
 
TF("W14O1a-04", "W14O1a", 1,
  "Sustainable Performance is phase ten of the BPM framework and follows Realize Value.",
  true,
  "This statement is true. Realize Value is phase nine and examines whether the intended business benefits have been achieved. Sustainable Performance is phase ten and establishes how the organisation maintains and continuously improves those benefits during normal operations."
);
 
TF("W14O1a-05", "W14O1a", 2,
  "Once a BPM programme demonstrates its expected benefits, the organisation can stop reviewing process performance because the improvement has been proven.",
  false,
  "This statement is false. Demonstrating realised benefits establishes that the improvement was achieved, not that it will continue indefinitely. Operating conditions, employee responsibilities and process practices can change. Sustainable Performance therefore requires continuing ownership, measurement, review and improvement."
);
 
DR("W14O1a-06", "W14O1a", 1,
  "In the BPM framework, {1} examines whether the expected business benefits have been achieved, while {2} establishes their continuing management and improvement.",
  [
    ["Realize Value", "Implement", "Process Architecture"],
    ["Sustainable Performance", "Develop", "Launch Pad"]
  ],
  "Realize Value examines whether the intended improvements have actually materialised. Sustainable Performance then establishes the continuing management arrangements needed to maintain and improve those results. The phases are connected, but achieving benefits and sustaining benefits are different responsibilities."
);
 
DR("W14O1a-07", "W14O1a", 2,
  "After the BPM programme ends, a named {1} should coordinate end-to-end performance, while regular {2} should connect operational evidence to corrective decisions.",
  [
    ["process owner", "project sponsor", "technical developer"],
    ["performance reviews", "installation tests", "project launch ceremonies"]
  ],
  "A process owner maintains accountability for the complete process after the temporary programme finishes. Regular performance reviews allow responsible managers to interpret evidence, investigate deterioration and agree corrective action. Technical testing and project launch activities cannot replace continuing operational management."
);
 
V("W14O1a-08", "W14O1a", 2,
  "Which diagram correctly identifies the Sustainable Performance phase within the ten-phase BPM framework?",
  [
    [
      D.route([9]),
      "Sustainable Performance is highlighted as phase ten of the BPM framework"
    ],
    [
      D.route([8]),
      "Realize Value is highlighted as the final phase of the BPM framework"
    ],
    [
      D.route([7]),
      "Implement is highlighted as the phase responsible for continuing sustainability"
    ],
    [
      D.route([6]),
      "Develop is highlighted as the phase responsible for continuing sustainability"
    ]
  ],
  "Sustainable Performance occupies phase ten of the ten-phase BPM framework. It follows Realize Value, which is phase nine. Implement and Develop occur earlier and address different responsibilities. Sustainable Performance establishes continuing process management rather than treating programme completion as the end of improvement."
);
 
V("W14O1a-09", "W14O1a", 3,
  "Which diagram best represents how an organisation should sustain a successful process after the original BPM programme ends?",
  [
    [
      D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}),
      "The process owner repeatedly measures results, reviews evidence, improves weaknesses and embeds effective changes"
    ],
    [
      D.flow([
        "Measure|results",
        "Archive|reports",
        "Close|programme"
      ]),
      "The organisation archives performance information and ends management attention after programme closure"
    ],
    [
      D.flow([
        "Implement|process",
        "Declare|success",
        "Preserve|design unchanged"
      ]),
      "The organisation assumes the implemented process will remain effective without further review or adaptation"
    ],
    [
      D.flow([
        "Departments|measure locally",
        "Departments|decide separately",
        "Assume|overall success"
      ]),
      "Individual departments manage their own results without coordinating end-to-end process performance"
    ]
  ],
  "The sustainable performance cycle connects measurement, review, improvement and embedding. Measurement provides evidence, review determines what needs attention, improvement addresses identified weaknesses, and embedding makes effective changes part of normal operations. Archiving reports, freezing the design and relying on disconnected departmental decisions do not establish continuous process management."
);
 
OR("W14O1a-10", "W14O1a", 2,
  "Put these BPM activities in the correct framework sequence, beginning with preparing the operating capability and ending with sustaining the realised improvement.",
  [
    "Build and test the approved operating capability during Develop",
    "Introduce the developed process into everyday operations during Implement",
    "Evaluate whether the intended benefits have been achieved during Realize Value",
    "Establish continuing ownership and improvement during Sustainable Performance"
  ],
  "Develop prepares and tests the capability required to operate the approved process. Implement introduces that capability into everyday organisational operations. Realize Value examines whether the expected benefits have actually been achieved. Sustainable Performance then establishes continuing management so those benefits can be maintained and improved."
);
 
MA("W14O1a-11", "W14O1a", 2,
  "Match each responsibility in the sustainable performance cycle to its principal purpose.",
  [
    [
      "Measure",
      "Collect reliable evidence about the performance of the complete process"
    ],
    [
      "Review",
      "Interpret performance evidence and decide whether management action is necessary"
    ],
    [
      "Improve",
      "Coordinate changes that address identified process weaknesses"
    ],
    [
      "Embed",
      "Make effective changes part of normal working practices and responsibilities"
    ]
  ],
  "The sustainable performance cycle contains four connected management responsibilities. Measurement establishes what is happening, while review interprets the evidence and determines whether action is needed. Improvement addresses identified weaknesses, and embedding integrates effective changes into everyday operations. Repeating this cycle helps prevent gradual deterioration."
);
 
MA("W14O1a-12", "W14O1a", 3,
  "Match each situation at Qasr Hospitality Group to the sustainable management principle it illustrates.",
  [
    [
      "Arrival time falls from 82 minutes to 24 minutes after rollout",
      "A substantial improvement has been achieved, but its long-term sustainability is not yet guaranteed"
    ],
    [
      "Arrival time later increases to 39 minutes",
      "Realised benefits can deteriorate during subsequent operational management"
    ],
    [
      "The appointed process owner changes roles",
      "Continuing accountability must survive personnel changes through a named responsible owner"
    ],
    [
      "The analyst produces monthly measures without sustained management review",
      "Reporting must be connected to accountable interpretation and corrective decisions"
    ]
  ],
  "Qasr's original reduction in arrival time demonstrates genuine improvement, while the later increase shows that achieved benefits can deteriorate. A change in the process owner's role highlights the need for durable accountability. Continuing monthly reporting without sustained review demonstrates why information alone cannot protect performance. Sustainable Performance connects these concerns through continuing ownership, active measurement and coordinated improvement."
);

// W14O2a · Five ways a good process quietly deteriorates
// Lesson l1: Why a successful process starts to decay
// Outcome O2 [K3]: Analyse the drift back towards prior performance
// when no individual has done anything wrong.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O2a-01", "W14O2a", 1,
  "What does performance drift mean in the Sustainable Performance phase?",
  [
    "A gradual deterioration from previously achieved process performance as operational conditions and practices change",
    "A temporary difference between the planned and actual completion dates of a BPM improvement project",
    "A deliberate decision to replace the approved process with a completely different operating model",
    "A reduction in departmental expenditure that occurs while the organisation maintains its original service standards"
  ],
  "Performance drift occurs when a process gradually loses some of the improvement achieved through an earlier BPM programme. It may result from weakened ownership, neglected measures, accumulating local changes, informal retraining or changes in organisational conditions. Deterioration does not necessarily mean that employees have deliberately ignored their responsibilities."
);
 
M("W14O2a-02", "W14O2a", 2,
  "Qasr's appointed arrival process owner was promoted nine months ago and was not replaced. Why does this create a sustainability risk?",
  [
    "The complete arrival process may lack dedicated accountability for coordinating decisions and addressing deterioration across functions",
    "The promotion automatically invalidates the original arrival process design and requires the organisation to restart implementation",
    "The analyst must stop producing arrival measures until the original process owner returns to the previous position",
    "Individual departments become formally exempt from maintaining the redesigned arrival process after the owner's promotion"
  ],
  "Qasr's appointed process owner was promoted to general manager of the Marina property. Accountability was absorbed by a group operations director with thirteen direct reports, but no dedicated replacement was appointed. This creates a risk that end-to-end performance receives insufficient attention. The promotion does not invalidate the design or remove operational responsibilities."
);
 
M("W14O2a-03", "W14O2a", 3,
  "Four separately approved changes at Qasr collectively added 13 minutes to arrival time. What is the strongest management lesson?",
  [
    "Individually reasonable changes must also be assessed for their cumulative effects on the complete arrival process",
    "Every locally approved change should be reversed because additional process activities are necessarily unjustified",
    "The thirteen additional minutes prove that employees deliberately failed to follow the original arrival procedure",
    "Separate departmental approval guarantees that the combined changes will preserve the original end-to-end improvement"
  ],
  "Qasr introduced passport re-verification, a lower rate waiver threshold, a loyalty enrolment prompt and permanent desk positions at two heritage properties. Together, these changes account for thirteen of the fifteen additional arrival minutes since month five. Individual changes may serve legitimate purposes, but their combined effects still require end-to-end governance. The evidence does not establish deliberate employee wrongdoing."
);
 
TF("W14O2a-04", "W14O2a", 1,
  "A process can deteriorate even when individual employees continue performing their assigned responsibilities conscientiously.",
  true,
  "This statement is true. Performance depends on how activities interact across the complete process, not only on individual effort. Weak ownership, unreviewed measures and accumulated local changes can undermine overall results even when employees act reasonably. Sustainable BPM therefore examines the management system before assigning individual blame."
);
 
TF("W14O2a-05", "W14O2a", 2,
  "The Week 14 Qasr evidence establishes that informal retraining by reception employees caused the documented increase in arrival time.",
  false,
  "This statement is false. Informal retraining is a recognised mechanism of process deterioration because employees may gradually pass on practices that differ from the approved design. However, the Qasr exhibit does not establish that informal retraining caused its deterioration. The documented evidence concerns weakened ownership, inactive management review and the cumulative effects of approved changes."
);
 
DR("W14O2a-06", "W14O2a", 1,
  "When the appointed process owner leaves the role without a dedicated replacement, the organisation risks losing {1}. When performance measures continue being produced but are not discussed, the organisation lacks {2}.",
  [
    [
      "clear end-to-end ownership",
      "technical system compatibility",
      "initial project sponsorship"
    ],
    [
      "active performance review",
      "additional data collection",
      "automated process execution"
    ]
  ],
  "Clear end-to-end ownership ensures that someone remains accountable for coordinating the complete process after organisational roles change. Active performance review turns reported information into management decisions. Qasr illustrates both weaknesses because its dedicated owner was not replaced and its monthly arrival measure was not discussed regularly."
);
 
DR("W14O2a-07", "W14O2a", 2,
  "When experienced employees teach newcomers inherited shortcuts instead of the approved procedure, deterioration may arise through {1}. When organisational responsibilities change but the process is not updated, deterioration may arise through {2}.",
  [
    [
      "informal retraining",
      "benefits realisation",
      "formal process ownership"
    ],
    [
      "organisational change not reflected in process design",
      "successful operational standardisation",
      "routine performance measurement"
    ]
  ],
  "Informal retraining can gradually replace an agreed process with inherited working habits, even when experienced employees intend to help. Organisational change creates a different risk when responsibilities or operating conditions evolve without corresponding process adaptation. Both mechanisms can weaken performance, but neither should be presented as a confirmed cause at Qasr without supporting evidence."
);
 
V("W14O2a-08", "W14O2a", 2,
  "Which diagram best represents how individually reasonable local changes can gradually undermine end-to-end process performance?",
  [
    [
      D.flow([
        "Local|decisions",
        "Changes|accumulate",
        "End-to-end|effects",
        "Performance|deteriorates"
      ]),
      "Separate local changes accumulate and weaken the performance of the complete process"
    ],
    [
      D.flow([
        "Local|decisions",
        "Separate|approvals",
        "Overall|performance protected"
      ]),
      "Separate departmental approvals automatically protect the performance of the complete process"
    ],
    [
      D.flow([
        "Local|changes",
        "Employee|blame",
        "Remove|all controls"
      ]),
      "Managers treat deterioration as employee wrongdoing and remove every additional control"
    ],
    [
      D.flow([
        "Local|changes",
        "Monthly|report",
        "Assume|improvement"
      ]),
      "Producing a monthly report automatically prevents the accumulated changes from weakening performance"
    ]
  ],
  "Individually reasonable decisions can produce an undesirable combined result when their end-to-end consequences are not assessed. Qasr's four separately approved changes collectively account for thirteen additional arrival minutes. Separate approvals and routine reporting do not automatically protect overall performance. Effective governance examines cumulative effects while respecting legitimate requirements."
);
 
V("W14O2a-09", "W14O2a", 3,
  "Which diagram most accurately represents the documented ownership arrangement at Qasr after its appointed process owner was promoted?",
  [
    [
      D.org("process", {top: "Group operations director", depts: ["Thirteen direct reports", "Arrival process accountability"]}),
      "The group operations director absorbed arrival process accountability while managing thirteen direct reports"
    ],
    [
      D.org("process", {top: "Dedicated arrival process owner", depts: ["Arrival performance", "Operational functions"]}),
      "A dedicated replacement was appointed to manage arrival performance after the original owner's promotion"
    ],
    [
      D.org("process", {top: "Arrival performance analyst", depts: ["Process ownership", "Operational decisions"]}),
      "The analyst became the accountable process owner because the monthly measure continued being produced"
    ],
    [
      D.org("process", {top: "Original BPM programme team", depts: ["Permanent ownership", "Property operations"]}),
      "The original programme team retained permanent responsibility for the arrival process after implementation"
    ]
  ],
  "Qasr's appointed process owner was promoted nine months ago and was not replaced in that dedicated role. The group operations director absorbed accountability while already managing thirteen direct reports. The analyst continued producing monthly performance information, but reporting responsibility does not establish process ownership. The exhibit does not identify a dedicated replacement or permanent ownership by the original programme team."
);
 
OR("W14O2a-10", "W14O2a", 2,
  "Put these developments in the logical sequence showing how informal retraining can gradually produce process drift in an illustrative organisation.",
  [
    "Employees begin with an agreed and documented operating procedure",
    "Experienced colleagues introduce informal shortcuts during everyday work",
    "New employees learn the inherited shortcuts instead of the approved procedure",
    "Different working practices gradually become established across the process",
    "End-to-end performance may deteriorate as the process moves away from its intended design"
  ],
  "An agreed process can gradually change when experienced employees introduce shortcuts and pass them to new colleagues. Repeated informal learning may establish practices that differ from the approved design. Those differences can eventually weaken end-to-end performance. This is a general mechanism of process drift, not a documented explanation for Qasr's arrival-time deterioration."
);
 
MA("W14O2a-11", "W14O2a", 2,
  "Match each mechanism of process deterioration to the management weakness it represents.",
  [
    [
      "Loss of process ownership",
      "Nobody remains clearly accountable for coordinating performance across the complete process"
    ],
    [
      "Unreviewed performance measures",
      "Information continues being produced without reliably influencing management decisions"
    ],
    [
      "Accumulating local changes",
      "Separately justified adjustments collectively weaken end-to-end performance"
    ],
    [
      "Informal retraining",
      "Inherited working habits gradually replace the agreed operating procedure"
    ]
  ],
  "Process deterioration can develop through different organisational mechanisms. Loss of ownership weakens accountability, while unreviewed measures disconnect evidence from management decisions. Accumulating local changes can undermine overall performance despite legitimate individual intentions. Informal retraining can gradually establish practices that differ from the approved design. Recognising the mechanism helps managers investigate the underlying weakness rather than assume individual wrongdoing."
);
 
MA("W14O2a-12", "W14O2a", 3,
  "Match each observation or situation to the conclusion that the Week 14 evidence supports.",
  [
    [
      "Qasr's arrival time increases from 24 minutes to 39 minutes",
      "The previously achieved end-to-end improvement has partially deteriorated"
    ],
    [
      "The arrival measure remains in the monthly operations pack",
      "Performance reporting continues even though active management review has weakened"
    ],
    [
      "Four approved changes collectively add 13 arrival minutes",
      "The combined consequences of local decisions require end-to-end examination"
    ],
    [
      "An organisation changes responsibilities without updating its process",
      "The existing design may no longer fit the organisation's operating arrangements"
    ]
  ],
  "Qasr's arrival-time figures establish that performance deteriorated after the successful rollout. Continued monthly reporting does not demonstrate active management because the measure was not discussed regularly. The four approved changes show why cumulative effects require governance. Organisational change that is not reflected in process design is another recognised deterioration mechanism, although the final situation is a general principle rather than an additional documented Qasr event."
);

// W14O2b · Nobody did anything wrong - so why did performance fall?
// Lesson l1: Why a successful process starts to decay
// Outcome O2 [K3]: Analyse the drift back towards prior performance
// when no individual has done anything wrong.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O2b-01", "W14O2b", 1,
  "Why can Qasr's arrival process deteriorate even when employees and local managers act reasonably?",
  [
    "Separate decisions can serve legitimate local purposes while their combined effects weaken end-to-end performance",
    "Employees must have deliberately ignored the redesigned procedure whenever overall arrival time increases",
    "The original process improvement becomes invalid as soon as an additional operating requirement is approved",
    "Every departmental decision automatically protects overall performance when the responsible manager follows local rules"
  ],
  "A decision can be reasonable within one department yet create additional waiting elsewhere in the process. At Qasr, four separately approved changes collectively account for thirteen additional arrival minutes. The evidence supports examining their combined consequences rather than assuming deliberate employee wrongdoing."
);
 
M("W14O2b-02", "W14O2b", 2,
  "Qasr introduced passport re-verification following a regulatory inspection. Which management response is most defensible?",
  [
    "Examine how the requirement affects arrival time while preserving applicable regulatory obligations",
    "Remove passport re-verification immediately because every additional control represents unnecessary bureaucracy",
    "Keep the existing procedure permanently unchanged because a regulatory inspection prevents future process improvement",
    "Ask reception employees to work faster without examining the requirement or its effect on the complete arrival journey"
  ],
  "Passport re-verification was introduced following a regulatory inspection, so its compliance purpose must be respected. However, a legitimate requirement does not automatically make every aspect of its implementation efficient. Qasr should examine whether the control can be delivered with less unnecessary waiting while preserving applicable obligations."
);
 
M("W14O2b-03", "W14O2b", 3,
  "The four approved changes explain 13 of the 15 additional arrival minutes since Qasr's month-five result. What conclusion is justified?",
  [
    "The changes have a documented combined effect, but the exhibit does not establish each change's individual contribution",
    "Passport re-verification alone accounts for all thirteen minutes because it followed a regulatory inspection",
    "The remaining two minutes prove that reception employees became less productive after the original rollout",
    "Each of the four changes contributed exactly the same amount of additional arrival time"
  ],
  "The exhibit attributes thirteen of the fifteen additional arrival minutes to the four approved changes collectively. It does not specify how many minutes each change contributed. The remaining two minutes are also unexplained by this evidence. A defensible diagnosis must preserve these limits rather than invent individual effects or causes."
);
 
TF("W14O2b-04", "W14O2b", 1,
  "A locally justified process change can still damage overall performance when its consequences for the complete process are not assessed.",
  true,
  "This statement is true. Local managers may introduce changes to address legitimate regulatory, financial or operational concerns. However, customers experience the combined process rather than the separate reasons behind each activity. Sustainable governance therefore examines how local decisions interact and affect end-to-end performance."
);
 
TF("W14O2b-05", "W14O2b", 2,
  "Because Qasr's analyst continued producing the monthly arrival measure, the exhibit establishes that the organisation maintained effective performance governance.",
  false,
  "This statement is false. The analyst continued producing the arrival measure, but the measure had not been discussed at an operations meeting for seven months. Reporting provides information, while effective governance requires accountable review and corrective decisions. Continuing measurement alone does not establish that performance is being actively managed."
);
 
DR("W14O2b-06", "W14O2b", 1,
  "When separate departments approve changes for legitimate local reasons, the organisation must examine their {1} rather than assume that individual approval guarantees {2}.",
  [
    [
      "cumulative end-to-end effects",
      "individual project completion dates",
      "separate departmental reporting formats"
    ],
    [
      "overall process performance",
      "additional employee training",
      "automatic regulatory exemption"
    ]
  ],
  "The cumulative end-to-end effects of local decisions determine how those decisions influence the complete process. Individual approval may establish that a change addresses a local concern, but it does not guarantee overall process performance. Qasr's four approved changes illustrate this distinction because their combined effect increased arrival time."
);
 
DR("W14O2b-07", "W14O2b", 2,
  "A sound diagnosis separates employees' {1} from the process's {2}, because reasonable behaviour within individual roles does not necessarily produce an acceptable overall result.",
  [
    [
      "individual intentions",
      "technical access permissions",
      "original recruitment dates"
    ],
    [
      "system-level outcomes",
      "project documentation format",
      "departmental reporting frequency"
    ]
  ],
  "Individual intentions describe what people are trying to achieve within their responsibilities. System-level outcomes describe what the complete process actually delivers. Employees and managers may act conscientiously while the combined consequences of their decisions weaken performance. This is why Qasr requires a system-level diagnosis rather than unsupported individual blame."
);
 
V("W14O2b-08", "W14O2b", 2,
  "Which diagram best explains how Qasr's separately approved changes could collectively increase guest arrival time?",
  [
    [
      D.flow([
        "Local|requirements",
        "Separate|approvals",
        "Accumulated|activities",
        "Longer|arrival time"
      ]),
      "Separately approved requirements accumulate within the arrival journey and increase the time experienced by guests"
    ],
    [
      D.flow([
        "Local|requirements",
        "Separate|approvals",
        "Guaranteed|overall efficiency"
      ]),
      "Separate approval of local requirements automatically preserves the efficiency of the complete arrival process"
    ],
    [
      D.flow([
        "Local|requirements",
        "Employee|misconduct",
        "Automatic|process failure"
      ]),
      "Every additional requirement establishes deliberate employee misconduct as the cause of process deterioration"
    ],
    [
      D.flow([
        "Local|requirements",
        "Monthly|report",
        "Automatic|correction"
      ]),
      "Producing a monthly report automatically reverses the operational effects of additional requirements"
    ]
  ],
  "Qasr's four changes were approved separately but collectively account for thirteen additional arrival minutes. This demonstrates how locally justified activities can accumulate and weaken the complete guest journey. Separate approval and monthly reporting do not automatically protect performance. The evidence also does not establish deliberate employee misconduct."
);
 
V("W14O2b-09", "W14O2b", 3, "Which diagram best represents the Week 14 explanation of how a process can decay when nobody has done anything wrong?", [[D.flow(["Reasonable|local decisions", "No end-to-end|review", "Combined effect|unmanaged", "Process|decays"]), "Reasonable local decisions go unreviewed end to end, so their combined effect weakens the process"], [D.flow(["Employee|error", "Disciplinary|action", "Process|recovers"]), "Decay always begins with an individual error, which discipline then corrects"], [D.flow(["Reasonable|local decisions", "Separate|approvals", "Performance|guaranteed"]), "Separate approval of each reasonable decision guarantees that overall performance is protected"], [D.flow(["Analyst|produces measure", "Measure|published", "Decay|prevented"]), "Publishing the monthly measure is enough on its own to prevent the process from decaying"]], "The slides state that decay is the default state of a process nobody is holding and requires nobody to make a mistake. At Qasr, separately approved and individually sensible changes were never assessed against the end-to-end measure, so their combined effect went unmanaged. Separate approvals and published reports do not hold a gain, and the evidence does not support an explanation based on individual error.");
 
OR("W14O2b-10", "W14O2b", 2,
  "Arrange these activities into a defensible management response when several locally approved changes appear to be weakening end-to-end performance.",
  [
    "Establish the deterioration using reliable end-to-end performance evidence",
    "Identify the approved changes that may have contributed to the deterioration",
    "Examine their combined effects and the legitimate requirements they address",
    "Coordinate affected functions to evaluate appropriate corrective options",
    "Agree a response and verify its effect on the complete process"
  ],
  "A defensible response begins with evidence that establishes what happened. Managers then examine relevant changes and distinguish their legitimate purposes from their combined operational consequences. Affected functions should help evaluate corrective options before action is agreed. Subsequent measurement determines whether the response improves the complete process."
);
 
MA("W14O2b-11", "W14O2b", 2,
  "Match each documented Qasr change to the description supported by the Week 14 case.",
  [
    [
      "Passport re-verification",
      "An additional arrival requirement introduced following a regulatory inspection"
    ],
    [
      "Rate waiver threshold",
      "A financial decision limit reduced from AED 400 to AED 150"
    ],
    [
      "Loyalty enrolment prompt",
      "An additional interaction introduced into the guest arrival journey"
    ],
    [
      "Permanent desk position",
      "A local operating arrangement reinstated at two heritage properties"
    ]
  ],
  "The Qasr exhibit identifies four separately approved changes. Passport re-verification followed a regulatory inspection, while the rate waiver threshold was reduced from AED 400 to AED 150. A loyalty enrolment prompt was added, and permanent desk positions were reinstated at two heritage properties. The exhibit establishes their combined thirteen-minute effect but does not assign an individual time contribution to each change."
);
 
MA("W14O2b-12", "W14O2b", 3,
  "Match each Qasr observation to the most defensible interpretation of its significance.",
  [
    [
      "Arrival time increases during each of the latest six months",
      "The pattern supports investigating sustained deterioration rather than treating the result as one isolated incident"
    ],
    [
      "The appointed process owner is promoted without a dedicated replacement",
      "Continuing end-to-end accountability may be weakened despite the existence of senior operational management"
    ],
    [
      "The arrival measure remains in the operations pack but is not discussed regularly",
      "Performance information is available without dependable management interpretation and response"
    ],
    [
      "The four approved changes explain thirteen additional minutes",
      "Cumulative process effects are documented without establishing that every individual approval was inappropriate"
    ]
  ],
  "The repeated increase in arrival time supports a diagnosis of sustained deterioration. The ownership change identifies a governance weakness, while the neglected management discussion shows that reporting was not consistently converted into action. The combined effect of the approved changes demonstrates why end-to-end governance matters. None of these observations, by itself, proves deliberate wrongdoing by individual employees or managers."
);

// W14O2c · The difference between reporting and managing
// Lesson l2: The measure nobody reads
// Outcome O2 [K3]: Analyse the drift back towards prior performance
// when no individual has done anything wrong.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O2c-01", "W14O2c", 1,
  "What is the essential difference between reporting process performance and actively managing it?",
  [
    "Reporting communicates performance information, while managing interprets that information and coordinates decisions and corrective action",
    "Reporting examines end-to-end performance, while managing examines only the productivity of individual employees",
    "Reporting requires a named process owner, while managing can operate effectively without continuing accountability",
    "Reporting identifies operational problems, while managing concentrates exclusively on completing the original BPM project"
  ],
  "Reporting records and communicates what has happened through measures, dashboards or management information packs. Active management goes further by interpreting the evidence, deciding whether intervention is necessary, assigning responsibility and checking the results. Sustainable Performance requires both reliable information and accountable action."
);
 
M("W14O2c-02", "W14O2c", 2,
  "Qasr's analyst continues producing the monthly arrival measure, but managers have not discussed it for seven months. What does this most clearly indicate?",
  [
    "Performance reporting continues, but the management review needed to act on deterioration has weakened",
    "The analyst has stopped collecting arrival information and must rebuild the reporting system",
    "The original process improvement was never achieved because managers no longer discuss the measure",
    "The operations pack contains insufficient information to establish that arrival performance has deteriorated"
  ],
  "Qasr's analyst still produces the arrival measure, which appears on page four of the operations pack. However, the measure was last discussed at an operations meeting seven months ago. The evidence therefore identifies a weakness in active management review rather than an absence of reporting or proof that the original improvement failed."
);
 
M("W14O2c-03", "W14O2c", 3,
  "A process owner discovers that an end-to-end performance measure has deteriorated. Which response best demonstrates active management?",
  [
    "Investigate the change, agree a corrective response, assign responsibility and check whether performance subsequently improves",
    "Add more charts to the monthly report without changing the arrangements for management review",
    "Ask the reporting analyst to explain the deterioration without involving the operational functions responsible for the process",
    "Archive the result until the next BPM transformation programme provides resources for another process redesign"
  ],
  "Active management connects evidence to decisions and follow-through. The owner should investigate the deterioration, coordinate affected functions, agree appropriate action and verify its effect. More reporting alone does not resolve the weakness, and an analyst's reporting responsibility does not replace operational accountability."
);
 
TF("W14O2c-04", "W14O2c", 1,
  "A performance measure can be accurate and regularly produced while the organisation still fails to manage the process effectively.",
  true,
  "This statement is true. Accurate reporting provides useful evidence, but it cannot independently prevent deterioration. Managers must review the information, investigate meaningful changes and coordinate corrective decisions. Qasr illustrates this distinction because monthly arrival reporting continued without sustained management discussion."
);
 
TF("W14O2c-05", "W14O2c", 2,
  "Because Qasr's arrival time increased after the redesigned process was implemented, the analyst producing the monthly measure must be responsible for the deterioration.",
  false,
  "This statement is false. The analyst continued fulfilling the reporting responsibility by producing the monthly arrival measure. The evidence instead raises questions about continuing process ownership, management review and the cumulative consequences of approved changes. Producing performance information does not make the analyst responsible for every operational outcome."
);
 
DR("W14O2c-06", "W14O2c", 1,
  "A monthly operations pack primarily supports {1}, while a meeting that interprets deteriorating results and assigns corrective action demonstrates {2}.",
  [
    [
      "performance reporting",
      "process redesign approval",
      "employee resistance management"
    ],
    [
      "active performance management",
      "technical system development",
      "programme launch preparation"
    ]
  ],
  "A monthly operations pack communicates performance information and therefore supports reporting. Active performance management occurs when responsible managers interpret that information, investigate deterioration and agree corrective action. The distinction matters because a report can continue being produced even when management attention has weakened."
);
 
DR("W14O2c-07", "W14O2c", 2,
  "A useful performance review should identify {1} for an agreed corrective action and establish {2} to determine whether the response worked.",
  [
    [
      "a responsible owner",
      "an additional dashboard colour",
      "the original project launch date"
    ],
    [
      "a follow-up performance check",
      "a permanent exemption from measurement",
      "an automatic declaration of success"
    ]
  ],
  "A corrective decision needs a responsible owner so that somebody is accountable for carrying it out. It also needs follow-up measurement because completing an action does not prove that the process has improved. These arrangements turn management discussion into a continuing performance improvement responsibility."
);
 
V("W14O2c-08", "W14O2c", 2,
  "Which diagram best represents the management arrangement needed to turn Qasr's monthly arrival measure into corrective action?",
  [
    [
      D.flow([
        "Measure|produced",
        "Owner|reviews",
        "Decision|agreed",
        "Action|assigned",
        "Result|checked"
      ]),
      "The process owner connects monthly performance information to review, corrective decisions and verification"
    ],
    [
      D.flow([
        "Measure|produced",
        "Report|circulated",
        "Report|archived"
      ]),
      "The organisation produces and circulates information without establishing a continuing management response"
    ],
    [
      D.flow([
        "Measure|produced",
        "Analyst|blamed",
        "Measure|discontinued"
      ]),
      "The reporting analyst is held responsible for deterioration and the organisation stops collecting the measure"
    ],
    [
      D.flow([
        "Measure|produced",
        "Departments|decide separately",
        "Overall|success assumed"
      ]),
      "Departments interpret performance independently without coordinating decisions across the complete arrival process"
    ]
  ],
  "Effective process management connects measurement to accountable review, decisions, action and verification. Qasr already produces the arrival measure, so another reporting activity alone would not address the documented weakness. A named process owner should coordinate the response across affected functions and check whether the intervention improves performance."
);
 
V("W14O2c-09", "W14O2c", 3,
  "Which diagram correctly represents Qasr's documented arrival-time evidence relevant to the neglected management review?",
  [
    [
      D.bars([["Month 5", 24], ["Last discussion", 28], ["Month 22", 39]]),
      "Arrival time was 24 minutes at month five, 28 minutes when the measure was last discussed, and 39 minutes at month twenty-two"
    ],
    [
      D.bars([["Month 5", 39], ["Last discussion", 28], ["Month 22", 24]]),
      "Arrival time improved continuously from 39 minutes to 24 minutes after the original rollout"
    ],
    [
      D.bars([["Month 5", 24], ["Last discussion", 39], ["Month 22", 28]]),
      "Arrival time had already reached 39 minutes at the last management discussion before improving to 28 minutes"
    ],
    [
      D.bars([["Month 5", 28], ["Last discussion", 24], ["Month 22", 39]]),
      "Arrival time was 28 minutes at month five and improved to 24 minutes when managers last discussed the measure"
    ]
  ],
  "Qasr achieved an arrival time of 24 minutes at month five. The measure was last discussed seven months ago, when arrival time was 28 minutes. By month twenty-two, arrival time had increased to 39 minutes. This pattern demonstrates why continued reporting must be connected to regular management review and timely intervention."
);
 
OR("W14O2c-10", "W14O2c", 2,
  "Arrange these activities into the correct sequence for turning a deteriorating performance measure into accountable process management.",
  [
    "Produce reliable information about the end-to-end process outcome",
    "Review the result against agreed performance expectations",
    "Investigate the deterioration and identify plausible causes",
    "Agree corrective action and assign responsibility for implementation",
    "Measure subsequent performance to determine whether the response worked"
  ],
  "Reliable measurement establishes what is happening across the process. Review identifies meaningful deterioration, while investigation examines its possible causes before managers select a response. Corrective action needs clear responsibility, and subsequent measurement establishes whether the intervention achieved its intended effect. This sequence distinguishes active management from passive reporting."
);
 
MA("W14O2c-11", "W14O2c", 2,
  "Match each performance-management activity to the responsibility it performs.",
  [
    [
      "Performance reporting",
      "Produces and communicates reliable information about process results"
    ],
    [
      "Management review",
      "Interprets results and determines whether deterioration requires investigation"
    ],
    [
      "Corrective decision",
      "Selects an appropriate response and establishes responsibility for action"
    ],
    [
      "Follow-up verification",
      "Examines subsequent evidence to determine whether the agreed response improved performance"
    ]
  ],
  "Reporting provides information, while management review interprets that information and identifies issues requiring attention. Corrective decisions translate the diagnosis into assigned action. Follow-up verification determines whether the action improved the process. Sustainable Performance depends on these responsibilities working together rather than treating report production as the final management activity."
);
 
MA("W14O2c-12", "W14O2c", 3,
  "Match each observation or proposed response at Qasr to its correct management interpretation.",
  [
    [
      "The analyst continues producing the monthly arrival measure",
      "The organisation retains a functioning source of performance information"
    ],
    [
      "The measure appears on page four of the operations pack",
      "Performance information is available within routine management reporting"
    ],
    [
      "The measure has not been discussed for seven months",
      "The arrangements for active performance review have weakened"
    ],
    [
      "A dedicated owner is proposed to coordinate reviews and corrective action",
      "Continuing accountability would connect reported evidence to operational decisions"
    ]
  ],
  "Qasr's analyst continues producing the monthly arrival measure, and the operations pack makes that information available. However, the absence of management discussion for seven months reveals a weakness in active review. Restoring dedicated ownership is a proposed intervention that could connect performance evidence with coordinated decisions and follow-through. The exhibit does not establish that this appointment has already occurred."
);

// W14O1b · Four signals that the gain is slipping
// Lesson l2: The measure nobody reads
// Outcome O1 [K1]: Assess how process performance is sustained
// after a programme ends.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O1b-01", "W14O1b", 1,
  "Why should Qasr continue measuring lobby-to-room arrival time after its improvement programme ends?",
  [
    "It reveals whether the complete guest arrival journey continues delivering the improvement achieved during rollout",
    "It establishes whether each individual department has completed its assigned activities within its own budget",
    "It guarantees that employees will continue using the redesigned process without further management attention",
    "It replaces the need to monitor adoption, exceptions and variations from the approved process"
  ],
  "Lobby-to-room arrival time is an end-to-end measure because it captures the time experienced across the complete guest journey. Qasr reduced this measure from 82 minutes to 24 minutes, but it later increased to 39 minutes. Continuing measurement reveals whether the improvement is being sustained. It does not automatically explain the deterioration or replace other useful signals."
);
 
M("W14O1b-02", "W14O1b", 2,
  "Qasr's kiosk adoption falls from 65% at month five to 48% at month twenty-two. What does this signal most directly suggest?",
  [
    "Use of the redesigned kiosk process has declined and the remaining non-adoption cases require investigation",
    "The original arrival-time improvement was never achieved because kiosk adoption was below 100%",
    "The decline proves that reception employees deliberately resisted the redesigned process",
    "The organisation should automatically remove all manual arrival arrangements without examining guest needs"
  ],
  "Kiosk adoption declined by seventeen percentage points between month five and month twenty-two. This shows that a smaller proportion of arrivals used the redesigned kiosk process. The decline deserves investigation because weakening adoption may threaten realised benefits. However, the figures alone do not establish employee resistance or justify removing alternative arrangements."
);
 
M("W14O1b-03", "W14O1b", 3,
  "A process owner discovers that exception volume has risen above the range anticipated in the approved process design. What is the appropriate response?",
  [
    "Revisit the exception design developed during phase five and investigate why more cases require exceptional handling",
    "Automatically classify every exception as employee misconduct and introduce disciplinary action",
    "Ignore exception volume as long as individual departments continue meeting their activity targets",
    "Replace the end-to-end performance measure with a count of completed project documentation"
  ],
  "Exceptions are cases requiring treatment outside the normal process path. When their volume exceeds the designed range, the process owner should investigate whether the exception arrangements remain suitable. The Week 14 governance proposal calls for revisiting phase-five exception design. An increase does not automatically establish employee wrongdoing."
);
 
TF("W14O1b-04", "W14O1b", 1,
  "An end-to-end performance measure can reveal deterioration that is not visible when departments examine only their individual activities.",
  true,
  "This statement is true. Customers experience the complete process, including waiting between activities managed by different departments. Individual departments may perform their own tasks satisfactorily while the overall journey deteriorates. End-to-end measures help process owners recognise these combined consequences."
);
 
TF("W14O1b-05", "W14O1b", 2,
  "Because Qasr reinstated permanent desk positions at two heritage properties, the Week 14 evidence proves that these were unregistered process variants.",
  false,
  "This statement is false. The exhibit establishes that permanent desk positions were reinstated at two heritage properties. It does not establish whether those arrangements were registered within the process architecture. A local variation is not automatically an unregistered variant. Managers must establish its registration status before applying the proposed architecture-review trigger."
);
 
DR("W14O1b-06", "W14O1b", 1,
  "A measure of lobby-to-room arrival time monitors {1}, while kiosk adoption monitors {2} of the redesigned arrival process.",
  [
    [
      "end-to-end performance",
      "individual employee attendance",
      "the original project budget"
    ],
    [
      "actual usage",
      "technical development expenditure",
      "the number of steering meetings"
    ]
  ],
  "Arrival time measures the result experienced across Qasr's complete guest arrival journey. Kiosk adoption measures the extent to which the redesigned kiosk process is actually being used. These signals complement one another because performance can deteriorate while usage patterns also change. Both require interpretation rather than automatic assumptions about their causes."
);
 
DR("W14O1b-07", "W14O1b", 2,
  "When exception volume exceeds its designed range, the proposed response is to revisit {1}. When an unregistered process variant is identified, the proposed response is an {2}.",
  [
    [
      "phase-five exception design",
      "the original project funding request",
      "employee recruitment criteria"
    ],
    [
      "architecture review",
      "automatic programme closure",
      "unconditional local approval"
    ]
  ],
  "Exception volume above the designed range indicates that the arrangements for handling unusual cases may need reconsideration. The proposed governance response is to revisit phase-five exception design. An unregistered process variant raises a different concern about consistency with the approved process architecture, so it should initiate an architecture review."
);
 
V("W14O1b-08", "W14O1b", 2,
  "Which diagram correctly represents Qasr's documented kiosk adoption pattern after the redesigned process was introduced?",
  [
    [
      D.bars([["Month 5", 65], ["Month 13", 61], ["Month 22", 48]]),
      "Kiosk adoption declines from 65% at month five to 61% at month thirteen and 48% at month twenty-two"
    ],
    [
      D.bars([["Month 5", 48], ["Month 13", 61], ["Month 22", 65]]),
      "Kiosk adoption increases continuously from 48% at month five to 65% at month twenty-two"
    ],
    [
      D.bars([["Month 5", 65], ["Month 13", 65], ["Month 22", 65]]),
      "Kiosk adoption remains unchanged at 65% throughout the observed period"
    ],
    [
      D.bars([["Month 5", 65], ["Month 13", 48], ["Month 22", 61]]),
      "Kiosk adoption falls to 48% at month thirteen before recovering to 61% at month twenty-two"
    ]
  ],
  "Qasr's documented kiosk adoption was 65% at month five, 61% at month thirteen and 48% at month twenty-two. The figures establish a decline of seventeen percentage points from the month-five level. This is an important sustainability signal because the organisation needs to investigate why use of the redesigned process has weakened."
);
 
V("W14O1b-09", "W14O1b", 3,
  "Which diagram correctly groups the four signals recommended for monitoring whether an improved process remains sustainable?",
  [
    [
      D.hier([["End-to-end performance", ""], ["Process adoption", ""], ["Exception volume", ""], ["Unregistered variants", ""]]),
      "The sustaining dashboard monitors process outcomes, actual usage, exceptional cases and unregistered variations"
    ],
    [
      D.hier([["Project budget", ""], ["Implementation deadline", ""], ["Training expenditure", ""], ["Project closure date", ""]]),
      "The sustaining dashboard concentrates on the original programme's delivery and expenditure records"
    ],
    [
      D.hier([["Departmental productivity", ""], ["Individual attendance", ""], ["Employee overtime", ""], ["Managerial seniority", ""]]),
      "The sustaining dashboard relies entirely on departmental and individual activity indicators"
    ],
    [
      D.hier([["Customer complaints", ""], ["Annual revenue", ""], ["Marketing expenditure", ""], ["Property occupancy", ""]]),
      "The sustaining dashboard substitutes broad business indicators for measures of how the redesigned process operates"
    ]
  ],
  "The Week 14 sustaining dashboard focuses on end-to-end performance, adoption, exception volume and unregistered process variants. These signals reveal different ways that an improvement may weaken. A focused combination is more useful than monitoring only project delivery records, individual activity measures or unrelated business statistics."
);
 
OR("W14O1b-10", "W14O1b", 2,
  "Arrange these activities into a sensible sequence for using sustainability signals to manage emerging process deterioration.",
  [
    "Identify the delivered process result and approved operating arrangements",
    "Collect current evidence about performance, adoption, exceptions and process variants",
    "Compare the current evidence with the delivered result and designed operating expectations",
    "Investigate meaningful deviations and identify their possible causes",
    "Agree corrective action and check whether subsequent performance improves"
  ],
  "Sustainability monitoring needs a reliable reference from the delivered process and its approved operating arrangements. Managers then collect current evidence and compare it with those expectations. Meaningful deviations require investigation before corrective action is selected. Follow-up measurement establishes whether the intervention actually protects or restores the improvement."
);
 
MA("W14O1b-11", "W14O1b", 2,
  "Match each sustainability signal to the question it helps a process owner answer.",
  [
    [
      "End-to-end performance",
      "Is the complete process still delivering the intended outcome?"
    ],
    [
      "Process adoption",
      "Are employees or customers continuing to use the redesigned process?"
    ],
    [
      "Exception volume",
      "Are more cases requiring treatment outside the normal process path than the design anticipated?"
    ],
    [
      "Unregistered process variants",
      "Are operating methods being used without registration in the approved process architecture?"
    ]
  ],
  "End-to-end performance measures the outcome delivered by the complete process. Adoption shows whether the redesigned process continues being used. Exception volume reveals pressure on arrangements for handling unusual cases. Unregistered variants identify differences from the approved architecture that require governance attention. Together, these signals help explain whether an improvement remains sustainable."
);
 
MA("W14O1b-12", "W14O1b", 3, "Match each early warning sign from the Week 14 signals slide to what it reveals about a gain that is slipping.", [["Adoption plateauing at 65% after rollout", "Two processes are running side by side, the new design and the old one"], ["New workarounds appearing, especially ones that predate the redesign", "A design defect is reporting itself and needs investigation"], ["Local variants reappearing at sites that were standardised", "Standardisation is eroding and the variation needs governance attention"], ["The measure's trend turning without anyone remarking on it", "The measure is still being reported but is no longer being managed"]], "The Week 14 slides treat each early sign as evidence about the process rather than about individual effort. A 65% adoption plateau means the old way is still running alongside the new design. A workaround is a design defect reporting itself, and reappearing local variants show that standardisation is eroding. A trend that turns without comment shows that reporting has continued while management attention has stopped.");

// W14O1c · Setting the trigger before the trend turns
// Lesson l2: The measure nobody reads
// Outcome O1 [K1]: Assess how process performance is sustained
// after a programme ends.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O1c-01", "W14O1c", 1,
  "What is the main purpose of establishing performance triggers before an improved process begins to deteriorate?",
  [
    "Connect meaningful performance deviations to pre-agreed management responsibilities and responses",
    "Guarantee that the redesigned process will never experience unexpected operational problems",
    "Automatically replace the process owner whenever a performance measure changes",
    "Remove the need to investigate causes because the trigger already identifies the correct solution"
  ],
  "A performance trigger is a pre-agreed condition that requires a defined management response. It helps managers recognise when deterioration deserves attention and clarifies who must act. A trigger does not prevent every problem or identify its cause automatically. It establishes when accountable investigation and decision-making should begin."
);
 
M("W14O1c-02", "W14O1c", 2,
  "Qasr's delivered lobby-to-room arrival time was 24 minutes. Under the proposed rule requiring reporting when performance becomes more than 10% worse, which result requires owner reporting?",
  [
    "27 minutes, because it exceeds the 26.4-minute deterioration boundary",
    "26 minutes, because any increase of at least two minutes exceeds the proposed boundary",
    "26.4 minutes, because reaching exactly 10% deterioration satisfies the rule requiring more than 10%",
    "25 minutes, because any deterioration automatically requires reporting to the operations meeting"
  ],
  "Ten percent of 24 minutes is 2.4 minutes, giving a reference boundary of 26.4 minutes. The proposed rule requires owner reporting when performance becomes more than 10% worse than the delivered result. Therefore, 27 minutes triggers reporting, while exactly 26.4 minutes reaches but does not exceed the stated boundary."
);
 
M("W14O1c-03", "W14O1c", 3,
  "Qasr's kiosk adoption reached a rollout plateau of 65%. Under the proposed five-percentage-point decline trigger, which adoption result would require investigation?",
  [
    "59%, because adoption has fallen more than five percentage points below the rollout plateau",
    "62%, because any decline of at least three percentage points activates the proposed trigger",
    "61.75%, because a five percent relative decline is the same as a five-percentage-point decline",
    "65%, because maintaining the rollout plateau automatically requires investigation of declining adoption"
  ],
  "The proposed adoption trigger concerns a decline of five percentage points from the rollout plateau. Subtracting five percentage points from 65% gives 60%, so a result of 59% clearly falls below that boundary. A relative decline of five percent would produce 61.75%, which is a different calculation. The purpose of the trigger is to investigate weakening adoption."
);
 
TF("W14O1c-04", "W14O1c", 1,
  "Crossing a performance trigger should initiate an agreed management response, but it does not automatically establish the cause of deterioration.",
  true,
  "This statement is true. A trigger identifies when a performance result requires management attention. The process owner must still investigate why the deviation occurred and coordinate an appropriate response. Automatically prescribing a solution without diagnosis risks addressing the wrong problem."
);
 
TF("W14O1c-05", "W14O1c", 2,
  "The Week 14 exhibit establishes that Qasr had already implemented the proposed 10% arrival-time trigger and five-percentage-point adoption trigger before month twenty-two.",
  false,
  "This statement is false. The Week 14 material presents these thresholds as proposed sustaining governance mechanisms. The exhibit documents Qasr's performance deterioration, but it does not establish that the organisation had previously adopted or enforced these rules. Proposed interventions must be distinguished from documented case facts."
);
 
DR("W14O1c-06", "W14O1c", 1,
  "A 10% deterioration from Qasr's delivered arrival time of 24 minutes gives a reference boundary of {1}. Under the proposed rule, a result above that boundary requires {2}.",
  [
    [
      "26.4 minutes",
      "24.4 minutes",
      "34 minutes"
    ],
    [
      "the process owner to report to the operations meeting",
      "automatic removal of all additional arrival controls",
      "immediate closure of the performance reporting system"
    ]
  ],
  "Ten percent of 24 minutes is 2.4 minutes, so the reference boundary is 26.4 minutes. The proposed governance rule requires the process owner to report when end-to-end performance becomes more than 10% worse than the delivered result. Reporting initiates accountable review; it does not automatically justify removing controls or ending measurement."
);
 
DR("W14O1c-07", "W14O1c", 2,
  "A decline from 65% kiosk adoption to 60% represents {1}. A decline from 65% to 61.75% represents {2}.",
  [
    [
      "five percentage points",
      "five percent of the original adoption level",
      "seventeen percentage points"
    ],
    [
      "a five percent relative reduction",
      "a five-percentage-point reduction",
      "a seventeen-percentage-point reduction"
    ]
  ],
  "Percentage points measure the direct difference between two percentages. The difference between 65% and 60% is five percentage points. A five percent relative reduction instead subtracts 5% of 65%, which is 3.25 percentage points, producing 61.75%. Confusing these calculations would change when the proposed adoption trigger activates."
);
 
V("W14O1c-08", "W14O1c", 2,
  "Which diagram correctly compares Qasr's delivered arrival time, proposed 10% deterioration boundary and documented month-twenty-two result?",
  [
    [
      D.bars([["Delivered", 24], ["Boundary", 26.4], ["Month 22", 39]]),
      "The delivered result is 24 minutes, the proposed boundary is 26.4 minutes, and the documented result is 39 minutes"
    ],
    [
      D.bars([["Delivered", 24], ["Boundary", 34], ["Month 22", 39]]),
      "The proposed 10% deterioration boundary is 34 minutes above the delivered result"
    ],
    [
      D.bars([["Delivered", 39], ["Boundary", 42.9], ["Month 22", 24]]),
      "The proposed boundary is calculated from 39 minutes and the month-twenty-two result is 24 minutes"
    ],
    [
      D.bars([["Delivered", 24], ["Boundary", 26.4], ["Month 22", 26]]),
      "The month-twenty-two result remains below the proposed boundary at 26 minutes"
    ]
  ],
  "Qasr achieved a delivered arrival time of 24 minutes at month five. A 10% deterioration gives a reference boundary of 26.4 minutes. The documented month-twenty-two result was 39 minutes, substantially above that boundary. Under the proposed governance arrangement, this deterioration would require reporting by the process owner."
);
 
V("W14O1c-09", "W14O1c", 3,
  "Which diagram best represents the correct management response when exception volume rises above its designed range?",
  [
    [
      D.flow([
        "Exception|volume",
        "Designed range|exceeded",
        "Owner|investigates",
        "Phase five|design reviewed"
      ]),
      "Excessive exception volume triggers investigation and reconsideration of the exception design developed during phase five"
    ],
    [
      D.flow([
        "Exception|volume",
        "Designed range|exceeded",
        "All exceptions|prohibited"
      ]),
      "Managers automatically prohibit exceptional cases without investigating why they occur"
    ],
    [
      D.flow([
        "Exception|volume",
        "Designed range|exceeded",
        "Employee|blamed",
        "Reporting|stopped"
      ]),
      "Managers assume employee misconduct and discontinue exception reporting"
    ],
    [
      D.flow([
        "Exception|volume",
        "Designed range|exceeded",
        "Programme|declared complete"
      ]),
      "Managers treat excessive exceptions as evidence that no further process review is necessary"
    ]
  ],
  "Exception volume above the designed range indicates that the arrangements for handling unusual cases may no longer fit operating conditions. The proposed response is to investigate and revisit the exception design developed during phase five. The trigger does not establish employee misconduct or justify automatically prohibiting exceptions."
);
 
OR("W14O1c-10", "W14O1c", 2,
  "Arrange these activities into the correct sequence for applying a pre-agreed performance trigger to a deteriorating process.",
  [
    "Establish the delivered performance result and agree the intervention threshold",
    "Collect current performance evidence using the agreed measure",
    "Compare the observed result with the pre-agreed threshold",
    "Notify the accountable owner when the trigger condition is met",
    "Investigate the deviation and coordinate an appropriate management response",
    "Review subsequent results to determine whether the response worked"
  ],
  "Effective trigger governance begins by agreeing the reference result and intervention threshold before deterioration occurs. Managers then measure performance and compare the result with the agreed boundary. When the trigger condition is met, the accountable owner investigates and coordinates action. Subsequent measurement establishes whether the response improved performance."
);
 
MA("W14O1c-11", "W14O1c", 2,
  "Match each sustainability trigger to the management response proposed in Week 14.",
  [
    [
      "End-to-end performance becomes more than 10% worse than the delivered result",
      "The process owner reports the deterioration to the operations meeting"
    ],
    [
      "Adoption falls five percentage points below the rollout plateau",
      "Investigate the remaining non-adoption cases and their causes"
    ],
    [
      "Exception volume exceeds the designed range",
      "Revisit the exception design developed during phase five"
    ],
    [
      "An unregistered process variant is identified",
      "Initiate an architecture review of the operating variation"
    ]
  ],
  "The Week 14 proposal connects different sustainability signals to specific management responses. Significant end-to-end deterioration requires owner reporting, while declining adoption prompts investigation of remaining non-adoption cases. Excessive exceptions require reconsideration of phase-five exception design. An unregistered process variant requires architecture review. These rules establish accountability without prescribing the same intervention for every problem."
);
 
MA("W14O1c-12", "W14O1c", 3,
  "Match each Qasr observation or governance condition to the conclusion it supports.",
  [
    [
      "Arrival time reaches 39 minutes against a proposed boundary of 26.4 minutes",
      "The proposed end-to-end deterioration trigger would require owner reporting"
    ],
    [
      "Kiosk adoption reaches 48% against a proposed boundary of 60%",
      "The proposed adoption trigger would require investigation of remaining non-adoption cases"
    ],
    [
      "A permanent desk position is documented at two heritage properties",
      "The evidence establishes a local variation but does not establish that it was unregistered"
    ],
    [
      "A proposed threshold is included in the Week 14 governance design",
      "The threshold represents a recommended sustaining mechanism rather than proof of previous implementation"
    ]
  ],
  "Qasr's documented arrival time of 39 minutes exceeds the proposed 26.4-minute deterioration boundary. Its 48% kiosk adoption also falls below the proposed 60% adoption boundary. Both results would require responses under the proposed governance rules. However, documented desk variations are not automatically unregistered, and the existence of proposed thresholds does not prove that Qasr had already implemented them."
);

// W14O3a · Measure, review, improve, embed: the owner's loop
// Lesson l3: Governance that holds the gain
// Outcome O3 [S3]: Devise governance that maintains and
// continuously improves processes.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O3a-01", "W14O3a", 1,
  "What is the main purpose of the process owner's measure, review, improve and embed cycle?",
  [
    "Maintain and continuously improve process performance through recurring evidence-based management",
    "Confirm that the original BPM programme has completed its implementation activities",
    "Transfer all responsibility for operational performance to the analyst producing monthly reports",
    "Prevent any further changes to the process after the original improvement has been achieved"
  ],
  "The sustaining cycle makes process improvement a continuing management responsibility. Measurement provides evidence, review interprets the results, improvement addresses identified weaknesses, and embedding integrates effective changes into normal operations. The cycle continues after programme completion because operating conditions and process performance can change."
);
 
M("W14O3a-02", "W14O3a", 2,
  "Qasr's analyst already produces the arrival measure every month. What should a dedicated process owner add to make that information useful?",
  [
    "Regular performance review, coordinated corrective decisions and follow-up verification",
    "A requirement for the analyst to produce the same measure more frequently without management discussion",
    "An instruction to stop monitoring arrival time because the original improvement was successful",
    "Separate departmental decisions without examining their effects on the complete guest arrival journey"
  ],
  "Qasr's difficulty is not simply a lack of reporting. The arrival measure continues being produced, but management discussion has not been sustained. A dedicated owner should interpret the evidence, coordinate affected functions, assign appropriate action and check subsequent results. These activities connect measurement to effective process management."
);
 
M("W14O3a-03", "W14O3a", 3,
  "A process owner introduces a revised operating procedure after investigating a recurring delay. What would demonstrate that the improvement has been embedded?",
  [
    "The revised procedure becomes part of normal working instructions and employees consistently use it during everyday operations",
    "The project manager announces that the revised procedure has been approved at the final programme meeting",
    "The improvement team records the proposed procedure in a report without changing operational practices",
    "The organisation stops reviewing performance because the revised procedure has been formally documented"
  ],
  "Embedding means making an effective improvement part of normal working practice. This includes updating procedures, supporting employee understanding and ensuring the revised arrangement is used consistently. Approval or documentation alone does not establish that the change has been adopted. Continuing measurement is also necessary to determine whether performance remains satisfactory."
);
 
TF("W14O3a-04", "W14O3a", 1,
  "A process owner should examine subsequent performance after corrective action because completing an intervention does not prove that it worked.",
  true,
  "This statement is true. An intervention may fail to address the underlying cause or may create unexpected consequences elsewhere in the process. Follow-up measurement establishes whether the intended improvement actually occurred. If performance remains unsatisfactory, the owner should reconsider the diagnosis and response."
);
 
TF("W14O3a-05", "W14O3a", 2,
  "Once an improvement has been embedded into everyday procedures, the Sustainable Performance cycle should end because further measurement is unnecessary.",
  false,
  "This statement is false. Embedding integrates an effective change into normal operations, but it does not guarantee permanent success. Organisational conditions, employee responsibilities and process requirements may continue changing. The owner must return to measurement and review so emerging deterioration can be recognised and addressed."
);
 
DR("W14O3a-06", "W14O3a", 1,
  "Within the sustaining cycle, {1} provides reliable evidence about process performance, while {2} interprets that evidence and determines whether management action is required.",
  [
    [
      "measurement",
      "embedding",
      "programme closure"
    ],
    [
      "review",
      "technical installation",
      "project sponsorship"
    ]
  ],
  "Measurement establishes what is happening across the process through reliable performance information. Review interprets those results and identifies deviations that require investigation or corrective decisions. Both responsibilities are necessary because information alone cannot maintain performance without accountable management attention."
);
 
DR("W14O3a-07", "W14O3a", 2,
  "The process owner coordinates {1} to address an identified weakness and then supports {2} so the effective change becomes part of normal operations.",
  [
    [
      "improvement",
      "report archiving",
      "project cancellation"
    ],
    [
      "embedding",
      "unregistered variation",
      "temporary programme dependence"
    ]
  ],
  "Improvement involves selecting and coordinating a response to an identified process weakness. Embedding makes that response part of everyday operating procedures, responsibilities and employee practices. Both are required because an agreed corrective action may disappear when management attention moves elsewhere unless the organisation incorporates it into normal work."
);
 
V("W14O3a-08", "W14O3a", 2,
  "Which diagram correctly represents the continuing management cycle required during Sustainable Performance?",
  [
    [
      D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}),
      "The process owner repeatedly measures performance, reviews evidence, improves weaknesses and embeds effective changes"
    ],
    [
      D.flow([
        "Measure|performance",
        "Archive|report",
        "Close|review"
      ]),
      "The organisation collects information and archives it without connecting the evidence to corrective decisions"
    ],
    [
      D.flow([
        "Identify|problem",
        "Assign|blame",
        "Declare|completion"
      ]),
      "Managers respond to deterioration by blaming employees and closing the issue without verifying improvement"
    ],
    [
      D.flow([
        "Approve|change",
        "Publish|procedure",
        "Stop|measurement"
      ]),
      "Managers assume that publishing a revised procedure removes the need for continuing performance review"
    ]
  ],
  "The correct sustaining cycle is Measure, Review, Improve and Embed. Each activity contributes to maintaining and improving performance, and the cycle repeats as operating conditions change. Archiving reports, assigning blame or ending measurement after a procedure is published would leave the organisation vulnerable to further deterioration."
);
 
V("W14O3a-09", "W14O3a", 3,
  "Which diagram best represents the proposed accountability arrangement for sustaining Qasr's arrival process?",
  [
    [
      D.org("process", {top: "Dedicated arrival process owner", depts: ["Performance review", "Affected functions", "Corrective action", "Follow-up"]}),
      "A dedicated process owner coordinates performance review, affected functions, corrective action and verification"
    ],
    [
      D.org("process", {top: "Reporting analyst", depts: ["Permanent process ownership", "All operational approvals", "Corrective decisions"]}),
      "The analyst automatically becomes the accountable process owner because monthly reporting continues"
    ],
    [
      D.org("process", {top: "Separate departments", depts: ["Independent measures", "Independent changes", "No end-to-end review"]}),
      "Departments manage their own activities without a coordinating owner for the complete arrival process"
    ],
    [
      D.org("process", {top: "Original programme team", depts: ["Temporary project closure", "Archived documentation", "No operational follow-up"]}),
      "The original improvement team completes the project without transferring continuing operational responsibility"
    ]
  ],
  "A dedicated process owner would provide continuing accountability for Qasr's complete arrival journey. The proposed role would coordinate performance reviews, involve affected functions, organise corrective decisions and verify results. The analyst's reporting responsibility does not automatically establish process ownership. The case documents the ownership gap but does not establish that a dedicated replacement has already been appointed."
);
 
OR("W14O3a-10", "W14O3a", 2,
  "Arrange these activities into the correct sequence for one complete iteration of the process owner's sustaining cycle.",
  [
    "Collect reliable evidence about the complete process outcome",
    "Review the evidence and identify performance weaknesses requiring attention",
    "Investigate the causes and coordinate an appropriate improvement",
    "Integrate the effective change into normal procedures and responsibilities",
    "Return to measurement to check whether performance remains satisfactory"
  ],
  "The sustaining cycle begins with measurement and review so managers understand what is happening and whether action is needed. Improvement addresses the identified weakness, while embedding incorporates the effective response into everyday operations. Returning to measurement closes the loop and begins the next cycle of continuing performance management."
);
 
MA("W14O3a-11", "W14O3a", 2,
  "Match each activity in the process owner's sustaining loop to its principal management responsibility.",
  [
    [
      "Measure",
      "Collect reliable information about end-to-end outcomes and relevant operating conditions"
    ],
    [
      "Review",
      "Interpret results, investigate meaningful deviations and decide whether action is necessary"
    ],
    [
      "Improve",
      "Coordinate changes that address identified process weaknesses while protecting legitimate requirements"
    ],
    [
      "Embed",
      "Integrate effective changes into normal procedures, responsibilities and employee practices"
    ]
  ],
  "Measurement provides evidence, while review determines what that evidence means for management decisions. Improvement addresses diagnosed weaknesses through coordinated action. Embedding makes effective changes part of normal operations so they do not depend on temporary project attention. Together, these responsibilities create a repeatable approach to sustainable process performance."
);
 
MA("W14O3a-12", "W14O3a", 3,
  "Match each Qasr observation or proposed action to the sustaining management principle it illustrates.",
  [
    [
      "The analyst continues producing monthly arrival information",
      "Reliable measurement exists but must be connected to active management review"
    ],
    [
      "The arrival measure has not been discussed for seven months",
      "The recurring review responsibility has weakened despite continued reporting"
    ],
    [
      "Four approved changes collectively account for thirteen additional arrival minutes",
      "Improvement decisions require investigation of cumulative end-to-end consequences"
    ],
    [
      "A dedicated owner is proposed to coordinate reviews and corrective action",
      "Continuing accountability would connect operational evidence to decisions and follow-through"
    ]
  ],
  "Qasr's monthly measure demonstrates that performance information remains available, but the absence of regular discussion reveals a weakness in review. The combined effect of approved changes shows why improvement decisions must consider the complete process. Restoring dedicated ownership is a proposed response that would establish responsibility for coordinating review, corrective action and follow-up. The exhibit does not establish that this appointment has already occurred."
);

// W14O3b · Governing changes without blocking improvement
// Lesson l3: Governance that holds the gain
// Outcome O3 [S3]: Devise governance that maintains and
// continuously improves processes.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O3b-01", "W14O3b", 1,
  "What is the main purpose of proportionate change governance during the Sustainable Performance phase?",
  [
    "Apply oversight appropriate to each change's significance while protecting end-to-end performance and enabling useful improvement",
    "Require every operational adjustment to receive steering-group approval regardless of its consequences",
    "Allow departments to approve changes independently whenever they can explain a legitimate local benefit",
    "Prevent further modification of the redesigned process after the original BPM programme has ended"
  ],
  "Proportionate governance applies different levels of scrutiny according to a proposed change's significance and consequences. Minor adjustments should not face unnecessary bureaucracy, but changes affecting performance, risk or process boundaries need appropriate oversight. The objective is to enable responsible improvement while protecting the benefits already achieved."
);
 
M("W14O3b-02", "W14O3b", 2,
  "A proposed process adjustment falls below the agreed materiality threshold and does not require wider escalation. What approval route does Week 14 recommend?",
  [
    "The process owner decides, records the change and reviews accumulated minor changes quarterly",
    "The steering group must approve the adjustment after returning to phase-three scoping",
    "The risk function must approve the adjustment regardless of whether it concerns an incident-related control",
    "The local department implements the adjustment without recording it or informing the process owner"
  ],
  "For changes below materiality, the process owner can make the decision without unnecessary escalation. However, the change must be logged and minor changes reviewed together quarterly. This preserves flexibility while allowing managers to recognise when individually small adjustments create significant cumulative consequences."
);
 
M("W14O3b-03", "W14O3b", 3,
  "Qasr wants to reconsider passport re-verification, which was introduced following a regulatory inspection. Which governance approach is most defensible?",
  [
    "Involve the process owner and risk specialists to assess the continuing obligation and whether the control can operate more economically",
    "Remove passport re-verification immediately because its contribution to waiting makes the original regulatory concern irrelevant",
    "Preserve the existing procedure permanently without examining whether its implementation creates avoidable delays",
    "Allow reception employees to decide individually whether the control is necessary during busy arrival periods"
  ],
  "Passport re-verification followed a regulatory inspection, so its compliance purpose must be respected. The Week 14 governance route for controls added after incidents involves the process owner and risk specialists. They should examine whether the underlying risk remains live and whether the proposed control is the cheapest suitable option. Necessary requirements should be protected while avoidable operational consequences are examined."
);
 
TF("W14O3b-04", "W14O3b", 1,
  "A change below the materiality threshold may be approved by the process owner, but it should still be logged and considered during quarterly aggregate review.",
  true,
  "This statement is true. The Week 14 proposal allows the process owner to decide changes below materiality without unnecessary escalation. Recording these changes and reviewing them together quarterly helps reveal cumulative effects that may not be apparent when each adjustment is considered separately."
);
 
TF("W14O3b-05", "W14O3b", 2,
  "Any proposed change to the boundary of a process can be approved by the operational process owner alone, provided the change is expected to improve performance.",
  false,
  "This statement is false. Changes to the process boundary require steering-group review and a return to phase-three Launch Pad scoping. Boundary changes can alter the work, responsibilities and objectives covered by the process. Their significance therefore requires wider governance than an ordinary operational adjustment."
);
 
DR("W14O3b-06", "W14O3b", 1,
  "When a proposed change affects the end-to-end performance measure, the process owner should involve {1} and state the {2} before approval.",
  [
    [
      "affected functions",
      "the original programme sponsor alone",
      "the reporting analyst alone"
    ],
    [
      "modelled performance effect",
      "date of the original project launch",
      "number of completed training sessions"
    ]
  ],
  "Changes affecting the end-to-end measure require consultation with the functions whose activities or outcomes may be affected. The modelled effect is an evidence-based estimate of the proposed change's performance consequences before implementation. This helps managers evaluate the complete process rather than approving changes solely for local benefits."
);
 
DR("W14O3b-07", "W14O3b", 2,
  "A proposed change to the process boundary requires review by the {1} and a return to {2} for renewed scoping.",
  [
    [
      "steering group",
      "reporting analyst",
      "local shift supervisor"
    ],
    [
      "phase three, Launch Pad",
      "phase nine, Realize Value",
      "phase ten, Sustainable Performance"
    ]
  ],
  "A process-boundary change may redefine the work covered by the process and the responsibilities involved. The Week 14 governance proposal therefore requires steering-group review and renewed scoping through phase three, Launch Pad. This is different from the approval route for minor operational adjustments."
);
 
V("W14O3b-08", "W14O3b", 2,
  "Which diagram correctly represents the approval route for a change that affects the end-to-end performance measure?",
  [
    [
      D.flow([
        "Identify|measure impact",
        "Model|effect",
        "Consult|affected functions",
        "Owner|decides"
      ]),
      "The owner considers the modelled performance effect and consults affected functions before approval"
    ],
    [
      D.flow([
        "Identify|measure impact",
        "Local|approval",
        "Implement|without review"
      ]),
      "A local manager approves the change without considering its consequences for the complete process"
    ],
    [
      D.flow([
        "Identify|measure impact",
        "Remove|all controls",
        "Assume|improvement"
      ]),
      "Managers automatically remove existing controls whenever a proposed change affects performance"
    ],
    [
      D.flow([
        "Identify|measure impact",
        "Archive|proposal",
        "Avoid|decision"
      ]),
      "Managers avoid deciding on the change because any effect on the end-to-end measure makes improvement inappropriate"
    ]
  ],
  "A proposed change affecting the end-to-end measure requires an estimate of its likely performance effect and consultation with affected functions. The process owner then makes a coordinated decision using that evidence. This protects the complete process without preventing legitimate improvement. Automatic local approval, removal of controls or avoidance of decisions would not provide proportionate governance."
);
 
V("W14O3b-09", "W14O3b", 3,
  "Which diagram correctly represents the governance route for a proposed change to the process boundary?",
  [
    [
      D.flow([
        "Boundary|change proposed",
        "Steering group|reviews",
        "Phase three|scoping",
        "Scope|decision"
      ]),
      "A process-boundary change requires steering-group review and renewed Launch Pad scoping"
    ],
    [
      D.flow([
        "Boundary|change proposed",
        "Local manager|approves",
        "Change|implemented"
      ]),
      "The local manager approves a process-boundary change without wider governance"
    ],
    [
      D.flow([
        "Boundary|change proposed",
        "Owner|logs",
        "Quarterly|minor review"
      ]),
      "A process-boundary change is treated as a minor adjustment below materiality"
    ],
    [
      D.flow([
        "Boundary|change proposed",
        "Risk specialist|approves",
        "Scope|unchanged"
      ]),
      "Risk approval alone replaces the need to reconsider the process boundary"
    ]
  ],
  "Changes to the process boundary require steering-group consideration and a return to phase-three scoping. These decisions can alter what the organisation intends the process to cover. They therefore require a different governance route from minor changes, ordinary end-to-end performance adjustments or incident-related controls."
);
 
OR("W14O3b-10", "W14O3b", 2,
  "Arrange these activities into the correct sequence for governing a proposed change that could affect end-to-end process performance.",
  [
    "Identify the proposed change and its potential effect on the complete process",
    "Develop an evidence-based estimate of its likely performance consequences",
    "Consult the operational functions affected by the proposed change",
    "Make a coordinated approval decision through the process owner",
    "Record the approved change and monitor its subsequent performance effects"
  ],
  "Governance begins by identifying the proposed change and recognising its potential consequences. Managers then model the expected effect and consult affected functions before the process owner makes an informed decision. Recording the approved change and monitoring its results allows the organisation to recognise unintended consequences and sustain performance."
);
 
MA("W14O3b-11", "W14O3b", 2,
  "Match each type of process change to the approval route recommended in Week 14.",
  [
    [
      "Change below the materiality threshold",
      "The process owner decides, logs the change and reviews minor changes together quarterly"
    ],
    [
      "Change affecting the end-to-end measure",
      "The process owner consults affected functions and considers the modelled performance effect before approval"
    ],
    [
      "Control introduced after an incident",
      "The process owner and risk specialists examine the continuing risk and the cost of the proposed control"
    ],
    [
      "Change to the process boundary",
      "The steering group reviews the proposal and returns to phase-three scoping"
    ]
  ],
  "The Week 14 governance model uses four routes according to the nature of the change. Minor changes receive lightweight owner approval with logging and quarterly aggregate review. Changes affecting end-to-end performance require modelling and consultation. Incident-related controls require risk-sensitive assessment, while process-boundary changes require steering-group review and renewed Launch Pad scoping."
);
 
MA("W14O3b-12", "W14O3b", 3,
  "Match each Qasr observation or proposed governance response to its correct interpretation.",
  [
    [
      "Four separately approved changes collectively add thirteen arrival minutes",
      "Local approval alone did not adequately protect cumulative end-to-end performance"
    ],
    [
      "Passport re-verification follows a regulatory inspection",
      "Any proposed adjustment must respect applicable compliance obligations while examining operational efficiency"
    ],
    [
      "A proposed adjustment could change the lobby-to-room arrival measure",
      "The owner should consult affected functions and model the expected performance effect before approval"
    ],
    [
      "The Week 14 material proposes proportionate approval routes",
      "These routes are recommended sustaining arrangements rather than evidence of Qasr's previous approval procedures"
    ]
  ],
  "Qasr's four approved changes demonstrate why local decisions need end-to-end coordination. Passport re-verification followed a regulatory inspection, so its compliance purpose cannot simply be disregarded. A future change affecting arrival time should be evaluated through modelling and consultation with affected functions. The proposed governance routes describe how Qasr could improve its sustaining arrangements; the exhibit does not establish that those routes were already operating."
);

// W14O3c · The handover that makes accountability real
// Lesson l3: Governance that holds the gain
// Outcome O3 [S3]: Devise governance that maintains and
// continuously improves processes.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O3c-01", "W14O3c", 1,
  "What is the main purpose of a formal process handover when a BPM improvement programme ends?",
  [
    "Transfer continuing process accountability and management obligations to a named operational owner",
    "Confirm that the original programme team has completed its final project documentation",
    "Transfer responsibility for all operational decisions to the analyst producing performance reports",
    "Allow individual departments to manage their activities without continuing end-to-end coordination"
  ],
  "A formal handover transfers continuing responsibility from the temporary BPM programme into normal line management. It identifies a named recipient, an agreed transfer date and the obligations needed to sustain performance. Completing documentation or closing the project does not establish that someone can manage the complete process afterward."
);
 
M("W14O3c-02", "W14O3c", 2,
  "Why is appointing a process owner insufficient if that person lacks authority to coordinate affected departments?",
  [
    "The owner may recognise end-to-end problems but remain unable to secure the decisions needed to resolve them",
    "The owner must personally perform every operational activity before accepting accountability",
    "Departmental managers automatically lose responsibility for their activities when an owner is appointed",
    "The process owner should concentrate exclusively on reporting and avoid involvement in operational decisions"
  ],
  "End-to-end performance depends on activities performed across different functions. A process owner therefore needs sufficient authority to coordinate decisions when problems cross departmental boundaries. Naming someone without appropriate decision rights creates symbolic accountability rather than an effective arrangement for sustaining improvement."
);
 
M("W14O3c-03", "W14O3c", 3,
  "A BPM programme is closing with several known process defects still unresolved. What should the receiving operational owner require?",
  [
    "A record of each outstanding defect with a responsible owner and an agreed target date",
    "A declaration that all remaining defects disappear from management responsibility when the programme closes",
    "A commitment that the original programme team will remain permanently responsible without a formal transfer",
    "A revised performance dashboard that replaces the need to assign responsibility for unresolved problems"
  ],
  "Outstanding defects are known problems that remain unresolved when the programme concludes. They should transfer into operational management with named owners and target dates. This prevents unfinished work from disappearing after project closure. A dashboard can help monitor performance, but it cannot replace responsibility for resolving known defects."
);
 
TF("W14O3c-04", "W14O3c", 1,
  "A formal BPM handover should identify the receiving process owner, the transfer date and the continuing obligations associated with process performance.",
  true,
  "This statement is true. Formal handover establishes who accepts continuing accountability and when that responsibility begins. It should also specify process objectives, measurement arrangements, management reviews and outstanding defects. These elements help the organisation sustain performance after the original programme team leaves."
);
 
TF("W14O3c-05", "W14O3c", 2,
  "Because Qasr's analyst continued producing monthly arrival measures, the Week 14 evidence establishes that the analyst had formally accepted end-to-end process ownership.",
  false,
  "This statement is false. The analyst continued producing the monthly arrival measure, but reporting responsibility does not establish process ownership. Qasr's appointed owner was promoted without a dedicated replacement, and accountability was absorbed by the group operations director. The evidence does not establish that the analyst received formal ownership or operational decision-making authority."
);
 
DR("W14O3c-06", "W14O3c", 1,
  "A formal handover should identify a named {1} and an agreed {2}, so continuing accountability does not remain uncertain after programme closure.",
  [
    [
      "receiving process owner",
      "reporting software supplier",
      "original project consultant"
    ],
    [
      "transfer date",
      "marketing campaign date",
      "next annual recruitment date"
    ]
  ],
  "A named receiving process owner establishes who becomes accountable for the process after the BPM programme ends. An agreed transfer date establishes when that accountability begins. Both are necessary because informal assumptions can leave responsibilities unclear when project personnel return to other assignments."
);
 
DR("W14O3c-07", "W14O3c", 2,
  "When a BPM programme closes with unresolved defects, each defect should transfer with {1} and {2} so that unfinished work remains accountable.",
  [
    [
      "a named responsible owner",
      "an unassigned reporting category",
      "an automatic completion declaration"
    ],
    [
      "an agreed target date",
      "the original project launch date",
      "a permanent exemption from review"
    ]
  ],
  "Outstanding defects require named responsibility and an agreed target date. These details allow operational managers to monitor unfinished work and ensure that it remains visible after programme closure. Simply documenting a problem without assigning responsibility does not establish an effective route to resolution."
);
 
V("W14O3c-08", "W14O3c", 2,
  "Which diagram correctly represents the formal transfer of process responsibility from a temporary BPM programme into continuing operations?",
  [
    [
      D.flow([
        "BPM|programme",
        "Named|recipient",
        "Agreed|transfer date",
        "Line|management"
      ]),
      "The programme transfers continuing accountability to a named operational recipient on an agreed date"
    ],
    [
      D.flow([
        "BPM|programme",
        "Documents|archived",
        "Ownership|unassigned"
      ]),
      "The programme closes after archiving documents without identifying a continuing process owner"
    ],
    [
      D.flow([
        "BPM|programme",
        "Analyst|reports",
        "Ownership|assumed"
      ]),
      "Monthly reporting automatically establishes formal operational ownership without an agreed transfer"
    ],
    [
      D.flow([
        "BPM|programme",
        "Departments|separate",
        "End-to-end|review ends"
      ]),
      "Individual departments inherit separate activities while continuing end-to-end management is discontinued"
    ]
  ],
  "Formal handover identifies the operational recipient and establishes when continuing responsibility transfers from the BPM programme. This creates a clear basis for managing performance after programme closure. Archiving documents, continuing reporting or distributing activities across departments does not automatically establish end-to-end accountability."
);
 
V("W14O3c-09", "W14O3c", 3,
  "Which diagram best represents the continuing responsibilities that should accompany formal process ownership?",
  [
    [
      D.hier([["Process objectives", ""], ["Measure production", ""], ["Performance review", ""], ["Outstanding defects", ""]]),
      "The receiving owner accepts objectives, measurement arrangements, review obligations and unresolved work"
    ],
    [
      D.hier([["Project launch", ""], ["Original budget", ""], ["Consultant selection", ""], ["Programme celebration", ""]]),
      "The receiving owner concentrates on historical programme activities rather than continuing operational obligations"
    ],
    [
      D.hier([["Monthly reports", ""], ["Report formatting", ""], ["Report distribution", ""], ["Report archiving", ""]]),
      "The receiving owner is responsible only for producing and distributing management information"
    ],
    [
      D.hier([["Departmental independence", ""], ["Separate approvals", ""], ["Unassigned defects", ""], ["No performance review", ""]]),
      "The receiving owner allows functions to operate independently without coordinating end-to-end performance"
    ]
  ],
  "A formal handover should transfer process objectives, arrangements for producing measures, regular performance review and outstanding defects. These obligations establish how the receiving owner will sustain the process after programme closure. Historical project activities and reporting administration alone do not provide the continuing accountability required."
);
 
OR("W14O3c-10", "W14O3c", 2,
  "Arrange these activities into a sensible sequence for transferring a completed BPM improvement into continuing line management.",
  [
    "Identify the operational manager who will receive end-to-end process accountability",
    "Agree the transfer date and confirm the recipient's decision-making authority",
    "Document continuing objectives, measures and performance review obligations",
    "Transfer outstanding defects with named owners and target dates",
    "Formally accept operational responsibility and begin the agreed management reviews"
  ],
  "A sound handover establishes who will receive accountability and confirms the authority needed to manage the complete process. The parties then define continuing objectives, measurement and review obligations. Outstanding defects must remain assigned and visible. Formal acceptance allows the receiving owner to begin managing performance through normal operational arrangements."
);
 
MA("W14O3c-11", "W14O3c", 2,
  "Match each formal handover element to the management problem it helps prevent.",
  [
    [
      "Named recipient and transfer date",
      "Uncertainty about who becomes accountable and when responsibility begins"
    ],
    [
      "Defined process objectives and measures",
      "Loss of clarity about the outcomes the redesigned process must continue delivering"
    ],
    [
      "Agreed performance review meeting",
      "Reliable information being produced without regular management interpretation and decisions"
    ],
    [
      "Outstanding defects with owners and dates",
      "Known unresolved problems disappearing from accountability after programme closure"
    ]
  ],
  "Each handover element protects a different aspect of sustainability. A named recipient and date establish accountability, while objectives and measures define what must be maintained. Regular review connects evidence to decisions. Assigning outstanding defects ensures that unfinished work remains visible and receives attention after the programme ends."
);
 
MA("W14O3c-12", "W14O3c", 3,
  "Match each Qasr observation or proposed response to its correct interpretation for continuing process accountability.",
  [
    [
      "The appointed arrival process owner was promoted nine months ago",
      "The original ownership arrangement did not retain a dedicated owner after the role changed"
    ],
    [
      "The group operations director absorbed accountability while managing thirteen direct reports",
      "Continuing responsibility existed at senior level but dedicated end-to-end attention may have been weakened"
    ],
    [
      "The analyst continued producing monthly arrival measures",
      "Reporting continuity did not establish that active process ownership and review were effective"
    ],
    [
      "A dedicated owner with authority and regular reviews is proposed",
      "The recommendation would restore accountable coordination but is not a documented completed appointment"
    ]
  ],
  "Qasr's appointed process owner was promoted without a dedicated replacement. Accountability moved to the group operations director, who already managed thirteen direct reports. Although monthly reporting continued, the arrival measure was not discussed regularly. Restoring dedicated ownership with authority and review obligations is therefore a defensible proposal, but the exhibit does not establish that Qasr has already implemented it."
);

// W14O2d · Exhibit 14: twenty-two months of gradual decay
// Lesson l4: Twenty-two months later: the Qasr decision
// Outcome O2 [K3]: Analyse the drift back towards prior performance
// when no individual has done anything wrong.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O2d-01", "W14O2d", 1,
  "Which interpretation best explains the arrival-time evidence in Qasr's Exhibit 14?",
  [
    "The original improvement was genuine, but performance subsequently deteriorated from 24 minutes to 39 minutes",
    "The original redesign failed because arrival time never improved below its 82-minute baseline",
    "Arrival performance remained stable after rollout because the monthly measure continued being produced",
    "The process improved continuously after month five because arrival time increased from 24 minutes to 39 minutes"
  ],
  "Qasr's original lobby-to-room arrival time was 82 minutes. The redesigned process reduced it to 24 minutes at month five, demonstrating a substantial improvement. Arrival time subsequently increased to 28 minutes at month thirteen and 39 minutes at month twenty-two. The evidence therefore shows a genuine improvement followed by gradual deterioration."
);
 
M("W14O2d-02", "W14O2d", 2,
  "What is the strongest conclusion supported by Qasr's documented ownership and reporting arrangements?",
  [
    "Continuing accountability and active management review weakened even though monthly performance reporting continued",
    "The reporting analyst stopped producing the arrival measure after the appointed process owner was promoted",
    "The group operations director deliberately caused the deterioration by instructing employees to ignore the redesigned process",
    "The original BPM programme team remained formally responsible for every operational decision throughout the following twenty-two months"
  ],
  "Qasr's appointed process owner was promoted nine months ago without a dedicated replacement. Accountability was absorbed by the group operations director, who had thirteen direct reports. The analyst continued producing the monthly measure, but managers had not discussed it for seven months. These facts support a governance diagnosis without establishing deliberate misconduct."
);
 
M("W14O2d-03", "W14O2d", 3,
  "Qasr's four approved changes account for 13 of the 15 additional arrival minutes since month five. How should managers interpret the remaining two minutes?",
  [
    "They remain unexplained by the documented changes and require further investigation before assigning a cause",
    "They must have resulted from employee resistance because the approved changes explain the other thirteen minutes",
    "They can be attributed equally to the four approved changes because each change received separate approval",
    "They prove that the monthly arrival measure is inaccurate and should no longer be used"
  ],
  "Arrival time increased from 24 minutes to 39 minutes, a deterioration of fifteen minutes. The four documented changes collectively account for thirteen minutes. The exhibit does not explain the remaining two minutes or establish each change's individual contribution. A defensible diagnosis must acknowledge these limits rather than invent causes."
);
 
TF("W14O2d-04", "W14O2d", 1,
  "Qasr's arrival time increased during each of the latest six months, supporting a diagnosis of sustained deterioration rather than one isolated incident.",
  true,
  "This statement is true. The exhibit records an increase in arrival time during each of the latest six months. This repeated pattern supports investigating continuing performance drift. It does not, by itself, establish the cause, but it provides stronger evidence of sustained deterioration than one unfavourable observation."
);
 
TF("W14O2d-05", "W14O2d", 2,
  "Because Qasr's four approved changes collectively added thirteen minutes, the exhibit establishes the exact number of minutes contributed by each individual change.",
  false,
  "This statement is false. The exhibit establishes the combined thirteen-minute effect of four approved changes. It does not allocate that increase among passport re-verification, the rate waiver threshold, the loyalty enrolment prompt and permanent desk positions. Individual contributions must not be invented without supporting evidence."
);
 
DR("W14O2d-06", "W14O2d", 1,
  "Qasr's lobby-to-room arrival time improved from an original baseline of {1} to 24 minutes at month five, before deteriorating to {2} at month twenty-two.",
  [
    [
      "82 minutes",
      "65 minutes",
      "39 minutes"
    ],
    [
      "39 minutes",
      "28 minutes",
      "48 minutes"
    ]
  ],
  "Qasr's original arrival-time baseline was 82 minutes. The redesigned process achieved 24 minutes at month five, followed by 28 minutes at month thirteen and 39 minutes at month twenty-two. These figures demonstrate substantial initial improvement followed by gradual deterioration."
);
 
DR("W14O2d-07", "W14O2d", 2,
  "Between month five and month twenty-two, Qasr's arrival time increased by {1}. The four documented changes collectively account for {2} of that increase.",
  [
    [
      "15 minutes",
      "13 minutes",
      "17 minutes"
    ],
    [
      "13 minutes",
      "15 minutes",
      "2 minutes"
    ]
  ],
  "Arrival time increased from 24 minutes at month five to 39 minutes at month twenty-two, giving a total deterioration of fifteen minutes. The four separately approved changes collectively explain thirteen minutes. The remaining two minutes are not attributed to those changes by the exhibit."
);
 
V("W14O2d-08", "W14O2d", 2,
  "Which diagram correctly represents Qasr's documented lobby-to-room arrival-time trajectory?",
  [
    [
      D.bars([["Baseline", 82], ["Month 5", 24], ["Month 13", 28], ["Month 22", 39]]),
      "Arrival time falls from 82 minutes to 24 minutes before increasing to 28 and then 39 minutes"
    ],
    [
      D.bars([["Baseline", 82], ["Month 5", 39], ["Month 13", 28], ["Month 22", 24]]),
      "Arrival time improves continuously throughout the twenty-two-month period"
    ],
    [
      D.bars([["Baseline", 24], ["Month 5", 28], ["Month 13", 39], ["Month 22", 82]]),
      "Arrival time deteriorates continuously from an original baseline of 24 minutes"
    ],
    [
      D.bars([["Baseline", 82], ["Month 5", 24], ["Month 13", 24], ["Month 22", 24]]),
      "The redesigned process maintains its month-five result without subsequent deterioration"
    ]
  ],
  "The documented arrival-time sequence is 82 minutes at baseline, 24 minutes at month five, 28 minutes at month thirteen and 39 minutes at month twenty-two. The sequence demonstrates that Qasr achieved a substantial improvement but did not sustain the delivered result. The increasing results after month five are evidence of performance drift."
);
 
V("W14O2d-09", "W14O2d", 3,
  "Which diagram correctly separates the documented contribution of Qasr's four approved changes from the remaining arrival-time deterioration?",
  [
    [
      D.bars([["Four changes", 13], ["Other increase", 2], ["Total increase", 15]]),
      "Four approved changes explain thirteen additional minutes, while two minutes remain unexplained by those changes"
    ],
    [
      D.bars([["Four changes", 15], ["Other increase", 0], ["Total increase", 15]]),
      "The four approved changes explain every additional minute of arrival time"
    ],
    [
      D.bars([["Four changes", 2], ["Other increase", 13], ["Total increase", 15]]),
      "Only two additional minutes are attributed to the four approved changes"
    ],
    [
      D.bars([["Four changes", 13], ["Other increase", 15], ["Total increase", 28]]),
      "The combined deterioration amounts to twenty-eight minutes after month five"
    ]
  ],
  "The difference between Qasr's month-five result of 24 minutes and its month-twenty-two result of 39 minutes is fifteen minutes. The exhibit attributes thirteen minutes to four separately approved changes. The remaining two minutes are not explained by those changes. The evidence does not establish individual contributions or additional causes."
);
 
OR("W14O2d-10", "W14O2d", 2,
  "Arrange these activities into a defensible sequence for diagnosing Qasr's twenty-two-month performance deterioration.",
  [
    "Establish the original baseline and the performance achieved after rollout",
    "Examine the subsequent arrival-time and kiosk-adoption trends",
    "Review the documented changes in process ownership and management attention",
    "Investigate the combined effects of the four approved process changes",
    "Separate established findings from causes that remain unexplained",
    "Use the diagnosis to identify a defensible sustaining intervention"
  ],
  "A defensible diagnosis begins with reliable evidence about the original improvement and subsequent deterioration. Managers then examine adoption, ownership, management review and documented process changes. They must distinguish established findings from unexplained effects before recommending intervention. This avoids selecting a response based on unsupported assumptions about individual behaviour."
);
 
MA("W14O2d-11", "W14O2d", 2,
  "Match each documented Qasr observation to the sustainability concern it reveals.",
  [
    [
      "Arrival time increases from 24 minutes to 39 minutes",
      "The previously achieved end-to-end performance improvement has partially deteriorated"
    ],
    [
      "Kiosk adoption declines from 65% to 48%",
      "Use of the redesigned kiosk process has weakened over the observed period"
    ],
    [
      "The appointed process owner is promoted without a dedicated replacement",
      "Continuing end-to-end accountability may receive insufficient dedicated attention"
    ],
    [
      "The monthly arrival measure is not discussed for seven months",
      "Performance reporting continues without sustained management review"
    ]
  ],
  "Qasr's arrival-time and adoption figures establish deterioration in performance and use of the redesigned process. The owner's promotion without a dedicated replacement identifies a governance vulnerability. The absence of management discussion despite continued reporting reveals a weakness in active review. These findings support a system-level diagnosis without proving individual negligence."
);
 
MA("W14O2d-12", "W14O2d", 3,
  "Match each statement about Qasr's deterioration to the correct evidence-based interpretation.",
  [
    [
      "Four approved changes collectively account for thirteen additional minutes",
      "The combined effect is documented, but individual contributions are not established"
    ],
    [
      "Passport re-verification followed a regulatory inspection",
      "The change had a documented compliance context that must be considered before proposing removal"
    ],
    [
      "Two additional arrival minutes remain unexplained by the four changes",
      "Further investigation is needed before assigning those minutes to a specific cause"
    ],
    [
      "Restoring dedicated process ownership is recommended",
      "This is a proposed sustaining intervention rather than a documented completed appointment"
    ]
  ],
  "The exhibit establishes the combined effect of four approved changes without identifying each change's individual contribution. Passport re-verification followed a regulatory inspection, so its compliance context matters. Two additional minutes remain unexplained by those changes. Restoring dedicated ownership is a defensible recommendation based on the governance gap, but the case does not establish that the appointment has occurred."
);

// W14O3d · One intervention, four candidates, one defensible choice
// Lesson l4: Twenty-two months later: the Qasr decision
// Outcome O3 [S3]: Devise governance that maintains and
// continuously improves processes.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O3d-01", "W14O3d", 1,
  "Qasr can prioritise only one immediate intervention. Which choice is most defensible given the documented governance weaknesses?",
  [
    "Restore dedicated process ownership with authority to coordinate performance review and corrective decisions",
    "Require all reception employees to repeat their original training before investigating the causes of deterioration",
    "Remove every process step introduced after rollout without examining its regulatory or operational purpose",
    "Produce additional performance dashboards while leaving responsibility for reviewing results unchanged"
  ],
  "Restoring dedicated ownership directly addresses a documented governance gap. Qasr's appointed owner was promoted without a dedicated replacement, while management review of the arrival measure weakened. A named owner could coordinate investigation, affected functions and corrective decisions. This is a reasoned priority, not a guarantee that ownership alone will restore arrival time."
);
 
M("W14O3d-02", "W14O3d", 2,
  "Why is renewed employee training a weaker immediate priority than restoring accountable process ownership at Qasr?",
  [
    "The exhibit does not establish inadequate employee knowledge as the cause, while the loss of dedicated ownership is documented",
    "Employee training cannot contribute to process improvement under any circumstances",
    "The exhibit proves that employees already received sufficient retraining after every approved process change",
    "Training would automatically remove the regulatory obligations associated with passport re-verification"
  ],
  "Training can be useful when evidence identifies a knowledge or capability problem. However, Qasr's exhibit does not establish inadequate employee knowledge as a cause of deterioration. It does document the loss of dedicated process ownership and weakened management review. Restoring accountability is therefore better supported as the immediate priority."
);
 
M("W14O3d-03", "W14O3d", 3,
  "Why should Qasr avoid automatically removing all four approved process changes to recover the thirteen additional arrival minutes?",
  [
    "Some changes address legitimate requirements, so their necessity and implementation must be examined before corrective decisions",
    "Every approved change must remain permanently unchanged regardless of its effect on the guest arrival journey",
    "The thirteen-minute combined effect proves that none of the changes influenced arrival performance",
    "Removing the changes would automatically resolve the unexplained two minutes and restore kiosk adoption"
  ],
  "The four approved changes collectively account for thirteen additional arrival minutes, making them important candidates for investigation. However, passport re-verification followed a regulatory inspection, and other changes may serve legitimate purposes. Qasr should assess their necessity and combined effects before deciding how to improve their implementation. Automatic removal could create new problems."
);
 
TF("W14O3d-04", "W14O3d", 1,
  "Restoring dedicated process ownership is a defensible recommendation for Qasr, but the exhibit does not establish that this intervention has already been implemented.",
  true,
  "This statement is true. The case documents the promotion of Qasr's appointed process owner without a dedicated replacement. Restoring ownership is a proposed response to that governance weakness. The exhibit does not establish that a replacement has been appointed or that performance has recovered following such an appointment."
);
 
TF("W14O3d-05", "W14O3d", 2,
  "Because the four approved changes explain thirteen additional arrival minutes, appointing a dedicated process owner would automatically remove those thirteen minutes without further investigation.",
  false,
  "This statement is false. Restoring ownership establishes accountability for investigating deterioration and coordinating corrective action. It does not automatically reverse the operational consequences of approved changes. The owner must examine their purposes, consult affected functions, select appropriate responses and verify subsequent performance."
);
 
DR("W14O3d-06", "W14O3d", 1,
  "The strongest immediate recommendation is to restore {1}, because Qasr has a documented gap in continuing accountability. The intervention should include {2} so the owner can coordinate corrective decisions.",
  [
    [
      "dedicated process ownership",
      "additional report formatting",
      "automatic employee retraining"
    ],
    [
      "sufficient decision-making authority",
      "exclusive responsibility for preparing charts",
      "permanent exemption from performance review"
    ]
  ],
  "Qasr lost dedicated process ownership when its appointed owner was promoted. A replacement should have sufficient authority to coordinate the operational functions affecting the complete arrival process. Naming an owner without decision-making authority would not resolve the underlying governance weakness. Reporting and training may support later interventions when justified by evidence."
);
 
DR("W14O3d-07", "W14O3d", 2,
  "Qasr's four approved changes explain {1} of the fifteen additional arrival minutes. The remaining {2} require further investigation rather than an invented explanation.",
  [
    [
      "thirteen minutes",
      "fifteen minutes",
      "two minutes"
    ],
    [
      "two minutes",
      "thirteen minutes",
      "seventeen minutes"
    ]
  ],
  "Qasr's arrival time increased from twenty-four minutes at month five to thirty-nine minutes at month twenty-two. The four approved changes collectively account for thirteen of those fifteen additional minutes. The remaining two minutes are not explained by the documented changes. Managers should investigate them rather than assume employee resistance or another unsupported cause."
);
 
V("W14O3d-08", "W14O3d", 2,
  "Which diagram best represents the proposed governance arrangement for Qasr's highest-priority intervention?",
  [
    [
      D.org("process", {top: "Dedicated arrival process owner", depts: ["Performance review", "Adoption investigation", "Change governance", "Corrective follow-up"]}),
      "A dedicated owner coordinates performance review, adoption investigation, change governance and verification"
    ],
    [
      D.org("process", {top: "Reporting analyst", depts: ["Monthly reports", "Report formatting", "Report distribution"]}),
      "The analyst continues producing reports without a dedicated owner coordinating operational decisions"
    ],
    [
      D.org("process", {top: "Separate departments", depts: ["Independent approvals", "Local measures", "Uncoordinated changes"]}),
      "Departments make separate decisions without continuing end-to-end process accountability"
    ],
    [
      D.org("process", {top: "Temporary project team", depts: ["Employee retraining", "Project closure", "No follow-up"]}),
      "A temporary team conducts retraining without establishing continuing ownership or verifying performance"
    ]
  ],
  "The proposed priority is to restore a dedicated arrival process owner with authority to coordinate the complete process. That owner would review performance, investigate declining adoption, govern changes and verify corrective action. Reporting alone, independent departmental decisions and temporary interventions do not adequately address the documented governance gap."
);
 
V("W14O3d-09", "W14O3d", 3, "Once a dedicated owner is in post, which diagram shows the correct governance route for reviewing Qasr's passport re-verification step?", [[D.flow(["Review|incident control", "Test|current risk", "Assess|control cost", "Owner and risk|decide"]), "The owner and risk specialists test whether the risk is still live and whether this is the cheapest control"], [D.flow(["Identify|added step", "Remove|immediately", "Assume|faster arrivals"]), "The owner removes the step at once because it adds time to guest arrivals"], [D.flow(["Keep|control", "Exempt from|review", "Accept|the delay"]), "The control is kept permanently and excluded from any further review"], [D.flow(["Reception staff|decide", "Skip it|when busy", "No|record kept"]), "Reception staff decide case by case whether to perform the check during busy periods"]], "Passport re-verification was added after a regulatory inspection queried identity records, so it is a control added after an incident. The slide route for such changes is the owner plus risk, applying two tests: is the risk still live, and is this the cheapest control? Removing it without that test ignores the compliance concern. Exempting it from review, or leaving it to staff discretion, leaves its cost to the end-to-end measure unmanaged.");
 
OR("W14O3d-10", "W14O3d", 2,
  "Arrange these activities into a defensible sequence for implementing the recommended Qasr ownership intervention.",
  [
    "Appoint a dedicated arrival process owner with sufficient decision-making authority",
    "Establish recurring reviews of arrival performance and kiosk adoption",
    "Investigate the documented deterioration and the cumulative effects of approved changes",
    "Consult affected functions and agree corrective actions that preserve legitimate requirements",
    "Assign responsibility for the agreed actions and monitor their implementation",
    "Verify subsequent performance and embed changes that prove effective"
  ],
  "Restoring ownership establishes who is accountable for coordinating the response. Regular review connects existing measures to management decisions, while investigation identifies the causes requiring attention. Affected functions should help evaluate corrective options before implementation. Follow-up measurement and embedding determine whether the intervention produces sustainable improvement."
);
 
MA("W14O3d-11", "W14O3d", 2,
  "Match each proposed Qasr intervention to the main limitation or advantage identified in the decision exercise.",
  [
    [
      "Renew employee training",
      "May help if a knowledge problem is established, but the exhibit does not document that cause"
    ],
    [
      "Remove accumulated process steps",
      "Targets visible delays but risks disregarding legitimate regulatory or operational requirements"
    ],
    [
      "Expand performance reporting",
      "Adds information even though Qasr already produces the arrival measure monthly"
    ],
    [
      "Restore dedicated process ownership",
      "Addresses a documented accountability gap and enables coordinated investigation and follow-through"
    ]
  ],
  "The decision exercise compares four proposed interventions against the available evidence. Training assumes a knowledge problem that has not been established. Removing steps without examination could compromise legitimate requirements, while additional reporting does not address the absence of active review. Restoring dedicated ownership directly addresses a documented governance gap and creates the capacity to coordinate further improvement."
);
 
MA("W14O3d-12", "W14O3d", 3,
  "Match each requirement of the recommended ownership intervention to the reason it matters for sustaining Qasr's arrival process.",
  [
    [
      "Sufficient authority across operational functions",
      "Allows the owner to coordinate decisions affecting the complete guest arrival journey"
    ],
    [
      "Recurring performance review",
      "Connects existing arrival and adoption measures to accountable management attention"
    ],
    [
      "Evidence-based examination of approved changes",
      "Protects legitimate requirements while investigating their cumulative operational consequences"
    ],
    [
      "Follow-up measurement after corrective action",
      "Establishes whether the selected response actually improves performance rather than merely completing an activity"
    ]
  ],
  "A dedicated owner needs authority because arrival performance depends on decisions across operational functions. Recurring review makes existing measures useful for management rather than passive reporting. Evidence-based examination of approved changes helps preserve necessary controls while addressing avoidable delays. Follow-up measurement is essential because appointing an owner and implementing changes do not automatically prove that performance has recovered."
);

// W14O1d · From one successful project to a self-improving organisation
// Lesson l4: Twenty-two months later: the Qasr decision
// Outcome O1 [K1]: Assess how process performance is sustained
// after a programme ends.
// Correct answers are authored first; the player shuffles options.
// 12 items: 3 MCQ, 2 TF, 2 drop, 2 visual, 1 order, 2 match.
 
M("W14O1d-01", "W14O1d", 1,
  "What most clearly distinguishes a self-improving organisation from one that has completed a successful BPM project?",
  [
    "It can maintain and improve processes through continuing internal management without depending on a new programme for every problem",
    "It has completed a large number of BPM projects and no longer needs to measure operational performance",
    "It preserves every implemented process unchanged because successful designs should never require further improvement",
    "It transfers all responsibility for process improvement to external consultants after the original programme ends"
  ],
  "A successful BPM project delivers a demonstrated improvement, but a self-improving organisation develops the continuing capability to sustain and improve processes. Its managers use established ownership, measures, governance and improvement methods during normal operations. The ability to address another process problem without automatically launching a new transformation programme is an important sign of organisational maturity."
);
 
M("W14O1d-02", "W14O1d", 2,
  "What is the most appropriate role of a BPM centre of excellence in a self-improving organisation?",
  [
    "Preserve and share process methods, expertise and improvement knowledge while operational owners retain accountability",
    "Replace every operational process owner and approve all routine adjustments regardless of their significance",
    "Concentrate exclusively on producing project completion reports after improvement programmes have ended",
    "Prevent operational managers from adapting processes when organisational conditions or requirements change"
  ],
  "A BPM centre of excellence supports internal improvement capability by maintaining useful methods, expertise and organisational knowledge. It can help managers analyse processes and apply consistent improvement practices. However, it should not automatically replace operational ownership or create unnecessary approval requirements for every minor change."
);
 
M("W14O1d-03", "W14O1d", 3,
  "Qasr wants to demonstrate that it has developed lasting BPM capability after addressing its arrival-process deterioration. Which evidence would be strongest?",
  [
    "Its managers can use established ownership, performance review and improvement methods to sustain the arrival process and improve another process",
    "The original arrival improvement is celebrated again without examining subsequent performance or operational governance",
    "The organisation produces a larger collection of process diagrams while leaving continuing ownership and review responsibilities undefined",
    "Qasr commissions a new external transformation programme whenever another operational process begins to deteriorate"
  ],
  "Lasting BPM capability means that improvement has become part of normal organisational management. Qasr would demonstrate this capability by maintaining accountable ownership, using performance evidence and coordinating improvement across processes. Applying those arrangements to another operational problem would provide stronger evidence of maturity than celebrating an earlier project or producing additional documentation."
);
 
TF("W14O1d-04", "W14O1d", 1,
  "Sustainable Performance can reveal a need to revisit earlier BPM framework phases when operating conditions or process requirements change.",
  true,
  "This statement is true. Sustainable Performance is phase ten, but it is not a permanent endpoint. Operational evidence may show that strategy, process architecture, scope or design needs reconsideration. The organisation can deliberately return to relevant earlier phases when further analysis or improvement is necessary."
);
 
TF("W14O1d-05", "W14O1d", 2,
  "The Week 14 Qasr evidence establishes that restoring dedicated process ownership has already returned arrival time to the delivered result of 24 minutes.",
  false,
  "This statement is false. The exhibit documents deterioration to 39 minutes at month twenty-two and the absence of a dedicated replacement for the promoted process owner. Restoring ownership is a proposed sustaining intervention. The evidence does not establish that Qasr implemented the recommendation or recovered its earlier performance."
);
 
DR("W14O1d-06", "W14O1d", 1,
  "An organisation demonstrates stronger process {1} when it can manage and improve processes systematically. A BPM {2} can support this capability by preserving shared methods and expertise.",
  [
    [
      "maturity",
      "closure",
      "expenditure"
    ],
    [
      "centre of excellence",
      "project termination committee",
      "temporary reporting archive"
    ]
  ],
  "Process maturity describes how systematically an organisation manages and improves its processes. A BPM centre of excellence can support maturity by preserving methods, expertise and organisational learning. Operational managers still need continuing ownership and decision-making responsibility. Maturity is demonstrated through dependable practices rather than the number of completed projects."
);
 
DR("W14O1d-07", "W14O1d", 2,
  "When operational evidence reveals that the existing process no longer fits organisational conditions, Sustainable Performance may require revisiting {1}. Effective changes must then be {2} into normal working practices.",
  [
    [
      "earlier BPM phases",
      "only the original project celebration",
      "the historical programme budget"
    ],
    [
      "embedded",
      "excluded",
      "archived without implementation"
    ]
  ],
  "Sustainable Performance uses operational evidence to determine whether earlier BPM phases need renewed attention. Changes in strategy, architecture, scope or operating requirements may justify further analysis or redesign. Once an improvement proves effective, embedding integrates it into everyday responsibilities and procedures so the organisation can sustain the result."
);
 
V("W14O1d-08", "W14O1d", 2,
  "Which diagram best represents the development of organisational process maturity described in Week 14?",
  [
    [
      D.stairs(-1, {labels: ["Project dependence", "Defined ownership", "Active governance", "Continuous improvement"]}),
      "The organisation develops from temporary project dependence towards systematic ownership, governance and continuous improvement"
    ],
    [
      D.stairs(-1, {labels: ["Continuous improvement", "Active governance", "Defined ownership", "Project dependence"]}),
      "The organisation becomes more mature by abandoning continuous improvement and returning to temporary project dependence"
    ],
    [
      D.stairs(-1, {labels: ["Project completion", "Report archiving", "Owner removal", "Measurement discontinued"]}),
      "The organisation becomes more mature by ending ownership and measurement after each completed project"
    ],
    [
      D.stairs(-1, {labels: ["External consultants", "More consultants", "Permanent dependence", "No internal capability"]}),
      "The organisation develops maturity by becoming increasingly dependent on external specialists for every improvement"
    ]
  ],
  "Process maturity grows as improvement becomes a systematic organisational capability. Defined ownership establishes accountability, while active governance connects performance evidence to coordinated decisions. Continuous improvement allows managers to sustain and adapt processes through normal operations. Increasing project dependence or abandoning measurement does not demonstrate stronger maturity."
);
 
V("W14O1d-09", "W14O1d", 3,
  "Which diagram best illustrates how Sustainable Performance can reconnect operational learning with earlier BPM framework phases?",
  [
    [
      D.flow([
        "Operational|evidence",
        "Identify|new needs",
        "Revisit|earlier phases",
        "Improve|process",
        "Sustain|results"
      ]),
      "Operational evidence can trigger renewed analysis and improvement through earlier BPM phases before the organisation sustains the revised process"
    ],
    [
      D.flow([
        "Programme|completed",
        "Process|frozen",
        "Further review|prohibited"
      ]),
      "The process must remain permanently unchanged after the original improvement programme ends"
    ],
    [
      D.flow([
        "Operational|problem",
        "Employee|blamed",
        "Evidence|ignored"
      ]),
      "Every new operational problem should be attributed to employees without reconsidering process design"
    ],
    [
      D.flow([
        "Operational|evidence",
        "Report|archived",
        "Management|disengages"
      ]),
      "Operational evidence is retained without influencing future process analysis or improvement"
    ]
  ],
  "Sustainable Performance is not a terminal phase that prevents further learning. Operational evidence may reveal changing requirements or weaknesses that justify returning to earlier framework phases. The organisation can then analyse, improve and embed a revised process. This continuing connection allows BPM to adapt while protecting legitimate requirements and realised benefits."
);
 
OR("W14O1d-10", "W14O1d", 2,
  "Arrange these activities into a sensible sequence for developing lasting internal BPM capability after a successful improvement programme.",
  [
    "Transfer continuing accountability to named operational process owners",
    "Establish meaningful measures and recurring performance reviews",
    "Preserve process knowledge and develop shared internal improvement methods",
    "Use operational evidence to diagnose and coordinate further improvements",
    "Embed effective changes into everyday management and working practices",
    "Apply the established capability to another process requiring improvement"
  ],
  "Lasting BPM capability begins with continuing ownership and active performance management. Preserving knowledge and developing shared methods help the organisation improve without depending entirely on temporary specialists. Evidence-based improvement and embedding make the capability part of normal operations. Applying these practices to another process demonstrates that the organisation has learned beyond one successful project."
);
 
MA("W14O1d-11", "W14O1d", 2,
  "Match each element of a self-improving organisation to its contribution to sustainable BPM capability.",
  [
    [
      "Continuing process ownership",
      "Maintains accountability for end-to-end performance after the original programme ends"
    ],
    [
      "BPM centre of excellence",
      "Preserves and shares improvement methods, expertise and organisational knowledge"
    ],
    [
      "Process maturity",
      "Reflects how systematically the organisation manages and improves its processes"
    ],
    [
      "Continuous improvement",
      "Uses recurring operational evidence to identify, implement and sustain further improvements"
    ]
  ],
  "Continuing ownership establishes responsibility for process outcomes, while a BPM centre of excellence supports the organisation with shared knowledge and expertise. Process maturity describes the reliability and systematic nature of these management practices. Continuous improvement uses operational evidence to adapt processes and embed effective changes. Together, these elements reduce dependence on temporary transformation programmes."
);
 
MA("W14O1d-12", "W14O1d", 3,
  "Match each Qasr observation or proposed development to the broader lesson about becoming a self-improving organisation.",
  [
    [
      "Arrival time improves from 82 minutes to 24 minutes after rollout",
      "A successful BPM project can demonstrate substantial realised benefits"
    ],
    [
      "Arrival time subsequently increases to 39 minutes",
      "Realised benefits require continuing management because project success does not guarantee sustainability"
    ],
    [
      "Dedicated process ownership and active review are proposed",
      "Restoring accountable governance would create a foundation for evidence-based improvement"
    ],
    [
      "Managers become capable of improving another process using established BPM methods",
      "Repeatable internal improvement capability would demonstrate stronger organisational process maturity"
    ]
  ],
  "Qasr's original arrival-time improvement demonstrates that its BPM programme achieved a substantial benefit. The later deterioration shows why that achievement required continuing ownership and review. Restoring dedicated governance is a proposed response, not a documented completed action. The wider ambition is for Qasr to develop repeatable internal capabilities that sustain existing improvements and support better management of other processes."
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
