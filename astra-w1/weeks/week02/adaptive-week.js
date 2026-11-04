// OPER621 · Business Process Management · Week 2
// Adaptive learning layer: adaptive-week.js
//
// Sources:
// week02-session1-slides.pptx
// week02-delivery-plan.docx
// week1-adaptive.js.txt
// week1-course.js.txt
// week-production-brief.md.txt
//
// STRUCTURAL CONTRACT
//
// window.ADAPTIVE retains the Week 1 structure and variable names.
// Mastery settings are unchanged from Week 1.
// Each section key matches its corresponding COURSE section.sec.
// Each lesson reference matches its corresponding COURSE lesson.id.
// Every section has exactly two remedial variants.
// Remedial variants alternate across successive remediation rounds.
// Each variant contains 230–360 spoken words.
// Narration follows the same sentence and storytelling rules as course.js.
// Each sentence is paired with an existing visual moment or null.
// Only existing MOMENT_KIT helpers and DIAG diagram types are used.
// Remedial examples differ from the corresponding main lesson examples.
//
// COURSE LEARNING OUTCOMES
//
// K1: Analyse the utilization of Business Process Management in today's
//     business environment.
//
// K2: Evaluate various factors that impact on the successful
//     implementation of BPM in public and private sector organizations.
//
// WEEK 2 LEARNING OUTCOMES
//
// W2O1: Distinguish drivers of BPM initiatives from their triggers.
//       CLO mapping: K1, K2.
//
// W2O2: Evaluate why sustained performance decline can produce no action
//       while a single trigger produces a funded programme.
//       CLO mapping: K1, K2.
//
// W2O3: Articulate the purpose of a BPM programme in terms a board
//       will accept.
//       CLO mapping: K1, K2.
//
// W2O4: Apply and synthesise the Week 2 concepts in evaluating
//       organisational BPM decisions.
//       CLO mapping: K1, K2.
//       This is an instructional synthesis group, not an additional
//       official weekly learning outcome.
//
// SECTION MAPPING
//
// W2O1a, W2O1b, W2O1c: Lesson w2l1
// W2O2a, W2O2b, W2O2c: Lesson w2l2
// W2O3a, W2O3b, W2O3c: Lesson w2l3
// W2O4a, W2O4b, W2O4c: Lesson w2l4
//
// NOTE ON TRIGGER TERMINOLOGY
//
// In Week 2, a BPM programme trigger means an event that causes
// management to initiate a programme.
// It is distinct from the operational event that starts an individual
// business process, as discussed in Week 1.
//
// The distinction is preserved throughout remediation.
//
// ================================================================

(() => {

  const D = window.DIAG;
  const { t, it, q, st, iss, cmp, dg } = window.MOMENT_KIT;

  window.ADAPTIVE = {

    target: 0.8,
    window: 5,
    minEvidence: 3,
    firstCheck: 4,
    firstCheckPerSection: 3,
    perWeak: 3,

    clos: {

      K1: {
        name: "K1",
        full: "Analyse the utilization of Business Process Management in today's business environment"
      },

      K2: {
        name: "K2",
        full: "Evaluate various factors that impact on the successful implementation of BPM in public and private sector organizations"
      }

    },

    outcomes: {

      W2O1: {
        clo: "K1",
        clos: ["K1", "K2"],
        name: "Drivers and triggers",
        full: "Distinguish the drivers of a BPM initiative from its triggers"
      },

      W2O2: {
        clo: "K2",
        clos: ["K1", "K2"],
        name: "Why organisations act",
        full: "Evaluate why sustained performance decline can produce no action while a single trigger produces a funded programme"
      },

      W2O3: {
        clo: "K2",
        clos: ["K1", "K2"],
        name: "Programme purpose",
        full: "Articulate the purpose of a BPM programme in terms a board will accept"
      },

      W2O4: {
        clo: "K2",
        clos: ["K1", "K2"],
        name: "Application and synthesis",
        full: "Apply the distinction between drivers and triggers to evaluate programme briefs, funding rationales, and organisational decisions"
      }

    },

    sections: {

      W2O1a: {
        lo: "W2O1",
        lesson: "w2l1",
        name: "Pressure builds before a programme begins"
      },

      W2O1b: {
        lo: "W2O1",
        lesson: "w2l1",
        name: "The event that changes everything"
      },

      W2O1c: {
        lo: "W2O1",
        lesson: "w2l1",
        name: "Reading the real brief behind a trigger"
      },

      W2O2a: {
        lo: "W2O2",
        lesson: "w2l2",
        name: "Four pressures and one decisive event"
      },

      W2O2b: {
        lo: "W2O2",
        lesson: "w2l2",
        name: "The danger of two competing rationales"
      },

      W2O2c: {
        lo: "W2O2",
        lesson: "w2l2",
        name: "Writing a purpose the board can defend"
      },

      W2O3a: {
        lo: "W2O3",
        lesson: "w2l3",
        name: "A process owner needs a real mandate"
      },

      W2O3b: {
        lo: "W2O3",
        lesson: "w2l3",
        name: "Measuring the customer's clock"
      },

      W2O3c: {
        lo: "W2O3",
        lesson: "w2l3",
        name: "Keeping sponsorship and performance alive"
      },

      W2O4a: {
        lo: "W2O4",
        lesson: "w2l4",
        name: "Questions that expose an incomplete brief"
      },

      W2O4b: {
        lo: "W2O4",
        lesson: "w2l4",
        name: "Making the board's business case coherent"
      },

      W2O4c: {
        lo: "W2O4",
        lesson: "w2l4",
        name: "Applying the distinction beyond Qasr"
      }

    },

    // ================================================================
    // REMEDIAL MICRO-LESSONS
    //
    // Two variants per section.
    // Variant 0: initial remediation.
    // Variant 1: alternative explanation on the next remediation round.
    // Subsequent rounds alternate between the two variants.
    //
    // Every variant teaches the same learning objective through
    // a different explanatory angle and a fresh concrete example.
    // ================================================================

    review: {

      // ==============================================================
      // W2O1a
      // Pressure builds before a programme begins
      // ==============================================================

      W2O1a: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A neighbourhood supermarket under pressure
        // Angle: accumulating problems without a decision.
        // ------------------------------------------------------------

        {
          title: "The supermarket that kept postponing change",

          lines: [

            [
              "Imagine a neighbourhood supermarket that has served its community successfully for many years.",
              t(
                "Another way to understand drivers",
                "A supermarket can experience growing business pressure without immediately launching a major improvement programme."
              )
            ],

            [
              "Recently, its manager has noticed that customers are spending longer waiting at the checkout counters.",
              null
            ],

            [
              "Some customers complain, but the manager believes the problem can be handled through existing staffing arrangements.",
              iss(
                "Checkout queues are becoming longer, but management continues using its existing arrangements.",
                "A growing service problem"
              )
            ],

            [
              "The supermarket also faces competition from a nearby store offering faster self-service checkout.",
              null
            ],

            [
              "That competitor creates pressure because shoppers may eventually prefer the more convenient alternative.",
              dg(
                "Competitive pressure develops",
                D.flow([
                  "Competitor|innovates",
                  "Customers|compare",
                  "Expectations|rise",
                  "!Pressure|increases"
                ]),
                "A competitor's faster service increases pressure on the supermarket to reconsider its checkout process."
              )
            ],

            [
              "Meanwhile, electricity costs are increasing, making the supermarket's existing operations more expensive.",
              null
            ],

            [
              "The manager recognises these problems, yet continues making small adjustments instead of redesigning the complete process.",
              st(
                "Management recognises several problems but has not committed to a coordinated improvement programme."
              )
            ],

            [
              "This situation illustrates a driver, meaning a condition that creates pressure for organisational change.",
              null
            ],

            [
              "The longer queues represent a service driver because customers are experiencing declining convenience.",
              it(
                1,
                3,
                "clock",
                "Service pressure",
                "Longer checkout queues create pressure to improve the customer experience."
              )
            ],

            [
              "The competing store represents a competitive driver because customers now have a potentially more attractive alternative.",
              null
            ],

            [
              "Rising electricity costs represent a financial driver because operating the supermarket has become more expensive.",
              [
                it(
                  2,
                  3,
                  "chart",
                  "Competitive pressure",
                  "A nearby store offers customers a faster checkout experience."
                ),
                it(
                  3,
                  3,
                  "gauge",
                  "Financial pressure",
                  "Rising electricity costs increase the supermarket's operating expenses."
                )
              ]
            ],

            [
              "Notice that these pressures explain why improvement would be desirable, but not why management must act immediately.",
              null
            ],

            [
              "The manager may understand the problems while believing that other investments deserve greater attention.",
              q(
                "Can a business recognise serious problems without immediately approving a major improvement programme?"
              )
            ],

            [
              "This is why the existence of a problem does not automatically produce a funded BPM initiative.",
              null
            ],

            [
              "Funding requires a management decision, and that decision may be postponed despite mounting evidence.",
              dg(
                "Pressure does not guarantee action",
                D.flow([
                  "Service|pressure",
                  "Competition",
                  "Operating|costs",
                  "!Decision|postponed"
                ]),
                "Several drivers can accumulate without producing an approved programme."
              )
            ],

            [
              "Now imagine the manager reviewing another month of disappointing checkout performance without changing the investment plan.",
              null
            ],

            [
              "The underlying pressures have become stronger, but the organisation's response remains largely unchanged.",
              st(
                "Drivers can persist and intensify without producing a decisive organisational commitment."
              )
            ],

            [
              "That distinction helps explain why organisations sometimes tolerate familiar weaknesses for surprisingly long periods.",
              null
            ],

            [
              "When examining a BPM initiative, ask whether an event eventually changed management's willingness to invest.",
              q(
                "What changed the organisation's decision rather than merely increasing its existing pressure?"
              )
            ],

            [
              "If no such event has occurred, the business may still be experiencing drivers without a decisive trigger.",
              null
            ],

            [
              "Remember that a driver explains the need for change, while a trigger explains the timing of action.",
              st(
                "A driver creates pressure for improvement, but pressure alone does not guarantee a funded programme."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A public library facing changing expectations
        // Angle: distinguishing organisational need from commitment.
        // ------------------------------------------------------------

        {
          title: "The library that knew it needed to change",

          lines: [

            [
              "Let's explore the same distinction through a public library serving a growing residential community.",
              t(
                "Understanding pressure without action",
                "A public library can recognise changing community needs without immediately approving a service redesign."
              )
            ],

            [
              "The library has noticed that visitors increasingly expect to reserve books and access services online.",
              null
            ],

            [
              "Its existing reservation process still depends heavily on telephone calls and manual record keeping.",
              dg(
                "The existing library process",
                D.flow([
                  "Reader|calls",
                  "Employee|checks",
                  "Reservation|recorded",
                  "Reader|waits"
                ]),
                "The library's reservation process relies on manual activities that may become less convenient as expectations change."
              )
            ],

            [
              "Staff members regularly discuss modernising the service, but the proposal never becomes an approved project.",
              null
            ],

            [
              "The library also faces growing demand from residents who have moved into nearby neighbourhoods.",
              iss(
                "Community demand is increasing, but the library has not approved a coordinated service improvement programme.",
                "Pressure is accumulating"
              )
            ],

            [
              "Employees work harder to accommodate additional visitors, although the underlying reservation process remains unchanged.",
              null
            ],

            [
              "This situation contains several drivers, even though the library has not launched a BPM initiative.",
              st(
                "A driver is an ongoing condition that makes organisational improvement increasingly desirable."
              )
            ],

            [
              "Changing expectations create service pressure because residents compare the library with other convenient digital services.",
              null
            ],

            [
              "Population growth creates capacity pressure because more people need access to the same limited resources.",
              [
                cmp(
                  "a",
                  "Changing expectations",
                  "Residents increasingly expect convenient online services."
                ),
                cmp(
                  "b",
                  "Growing demand",
                  "More residents need access to the library's existing services."
                )
              ]
            ],

            [
              "Neither pressure automatically establishes the funding, authority, or timetable needed for a major redesign.",
              null
            ],

            [
              "The library director might agree that improvement is necessary while facing competing demands on the available budget.",
              q(
                "Why might a manager recognise the need for improvement but still postpone investment?"
              )
            ],

            [
              "Perhaps the building requires maintenance, or the library must replace essential equipment before funding new services.",
              null
            ],

            [
              "These competing priorities help explain why recognising a problem and authorising a programme are separate decisions.",
              dg(
                "Competing management priorities",
                D.flow([
                  "Service|improvement",
                  "Building|maintenance",
                  "Equipment|replacement",
                  "!Budget|decision"
                ]),
                "Management must choose between competing investments even when the need for service improvement is recognised."
              )
            ],

            [
              "Now imagine residents submitting more complaints about reservation delays during a particularly busy period.",
              null
            ],

            [
              "Those complaints strengthen the existing pressure, but they do not necessarily force management to approve investment.",
              iss(
                "Complaints increase, yet management continues postponing the proposed service redesign.",
                "A driver becomes stronger"
              )
            ],

            [
              "The important question is whether anything has changed the organisation's decision to commit resources.",
              null
            ],

            [
              "Until that decision changes, the library may remain aware of its problems without beginning a coordinated programme.",
              st(
                "Awareness of a problem does not establish that an organisation has committed to solving it."
              )
            ],

            [
              "This distinction matters because analysts sometimes confuse a persuasive reason for improvement with evidence of actual commitment.",
              null
            ],

            [
              "When studying an organisational history, examine what management discussed and what it actually authorised.",
              q(
                "Did the organisation merely acknowledge the problem, or did it approve a funded programme?"
              )
            ],

            [
              "Those are different forms of evidence, and they support different conclusions about the organisation's response.",
              null
            ],

            [
              "Remember that persistent drivers can explain why change is needed without explaining why action begins now.",
              st(
                "Drivers explain the continuing need for change, while the decision to act requires a separate explanation."
              )
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O1b
      // The event that changes everything
      // ==============================================================

      W2O1b: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A manufacturer facing a major customer deadline
        // Angle: a contract renewal changes the cost of postponement.
        // ------------------------------------------------------------

        {
          title: "The contract renewal that changed everything",

          lines: [

            [
              "Imagine a small manufacturer supplying specialised packaging to several large food producers.",
              t(
                "Another way to understand triggers",
                "A customer's contract renewal can turn familiar operational weaknesses into an urgent improvement programme."
              )
            ],

            [
              "For several years, employees have complained about confusing production schedules and repeated changes to customer orders.",
              null
            ],

            [
              "Managers recognise the difficulties, but they continue making temporary adjustments rather than redesigning the scheduling process.",
              iss(
                "Production scheduling problems persist, but management relies on temporary adjustments.",
                "A longstanding weakness"
              )
            ],

            [
              "The manufacturer also experiences rising material costs, making wasted production time increasingly expensive.",
              null
            ],

            [
              "These problems create drivers because they make the existing way of working less sustainable.",
              dg(
                "The pressures already exist",
                D.flow([
                  "Scheduling|problems",
                  "Material|costs",
                  "Operational|pressure",
                  "!Change|postponed"
                ]),
                "The manufacturer faces ongoing pressures but has not committed to a coordinated process improvement programme."
              )
            ],

            [
              "Now imagine its largest customer announcing new performance conditions for the upcoming contract renewal.",
              null
            ],

            [
              "The customer requires reliable delivery information and warns that future orders depend on meeting the new conditions.",
              iss(
                "A major customer introduces new delivery requirements as part of a contract renewal.",
                "A decisive event"
              )
            ],

            [
              "Suddenly, the manufacturer faces a specific commercial decision with consequences that cannot easily be postponed.",
              null
            ],

            [
              "Management approves a scheduling improvement programme because losing the contract would threaten an important source of revenue.",
              dg(
                "The trigger produces action",
                D.flow([
                  "Contract|renewal",
                  "New|requirements",
                  "Management|approval",
                  "+Programme|launched"
                ]),
                "The customer's contract renewal changes management's willingness to fund process improvement."
              )
            ],

            [
              "The contract renewal is the trigger because it explains why the organisation finally acts now.",
              null
            ],

            [
              "The scheduling weaknesses and rising costs remain drivers because they existed before that decisive event.",
              [
                cmp(
                  "a",
                  "Drivers",
                  "Scheduling weaknesses and rising costs create continuing pressure."
                ),
                cmp(
                  "b",
                  "Trigger",
                  "The contract renewal creates an immediate reason to approve investment."
                )
              ]
            ],

            [
              "Notice that the customer did not create the manufacturer's scheduling problems through the renewal announcement.",
              null
            ],

            [
              "The announcement changed the consequences of leaving those problems unresolved, making continued delay harder to justify.",
              st(
                "A trigger changes the urgency of responding to existing problems without necessarily creating those problems."
              )
            ],

            [
              "This distinction also reveals how the improvement programme will probably be judged by its sponsors.",
              null
            ],

            [
              "Management will expect evidence that the redesigned scheduling process satisfies the customer's new delivery conditions.",
              q(
                "What outcome must the programme demonstrate to protect the renewed customer contract?"
              )
            ],

            [
              "Reducing internal frustration would be valuable, but it would not replace the customer's specific requirements.",
              null
            ],

            [
              "The programme must therefore connect its proposed changes with the outcome that justified the investment.",
              dg(
                "The funding rationale shapes success",
                D.flow([
                  "Customer|requirement",
                  "Scheduling|redesign",
                  "Delivery|evidence",
                  "+Contract|protected"
                ]),
                "The programme must demonstrate performance against the customer requirements that triggered investment."
              )
            ],

            [
              "This is why identifying a trigger helps managers understand deadlines, priorities, and the evidence expected from delivery.",
              null
            ],

            [
              "When analysing another organisation, look for the event that changed management's decision rather than merely its concerns.",
              st(
                "A trigger explains why the organisation commits to action at a particular moment."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A city bus operator after a serious service disruption
        // Angle: a visible incident converts accumulated pressure.
        // ------------------------------------------------------------

        {
          title: "The morning the bus network stopped",

          lines: [

            [
              "Imagine a city bus operator whose passengers have complained about unreliable services for several years.",
              t(
                "When an incident becomes a trigger",
                "A major service disruption can convert longstanding operational pressure into an approved improvement programme."
              )
            ],

            [
              "Buses frequently arrive late, and passengers struggle to obtain accurate information about changing departure times.",
              null
            ],

            [
              "Managers know these problems exist, but improvement proposals repeatedly compete with other demands on the budget.",
              iss(
                "Passengers experience unreliable services, but management has not approved a comprehensive process improvement programme.",
                "Persistent service pressure"
              )
            ],

            [
              "The operator also faces rising maintenance costs, increasing the financial pressure surrounding its daily operations.",
              null
            ],

            [
              "These conditions are drivers because they make the existing service arrangements increasingly difficult to defend.",
              dg(
                "Pressure builds over time",
                D.flow([
                  "Late|buses",
                  "Poor|information",
                  "Maintenance|costs",
                  "!Action|delayed"
                ]),
                "Several operational drivers persist without producing a funded programme."
              )
            ],

            [
              "Now imagine a major scheduling failure disrupting services across the city during a busy working morning.",
              null
            ],

            [
              "Thousands of passengers experience uncertainty, and the incident attracts intense attention from the operator's governing board.",
              iss(
                "A major scheduling failure disrupts the bus network and attracts immediate board attention.",
                "A visible disruption"
              )
            ],

            [
              "The board demands an explanation and authorises a programme to improve scheduling and passenger information.",
              null
            ],

            [
              "The organisation has finally moved from recognising problems toward committing resources to address them.",
              dg(
                "The decision changes",
                D.flow([
                  "Major|disruption",
                  "Board|attention",
                  "Funding|approved",
                  "+Programme|begins"
                ]),
                "The visible disruption creates the urgency needed for management to approve a coordinated improvement programme."
              )
            ],

            [
              "The scheduling failure is the trigger because it explains why the programme begins at that moment.",
              null
            ],

            [
              "The earlier delays and maintenance costs are drivers because they had been creating pressure for years.",
              [
                cmp(
                  "a",
                  "Drivers",
                  "Recurring delays and rising costs create continuing pressure."
                ),
                cmp(
                  "b",
                  "Trigger",
                  "A major scheduling disruption creates immediate board attention and commitment."
                )
              ]
            ],

            [
              "Notice that the disruption did not necessarily introduce a completely new weakness into the organisation.",
              null
            ],

            [
              "Instead, it made existing weaknesses highly visible and changed management's willingness to tolerate them.",
              st(
                "A trigger can make an existing problem impossible for decision makers to continue overlooking."
              )
            ],

            [
              "Now consider what the board will expect from the improvement programme it has just approved.",
              null
            ],

            [
              "Directors will probably want evidence that scheduling has become more reliable and passengers receive useful information.",
              q(
                "What evidence would show that the programme addresses the problem that triggered funding?"
              )
            ],

            [
              "The programme might also reduce maintenance costs, but those savings would represent a different potential benefit.",
              null
            ],

            [
              "This matters because sponsors need to distinguish the immediate reason for action from additional improvement opportunities.",
              dg(
                "Connecting the trigger with outcomes",
                D.flow([
                  "Service|disruption",
                  "Scheduling|redesign",
                  "Reliable|information",
                  "+Service|improves"
                ]),
                "The programme should demonstrate improvements connected to the service disruption that triggered investment."
              )
            ],

            [
              "A programme that reduces costs without improving reliability might disappoint the board despite producing genuine savings.",
              null
            ],

            [
              "That is why the trigger helps reveal what decision makers will consider successful programme delivery.",
              st(
                "Understanding the trigger helps managers identify the outcomes that sponsors expect the programme to deliver."
              )
            ],

            [
              "Whenever you analyse a BPM initiative, ask what changed the organisation's response from discussion into commitment.",
              null
            ],

            [
              "That event often explains the programme's timing more clearly than the problems that existed beforehand.",
              q(
                "Which event explains why management acted now rather than continuing to postpone improvement?"
              )
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O1c
      // Reading the real brief behind a trigger
      // ==============================================================

      W2O1c: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A pharmaceutical distributor facing an audit deadline
        // Angle: compliance funding versus broader operational value.
        // ------------------------------------------------------------

        {
          title: "The audit deadline and the warehouse redesign",

          lines: [

            [
              "Imagine a pharmaceutical distributor whose warehouse employees struggle to locate complete records for individual medicine shipments.",
              t(
                "Reading the real programme brief",
                "A compliance deadline can fund improvement while creating expectations different from broader operational ambitions."
              )
            ],

            [
              "Managers have discussed the fragmented records for months, but the proposed improvements remain unfunded.",
              null
            ],

            [
              "Employees continue searching across several files whenever customers request information about previous deliveries.",
              iss(
                "Shipment records remain fragmented, creating delays and unnecessary work.",
                "An existing operational weakness"
              )
            ],

            [
              "Now imagine an external audit being scheduled, with the distributor required to demonstrate reliable shipment traceability.",
              null
            ],

            [
              "Traceability means being able to follow a shipment through its recorded movements and identify relevant information.",
              dg(
                "The traceability requirement",
                D.flow([
                  "Shipment|received",
                  "Movement|recorded",
                  "Delivery|confirmed",
                  "+History|available"
                ]),
                "Reliable traceability requires accessible records covering the shipment's relevant movements."
              )
            ],

            [
              "The audit deadline changes management's decision because the organisation must demonstrate that its records meet the requirement.",
              null
            ],

            [
              "Funding is approved for a programme to improve how shipment information is captured and retrieved.",
              st(
                "The audit deadline triggers investment in improving shipment-record processes."
              )
            ],

            [
              "The warehouse manager welcomes the funding because she also wants employees to spend less time searching for information.",
              null
            ],

            [
              "That ambition is valuable, but it differs from the immediate reason the programme received approval.",
              [
                cmp(
                  "a",
                  "Funding rationale",
                  "Demonstrate reliable shipment traceability during the required audit."
                ),
                cmp(
                  "b",
                  "Operational ambition",
                  "Reduce unnecessary searching and improve warehouse efficiency."
                )
              ]
            ],

            [
              "Imagine the programme reporting impressive productivity improvements while the shipment history remains incomplete.",
              null
            ],

            [
              "The audit team would still question whether the distributor could demonstrate the required traceability.",
              iss(
                "Warehouse productivity improves, but the organisation cannot demonstrate complete shipment traceability.",
                "The funded obligation remains unmet"
              )
            ],

            [
              "This illustrates why the trigger influences how programme sponsors define successful delivery.",
              null
            ],

            [
              "A programme funded for compliance must provide evidence that the relevant compliance requirement has been satisfied.",
              st(
                "The original funding rationale establishes an outcome that additional improvements cannot replace."
              )
            ],

            [
              "Now imagine the opposite situation, where the distributor passes its audit but warehouse employees still search inefficiently.",
              null
            ],

            [
              "The immediate obligation has been satisfied, yet the wider operational weakness may remain unresolved.",
              dg(
                "Compliance and wider improvement",
                D.flow([
                  "Audit|requirement",
                  "+Traceability|demonstrated",
                  "!Searching|remains",
                  "Further|improvement"
                ]),
                "Meeting the audit requirement does not automatically eliminate every operational inefficiency."
              )
            ],

            [
              "The programme director should therefore distinguish mandatory outcomes from additional benefits that require separate evidence.",
              null
            ],

            [
              "This distinction protects credibility because stakeholders can understand exactly what the investment promises to deliver.",
              q(
                "Does the programme's stated purpose match the outcome that originally justified its funding?"
              )
            ],

            [
              "A credible brief would connect shipment traceability with realistic improvements to information retrieval and warehouse operations.",
              null
            ],

            [
              "It would also establish measures showing whether each promised result has actually been achieved.",
              st(
                "A strong programme brief reconciles the funding obligation with additional benefits and measures them separately."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A publishing company replacing its editorial platform
        // Angle: the technology trigger and the vendor-design trap.
        // ------------------------------------------------------------

        {
          title: "When new software starts making the decisions",

          lines: [

            [
              "Imagine a publishing company whose editorial teams have used the same content management system for many years.",
              t(
                "The hidden risk in a technology trigger",
                "A software replacement can become dangerous when technology determines the business process instead of supporting it."
              )
            ],

            [
              "The system is becoming difficult to maintain, and its supplier announces that technical support will end.",
              null
            ],

            [
              "Management approves a replacement programme because continuing with unsupported software creates unacceptable operational risk.",
              dg(
                "The replacement trigger",
                D.flow([
                  "Supplier|announcement",
                  "Support|ending",
                  "Management|approval",
                  "+Replacement|programme"
                ]),
                "The supplier's announcement creates urgency and triggers the approved replacement programme."
              )
            ],

            [
              "The programme team begins evaluating modern platforms that promise faster editing and easier collaboration.",
              null
            ],

            [
              "Those benefits sound attractive because editors currently experience delays when articles move between different teams.",
              st(
                "Technology replacement can create opportunities to improve the business process as well as the supporting system."
              )
            ],

            [
              "Now imagine the chosen software vendor demonstrating a standard workflow for reviewing and publishing articles.",
              null
            ],

            [
              "The workflow looks efficient, so the project team considers adopting it without examining existing editorial responsibilities.",
              iss(
                "The team accepts the vendor's workflow before understanding the publishing process and its requirements.",
                "The technology trap"
              )
            ],

            [
              "But the publisher handles specialised material that requires careful checks before certain articles can be released.",
              null
            ],

            [
              "If the standard workflow omits those checks, faster publication could create serious quality problems.",
              dg(
                "The process must shape the system",
                D.flow([
                  "Editorial|requirements",
                  "Process|design",
                  "Software|configuration",
                  "+Quality|protected"
                ]),
                "The publishing process should be understood before software configuration determines how editorial work will operate."
              )
            ],

            [
              "This is why the programme must distinguish its technology trigger from the business outcomes it needs to protect.",
              null
            ],

            [
              "The supplier announcement explains why replacement became urgent, but it does not define the ideal editorial process.",
              [
                cmp(
                  "a",
                  "Technology trigger",
                  "The existing software supplier announces the end of technical support."
                ),
                cmp(
                  "b",
                  "Business requirement",
                  "The publisher needs reliable editorial checks and effective collaboration."
                )
              ]
            ],

            [
              "The programme should examine how articles move through review, approval, and publication before finalising the new workflow.",
              null
            ],

            [
              "That investigation matters because a system can operate successfully while supporting a badly designed business process.",
              q(
                "Does successful software installation prove that the publishing process now works better?"
              )
            ],

            [
              "The answer is no, because technical implementation and business performance represent different kinds of achievement.",
              null
            ],

            [
              "The project may replace the unsupported system while leaving editorial delays or quality weaknesses unresolved.",
              iss(
                "The new platform operates correctly, but the underlying editorial process remains inefficient or unreliable.",
                "Technical success without process success"
              )
            ],

            [
              "A credible programme brief should therefore identify the replacement obligation alongside the process outcomes being pursued.",
              null
            ],

            [
              "Management can then judge whether the new platform supports the required editorial work rather than dictating it.",
              dg(
                "A coherent replacement programme",
                D.flow([
                  "Replacement|needed",
                  "Process|understood",
                  "System|configured",
                  "+Outcomes|verified"
                ]),
                "A successful replacement programme connects the technology requirement with a deliberately designed business process."
              )
            ],

            [
              "This approach also helps employees understand why particular procedures must change and which safeguards should remain.",
              null
            ],

            [
              "When analysing a technology-driven BPM programme, always ask whether business needs shaped the proposed solution.",
              q(
                "Is the organisation redesigning its process deliberately, or simply adopting the software vendor's preferred workflow?"
              )
            ],

            [
              "Remember that the trigger explains why investment begins, while the programme purpose explains what successful delivery requires.",
              st(
                "A credible programme responds to its trigger without allowing that trigger to replace careful business process design."
              )
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O2a
      // Four pressures and one decisive event
      // ==============================================================

      W2O2a: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A regional courier company
        // Angle: reconstructing a timeline to identify the trigger.
        // ------------------------------------------------------------

        {
          title: "The courier company that finally invested",

          lines: [

            [
              "Imagine a regional courier company whose managers have been concerned about delivery performance for several years.",
              t(
                "Reading an organisational timeline",
                "A courier company's history reveals the difference between accumulated pressure and a decisive funding event."
              )
            ],

            [
              "Customers regularly complain about late parcels, but management continues relying on existing delivery arrangements.",
              null
            ],

            [
              "The complaints create pressure because unreliable deliveries can weaken customer confidence and encourage people to choose competitors.",
              iss(
                "Delivery complaints persist, but management does not approve a comprehensive improvement programme.",
                "An unresolved service driver"
              )
            ],

            [
              "Meanwhile, fuel costs have increased, making the company's established delivery routes more expensive to operate.",
              null
            ],

            [
              "Managers discuss route optimisation, but they postpone major investment because other expenditure appears more urgent.",
              dg(
                "Pressure continues accumulating",
                D.flow([
                  "Delivery|complaints",
                  "Fuel|costs",
                  "Management|discussion",
                  "!Investment|postponed"
                ]),
                "Service and cost pressures exist without producing an approved process improvement programme."
              )
            ],

            [
              "A new competitor then introduces detailed parcel tracking, giving customers greater visibility of their deliveries.",
              null
            ],

            [
              "The company recognises another competitive threat, yet still makes no substantial commitment to redesign its operations.",
              st(
                "Several business drivers can exist without changing management's willingness to invest."
              )
            ],

            [
              "Now imagine the company's largest retail customer approaching the end of its delivery contract.",
              null
            ],

            [
              "The retailer announces that renewal will require more reliable delivery performance and improved tracking information.",
              iss(
                "A major customer introduces new conditions for renewing its delivery contract.",
                "A decisive commercial event"
              )
            ],

            [
              "Within several weeks, the courier company's directors approve a programme to redesign delivery planning and tracking.",
              null
            ],

            [
              "Notice that the operational weaknesses existed long before management finally authorised the investment.",
              dg(
                "The decision changes",
                D.flow([
                  "Existing|pressures",
                  "Contract|conditions",
                  "Funding|approved",
                  "+Programme|launched"
                ]),
                "The customer's contract renewal conditions convert longstanding pressure into an approved improvement programme."
              )
            ],

            [
              "The contract renewal is the trigger because it explains why management acted at that particular moment.",
              null
            ],

            [
              "Delivery complaints, fuel costs, and competitive developments are drivers because they created pressure over time.",
              [
                cmp(
                  "a",
                  "Drivers",
                  "Delivery complaints, fuel costs, and competition created continuing pressure."
                ),
                cmp(
                  "b",
                  "Trigger",
                  "New contract renewal conditions caused management to approve the programme."
                )
              ]
            ],

            [
              "The timing matters because the company repeatedly postponed investment until the contract renewal changed its priorities.",
              null
            ],

            [
              "Without examining that sequence, an analyst might incorrectly claim that rising fuel costs caused the programme.",
              q(
                "Which event best explains the timing of management's funding decision?"
              )
            ],

            [
              "Fuel costs contributed to the need for improvement, but they did not explain the sudden commitment.",
              null
            ],

            [
              "The customer announcement provides stronger evidence because the funding decision followed it closely.",
              st(
                "The event immediately preceding a decision deserves investigation, but timing alone does not prove causation."
              )
            ],

            [
              "You should still examine management records to establish whether directors explicitly connected funding with the contract conditions.",
              null
            ],

            [
              "That evidence would distinguish a supported explanation from an assumption based only on the sequence of events.",
              dg(
                "Testing the explanation",
                D.flow([
                  "Timeline|examined",
                  "Decision|records",
                  "Rationale|identified",
                  "+Conclusion|supported"
                ]),
                "A defensible analysis combines the event timeline with evidence explaining management's actual decision."
              )
            ],

            [
              "Remember that drivers explain why change is needed, while the trigger explains why investment begins now.",
              null
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A municipal recycling service
        // Angle: separating management responses from funded action.
        // ------------------------------------------------------------

        {
          title: "Many complaints, but only one funded programme",

          lines: [

            [
              "Let's consider a municipal recycling service responsible for collecting recyclable materials from residential neighbourhoods.",
              t(
                "Distinguishing responses from commitment",
                "A public service can respond repeatedly to problems without launching a coordinated BPM programme."
              )
            ],

            [
              "Residents have complained about missed collections, and employees report difficulties coordinating vehicles across different districts.",
              null
            ],

            [
              "The municipality responds by asking supervisors to monitor missed collections more carefully.",
              iss(
                "Missed collections generate complaints, but the response remains limited to additional supervision.",
                "A limited operational response"
              )
            ],

            [
              "That action acknowledges the problem, but it does not establish a funded programme for redesigning collection processes.",
              null
            ],

            [
              "Later, population growth increases the number of households requiring service across the municipality.",
              dg(
                "Demand creates pressure",
                D.flow([
                  "Population|grows",
                  "Collection|demand rises",
                  "Existing|capacity strained",
                  "!Pressure|increases"
                ]),
                "Population growth creates continuing pressure on the existing recycling collection process."
              )
            ],

            [
              "Managers introduce temporary scheduling adjustments, yet the underlying coordination difficulties remain unresolved.",
              null
            ],

            [
              "These developments are drivers because they make improvement desirable without necessarily changing the investment decision.",
              st(
                "A driver creates pressure even when management responds only through temporary operational adjustments."
              )
            ],

            [
              "Now imagine the municipal council approving a new service commitment with a fixed implementation date.",
              null
            ],

            [
              "The commitment requires reliable collection arrangements across the municipality, creating a deadline for organisational action.",
              iss(
                "A new council commitment establishes a defined service obligation and implementation deadline.",
                "The decision environment changes"
              )
            ],

            [
              "The municipality subsequently approves funding for a coordinated programme covering scheduling, collection information, and operational responsibilities.",
              null
            ],

            [
              "The council commitment is the trigger because it changes management's response from temporary adjustments to funded redesign.",
              dg(
                "From limited responses to a programme",
                D.flow([
                  "Service|complaints",
                  "Temporary|adjustments",
                  "Council|commitment",
                  "+Funded|programme"
                ]),
                "The council commitment changes the organisation's decision to invest in coordinated process improvement."
              )
            ],

            [
              "Notice that the missed collections remain important, even though they did not independently produce the programme.",
              null
            ],

            [
              "They help explain the underlying need, while the council decision explains the timing of the investment.",
              [
                cmp(
                  "a",
                  "Underlying drivers",
                  "Missed collections and growing demand created pressure for improvement."
                ),
                cmp(
                  "b",
                  "Decisive trigger",
                  "The council commitment established an obligation that prompted programme funding."
                )
              ]
            ],

            [
              "This distinction becomes especially useful when organisations announce that they are finally addressing longstanding service problems.",
              null
            ],

            [
              "The announcement may emphasise those problems without clearly explaining what caused management to act now.",
              q(
                "Did the organisation fund a programme because complaints increased, or because a new commitment changed its obligations?"
              )
            ],

            [
              "A careful analyst should examine the actual funding decision rather than relying entirely on public statements.",
              null
            ],

            [
              "Council minutes, approved budgets, and programme documents may reveal which event secured organisational commitment.",
              dg(
                "Evidence behind the decision",
                D.flow([
                  "Council|decision",
                  "Budget|approval",
                  "Programme|mandate",
                  "+Rationale|verified"
                ]),
                "Decision records help establish the relationship between the triggering event and the funded programme."
              )
            ],

            [
              "That matters because the original rationale influences the deadlines and outcomes against which the programme will be judged.",
              null
            ],

            [
              "A programme funded to meet a council commitment must demonstrate that the required service outcome is achieved.",
              st(
                "The trigger helps explain both the timing of investment and the expectations attached to programme success."
              )
            ],

            [
              "Remember that an organisation can acknowledge problems repeatedly without committing to the coordinated changes needed to resolve them.",
              null
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O2b
      // The danger of two competing rationales
      // ==============================================================

      W2O2b: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A university cybersecurity programme
        // Angle: technical compliance versus student service quality.
        // ------------------------------------------------------------

        {
          title: "The security programme with two promises",

          lines: [

            [
              "Imagine a university approving a major programme after an external review identifies weaknesses in access security.",
              t(
                "When programme rationales diverge",
                "A university programme can satisfy its original security obligation while disappointing stakeholders expecting better digital services."
              )
            ],

            [
              "The governing board releases funding because sensitive information needs stronger protection against unauthorised access.",
              null
            ],

            [
              "The programme director is therefore expected to demonstrate that the identified security weaknesses have been addressed.",
              dg(
                "The original funding rationale",
                D.flow([
                  "Security|review",
                  "Weaknesses|identified",
                  "Funding|approved",
                  "+Controls|strengthened"
                ]),
                "The programme receives funding to address weaknesses identified during the external security review."
              )
            ],

            [
              "However, university departments begin describing the same programme as an opportunity to improve student digital services.",
              null
            ],

            [
              "That ambition is understandable because students often struggle with complicated logins and disconnected online platforms.",
              [
                cmp(
                  "a",
                  "Board rationale",
                  "Strengthen access security and address the weaknesses identified by the review."
                ),
                cmp(
                  "b",
                  "Service ambition",
                  "Make university digital services easier and more convenient for students."
                )
              ]
            ],

            [
              "The difficulty appears when the programme team assumes that improving convenience automatically proves the security objective.",
              null
            ],

            [
              "Imagine the university introducing a simpler student portal that receives enthusiastic feedback from its users.",
              dg(
                "An attractive service improvement",
                D.flow([
                  "Portal|redesigned",
                  "Login|simplified",
                  "Students|satisfied",
                  "+Convenience|improves"
                ]),
                "A simpler portal can improve student experience without demonstrating that the original security weaknesses are resolved."
              )
            ],

            [
              "Students appreciate the change, but the external review's security concerns have not been fully resolved.",
              null
            ],

            [
              "The board could reasonably question whether the investment has delivered the outcome that justified its approval.",
              iss(
                "Student satisfaction improves, but the programme cannot demonstrate that the identified security weaknesses have been resolved.",
                "A credibility gap"
              )
            ],

            [
              "Now imagine the opposite situation, where the university strengthens security but makes student access unnecessarily complicated.",
              null
            ],

            [
              "The original obligation may be satisfied, yet departments expecting improved usability could feel disappointed.",
              [
                cmp(
                  "a",
                  "Security achieved",
                  "The programme demonstrates that the identified access weaknesses have been addressed."
                ),
                cmp(
                  "b",
                  "Service concern",
                  "Students experience additional difficulties accessing the university's digital services."
                )
              ]
            ],

            [
              "Neither outcome means that security and convenience must always conflict within the same programme.",
              null
            ],

            [
              "The problem is failing to distinguish mandatory commitments from additional benefits that require separate evidence.",
              st(
                "Different programme rationales can coexist when their outcomes are clearly defined and measured separately."
              )
            ],

            [
              "The director should establish security evidence alongside suitable measures of the student experience.",
              null
            ],

            [
              "That approach allows the university to evaluate each objective without substituting one success for another.",
              dg(
                "Reconciling the programme's purposes",
                D.flow([
                  "Security|obligation",
                  "Service|requirements",
                  "Process|redesign",
                  "+Outcomes|verified"
                ]),
                "The programme can pursue security and convenience while verifying each outcome against its own requirements."
              )
            ],

            [
              "The director also needs agreement about priorities when proposed convenience improvements compete with essential security work.",
              null
            ],

            [
              "Without that agreement, departments may pursue attractive changes while the original funding obligation remains incomplete.",
              q(
                "Which outcome must the programme protect when resources cannot support every proposed improvement?"
              )
            ],

            [
              "The answer begins with the reason the board authorised the investment, not the most popular internal ambition.",
              null
            ],

            [
              "Remember that credibility depends on delivering the funded obligation while honestly reporting additional improvements.",
              st(
                "A credible programme aligns its funding rationale with measurable delivery commitments and clearly distinguished additional benefits."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A retail chain's inventory programme
        // Angle: cost savings versus product availability.
        // ------------------------------------------------------------

        {
          title: "Lower inventory costs, empty shelves",

          lines: [

            [
              "Imagine a retail chain whose board approves a programme to reduce the cost of holding inventory.",
              t(
                "Two rationales, different success measures",
                "A programme funded for cost reduction may also promise better availability, creating expectations that require reconciliation."
              )
            ],

            [
              "Inventory means the goods a business holds before selling them or using them in its operations.",
              null
            ],

            [
              "The board wants to release money tied up in excess stock and reduce unnecessary storage expenses.",
              dg(
                "The board's investment rationale",
                D.flow([
                  "Excess|inventory",
                  "Storage|costs",
                  "Programme|approved",
                  "+Savings|expected"
                ]),
                "The board funds the programme to reduce inventory-related costs and release resources tied up in stock."
              )
            ],

            [
              "Store managers welcome the programme because they hope it will also improve the availability of popular products.",
              null
            ],

            [
              "They believe better inventory information could help stores replenish shelves more reliably.",
              [
                cmp(
                  "a",
                  "Funding rationale",
                  "Reduce inventory holding costs and demonstrate defensible financial savings."
                ),
                cmp(
                  "b",
                  "Operational ambition",
                  "Improve product availability through better stock information and replenishment."
                )
              ]
            ],

            [
              "Both objectives may be valuable, but they create different questions about whether the programme succeeds.",
              null
            ],

            [
              "Imagine the team reducing stock levels aggressively and reporting substantial savings to the board.",
              dg(
                "The reported financial success",
                D.flow([
                  "Stock|reduced",
                  "Storage|costs fall",
                  "Savings|reported",
                  "+Financial|target met"
                ]),
                "Lower stock levels can reduce inventory costs without necessarily improving product availability."
              )
            ],

            [
              "The financial results look encouraging, but customers increasingly discover that popular products are unavailable.",
              null
            ],

            [
              "Store managers argue that the programme has damaged the shopping experience despite achieving its cost target.",
              iss(
                "Inventory costs decline, but popular products become unavailable more frequently.",
                "Financial success, service failure"
              )
            ],

            [
              "Now imagine the opposite result, where product availability improves but inventory costs continue increasing.",
              null
            ],

            [
              "Store managers might celebrate the improvement, while directors question whether the original financial commitment was fulfilled.",
              [
                cmp(
                  "a",
                  "Better availability",
                  "Customers find popular products more consistently."
                ),
                cmp(
                  "b",
                  "Unmet financial target",
                  "Inventory holding costs remain above the level expected by the board."
                )
              ]
            ],

            [
              "These situations reveal why different programme rationales need explicit agreement rather than optimistic assumptions.",
              null
            ],

            [
              "The director should identify the mandatory financial outcome and establish measures for product availability.",
              st(
                "Cost savings and product availability require distinct measures because improvement in one does not guarantee improvement in the other."
              )
            ],

            [
              "A baseline records current performance so later results can be compared with an agreed starting point.",
              null
            ],

            [
              "Without reliable baselines, managers may claim improvement without demonstrating whether the programme produced meaningful change.",
              dg(
                "Testing both promised outcomes",
                D.flow([
                  "Cost|baseline",
                  "Availability|baseline",
                  "Process|redesign",
                  "+Benefits|measured"
                ]),
                "Separate baselines allow the organisation to evaluate financial savings and product availability."
              )
            ],

            [
              "The programme also needs agreed priorities because excessive stock reduction could undermine the service benefits being pursued.",
              null
            ],

            [
              "Those priorities should reflect the board's funding decision while recognising the consequences for customers.",
              q(
                "How can the programme reduce costs without creating unacceptable problems for customers?"
              )
            ],

            [
              "A coherent purpose would connect inventory efficiency with clearly defined service expectations and defensible financial evidence.",
              null
            ],

            [
              "That approach allows directors and store managers to judge the same programme against agreed commitments.",
              st(
                "A credible programme reconciles competing rationales through explicit priorities, separate measures, and evidence of delivered benefits."
              )
            ],

            [
              "Remember that achieving one attractive outcome does not automatically satisfy every reason stakeholders supported the programme.",
              null
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O2c
      // Writing a purpose the board can defend
      // ==============================================================

      W2O2c: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A municipal building-permit service
        // Angle: turning an ambitious slogan into a testable charter.
        // ------------------------------------------------------------

        {
          title: "From a smart-city slogan to a credible charter",

          lines: [

            [
              "Imagine a municipality receiving funding to improve how residents and businesses obtain building permits.",
              t(
                "Writing a defensible programme purpose",
                "A municipal permit programme shows how a vague ambition becomes a measurable organisational commitment."
              )
            ],

            [
              "The board approved investment after an internal review identified serious delays in processing permit applications.",
              null
            ],

            [
              "Applicants frequently wait for decisions because information moves slowly between technical reviewers and administrative teams.",
              dg(
                "The existing permit process",
                D.flow([
                  "Application|received",
                  "Technical|review",
                  "!Information|delayed",
                  "Decision|issued"
                ]),
                "Delays between reviewers and administrators contribute to slow building-permit decisions."
              )
            ],

            [
              "The programme director initially proposes making the municipality a global leader in smart public services.",
              null
            ],

            [
              "That ambition sounds impressive, but it does not explain what the funded programme must actually deliver.",
              iss(
                "The proposed purpose promises smart public services without defining the permit-processing outcome.",
                "An aspiration without a test"
              )
            ],

            [
              "A programme charter is a document establishing the programme's agreed purpose, direction, and principal commitments.",
              null
            ],

            [
              "Its purpose statement should identify a meaningful result rather than merely describe an attractive organisational ambition.",
              st(
                "A credible purpose statement identifies an outcome that decision makers can understand and evaluate."
              )
            ],

            [
              "The director therefore examines the review findings and identifies delayed permit decisions as the central problem.",
              null
            ],

            [
              "She proposes redesigning the complete application process to reduce avoidable delays and improve decision reliability.",
              dg(
                "Connecting the problem with the purpose",
                D.flow([
                  "Permit|delays",
                  "Process|redesign",
                  "Reliable|decisions",
                  "+Performance|measured"
                ]),
                "The proposed programme connects the identified processing problem with a measurable improvement objective."
              )
            ],

            [
              "That statement is stronger because it identifies the process being changed and the outcome being pursued.",
              null
            ],

            [
              "But the board still needs agreement about what reduction in delay would constitute acceptable improvement.",
              q(
                "What evidence would convince the board that permit processing has genuinely improved?"
              )
            ],

            [
              "The director should record current processing times before setting a realistic and agreed performance target.",
              null
            ],

            [
              "That baseline matters because improvement claims require a reliable comparison with the original situation.",
              dg(
                "Making the commitment testable",
                D.flow([
                  "Current|performance",
                  "Target|agreed",
                  "Process|redesigned",
                  "+Results|compared"
                ]),
                "A recorded baseline and agreed target make the programme's performance commitment testable."
              )
            ],

            [
              "The charter should also establish scope, meaning the processes and activities included within the programme.",
              null
            ],

            [
              "Without clear scope, departments might propose unrelated technology projects that consume resources without addressing permit delays.",
              iss(
                "Unrelated technology proposals expand the programme without directly addressing the funded permit-processing problem.",
                "Scope becomes unclear"
              )
            ],

            [
              "The director must identify who can coordinate decisions across the teams responsible for reviewing applications.",
              null
            ],

            [
              "That authority matters because delays between departments cannot always be resolved through individual departmental improvements.",
              st(
                "A defensible charter connects its purpose with clear scope, measurable outcomes, and accountable process ownership."
              )
            ],

            [
              "Now imagine presenting the revised charter to a board member who knows little about operational details.",
              null
            ],

            [
              "The board member should understand the problem, the proposed result, and how success will be demonstrated.",
              q(
                "Can a board member explain what the programme will deliver without relying on vague transformation language?"
              )
            ],

            [
              "If those elements are clear, the charter provides a credible basis for approving and monitoring investment.",
              null
            ],

            [
              "Remember that a strong purpose statement turns an organisational ambition into a specific and defensible commitment.",
              st(
                "A credible programme purpose explains what must improve and how the organisation will recognise success."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A food producer's product-recall process
        // Angle: defining mandatory outcomes, boundaries and evidence.
        // ------------------------------------------------------------

        {
          title: "A recall programme the board can defend",

          lines: [

            [
              "Imagine a food producer discovering that its existing product-recall process cannot reliably identify affected batches.",
              t(
                "Making programme purpose concrete",
                "A food producer must connect its recall-process investment with a clear, demonstrable safety outcome."
              )
            ],

            [
              "A product recall means withdrawing goods when a problem makes continued sale or use unacceptable.",
              null
            ],

            [
              "The board approves investment because the company needs a more reliable way to identify and trace affected products.",
              dg(
                "The original funding rationale",
                D.flow([
                  "Traceability|weakness",
                  "Recall|risk",
                  "Board|approval",
                  "+Programme|funded"
                ]),
                "The board funds improvement because the existing recall process cannot reliably identify affected product batches."
              )
            ],

            [
              "The programme director proposes modernising the company's information systems and improving operational excellence across its factories.",
              null
            ],

            [
              "Those ambitions may be worthwhile, but they do not clearly describe the outcome that justified funding.",
              iss(
                "The programme promises broad modernisation without specifying how affected product batches will be identified.",
                "The required outcome is missing"
              )
            ],

            [
              "A stronger purpose would explain how the company intends to make its recall process reliable.",
              null
            ],

            [
              "For example, the programme could aim to establish dependable identification and tracing of affected product batches.",
              st(
                "Proposed purpose: Redesign the product-recall process so affected batches can be identified and traced reliably."
              )
            ],

            [
              "That statement identifies the process and the intended outcome without inventing an unsupported performance guarantee.",
              null
            ],

            [
              "The director must then agree with the board how reliability will be tested and demonstrated.",
              q(
                "What evidence would show that the redesigned recall process can identify affected batches reliably?"
              )
            ],

            [
              "The company could conduct controlled recall exercises and examine whether the required product information is complete.",
              null
            ],

            [
              "Such exercises would provide evidence of process capability rather than merely confirming that new software was installed.",
              dg(
                "Testing the intended outcome",
                D.flow([
                  "Recall|exercise",
                  "Batch|identified",
                  "Records|verified",
                  "+Capability|demonstrated"
                ]),
                "Controlled recall exercises can help demonstrate whether the redesigned process identifies and traces affected batches reliably."
              )
            ],

            [
              "Now consider scope, which defines the work included within the approved improvement programme.",
              null
            ],

            [
              "The director must establish which production sites, information sources, and recall activities require coordinated changes.",
              dg(
                "Defining the programme boundary",
                D.flow([
                  "Affected|products",
                  "Relevant|sites",
                  "Required|records",
                  "+Recall|process"
                ]),
                "The programme boundary should include the activities and information needed to deliver the agreed recall outcome."
              )
            ],

            [
              "That clarity matters because an unrestricted modernisation programme could consume resources without resolving the recall weakness.",
              null
            ],

            [
              "The board also needs an accountable process owner who can coordinate decisions across the relevant functions.",
              iss(
                "Recall responsibilities are divided across departments without a recognised owner for the complete process.",
                "Fragmented accountability"
              )
            ],

            [
              "Without such authority, production and distribution teams may disagree about who must maintain critical information.",
              null
            ],

            [
              "The programme should therefore connect its purpose with ownership, agreed measures, and continuing operational responsibilities.",
              st(
                "A credible charter links the required outcome with the authority and evidence needed to deliver it."
              )
            ],

            [
              "Now imagine the director reporting that the new software is operating successfully across the company's factories.",
              null
            ],

            [
              "The board should still ask whether the complete recall process can reliably identify and trace affected batches.",
              q(
                "Does successful system installation demonstrate that the product-recall process now achieves its intended outcome?"
              )
            ],

            [
              "The distinction matters because technology is a means of supporting the process rather than its ultimate purpose.",
              null
            ],

            [
              "A defensible charter makes that difference explicit and gives decision makers a meaningful basis for evaluating success.",
              st(
                "The programme succeeds by demonstrating its agreed business outcome, not merely by completing implementation activities."
              )
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O3a
      // A process owner needs a real mandate
      // ==============================================================

      W2O3a: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A hospital discharge process
        // Angle: accountability without cross-functional authority.
        // ------------------------------------------------------------

        {
          title: "The discharge coordinator who could not decide",

          lines: [

            [
              "Imagine a hospital appointing a discharge coordinator to improve how patients leave after completing their treatment.",
              t(
                "Process ownership needs authority",
                "A hospital discharge process shows why responsibility without decision-making authority cannot guarantee improvement."
              )
            ],

            [
              "The hospital wants patients to leave safely and promptly, without unnecessary waiting between departments.",
              null
            ],

            [
              "However, discharge depends on medical approval, medication preparation, administrative documentation, and arrangements for leaving.",
              dg(
                "The complete discharge journey",
                D.flow([
                  "Medical|approval",
                  "Medication|prepared",
                  "Documents|completed",
                  "Patient|leaves"
                ]),
                "Patient discharge depends on connected activities performed by different hospital departments."
              )
            ],

            [
              "Each department manages its own work, but patients experience the combined duration of every activity.",
              null
            ],

            [
              "The coordinator discovers that patients frequently wait after doctors have confirmed they can leave.",
              iss(
                "Patients remain in hospital after medical approval because other discharge activities are incomplete.",
                "A cross-department delay"
              )
            ],

            [
              "Pharmacy staff explain that medication requests sometimes arrive late, leaving insufficient time for preparation.",
              null
            ],

            [
              "Administrative employees argue that they cannot complete documentation until the necessary information becomes available.",
              dg(
                "The handoff problem",
                D.flow([
                  "Doctor|approves",
                  "!Request|delayed",
                  "Pharmacy|prepares",
                  "!Patient|waits"
                ]),
                "Delayed information between departments can extend the complete discharge process."
              )
            ],

            [
              "The coordinator identifies the problem, but departmental managers refuse to change their established procedures.",
              null
            ],

            [
              "She is accountable for improving discharge performance, yet cannot secure the decisions needed to improve it.",
              iss(
                "The coordinator is responsible for results but cannot influence the departments controlling the process.",
                "Accountability without authority"
              )
            ],

            [
              "This illustrates why assigning a process owner is not enough to establish effective process management.",
              null
            ],

            [
              "A process owner needs a mandate, meaning recognised authority to coordinate decisions affecting the complete process.",
              st(
                "A genuine process owner needs both accountability for results and authority to coordinate cross-functional improvement."
              )
            ],

            [
              "The hospital's leadership could establish agreed responsibilities and a way to resolve disagreements between departments.",
              null
            ],

            [
              "That arrangement would allow the coordinator to address delayed handoffs rather than simply report disappointing performance.",
              dg(
                "Giving ownership a real mandate",
                D.flow([
                  "Leadership|mandate",
                  "Process|owner",
                  "Departments|coordinate",
                  "+Discharge|improves"
                ]),
                "A recognised mandate enables the process owner to coordinate improvements across departmental boundaries."
              )
            ],

            [
              "The coordinator would still need clinical expertise from doctors and pharmacists when evaluating proposed changes.",
              null
            ],

            [
              "Process authority does not mean ignoring professional responsibilities or replacing necessary clinical decisions.",
              [
                cmp(
                  "a",
                  "Process ownership",
                  "Coordinates the complete discharge process and its performance."
                ),
                cmp(
                  "b",
                  "Clinical responsibility",
                  "Preserves professional decisions about patient treatment and safe discharge."
                )
              ]
            ],

            [
              "Instead, effective ownership connects professional responsibilities so patients experience a safe and coordinated departure.",
              null
            ],

            [
              "This distinction matters because cross-functional improvement requires cooperation without eliminating legitimate departmental expertise.",
              q(
                "Can the coordinator improve the complete discharge process without influencing the handoffs that create delays?"
              )
            ],

            [
              "The answer is no, because responsibility alone cannot resolve problems controlled by other departments.",
              null
            ],

            [
              "Remember that genuine process ownership connects accountability with sufficient authority to improve the complete journey.",
              st(
                "A process owner needs a recognised mandate, cross-functional cooperation, and continuing accountability for performance."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // An online retailer's returns process
        // Angle: local optimisation versus end-to-end ownership.
        // ------------------------------------------------------------

        {
          title: "Everyone performs well, but refunds remain late",

          lines: [

            [
              "Imagine an online retailer receiving complaints because customers wait too long for refunds after returning products.",
              t(
                "Who owns the complete journey?",
                "A returns process reveals how departmental success can coexist with disappointing customer outcomes."
              )
            ],

            [
              "The warehouse team reports that returned parcels are inspected quickly after arriving at its facilities.",
              null
            ],

            [
              "The finance department also reports that approved refunds are processed efficiently once requests reach its system.",
              [
                cmp(
                  "a",
                  "Warehouse performance",
                  "Returned parcels are inspected promptly after arrival."
                ),
                cmp(
                  "b",
                  "Finance performance",
                  "Approved refund requests are processed efficiently."
                )
              ]
            ],

            [
              "Yet customers continue waiting because inspection results sometimes take several days to reach the finance team.",
              null
            ],

            [
              "The problem lies between departments rather than inside the activities each department measures.",
              dg(
                "The missing connection",
                D.flow([
                  "Parcel|inspected",
                  "!Result|delayed",
                  "Finance|unaware",
                  "!Refund|late"
                ]),
                "A delayed information handoff can undermine the complete returns process despite satisfactory departmental performance."
              )
            ],

            [
              "Now imagine management asking the warehouse supervisor to take responsibility for reducing overall refund delays.",
              null
            ],

            [
              "The supervisor understands warehouse operations, but she cannot change how finance receives or approves refund information.",
              iss(
                "The warehouse supervisor is accountable for overall refund delays but cannot control the complete process.",
                "An incomplete mandate"
              )
            ],

            [
              "This creates a mismatch between responsibility and authority, making meaningful improvement difficult to achieve.",
              null
            ],

            [
              "A better arrangement would appoint an owner accountable for the complete product-return and refund process.",
              st(
                "End-to-end ownership means accountability for the connected process rather than one department's activities."
              )
            ],

            [
              "That owner would examine the customer's journey from initiating a return until receiving the refund.",
              null
            ],

            [
              "The owner could then identify where information, products, or decisions stop moving between responsible teams.",
              dg(
                "The complete returns journey",
                D.flow([
                  "Return|requested",
                  "Parcel|received",
                  "Inspection|confirmed",
                  "Refund|issued"
                ]),
                "The process owner examines the complete customer journey and the handoffs connecting its activities."
              )
            ],

            [
              "However, naming an owner still accomplishes little unless management provides a recognised decision-making mandate.",
              null
            ],

            [
              "The owner needs authority to coordinate warehouse, customer service, finance, and information technology responsibilities.",
              dg(
                "Coordinating the process",
                D.org("process"),
                "A cross-functional mandate allows the process owner to coordinate activities across the organisational structure."
              )
            ],

            [
              "This authority should include a clear way to resolve disagreements when departments defend conflicting priorities.",
              null
            ],

            [
              "For example, finance might prioritise control checks while customer service prioritises refund speed.",
              [
                cmp(
                  "a",
                  "Finance priority",
                  "Maintain reliable controls before issuing refunds."
                ),
                cmp(
                  "b",
                  "Customer service priority",
                  "Reduce unnecessary waiting for customers expecting refunds."
                )
              ]
            ],

            [
              "The process owner must balance these legitimate requirements rather than simply favouring the fastest possible response.",
              null
            ],

            [
              "That matters because a faster refund process must still preserve accuracy and appropriate financial controls.",
              q(
                "Who can coordinate refund speed and financial accuracy when departmental priorities differ?"
              )
            ],

            [
              "The answer requires recognised process ownership supported by the organisation's management and governance arrangements.",
              null
            ],

            [
              "Once the process improves, ownership must continue because new problems can emerge during everyday operations.",
              st(
                "Effective process ownership combines cross-functional authority with continuing responsibility for customer outcomes."
              )
            ],

            [
              "Remember that managing the complete process means improving connections rather than merely demanding better departmental statistics.",
              null
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O3b
      // Measuring the customer's clock
      // ==============================================================

      W2O3b: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A car repair workshop
        // Angle: active work versus elapsed customer time.
        // ------------------------------------------------------------

        {
          title: "The car that took three days to repair",

          lines: [

            [
              "Imagine taking your car to a repair workshop because an unusual noise appears whenever you apply the brakes.",
              t(
                "Measuring the customer's clock",
                "A car repair workshop shows why active working time differs from the customer's complete waiting experience."
              )
            ],

            [
              "The mechanic explains that diagnosing and repairing the problem should require only two hours of actual work.",
              null
            ],

            [
              "You leave the vehicle expecting a reasonably quick return, but the workshop contacts you three days later.",
              iss(
                "The repair requires two hours of work, but the customer waits three days to collect the vehicle.",
                "A difference in elapsed time"
              )
            ],

            [
              "The mechanic insists that the repair itself was completed efficiently, and the technical records support that claim.",
              null
            ],

            [
              "Yet your experience includes every hour between leaving the vehicle and receiving confirmation that it is ready.",
              dg(
                "The customer's complete journey",
                D.flow([
                  "Vehicle|received",
                  "Diagnosis|completed",
                  "!Parts|awaited",
                  "Repair|completed",
                  "Vehicle|collected"
                ]),
                "The customer experiences the complete repair journey, including delays between active workshop activities."
              )
            ],

            [
              "This difference illustrates elapsed time, meaning the complete duration between the beginning and ending of a process.",
              null
            ],

            [
              "Processing time measures active work, while waiting time captures periods when necessary work cannot proceed.",
              [
                cmp(
                  "a",
                  "Processing time",
                  "The mechanic spends time diagnosing and repairing the vehicle."
                ),
                cmp(
                  "b",
                  "Waiting time",
                  "The vehicle remains idle while parts, information, or decisions are unavailable."
                )
              ]
            ],

            [
              "Both contribute to the customer's experience, even when the workshop measures only the mechanic's productivity.",
              null
            ],

            [
              "Suppose the repair requires two hours, while waiting for a replacement part consumes most of the remaining period.",
              dg(
                "Illustrative timing",
                D.bars([
                  ["Active repair", 2],
                  ["Waiting", 70]
                ]),
                "In this hypothetical example, active repair takes two hours while waiting accounts for seventy hours."
              )
            ],

            [
              "The workshop might reduce repair time slightly without making a meaningful difference to the customer's overall experience.",
              null
            ],

            [
              "That happens because the main delay lies outside the mechanic's active repair work.",
              q(
                "Would making the mechanic faster solve the customer's problem if most time is spent waiting for parts?"
              )
            ],

            [
              "A process owner would examine how replacement parts are identified, ordered, delivered, and made available.",
              null
            ],

            [
              "Improving those connections could reduce elapsed time more effectively than demanding faster mechanical work.",
              dg(
                "Finding the real improvement opportunity",
                D.flow([
                  "Part|identified",
                  "Order|placed",
                  "Delivery|tracked",
                  "+Repair|completed"
                ]),
                "Improving the parts supply process may reduce customer waiting more effectively than accelerating the repair activity."
              )
            ],

            [
              "The owner should record current elapsed time before changing procedures, creating a baseline for later comparison.",
              null
            ],

            [
              "That baseline matters because managers need evidence that the redesigned process actually reduces customer waiting.",
              st(
                "A useful process measure captures the complete customer experience and allows improvement to be verified."
              )
            ],

            [
              "The workshop should also monitor repair quality because faster completion is not valuable if vehicles return with unresolved problems.",
              null
            ],

            [
              "This illustrates why process performance involves meaningful outcomes rather than speed alone.",
              q(
                "Would you consider the repair successful if it was faster but failed to resolve the braking problem?"
              )
            ],

            [
              "A reliable process should deliver the required result while avoiding unnecessary delays and repeated work.",
              null
            ],

            [
              "Remember that customers experience the complete journey, not the isolated activities measured by individual departments.",
              st(
                "End-to-end measurement reveals both active processing and waiting, helping managers identify meaningful improvement opportunities."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A mortgage application process
        // Angle: measuring handoffs and decision quality.
        // ------------------------------------------------------------

        {
          title: "The mortgage application that kept waiting",

          lines: [

            [
              "Imagine applying for a mortgage and receiving reassurance that the bank processes applications very efficiently.",
              t(
                "Looking beyond departmental speed",
                "A mortgage application shows why fast individual activities can still produce a slow complete process."
              )
            ],

            [
              "The customer adviser completes the initial application quickly and sends your documents to the credit assessment team.",
              null
            ],

            [
              "The credit team performs its checks efficiently, but your application then waits for additional information.",
              dg(
                "The mortgage journey",
                D.flow([
                  "Application|submitted",
                  "Credit|review",
                  "!Information|requested",
                  "Final|decision"
                ]),
                "The complete mortgage process includes active assessment and waiting for information or decisions."
              )
            ],

            [
              "Several days pass before another department notices that a required document has not been received.",
              null
            ],

            [
              "You provide the document promptly, yet the application returns to a queue awaiting further review.",
              iss(
                "The application waits between departments even though individual assessment activities are completed efficiently.",
                "A handoff delay"
              )
            ],

            [
              "The bank's internal reports show satisfactory processing times for the adviser and credit assessment teams.",
              null
            ],

            [
              "But those figures do not capture the complete duration experienced by the person seeking the mortgage.",
              [
                cmp(
                  "a",
                  "Departmental measurement",
                  "Each team measures the time spent performing its own activities."
                ),
                cmp(
                  "b",
                  "Customer measurement",
                  "The applicant experiences the total time from submission until the decision."
                )
              ]
            ],

            [
              "This is why end-to-end measurement follows the entire process rather than treating departmental activities as separate successes.",
              null
            ],

            [
              "The process owner should examine when the application enters each queue and why it remains there.",
              dg(
                "Understanding waiting",
                D.flow([
                  "Work|completed",
                  "Queue|entered",
                  "Information|missing",
                  "!Decision|delayed"
                ]),
                "Waiting between activities can extend the mortgage process without appearing in departmental productivity measures."
              )
            ],

            [
              "That investigation matters because a faster credit assessment may not help when the application waits elsewhere.",
              null
            ],

            [
              "A more useful measure records elapsed time from receiving a complete application until communicating the final decision.",
              st(
                "Elapsed time captures the complete duration between defined process boundaries, including waiting and active work."
              )
            ],

            [
              "The bank should define those boundaries carefully so comparisons remain meaningful across different applications.",
              null
            ],

            [
              "For example, incomplete applications may require separate analysis because missing documents can affect the total duration.",
              q(
                "What exactly marks the beginning and ending of the process being measured?"
              )
            ],

            [
              "The owner should also distinguish delays caused by missing customer information from avoidable internal handoff delays.",
              null
            ],

            [
              "That distinction helps managers identify changes the organisation can realistically make to improve performance.",
              dg(
                "Finding actionable delays",
                D.flow([
                  "Elapsed|time recorded",
                  "Waiting|examined",
                  "Causes|identified",
                  "+Process|improved"
                ]),
                "Understanding the causes of waiting helps the process owner identify practical improvement opportunities."
              )
            ],

            [
              "Now consider decision quality, because approving applications quickly cannot justify overlooking necessary financial checks.",
              null
            ],

            [
              "A reliable mortgage process must balance timely decisions with accurate assessment and appropriate controls.",
              [
                cmp(
                  "a",
                  "Timeliness",
                  "Applicants receive decisions without unnecessary delays."
                ),
                cmp(
                  "b",
                  "Decision quality",
                  "The bank completes the checks needed for reliable lending decisions."
                )
              ]
            ],

            [
              "Both outcomes matter because customers need dependable decisions rather than speed achieved by ignoring essential requirements.",
              null
            ],

            [
              "When evaluating process performance, ask whether the measures reflect the complete customer journey and its intended result.",
              q(
                "Do the bank's performance measures explain the customer's waiting experience and the quality of the final decision?"
              )
            ],

            [
              "Remember that useful measurement reveals where the process succeeds and where its connections create unnecessary delays.",
              null
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O3c
      // Keeping sponsorship and performance alive
      // ==============================================================

      W2O3c: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A railway operator's maintenance programme
        // Angle: sustaining improvement after the immediate crisis.
        // ------------------------------------------------------------

        {
          title: "What happens after the trains run again?",

          lines: [

            [
              "Imagine a railway operator launching an improvement programme after a serious maintenance failure disrupts passenger services.",
              t(
                "Improvement after the crisis",
                "A railway maintenance programme shows why the original trigger cannot sustain performance without continuing governance."
              )
            ],

            [
              "The disruption attracts executive attention, and management quickly approves funding to improve maintenance coordination.",
              null
            ],

            [
              "Engineers redesign reporting procedures, clarify responsibilities, and introduce better ways to monitor maintenance activities.",
              dg(
                "The immediate improvement programme",
                D.flow([
                  "Service|disruption",
                  "Funding|approved",
                  "Maintenance|redesigned",
                  "+Reliability|targeted"
                ]),
                "The disruption triggers a programme intended to improve maintenance coordination and service reliability."
              )
            ],

            [
              "After implementation, the operator demonstrates that the immediate maintenance weaknesses have been addressed.",
              null
            ],

            [
              "Senior managers welcome the results and begin directing their attention toward other organisational priorities.",
              iss(
                "Executive attention declines after the immediate maintenance problem has been addressed.",
                "The original urgency fades"
              )
            ],

            [
              "This creates a danger because improved procedures still require monitoring, coordination, and clear responsibility during everyday operations.",
              null
            ],

            [
              "A trigger explains why the programme begins, but it cannot guarantee that improvement continues after implementation.",
              st(
                "Sustained improvement requires continuing governance after the original trigger loses its urgency."
              )
            ],

            [
              "The railway operator therefore needs a process owner accountable for the complete maintenance coordination process.",
              null
            ],

            [
              "That owner should monitor performance and resolve difficulties when engineering teams disagree about operational responsibilities.",
              dg(
                "Continuing process ownership",
                D.flow([
                  "Programme|delivers",
                  "Process|owner",
                  "Performance|reviewed",
                  "+Reliability|sustained"
                ]),
                "Continuing process ownership helps maintain performance after the temporary improvement programme ends."
              )
            ],

            [
              "The executive sponsor has a different responsibility, supporting the programme's importance and helping secure organisational commitment.",
              null
            ],

            [
              "Sponsorship matters when departments resist changes that benefit the railway network but complicate their local routines.",
              [
                cmp(
                  "a",
                  "Executive sponsor",
                  "Maintains senior commitment and supports important organisational decisions."
                ),
                cmp(
                  "b",
                  "Process owner",
                  "Remains accountable for the complete maintenance process and its performance."
                )
              ]
            ],

            [
              "The operator also needs agreed measures showing whether maintenance reliability remains satisfactory over time.",
              null
            ],

            [
              "A performance indicator is a measure used to judge whether an important operational outcome is being achieved.",
              dg(
                "Monitoring continuing performance",
                D.flow([
                  "Baseline|recorded",
                  "Reliability|measured",
                  "Results|reviewed",
                  "+Action|taken"
                ]),
                "Regular performance measurement helps the organisation identify whether maintenance improvements are being sustained."
              )
            ],

            [
              "Without such measures, managers might assume the problem is solved simply because no major disruption has occurred recently.",
              null
            ],

            [
              "That assumption would be risky because weaknesses can develop gradually before producing another visible failure.",
              iss(
                "Managers assume improvement is permanent without continuing to monitor maintenance performance.",
                "A hidden deterioration risk"
              )
            ],

            [
              "Now imagine the executive sponsor leaving the organisation after the programme has formally closed.",
              null
            ],

            [
              "A new leader may question continuing resources unless responsibilities and expected benefits are clearly documented.",
              q(
                "What protects the maintenance process when the original sponsor is no longer available?"
              )
            ],

            [
              "Documented governance and accountable ownership help preserve the programme's achievements despite changes in leadership.",
              null
            ],

            [
              "Remember that successful BPM means maintaining reliable processes, not merely completing a temporary improvement project.",
              st(
                "Sustained BPM combines continuing ownership, executive support, performance monitoring, and clear governance."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A nonprofit donation-processing programme
        // Angle: sponsor turnover, benefit evidence and continuity.
        // ------------------------------------------------------------

        {
          title: "The donation programme after its champion leaves",

          lines: [

            [
              "Imagine a nonprofit organisation launching a programme to improve how donations are recorded and acknowledged.",
              t(
                "Protecting benefits beyond the sponsor",
                "A nonprofit donation process illustrates why documented purpose and continuing ownership matter when leadership changes."
              )
            ],

            [
              "The programme begins after a major donor complains about receiving inaccurate acknowledgements for several contributions.",
              null
            ],

            [
              "Senior management responds by funding improvements to donation recording, verification, and communication with supporters.",
              dg(
                "The programme begins",
                D.flow([
                  "Donor|complaint",
                  "Management|attention",
                  "Funding|approved",
                  "+Process|redesign"
                ]),
                "A major donor complaint triggers investment in improving the donation-processing process."
              )
            ],

            [
              "The executive director personally supports the initiative because donor confidence is essential to the organisation's activities.",
              null
            ],

            [
              "Employees introduce improved procedures, and early reports suggest that acknowledgement errors have become less frequent.",
              st(
                "Early improvements are encouraging, but continuing performance still needs reliable evidence and accountability."
              )
            ],

            [
              "Now imagine the executive director accepting another position before the programme's wider benefits have been established.",
              null
            ],

            [
              "The incoming director has different priorities and questions whether further improvement work deserves continued resources.",
              iss(
                "The original sponsor leaves, and the new director questions the programme's continuing value.",
                "Sponsorship continuity is threatened"
              )
            ],

            [
              "This situation reveals why a programme should not depend entirely on one enthusiastic senior leader.",
              null
            ],

            [
              "The organisation needs documented purpose, agreed measures, and a recognised owner for the complete donation process.",
              dg(
                "Protecting programme continuity",
                D.flow([
                  "Purpose|documented",
                  "Ownership|assigned",
                  "Benefits|measured",
                  "+Continuity|protected"
                ]),
                "Clear purpose, ownership, and performance evidence help sustain improvement when executive leadership changes."
              )
            ],

            [
              "A process owner remains accountable for donation performance after the temporary improvement programme has ended.",
              null
            ],

            [
              "That person can coordinate fundraising, finance, and donor communication activities when problems cross departmental boundaries.",
              dg(
                "Managing the complete donation process",
                D.flow([
                  "Donation|received",
                  "Payment|verified",
                  "Record|updated",
                  "Acknowledgement|sent"
                ]),
                "The process owner coordinates the complete journey from receiving a donation to acknowledging the donor."
              )
            ],

            [
              "The owner also needs performance measures that reveal whether donors continue receiving accurate and timely acknowledgements.",
              null
            ],

            [
              "Those measures matter because completing a software installation does not prove that the donation process works reliably.",
              [
                cmp(
                  "a",
                  "Implementation activity",
                  "The organisation installs and configures a new donation-recording system."
                ),
                cmp(
                  "b",
                  "Business outcome",
                  "Donors receive accurate acknowledgements through a reliable process."
                )
              ]
            ],

            [
              "A baseline allows the nonprofit to compare current performance with the situation before the programme began.",
              null
            ],

            [
              "Without that comparison, the incoming director may struggle to understand whether continued investment produces meaningful benefits.",
              q(
                "What evidence would persuade a new director that the programme has improved donor service?"
              )
            ],

            [
              "The organisation should also establish regular reviews so emerging weaknesses are identified before complaints become serious.",
              null
            ],

            [
              "That arrangement matters because donor confidence depends on consistent performance rather than occasional demonstrations of improvement.",
              dg(
                "Keeping the process reliable",
                D.flow([
                  "Performance|measured",
                  "Problems|identified",
                  "Owner|responds",
                  "+Service|maintained"
                ]),
                "Regular review and accountable ownership help maintain reliable donation processing after the programme closes."
              )
            ],

            [
              "Now consider the original donor complaint, which explained why management approved the improvement programme.",
              null
            ],

            [
              "Once that complaint has been addressed, the organisation still needs reliable donation processing for every supporter.",
              st(
                "The trigger creates urgency, but continuing process management protects the benefits after that urgency disappears."
              )
            ],

            [
              "This is why programme closure should include a clear transition into normal operational ownership and performance monitoring.",
              null
            ],

            [
              "Remember that sustainable BPM depends on governance arrangements that survive individual projects and changes in leadership.",
              q(
                "Who will protect the process and its benefits after the original programme sponsor has moved on?"
              )
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O4a
      // Questions that expose an incomplete brief
      // ==============================================================

      W2O4a: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A regional water utility
        // Angle: testing an attractive proposal against the actual
        // funding rationale, scope, authority, and evidence.
        // ------------------------------------------------------------

        {
          title: "The water utility's impressive proposal",

          lines: [

            [
              "Imagine a regional water utility presenting an ambitious programme to modernise its customer services and operational systems.",
              t(
                "Testing a programme brief",
                "An attractive modernisation proposal must still explain the specific problem, required outcome, and delivery responsibilities."
              )
            ],

            [
              "The presentation promises greater efficiency, improved customer satisfaction, and a more innovative organisation.",
              null
            ],

            [
              "Those ambitions sound attractive, but the utility's board originally approved funding after discovering serious billing inaccuracies.",
              iss(
                "The programme promises broad modernisation without explaining how inaccurate customer bills will be corrected.",
                "The funded problem is unclear"
              )
            ],

            [
              "Customers had received incorrect charges, and employees struggled to reconcile information across several billing systems.",
              null
            ],

            [
              "The board therefore expected the programme to improve billing accuracy and restore confidence in the service.",
              dg(
                "The original investment rationale",
                D.flow([
                  "Billing|errors",
                  "Customer|complaints",
                  "Board|approval",
                  "+Accuracy|expected"
                ]),
                "The board funded improvement because inaccurate bills were undermining customer confidence."
              )
            ],

            [
              "You should begin by asking whether the proposed changes directly address those billing weaknesses.",
              null
            ],

            [
              "A new customer portal might look impressive while continuing to display inaccurate information from existing systems.",
              q(
                "Would a modern customer portal solve the problem if the underlying billing information remained incorrect?"
              )
            ],

            [
              "The answer is no, because improved presentation cannot substitute for reliable information and process performance.",
              null
            ],

            [
              "Now consider scope, meaning the work and activities included within the approved programme.",
              st(
                "Programme scope should include the activities needed to deliver the outcome that justified investment."
              )
            ],

            [
              "The utility must decide whether billing verification, customer records, and dispute handling belong within that boundary.",
              null
            ],

            [
              "Without agreement, departments may propose unrelated improvements that consume resources without correcting the funded problem.",
              dg(
                "Connecting scope with purpose",
                D.flow([
                  "Billing|problem",
                  "Required|activities",
                  "Agreed|scope",
                  "+Outcome|delivered"
                ]),
                "A clear programme boundary connects the funded problem with the work required to resolve it."
              )
            ],

            [
              "The brief must also identify who can coordinate decisions across the departments responsible for billing.",
              null
            ],

            [
              "An accountable process owner needs sufficient authority because inaccurate bills may result from several connected activities.",
              iss(
                "Departments control separate billing activities, but nobody has authority over the complete process.",
                "Ownership is fragmented"
              )
            ],

            [
              "You should also ask how the utility will demonstrate that billing accuracy has improved.",
              null
            ],

            [
              "A baseline records current performance, allowing later results to be compared with an agreed starting point.",
              dg(
                "Testing the promised improvement",
                D.flow([
                  "Current|error rate",
                  "Process|redesign",
                  "New|error rate",
                  "+Results|compared"
                ]),
                "A recorded baseline allows the utility to evaluate whether billing accuracy genuinely improves."
              )
            ],

            [
              "Without that comparison, the programme could claim success merely because new technology has been installed.",
              null
            ],

            [
              "The board needs evidence of better billing outcomes rather than a catalogue of completed implementation activities.",
              q(
                "Can the utility demonstrate that the programme addresses the problem for which funding was approved?"
              )
            ],

            [
              "A credible brief therefore connects the original problem with measurable outcomes, clear scope, and accountable ownership.",
              null
            ],

            [
              "Remember that attractive ambitions become defensible commitments only when managers can explain how success will be demonstrated.",
              st(
                "A strong BPM brief connects its funding rationale with clear outcomes, delivery boundaries, authority, and evidence."
              )
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A university research-grant administration process
        // Angle: discovering missing commitments through a proposed
        // programme's practical consequences.
        // ------------------------------------------------------------

        {
          title: "The research office's missing commitments",

          lines: [

            [
              "Imagine a university approving a programme to improve how researchers obtain administrative approval for grant applications.",
              t(
                "Finding gaps in a programme brief",
                "A university research process shows how unclear purpose and ownership can undermine a promising improvement proposal."
              )
            ],

            [
              "Researchers have complained that applications sometimes wait too long between departmental and central administrative reviews.",
              null
            ],

            [
              "The university approves funding after several important submissions are delayed by avoidable administrative handoffs.",
              dg(
                "The problem behind the decision",
                D.flow([
                  "Grant|prepared",
                  "Department|review",
                  "!Approval|delayed",
                  "Submission|at risk"
                ]),
                "Delayed administrative handoffs create a need to improve the grant-approval process."
              )
            ],

            [
              "The proposed programme promises a digital research environment that will support academic excellence and institutional innovation.",
              null
            ],

            [
              "Those ambitions sound positive, but they do not identify the particular delays that prompted the investment.",
              iss(
                "The programme describes institutional innovation without identifying the approval delays requiring improvement.",
                "Purpose remains vague"
              )
            ],

            [
              "A credible brief should explain how the university intends to make grant approvals more reliable and timely.",
              null
            ],

            [
              "That purpose matters because researchers need dependable decisions before external submission deadlines.",
              st(
                "The programme should address the approval process that created the original funding need."
              )
            ],

            [
              "Now imagine the project team proposing a new online form without changing the underlying approval responsibilities.",
              null
            ],

            [
              "Applications might become easier to submit while continuing to wait between the same administrative offices.",
              dg(
                "Technology without process change",
                D.flow([
                  "Online|form",
                  "Application|submitted",
                  "!Approval|queue",
                  "!Delay|remains"
                ]),
                "A new submission form cannot automatically resolve delays within the approval process."
              )
            ],

            [
              "You should therefore examine whether the programme includes the handoffs that actually determine approval time.",
              null
            ],

            [
              "Scope must cover the relevant activities rather than only the technology visible to researchers.",
              q(
                "Does the proposed programme include the activities responsible for the delays it promises to remove?"
              )
            ],

            [
              "The brief also needs a process owner who can coordinate decisions between academic departments and administrative offices.",
              null
            ],

            [
              "Without that authority, each unit may preserve its procedures while the complete approval journey remains slow.",
              iss(
                "Departments retain separate approval procedures without accountable coordination of the complete process.",
                "The mandate is incomplete"
              )
            ],

            [
              "The university should record current approval times before introducing changes, establishing a baseline for evaluation.",
              null
            ],

            [
              "That evidence allows managers to distinguish genuine improvement from optimistic impressions about the new system.",
              dg(
                "Measuring the complete journey",
                D.flow([
                  "Application|received",
                  "Reviews|completed",
                  "Decision|communicated",
                  "+Elapsed|time measured"
                ]),
                "End-to-end measurement shows how long researchers wait for the complete administrative approval process."
              )
            ],

            [
              "The programme should also preserve necessary review quality rather than treating every approval step as unnecessary delay.",
              null
            ],

            [
              "That distinction matters because faster decisions are valuable only when the required checks remain reliable.",
              [
                cmp(
                  "a",
                  "Timeliness",
                  "Researchers receive administrative decisions without avoidable delays."
                ),
                cmp(
                  "b",
                  "Review quality",
                  "The university maintains the checks required for responsible grant administration."
                )
              ]
            ],

            [
              "A complete brief would reconcile these expectations through agreed measures and clear responsibilities.",
              null
            ],

            [
              "When evaluating any proposal, ask whether its activities genuinely support the outcomes that justified investment.",
              q(
                "Can the programme demonstrate better grant approvals rather than merely successful technology implementation?"
              )
            ],

            [
              "Remember that a credible brief connects purpose, scope, ownership, and evidence with the original organisational problem.",
              st(
                "A defensible BPM brief explains what must improve, who can act, and how results will be verified."
              )
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O4b
      // Making the board's business case coherent
      // ==============================================================

      W2O4b: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A cold-storage logistics company
        // Angle: distinguishing funded obligations from additional
        // financial and service benefits.
        // ------------------------------------------------------------

        {
          title: "The cold-storage investment decision",

          lines: [

            [
              "Imagine a logistics company operating refrigerated warehouses for businesses that need temperature-controlled storage.",
              t(
                "Building a coherent business case",
                "A cold-storage programme must connect its funding rationale with measurable operational outcomes and defensible benefits."
              )
            ],

            [
              "A major customer reports receiving incomplete temperature records for products stored at one of the company's facilities.",
              null
            ],

            [
              "Management approves investment because reliable records are essential to demonstrating that storage conditions were maintained.",
              dg(
                "The original funding rationale",
                D.flow([
                  "Records|incomplete",
                  "Customer|concern",
                  "Funding|approved",
                  "+Evidence|required"
                ]),
                "The company funds improvement because it cannot reliably provide complete temperature records."
              )
            ],

            [
              "The programme director also hopes to reduce energy costs and improve the efficiency of warehouse operations.",
              null
            ],

            [
              "Those ambitions may create value, but they are different from the obligation that secured funding.",
              [
                cmp(
                  "a",
                  "Required outcome",
                  "Produce reliable temperature records for the relevant stored products."
                ),
                cmp(
                  "b",
                  "Additional benefits",
                  "Reduce energy costs and improve warehouse operating efficiency."
                )
              ]
            ],

            [
              "A business case explains why investment is justified by connecting expected outcomes with resources and risks.",
              null
            ],

            [
              "The director should therefore explain how the proposed changes will resolve the incomplete-record problem.",
              st(
                "The business case must connect the funded problem with a demonstrable operational result."
              )
            ],

            [
              "Installing monitoring equipment might support that objective, but equipment installation alone cannot establish reliable records.",
              null
            ],

            [
              "The company must demonstrate that information is captured, retained, and retrieved through a dependable process.",
              dg(
                "From implementation to outcome",
                D.flow([
                  "Temperature|captured",
                  "Records|retained",
                  "Information|retrieved",
                  "+Reliability|demonstrated"
                ]),
                "Reliable temperature records depend on the complete information process rather than equipment installation alone."
              )
            ],

            [
              "Now imagine the programme reporting substantial energy savings while continuing to produce incomplete temperature histories.",
              null
            ],

            [
              "The board could reasonably question whether the original investment obligation had actually been fulfilled.",
              iss(
                "Energy costs decline, but the company still cannot demonstrate reliable temperature records.",
                "Benefits do not match the funding rationale"
              )
            ],

            [
              "The opposite situation also deserves attention because complete records do not automatically produce lower operating costs.",
              null
            ],

            [
              "The director should measure each promised outcome separately instead of assuming that improvement in one guarantees another.",
              st(
                "A coherent business case distinguishes mandatory outcomes from additional benefits and establishes evidence for each."
              )
            ],

            [
              "The company needs a baseline for energy consumption before claiming that redesigned processes have reduced costs.",
              null
            ],

            [
              "It also needs agreed tests demonstrating that the required temperature information can be produced reliably.",
              dg(
                "Verifying the programme's benefits",
                D.flow([
                  "Record|reliability",
                  "Energy|baseline",
                  "Changes|implemented",
                  "+Outcomes|verified"
                ]),
                "Separate evidence allows the board to evaluate record reliability and financial benefits."
              )
            ],

            [
              "The programme should establish ownership across warehouse operations, maintenance, and information management responsibilities.",
              null
            ],

            [
              "That coordination matters because reliable records depend on connected activities rather than one department's performance.",
              q(
                "Who is accountable when the temperature information process fails between departments?"
              )
            ],

            [
              "The director must also explain which improvements are essential and which can be scheduled beyond immediate delivery.",
              null
            ],

            [
              "Clear priorities protect the funded obligation while allowing realistic additional benefits to be pursued.",
              st(
                "A defensible business case aligns the funding rationale, scope, ownership, and measurable outcomes."
              )
            ],

            [
              "Remember that a successful investment must deliver what justified its approval, not merely produce attractive secondary results.",
              null
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A regional diagnostic laboratory
        // Angle: presenting a board decision through evidence,
        // priorities, operational risk, and sustained benefits.
        // ------------------------------------------------------------

        {
          title: "The laboratory's case for investment",

          lines: [

            [
              "Imagine a regional diagnostic laboratory seeking board approval to redesign how medical test samples move through its facilities.",
              t(
                "Explaining an investment to the board",
                "A laboratory programme needs a business case connecting operational weaknesses with measurable and sustainable outcomes."
              )
            ],

            [
              "Hospital customers have reported delays in receiving results, creating concern about the laboratory's service reliability.",
              null
            ],

            [
              "The laboratory's managers believe that fragmented sample tracking contributes to those delays.",
              dg(
                "The operational problem",
                D.flow([
                  "Sample|received",
                  "Tracking|fragmented",
                  "!Handoff|delayed",
                  "Result|reported"
                ]),
                "Fragmented sample tracking may contribute to delays in communicating laboratory results."
              )
            ],

            [
              "The proposed programme promises faster results, improved customer satisfaction, and a more modern laboratory.",
              null
            ],

            [
              "Those ambitions need supporting evidence because a board must decide whether the requested investment is justified.",
              q(
                "What problem will the investment solve, and how will the laboratory demonstrate that it has succeeded?"
              )
            ],

            [
              "The director should begin by explaining the current process and identifying where samples experience avoidable delays.",
              null
            ],

            [
              "That analysis matters because purchasing faster equipment may not resolve problems caused by information handoffs.",
              iss(
                "The laboratory proposes new equipment without establishing whether equipment capacity causes the reported delays.",
                "The proposed solution may miss the problem"
              )
            ],

            [
              "A credible business case would connect the identified process weaknesses with changes designed to improve result delivery.",
              null
            ],

            [
              "It would also establish current turnaround performance, creating a baseline against which later results can be compared.",
              dg(
                "Connecting investment with evidence",
                D.flow([
                  "Current|performance",
                  "Process|weaknesses",
                  "Proposed|changes",
                  "+Results|measured"
                ]),
                "The board needs evidence connecting the existing problem with the expected benefits of process redesign."
              )
            ],

            [
              "Turnaround time means the elapsed duration between defined starting and ending points in the laboratory process.",
              null
            ],

            [
              "The laboratory must define those boundaries carefully so its performance claims remain consistent and meaningful.",
              st(
                "Agreed process measures allow the board to evaluate whether the proposed investment delivers meaningful improvement."
              )
            ],

            [
              "The director should also identify risks, including disruption during implementation and the possibility of incomplete staff adoption.",
              null
            ],

            [
              "Those risks matter because a technically successful installation cannot guarantee reliable everyday process performance.",
              dg(
                "Considering delivery risks",
                D.flow([
                  "Process|redesign",
                  "Staff|preparation",
                  "Implementation|controlled",
                  "+Service|protected"
                ]),
                "A credible business case considers how the organisation will manage risks while introducing process changes."
              )
            ],

            [
              "The board also needs assurance that someone will own the process after the temporary programme closes.",
              null
            ],

            [
              "Continuing ownership matters because sample tracking and result delivery require coordination across several operational responsibilities.",
              [
                cmp(
                  "a",
                  "Programme delivery",
                  "Implements the agreed process changes and demonstrates the expected outcomes."
                ),
                cmp(
                  "b",
                  "Continuing ownership",
                  "Maintains accountability for reliable laboratory performance after implementation."
                )
              ]
            ],

            [
              "Now imagine the board asking whether the investment should proceed despite competing demands on available resources.",
              null
            ],

            [
              "The director should explain the expected value, required resources, delivery risks, and evidence supporting the proposal.",
              q(
                "Can the board understand why this investment deserves priority over other possible uses of its resources?"
              )
            ],

            [
              "That explanation becomes persuasive when its claims follow logically from the operational evidence.",
              null
            ],

            [
              "A strong business case does not require exaggerated promises about transforming every aspect of the organisation.",
              st(
                "A coherent business case justifies investment through clear problems, realistic commitments, measurable benefits, and accountable delivery."
              )
            ],

            [
              "Remember that board confidence depends on credible reasoning rather than ambitious language alone.",
              null
            ]

          ]
        }

      ],

      // ==============================================================
      // W2O4c
      // Applying the distinction beyond Qasr
      // ==============================================================

      W2O4c: [

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 0
        // A regional electricity distributor
        // Angle: evaluating competing pressures and defending
        // a funding rationale without inventing the forum case.
        // ------------------------------------------------------------

        {
          title: "One investment decision, several pressures",

          lines: [

            [
              "Imagine a regional electricity distributor considering investment in improving how it responds to customer service interruptions.",
              t(
                "Applying Week 2 reasoning",
                "A funding decision becomes more defensible when managers distinguish continuing pressures from the event requiring action."
              )
            ],

            [
              "Customers have complained about slow updates, while maintenance costs have increased across the distribution network.",
              null
            ],

            [
              "The company also faces growing expectations for convenient digital communication during service interruptions.",
              dg(
                "Several pressures compete",
                D.flow([
                  "Customer|complaints",
                  "Maintenance|costs",
                  "Digital|expectations",
                  "!Investment|debated"
                ]),
                "The distributor faces several business drivers without an automatically determined investment priority."
              )
            ],

            [
              "These conditions create drivers because they make the existing operating arrangements increasingly difficult to sustain.",
              null
            ],

            [
              "Now imagine a major commercial customer introducing new service-reporting conditions for renewing its agreement.",
              iss(
                "A commercial customer introduces new reporting conditions that affect an important contract renewal.",
                "A possible decisive trigger"
              )
            ],

            [
              "Management must decide whether those conditions justify immediate investment in the relevant reporting process.",
              null
            ],

            [
              "The contract announcement could become a trigger if it changes the organisation's decision to approve funding.",
              st(
                "An event becomes a programme trigger when it causes management to commit to organisational action."
              )
            ],

            [
              "Notice that identifying the trigger does not automatically determine every improvement the programme should include.",
              null
            ],

            [
              "The company still needs to evaluate which changes are necessary and which additional benefits are realistic.",
              dg(
                "From event to investment rationale",
                D.flow([
                  "Contract|conditions",
                  "Required|outcome",
                  "Proposed|changes",
                  "+Funding|justified"
                ]),
                "A defensible investment rationale connects the triggering event with a required outcome and proposed response."
              )
            ],

            [
              "Imagine one manager arguing that reducing maintenance costs should receive priority because financial pressure has existed for years.",
              null
            ],

            [
              "Another manager argues that the new reporting conditions deserve priority because the contract renewal creates immediate consequences.",
              [
                cmp(
                  "a",
                  "Cost rationale",
                  "Rising maintenance costs create continuing financial pressure."
                ),
                cmp(
                  "b",
                  "Contract rationale",
                  "New reporting conditions create a time-sensitive commercial decision."
                )
              ]
            ],

            [
              "Both arguments may contain valid concerns, but they rely on different evidence and expectations.",
              null
            ],

            [
              "A strong recommendation should explain why the selected rationale deserves priority under the available circumstances.",
              q(
                "Which evidence most clearly explains why management should commit resources now?"
              )
            ],

            [
              "It should also identify the outcome that would demonstrate whether the investment was justified.",
              null
            ],

            [
              "For the contract rationale, that outcome would concern meeting the customer's agreed reporting conditions.",
              dg(
                "Connecting rationale with success",
                D.flow([
                  "Funding|rationale",
                  "Required|reporting",
                  "Process|redesign",
                  "+Outcome|verified"
                ]),
                "The programme's success measures should reflect the outcome that justified the investment."
              )
            ],

            [
              "The company may pursue wider improvements, but those benefits should not replace the original funding commitment.",
              null
            ],

            [
              "When defending your recommendation, acknowledge reasonable competing priorities rather than dismissing them without examination.",
              st(
                "A defensible funding argument explains the selected priority while recognising legitimate alternatives."
              )
            ],

            [
              "This approach also helps you challenge another person's reasoning without reducing discussion to personal disagreement.",
              null
            ],

            [
              "You can question whether their evidence supports the proposed trigger, outcome, or investment priority.",
              q(
                "What assumption would need to change for a different funding rationale to become more convincing?"
              )
            ],

            [
              "Remember that strong BPM reasoning connects organisational pressure, decisive events, investment purpose, and demonstrable results.",
              null
            ]

          ]
        },

        // ------------------------------------------------------------
        // REMEDIAL VARIANT 1
        // A cultural museum's visitor-access programme
        // Angle: defending a recommendation against competing
        // interpretations of the same organisational evidence.
        // ------------------------------------------------------------

        {
          title: "The museum board's difficult choice",

          lines: [

            [
              "Imagine a cultural museum whose board is considering several proposals for improving the visitor experience.",
              t(
                "Defending a BPM recommendation",
                "A museum investment decision illustrates how different pressures can support competing but reasonable arguments."
              )
            ],

            [
              "Visitors have complained about ticketing delays, while operating costs have gradually increased over recent years.",
              null
            ],

            [
              "The museum also wants to make its exhibitions more accessible to visitors using digital services.",
              dg(
                "The museum's existing pressures",
                D.flow([
                  "Ticketing|delays",
                  "Operating|costs",
                  "Digital|expectations",
                  "!Funding|decision"
                ]),
                "The museum faces several pressures that could justify different process improvement proposals."
              )
            ],

            [
              "These conditions are drivers because they create reasons for change without necessarily determining when investment begins.",
              null
            ],

            [
              "Now imagine the museum receiving confirmation that an important travelling exhibition will open on a fixed date.",
              iss(
                "A major exhibition receives a confirmed opening date, increasing the urgency of preparing visitor services.",
                "A time-sensitive event"
              )
            ],

            [
              "The exhibition is expected to attract additional visitors, making the existing ticketing weaknesses more consequential.",
              null
            ],

            [
              "Management must decide whether to approve process improvements before the exhibition begins.",
              q(
                "Does the confirmed exhibition date provide a stronger reason for immediate investment than the longstanding pressures alone?"
              )
            ],

            [
              "The event could become a trigger if it causes the board to commit funding now.",
              null
            ],

            [
              "However, the board still needs to determine which process improvements best address the resulting operational challenge.",
              dg(
                "Connecting urgency with purpose",
                D.flow([
                  "Exhibition|confirmed",
                  "Visitor|demand",
                  "Ticketing|redesign",
                  "+Readiness|demonstrated"
                ]),
                "The proposed investment should connect the time-sensitive exhibition with a demonstrable visitor-service outcome."
              )
            ],

            [
              "One manager might favour additional ticketing staff because that response appears practical before the exhibition.",
              null
            ],

            [
              "Another might propose redesigning online booking to reduce avoidable queues across the complete visitor journey.",
              [
                cmp(
                  "a",
                  "Staffing proposal",
                  "Increase ticketing capacity during the exhibition."
                ),
                cmp(
                  "b",
                  "Process redesign proposal",
                  "Improve booking and entry coordination to reduce avoidable waiting."
                )
              ]
            ],

            [
              "Both proposals deserve evaluation because they address the problem through different assumptions about its causes.",
              null
            ],

            [
              "The board should examine where delays actually occur before deciding which investment offers greater value.",
              st(
                "A defensible recommendation connects the proposed solution with evidence about the process problem."
              )
            ],

            [
              "If most waiting occurs before visitors reach ticketing staff, additional employees may not solve the underlying difficulty.",
              null
            ],

            [
              "If ticketing capacity is genuinely insufficient, redesign alone may not address the immediate demand.",
              q(
                "What evidence would help distinguish a capacity problem from a process coordination problem?"
              )
            ],

            [
              "This is why a strong funding rationale should acknowledge uncertainty and identify the evidence needed for judgement.",
              null
            ],

            [
              "The chosen programme should also establish measurable outcomes, such as reduced visitor waiting during the exhibition.",
              dg(
                "Making the recommendation testable",
                D.flow([
                  "Current|waiting",
                  "Improvement|selected",
                  "Exhibition|operations",
                  "+Results|measured"
                ]),
                "A recorded baseline and agreed measures allow the museum to evaluate whether its investment improves visitor access."
              )
            ],

            [
              "The board must also consider whether the improvements will remain valuable after the travelling exhibition closes.",
              null
            ],

            [
              "Continuing process ownership could preserve useful changes while avoiding unnecessary expenditure once temporary demand disappears.",
              st(
                "A credible investment decision considers immediate urgency alongside the continuing value of the improved process."
              )
            ],

            [
              "When discussing another person's recommendation, examine their assumptions and evidence rather than simply expressing agreement.",
              null
            ],

            [
              "A thoughtful challenge can reveal whether the proposed rationale truly supports the requested investment.",
              q(
                "Which alternative interpretation of the evidence would most seriously challenge your preferred recommendation?"
              )
            ],

            [
              "Remember that sound BPM judgement requires a defensible reason for action and a measurable definition of success.",
              null
            ]

          ]
        }

      ]

    }

  };

  // Plain-text remediation scripts for tools that expect them.
  // Preserve the Week 1 script-generation contract.
  Object.values(ADAPTIVE.review).forEach((variants) =>
    variants.forEach((variant) =>
      (variant.script = variant.lines.map((x) => x[0]).join(" "))
    )
  );

})();