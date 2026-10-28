/*
 * OPER621 Business Process Management
 * WEEK 3 — BPM Technology and Critical Success Factors
 * Prof. Bassem Jarboui | Hamdan Bin Mohammed Smart University
 *
 * SOURCES
 * Week 3 Session 1 slides (21 slides).
 * Week 3 Weekly Delivery Plan (Fall 2026).
 * Week 3 forum case: "The Suite That Nobody Opened".
 * Core reading: Jeston, Business Process Management:
 * Practical Guidelines to Successful Implementation,
 * 4th edition, Chapters 7 and 8.
 *
 * RUNNING CASES
 *
 * Qasr Hospitality Group / Qasr Marina:
 * "The Demonstration" — evaluating three BPM suite vendors.
 *
 * Noor Health Group:
 * "The Suite That Nobody Opened" — five private hospitals,
 * an AED 6.2 million BPM suite licence, 91 models developed
 * from a 2019 policy manual without clinician involvement,
 * an unused rules engine, an unintegrated dashboard, and
 * discharge time changing from 4.1 to 3.9 hours against
 * a promised 30% reduction.
 *
 * COURSE LEARNING OUTCOMES
 *
 * K2 — Evaluate various factors that impact on the successful
 *      implementation of BPM in public and private sector
 *      organizations.
 *
 * S2 — Integrate new technologies to manage organizational
 *      changes.
 *
 * WEEK 3 LEARNING OUTCOMES
 *
 * W3O1 — Evaluate the role of BPM technology in enabling,
 *         rather than determining, process design.
 *         Primary CLO: S2. Supporting CLO: K2.
 *
 * W3O2 — Assess the critical success and failure factors
 *         for BPM implementation.
 *         Primary CLO: K2. Supporting CLO: S2.
 *
 * W3O3 — Appraise selection criteria for a BPM suite,
 *         including the cost of change after go-live.
 *         Primary CLO: S2. Supporting CLO: K2.
 *
 * COURSE STRUCTURE
 *
 * LESSON w3l1 — The software that cannot fix a broken process
 *   W3O1a — A powerful tool, but whose process?
 *            Outcome W3O1 | CLO S2, K2 | Slides 1–4, 7, 21
 *   W3O1b — Inside the suite: from drawings to real work
 *            Outcome W3O1 | CLO S2, K2 | Slides 5–6, 21
 *
 * LESSON w3l2 — Why BPM programmes succeed or fail
 *   W3O2a — The people behind a successful process
 *            Outcome W3O2 | CLO K2, S2 | Slides 9–12, 21
 *   W3O2b — A promise needs a baseline and an owner
 *            Outcome W3O2 | CLO K2, S2 | Slides 10, 13–15
 *   W3O2c — Five ways a promising programme falls apart
 *            Outcome W3O2 | CLO K2, S2 | Slides 14–15, 21
 *
 * LESSON w3l3 — The demonstration that almost made the decision
 *   W3O3a — When a beautiful demonstration becomes the design
 *            Outcome W3O3 | CLO S2, K2 | Slides 7–8, 16–17, 19
 *   W3O3b — The cheapest system to buy may cost more to change
 *            Outcome W3O3 | CLO S2, K2 | Slides 8, 17–19
 *
 * LESSON w3l4 — Making the decision that will still work in four years
 *   W3O3c — What must happen before Qasr signs?
 *            Outcome W3O3 | CLO S2, K2 | Slides 7–8, 15, 17–19
 *   W3O2d — The suite nobody opened, and the lesson it leaves
 *            Outcome W3O2 | CLO K2, S2 | Slides 4–6, 10–15, 20–21
 *
 * IMPLEMENTATION
 *
 * Four lessons and nine assessed sections.
 * Every section has approximately 11 question-bank items.
 * Every section has exactly two remedial micro-lessons.
 * Each outcome is linked to its primary CLO in adaptive-week.js.
 * Both K2 and S2 are supported throughout the teaching.
 *
 * WRITING RULE — PROF. JARBOUI
 *
 * Write for human brains, not AI.
 *
 * Narration is one continuous story told by one warm teacher
 * speaking directly to one student.
 *
 * Every sentence is complete, natural connected speech.
 * Every important idea has a reason and a practical consequence.
 * Every new term is defined naturally when introduced.
 * Every abstract idea is connected to a concrete example.
 *
 * Spoken narration contains no lists, enumerations, arrows,
 * bullet characters, or ordinal sequencing language.
 * The forbidden spoken words are "first", "second", and "third".
 *
 * Sentences should average 15–18 words.
 * No spoken sentence exceeds 30 words.
 * No spoken sentence contains fewer than 6 words.
 *
 * Each assessed section contains 430–570 spoken words.
 * Each remedial micro-lesson contains 230–360 spoken words.
 *
 * Every section is a list of [spoken sentence, visual moment].
 * A null moment keeps the previous picture visible.
 * A new visual moment appears every 1–3 spoken sentences.
 *
 * Visual moments use only the Week 1 helpers:
 * t, it, q, st, iss, cmp, dg, fm.
 *
 * Diagrams use only existing window.DIAG functions:
 * flow, lanes, hier, stairs, org, bars, route, cycle.
 *
 * Diagram boxes may contain short labels.
 * Every diagram has a full-sentence explanatory caption.
 *
 * The running Qasr Marina story provides continuity with Week 1.
 * Noor Health provides a contrasting healthcare application.
 *
 * The forum case is introduced without giving students
 * a ready-made answer to their discussion question.
 *
 * The sec property links each assessed section to its
 * corresponding question-bank section in adaptive-week.js.
 *
 * This file preserves the Week 1 COURSE structure, helper names,
 * MOMENT_KIT interface, and script-generation convention.
 */

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
    id: "oper621-w3",
    code: "OPER621",
    title: "BPM Technology and Critical Success Factors",
    subtitle: "Business Process Management · Week 3",
    author: "Prof. Bassem Jarboui",
    teacher: {
      name: "Prof. Bassem Jarboui",
      email: "",
      sendReport: false
    },

    lessons: [

      {
          id: "w3l1",
          title: "The software that cannot fix a broken process",
          sections: [
            {
              title: "A powerful tool, but whose process?",
              sec: "W3O1a",
              lines: [
                [
                  "Welcome back to Business Process Management, where our journey through Qasr Marina now takes an interesting turn.",
                  t(
                    "OPER621 · Week 3",
                    "BPM Technology and Critical Success Factors"
                  )
                ],
                [
                  "You may remember our exhausted traveller, who waited at reception although everyone seemed to be doing their jobs.",
                  null
                ],
                [
                  "Her booking information was scattered across departments, and the room she eventually received was not ready.",
                  dg(
                    "Remember the guest's journey",
                    D.flow([
                      "Guest|arrives",
                      "!Booking|confusion",
                      "!Repeated|checks",
                      "!Room not|ready"
                    ]),
                    "The guest's arrival became difficult because disconnected activities stopped the hotel from delivering a ready room smoothly."
                  )
                ],
                [
                  "Now imagine Qasr's general manager deciding that technology should solve this embarrassing problem once and for all.",
                  null
                ],
                [
                  "A software vendor arrives with an impressive demonstration showing guests checking into their rooms using mobile phones.",
                  t(
                    "The tempting solution",
                    "A polished mobile check-in demonstration seems to solve Qasr Marina's frustrating arrival experience."
                  )
                ],
                [
                  "The screens look beautiful, the movements appear effortless, and everyone begins imagining happier guests.",
                  null
                ],
                [
                  "But I want you to pause before that excitement turns into a purchasing decision.",
                  q(
                    "Does a beautiful demonstration prove that the hotel's process has been fixed?"
                  )
                ],
                [
                  "Remember that our guest suffered because departments could not share the information needed to serve her.",
                  null
                ],
                [
                  "A mobile screen cannot repair those broken connections, because it only makes the existing activities happen faster.",
                  iss(
                    "The screen improves, but the disconnected process underneath stays exactly the same.",
                    "A faster broken process"
                  )
                ],
                [
                  "This brings us to something important about Business Process Management, which we usually call BPM for short.",
                  null
                ],
                [
                  "BPM is a management discipline, meaning a continuing way of taking responsibility for how processes perform and improve.",
                  cmp(
                    "a",
                    "What BPM is",
                    "A management discipline: people own, measure and keep improving the process."
                  )
                ],
                [
                  "The software that supports this discipline is called a Business Process Management Suite, or BPMS.",
                  null
                ],
                [
                  "A BPMS helps people carry out the agreed work and watch how well it is going.",
                  cmp(
                    "b",
                    "What a BPMS is",
                    "Software that supports the process the organisation has chosen to run."
                  )
                ],
                [
                  "But software cannot decide which customer outcome matters most, or which existing activities should disappear altogether.",
                  st(
                    "A BPMS enables BPM; it does not constitute it, and it cannot repair a process nobody has understood."
                  )
                ],
                [
                  "Consider the receptionist who retypes guest details because reservations and revenue keep separate records.",
                  null
                ],
                [
                  "Automating that retyping might speed up data entry while keeping the very duplication that caused the frustration.",
                  dg(
                    "Automation without redesign",
                    D.flow([
                      "Booking|received",
                      "!Duplicate|entry",
                      "!Another|check",
                      "Key|issued"
                    ]),
                    "Automating the existing sequence keeps the duplicate work instead of removing the reason it exists."
                  )
                ],
                [
                  "In other words, a broken process that gets automated simply breaks faster, and the breakage becomes harder to see.",
                  null
                ],
                [
                  "The hotel would have bought speed without improving the experience that justified spending the money.",
                  st(
                    "Automating a broken process makes the breakage faster and harder to see."
                  )
                ],
                [
                  "This is why understanding the process must come before technology, even when a demonstration looks convincing.",
                  null
                ],
                [
                  "Our course framework places Understand, where we study today's work, before Innovate, where we design a better process.",
                  dg(
                    "Where technology belongs",
                    D.route([3, 4, 6]),
                    "The framework places Understand and Innovate before Develop, so technology supports a process design that already exists."
                  )
                ],
                [
                  "Develop is the seventh phase, and that is where technology should enter, because it can then support decisions already made.",
                  null
                ],
                [
                  "In practice, though, technology usually enters at Strategy, the very beginning of the framework, before anyone has studied the work.",
                  iss(
                    "The tool is chosen at Strategy, phase one, before the process is understood.",
                    "Technology in the wrong phase"
                  )
                ],
                [
                  "When that happens, the tool's built-in model quietly becomes the future process, and nobody ever actually decided that.",
                  null
                ],
                [
                  "Imagine Qasr choosing its software before anyone agrees how corporate rates should be confirmed during check-in.",
                  q(
                    "Who is really designing Qasr's check-in if the software is chosen before the process?"
                  )
                ],
                [
                  "The vendor's demonstration would become the hotel's design, so the supplier would be making management decisions without accountability.",
                  null
                ],
                [
                  "Now consider Noor Health Group, which bought an expensive BPM suite licence for its five private hospitals.",
                  t(
                    "A warning from healthcare",
                    "Noor Health Group bought a BPM suite licence costing AED 6.2 million."
                  )
                ],
                [
                  "Its analysts produced ninety-one process models from a 2019 policy manual, without involving the clinicians who do the work.",
                  null
                ],
                [
                  "Those diagrams describe written instructions, so they may miss what patients and clinical teams actually experience every day.",
                  dg(
                    "A model without its users",
                    D.flow([
                      "2019 policy|manual",
                      "Analysts|model",
                      "91 process|models",
                      "!Clinicians|excluded"
                    ]),
                    "Noor Health's models were drawn from a policy manual without the clinicians who understand daily clinical practice."
                  )
                ],
                [
                  "That raises a difficult question about whether documenting instructions is the same as understanding reality.",
                  q(
                    "Can a process model be accurate when the people doing the work were never asked?"
                  )
                ],
                [
                  "Technology becomes valuable when it supports a process that people understand, accept and can keep improving.",
                  null
                ],
                [
                  "Without that foundation, an impressive system may simply hide old problems behind a more sophisticated screen.",
                  st(
                    "Technology is an enabler, never the programme: it supports a design that people must create."
                  )
                ],
                [
                  "Keep that thought in mind as we open the suite itself and see what its parts actually do.",
                  null
                ]
              ]
            },
            {
              title: "Inside the suite: from drawings to real work",
              sec: "W3O1b",
              lines: [
                [
                  "Now let's imagine Qasr's technology team opening the BPM suite that the vendor has been demonstrating.",
                  t(
                    "Inside a BPM suite",
                    "A BPM suite is built from five layers, and each layer solves a different problem."
                  )
                ],
                [
                  "Each layer solves a different problem, so knowing them helps us judge what Qasr actually needs.",
                  st(
                    "Five layers. Organisations routinely buy all five and use only the modelling layer."
                  )
                ],
                [
                  "Picture our traveller at reception again, while the employee searches for her corporate reservation.",
                  null
                ],
                [
                  "The hotel's managers need one shared picture of how every department contributes to her arrival.",
                  dg(
                    "Seeing the complete process",
                    D.flow([
                      "Reservation",
                      "Corporate|rate",
                      "Room|readiness",
                      "+Guest|settled"
                    ]),
                    "The process model shows how several activities must connect before the guest reaches the correct room."
                  )
                ],
                [
                  "The modelling layer provides that picture, so the process lives in a current, shared model rather than someone's drawer.",
                  null
                ],
                [
                  "It can capture today's process, which we call the as-is, and the improved one, which we call the to-be.",
                  cmp(
                    "a",
                    "Modelling",
                    "Captures and publishes the as-is and to-be process as a shared, current picture."
                  )
                ],
                [
                  "But a drawing does not guarantee that employees will follow it when the hotel becomes busy.",
                  null
                ],
                [
                  "That is the job of the execution layer, often called workflow, which routes each task to the right person.",
                  cmp(
                    "b",
                    "Execution and workflow",
                    "Routes work and enforces the sequence, so the standard is what actually happens."
                  )
                ],
                [
                  "Because the sequence is enforced, the agreed standard becomes what actually happens, not just what the manual says.",
                  null
                ],
                [
                  "At Qasr, workflow could send a corporate booking that needs approval straight to the revenue team.",
                  dg(
                    "Coordinating the work",
                    D.lanes(
                      ["Reception", "Revenue", "Housekeeping"],
                      [
                        [0, "Request"],
                        [1, "Approve"],
                        [2, "Release"],
                        [0, "Complete"]
                      ]
                    ),
                    "Workflow passes each request to the team responsible for the next action, so nothing depends on memory."
                  )
                ],
                [
                  "Coordinating tasks still leaves the decisions that employees make inside those tasks.",
                  q(
                    "How can the hotel change its rate decisions without rebuilding the whole application?"
                  )
                ],
                [
                  "Suppose Qasr's corporate rates depend on the contract, the travel dates and the room category.",
                  null
                ],
                [
                  "A business rules engine holds that decision logic outside the program code, meaning the conditions that decide what happens.",
                  dg(
                    "Keeping decisions manageable",
                    D.flow([
                      "Corporate|booking",
                      "Rate|rules",
                      "Applicable|rate",
                      "+Confirmed|booking"
                    ]),
                    "The rules engine applies the current rate conditions, which are kept outside the application code."
                  )
                ],
                [
                  "So when a contract changes, authorised staff can update the rule without waiting for a new software release.",
                  null
                ],
                [
                  "That matters because hotel contracts change often, and yesterday's valid rate can become tomorrow's costly mistake.",
                  st(
                    "With a rules engine, decision logic can change without a code release."
                  )
                ],
                [
                  "Yet even a good rule fails when the information it needs is trapped in another system.",
                  iss(
                    "The correct rule exists, but the information needed to apply it sits in another system.",
                    "Disconnected information"
                  )
                ],
                [
                  "The integration layer solves this by connecting the systems that a single process has to cross.",
                  null
                ],
                [
                  "You may hear the term API, short for application programming interface, which lets two systems exchange information.",
                  st(
                    "Integration and APIs connect the systems that one process crosses."
                  )
                ],
                [
                  "With integration, the process can cross systems as easily as it already crosses departments.",
                  null
                ],
                [
                  "The receptionist would then see the booking, the agreed rate and the room status on one screen.",
                  dg(
                    "Connecting the hotel's systems",
                    D.flow([
                      "Booking|system",
                      "Rate|system",
                      "Room|system",
                      "+Check-in|view"
                    ]),
                    "Integration brings information from separate hotel systems into one connected check-in view."
                  )
                ],
                [
                  "But even a connected process needs someone watching whether guests are actually served better.",
                  null
                ],
                [
                  "That is the role of the monitoring layer, which shows performance while the work is still running.",
                  t(
                    "From operating to managing",
                    "Monitoring makes cycle time and exceptions visible while work is running, not in a monthly report."
                  )
                ],
                [
                  "It measures cycle time, meaning the time from a process starting until its result is delivered.",
                  null
                ],
                [
                  "It also flags exceptions, meaning cases that break the normal pattern, such as a guest waiting unusually long.",
                  dg(
                    "Watching the whole journey",
                    D.flow([
                      "Guest|arrives",
                      "Booking|checked",
                      "!Delay|detected",
                      "Guest|settled"
                    ]),
                    "Monitoring reveals a delay during check-in instead of leaving managers to learn about it from complaints."
                  )
                ],
                [
                  "A manager can act on that delay today, instead of discovering the pattern in next month's report.",
                  null
                ],
                [
                  "This is why monitoring is the layer that turns a finished project into everyday management.",
                  st(
                    "The monitoring layer is what turns a project into management."
                  )
                ],
                [
                  "Sadly, it is also the layer that organisations most often postpone until some later date.",
                  iss(
                    "Monitoring is postponed, so nobody can see whether the new process performs.",
                    "The layer most often deferred"
                  )
                ],
                [
                  "Now return to Noor Health, which bought every layer but used far less than it paid for.",
                  null
                ],
                [
                  "Its rules engine was never used, and its dashboard was never connected to the hospital information system.",
                  iss(
                    "The rules engine sat unused, and the dashboard was never connected to the hospital system.",
                    "Layers bought but not used"
                  )
                ],
                [
                  "That pattern is common, because organisations routinely buy all five layers and then use only the modelling one.",
                  null
                ],
                [
                  "Noor's average discharge time moved from 4.1 to 3.9 hours, against a promised thirty percent reduction.",
                  fm(
                    "Observed reduction, about 4.9% against a promised 30%",
                    "4.1 − 3.9",
                    "4.1"
                  )
                ],
                [
                  "This does not explain every cause, but it challenges any claim that buying the suite delivered the improvement.",
                  null
                ],
                [
                  "So remember that modelling describes the work, while the other four layers help people run it and manage it.",
                  st(
                    "A BPM suite creates value only when its layers support a process that delivers measurable outcomes."
                  )
                ],
                [
                  "That leads us to a deeper question about why some organisations succeed with technology while others struggle.",
                  q(
                    "If powerful technology is available, what actually decides whether a BPM programme succeeds?"
                  )
                ]
              ]
            }
          ]
        },
{
          id: "w3l2",
          title: "Why BPM programmes succeed or fail",
          sections: [
            {
              title: "The people behind a successful process",
              sec: "W3O2a",
              lines: [
                ["We have seen what a BPM suite can do, but something important remains outside the software.", t("Lesson 2", "Why BPM programmes succeed or fail")],
                ["Imagine Qasr Marina has purchased its preferred system, and the installation has gone exactly as planned.", null],
                ["The screens work beautifully, yet our traveller still waits because departments keep protecting their separate routines.", iss("The technology works, but the departments continue behaving as separate organisations.", "Installation is not adoption")],
                ["This is where critical success factors matter, meaning the conditions that most strongly decide whether a programme delivers.", null],
                ["They fall into three families, which we call leadership, people and method, and very little of it is technical.", st("Success factors cluster around leadership, people and method. Very little of it is technical.")],
                ["Let's begin with leadership, because the other two families rarely survive without it.", null],
                ["Consider Qasr's general manager, who approved the investment with enthusiasm but rarely asks about it afterwards.", null],
                ["When reception and revenue disagree about responsibility, nobody senior is available to settle their competing priorities.", dg("The leadership gap", D.flow(["Executive|approval", "!Department|disagreement", "!Decision|delayed", "Guest|waits"]), "An executive can approve a BPM investment without providing the leadership needed to resolve implementation problems.")],
                ["What the hotel needs is executive sponsorship, meaning a senior leader who keeps actively backing the programme.", null],
                ["A real sponsor is visible, so staff hear the general manager asking about check-in in meetings someone else organised.", cmp("a", "Ceremonial sponsorship", "Approves the budget, delegates everything, and is absent when difficult decisions arise.")],
                ["That commitment must also be sustained, surviving the first bad month rather than fading after the launch event.", null],
                ["And the sponsor must be decisive, so problems escalated by the team are answered in days, not quarters.", cmp("b", "Active sponsorship", "Visible, sustained and decisive: escalated issues are answered in days, not quarters.")],
                ["A sponsor who delegates all of this has quietly withdrawn sponsorship, even if nobody ever says so aloud.", st("A sponsor who delegates everything has withdrawn sponsorship without saying so.")],
                ["Now we move to people, because leadership cannot personally coordinate every arrival across the hotel.", null],
                ["Qasr needs a process owner, meaning one person accountable for how the whole guest arrival performs.", st("A process owner is accountable for an end-to-end process across departmental boundaries.")],
                ["That owner needs real authority, protected time and proper training, yet usually receives only the title.", iss("The process has a named owner, but that person lacks the authority to change anything.", "Ownership without power")],
                ["Change management, meaning the work of helping people move to new ways of working, must start early.", null],
                ["It belongs in the first week of the programme, because starting at go-live leaves people no time to adjust.", dg("Building lasting capability", D.flow(["Week 1|involvement", "Practical|training", "Confident|adoption", "+Internal|capability"]), "Starting change early and building skills inside the organisation lets the process survive after the consultants leave.")],
                ["Qasr must also build skills internally, otherwise nobody can sustain the process after the consultants leave.", null],
                ["Now imagine a receptionist objecting that the new screen hides the corporate rate she needs during busy evenings.", q("Is this employee being difficult, or telling us something about the design?")],
                ["Resistance like hers is information about the design, not an obstacle that managers should simply overcome.", st("Resistance is information about the design, not an obstacle to be overcome.")],
                ["Think of Noor Health, whose analysts drew ninety-one models without asking the clinicians who perform the work.", null],
                ["Those clinicians could have shown where the old policy manual no longer matched what really happens on the wards.", iss("The people with the deepest process knowledge were never asked.", "Knowledge left outside")],
                ["Excluding them weakened both the accuracy of the models and the willingness of clinicians to use them.", null],
                ["Involving people early therefore improves the design and makes adoption far more likely, because they recognise their own experience.", dg("Knowledge from daily work", D.flow(["Front-line|insight", "Shared|redesign", "Recognised|solution", "+Willing|adoption"]), "Involving the people who do the work improves the design and builds commitment to it.")],
                ["So remember that the software can coordinate activities, but people decide whether those activities truly create value.", st("Technology enables the process, while leadership and people make it work.")]
              ]
            },
            {
              title: "A promise needs strategy, a baseline and an owner",
              sec: "W3O2b",
              lines: [
                ["Now imagine Qasr's steering committee celebrating the successful installation of its new BPM suite.", t("Method: from installation to results", "A technology project is not successful merely because the software has been installed.")],
                ["The project manager reports that every planned feature works, and the vendor has met its contract.", null],
                ["Yet our traveller still waits too long for a room, which leaves one uncomfortable question unanswered.", q("If the software works but the guest still waits, what exactly has improved?")],
                ["This brings us to the third family, method, which begins with linking every improvement to strategy.", null],
                ["Strategic alignment means that a process improvement clearly serves one of the organisation's declared strategic objectives.", st("Every process improvement must trace to a strategic objective, or it competes for budget with no defender.")],
                ["For Qasr, faster check-in serves its promise of reliable hospitality, so the work has a defender when budgets tighten.", null],
                ["An improvement that traces to no objective competes for money with nobody senior willing to defend it.", iss("The improvement links to no strategic objective, so nobody defends its budget.", "An orphan project")],
                ["Method also asks us to define benefits, meaning the measurable improvements an organisation expects to gain.", null],
                ["At Qasr, a meaningful benefit might be shorter time between a guest arriving and entering a ready room.", st("A benefit is a measurable improvement in outcomes, not a completed technical deliverable.")],
                ["Each benefit needs a baseline, meaning the starting measurement that later results are compared against.", null],
                ["And here timing matters greatly, because benefits must be defined, baselined and owned before the build begins.", dg("Benefits come first", D.flow(["Define|benefit", "Record|baseline", "Name|owner", "Build|begins"]), "Benefits are defined, baselined and owned before any build work starts.")],
                ["If a team says it will identify the benefits later, there will be no benefits case when someone needs it.", iss("'We will identify benefits later' means there is no benefits case when it is needed.", "Benefits left for later")],
                ["Imagine reception measuring arrival time while housekeeping measures readiness only after a room is assigned.", null],
                ["Both departments could report progress while nobody measures the complete wait the guest actually experiences.", iss("Departments measure separate activities, but nobody measures the guest's whole wait.", "A fragmented measure")],
                ["The process owner should therefore draw the measure around the customer outcome, not around departmental convenience.", null],
                ["Now consider Noor Health, where management promised that discharge time would fall by thirty percent.", null],
                ["The starting average was 4.1 hours, so the promise meant reaching roughly 2.87 hours on average.", st("Promise: a 30% cut from 4.1 hours, which means about 2.87 hours.")],
                ["Instead, the observed average became 3.9 hours, a drop of just two tenths of an hour.", fm("Observed reduction, about 4.9%", "4.1 − 3.9", "4.1")],
                ["Dividing that small gain by the starting time gives about 4.9 percent, far below the thirty percent promised.", cmp("a", "Promised", "About 2.87 hours, a 30% reduction.")],
                ["These figures show a serious gap, but on their own they cannot tell us every reason it happened.", cmp("b", "Observed", "3.9 hours, about a 4.9% reduction.")],
                ["This is why each benefit needs an owner who stays responsible after the software project closes.", null],
                ["Go-live, the moment a new system starts running in real work, marks a transition rather than a result.", dg("Beyond go-live", D.flow(["System|launched", "Employees|adopt", "Results|measured", "+Process|improved"]), "Launch begins real use, while adoption and measurement decide whether benefits are realised.")],
                ["Sustaining results requires governance, meaning the agreed arrangements for who decides, who measures and who acts.", null],
                ["That governance must be designed to outlive the project team, because the team disbands once the system is running.", st("Governance is designed to outlive the project team.")],
                ["Otherwise, the improvement quietly fades when managers change roles and departments drift back to familiar habits.", null],
                ["So a credible promise links to strategy, names its benefit early, and keeps someone governing it afterwards.", st("Measure success through sustained outcomes, not through software installation alone.")],
                ["Without those foundations, a perfect installation can still disappoint the very people it was meant to serve.", q("Can you name the strategic objective, the baseline and the owner behind your own organisation's last system?")]
              ]
            },
            {
              title: "Five ways a promising programme falls apart",
              sec: "W3O2c",
              lines: [
                ["We have explored the conditions behind success, so let's now see what happens when they are missing.", t("When promising programmes fail", "The common failure modes are predictable, which means they are preventable.")],
                ["There are five well-known failure patterns, and each has a visible sign and a deeper root cause.", null],
                ["Imagine walking into an office where a beautiful process model hangs on the screen, and nobody ever opens it.", iss("A model nobody opens.", "Shelfware")],
                ["Practitioners call this shelfware, because the work sits on a shelf like an unread book gathering dust.", null],
                ["Its root cause is modelling done for its own sake, with no owner who needs the model to manage anything.", st("Shelfware: a model nobody opens, because modelling was done for its own sake with no owner.")],
                ["Now return to Qasr, where managers are tempted to automate the existing check-in sequence exactly as it stands.", null],
                ["The receptionist's duplicate entries would happen automatically, yet the duplication itself would remain untouched.", dg("Automating the existing mess", D.flow(["Guest|arrives", "!Duplicate|records", "!Repeated|checks", "Key|issued"]), "Automation makes unnecessary activities faster without removing the weaknesses that created them.")],
                ["This is the automated mess, a faster bad process, and it happens when teams skip Understand and Innovate.", iss("A faster bad process, because Understand and Innovate were skipped.", "Automated mess")],
                ["Another pattern is the pilot that never scales, where one process improves beautifully and then nothing follows.", null],
                ["Imagine Qasr redesigning its check-in brilliantly, and then never touching housekeeping, billing or any other process.", dg("The pilot that never scales", D.flow(["One process|improved", "+Good|results", "!No architecture|or governance", "!Nothing|follows"]), "Without process architecture and governance, one success never spreads to the rest of the organisation.")],
                ["The root cause is missing process architecture, meaning a map of how all the organisation's processes fit together.", null],
                ["Without that map and without governance, nobody decides which process comes next, so momentum simply stops.", st("Pilot that never scales: one good process, then nothing, because there is no architecture and no governance.")],
                ["In a further pattern, benefits evaporate, which sounds dramatic but looks very ordinary in practice.", null],
                ["Managers claim savings in their reports, yet the budget stays exactly the same as it was before.", iss("Savings are claimed, but the budget is unchanged.", "Benefits evaporate")],
                ["This happens because there was no baseline, no owner and no agreed date on which results would be measured.", null],
                ["Think how this fits Noor, where nobody can show the promised savings from a thirty percent faster discharge.", st("Benefits evaporate: savings claimed, budget unchanged, because there is no baseline, owner or measurement date.")],
                ["The pattern managers fear most is rejection at go-live, which you recognise when workarounds appear within weeks of launch.", null],
                ["Imagine Noor's nurses keeping paper discharge lists because the new screens arrived without warning or preparation.", dg("Rejection at go-live", D.flow(["New|workflow", "!Late|preparation", "!Workarounds|appear", "!Low|adoption"]), "When change management starts too late, people protect their work with workarounds within weeks.")],
                ["Its root cause is change management that started too late, as we said, at go-live instead of week one.", iss("Workarounds within weeks, because change management started too late.", "Rejection at go-live")],
                ["Notice that every one of these failures traces back to a missing success factor rather than a technical accident.", null],
                ["Shelfware and evaporating benefits point to missing ownership, while the automated mess points to skipped method.", cmp("a", "What we see", "A visible failure pattern in the programme.")],
                ["The stalled pilot reveals missing governance, and rejection at go-live reveals people prepared far too late.", cmp("b", "What it reveals", "A missing success factor in leadership, people or method.")],
                ["So a visible failure is a symptom, and managers should look for the condition behind it before buying more technology.", dg("Diagnosing the underlying weakness", D.flow(["Visible|failure", "Investigate|cause", "Correct|condition", "+Sustain|improvement"]), "Managers should investigate the organisational cause before prescribing another technology solution.")],
                ["Because these patterns are so predictable, they are also preventable, which is really encouraging news for managers.", null],
                ["Now think about Noor Health and ask which patterns its own evidence seems to suggest.", q("Which failure patterns do Noor's unused rules engine and clinician-free models point towards, and what evidence would confirm it?")],
                ["Be careful not to invent causes the case never states, because a disappointing number is a reason to investigate.", st("A disappointing outcome calls for investigation, not proof of a particular cause.")],
                ["As we move toward choosing a vendor, keep these five patterns close, since a good product cannot prevent them alone.", null],
                ["The organisation itself must create the conditions in which people turn technology into lasting improvement.", st("Successful BPM depends on organisational readiness and continuing management, not on software capability alone.")]
              ]
            }
          ]
        },
{
          id: "w3l3",
          title: "The demonstration that almost made the decision",
          sections: [
            {
              title: "When a beautiful demonstration becomes the design",
              sec: "W3O3a",
              lines: [
                ["Let's return to Qasr Hospitality Group, where the steering committee must soon choose a BPM suite.", t("Lesson 3", "The demonstration that almost made the decision")],
                ["Three vendors have now demonstrated their suites, and a decision is due at the next steering meeting.", null],
                ["Everyone seems impressed, yet something important is missing from the conversation, and it could change the whole decision.", q("What happens when an organisation chooses its technology before agreeing how its future process should work?")],
                ["Let me introduce the three directors around the table, because each one sees the choice differently.", null],
                ["The IT director favours the suite with the strongest integration layer, meaning the best connections between existing systems.", it(1, 3, "⚙️", "IT director", "Favours the suite with the strongest integration layer.")],
                ["The operations director favours the suite whose demonstration showed a mobile check-in that looked exactly like what guests want.", it(2, 3, "🏨", "Operations director", "Favours the suite whose demo showed the mobile check-in guests seem to want.")],
                ["The finance director asks a different question, which is which suite Qasr could still change cheaply in four years.", it(3, 3, "💰", "Finance director", "Asks which suite Qasr can still change, cheaply, in four years.")],
                ["Each concern is legitimate, so the difficulty is not that anyone is wrong.", null],
                ["The difficulty is that the programme director notices something nobody else has mentioned in the meeting.", null],
                ["Neither director has yet written down the to-be process, meaning the improved way Qasr intends its work to happen.", iss("Nobody has written down the to-be process, so the demonstration is doing the design.", "The demonstration is doing the design")],
                ["Without that description, the demonstration is quietly doing the design, and the vendor is making Qasr's management decisions.", null],
                ["Think about that mobile check-in for a moment, because it looked smooth for a very particular reason.", null],
                ["The vendor chose a simple guest with a clean booking, a standard rate and a room that was already ready.", dg("The vendor's demonstration", D.flow(["Confirm|booking", "Assign|room", "Issue|digital key", "+Guest|settled"]), "The demonstration shows an ideal arrival, with none of the exceptions that troubled our traveller.")],
                ["Our traveller's real problem involved a corporate rate and a room that was not ready, which the demonstration never showed.", null],
                ["So Qasr should define its to-be process before selection, at least in outline, so the tool is judged against its own needs.", dg("Design before selection", D.flow(["Understand|today", "Outline|to-be", "Process|requirements", "Evaluate|vendors"]), "An outline of the to-be process lets Qasr judge each tool against its own needs rather than the vendor's script.")],
                ["That outline then produces process requirements, meaning the things the redesigned check-in must be able to do.", null],
                ["Vendors should be scored against those requirements, not against a long list of features they happen to offer.", cmp("a", "Feature-led scoring", "The suite with more features scores higher, whether or not Qasr's process needs them.")],
                ["A feature only creates value when it helps Qasr's guests or staff achieve something the process actually needs.", cmp("b", "Process-led scoring", "Each suite is scored on how well it supports the requirements of Qasr's to-be process.")],
                ["Now consider a vendor who proudly claims that its system fits Qasr's current process very closely.", null],
                ["That sounds reassuring until we remember that the current process is exactly what made our traveller wait.", q("When is fitting the current process a warning rather than a strength?")],
                ["A close fit to today's process can preserve the very activities that the redesign was supposed to remove.", null],
                ["So close fit is only a strength when the current process is already good, which at Qasr it clearly is not.", st("Fitting the current process is a warning when the current process is the problem you are trying to solve.")],
                ["The fair way to compare vendors is to test each one with Qasr's own hardest case, not the vendor's demonstration.", null],
                ["Imagine a corporate guest arriving early, on a negotiated rate, when the contracted room type is not yet ready.", dg("Test with your hardest case", D.flow(["Early|arrival", "Corporate|rate", "!Room not|ready", "+Guest|settled"]), "Qasr's own hardest case reveals far more about a suite than the vendor's ideal demonstration.")],
                ["Watching each suite handle that guest tells the committee far more than another flawless booking on a big screen.", null],
                ["Notice that we are not rejecting demonstrations, because they still reveal useful capabilities and limitations.", st("Use demonstrations to test an agreed process, not to substitute for designing it.")],
                ["We are simply changing their purpose from designing Qasr's process to testing whether a product can support it.", null],
                ["That shift protects Qasr from confusing attractive software behaviour with evidence of real improvement for guests.", q("What could a simple vendor score hide about the choice the committee is about to make?")]
              ]
            },
            {
              title: "The best fit today may cost the most to change",
              sec: "W3O3b",
              lines: [
                ["Now imagine the committee reading Exhibit 3, the vendor scoring table that was presented to Qasr's board.", t("Exhibit 3", "Vendor scoring as presented to the board. The numbers are the argument.")],
                ["The table looks reassuring, because it turns complicated differences into a few words that everyone can discuss.", null],
                ["But read it carefully before forming a view, because the numbers themselves carry the whole argument.", q("Which vendor does the table seem to favour, and which does it actually favour once you read every row?")],
                ["At first glance, Vendor B looks like the obvious winner, with the highest feature count of the three.", null],
                ["Vendor B also fits Qasr's current process closely, while the other two suites fit it only partially.", cmp("a", "Vendor B", "Highest features and a close fit to the current process.")],
                ["So if the committee simply counts strengths, Vendor B wins on features and on fit without much argument.", null],
                ["Now look at the row the finance director cares about, which shows the cost to change after go-live.", cmp("b", "Vendors A and C", "Low cost to change after go-live, no custom code, and staff trained in-house.")],
                ["Go-live is the moment a system starts running in real work, so every later change touches real guests.", null],
                ["Vendor B's cost to change is high, while Vendors A and C both keep that cost low.", iss("Vendor B wins on features and fit, but loses on the cost to change.", "High cost to change")],
                ["This matters because hotel contracts, rates and guest expectations will keep changing long after the purchase.", null],
                ["Notice too that Vendor B needs custom code for Qasr's rate rules, while A and C need none.", dg("Where custom code leads", D.flow(["Custom code|for rate rules", "Vendor|upgrade", "!Code must be|retested", "!Change becomes|expensive"]), "Custom code improves the fit today but makes every upgrade and rule change slower and costlier.")],
                ["Custom code means specially written software that bends the product to match how Qasr works today.", null],
                ["It explains why Vendor B fits so closely, but it also explains why changing it later costs so much.", st("Custom code buys today's fit at the price of tomorrow's flexibility.")],
                ["This is why we should always ask what happens at an upgrade to anything that has been customised.", null],
                ["An upgrade installs a newer version of the product, and every customised part may then need rebuilding and retesting.", iss("Each upgrade puts the custom rate-rule code at risk.", "The upgrade question")],
                ["Imagine Qasr negotiating a new corporate contract, so a rate rule must change within a few days.", null],
                ["With Vendors A or C, the hotel adjusts a supported setting, and its own trained staff can test the change.", dg("Changing a rate rule", D.flow(["New|contract", "Adjust|setting", "In-house|test", "+Rule|updated"]), "Without custom code, Qasr can change a rate rule using supported settings and its own staff.")],
                ["With Vendor B, the same change waits for vendor specialists, because only the vendor trains people afterwards.", null],
                ["That last row, staff trained in-house afterwards, quietly tells us who will really control the process.", st("With in-house training, Qasr's own people can change and sustain the process.")],
                ["If only the vendor holds the knowledge, every improvement Qasr wants becomes a purchase from someone else.", null],
                ["So the honest reading is that Vendor B wins on features and fit, and loses on cost to change.", st("Vendor B wins on features and fit, and loses on cost to change.")],
                ["Which criterion should dominate depends on whether Qasr's current process deserves to be preserved at all.", null],
                ["Because Qasr is redesigning check-in, a close fit to the old process is worth far less than freedom to change.", q("For Qasr, should fit to today's process or cost to change tomorrow dominate, and why?")],
                ["A useful rule from our slides says a tool that fits eighty percent and is adopted beats one that fits fully and is resisted.", null],
                ["Adoption matters more than perfect fit, because a perfectly fitting tool creates nothing if people work around it.", st("A tool that fits 80% and is adopted beats one that fits 100% and is resisted.")],
                ["Remember Noor Health, whose suite had impressive capabilities that nobody used, so the value never arrived.", null],
                ["That is why the strongest choice protects Qasr's ability to keep improving after the vendor has gone home.", iss("Purchased capabilities create little value when people cannot use or change them.", "Capability without benefit")],
                ["So read every row of a scoring table, and ask which one will still matter when the business changes.", st("Choose technology for the process you want to manage and the changes you must remain able to make.")]
              ]
            }
          ]
        },
{
          id: "w3l4",
          title: "Making the decision that will still work in four years",
          sections: [
            {
              title: "What must happen before Qasr signs?",
              sec: "W3O3c",
              lines: [
                ["We are back with Qasr's steering committee, where the decision is due at the next meeting.", t("Lesson 4", "Making the decision that will still work in four years")],
                ["The demonstrations are over, Exhibit 3 is on the table, and everyone expects a recommendation.", null],
                ["But imagine the programme director asking everyone to pause before anyone signs a contract.", q("What must Qasr be able to answer before it commits to any BPM suite?")],
                ["That pause matters, because reversing a badly chosen suite costs far more than taking one more careful week.", null],
                ["Our slides offer a readiness check, meaning a short set of questions that test whether the organisation can succeed.", st("Five readiness questions. A programme that cannot answer three of them will fail in a way this course can predict.")],
                ["It contains five questions, and a programme that cannot answer three of them will fail in predictable ways.", null],
                ["The committee should begin by naming the sponsor and the process owner, as real people rather than job titles.", dg("Responsibility beyond the purchase", D.flow(["Named|sponsor", "Named|process owner", "Employee|adoption", "+Measured|benefits"]), "Named people, not committees or titles, carry the programme from purchase to measured benefit.")],
                ["A name matters because a committee cannot be held accountable when guests keep waiting at reception.", null],
                ["Another question asks whether Qasr has a baseline, meaning a measurement of how the current process performs.", iss("Without a baseline, nobody will ever be able to prove the new suite improved anything.", "No starting point")],
                ["Without a recorded waiting time today, nobody can show next year whether the new suite actually helped.", null],
                ["The committee must also ask whether Qasr's maturity supports what it plans, meaning how well it already manages processes.", null],
                ["A hotel group that has never owned or measured a process may struggle to run sophisticated automation straight away.", cmp("a", "Ambition", "What Qasr plans to do with the suite.")],
                ["Then there is the plan for the people whose work changes, from receptionists to the revenue team.", cmp("b", "Readiness", "Whether Qasr's people, owners and measures can actually support that plan.")],
                ["Those employees need time, training and a voice in testing, or they will build workarounds within weeks.", null],
                ["The question most often forgotten asks who governs the process after the project closes.", q("Who governs Qasr's check-in process after the project team has gone?")],
                ["Governance means the agreed arrangements for who decides, measures and acts, and it must outlive the project team.", null],
                ["Beyond readiness, the committee needs evidence from Qasr's own hardest case, tested by the people who do the work.", dg("Testing the real process", D.lanes(["Reception", "Reservations", "Housekeeping"], [[0, "Guest arrives"], [1, "Rate confirmed"], [2, "Room checked"], [0, "Guest settled"]]), "Staff from each department test whether a suite handles the complete arrival, including the difficult cases.")],
                ["Imagine an early corporate guest whose contracted room type is not yet ready, watched by staff from each department.", null],
                ["Their practical knowledge matters because real guests bring exceptions that polished demonstrations rarely show.", st("Test with your own hardest case, not the vendor's demonstration.")],
                ["The finance director's concern about four years ahead also deserves a practical test rather than another optimistic promise.", null],
                ["So ask each vendor to show, live, how a changed rate rule would be made after go-live.", cmp("a", "Today's demonstration", "The vendor shows the process it chose to present.")],
                ["Go-live means the point when the system begins supporting real guests rather than remaining in development.", cmp("b", "Tomorrow's change", "The vendor shows the effort, cost and risk of changing a live rate rule.")],
                ["Watching who does the work, and how long it takes, tells Qasr more than any licence price or feature count.", null],
                ["It also exposes any custom code, because a customised rule is exactly where upgrades and changes become expensive.", st("Long-run value depends on how cheaply and safely the process can change after go-live.")],
                ["Only when these answers are clear can the programme director recommend a suite with honest confidence.", null],
                ["Qasr may still choose any of the three vendors, but the evidence must justify that choice openly.", dg("A decision grounded in evidence", D.flow(["Readiness|answered", "Hardest case|tested", "Change|demonstrated", "+Suite|chosen"]), "A defensible choice follows the readiness answers, a realistic test and a live change.")],
                ["The real achievement will not be a signed contract, but a better arrival experience that stays adaptable.", null],
                ["Keep that thought as we visit another organisation whose expensive suite produced a very different outcome.", t("A decision with lasting consequences", "Technology selection matters because its consequences continue long after the contract is signed.")]
              ]
            },
            {
              title: "The suite nobody opened, and the lesson it leaves",
              sec: "W3O2d",
              lines: [
                ["Our journey now takes us from Qasr Marina to Noor Health Group, which operates five private hospitals.", t("The Week 3 forum case", "The Suite That Nobody Opened")],
                ["This is a new organisation on purpose, because the forum tests whether you can transfer this week's ideas.", null],
                ["Noor invested AED 6.2 million in a BPM suite, expecting a major improvement in how quickly patients are discharged.", q("How can an organisation own powerful process technology without achieving the improvement it expected?")],
                ["During modelling, analysts created ninety-one diagrams from the hospital's 2019 policy manual.", null],
                ["The clinicians who actually discharge patients were never involved in building those models.", dg("The process on paper", D.flow(["2019 policy|manual", "Analysts|interpret", "91 process|models", "!Clinicians|excluded"]), "Noor's models came from policy documents, without the clinicians who perform the daily work.")],
                ["A policy manual describes intended procedures, so it may miss the difficulties that real patient care involves.", null],
                ["That gap matters, because discharge depends on clinical judgement and on many teams handing work to each other.", st("A process model must reflect how work actually happens, not only how written procedures describe it.")],
                ["This does not prove every model was wrong, but it gives us a serious reason to question them.", iss("The people with direct clinical experience were excluded from modelling their own work.", "Missing operational knowledge")],
                ["Now consider the technology, because Noor bought capabilities that never became part of daily work.", null],
                ["The rules engine was never used, and the dashboard was never connected to the hospital information system.", dg("Capabilities without connections", D.flow(["91 process|models", "!Unused rules|engine", "!Disconnected|dashboard", "Limited|operational use"]), "Noor owned modelling, rules and monitoring capabilities, but only the models were really used.")],
                ["A rules engine applies decision conditions automatically, while a dashboard shows managers how the process is performing.", null],
                ["Neither creates value when it sits outside the real process, however impressive it looked at purchase.", st("A purchased capability creates no benefit until it becomes part of everyday practice.")],
                ["The discharge figures make the gap between promise and result particularly visible.", null],
                ["Average discharge time began at 4.1 hours, and management promised a thirty percent reduction, to roughly 2.87 hours.", st("Promise: a 30% cut from 4.1 hours, which means about 2.87 hours.")],
                ["Instead, the reported average reached 3.9 hours, which is an improvement of only about 4.9 percent.", fm("Observed reduction, about 4.9%", "4.1 − 3.9", "4.1")],
                ["The gap is large, but we should resist claiming that one particular failure explains all of it.", null],
                ["A careful diagnosis separates what the case establishes from causes that still need investigation.", cmp("a", "What the case establishes", "The investment, the modelling approach, the unused capabilities and the disappointing result.")],
                ["We know clinicians were excluded, yet we cannot measure exactly how much that exclusion slowed discharge.", cmp("b", "What requires investigation", "How much each weakness actually contributed to the result.")],
                ["Responsible managers make this distinction before recommending another expensive intervention.", null],
                ["Now imagine advising Noor's leadership about what should matter most in its next technology decision.", q("Which selection criterion would best protect Noor from repeating this investment, and why?")],
                ["Any criterion can be defended, but only if you explain which risk in the evidence it addresses.", st("A strong recommendation links one criterion to case evidence and explains its consequences.")],
                ["That is the challenge waiting for you in this week's discussion forum.", null],
                ["Please post your own answer before reading your classmates' posts, so your thinking stays genuinely your own.", dg("Building an evidence-based argument", D.flow(["Case|evidence", "Your own|post", "Two substantive|replies", "+Respectful|disagreement"]), "Post your own view first, then engage two classmates, disagreeing with at least one.")],
                ["Support your position with Jeston's Chapters 7 and 8, because assertion without evidence earns no credit.", null],
                ["Then reply substantively to at least two classmates, and disagree with at least one of them.", st("Post first, reply to two, disagree with one, and cite the chapter.")],
                ["Honest disagreement matters, because it tests reasoning in a way that polite agreement never can.", null],
                ["Your forum contributions across the term count toward Assessment 4, which rewards participation.", st("Forum contributions across the term are what Assessment 4 (Participation) rewards.")],
                ["As we close, remember our traveller at Qasr Marina and the patients waiting for discharge at Noor.", null],
                ["Their experiences remind us that processes exist to deliver outcomes for real people.", t("The lesson that stays with us", "A BPMS enables BPM; it does not constitute it.")],
                ["Technology can make that work visible and measurable, but it cannot replace thoughtful management.", null],
                ["Next week we turn to organisational change, including resistance, the performance dip and what change management really does.", t("Next week", "Organisational change: resistance, the performance dip, and what change management actually does.")],
                ["Thank you for joining me this week, and I look forward to reading your reasoning in the forum.", null],
                ["Until we meet again, keep asking whose experience improves and whether that improvement can last.", t("Week 3 complete", "Look beyond the software. Understand the process. Protect the people it serves.")]
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