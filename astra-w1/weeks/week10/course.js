// OPER621 Business Process Management - Week 10
// Topic: The People Phase - Framework Phase 6
// Author: Prof. Bassem Jarboui
//
// THE PEOPLE PHASE: THE DESIGN IS NOT THE WORK
//
// Running case: Qasr Hospitality Group
// Four pilot properties. Twenty-two Guest Hosts.
// One redesigned arrival process. Several unresolved people-system contradictions.
//
// Learning outcomes
// O1 - Assess the contribution of the People phase to delivering process change.
// O2 - Design roles, measures and incentives aligned to the new process.
// O3 - Coordinate people through the change process to achieve BPM objectives.
//
// Official CLO alignment
// O1 -> K3 (primary), S3 (supporting)
// O2 -> S3 (primary), K3 (supporting)
// O3 -> S3 (primary), K3 (supporting)
//
// FRAMEWORK CONTINUITY
// Phase 6: People
// Phase 7: Develop
// Phase 8: Implement
// Phase 9: Realize Value
// Phase 10: Sustainable Performance
//
// Project management, change management and leadership remain continuous.
//
// SOURCE INTEGRITY
// Observed: 65% kiosk adoption at week eleven.
// Observed: 29% of arrivals handled at the desk.
// Observed: nine of twenty-two Guest Hosts refer every rate discrepancy.
// Observed: all twenty-two attended a four-hour induction.
// Observed: no post-induction capability assessment was conducted.
// Observed: revised job descriptions arrived three weeks after go-live.
// Observed: AED 400 waiver permission is absent from formal delegation.
// Observed: inherited objectives still reward check-in volume and speed.
// Observed: two Guest Hosts resigned; their individual motives are unknown.
// Observed: one pilot property reinstated a permanent desk.
// Illustrative AED 320 and AED 460 transactions are not observed Qasr cases.
// Sixteen-week adoption curves are illustrative, not Qasr observations.
//
// VISUAL DIRECTION
// The lesson is designed as a sequence of decisions, not a parade of diagrams.
// Every visual should carry one clear idea.
// Consequential changes deserve animation; repeated explanations do not.
// All four existing looks retain their own colours, fonts and layouts.
// Reduced motion must preserve every meaningful final visual state.
//
// DELIVERY CONTRACT
// Four lessons, three main sections per lesson.
// Two remedial lessons per section.
// Every narration entry is [spoken sentence, visual moment].
// null retains the preceding visual.
// Existing assessment question IDs and questions are untouched.
// Section IDs and learning-outcome mappings remain unchanged.
// Motion never blocks narration or learner controls.

(() => {
  "use strict";

  const D = window.DIAG || {};
  const W = window.W10_DIAG || {};

  const t = (kicker, text, count) =>
    ({ type: "title", kicker, text, count });

  const it = (n, of, icon, title, text) =>
    ({ type: "item", n, of, icon, title, text });

  const q = text =>
    ({ type: "question", text });

  const st = text =>
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

  // The fallback diagrams preserve the semantic moment contract when
  // cinematics.js is unavailable or loaded in a different order.

  const safeSvg = (name, args, fallback) => {
    try {
      if (typeof W[name] === "function") {
        return W[name](args || {});
      }
    } catch (_) {}
    return fallback;
  };

  const flow = (steps) =>
    typeof D.flow === "function" ? D.flow(steps) : "";

  const branch = (label, options) =>
    typeof D.branch === "function" ? D.branch(label, options) : "";

  const route = (indices) =>
    typeof D.route === "function" ? D.route(indices) : "";

  const matrix = (columns, rows, values) =>
    typeof D.matrix2x2 === "function"
      ? D.matrix2x2(columns, rows, values)
      : "";

  const progress = (label, value) =>
    typeof D.progress === "function"
      ? D.progress(label, value, 100, "%")
      : "";

  const diagram = (name, args, fallback, kicker, caption) =>
    dg(kicker, safeSvg(name, args, fallback), caption);

  const hosts = (mode, kicker, caption) =>
    diagram(
      "hosts",
      { mode },
      flow(["22 Guest|Hosts", "Observed|evidence", "Investigate|causes"]),
      kicker,
      caption
    );

  const authority = (amount, documented, eligible, kicker, caption) =>
    diagram(
      "authority",
      { amount, documented, eligible },
      flow([
        "Rate|discrepancy",
        "Check|eligibility",
        "Check|authority",
        "Appropriate|decision"
      ]),
      kicker,
      caption
    );

  const raci = (options, kicker, caption) =>
    diagram(
      "raci",
      options,
      flow([
        "Responsible|performs",
        "Accountable|answers",
        "Decision|completed"
      ]),
      kicker,
      caption
    );

  const measures = (aligned, kicker, caption) =>
    diagram(
      "measures",
      { aligned },
      flow(aligned
        ? ["Eligible|exception", "Appropriate|resolution", "Quality|review"]
        : ["Old|throughput", "Complex|exception", "Conflicting|incentive"]
      ),
      kicker,
      caption
    );

  const capability = (kicker, caption) =>
    diagram(
      "capability",
      {},
      flow([
        "Explain|rule",
        "Practise|case",
        "Review|decision",
        "Demonstrate|capability"
      ]),
      kicker,
      caption
    );

  const readiness = (reveal, kicker, caption) =>
    diagram(
      "readiness",
      { reveal },
      flow([
        "Role|defined",
        "Authority|documented",
        "Measures|aligned",
        "Capability|assessed",
        "Adoption|owned"
      ]),
      kicker,
      caption
    );

  const iceberg = (surfaced, kicker, caption) =>
    diagram(
      "iceberg",
      { surfaced },
      flow([
        "Written|procedure",
        "Experienced|judgement",
        "Worked|example",
        "Shared|knowledge"
      ]),
      kicker,
      caption
    );

  const repair = (selected, kicker, caption) =>
    diagram(
      "repair",
      { selected },
      flow([
        "Role|defined",
        "Authority|documented",
        "Measures|aligned",
        "Capability|tested",
        "Adoption|owned"
      ]),
      kicker,
      caption
    );

  const evidence = (kicker, caption) =>
    diagram(
      "caseTimeline",
      {},
      flow([
        "22 Guest|Hosts",
        "65% kiosk|adoption",
        "9 always|refer",
        "2 observed|departures"
      ]),
      kicker,
      caption
    );

  const handover = (kicker, caption) =>
    diagram(
      "handover",
      {},
      flow([
        "Role|definition",
        "Decision|rights",
        "Capability|evidence",
        "Aligned|measures",
        "Develop"
      ]),
      kicker,
      caption
    );

  window.COURSE = {
    id: "oper621-w10",
    code: "OPER621",
    title: "Week 10 — The People Phase: Roles, Measures and Capability",
    subtitle: "Business Process Management · Week 10",
    author: "Prof. Bassem Jarboui",
    teacher: {
      name: "Prof. Bassem Jarboui",
      email: "",
      sendReport: false
    },

    lessons: [

      // ============================================================
      // LESSON 1
      // THE DESIGN IS NOT THE WORK
      //
      // Narrative arc:
      // A guest arrives.
      // A machine identifies an exception.
      // A person is expected to decide.
      // The organisation has not necessarily made that decision possible.
      //
      // Signature moments:
      // 1. The redesigned lobby encounters a human decision.
      // 2. Twenty-two employees become visible as people, not boxes.
      // 3. The five readiness elements assemble.
      // 4. RACI exposes the difference between doing and owning.
      //
      // Learning outcome: O1
      // Primary CLO: K3
      // Supporting CLO: S3
      // ============================================================

      {
        id: "l1",
        title: "The design is not the work",
        sections: [

          // ========================================================
          // W10O1a
          // A PROCESS REDESIGN CHANGES PEOPLE'S JOBS
          //
          // Visual rhythm:
          // Arrival -> interruption -> human decision -> role change.
          // Avoid repeating the same horizontal process flow.
          // ========================================================

          {
            title: "A process redesign changes people's jobs",
            sec: "W10O1a",
            lines: [

              [
                "Welcome to Week 10. Imagine arriving at a hotel after a long journey. The new check-in kiosk is ready, your reservation appears, and everything seems effortless.",
                t(
                  "OPER621 · WEEK 10",
                  "The People Phase: making redesigned work real."
                )
              ],

              [
                "Then the kiosk displays a room rate that does not match your confirmed booking. The screen is working, but your arrival has suddenly stopped.",
                dg(
                  "The arrival stops",
                  flow([
                    "Guest|arrives",
                    "Kiosk|checks",
                    "!Rate|discrepancy",
                    "Guest|waits"
                  ]),
                  "A functioning kiosk can still leave an unresolved human decision."
                )
              ],

              [
                "A Guest Host approaches. You show the confirmation, and the employee checks the details. Now the important question is not whether the technology works. It is whether this person can resolve the problem.",
                q(
                  "Can aned process succeed when the employee cannot make the decision it requires?"
                )
              ],

              [
                "This is the challenge facing Qasr Hospitality Group. Its redesigned arrival process looks promising, but a diagram cannot welcome a guest, investigate a discrepancy or accept responsibility for a decision.",
                st(
                  "A better process diagram does not automatically create better work."
                )
              ],

              [
                "Remember the exhausted traveller whose difficult arrival exposed problems across several departments earlier in our course. That experience started Qasr's improvement journey.",
                dg(
                  "The original guest problem",
                  flow([
                    "Guest|arrives",
                    "Booking|checked",
                    "!Rate|disputed",
                    "!Room not|ready"
                  ]),
                  "The original arrival problem crossed departmental boundaries."
                )
              ],

              [
                "Qasr has now redesigned the journey across four pilot properties. Routine check-ins move towards self-service kiosks, while employees support guests and handle exceptions.",
                dg(
                  "The redesigned arrival",
                  flow([
                    "Guest|arrives",
                    "Kiosk|handles routine",
                    "!Exception|identified",
                    "Guest Host|assists"
                  ]),
                  "Automation handles routine activity while people handle exceptions."
                )
              ],

              [
                "Twenty-two former Front Desk Agents have become Guest Hosts. That is not simply a change of title. The work remaining for these employees now demands different decisions.",
                hosts(
                  "team",
                  "Twenty-two people, one redesigned role",
                  "The case identifies twenty-two employees moving into the Guest Host role."
                )
              ],

              [
                "Previously, a Front Desk Agent might spend much of a shift processing conventional check-ins. The new Guest Host must often investigate the situations that a kiosk cannot complete.",
                cmp(
                  "a",
                  "Front Desk Agent",
                  "Conventional transactions and routine check-ins.",
                  "down"
                )
              ],

              [
                "That changes the nature of the job. The employee needs judgement, coordination and the confidence to act within appropriate authority.",
                cmp(
                  "b",
                  "Guest Host",
                  "Guest assistance, exception investigation and appropriate resolution.",
                  "up"
                )
              ],

              [
                "Let us return to the traveller with the disputed corporate rate. Qasr has communicated that eligible discrepancies up to AED 400 may be waived without referring every case to a manager.",
                authority(
                  320,
                  false,
                  true,
                  "The decision the role is expected to make",
                  "AED 320 is an illustrative eligible discrepancy. The communicated waiver is not yet formally documented."
                )
              ],

              [
                "But the permission is missing from the formal delegation schedule. The employee has heard the instruction without receiving the same protection from the organisation's official decision rules.",
                iss(
                  "The new role expects independence, but formal authority has not caught up.",
                  "The hidden contradiction"
                )
              ],

              [
                "Imagine being that Guest Host. The guest is waiting, the amount appears eligible, and a manager has encouraged independent decisions. Would you feel comfortable making the waiver?",
                q(
                  "Would you make the waiver decision confidently if your formal authority remained unclear?"
                )
              ],

              [
                "An employee might send the case upward. That does not automatically mean the employee is resisting change. The organisation may have created uncertainty that makes escalation seem safer.",
                st(
                  "Hesitation can reflect an organisational design problem rather than resistance."
                )
              ],

              [
                "This is why process redesign must include people design. A new workflow changes responsibilities, but employees also need authority, capability and performance expectations that support those responsibilities.",
                repair(
                  0,
                  "The missing people system",
                  "A redesigned job needs supporting organisational arrangements."
                )
              ],

              [
                "We are now entering the sixth phase of the BPM framework: People. It follows Innovate and prepares the organisation to perform the redesigned process.",
                dg(
                  "Framework phase six",
                  route([5]),
                  "People follows Innovate in the BPM framework."
                )
              ],

              [
                "The framework then continues through Develop, Implement, Realize Value and Sustainable Performance. These phases guide connected work rather than isolated departmental projects.",
                st(
                  "The BPM framework connects organisational design, technology and operating performance."
                )
              ],

              [
                "People and Develop are especially closely connected. Technology must support the decisions employees are expected and authorised to make.",
                dg(
                  "People and technology must fit",
                  flow([
                    "Redesigned|process",
                    "People|requirements",
                    "Technology|support",
                    "Dependable|operation"
                  ]),
                  "Organisational responsibilities and technical controls must reinforce each other."
                )
              ],

              [
                "For example, a kiosk workflow cannot handle a rate discrepancy correctly if the system routes it to an employee whose decision authority has never been established.",
                null
              ],

              [
                "The People phase therefore examines responsibilities, accountability, authority, capability, measures and the incentives shaping everyday behaviour.",
                readiness(
                  false,
                  "What makes people ready?",
                  "People readiness involves connected organisational arrangements, not a single completed activity."
                )
              ],

              [
                "Employees need permission to decide, the ability to decide well, and measures that recognise the contribution their new role requires.",
                st(
                  "Roles, authority, capability and incentives must support the same process."
                )
              ],

              [
                "Project management, change management and leadership continue throughout the framework. People-related work cannot be completed once and forgotten.",
                null
              ],

              [
                "If those arrangements remain unchanged, the old process can quietly return. The kiosk may be new, while the same approvals and delays continue behind it.",
                iss(
                  "New technology can operate inside an unchanged organisation.",
                  "The old process returns"
                )
              ],

              [
                "This week, we will follow Qasr's Guest Hosts through real organisational contradictions. We will examine what the role requires, why employees may hesitate and how the sponsor should respond.",
                evidence(
                  "The Qasr investigation",
                  "The case contains distinct observations that require careful diagnosis."
                )
              ],

              [
                "Our challenge is not to make a process diagram look convincing. It is to make the redesigned guest experience dependable when a real person needs help.",
                q(
                  "What must change around the Guest Host so the redesigned process becomes everyday reality?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE HOSPITAL DISCHARGE THAT CHANGED EVERYONE'S JOB
              // ----------------------------------------------------

              {
                title: "The hospital discharge that changed everyone's job",
                lines: [

                  [
                    "Imagine a hospital redesigning discharge so patients can leave promptly after treatment finishes.",
                    t(
                      "Another way to understand the People phase",
                      "A hospital discharge redesign changes more than the workflow."
                    )
                  ],

                  [
                    "Its new digital system coordinates outstanding requirements instead of leaving departments to work through disconnected procedures.",
                    dg(
                      "The redesigned discharge",
                      flow([
                        "Discharge|approved",
                        "Requirements|coordinated",
                        "Patient|prepared",
                        "Departure|completed"
                      ]),
                      "A coordinated discharge process replaces fragmented departmental activity."
                    )
                  ],

                  [
                    "The system now shows what needs to happen. But imagine that medication information is incomplete and transport is waiting. Who brings the different departments together?",
                    q(
                      "Who should coordinate a discharge when several departments disagree about readiness?"
                    )
                  ],

                  [
                    "The hospital creates a discharge coordinator. That employee can investigate delays and contact the relevant teams, but cannot authorise decisions reserved for clinical professionals.",
                    iss(
                      "The coordinator owns the delay but lacks some necessary decision rights.",
                      "Responsibility without authority"
                    )
                  ],

                  [
                    "The patient continues waiting while managers exchange calls. The digital system works correctly, yet the process still cannot deliver its intended result.",
                    null
                  ],

                  [
                    "This is an organisational problem. Technology cannot compensate for unclear responsibilities or decision boundaries.",
                    st(
                      "A functioning system does not guarantee a functioning process."
                    )
                  ],

                  [
                    "The hospital must define the coordinator's operational responsibilities while preserving clinical decisions for appropriately authorised professionals.",
                    cmp(
                      "a",
                      "Discharge coordinator",
                      "Coordinates departure requirements and operational dependencies.",
                      "up"
                    )
                  ],

                  [
                    "Clinical professionals remain accountable for decisions requiring their professional authority and judgement.",
                    cmp(
                      "b",
                      "Clinical professionals",
                      "Retain responsibility for clinical decisions and safeguards.",
                      "up"
                    )
                  ],

                  [
                    "These boundaries protect patients. Faster coordination must never bypass an essential clinical control.",
                    null
                  ],

                  [
                    "The coordinator also needs realistic practice. Consider a patient whose discharge is delayed by conflicting information. The employee should know whom to contact and when specialist decisions are required.",
                    capability(
                      "Preparing the coordinator",
                      "Role clarity and demonstrated capability support dependable discharge."
                    )
                  ],

                  [
                    "Performance measures should recognise successful coordination, not merely count the records processed during a shift.",
                    st(
                      "Measures must reflect the redesigned contribution."
                    )
                  ],

                  [
                    "Otherwise, complicated discharges may appear unproductive even when the coordinator prevents a long patient delay.",
                    iss(
                      "Transaction volume rewards easy records over difficult coordination.",
                      "The wrong incentive"
                    )
                  ],

                  [
                    "This resembles Qasr. In both organisations, technology changes the work that remains for employees.",
                    null
                  ],

                  [
                    "The redesigned roles need clear responsibilities, usable authority, practical capability and measures that recognise appropriate outcomes.",
                    st(
                      "The People phase makes redesigned responsibilities practically achievable."
                    )
                  ],

                  [
                    "A process describes the desired journey. Organisational arrangements determine whether employees can deliver it.",
                    q(
                      "Why must jobs change when a workflow changes, even if the technology works perfectly?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE ONLINE RETAILER THAT AUTOMATED THE EASY WORK
              // ----------------------------------------------------

              {
                title: "The online retailer that automated the easy work",
                lines: [

                  [
                    "Imagine an online retailer automating straightforward customer returns. Most routine refunds can now be approved without an employee examining each request.",
                    t(
                      "Another way to understand redesigned work",
                      "Automation changes the work that remains for people."
                    )
                  ],

                  [
                    "Software handles ordinary returns, while employees investigate damaged products, disputed information and unusual circumstances.",
                    dg(
                      "The redesigned returns process",
                      flow([
                        "Return|requested",
                        "Automatic|check",
                        "Routine|approval",
                        "!Complex|exception",
                        "Specialist|resolution"
                      ]),
                      "Automation handles routine work while employees handle exceptions."
                    )
                  ],

                  [
                    "The employee's job becomes more demanding because many easy cases disappear from the manual workload.",
                    st(
                      "Automation can increase the judgement required from remaining employees."
                    )
                  ],

                  [
                    "Imagine a customer disputing a refund after receiving a damaged product with conflicting delivery information.",
                    null
                  ],

                  [
                    "The software cannot decide whether these circumstances justify an exception. An employee must examine the evidence and apply the appropriate rules.",
                    q(
                      "What would help this employee decide fairly without referring every difficult case to management?"
                    )
                  ],

                  [
                    "The employee needs clear authority, practical guidance and an escalation route for cases beyond delegated limits.",
                    dg(
                      "Supporting human judgement",
                      flow([
                        "Complex|case",
                        "Evidence|reviewed",
                        "Authority|checked",
                        "Decision|made"
                      ]),
                      "Clear decision rights support the work automation leaves behind."
                    )
                  ],

                  [
                    "Without those arrangements, the new system may reproduce the same approval delays it was intended to remove.",
                    iss(
                      "Automation removes routine checking, but unclear authority preserves referrals.",
                      "The old delay returns"
                    )
                  ],

                  [
                    "Now imagine management continuing to measure employees by the number of returns processed per hour.",
                    null
                  ],

                  [
                    "Complex investigations take longer. Employees may appear less productive precisely when they provide more valuable service.",
                    cmp(
                      "a",
                      "Old measure",
                      "Returns processed per hour.",
                      "down"
                    )
                  ],

                  [
                    "The redesigned contribution requires appropriate resolution of difficult returns, supported by decision-quality checks.",
                    cmp(
                      "b",
                      "New contribution",
                      "Resolve complex returns fairly and within authority.",
                      "up"
                    )
                  ],

                  [
                    "The retailer should replace conflicting measures and provide realistic practice with unusual cases.",
                    measures(
                      true,
                      "Aligning people with automation",
                      "Human judgement requires organisational support and aligned measures."
                    )
                  ],

                  [
                    "It must also clarify when specialists need assistance. Independence does not mean unlimited authority.",
                    null
                  ],

                  [
                    "Qasr faces the same challenge. Kiosks handle routine arrivals, while Guest Hosts inherit difficult exceptions.",
                    st(
                      "Technology and employee roles must be designed together."
                    )
                  ],

                  [
                    "Installing automation changes which activities remain for people. Existing responsibilities cannot simply stay unchanged.",
                    null
                  ],

                  [
                    "The redesign succeeds when employees can perform the work that automation leaves behind.",
                    q(
                      "How should employee responsibilities change when software handles routine cases but people resolve exceptions?"
                    )
                  ]

                ]
              }

            ]
          },

          // ========================================================
          // W10O1b
          // WHAT THE PEOPLE PHASE MUST DELIVER
          //
          // Visual rhythm:
          // Empty readiness board -> five elements -> evidence gate.
          // Each deliverable appears as a meaningful addition.
          // ========================================================

          {
            title: "What the People phase must deliver",
            sec: "W10O1b",
            lines: [

              [
                "Qasr's sponsor has a practical question. Twenty-two Guest Hosts have new titles, and the kiosks are running. What would actually prove that these employees are ready?",
                t(
                  "Week 10 · The People Phase",
                  "What must the organisation deliver?"
                )
              ],

              [
                "A new title is not evidence of capability. A functioning kiosk is not evidence of authority. Even completed training does not establish that employees can make the right decisions.",
                q(
                  "What would convince you that Qasr is operationally ready?"
                )
              ],

              [
                "The People phase must deliver five connected arrangements: defined roles, documented authority, aligned measures, demonstrated capability and accountable adoption tracking.",
                readiness(
                  false,
                  "Five conditions for readiness",
                  "Readiness requires connected organisational evidence."
                )
              ],

              [
                "Start with the twenty-two former Front Desk Agents who have become Guest Hosts. Their new role supports arrivals and investigates exceptions that kiosks cannot resolve.",
                hosts(
                  "team",
                  "The redesigned Guest Host role",
                  "Twenty-two employees now perform redesigned arrival responsibilities."
                )
              ],

              [
                "The first deliverable is a clear role definition. It should explain the work, the boundaries, reporting relationships and expected contribution to guest service.",
                it(
                  1,
                  5,
                  "users",
                  "Define the role",
                  "Describe responsibilities, boundaries, reporting and expected outcomes."
                )
              ],

              [
                "This matters because employees facing unclear responsibilities may return to familiar activities from the previous job.",
                null
              ],

              [
                "Changed judgement and accountability also justify reviewing job grades and rewards. Any adjustment must follow a proper evaluation rather than an assumption that a new title deserves more pay.",
                st(
                  "Material changes in work require a justified review of employment arrangements."
                )
              ],

              [
                "The second deliverable is documented decision authority. Employees cannot perform independently when the permission to decide remains uncertain.",
                it(
                  2,
                  5,
                  "key",
                  "Document authority",
                  "Specify permitted decisions and escalation beyond delegated limits."
                )
              ],

              [
                "At Qasr, eligible rate discrepancies up to AED 400 may be waived, according to the communicated instruction. But the permission must appear in formal delegation.",
                authority(
                  320,
                  false,
                  true,
                  "A decision without formal delegation",
                  "The illustrated AED 320 case is within the communicated limit, but the delegation remains undocumented."
                )
              ],

              [
                "A briefing alone cannot provide the same dependable organisational protection as an approved decision boundary.",
                iss(
                  "Expected decisions remain unclear in formal authority arrangements.",
                  "Undocumented delegation"
                )
              ],

              [
                "The third deliverable is aligned performance measurement. The previous role rewarded check-ins completed and average transaction speed.",
                cmp(
                  "a",
                  "Previous objectives",
                  "Conventional check-in volume and transaction speed.",
                  "down"
                )
              ],

              [
                "The redesigned role needs recognition for appropriate guest assistance and exception resolution.",
                cmp(
                  "b",
                  "Redesigned contribution",
                  "Effective resolution of eligible exceptions with quality safeguards.",
                  "up"
                )
              ],

              [
                "Employees should succeed by performing the work the redesigned process actually requires. Measures and incentives must support that contribution.",
                it(
                  3,
                  5,
                  "gauge",
                  "Align measures",
                  "Reward intended outcomes while protecting decision quality."
                )
              ],

              [
                "Otherwise, someone may spend time resolving a difficult guest problem and still receive a poor score against the old transaction target.",
                measures(
                  false,
                  "The inherited scorecard",
                  "Old throughput measures may discourage valuable exception handling."
                )
              ],

              [
                "The fourth deliverable is demonstrated capability. Giving someone a responsibility does not automatically give them the skill to perform it.",
                it(
                  4,
                  5,
                  "brain",
                  "Demonstrate capability",
                  "Practise realistic cases and assess appropriate decisions."
                )
              ],

              [
                "Guest Hosts need to investigate unusual situations, apply judgement and recognise when escalation is necessary. That requires realistic practice and assessment.",
                capability(
                  "Building decision capability",
                  "Practice, feedback and assessment provide stronger readiness evidence than attendance."
                )
              ],

              [
                "Attendance records confirm participation. They do not show whether an employee can resolve a difficult exception appropriately.",
                st(
                  "Training attendance is not evidence of demonstrated decision capability."
                )
              ],

              [
                "The fifth deliverable is adoption tracking. Qasr needs to know whether real arrivals follow the redesigned process and why alternative paths remain in use.",
                it(
                  5,
                  5,
                  "chart",
                  "Track adoption",
                  "Assign an owner to measure use and investigate alternative paths."
                )
              ],

              [
                "Someone must own that evidence, explain deviations and coordinate corrective action when operating behaviour differs from the design.",
                repair(
                  5,
                  "The five People-phase deliverables",
                  "Defined roles, documented authority, aligned measures, capability and adoption ownership form a connected system."
                )
              ],

              [
                "These deliverables also connect with Develop. Technology and organisational responsibilities must support the same operating design.",
                handover(
                  "People requirements become development requirements",
                  "Organisational decisions shape the supporting technology and workflow."
                )
              ],

              [
                "The sponsor should ask for evidence of readiness, not simply a collection of approved documents or completed activities.",
                null
              ],

              [
                "Together, these outputs turn a promising redesign into work that employees can perform consistently.",
                q(
                  "Which missing People-phase deliverable would most seriously prevent Guest Hosts from doing their new jobs?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE AIRPORT THAT FORGOT THE GATE TEAM
              // ----------------------------------------------------

              {
                title: "The airport that redesigned boarding but forgot the gate team",
                lines: [

                  [
                    "Imagine an airport introducing automated boarding checks. Routine passengers pass through quickly, while gate agents investigate unusual travel-document problems.",
                    t(
                      "Remedial · People-phase deliverables",
                      "Airport boarding shows why organisational arrangements matter."
                    )
                  ],

                  [
                    "The new process directs ordinary cases through automated gates and exceptions towards employees who can investigate them.",
                    dg(
                      "The redesigned boarding process",
                      flow([
                        "Passenger|arrives",
                        "Automatic|check",
                        "!Exception|identified",
                        "Gate agent|assists",
                        "Boarding|continues"
                      ]),
                      "Automation handles routine boarding while employees investigate exceptions."
                    )
                  ],

                  [
                    "However, management leaves the old job descriptions and performance objectives unchanged.",
                    iss(
                      "Technology changes, but formal employee responsibilities do not.",
                      "An incomplete redesign"
                    )
                  ],

                  [
                    "An agent encounters an unusual document and cannot determine whether local approval is permitted.",
                    q(
                      "Which People-phase deliverable would clarify this decision?"
                    )
                  ],

                  [
                    "Documented delegation should specify which decisions agents may make and when supervisory approval remains necessary.",
                    st(
                      "Authority establishes permission; role definitions establish responsibility."
                    )
                  ],

                  [
                    "The revised role must also explain how exception handling fits into the agent's work.",
                    null
                  ],

                  [
                    "Now imagine the airport continuing to reward passengers processed per minute.",
                    cmp(
                      "a",
                      "Old objective",
                      "Maximise passenger throughput.",
                      "down"
                    )
                  ],

                  [
                    "That measure may discourage the careful investigation required by difficult boarding exceptions.",
                    cmp(
                      "b",
                      "Redesigned contribution",
                      "Resolve eligible exceptions accurately without unnecessary delay.",
                      "up"
                    )
                  ],

                  [
                    "The airport needs outcome measures that recognise appropriate exception resolution while protecting decision quality.",
                    null
                  ],

                  [
                    "Agents also need realistic practice. Operating a scanner is different from interpreting an unusual document and recognising when specialist approval is necessary.",
                    capability(
                      "Developing capability",
                      "Practical assessment tests readiness for the redesigned work."
                    )
                  ],

                  [
                    "A capability assessment should establish whether employees can apply the rules rather than merely attend training.",
                    st(
                      "Readiness requires demonstrated performance."
                    )
                  ],

                  [
                    "The airport must then measure how frequently passengers actually follow the redesigned boarding process.",
                    null
                  ],

                  [
                    "A named owner should investigate alternative paths. Successful installation does not prove successful adoption.",
                    dg(
                      "Tracking adoption",
                      flow([
                        "Observe|boarding",
                        "Record|alternative paths",
                        "Investigate|causes",
                        "Correct|weaknesses"
                      ]),
                      "Adoption tracking connects the intended process with actual operating behaviour."
                    )
                  ],

                  [
                    "Roles, authority, measures, capability and adoption evidence address different problems, but they support the same passenger journey.",
                    null
                  ],

                  [
                    "The airport becomes ready when these arrangements work together, rather than when its equipment installation is complete.",
                    q(
                      "What is missing if employees have new roles but cannot demonstrate the required decision capability?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE SERVICE CENTRE THAT LOOKED READY ON PAPER
              // ----------------------------------------------------

              {
                title: "The service centre that looked ready on paper",
                lines: [

                  [
                    "Imagine a service centre celebrating its redesigned complaint process. The software is installed, everyone attended training, and the project dashboard is green.",
                    t(
                      "Remedial · Evidence of readiness",
                      "Completed activities do not automatically prove operational readiness."
                    )
                  ],

                  [
                    "But frontline employees are now expected to resolve complaints previously handled by specialists. Their daily decisions have changed, even though the organisation still evaluates readiness through completed project activities.",
                    st(
                      "Project completion and employee readiness are different achievements."
                    )
                  ],

                  [
                    "Their existing job descriptions still tell them to record complaints and transfer difficult cases.",
                    dg(
                      "The responsibility gap",
                      flow([
                        "Complaint|received",
                        "New process|expects resolution",
                        "!Old role|requires transfer",
                        "Customer|waits"
                      ]),
                      "The intended process conflicts with the existing formal role."
                    )
                  ],

                  [
                    "Employees continue transferring cases because their responsibilities and decision authority have not changed together.",
                    iss(
                      "The new process expects decisions the old role does not authorise.",
                      "An organisational contradiction"
                    )
                  ],

                  [
                    "The centre must define the revised responsibilities and formally delegate appropriate complaint decisions.",
                    q(
                      "What happens when employees are accountable for resolutions they cannot formally authorise?"
                    )
                  ],

                  [
                    "Employees may escalate defensively. Making an unauthorised decision can feel riskier than keeping the customer waiting.",
                    st(
                      "Responsibility requires usable decision authority."
                    )
                  ],

                  [
                    "Now suppose managers still evaluate employees according to how quickly they close complaint records.",
                    cmp(
                      "a",
                      "Inherited expectation",
                      "Close records quickly and transfer difficult cases.",
                      "down"
                    )
                  ],

                  [
                    "The redesigned process instead requires careful investigation and appropriate resolution of eligible complaints.",
                    cmp(
                      "b",
                      "Redesigned expectation",
                      "Resolve appropriate complaints while maintaining decision quality.",
                      "up"
                    )
                  ],

                  [
                    "A revised scorecard should recognise outcomes employees can influence and protect against rushed or inappropriate decisions.",
                    null
                  ],

                  [
                    "Employees also need realistic practice handling ambiguous complaints and recognising the limits of their authority.",
                    readiness(
                      false,
                      "Evidence of readiness",
                      "Operational readiness requires connected organisational evidence."
                    )
                  ],

                  [
                    "Training attendance cannot demonstrate this judgement. Managers should assess performance using realistic cases.",
                    st(
                      "Capability must be tested, not assumed."
                    )
                  ],

                  [
                    "After launch, the centre should track whether complaints actually follow the redesigned process.",
                    null
                  ],

                  [
                    "A named owner must investigate repeated transfers and alternative operating paths rather than relying on green milestones.",
                    iss(
                      "Completed project activities may conceal continued use of the old process.",
                      "A misleading green status"
                    )
                  ],

                  [
                    "This resembles Qasr, where a new title and completed induction cannot establish complete organisational readiness.",
                    null
                  ],

                  [
                    "The People phase succeeds when roles, authority, measures, capability and adoption evidence support the redesigned work.",
                    q(
                      "Would you declare the service centre ready if everyone attended training but nobody tested decision-making capability?"
                    )
                  ]

                ]
              }

            ]
          },

          // ========================================================
          // W10O1c
          // WHO DOES THE WORK, AND WHO ANSWERS FOR IT?
          //
          // Visual rhythm:
          // One disputed rate -> responsibility -> accountability ->
          // four RACI contributions -> missing accountable owner ->
          // distinction between RACI and formal delegation.
          // ========================================================

          {
            title: "Who does the work, and who answers for it?",
            sec: "W10O1c",
            lines: [

              [
                "Now imagine a Guest Host facing a traveller whose confirmed corporate rate differs from the amount displayed at check-in. The guest wants one clear answer.",
                t(
                  "Who does the work, and who answers for it?",
                  "Making responsibility and accountability visible."
                )
              ],

              [
                "The employee can investigate the discrepancy, but revenue policy and managerial authority may also be involved.",
                dg(
                  "A cross-functional decision",
                  flow([
                    "Guest|raises issue",
                    "Guest Host|investigates",
                    "Revenue|policy",
                    "Decision|required"
                  ]),
                  "One guest exception may involve several organisational functions."
                )
              ],

              [
                "Without clear ownership, the guest may be passed between employees who each expect somebody else to decide.",
                iss(
                  "Several people contribute, but final decision ownership remains unclear.",
                  "The accountability gap"
                )
              ],

              [
                "A RACI matrix helps us distinguish four contributions: Responsible, Accountable, Consulted and Informed.",
                st(
                  "RACI makes cross-functional responsibility and accountability explicit."
                )
              ],

              [
                "Responsible identifies the person performing an activity. Here, the Guest Host investigates the disputed rate and gathers the evidence.",
                it(
                  1,
                  4,
                  "users",
                  "Responsible",
                  "Performs the activity and gathers the necessary evidence."
                )
              ],

              [
                "That employee may investigate successfully without possessing authority over every policy decision arising from the investigation.",
                raci(
                  {
                    task: "Investigate the rate",
                    responsible: "Guest Host",
                    accountable: "Process owner"
                  },
                  "Responsibility in action",
                  "Performing an investigation does not automatically confer decision authority."
                )
              ],

              [
                "Accountable identifies the role ultimately answerable for an activity's result or governing decision.",
                it(
                  2,
                  4,
                  "target",
                  "Accountable",
                  "Ultimately answers for the activity or decision."
                )
              ],

              [
                "Each activity should have one clearly identified accountable role, even when several employees contribute to its completion.",
                st(
                  "One activity, one accountable owner."
                )
              ],

              [
                "Imagine two managers both claiming final approval while disagreeing about how the exception should be handled.",
                iss(
                  "Competing accountable owners create conflicting instructions.",
                  "Two owners, no clear decision"
                )
              ],

              [
                "The Guest Host is left waiting for agreement, and the traveller experiences another avoidable delay.",
                null
              ],

              [
                "Consulted identifies someone whose expertise informs the decision. A revenue manager, for example, may advise on the applicable rate policy.",
                it(
                  3,
                  4,
                  "brain",
                  "Consulted",
                  "Provides knowledge or advice before a decision is completed."
                )
              ],

              [
                "Consultation improves judgement, but it does not automatically transfer accountability to the person providing advice.",
                dg(
                  "Advice supports the decision",
                  flow([
                    "Guest Host|investigates",
                    "Revenue manager|advises",
                    "Decision owner|decides"
                  ]),
                  "Consultation provides input without necessarily changing decision ownership."
                )
              ],

              [
                "Informed identifies someone who receives relevant updates without necessarily participating in or approving the decision.",
                it(
                  4,
                  4,
                  "link",
                  "Informed",
                  "Receives information about progress, decisions or outcomes."
                )
              ],

              [
                "A senior manager may need visibility of exception patterns without approving every individual guest case.",
                st(
                  "Keeping someone informed does not create another approval stage."
                )
              ],

              [
                "Now picture Qasr's RACI matrix connecting operational, technical, commercial and executive roles.",
                dg(
                  "Cross-functional roles",
                  flow([
                    "Process|owner",
                    "Front|desk",
                    "IT",
                    "Revenue|manager",
                    "COO"
                  ]),
                  "The RACI exhibit connects roles across the redesigned arrival process."
                )
              ],

              [
                "Activities include defining standards, approving redesign, building workflows, running operations, monitoring performance and escalating exceptions.",
                null
              ],

              [
                "Each activity needs a clear accountable owner. Shared participation must not become shared ambiguity.",
                st(
                  "Cross-functional participation does not remove the need for one accountable role."
                )
              ],

              [
                "For example, workflow building needs explicit accountability. Naming the people who perform the work is not enough if nobody is identified as answerable for its completion.",
                diagram(
                  "raciMatrix",
                  { missing: true },
                  flow([
                    "Workflow|requirements",
                    "Responsible|builder",
                    "!Accountable|owner missing",
                    "Approval|unclear"
                  ]),
                  "Making accountability visible",
                  "The illustrative matrix exposes an unassigned accountable owner."
                )
              ],

              [
                "A RACI matrix should follow the redesigned process. Copying the old departmental hierarchy may preserve handoffs that the redesign was intended to remove.",
                iss(
                  "Copying old organisational boundaries into RACI can preserve outdated handoffs.",
                  "The old structure returns"
                )
              ],

              [
                "At Qasr, the Guest Host must know which exceptions can be resolved locally and which require escalation.",
                authority(
                  320,
                  false,
                  true,
                  "The decision boundary",
                  "The illustrative decision shows why a responsible employee still needs formal authority."
                )
              ],

              [
                "Remember that RACI clarifies who owns activities. It does not, by itself, grant permission to make every related decision.",
                cmp(
                  "a",
                  "RACI",
                  "Clarifies responsibility, accountability, consultation and information.",
                  "up"
                )
              ],

              [
                "Formal delegation establishes the authorised decision boundary. Both arrangements must support the same redesigned work.",
                cmp(
                  "b",
                  "Formal delegation",
                  "Specifies permitted decisions and escalation limits.",
                  "up"
                )
              ],

              [
                "When RACI and delegation agree, employees can act appropriately without repeatedly searching for somebody willing to accept responsibility.",
                st(
                  "Clear accountability and usable authority support dependable decisions."
                )
              ],

              [
                "Qasr's goal is to make every important handoff understandable before the guest encounters another avoidable delay.",
                q(
                  "Does investigating a discrepancy automatically make the Guest Host accountable for every related policy decision?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE SUPPLIER PAYMENT THAT NOBODY OWNED
              // ----------------------------------------------------

              {
                title: "The supplier payment that nobody owned",
                lines: [

                  [
                    "Imagine a company struggling to pay suppliers because several departments participate in every invoice.",
                    t(
                      "Remedial · Understanding RACI",
                      "Doing the work is different from owning its result."
                    )
                  ],

                  [
                    "Purchasing checks orders, warehouse employees verify deliveries and finance reviews payment.",
                    dg(
                      "The supplier payment journey",
                      flow([
                        "Invoice|received",
                        "Order|checked",
                        "Delivery|verified",
                        "Payment|reviewed",
                        "Supplier|paid"
                      ]),
                      "Several departments contribute to one end-to-end process."
                    )
                  ],

                  [
                    "A price discrepancy appears. Purchasing expects finance to decide, while finance expects purchasing to resolve it.",
                    iss(
                      "Two departments participate, but neither accepts final ownership.",
                      "An accountability gap"
                    )
                  ],

                  [
                    "The invoice remains unpaid because participation does not establish who ultimately answers for the decision.",
                    st(
                      "RACI distinguishes performing work from accountability for its result."
                    )
                  ],

                  [
                    "A purchasing officer investigates the disputed price by comparing the invoice with the approved purchase order.",
                    raci(
                      {
                        task: "Investigate price",
                        responsible: "Purchasing",
                        accountable: "Decision owner"
                      },
                      "Responsible means performing",
                      "The responsible employee establishes the facts."
                    )
                  ],

                  [
                    "That officer is responsible for investigating, but another authorised role may be accountable for approving the final treatment.",
                    null
                  ],

                  [
                    "The organisation should identify exactly one accountable role for that approval activity.",
                    q(
                      "Why would assigning two accountable managers make this decision less reliable?"
                    )
                  ],

                  [
                    "Competing owners could issue contradictory instructions, leaving employees uncertain about which decision is final.",
                    iss(
                      "Multiple accountable owners create conflicting approval directions.",
                      "Conflicting ownership"
                    )
                  ],

                  [
                    "Consulted employees provide expertise without automatically becoming accountable for the decision.",
                    cmp(
                      "a",
                      "Accountable",
                      "Ultimately answers for the decision or activity.",
                      "up"
                    )
                  ],

                  [
                    "For example, warehouse staff may clarify the delivered quantity before finance completes its review.",
                    cmp(
                      "b",
                      "Consulted",
                      "Provides relevant information and advice.",
                      "up"
                    )
                  ],

                  [
                    "An informed stakeholder receives an update after the decision without needing to approve another stage.",
                    dg(
                      "Information without another approval",
                      flow([
                        "Decision|completed",
                        "Relevant|update",
                        "Stakeholder|informed"
                      ]),
                      "Information does not necessarily create additional approval."
                    )
                  ],

                  [
                    "This distinction prevents unnecessary referrals and keeps the supplier payment process moving.",
                    null
                  ],

                  [
                    "The company should assign RACI roles around the redesigned payment journey rather than historical departmental boundaries.",
                    st(
                      "Accountability should support the process, not preserve unnecessary handoffs."
                    )
                  ],

                  [
                    "Qasr faces the same challenge when Guest Hosts investigate rate discrepancies involving operational and revenue considerations.",
                    null
                  ],

                  [
                    "Clear responsibility, accountability and escalation allow employees to resolve problems without sending customers through organisational loops.",
                    q(
                      "Why might the person investigating a problem differ from the person accountable for its final resolution?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE UNIVERSITY ENROLMENT DECISION
              // ----------------------------------------------------

              {
                title: "The university enrolment decision",
                lines: [

                  [
                    "Imagine a university redesigning enrolment so students no longer contact several offices separately about unusual cases.",
                    t(
                      "Remedial · Coordinating across departments",
                      "RACI prevents competing decision owners."
                    )
                  ],

                  [
                    "A student adviser now coordinates cases involving academic requirements and financial obligations.",
                    dg(
                      "The redesigned enrolment journey",
                      flow([
                        "Student|requests enrolment",
                        "Adviser|reviews",
                        "!Exception|identified",
                        "Decision|obtained",
                        "Enrolment|completed"
                      ]),
                      "One adviser coordinates the journey across organisational functions."
                    )
                  ],

                  [
                    "The adviser gathers information and helps each case move forward, but cannot approve every academic or financial exception.",
                    iss(
                      "Coordination responsibility does not confer unlimited decision authority.",
                      "Different roles, different decisions"
                    )
                  ],

                  [
                    "Imagine a student requesting registration without satisfying a prerequisite for a particular course.",
                    null
                  ],

                  [
                    "The adviser checks the record and identifies the requirement preventing ordinary registration.",
                    dg(
                      "The adviser's responsibility",
                      flow([
                        "Student|requests help",
                        "Adviser|checks record",
                        "Prerequisite|issue identified"
                      ]),
                      "The adviser performs the investigation."
                    )
                  ],

                  [
                    "An authorised academic role must decide whether the applicable rules permit an exception.",
                    st(
                      "Each decision activity needs one accountable owner."
                    )
                  ],

                  [
                    "A programme coordinator might be consulted because that person understands the academic consequences.",
                    cmp(
                      "a",
                      "Accountable role",
                      "Answers for the academic exception decision.",
                      "up"
                    )
                  ],

                  [
                    "The consulted coordinator provides advice, but does not automatically become the final decision owner.",
                    cmp(
                      "b",
                      "Consulted role",
                      "Provides relevant academic expertise.",
                      "up"
                    )
                  ],

                  [
                    "The adviser may then be informed so the student receives an accurate explanation.",
                    dg(
                      "The RACI contributions",
                      flow([
                        "Responsible|performs",
                        "Accountable|answers",
                        "Consulted|advises",
                        "Informed|receives updates"
                      ]),
                      "RACI distinguishes four contributions."
                    )
                  ],

                  [
                    "Receiving the decision does not make the adviser accountable for the academic judgement behind it.",
                    null
                  ],

                  [
                    "Now suppose two university managers both claim final authority over the same prerequisite exception.",
                    iss(
                      "Competing accountable managers delay a decision the student needs.",
                      "Two owners, no resolution"
                    )
                  ],

                  [
                    "A clear RACI assignment identifies one accountable decision owner and prevents that ambiguity.",
                    st(
                      "One accountable role makes ownership understandable."
                    )
                  ],

                  [
                    "The university also needs documented escalation when unusual cases exceed the authority assigned to employees.",
                    dg(
                      "From investigation to decision",
                      flow([
                        "Adviser|investigates",
                        "Authority|checked",
                        "Decision owner|decides",
                        "Student|informed"
                      ]),
                      "Responsibility and authority must connect through a clear process."
                    )
                  ],

                  [
                    "This brings us back to Qasr, where Guest Hosts coordinate exceptions without inheriting unlimited revenue authority.",
                    null
                  ],

                  [
                    "Their work becomes dependable when employees know who investigates, who decides, who advises and who receives updates.",
                    q(
                      "Would making every participating department accountable for the same exception improve coordination or create confusion?"
                    )
                  ]

                ]
              }

            ]
          }

        ]
      },

      // PART 2 CONTINUES WITH LESSON 2.

      // ============================================================
      // LESSON 2
      // THE JOB MUST MATCH THE PROCESS
      //
      // Narrative arc:
      // A Guest Host faces an eligible rate discrepancy.
      // The communicated limit appears to permit a local decision.
      // Formal delegation does not.
      // The inherited scorecard rewards the old work.
      // The role must be repaired as a connected operating system.
      //
      // Signature moments:
      // 1. AED 320 reaches an undocumented authority boundary.
      // 2. The same decision changes when delegation is formalised.
      // 3. AED 460 crosses the monetary boundary.
      // 4. The scorecard tilts against complex exception handling.
      // 5. Five organisational repairs assemble into one coherent job.
      //
      // Learning outcome: O2
      // Primary CLO: S3
      // Supporting CLO: K3
      // ============================================================

      {
        id: "l2",
        title: "The job must match the process",
        sections: [

          // ========================================================
          // W10O2a
          // THE AED 400 DECISION
          //
          // Visual rhythm:
          // One decision, three conditions.
          // Eligibility -> monetary boundary -> formal delegation.
          // The first case escalates because authority is undocumented.
          // The second illustrates what formal delegation would change.
          // The third crosses the limit and must escalate.
          //
          // AED 320 and AED 460 are illustrative teaching amounts.
          // They are not observed Qasr transactions.
          // ========================================================

          {
            title: "The AED 400 decision",
            sec: "W10O2a",
            lines: [

              [
                "Let us return to the Guest Host standing beside the traveller whose corporate rate does not match the booking confirmation. This time, we will follow the decision rather than the guest journey.",
                t(
                  "THE AED 400 DECISION",
                  "A limit is useful only when authority is clear."
                )
              ],

              [
                "Imagine that the discrepancy is AED 320. This amount is an illustrative example, not a transaction reported in the Qasr case.",
                authority(
                  320,
                  false,
                  true,
                  "An illustrative AED 320 discrepancy",
                  "The amount is within the communicated AED 400 limit, but formal delegation is absent."
                )
              ],

              [
                "The employee checks the reservation, compares the confirmed rate with the displayed rate and establishes that the discrepancy is eligible under the communicated instruction.",
                dg(
                  "First, establish eligibility",
                  flow([
                    "Booking|confirmation",
                    "Displayed|rate",
                    "Eligibility|checked",
                    "Decision|required"
                  ]),
                  "The amount alone does not establish that a waiver is appropriate."
                )
              ],

              [
                "Because AED 320 is below AED 400, the employee might believe that the case can be resolved immediately.",
                st(
                  "AED 320 is within the communicated monetary limit."
                )
              ],

              [
                "But Qasr's formal delegation schedule has not been updated. The employee has received an email instruction without corresponding formal decision authority.",
                iss(
                  "The communicated limit and formal delegation do not agree.",
                  "The authority contradiction"
                )
              ],

              [
                "That distinction matters. Being told that a decision is encouraged is not necessarily the same as being formally authorised to make it.",
                cmp(
                  "a",
                  "Communicated permission",
                  "An email says eligible discrepancies up to AED 400 may be waived.",
                  "up"
                )
              ],

              [
                "Formal delegation should identify the authorised role, the permitted decision, the conditions and the boundary beyond which escalation is required.",
                cmp(
                  "b",
                  "Documented authority",
                  "An approved schedule defines the decision and its limits.",
                  "up"
                )
              ],

              [
                "Without that formal protection, a Guest Host may decide that referral is the safer option, even when the amount appears eligible.",
                authority(
                  320,
                  false,
                  true,
                  "The first decision",
                  "The illustrated eligible AED 320 case remains subject to an undocumented delegation gap."
                )
              ],

              [
                "The guest waits while the employee seeks approval. The organisation has reproduced a handoff that the redesign was supposed to remove.",
                iss(
                  "An unresolved authority gap can recreate the old approval delay.",
                  "The old process returns"
                )
              ],

              [
                "Now imagine that Qasr formally approves the delegation. The schedule explicitly authorises Guest Hosts to waive eligible discrepancies up to AED 400, subject to the stated conditions.",
                authority(
                  320,
                  true,
                  true,
                  "The same case after formal delegation",
                  "This is a proposed corrected arrangement, not the observed Qasr state."
                )
              ],

              [
                "The employee still needs to check eligibility. Formal authority does not turn every discrepancy below AED 400 into an automatic waiver.",
                st(
                  "Within the limit does not mean automatically approved."
                )
              ],

              [
                "For the eligible AED 320 example, the employee can now make the permitted local decision and record the reason.",
                dg(
                  "A supported local decision",
                  flow([
                    "Evidence|checked",
                    "Eligibility|confirmed",
                    "Authority|verified",
                    "Decision|recorded"
                  ]),
                  "A local decision remains conditional on eligibility and approved authority."
                )
              ],

              [
                "The guest receives a clear explanation without an unnecessary managerial referral. The process works because the organisation has made the employee's decision possible.",
                st(
                  "Delegated authority removes unnecessary referrals without removing control."
                )
              ],

              [
                "Now change the illustrative amount to AED 460. Even with formal delegation, this discrepancy exceeds the AED 400 limit.",
                authority(
                  460,
                  true,
                  true,
                  "An illustrative AED 460 discrepancy",
                  "The amount exceeds the delegated limit and requires escalation."
                )
              ],

              [
                "The Guest Host should investigate and document the evidence, then refer the decision to the appropriately authorised role.",
                dg(
                  "A legitimate escalation",
                  flow([
                    "AED 460|discrepancy",
                    "Evidence|gathered",
                    "Limit|exceeded",
                    "Authorised|review"
                  ]),
                  "Escalation is appropriate when a case exceeds delegated authority."
                )
              ],

              [
                "That referral is not a failure of empowerment. It is a necessary control that protects the organisation and the guest.",
                st(
                  "Good empowerment includes knowing when not to decide."
                )
              ],

              [
                "A third situation is also possible. A discrepancy may be below AED 400 but fail the eligibility conditions. The employee must not approve it simply because the amount is small.",
                authority(
                  320,
                  true,
                  false,
                  "Below the limit, but not eligible",
                  "Eligibility remains a separate decision condition."
                )
              ],

              [
                "The decision therefore depends on three checks: the case must be eligible, the amount must be within the authorised boundary, and the employee must possess documented authority.",
                dg(
                  "Three decision conditions",
                  flow([
                    "Eligible|case?",
                    "Within|AED 400?",
                    "Formal|authority?",
                    "Local decision|or escalation"
                  ]),
                  "Eligibility, monetary limits and documented authority must agree."
                )
              ],

              [
                "The organisation should also make the approved rule available where employees work. A delegation schedule hidden in a distant document is less useful than a clear decision guide integrated into the workflow.",
                st(
                  "Authority must be documented, accessible and operationally usable."
                )
              ],

              [
                "This creates a direct requirement for Develop. The supporting workflow should reflect the approved decision boundary rather than forcing employees to remember an informal instruction.",
                handover(
                  "From delegation to workflow design",
                  "Approved authority becomes a requirement for the supporting process and technology."
                )
              ],

              [
                "Managers should sample decisions to verify that employees apply eligibility conditions correctly. Quality control remains necessary even when routine approval is delegated.",
                null
              ],

              [
                "The goal is not unlimited independence. It is appropriate independence within a clearly governed process.",
                st(
                  "Empowerment means clear permission, clear limits and accountable decisions."
                )
              ],

              [
                "At Qasr, the immediate repair is to align the formal delegation schedule with the intended Guest Host role, then communicate and practise the approved decision rules.",
                repair(
                  2,
                  "Repairing the authority gap",
                  "The role and its documented decision rights must support the same operating design."
                )
              ],

              [
                "Think about the original AED 320 example. The amount did not change, and the guest's problem did not change. What changed was the organisational support behind the employee's decision.",
                q(
                  "Why can the same eligible AED 320 discrepancy require escalation before formal delegation but permit local resolution afterwards?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE REFUND LIMIT
              // ----------------------------------------------------

              {
                title: "The refund limit",
                lines: [

                  [
                    "Imagine a customer-service employee receiving a request to refund a damaged product. The organisation has introduced a new policy encouraging employees to resolve straightforward cases.",
                    t(
                      "Remedial · Decision authority",
                      "A refund limit is not unlimited permission."
                    )
                  ],

                  [
                    "The communicated policy says that eligible refunds up to AED 400 may be approved locally.",
                    dg(
                      "The refund decision",
                      flow([
                        "Customer|requests refund",
                        "Eligibility|checked",
                        "Amount|checked",
                        "Authority|verified"
                      ]),
                      "A permitted refund depends on several conditions."
                    )
                  ],

                  [
                    "Imagine the refund is AED 320. The amount is below the limit, but the employee has not yet checked whether the request meets the policy conditions.",
                    q(
                      "Should the employee approve the refund simply because AED 320 is below AED 400?"
                    )
                  ],

                  [
                    "No. The employee must first establish eligibility. The monetary limit is only one part of the decision.",
                    st(
                      "A monetary threshold does not replace eligibility checks."
                    )
                  ],

                  [
                    "Suppose the product meets the conditions and the employee's formal delegation explicitly permits this refund.",
                    dg(
                      "A supported decision",
                      flow([
                        "Eligible|request",
                        "Within|limit",
                        "Formal|authority",
                        "Refund|approved"
                      ]),
                      "A local decision is appropriate when the conditions and authority agree."
                    )
                  ],

                  [
                    "The employee may approve the refund and record the reason without requesting unnecessary managerial permission.",
                    null
                  ],

                  [
                    "Now imagine that the employee received only an informal message encouraging refunds. The formal delegation schedule still requires managerial approval.",
                    iss(
                      "The informal instruction conflicts with the formal approval rule.",
                      "An authority gap"
                    )
                  ],

                  [
                    "The organisation should correct the delegation rather than blaming employees for following the formal control.",
                    st(
                      "Empowerment requires documented authority."
                    )
                  ],

                  [
                    "Consider a second eligible refund of AED 460. This amount exceeds the delegated limit.",
                    dg(
                      "An appropriate escalation",
                      flow([
                        "AED 460|refund",
                        "Eligibility|confirmed",
                        "Limit|exceeded",
                        "Manager|reviews"
                      ]),
                      "A case above the limit requires the authorised escalation route."
                    )
                  ],

                  [
                    "Escalation is appropriate because the employee does not possess unlimited decision rights.",
                    null
                  ],

                  [
                    "The same reasoning applies at Qasr. Guest Hosts need documented permission for eligible waivers and clear rules for cases beyond their authority.",
                    st(
                      "Clear limits make local decisions safer and more dependable."
                    )
                  ],

                  [
                    "The important distinction is between unnecessary escalation caused by unclear authority and necessary escalation required by a legitimate decision boundary.",
                    q(
                      "When does escalation protect the redesigned process rather than undermine it?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE MAINTENANCE DECISION
              // ----------------------------------------------------

              {
                title: "The maintenance decision",
                lines: [

                  [
                    "Imagine a maintenance coordinator responsible for keeping hotel rooms available. A technician reports a faulty component that must be replaced before a room can be used.",
                    t(
                      "Remedial · Empowerment and control",
                      "A decision limit needs conditions and formal authority."
                    )
                  ],

                  [
                    "The hotel wants routine repairs completed without unnecessary managerial delays.",
                    dg(
                      "The maintenance journey",
                      flow([
                        "Fault|reported",
                        "Repair|assessed",
                        "Authority|checked",
                        "Repair|authorised"
                      ]),
                      "Appropriate delegation can remove unnecessary waiting."
                    )
                  ],

                  [
                    "Suppose the coordinator is told that eligible repairs costing up to AED 400 may be authorised locally.",
                    null
                  ],

                  [
                    "A replacement component costs AED 320. The amount is within the communicated limit, but the coordinator still needs to confirm that the repair is eligible and formally delegated.",
                    q(
                      "What must the coordinator verify before authorising the AED 320 repair?"
                    )
                  ],

                  [
                    "The repair must satisfy the relevant conditions, remain within the limit and fall within the coordinator's documented authority.",
                    st(
                      "Eligibility, monetary limits and formal delegation work together."
                    )
                  ],

                  [
                    "If the organisation has not updated formal delegation, the coordinator may seek managerial approval rather than risk making an unauthorised commitment.",
                    iss(
                      "An informal instruction cannot reliably replace formal authority.",
                      "The missing permission"
                    )
                  ],

                  [
                    "The correct organisational response is to formalise the intended decision boundary and explain how it should be used.",
                    dg(
                      "Repairing the decision rule",
                      flow([
                        "Define|eligibility",
                        "Approve|limit",
                        "Document|delegation",
                        "Communicate|rule"
                      ]),
                      "The decision rule becomes dependable when formally established."
                    )
                  ],

                  [
                    "Now suppose another repair costs AED 460. Even if it is necessary, the coordinator must use the authorised escalation route.",
                    null
                  ],

                  [
                    "The limit protects financial control while allowing smaller eligible decisions to be made promptly.",
                    cmp(
                      "a",
                      "Within authority",
                      "Resolve an eligible repair locally.",
                      "up"
                    )
                  ],

                  [
                    "A case beyond the limit belongs with an appropriately authorised decision maker.",
                    cmp(
                      "b",
                      "Beyond authority",
                      "Investigate and refer for approval.",
                      "up"
                    )
                  ],

                  [
                    "This is not a contradiction. Effective delegation combines independence with clear boundaries.",
                    st(
                      "Good empowerment is controlled independence."
                    )
                  ],

                  [
                    "At Qasr, the AED 400 waiver instruction presents the same organisational issue. Guest Hosts need permission they can rely on.",
                    null
                  ],

                  [
                    "The redesigned process becomes faster when employees can make appropriate decisions confidently, without bypassing legitimate controls.",
                    q(
                      "Why should formal delegation be updated before employees are expected to make independent financial decisions?"
                    )
                  ]

                ]
              }

            ]
          },

          // ========================================================
          // W10O2b
          // MEASURES AND INCENTIVES MUST REWARD THE NEW WORK
          //
          // Visual rhythm:
          // Old scorecard -> difficult exception -> incentive conflict ->
          // proposed measure -> quality safeguard -> corrected balance.
          //
          // Proposed measures are design recommendations.
          // They are not reported Qasr performance results.
          // ========================================================

          {
            title: "Measures and incentives must reward the new work",
            sec: "W10O2b",
            lines: [

              [
                "A Guest Host spends several minutes helping a traveller whose corporate booking contains a rate discrepancy. The employee investigates the evidence and resolves the problem appropriately.",
                t(
                  "WHAT THE SCORECARD REWARDS",
                  "The organisation may be measuring the wrong job."
                )
              ],

              [
                "The guest is relieved. But imagine that the employee's performance dashboard still rewards the number of check-ins completed and average transaction speed.",
                measures(
                  false,
                  "The inherited scorecard",
                  "Old throughput measures may conflict with careful exception handling."
                )
              ],

              [
                "The employee has performed valuable work, yet the old measures may make that work appear inefficient.",
                iss(
                  "A successful guest resolution can look like poor performance against the old target.",
                  "The incentive contradiction"
                )
              ],

              [
                "This is not merely a measurement problem. It can influence which activities employees choose to prioritise.",
                st(
                  "Performance measures influence behaviour."
                )
              ],

              [
                "Before redesign, Front Desk Agents were rewarded for processing check-ins efficiently. That made sense when conventional transactions occupied much of their work.",
                cmp(
                  "a",
                  "Old job",
                  "Process conventional check-ins quickly.",
                  "down"
                )
              ],

              [
                "The new Guest Host role is different. Kiosks handle many routine transactions, leaving employees to support guests and investigate exceptions.",
                cmp(
                  "b",
                  "New job",
                  "Resolve eligible exceptions appropriately and support the guest.",
                  "up"
                )
              ],

              [
                "If Qasr keeps measuring the old job, it may unintentionally discourage the behaviour required by the new process.",
                null
              ],

              [
                "Imagine two Guest Hosts. One completes several straightforward interactions quickly. The other spends time resolving a difficult rate dispute that would otherwise require repeated referrals.",
                dg(
                  "Two kinds of contribution",
                  flow([
                    "Routine|interactions",
                    "Fast|completion",
                    "Complex|exception",
                    "Careful|resolution"
                  ]),
                  "Different activities require different time and judgement."
                )
              ],

              [
                "A throughput-only scorecard may favour the first employee, even when the second has delivered an important improvement in guest experience.",
                iss(
                  "The metric rewards speed without recognising the value of difficult resolutions.",
                  "The scorecard tilts"
                )
              ],

              [
                "The solution is not to abandon efficiency. It is to measure efficiency alongside the outcomes and safeguards the redesigned process requires.",
                st(
                  "The new scorecard should balance efficiency, resolution and decision quality."
                )
              ],

              [
                "One proposed measure is the proportion of eligible exceptions resolved correctly without unnecessary escalation.",
                fm(
                  "Appropriate local resolution",
                  "Eligible exceptions resolved correctly without unnecessary escalation",
                  "Eligible exceptions within delegated authority"
                )
              ],

              [
                "The denominator matters. Employees should not be penalised for escalating cases that are genuinely outside their authority.",
                q(
                  "Would a high escalation rate always indicate poor employee performance?"
                )
              ],

              [
                "No. An escalation may be the correct decision when a case is ineligible, exceeds the monetary limit or requires specialist judgement.",
                authority(
                  460,
                  true,
                  true,
                  "An appropriate escalation",
                  "An illustrative AED 460 discrepancy exceeds the proposed delegated limit."
                )
              ],

              [
                "The organisation must distinguish necessary escalation from avoidable referral caused by unclear rules, inadequate capability or conflicting incentives.",
                dg(
                  "Two different reasons for escalation",
                  branch(
                    "Why was the case escalated?",
                    [
                      "Legitimate|authority boundary",
                      "Avoidable|organisational barrier"
                    ]
                  ),
                  "Not every escalation represents a failure."
                )
              ],

              [
                "A second measure should examine decision quality. Managers can sample completed cases and check whether eligibility rules and delegated limits were applied correctly.",
                dg(
                  "Quality safeguards",
                  flow([
                    "Case|resolved",
                    "Decision|sampled",
                    "Rule|verified",
                    "Feedback|provided"
                  ]),
                  "Quality sampling protects against inappropriate local approvals."
                )
              ],

              [
                "Without that safeguard, employees might feel pressure to approve too many exceptions simply to improve their local-resolution score.",
                iss(
                  "Rewarding local resolution alone can encourage inappropriate approvals.",
                  "A new incentive risk"
                )
              ],

              [
                "A third measure can examine the guest experience, including whether the employee explained the decision clearly and prevented avoidable waiting.",
                it(
                  3,
                  4,
                  "heart",
                  "Guest experience",
                  "Recognise appropriate assistance and clear communication."
                )
              ],

              [
                "A fourth measure can track how frequently cases return for correction. Rework reveals whether apparently completed decisions were actually dependable.",
                it(
                  4,
                  4,
                  "repeat",
                  "Rework",
                  "Identify cases that require correction after the first resolution."
                )
              ],

              [
                "These are proposed design measures, not performance results reported in the Qasr case.",
                st(
                  "A proposed metric is not an observed result."
                )
              ],

              [
                "The scorecard must also consider fairness. Employees should not be judged on factors outside their control, such as missing system permissions or unresolved policy contradictions.",
                null
              ],

              [
                "Suppose a Guest Host correctly escalates a case because the formal delegation schedule has not been updated. Penalising that employee for the referral would reward risky behaviour.",
                authority(
                  320,
                  false,
                  true,
                  "A referral caused by an authority gap",
                  "The employee should not be penalised for following the existing formal control."
                )
              ],

              [
                "The organisation should repair the authority gap before treating every referral as an employee performance problem.",
                st(
                  "Fix organisational barriers before judging employee behaviour."
                )
              ],

              [
                "Rewards and recognition should reinforce the same expectations as the scorecard. Otherwise, employees receive one message from the process design and another from the performance system.",
                measures(
                  true,
                  "An aligned scorecard",
                  "Proposed measures recognise appropriate resolution and quality safeguards."
                )
              ],

              [
                "The People phase therefore requires coordination between process owners, operational managers and human resources.",
                dg(
                  "Aligning the people system",
                  flow([
                    "Process|requirements",
                    "Performance|measures",
                    "Recognition|and rewards",
                    "Operating|behaviour"
                  ]),
                  "Measures and rewards should reinforce the redesigned process."
                )
              ],

              [
                "At Qasr, the inherited check-in targets must be reviewed because they no longer describe the full value of the Guest Host role.",
                repair(
                  3,
                  "Repairing the scorecard",
                  "Role, authority and performance measures must reinforce the same work."
                )
              ],

              [
                "The central principle is simple. If the organisation wants employees to resolve appropriate exceptions, it must not reward them only for completing easy transactions quickly.",
                q(
                  "What behaviour might Qasr unintentionally encourage by keeping the old check-in volume and speed targets?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE CALL CENTRE THAT REWARDED SHORT CALLS
              // ----------------------------------------------------

              {
                title: "The call centre that rewarded short calls",
                lines: [

                  [
                    "Imagine a call centre redesigning customer service so employees resolve problems during the first conversation whenever appropriate.",
                    t(
                      "Remedial · Measures and incentives",
                      "A metric can reward the opposite of the intended process."
                    )
                  ],

                  [
                    "The new process encourages employees to investigate the customer's problem and provide a dependable resolution.",
                    dg(
                      "The redesigned service journey",
                      flow([
                        "Customer|calls",
                        "Problem|investigated",
                        "Appropriate|resolution",
                        "Customer|informed"
                      ]),
                      "The redesigned process values appropriate resolution."
                    )
                  ],

                  [
                    "But the old performance system still rewards employees primarily for keeping calls short.",
                    measures(
                      false,
                      "The inherited incentive",
                      "Speed can conflict with careful problem resolution."
                    )
                  ],

                  [
                    "A complicated customer problem may require a longer conversation. The employee who solves it could appear less productive than someone who transfers the call quickly.",
                    iss(
                      "A useful resolution takes longer and receives a worse score.",
                      "The wrong reward"
                    )
                  ],

                  [
                    "Employees may respond by ending calls before problems are fully resolved or transferring difficult cases to another team.",
                    null
                  ],

                  [
                    "The organisation has redesigned the process but retained a measure that encourages the previous behaviour.",
                    st(
                      "Employees respond to the performance system they actually experience."
                    )
                  ],

                  [
                    "The call centre should recognise appropriate first-contact resolution while continuing to monitor efficiency.",
                    cmp(
                      "a",
                      "Old measure",
                      "Keep calls as short as possible.",
                      "down"
                    )
                  ],

                  [
                    "A better scorecard balances resolution quality, customer experience and reasonable handling time.",
                    cmp(
                      "b",
                      "Aligned measures",
                      "Resolve appropriate cases correctly while managing time.",
                      "up"
                    )
                  ],

                  [
                    "The organisation should also review a sample of completed cases. Otherwise, employees might claim resolution without actually solving the problem.",
                    dg(
                      "Quality assurance",
                      flow([
                        "Case|completed",
                        "Resolution|sampled",
                        "Quality|checked",
                        "Feedback|provided"
                      ]),
                      "A quality safeguard prevents the new measure from being manipulated."
                    )
                  ],

                  [
                    "A high number of transfers may indicate unclear authority, inadequate training or legitimate specialist requirements.",
                    null
                  ],

                  [
                    "Managers should investigate the reasons rather than assume that every transfer is poor performance.",
                    q(
                      "Why should the organisation distinguish necessary transfers from avoidable ones?"
                    )
                  ],

                  [
                    "Necessary transfers protect decision boundaries. Avoidable transfers reveal barriers that the redesigned process should remove.",
                    st(
                      "Measures must distinguish correct behaviour from organisational barriers."
                    )
                  ],

                  [
                    "At Qasr, Guest Hosts face the same risk when inherited targets reward conventional check-in volume and speed.",
                    null
                  ],

                  [
                    "The redesigned scorecard should recognise appropriate exception resolution without encouraging employees to exceed their authority.",
                    measures(
                      true,
                      "The corrected incentive",
                      "Resolution, quality and efficiency should support each other."
                    )
                  ],

                  [
                    "The goal is not to reward employees for spending more time. It is to recognise the value of the work that the new process requires.",
                    q(
                      "Why might a longer customer interaction represent better performance under a redesigned service process?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE WAREHOUSE THAT REWARDED SPEED
              // ----------------------------------------------------

              {
                title: "The warehouse that rewarded speed",
                lines: [

                  [
                    "Imagine a warehouse introducing a redesigned order-picking process that includes stronger accuracy checks.",
                    t(
                      "Remedial · Aligning performance measures",
                      "Speed and quality must support the same process."
                    )
                  ],

                  [
                    "Employees are expected to confirm product identity and quantity before orders leave the warehouse.",
                    dg(
                      "The redesigned picking process",
                      flow([
                        "Order|received",
                        "Item|selected",
                        "Accuracy|checked",
                        "Order|released"
                      ]),
                      "The redesign adds a quality safeguard."
                    )
                  ],

                  [
                    "However, employees still receive recognition mainly for the number of items picked per hour.",
                    iss(
                      "The performance system rewards speed more strongly than accuracy.",
                      "A conflicting incentive"
                    )
                  ],

                  [
                    "An employee who carefully checks an unusual order may process fewer items than someone who skips the verification step.",
                    null
                  ],

                  [
                    "The second employee could appear more productive even while increasing the risk of errors.",
                    measures(
                      false,
                      "The scorecard conflict",
                      "A throughput-only measure can undermine the redesigned quality control."
                    )
                  ],

                  [
                    "The warehouse should measure both throughput and order accuracy.",
                    cmp(
                      "a",
                      "Throughput",
                      "How efficiently orders are processed.",
                      "up"
                    )
                  ],

                  [
                    "Accuracy indicates whether the completed work meets the required standard.",
                    cmp(
                      "b",
                      "Quality",
                      "Whether the correct items and quantities are released.",
                      "up"
                    )
                  ],

                  [
                    "The organisation may also track rework, returns and errors detected after dispatch.",
                    dg(
                      "A balanced scorecard",
                      flow([
                        "Throughput",
                        "Accuracy",
                        "Rework",
                        "Customer|outcome"
                      ]),
                      "Balanced measures reveal both speed and quality."
                    )
                  ],

                  [
                    "Employees should not be penalised for delays caused by equipment failures or unavailable stock that they cannot control.",
                    st(
                      "Performance measures must account for organisational constraints."
                    )
                  ],

                  [
                    "Managers should investigate repeated exceptions and distinguish employee decisions from system problems.",
                    null
                  ],

                  [
                    "Rewards should reinforce careful, efficient work rather than encouraging employees to bypass the new safeguard.",
                    measures(
                      true,
                      "The aligned incentive",
                      "Efficiency and quality should reinforce each other."
                    )
                  ],

                  [
                    "Qasr's Guest Hosts face an equivalent challenge. The new role requires careful exception handling, but the inherited targets still reward conventional check-in speed.",
                    null
                  ],

                  [
                    "An aligned scorecard recognises the contribution that the redesigned process actually requires.",
                    q(
                      "What could happen if a warehouse introduces accuracy checks but continues rewarding employees only for picking speed?"
                    )
                  ]

                ]
              }

            ]
          },

          // ========================================================
          // W10O2c
          // WRITE THE REAL JOB
          //
          // Visual rhythm:
          // Old description -> new work -> delayed document ->
          // role specification -> authority -> measures -> capability.
          //
          // The three-week delay is an observed Qasr case fact.
          // Proposed role wording is an instructional design example.
          // ========================================================

          {
            title: "Write the real job",
            sec: "W10O2c",
            lines: [

              [
                "A redesigned process needs more than a new job title. Employees need a role description that accurately reflects the work they are expected to perform.",
                t(
                  "WRITE THE REAL JOB",
                  "The role description must catch up with the process."
                )
              ],

              [
                "At Qasr, the twenty-two former Front Desk Agents became Guest Hosts, but revised job descriptions arrived three weeks after go-live.",
                hosts(
                  "team",
                  "Twenty-two redesigned roles",
                  "The revised job descriptions arrived three weeks after the pilot went live."
                )
              ],

              [
                "For those three weeks, employees were expected to perform a new role before receiving its revised formal description.",
                iss(
                  "The redesigned job began before its formal responsibilities were fully documented.",
                  "A three-week gap"
                )
              ],

              [
                "That delay matters because the new work differs from the old work. Routine check-ins move towards kiosks, while employees investigate exceptions and support guests.",
                cmp(
                  "a",
                  "Former Front Desk Agent",
                  "Processes conventional check-ins and routine transactions.",
                  "down"
                )
              ],

              [
                "The Guest Host needs stronger exception-handling judgement, clearer coordination responsibilities and appropriate local decision authority.",
                cmp(
                  "b",
                  "Guest Host",
                  "Supports guests, investigates exceptions and makes authorised decisions.",
                  "up"
                )
              ],

              [
                "A useful job description should begin with the purpose of the role. For example, the Guest Host exists to help guests complete the redesigned arrival journey and resolve eligible exceptions appropriately.",
                st(
                  "Role purpose: help guests complete arrivals and resolve eligible exceptions appropriately."
                )
              ],

              [
                "Next, it should describe the main responsibilities in observable terms. These include assisting guests with kiosks, investigating booking discrepancies and communicating decisions clearly.",
                it(
                  1,
                  5,
                  "users",
                  "Core responsibilities",
                  "Support arrivals, investigate exceptions and communicate outcomes."
                )
              ],

              [
                "The description should also explain the decisions the employee may make independently.",
                it(
                  2,
                  5,
                  "key",
                  "Decision rights",
                  "Identify permitted local decisions and formal escalation boundaries."
                )
              ],

              [
                "At Qasr, the communicated AED 400 waiver limit is an obvious example. The description should align with the approved delegation schedule rather than relying on an informal email.",
                authority(
                  320,
                  false,
                  true,
                  "Authority must be formalised",
                  "The illustrative AED 320 decision exposes the existing delegation gap."
                )
              ],

              [
                "The employee should know what evidence to check, which conditions establish eligibility and when the case must be escalated.",
                dg(
                  "The decision responsibilities",
                  flow([
                    "Check|evidence",
                    "Establish|eligibility",
                    "Verify|authority",
                    "Resolve|or escalate"
                  ]),
                  "A practical role description connects responsibility with decision boundaries."
                )
              ],

              [
                "The third element is accountability. The description should identify the outcomes for which the Guest Host is answerable and how those outcomes connect to the process owner.",
                it(
                  3,
                  5,
                  "target",
                  "Accountability",
                  "Explain expected outcomes and the role's relationship with process ownership."
                )
              ],

              [
                "Being accountable for appropriate guest assistance does not mean the employee controls every revenue policy or technical system decision.",
                null
              ],

              [
                "The fourth element is capability. The description should identify the knowledge and judgement required to perform the redesigned role.",
                it(
                  4,
                  5,
                  "brain",
                  "Capability",
                  "Specify the skills and judgement needed for realistic exceptions."
                )
              ],

              [
                "Guest Hosts need to understand the arrival workflow, relevant booking rules, the waiver boundary and the circumstances requiring specialist support.",
                capability(
                  "Capabilities required by the role",
                  "The new role requires more than familiarity with the kiosk interface."
                )
              ],

              [
                "The fifth element is performance expectations. Employees should understand how successful work will be recognised and assessed.",
                it(
                  5,
                  5,
                  "gauge",
                  "Performance expectations",
                  "Align measures with appropriate exception handling and guest outcomes."
                )
              ],

              [
                "At Qasr, inherited check-in volume and speed targets are poorly aligned with the redesigned Guest Host contribution.",
                measures(
                  false,
                  "The inherited measures",
                  "Old targets can conflict with the redesigned role."
                )
              ],

              [
                "The role description and scorecard should therefore be reviewed together. A document describing careful exception handling cannot be supported by a performance system rewarding only transaction speed.",
                st(
                  "The written role and the measured role must agree."
                )
              ],

              [
                "The organisation should also examine job grading and reward arrangements where the new role materially changes responsibility, judgement or accountability.",
                dg(
                  "Employment arrangements must fit",
                  flow([
                    "Role|requirements",
                    "Responsibility|and judgement",
                    "Job|evaluation",
                    "Appropriate|arrangements"
                  ]),
                  "Material changes should be assessed through the organisation's established job-evaluation process."
                )
              ],

              [
                "That does not mean every redesigned title automatically receives a higher grade. It means the organisation should evaluate the actual work rather than rely on the old label.",
                null
              ],

              [
                "The completed description should be reviewed with operational managers and the process owner, then explained to employees through practical examples.",
                repair(
                  3,
                  "Making the role operational",
                  "Role clarity, authority and measures must be aligned before the remaining readiness gaps can be closed."
                )
              ],

              [
                "A Guest Host should be able to read the description and recognise the decisions encountered during a real shift.",
                q(
                  "Would Qasr's original Front Desk Agent description adequately explain the judgement expected from a Guest Host?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE BANK ADVISER'S NEW JOB
              // ----------------------------------------------------

              {
                title: "The bank adviser's new job",
                lines: [

                  [
                    "Imagine a bank introducing self-service technology for routine transactions. Employees are now expected to spend more time helping customers with complex service needs.",
                    t(
                      "Remedial · Role redesign",
                      "A new title needs a new description of work."
                    )
                  ],

                  [
                    "The bank changes the employee title from Teller to Customer Adviser, but the original job description remains unchanged.",
                    cmp(
                      "a",
                      "Teller",
                      "Processes routine transactions and follows established procedures.",
                      "down"
                    )
                  ],

                  [
                    "The redesigned role requires the employee to investigate more complicated customer situations and coordinate appropriate assistance.",
                    cmp(
                      "b",
                      "Customer Adviser",
                      "Supports customers and handles appropriate service exceptions.",
                      "up"
                    )
                  ],

                  [
                    "The employee now faces responsibilities that are not reflected in the formal role.",
                    iss(
                      "The new work is not captured in the existing job description.",
                      "A role-definition gap"
                    )
                  ],

                  [
                    "The bank should first define the purpose of the Customer Adviser role.",
                    st(
                      "Role purpose explains the contribution the job is intended to make."
                    )
                  ],

                  [
                    "Next, it should describe the activities the adviser performs and the decisions the adviser may make.",
                    dg(
                      "A practical role specification",
                      flow([
                        "Role|purpose",
                        "Core|responsibilities",
                        "Decision|rights",
                        "Capability|requirements",
                        "Performance|expectations"
                      ]),
                      "A useful job description connects work, authority and expected results."
                    )
                  ],

                  [
                    "Decision authority must be documented. Employees should not assume that a new title permits every financial or service decision.",
                    null
                  ],

                  [
                    "The bank should also identify the knowledge and judgement needed for difficult customer cases.",
                    capability(
                      "Preparing the adviser",
                      "The new role requires realistic practice and demonstrated capability."
                    )
                  ],

                  [
                    "Finally, the performance system should recognise the redesigned contribution rather than reward only routine transaction volume.",
                    measures(
                      true,
                      "Aligned performance expectations",
                      "The role and scorecard should reinforce the same work."
                    )
                  ],

                  [
                    "A revised job description should be discussed with employees and supported by practical examples.",
                    null
                  ],

                  [
                    "The same principle applies to Qasr's Guest Hosts. Their new responsibilities require formal clarity before the organisation can expect consistent performance.",
                    q(
                      "Why is changing a job title insufficient when the decisions and responsibilities of the role have changed?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE LOGISTICS COORDINATOR'S NEW ROLE
              // ----------------------------------------------------

              {
                title: "The logistics coordinator's new role",
                lines: [

                  [
                    "Imagine a logistics company redesigning delivery coordination. Automated scheduling now handles routine assignments, while coordinators investigate exceptions.",
                    t(
                      "Remedial · Defining the real job",
                      "Automation changes what employees are expected to contribute."
                    )
                  ],

                  [
                    "The old role mainly involved entering delivery details and checking schedules.",
                    cmp(
                      "a",
                      "Old coordination role",
                      "Enter information and monitor routine schedules.",
                      "down"
                    )
                  ],

                  [
                    "The redesigned role requires employees to resolve conflicting delivery priorities and coordinate decisions across teams.",
                    cmp(
                      "b",
                      "Redesigned coordination role",
                      "Investigate exceptions and coordinate appropriate decisions.",
                      "up"
                    )
                  ],

                  [
                    "Management introduces the new workflow but delays revising the formal job description.",
                    iss(
                      "Employees perform changed responsibilities without an updated formal role.",
                      "The documentation gap"
                    )
                  ],

                  [
                    "A coordinator encounters two urgent deliveries requiring the same vehicle. The employee needs to know what decision can be made locally.",
                    q(
                      "What should the revised role description explain about this situation?"
                    )
                  ],

                  [
                    "It should describe the coordinator's responsibilities, the decision boundary and the escalation route when priorities exceed delegated authority.",
                    dg(
                      "A clear decision boundary",
                      flow([
                        "Conflict|identified",
                        "Evidence|reviewed",
                        "Authority|checked",
                        "Decision|or escalation"
                      ]),
                      "A role description should support real decisions."
                    )
                  ],

                  [
                    "The coordinator also needs capability in prioritisation, communication and the relevant operating rules.",
                    capability(
                      "Capability for the new role",
                      "Employees need practice with realistic exceptions."
                    )
                  ],

                  [
                    "Performance expectations should recognise dependable delivery coordination rather than merely the number of schedules entered.",
                    measures(
                      true,
                      "Aligned measures",
                      "The scorecard should reflect the redesigned contribution."
                    )
                  ],

                  [
                    "Where the new role materially changes responsibility, the organisation should review grading and reward arrangements through its established procedures.",
                    null
                  ],

                  [
                    "The revised description must be communicated clearly and connected to practical training.",
                    st(
                      "The written job must match the decisions employees actually face."
                    )
                  ],

                  [
                    "Qasr's delayed Guest Host descriptions illustrate the same risk. A process can change faster than the formal arrangements supporting its employees.",
                    null
                  ],

                  [
                    "The People phase closes that gap by aligning responsibilities, authority, capability and performance expectations.",
                    q(
                      "Which elements of the logistics coordinator's job must be revised when routine scheduling becomes automated?"
                    )
                  ]

                ]
              }

            ]
          }

        ]
      },

      // PART 3 CONTINUES WITH LESSON 3.

      // ============================================================
      // LESSON 3
      // TRAINING IS NOT CAPABILITY
      //
      // Narrative arc:
      // The project dashboard says training is complete.
      // Twenty-two people attended.
      // Nine still refer every rate discrepancy.
      // The learner discovers the gap between attendance and ability.
      // The lesson turns that gap into a practical assessment design.
      //
      // Signature moments:
      // 1. Twenty-two Guest Hosts appear together.
      // 2. Attendance is separated from demonstrated capability.
      // 3. Nine of twenty-two are highlighted.
      // 4. A realistic decision is tested, not merely explained.
      // 5. The readiness dashboard reveals its missing evidence.
      //
      // Learning outcome: O3
      // Primary CLO: S3
      // Supporting CLO: K3
      // ============================================================

      {
        id: "l3",
        title: "Training is not capability",
        sections: [

          // ========================================================
          // W10O3a
          // TWENTY-TWO ATTENDED. NINE STILL REFER EVERYTHING.
          //
          // Visual rhythm:
          // Green training status -> 22 attendees -> no assessment ->
          // 9 referrals -> competing explanations -> capability test.
          //
          // The nine referrals are observed.
          // Their individual causes have not been established.
          // ========================================================

          {
            title: "Twenty-two attended. Nine still refer everything.",
            sec: "W10O3a",
            lines: [

              [
                "The Qasr project team has encouraging news. All twenty-two Guest Hosts attended the four-hour induction before operating the redesigned arrival process.",
                t(
                  "TRAINING IS NOT CAPABILITY",
                  "Twenty-two attended. What can they actually do?"
                )
              ],

              [
                "On a project dashboard, that activity could easily appear complete. Every employee attended, and the training milestone has been delivered.",
                hosts(
                  "training",
                  "Twenty-two of twenty-two attended",
                  "All twenty-two Guest Hosts attended the four-hour induction."
                )
              ],

              [
                "But attendance tells us who was present. It does not establish whether anyone can make the decisions the new role requires.",
                st(
                  "Attendance is evidence of participation, not demonstrated capability."
                )
              ],

              [
                "Qasr conducted no post-induction capability assessment. The organisation therefore lacks direct assessment evidence of how well employees can apply the new decision rules.",
                hosts(
                  "assessment",
                  "Capability was not assessed",
                  "The case reports no post-induction capability assessment."
                )
              ],

              [
                "Now consider another observation. Nine of the twenty-two Guest Hosts refer every rate discrepancy to the duty manager.",
                hosts(
                  "referrals",
                  "Nine of twenty-two always refer",
                  "Nine Guest Hosts refer every rate discrepancy to the duty manager."
                )
              ],

              [
                "The contrast is striking. Everyone attended induction, yet a substantial group continues to use managerial referral for every rate discrepancy.",
                iss(
                  "Completed training has not produced consistent local decision-making.",
                  "The readiness contradiction"
                )
              ],

              [
                "We must be careful about what this evidence means. It does not prove that the nine employees lack ability, and it does not prove that they oppose the redesign.",
                st(
                  "An observed behaviour does not establish its cause."
                )
              ],

              [
                "There are several plausible explanations. Some employees may not understand the eligibility conditions. Others may understand them but lack confidence in the decision.",
                dg(
                  "Possible causes of referral",
                  branch(
                    "Why refer every discrepancy?",
                    [
                      "Rule not|understood",
                      "Decision|confidence",
                      "Authority|unclear",
                      "Old measure|still rewarded"
                    ]
                  ),
                  "These are hypotheses requiring investigation, not established individual motives."
                )
              ],

              [
                "The missing formal delegation is another possible explanation. An employee may know exactly what to do but hesitate because the approved authority schedule has not changed.",
                authority(
                  320,
                  false,
                  true,
                  "Knowledge without formal authority",
                  "An illustrative eligible AED 320 discrepancy still faces an undocumented delegation boundary."
                )
              ],

              [
                "The inherited scorecard may also matter. If employees are rewarded for check-in speed, investigating a complicated discrepancy may appear less attractive than referring it.",
                measures(
                  false,
                  "An incentive that may discourage resolution",
                  "Old throughput targets may conflict with the redesigned Guest Host role."
                )
              ],

              [
                "We therefore need to distinguish four questions. Does the employee know the rule? Can the employee apply it? Is the employee formally authorised? Does the organisation reward the intended behaviour?",
                dg(
                  "Four diagnostic questions",
                  flow([
                    "Knowledge",
                    "Practical|capability",
                    "Formal|authority",
                    "Aligned|incentives"
                  ]),
                  "Different organisational problems require different corrective actions."
                )
              ],

              [
                "Repeating the same four-hour induction would not necessarily solve all four problems.",
                iss(
                  "More training cannot repair missing authority or conflicting incentives.",
                  "The wrong intervention"
                )
              ],

              [
                "Instead, Qasr should investigate the referral pattern and assess decision capability using realistic cases.",
                capability(
                  "From attendance to capability",
                  "Explanation, practice, feedback and demonstration provide stronger readiness evidence."
                )
              ],

              [
                "Imagine presenting a Guest Host with a booking confirmation and a displayed rate that differs by AED 320. The case is eligible, but the formal delegation has not yet been updated.",
                authority(
                  320,
                  false,
                  true,
                  "Practice case one",
                  "The employee must recognise the formal authority gap."
                )
              ],

              [
                "A good answer is not simply to approve the waiver. The employee should identify the discrepancy, establish eligibility and recognise that the formal authority gap must be resolved.",
                st(
                  "Correct judgement includes recognising an unresolved authority boundary."
                )
              ],

              [
                "Now imagine the delegation has been formally approved. The same eligible AED 320 case can be resolved locally within the authorised conditions.",
                authority(
                  320,
                  true,
                  true,
                  "Practice case two",
                  "Documented authority permits appropriate local resolution."
                )
              ],

              [
                "The employee should explain the decision to the guest and record the reason so the organisation can review the quality of the outcome.",
                null
              ],

              [
                "Next, present an eligible discrepancy of AED 460. The employee must recognise that the amount exceeds the delegated limit.",
                authority(
                  460,
                  true,
                  true,
                  "Practice case three",
                  "The amount exceeds the delegated AED 400 limit."
                )
              ],

              [
                "The correct response is to investigate, document and escalate to the appropriately authorised role.",
                st(
                  "Demonstrated capability includes knowing when escalation is required."
                )
              ],

              [
                "Finally, test a discrepancy below AED 400 that does not satisfy the eligibility conditions. The employee should not approve it simply because the amount is small.",
                authority(
                  320,
                  true,
                  false,
                  "Practice case four",
                  "The amount is within the limit, but the case is ineligible."
                )
              ],

              [
                "These scenarios test different aspects of judgement. They are more informative than asking employees to repeat the wording of the policy.",
                q(
                  "What does a realistic decision scenario reveal that a training attendance record cannot?"
                )
              ],

              [
                "Qasr should define clear assessment criteria. The employee must establish the facts, apply eligibility rules, recognise authority limits, choose an appropriate action and explain the decision.",
                dg(
                  "Assessment criteria",
                  flow([
                    "Establish|facts",
                    "Apply|eligibility",
                    "Check|authority",
                    "Choose|action",
                    "Explain|decision"
                  ]),
                  "Capability assessment should examine observable decision behaviour."
                )
              ],

              [
                "An assessor can observe the decision, provide feedback and ask the employee to try a different case when necessary.",
                null
              ],

              [
                "If an employee misunderstands eligibility, targeted practice may help. If the employee understands the rule but lacks formal authority, management must correct delegation.",
                cmp(
                  "a",
                  "Capability gap",
                  "Use practice, feedback and reassessment.",
                  "up"
                )
              ],

              [
                "If the problem is an organisational barrier, more training alone is unlikely to remove it.",
                cmp(
                  "b",
                  "Organisational gap",
                  "Correct authority, workflow or incentives.",
                  "up"
                )
              ],

              [
                "Managers should then observe real operating behaviour. Capability demonstrated in a practice case should be supported by evidence that employees can perform appropriately during actual shifts.",
                dg(
                  "Evidence after training",
                  flow([
                    "Practice|assessment",
                    "Feedback",
                    "Observed|operation",
                    "Further|support"
                  ]),
                  "Assessment and operating evidence should reinforce each other."
                )
              ],

              [
                "This is also an important change-management responsibility. Employees need opportunities to ask questions and explain why the redesigned work feels difficult.",
                st(
                  "Listen to employees before diagnosing their behaviour."
                )
              ],

              [
                "The nine referrals are a signal to investigate, not a verdict on nine individuals.",
                hosts(
                  "referrals",
                  "Nine referrals, causes still open",
                  "The observed referral pattern requires diagnosis before intervention."
                )
              ],

              [
                "The sponsor should demand stronger evidence than a completed induction milestone. The real question is whether Guest Hosts can make appropriate decisions within a dependable organisational system.",
                q(
                  "Would you declare the People phase ready because all twenty-two employees attended induction?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE NURSES WHO ATTENDED TRAINING
              // ----------------------------------------------------

              {
                title: "The nurses who attended training",
                lines: [

                  [
                    "Imagine a hospital introducing a new electronic medication administration process. Every nurse attends the required training session.",
                    t(
                      "Remedial · Training and capability",
                      "Attendance is not proof of safe performance."
                    )
                  ],

                  [
                    "The project dashboard records full attendance, and management prepares to declare the training workstream complete.",
                    dg(
                      "Training completed",
                      flow([
                        "Training|scheduled",
                        "Nurses|attend",
                        "Attendance|recorded",
                        "Milestone|complete"
                      ]),
                      "The completed activity establishes participation."
                    )
                  ],

                  [
                    "But the hospital has not yet established whether nurses can use the system correctly in realistic medication scenarios.",
                    iss(
                      "Training attendance is known, but practical capability remains unverified.",
                      "The evidence gap"
                    )
                  ],

                  [
                    "A nurse may understand the screen layout but still struggle when an unusual medication instruction requires additional verification.",
                    null
                  ],

                  [
                    "The hospital should assess realistic performance rather than assume that attendance guarantees safe practice.",
                    capability(
                      "Demonstrating capability",
                      "Practical assessment provides evidence beyond attendance."
                    )
                  ],

                  [
                    "For example, an assessor could present a simulated medication scenario containing an instruction that requires clarification.",
                    q(
                      "What should the nurse demonstrate before the hospital considers the new process ready?"
                    )
                  ],

                  [
                    "The nurse should recognise the issue, follow the applicable safety rules and obtain the appropriate authorised clarification.",
                    dg(
                      "A safe decision",
                      flow([
                        "Instruction|reviewed",
                        "Issue|recognised",
                        "Authorised|clarification",
                        "Safe|action"
                      ]),
                      "The assessment tests appropriate judgement and safeguards."
                    )
                  ],

                  [
                    "The hospital should also check whether system permissions and formal responsibilities support the expected work.",
                    st(
                      "Capability and organisational authority must support each other."
                    )
                  ],

                  [
                    "If the system blocks an authorised action, repeating the training may not solve the problem.",
                    null
                  ],

                  [
                    "The organisation must distinguish a knowledge gap from a workflow or permission problem.",
                    cmp(
                      "a",
                      "Knowledge or skill gap",
                      "Provide targeted practice and feedback.",
                      "up"
                    )
                  ],

                  [
                    "An organisational barrier requires a change to the operating arrangements.",
                    cmp(
                      "b",
                      "Authority or system gap",
                      "Correct the relevant permission or workflow.",
                      "up"
                    )
                  ],

                  [
                    "The hospital should observe actual performance after launch and investigate unexpected workarounds.",
                    null
                  ],

                  [
                    "This resembles Qasr, where all twenty-two Guest Hosts attended induction but capability was not assessed.",
                    st(
                      "Completed training is an input; demonstrated performance is stronger readiness evidence."
                    )
                  ],

                  [
                    "The People phase must establish that employees can perform the redesigned work appropriately and safely.",
                    q(
                      "Why is a realistic capability assessment more informative than a training attendance record?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE TECHNICIANS WHO STILL CALLED THE SUPERVISOR
              // ----------------------------------------------------

              {
                title: "The technicians who still called the supervisor",
                lines: [

                  [
                    "Imagine a maintenance company training technicians to resolve certain routine faults without waiting for a supervisor.",
                    t(
                      "Remedial · Diagnosing referral behaviour",
                      "Repeated escalation does not prove resistance."
                    )
                  ],

                  [
                    "Every technician attends the briefing, and management expects faster repairs.",
                    dg(
                      "The intended repair process",
                      flow([
                        "Fault|identified",
                        "Technician|investigates",
                        "Authority|checked",
                        "Repair|completed"
                      ]),
                      "The redesigned process expects appropriate local decisions."
                    )
                  ],

                  [
                    "However, several technicians continue calling their supervisor for every repair decision.",
                    iss(
                      "The new process expects independence, but employees continue referring decisions.",
                      "A referral pattern"
                    )
                  ],

                  [
                    "Management could conclude that the technicians are unwilling to change. But that conclusion would be premature.",
                    st(
                      "Observed escalation does not establish employee motivation."
                    )
                  ],

                  [
                    "Some technicians may not understand the repair eligibility rules. Others may understand the rules but lack confidence in applying them.",
                    dg(
                      "Possible explanations",
                      branch(
                        "Why do technicians refer?",
                        [
                          "Knowledge|gap",
                          "Practice|gap",
                          "Authority|unclear",
                          "Incentive|conflict"
                        ]
                      ),
                      "Different causes require different interventions."
                    )
                  ],

                  [
                    "The organisation should investigate before prescribing a solution.",
                    q(
                      "Would repeating the same training necessarily resolve every referral?"
                    )
                  ],

                  [
                    "No. More practice can address a capability gap, but it cannot formally authorise a decision.",
                    cmp(
                      "a",
                      "Capability gap",
                      "Practise realistic repairs and assess judgement.",
                      "up"
                    )
                  ],

                  [
                    "An authority gap requires management to establish and communicate the formal decision boundary.",
                    cmp(
                      "b",
                      "Authority gap",
                      "Approve delegation and clarify escalation.",
                      "up"
                    )
                  ],

                  [
                    "The organisation should also review whether performance targets reward the old referral behaviour.",
                    null
                  ],

                  [
                    "Technicians may be reluctant to spend time investigating faults if their scorecard rewards only the number of jobs closed.",
                    measures(
                      false,
                      "A possible incentive conflict",
                      "Old performance targets may discourage the redesigned work."
                    )
                  ],

                  [
                    "A realistic assessment can establish whether technicians recognise eligible repairs and know when escalation is appropriate.",
                    capability(
                      "Testing the new capability",
                      "Practical scenarios help distinguish knowledge from organisational barriers."
                    )
                  ],

                  [
                    "Managers should then observe actual repair decisions and provide targeted support.",
                    null
                  ],

                  [
                    "Qasr faces the same diagnostic challenge. Nine Guest Hosts refer every rate discrepancy, but their individual reasons have not been established.",
                    hosts(
                      "referrals",
                      "Nine of twenty-two",
                      "The observed referral pattern requires investigation."
                    )
                  ],

                  [
                    "The appropriate response is to examine capability, authority, measures and actual working conditions before deciding what to change.",
                    q(
                      "Why should a manager investigate repeated referrals before describing employees as resistant to change?"
                    )
                  ]

                ]
              }

            ]
          },

          // ========================================================
          // W10O3b
          // THE LOBBY RUNS TWO PROCESSES
          //
          // Visual rhythm:
          // One lobby -> kiosk and desk paths -> observed percentages ->
          // unresolved remainder -> possible reasons -> adoption action.
          //
          // The observed percentages are 65% and 29%.
          // Do not invent a category for the unreported remainder.
          // ========================================================

          {
            title: "The lobby runs two processes",
            sec: "W10O3b",
            lines: [

              [
                "It is week eleven at Qasr's pilot properties. The kiosks are operating, but the actual arrival process does not look exactly like the redesigned diagram.",
                t(
                  "THE LOBBY RUNS TWO PROCESSES",
                  "Launching a process is not the same as adopting it."
                )
              ],

              [
                "The case reports that sixty-five percent of arrivals use the kiosks. Another twenty-nine percent are handled at the desk.",
                diagram(
                  "adoption",
                  { lobby: true },
                  flow([
                    "Guest|arrives",
                    "65%|kiosk",
                    "29%|desk",
                    "Other|not specified"
                  ]),
                  "Week eleven: 65% kiosk use and 29% desk handling. The remaining classification is not reported."
                )
              ],

              [
                "These percentages describe observed channels. They do not, by themselves, tell us why each guest used a particular path.",
                st(
                  "Adoption data shows behaviour before it explains behaviour."
                )
              ],

              [
                "A desk interaction might be appropriate. A guest may need accessibility assistance, support with an unusual booking or another service the kiosk cannot provide.",
                dg(
                  "A legitimate desk interaction",
                  flow([
                    "Guest|arrives",
                    "Special|assistance needed",
                    "Guest Host|supports",
                    "Arrival|completed"
                  ]),
                  "Not every desk interaction is a process failure."
                )
              ],

              [
                "Another desk interaction might represent an avoidable workaround. An employee may return to the old process because the new role feels uncertain or the kiosk workflow is inconvenient.",
                dg(
                  "A possible workaround",
                  flow([
                    "Guest|arrives",
                    "Kiosk|available",
                    "!Old desk|used instead",
                    "Reason|investigated"
                  ]),
                  "A workaround is a hypothesis until the operating reason is established."
                )
              ],

              [
                "The same observed desk percentage can therefore contain different kinds of cases.",
                q(
                  "Would you treat every desk-handled arrival as evidence that the redesign has failed?"
                )
              ],

              [
                "No. The organisation needs to distinguish legitimate exception handling from avoidable continuation of the previous process.",
                cmp(
                  "a",
                  "Legitimate alternative",
                  "The guest needs assistance or an authorised exception route.",
                  "up"
                )
              ],

              [
                "An avoidable workaround is different. It occurs when the intended process could have been followed but another route is used unnecessarily.",
                cmp(
                  "b",
                  "Avoidable workaround",
                  "The old path is used despite a suitable redesigned route.",
                  "down"
                )
              ],

              [
                "Qasr should investigate the reasons rather than interpret all desk activity as resistance.",
                st(
                  "Investigate the path before judging the behaviour."
                )
              ],

              [
                "One pilot property has reinstated a permanent desk. That is an important operating change, but its cause and effect still require examination.",
                iss(
                  "A permanent desk has returned at one pilot property.",
                  "The redesign faces a practical test"
                )
              ],

              [
                "The desk may have been restored to meet a genuine service need. It may also reflect problems with the new workflow, employee capability or guest confidence.",
                dg(
                  "Why did the desk return?",
                  branch(
                    "Permanent desk reinstated",
                    [
                      "Legitimate|service need",
                      "Workflow|friction",
                      "Capability|gap",
                      "Guest|preference"
                    ]
                  ),
                  "These explanations require investigation; the case does not establish a single cause."
                )
              ],

              [
                "The sponsor should ask what types of arrivals are handled at that desk, what happens during those interactions and whether the same cases could be completed through the intended process.",
                null
              ],

              [
                "A process owner should also compare the operating pattern across the four pilot properties.",
                dg(
                  "Four pilot properties",
                  flow([
                    "Property|one",
                    "Property|two",
                    "Property|three",
                    "Property|four",
                    "Compare|evidence"
                  ]),
                  "Property-level comparison can help identify where adoption barriers differ."
                )
              ],

              [
                "Differences may point towards local operating arrangements, guest needs, technical reliability or employee support. They should be investigated rather than assumed.",
                st(
                  "Variation between sites is a diagnostic opportunity."
                )
              ],

              [
                "The adoption measure also needs a clear definition. Does kiosk use mean the guest started at a kiosk, completed the entire arrival there or required later employee assistance?",
                q(
                  "What exactly should Qasr count as successful kiosk adoption?"
                )
              ],

              [
                "Without a consistent definition, two properties may report different adoption figures even when guests experience similar journeys.",
                iss(
                  "An undefined adoption measure can create misleading comparisons.",
                  "The measurement problem"
                )
              ],

              [
                "The process owner should specify the numerator, denominator, reporting period and treatment of assisted or incomplete kiosk journeys.",
                fm(
                  "Illustrative kiosk-adoption definition",
                  "Arrivals completed through the defined kiosk pathway",
                  "Eligible arrivals during the same period"
                )
              ],

              [
                "This is a proposed measurement definition. It should be agreed before using the resulting figure to judge performance.",
                null
              ],

              [
                "The organisation should also record reasons for desk handling, such as accessibility assistance, technical interruption, booking exception or avoidable bypass.",
                dg(
                  "Classifying desk activity",
                  flow([
                    "Desk|interaction",
                    "Reason|recorded",
                    "Legitimate|or avoidable",
                    "Corrective|action"
                  ]),
                  "Reason codes turn a channel percentage into actionable evidence."
                )
              ],

              [
                "If the problem is technical, Develop may need to correct the workflow. If it is an authority gap, the People phase must clarify delegation.",
                cmp(
                  "a",
                  "Technical barrier",
                  "Correct the supporting workflow or system.",
                  "up"
                )
              ],

              [
                "If the problem is capability, employees need targeted practice. If the desk is necessary for particular guests, the operating design should accommodate that legitimate need.",
                cmp(
                  "b",
                  "People or service need",
                  "Provide appropriate capability support or an authorised alternative.",
                  "up"
                )
              ],

              [
                "This is why adoption tracking belongs to a named owner. Someone must investigate patterns and coordinate improvements across organisational boundaries.",
                st(
                  "Adoption requires ownership, explanation and corrective action."
                )
              ],

              [
                "The sponsor should not demand kiosk use at any cost. The objective is a dependable guest arrival, not a percentage achieved by denying necessary assistance.",
                iss(
                  "Maximising kiosk use without regard to guest needs can damage service quality.",
                  "The wrong target"
                )
              ],

              [
                "A balanced adoption review should consider channel use, appropriate exceptions, guest outcomes and avoidable rework.",
                dg(
                  "A balanced adoption review",
                  flow([
                    "Channel|use",
                    "Exception|reasons",
                    "Guest|outcome",
                    "Rework",
                    "Action"
                  ]),
                  "Adoption is meaningful when interpreted alongside service quality."
                )
              ],

              [
                "At week eleven, Qasr knows that sixty-five percent use kiosks and twenty-nine percent are handled at the desk. It still needs better evidence about why those routes are used.",
                diagram(
                  "adoption",
                  { lobby: true },
                  progress("Kiosk adoption", 65),
                  "The observed percentages describe channels, not the causes of channel choice."
                )
              ],

              [
                "The lesson is that a launched process can coexist with older operating habits and legitimate alternative routes.",
                st(
                  "The real process is the one people actually follow."
                )
              ],

              [
                "The People phase must help the organisation understand that behaviour and make the intended process practical, safe and worthwhile.",
                q(
                  "What evidence would help Qasr distinguish legitimate desk assistance from avoidable workarounds?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE UNIVERSITY SELF-SERVICE PORTAL
              // ----------------------------------------------------

              {
                title: "The university self-service portal",
                lines: [

                  [
                    "Imagine a university introducing a self-service portal so students can complete routine registration without visiting an office.",
                    t(
                      "Remedial · Understanding adoption",
                      "A launched system may coexist with the old process."
                    )
                  ],

                  [
                    "The portal works, but many students continue visiting the registration desk.",
                    dg(
                      "Two registration routes",
                      flow([
                        "Student|needs registration",
                        "Self-service|portal",
                        "Registration|desk",
                        "Completion"
                      ]),
                      "The intended and traditional routes operate together."
                    )
                  ],

                  [
                    "Management might conclude that students are resisting the new technology.",
                    iss(
                      "Desk use is being interpreted before its causes are understood.",
                      "A premature conclusion"
                    )
                  ],

                  [
                    "But some students may have unusual enrolment conditions that the portal cannot resolve.",
                    null
                  ],

                  [
                    "Others may need accessibility assistance, while some may simply be unfamiliar with the new interface.",
                    dg(
                      "Possible reasons for desk use",
                      branch(
                        "Why visit the desk?",
                        [
                          "Complex|exception",
                          "Accessibility|support",
                          "Portal|difficulty",
                          "Habit or|preference"
                        ]
                      ),
                      "Different reasons require different responses."
                    )
                  ],

                  [
                    "The university should record the reason for each desk interaction before deciding how to improve adoption.",
                    q(
                      "Would closing the registration desk automatically improve the student experience?"
                    )
                  ],

                  [
                    "No. Some students may legitimately need assistance, and removing that support could make the process worse.",
                    st(
                      "Adoption targets must not override legitimate service needs."
                    )
                  ],

                  [
                    "The university should distinguish necessary desk assistance from avoidable use of the old route.",
                    cmp(
                      "a",
                      "Necessary assistance",
                      "The student requires support the portal cannot appropriately provide.",
                      "up"
                    )
                  ],

                  [
                    "Avoidable bypass occurs when a suitable portal route exists but the student uses another channel because of an addressable barrier.",
                    cmp(
                      "b",
                      "Avoidable bypass",
                      "The intended route is suitable but not used.",
                      "down"
                    )
                  ],

                  [
                    "The university should define successful portal adoption consistently and monitor the reasons for alternative paths.",
                    dg(
                      "Adoption evidence",
                      flow([
                        "Define|successful use",
                        "Measure|channel",
                        "Record|reason",
                        "Investigate|barrier",
                        "Improve|process"
                      ]),
                      "Adoption measurement should support diagnosis."
                    )
                  ],

                  [
                    "If the problem is usability, the portal may need improvement. If students lack guidance, communication or assistance may help.",
                    null
                  ],

                  [
                    "The important principle is to investigate behaviour before deciding what intervention is appropriate.",
                    st(
                      "Measure the actual journey, then explain it."
                    )
                  ],

                  [
                    "Qasr faces the same challenge when kiosk use and desk handling coexist in the redesigned arrival process.",
                    q(
                      "Why does the percentage of students using the registration desk not reveal whether the redesign is succeeding?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE WAREHOUSE THAT KEPT PAPER FORMS
              // ----------------------------------------------------

              {
                title: "The warehouse that kept paper forms",
                lines: [

                  [
                    "Imagine a warehouse replacing paper picking lists with a digital workflow.",
                    t(
                      "Remedial · Workarounds and adoption",
                      "The real process may differ from the designed process."
                    )
                  ],

                  [
                    "The digital system is installed, and employees have received instructions on how to use it.",
                    dg(
                      "The intended workflow",
                      flow([
                        "Order|received",
                        "Digital|picking",
                        "Item|verified",
                        "Order|completed"
                      ]),
                      "The redesigned process uses digital records."
                    )
                  ],

                  [
                    "However, some employees continue printing paper lists and entering the results later.",
                    iss(
                      "The old paper process continues alongside the digital workflow.",
                      "A parallel process"
                    )
                  ],

                  [
                    "Management might assume that employees simply dislike the new system.",
                    null
                  ],

                  [
                    "But the cause could be a weak wireless connection, inconvenient device access, unclear instructions or a legitimate operating exception.",
                    dg(
                      "Possible causes",
                      branch(
                        "Why use paper?",
                        [
                          "Technical|reliability",
                          "Device|availability",
                          "Capability|gap",
                          "Operating|exception"
                        ]
                      ),
                      "The observed workaround does not establish its cause."
                    )
                  ],

                  [
                    "The warehouse should investigate actual working conditions rather than blame employees immediately.",
                    q(
                      "What evidence would help explain why employees continue using paper?"
                    )
                  ],

                  [
                    "Managers can observe the workflow, interview employees and record when paper is used.",
                    dg(
                      "Investigating adoption",
                      flow([
                        "Observe|work",
                        "Record|exceptions",
                        "Identify|causes",
                        "Correct|barriers"
                      ]),
                      "Evidence should guide corrective action."
                    )
                  ],

                  [
                    "If the digital system is unreliable, technical improvement may be necessary.",
                    cmp(
                      "a",
                      "Technical problem",
                      "Repair connectivity, devices or workflow design.",
                      "up"
                    )
                  ],

                  [
                    "If employees lack confidence, practical coaching may be more appropriate.",
                    cmp(
                      "b",
                      "Capability problem",
                      "Provide targeted practice and feedback.",
                      "up"
                    )
                  ],

                  [
                    "A paper route may also be necessary during an approved system outage. That legitimate contingency should not be confused with avoidable bypass.",
                    st(
                      "Not every alternative route is an undesirable workaround."
                    )
                  ],

                  [
                    "The process owner should define adoption measures and review recurring deviations.",
                    null
                  ],

                  [
                    "Qasr similarly needs to understand why some arrivals continue through the desk while kiosks are available.",
                    q(
                      "Why should managers investigate the causes of a parallel process before trying to eliminate it?"
                    )
                  ]

                ]
              }

            ]
          },

          // ========================================================
          // W10O3c
          // THE KNOWLEDGE PEOPLE CARRY
          //
          // Visual rhythm:
          // Written procedure -> hidden judgement -> worked example ->
          // peer learning -> two departures -> unknown motives ->
          // knowledge-transfer action.
          //
          // The two resignations are observed.
          // Their motives and individual capability are unknown.
          // ========================================================

          {
            title: "The knowledge people carry",
            sec: "W10O3c",
            lines: [

              [
                "Imagine an experienced Guest Host noticing a small inconsistency in a booking confirmation. The written procedure describes the general rule, but experience helps the employee recognise what needs further investigation.",
                t(
                  "THE KNOWLEDGE PEOPLE CARRY",
                  "Not everything employees know appears in a procedure."
                )
              ],

              [
                "Some knowledge is explicit. It can be written down as a rule, a checklist or a decision guide.",
                iceberg(
                  false,
                  "Visible and experience-based knowledge",
                  "Written procedures are only part of what employees use to make decisions."
                )
              ],

              [
                "Other knowledge develops through experience. Employees learn how unusual situations arise, which evidence is useful and how to explain difficult decisions to guests.",
                st(
                  "Experience-based judgement can remain invisible in formal documentation."
                )
              ],

              [
                "This distinction matters when a process is redesigned. The new workflow may depend on knowledge that the organisation has never formally captured.",
                null
              ],

              [
                "At Qasr, Guest Hosts need to investigate rate discrepancies and unusual arrivals. A written policy provides essential boundaries, but it may not explain every practical situation.",
                dg(
                  "A difficult arrival",
                  flow([
                    "Guest|raises issue",
                    "Evidence|reviewed",
                    "Policy|applied",
                    "Judgement|required"
                  ]),
                  "Practical judgement operates within the formal rules."
                )
              ],

              [
                "Imagine a Guest Host comparing several pieces of booking evidence. An experienced colleague may know which details usually explain a discrepancy and which require specialist review.",
                null
              ],

              [
                "That colleague's reasoning is valuable. If it remains entirely personal, other employees may struggle to reproduce the same quality of decision.",
                iss(
                  "Important practical knowledge may exist only in individual experience.",
                  "The knowledge-transfer risk"
                )
              ],

              [
                "The People phase should make useful judgement more visible through worked examples, realistic practice and peer learning.",
                iceberg(
                  true,
                  "Making judgement teachable",
                  "Worked examples help employees share experience-based knowledge."
                )
              ],

              [
                "A worked example should show the evidence, the relevant rule, the decision boundary and the reasoning behind the outcome.",
                dg(
                  "A useful worked example",
                  flow([
                    "Case|facts",
                    "Relevant|rule",
                    "Authority|boundary",
                    "Decision|reasoning",
                    "Guest|explanation"
                  ]),
                  "The reasoning behind the decision should be made explicit."
                )
              ],

              [
                "For instance, a Guest Host can explain how an eligible AED 320 discrepancy should be handled once formal delegation is approved.",
                authority(
                  320,
                  true,
                  true,
                  "A worked local decision",
                  "The illustrative case shows the reasoning behind an authorised local waiver."
                )
              ],

              [
                "A second example should show why an eligible AED 460 discrepancy requires escalation.",
                authority(
                  460,
                  true,
                  true,
                  "A worked escalation",
                  "The illustrative amount exceeds the delegated limit."
                )
              ],

              [
                "Comparing these examples teaches more than memorising the AED 400 threshold. Employees learn how eligibility, evidence and authority interact.",
                st(
                  "Good learning explains why a decision is appropriate."
                )
              ],

              [
                "Peer learning can also help. Employees can discuss difficult cases, compare reasoning and identify where the written guidance remains unclear.",
                dg(
                  "Peer learning",
                  flow([
                    "Realistic|case",
                    "Individual|decision",
                    "Peer|discussion",
                    "Shared|guidance"
                  ]),
                  "Structured discussion helps make practical judgement visible."
                )
              ],

              [
                "The organisation should capture useful lessons in accessible guidance rather than rely indefinitely on particular experienced employees.",
                null
              ],

              [
                "Qasr's case also reports that two Guest Hosts resigned. We do not know their individual reasons for leaving.",
                hosts(
                  "departures",
                  "Two departures",
                  "Two Guest Hosts resigned; the case does not report their motives."
                )
              ],

              [
                "It would be incorrect to claim that they resigned because of the redesign, the new role, training or the performance system.",
                st(
                  "Two resignations are observed. Their causes are unknown."
                )
              ],

              [
                "Nevertheless, departures remind us why organisations should avoid depending on undocumented knowledge held by a few individuals.",
                iss(
                  "Knowledge held only by individuals may become unavailable when they leave.",
                  "A continuity risk"
                )
              ],

              [
                "The appropriate response is not to invent a story about why the two employees left. It is to examine whether essential knowledge has been documented and shared.",
                null
              ],

              [
                "The process owner should identify difficult exceptions, collect worked examples and ensure that employees can access reliable guidance during a shift.",
                dg(
                  "Protecting operational knowledge",
                  flow([
                    "Identify|critical cases",
                    "Capture|reasoning",
                    "Practise|decisions",
                    "Share|guidance",
                    "Review|learning"
                  ]),
                  "Knowledge transfer should become part of the operating system."
                )
              ],

              [
                "Managers can also ask employees where the formal procedure does not match the situations they encounter.",
                q(
                  "What practical knowledge might Guest Hosts use that is missing from the written arrival procedure?"
                )
              ],

              [
                "Their answers may reveal missing examples, confusing rules or unnecessary handoffs. These findings can improve both training and process design.",
                null
              ],

              [
                "Knowledge transfer is therefore not merely a training activity. It helps the organisation make redesigned performance repeatable.",
                st(
                  "A dependable process should not depend on one person's memory."
                )
              ],

              [
                "The People phase should preserve useful experience while making decisions more consistent across employees and properties.",
                iceberg(
                  true,
                  "From personal experience to shared capability",
                  "Experience-based knowledge becomes more dependable when it is explained, practised and shared."
                )
              ],

              [
                "The goal is not to eliminate human judgement. It is to support judgement with clear rules, examples and appropriate decision boundaries.",
                q(
                  "How can Qasr preserve experienced judgement without making the process dependent on particular individuals?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // THE EXPERIENCED TECHNICIAN'S NOTEBOOK
              // ----------------------------------------------------

              {
                title: "The experienced technician's notebook",
                lines: [

                  [
                    "Imagine a manufacturing plant where an experienced technician can diagnose an unusual machine fault more quickly than anyone else.",
                    t(
                      "Remedial · Knowledge transfer",
                      "Important knowledge may live outside the formal procedure."
                    )
                  ],

                  [
                    "The official maintenance guide explains the standard checks, but the technician has learned to recognise subtle warning signs through years of experience.",
                    iceberg(
                      false,
                      "Written rules and practical judgement",
                      "Experience-based knowledge may not appear in the official guide."
                    )
                  ],

                  [
                    "Other technicians follow the written procedure but struggle when the fault does not match the standard examples.",
                    iss(
                      "The organisation depends on knowledge that has not been made teachable.",
                      "A hidden dependency"
                    )
                  ],

                  [
                    "The plant should not simply ask the experienced technician to solve every difficult problem.",
                    null
                  ],

                  [
                    "Instead, it should capture the reasoning behind representative cases.",
                    dg(
                      "Capturing a worked example",
                      flow([
                        "Fault|observed",
                        "Evidence|examined",
                        "Rule|applied",
                        "Decision|explained"
                      ]),
                      "The reasoning behind the diagnosis becomes explicit."
                    )
                  ],

                  [
                    "Other technicians can practise similar scenarios and receive feedback.",
                    capability(
                      "Building shared capability",
                      "Practice and feedback help transfer experience-based judgement."
                    )
                  ],

                  [
                    "The organisation should also review whether the written guide needs clearer examples or updated instructions.",
                    null
                  ],

                  [
                    "This approach makes the process less dependent on one individual's memory.",
                    st(
                      "Shared knowledge supports repeatable performance."
                    )
                  ],

                  [
                    "If the experienced technician eventually leaves, the organisation is better prepared to maintain consistent decisions.",
                    q(
                      "Why is documenting the reasoning behind a difficult repair more useful than recording only the final answer?"
                    )
                  ],

                  [
                    "The same principle applies to Qasr. Guest Hosts need practical examples showing how booking discrepancies should be investigated and resolved.",
                    null
                  ],

                  [
                    "The People phase should turn valuable individual experience into knowledge that employees can learn and apply appropriately.",
                    st(
                      "Capture the reasoning, practise the decision and share the learning."
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE EXPERIENCED ADVISER WHO LEFT
              // ----------------------------------------------------

              {
                title: "The experienced adviser who left",
                lines: [

                  [
                    "Imagine a financial-service team where one experienced adviser understands how to handle many unusual customer cases.",
                    t(
                      "Remedial · Protecting operational knowledge",
                      "A process should not depend on one person's memory."
                    )
                  ],

                  [
                    "The formal guidance covers routine decisions, but colleagues frequently ask the experienced adviser how to interpret difficult situations.",
                    iceberg(
                      false,
                      "The hidden knowledge",
                      "Practical judgement may remain undocumented."
                    )
                  ],

                  [
                    "The adviser eventually leaves the organisation. We do not need to assume why that person left to recognise the operational risk.",
                    iss(
                      "A departure can expose knowledge that was never shared.",
                      "A continuity problem"
                    )
                  ],

                  [
                    "The remaining employees still have the written procedure, but some difficult cases take longer because the practical examples were never captured.",
                    null
                  ],

                  [
                    "The organisation should identify recurring exceptions and document how experienced employees reason through them.",
                    dg(
                      "Making knowledge transferable",
                      flow([
                        "Identify|difficult cases",
                        "Capture|reasoning",
                        "Create|examples",
                        "Practise|decisions"
                      ]),
                      "Worked examples make practical knowledge easier to share."
                    )
                  ],

                  [
                    "Employees should discuss why a decision is appropriate, not merely memorise the outcome.",
                    st(
                      "Understanding the reasoning supports transfer to new situations."
                    )
                  ],

                  [
                    "Peer learning can help reveal differences between the written rules and actual working conditions.",
                    null
                  ],

                  [
                    "Managers should then update guidance where necessary and assess whether employees can apply it.",
                    capability(
                      "From shared knowledge to capability",
                      "Knowledge transfer should be supported by practical assessment."
                    )
                  ],

                  [
                    "Qasr reports two Guest Host resignations, but their individual motives are unknown.",
                    hosts(
                      "departures",
                      "Two observed departures",
                      "The reasons for the resignations are not reported."
                    )
                  ],

                  [
                    "Those departures do not establish that the redesign caused employees to leave.",
                    st(
                      "Do not infer motives from a departure count."
                    )
                  ],

                  [
                    "They do, however, reinforce the value of making essential operational knowledge accessible across the team.",
                    null
                  ],

                  [
                    "A dependable process combines clear procedures with shared practical judgement.",
                    q(
                      "How can an organisation reduce dependence on experienced individuals without losing the value of their knowledge?"
                    )
                  ]

                ]
              }

            ]
          }

        ]
      },

      // PART 4 CONTINUES WITH LESSON 4 AND FILE CLOSURE.

      // ============================================================
      // LESSON 4
      // THE GREEN DASHBOARD IS NOT THE TRUTH
      //
      // Narrative arc:
      // First repair the Guest Host role.
      // Then confront the evidence behind the green dashboard.
      // Finally carry a coherent people design into Develop.
      //
      // Sections:
      // W10O2d - Repairing the Guest Host specification
      // W10O3d - Turn the dashboard over
      // W10O3e - The handover that changes tomorrow
      //
      // Learning outcomes: O1, O2 and O3
      // ============================================================

      {
        id: "l4",
        title: "The green dashboard is not the truth",
        sections: [

          // ========================================================
          // W10O2d
          // REPAIRING THE GUEST HOST SPECIFICATION
          //
          // The original section ID is restored unchanged.
          //
          // Visual story:
          // 1. The sponsor receives an incomplete role.
          // 2. Five connected repairs progressively assemble.
          // 3. The AED 400 decision becomes a practical test.
          // 4. Conflicting incentives are exposed.
          // 5. Capability and adoption complete the operating design.
          //
          // Case observations remain distinct from recommendations.
          // AED 320 and AED 460 are illustrative teaching examples.
          // ========================================================

          {
            title: "Repairing the Guest Host specification",
            sec: "W10O2d",
            lines: [

              [
                "We have found several contradictions in Qasr's redesigned Guest Host role. Now imagine the sponsor placing the existing job description on your desk and asking you to make the role genuinely workable.",
                t(
                  "REPAIR THE GUEST HOST ROLE",
                  "One redesigned job. Five connected repairs."
                )
              ],

              [
                "Twenty-two former Front Desk Agents now support arrivals across four pilot properties. Kiosks handle routine transactions, while Guest Hosts investigate exceptions and assist guests.",
                hosts(
                  "team",
                  "Twenty-two Guest Hosts",
                  "The redesigned role supports guest arrivals and appropriate exception resolution."
                )
              ],

              [
                "The difficulty is that the surrounding organisational arrangements have not changed consistently with the work.",
                iss(
                  "The process has changed faster than the people system.",
                  "The central contradiction"
                )
              ],

              [
                "The revised job descriptions arrived three weeks after go-live. The communicated AED 400 waiver is absent from formal delegation, and inherited objectives still reward conventional check-in volume and speed.",
                evidence(
                  "Three confirmed contradictions",
                  "Late role documentation, missing formal delegation and inherited measures are established case observations."
                )
              ],

              [
                "All twenty-two employees attended induction, but their capability was not assessed afterwards. The sponsor therefore needs a coherent repair rather than another declaration that training is complete.",
                hosts(
                  "assessment",
                  "Attendance is not readiness",
                  "All twenty-two attended induction, but no post-induction capability assessment was conducted."
                )
              ],

              [
                "Let us build the repair one decision at a time. We will begin with the job itself, then connect authority, performance, capability and adoption.",
                repair(
                  0,
                  "The five-part repair",
                  "The proposed operating design must align responsibilities, authority, measures, capability and adoption."
                )
              ],

              [
                "First, define the actual work. A Guest Host should support arrivals, investigate booking discrepancies, explain decisions and coordinate exceptions that the kiosk cannot resolve.",
                it(
                  1,
                  5,
                  "users",
                  "Define the work",
                  "Document responsibilities, accountability, reporting and expected outcomes."
                )
              ],

              [
                "The description should identify the role's purpose and explain what a successful guest interaction looks like. It should also distinguish work the employee performs from decisions owned by other functions.",
                raci(
                  {
                    task: "Investigate a rate discrepancy",
                    responsible: "Guest Host",
                    accountable: "Process owner"
                  },
                  "Responsibility and accountability",
                  "An illustrative accountability arrangement distinguishes investigation from overall process ownership."
                )
              ],

              [
                "For example, the Guest Host may investigate a corporate-rate discrepancy, while a revenue specialist provides advice about policy. The relevant accountable role must be identified for decisions that require additional approval.",
                dg(
                  "A decision crossing functions",
                  flow([
                    "Guest Host|investigates",
                    "Revenue|advises",
                    "Authorised role|decides",
                    "Guest|informed"
                  ]),
                  "Operational responsibility and decision ownership must be explicitly connected."
                )
              ],

              [
                "The reporting relationship must also be justified and documented. Qasr's final Guest Host reporting line is not established in the case, so we should not invent one.",
                st(
                  "Document a justified reporting relationship rather than assuming an existing one."
                )
              ],

              [
                "This first repair makes the work understandable. It does not yet make every expected decision possible.",
                repair(
                  1,
                  "Repair one: the role",
                  "The revised responsibilities provide the foundation for the remaining changes."
                )
              ],

              [
                "Second, formalise decision authority. Guest Hosts have been told that eligible rate discrepancies up to AED 400 may be waived locally, but the formal delegation schedule does not contain that permission.",
                it(
                  2,
                  5,
                  "key",
                  "Document authority",
                  "Approve eligibility conditions, decision limits and escalation boundaries."
                )
              ],

              [
                "Imagine an eligible discrepancy of AED 320. The amount is within the communicated limit, but the employee still faces the unresolved formal delegation gap.",
                authority(
                  320,
                  false,
                  true,
                  "Before formal delegation",
                  "The illustrative AED 320 case exposes the difference between communicated permission and approved authority."
                )
              ],

              [
                "A Guest Host may refer that case to the duty manager because making the waiver without formal authority could later be challenged.",
                iss(
                  "The employee is expected to act independently without dependable formal permission.",
                  "The authority gap"
                )
              ],

              [
                "The proposed repair is to approve the intended delegation through the proper organisational process. The approved rule should state who may decide, which cases are eligible and when escalation is required.",
                dg(
                  "Formalising the decision",
                  flow([
                    "Eligibility|defined",
                    "AED 400|boundary",
                    "Delegation|approved",
                    "Escalation|specified"
                  ]),
                  "Formal authority must support the redesigned responsibility."
                )
              ],

              [
                "Now reconsider the same eligible AED 320 example after formal delegation has been approved. The Guest Host can make the permitted decision, explain it and record the reason.",
                authority(
                  320,
                  true,
                  true,
                  "After formal delegation",
                  "The proposed corrected arrangement permits appropriate local resolution."
                )
              ],

              [
                "But a smaller amount is not automatically eligible. The employee must still investigate the circumstances and apply the approved rules.",
                authority(
                  320,
                  true,
                  false,
                  "Within the limit, but ineligible",
                  "Eligibility remains a separate condition from monetary authority."
                )
              ],

              [
                "An eligible discrepancy of AED 460 is different. It exceeds the AED 400 boundary and must be referred to the appropriately authorised decision maker.",
                authority(
                  460,
                  true,
                  true,
                  "Beyond the delegated limit",
                  "The illustrative AED 460 case requires escalation."
                )
              ],

              [
                "These examples show that empowerment does not mean approving everything. It means making appropriate decisions independently while respecting clearly defined limits.",
                st(
                  "Good empowerment combines local independence with dependable controls."
                )
              ],

              [
                "The second repair is now clear. The Guest Host's responsibility and formal decision authority must agree.",
                repair(
                  2,
                  "Repair two: authority",
                  "The proposed role and delegation now support the same decision boundaries."
                )
              ],

              [
                "Third, repair the performance system. The inherited objectives still reward check-ins completed per shift and average transaction time.",
                it(
                  3,
                  5,
                  "gauge",
                  "Align performance",
                  "Replace conflicting throughput targets with appropriate outcomes and quality safeguards."
                )
              ],

              [
                "Those objectives belong to the previous job. They do not adequately recognise the judgement required when a Guest Host investigates a complicated arrival exception.",
                measures(
                  false,
                  "The inherited scorecard",
                  "Conventional check-in volume and speed may conflict with the redesigned contribution."
                )
              ],

              [
                "Imagine an employee spending several minutes resolving a disputed booking correctly. The guest benefits, but the old throughput measure may make the employee appear less productive.",
                iss(
                  "Valuable exception handling can reduce performance against an outdated target.",
                  "The incentive contradiction"
                )
              ],

              [
                "A replacement measure could recognise eligible exceptions resolved appropriately without unnecessary escalation. Decision quality must be checked so employees are not encouraged to approve unsuitable cases.",
                measures(
                  true,
                  "The proposed scorecard",
                  "Appropriate resolution should be supported by quality review."
                )
              ],

              [
                "The organisation should remove conflicting old targets rather than simply add another target beside them. Otherwise, employees receive contradictory instructions about what good performance means.",
                st(
                  "Replace conflicting objectives; do not preserve two competing definitions of success."
                )
              ],

              [
                "A quality sample should check eligibility, decision authority, evidence and appropriate escalation. The purpose is to reward sound judgement rather than a high number of approvals.",
                dg(
                  "Checking decision quality",
                  flow([
                    "Case|resolved",
                    "Eligibility|reviewed",
                    "Authority|verified",
                    "Quality|assessed"
                  ]),
                  "Outcome measures require safeguards against inappropriate decisions."
                )
              ],

              [
                "The unchanged job grade and reward arrangements also deserve review because the new role requires different responsibilities and judgement.",
                dg(
                  "Reviewing employment arrangements",
                  flow([
                    "Changed|work",
                    "Job|evaluation",
                    "Grade and rewards|reviewed",
                    "Decision|justified"
                  ]),
                  "A grade or reward adjustment requires evaluation; it is not automatic."
                )
              ],

              [
                "That review should assess the actual work rather than assume that a new title automatically deserves higher pay.",
                null
              ],

              [
                "The third repair therefore aligns the employee's expected contribution with the measures and incentives the organisation actually applies.",
                repair(
                  3,
                  "Repair three: performance",
                  "The role, authority and scorecard should reinforce the same redesigned work."
                )
              ],

              [
                "Fourth, establish capability. Employees need more than a briefing about the kiosk and a description of the new job.",
                it(
                  4,
                  5,
                  "brain",
                  "Assess capability",
                  "Practise realistic exceptions and demonstrate appropriate judgement."
                )
              ],

              [
                "All twenty-two Guest Hosts attended a four-hour induction. But no post-induction capability assessment was conducted, so their practical readiness remains unverified.",
                hosts(
                  "assessment",
                  "Capability evidence is missing",
                  "The case confirms induction attendance but no subsequent capability assessment."
                )
              ],

              [
                "The repair should include realistic decisions. Employees should investigate evidence, establish eligibility, recognise the authority boundary and explain their chosen action.",
                capability(
                  "From instruction to demonstrated judgement",
                  "Practice, feedback and assessment test the decisions required by the redesigned role."
                )
              ],

              [
                "A useful assessment might present an eligible AED 320 discrepancy after formal delegation is approved. The employee should explain why local resolution is appropriate.",
                authority(
                  320,
                  true,
                  true,
                  "Assessment: eligible local decision",
                  "The scenario tests correct application of approved authority."
                )
              ],

              [
                "A second scenario might present an eligible AED 460 discrepancy. The employee should recognise that escalation is required.",
                authority(
                  460,
                  true,
                  true,
                  "Assessment: necessary escalation",
                  "The scenario tests recognition of the decision boundary."
                )
              ],

              [
                "The assessor should evaluate the reasoning, not merely whether the employee selected the expected answer.",
                st(
                  "Demonstrated capability requires sound reasoning, not memorised responses."
                )
              ],

              [
                "If an employee misunderstands eligibility, targeted practice may help. If the employee understands the rule but lacks formal permission, the organisation must correct authority instead.",
                cmp(
                  "a",
                  "Capability gap",
                  "Provide realistic practice, feedback and reassessment.",
                  "up"
                )
              ],

              [
                "An organisational barrier requires a different response. Repeating training cannot formally delegate authority or remove conflicting incentives.",
                cmp(
                  "b",
                  "Organisational gap",
                  "Correct the authority, workflow or performance system.",
                  "up"
                )
              ],

              [
                "The fourth repair creates evidence that employees can perform the work, rather than relying only on a completed training milestone.",
                repair(
                  4,
                  "Repair four: capability",
                  "The proposed role now includes a practical assessment of decision-making."
                )
              ],

              [
                "Finally, assign ownership for adoption. A redesigned role is not proven effective merely because its description, delegation and training arrangements have been corrected.",
                it(
                  5,
                  5,
                  "chart",
                  "Own adoption",
                  "Measure actual use, classify alternative paths and coordinate corrective action."
                )
              ],

              [
                "At week eleven, Qasr reports sixty-five percent kiosk adoption and twenty-nine percent desk-handled arrivals. Those observations require explanation, not automatic judgement.",
                diagram(
                  "adoption",
                  { lobby: true },
                  progress("Kiosk adoption", 65),
                  "The case reports 65% kiosk adoption and 29% desk handling at week eleven."
                )
              ],

              [
                "Some desk-handled cases may legitimately require human assistance. Others may represent avoidable use of the old process.",
                dg(
                  "Understanding alternative paths",
                  branch(
                    "Why was the desk used?",
                    [
                      "Legitimate|exception",
                      "Accessibility|assistance",
                      "Workflow|barrier",
                      "Avoidable|workaround"
                    ]
                  ),
                  "The reasons must be established from operating evidence."
                )
              ],

              [
                "A named owner should measure adoption consistently, classify exceptions and investigate recurring barriers across the four pilot properties.",
                st(
                  "Adoption needs a named owner and evidence-based corrective action."
                )
              ],

              [
                "That owner should also investigate the nine Guest Hosts who refer every rate discrepancy. Their behaviour is observed, but their individual reasons have not been established.",
                hosts(
                  "referrals",
                  "Nine of twenty-two always refer",
                  "The referral pattern requires investigation rather than assumptions about motivation."
                )
              ],

              [
                "The fifth repair makes operating evidence part of the management system. It allows the organisation to test whether its earlier corrections actually improve the guest journey.",
                repair(
                  5,
                  "Repair five: adoption",
                  "Five connected changes now form the proposed Guest Host operating design."
                )
              ],

              [
                "Look at the complete repair. The role defines the work. Delegation establishes permission. Measures recognise the contribution. Assessment establishes capability. Adoption tracking reveals what happens in practice.",
                dg(
                  "One coherent operating design",
                  flow([
                    "Role|defined",
                    "Authority|documented",
                    "Measures|aligned",
                    "Capability|assessed",
                    "Adoption|owned"
                  ]),
                  "The five repairs must reinforce the same redesigned process."
                )
              ],

              [
                "These are proposed corrections, not completed Qasr improvements. The sponsor must approve the changes, assign owners, implement them and examine the resulting operating evidence.",
                st(
                  "A repair proposal becomes credible when implementation and evidence demonstrate improvement."
                )
              ],

              [
                "The strongest starting point is a documented contradiction. The missing AED 400 delegation is confirmed, so correcting it is more defensible than assuming employees are unwilling to change.",
                authority(
                  320,
                  false,
                  true,
                  "A defensible first priority",
                  "Formal delegation is a confirmed organisational weakness."
                )
              ],

              [
                "The sponsor should then assess capability and investigate referrals to establish whether the correction changes actual decisions.",
                dg(
                  "Testing the repair",
                  flow([
                    "Confirmed|weakness",
                    "Approved|correction",
                    "Capability|tested",
                    "Behaviour|observed",
                    "Result|reviewed"
                  ]),
                  "The intervention should be evaluated through operating evidence."
                )
              ],

              [
                "We have moved from identifying disconnected weaknesses to designing a coherent Guest Host role. The final challenge is proving that the repair works.",
                q(
                  "Which Guest Host repair deserves priority, and what evidence would demonstrate improvement?"
                )
              ]

            ],

            review: [

              // ----------------------------------------------------
              // REMEDIAL 1
              // REPAIRING THE UNIVERSITY STUDENT SUCCESS ADVISER ROLE
              // ----------------------------------------------------

              {
                title: "Repairing the university student success adviser role",
                lines: [

                  [
                    "Imagine a university creating Student Success Adviser positions to coordinate complicated academic and administrative requests.",
                    t(
                      "REMEDIAL · REPAIRING A REDESIGNED ROLE",
                      "A university adviser needs more than a new title."
                    )
                  ],

                  [
                    "The redesigned process expects advisers to investigate problems and help students obtain appropriate decisions.",
                    dg(
                      "The redesigned student journey",
                      flow([
                        "Student|requests help",
                        "Adviser|investigates",
                        "Relevant|decision",
                        "Student|receives outcome"
                      ]),
                      "The adviser coordinates the student's journey across functions."
                    )
                  ],

                  [
                    "But the old job description still describes recording enquiries and referring students to separate offices.",
                    iss(
                      "The redesigned process expects coordination, but the formal role remains referral-based.",
                      "An incomplete role"
                    )
                  ],

                  [
                    "Imagine a student requesting an exception to an enrolment requirement. The adviser understands the problem but cannot establish who may approve it.",
                    q(
                      "What must be clarified before expecting the adviser to resolve this case?"
                    )
                  ],

                  [
                    "The first repair is a role description explaining what the adviser investigates, coordinates and communicates.",
                    repair(
                      1,
                      "Define the adviser's work",
                      "The role should describe responsibilities and expected outcomes."
                    )
                  ],

                  [
                    "The university must preserve decisions reserved for appropriately authorised academic roles.",
                    cmp(
                      "a",
                      "Student Success Adviser",
                      "Investigates and coordinates the student's case.",
                      "up"
                    )
                  ],

                  [
                    "The authorised decision owner remains accountable for approvals governed by academic or administrative rules.",
                    cmp(
                      "b",
                      "Authorised decision owner",
                      "Makes decisions within the relevant delegated authority.",
                      "up"
                    )
                  ],

                  [
                    "The second repair is formal delegation explaining which administrative decisions advisers may make and when escalation is required.",
                    dg(
                      "A usable decision boundary",
                      flow([
                        "Issue|identified",
                        "Authority|checked",
                        "Local|decision",
                        "Escalation|when required"
                      ]),
                      "Responsibilities and authority must agree."
                    )
                  ],

                  [
                    "Now imagine managers continuing to measure advisers by enquiries closed per shift.",
                    iss(
                      "Complex coordination takes longer but may appear less productive.",
                      "The wrong incentive"
                    )
                  ],

                  [
                    "The third repair replaces conflicting targets with appropriate case-resolution outcomes and quality safeguards.",
                    measures(
                      true,
                      "Aligning performance",
                      "The scorecard should support the redesigned contribution."
                    )
                  ],

                  [
                    "The university should also review job grade and rewards against actual responsibilities rather than assume a new title automatically deserves higher pay.",
                    st(
                      "Grade and reward decisions require justified evaluation."
                    )
                  ],

                  [
                    "The fourth repair is realistic practice with unusual cases, followed by assessment of judgement and escalation decisions.",
                    capability(
                      "Demonstrating readiness",
                      "A coherent role requires practical capability evidence."
                    )
                  ],

                  [
                    "Finally, a named owner should examine whether students genuinely receive support through the intended process.",
                    repair(
                      5,
                      "The complete adviser repair",
                      "Responsibilities, authority, measures, capability and adoption must reinforce one another."
                    )
                  ],

                  [
                    "This is the same connected repair Qasr needs for its Guest Hosts.",
                    st(
                      "A workable role aligns responsibility, authority, measures, capability and adoption."
                    )
                  ],

                  [
                    "Updating the job description alone would leave several operating contradictions unresolved.",
                    q(
                      "Why would a revised adviser job description be insufficient without decision authority and aligned measures?"
                    )
                  ]

                ]
              },

              // ----------------------------------------------------
              // REMEDIAL 2
              // THE INSURANCE CLAIMS SPECIALIST'S MISSING SPECIFICATION
              // ----------------------------------------------------

              {
                title: "The insurance claims specialist's missing specification",
                lines: [

                  [
                    "Imagine an insurance company automating routine claims and asking specialists to investigate complicated exceptions.",
                    t(
                      "REMEDIAL · A COMPLETE ROLE REPAIR",
                      "A claims specialist needs a coherent operating design."
                    )
                  ],

                  [
                    "The software handles straightforward cases, while specialists examine unusual evidence and make appropriate decisions.",
                    dg(
                      "The redesigned claims journey",
                      flow([
                        "Claim|submitted",
                        "Automatic|assessment",
                        "!Complex|exception",
                        "Specialist|investigates",
                        "Decision|communicated"
                      ]),
                      "Automation changes the work remaining for employees."
                    )
                  ],

                  [
                    "But the formal role still describes recommending approvals, and the delegation schedule omits the authority announced during briefing.",
                    iss(
                      "Expected independent decisions conflict with formal responsibilities and delegation.",
                      "A contradictory role"
                    )
                  ],

                  [
                    "A specialist investigates a valid claim but refers it upward because independent approval might later be challenged.",
                    q(
                      "Would repeating the instruction to act independently repair this problem?"
                    )
                  ],

                  [
                    "No. The company must document permitted decisions, accountability and escalation beyond approved limits.",
                    dg(
                      "Repairing authority",
                      flow([
                        "Specialist|investigates",
                        "Delegation|checked",
                        "Appropriate|decision",
                        "Escalation|when needed"
                      ]),
                      "Formal permission must support the redesigned responsibility."
                    )
                  ],

                  [
                    "The inherited performance measure also rewards claims processed per hour, although complicated investigations naturally take longer.",
                    cmp(
                      "a",
                      "Inherited objective",
                      "Maximise claims processed per hour.",
                      "down"
                    )
                  ],

                  [
                    "A replacement should recognise appropriate resolution of eligible complex claims, supported by quality review.",
                    cmp(
                      "b",
                      "Redesigned contribution",
                      "Resolve eligible exceptions accurately and within authority.",
                      "up"
                    )
                  ],

                  [
                    "Without quality safeguards, employees might approve questionable claims merely to increase their resolution count.",
                    iss(
                      "A resolution target can encourage inappropriate approvals if decision quality is ignored.",
                      "A new incentive risk"
                    )
                  ],

                  [
                    "The company should review grade and rewards against changed responsibilities, but any adjustment requires evaluation.",
                    st(
                      "Rewards must fit the work rather than the new title alone."
                    )
                  ],

                  [
                    "Specialists also need practice handling ambiguous evidence and recognising when specialist escalation is required.",
                    capability(
                      "From role repair to readiness",
                      "Formal arrangements and demonstrated capability reinforce each other."
                    )
                  ],

                  [
                    "Managers should assess realistic decisions and provide targeted support when misunderstandings become visible.",
                    null
                  ],

                  [
                    "A named owner must also monitor whether claims follow the redesigned process rather than familiar referrals.",
                    dg(
                      "Monitoring adoption",
                      flow([
                        "Observe|cases",
                        "Classify|referrals",
                        "Investigate|causes",
                        "Correct|weaknesses"
                      ]),
                      "Adoption evidence tests whether the new role works."
                    )
                  ],

                  [
                    "Qasr faces the same combination of authority, measurement and capability weaknesses.",
                    st(
                      "A complete repair changes the organisational conditions shaping employee decisions."
                    )
                  ],

                  [
                    "The strongest priority is a documented contradiction supported by evidence, followed by testing its correction.",
                    q(
                      "Which correction would you prioritise if specialists understood the claims rules but lacked formal approval authority?"
                    )
                  ]

                ]
              }

            ]
          },

          // ========================================================
          // W10O3d
          // TURN THE DASHBOARD OVER
          // ========================================================

          {
            title: "Turn the dashboard over",
            sec: "W10O3d",
            lines: [

              [
                "Imagine Qasr's sponsor opening the project dashboard. The People workstream appears complete. The new Guest Host title has been introduced, and all twenty-two employees attended induction.",
                t(
                  "TURN THE DASHBOARD OVER",
                  "The project looks ready. Is the operation ready?"
                )
              ],

              [
                "The dashboard gives a reassuring impression. Activities have been completed, and the redesigned arrival process has gone live.",
                diagram(
                  "dashboardFlip",
                  { revealed: false },
                  flow([
                    "New|role",
                    "Training|completed",
                    "Kiosks|launched",
                    "People|complete"
                  ]),
                  "Completed project activities can create an appearance of readiness."
                )
              ],

              [
                "But the sponsor should ask a different question. What happens when guests and employees actually use the redesigned process?",
                q(
                  "What evidence would challenge the green People-workstream status?"
                )
              ],

              [
                "Let us turn the dashboard over and examine the operating evidence.",
                diagram(
                  "dashboardFlip",
                  { revealed: true },
                  flow([
                    "65%|kiosk",
                    "29%|desk",
                    "9 of 22|always refer",
                    "Capability|not assessed",
                    "2|departures"
                  ]),
                  "The observed evidence raises questions that project completion status cannot answer."
                )
              ],

              [
                "At week eleven, sixty-five percent of arrivals use kiosks, while twenty-nine percent are handled at the desk.",
                diagram(
                  "adoption",
                  { lobby: true },
                  progress("Kiosk adoption", 65),
                  "The remaining arrival-channel classification is not reported."
                )
              ],

              [
                "Those figures describe channel use. They do not establish that every desk interaction is unnecessary or that every kiosk interaction is successful.",
                st(
                  "Channel adoption is evidence of behaviour, not a complete measure of service quality."
                )
              ],

              [
                "Nine of the twenty-two Guest Hosts refer every rate discrepancy to the duty manager.",
                hosts(
                  "referrals",
                  "Nine of twenty-two",
                  "The referral pattern is observed, but individual reasons are not established."
                )
              ],

              [
                "That observation is particularly important because the redesigned role expects employees to resolve eligible exceptions within appropriate authority.",
                null
              ],

              [
                "The case also tells us that the AED 400 waiver permission is absent from the formal delegation schedule.",
                authority(
                  320,
                  false,
                  true,
                  "An unresolved authority boundary",
                  "The illustrative AED 320 case shows why the formal delegation gap matters."
                )
              ],

              [
                "The inherited performance objectives still reward conventional check-in volume and transaction speed.",
                measures(
                  false,
                  "The inherited incentive",
                  "Old performance measures may conflict with the redesigned Guest Host contribution."
                )
              ],

              [
                "All twenty-two employees attended the four-hour induction, but no post-induction capability assessment was conducted.",
                hosts(
                  "assessment",
                  "Attendance without assessment",
                  "Participation was recorded, but practical decision capability was not assessed."
                )
              ],

              [
                "The revised job descriptions arrived three weeks after go-live. The formal definition of the new role therefore lagged behind the work employees were already expected to perform.",
                iss(
                  "The organisation launched changed responsibilities before completing their formal description.",
                  "A delayed role definition"
                )
              ],

              [
                "One pilot property has reinstated a permanent desk. Two Guest Hosts have resigned, although the case does not report why they left.",
                evidence(
                  "The wider evidence",
                  "The permanent desk and two resignations are observations, not established causal explanations."
                )
              ],

              [
                "These observations challenge a simple declaration of readiness. But we must not turn them into an unsupported story about employee resistance.",
                st(
                  "Evidence can reveal a problem without establishing its cause."
                )
              ],

              [
                "For example, the nine referrals might reflect unclear authority, insufficient practice, conflicting measures or some combination of these factors.",
                dg(
                  "Competing explanations",
                  branch(
                    "Why refer every discrepancy?",
                    [
                      "Formal|authority gap",
                      "Capability|uncertainty",
                      "Conflicting|incentives",
                      "Other|operating barrier"
                    ]
                  ),
                  "These explanations must be investigated rather than assumed."
                )
              ],

              [
                "The sponsor should therefore distinguish confirmed facts from hypotheses requiring further evidence.",
                cmp(
                  "a",
                  "Confirmed observation",
                  "Nine Guest Hosts refer every rate discrepancy.",
                  "up"
                )
              ],

              [
                "A possible explanation is that employees are uncertain about the undocumented waiver authority. That is plausible, but the individual reasons have not been established.",
                cmp(
                  "b",
                  "Hypothesis",
                  "Some referrals may reflect uncertainty about formal delegation.",
                  "up"
                )
              ],

              [
                "The distinction matters because different causes require different interventions.",
                st(
                  "Choose an intervention only after identifying the problem it is intended to solve."
                )
              ],

              [
                "Suppose the sponsor proposes another four-hour training session for everyone. That would be easy to schedule and easy to mark complete.",
                iss(
                  "Repeating induction may create another green milestone without correcting the operating system.",
                  "The tempting intervention"
                )
              ],

              [
                "But additional training cannot formally delegate authority. It cannot, by itself, replace conflicting performance measures or explain why a permanent desk has returned.",
                q(
                  "Would repeating induction address the most important organisational contradictions?"
                )
              ],

              [
                "A stronger first response is to investigate the operating evidence and repair the confirmed authority and measurement gaps.",
                repair(
                  3,
                  "Repair the confirmed contradictions",
                  "Role clarity, formal authority and aligned measures should support the same work."
                )
              ],

              [
                "The process owner should clarify the Guest Host role, ensure the delegation schedule is formally approved and review inherited objectives.",
                dg(
                  "A coordinated organisational repair",
                  flow([
                    "Clarify|role",
                    "Approve|delegation",
                    "Align|measures",
                    "Assess|capability",
                    "Review|adoption"
                  ]),
                  "The intervention addresses connected elements of the people system."
                )
              ],

              [
                "Managers should then assess capability through realistic decisions and investigate why the nine employees refer every discrepancy.",
                capability(
                  "Test the decision, not attendance",
                  "Practical assessment helps distinguish capability gaps from organisational barriers."
                )
              ],

              [
                "The organisation should also examine desk-handling reasons and compare operating patterns across the four pilot properties.",
                null
              ],

              [
                "These actions provide better evidence for deciding whether further training, workflow improvement or another intervention is necessary.",
                st(
                  "Diagnosis should lead to targeted corrective action."
                )
              ],

              [
                "The sponsor must also establish who owns the improvement. A list of concerns without named accountability can become another unfinished project document.",
                raci(
                  {
                    task: "Resolve readiness gaps",
                    responsible: "Operational team",
                    accountable: "Process owner"
                  },
                  "Accountability for corrective action",
                  "The process owner should coordinate the resolution of cross-functional readiness gaps."
                )
              ],

              [
                "A useful decision record should state the observed issue, the evidence, the proposed response, the accountable owner and the follow-up measure.",
                dg(
                  "The decision record",
                  flow([
                    "Observed|issue",
                    "Evidence",
                    "Corrective|action",
                    "Accountable|owner",
                    "Follow-up|measure"
                  ]),
                  "A decision record turns diagnosis into accountable action."
                )
              ],

              [
                "For the waiver issue, the evidence is clear: the communicated permission is missing from formal delegation. The action is to resolve that contradiction through the appropriate approval process.",
                authority(
                  320,
                  false,
                  true,
                  "A confirmed gap requiring action",
                  "The authority contradiction can be corrected without inventing employee motives."
                )
              ],

              [
                "For the nine referrals, the evidence is also clear, but the causes remain open. The action is to investigate and assess rather than assign blame.",
                hosts(
                  "referrals",
                  "An observed pattern requiring diagnosis",
                  "The reasons behind the nine employees' referral behaviour must be established."
                )
              ],

              [
                "For the permanent desk, the organisation should establish which guest needs it serves and whether it represents a necessary alternative or an avoidable workaround.",
                null
              ],

              [
                "For the two resignations, the sponsor should avoid unsupported causal claims while reviewing continuity risks and the transfer of operational knowledge.",
                hosts(
                  "departures",
                  "Two departures, motives unknown",
                  "The departures are observed, but their causes are not reported."
                )
              ],

              [
                "This is the difference between managing a dashboard and managing a process. A dashboard can report activities. The process owner must understand operating consequences.",
                st(
                  "A green milestone cannot replace evidence of operational readiness."
                )
              ],

              [
                "The People phase is not complete merely because a role was renamed and training was delivered. It is ready when employees can perform the redesigned work within dependable organisational arrangements.",
                readiness(
                  true,
                  "Look behind completion status",
                  "Readiness requires evidence that responsibilities, authority, capability and measures support the intended process."
                )
              ],

              [
                "If you were Qasr's sponsor, your first decision should address the confirmed contradictions while commissioning evidence to explain the remaining operating patterns.",
                q(
                  "What would you repair immediately, and what would you investigate before choosing an intervention?"
                )
              ]

            ],

            review: [

              {
                title: "The green hospital dashboard",
                lines: [

                  [
                    "Imagine a hospital reporting that its redesigned patient-discharge process is ready. The software is installed, employees attended training and the project milestones are green.",
                    t(
                      "Remedial · Evidence and readiness",
                      "A completed project can still have operating problems."
                    )
                  ],

                  [
                    "The dashboard records activities completed by the project team.",
                    dg(
                      "The project dashboard",
                      flow([
                        "System|installed",
                        "Training|completed",
                        "Procedure|issued",
                        "Project|green"
                      ]),
                      "Completion status reports activities, not necessarily operating capability."
                    )
                  ],

                  [
                    "After launch, some patients still experience long delays because departments disagree about who should resolve outstanding discharge requirements.",
                    iss(
                      "The redesigned process is live, but accountability remains unclear.",
                      "The operating contradiction"
                    )
                  ],

                  [
                    "The hospital should not immediately conclude that employees are resisting the new process.",
                    st(
                      "Observed delays do not establish employee motivation."
                    )
                  ],

                  [
                    "Managers should investigate the reasons for the delays and identify the decisions that remain unclear.",
                    dg(
                      "Investigating the operating problem",
                      flow([
                        "Delay|observed",
                        "Cause|investigated",
                        "Owner|identified",
                        "Action|agreed"
                      ]),
                      "Operating evidence should guide corrective action."
                    )
                  ],

                  [
                    "If the problem is unclear accountability, repeating training may not solve it.",
                    q(
                      "Why might another training session fail to correct the discharge delay?"
                    )
                  ],

                  [
                    "The organisation must identify who is accountable for coordinating the relevant decision and who possesses the required authority.",
                    raci(
                      {
                        task: "Coordinate discharge",
                        responsible: "Coordinator",
                        accountable: "Process owner"
                      },
                      "Clarifying accountability",
                      "Responsibility and accountability should be explicitly assigned."
                    )
                  ],

                  [
                    "If employees lack practical capability, realistic assessment and feedback may be appropriate.",
                    capability(
                      "Assessing capability",
                      "Practical performance provides stronger evidence than attendance."
                    )
                  ],

                  [
                    "The hospital should choose the intervention that matches the diagnosed problem.",
                    st(
                      "Correct the cause, not merely the visible symptom."
                    )
                  ],

                  [
                    "This is the same principle Qasr must apply when its People workstream appears complete but operating evidence reveals unresolved questions.",
                    null
                  ],

                  [
                    "A sponsor should ask whether the redesigned process works reliably for patients and employees, not merely whether the project activities were completed.",
                    q(
                      "What evidence would justify declaring the hospital's redesigned discharge process operationally ready?"
                    )
                  ]

                ]
              },

              {
                title: "The service centre's misleading status",
                lines: [

                  [
                    "Imagine a service centre launching a redesigned complaints process. The dashboard reports completed training, approved procedures and a successful software deployment.",
                    t(
                      "Remedial · Managing beyond milestones",
                      "A green status can conceal unresolved operating barriers."
                    )
                  ],

                  [
                    "But employees continue referring complaints that the redesigned process expects them to resolve locally.",
                    iss(
                      "The intended local decisions are not consistently happening.",
                      "A gap between design and operation"
                    )
                  ],

                  [
                    "Management considers sending everyone to another training session.",
                    q(
                      "What should management establish before repeating the training?"
                    )
                  ],

                  [
                    "It should investigate why employees refer the cases. Some may lack knowledge, while others may face unclear authority or conflicting measures.",
                    dg(
                      "Possible causes",
                      branch(
                        "Why do referrals continue?",
                        [
                          "Knowledge|gap",
                          "Authority|gap",
                          "Incentive|conflict",
                          "Workflow|barrier"
                        ]
                      ),
                      "Different causes require different corrective actions."
                    )
                  ],

                  [
                    "The organisation should separate confirmed observations from explanations that still need evidence.",
                    cmp(
                      "a",
                      "Observation",
                      "Employees continue referring certain complaints.",
                      "up"
                    )
                  ],

                  [
                    "The cause remains a question until managers investigate actual decisions and working conditions.",
                    cmp(
                      "b",
                      "Hypothesis",
                      "Employees may lack confidence or formal authority.",
                      "up"
                    )
                  ],

                  [
                    "If formal delegation is missing, the organisation should correct the decision boundary.",
                    st(
                      "Training cannot substitute for formal authority."
                    )
                  ],

                  [
                    "If capability is insufficient, targeted practice and assessment may help.",
                    capability(
                      "Testing the capability gap",
                      "Realistic decisions provide evidence of practical readiness."
                    )
                  ],

                  [
                    "If performance targets discourage careful resolution, management must review the scorecard.",
                    measures(
                      true,
                      "Aligning performance expectations",
                      "Measures should support the redesigned contribution."
                    )
                  ],

                  [
                    "A process owner should coordinate these actions and monitor whether operating behaviour improves.",
                    dg(
                      "From evidence to action",
                      flow([
                        "Observed|problem",
                        "Cause|investigated",
                        "Corrective|action",
                        "Owner|assigned",
                        "Outcome|reviewed"
                      ]),
                      "A named owner turns diagnosis into improvement."
                    )
                  ],

                  [
                    "Qasr faces the same challenge. Completed induction does not establish that the twenty-two Guest Hosts can perform every required decision.",
                    null
                  ],

                  [
                    "The sponsor must manage the actual process rather than rely entirely on completed project activities.",
                    q(
                      "Why is diagnosing the reason for repeated referrals more valuable than immediately scheduling another training session?"
                    )
                  ]

                ]
              }

            ]
          },

          // ========================================================
          // W10O3e
          // THE HANDOVER THAT CHANGES TOMORROW
          // ========================================================

          {
            title: "The handover that changes tomorrow",
            sec: "W10O3e",
            lines: [

              [
                "We began this week with a traveller waiting beside a kiosk while a Guest Host investigated a disputed corporate rate. Let us finish by asking what must change before the next guest arrives.",
                t(
                  "THE HANDOVER THAT CHANGES TOMORROW",
                  "A redesigned process needs a dependable people system."
                )
              ],

              [
                "The People phase should not end with a new job title or a completed training register. It should produce organisational arrangements that make the redesigned work possible.",
                st(
                  "The People phase must deliver operating readiness, not just project completion."
                )
              ],

              [
                "The first handover output is a clear role definition. Guest Hosts need to understand their responsibilities, boundaries and contribution to the arrival process.",
                it(
                  1,
                  4,
                  "users",
                  "Role definition",
                  "Specify responsibilities, boundaries and expected outcomes."
                )
              ],

              [
                "The second output is documented decision authority. The AED 400 waiver boundary must be formally approved and aligned with the employee's responsibilities.",
                it(
                  2,
                  4,
                  "key",
                  "Decision rights",
                  "Document permitted decisions and escalation conditions."
                )
              ],

              [
                "The third output is evidence of capability. Employees should demonstrate that they can investigate realistic cases and apply the approved rules.",
                it(
                  3,
                  4,
                  "brain",
                  "Capability evidence",
                  "Assess practical decisions rather than relying only on attendance."
                )
              ],

              [
                "The fourth output is aligned performance measurement. The organisation should recognise appropriate guest assistance and exception resolution while protecting decision quality.",
                it(
                  4,
                  4,
                  "gauge",
                  "Aligned measures",
                  "Reward the redesigned contribution with suitable safeguards."
                )
              ],

              [
                "These four outputs belong together. A clear role without authority leaves employees uncertain. Authority without capability creates risk. Capability without aligned measures may not translate into consistent behaviour.",
                dg(
                  "A connected people system",
                  flow([
                    "Role|definition",
                    "Decision|rights",
                    "Capability|evidence",
                    "Aligned|measures"
                  ]),
                  "The four outputs reinforce one another."
                )
              ],

              [
                "The organisation also needs a named owner to monitor adoption and investigate operating deviations after launch.",
                st(
                  "Readiness must continue into operating ownership."
                )
              ],

              [
                "Now consider the transition into Develop. Technology must support the decisions the organisation has formally assigned to employees.",
                handover(
                  "The People-to-Develop handover",
                  "Organisational decisions become requirements for the supporting workflow and technology."
                )
              ],

              [
                "For example, the approved waiver rule should be reflected in the supporting workflow. Employees should not have to choose between an informal email and a system that assumes the old approval hierarchy.",
                authority(
                  320,
                  true,
                  true,
                  "A proposed aligned decision",
                  "Formal authority and supporting workflow should permit an eligible local decision."
                )
              ],

              [
                "The system should help employees verify eligibility, recognise monetary limits, record decisions and refer cases that genuinely require approval.",
                dg(
                  "Supporting the decision",
                  flow([
                    "Evidence|captured",
                    "Eligibility|checked",
                    "Authority|verified",
                    "Decision|recorded",
                    "Exception|escalated"
                  ]),
                  "Technology should reflect approved organisational decision rules."
                )
              ],

              [
                "The handover should also identify unresolved issues. If capability has not yet been assessed, the next phase must not silently treat that evidence as complete.",
                iss(
                  "An unresolved readiness gap must remain visible during handover.",
                  "The danger of silent closure"
                )
              ],

              [
                "A useful handover record states what has been approved, what remains open, who owns each issue and what evidence will demonstrate closure.",
                dg(
                  "The controlled handover",
                  flow([
                    "Approved|decisions",
                    "Open|issues",
                    "Named|owners",
                    "Closure|evidence",
                    "Develop"
                  ]),
                  "Unresolved issues should be carried forward with accountability."
                )
              ],

              [
                "The process owner should remain involved as the organisation moves through Develop and Implement. The People phase is not an isolated human-resources exercise.",
                st(
                  "People, technology and operating ownership must remain connected."
                )
              ],

              [
                "Later, Realize Value will examine whether the redesigned process delivers its intended benefits. Sustainable Performance will help prevent those gains from disappearing over time.",
                dg(
                  "The framework continues",
                  route([5, 6, 7, 8, 9]),
                  "People connects with Develop, Implement, Realize Value and Sustainable Performance."
                )
              ],

              [
                "Project management, change management and leadership continue across these phases. They help coordinate decisions, support employees and respond when actual behaviour differs from the design.",
                null
              ],

              [
                "Now imagine the next traveller arriving with an eligible AED 320 discrepancy. This is a proposed future scenario, not an observed Qasr outcome.",
                authority(
                  320,
                  true,
                  true,
                  "The intended future decision",
                  "An eligible AED 320 case can be resolved locally once the required authority and capability are established."
                )
              ],

              [
                "The Guest Host checks the booking evidence, confirms eligibility and verifies that the amount is within formally delegated authority.",
                dg(
                  "The supported Guest Host",
                  flow([
                    "Booking|checked",
                    "Eligibility|confirmed",
                    "Authority|verified",
                    "Decision|made"
                  ]),
                  "The employee's decision is supported by the redesigned operating arrangements."
                )
              ],

              [
                "The employee explains the outcome clearly and records the decision. The guest does not need to wait for an unnecessary approval.",
                st(
                  "The redesigned process becomes real when employees can make appropriate decisions."
                )
              ],

              [
                "If the amount exceeds the limit or the case is ineligible, the Guest Host follows the approved escalation route instead.",
                authority(
                  460,
                  true,
                  true,
                  "A controlled exception",
                  "A case beyond the delegated boundary is appropriately escalated."
                )
              ],

              [
                "That is what successful empowerment looks like. Employees can act independently when authorised and recognise when a decision belongs elsewhere.",
                null
              ],

              [
                "The sponsor should then monitor real arrivals, review decision quality and investigate recurring barriers rather than assume the redesign will sustain itself.",
                dg(
                  "From readiness to sustained operation",
                  flow([
                    "Observe|operation",
                    "Review|decisions",
                    "Investigate|barriers",
                    "Improve|support"
                  ]),
                  "Operational evidence should continue to guide improvement."
                )
              ],

              [
                "Qasr's case reminds us that a promising technical redesign can remain incomplete when the people system does not support the work.",
                evidence(
                  "The lesson from Qasr",
                  "Observed adoption, referral and readiness evidence reveals why organisational alignment matters."
                )
              ],

              [
                "The most important question is not whether the new process has been announced. It is whether employees can perform it confidently, correctly and consistently.",
                st(
                  "A process is only as dependable as the work people can actually perform."
                )
              ],

              [
                "We have now connected the three learning outcomes. The People phase contributes to process change, roles and measures must support the redesign, and employees need coordinated support through adoption.",
                dg(
                  "The three learning outcomes",
                  flow([
                    "O1|People-phase contribution",
                    "O2|Roles and measures",
                    "O3|Coordinated adoption"
                  ]),
                  "The three outcomes combine organisational design with practical change."
                )
              ],

              [
                "The next framework phase, Develop, must carry these decisions into the supporting systems and operating arrangements.",
                handover(
                  "Ready for Develop",
                  "The People-phase outputs become requirements for the next phase."
                )
              ],

              [
                "Before we close, return to the waiting traveller. The kiosk was never the whole solution. The real improvement comes when the employee beside it has the responsibility, authority, capability and support to finish the journey.",
                q(
                  "What must be true about the Guest Host's role, authority, capability and measures before the next guest arrives?"
                )
              ]

            ],

            review: [

              {
                title: "The airport handover",
                lines: [

                  [
                    "Imagine an airport completing the People phase of a redesigned boarding process. Automated gates will handle routine passengers, while employees investigate exceptions.",
                    t(
                      "Remedial · The People-to-Develop handover",
                      "Organisational decisions become technical requirements."
                    )
                  ],

                  [
                    "The airport has defined the new gate-agent role, but the technology team still needs to know which decisions employees are authorised to make.",
                    dg(
                      "The handover challenge",
                      flow([
                        "Role|defined",
                        "Authority|approved",
                        "Workflow|configured",
                        "Operation|supported"
                      ]),
                      "The supporting system must reflect approved decision rights."
                    )
                  ],

                  [
                    "Suppose an agent may approve a particular eligible boarding exception locally. The workflow should support that authorised decision.",
                    st(
                      "Technology should enable the decisions employees are permitted to make."
                    )
                  ],

                  [
                    "If the system still requires managerial approval for every exception, the old delay may return despite the redesigned role.",
                    iss(
                      "The technical workflow preserves an approval that the new role no longer requires.",
                      "An inconsistent handover"
                    )
                  ],

                  [
                    "The airport should provide Develop with clear role definitions, approved decision boundaries and practical capability requirements.",
                    handover(
                      "People requirements enter Develop",
                      "Organisational decisions become requirements for the supporting technology."
                    )
                  ],

                  [
                    "The handover should also identify unresolved issues rather than silently assume they have been completed.",
                    q(
                      "Why should an unresolved capability assessment remain visible during handover?"
                    )
                  ],

                  [
                    "Because the organisation still needs evidence that employees can apply the redesigned rules.",
                    capability(
                      "Capability evidence",
                      "A completed training activity is not equivalent to demonstrated performance."
                    )
                  ],

                  [
                    "The process owner should coordinate the closure of remaining issues and monitor operating behaviour after launch.",
                    null
                  ],

                  [
                    "The goal is to make the new boarding process practical, controlled and dependable.",
                    st(
                      "A good handover connects organisational design with operating reality."
                    )
                  ],

                  [
                    "Qasr needs the same alignment between Guest Host authority and the supporting arrival workflow.",
                    q(
                      "What could happen if a technology team builds the workflow using outdated approval rules?"
                    )
                  ]

                ]
              },

              {
                title: "The customer service handover",
                lines: [

                  [
                    "Imagine a company redesigning customer service so employees can resolve eligible complaints without unnecessary referrals.",
                    t(
                      "Remedial · Making redesign operational",
                      "The People phase must deliver usable requirements."
                    )
                  ],

                  [
                    "The organisation has announced the new role, but the supporting workflow still follows the old approval hierarchy.",
                    iss(
                      "The redesigned responsibility and technical approval route do not agree.",
                      "A handover contradiction"
                    )
                  ],

                  [
                    "An employee investigates an eligible complaint and tries to resolve it, but the system requires approval from a manager.",
                    dg(
                      "The old approval returns",
                      flow([
                        "Complaint|investigated",
                        "Eligible|decision",
                        "!Old approval|required",
                        "Customer|waits"
                      ]),
                      "Technology can preserve an outdated handoff."
                    )
                  ],

                  [
                    "The People phase should provide formally approved decision rights so Develop can configure the correct workflow.",
                    st(
                      "Formal delegation must become a technical requirement."
                    )
                  ],

                  [
                    "The handover should also include the capability employees need and the measures that will recognise successful performance.",
                    handover(
                      "A complete handover",
                      "Role, authority, capability and measures must support the same process."
                    )
                  ],

                  [
                    "If capability has not yet been assessed, the issue should remain open with a named owner.",
                    q(
                      "Why is it risky to mark capability complete simply because employees attended training?"
                    )
                  ],

                  [
                    "Attendance confirms participation but does not establish that employees can make appropriate decisions.",
                    capability(
                      "Demonstrating capability",
                      "Realistic assessment provides stronger readiness evidence."
                    )
                  ],

                  [
                    "The process owner should monitor whether employees actually resolve eligible complaints and investigate repeated referrals.",
                    dg(
                      "Operational follow-up",
                      flow([
                        "Observe|decisions",
                        "Review|quality",
                        "Investigate|referrals",
                        "Correct|barriers"
                      ]),
                      "The handover continues into operating ownership."
                    )
                  ],

                  [
                    "The objective is not merely to complete another phase of the project. It is to make the redesigned process dependable.",
                    st(
                      "The redesign succeeds when employees can perform the intended work."
                    )
                  ],

                  [
                    "Qasr's Guest Hosts face the same requirement. The organisation must align formal authority, practical capability, performance expectations and supporting technology.",
                    null
                  ],

                  [
                    "That is the purpose of the People-to-Develop handover: ensuring that organisational decisions become part of the operating system.",
                    q(
                      "Which People-phase outputs should Develop receive before configuring a workflow that supports independent employee decisions?"
                    )
                  ]

                ]
              }

            ]
          }

        ]
      }

    ],

    // ==============================================================
    // COURSE COMPLETION
    // ==============================================================

    completion: {
      title: "Week 10 complete",
      subtitle: "The People Phase — Making Redesigned Work Real",
      message:
        "You have examined how redesigned processes change people's responsibilities, " +
        "why authority and performance measures must support the new work, " +
        "and how capability and adoption evidence help managers distinguish " +
        "completed activities from genuine operational readiness.",
      next:
        "Week 11 continues the BPM framework by examining how the approved " +
        "redesign is developed into supporting systems and operating arrangements."
    }

  };

  // ==============================================================
  // ADAPTIVE REVIEW REGISTRY
  // ==============================================================

  const reviewRegistry = {};

  window.COURSE.lessons.forEach(lesson => {
    lesson.sections.forEach(section => {
      if (!section.sec || !Array.isArray(section.review)) return;
      reviewRegistry[section.sec] = section.review;
    });
  });

  window.ADAPTIVE = Object.assign(
    {},
    window.ADAPTIVE || {},
    {
      review: Object.assign(
        {},
        (window.ADAPTIVE && window.ADAPTIVE.review) || {},
        reviewRegistry
      )
    }
  );

  // ==============================================================
  // COURSE INTEGRITY
  // ==============================================================

  const EXPECTED_SECTIONS = [
    "W10O1a",
    "W10O1b",
    "W10O1c",
    "W10O2a",
    "W10O2b",
    "W10O2c",
    "W10O2d",
    "W10O3a",
    "W10O3b",
    "W10O3c",
    "W10O3d",
    "W10O3e"
  ];

  const validateWeek10 = () => {
    const issues = [];
    const found = [];

    if (!Array.isArray(window.COURSE.lessons)) {
      issues.push("COURSE.lessons is missing.");
      return { valid: false, issues };
    }

    window.COURSE.lessons.forEach((lesson, lessonIndex) => {
      if (!Array.isArray(lesson.sections)) {
        issues.push(`Lesson ${lessonIndex + 1} has no sections array.`);
        return;
      }

      lesson.sections.forEach((section, sectionIndex) => {
        found.push(section.sec);

        if (!Array.isArray(section.lines)) {
          issues.push(`Section ${section.sec} has no narration lines.`);
          return;
        }

        section.lines.forEach((line, lineIndex) => {
          if (!Array.isArray(line) || line.length !== 2) {
            issues.push(
              `Invalid narration entry in ${section.sec} at ${lineIndex}.`
            );
            return;
          }

          if (typeof line[0] !== "string" || !line[0].trim()) {
            issues.push(
              `Missing spoken narration in ${section.sec} at ${lineIndex}.`
            );
          }

          if (
            line[1] !== null &&
            (typeof line[1] !== "object" || !line[1].type)
          ) {
            issues.push(
              `Invalid visual moment in ${section.sec} at ${lineIndex}.`
            );
          }
        });

        if (!Array.isArray(section.review) || section.review.length !== 2) {
          issues.push(
            `Section ${section.sec} must contain two remedial lessons.`
          );
        } else {
          section.review.forEach((review, reviewIndex) => {
            if (!Array.isArray(review.lines)) {
              issues.push(
                `Invalid remedial lesson ${reviewIndex + 1} in ${section.sec}.`
              );
              return;
            }

            review.lines.forEach((line, lineIndex) => {
              if (!Array.isArray(line) || line.length !== 2) {
                issues.push(
                  `Invalid remedial narration in ${section.sec}, ` +
                  `review ${reviewIndex + 1}, line ${lineIndex}.`
                );
              }
            });
          });
        }
      });
    });

    if (window.COURSE.lessons.length !== 4) {
      issues.push("Week 10 must contain four main lessons.");
    }

    EXPECTED_SECTIONS.forEach(sectionId => {
      if (!found.includes(sectionId)) {
        issues.push(`Missing section ${sectionId}.`);
      }
    });

    found.forEach(sectionId => {
      if (!EXPECTED_SECTIONS.includes(sectionId)) {
        issues.push(`Unexpected section ${sectionId}.`);
      }
    });

    return {
      valid: issues.length === 0,
      issues,
      lessons: window.COURSE.lessons.length,
      sections: found.length,
      remedials: found.length * 2
    };
  };

  window.W10_COURSE_INTEGRITY = validateWeek10();

})();
