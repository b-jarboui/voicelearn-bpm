// Adaptive layer: course learning outcomes (CLOs), Week 3 learning outcomes, sections, mastery rule and remedial micro-lessons.
// The question bank itself is in bank.js. Remedial micro-lessons are used ONLY in remediation (never in the main lessons).
// Writing rule: full sentences with the reason and a concrete example; each micro-lesson uses a NEW example, not Qasr Marina or Noor Health.
// Narration is one continuous explanation from a warm teacher to one student, with natural transitions and no spoken lists.
// Every important idea has its why and its practical consequence; unfamiliar terms are defined naturally in passing.
// Each micro-lesson contains 230–360 spoken words, with sentences averaging 15–18 words.
// No spoken sentence exceeds 30 words or contains fewer than 6 words.
// Spoken narration never uses ordinal sequencing words, arrows, bullet characters, or list-style enumeration.
// Every narration sentence is paired with a visual moment or null, which preserves the previous picture.
// A new visual moment appears every 1–3 sentences, using only the existing Week 1 moment helpers.
// All diagrams use existing window.DIAG functions and have full-sentence explanatory captions.
// Each remedial variant approaches the misconception differently and uses a fresh everyday example.
// Week 3 outcomes and section identifiers match course.js exactly.
// K2: Evaluate various factors that impact on the successful implementation of BPM in public and private sector organizations.
// S2: Integrate new technologies to manage organizational changes.
// W3O1: Evaluate the role of BPM technology in enabling, rather than determining, process design.
// W3O2: Assess the critical success and failure factors for BPM implementation.
// W3O3: Appraise selection criteria for a BPM suite, including the cost of change after go-live.

(() => {
  const D = window.DIAG, { t, it, q, st, iss, cmp, dg, fm } = window.MOMENT_KIT;

  window.ADAPTIVE = {
    target: 0.8,             // mastery threshold per section, per outcome and per CLO
    window: 5,               // section mastery = share correct in the learner's last 5 answers on that section
    minEvidence: 3,          // a section needs at least 3 answers before it can count as mastered
    firstCheck: 4,           // minimum items per lesson check (spread evenly over the lesson's sections)
    firstCheckPerSection: 3, // at least 3 items per section in every lesson check
    perWeak: 3,              // fresh items per weak section in every remediation round

    clos: {
      K2: {
        name: "K2",
        full: "Evaluate various factors that impact on the successful implementation of BPM in public and private sector organizations"
      },
      S2: {
        name: "S2",
        full: "Integrate new technologies to manage organizational changes"
      },
    },

    outcomes: {
      W3O1: {
        clo: "S2",
        name: "Technology enables",
        full: "Evaluate the role of BPM technology in enabling, rather than determining, process design"
      },
      W3O2: {
        clo: "K2",
        name: "Success and failure factors",
        full: "Assess the critical success and failure factors for BPM implementation"
      },
      W3O3: {
        clo: "S2",
        name: "Selecting a BPM suite",
        full: "Appraise selection criteria for a BPM suite, including the cost of change after go-live"
      },
    },

    sections: {
      W3O1a: {
        lo: "W3O1",
        lesson: "w3l1",
        name: "A powerful tool, but whose process?"
      },
      W3O1b: {
        lo: "W3O1",
        lesson: "w3l1",
        name: "Inside the suite: from drawings to real work"
      },
      W3O2a: {
        lo: "W3O2",
        lesson: "w3l2",
        name: "The people behind a successful process"
      },
      W3O2b: {
        lo: "W3O2",
        lesson: "w3l2",
        name: "A promise needs a baseline and an owner"
      },
      W3O2c: {
        lo: "W3O2",
        lesson: "w3l2",
        name: "Five ways a promising programme falls apart"
      },
      W3O3a: {
        lo: "W3O3",
        lesson: "w3l3",
        name: "When a beautiful demonstration becomes the design"
      },
      W3O3b: {
        lo: "W3O3",
        lesson: "w3l3",
        name: "The cheapest system to buy may cost more to change"
      },
      W3O3c: {
        lo: "W3O3",
        lesson: "w3l4",
        name: "What must happen before Qasr signs?"
      },
      W3O2d: {
        lo: "W3O2",
        lesson: "w3l4",
        name: "The suite nobody opened, and the lesson it leaves"
      },
    },

    // Remedial micro-lessons: two per section, each a different angle and a fresh everyday example.
    // Round 1 of remediation on a section plays variant 0, round 2 plays variant 1, then they alternate.
    review: {

      W3O1a: [

        {
          title: "The washing machine that could not solve the laundry problem",

          lines: [

            [
              "Let's approach the relationship between technology and process design through something familiar from everyday life.",
              t(
                "Another way to understand BPM technology",
                "A powerful washing machine cannot repair a badly organised laundry process."
              )
            ],

            [
              "Imagine a university residence where students regularly complain that their laundry takes several days to return.",
              null
            ],

            [
              "The residence manager assumes the washing machines are too slow and purchases an expensive automated machine.",
              null
            ],

            [
              "It washes clothes much faster, and the supplier proudly demonstrates its impressive cleaning and drying capabilities.",
              dg(
                "The impressive machine",
                D.flow([
                  "Clothes|loaded",
                  "Fast|washing",
                  "Automatic|drying",
                  "+Clean|clothes"
                ]),
                "The new machine performs washing and drying efficiently, but those activities represent only part of the laundry service."
              )
            ],

            [
              "But students still wait several days, because the real delays occur elsewhere in the service.",
              null
            ],

            [
              "Employees collect laundry irregularly, mix up identification labels, and leave finished clothes waiting for delivery.",
              iss(
                "The washing machine is faster, but collection, identification, and delivery remain disorganised.",
                "The wrong problem was solved"
              )
            ],

            [
              "The machine has improved one activity without improving the complete process experienced by the students.",
              null
            ],

            [
              "This is the difference between improving a task and redesigning the process that produces the customer's outcome.",
              st(
                "Technology can improve an individual activity without improving the complete customer experience."
              )
            ],

            [
              "Now imagine the manager investigating the journey from collecting dirty clothes until returning clean laundry.",
              null
            ],

            [
              "She discovers that clear labels, scheduled collections, and reliable delivery arrangements would eliminate much of the waiting.",
              dg(
                "Understanding the complete journey",
                D.flow([
                  "Collect|laundry",
                  "Identify|owner",
                  "Wash and|dry",
                  "+Return|laundry"
                ]),
                "The complete laundry process includes collection, identification, washing, and delivery to the correct student."
              )
            ],

            [
              "Only after understanding those problems can she decide which activities genuinely require technological support.",
              null
            ],

            [
              "Business Process Management, or BPM, means continually designing, managing, measuring, and improving connected organisational work.",
              st(
                "BPM is the management discipline that determines how the complete process should work."
              )
            ],

            [
              "A BPM suite is software that helps organisations describe, coordinate, connect, and monitor those processes.",
              null
            ],

            [
              "The distinction matters because software can support a chosen design without independently knowing which design is best.",
              cmp(
                "a",
                "Management responsibility",
                "Decide how laundry should move reliably from collection to delivery."
              )
            ],

            [
              "For example, the residence might use software to track each laundry bag through collection and delivery.",
              null
            ],

            [
              "That tracking becomes useful because the manager has already identified missing information as a genuine problem.",
              cmp(
                "b",
                "Technology support",
                "Track each laundry bag through the process that management has redesigned."
              )
            ],

            [
              "Buying tracking software before investigating the delays could simply make an inefficient process more expensive.",
              null
            ],

            [
              "So whenever technology looks impressive, ask which customer problem it solves and whether the underlying process makes sense.",
              q(
                "Would you purchase another machine, or redesign the laundry journey before deciding what technology is needed?"
              )
            ],

            [
              "The strongest improvement begins with understanding the work, because technology should enable the solution rather than define it.",
              st(
                "Design the process around the customer's outcome, then choose technology that helps deliver it."
              )
            ]

          ]
        },

        {
          title: "When a navigation app cannot repair a confusing delivery service",

          lines: [

            [
              "Imagine a neighbourhood pharmacy that promises to deliver essential medicines to customers within two hours.",
              t(
                "Another way to understand technology and process",
                "A navigation app cannot solve delivery problems caused by poor coordination."
              )
            ],

            [
              "Customers regularly receive their medicines late, and the pharmacy owner believes the delivery drivers need better navigation.",
              null
            ],

            [
              "He purchases an advanced route-planning application that calculates efficient journeys through the city's busy streets.",
              null
            ],

            [
              "The demonstration is convincing because drivers appear to reach every destination using shorter and faster routes.",
              dg(
                "The technology demonstration",
                D.flow([
                  "Delivery|address",
                  "Route|calculated",
                  "Driver|travels",
                  "+Customer|reached"
                ]),
                "The navigation application improves route planning after a delivery is ready to leave the pharmacy."
              )
            ],

            [
              "But the pharmacy's delivery performance barely changes, even though drivers now spend less time travelling.",
              null
            ],

            [
              "Many prescriptions wait for pharmacist approval, while packed medicines remain unassigned until someone notices them.",
              iss(
                "Drivers travel efficiently, but prescriptions and completed packages still wait inside the pharmacy.",
                "The delay is elsewhere"
              )
            ],

            [
              "The owner has automated a visible activity without investigating the complete journey from prescription to delivery.",
              null
            ],

            [
              "Now imagine following one customer's prescription through the pharmacy instead of watching the driver's route.",
              dg(
                "Following the medicine",
                D.flow([
                  "Prescription|received",
                  "Pharmacist|approves",
                  "Medicine|prepared",
                  "+Customer|receives"
                ]),
                "The complete delivery process begins with the prescription and ends when the customer receives the medicine."
              )
            ],

            [
              "That wider view reveals where work waits, who makes decisions, and which information employees need.",
              null
            ],

            [
              "The owner discovers that approval requests sometimes remain unnoticed because nobody clearly owns the waiting queue.",
              st(
                "Understanding the complete process reveals problems that individual technology demonstrations can hide."
              )
            ],

            [
              "He redesigns the approval arrangements and assigns responsibility for monitoring prescriptions awaiting pharmacist review.",
              null
            ],

            [
              "Now technology can help by notifying the appropriate pharmacist when a prescription requires attention.",
              cmp(
                "a",
                "Process design",
                "Define who approves prescriptions and how waiting requests are managed."
              )
            ],

            [
              "The navigation application may still contribute value, but it supports only the transport portion of the service.",
              null
            ],

            [
              "This is why a technology capability should be judged against the specific process problem it addresses.",
              cmp(
                "b",
                "Technology enablement",
                "Use notifications for approvals and route planning for medicines ready for delivery."
              )
            ],

            [
              "Business Process Management provides the continuing responsibility for understanding, designing, and improving the complete service.",
              null
            ],

            [
              "A BPM suite provides software capabilities that may help coordinate and monitor the process management has chosen.",
              st(
                "BPM determines how work should deliver value, while a BPMS helps operate and monitor that design."
              )
            ],

            [
              "If the owner had accepted the navigation demonstration as the complete solution, the real bottleneck would remain.",
              null
            ],

            [
              "A bottleneck is a point where limited capacity or delayed decisions restrict the movement of work.",
              q(
                "Where should the pharmacy investigate when faster driving does not produce faster medicine delivery?"
              )
            ],

            [
              "The lesson is to diagnose the customer's complete journey before allowing a vendor's impressive technology to shape it.",
              null
            ],

            [
              "Good technology decisions follow process understanding, because the organisation must define the problem before purchasing its solution.",
              st(
                "Let the customer's journey determine the process design, and let that design determine the technology requirements."
              )
            ]

          ]
        }

      ],

      W3O1b: [

        {
          title: "How a university library turns a request into a completed service",

          lines: [

            [
              "Let's explore the capabilities inside a BPM suite through a university library that handles book reservation requests.",
              t(
                "Another way to understand a BPM suite",
                "A library reservation shows how different software capabilities support one connected service."
              )
            ],

            [
              "Imagine requesting a book online because you need it for an important research assignment next week.",
              null
            ],

            [
              "The library must locate the book, confirm your eligibility, arrange collection, and notify you when it becomes available.",
              dg(
                "The library reservation journey",
                D.flow([
                  "Book|requested",
                  "Availability|checked",
                  "Collection|arranged",
                  "+Student|notified"
                ]),
                "The library reservation process connects the student's request with the work needed to make the book available."
              )
            ],

            [
              "A process model makes that journey visible, allowing librarians to agree on the activities and their relationships.",
              null
            ],

            [
              "But the model is only a description, so drawing it cannot automatically reserve the requested book.",
              cmp(
                "a",
                "Process modelling",
                "A shared picture describes the activities and decisions involved in reserving a book."
              )
            ],

            [
              "Workflow execution coordinates real tasks, such as sending an unavailable-book request to the appropriate librarian.",
              null
            ],

            [
              "That coordination matters because requests should not depend on employees remembering every pending reservation.",
              cmp(
                "b",
                "Workflow execution",
                "The system directs actual reservation tasks to the people responsible for completing them."
              )
            ],

            [
              "Now imagine the library allows postgraduate students to reserve certain reference books for longer periods.",
              null
            ],

            [
              "A rules engine applies those borrowing conditions, helping the library make consistent decisions across different requests.",
              dg(
                "Applying borrowing rules",
                D.flow([
                  "Student|category",
                  "Borrowing|rule",
                  "Eligible|period",
                  "+Reservation|decision"
                ]),
                "The rules engine applies the library's borrowing conditions to determine the appropriate reservation decision."
              )
            ],

            [
              "But those decisions require accurate information about student status and whether the requested book is available.",
              null
            ],

            [
              "Integration connects the reservation application with the university's student records and the library catalogue.",
              st(
                "Integration allows different applications to exchange the information required by a complete business process."
              )
            ],

            [
              "An API is an application programming interface that allows software applications to exchange information through defined connections.",
              null
            ],

            [
              "Without integration, librarians might repeatedly enter student details or manually check book availability in separate systems.",
              iss(
                "The reservation application cannot access student status or current book availability.",
                "Disconnected systems"
              )
            ],

            [
              "Finally, monitoring helps the library see how long reservations take and which requests remain unresolved.",
              null
            ],

            [
              "Analytics means examining that performance information to recognise patterns and support better management decisions.",
              dg(
                "Monitoring reservation performance",
                D.flow([
                  "Request|received",
                  "Status|tracked",
                  "!Delay|detected",
                  "Manager|responds"
                ]),
                "Monitoring reveals delayed reservations so library managers can investigate problems before students abandon their requests."
              )
            ],

            [
              "Notice that these capabilities contribute different things, although they all support the same student outcome.",
              null
            ],

            [
              "A beautiful process diagram cannot replace workflow, and workflow cannot compensate for missing information connections.",
              q(
                "Would the reservation service work reliably if the library purchased every capability but used only process modelling?"
              )
            ],

            [
              "The value comes from combining the capabilities that the redesigned reservation process genuinely needs.",
              null
            ],

            [
              "So remember that a BPM suite supports process description, execution, decisions, connections, and continuing performance management.",
              st(
                "A BPM suite creates value when its capabilities are used together to support a meaningful operational process."
              )
            ]

          ]
        },

        {
          title: "The birthday cake that needed more than a recipe",

          lines: [

            [
              "Imagine a bakery that accepts customised birthday cake orders through its website and promises reliable collection times.",
              t(
                "Another way to understand suite capabilities",
                "A bakery shows why documenting work is different from coordinating and managing real orders."
              )
            ],

            [
              "The owner has written an excellent procedure explaining how each order should move through the bakery.",
              null
            ],

            [
              "It describes receiving customer preferences, checking ingredients, preparing the cake, decorating it, and arranging collection.",
              dg(
                "The documented cake process",
                D.flow([
                  "Order|received",
                  "Ingredients|checked",
                  "Cake|prepared",
                  "+Customer|collects"
                ]),
                "The process model describes the activities needed to turn a customer's order into a completed birthday cake."
              )
            ],

            [
              "That description is process modelling, because it represents how connected activities should produce the customer's outcome.",
              null
            ],

            [
              "But imagine the decorator never receives an urgent order because the baker forgets to pass along the details.",
              iss(
                "The procedure is correct, but the decorator never receives the order that requires attention.",
                "A model without execution"
              )
            ],

            [
              "Workflow execution would coordinate the actual order, making the decorating task visible to the responsible employee.",
              null
            ],

            [
              "The distinction matters because knowing what should happen does not guarantee that the work actually happens.",
              st(
                "Modelling describes the process, while workflow execution coordinates real activities within that process."
              )
            ],

            [
              "Now imagine a customer requesting a cake containing nuts for a school celebration with strict allergy restrictions.",
              null
            ],

            [
              "The bakery needs consistent decisions about ingredients and whether particular customer requests can be accepted safely.",
              dg(
                "Applying bakery rules",
                D.flow([
                  "Customer|request",
                  "Ingredient|conditions",
                  "Safety|decision",
                  "+Order|response"
                ]),
                "Business rules help the bakery apply its defined ingredient and safety conditions consistently to customer requests."
              )
            ],

            [
              "A rules engine can apply defined conditions, although the bakery must establish those conditions responsibly.",
              null
            ],

            [
              "The software cannot independently decide which safety requirements are appropriate without informed human judgement.",
              cmp(
                "a",
                "Management responsibility",
                "Establish appropriate ingredient restrictions and the decisions required to protect customers."
              )
            ],

            [
              "The bakery also needs information from its stock system to know whether ingredients are available.",
              null
            ],

            [
              "Integration connects the ordering process with that stock information, reducing unnecessary calls and repeated manual checks.",
              cmp(
                "b",
                "Integration capability",
                "Connect the order with current ingredient availability and the information employees need."
              )
            ],

            [
              "An API is a defined software connection that allows applications to exchange information when required.",
              null
            ],

            [
              "Without integration, the website might accept orders that the bakery cannot fulfil using its available ingredients.",
              iss(
                "The website accepts an order without knowing that a required ingredient is unavailable.",
                "Missing information"
              )
            ],

            [
              "Now imagine the owner wondering why customers increasingly complain about cakes being ready later than promised.",
              null
            ],

            [
              "Monitoring can reveal delayed orders, while analytics helps identify patterns behind repeated preparation problems.",
              dg(
                "Monitoring bakery performance",
                D.flow([
                  "Order|accepted",
                  "Preparation|tracked",
                  "!Delay|identified",
                  "Owner|investigates"
                ]),
                "Monitoring helps the bakery identify late orders and investigate recurring problems in its preparation process."
              )
            ],

            [
              "These capabilities matter because a documented procedure alone cannot coordinate work, connect information, or reveal performance.",
              null
            ],

            [
              "The owner must still decide what the bakery promises customers and how the complete process should operate.",
              q(
                "Would purchasing sophisticated software help if nobody agreed how urgent orders or ingredient shortages should be handled?"
              )
            ],

            [
              "A BPM suite becomes useful when its capabilities support those decisions rather than substitute for them.",
              null
            ],

            [
              "So think of the suite as support for managing real work, not simply a place to store attractive diagrams.",
              st(
                "The suite supports the designed process through modelling, workflow, rules, integration, and monitoring."
              )
            ]

          ]
        }

      ],

// REVIEW w3l2

W3O2a: [

  {
    title: "The community garden that needed more than a sponsor",

    lines: [

      [
        "Let's explore why people determine BPM success through a community garden that has received funding for a digital booking system.",
        t(
          "Another way to understand success factors",
          "A community garden needs committed people and clear responsibilities, not merely a new booking system."
        )
      ],

      [
        "The neighbourhood council approves the purchase, expecting residents to reserve planting spaces and share equipment more easily.",
        null
      ],

      [
        "The software works, but residents continue arguing about responsibilities, and several planting spaces remain neglected.",
        iss(
          "The booking system works, but disagreements and unclear responsibilities prevent the garden from operating smoothly.",
          "Technology without coordination"
        )
      ],

      [
        "The council chairperson approved the budget but stopped attending discussions once the system was installed.",
        null
      ],

      [
        "This reveals the difference between approving an investment and providing sustained executive sponsorship.",
        cmp(
          "a",
          "Budget approval",
          "A senior leader authorises the investment but leaves operational disagreements unresolved."
        )
      ],

      [
        "Active sponsorship means remaining involved, resolving difficult disagreements, protecting resources, and supporting the intended improvement.",
        null
      ],

      [
        "Without that leadership, residents may defend individual preferences instead of improving the shared gardening experience.",
        cmp(
          "b",
          "Active sponsorship",
          "A senior leader remains involved and helps resolve problems that prevent the shared process from working."
        )
      ],

      [
        "Now imagine appointing a garden coordinator who becomes accountable for the complete reservation and maintenance process.",
        null
      ],

      [
        "This person is the process owner, meaning someone responsible for performance across the activities involved.",
        st(
          "A process owner is accountable for the complete process rather than one isolated activity."
        )
      ],

      [
        "But the coordinator needs authority to change arrangements when reservations conflict or maintenance responsibilities become unclear.",
        null
      ],

      [
        "A title without decision-making authority would leave the coordinator unable to solve the garden's recurring problems.",
        dg(
          "Ownership needs authority",
          D.flow([
            "Process|owner",
            "Authority|to decide",
            "Problems|resolved",
            "+Shared|improvement"
          ]),
          "Effective process ownership requires authority to resolve problems across the activities that contribute to the shared outcome."
        )
      ],

      [
        "The residents themselves also understand practical difficulties that the council may never notice.",
        null
      ],

      [
        "Someone might explain that elderly gardeners struggle with the booking screen or need assistance accessing equipment.",
        q(
          "What happens when the people using a process are excluded from designing it?"
        )
      ],

      [
        "Their concerns provide useful design information rather than automatically proving that residents oppose improvement.",
        null
      ],

      [
        "Involving them early helps the council adjust the arrangements and build confidence in the new system.",
        st(
          "Employee and user involvement improves process design because practical experience reveals problems that formal plans may overlook."
        )
      ],

      [
        "Training also matters because residents cannot benefit from useful technology they do not understand.",
        null
      ],

      [
        "The coordinator might organise short demonstrations using actual garden reservations rather than abstract software instructions.",
        dg(
          "Building adoption",
          D.flow([
            "Residents|consulted",
            "Process|adjusted",
            "Practical|training",
            "+Confident|use"
          ]),
          "Early involvement and practical training help users understand and adopt the redesigned reservation process."
        )
      ],

      [
        "Notice how leadership, ownership, involvement, and capability reinforce one another throughout the improvement effort.",
        null
      ],

      [
        "The booking system supports their work, but it cannot independently create cooperation or resolve competing responsibilities.",
        st(
          "Technology enables improvement when leadership and users create the organisational conditions needed for success."
        )
      ],

      [
        "Whenever a BPM programme struggles, examine those human conditions before assuming the software needs replacing.",
        null
      ]

    ]
  },

  {
    title: "Why the school timetable failed despite perfect software",

    lines: [

      [
        "Imagine a school introducing sophisticated timetable software to reduce classroom conflicts and improve the daily teaching experience.",
        t(
          "Another angle on BPM success",
          "A technically correct timetable can still fail when the school ignores the people who must use it."
        )
      ],

      [
        "The principal approves the system after watching a demonstration that produces attractive schedules within seconds.",
        null
      ],

      [
        "When the timetable launches, teachers discover that important practical constraints were never included in its design.",
        iss(
          "The timetable satisfies the software rules but creates difficulties for teachers and students.",
          "A technically correct failure"
        )
      ],

      [
        "Science teachers need laboratory preparation time, while younger pupils require appropriate breaks between demanding activities.",
        null
      ],

      [
        "The software cannot respect those requirements when nobody has explained them to the implementation team.",
        st(
          "A system cannot reliably support practical requirements that the organisation has failed to identify."
        )
      ],

      [
        "Now imagine teachers raising concerns, only to hear that the new timetable has already been approved.",
        null
      ],

      [
        "Management describes their objections as resistance, meaning reluctance to accept the proposed organisational change.",
        cmp(
          "a",
          "Resistance dismissed",
          "Managers assume objections reflect unwillingness to change and demand immediate compliance."
        )
      ],

      [
        "But the objections may contain evidence that the proposed timetable does not support effective teaching.",
        null
      ],

      [
        "Listening carefully allows the school to distinguish genuine design problems from unfamiliarity with new procedures.",
        cmp(
          "b",
          "Resistance investigated",
          "Managers examine concerns and use practical evidence to improve the timetable."
        )
      ],

      [
        "This is why employee involvement matters before implementation rather than only after difficulties become visible.",
        null
      ],

      [
        "Teachers understand classroom realities, while administrative employees know the constraints involved in managing room availability.",
        dg(
          "Bringing practical knowledge together",
          D.lanes(
            ["Teachers", "Administration", "Leadership"],
            [
              [0, "Teaching needs"],
              [1, "Room constraints"],
              [2, "Resolve conflicts"],
              [0, "Usable timetable"]
            ]
          ),
          "A workable timetable depends on combining teaching knowledge, administrative constraints, and leadership decisions."
        )
      ],

      [
        "The school also needs a process owner responsible for the complete scheduling experience across departments.",
        null
      ],

      [
        "That owner requires authority to coordinate changes rather than merely collecting complaints from frustrated teachers.",
        st(
          "Process ownership becomes meaningful when responsibility is supported by sufficient authority to improve the complete process."
        )
      ],

      [
        "The principal must remain an active sponsor by resolving disagreements and protecting time for necessary adjustments.",
        null
      ],

      [
        "Otherwise, departments may return to informal scheduling arrangements that undermine the new system's intended benefits.",
        iss(
          "Departments abandon the official timetable and recreate their previous informal arrangements.",
          "Adoption breaks down"
        )
      ],

      [
        "Practical training should then show teachers how to request changes and respond when unexpected classroom conflicts arise.",
        null
      ],

      [
        "That training builds internal capability, allowing the school to maintain the timetable without permanent external dependence.",
        dg(
          "Sustaining the new process",
          D.flow([
            "Active|leadership",
            "Empowered|owner",
            "Teacher|involvement",
            "+Practical|capability"
          ]),
          "Sustained leadership, empowered ownership, employee involvement, and training support successful adoption of the timetable process."
        )
      ],

      [
        "The lesson is that successful BPM requires organisational change, not simply a technically successful installation.",
        null
      ],

      [
        "Good software becomes valuable when knowledgeable people can shape, operate, and continually improve the process it supports.",
        st(
          "BPM success depends on the organisation's ability to turn technological capability into effective everyday work."
        )
      ]

    ]
  }

],

W3O2b: [

  {
    title: "The restaurant that celebrated its new ordering system",

    lines: [

      [
        "Imagine a busy restaurant purchasing a digital ordering system because customers regularly complain about slow service.",
        t(
          "Another way to understand benefits",
          "A completed technology project is not necessarily a successful service improvement."
        )
      ],

      [
        "The supplier installs every promised feature, and the restaurant manager proudly announces that the project is complete.",
        null
      ],

      [
        "But customers continue waiting too long between placing their orders and receiving their meals.",
        iss(
          "The ordering system works, but customers still experience long waits.",
          "Delivery without benefit"
        )
      ],

      [
        "The manager has confused a technical deliverable with a business benefit that customers can actually experience.",
        null
      ],

      [
        "A deliverable is something the project produces, while a benefit is a valuable improvement resulting from its use.",
        cmp(
          "a",
          "Project deliverable",
          "The restaurant has installed a functioning digital ordering system."
        )
      ],

      [
        "For this restaurant, a meaningful benefit would be reducing the time customers wait for their meals.",
        null
      ],

      [
        "That outcome matters because shorter, reliable waiting times can improve the experience customers came to enjoy.",
        cmp(
          "b",
          "Business benefit",
          "Customers receive their meals more quickly and consistently."
        )
      ],

      [
        "Now imagine the manager claiming that average service time has improved without knowing its previous value.",
        null
      ],

      [
        "Without a baseline, the restaurant cannot establish whether the new system has produced a genuine improvement.",
        st(
          "A baseline is the starting performance measurement used to evaluate whether a process has improved."
        )
      ],

      [
        "Suppose the restaurant previously took forty minutes on average from receiving an order to serving the meal.",
        null
      ],

      [
        "After implementation, the average becomes thirty-two minutes when measured using the same starting and ending points.",
        fm(
          "Observed service-time reduction",
          "(40 − 32) ÷ 40",
          "20%"
        )
      ],

      [
        "The restaurant can now report a twenty-percent reduction because the comparison uses a defined and consistent measure.",
        null
      ],

      [
        "But the manager should also investigate whether the improvement remains reliable during particularly busy evenings.",
        dg(
          "Measuring sustained improvement",
          D.flow([
            "Define|measure",
            "Record|baseline",
            "Track|results",
            "+Investigate|variation"
          ]),
          "Consistent measurement allows managers to evaluate improvement and investigate whether performance remains reliable over time."
        )
      ],

      [
        "This requires a process owner who remains accountable for the complete ordering and meal-delivery experience.",
        null
      ],

      [
        "Without ownership, employees may gradually return to familiar routines that recreate the original delays.",
        iss(
          "The new system remains installed, but nobody is accountable for maintaining the improved service.",
          "Benefits at risk"
        )
      ],

      [
        "Governance means the arrangements through which responsibilities, decisions, and performance continue to be managed.",
        null
      ],

      [
        "The owner might review waiting times regularly and coordinate changes between servers and kitchen employees.",
        st(
          "Benefits ownership and governance keep attention on process performance after the technology project has ended."
        )
      ],

      [
        "The improvement should also support the restaurant's strategy, meaning the outcomes it considers important for long-term success.",
        null
      ],

      [
        "If its promise is relaxed dining, speed must support that experience without sacrificing food quality.",
        q(
          "Would faster service count as success if customers received poorly prepared meals?"
        )
      ],

      [
        "A credible BPM investment therefore connects measurable benefits with the organisation's wider purpose and continuing responsibilities.",
        null
      ],

      [
        "Remember that installing software completes a technical task, while sustaining better customer outcomes demonstrates process improvement.",
        st(
          "Success requires a defined benefit, reliable baseline, accountable owner, and continuing measurement."
        )
      ]

    ]
  },

  {
    title: "The fitness centre that counted registrations instead of results",

    lines: [

      [
        "Imagine a fitness centre introducing a digital coaching platform to help members maintain healthier exercise routines.",
        t(
          "Another angle on benefits measurement",
          "Measuring technology activity is different from measuring the improvement the organisation promised."
        )
      ],

      [
        "The centre celebrates because hundreds of members download the application during its launch week.",
        null
      ],

      [
        "Managers describe those downloads as evidence that their investment has succeeded and their service has improved.",
        iss(
          "The centre counts application downloads without establishing whether members achieve better fitness outcomes.",
          "Activity mistaken for benefit"
        )
      ],

      [
        "But downloading an application does not establish that members exercise regularly or receive effective coaching.",
        null
      ],

      [
        "Downloads measure adoption activity, while sustained participation might provide evidence about the intended service improvement.",
        cmp(
          "a",
          "Technology activity",
          "The number of members who download or open the coaching application."
        )
      ],

      [
        "The centre therefore needs to define what better performance means before deciding which information to collect.",
        null
      ],

      [
        "Suppose its intended benefit is increasing the proportion of members who exercise consistently throughout each month.",
        cmp(
          "b",
          "Intended benefit",
          "A larger proportion of members maintain regular exercise participation over time."
        )
      ],

      [
        "That measure should have a baseline, meaning a reliable starting value recorded before the intervention.",
        null
      ],

      [
        "Imagine that forty percent of members currently complete their planned exercise sessions during an average month.",
        fm(
          "Starting participation rate",
          "Members completing plans",
          "All measured members"
        )
      ],

      [
        "The centre can compare later participation against that baseline while keeping its measurement definition consistent.",
        null
      ],

      [
        "Without consistent definitions, apparent improvement might simply reflect counting different members or changing the observation period.",
        st(
          "A meaningful performance comparison requires a clearly defined baseline and consistent measurement boundaries."
        )
      ],

      [
        "Now consider who should remain responsible for the benefit after the technology supplier finishes installation.",
        null
      ],

      [
        "A coaching manager could own the complete member-support process rather than leaving responsibility with the software vendor.",
        dg(
          "Ownership after implementation",
          D.flow([
            "Platform|launched",
            "Participation|measured",
            "Coaching|adjusted",
            "+Benefits|sustained"
          ]),
          "An accountable process owner uses performance evidence to improve the member experience after the platform has launched."
        )
      ],

      [
        "That manager needs authority to adjust coaching arrangements when participation declines or members encounter difficulties.",
        null
      ],

      [
        "This continuing responsibility is part of governance, which establishes how decisions and process performance remain controlled.",
        st(
          "Governance ensures that process improvement remains someone's responsibility after the technology project closes."
        )
      ],

      [
        "The centre should also examine organisational readiness before introducing more sophisticated automated coaching capabilities.",
        null
      ],

      [
        "Readiness means possessing the people, skills, information, and management arrangements required to use technology effectively.",
        iss(
          "Advanced coaching technology cannot compensate for missing staff capability or unclear member-support responsibilities.",
          "Readiness matters"
        )
      ],

      [
        "If instructors cannot interpret participation information, an impressive analytics dashboard may remain largely unused.",
        null
      ],

      [
        "Training and clear responsibilities would make that information more useful than purchasing additional features immediately.",
        dg(
          "From information to improvement",
          D.flow([
            "Reliable|information",
            "Trained|instructors",
            "Useful|decisions",
            "+Member|improvement"
          ]),
          "Technology supports meaningful benefits when capable employees use reliable information to improve the service."
        )
      ],

      [
        "The important question is whether members receive sustained value, not whether the centre owns sophisticated technology.",
        null
      ],

      [
        "A sound BPM programme therefore defines the desired benefit, measures progress, and maintains responsibility for improvement.",
        st(
          "Judge BPM success by sustained organisational outcomes rather than installation, downloads, or feature usage alone."
        )
      ]

    ]
  }

],

W3O2c: [

  {
    title: "The smart warehouse that became an expensive shortcut",

    lines: [

      [
        "Imagine a small online retailer investing in warehouse automation because customers frequently receive their orders late.",
        t(
          "Another way to recognise BPM failure",
          "Warehouse automation can fail when the organisation preserves a poorly designed fulfilment process."
        )
      ],

      [
        "The retailer purchases scanning equipment and software that promises to accelerate picking, packing, and dispatch.",
        null
      ],

      [
        "During the demonstration, employees process sample orders quickly, and the management team celebrates the apparent improvement.",
        dg(
          "The promised warehouse journey",
          D.flow([
            "Order|received",
            "Item|picked",
            "Parcel|packed",
            "+Order|dispatched"
          ]),
          "The demonstration presents a smooth fulfilment process in which every activity appears properly coordinated."
        )
      ],

      [
        "But after implementation, customers continue receiving late deliveries because important problems remain outside the demonstration.",
        null
      ],

      [
        "Products are stored in confusing locations, and employees repeatedly correct inaccurate stock records before preparing orders.",
        iss(
          "Automation accelerates picking while inaccurate inventory records and confusing storage arrangements remain unresolved.",
          "Automated mess"
        )
      ],

      [
        "The retailer has created an automated mess by making flawed activities faster without redesigning their underlying relationships.",
        null
      ],

      [
        "That failure matters because unnecessary work can become harder to remove once expensive technology depends upon it.",
        st(
          "An automated mess occurs when technology accelerates an inefficient process instead of correcting its underlying design."
        )
      ],

      [
        "Now imagine the warehouse manager testing a redesigned process in one carefully organised storage area.",
        null
      ],

      [
        "The pilot performs well because experienced employees maintain accurate records and resolve exceptions through informal cooperation.",
        dg(
          "The successful pilot",
          D.flow([
            "Small|test area",
            "Experienced|employees",
            "Promising|results",
            "!Wider|uncertainty"
          ]),
          "A successful pilot may depend on conditions that are not available throughout the wider organisation."
        )
      ],

      [
        "But other warehouse areas lack those experienced employees and use different stock-management arrangements.",
        null
      ],

      [
        "The retailer cannot simply assume that success in the pilot guarantees reliable performance across every location.",
        q(
          "What must change before the successful warehouse pilot can operate across the entire business?"
        )
      ],

      [
        "Scaling requires organisational readiness, meaning the resources and capabilities needed to extend the process successfully.",
        null
      ],

      [
        "Without that preparation, the promising pilot may remain isolated while most employees continue using previous arrangements.",
        iss(
          "The pilot works locally, but the organisation cannot extend the redesigned process reliably.",
          "Pilot that never scales"
        )
      ],

      [
        "Now imagine the retailer eventually launches the system everywhere but stops monitoring performance after the project closes.",
        null
      ],

      [
        "Employees gradually recreate familiar workarounds, and the original delays begin returning despite the functioning software.",
        st(
          "Benefits can evaporate when process ownership and continuing performance management disappear after implementation."
        )
      ],

      [
        "These problems are connected because weak process design, limited readiness, and missing governance undermine sustained improvement.",
        null
      ],

      [
        "The retailer should investigate those organisational conditions rather than immediately purchasing another sophisticated automation product.",
        dg(
          "Diagnosing the real weakness",
          D.flow([
            "Visible|problem",
            "Underlying|cause",
            "Process|correction",
            "+Sustained|result"
          ]),
          "A responsible diagnosis connects visible implementation failures to the process and management conditions that created them."
        )
      ],

      [
        "Remember that successful BPM requires understanding the complete process before automating and extending its activities.",
        null
      ],

      [
        "Technology becomes valuable when the organisation can adopt, govern, and improve the process it supports.",
        st(
          "Prevent BPM failure by correcting process weaknesses and building the organisational conditions required for lasting adoption."
        )
      ]

    ]
  },

  {
    title: "The digital clinic appointment system nobody wanted to use",

    lines: [

      [
        "Imagine a neighbourhood medical clinic introducing online appointments to reduce telephone queues and improve patient access.",
        t(
          "Another angle on BPM failure",
          "A technically functioning appointment system can fail when patients and employees cannot use it effectively."
        )
      ],

      [
        "The software is installed successfully, and the supplier confirms that every required function operates correctly.",
        null
      ],

      [
        "Yet receptionists continue taking appointments by telephone, while many patients avoid the unfamiliar online system.",
        iss(
          "The appointment platform works, but patients and receptionists continue relying on previous arrangements.",
          "Technology without adoption"
        )
      ],

      [
        "When purchased software remains largely unused, the resulting problem is often described as shelfware.",
        null
      ],

      [
        "The term matters because buying software creates little value when daily activities never meaningfully incorporate it.",
        st(
          "Shelfware describes purchased technology that remains unused or underused instead of supporting the intended operational process."
        )
      ],

      [
        "Now imagine the clinic manager insisting that receptionists must stop accepting telephone bookings immediately.",
        null
      ],

      [
        "Employees explain that some elderly patients struggle with the website and need assistance arranging appointments.",
        cmp(
          "a",
          "Resistance dismissed",
          "Management assumes employees are unwilling to change and demands immediate use of the new system."
        )
      ],

      [
        "Their concern may reveal a genuine service problem rather than simple resistance to technological change.",
        null
      ],

      [
        "The clinic should investigate how different patients access care before removing established appointment arrangements.",
        cmp(
          "b",
          "Resistance investigated",
          "Management examines practical concerns and redesigns the process around patients' actual needs."
        )
      ],

      [
        "Suppose the manager introduces assisted online booking while retaining appropriate support for patients who need it.",
        null
      ],

      [
        "Receptionists receive practical training, and patients are shown how to request appointments using familiar examples.",
        dg(
          "Supporting meaningful adoption",
          D.flow([
            "Patient|needs",
            "Process|adjusted",
            "Practical|training",
            "+Confident|adoption"
          ]),
          "Meaningful adoption improves when the redesigned appointment process reflects patient needs and employees receive practical support."
        )
      ],

      [
        "The clinic also assigns a process owner responsible for appointment access across the complete patient journey.",
        null
      ],

      [
        "That person monitors waiting times, investigates abandoned requests, and coordinates changes when recurring problems appear.",
        st(
          "Process ownership and monitoring help prevent early improvements from disappearing after the system goes live."
        )
      ],

      [
        "Without that responsibility, initial enthusiasm might fade while employees gradually return to inconsistent booking practices.",
        null
      ],

      [
        "The clinic could then experience evaporating benefits even though the appointment platform remains technically operational.",
        iss(
          "The system remains available, but previous problems return because nobody sustains the redesigned process.",
          "Benefits evaporate"
        )
      ],

      [
        "Notice that shelfware, rejection at go-live, and evaporating benefits describe different symptoms of organisational weakness.",
        null
      ],

      [
        "They may arise from inadequate involvement, unsuitable process design, weak ownership, or insufficient employee capability.",
        dg(
          "Connecting symptoms and causes",
          D.flow([
            "Low|adoption",
            "Investigate|barriers",
            "Improve|conditions",
            "+Sustain|use"
          ]),
          "Managers should investigate the causes of poor adoption before prescribing additional technology or demanding compliance."
        )
      ],

      [
        "A careful diagnosis avoids assuming that employees are always responsible when a new system disappoints.",
        null
      ],

      [
        "The organisation must examine whether the technology and redesigned process genuinely support the people using them.",
        q(
          "Would you replace the appointment software, or investigate why patients and employees cannot use it effectively?"
        )
      ],

      [
        "The strongest response addresses the underlying process and adoption problems rather than treating installation as success.",
        null
      ],

      [
        "Remember that sustainable BPM depends on practical use, continuing ownership, and benefits that remain visible over time.",
        st(
          "A functioning system becomes a successful BPM investment only when people use it to deliver sustained process improvement."
        )
      ]

    ]
  }

],
// REVIEW w3l3-w3l4

W3O3a: [

  {
    title: "The school that bought a timetable before designing its day",

    lines: [

      [
        "Let's imagine a school preparing to replace its timetable system because teachers and students experience repeated scheduling problems.",
        t(
          "Another way to understand vendor-led design",
          "A convincing timetable demonstration cannot decide how a school should organise learning."
        )
      ],

      [
        "The principal invites a software vendor to demonstrate a system that automatically assigns classrooms and teaching periods.",
        null
      ],

      [
        "The demonstration looks impressive because every class receives a room and every teacher receives a complete schedule.",
        dg(
          "The impressive demonstration",
          D.flow([
            "Subjects|entered",
            "Rooms|assigned",
            "Teachers|scheduled",
            "+Timetable|produced"
          ]),
          "The vendor demonstrates how its software produces a timetable using the requirements and assumptions entered into the system."
        )
      ],

      [
        "But nobody has agreed whether the school's existing timetable arrangements actually support effective teaching and learning.",
        null
      ],

      [
        "Some students move repeatedly between distant buildings, while science teachers struggle to obtain suitable laboratory preparation time.",
        iss(
          "The demonstration reproduces scheduling arrangements that already create difficulties for teachers and students.",
          "Current-process fit can mislead"
        )
      ],

      [
        "If the school adopts the demonstration unchanged, the software may preserve those problems inside a sophisticated system.",
        null
      ],

      [
        "This is why the school needs a future-state process before selecting its technology.",
        st(
          "A future-state process describes how the organisation wants work to happen after improvement."
        )
      ],

      [
        "The principal should involve teachers, students, and administrators in deciding what a better school day requires.",
        null
      ],

      [
        "Their experience helps identify unnecessary movement, conflicting room demands, and practical constraints that software must respect.",
        dg(
          "Design before technology selection",
          D.flow([
            "Understand|problems",
            "Design|school day",
            "Define|requirements",
            "Test|software"
          ]),
          "The school should understand scheduling problems and design the desired timetable process before evaluating software."
        )
      ],

      [
        "Only then can the school ask vendors to demonstrate how their systems support those agreed requirements.",
        null
      ],

      [
        "Imagine asking the vendor to accommodate an unexpected laboratory closure without disrupting unrelated classes.",
        q(
          "Can the system support realistic scheduling changes rather than only producing an attractive standard timetable?"
        )
      ],

      [
        "That test reveals more than watching another demonstration in which every classroom is conveniently available.",
        null
      ],

      [
        "The school must also balance different stakeholder concerns rather than allowing one department to dominate selection.",
        cmp(
          "a",
          "Vendor-led selection",
          "The school adopts the process demonstrated by the supplier without independently defining its needs."
        )
      ],

      [
        "Teachers value educational suitability, administrators need manageable scheduling, and finance managers care about sustainable expenditure.",
        null
      ],

      [
        "Those perspectives should inform a shared process design instead of becoming competing reasons to favour particular products.",
        cmp(
          "b",
          "Process-led selection",
          "The school agrees on its desired process and evaluates vendors against realistic operational requirements."
        )
      ],

      [
        "Notice that demonstrations remain useful when they test decisions the organisation has already made about its process.",
        null
      ],

      [
        "They become dangerous when their attractive screens quietly replace the organisation's responsibility for designing better work.",
        st(
          "Use demonstrations to test an agreed future process, not to allow the vendor to determine that process."
        )
      ],

      [
        "The important question is whether the system supports better learning arrangements, not whether its timetable looks impressive.",
        null
      ],

      [
        "Remember that technology selection should follow process understanding because the organisation must define improvement for itself.",
        st(
          "Design the desired outcome before choosing the software that will help deliver it."
        )
      ]

    ]
  },

  {
    title: "The delivery company that mistook a demonstration for a solution",

    lines: [

      [
        "Imagine a local courier company searching for software because customers frequently complain about unpredictable parcel deliveries.",
        t(
          "Another angle on process-led selection",
          "A polished delivery demonstration may conceal the operational exceptions that matter most."
        )
      ],

      [
        "A vendor demonstrates a platform that assigns drivers, calculates routes, and sends customers attractive delivery notifications.",
        null
      ],

      [
        "The manager watches parcels move smoothly across the screen and begins imagining a much more reliable service.",
        dg(
          "The ideal delivery demonstration",
          D.flow([
            "Parcel|received",
            "Driver|assigned",
            "Route|calculated",
            "+Parcel|delivered"
          ]),
          "The demonstration shows a straightforward delivery journey in which every activity proceeds without an operational exception."
        )
      ],

      [
        "But the company's real problems often involve incorrect addresses, unavailable customers, and parcels requiring special handling.",
        null
      ],

      [
        "Those situations are absent from the demonstration, although they explain much of the organisation's disappointing performance.",
        iss(
          "The demonstration succeeds because it excludes the difficult cases that create real delivery delays.",
          "An incomplete test"
        )
      ],

      [
        "The manager therefore needs to understand the existing delivery process before deciding which software capabilities matter.",
        null
      ],

      [
        "Process understanding reveals where delays originate and which decisions employees currently struggle to coordinate.",
        st(
          "Technology requirements should emerge from genuine process problems rather than the features a vendor chooses to demonstrate."
        )
      ],

      [
        "Now imagine the company redesigning how drivers report failed deliveries and arrange another delivery attempt.",
        null
      ],

      [
        "The desired process requires customers to receive accurate information without repeatedly contacting the service centre.",
        dg(
          "Designing the intended service",
          D.flow([
            "Delivery|attempt",
            "Exception|recorded",
            "Customer|informed",
            "+Next action|agreed"
          ]),
          "The future delivery process should coordinate exceptions and communicate clearly when the original delivery cannot be completed."
        )
      ],

      [
        "That future-state process describes how the company wants work to happen after improvement.",
        null
      ],

      [
        "The vendor can now be asked to demonstrate what happens when a customer changes an address during delivery.",
        q(
          "Can the software handle a realistic address change without creating confusion for the driver and customer?"
        )
      ],

      [
        "A realistic test may reveal limitations that an attractive standard demonstration would never expose.",
        null
      ],

      [
        "The manager should also examine whether the platform connects with the company's existing parcel information systems.",
        cmp(
          "a",
          "Appearance-led decision",
          "The manager rewards attractive screens and assumes the demonstrated process will work in practice."
        )
      ],

      [
        "Integration matters because drivers need reliable information rather than another disconnected application requiring repeated manual entry.",
        null
      ],

      [
        "The finance manager must consider affordability, while operations managers assess whether employees can manage exceptional deliveries.",
        cmp(
          "b",
          "Evidence-led decision",
          "The company evaluates realistic process requirements, integration, operational suitability, and sustainable costs."
        )
      ],

      [
        "These concerns become easier to reconcile when everyone evaluates the same agreed customer outcome.",
        null
      ],

      [
        "The organisation should therefore use demonstrations as evidence about suitability rather than allowing them to define improvement.",
        st(
          "A vendor demonstration is a test of process requirements, not a substitute for deciding those requirements."
        )
      ],

      [
        "Remember that impressive software behaviour matters only when it supports the service customers actually need.",
        null
      ],

      [
        "A defensible selection begins with the intended process and examines how well each vendor can support it.",
        st(
          "Let the future process guide technology selection, and test the difficult cases before trusting the demonstration."
        )
      ]

    ]
  }

],

W3O3b: [

  {
    title: "The café ordering system that became expensive to change",

    lines: [

      [
        "Imagine a café chain choosing between ordering systems while preparing to introduce more personalised customer services.",
        t(
          "Another way to understand cost of change",
          "A low purchase price can conceal expensive future process changes."
        )
      ],

      [
        "One supplier offers an inexpensive system that closely matches the café's existing menu and ordering procedures.",
        null
      ],

      [
        "The demonstration looks convincing, and the finance manager appreciates the relatively small initial investment.",
        cmp(
          "a",
          "Attractive purchase price",
          "The café pays less initially for software that reproduces its current ordering arrangements."
        )
      ],

      [
        "But imagine the chain introducing subscription breakfasts that customers can collect from different branches.",
        null
      ],

      [
        "The existing system cannot handle those arrangements without substantial programming and additional supplier assistance.",
        iss(
          "A new business requirement demands expensive modifications to software that initially appeared affordable.",
          "Hidden change cost"
        )
      ],

      [
        "The cost of change means the resources required to modify a system after it begins supporting real operations.",
        null
      ],

      [
        "Those resources may include specialist labour, testing, training, disruption, and additional maintenance obligations.",
        st(
          "Cost of change includes the effort and expense of adapting software when business requirements evolve."
        )
      ],

      [
        "Now imagine another supplier offering supported settings that allow authorised employees to adjust collection arrangements.",
        null
      ],

      [
        "Changing supported settings is called configuration, because the organisation adjusts the product without rewriting its underlying application.",
        dg(
          "Adapting the ordering process",
          D.flow([
            "New|requirement",
            "Supported|settings",
            "Process|tested",
            "+Service|updated"
          ]),
          "Supported configuration may allow the café to introduce a new service with less development effort."
        )
      ],

      [
        "That flexibility may justify a higher purchase price, although the café must verify its practical value.",
        null
      ],

      [
        "A vendor's promise of flexibility is not enough without demonstrating a realistic change to the ordering process.",
        q(
          "How much effort would each system require when the café introduces a new collection arrangement?"
        )
      ],

      [
        "The committee should also examine integration with payment, inventory, and customer information systems.",
        null
      ],

      [
        "A cheap ordering application may become costly if employees repeatedly transfer information between disconnected systems.",
        cmp(
          "b",
          "Long-run suitability",
          "The café considers integration, future changes, maintenance, and the ability to adapt its service."
        )
      ],

      [
        "Total cost of ownership brings these concerns together across acquisition, operation, maintenance, and future modifications.",
        null
      ],

      [
        "It provides a broader financial perspective than the licence price displayed in a vendor quotation.",
        dg(
          "Looking beyond the licence",
          D.flow([
            "Purchase",
            "Integration",
            "Operation",
            "Future|changes"
          ]),
          "Total cost of ownership considers the continuing costs of using and adapting a system rather than purchase price alone."
        )
      ],

      [
        "The café also needs employees who understand how to manage supported changes safely after implementation.",
        null
      ],

      [
        "Without that internal capability, even flexible software may create unnecessary dependence on expensive external specialists.",
        st(
          "Long-run flexibility depends on both the software's capabilities and the organisation's ability to use them."
        )
      ],

      [
        "The best choice therefore depends on realistic future requirements rather than assuming the cheapest or richest product wins.",
        null
      ],

      [
        "Remember that a BPM suite should support continuing process improvement, including changes nobody needs to implement today.",
        st(
          "Evaluate what the system will cost to change, not merely what it costs to purchase."
        )
      ]

    ]
  },

  {
    title: "The apartment access system that trapped its building manager",

    lines: [

      [
        "Imagine an apartment building replacing traditional keys with electronic access cards for residents and maintenance employees.",
        t(
          "Another angle on long-run flexibility",
          "A system that fits today's needs perfectly may become difficult to adapt tomorrow."
        )
      ],

      [
        "The building manager selects a supplier whose demonstration reproduces every existing access arrangement with impressive accuracy.",
        null
      ],

      [
        "Residents can enter their apartments, maintenance staff receive permissions, and visitors use temporary access cards.",
        dg(
          "The original access arrangement",
          D.flow([
            "Resident|registered",
            "Permission|assigned",
            "Card|activated",
            "+Access|granted"
          ]),
          "The access system supports the building's current permission arrangements through a straightforward activation process."
        )
      ],

      [
        "The manager is pleased because the supplier has promised to preserve familiar procedures without disrupting residents.",
        null
      ],

      [
        "But the building later introduces shared workspaces and flexible visitor permissions for residents who work remotely.",
        iss(
          "New access arrangements require extensive modifications because the system was built around fixed existing procedures.",
          "Future flexibility lost"
        )
      ],

      [
        "The supplier explains that these changes require custom code, meaning software written specifically for the building.",
        null
      ],

      [
        "Custom code can support unusual requirements, but it may increase maintenance effort and complicate future upgrades.",
        st(
          "Customisation can improve immediate fit while increasing the cost and difficulty of later system changes."
        )
      ],

      [
        "An upgrade introduces a newer software version, which may require customised components to be checked or modified.",
        null
      ],

      [
        "The manager now faces additional supplier charges whenever the building changes its access policies.",
        cmp(
          "a",
          "Immediate fit",
          "The system reproduces today's access arrangements but depends heavily on specialised modifications."
        )
      ],

      [
        "Imagine an alternative product that supports permission changes through settings authorised employees can manage safely.",
        null
      ],

      [
        "Those settings provide configuration, meaning supported adjustments that do not require rewriting the application's underlying code.",
        cmp(
          "b",
          "Adaptable fit",
          "The system supports changing access policies through manageable configuration and appropriate controls."
        )
      ],

      [
        "The manager should test that flexibility using a realistic scenario involving temporary access to shared facilities.",
        null
      ],

      [
        "A demonstration should reveal the work, testing, costs, and risks involved in making that change.",
        dg(
          "Testing a future requirement",
          D.flow([
            "New|access rule",
            "System|adjusted",
            "Security|tested",
            "+Permission|activated"
          ]),
          "A realistic change test reveals whether the access system can accommodate new requirements safely and affordably."
        )
      ],

      [
        "Security remains essential because convenient changes should never compromise residents' protection or appropriate permission controls.",
        null
      ],

      [
        "This shows why flexibility must be evaluated alongside operational suitability rather than treated as an isolated feature.",
        st(
          "Useful flexibility allows controlled process changes without creating unacceptable operational or security risks."
        )
      ],

      [
        "The manager must also consider connections with resident records and the building's existing management applications.",
        null
      ],

      [
        "Poor integration could force employees to maintain duplicate records whenever someone moves into another apartment.",
        q(
          "Would a cheaper system remain attractive if every resident change required repeated manual work?"
        )
      ],

      [
        "The building's real investment therefore includes acquisition, integration, operation, maintenance, and future modification costs.",
        null
      ],

      [
        "These combined expenses form total cost of ownership, which supports a more realistic financial comparison.",
        st(
          "Total cost of ownership provides a broader view than the initial price of acquiring the system."
        )
      ],

      [
        "Remember that technology selection should preserve the organisation's ability to change its processes as requirements evolve.",
        null
      ],

      [
        "A defensible choice balances current suitability with the practical cost of adapting the system later.",
        st(
          "Choose technology that supports today's needs without making tomorrow's improvements unnecessarily expensive."
        )
      ]

    ]
  }

],

W3O3c: [

  {
    title: "The museum that refused to sign after the demonstration",

    lines: [

      [
        "Imagine a museum preparing to purchase a visitor management system after several impressive supplier demonstrations.",
        t(
          "Another way to prepare a selection decision",
          "A museum should establish what visitors need before committing to a technology contract."
        )
      ],

      [
        "The director wants faster entry, but visitors frequently experience confusion about timed tickets and special exhibition access.",
        null
      ],

      [
        "The preferred vendor demonstrates attractive ticket screens and promises that installation can begin immediately.",
        iss(
          "The museum is ready to sign before agreeing how its future visitor experience should work.",
          "A premature commitment"
        )
      ],

      [
        "But the museum has not agreed how employees should handle late arrivals or visitors requiring accessibility assistance.",
        null
      ],

      [
        "Those questions belong to process design because they determine how the museum intends to serve real people.",
        st(
          "A technology decision should follow agreement on the future process and the customer outcomes it must deliver."
        )
      ],

      [
        "Now imagine the director inviting ticketing employees, exhibition staff, and visitor services managers to redesign entry.",
        null
      ],

      [
        "Their practical knowledge reveals where queues form and which exceptions require human decisions.",
        dg(
          "Designing the visitor journey",
          D.flow([
            "Visitor|arrives",
            "Ticket|validated",
            "Access|confirmed",
            "+Exhibition|entered"
          ]),
          "The museum should design a reliable visitor journey before testing whether technology can support its activities and exceptions."
        )
      ],

      [
        "The agreed process becomes the basis for realistic requirements rather than relying on features selected by the vendor.",
        null
      ],

      [
        "The museum can now request a demonstration involving a late visitor whose exhibition ticket needs adjustment.",
        q(
          "Can the system handle a realistic visitor exception without creating unnecessary waiting or confusion?"
        )
      ],

      [
        "The answer provides stronger evidence than another demonstration where every visitor arrives at the expected time.",
        null
      ],

      [
        "The director should also examine integration with ticket sales, membership records, and exhibition capacity information.",
        st(
          "Integration requirements must reflect the information the redesigned process needs from existing systems."
        )
      ],

      [
        "Without those connections, employees may repeatedly enter visitor details or struggle to verify valid memberships.",
        null
      ],

      [
        "The museum must then investigate how expensive future changes would become after the system enters operational use.",
        cmp(
          "a",
          "Today's suitability",
          "The system supports the agreed visitor process and connects with the required information sources."
        )
      ],

      [
        "A new exhibition might introduce different entry rules, so the system should accommodate controlled changes affordably.",
        null
      ],

      [
        "The director can ask suppliers to demonstrate that modification and explain the resources required.",
        cmp(
          "b",
          "Future adaptability",
          "The system can support changing exhibition arrangements without excessive cost or operational disruption."
        )
      ],

      [
        "The museum also needs a process owner who remains accountable for visitor entry after installation.",
        null
      ],

      [
        "That owner should define a waiting-time baseline and monitor whether the new arrangements actually improve performance.",
        dg(
          "Responsibility after launch",
          D.flow([
            "Process|owner",
            "Baseline|defined",
            "Results|measured",
            "+Service|improved"
          ]),
          "An accountable process owner measures visitor outcomes and sustains improvement after the system begins operating."
        )
      ],

      [
        "Employee training and management support must be ready before the new process becomes part of daily operations.",
        null
      ],

      [
        "Otherwise, the museum may purchase suitable technology without preparing the organisation to use it effectively.",
        st(
          "Organisational readiness matters because successful implementation requires capable people and clear responsibilities."
        )
      ],

      [
        "The director can now evaluate the investment using evidence about process fit, integration, adaptability, and adoption.",
        null
      ],

      [
        "A responsible signature follows those investigations rather than merely rewarding the most convincing supplier presentation.",
        st(
          "Commit only when the proposed technology can support an agreed process and the organisation is ready to use it."
        )
      ]

    ]
  },

  {
    title: "The sports centre that tested tomorrow before buying today",

    lines: [

      [
        "Imagine a sports centre selecting software to manage swimming lessons, coaching sessions, and shared facility reservations.",
        t(
          "Another angle on responsible selection",
          "A sound technology decision tests future changes as well as today's operational requirements."
        )
      ],

      [
        "The centre currently relies on separate spreadsheets, creating double bookings and confusion about instructor availability.",
        null
      ],

      [
        "A vendor offers an attractive booking platform that appears to solve every problem during its demonstration.",
        dg(
          "The attractive booking demonstration",
          D.flow([
            "Customer|requests",
            "Session|selected",
            "Instructor|assigned",
            "+Booking|confirmed"
          ]),
          "The vendor demonstrates a smooth reservation process using the assumptions built into its standard booking arrangements."
        )
      ],

      [
        "But the centre's manager recognises that the demonstration does not establish how the organisation should manage bookings.",
        null
      ],

      [
        "She asks instructors and reception employees to explain why double bookings occur and how cancellations are handled.",
        st(
          "Understanding actual work helps managers define the process requirements that technology must support."
        )
      ],

      [
        "Their observations reveal that instructor changes often reach reception too late for staff to update reservations.",
        null
      ],

      [
        "The manager redesigns the communication arrangements before deciding which software features would genuinely help.",
        dg(
          "From problem to requirement",
          D.flow([
            "Scheduling|problem",
            "Process|redesigned",
            "Requirement|defined",
            "Vendor|tested"
          ]),
          "The sports centre should derive technology requirements from the redesigned scheduling process rather than from demonstration features."
        )
      ],

      [
        "Now imagine the centre introducing family memberships that allow customers to share selected coaching sessions.",
        null
      ],

      [
        "That future possibility matters because a system should remain adaptable when the organisation changes its services.",
        q(
          "How easily could the proposed software accommodate a new membership arrangement after implementation?"
        )
      ],

      [
        "The manager asks vendors to demonstrate the change and explain any programming, testing, or additional supplier charges.",
        null
      ],

      [
        "This provides evidence about the cost of change rather than relying on general promises of flexibility.",
        cmp(
          "a",
          "Purchase-focused evaluation",
          "The centre compares initial prices and features without testing future process changes."
        )
      ],

      [
        "The manager also investigates whether the platform connects with payment records and instructor availability information.",
        null
      ],

      [
        "Those connections matter because disconnected information could recreate the duplicate work the investment was meant to remove.",
        cmp(
          "b",
          "Process-focused evaluation",
          "The centre tests integration, realistic exceptions, future changes, and operational suitability."
        )
      ],

      [
        "Before committing, the centre defines a baseline for double bookings and identifies someone accountable for reducing them.",
        null
      ],

      [
        "That process owner must remain responsible for results after the supplier completes the technical installation.",
        st(
          "Benefits ownership connects the technology investment to measurable operational improvement after go-live."
        )
      ],

      [
        "The manager also checks whether employees have enough training and support to operate the redesigned booking process.",
        null
      ],

      [
        "A sophisticated system will disappoint if instructors cannot update availability or receptionists cannot resolve exceptional reservations.",
        iss(
          "The technology is suitable, but employees are not prepared to operate the redesigned process.",
          "Readiness gap"
        )
      ],

      [
        "The centre should therefore examine process design, integration, flexibility, ownership, and adoption before signing.",
        null
      ],

      [
        "These considerations form a connected decision because weakness in one area can undermine the entire investment.",
        dg(
          "A defensible investment decision",
          D.flow([
            "Agreed|process",
            "Realistic|testing",
            "Clear|ownership",
            "+Ready|organisation"
          ]),
          "A responsible technology commitment depends on an agreed process, realistic testing, accountable ownership, and organisational readiness."
        )
      ],

      [
        "The manager does not need certainty about every future requirement, but she needs evidence about important risks.",
        null
      ],

      [
        "Remember that the best decision supports meaningful improvement today while preserving the ability to improve tomorrow.",
        st(
          "Select technology through evidence about sustained process value, not demonstration excitement alone."
        )
      ]

    ]
  }

],

W3O2d: [

  {
    title: "The public service portal that citizens continued avoiding",

    lines: [

      [
        "Imagine a municipal office purchasing an expensive digital portal to simplify applications for residential parking permits.",
        t(
          "Another way to diagnose BPM disappointment",
          "An expensive public service portal may fail when its design ignores how citizens and employees actually work."
        )
      ],

      [
        "The supplier delivers the portal, and analysts document the permit procedure using the municipality's existing policy manual.",
        null
      ],

      [
        "But the employees who process unusual applications are not consulted when the digital workflow is designed.",
        iss(
          "The digital process follows written procedures without incorporating employees' knowledge of practical exceptions.",
          "Missing operational experience"
        )
      ],

      [
        "The resulting application works for straightforward requests but creates difficulties when residents have unusual documentation.",
        null
      ],

      [
        "Employees continue handling those cases through telephone calls and informal messages outside the portal.",
        dg(
          "The incomplete permit process",
          D.flow([
            "Citizen|applies",
            "Standard|check",
            "!Exception|unresolved",
            "Manual|workaround"
          ]),
          "The digital process handles standard applications but leaves important exceptions outside the intended workflow."
        )
      ],

      [
        "The municipality owns sophisticated technology, yet its operational value remains limited because important work happens elsewhere.",
        null
      ],

      [
        "This resembles shelfware, which describes purchased software that remains unused or underused in its intended activities.",
        st(
          "Technology creates little operational value when the people performing the work cannot use it effectively."
        )
      ],

      [
        "Now imagine the portal's dashboard displaying application counts without connecting to the system recording completed permits.",
        null
      ],

      [
        "Managers can see submissions but cannot reliably observe the complete time citizens spend waiting for approval.",
        iss(
          "The dashboard displays activity without connecting to the information needed to measure completed service outcomes.",
          "Monitoring gap"
        )
      ],

      [
        "That gap matters because processing activity is not the same as delivering a completed service to a citizen.",
        null
      ],

      [
        "The municipality should define a baseline for application completion time using consistent starting and ending points.",
        dg(
          "Measuring the citizen's outcome",
          D.flow([
            "Application|submitted",
            "Information|verified",
            "Permit|approved",
            "+Citizen|notified"
          ]),
          "The service measure should cover the complete journey from application submission to communicating the final decision."
        )
      ],

      [
        "A baseline allows later results to be compared against performance before the new process was introduced.",
        null
      ],

      [
        "But even disappointing results do not automatically establish which implementation weakness caused the performance gap.",
        cmp(
          "a",
          "Observed evidence",
          "Employees use workarounds, important exceptions remain unresolved, and the dashboard lacks complete outcome information."
        )
      ],

      [
        "Managers must investigate whether process design, employee involvement, integration, or governance explains the disappointing outcome.",
        null
      ],

      [
        "Governance means the arrangements that keep responsibilities, decisions, and process performance under continuing management.",
        cmp(
          "b",
          "Possible causes",
          "Weak process design, missing integration, inadequate involvement, or unclear ownership require further investigation."
        )
      ],

      [
        "The municipality also needs a process owner who remains accountable for the citizen's complete permit experience.",
        null
      ],

      [
        "That owner can coordinate employees, examine exceptions, and ensure performance remains visible after technical implementation.",
        st(
          "Sustained BPM improvement requires accountable ownership and continuing attention to the complete customer outcome."
        )
      ],

      [
        "The important lesson is not that digital portals are unsuitable, but that technology must support real operational needs.",
        null
      ],

      [
        "A responsible diagnosis separates established facts from assumptions and connects recommendations to evidence about the process.",
        st(
          "Evaluate BPM disappointment through evidence about process design, adoption, integration, governance, and measured benefits."
        )
      ]

    ]
  },

  {
    title: "The volunteer organisation that learned to question its technology investment",

    lines: [

      [
        "Imagine a volunteer organisation purchasing a coordination platform to improve how it distributes food parcels to vulnerable households.",
        t(
          "Another angle on evaluating BPM investments",
          "A coordination platform creates value only when it improves the complete service delivered to households."
        )
      ],

      [
        "The organisation expects shorter delivery times and better information about which households have received their parcels.",
        null
      ],

      [
        "Its analysts configure the platform using old procedures without involving the volunteers who organise daily deliveries.",
        iss(
          "The new system reflects historical instructions rather than the practical knowledge of volunteers performing the work.",
          "Design without users"
        )
      ],

      [
        "Those volunteers understand difficult addresses, changing household needs, and situations requiring sensitive human judgement.",
        null
      ],

      [
        "Without their involvement, the system may overlook important exceptions even when its standard workflow operates correctly.",
        st(
          "Process design becomes more reliable when the people performing the work contribute their practical experience."
        )
      ],

      [
        "Now imagine the organisation purchasing automated allocation rules but continuing to assign deliveries through informal telephone calls.",
        null
      ],

      [
        "The rules capability exists, yet employees never incorporate it into the actual coordination process.",
        dg(
          "Technology outside daily work",
          D.flow([
            "Delivery|request",
            "!Unused|allocation",
            "Telephone|coordination",
            "Parcel|delivered"
          ]),
          "The platform's allocation capability creates limited value when volunteers continue coordinating deliveries outside the system."
        )
      ],

      [
        "A capability that remains unused cannot automatically produce the improvement used to justify its purchase.",
        null
      ],

      [
        "The organisation also discovers that its dashboard cannot access reliable delivery completion information.",
        iss(
          "Managers see planned deliveries but cannot reliably confirm when households receive their parcels.",
          "Disconnected monitoring"
        )
      ],

      [
        "Without that connection, managers struggle to distinguish completed service from activities that remain unfinished.",
        null
      ],

      [
        "The organisation needs a baseline describing delivery performance before the redesigned process begins.",
        st(
          "A reliable baseline makes it possible to compare intended benefits with observed process outcomes."
        )
      ],

      [
        "Suppose average delivery time falls slightly after implementation but remains far above the original improvement target.",
        null
      ],

      [
        "That performance gap deserves investigation, although the figures alone cannot establish which implementation weakness caused it.",
        cmp(
          "a",
          "What is established",
          "The organisation purchased technology, important capabilities remain unused, and the expected improvement was not achieved."
        )
      ],

      [
        "Managers should investigate whether volunteer involvement, integration, ownership, or training contributed to the disappointing results.",
        null
      ],

      [
        "They should not claim that any single weakness explains the entire outcome without supporting evidence.",
        cmp(
          "b",
          "What requires investigation",
          "The relative contribution of process design, adoption, integration, capability, and continuing governance."
        )
      ],

      [
        "Now imagine the organisation preparing to select a replacement platform or substantially redesign its existing arrangements.",
        null
      ],

      [
        "A defensible recommendation should identify an important selection criterion and explain how it addresses the observed risks.",
        q(
          "Which selection criterion would most effectively protect the organisation from repeating its disappointing investment?"
        )
      ],

      [
        "Someone might emphasise volunteer involvement, while another person argues that integration should receive greater attention.",
        null
      ],

      [
        "The strongest argument explains its reasoning through evidence rather than assuming one criterion always dominates.",
        dg(
          "Building a defensible recommendation",
          D.flow([
            "Case|evidence",
            "Underlying|risk",
            "Selection|criterion",
            "+Reasoned|argument"
          ]),
          "A defensible recommendation connects observed evidence to an important risk and explains why the proposed criterion matters."
        )
      ],

      [
        "This approach also helps us engage constructively with people who interpret the same evidence differently.",
        null
      ],

      [
        "Instead of merely agreeing, we can examine assumptions and ask what additional evidence would strengthen their conclusions.",
        st(
          "Good BPM reasoning distinguishes facts from possible causes and supports recommendations with explicit evidence."
        )
      ],

      [
        "Remember that technology investments ultimately matter because they affect the people receiving and delivering organisational services.",
        null
      ],

      [
        "The most useful recommendation protects those outcomes while preserving the organisation's ability to improve its processes.",
        st(
          "Choose and manage BPM technology around meaningful, measurable, and sustainable improvements for the people it serves."
        )
      ]

    ]
  }

],


    },
  };
})();