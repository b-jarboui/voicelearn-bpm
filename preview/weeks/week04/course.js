// OPER621 Business Process Management · Week 4 · BPM and Organisational Change.
// Sources: Week 4 Session 1 slides, Week 4 Delivery Plan,
// OPER621 Weekly Delivery Plan (Fall 2026), Jeston Chapter 25.
// Structure and fields follow the Week 1 VoiceLearn course.js.
//
// COURSE LEARNING OUTCOMES
// K3: Assess the importance of change management in relation to BPM
//     and devise solutions to minimize employees' resistance.
// S3: Coordinate people and the change process in organizations
//     to achieve BPM objectives.
//
// WEEK 4 LEARNING OUTCOMES
// O1: Assess the importance of change management to the success of BPM.
// O2: Analyse the sources of employee resistance to process change.
// O3: Devise solutions that reduce resistance and secure adoption.
//
// LESSON AND SECTION MAPPING
// l1: Change Is the Work
//   O1a: Why good process designs fail on adoption       K3, S3 → O1
//   O1b: The performance dip: a cost to plan for         K3, S3 → O1
// l2: Resistance Is Information
//   O2a: What employees stand to lose                    K3 → O2
//   O2b: Resistance or a genuine design defect?          K3, S3 → O2
//   O2c: Match the response to the cause                 K3, S3 → O2, O3
// l3: Engaging the People Who Matter
//   O3a: The stakeholder power–interest grid             K3, S3 → O3
//   O3b: Four engagement strategies                      S3 → O3
//   O3c: Stakeholders move: revisit the grid             K3, S3 → O3
// l4: From Resistance to Adoption
//   O3d: Adoption, workarounds and parallel processes    K3, S3 → O3
//   O3e: Design an intervention with explicit costs      K3, S3 → O3
// l5: The Front Desk Says No: Decisions and Forum
//   O3f: Diagnose, prioritise and defend the response    K3, S3 → O2, O3
//   Closing part: Week 4 synthesis and forum handover    K3, S3 → O1–O3
//
// Narration rules:
// Each line is [spoken sentence, visual moment(s)].
// Null retains the previous visual.
// Every diagram has a full-sentence explanatory caption.
// The running case continues the Qasr Marina hotel story.
// Sections use the same fields as Week 1: title, sec, lines.
// Section scripts are derived automatically from spoken sentences.

(() => {
  const D = window.DIAG;

  const t = (kicker, text, count) =>
    ({ type: "title", kicker, text, count });

  const it = (n, of, icon, title, text) =>
    ({ type: "item", n, of, icon, title, text });

  const q = (text) =>
    ({ type: "question", text });

  const st = (text) =>
    ({ type: "statement", text });

  const iss = (text, effect) =>
    ({ type: "issue", text, effect });

  const cmp = (side, label, note, dir) =>
    ({ type: "compare", side, label, note, dir });

  const dg = (kicker, svg, caption) =>
    ({ type: "diagram", kicker, svg, caption });

  const fm = (label, num, den) =>
    ({ type: "formula", label, num, den });

  window.MOMENT_KIT = { t, it, q, st, iss, cmp, dg, fm };

  window.COURSE = {
    id: "oper621-w4",
    code: "OPER621",
    title: "BPM and Organisational Change",
    subtitle: "Business Process Management · Week 4",
    author: "Prof. Bassem Jarboui",

    teacher: {
      name: "Prof. Bassem Jarboui",
      email: "",
      sendReport: false
    },

    lessons: [
// CHUNK: l1
{
  id: "l1",
  title: "Change Is the Work",
  sections: [
    {
      title: "Why good process designs fail on adoption",
      sec: "O1a",
      lines: [
        [
          "Welcome back to Business Process Management, where our story at Qasr Marina is about to take another turn.",
          t(
            "OPER621 · Week 4",
            "BPM and Organisational Change"
          )
        ],
        [
          "You may remember the exhausted business traveller who waited twenty-three minutes at reception after her delayed flight.",
          null
        ],
        [
          "Every department had met its own target, yet she received a room that was not ready.",
          iss(
            "Every department met its target, but the guest still experienced a failed check-in.",
            "The original problem"
          )
        ],
        [
          "Her disappointing experience showed us why managing the complete customer journey matters more than celebrating departmental efficiency.",
          null
        ],
        [
          "Now imagine returning to Qasr Marina several weeks later, when management proudly presents its redesigned check-in process.",
          t(
            "Back at Qasr Marina",
            "Management has redesigned check-in, but the people who must operate it have concerns."
          )
        ],
        [
          "The proposal removes repeated typing and transfers identity verification from the receptionist to a self-service kiosk.",
          dg(
            "The proposed check-in design",
            D.flow([
              "Guest|arrives",
              "Kiosk|verifies ID",
              "Booking|confirmed",
              "Room|ready",
              "+Guest|settled"
            ]),
            "The proposed design uses a kiosk for identity verification and simplifies the guest's journey."
          )
        ],
        [
          "According to the proposal, check-in should fall from twenty-three minutes to approximately five minutes.",
          [
            cmp(
              "a",
              "Current check-in",
              "The existing desk interaction takes approximately 23 minutes."
            ),
            cmp(
              "b",
              "Proposed check-in",
              "The redesigned interaction is expected to take approximately 5 minutes."
            )
          ]
        ],
        [
          "The design also removes roughly forty percent of front-desk keystrokes, reducing work that adds little customer value.",
          st(
            "The proposed redesign reduces manual keystrokes by roughly 40 percent."
          )
        ],
        [
          "Looking at those figures, you might reasonably expect the reception team to welcome the improvement.",
          null
        ],
        [
          "But three front-desk supervisors have formally objected, and the programme director faces an uncomfortable surprise.",
          iss(
            "Three front-desk supervisors formally object to a redesign promising faster check-in.",
            "The people are not convinced"
          )
        ],
        [
          "The director has been advised to communicate the benefits more clearly, as though the problem were misunderstanding.",
          null
        ],
        [
          "Before accepting that advice, I want you to consider what the supervisors might know that management has overlooked.",
          q(
            "Why might experienced employees oppose a design that promises faster service?"
          )
        ],
        [
          "Perhaps they understand the promised benefits perfectly, but see risks that the design team has not addressed.",
          null
        ],
        [
          "This distinction matters because a technically attractive process cannot improve service unless people actually use it.",
          st(
            "A technically sound process design creates value only when people adopt the new way of working."
          )
        ],
        [
          "A process redesign changes the planned sequence of activities, while organisational change alters how people perform their work.",
          [
            cmp(
              "a",
              "Process redesign",
              "The organisation changes how the work is intended to flow."
            ),
            cmp(
              "b",
              "Organisational change",
              "Employees must actually work differently for the redesigned process to deliver value."
            )
          ]
        ],
        [
          "Those changes affect familiar routines, responsibilities, professional relationships, and sometimes the expertise that gives employees their confidence.",
          null
        ],
        [
          "For Qasr's receptionists, the kiosk changes more than the location where a guest presents identification.",
          null
        ],
        [
          "It may change when employees intervene, how they resolve unusual bookings, and what management expects from their roles.",
          dg(
            "A changing front-desk role",
            D.flow([
              "Guest|arrives",
              "Kiosk|checks",
              "Exception|appears",
              "Staff|intervene",
              "+Guest|helped"
            ]),
            "The redesigned process changes when front-desk employees intervene and how they support guests with exceptions."
          )
        ],
        [
          "We call adoption the extent to which people genuinely use the new process instead of continuing familiar practices.",
          st(
            "Adoption means that employees genuinely use the redesigned process in their everyday work."
          )
        ],
        [
          "Without adoption, Qasr might install every kiosk successfully while employees continue processing guests through the old arrangements.",
          iss(
            "The new technology is installed, but employees continue using the previous process.",
            "Implementation without adoption"
          )
        ],
        [
          "The equipment would be working, but the organisation would not be receiving the full benefits of its investment.",
          null
        ],
        [
          "That is why people change management must accompany process improvement throughout the entire BPM journey.",
          t(
            "People change management",
            "People change management prepares, supports, and coordinates employees as their ways of working change."
          )
        ],
        [
          "It means helping employees understand, shape, learn, and sustain the changes required to deliver the intended results.",
          null
        ],
        [
          "Jeston treats this responsibility as a continuous essential across every BPM phase, rather than a separate finishing activity.",
          dg(
            "Change management throughout BPM",
            D.route([], { band: true }),
            "People change management supports every phase of the BPM framework instead of appearing only near implementation."
          )
        ],
        [
          "A communication campaign may explain the new process, but explanation alone cannot resolve missing capabilities or legitimate concerns.",
          null
        ],
        [
          "If Qasr waits until launch day to discover those concerns, the programme may already be struggling.",
          iss(
            "The programme reaches go-live before employees' concerns and practical difficulties have been addressed.",
            "Change was treated too late"
          )
        ],
        [
          "So our challenge this week is not simply to persuade receptionists that the new kiosk is faster.",
          null
        ],
        [
          "We must understand what their work requires and create conditions in which the redesigned process can succeed.",
          st(
            "Successful BPM requires both a workable process design and people prepared to adopt it."
          )
        ],
        [
          "And even when Qasr manages that transition carefully, something uncomfortable is likely to happen before performance improves.",
          q(
            "Why might a better process initially produce worse performance?"
          )
        ]
      ]
    },
    {
      title: "The performance dip: a cost to plan for",
      sec: "O1b",
      lines: [
        [
          "Let's stay at Qasr Marina, where the general manager is reviewing the proposed timetable for the redesigned check-in.",
          t(
            "Qasr Marina · Preparing for change",
            "Why performance can fall before a redesigned process begins delivering its promised benefits"
          )
        ],
        [
          "The programme promises a much faster arrival experience, and everyone naturally wants those benefits to appear immediately.",
          null
        ],
        [
          "But imagine the reception team beginning to use the new kiosks while still learning unfamiliar procedures.",
          dg(
            "Learning the redesigned process",
            D.flow([
              "Guest|arrives",
              "Kiosk|starts",
              "!Staff|uncertain",
              "Support|helps",
              "+Check-in|completed"
            ]),
            "Employees may need additional assistance while they learn how to operate the redesigned check-in process."
          )
        ],
        [
          "Employees hesitate over unusual bookings, guests ask unfamiliar questions, and supervisors spend additional time helping colleagues.",
          null
        ],
        [
          "For a while, the redesigned process may actually perform worse than the familiar arrangements it replaces.",
          iss(
            "Employees are learning new procedures, and service temporarily becomes slower.",
            "The performance dip"
          )
        ],
        [
          "This temporary decline is called the performance dip, and it is a normal cost of organisational change.",
          t(
            "The performance dip",
            "Performance commonly falls during transition before employees learn, adapt, and achieve the intended improvement."
          )
        ],
        [
          "Think about learning to drive a different car after spending years using the same familiar vehicle.",
          null
        ],
        [
          "Even when the new car is better, unfamiliar controls initially make your movements slower and less confident.",
          [
            cmp(
              "a",
              "Familiar way of working",
              "Employees perform established routines confidently because they know what to expect."
            ),
            cmp(
              "b",
              "New way of working",
              "Employees initially need more attention and support while learning unfamiliar routines."
            )
          ]
        ],
        [
          "With practice, your confidence returns, and you can eventually benefit from the improved features.",
          null
        ],
        [
          "The same learning process affects Qasr's employees, although their mistakes can also affect waiting guests.",
          st(
            "Learning creates temporary disruption because employees must develop confidence while continuing to serve customers."
          )
        ],
        [
          "Now picture the performance curve from our slides, beginning before management announces the change.",
          dg(
            "The transition through change",
            D.flow([
              "Change|announced",
              "Resistance",
              "!Performance|dip",
              "Exploration",
              "+Commitment"
            ]),
            "The change journey moves through announcement, resistance, a performance dip, exploration, and commitment."
          )
        ],
        [
          "The existing process provides a baseline, meaning the performance level against which the new arrangements will be compared.",
          null
        ],
        [
          "After the announcement, uncertainty and resistance may grow as employees consider what the proposed change means.",
          iss(
            "Employees face uncertainty about unfamiliar procedures and possible consequences for their roles.",
            "Resistance and uncertainty"
          )
        ],
        [
          "Performance then falls as people abandon familiar routines without yet mastering the new way of working.",
          null
        ],
        [
          "During exploration, employees gradually develop confidence, solve practical problems, and discover how the redesigned process operates.",
          st(
            "Exploration helps employees learn the new process and identify practical problems that require attention."
          )
        ],
        [
          "With sufficient support and commitment, performance can recover beyond the original baseline and deliver the expected benefits.",
          null
        ],
        [
          "But the area below that baseline represents a real cost, because the organisation temporarily produces less.",
          dg(
            "The cost of the change itself",
            D.flow([
              "Pre-change|baseline",
              "!Falls below|baseline",
              "!Lost|performance",
              "Recovery|begins",
              "+Above|baseline"
            ]),
            "The performance lost while results sit below the pre-change baseline is the cost of the change itself, and good change management makes that loss shallower and shorter."
          )
        ],
        [
          "For Qasr, that cost could appear through longer queues, additional staffing needs, or slower service during training.",
          null
        ],
        [
          "We should therefore treat the dip as something to manage rather than evidence that the redesign has failed.",
          st(
            "The performance dip is not itself proof of failure; failing to prepare for it creates avoidable risk."
          )
        ],
        [
          "Imagine the general manager promising the board that check-in performance will improve immediately after the kiosks launch.",
          null
        ],
        [
          "When the opening week proves difficult, the board may conclude that the programme has broken its promise.",
          iss(
            "Sponsors expect immediate improvement and interpret the temporary decline as programme failure.",
            "Unrealistic expectations"
          )
        ],
        [
          "That misunderstanding can threaten the entire programme precisely when employees need the greatest support.",
          null
        ],
        [
          "A credible change plan therefore tells sponsors how deep the expected decline might be and how long it could last.",
          it(
            1,
            3,
            "chart",
            "Forecast the dip",
            "Explain the expected size and duration of temporary performance loss before implementation begins."
          )
        ],
        [
          "Qasr should also provide temporary capacity, practical assistance, and tolerance for slower work while employees learn.",
          it(
            2,
            3,
            "users",
            "Resource the transition",
            "Provide additional support and capacity so employees can learn without leaving guests unsupported."
          )
        ],
        [
          "These resources have costs, but ignoring them does not make the underlying disruption disappear.",
          null
        ],
        [
          "Managers must continue measuring performance throughout the transition, so they can distinguish temporary learning from persistent problems.",
          it(
            3,
            3,
            "gauge",
            "Measure the recovery",
            "Monitor performance during transition so managers can identify recovery and investigate continuing difficulties."
          )
        ],
        [
          "Visible recovery gives employees evidence that their effort is working and gives sponsors reasons to maintain support.",
          null
        ],
        [
          "Good change management can make the dip shallower and shorter, but it cannot honestly promise to eliminate it.",
          st(
            "Change management reduces the depth and duration of the performance dip rather than removing it completely."
          )
        ],
        [
          "Remember that a programme judged only by its worst week may be cancelled before its benefits become visible.",
          null
        ],
        [
          "So Qasr must prepare its people and sponsors for the difficult transition, not merely celebrate the promised improvement.",
          q(
            "What support would help Qasr's employees recover from the performance dip?"
          )
        ],
        [
          "But preparation requires understanding why employees are concerned, and that takes us to the objections at reception.",
          t(
            "Coming next",
            "Resistance Is Information"
          )
        ]
      ]
    }
  ]
},
// END-BLOCK
// CHUNK: l2
{
  id: "l2",
  title: "Resistance Is Information",
  sections: [
    {
      title: "What employees stand to lose",
      sec: "O2a",
      lines: [
        [
          "Welcome back to Qasr, where the three supervisors who objected are finally going to be heard properly.",
          t(
            "Lesson 2 · Resistance Is Information",
            "What do the people at the front desk stand to lose?"
          )
        ],
        [
          "They run the front desks at the group's Marina, Corniche and Old Town hotels, and each one objected in writing.",
          null
        ],
        [
          "Before we read their words, I want you to look at what eighty-four front-desk staff said in a survey.",
          t(
            "Exhibit 4",
            "Front-desk staff survey, 84 responses. The numbers are the argument."
          )
        ],
        [
          "Seventy-nine percent agree that today's check-in frustrates guests, so nobody is defending the old process.",
          st(
            "79% of front-desk staff agree that the current check-in frustrates guests."
          )
        ],
        [
          "Seventy-one percent also agree that the new design will be faster.",
          st(
            "71% agree that the new design will be faster; only 14% disagree."
          )
        ],
        [
          "If you stopped reading there, you would conclude that staff simply need the benefits explained more clearly.",
          null
        ],
        [
          "But only eighteen percent believe the new design handles their exceptions, while sixty-two percent say it does not.",
          [
            cmp(
              "a",
              "Staff believe",
              "The new design will be faster: 71% agree."
            ),
            cmp(
              "b",
              "Staff doubt",
              "The new design handles our exceptions: 18% agree, 62% disagree."
            )
          ]
        ],
        [
          "Only thirty-four percent expect their role to still exist in a year, and forty-one percent expect it to be gone.",
          iss(
            "34% expect their role to exist in a year; 41% do not.",
            "Fear for jobs"
          )
        ],
        [
          "Most striking of all, eleven percent say they were consulted on the design, and eighty-three percent say they were not.",
          iss(
            "11% say they were consulted on the design; 83% say they were not.",
            "No involvement"
          )
        ],
        [
          "So staff already believe the benefit, which tells you the resistance must be about something else.",
          st(
            "Staff agree the design is faster and still oppose it, so the resistance is not a misunderstanding of the benefits."
          )
        ],
        [
          "Resistance means opposition to a change, whether it appears as open objections or as quiet delay and reluctance.",
          null
        ],
        [
          "It is usually rational, because people weigh what they stand to lose, not only what the organisation gains.",
          st(
            "Resistance is usually rational and frequently informative about the design."
          )
        ],
        [
          "Let's listen to the Marina supervisor, who says thirty percent of corporate arrivals turn up with wrong booking details.",
          iss(
            "Thirty percent of corporate arrivals have wrong booking details. What does the kiosk do with them?",
            "The Marina objection"
          )
        ],
        [
          "She is asking what the kiosk does with those guests, and she knows a case the designers never saw.",
          null
        ],
        [
          "That is one cause of resistance in Jeston's chapter, genuine knowledge that the new design fails a real case.",
          dg(
            "Why people resist a better process",
            D.flow([
              "Lost status|or expertise",
              "Design fails|a real case",
              "Memory of|last programme",
              "No involvement|in design",
              "!Resistance"
            ]),
            "Employees resist a better process when they stand to lose status or expertise, when they know the design fails a case, when the last programme broke its promises, and when they had no part in the design."
          )
        ],
        [
          "Her agents also lose something quieter, the skill of rescuing broken bookings that took them years to build.",
          null
        ],
        [
          "When a kiosk takes over the visible work, that hard-won expertise and the status it brings can look worthless overnight.",
          null
        ],
        [
          "The Corniche supervisor says the business case was costed on four fewer agents per shift, and asks management to say so.",
          iss(
            "You have costed this on four fewer agents per shift. Say so.",
            "The Corniche objection"
          )
        ],
        [
          "That points to fear of job loss, and the survey's forty-one percent shows the fear is widely shared.",
          null
        ],
        [
          "The Old Town supervisor remembers being told that the last system would make their jobs easier too.",
          iss(
            "We were told the last system would make our jobs easier too.",
            "The Old Town objection"
          )
        ],
        [
          "This is organisational memory, meaning what people learned from the previous programme about how promises turn out.",
          null
        ],
        [
          "If that programme promised the same things and delivered redundancies, today's promise is heard through that experience.",
          st(
            "The organisation's memory of the last programme is part of the starting conditions for this one."
          )
        ],
        [
          "Underneath all three sits a shared cause, because most staff had no involvement in the design.",
          null
        ],
        [
          "People who had no part in shaping a process feel no ownership of the result.",
          null
        ],
        [
          "Notice that none of these causes disappears when someone repeats that check-in will take five minutes.",
          st(
            "Treat resistance as data first, because some of it is telling you the design is wrong."
          )
        ],
        [
          "So begin by treating resistance as data, because some of it may be telling you the design is wrong.",
          null
        ],
        [
          "And that raises a hard question, which you will need a proper test to answer.",
          q(
            "Is the Marina objection resistance, or is it a design defect?"
          )
        ]
      ]
    },
    {
      title: "Resistance or a genuine design defect?",
      sec: "O2b",
      lines: [
        [
          "So let's take the Marina objection and ask the question honestly, is it resistance or a design defect?",
          t(
            "Resistance or a design defect?",
            "Give the test you would apply, not only your verdict."
          )
        ],
        [
          "A design defect means the planned process cannot reliably handle a case the business genuinely has to serve.",
          null
        ],
        [
          "Resistance, in the narrow sense, is opposition that would remain even if the design worked perfectly.",
          [
            cmp(
              "a",
              "Design defect",
              "The process cannot handle a real case, whoever points it out."
            ),
            cmp(
              "b",
              "Resistance",
              "The opposition would remain even if the design worked perfectly."
            )
          ]
        ],
        [
          "Both can sound identical in a meeting, because both arrive as an experienced supervisor saying no.",
          null
        ],
        [
          "So you need a test, and I want you to use it rather than trust your instinct.",
          q(
            "What test separates resistance from a genuine design defect?"
          )
        ],
        [
          "The test asks whether the objection names a specific case that can be checked against real operating data.",
          it(
            1,
            2,
            "search",
            "Can it be checked?",
            "Does the objection name a specific case that real operating data can confirm or reject?"
          )
        ],
        [
          "It then asks whether the claim would still be true if the person raising it had nothing personal to lose.",
          it(
            2,
            2,
            "scale",
            "Would it survive without a stake?",
            "Would the claim still hold if the person raising it had nothing personal to lose?"
          )
        ],
        [
          "Let's apply it, because a test only matters when you can watch it working.",
          null
        ],
        [
          "The Marina claim is specific, since it says thirty percent of corporate arrivals have wrong booking details.",
          null
        ],
        [
          "Qasr can check it this week by pulling last month's corporate arrivals and counting the corrected bookings.",
          dg(
            "Testing the Marina objection",
            D.flow([
              "Specific|claim",
              "Pull booking|records",
              "Count wrong|details",
              "Compare with|30%",
              "+Verdict"
            ]),
            "The Marina objection can be tested against booking records before anyone decides whether it is resistance or a defect."
          )
        ],
        [
          "Suppose the records confirm something close to thirty percent of those arrivals.",
          null
        ],
        [
          "Then the kiosk has no path for almost a third of an important guest segment.",
          iss(
            "The kiosk has no path for about 30% of corporate arrivals.",
            "A design defect"
          )
        ],
        [
          "That would remain true whoever pointed it out, so the objection passes both parts of the test.",
          null
        ],
        [
          "It is a design defect, and the supervisor has done the programme a real favour by raising it.",
          st(
            "Some resistance is telling you the design is wrong."
          )
        ],
        [
          "The survey supports her, because sixty-two percent of staff say the design does not handle their exceptions.",
          null
        ],
        [
          "Persuasion cannot fix a missing path, since no explanation makes a kiosk repair a booking it cannot read.",
          null
        ],
        [
          "Now apply the same test to the Corniche objection about four fewer agents per shift.",
          iss(
            "The business case assumes four fewer agents per shift.",
            "The Corniche objection"
          )
        ],
        [
          "That claim can also be checked, simply by reading the staffing assumption in the business case.",
          null
        ],
        [
          "But it is not a defect in the check-in flow, because the process would work either way.",
          null
        ],
        [
          "It is a fear about jobs, and it is resistance with a very rational basis.",
          st(
            "Fear of job loss is resistance, but it is rational resistance that deserves a straight answer."
          )
        ],
        [
          "The Old Town objection names no case at all, only a promise that failed last time.",
          null
        ],
        [
          "So it fails the data test, yet it still tells you something important about trust.",
          null
        ],
        [
          "Now notice the trap the programme director was about to walk into.",
          iss(
            "Advice: communicate the benefits more clearly.",
            "The trap"
          )
        ],
        [
          "Advice to communicate the benefits more clearly assumes that every objection is a misunderstanding.",
          null
        ],
        [
          "Yet seventy-one percent already agree the design is faster, so there is very little left to explain.",
          null
        ],
        [
          "Treating a real defect as resistance is the most expensive error, because it carries the flaw into go-live.",
          [
            cmp(
              "a",
              "Defect treated as resistance",
              "The flaw goes live and guests meet it at the desk."
            ),
            cmp(
              "b",
              "Fear treated as a defect",
              "Effort is spent redesigning a process that was not the problem."
            )
          ]
        ],
        [
          "Treating fear as a defect is costly too, because you redesign a process that was never the problem.",
          null
        ],
        [
          "So the test protects you in both directions, and it respects the people who raised the concern.",
          null
        ],
        [
          "Once each objection is diagnosed, you can choose a response that actually fits its cause.",
          q(
            "What response fits each diagnosed cause?"
          )
        ]
      ]
    },
    {
      title: "Match the response to the cause",
      sec: "O2c",
      lines: [
        [
          "The director now holds three diagnosed objections, and eleven weeks remain before the kiosks go live.",
          t(
            "Matching the response to the cause",
            "Eleven weeks to go-live at Qasr"
          )
        ],
        [
          "Her temptation is to answer all three with one confident message, and that is exactly the mistake to avoid.",
          null
        ],
        [
          "Each cause has a response that fails and a response that works, so let's follow her through the week.",
          st(
            "Different causes of resistance need different responses; one message for everyone fails."
          )
        ],
        [
          "Start with the Marina defect, because a genuinely flawed design is never answered by persuasion.",
          null
        ],
        [
          "She changes the design, adding a staffed path for corporate arrivals whose booking details are wrong.",
          dg(
            "The design, changed",
            D.flow([
              "Guest|arrives",
              "Kiosk|checks booking",
              "Wrong|details",
              "Agent|corrects",
              "+Guest|settled"
            ]),
            "The revised design sends corporate arrivals with wrong booking details to an agent instead of leaving them stuck at the kiosk."
          )
        ],
        [
          "Then she says publicly why it changed, crediting the Marina team for finding the gap.",
          null
        ],
        [
          "That public explanation matters, because staff learn that raising a real problem actually changes things.",
          st(
            "Design genuinely flawed: change the design and say publicly why."
          )
        ],
        [
          "The agents who rescue broken bookings face a different loss, which is the loss of expert status.",
          null
        ],
        [
          "More training is the wrong response here, because it treats experts as beginners and deepens the insult.",
          [
            cmp(
              "a",
              "Does not work",
              "More training for people who are already the experts."
            ),
            cmp(
              "b",
              "Works",
              "A role in designing the new standard for exception handling."
            )
          ]
        ],
        [
          "What works is giving them a role in designing the new standard for exception handling.",
          null
        ],
        [
          "Their know-how then becomes part of the process, rather than something the kiosk quietly erased.",
          null
        ],
        [
          "Corniche raises fear of job loss, and reassurance without commitment would only make that fear worse.",
          iss(
            "Reassurance without commitment leaves the fear of job loss untouched.",
            "What does not work"
          )
        ],
        [
          "A line like nobody needs to worry costs nothing to say, so staff rightly give it no weight.",
          null
        ],
        [
          "What works is an explicit, written redeployment position, stating what happens to every affected agent.",
          st(
            "Fear of job loss: an explicit, written redeployment position."
          )
        ],
        [
          "If four fewer agents per shift is the plan, the document must say so and say where those people go.",
          null
        ],
        [
          "Ambiguity does more damage than bad news, because people fill the silence with the worst outcome.",
          null
        ],
        [
          "Old Town's memory of the last system often comes with change fatigue, a weariness from repeated initiatives.",
          t(
            "Change fatigue",
            "Weariness after too many initiatives, each launched with the same promises."
          )
        ],
        [
          "Another launch event would only confirm their suspicion that this is the same show again.",
          null
        ],
        [
          "The better answer is fewer, larger, better-spaced changes, so people can absorb one before the next arrives.",
          st(
            "Change fatigue: fewer, larger, better-spaced changes, not another launch event."
          )
        ],
        [
          "Qasr could hold back unrelated system updates until the new check-in has settled.",
          null
        ],
        [
          "Beneath everything sits the eighty-three percent who were never consulted, which is the cause called no involvement.",
          iss(
            "83% of front-desk staff were not consulted on the design.",
            "No involvement"
          )
        ],
        [
          "A communication campaign is the classic wrong answer, because telling people more does not give them ownership.",
          null
        ],
        [
          "What works is co-design, where the people doing the work help shape the process they will run.",
          st(
            "No involvement: co-design with the people doing the work, not a communication campaign."
          )
        ],
        [
          "Co-design is not a workshop to approve finished plans, because their input must be able to change decisions.",
          null
        ],
        [
          "Notice that every effective response changes something real, whether a design, a role, a document or a schedule.",
          null
        ],
        [
          "Each one also costs something, in supervisor time, design effort, or a firmer commitment from management.",
          st(
            "Every response that works changes something real, and every one of them has a cost."
          )
        ],
        [
          "Those costs are the price of adoption, and they are usually smaller than the cost of a failed go-live.",
          null
        ],
        [
          "Yet the front desk is not the only group whose support decides how this programme ends.",
          q(
            "Who else can shape, or stop, the new check-in at Qasr?"
          )
        ],
        [
          "That takes us to stakeholders, and to a simple grid that shows where your effort counts most.",
          t(
            "Coming next",
            "Engaging the People Who Matter"
          )
        ]
      ]
    }
  ]
},
// END-BLOCK
// CHUNK: l3
{
  id: "l3",
  title: "Engaging the People Who Matter",
  sections: [
    {
      title: "The stakeholder power–interest grid",
      sec: "O3a",
      lines: [
        [
          "Welcome back to Qasr, where the director has diagnosed the front desk and now looks beyond it.",
          t(
            "Lesson 3 · Engaging the People Who Matter",
            "Who else can shape, or stop, the new check-in?"
          )
        ],
        [
          "She knows the supervisors matter, yet she also knows that other people can quietly decide this programme's fate.",
          null
        ],
        [
          "We call all of these people stakeholders, meaning anyone who can affect the change or is affected by it.",
          st(
            "Stakeholders are people or groups who can affect a change or are affected by it."
          )
        ],
        [
          "At Qasr that includes the chief operating officer, the process owner, finance, legal, an external auditor and the front-line staff.",
          null
        ],
        [
          "Her time is limited, so she cannot give every one of them the same attention.",
          iss(
            "Treating every stakeholder identically wastes effort where it counts.",
            "Limited attention"
          )
        ],
        [
          "That is why she reaches for a simple tool, which is the power–interest grid.",
          t(
            "The power–interest grid",
            "Power against interest: the engagement plan differs by quadrant."
          )
        ],
        [
          "Power means how much someone can affect the outcome, through authority, budget, approval or the ability to block.",
          null
        ],
        [
          "Interest means how much the change touches their own work, goals or worries.",
          [
            cmp(
              "a",
              "Power",
              "How much they can affect the outcome, including the power to block it."
            ),
            cmp(
              "b",
              "Interest",
              "How much the change touches their own work, goals or worries."
            )
          ]
        ],
        [
          "Picture her sketching two axes on the whiteboard and placing each stakeholder where they honestly sit today.",
          null
        ],
        [
          "The chief operating officer and the process owner land together in the top-right corner, with high power and high interest.",
          it(
            1,
            4,
            "users",
            "Manage closely",
            "High power, high interest: co-design, frequent contact, they shape the outcome."
          )
        ],
        [
          "They can shape the outcome, so she plans frequent contact and invites them into the design itself.",
          null
        ],
        [
          "Legal sits higher on power but lower on interest, because check-in rarely crosses its desk.",
          it(
            2,
            4,
            "shield",
            "Keep satisfied",
            "High power, lower interest: manage expectations, because their late objection can stop everything."
          )
        ],
        [
          "She must not ignore legal, because a late objection from that corner can stop everything.",
          st(
            "Keep satisfied: manage their expectations, because a late objection can stop everything."
          )
        ],
        [
          "So she manages their expectations early, long before anyone books the go-live date.",
          null
        ],
        [
          "The eighty-four front-line staff land on the right with high interest, because they actually do the work.",
          it(
            3,
            4,
            "users",
            "Keep informed",
            "They do the work: consult them on the design and explain decisions."
          )
        ],
        [
          "Their formal power is lower, yet keeping them informed here means consulting them on the design and explaining decisions.",
          null
        ],
        [
          "You will remember that eighty-three percent said they were never consulted, so this corner has been neglected.",
          iss(
            "83% of front-desk staff were not consulted on the design.",
            "A neglected quadrant"
          )
        ],
        [
          "The external auditor sits low on both axes, at least for this programme and at this moment.",
          it(
            4,
            4,
            "eye",
            "Monitor",
            "Low power, low interest: periodic updates, minimal effort."
          )
        ],
        [
          "Periodic updates are enough there, which frees her effort for the corners where it truly counts.",
          null
        ],
        [
          "If an audit later reaches the front desk, the auditor may move, and we will come back to that idea.",
          null
        ],
        [
          "Notice that the grid sorts attention, not respect, because everyone's concerns still deserve an honest hearing.",
          st(
            "The grid decides how much engagement each group needs, not whose concerns deserve respect."
          )
        ],
        [
          "Notice also that power is not only a job title on the organisation chart.",
          null
        ],
        [
          "The Marina supervisor has little formal authority, but colleagues follow her lead at the desk.",
          iss(
            "Colleagues follow the Marina supervisor, whatever the organisation chart says.",
            "Informal power"
          )
        ],
        [
          "If she stays opposed, her whole shift may drift back to the old routine after go-live.",
          null
        ],
        [
          "So placing people honestly requires judgement about real influence, rather than copying names from a chart.",
          dg(
            "Building the grid",
            D.flow([
              "List|stakeholders",
              "Judge|power",
              "Judge|interest",
              "Place on|the grid",
              "+Plan|engagement"
            ]),
            "The director lists stakeholders, judges their real power and interest, places them on the grid, and only then plans engagement."
          )
        ],
        [
          "The grid is only a picture, though, and a picture helps only when it changes what she does.",
          null
        ],
        [
          "That brings us to the question of how each corner should actually be engaged in the coming weeks.",
          q(
            "What does engagement look like in practice for each corner of the grid?"
          )
        ]
      ]
    },
    {
      title: "Four engagement strategies",
      sec: "O3b",
      lines: [
        [
          "Let's follow the director through one ordinary week, and watch how her calendar changes once the grid exists.",
          t(
            "Qasr · Engaging stakeholders",
            "One week in the director's calendar"
          )
        ],
        [
          "On Sunday morning she sits with the process owner and two Marina agents to redraw the exceptions path.",
          null
        ],
        [
          "That meeting is co-design, because the people in the room are changing the process together rather than approving slides.",
          st(
            "Manage closely means co-design: they shape the outcome, not just hear about it."
          )
        ],
        [
          "The agents bring cases the designers never saw, so the exceptions path improves before anyone has to defend it.",
          null
        ],
        [
          "The chief operating officer joins for the last half hour, because the sponsor must see the trade-offs being made.",
          null
        ],
        [
          "Frequent contact like this stops the sponsor discovering a serious problem only when it is already expensive.",
          iss(
            "A sponsor who hears about problems late can only react, not help.",
            "Why contact must be frequent"
          )
        ],
        [
          "On Monday she sends legal a short note on what the kiosk does with identity documents.",
          null
        ],
        [
          "She also asks whether anything in the kiosk's handling of guest data would worry them before go-live.",
          null
        ],
        [
          "It is brief, because legal does not need the workflow, yet it answers the question they would eventually ask.",
          dg(
            "Keeping legal satisfied",
            D.flow([
              "Expect|their question",
              "Answer|early",
              "Confirm|no surprises",
              "Check|at milestones",
              "+No late|objection"
            ]),
            "The director answers legal's likely question early, so that no late objection can stop go-live."
          )
        ],
        [
          "Managing expectations early matters, because the same question raised in week ten could freeze the launch.",
          null
        ],
        [
          "Keeping someone satisfied never means hiding problems, because confidence built on missing facts collapses later.",
          st(
            "Keep satisfied means managing expectations honestly, not concealing problems."
          )
        ],
        [
          "On Tuesday she visits the Corniche desk during the quiet afternoon shift.",
          null
        ],
        [
          "She shows the revised exceptions path, asks what still breaks, and writes down every answer in front of them.",
          t(
            "Consult and explain",
            "Front-line staff do the work, so they are consulted on the design and told why decisions were made."
          )
        ],
        [
          "Then she explains which suggestions changed the design and which could not, and she gives the reason each time.",
          null
        ],
        [
          "One agent asks whether the staffed desk will stay open at night, and she promises a written answer by Thursday.",
          null
        ],
        [
          "Explaining decisions matters, because staff can accept a no far more easily than they accept silence.",
          st(
            "Keep informed means consulting on the design and explaining decisions, in both directions."
          )
        ],
        [
          "Notice how different this is from a newsletter, which only travels one way.",
          [
            cmp(
              "a",
              "A newsletter",
              "Information travels one way, and nobody's knowledge reaches the design."
            ),
            cmp(
              "b",
              "Consult and explain",
              "Staff knowledge shapes the design, and decisions come back with reasons."
            )
          ]
        ],
        [
          "On Thursday the external auditor receives a one-paragraph update, and that is all the week requires.",
          null
        ],
        [
          "The same afternoon she keeps her promise, and the night-desk answer reaches the Corniche team in writing.",
          null
        ],
        [
          "Minimal effort there is a deliberate choice, because every hour saved goes to the corners that decide adoption.",
          st(
            "Monitor means periodic updates and minimal effort, so attention goes where it counts."
          )
        ],
        [
          "Now look back over the week and notice what the director did not do.",
          null
        ],
        [
          "She did not send one identical message to everyone and call it engagement.",
          iss(
            "One identical message for every stakeholder wastes effort where it counts.",
            "The trap"
          )
        ],
        [
          "Each conversation had a different purpose, a different depth and a different channel, because each group needs something different.",
          null
        ],
        [
          "The sponsor needed decisions, legal needed reassurance, the staff needed influence, and the auditor needed only to be kept aware.",
          dg(
            "Different corners, different engagement",
            D.flow([
              "Monitor|updates",
              "Keep informed|consult",
              "Keep satisfied|expectations",
              "Manage closely|co-design",
              "+Effort where|it counts"
            ]),
            "Engagement deepens from periodic updates to consultation, to managed expectations, to co-design with those who shape the outcome."
          )
        ],
        [
          "Her calendar now shows where her effort goes, and it follows the grid rather than habit.",
          null
        ],
        [
          "If you showed her diary to a stranger, they could almost redraw the grid from it.",
          null
        ],
        [
          "There is one more thing to notice, which is that the grid was drawn at one particular moment.",
          st(
            "Every grid is drawn at one moment, and the programme keeps moving after it."
          )
        ],
        [
          "The programme is moving, and so are the people on her whiteboard.",
          q(
            "What happens when a stakeholder's power or interest changes during the programme?"
          )
        ]
      ]
    },
    {
      title: "Stakeholders move: revisit the grid",
      sec: "O3c",
      lines: [
        [
          "Let's jump ahead four months at Qasr, where the programme has grown beyond the front desk.",
          t(
            "Qasr · A stakeholder who moved",
            "Stakeholder position is a snapshot, not an attribute."
          )
        ],
        [
          "At the kickoff, the director placed the finance director in the keep satisfied corner.",
          null
        ],
        [
          "That was a sound judgement, because finance had high power but low interest in how guests checked in.",
          [
            cmp(
              "a",
              "At kickoff",
              "Finance director: high power, low interest. Keep satisfied."
            ),
            cmp(
              "b",
              "At month four",
              "Invoicing comes into scope. Interest rises sharply. Manage closely."
            )
          ]
        ],
        [
          "But at month four the programme starts to touch invoicing, which is finance's own process.",
          iss(
            "At month four the programme touches invoicing, finance's own process.",
            "Scope moves"
          )
        ],
        [
          "The moment their own work is in scope, their interest rises sharply, and they move across the grid.",
          null
        ],
        [
          "They now belong in the manage closely corner, alongside the sponsor and the process owner.",
          st(
            "When their own process comes into scope, interest rises sharply and the stakeholder moves."
          )
        ],
        [
          "So engagement must shift from a periodic briefing to genuine co-design of the new invoicing steps.",
          dg(
            "A stakeholder who moved",
            D.flow([
              "Keep|satisfied",
              "Invoicing|in scope",
              "Interest|rises",
              "Manage|closely",
              "+Co-design"
            ]),
            "When invoicing comes into scope, the finance director's interest rises and engagement shifts from periodic briefing to co-design."
          )
        ],
        [
          "Imagine instead that nobody redraws the grid, and finance keeps receiving the same polite monthly summary.",
          null
        ],
        [
          "The invoicing design gets settled without them, and they read about it only in a steering pack.",
          iss(
            "Finance sees the invoicing design for the first time near go-live and objects.",
            "A late objection arrives"
          )
        ],
        [
          "By then the invoicing steps have been built, tested and scheduled, so any change is slow and expensive.",
          null
        ],
        [
          "Their objection then arrives late, from a corner with enough power to stop everything.",
          null
        ],
        [
          "Failing to notice a stakeholder's movement is exactly how late objections arrive.",
          st(
            "Failing to notice that a stakeholder has moved is how late objections arrive."
          )
        ],
        [
          "Nobody in that story behaved badly, because the director simply kept using an old picture of a moving organisation.",
          null
        ],
        [
          "That is why a stakeholder's position is a snapshot, a picture of one moment, rather than a fixed attribute.",
          null
        ],
        [
          "Power and interest both move as a programme stops being an idea and becomes something real.",
          st(
            "Power and interest both move as a programme becomes real."
          )
        ],
        [
          "So when should the director redraw the grid, if it can go out of date so quickly?",
          q(
            "When should the stakeholder grid be re-run?"
          )
        ],
        [
          "The rule is simple, because the grid is re-run at every phase boundary of the BPM programme.",
          t(
            "Re-run the grid",
            "At every phase boundary, because power and interest move as the programme becomes real."
          )
        ],
        [
          "A phase boundary is the point where one stage of the programme ends and the next one begins.",
          null
        ],
        [
          "Those are the moments when scope widens, new processes come into view, and different people feel the change.",
          dg(
            "Re-running the grid",
            D.flow([
              "Phase|ends",
              "Re-run|the grid",
              "Spot who|moved",
              "Adjust|engagement",
              "+Next|phase"
            ]),
            "At each phase boundary the director re-runs the grid, spots who has moved, and adjusts engagement before the next phase begins."
          )
        ],
        [
          "Movement is not always upward, because a stakeholder whose process leaves scope can drift toward monitor.",
          null
        ],
        [
          "And movement can happen at the front desk too, not only in the boardroom.",
          null
        ],
        [
          "Suppose the Corniche agents learn that the redeployment position names their shift.",
          iss(
            "The written redeployment position names the Corniche shift.",
            "News reaches the desk"
          )
        ],
        [
          "You will recall that they asked management to say so, and now management has said so in writing.",
          null
        ],
        [
          "Their interest was already high, but now their informal power grows as the whole site watches their reaction.",
          iss(
            "The Corniche shift's reaction now shapes how every other desk responds.",
            "Informal power grows"
          )
        ],
        [
          "The director would move them closer to co-design, because their acceptance now carries the other desks with it.",
          null
        ],
        [
          "Each time the grid changes, the engagement plan must change with it, or the redrawing achieves nothing.",
          st(
            "A redrawn grid matters only when the engagement plan changes with it."
          )
        ],
        [
          "So far, though, everything we have done happens before the kiosks are switched on.",
          null
        ],
        [
          "After go-live, people can nod in every meeting and still check guests in the old way.",
          q(
            "How will Qasr know whether staff have really adopted the new check-in?"
          )
        ],
        [
          "That is where we go next, from resistance to the measurable reality of adoption.",
          t(
            "Coming next",
            "From Resistance to Adoption"
          )
        ]
      ]
    }
  ]
},
// END-BLOCK
// CHUNK: l4
{
  id: "l4",
  title: "From Resistance to Adoption",
  sections: [
    {
      title: "Adoption, workarounds and parallel processes",
      sec: "O3d",
      lines: [
        [
          "Welcome back to Qasr, where the kiosks have now been switched on and the real test has begun.",
          t(
            "Lesson 4 · From Resistance to Adoption",
            "Adoption is a measure, not a feeling."
          )
        ],
        [
          "In the steering meeting everyone nods, and the director hears that staff seem fairly positive.",
          null
        ],
        [
          "But seeming positive is a feeling, and a feeling cannot tell her how guests are actually being checked in.",
          st(
            "Adoption is a measure, not a feeling."
          )
        ],
        [
          "Adoption means the proportion of real cases that now run through the new process rather than the old one.",
          null
        ],
        [
          "So she tracks that proportion every week, starting from the very first day after go-live.",
          it(
            1,
            3,
            "chart",
            "Measure adoption weekly",
            "Track the proportion of cases running through the new process, weekly, from day one."
          )
        ],
        [
          "Picture the chart she sees after sixteen weeks, with two lines moving in opposite directions.",
          null
        ],
        [
          "The adoption line rises steeply in the early weeks, then flattens out at around sixty-five percent of check-ins.",
          [
            cmp(
              "a",
              "Cases through the new process",
              "Rises steeply, then plateaus at about 65%."
            ),
            cmp(
              "b",
              "Cases using a workaround",
              "Peaks early near 42%, then settles around 9%."
            )
          ]
        ],
        [
          "The other line counts workarounds, which peak early at nearly forty-two percent before settling near nine percent.",
          null
        ],
        [
          "A workaround is any unofficial way staff get the job done when the official process does not fit the case.",
          t(
            "Workaround",
            "An unofficial way of getting the work done when the official process does not fit."
          )
        ],
        [
          "At Marina, an agent might type a corporate guest's details by hand because the kiosk rejects the booking.",
          dg(
            "A workaround at Marina",
            D.flow([
              "Guest|arrives",
              "Kiosk|rejects booking",
              "!Agent types|by hand",
              "Old|system",
              "Guest|checked in"
            ]),
            "When the kiosk rejects a corporate booking, the agent quietly returns to manual entry in the old system."
          )
        ],
        [
          "It is tempting to call that disobedience, but there is a far more useful way to see it.",
          null
        ],
        [
          "A workaround is a design defect reporting itself, because it shows exactly where the process failed a real case.",
          st(
            "Every workaround is a design defect reporting itself."
          )
        ],
        [
          "So she tracks workarounds explicitly, and she treats each one as evidence rather than as a disciplinary matter.",
          it(
            2,
            3,
            "search",
            "Track workarounds explicitly",
            "Each workaround shows where the design fails a real case."
          )
        ],
        [
          "She also asks the agents what they would change, because their answers become the improvement backlog.",
          null
        ],
        [
          "An improvement backlog is simply the running list of fixes waiting to be made to the process.",
          null
        ],
        [
          "Now look again at that sixty-five percent plateau, because many managers would call it nearly there.",
          iss(
            "Adoption has plateaued at about 65%.",
            "Nearly there?"
          )
        ],
        [
          "It is not nearly there, because a third of guests are still going through the old process.",
          null
        ],
        [
          "That means Qasr is running two processes at once, and without action it will keep doing so indefinitely.",
          st(
            "A plateau at 65% is not nearly there. It is two processes running at once, indefinitely."
          )
        ],
        [
          "Two processes mean two sets of training, two kinds of error, and benefits that never fully arrive.",
          dg(
            "Two processes running",
            D.flow([
              "Go-live",
              "Adoption|rises",
              "!Plateau|at 65%",
              "!Old process|survives",
              "!Two processes|indefinitely"
            ]),
            "If adoption stalls at a plateau, the old process survives beside the new one and the organisation pays for both."
          )
        ],
        [
          "The same is true of a process at sixty percent adoption after three months.",
          null
        ],
        [
          "Here is the danger the director must avoid, which is the programme looking finished when it is not.",
          iss(
            "Every delivery milestone is green, while a third of check-ins still use the old process.",
            "Finished on paper"
          )
        ],
        [
          "The kiosks are installed, the training is complete, and every delivery milestone on the report is green.",
          null
        ],
        [
          "So she reports adoption to the sponsor right alongside those delivery milestones, every single month.",
          it(
            3,
            3,
            "gauge",
            "Report adoption with milestones",
            "Otherwise the programme will look finished when it is not."
          )
        ],
        [
          "That keeps the sponsor's attention on the plateau, rather than on the ribbon-cutting that already happened.",
          null
        ],
        [
          "You will meet this again in weeks thirteen and fourteen, where it becomes the governance that keeps the gain.",
          null
        ],
        [
          "For now, the lesson is that adoption must be tracked after go-live as seriously as delivery was tracked before it.",
          st(
            "Track adoption after go-live as seriously as you tracked delivery before it."
          )
        ],
        [
          "But measuring the plateau only tells the director where she stands, not what she should change.",
          q(
            "What would you change at Qasr to move adoption past the plateau?"
          )
        ]
      ]
    },
    {
      title: "Design an intervention with explicit costs",
      sec: "O3e",
      lines: [
        [
          "Let's rewind to the moment eleven weeks before go-live, when the director still has time to shape the outcome.",
          t(
            "Designing the intervention",
            "Be specific about what you would change, not only what you would say."
          )
        ],
        [
          "Her adviser still says communicate the benefits more clearly, and you already know why that is not enough.",
          null
        ],
        [
          "Seventy-one percent of staff already agree the design is faster, so more explanation changes almost nothing.",
          st(
            "Change management that is not just communication."
          )
        ],
        [
          "An intervention here means a deliberate change to the work itself, not a message about the work.",
          null
        ],
        [
          "So she starts with the people who do the work, inviting agents from all three desks to design the exceptions path.",
          it(
            1,
            4,
            "users",
            "Co-design the to-be process",
            "Involve the people who do the work in designing it. Week 9 depends on this."
          )
        ],
        [
          "That costs supervisor time and two weeks of design workshops, and it answers the eighty-three percent never consulted.",
          null
        ],
        [
          "It matters later too, because in week nine you will design to-be processes and you will need exactly this habit.",
          null
        ],
        [
          "Next she turns to Corniche, where the business case assumes four fewer agents per shift.",
          iss(
            "The business case assumes four fewer agents per shift.",
            "Employment consequences"
          )
        ],
        [
          "She publishes a written redeployment position early, stating where each affected agent will go and when.",
          it(
            2,
            4,
            "shield",
            "Be explicit and early",
            "Ambiguity does more damage than bad news."
          )
        ],
        [
          "That costs management a firm commitment, but ambiguity does more damage than bad news ever could.",
          null
        ],
        [
          "Then she looks at the training plan, which currently shows agents only which kiosk screens to press.",
          null
        ],
        [
          "That trains people on the system, yet the system is only one part of the new way of working.",
          [
            cmp(
              "a",
              "Training on the system",
              "Which screens to press and which buttons to use."
            ),
            cmp(
              "b",
              "Training on the process",
              "When to step in, how to handle exceptions, and who does what next."
            )
          ]
        ],
        [
          "So she asks for training on the process, including when an agent should step in and how exceptions are resolved.",
          it(
            3,
            4,
            "book",
            "Train on the process",
            "Train on the process, not only on the system."
          )
        ],
        [
          "That costs extra rehearsal shifts and cover at the desk, because people cannot learn and serve at once.",
          null
        ],
        [
          "The quietest problem is in the measures, because agents are still rated on how many guests they personally check in.",
          iss(
            "Agents are still rated on guests they personally check in.",
            "An old measure survives"
          )
        ],
        [
          "Under that measure, sending a guest to the kiosk makes an agent look less productive.",
          null
        ],
        [
          "If the measures and incentives stay the same, the old behaviour remains perfectly rational for every agent.",
          st(
            "Change the measures and incentives, or the old behaviour will be rational."
          )
        ],
        [
          "So she changes the measure to resolved arrivals and exceptions fixed, which costs a revision of the scorecard.",
          it(
            4,
            4,
            "gauge",
            "Change measures and incentives",
            "Reward the new behaviour, so the old one stops being the sensible choice."
          )
        ],
        [
          "Notice that every one of these measures changes something real at the desk.",
          null
        ],
        [
          "Notice also that she can say what each one costs, which turns good intentions into a plan the sponsor can approve.",
          dg(
            "An intervention with explicit costs",
            D.flow([
              "Diagnose|the cause",
              "Change|something real",
              "State|the cost",
              "Track|adoption",
              "+Adoption|rises"
            ]),
            "A defensible intervention links each diagnosed cause to a real change, states its cost, and tracks adoption to show whether it worked."
          )
        ],
        [
          "A plan without costs looks cheaper on paper, but the sponsor then meets the bill as a surprise.",
          null
        ],
        [
          "She adds one more line, which is tracking adoption after go-live as seriously as delivery before it.",
          null
        ],
        [
          "That last line is how she will know whether the other measures are working, week by week.",
          st(
            "Track adoption after go-live as seriously as you tracked delivery before it."
          )
        ],
        [
          "Compare her plan with the original advice, and you can see the whole week in a single contrast.",
          [
            cmp(
              "a",
              "Communicate the benefits",
              "Says more, changes nothing, costs little and fixes little."
            ),
            cmp(
              "b",
              "Change the work",
              "Co-design, written commitments, process training and new measures, each with a stated cost."
            )
          ]
        ],
        [
          "Your own plan for Qasr may differ from hers, and that is perfectly fine.",
          null
        ],
        [
          "What it must do is name what changes, who pays for it, and how you will know it worked.",
          q(
            "What would you change in the next eleven weeks, and what would each change cost?"
          )
        ],
        [
          "In our last lesson we bring the three objections together and make the decision properly.",
          t(
            "Coming next",
            "The Front Desk Says No: Decisions and Forum"
          )
        ]
      ]
    }
  ]
},
// END-BLOCK
// CHUNK: l5
{
  id: "l5",
  title: "The Front Desk Says No",
  sections: [
    {
      title: "The case: three objections, one decision",
      sec: "O3f",
      lines: [
        [
          "Welcome to our last lesson of the week, where the director finally has to make her decision.",
          t(
            "Lesson 5 · The Front Desk Says No",
            "Three objections, eleven weeks, one decision"
          )
        ],
        [
          "On her desk sit three written objections, the staff survey, and eleven weeks until the kiosks go live.",
          null
        ],
        [
          "Her adviser still says she should communicate the benefits more clearly, and she wants to test that advice properly.",
          iss(
            "Advice on the table: communicate the benefits more clearly.",
            "The advice to test"
          )
        ],
        [
          "I want you to work through the same three questions she faces, because they are the heart of this week.",
          q(
            "Which objections could communicating the benefits actually fix?"
          )
        ],
        [
          "Her starting move is to group the objections by their cause, rather than by the hotel they came from.",
          null
        ],
        [
          "Marina's objection is about thirty percent of corporate arrivals with wrong booking details and no path through the kiosk.",
          [
            cmp(
              "a",
              "Marina",
              "No path for the 30% of corporate arrivals with wrong booking details."
            ),
            cmp(
              "b",
              "Cause",
              "Knowledge that the design fails a real case."
            )
          ]
        ],
        [
          "Its cause is knowledge that the design fails a real case, so no message can repair it.",
          null
        ],
        [
          "Corniche's objection is that the business case was costed on four fewer agents per shift.",
          [
            cmp(
              "a",
              "Corniche",
              "Costed on four fewer agents per shift."
            ),
            cmp(
              "b",
              "Cause",
              "Fear of job loss."
            )
          ]
        ],
        [
          "Its cause is fear of job loss, and only a written redeployment position answers that fear honestly.",
          null
        ],
        [
          "Old Town's objection is that the last system promised the same thing, so its cause is organisational memory.",
          [
            cmp(
              "a",
              "Old Town",
              "The last system promised the same."
            ),
            cmp(
              "b",
              "Cause",
              "Organisational memory of a broken promise."
            )
          ]
        ],
        [
          "Beneath all three sits the eighty-three percent of staff who were never consulted on the design.",
          st(
            "All three objections share a deeper cause: 83% of staff were not consulted."
          )
        ],
        [
          "So which of these could communicating the benefits fix, if any at all?",
          null
        ],
        [
          "Almost none, because seventy-one percent of staff already believe the new check-in will be faster.",
          st(
            "Staff already believe the benefit, so communicating it more clearly fixes almost nothing."
          )
        ],
        [
          "The second question asks how she can tell resistance from a genuine design defect.",
          q(
            "What test separates resistance from a design defect?"
          )
        ],
        [
          "She asks whether each claim names a case that real data can check, and whether it survives without a personal stake.",
          dg(
            "The test, applied",
            D.flow([
              "Objection|raised",
              "Names a|checkable case?",
              "Check|the data",
              "True without|a stake?",
              "+Defect or|resistance"
            ]),
            "Each objection is checked against data and against the question of whether it would still hold without a personal stake."
          )
        ],
        [
          "Marina passes both checks, so it is a defect, while Corniche and Old Town are rational resistance.",
          null
        ],
        [
          "Rational resistance still deserves a real answer, so neither of those objections is dismissed.",
          null
        ],
        [
          "The third question is what she would do in the next eleven weeks, and what each step would cost.",
          q(
            "What would you change in the next eleven weeks, and what would it cost?"
          )
        ],
        [
          "She changes the design for Marina's corporate arrivals and says publicly why, crediting the people who found the gap.",
          it(
            1,
            3,
            "search",
            "Change the design",
            "Add a staffed path for wrong bookings, and say publicly why it changed."
          )
        ],
        [
          "She publishes a written redeployment position for Corniche, at the cost of a firm management commitment.",
          it(
            2,
            3,
            "shield",
            "Commit in writing",
            "An explicit redeployment position answers the fear of job loss."
          )
        ],
        [
          "For Old Town, she co-designs the exceptions path with their agents and holds back unrelated changes.",
          it(
            3,
            3,
            "users",
            "Co-design and space the changes",
            "Involvement answers no involvement, and fewer changes answer fatigue."
          )
        ],
        [
          "Every step changes something real rather than something said, and she can state what each one costs.",
          st(
            "Be specific about what you would change, not only what you would say."
          )
        ],
        [
          "Notice that the adviser was not wrong to want communication, because she still explains every decision.",
          null
        ],
        [
          "But explanation now follows real changes, so staff hear it as evidence rather than as another promise.",
          st(
            "Communication works when it explains real changes, not when it replaces them."
          )
        ],
        [
          "Your own answers may differ from hers, and they should, as long as each response matches a diagnosed cause.",
          null
        ],
        [
          "Now it is your turn to carry this thinking into an organisation you have never seen before.",
          t(
            "Coming next",
            "The forum: Twenty-Two Years of Knowing How"
          )
        ]
      ]
    },
    {
      title: "The forum and the week ahead",
      sec: "O3g",
      lines: [
        [
          "Welcome to the closing part of the week, where you take everything from Qasr into a new case.",
          t(
            "Session 2 · Discussion forum",
            "Twenty-Two Years of Knowing How"
          )
        ],
        [
          "The forum case is called Twenty-Two Years of Knowing How, and it is set in a different organisation.",
          null
        ],
        [
          "That difference is deliberate, because the real test of a method is whether it works where you have not seen it.",
          st(
            "Diagnose resistance in an unfamiliar organisation, then propose and defend a change approach."
          )
        ],
        [
          "So please resist the temptation to copy Qasr's answers, because the causes there may not be the causes here.",
          null
        ],
        [
          "Read the case and the exhibit supplied with it carefully, because the exhibit, like Qasr's survey, may hold the argument.",
          it(
            1,
            4,
            "book",
            "Read the case and its exhibit",
            "Read the case and the exhibit carefully before you write."
          )
        ],
        [
          "Then write your own diagnosis before you open anyone else's post, because the forum asks you to post first.",
          it(
            2,
            4,
            "search",
            "Post before reading peers",
            "Write your own diagnosis first, so your thinking stays your own."
          )
        ],
        [
          "Posting first protects your thinking, since reading a confident classmate early quietly pulls your answer toward theirs.",
          null
        ],
        [
          "Your first draft does not need to be perfect.",
          st(
            "Post first: your own diagnosis, before you read anyone else's."
          )
        ],
        [
          "Aim to post your substantive response by mid-week, so your peers have time to engage with it.",
          null
        ],
        [
          "In that post, name each source of resistance, say what people stand to lose, and say whether any objection is a defect.",
          dg(
            "Building your forum post",
            D.flow([
              "Read case|and exhibit",
              "Diagnose|the causes",
              "Test for|defects",
              "Propose|with costs",
              "+Cite|Jeston Ch. 25"
            ]),
            "A strong post reads the evidence, diagnoses causes, tests for defects, proposes costed changes, and cites the chapter."
          )
        ],
        [
          "Then propose what you would change, not only what you would say, and state what each change would cost.",
          null
        ],
        [
          "Support your reasoning by citing Jeston's chapter twenty-five, because the chapter is your shared evidence base.",
          it(
            3,
            4,
            "book",
            "Cite the chapter",
            "Ground your argument in Jeston, Chapter 25."
          )
        ],
        [
          "After posting, respond to at least two peers, and make sure you disagree with at least one of them.",
          it(
            4,
            4,
            "users",
            "Respond, and disagree with one",
            "Respond to at least two peers, challenging or extending rather than agreeing."
          )
        ],
        [
          "Disagreement here is a service to your colleague, because a challenged argument is stronger than a praised one.",
          null
        ],
        [
          "Be respectful in tone, and be specific in substance.",
          null
        ],
        [
          "A reply that only says great post adds nothing, so explain where their reasoning stops or how it could go further.",
          [
            cmp(
              "a",
              "A weak reply",
              "Agreement and praise, with nothing added to the reasoning."
            ),
            cmp(
              "b",
              "A strong reply",
              "A reasoned challenge or extension, grounded in the case and the chapter."
            )
          ]
        ],
        [
          "At the end of the week, read the facilitator summary, because it shows how the whole group's thinking developed.",
          null
        ],
        [
          "This work is formative, yet it also contributes to your participation assessment in week fourteen.",
          st(
            "Formative, and it contributes to Assessment 4, Participation, in Week 14."
          )
        ],
        [
          "Before you go, let's gather what the week has taught us in one continuous thought.",
          null
        ],
        [
          "A technically sound process fails when people do not adopt it, so change management runs through every phase.",
          st(
            "Change management is not a phase; it is continuous through every phase."
          )
        ],
        [
          "Resistance is usually rational and often informative, so treat it as data and match each response to its cause.",
          null
        ],
        [
          "Stakeholders need different engagement and they move, so the grid is re-run at every phase boundary.",
          null
        ],
        [
          "And adoption is a measure, tracked weekly after go-live, because a programme can look finished when it is not.",
          dg(
            "The week in one line",
            D.flow([
              "Change|matters",
              "Diagnose|resistance",
              "Engage|stakeholders",
              "Measure|adoption",
              "+Benefits|realised"
            ]),
            "From the importance of change, through diagnosis and engagement, to measured adoption and realised benefits."
          )
        ],
        [
          "Next week we move to the Organization Strategy phase, where the direction for all this process work is set.",
          t(
            "Next week · Week 5",
            "The Organization Strategy phase"
          )
        ],
        [
          "Strategy will tell us which processes matter most, so the people effort you learned this week lands where it counts.",
          null
        ],
        [
          "Thank you for staying with Qasr's front desk this week, and I look forward to reading your forum posts.",
          null
        ]
      ]
    }
  ]
},
// END-BLOCK
//__MORE_LESSONS__

    ]
  };

  // Plain-text script for tools that expect it.
  COURSE.lessons.forEach((l) =>
    l.sections.forEach((s) =>
      (s.script = s.lines.map((x) => x[0]).join(" "))
    )
  );

})();