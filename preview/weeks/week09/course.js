// OPER621 Business Process Management - Week 9 - The Innovate Phase.
// Framework Phase 5: Designing the process that should exist.
// Sources: Week 9 Session 1 slides, Week 9 Delivery Plan, Jeston Chapter 17.
// Running case: Qasr Hospitality Group, continuing the Qasr Marina hotel story.
// Author: Prof. Bassem Jarboui.
//
// OFFICIAL COURSE LEARNING OUTCOMES
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
// LESSON AND RUNTIME SECTION MAPPING
// l1: Designing the process that should exist.
//     O1a: From Understand to Innovate.
//     O1b: Three levels of ambition.
//     O1c: Designing Qasr's future arrival.
//     Outcome O1. Primary CLO S1.
//
// l2: Choosing between competing designs.
//     O2a: Comparing redesign alternatives.
//     O2b: Qasr's two competing designs.
//     O2c: The quick-win trap.
//     Outcome O2. Primary CLO S1.
//
// l3: Making the future process workable.
//     O3a: Technology that changes the process.
//     O3b: Constraints and exceptions.
//     O3c: Testing before implementation.
//     Outcome O3. Primary CLO S2.
//
// l4: Making and defending the Innovate decision.
//     O2d: Choosing the defensible design.
//     O2e: The Innovate handover.
//     Outcome O2, reinforcing O1 and O3. Primary CLO S1.
//
// RUNTIME SECTION KEYS
// O1a, O1b, O1c, O2a, O2b, O2c, O2d, O2e, O3a, O3b, O3c.
// These keys must match adaptive-week.js and bank.js exactly.
//
// NARRATION AND VISUAL RULES
// Each part contains 430-570 spoken words.
// Each spoken sentence contains 6-30 words.
// Target average sentence length: 15-18 words.
// Write warm, natural, connected speech from one teacher to one student.
// Explain why each concept matters and what follows from it.
// Define unfamiliar terms naturally within the narration.
// Use concrete examples and continue the Qasr Marina story.
// Avoid mechanical spoken lists and enumeration.
// Avoid the banned spoken patterns "first,", "second,", and "third,".
// Do not use arrow symbols or bullet characters in narration.
// Every line is [spoken sentence, visual moment].
// A null moment keeps the previous visual on screen.
// Introduce a meaningful visual moment every 1-3 sentences.
// Use only the established Week 1 moment and diagram types.
// Every diagram must have a meaningful, full-sentence caption.
// Do not contradict the Week 9 slides or delivery plan.
// Do not present proposed improvements as achieved results.
// Do not confuse Week 1's 23-minute desk example with
// Week 9's 82-minute lobby-to-room baseline.
// Insert subsequent lesson objects at //MORE_LESSONS.

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
    id: "oper621-w9",
    code: "OPER621",
    title: "The Innovate Phase",
    subtitle: "Business Process Management · Week 9",
    author: "Prof. Bassem Jarboui",

    teacher: {
      name: "Prof. Bassem Jarboui",
      email: "",
      sendReport: false
    },

    lessons: [

      {
        id: "l1",
        title: "Designing the process that should exist",

        sections: [

          {
            title: "From Understand to Innovate",
            sec: "O1a",

            lines: [

              [
                "Welcome to Week Nine, where our journey through Business Process Management reaches an exciting turning point.",
                t(
                  "OPER621 · Week 9",
                  "The Innovate Phase: designing the process that should exist."
                )
              ],

              [
                "Until now, we have concentrated on understanding how work happens and why customers experience unnecessary difficulties.",
                null
              ],

              [
                "Today, I want you to imagine that we can finally change the way that work happens.",
                q(
                  "If you could redesign a process, would you simply make its existing steps faster?"
                )
              ],

              [
                "That question takes us back to Qasr Marina, the hotel whose guest arrival problems we have followed.",
                null
              ],

              [
                "You may remember how disconnected information forced employees to search, telephone colleagues, and repeat checks.",
                iss(
                  "Disconnected information creates waiting and repeated work during guest arrival.",
                  "The original problem"
                )
              ],

              [
                "The employees were trying to help, but their efforts could not overcome the weaknesses built into the process.",
                null
              ],

              [
                "During Week Eight, our Understand phase examined what actually happened and investigated the causes behind those difficulties.",
                dg(
                  "From investigation to design",
                  D.flow([
                    "Understand",
                    "Root causes",
                    "Innovate",
                    "+Future process"
                  ]),
                  "Understand investigates the current process, while Innovate uses that evidence to design a better way of working."
                )
              ],

              [
                "Now we enter Innovate, the fifth phase of the BPM implementation framework, where investigation becomes future process design.",
                null
              ],

              [
                "A future process design is often called a to-be process, meaning the way work should happen after improvement.",
                t(
                  "What is a to-be process?",
                  "A to-be process describes how work should operate after the proposed changes."
                )
              ],

              [
                "But designing that future requires more than drawing attractive boxes or purchasing a new information system.",
                null
              ],

              [
                "We must use the causes discovered during Understand, because a solution aimed at symptoms leaves the underlying problem untouched.",
                st(
                  "A credible to-be design addresses the causes of poor performance rather than merely making the symptoms less visible."
                )
              ],

              [
                "Imagine Qasr's manager asking reception employees to work faster whenever a guest arrives with a corporate booking.",
                null
              ],

              [
                "That instruction might improve individual transactions, but it cannot remove an approval delay outside reception's control.",
                iss(
                  "Faster reception work cannot eliminate an approval that remains trapped in another department.",
                  "A symptom-level solution"
                )
              ],

              [
                "Suppose instead that the agreed corporate rate could be confirmed automatically when the booking was created.",
                null
              ],

              [
                "The guest would no longer need to wait for the same approval during arrival, because the cause had been removed.",
                dg(
                  "Removing the source of waiting",
                  D.flow([
                    "Booking created",
                    "Rate confirmed",
                    "Guest arrives",
                    "+Room assigned"
                  ]),
                  "Confirming the corporate rate during booking removes the need to repeat that approval when the guest arrives."
                )
              ],

              [
                "Notice that we have not simply asked employees to perform the old work more quickly.",
                null
              ],

              [
                "We have questioned why that work needed to happen at arrival, which opens the door to genuine redesign.",
                st(
                  "Redesign changes how work is organised, rather than assuming every existing activity must remain."
                )
              ],

              [
                "This distinction matters because Qasr's latest evidence describes an average of eighty-two minutes from lobby to room.",
                fm(
                  "Current average lobby-to-room time",
                  "82",
                  "minutes"
                )
              ],

              [
                "That figure measures the complete arrival journey, not merely the time spent speaking with a receptionist.",
                null
              ],

              [
                "A forty-seven-minute rate-approval wait affects sixty-one percent of cases, making it an important redesign opportunity.",
                iss(
                  "A 47-minute rate-approval wait affects 61% of the cases.",
                  "A major source of delay"
                )
              ],

              [
                "Only eight point one minutes represent guest-facing service, so making employees rush through service misses the larger opportunity.",
                null
              ],

              [
                "We should instead ask which waiting periods, handoffs, and repeated activities the future process could avoid.",
                q(
                  "What could Qasr remove from the guest's journey without removing something the guest genuinely needs?"
                )
              ],

              [
                "The goal is not to eliminate necessary controls, because guest safety and legitimate verification requirements still matter.",
                null
              ],

              [
                "Our goal is to preserve what creates value while changing when, where, and how supporting work happens.",
                cmp(
                  "a",
                  "Current process",
                  "The guest waits while departments complete disconnected checks."
                )
              ],

              [
                "That means the future design must start with the guest's desired outcome rather than the existing departmental routines.",
                cmp(
                  "b",
                  "Future process",
                  "The guest reaches a ready room through a coordinated arrival journey."
                )
              ],

              [
                "For Qasr, the desired outcome remains straightforward: the guest reaches the correct room without unnecessary waiting.",
                null
              ],

              [
                "As we continue, remember that Innovate does not implement the solution; it designs what later phases must make workable.",
                st(
                  "Innovate designs the future process; later phases prepare people, develop the solution, and implement the changes."
                )
              ],

              [
                "Our next challenge is deciding how ambitious that design should become, because not every problem requires radical change.",
                q(
                  "How much of the existing process should Qasr be willing to change?"
                )
              ]

            ]
          },

          {
            title: "Three levels of ambition",
            sec: "O1b",

            lines: [

              [
                "Let's imagine Qasr's managers gathering around a table to discuss what the future arrival experience should become.",
                t(
                  "Choosing the ambition",
                  "A process can be improved, redesigned, or fundamentally rethought."
                )
              ],

              [
                "Everyone agrees that eighty-two minutes from lobby to room is too long, but their proposed solutions differ.",
                null
              ],

              [
                "The reception manager suggests improving the existing check-in steps, while another manager wants to change the entire journey.",
                q(
                  "Should Qasr improve the existing process, or question whether guests need that process at all?"
                )
              ],

              [
                "Both suggestions deserve attention, because the right ambition depends on the causes of poor performance.",
                null
              ],

              [
                "At the least disruptive level, an organisation improves existing steps without fundamentally changing how the process operates.",
                it(
                  1,
                  3,
                  "check",
                  "Improve existing steps",
                  "Improve everyday execution while preserving the basic process structure."
                )
              ],

              [
                "Imagine reception employees receiving better instructions and scanning identification documents more efficiently during each guest arrival.",
                null
              ],

              [
                "The process remains recognisable, but employees perform its existing activities more consistently and with fewer mistakes.",
                dg(
                  "Improving existing steps",
                  D.flow([
                    "Guest arrives",
                    "ID checked",
                    "Booking checked",
                    "+Key issued"
                  ]),
                  "Improvement makes the existing check-in activities more efficient without fundamentally changing their sequence."
                )
              ],

              [
                "The slides associate this approach with indicative gains of five to fifteen percent and relatively low risk.",
                null
              ],

              [
                "It makes sense when the process is fundamentally sound, but inconsistent execution creates avoidable problems.",
                st(
                  "Improving existing steps is appropriate when the underlying process works and everyday execution needs strengthening."
                )
              ],

              [
                "However, faster identification scanning cannot eliminate a long wait caused by disconnected corporate rate approvals.",
                null
              ],

              [
                "That limitation suggests a more ambitious approach, which involves redesigning how activities connect across the workflow.",
                it(
                  2,
                  3,
                  "route",
                  "Redesign the workflow",
                  "Change the sequence, handoffs, or responsibilities that create waiting and repeated work."
                )
              ],

              [
                "Workflow means the connected sequence through which activities and information move between people, departments, and systems.",
                null
              ],

              [
                "At Qasr, redesign could move corporate rate confirmation to booking and collect guest information before arrival.",
                dg(
                  "Redesigning the workflow",
                  D.flow([
                    "Booking",
                    "Rate approved",
                    "Details collected",
                    "Guest arrives",
                    "+Room assigned"
                  ]),
                  "The redesigned workflow moves important checks before arrival so the guest avoids unnecessary waiting at reception."
                )
              ],

              [
                "This approach changes the connections between activities, rather than merely asking employees to perform each activity faster.",
                null
              ],

              [
                "The slides associate workflow redesign with indicative gains of twenty to fifty percent and medium risk.",
                st(
                  "Workflow redesign is appropriate when handoffs, waiting, and repeated work are major causes of poor performance."
                )
              ],

              [
                "But there is an even more challenging possibility, which begins by questioning the service experience itself.",
                null
              ],

              [
                "What if most guests did not need to visit the reception desk before entering their rooms?",
                q(
                  "Could Qasr deliver the guest's desired outcome without requiring conventional check-in?"
                )
              ],

              [
                "This is the most ambitious level, where an organisation rethinks the service rather than preserving its traditional structure.",
                it(
                  3,
                  3,
                  "target",
                  "Rethink the service",
                  "Redesign the customer experience when the traditional process no longer matches customer needs."
                )
              ],

              [
                "Imagine a guest completing identification, payment, and booking checks before travelling to Qasr Marina.",
                null
              ],

              [
                "When the room becomes ready, the guest could use a phone to open the door without visiting reception.",
                dg(
                  "Rethinking the arrival experience",
                  D.flow([
                    "Pre-arrival checks",
                    "Room ready",
                    "Guest arrives",
                    "+Phone opens room"
                  ]),
                  "The rethought service allows eligible guests to reach their rooms without completing a conventional reception transaction."
                )
              ],

              [
                "The slides associate this level with indicative gains above fifty percent, but also with substantially higher risk.",
                null
              ],

              [
                "That risk matters because changing the customer experience can require new technology, responsibilities, and employee capabilities.",
                iss(
                  "A more ambitious service design requires greater coordination, investment, and organisational readiness.",
                  "Higher delivery risk"
                )
              ],

              [
                "These percentages describe general possibilities, not guaranteed results or promises about Qasr's eventual performance.",
                null
              ],

              [
                "The important lesson is that ambition must match the problem, because a larger change is not automatically better.",
                st(
                  "Choose the level of redesign according to the causes, expected benefits, and organisation's ability to deliver."
                )
              ],

              [
                "A small improvement may be sufficient when execution is inconsistent, while structural waiting may justify redesign.",
                null
              ],

              [
                "And when the traditional service no longer meets customer needs, rethinking the experience may create greater value.",
                null
              ],

              [
                "For Qasr, our next task is to design a future arrival journey before deciding which ambition is justified.",
                q(
                  "What would the arrival process look like if we designed it around the guest's outcome?"
                )
              ]

            ]
          },

          {
            title: "Designing Qasr's future arrival",
            sec: "O1c",

            lines: [

              [
                "Now let's return to Qasr Marina and imagine that you have joined the hotel's process redesign workshop.",
                t(
                  "Designing the to-be arrival",
                  "Start with the guest's desired result and remove unnecessary work."
                )
              ],

              [
                "The team has evidence about waiting and repeated checks, but it has not yet agreed on the future process.",
                null
              ],

              [
                "I want you to begin with one simple question: what is the guest actually trying to achieve?",
                q(
                  "Does the guest want to complete check-in transactions, or reach a ready room?"
                )
              ],

              [
                "The answer is reaching a ready room, because check-in activities are only means of delivering that outcome.",
                null
              ],

              [
                "That customer outcome becomes our design anchor, meaning the result against which proposed activities should be judged.",
                st(
                  "The design anchor is the customer outcome: reaching the correct room without unnecessary waiting."
                )
              ],

              [
                "Now imagine the guest receiving an invitation to provide required information before arriving at the hotel.",
                null
              ],

              [
                "Instead of repeating those details at reception, the information follows the booking through one shared record.",
                dg(
                  "One record follows the guest",
                  D.flow([
                    "Guest details",
                    "Shared booking",
                    "Rate confirmed",
                    "Room ready",
                    "+Guest settled"
                  ]),
                  "A shared booking record connects the checks required for arrival and reduces repeated information entry."
                )
              ],

              [
                "The revenue office confirms the agreed corporate rate automatically, removing the need for another approval at arrival.",
                null
              ],

              [
                "Housekeeping then uses the same record to identify a ready room, reducing uncertainty about room availability.",
                dg(
                  "Connecting the departments",
                  D.lanes(
                    [
                      "Guest",
                      "Revenue",
                      "Housekeeping",
                      "Front desk"
                    ],
                    [
                      [0, "Pre-register"],
                      [1, "Confirm rate"],
                      [2, "Ready room"],
                      [0, "Verify ID"],
                      [3, "Help if needed"]
                    ]
                  ),
                  "The proposed process connects pre-registration, rate confirmation, room readiness, and assistance across the participating groups."
                )
              ],

              [
                "When the guest arrives, a kiosk can verify identity while reception remains available for missing information.",
                null
              ],

              [
                "Notice that we have preserved necessary checks while changing when and how they are performed.",
                st(
                  "Redesign should preserve necessary controls while removing avoidable waiting, repetition, and unnecessary handoffs."
                )
              ],

              [
                "To improve this proposal, we can use five practical questions from the Week Nine slides.",
                null
              ],

              [
                "We begin by asking whether an existing activity is genuinely necessary or simply survives because of habit.",
                q(
                  "Does every activity in the existing arrival process still serve a necessary purpose?"
                )
              ],

              [
                "Imagine employees printing a booking confirmation that another system already stores and makes available electronically.",
                null
              ],

              [
                "If that printing serves no necessary purpose, removing it could simplify work without weakening the guest experience.",
                iss(
                  "An unnecessary paper confirmation duplicates information already available in the booking record.",
                  "Work without clear value"
                )
              ],

              [
                "We also need to consider whether the person performing each activity is the appropriate person for that responsibility.",
                null
              ],

              [
                "For example, reception should not need to negotiate a corporate rate that revenue already approved during booking.",
                cmp(
                  "a",
                  "Existing responsibility",
                  "Reception waits for rate confirmation during the guest's arrival."
                )
              ],

              [
                "Assigning rate confirmation to the appropriate earlier stage prevents reception from becoming a bottleneck.",
                cmp(
                  "b",
                  "Redesigned responsibility",
                  "Revenue confirms the agreed rate during booking, before the guest arrives."
                )
              ],

              [
                "Another useful question concerns timing, because some activities can happen before the customer needs the service.",
                null
              ],

              [
                "Collecting guest details before arrival moves work away from the busiest part of the customer's journey.",
                dg(
                  "Moving work before arrival",
                  D.flow([
                    "Pre-register",
                    "Verify booking",
                    "Guest arrives",
                    "+Room access"
                  ]),
                  "Moving appropriate checks before arrival reduces the activities that must be completed while the guest waits."
                )
              ],

              [
                "We should also examine repeated information, because entering the same details twice consumes time and creates errors.",
                null
              ],

              [
                "A shared record helps employees reuse verified information rather than repeatedly requesting it from the guest.",
                st(
                  "Shared information reduces duplicate work and helps departments coordinate the complete arrival process."
                )
              ],

              [
                "Finally, every proposed removal requires us to examine the real risk that would remain without that activity.",
                null
              ],

              [
                "Removing duplicate identification checks may be sensible, but removing legally required verification would create unacceptable risk.",
                iss(
                  "Necessary identity verification must remain effective even when repeated checks are removed.",
                  "Protect essential controls"
                )
              ],

              [
                "That distinction prevents us from confusing unnecessary work with safeguards that genuinely protect guests and the organisation.",
                null
              ],

              [
                "The result is a proposed arrival process with earlier checks, shared information, fewer handoffs, and human assistance.",
                dg(
                  "The proposed future arrival",
                  D.flow([
                    "Pre-arrival details",
                    "Rate confirmed",
                    "Ready room",
                    "Identity verified",
                    "+Guest settled"
                  ]),
                  "The proposed process coordinates information and essential checks around the guest's journey into a ready room."
                )
              ],

              [
                "But this design is still a proposal, because we have not demonstrated that every system and department can support it.",
                null
              ],

              [
                "We must also consider guests who cannot complete digital checks, since their experience matters just as much.",
                q(
                  "How should Qasr help guests when the proposed digital arrival route does not work?"
                )
              ],

              [
                "Those questions will shape our later lessons, where we compare designs and test whether ambitious changes are feasible.",
                null
              ],

              [
                "For now, remember that Innovate starts with the customer outcome and redesigns the work needed to deliver it.",
                st(
                  "A strong to-be process addresses root causes, protects necessary controls, and remains focused on customer value."
                )
              ]

            ]
          }

        ]
      },

      {
  id: "l2",
  title: "Choosing between competing designs",

  sections: [

    {
      title: "Comparing redesign alternatives",
      sec: "O2a",

      lines: [

        [
          "Welcome back to Qasr Marina, where our team has imagined a better arrival experience but faces a difficult decision.",
          t(
            "Week 9 · Lesson 2",
            "Choosing between competing process designs"
          )
        ],

        [
          "Several ideas could reduce waiting, yet the hotel cannot pursue every possibility with the same resources.",
          null
        ],

        [
          "The question now is not whether improvement is desirable, but which proposed design deserves the organisation's commitment.",
          q(
            "How can Qasr choose between designs that promise different benefits and require different commitments?"
          )
        ],

        [
          "Imagine the general manager listening as two teams explain their proposals for the future arrival process.",
          null
        ],

        [
          "One team wants to improve the existing check-in journey, while another proposes changing how guests reach their rooms.",
          cmp(
            "a",
            "Improve the existing journey",
            "Make the current arrival process faster and more reliable."
          )
        ],

        [
          "Both teams believe their proposals will help guests, but confidence alone cannot establish which option is preferable.",
          cmp(
            "b",
            "Redesign the arrival experience",
            "Change the process so many guests can avoid conventional reception."
          )
        ],

        [
          "We need a disciplined comparison that considers what each design achieves and what the organisation must contribute.",
          null
        ],

        [
          "The expected benefit is the improvement a design could deliver, such as reduced waiting or fewer repeated checks.",
          it(
            1,
            4,
            "target",
            "Expected benefit",
            "Estimate how much the proposed process could improve the customer experience and operational performance."
          )
        ],

        [
          "A design promising substantial time savings may appear attractive, especially when the current journey takes eighty-two minutes.",
          null
        ],

        [
          "However, projected benefits remain estimates until the organisation tests whether the redesigned process can actually deliver them.",
          st(
            "A projected improvement is a reason to investigate a design, not proof that its benefits will be achieved."
          )
        ],

        [
          "We must also consider cost, meaning the financial and organisational resources needed to develop and operate the proposed process.",
          null
        ],

        [
          "For Qasr, those resources might include system integration, employee training, equipment, and changes to departmental responsibilities.",
          it(
            2,
            4,
            "check",
            "Implementation cost",
            "Consider technology, training, coordination, and continuing operating requirements."
          )
        ],

        [
          "A cheaper proposal may be easier to approve, but low cost does not automatically make it the better investment.",
          null
        ],

        [
          "If it preserves the underlying causes of delay, the organisation may spend money without solving its central problem.",
          iss(
            "A low-cost improvement can become expensive when it preserves the causes of poor performance.",
            "The hidden cost of limited change"
          )
        ],

        [
          "Risk introduces another consideration, because a proposed design may depend on systems, partners, or capabilities that are uncertain.",
          null
        ],

        [
          "A radical redesign could offer greater benefits while creating serious difficulties if essential technology or coordination fails.",
          it(
            3,
            4,
            "route",
            "Delivery risk",
            "Identify dependencies, uncertainties, and consequences if the proposed process cannot operate as intended."
          )
        ],

        [
          "This does not mean avoiding ambitious change, because accepting carefully understood risk can sometimes create greater value.",
          null
        ],

        [
          "It means making the uncertainty visible before committing resources, rather than discovering critical obstacles during implementation.",
          st(
            "Good redesign decisions make uncertainty explicit instead of treating optimistic assumptions as established facts."
          )
        ],

        [
          "Time also matters, because guests experience today's delays while the organisation prepares tomorrow's solution.",
          null
        ],

        [
          "A proposal requiring fourteen months cannot deliver immediate relief, even if its eventual benefits are substantial.",
          it(
            4,
            4,
            "target",
            "Time to deliver",
            "Consider how long implementation requires and when customers can realistically experience the benefits."
          )
        ],

        [
          "Yet a faster option may create temporary systems or routines that become obstacles to a more valuable redesign.",
          null
        ],

        [
          "That possibility means we should examine the relationship between alternatives, not merely compare their individual completion dates.",
          q(
            "Could a quick improvement make the more ambitious redesign harder to achieve later?"
          )
        ],

        [
          "A useful comparison therefore connects expected benefit with cost, delivery risk, and the time required to achieve results.",
          null
        ],

        [
          "We should also test feasibility, meaning whether the organisation possesses or can obtain the capabilities needed for delivery.",
          st(
            "Feasibility asks whether the proposed benefits can realistically be delivered under the organisation's actual constraints."
          )
        ],

        [
          "For Qasr, the strongest option will not necessarily be the cheapest, fastest, or most technologically impressive.",
          null
        ],

        [
          "It will be the design whose expected value and practical requirements support a decision management can defend.",
          q(
            "Which design offers worthwhile benefits at a cost, risk, and delivery time Qasr can justify?"
          )
        ]

      ]
    },

    {
  title: "Qasr's two competing designs",
  sec: "O2b",
  lines: [
    ["Now picture the Qasr Marina management team sitting down with two concrete proposals for the hotel's arrival journey.",
      t("Qasr Marina · Two designs", "The Kiosk or the Arrival: faster check-in, or no check-in for most guests?")],
    ["Today a guest needs eighty-two minutes, on average, to get from the lobby into a room.",
      fm("Current average lobby-to-room time", "82", "minutes")],
    ["We use that same measure for both designs, because a fair comparison needs one shared starting point.", null],
    ["Design A, which the case calls improving check-in, keeps the front desk at the centre of arrival.",
      cmp("a", "Design A · Improve check-in", "Rate approval is requested automatically at booking, and a kiosk checks identity at arrival.")],
    ["It requests the corporate rate approval automatically at booking, so the forty-seven-minute approval wait disappears.", null],
    ["At arrival, a kiosk checks the guest's identity, and nobody has to type the same details again.", null],
    ["The team models a forty-four-minute average, rolled out to all fourteen hotels in eighteen weeks.",
      fm("Design A modelled journey", "44", "minutes")],
    ["Only one function has to change, which is why Design A can launch so much sooner.", null],
    ["That speed matters, because guests keep living with today's delays while any redesign is being prepared.", null],
    ["Design B, which the case calls making the desk optional, asks a bolder question about arrival itself.",
      cmp("b", "Design B · Make the desk optional", "Identity, payment, rate and room are ready before arrival, and the phone opens the door.")],
    ["Before the guest arrives, identity, payment, rate and room are all ready, so the phone can open the door.", null],
    ["The team expects seventy-four percent of guests to skip the desk and go straight to their rooms.",
      fm("Guests expected to skip the desk", "74", "percent")],
    ["Its modelled average is twenty-two minutes, but four functions must change over fourteen months.",
      fm("Design B modelled journey", "22", "minutes")],
    ["That longer timeline reflects how much more of the hotel must change together.", null],
    ["Now let's compare the two designs on the same measures, side by side.",
      dg("Projected journey times",
        D.bars(["Current", "Design A", "Design B"], [82, 44, 22], "minutes"),
        "Today's journey averages 82 minutes, against modelled averages of 44 minutes for Design A and 22 minutes for Design B.")],
    ["Design A saves thirty-eight minutes and launches sooner, while Design B saves sixty minutes but changes more teams and systems.", null],
    ["Notice something important here: both designs remove the forty-seven-minute rate-approval wait.",
      st("Both designs remove the 47-minute rate-approval wait; they differ in how much of the rest of the journey they change.")],
    ["Notice too that guest-facing service stays at eight point one minutes under both designs.", null],
    ["So neither design saves time by rushing the service; the savings come from removing waiting and rework.",
      st("Most of the time saved comes from less waiting and rework, not from rushing the guest-facing service.")],
    ["That tells you where the remaining difference between them comes from.", null],
    ["Under Design A, every guest still passes through the desk, so queues and handoffs at reception remain.",
      iss("Design A keeps every guest at the desk, so the remaining queueing and handoffs at reception stay in the process.", "What Design A leaves in place")],
    ["Under Design B, most guests never queue at all, which is where its extra twenty-two minutes come from.", null],
    ["But Design B carries tensions that the bare numbers hide, and the case names them clearly.", null],
    ["Twenty-six percent of guests would still need help at the desk, and seven of the nine objections concerned them.",
      iss("Seven of nine objections were about the 26% of guests who would still need desk help.", "The tension behind Design B")],
    ["Design B's system work also serves a new regulatory rule due in January, eleven months away.", null],
    ["That overlap could save effort, or it could add deadline risk if the rule's date cannot move.",
      q("Does sharing system work with the January rule save effort, or add deadline risk?")],
    ["These figures are modelled projections, not results, so each team must explain the assumptions behind them.",
      st("Modelled times are targets to be tested, not achieved results.")],
    ["Your job is to connect the numbers with what each design asks of the people and systems involved.",
      q("Which design would you defend if you were accountable for delivering its promised minutes?")]
  ]
},

    {
      title: "The quick-win trap",
      sec: "O2c",

      lines: [

        [
          "Let's return to the Qasr Marina meeting, where one manager has suggested a seemingly sensible compromise.",
          t(
            "The quick-win trap",
            "Can an improvement today make tomorrow's redesign harder?"
          )
        ],

        [
          "Why not implement Design A immediately, then move to Design B once the organisation feels ready?",
          null
        ],

        [
          "The suggestion sounds practical because guests need relief now, while the ambitious redesign requires considerable preparation.",
          q(
            "Could Qasr implement Design A now and still pursue Design B later?"
          )
        ],

        [
          "But before agreeing, I want you to examine what the hotel would actually be committing itself to.",
          null
        ],

        [
          "A quick win is an improvement that can be delivered relatively rapidly and demonstrates visible progress.",
          st(
            "A quick win provides an early, visible improvement without requiring the complete transformation to be finished."
          )
        ],

        [
          "Quick wins can build confidence, especially when employees and customers have become frustrated by persistent process problems.",
          null
        ],

        [
          "However, an early improvement becomes a trap when it makes a more valuable future design difficult to achieve.",
          iss(
            "An attractive short-term improvement can create commitments that obstruct the longer-term redesign.",
            "The quick-win trap"
          )
        ],

        [
          "Imagine Qasr investing in equipment and software designed specifically around the traditional reception workflow.",
          null
        ],

        [
          "If Design B later removes much of that workflow, some of the new investment may no longer be useful.",
          cmp(
            "a",
            "Design A investment",
            "New equipment and routines strengthen the existing reception-centred process."
          )
        ],

        [
          "That creates a potential sunk cost, meaning money already spent that cannot be recovered through a different decision.",
          null
        ],

        [
          "Managers may then resist changing direction because they feel obliged to justify the earlier expenditure.",
          st(
            "Money already spent should not determine the best future decision, but it can influence managerial behaviour."
          )
        ],

        [
          "Employees may also spend months learning new routines that become obsolete when the more ambitious design arrives.",
          null
        ],

        [
          "Repeated change can create fatigue, particularly when staff struggle to understand why yesterday's improvement is being replaced.",
          iss(
            "Repeated training and changing procedures can weaken employee confidence in the redesign programme.",
            "Change fatigue"
          )
        ],

        [
          "Technology creates another dependency, because systems selected for Design A might not integrate easily with Design B.",
          null
        ],

        [
          "Integration means different systems exchanging usable information reliably, so disconnected technology can preserve the very problem being addressed.",
          dg(
            "Technology dependency",
            D.flow([
              "Design A system",
              "Integration gap",
              "Design B needs",
              "+Extra rework"
            ]),
            "Technology chosen for an early improvement may create additional rework if it cannot support the later redesign."
          )
        ],

        [
          "Now consider management attention, which is limited even when the organisation has sufficient financial resources.",
          null
        ],

        [
          "Running two major changes consecutively could consume the same employees and decision makers needed for Design B.",
          st(
            "An early improvement has an opportunity cost when it consumes resources needed for a more valuable alternative."
          )
        ],

        [
          "Opportunity cost means the value of the alternative we sacrifice when choosing how to use limited resources.",
          null
        ],

        [
          "Yet rejecting Design A automatically would be equally careless, because some improvements could support the later transformation.",
          q(
            "Which parts of Design A would still be valuable if Qasr eventually implemented Design B?"
          )
        ],

        [
          "For example, cleaning inaccurate booking data could benefit both designs by improving the reliability of shared information.",
          null
        ],

        [
          "Training employees to handle unusual guest requests could also strengthen the human assistance required under Design B.",
          cmp(
            "b",
            "Reusable improvement",
            "Better booking data and stronger exception handling can support either future design."
          )
        ],

        [
          "These activities are different from purchasing technology that works only with the old reception-centred process.",
          null
        ],

        [
          "We should therefore distinguish improvements that prepare the organisation for transformation from investments that lock it into existing arrangements.",
          st(
            "A useful quick win strengthens future capabilities instead of making the preferred long-term design harder to deliver."
          )
        ],

        [
          "The team must also examine regulatory requirements, contracts, and system dependencies before promising a smooth transition.",
          null
        ],

        [
          "A design cannot be considered feasible if its necessary approvals or technology arrangements remain unresolved.",
          iss(
            "Unresolved regulatory, contractual, or technology dependencies can prevent the proposed future process from operating.",
            "Feasibility constraint"
          )
        ],

        [
          "Suppose Qasr chooses Design A because it values earlier relief and cannot yet support the more ambitious proposal.",
          null
        ],

        [
          "That can be defensible, provided management acknowledges the structural problems that may remain and the risks it accepts.",
          cmp(
            "a",
            "Choose Design A",
            "Gain earlier relief while accepting that some structural limitations may remain."
          )
        ],

        [
          "Alternatively, management might choose Design B because it values deeper redesign and can sustain the longer implementation effort.",
          cmp(
            "b",
            "Choose Design B",
            "Pursue greater transformation while accepting longer delivery and higher implementation uncertainty."
          )
        ],

        [
          "That decision also requires honesty about the longer wait for benefits and the consequences if critical dependencies fail.",
          null
        ],

        [
          "The central lesson is that a redesign choice involves accepting a particular risk, not discovering a risk-free option.",
          st(
            "A defensible redesign decision states both the expected benefit and the risk the organisation knowingly accepts."
          )
        ],

        [
          "As you prepare to make Qasr's decision, remember that ambition must be supported by evidence and organisational readiness.",
          null
        ],

        [
          "Our next lesson will explore how technology and operational constraints determine whether a promising design can actually work.",
          q(
            "What must Qasr prove before turning its preferred redesign into an operational reality?"
          )
        ]

      ]
    }

  ]
},

{
  id: "l3",
  title: "Making the future process workable",

  sections: [

    {
      title: "Technology that changes the process",
      sec: "O3a",

      lines: [

        [
          "Welcome back to Qasr Marina, where our proposed arrival redesign has raised an important question about technology.",
          t(
            "Week 9 · Lesson 3",
            "Making the future process workable"
          )
        ],

        [
          "We have imagined a smoother guest journey, but imagining a process is different from making it operational.",
          null
        ],

        [
          "Today, I want you to examine how technology can change the work itself rather than merely accelerate existing activities.",
          q(
            "Does technology improve a process simply by making its existing steps faster?"
          )
        ],

        [
          "Remember that Qasr's current arrival journey averages eighty-two minutes, although guest-facing service occupies only eight point one minutes.",
          null
        ],

        [
          "That difference matters because the largest opportunity lies in reducing waiting and unnecessary coordination between departments.",
          iss(
            "The current arrival journey contains substantial waiting beyond the guest-facing service itself.",
            "The redesign opportunity"
          )
        ],

        [
          "Imagine the reception manager proposing a faster computer for every employee working at the front desk.",
          null
        ],

        [
          "The computers might help, but they would not eliminate the corporate rate approvals that delay many guests.",
          cmp(
            "a",
            "Technology added to existing work",
            "Faster computers support the same approval-dependent arrival process."
          )
        ],

        [
          "A stronger proposal changes when the approval happens and how its result becomes available to other departments.",
          cmp(
            "b",
            "Technology enabling redesign",
            "Approved booking information becomes available before the guest arrives."
          )
        ],

        [
          "This distinction is central to technology-enabled redesign, where digital capabilities make a different process structure possible.",
          null
        ],

        [
          "Suppose Qasr creates a shared booking record that reception, revenue, and housekeeping can access when appropriate.",
          dg(
            "A shared booking record",
            D.flow([
              "Booking created",
              "Rate confirmed",
              "Room prepared",
              "+Guest arrives"
            ]),
            "Shared booking information allows departments to coordinate essential activities before the guest reaches reception."
          )
        ],

        [
          "A shared record reduces repeated information requests because employees can use details that another department has already verified.",
          null
        ],

        [
          "It also makes coordination easier, provided the information remains accurate and access follows appropriate security controls.",
          st(
            "Shared information creates value when it is accurate, accessible to authorised employees, and available when needed."
          )
        ],

        [
          "Now consider corporate rate approval, which has contributed substantially to Qasr's arrival delays.",
          null
        ],

        [
          "An automated approval rule could confirm an agreed rate when the booking satisfies conditions established by revenue management.",
          dg(
            "Automated rate confirmation",
            D.flow([
              "Corporate booking",
              "Check agreed terms",
              "Confirm rate",
              "+Update record"
            ]),
            "Automated confirmation can move routine corporate rate decisions away from the guest's arrival."
          )
        ],

        [
          "Automation means technology performs a defined activity without requiring an employee to repeat every routine decision.",
          null
        ],

        [
          "Unusual bookings would still need human review, because automation should not invent approval when agreed conditions are missing.",
          iss(
            "Unusual or incomplete bookings require a defined route for human review.",
            "Automation boundary"
          )
        ],

        [
          "The team then considers a kiosk, which allows guests to complete suitable arrival activities through a self-service interface.",
          null
        ],

        [
          "A kiosk can reduce pressure on reception, but it may preserve unnecessary checks if the underlying workflow remains unchanged.",
          cmp(
            "a",
            "Kiosk as an improvement",
            "Guests complete existing reception activities through a self-service interface."
          )
        ],

        [
          "That is why the more ambitious design considers completing appropriate checks before guests reach the hotel.",
          null
        ],

        [
          "With verified details and a ready room, eligible guests could receive mobile access without conventional reception.",
          cmp(
            "b",
            "Digital arrival as redesign",
            "Eligible guests complete appropriate checks earlier and proceed directly to their rooms."
          )
        ],

        [
          "Mobile room access changes the journey because the guest no longer needs a physical key transaction at reception.",
          null
        ],

        [
          "However, the technology must connect securely with room readiness, identity verification, and the hotel's access system.",
          dg(
            "Connected digital arrival",
            D.flow([
              "Guest verified",
              "Room ready",
              "Access enabled",
              "+Guest settled"
            ]),
            "Digital arrival requires verified guest information, confirmed room readiness, and reliable room access."
          )
        ],

        [
          "If any connection fails, the promised convenience disappears, so technology dependencies belong inside the process design.",
          null
        ],

        [
          "The important principle is that we should identify the desired workflow before deciding which technologies can support it.",
          st(
            "Design the work around customer value, then select technology that makes the redesigned process possible."
          )
        ],

        [
          "For Qasr, technology is valuable when it removes avoidable waiting while preserving necessary controls and personal assistance.",
          null
        ],

        [
          "Our next challenge is understanding what happens when real guests and organisational constraints disrupt this ideal journey.",
          q(
            "What happens when the technology works, but the guest's situation does not fit the standard process?"
          )
        ]

      ]
    },

    {
      title: "Constraints and exceptions",
      sec: "O3b",

      lines: [

        [
          "Let's imagine that Qasr Marina has demonstrated its proposed digital arrival journey to the management team.",
          t(
            "Constraints and exceptions",
            "A workable process must handle reality, not just ideal conditions."
          )
        ],

        [
          "The demonstration looks impressive because the guest completes the required checks and reaches a ready room without waiting.",
          null
        ],

        [
          "Then a reception supervisor asks what happens when the guest's identification cannot be verified electronically.",
          q(
            "What should happen when a guest cannot complete the proposed digital arrival journey?"
          )
        ],

        [
          "That question reveals an exception, meaning a situation that cannot follow the normal process without additional handling.",
          null
        ],

        [
          "Exceptions matter because a process that works only for straightforward cases may create serious difficulties during daily operations.",
          st(
            "An exception is a case requiring a different handling route because the normal process cannot proceed safely."
          )
        ],

        [
          "Imagine a guest arriving after a long flight with an identification document the system cannot recognise.",
          null
        ],

        [
          "The guest should not remain trapped in an unsuccessful digital check while employees assume the technology will resolve everything.",
          iss(
            "An unsuccessful digital verification must lead to timely human assistance.",
            "Guest exception"
          )
        ],

        [
          "A workable design gives reception clear responsibility for resolving the problem while preserving necessary identity controls.",
          null
        ],

        [
          "The alternative route is sometimes called a fallback, meaning a reliable way to continue when the preferred route fails.",
          dg(
            "Arrival with an exception",
            D.flow([
              "Digital check",
              "Problem detected",
              "Human assistance",
              "+Safe resolution"
            ]),
            "When digital verification cannot proceed, the process must provide a controlled route to human assistance."
          )
        ],

        [
          "Now consider the guests who require personal assistance even when the technology is functioning correctly.",
          null
        ],

        [
          "Qasr's case indicates that twenty-six percent of guests still need assistance, so this cannot be treated as negligible.",
          fm(
            "Guests requiring assistance",
            "26",
            "percent"
          )
        ],

        [
          "Some guests may have accessibility needs, while others may face language difficulties or complicated booking arrangements.",
          null
        ],

        [
          "The future process must therefore preserve a welcoming human route instead of assuming every guest prefers digital service.",
          st(
            "Customer-centred redesign preserves accessible assistance for guests who cannot or do not use the standard digital route."
          )
        ],

        [
          "Operational constraints create another challenge because departments may not share the same systems or decision-making responsibilities.",
          null
        ],

        [
          "Suppose housekeeping updates room readiness in one application while the mobile access system relies on another.",
          iss(
            "Disconnected room-readiness information can prevent a guest from receiving access at the appropriate time.",
            "System dependency"
          )
        ],

        [
          "If the information does not transfer reliably, a guest could receive access before the room is actually ready.",
          null
        ],

        [
          "That would replace a waiting problem with a service failure, which is hardly the improvement we intended.",
          dg(
            "Room-readiness dependency",
            D.flow([
              "Room prepared",
              "Status confirmed",
              "Access authorised",
              "+Guest enters"
            ]),
            "Mobile room access must depend on confirmed room readiness rather than an unsupported assumption."
          )
        ],

        [
          "We must also consider regulatory requirements, because a faster process cannot ignore mandatory verification or recordkeeping obligations.",
          null
        ],

        [
          "A regulatory constraint is a requirement imposed by applicable rules that limits how an activity may be redesigned.",
          st(
            "Necessary legal and regulatory controls remain part of the future process even when their execution changes."
          )
        ],

        [
          "Contractual obligations matter too, especially when Qasr depends on technology providers or agreed corporate booking arrangements.",
          null
        ],

        [
          "A contract may affect system access, data exchange, or implementation responsibilities, so these dependencies need early examination.",
          iss(
            "Contractual and technology dependencies can limit which redesign options are feasible.",
            "External constraint"
          )
        ],

        [
          "Employee capabilities introduce a different constraint, because a redesigned process may require unfamiliar skills and responsibilities.",
          null
        ],

        [
          "Reception employees might spend less time processing routine transactions and more time resolving complex guest situations.",
          cmp(
            "a",
            "Traditional reception role",
            "Employees repeatedly process routine arrival transactions."
          )
        ],

        [
          "That change can improve service, but only when employees receive appropriate training and authority to solve problems.",
          cmp(
            "b",
            "Redesigned reception role",
            "Employees concentrate on assistance, exceptions, and situations requiring judgement."
          )
        ],

        [
          "The fourteen-month implementation estimate for Design B also reminds us that ambitious change requires sustained organisational coordination.",
          null
        ],

        [
          "A shorter deadline cannot simply be declared without examining the work, resources, and dependencies needed for delivery.",
          st(
            "Implementation schedules must reflect the actual work and dependencies required to make the process operational."
          )
        ],

        [
          "Notice how these constraints affect the design itself rather than appearing only after management has approved it.",
          null
        ],

        [
          "We should therefore build exception handling, essential controls, and realistic responsibilities into the proposed future workflow.",
          q(
            "Can Qasr's redesigned arrival process remain safe and welcoming when the normal digital route fails?"
          )
        ],

        [
          "A strong design does not promise that exceptions disappear, because real organisations must operate under imperfect conditions.",
          null
        ],

        [
          "Instead, it makes those conditions manageable, which brings us to the importance of testing before implementation.",
          st(
            "A workable to-be process combines an efficient normal route with reliable handling of exceptions and constraints."
          )
        ]

      ]
    },

    {
      title: "Testing before implementation",
      sec: "O3c",

      lines: [

        [
          "Now imagine that Qasr Marina's redesign team believes it has created a convincing future arrival process.",
          t(
            "Testing the to-be process",
            "Challenge the proposed design before committing to implementation."
          )
        ],

        [
          "The diagrams look clear, the technology appears promising, and management can see how guests might experience less waiting.",
          null
        ],

        [
          "But a convincing diagram is not evidence that the process will work reliably under everyday operating conditions.",
          q(
            "How can Qasr discover weaknesses in its proposed process before guests experience them?"
          )
        ],

        [
          "The answer is to test the design against realistic situations, especially those that challenge its assumptions.",
          null
        ],

        [
          "Testing during Innovate means examining whether the proposed workflow can achieve its purpose before full implementation begins.",
          st(
            "Design testing checks whether the proposed process can work under realistic conditions and deliver its intended outcomes."
          )
        ],

        [
          "Let's begin with a straightforward guest whose booking details are correct and whose room becomes ready on time.",
          null
        ],

        [
          "The proposed digital journey should allow that guest to complete appropriate checks and reach the room efficiently.",
          dg(
            "Testing the normal journey",
            D.flow([
              "Booking verified",
              "Room ready",
              "Access enabled",
              "+Guest settled"
            ]),
            "The normal test checks whether the proposed process delivers a smooth arrival when its expected conditions are satisfied."
          )
        ],

        [
          "That successful example matters, but it tells us little about what happens when circumstances become more demanding.",
          null
        ],

        [
          "Now imagine several coaches arriving together while housekeeping is still preparing rooms for a large group.",
          q(
            "Will the proposed process remain reliable when many guests arrive at the same time?"
          )
        ],

        [
          "Peak demand means periods when the number of cases requiring service rises sharply above normal levels.",
          null
        ],

        [
          "A process designed around average demand may fail during these periods if its resources cannot handle concentrated arrivals.",
          iss(
            "Concentrated arrivals may overwhelm verification, room allocation, or guest assistance capacity.",
            "Peak-demand risk"
          )
        ],

        [
          "We should therefore examine whether room readiness updates, digital verification, and employee assistance remain coordinated under pressure.",
          null
        ],

        [
          "The test may reveal that an apparently automated process still depends on one overloaded employee resolving exceptions.",
          dg(
            "Testing operational capacity",
            D.flow([
              "Many arrivals",
              "Checks completed",
              "Exceptions routed",
              "+Rooms accessed"
            ]),
            "A peak-demand test examines whether the redesigned process can handle simultaneous arrivals and their exceptions."
          )
        ],

        [
          "Next, imagine a corporate guest whose agreed rate is missing from the shared booking record.",
          null
        ],

        [
          "The proposed workflow must explain who investigates the discrepancy and how the guest receives a timely resolution.",
          q(
            "Who owns the problem when the shared record contains incomplete or conflicting information?"
          )
        ],

        [
          "Ownership means clear responsibility for completing an activity or resolving a problem rather than leaving it between departments.",
          null
        ],

        [
          "Without ownership, shared technology can expose a problem while nobody accepts responsibility for fixing it.",
          iss(
            "An unresolved booking discrepancy can remain between departments when responsibility is unclear.",
            "Ownership gap"
          )
        ],

        [
          "That is why frontline employees should participate in design testing, because they understand situations that formal diagrams often overlook.",
          null
        ],

        [
          "Reception staff may recognise recurring guest difficulties, while housekeeping employees can explain how room readiness actually changes.",
          st(
            "Frontline knowledge helps reveal practical exceptions, hidden dependencies, and unrealistic assumptions in the proposed design."
          )
        ],

        [
          "Their involvement also helps build confidence because employees can challenge weaknesses before new responsibilities are imposed.",
          null
        ],

        [
          "Now consider the proportion of guests who need assistance, which Qasr's case places at twenty-six percent.",
          fm(
            "Guests requiring assistance",
            "26",
            "percent"
          )
        ],

        [
          "If the design assumes almost everyone can complete digital arrival independently, its staffing arrangements may be unrealistic.",
          null
        ],

        [
          "We should test how many employees are needed to support these guests without recreating long reception queues.",
          dg(
            "Testing the assistance route",
            D.flow([
              "Guest needs help",
              "Employee available",
              "Issue resolved",
              "+Guest settled"
            ]),
            "The assistance test examines whether guests requiring personal support can complete arrival without excessive waiting."
          )
        ],

        [
          "Testing should also examine failures in connected systems, because mobile access depends on accurate and timely information.",
          null
        ],

        [
          "If the access service becomes unavailable, the hotel needs a safe alternative that employees can activate quickly.",
          iss(
            "A technology failure must not leave guests without a safe and workable route to their rooms.",
            "Fallback requirement"
          )
        ],

        [
          "These tests may lead us to revise the workflow, adjust responsibilities, or reconsider whether the proposed ambition is feasible.",
          null
        ],

        [
          "That is a valuable result because discovering a weakness during design is preferable to discovering it during live operations.",
          st(
            "A failed design test creates useful evidence for improvement before the organisation commits to full implementation."
          )
        ],

        [
          "We should also remember that projected journey times remain targets until evidence demonstrates what the process can achieve.",
          null
        ],

        [
          "Testing can strengthen confidence in those targets, but it should never turn an unverified estimate into a claimed result.",
          cmp(
            "a",
            "Projected performance",
            "The design estimates what the future process might achieve."
          )
        ],

        [
          "As evidence accumulates, management can judge whether the expected benefits justify the cost, risk, and implementation effort.",
          cmp(
            "b",
            "Tested design",
            "Realistic scenarios provide evidence about feasibility and reveal remaining weaknesses."
          )
        ],

        [
          "Our goal is not to eliminate every uncertainty, because no complex organisational change can offer that guarantee.",
          null
        ],

        [
          "Instead, we want Qasr to understand its assumptions and prepare credible responses when actual conditions differ.",
          st(
            "A credible redesign is supported by realistic testing, clear responsibilities, and workable responses to failure."
          )
        ],

        [
          "In our final lesson, you will use this evidence to defend a redesign decision and prepare its handover.",
          q(
            "Which design should Qasr support, and what evidence would make that decision defensible?"
          )
        ]

      ]
    }

  ]
},

{
  id: "l4",
  title: "Making and defending the Innovate decision",

  sections: [

    {
  title: "Choosing the defensible design",
  sec: "O2d",
  lines: [
    ["Welcome to our final Week Nine lesson, where you help Qasr Marina turn two proposals into a decision it can defend.",
      t("Week 9 · Lesson 4", "Making and defending the Innovate decision")],
    ["Imagine the executive committee turning to you and asking which design the hotel should back, and why.",
      q("Would you choose A, B, or A followed by B, and what might that choice make harder later?")],
    ["Let's begin from the shared evidence, because every recommendation has to rest on the same measures.", null],
    ["Today's journey averages eighty-two minutes; Design A is modelled at forty-four, and Design B at twenty-two.",
      dg("Qasr's competing designs",
        D.bars(["Current", "Design A", "Design B"], [82, 44, 22], "minutes"),
        "The current journey averages 82 minutes, compared with modelled times of 44 minutes under Design A and 22 minutes under Design B.")],
    ["Both remove the forty-seven-minute approval wait, so the real choice concerns everything else each design changes.", null],
    ["Suppose the operations director argues for Design A, because guests across fourteen hotels would feel relief within eighteen weeks.",
      cmp("a", "Design A · Improve check-in", "Saves 38 minutes, changes one function, and reaches all 14 hotels in 18 weeks.")],
    ["That argument is strong when the organisation needs results soon and has limited capacity for change.", null],
    ["Choosing A, however, means accepting that every guest still queues at the desk for the remaining minutes.",
      iss("Choosing Design A accepts that every guest still passes through the desk.", "Risk accepted with Design A")],
    ["It may also make the later redesign harder to fund, because kiosks already bought create pressure to keep them.", null],
    ["Now imagine the transformation director arguing for Design B, which saves sixty minutes by making the desk optional.",
      cmp("b", "Design B · Make the desk optional", "Saves 60 minutes, but four functions change over 14 months.")],
    ["Choosing B means accepting a longer wait for benefits and more teams and systems changing at once.",
      iss("Choosing Design B accepts a longer delivery and four functions changing together.", "Risk accepted with Design B")],
    ["Two tensions deserve your careful attention before you settle on either design.", null],
    ["Seven of the nine objections concerned the twenty-six percent of guests who would still need desk help.",
      fm("Guests still needing desk help under Design B", "26", "percent")],
    ["Is that a genuine design flaw, or simply the most visible issue in the room?",
      q("Is the 26% a design flaw or just the most visible issue, and how could you check?")],
    ["You could check by testing whether the exception route can handle that volume during peak check-in.", null],
    ["The other tension is that Design B's system work also serves a January regulatory rule due in eleven months.",
      iss("Design B overlaps the January regulatory work, a date that cannot move.", "Deadline dependency")],
    ["That shared work could save effort, yet it ties an ambitious project to a deadline that cannot move.", null],
    ["So a defensible recommendation says what you would do early on to protect that date.", null],
    ["You might also consider A followed by B, though that path carries its own trap.", null],
    ["A staged route is defensible only if early steps build capabilities that Design B will reuse.",
      dg("Testing a staged approach",
        D.flow(["Shared booking data", "Trained exception staff", "Validate Design B", "+Desk optional"]),
        "A staged route is defensible when each early step builds something Design B will still need.")],
    ["Better shared booking data helps both designs, whereas equipment tied only to the desk may later become a burden.", null],
    ["Whichever option you choose, the case asks you to name the risk the organisation knowingly accepts.",
      st("A defensible recommendation states the chosen option, the evidence behind it, and the risk the organisation accepts.")],
    ["For example, you might support Design B on condition that the desk route is staffed for peak demand.", null],
    ["You would also make it conditional on a clear plan for meeting the January rule on time.",
      cmp("b", "Conditional recommendation", "Back Design B if the assistance route and the January deadline can both be secured.")],
    ["If those conditions cannot be met, Design A with reusable early steps may be the more responsible path.", null],
    ["Remember that the modelled minutes are targets, so your recommendation must not present them as results.",
      st("Modelled times remain targets until the new process has run and been measured.")],
    ["What matters is not choosing the boldest option, but defending your choice against the strongest alternative.",
      q("What would you tell Qasr's executives about the risk they must knowingly accept?")]
  ]
},

    {
  title: "The Innovate handover",
  sec: "O2e",
  lines: [
    ["Now imagine the committee accepting a design and asking what Innovate must hand over to the teams who come next.",
      t("The Innovate handover", "What Innovate gives the next teams, and why they need it.")],
    ["Approval alone cannot make a new arrival process work, so the design has to travel in a usable form.",
      q("What must Qasr hand over so the next teams can build and launch the new arrival?")],
    ["The handover contains five things, and each one serves a particular team later in the framework.", null],
    ["The heart of it is a step-by-step future process map showing how a guest moves through the new arrival.",
      dg("The standard route",
        D.flow(["Phone check-in", "ID verified", "Room ready", "+Guest in room"]),
        "The future map shows the standard route, where a guest checks in by phone and goes straight to the room.")],
    ["It must also show the other route, where a failed identity check sends the guest to reception for help.",
      dg("The exception route",
        D.flow(["Phone check-in", "ID check fails", "Reception helps", "+Guest in room"]),
        "The map also shows the exception route, where reception verifies the guest manually.")],
    ["The People and Develop phases use this map to define staff roles and build the new check-in steps.", null],
    ["Next comes a record of the options considered, comparing the kiosk and phone-based designs and their trade-offs.", null],
    ["Project leaders and decision-makers need it, because a choice they cannot trace is hard to support later.",
      st("Recording the rejected options lets decision-makers understand and defend the final choice.")],
    ["The third element is a measurable improvement target, and here the Qasr numbers matter.", null],
    ["Today the journey takes eighty-two minutes, and Design B is modelled at twenty-two.",
      fm("Today's lobby-to-room baseline", "82", "minutes")],
    ["The eighty-two minutes is the baseline, meaning the measured starting point, while twenty-two is only a target.",
      fm("Design B modelled target", "22", "minutes")],
    ["The Realize Value phase later uses that target to check whether the promised saving actually happens.", null],
    ["That is why the target must use the same lobby-to-room measure as today, or the comparison means nothing.",
      st("A target is only useful if it is measured the same way as the baseline.")],
    ["Otherwise the hotel could claim success by quietly measuring something easier.", null],
    ["Then the team sets out staff and technology requirements, such as training reception staff and connecting the hotel systems.", null],
    ["People and Develop use these requirements to prepare staff and plan the technology that must be built.",
      iss("If staff are unprepared or systems stay disconnected, the new arrival cannot work as designed.", "Requirements to resolve")],
    ["Finally, the handover lists the risks and a backup plan for when something goes wrong.", null],
    ["If digital identity checks fail, staff verify the guest manually, and that route must really work.", null],
    ["The Implement phase tests that backup before launch, so guests never discover its weaknesses for themselves.",
      st("The backup route is tested before launch, not after guests have been left stranded.")],
    ["Notice how every item answers a question someone downstream will ask, which is what makes a handover useful.", null],
    ["Clear ownership matters throughout, because a handover that names no one responsible can recreate the old delays.",
      iss("Unclear ownership can recreate delays even after the technology improves.", "Handover risk")],
    ["So a good handover shows both routes, names who is responsible, and gives teams a target to measure.",
      dg("From design toward delivery",
        D.flow(["Understand", "Innovate", "People and Develop", "Implement", "+Realize Value"]),
        "Innovate hands its design to People and Develop, then Implement, and finally Realize Value checks the promised saving.")],
    ["Remember that nothing here proves the design works yet; it prepares the organisation to find out.", null],
    ["Next week we move into the People phase, where roles, skills and everyday practice take shape.",
      st("Next week, the People phase turns the new design into roles, skills and everyday practice.")],
    ["In the forum, you will apply this reasoning to a different organisation facing the same kind of choice.", null],
    ["Your challenge is to defend a level of ambition while explaining why the safer alternative still has appeal.",
      q("Can you justify your preferred redesign while acknowledging the strongest argument against it?")]
  ]
}

  ]
},



    ]
  };

  // Plain-text script for tools that expect it.
  COURSE.lessons.forEach((l) =>
    l.sections.forEach((s) =>
      (s.script = s.lines.map((x) => x[0]).join(" "))
    )
  );

})();