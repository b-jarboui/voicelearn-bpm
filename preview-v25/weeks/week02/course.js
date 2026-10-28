// OPER621 Business Process Management · Week 2 · Drivers and Triggers for BPM.
//
// SOURCES
// Week 2 Session 1 slides: week02-session1-slides.pptx, slides 1–22.
// Week 2 Weekly Delivery Plan: week02-delivery-plan.docx.
// Core reading identified by the sources: Jeston, Business Process Management,
// Practical Guidelines to Successful Implementation, 4th edition, Chapters 4–5.
// Production specification: week-production-brief.md.txt.
// Read-only structural references:
// week1-course.js.txt, week1-bank.js.txt, week1-adaptive.js.txt,
// week1-moments.js.txt, week1-diagrams.js.txt, week1-DESIGN.md.txt.
//
// OFFICIAL COURSE LEARNING OUTCOMES
// K1: Analyse the utilization of Business Process Management in today's
//     business environment.
// K2: Evaluate various factors that impact on the successful implementation
//     of BPM in public and private sector organizations.
//
// WEEK 2 LEARNING OUTCOMES
// W2O1: Distinguish the drivers of a BPM initiative from its triggers.
// W2O2: Evaluate why sustained performance decline can produce no action
//       while a single trigger produces a funded programme.
// W2O3: Articulate the purpose of a BPM programme in terms a board will accept.
//
// SESSION 1 OUTCOMES
// Identify drivers and triggers in an organisational narrative.
// Evaluate the risk when a programme is funded on one rationale but
// justified on another.
// Draft a statement of programme purpose.
//
// SESSION 2 OUTCOMES
// Apply the drivers-and-triggers distinction to an unfamiliar organisation.
// Justify a funding rationale and defend it against challenge.
//
// WEEK 2 COURSE PLAN
//
// Lesson w2l1: Why organisations finally act
//   W2O1a: Pressure builds before a programme begins.
//           W2O1 · K1, K2 · Slides 4–5, 18–19.
//   W2O1b: The event that changes everything.
//           W2O1, W2O2 · K1, K2 · Slides 5–6, 18–20.
//   W2O1c: Reading the real brief behind a trigger.
//           W2O1, W2O2 · K1, K2 · Slides 6–7.
//
// Lesson w2l2: Qasr Hospitality asks why now
//   W2O2a: Four pressures and one decisive event.
//           W2O1, W2O2 · K1, K2 · Slides 18–19.
//   W2O2b: The danger of two competing rationales.
//           W2O2, W2O3 · K1, K2 · Slides 18–20.
//   W2O2c: Writing a purpose the board can defend.
//           W2O3 · K1, K2 · Slides 16, 18–20.
//
// Lesson w2l3: Managing the complete business process
//   W2O3a: A process owner needs a real mandate.
//           W2O3 · K1, K2 · Slides 9, 14–15.
//   W2O3b: Measuring the customer's clock.
//           W2O3 · K1, K2 · Slides 10–12.
//   W2O3c: Keeping sponsorship and performance alive.
//           W2O2, W2O3 · K1, K2 · Slides 13, 15–16.
//
// Lesson w2l4: From a promising brief to a credible programme
//   W2O4a: Questions that expose an incomplete brief.
//           W2O2, W2O3 · K1, K2 · Slides 6–7, 16.
//   W2O4b: Making the board's business case coherent.
//           W2O2, W2O3 · K1, K2 · Slides 13, 18–20.
//   W2O4c: Applying the distinction beyond Qasr.
//           W2O1, W2O2, W2O3 · K1, K2 · Slides 20–22.
//           Session 2 delivery-plan outcomes.
//
// W2O1a–W2O4c are Week 2 section identifiers.
// W2O1–W2O3 are Week 2 learning-outcome identifiers.
// The additional W2O4 section group organises application and synthesis;
// it does not introduce a fourth official weekly learning outcome.
//
// The Week 2 forum is "Three Pressures, One Budget".
// Its separate case document was not supplied.
// Therefore, do not invent its organisation, figures, exhibit or answer.
// The final lesson will introduce the activity using only verified
// instructions from the delivery plan and slides.
//
// CONTENT AND WRITING RULES
//
// Each narrated part contains 430–570 spoken words.
// Each sentence contains between 6 and 30 words.
// Target an average sentence length between 15 and 18 words.
// Narration consists of natural, connected speech from one warm teacher
// addressing one student directly.
// Never read lists, numbered sequences or artificial enumerations aloud.
// Never begin a spoken sentence with "First,", "Second," or "Third,".
// Never place bullet characters or arrow symbols in spoken narration.
// Explain every important idea through its meaning, reason and consequence.
// Define unfamiliar terminology naturally, while the story develops.
// Use concrete examples without replacing the source's actual evidence.
// Do not invent Qasr facts, regulatory obligations or performance results.
// Distinguish the case's facts from hypothetical illustrations.
// Continue the Qasr Marina guest story wherever it strengthens learning.
// Keep the narration suitable for natural text-to-speech delivery.
//
// Each section stores [spoken sentence, visual moment] pairs.
// Use only existing moment types:
// title, item, question, statement, issue, compare, diagram, formula.
// Use only existing DIAG functions:
// flow, lanes, hier, stairs, org, bars, route, cycle.
// A visual moment may be a single object or an array of existing objects.
// A null moment retains the preceding picture.
// Introduce a meaningful new visual every one to three spoken sentences.
// Diagram boxes may use short labels, but captions must be complete sentences.
// Every diagram must accurately represent the spoken explanation.
//
// Each part will have two remedial micro-lessons in adaptive-week.js.
// Each remedial variant will contain 230–360 spoken words.
// Each variant will use a different explanatory angle and a fresh example.
// Remediation must teach the same concept without repeating the main script.
// Remedial content is never played during the main lesson.
//
// Each part will have approximately eleven automatically checked questions.
// The question bank will retain Week 1's six supported question types.
// Every question must have one unambiguous correct answer and a clear why.
// No question type should exceed thirty percent of the full bank.
// Question IDs and section IDs must remain unique across weeks.
//
// TECHNICAL COMPATIBILITY
//
// Preserve the Week 1 helper names and their argument signatures.
// Preserve window.MOMENT_KIT and window.COURSE.
// Preserve COURSE.lessons, lesson.sections and section.lines.
// Preserve the optional sec field used by the adaptive question bank.
// The moments builder derives visual timing from each section's lines.
// The plain-text script builder belongs after the final lesson.
// Do not close COURSE.lessons, COURSE or the IIFE in this opening fragment.
// Later lesson fragments must be appended before the final closing code.
//
// WEEK 2 SOURCE BOUNDARIES
//
// The March tourism-authority announcement is a fact within the Qasr case.
// It is not presented as a verified real-world legal requirement.
// Qasr's January deadline and twenty-four-hour record requirement
// must be described as the case specifies.
// Do not confuse Qasr's earlier declining satisfaction with its trigger.
// Do not describe the guest-experience rationale as the original funding cause.
// Do not assume the programme has already delivered compliance or benefits.
//
// ---------------------------------------------------------------------------

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

  window.MOMENT_KIT = {
    t, it, q, st, iss, cmp, dg, fm
  };

  // Week 2 visual data.
  // These arrays use only diagram formats already supported by Week 1.

  const qasrPressures = [
    "Guest|satisfaction",
    "Mobile|check-in",
    "Operating|costs",
    "Corporate|accounts",
    "!Regulatory|announcement"
  ];

  const triggerTypes = [
    ["Regulation", "Evidence of compliance"],
    ["Merger", "Consistent operations"],
    ["Cost target", "Defensible savings"],
    ["Complaints", "Visible response"],
    ["System change", "Process design risk"]
  ];

  window.COURSE = {
    id: "oper621-w2",
    code: "OPER621",
    title: "Drivers and Triggers for BPM",
    subtitle: "Business Process Management · Week 2",
    author: "Prof. Bassem Jarboui",

    teacher: {
      name: "Prof. Bassem Jarboui",
      email: "",
      sendReport: false
    },

    lessons: [

      // ================================================================
      // LESSON 1
      // Why organisations finally act
      //
      // W2O1: Distinguish drivers from triggers.
      // W2O2: Explain why persistent decline may not generate action.
      // CLOs: K1 and K2.
      //
      // Parts:
      // W2O1a · Pressure builds before a programme begins.
      // W2O1b · The event that changes everything.
      // W2O1c · Reading the real brief behind a trigger.
      // ================================================================

      {
        id: "w2l1",
        title: "Why organisations finally act",

        sections: [

          // ------------------------------------------------------------
          // PART 1 · W2O1a
          // Pressure builds before a programme begins
          // Sources: Slides 4–5, 18–19.
          // ------------------------------------------------------------

          {
            title: "Pressure builds before a programme begins",
            sec: "W2O1a",

            lines: [

              [
                "Welcome back to Business Process Management, where our attention now turns toward a surprisingly difficult question.",
                t(
                  "OPER621 · Week 2",
                  "Why do organisations finally decide to begin a BPM programme?"
                )
              ],

              [
                "Last week, we followed a tired traveller through a frustrating evening at Qasr Marina.",
                null
              ],

              [
                "You remember how several departments performed their duties correctly, while the guest experienced a disappointing arrival.",
                dg(
                  "Remembering Qasr Marina",
                  D.flow([
                    "Guest|arrives",
                    "Booking|checked",
                    "!Guest|waits",
                    "!Room|not ready",
                    "!Poor|experience"
                  ]),
                  "The guest's complete experience was disappointing despite the individual departments meeting their performance targets."
                )
              ],

              [
                "We discovered that managing the complete process matters because customers experience connected work rather than departmental reports.",
                null
              ],

              [
                "But understanding that problem does not automatically persuade an organisation to invest in solving it.",
                st(
                  "Recognising a process problem does not necessarily mean that management will fund its improvement."
                )
              ],

              [
                "Think about Qasr Hospitality, where managers have been watching guest satisfaction deteriorate for some time.",
                null
              ],

              [
                "The reports show a worrying pattern, yet the organisation continues operating without launching a major programme.",
                iss(
                  "Guest satisfaction continues declining, but the organisation does not launch a BPM programme.",
                  "Pressure without action"
                )
              ],

              [
                "You might wonder why experienced managers would tolerate a problem that seems increasingly obvious.",
                q(
                  "Why can managers recognise a serious problem without deciding to act?"
                )
              ],

              [
                "The answer begins with something we call a driver, meaning a condition that creates pressure for organisational change.",
                t(
                  "Understanding a driver",
                  "A driver creates pressure for change, but it does not necessarily make an organisation act immediately."
                )
              ],

              [
                "A driver matters because it gradually makes the existing way of working less attractive or sustainable.",
                null
              ],

              [
                "For example, declining guest satisfaction suggests that customers are receiving less value from Qasr's services.",
                iss(
                  "Declining guest satisfaction suggests that the existing service process is not meeting customer expectations.",
                  "A quality driver"
                )
              ],

              [
                "Managers may discuss the figures repeatedly, but discussion alone does not establish an approved improvement programme.",
                null
              ],

              [
                "Now imagine another hotel introducing mobile check-in, allowing guests to avoid some traditional reception delays.",
                dg(
                  "A competitor changes expectations",
                  D.flow([
                    "Competitor|innovates",
                    "Guests|notice",
                    "Expectations|change",
                    "!Qasr faces|pressure"
                  ]),
                  "A competitor's new service can increase pressure on Qasr without immediately producing an investment decision."
                )
              ],

              [
                "That competitor creates external pressure because customers may begin expecting similar convenience from Qasr.",
                null
              ],

              [
                "External drivers originate outside the organisation, including competition, economic conditions, technology changes, and regulatory developments.",
                st(
                  "External drivers arise from changes in the environment surrounding the organisation."
                )
              ],

              [
                "Internal drivers arise within the organisation, including rising costs, quality failures, and operational inefficiencies.",
                null
              ],

              [
                "Both kinds matter because they can gradually weaken performance, competitiveness, or the organisation's ability to serve customers.",
                [
                  cmp(
                    "a",
                    "External drivers",
                    "Competition, economic pressure, technology changes, and regulatory developments originate outside the organisation."
                  ),
                  cmp(
                    "b",
                    "Internal drivers",
                    "Rising costs, service failures, and operational inefficiencies develop within the organisation."
                  )
                ]
              ],

              [
                "But here's the important distinction: pressure can grow for months or years without producing a funded decision.",
                null
              ],

              [
                "Managers may acknowledge the problem while postponing action because other priorities appear more urgent.",
                iss(
                  "Managers recognise a problem but continue postponing a decision to invest in changing the process.",
                  "A decision is delayed"
                )
              ],

              [
                "They may also disagree about its causes, making it difficult to justify a particular investment.",
                null
              ],

              [
                "A department might propose additional staff, while another argues that the real difficulty lies between existing systems.",
                dg(
                  "Different explanations, no commitment",
                  D.flow([
                    "Service|problem",
                    "Staffing|proposal",
                    "System|proposal",
                    "!Decision|delayed"
                  ]),
                  "Competing explanations can delay investment because managers have not agreed on the problem requiring action."
                )
              ],

              [
                "Neither proposal automatically wins funding, because leaders must decide which problem deserves scarce organisational resources.",
                null
              ],

              [
                "This explains why a serious operational weakness can remain visible without becoming an approved BPM initiative.",
                st(
                  "Persistent performance problems can remain unresolved when management has not committed resources and authority."
                )
              ],

              [
                "Remember that BPM means Business Process Management, the continuing discipline of governing and improving connected organisational work.",
                null
              ],

              [
                "A BPM programme requires commitment because improving complete processes often involves several departments and their managers.",
                dg(
                  "Improvement crosses departmental boundaries",
                  D.org("process"),
                  "A BPM programme requires coordination because the customer's journey crosses several departmental responsibilities."
                )
              ],

              [
                "Someone must therefore decide that the pressure is important enough to justify shared resources and attention.",
                null
              ],

              [
                "Consider a university receiving repeated complaints about slow transcript requests, while each office meets its targets.",
                dg(
                  "A familiar example",
                  D.flow([
                    "Student|requests",
                    "Registrar",
                    "Finance",
                    "!Student|waits"
                  ]),
                  "A university can experience growing pressure to improve transcript delivery without immediately approving a programme."
                )
              ],

              [
                "Those complaints create pressure, but the university might continue discussing them without authorising a coordinated redesign.",
                null
              ],

              [
                "The lesson is that recognising the need for improvement and deciding to begin are different organisational events.",
                st(
                  "A driver explains why improvement is needed, but does not necessarily explain why management acts now."
                )
              ],

              [
                "When you examine a BPM initiative, look beyond the problems that managers have known about for years.",
                null
              ],

              [
                "Ask what finally changed their willingness to commit money, authority, and a definite deadline.",
                q(
                  "What changed that made management act now rather than continue waiting?"
                )
              ],

              [
                "That question leads us toward the event that transforms accumulated pressure into an actual programme.",
                null
              ]

            ]
          },

          // ------------------------------------------------------------
          // PART 2 · W2O1b
          // The event that changes everything
          // Sources: Slides 5–6, 18–20.
          // ------------------------------------------------------------

          {
            title: "The event that changes everything",
            sec: "W2O1b",

            lines: [

              [
                "Let's return to Qasr Hospitality, where the problems we discussed have been accumulating without decisive action.",
                t(
                  "From pressure to action",
                  "A specific event can turn longstanding organisational pressure into an approved BPM programme."
                )
              ],

              [
                "Guest satisfaction has declined, competitors have introduced new services, and operating costs have become increasingly concerning.",
                null
              ],

              [
                "Managers have discussed these developments, yet none has produced the major programme that the organisation needs.",
                dg(
                  "Pressure without a programme",
                  D.flow([
                    "Quality|pressure",
                    "Competition",
                    "Cost|pressure",
                    "!No funded|programme"
                  ]),
                  "Several business pressures can accumulate while management continues postponing a coordinated improvement programme."
                )
              ],

              [
                "Now imagine the management team receiving an announcement that changes the consequences of doing nothing.",
                null
              ],

              [
                "In Qasr's case, the tourism authority announces a new requirement affecting licensed hotel operators.",
                iss(
                  "A new tourism-authority requirement changes the urgency of Qasr's existing operational problems.",
                  "A decisive event"
                )
              ],

              [
                "From January, operators must produce a complete digital guest record within twenty-four hours of receiving a request.",
                null
              ],

              [
                "Qasr cannot currently meet that requirement because guest information is scattered across four different systems.",
                dg(
                  "Qasr's fragmented guest records",
                  D.flow([
                    "~Guest|system A",
                    "~Guest|system B",
                    "~Guest|system C",
                    "~Guest|system D"
                  ]),
                  "Qasr's guest information is distributed across four systems, preventing reliable production of a complete digital record."
                )
              ],

              [
                "Three of those systems operate locally at individual properties, making a consistent group response especially difficult.",
                null
              ],

              [
                "Suddenly, the problem is no longer simply whether Qasr should improve its guest experience.",
                st(
                  "The new requirement creates a defined compliance obligation that the existing process cannot reliably meet."
                )
              ],

              [
                "The organisation now faces a specific obligation with a deadline, making continued postponement much harder to defend.",
                null
              ],

              [
                "Within five weeks, Qasr funds a programme, appoints a director, and establishes a deadline.",
                dg(
                  "The decision changes",
                  D.flow([
                    "Regulatory|announcement",
                    "Board|attention",
                    "Funding|approved",
                    "+Programme|launched"
                  ]),
                  "The regulatory announcement leads to a funded programme and an appointed director within five weeks."
                )
              ],

              [
                "Notice how the underlying operational weaknesses existed before the announcement, yet management's response changed dramatically afterward.",
                null
              ],

              [
                "This is what we mean by a trigger, the specific event that makes an organisation act now.",
                t(
                  "Understanding a trigger",
                  "A trigger is the specific event that converts pressure for change into organisational action."
                )
              ],

              [
                "A driver explains why change is desirable, while a trigger explains why action becomes urgent at a particular moment.",
                [
                  cmp(
                    "a",
                    "Driver",
                    "An ongoing condition creates pressure and makes change increasingly desirable."
                  ),
                  cmp(
                    "b",
                    "Trigger",
                    "A specific event creates the urgency needed for a decision to act."
                  )
                ]
              ],

              [
                "Think about a smoke alarm sounding in a building where electrical wiring has been deteriorating for years.",
                null
              ],

              [
                "The damaged wiring represents an underlying problem, while the alarm forces people to respond immediately.",
                dg(
                  "A simple analogy",
                  D.flow([
                    "Hidden|problem",
                    "Pressure|grows",
                    "!Alarm|sounds",
                    "+People|respond"
                  ]),
                  "The underlying problem develops over time, while the alarm creates an immediate reason to respond."
                )
              ],

              [
                "The alarm did not create the wiring problem, but it changed how urgently people treated that problem.",
                null
              ],

              [
                "Qasr's regulatory announcement works similarly because it makes existing information weaknesses impossible to postpone indefinitely.",
                st(
                  "The trigger did not create Qasr's fragmented systems, but it changed the urgency of addressing them."
                )
              ],

              [
                "This distinction matters because the event that unlocks funding also influences how the programme will be judged.",
                null
              ],

              [
                "When compliance triggers investment, decision makers naturally expect evidence that the new requirement has been satisfied.",
                dg(
                  "The funding rationale shapes success",
                  D.flow([
                    "Regulatory|trigger",
                    "Compliance|funding",
                    "Required|evidence",
                    "+Compliance|demonstrated"
                  ]),
                  "A programme funded to meet a regulatory requirement must demonstrate that the required compliance outcome has been achieved."
                )
              ],

              [
                "They may welcome better guest experiences, but those improvements cannot replace the original compliance obligation.",
                null
              ],

              [
                "Now imagine a different company beginning a programme after appointing a new chief executive.",
                t(
                  "A different trigger",
                  "A leadership change may create pressure to demonstrate visible improvements quickly."
                )
              ],

              [
                "The organisation might already have serious process problems, but the new leader wants visible evidence of progress.",
                null
              ],

              [
                "The underlying drivers remain important, although the leadership change determines why the programme begins at that moment.",
                [
                  cmp(
                    "a",
                    "Underlying drivers",
                    "Existing process problems explain why improvement is needed."
                  ),
                  cmp(
                    "b",
                    "Leadership trigger",
                    "A new leader creates a particular moment for committing to improvement."
                  )
                ]
              ],

              [
                "Now consider a company receiving a demanding cost reduction target from its board.",
                null
              ],

              [
                "The target can trigger a programme because management must demonstrate savings within an agreed period.",
                dg(
                  "Another route into BPM",
                  D.flow([
                    "Cost|target",
                    "Process|review",
                    "Savings|measured",
                    "+Benefit|evidenced"
                  ]),
                  "A cost reduction target can trigger BPM investment when the organisation must demonstrate defensible financial savings."
                )
              ],

              [
                "But a savings programme will face different expectations from one launched to satisfy a regulatory deadline.",
                null
              ],

              [
                "That difference affects sponsorship, budget decisions, deadlines, and the evidence required to demonstrate success.",
                st(
                  "The trigger influences what leaders fund, when they expect results, and how they judge programme success."
                )
              ],

              [
                "So identifying a trigger is not merely an exercise in classifying events from a business history.",
                null
              ],

              [
                "It helps you understand the actual commitment behind the programme and the expectations attached to its funding.",
                q(
                  "What does the event that unlocked funding reveal about the programme's real purpose?"
                )
              ],

              [
                "For Qasr, the decisive event was the regulatory announcement, even though service problems had existed much longer.",
                null
              ],

              [
                "We can now investigate how different triggers create different priorities, risks, and definitions of success.",
                st(
                  "Understanding why a programme begins helps reveal the conditions under which it must succeed."
                )
              ]

            ]
          },

          // ------------------------------------------------------------
          // PART 3 · W2O1c
          // Reading the real brief behind a trigger
          // Sources: Slides 6–7.
          // ------------------------------------------------------------

          {
  title: "Reading the real brief behind a trigger",
  sec: "W2O1c",
  lines: [
    ["Now that you can distinguish drivers from triggers, let's examine why this distinction matters to programme managers.", t("The real brief", "Different triggers create different expectations, deadlines, and risks for a BPM programme.")],
    ["Imagine joining an organisation just after its board approves a major Business Process Management programme.", null],
    ["The official announcement promises better efficiency, improved customer experience, and more consistent ways of working.", st("An official programme announcement may describe several attractive benefits without revealing which one unlocked funding.")],
    ["Those ambitions sound reasonable, but they do not necessarily explain why the board approved funding now.", null],
    ["To understand the real brief, you need to discover the specific event that made postponement unacceptable.", q("What changed that made the board commit resources at this particular moment?")],
    ["Let's begin with Qasr, where the tourism authority's announcement created a deadline for producing complete digital guest records.", null],
    ["Because the requirement begins in January, the programme cannot simply move that deadline whenever difficulties arise.", dg("A regulatory deadline", D.flow(["Rule|announced", "Process|changed", "Evidence|prepared", "+Deadline|met"]), "A regulatory trigger makes timely, evidenced compliance the central obligation of the programme.")],
    ["Managers may negotiate which improvements to include, but they must still satisfy the required compliance outcome.", null],
    ["That creates a risk of minimum compliance, where the organisation meets the rule without improving the underlying process.", iss("The organisation meets the regulatory requirement but leaves wider operational weaknesses unresolved.", "Minimum compliance")],
    ["For example, Qasr might produce the required records while leaving frustrating guest-service handoffs largely unchanged.", null],
    ["The compliance achievement would matter, but it would not automatically resolve the difficulties our traveller experienced.", [cmp("a", "Required compliance", "Qasr can produce the complete digital guest record within the required period."), cmp("b", "Wider process improvement", "Qasr also reduces the fragmented work that creates poor guest experiences.")]],
    ["Now imagine another organisation launching BPM immediately after merging with a competitor.", null],
    ["The merger creates pressure to establish consistent operations because two organisations may use incompatible procedures.", dg("A merger creates a different priority", D.flow(["Company A|process", "Company B|process", "Common|design", "+One way|of working"]), "A merger-driven programme seeks a consistent operating process rather than simply connecting two existing procedures.")],
    ["Its leaders usually want one way of working quickly, rather than two separate processes connected awkwardly together.", null],
    ["The main danger is preserving conflicting practices while claiming that the merged organisation now operates consistently.", iss("Two incompatible processes are connected without resolving their underlying differences.", "Incomplete integration")],
    ["Consider a different company whose board demands a substantial reduction in operating costs.", null],
    ["Here, management expects defensible savings because the funding decision rests on a financial improvement argument.", dg("A cost-driven programme", D.flow(["Cost|target", "Process|changes", "Savings|recorded", "+Benefits|verified"]), "A cost-driven BPM programme must demonstrate financial savings rather than merely claim that work has become more efficient.")],
    ["A defensible saving is one supported by evidence, rather than a benefit that exists only in a presentation.", null],
    ["The typical failure is a saving claimed at launch but never tracked afterwards.", iss("Savings are announced at launch, but nobody tracks them against a baseline afterwards.", "Benefits claimed, never tracked")],
    ["Headcount is usually in scope too, whether or not anyone says so openly.", iss("In a cost-driven programme, headcount is in scope whether or not anyone says so openly.", "An unspoken concern")],
    ["That matters because employees may resist changes when they believe the programme threatens their jobs.", null],
    ["Now imagine a sudden increase in customer complaints attracting attention from senior leaders.", t("A complaint-driven trigger", "A sudden increase in complaints can make visible responsiveness the immediate priority.")],
    ["Management may demand a visible response because customers are already experiencing problems and expecting action.", null],
    ["The danger is treating the complaints themselves while leaving the process conditions that produced them unchanged.", dg("Treating symptoms rather than causes", D.flow(["Complaint|spike", "Visible|response", "!Root cause|remains", "!Complaints|return"]), "A programme may respond visibly to complaints without removing the process weaknesses responsible for them.")],
    ["Think back to our Qasr traveller, whose poor experience resulted from disconnected information and departmental handoffs.", null],
    ["An apology might address her immediate disappointment, but it would not repair those underlying connections.", [cmp("a", "Treating the symptom", "The hotel apologises for the guest's disappointing arrival."), cmp("b", "Addressing the cause", "The hotel improves the connected work that created the delay.")]],
    ["The last trigger deserves particular attention, because it is both the most common and the most damaging.", null],
    ["An organisation may launch BPM because an existing information system must be replaced.", t("The technology trap", "A system replacement can allow software configuration to determine the business process design.")],
    ["The project then risks adopting the software vendor's preferred workflow without examining what customers actually need.", null],
    ["When software configuration determines the process, technology choices can quietly replace deliberate business design decisions.", dg("When technology dictates the process", D.flow(["System|replacement", "Vendor|workflow", "!Process|constrained", "!Customer|needs missed"]), "A system replacement becomes dangerous when the vendor's workflow determines the process without adequate business analysis.")],
    ["That is why replacing software should not become a substitute for understanding and managing the complete process.", null],
    ["Across these situations, the same principle applies: the trigger shapes what sponsors expect the programme to deliver.", st("The event that triggers investment influences the programme's priorities, success measures, and most important risks.")],
    ["Before accepting a BPM brief, ask why the organisation must act now rather than continue with existing arrangements.", null],
    ["Then examine whether the promised benefits match the reason that actually secured funding and executive attention.", q("Does the programme's stated purpose match the reason its sponsors approved the investment?")],
    ["If those rationales differ, the programme may satisfy one expectation while disappointing the people funding it.", null],
    ["We'll explore that danger through Qasr's board decision, where compliance funding and guest-experience ambitions begin to diverge.", st("A credible BPM programme must reconcile the reason it was funded with the benefits it promises to deliver.")]
  ]
}

        ]
      },

      // ================================================================
      // LESSON 2
      // Qasr Hospitality asks why now
      //
      // W2O1: Distinguish drivers from triggers.
      // W2O2: Explain why persistent decline may not generate action.
      // W2O3: Articulate a board-acceptable programme purpose.
      // CLOs: K1 and K2.
      //
      // Parts:
      // W2O2a · Four pressures and one decisive event.
      // W2O2b · The danger of two competing rationales.
      // W2O2c · Writing a purpose the board can defend.
      //
      // Sources: Week 2 Session 1 slides 16–20.
      // ================================================================

      {
        id: "w2l2",
        title: "Qasr Hospitality asks why now",

        sections: [

          // ------------------------------------------------------------
          // PART 1 · W2O2a
          // Four pressures and one decisive event
          // Sources: Slides 18–19.
          // ------------------------------------------------------------

          {
            title: "Four pressures and one decisive event",
            sec: "W2O2a",

            lines: [

              [
                "Let's return to Qasr Hospitality, where the board has finally approved a major Business Process Management programme.",
                t(
                  "Qasr Hospitality · The board's decision",
                  "Four longstanding pressures produced little action, while one regulatory announcement unlocked funding."
                )
              ],

              [
                "You might assume that management acted because guests had become increasingly unhappy with their hotel experiences.",
                null
              ],

              [
                "That explanation sounds reasonable, but the evidence tells us something more revealing about organisational decisions.",
                q(
                  "What actually made Qasr's board approve a BPM programme?"
                )
              ],

              [
                "Imagine sitting beside the programme director as she examines the events leading to the board's decision.",
                null
              ],

              [
                "Her task is to understand why the organisation acted now, rather than simply identifying everything that needed improvement.",
                st(
                  "Understanding a funding decision requires examining what changed immediately before management committed resources."
                )
              ],

              [
                "Two years earlier, guest satisfaction had begun declining, revealing a persistent weakness in Qasr's service experience.",
                null
              ],

              [
                "Management recorded the deterioration in its reports, but the evidence did not produce a funded programme.",
                iss(
                  "Guest satisfaction begins declining, but management records the problem without launching a major programme.",
                  "Pressure without commitment"
                )
              ],

              [
                "Think back to our traveller at Qasr Marina, whose disappointing arrival illustrated what poor coordination feels like.",
                null
              ],

              [
                "Her experience helps explain the quality problem, but it does not explain the timing of the investment.",
                dg(
                  "The existing service problem",
                  D.flow([
                    "Guest|arrives",
                    "Departments|respond",
                    "!Delays|accumulate",
                    "!Guest|dissatisfied"
                  ]),
                  "The Qasr Marina experience illustrates the service weaknesses that existed before the board approved its programme."
                )
              ],

              [
                "Eighteen months earlier, a competitor had introduced mobile check-in, offering guests a more convenient arrival experience.",
                null
              ],

              [
                "Qasr discussed that competitive development, yet the organisation still did not approve a comparable investment.",
                iss(
                  "A competitor introduces mobile check-in, but Qasr discusses the development without funding a programme.",
                  "Competitive pressure"
                )
              ],

              [
                "This matters because competitive threats can become familiar background concerns when leaders see no immediate deadline.",
                null
              ],

              [
                "Twelve months earlier, the cost per occupied room had risen by nine percent, increasing financial pressure.",
                fm(
                  "Increase in cost per occupied room",
                  "9",
                  "100"
                )
              ],

              [
                "Management responded with a cost-cutting review, but that response remained different from launching a coordinated BPM programme.",
                null
              ],

              [
                "Six months earlier, Qasr had lost two corporate accounts, adding commercial pressure to its existing difficulties.",
                iss(
                  "Qasr loses two corporate accounts, increasing concern about its ability to retain valuable business customers.",
                  "Commercial pressure"
                )
              ],

              [
                "The sales department prepared an action plan, but the board still did not fund the broader programme.",
                null
              ],

              [
                "Notice the pattern emerging from these events, because each problem generated discussion or a limited response.",
                dg(
                  "Four pressures accumulate",
                  D.flow([
                    "Guest|satisfaction",
                    "Mobile|check-in",
                    "Operating|costs",
                    "Corporate|accounts"
                  ]),
                  "Four different pressures accumulated without producing the coordinated BPM investment that Qasr eventually approved."
                )
              ],

              [
                "None produced the commitment needed to change how work moved across the hotel group's departments and properties.",
                null
              ],

              [
                "Now we reach March, when the tourism authority announced a requirement concerning complete digital guest records.",
                t(
                  "March · The decisive event",
                  "The tourism authority announces a new digital guest-record requirement."
                )
              ],

              [
                "From January, licensed operators would need to produce a complete digital guest record within twenty-four hours of request.",
                null
              ],

              [
                "Qasr could not reliably meet that obligation because its guest information was distributed across four systems.",
                dg(
                  "The compliance gap",
                  D.flow([
                    "~System|one",
                    "~System|two",
                    "~System|three",
                    "~System|four",
                    "!Record|fragmented"
                  ]),
                  "Qasr cannot reliably produce a complete digital guest record because the necessary information is fragmented."
                )
              ],

              [
                "Three systems were property-local, making the problem particularly difficult for a group operating fourteen hotels and resorts.",
                null
              ],

              [
                "Within five weeks of the announcement, management funded a programme, appointed a director, and fixed a deadline.",
                dg(
                  "The decision finally changes",
                  D.flow([
                    "Regulatory|announcement",
                    "Board|decision",
                    "Funding|approved",
                    "+Director|appointed"
                  ]),
                  "The regulatory announcement produces a funded programme and an appointed director within five weeks."
                )
              ],

              [
                "The timing provides powerful evidence that regulatory compliance triggered the investment rather than declining satisfaction alone.",
                null
              ],

              [
                "Those earlier problems were drivers, meaning continuing conditions that created pressure for organisational change.",
                st(
                  "The four drivers created pressure, but the regulatory announcement triggered the funded programme."
                )
              ],

              [
                "The announcement was the trigger because it transformed longstanding concerns into a decision requiring immediate commitment.",
                null
              ],

              [
                "Imagine explaining this distinction to the board without confusing the organisation's problems with its reason for acting.",
                q(
                  "Which event changed management's decision, rather than merely adding another reason for concern?"
                )
              ],

              [
                "You would point to the contrast between years of limited responses and five weeks of decisive commitment.",
                null
              ],

              [
                "That contrast matters because the programme's original funding rationale will influence its priorities and success measures.",
                st(
                  "The event that unlocks funding helps reveal what the board expects the programme to achieve."
                )
              ],

              [
                "Now we must examine what happens when Qasr describes that programme differently after receiving its funding.",
                null
              ]

            ]
          },

          // ------------------------------------------------------------
          // PART 2 · W2O2b
          // The danger of two competing rationales
          // Sources: Slides 6–7, 13, 18–20.
          // ------------------------------------------------------------

          {
            title: "The danger of two competing rationales",
            sec: "W2O2b",

            lines: [

              [
                "Now imagine Qasr's programme director preparing for her first major progress meeting with the board.",
                t(
                  "Qasr Hospitality · Two competing rationales",
                  "The programme was funded for compliance, but its internal justification emphasises guest experience."
                )
              ],

              [
                "She has inherited an approved budget, an urgent deadline, and expectations that are not entirely aligned.",
                null
              ],

              [
                "The board released funding after the tourism authority announced its new digital guest-record requirement.",
                dg(
                  "Why the board funded the programme",
                  D.flow([
                    "Regulatory|announcement",
                    "Compliance|obligation",
                    "Funding|approved",
                    "+Deadline|established"
                  ]),
                  "The regulatory requirement explains why Qasr's board approved funding and established a programme deadline."
                )
              ],

              [
                "But inside Qasr, managers are increasingly describing the programme as an opportunity to improve guest experience.",
                null
              ],

              [
                "That ambition is valuable because our traveller's difficult arrival revealed genuine weaknesses in connected service processes.",
                [
                  cmp(
                    "a",
                    "Funding rationale",
                    "The board approved the programme following a new regulatory compliance obligation."
                  ),
                  cmp(
                    "b",
                    "Internal improvement rationale",
                    "Managers also want better guest experiences and more effective service processes."
                  )
                ]
              ],

              [
                "The danger begins when these different purposes remain unspoken, leaving stakeholders with conflicting definitions of success.",
                null
              ],

              [
                "A funding rationale explains why decision makers committed resources, while an improvement rationale explains additional benefits being pursued.",
                st(
                  "Different programme rationales can coexist, but they must be reconciled rather than treated as interchangeable."
                )
              ],

              [
                "Imagine reaching month nine, when the director must demonstrate what the programme has achieved so far.",
                null
              ],

              [
                "Her team presents encouraging evidence that guests are experiencing fewer delays during the arrival process.",
                dg(
                  "The internal success story",
                  D.flow([
                    "Check-in|redesigned",
                    "Handoffs|improved",
                    "Guest|delays reduced",
                    "+Experience|improves"
                  ]),
                  "Improving guest check-in can create genuine value without proving that the regulatory requirement has been satisfied."
                )
              ],

              [
                "Those results would matter, but they would not establish that Qasr can produce complete digital guest records.",
                null
              ],

              [
                "A board focused on compliance could reasonably ask whether the original obligation will be satisfied by January.",
                q(
                  "Can better guest satisfaction prove that Qasr meets its digital guest-record obligation?"
                )
              ],

              [
                "If the director cannot provide convincing evidence, the board may question whether its investment remains properly directed.",
                null
              ],

              [
                "This creates a credibility risk because reported improvements do not necessarily answer the question that unlocked funding.",
                iss(
                  "The programme reports guest-experience improvements without demonstrating progress toward the original compliance obligation.",
                  "A credibility gap"
                )
              ],

              [
                "Now imagine the opposite situation, where the team concentrates exclusively on producing the required digital records.",
                null
              ],

              [
                "The programme might satisfy the regulator while leaving Qasr's fragmented guest-service journey largely unchanged.",
                dg(
                  "Compliance without wider improvement",
                  D.flow([
                    "Digital|records",
                    "+Compliance|achieved",
                    "!Service|handoffs remain",
                    "!Guest|still waits"
                  ]),
                  "A programme can satisfy the regulatory obligation while leaving important customer-experience weaknesses unresolved."
                )
              ],

              [
                "Internal managers expecting better service could then conclude that the programme delivered too little operational value.",
                null
              ],

              [
                "Neither situation means that compliance and guest experience are incompatible objectives within the same programme.",
                st(
                  "Compliance and guest-experience improvements can reinforce each other when their requirements and benefits are clearly distinguished."
                )
              ],

              [
                "The problem arises when nobody agrees which outcomes are mandatory and which improvements represent additional value.",
                null
              ],

              [
                "A credible programme therefore needs a clear purpose connecting its non-negotiable obligation with realistic improvement ambitions.",
                dg(
                  "Aligning the two purposes",
                  D.flow([
                    "Regulatory|obligation",
                    "Process|redesign",
                    "Evidence|of compliance",
                    "+Guest|benefits"
                  ]),
                  "A coherent programme addresses the required compliance outcome while pursuing feasible improvements to guest service."
                )
              ],

              [
                "The director must also distinguish a promised benefit from a demonstrated result, because expectations require supporting evidence.",
                null
              ],

              [
                "A baseline is the recorded starting performance against which later improvements can be measured and verified.",
                t(
                  "Understanding a baseline",
                  "A baseline records performance before changes, allowing managers to test whether the programme actually delivers benefits."
                )
              ],

              [
                "Without that starting point, claims about improved satisfaction or lower costs become difficult to defend.",
                null
              ],

              [
                "And if the regulatory requirement is satisfied, the original urgency supporting the programme may begin disappearing.",
                iss(
                  "Once the immediate regulatory trigger is resolved, executive attention may shift away from the programme.",
                  "Sponsorship risk"
                )
              ],

              [
                "That creates another danger because ongoing improvements still need sponsorship, resources, and clear organisational responsibility.",
                null
              ],

              [
                "A sponsor is the senior leader who supports the programme and helps secure organisational commitment.",
                st(
                  "A programme needs continuing sponsorship because cross-department improvement depends on sustained executive commitment."
                )
              ],

              [
                "If the sponsor changes role, the successor may not automatically accept commitments that were never clearly documented.",
                null
              ],

              [
                "This is why the director must establish measurable benefits and governance arrangements before the initial urgency disappears.",
                dg(
                  "Protecting programme continuity",
                  D.flow([
                    "Purpose|agreed",
                    "Baseline|recorded",
                    "Sponsor|committed",
                    "+Benefits|tracked"
                  ]),
                  "Clear purpose, recorded baselines, continuing sponsorship, and benefit tracking help protect the programme's credibility."
                )
              ],

              [
                "Now return to month nine and consider what the director should be able to tell the board.",
                q(
                  "How can the director demonstrate progress without confusing compliance obligations with wider improvement ambitions?"
                )
              ],

              [
                "She needs evidence of progress toward compliance alongside separately measured improvements in guest experience.",
                null
              ],

              [
                "That approach protects credibility because each promised outcome is judged against the reason it matters.",
                st(
                  "A credible programme distinguishes mandatory compliance from additional benefits and measures progress against both."
                )
              ],

              [
                "Let's now turn that understanding into a purpose statement that Qasr's board could reasonably approve.",
                null
              ]

            ]
          },

          // ------------------------------------------------------------
          // PART 3 · W2O2c
          // Writing a purpose the board can defend
          // Sources: Slides 16, 18–20.
          // ------------------------------------------------------------

          {
  title: "Writing a purpose the board can defend",
  sec: "W2O2c",
  lines: [
    ["Let's imagine you're advising Qasr's programme director as she prepares the document defining the programme's purpose.", t("Qasr Hospitality · The programme charter", "A credible purpose statement connects the funding trigger with an outcome that can be demonstrated.")],
    ["The board has approved funding, but the director still needs to establish exactly what success should mean.", null],
    ["Without that agreement, different departments may pursue improvements that appear useful but fail to satisfy the original obligation.", iss("Different departments pursue different improvements without agreeing on the programme's required outcome.", "An unclear purpose")],
    ["The document she is preparing is a programme charter, which formally establishes the programme's purpose and direction.", null],
    ["A useful charter matters because it gives sponsors and delivery teams a shared basis for making difficult decisions.", st("A programme charter establishes a common purpose against which scope, priorities, and results can be judged.")],
    ["Imagine the director proposing that Qasr should become a world-class hospitality organisation through digital transformation.", null],
    ["That statement sounds ambitious, but it leaves the board uncertain about what the investment must actually deliver.", q("What would the board measure to decide whether this ambitious statement had been fulfilled?")],
    ["The phrase digital transformation describes broad change, but it does not identify the specific compliance outcome required.", null],
    ["It also provides no clear boundary for deciding which improvements belong inside the funded programme.", iss("A broad transformation ambition does not establish a testable compliance outcome or a defensible programme boundary.", "An aspiration, not a purpose")],
    ["Now consider Qasr's actual trigger, which was the tourism authority's requirement concerning complete digital guest records.", null],
    ["The obligation has a defined starting date and requires the record to be produced within twenty-four hours.", dg("The obligation the board must address", D.flow(["Guest|record request", "Information|assembled", "Complete|record", "+Produced|within 24 hours"]), "The regulatory requirement concerns producing a complete digital guest record within twenty-four hours of a request.")],
    ["Those details matter because they allow the board to recognise an outcome that can be verified.", null],
    ["The director must also consider the fragmented systems preventing Qasr from meeting that requirement reliably.", dg("The existing obstacle", D.flow(["~System|one", "~System|two", "~System|three", "~System|four", "!Incomplete|access"]), "Guest information distributed across four systems creates an obstacle to producing complete digital records.")],
    ["Her purpose statement should therefore connect the required result with the process changes needed to achieve it.", null],
    ["She can also acknowledge guest-experience improvement, provided that ambition does not obscure the mandatory compliance commitment.", [cmp("a", "Mandatory outcome", "Qasr must satisfy the digital guest-record requirement beginning in January."), cmp("b", "Additional ambition", "Qasr can also improve the connected guest-service processes affected by fragmented information.")]],
    ["Here's a possible charter statement that reflects the evidence available in the Qasr case.", null],
    ["Qasr will redesign guest-record processes to meet January's twenty-four-hour regulatory requirement while improving connected guest services.", st("Proposed programme purpose: Qasr will redesign guest-record processes to meet January's twenty-four-hour regulatory requirement while improving connected guest services.")],
    ["Notice that this statement identifies the required result without pretending that wider guest-experience benefits are already guaranteed.", null],
    ["It also links compliance to process redesign because fragmented information is an operational obstacle, not merely a reporting inconvenience.", dg("Connecting purpose with action", D.flow(["Fragmented|records", "Process|redesign", "Regulatory|compliance", "+Service|improvement"]), "The proposed purpose links the compliance obligation with process changes that may also improve guest service.")],
    ["The director can now develop supporting measures that show whether the programme is delivering what it promises.", null],
    ["The compliance promise is the easiest to test, because a complete record either appears within twenty-four hours or it does not.", it(1, 3, "check", "Compliance evidence", "The programme must demonstrate that complete digital guest records can be produced within twenty-four hours.")],
    ["The guest-experience promise is harder, because nobody can prove an improvement without first recording where performance starts today.", it(2, 3, "gauge", "Guest-experience evidence", "A recorded baseline allows the programme to demonstrate whether the complete guest journey improves.")],
    ["Neither promise will hold, though, unless one named owner has the authority to change work across departmental boundaries.", it(3, 3, "key", "Accountable ownership", "A named process owner needs authority to coordinate the changes required across departments.")],
    ["These supporting arrangements matter because an attractive statement alone cannot ensure that the promised outcomes are delivered.", null],
    ["Now imagine the board asking which improvements must remain outside the programme's immediate scope.", q("Which improvements can be postponed without compromising the regulatory obligation?")],
    ["Scope means the work included in the programme, together with the boundaries of what it will address.", null],
    ["A regulatory deadline makes scope decisions especially important because not every desirable improvement can necessarily be completed immediately.", st("The programme must protect mandatory compliance while making deliberate choices about additional improvements.")],
    ["The director should document those choices rather than allowing individual departments to make conflicting assumptions about priorities.", null],
    ["She must also consider employees whose work will change, because adoption determines whether redesigned processes operate reliably.", dg("Turning purpose into delivery", D.flow(["Purpose|agreed", "Scope|defined", "People|prepared", "+Results|verified"]), "A credible programme connects its agreed purpose with clear scope, employee preparation, and verified outcomes.")],
    ["A programme that cannot explain its purpose, ownership, measures, or boundaries remains an aspiration rather than a credible commitment.", null],
    ["So the board's question is not simply whether the proposed improvements sound attractive or technologically impressive.", q("Can Qasr demonstrate that its programme will deliver the outcome for which funding was approved?")],
    ["The real test is whether the charter connects the trigger, the required outcome, and defensible evidence of success.", null],
    ["With that purpose established, we're ready to examine how Qasr should manage the complete process after approval.", st("A credible programme begins with an agreed purpose and continues through accountable ownership, measurement, and governance.")]
  ]
}

        ]
      },

      // ================================================================
      // LESSON 3
      // Managing the complete business process
      //
      // W2O2: Explain why a trigger alone cannot sustain improvement.
      // W2O3: Articulate and operationalise a board-acceptable purpose.
      // CLOs: K1 and K2.
      //
      // Parts:
      // W2O3a · A process owner needs a real mandate.
      // W2O3b · Measuring the customer's clock.
      // W2O3c · Keeping sponsorship and performance alive.
      //
      // Sources: Week 2 Session 1 slides 9–16.
      // Running case: Qasr Hospitality Group and Qasr Marina.
      // ================================================================

      {
        id: "w2l3",
        title: "Managing the complete business process",

        sections: [

          // ------------------------------------------------------------
          // PART 1 · W2O3a
          // A process owner needs a real mandate
          // Sources: Slides 9, 14–15.
          // ------------------------------------------------------------

          {
  title: "A process owner needs a real mandate",
  sec: "W2O3a",
  lines: [
    ["Let's return to Qasr Hospitality, where the board has approved a programme with a clear compliance obligation.", t("Managing the complete process", "A funded programme needs someone accountable for the process across departmental boundaries.")],
    ["The director now faces a practical question that funding alone cannot answer: who will manage the complete process?", null],
    ["Think back to our traveller at Qasr Marina, whose journey crossed several departments before reaching her room.", dg("The guest's complete journey", D.flow(["Reservation", "Arrival", "Reception", "Room|readiness", "Guest|settles"]), "The guest experiences one connected journey, even though different departments perform the individual activities.")],
    ["Each department had its own responsibilities, yet nobody appeared accountable for the experience connecting them.", null],
    ["That gap matters because a process can perform poorly even when individual departments meet their targets.", iss("Departments meet their individual targets while the complete guest journey remains disappointing.", "Accountability is fragmented")],
    ["The solution begins with process ownership, meaning clear accountability for how an entire business process performs.", null],
    ["A process owner looks beyond departmental boundaries because customers experience the combined result of connected activities.", t("Process ownership", "A process owner is accountable for the performance and improvement of the complete business process.")],
    ["A real owner also holds the measures, the standard and the improvement backlog, because nobody else sees the whole journey.", null],
    ["But a title alone is decorative, because an owner who must ask permission to change anything owns nothing.", null],
    ["Imagine Qasr appointing a guest-arrival process owner who cannot influence reception, housekeeping, or information systems.", dg("Responsibility without authority", D.flow(["Process|owner", "!Reception|independent", "!Housekeeping|independent", "!Systems|independent"]), "A process owner cannot reliably improve the complete journey without meaningful influence across the departments involved.")],
    ["She might identify delays accurately, yet departmental managers could reject changes that inconvenience their local operations.", null],
    ["This creates accountability without authority, where someone carries responsibility but lacks the mandate needed to act.", iss("The process owner is accountable for results but cannot secure the changes required across departments.", "Authority does not match responsibility")],
    ["A mandate is the recognised permission and responsibility to make decisions within an agreed area of work.", null],
    ["For Qasr, that mandate should establish how the owner can coordinate decisions affecting the complete guest journey.", st("Effective process ownership requires a recognised mandate to coordinate improvement across departmental boundaries.")],
    ["Consider what happens when housekeeping reports that rooms are ready, but reception receives that information too late.", null],
    ["Both departments might satisfy their own reporting requirements while guests continue waiting unnecessarily at reception.", dg("A handoff failure", D.flow(["Room|ready", "!Update|delayed", "Reception|unaware", "!Guest|waits"]), "A delayed handoff can damage the guest experience even when housekeeping and reception perform their local tasks.")],
    ["The process owner must therefore examine the handoff itself rather than simply asking departments to work harder.", null],
    ["That matters because improving local efficiency cannot repair a connection that nobody accepts responsibility for managing.", st("Managing the complete process means improving the connections between activities, not merely optimising individual departments.")],
    ["The owner also needs a process team, bringing together people who understand the activities and their dependencies.", null],
    ["At Qasr, such a team might involve reception, housekeeping, reservations, and the people responsible for information systems.", dg("Cross-functional process management", D.org("process"), "A cross-functional team helps the process owner understand and improve work spanning several organisational responsibilities.")],
    ["Their involvement matters because process problems often emerge where information or responsibility passes between different functions.", null],
    ["Qasr adds a complication, because the same arrival process runs separately in all fourteen properties.", iss("The same process runs at fourteen properties and quietly diverges at each site.", "One process, fourteen versions")],
    ["Left alone, each property drifts into its own version, and nobody notices until a group-wide change fails.", null],
    ["The usual answer is one group process owner, supported by a local process champion at each property.", st("One group process owner works with a local process champion at each property.")],
    ["That arrangement fails when champions report only to their general manager, because local priorities then win.", null],
    ["So Qasr must decide what is standard everywhere and what each property may vary, and write it down.", st("Decide explicitly what is standard across the group and what each site may vary, and document it.")],
    ["Undocumented local variation is the main reason a pilot that succeeds at one hotel does not scale.", null],
    ["The programme director and process owner should also have distinct responsibilities, even when their work overlaps.", [cmp("a", "Programme director", "Coordinates the approved change programme, its delivery commitments, and its resources."), cmp("b", "Process owner", "Maintains accountability for how the complete business process performs and improves.")]],
    ["This distinction matters because a temporary programme cannot substitute for continuing responsibility for everyday process performance.", st("Programme delivery is temporary, but accountability for process performance must continue after implementation.")],
    ["Now imagine Qasr completing its digital guest-record changes and formally closing the funded programme.", null],
    ["Someone must still monitor whether records remain complete and whether guest-service handoffs continue working reliably.", dg("Responsibility continues", D.flow(["Programme|delivers", "Process|operates", "Performance|monitored", "+Improvements|sustained"]), "The process owner continues managing performance after the temporary programme has delivered its changes.")],
    ["Without that continuing ownership, the organisation risks allowing familiar weaknesses to return after the initial urgency disappears.", null],
    ["So when you evaluate Qasr's governance, ask whether its process owner has genuine authority across departmental boundaries.", q("Can the process owner influence the activities that determine the guest's complete experience?")],
    ["Next, we'll examine how that owner can measure performance from the customer's perspective rather than departmental convenience.", st("Real process ownership combines accountability, cross-functional authority, and continuing responsibility for performance.")]
  ]
},

          // ------------------------------------------------------------
          // PART 2 · W2O3b
          // Measuring the customer's clock
          // Sources: Slides 10–12.
          // ------------------------------------------------------------

          {
  title: "Measuring the customer's clock",
  sec: "W2O3b",
  lines: [
    ["Now imagine Qasr's new process owner reviewing performance reports from reception, housekeeping, and reservations.", t("Measuring the customer's clock", "A complete process must be measured through the customer's experience, not only departmental activity.")],
    ["Each department presents reassuring figures, suggesting that its employees are completing their assigned tasks efficiently.", null],
    ["Yet our traveller remembers waiting, repeating information, and wondering when her room would finally become available.", dg("Two perspectives on performance", D.flow(["Departments|report success", "Handoffs|create delays", "!Guest|experiences waiting"]), "Departmental performance reports can appear satisfactory while the guest experiences delays across the complete process.")],
    ["The difference matters because customers live through the whole wait, not the sum of departmental productivity figures.", null],
    ["The measure that captures the whole wait is cycle time, which runs from the customer's trigger to the outcome.", t("Cycle time", "Cycle time runs from the customer's trigger to the outcome, including every period of waiting.")],
    ["Here the word trigger means the customer's first request, not the event that launches a programme.", null],
    ["Let me show you why the starting point matters, using a worked example about a team that settles claims.", q("Whose clock are we measuring?")],
    ["The claims team reports that it settles a claim in 4.1 days, and that figure is perfectly honest.", null],
    ["Its customers describe the same claims as taking about three weeks, and they are being honest too.", [cmp("a", "The team's clock", "The claims team reports 4.1 days to settle a claim."), cmp("b", "The customer's clock", "Customers report that the same claims take about three weeks.")]],
    ["The figures differ because the team starts its clock when a claim reaches its queue, while customers start at first contact.", null],
    ["Before the team ever sees the claim, it sits unassigned in a shared mailbox for nine days.", dg("Where the twenty-one days go", D.bars([["Mailbox", 9], ["Documents", 5], ["Team work", 4.1], ["Payment run", 3]]), "The claim waits nine days in a shared mailbox and five days for documents, is worked for 4.1 days, then waits three days for payment.")],
    ["It then waits five more days for documents from the customer, and only then does the team work it.", null],
    ["After that, the settled claim waits three days for the payment run, so the customer's clock reaches 21.1 days.", fm("The customer's clock in days", "9 + 5 + 4.1 + 3", "21.1")],
    ["Neither number is wrong, because the team and the customer are measuring two different processes.", st("Both figures are honest, because they measure processes with different starting points.")],
    ["But choosing the team's clock quietly makes seventeen of those twenty-one days someone else's problem.", iss("The team's boundary leaves seventeen of the twenty-one days outside its own measure.", "Most of the delay becomes invisible")],
    ["That is why only the customer's boundary can justify an improvement programme, since customers live through every one of those days.", null],
    ["So the practical rule is to redefine the process boundary from the customer's trigger before you measure anything.", st("Redefine the process boundary from the customer's trigger before measuring anything, or every later number is contestable.")],
    ["Even if the team halved its own working time, the customer would still wait more than nineteen days.", null],
    ["The real opportunity lies in the mailbox, the missing documents and the payment run, where nobody is actually working.", q("Where does the customer's time disappear between activities?")],
    ["Those gaps sit at handoffs, the points where work or information passes between people, teams or systems.", null],
    ["Qasr Marina shows the same pattern whenever housekeeping finishes a room but reception hears about it too late.", dg("A problematic handoff", D.flow(["Housekeeping|finishes", "!Status|not updated", "Reception|waits", "!Guest|delayed"]), "A handoff problem can create customer waiting even when the individual activities are completed correctly.")],
    ["Processing time measures active work, while waiting time captures every delay before or between activities.", [cmp("a", "Processing time", "The time spent actively performing work required by the process."), cmp("b", "Waiting time", "The time lost while work, information, or decisions remain unavailable.")]],
    ["Speed is not the only test, though, because a managed process is also judged on quality.", null],
    ["A faster check-in that produces incorrect room assignments would simply exchange one service problem for another.", iss("The process becomes faster but produces errors that undermine the guest experience.", "Speed without quality")],
    ["Cost to serve matters too, because a quicker process that consumes far more resource per case is no bargain.", null],
    ["Now return to Qasr's regulatory obligation, which requires complete digital guest records within twenty-four hours of request.", dg("The regulatory process", D.flow(["Record|requested", "Data|located", "Information|combined", "+Complete|record produced"]), "Compliance depends on the total time required to produce a complete digital guest record after receiving a request.")],
    ["The same principle applies, because compliance depends on the whole record-production process, not on one fast system.", null],
    ["The owner should also record current performance before any redesign, so that later claims of improvement can be tested.", dg("Measuring improvement", D.flow(["Current|performance", "Process|redesign", "New|performance", "+Change|evaluated"]), "A recorded baseline allows the process owner to compare performance before and after redesign.")],
    ["Remember that a process measured only on departmental throughput will be optimised to look good and feel worse.", st("A process measured only on departmental throughput will be optimised to look good and feel worse.")],
    ["So whenever you review a BPM dashboard, ask whose clock it measures and exactly where that clock starts.", q("Would the customer recognise the improvement shown in these performance reports?")],
    ["That question keeps measurement focused on what customers live through, rather than what departments find convenient to count.", null]
  ]
},

          // ------------------------------------------------------------
          // PART 3 · W2O3c
          // Keeping sponsorship and performance alive
          // Sources: Slides 13, 15–16.
          // ------------------------------------------------------------

          {
            title: "Keeping sponsorship and performance alive",
            sec: "W2O3c",

            lines: [

              [
                "Let's imagine Qasr reaching an important milestone, with its programme team preparing to demonstrate the redesigned processes.",
                t(
                  "Keeping improvement alive",
                  "A successful programme needs continuing sponsorship, accountable governance, and evidence of sustained benefits."
                )
              ],

              [
                "The original regulatory announcement created urgency, and that urgency helped management secure funding and executive attention.",
                null
              ],

              [
                "But a difficult question now emerges: what happens when the immediate compliance problem has been addressed?",
                q(
                  "What keeps the improvement programme moving after the original trigger loses its urgency?"
                )
              ],

              [
                "The board may naturally redirect its attention toward other priorities once the required compliance outcome is demonstrated.",
                null
              ],

              [
                "That shift creates risk because wider process improvements still require coordination, resources, and organisational commitment.",
                iss(
                  "Executive attention declines after the immediate compliance obligation has been satisfied.",
                  "The trigger loses its force"
                )
              ],

              [
                "Remember that a trigger explains why an organisation begins, but it cannot guarantee that improvement continues indefinitely.",
                null
              ],

              [
                "Sustained performance depends on governance, meaning the arrangements through which responsibilities, decisions, and accountability are organised.",
                t(
                  "Understanding governance",
                  "Governance establishes who makes decisions, who owns results, and how performance is reviewed."
                )
              ],

              [
                "Good governance matters because process improvements often require departments to coordinate decisions beyond their normal reporting relationships.",
                null
              ],

              [
                "At Qasr, reception and housekeeping may disagree about responsibility for communicating room-readiness information.",
                dg(
                  "A cross-department decision",
                  D.flow([
                    "Reception|needs updates",
                    "Housekeeping|controls status",
                    "!Responsibility|unclear",
                    "Process|owner intervenes"
                  ]),
                  "Cross-department disagreements require a recognised decision-making arrangement rather than informal negotiation alone."
                )
              ],

              [
                "Without clear governance, that disagreement could persist even after the programme introduces improved technology.",
                null
              ],

              [
                "The process owner needs authority to resolve such problems and maintain the performance of the complete journey.",
                st(
                  "Process ownership must continue beyond implementation because operational problems can return after the programme closes."
                )
              ],

              [
                "The executive sponsor plays a different role by protecting the programme's importance within senior management.",
                null
              ],

              [
                "A sponsor is the senior leader who supports the programme and helps secure the commitment needed for delivery.",
                dg(
                  "Sponsorship and ownership",
                  D.org("process"),
                  "Executive sponsorship supports organisational commitment, while process ownership maintains accountability for end-to-end performance."
                )
              ],

              [
                "That support matters when departments resist changes that benefit customers but complicate their local routines.",
                null
              ],

              [
                "Imagine reception requesting faster room-status updates while housekeeping argues that its existing procedures are sufficient.",
                iss(
                  "Departments defend their existing routines even when the complete guest process requires better coordination.",
                  "Local priorities compete"
                )
              ],

              [
                "The sponsor can reinforce the agreed programme purpose, while the process owner coordinates the operational response.",
                null
              ],

              [
                "Together, those roles help prevent departmental priorities from undermining the outcomes approved by the board.",
                [
                  cmp(
                    "a",
                    "Executive sponsor",
                    "Maintains senior commitment and supports decisions needed to achieve the programme's purpose."
                  ),
                  cmp(
                    "b",
                    "Process owner",
                    "Coordinates the complete process and remains accountable for its continuing performance."
                  )
                ]
              ],

              [
                "But governance alone is insufficient unless Qasr can demonstrate that its investments produce the promised benefits.",
                null
              ],

              [
                "Benefits realisation means checking whether the improvements expected from an investment have actually been achieved.",
                t(
                  "Benefits realisation",
                  "Benefits realisation verifies whether the programme delivers the outcomes and improvements used to justify investment."
                )
              ],

              [
                "For Qasr, the mandatory compliance outcome remains central because it explains why the board released funding.",
                null
              ],

              [
                "The programme must demonstrate reliable production of complete digital guest records within the required twenty-four-hour period.",
                dg(
                  "Evidence of compliance",
                  D.flow([
                    "Record|requested",
                    "Complete|data assembled",
                    "Deadline|checked",
                    "+Compliance|demonstrated"
                  ]),
                  "Qasr must demonstrate that the complete record can be produced within the required period."
                )
              ],

              [
                "Additional improvements to guest experience should be measured separately, using suitable baselines and agreed performance indicators.",
                null
              ],

              [
                "A performance indicator is a measure that helps managers judge whether an important outcome is being achieved.",
                st(
                  "Performance indicators should show whether the programme delivers its agreed compliance and guest-experience outcomes."
                )
              ],

              [
                "For example, the process owner might monitor guest-arrival delays to evaluate whether redesigned handoffs improve service.",
                null
              ],

              [
                "That measure matters because a technically successful implementation may still leave customers experiencing familiar problems.",
                dg(
                  "Checking the wider benefits",
                  D.flow([
                    "Baseline|recorded",
                    "Handoffs|redesigned",
                    "Arrival|time measured",
                    "+Benefits|evaluated"
                  ]),
                  "Guest-arrival performance can be compared with its baseline to evaluate whether service improvements are sustained."
                )
              ],

              [
                "Now consider another risk: the executive sponsor who originally supported the programme may leave the organisation.",
                null
              ],

              [
                "A successor might question continuing expenditure unless the programme's purpose, responsibilities, and benefits remain clearly documented.",
                iss(
                  "A sponsor changes, and the incoming executive questions commitments that were never clearly documented.",
                  "Continuity is threatened"
                )
              ],

              [
                "This is why the programme needs agreed measures and governance arrangements rather than relying on one person's enthusiasm.",
                null
              ],

              [
                "Clear documentation allows new leaders to understand the original investment rationale and evaluate continuing commitments fairly.",
                st(
                  "Documented purpose, ownership, and benefits protect programme continuity when executive sponsorship changes."
                )
              ],

              [
                "The director should therefore prepare for operational ownership before declaring the temporary change programme complete.",
                null
              ],

              [
                "That transition matters because improved processes must remain effective during everyday operations, not only during project demonstrations.",
                dg(
                  "From programme to continuing management",
                  D.flow([
                    "Programme|delivers",
                    "Ownership|transfers",
                    "Performance|reviewed",
                    "+Improvement|continues"
                  ]),
                  "Continuing process ownership and performance review help preserve benefits after the temporary programme ends."
                )
              ],

              [
                "Think again about our traveller at Qasr Marina, whose experience revealed weaknesses hidden by departmental reports.",
                null
              ],

              [
                "Her next visit should benefit from a process that continues working reliably after the programme team departs.",
                q(
                  "Will the improved guest journey remain effective when the original programme is no longer active?"
                )
              ],

              [
                "That is the deeper promise of BPM: managing performance continuously rather than treating improvement as a temporary intervention.",
                null
              ],

              [
                "With ownership, measurement, and governance connected, Qasr can pursue lasting improvement beyond the event that triggered investment.",
                st(
                  "Sustainable BPM connects executive sponsorship, process ownership, measurable benefits, and continuing operational governance."
                )
              ]

            ]
          }

        ]
      },

      // ================================================================
      // LESSON 4
      // From a promising brief to a credible programme
      //
      // W2O1: Distinguish the drivers of BPM from its triggers.
      // W2O2: Explain why persistent decline may not generate action.
      // W2O3: Articulate a board-acceptable programme purpose.
      // CLOs: K1 and K2.
      //
      // Parts:
      // W2O4a · Questions that expose an incomplete brief.
      // W2O4b · Making the board's business case coherent.
      // W2O4c · Applying the distinction beyond Qasr.
      //
      // Sources: Week 2 Session 1 slides 6–7, 13, 16, 18–22.
      // Week 2 delivery plan: Sessions 1 and 2.
      //
      // The final part introduces the Week 2 asynchronous forum:
      // "Three Pressures, One Budget".
      //
      // The separate forum case and exhibit were not supplied.
      // No organisation, numerical evidence, or model answer is
      // invented for that activity.
      //
      // This lesson consolidates the complete Week 2 argument:
      // drivers create pressure, triggers unlock action, programme
      // purpose aligns expectations, and governance sustains results.
      // ================================================================

      {
        id: "w2l4",
        title: "From a promising brief to a credible programme",

        sections: [

          // ------------------------------------------------------------
          // PART 1 · W2O4a
          // Questions that expose an incomplete brief
          // Sources: Slides 6–7, 16.
          // ------------------------------------------------------------

          {
            title: "Questions that expose an incomplete brief",
            sec: "W2O4a",

            lines: [

              [
                "Let's imagine you're joining Qasr Hospitality as an adviser, shortly after its board approves the BPM programme.",
                t(
                  "Before the programme begins",
                  "A credible BPM brief must explain why the organisation is acting, what it must deliver, and who will be accountable."
                )
              ],

              [
                "The programme director welcomes you warmly and hands you a document describing an ambitious digital transformation.",
                null
              ],

              [
                "It promises better efficiency, improved guest satisfaction, and modern information systems across the hotel group.",
                st(
                  "The programme brief promises several attractive improvements, but its purpose still needs to be tested."
                )
              ],

              [
                "Those ambitions sound attractive, but you notice something important is missing from the explanation.",
                null
              ],

              [
                "The document never clearly explains why management approved the investment at this particular moment.",
                q(
                  "What changed that made the board approve funding now?"
                )
              ],

              [
                "That omission matters because a programme can pursue worthwhile improvements while overlooking the obligation that secured funding.",
                null
              ],

              [
                "You remember that Qasr had experienced declining satisfaction, competitive pressure, rising costs, and lost corporate accounts.",
                dg(
                  "The pressures already existed",
                  D.flow([
                    "Guest|satisfaction",
                    "Mobile|check-in",
                    "Operating|costs",
                    "Corporate|accounts"
                  ]),
                  "Four business pressures existed before Qasr approved its major BPM programme."
                )
              ],

              [
                "Those drivers explain why improvement was desirable, but none had produced the board's decisive commitment.",
                null
              ],

              [
                "The regulatory announcement changed that situation by introducing a specific requirement and a defined deadline.",
                dg(
                  "The event that changed the decision",
                  D.flow([
                    "Existing|pressures",
                    "Regulatory|announcement",
                    "Funding|approved",
                    "+Programme|launched"
                  ]),
                  "The regulatory announcement converted longstanding pressure into a funded programme."
                )
              ],

              [
                "Once you identify that trigger, the programme's central obligation becomes much easier to recognise.",
                null
              ],

              [
                "Qasr must produce complete digital guest records within twenty-four hours of request, beginning in January.",
                st(
                  "The original funding rationale concerns meeting the new digital guest-record requirement."
                )
              ],

              [
                "Now you can examine whether the proposed work actually addresses the reason the board approved investment.",
                null
              ],

              [
                "A brief concentrating entirely on reception technology might overlook the information needed from other systems.",
                iss(
                  "The proposed solution improves reception technology without ensuring complete guest records can be produced.",
                  "The solution misses the obligation"
                )
              ],

              [
                "That would be dangerous because installing new software does not automatically demonstrate compliance with a regulatory requirement.",
                null
              ],

              [
                "You therefore ask what evidence will demonstrate that the complete record-production process meets the required deadline.",
                q(
                  "What evidence will show that Qasr can produce complete digital guest records within twenty-four hours?"
                )
              ],

              [
                "The answer should describe a verifiable outcome rather than simply promise that new systems will operate successfully.",
                null
              ],

              [
                "Next, you examine scope, meaning the work included within the programme and the boundaries of its responsibilities.",
                t(
                  "Programme scope",
                  "Scope defines which processes and improvements the programme will address."
                )
              ],

              [
                "Qasr operates fourteen properties, so unclear boundaries could produce different interpretations of the programme across the group.",
                null
              ],

              [
                "Managers need to understand which processes must change and which improvements can reasonably follow later.",
                dg(
                  "Defining the programme boundary",
                  D.flow([
                    "Required|outcome",
                    "Affected|processes",
                    "Agreed|scope",
                    "+Delivery|commitment"
                  ]),
                  "A clear programme boundary connects the required outcome with the processes included in the approved work."
                )
              ],

              [
                "That distinction protects the deadline because unlimited ambitions can overwhelm the resources available for mandatory work.",
                null
              ],

              [
                "But defining scope still leaves another question about who can make decisions across departmental boundaries.",
                q(
                  "Who has the authority to resolve disagreements affecting the complete guest-record process?"
                )
              ],

              [
                "A named process owner needs genuine influence because fragmented authority can prevent coordinated improvements from taking effect.",
                null
              ],

              [
                "Without that mandate, departments may protect their existing procedures while the programme director remains accountable for results.",
                iss(
                  "The programme has an accountable director, but departmental managers can block necessary process changes.",
                  "Responsibility without authority"
                )
              ],

              [
                "You also examine whether the organisation has recorded its current performance before introducing the proposed changes.",
                null
              ],

              [
                "A baseline matters because later claims about better service or lower costs need credible comparisons.",
                dg(
                  "Making benefits measurable",
                  D.flow([
                    "Current|performance",
                    "Agreed|measures",
                    "Process|changes",
                    "+Results|verified"
                  ]),
                  "Recorded starting performance allows the organisation to evaluate whether its programme delivers the promised benefits."
                )
              ],

              [
                "Finally, you consider whether employees understand why their work must change and how the new arrangements affect them.",
                null
              ],

              [
                "Their understanding matters because redesigned procedures cannot deliver lasting benefits unless people use them consistently.",
                st(
                  "A credible programme connects its purpose with ownership, measurement, employee preparation, and continuing governance."
                )
              ],

              [
                "Notice how these questions turn an attractive proposal into something that managers can evaluate and defend.",
                null
              ],

              [
                "You're no longer asking whether digital transformation sounds impressive, but whether Qasr can deliver its agreed outcomes.",
                q(
                  "Does the brief connect the funding trigger with a measurable outcome and the authority needed to deliver it?"
                )
              ],

              [
                "That's the standard we should apply whenever an organisation asks us to evaluate a proposed BPM initiative.",
                null
              ]

            ]
          },

          // ------------------------------------------------------------
          // PART 2 · W2O4b
          // Making the board's business case coherent
          // Sources: Slides 13, 16, 18–20.
          // ------------------------------------------------------------

          {
            title: "Making the board's business case coherent",
            sec: "W2O4b",

            lines: [

              [
                "Now imagine the programme director inviting you to help prepare Qasr's next presentation to its board.",
                t(
                  "Qasr Hospitality · The business case",
                  "A defensible business case connects the funding trigger, required outcomes, proposed changes, and evidence of benefits."
                )
              ],

              [
                "She wants to demonstrate that the programme deserves continued support, even as its immediate compliance deadline approaches.",
                null
              ],

              [
                "The board originally approved investment because the tourism authority introduced a new digital guest-record requirement.",
                dg(
                  "The original investment rationale",
                  D.flow([
                    "Regulatory|announcement",
                    "Compliance|gap",
                    "Board|approval",
                    "+Programme|funded"
                  ]),
                  "The board approved the programme following a regulatory announcement that exposed Qasr's inability to meet the new requirement."
                )
              ],

              [
                "That history matters because directors will reasonably expect the programme to address the obligation that justified their decision.",
                null
              ],

              [
                "But the director also wants to improve guest experience, which remains a legitimate organisational ambition.",
                [
                  cmp(
                    "a",
                    "Required result",
                    "Produce complete digital guest records within twenty-four hours of request."
                  ),
                  cmp(
                    "b",
                    "Additional value",
                    "Improve connected guest-service processes where fragmented information causes difficulties."
                  )
                ]
              ],

              [
                "Your challenge is to connect those purposes without pretending that either one automatically delivers the other.",
                null
              ],

              [
                "A business case explains why an investment is justified by connecting expected outcomes with the resources and risks involved.",
                t(
                  "Understanding the business case",
                  "A business case explains why proposed investment is justified and how its expected outcomes will be demonstrated."
                )
              ],

              [
                "For Qasr, the case should begin with the specific compliance gap rather than a vague promise of modernisation.",
                null
              ],

              [
                "Guest information remains distributed across four systems, preventing reliable production of the complete required record.",
                iss(
                  "Fragmented guest information prevents Qasr from reliably producing complete digital records within the required period.",
                  "The problem requiring investment"
                )
              ],

              [
                "That weakness gives the programme a concrete problem to solve and a result against which progress can be judged.",
                null
              ],

              [
                "The proposed response should therefore explain how process redesign will make the necessary information available and usable.",
                dg(
                  "Connecting the problem with the response",
                  D.flow([
                    "Fragmented|information",
                    "Process|redesign",
                    "Complete|guest record",
                    "+Compliance|demonstrated"
                  ]),
                  "The proposed changes must address the fragmented information preventing reliable compliance."
                )
              ],

              [
                "Notice that this reasoning begins with the required outcome rather than assuming that purchasing technology constitutes success.",
                null
              ],

              [
                "A new system may support improvement, but its installation cannot substitute for evidence of process performance.",
                st(
                  "Technology implementation is an activity, while demonstrated compliance is the outcome the board needs."
                )
              ],

              [
                "Now consider the additional value Qasr hopes to obtain through better coordination of guest-service activities.",
                null
              ],

              [
                "Our traveller's experience revealed repeated information requests, departmental handoffs, and delays that damaged customer satisfaction.",
                dg(
                  "The wider improvement opportunity",
                  D.flow([
                    "Guest|arrives",
                    "Information|fragmented",
                    "!Handoffs|delay service",
                    "!Experience|suffers"
                  ]),
                  "Fragmented information can affect guest service as well as the separate regulatory record-production obligation."
                )
              ],

              [
                "Those weaknesses provide a reasonable basis for exploring wider benefits, although the programme must still demonstrate them.",
                null
              ],

              [
                "You recommend recording current performance so later improvements can be evaluated against an agreed starting point.",
                st(
                  "Additional benefits should be measured against recorded baselines rather than assumed from successful implementation."
                )
              ],

              [
                "The director also needs to explain how progress will be reviewed and who can resolve cross-department difficulties.",
                null
              ],

              [
                "That governance arrangement matters because fragmented decision-making could undermine the very process connections the programme seeks to improve.",
                dg(
                  "Making delivery accountable",
                  D.flow([
                    "Board|sponsor",
                    "Programme|director",
                    "Process|owner",
                    "+Performance|review"
                  ]),
                  "Clear sponsorship, delivery responsibility, process ownership, and performance review support accountable implementation."
                )
              ],

              [
                "Now imagine the board asking what happens if wider guest-experience improvements compete with the compliance deadline.",
                q(
                  "Which commitments must the programme protect when available resources cannot support every proposed improvement?"
                )
              ],

              [
                "The director should protect mandatory compliance while making explicit decisions about the timing of additional improvements.",
                null
              ],

              [
                "That approach avoids promising everything simultaneously and makes the programme's priorities easier for stakeholders to understand.",
                [
                  cmp(
                    "a",
                    "Mandatory commitment",
                    "The programme must satisfy the regulatory guest-record requirement."
                  ),
                  cmp(
                    "b",
                    "Managed ambition",
                    "Additional service improvements should have agreed scope, measures, and realistic delivery commitments."
                  )
                ]
              ],

              [
                "The board may also ask whether the programme will remain useful after the immediate compliance requirement is satisfied.",
                null
              ],

              [
                "That question matters because continuing improvement requires ownership and performance monitoring beyond the temporary programme.",
                dg(
                  "Protecting long-term value",
                  D.flow([
                    "Compliance|achieved",
                    "Ownership|continues",
                    "Benefits|monitored",
                    "+Performance|sustained"
                  ]),
                  "Continuing process ownership and benefit monitoring help protect improvements after the initial compliance trigger has been resolved."
                )
              ],

              [
                "A credible business case should therefore distinguish immediate delivery commitments from benefits requiring continuing management.",
                null
              ],

              [
                "You help the director prepare a purpose statement that preserves both the original obligation and wider improvement ambition.",
                st(
                  "Qasr will redesign guest-record processes to meet January's twenty-four-hour regulatory requirement while improving connected guest services."
                )
              ],

              [
                "That statement is useful because it identifies the required outcome without claiming that every desirable benefit is guaranteed.",
                null
              ],

              [
                "The supporting business case can then specify evidence, responsibilities, boundaries, and the resources needed for delivery.",
                q(
                  "Can the board trace every major commitment back to an agreed purpose and a defensible measure of success?"
                )
              ],

              [
                "If the answer is yes, the programme has moved beyond attractive promises toward an accountable investment decision.",
                null
              ],

              [
                "And that gives us a useful foundation for evaluating similar decisions in organisations beyond Qasr Hospitality.",
                st(
                  "A coherent business case aligns the reason for investment with delivery priorities, measurable outcomes, and continuing accountability."
                )
              ]

            ]
          },

          // ------------------------------------------------------------
          // PART 3 · W2O4c
          // Applying the distinction beyond Qasr
          // Sources: Slides 20–22 and Week 2 delivery plan.
          //
          // Forum: "Three Pressures, One Budget".
          // The separate case and exhibit are not available here.
          // The narration introduces the verified learning activity
          // without inventing the missing case details.
          // ------------------------------------------------------------

          {
  title: "Applying the distinction beyond Qasr",
  sec: "W2O4c",
  lines: [
    ["Before we finish Week Two, I'd like you to step back from Qasr and consider what you've learned.", t("Bringing Week 2 together", "Why organisations begin BPM programmes, and how their reasons for acting shape what happens next.")],
    ["Our story began with a hotel group facing several problems that had been visible for some time.", null],
    ["Guest satisfaction was declining, competitors were changing expectations, operating costs were rising, and corporate accounts were disappearing.", dg("The pressures behind Qasr's decision", D.flow(["Guest|satisfaction", "Mobile|check-in", "Operating|costs", "Corporate|accounts"]), "Qasr faced several longstanding business pressures before the board approved its BPM programme.")],
    ["Those conditions were drivers because they created pressure for change without necessarily producing an immediate investment decision.", null],
    ["The decisive change came when the tourism authority announced a requirement that Qasr could not reliably satisfy.", dg("From drivers to a trigger", D.flow(["Business|pressures", "Regulatory|announcement", "Board|commitment", "+BPM|programme"]), "The regulatory announcement transformed existing pressure into an approved and funded BPM programme.")],
    ["That event was the trigger because it explained why management acted at that particular moment.", st("Drivers explain why improvement is needed, while triggers explain why the organisation acts now.")],
    ["We also discovered that Qasr's internal improvement ambitions could differ from the original compliance rationale.", null],
    ["Better guest experiences would create value, but they could not replace the required digital guest-record outcome.", [cmp("a", "Original funding rationale", "Meet the new regulatory requirement for complete digital guest records."), cmp("b", "Additional improvement ambition", "Improve the connected processes shaping guest experiences.")]],
    ["A clear purpose also needs genuine process ownership, meaningful measures, executive sponsorship, and continuing governance.", dg("What supports a credible programme", D.flow(["Purpose|agreed", "Ownership|established", "Performance|measured", "+Benefits|sustained"]), "A credible BPM programme connects its purpose with accountable ownership, measurement, and sustained performance.")],
    ["Those arrangements matter because the urgency created by a trigger may disappear before wider improvements become established.", null],
    ["Now I'd like you to apply this reasoning to an organisation you haven't examined with me.", t("Your Week 2 forum", "Three Pressures, One Budget")],
    ["The discussion forum presents a new case called Three Pressures, One Budget, together with a supporting exhibit.", null],
    ["Your task is to examine the evidence and justify a funding rationale that can withstand reasonable challenge.", q("Which funding rationale can you defend with evidence from the case?")],
    ["As you read, distinguish continuing business pressures from any event that makes immediate action necessary.", null],
    ["This distinction matters because a serious problem does not always explain why funding should be approved now.", st("A strong funding argument explains both the need for change and the timing of the proposed decision.")],
    ["A persuasive argument should connect the selected rationale with a concrete outcome that the organisation can demonstrate.", dg("Building a defensible argument", D.flow(["Case|evidence", "Funding|rationale", "Expected|outcome", "+Reasoned|justification"]), "A defensible forum response connects the available evidence with a funding rationale and a demonstrable outcome.")],
    ["Avoid choosing an argument simply because it sounds urgent or uses impressive language about organisational transformation.", null],
    ["Instead, explain why the evidence supports your interpretation and what decision should reasonably follow from it.", q("What evidence would convince a sceptical board that your chosen rationale deserves funding?")],
    ["Consider how a different interpretation might lead another manager to favour a competing use of the budget.", null],
    ["That possibility matters because organisational decisions often involve legitimate priorities that cannot all receive equal resources.", [cmp("a", "Your proposed rationale", "Explain why the available evidence supports your preferred funding decision."), cmp("b", "A competing rationale", "Consider why another reasonable decision maker might interpret the evidence differently.")]],
    ["Your argument becomes stronger when you acknowledge competing concerns rather than pretending that reasonable disagreement is impossible.", null],
    ["Post your own substantive answer by mid-week, before reading anyone else's, so your first reasoning is genuinely yours.", st("Post your own answer by mid-week, before reading your classmates' posts.")],
    ["Support each claim by citing the chapter, because in this forum an assertion without evidence earns no credit.", null],
    ["Then reply substantively to at least two classmates, and make sure you disagree with at least one.", dg("How the forum works", D.flow(["Read|the case", "Post|your answer", "Read|peers' posts", "+Reply and|challenge"]), "Post your own answer before reading others, then reply to at least two classmates and disagree with at least one.")],
    ["Thoughtful disagreement helps everyone test assumptions and recognise weaknesses that an initial argument might overlook.", q("Which assumption in a classmate's argument could change the recommended funding decision?")],
    ["The purpose is not to win an argument, but to develop a more defensible organisational judgement.", null],
    ["At the end of the week, read the facilitator's summary and compare its reasoning with your own.", st("Use the facilitator's summary to reconsider your funding rationale and the evidence supporting it.")],
    ["The activity is formative, so its purpose is developing your judgement rather than earning a separate grade.", null],
    ["Even so, your forum contributions across the term are what Assessment Four, on participation, rewards.", st("Forum contributions across the term count towards Assessment 4, Participation.")],
    ["As you work, remember Qasr Marina and the difference between recognising a problem and deciding to act.", null],
    ["The central lesson is that a BPM programme needs more than good intentions or a persuasive announcement.", st("Successful BPM begins with a defensible reason for action and continues through accountable delivery and sustained performance.")],
    ["It needs a clear reason for investment, an agreed purpose, and evidence that the promised outcomes are achieved.", null],
    ["Carry that perspective into your forum discussion, because it will help you question organisational decisions more critically.", q("Why should this organisation act now, and how will it demonstrate that the investment was justified?")],
    ["That's the question I want you to remember as we continue exploring Business Process Management.", null]
  ]
}

        ]
      }

    ]
  };

  // Plain-text script for tools that expect it.
  // Preserve the Week 1 script-generation contract exactly.
  COURSE.lessons.forEach((l) =>
    l.sections.forEach((s) =>
      (s.script = s.lines.map((x) => x[0]).join(" "))
    )
  );

})();