// OPER621 Business Process Management · Week 6 · Process Architecture.
// Framework Phase 2: The map that tells you where you are.
//
// SOURCES
// OPER621 Week 6 Session 1 slides and Week 6 Delivery Plan.
// Jeston, Business Process Management: Practical Guidelines to
// Successful Implementation, 4th edition, Chapter 14.
// Running case: Qasr Hospitality Group, fourteen properties.
//
// COURSE LEARNING OUTCOME
// S1: Design a framework for BPM and explain and assess related
// phases in the context of a regional company.
//
// WEEKLY LEARNING OUTCOMES
// Explain what a process architecture is and the purpose it serves.
// Design a process architecture relating processes to strategy
// and to one another.
// Evaluate the consequences of beginning process work without
// an architecture.
//
// SESSION LEARNING OUTCOMES
// Distinguish a process architecture from a process model.
// Construct a process architecture for a described organisation.
// Identify the level of granularity at which an architecture is useful.
// Build a first-level architecture for an unfamiliar organisation.
// Defend the chosen level of decomposition.
//
// INTERNAL OUTCOME MAPPING
// O1: Explain process architecture and distinguish it from modelling.
// O2: Design an architecture with appropriate levels and ownership.
// O3: Evaluate architectural decisions and apply them to cases.
// All three internal outcomes map to official CLO S1.
//
// SECTION MAPPING
// l1: Why a list of processes is not a map
//   W6O1a / O1: Phase 2 — The map that tells you where you are.
//   W6O1b / O1: Architecture versus documentation and process models.
//   W6O1c / O1: Core, supporting, and management processes.
//
// l2: Building an architecture that works
//   W6O2a / O2: Three levels — knowing how far to zoom in.
//   W6O2b / O2: Process ownership — a title or real authority?
//   W6O2c / O2: Structure first, detail second.
//
// l3: Fourteen hotels, eleven different answers
//   W6O3a / O3: Which one is the process?
//   W6O3b / O3: One standard or fourteen variants?
//
// l4: Making the architecture useful
//   W6O3c / O3: An architecture that survives change.
//   W6O3d / O3: Build the first-level map and forum handover.
//
// NARRATION CONVENTIONS
// Each spoken sentence is paired with a visual moment or null.
// Null preserves the preceding visual.
// Meaningful visual changes occur every one to three sentences.
// Narration is conversational, connected, and customer-centred.
// Remedial narration uses the same [sentence, moment] structure.
// Each section contains two alternative remedial lessons.
// The canonical adaptive-week.js will register these reviews
// under ADAPTIVE.review using the matching section identifiers.
//
// ACCURACY
// The Week 6 slides and delivery plan are authoritative.
// Exhibit 6 figures and classifications must never be altered.
// Hypothetical illustrations are distinguished from case evidence.
// No unsupported operational facts are attributed to Qasr.
//
// FILE STRUCTURE
// This base file contains lesson l1 only.
// Later lesson objects replace the marker below.
// The marker remains inside COURSE.lessons until completion.

(() => {
  "use strict";

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

  window.COURSE = {
    id: "oper621-w6",
    code: "OPER621",
    title: "Process Architecture",
    subtitle: "Business Process Management · Week 6",
    author: "Prof. Bassem Jarboui",

    teacher: {
      name: "Prof. Bassem Jarboui",
      email: "",
      sendReport: false
    },

    lessons: [

      {
        id: "l1",
        title: "Why a list of processes is not a map",

        sections: [

          // =====================================================
          // W6O1a — PHASE 2: THE MAP THAT TELLS YOU WHERE YOU ARE
          // =====================================================

          {
            title: "Phase 2 — The map that tells you where you are",
            sec: "W6O1a",

            lines: [

              ["Welcome back to Qasr Hospitality, where our familiar hotel group is facing a rather different management problem.",
                t(
                  "OPER621 · Week 6",
                  "Process Architecture: The map that tells you where you are"
                )],

              ["You may remember our tired traveller arriving at Qasr Marina, hoping to reach her room without another delay.",
                null],

              ["Her experience showed us why managing separate departments cannot guarantee that a complete customer journey works properly.",
                st(
                  "A customer's complete journey depends on several connected processes, not simply on individual departments."
                )],

              ["Now imagine Qasr's leadership deciding to improve guest experiences across all fourteen properties, rather than fixing isolated complaints.",
                null],

              ["The ambition sounds sensible, but a difficult question appears before the improvement programme can really begin.",
                q(
                  "How can Qasr improve its processes without understanding how those processes fit together?"
                )],

              ["The managers know their departments, their hotels, and many of the procedures employees follow every day.",
                null],

              ["What they cannot yet see clearly is how the organisation's complete processes connect to one another.",
                iss(
                  "Qasr knows many individual activities but lacks a reliable view of its connected processes.",
                  "The organisational map is missing"
                )],

              ["Think about arriving in an unfamiliar city with a detailed description of every building but no street map.",
                null],

              ["You might know exactly what each building contains, yet still struggle to travel between the places you need.",
                dg(
                  "Buildings without a map",
                  D.flow([
                    "Hotel",
                    "Station",
                    "Hospital",
                    "Airport"
                  ]),
                  "Knowing individual locations does not explain the routes and relationships connecting them."
                )],

              ["An organisation faces a similar difficulty when it documents activities without understanding the relationships between its processes.",
                null],

              ["That missing organisational map is what we begin creating during the Process Architecture phase of the BPM framework.",
                t(
                  "Process Architecture",
                  "A structured view of organisational processes, their relationships, their ownership, and their agreed levels."
                )],

              ["Process architecture means the organised structure showing which processes exist, how they relate, and who is responsible.",
                null],

              ["It gives managers a shared view of the organisation's work before they invest heavily in redesigning individual activities.",
                st(
                  "Process architecture provides the structure needed to make coherent process decisions."
                )],

              ["This is Phase Two of the BPM implementation framework, following the Organisation Strategy phase we examined last week.",
                dg(
                  "Where Week 6 fits",
                  D.route([0, 1]),
                  "Organisation Strategy establishes the objectives, and Process Architecture organises the processes needed to support them."
                )],

              ["During Organisation Strategy, Qasr considers what it wants to achieve and why those ambitions matter to customers.",
                null],

              ["Process Architecture then asks which connected processes must deliver those ambitions, rather than immediately redesigning reception procedures.",
                null],

              ["That sequence matters because a beautiful process model can still improve work that contributes little to strategy.",
                iss(
                  "A well-designed local improvement may contribute little to the organisation's strategic objectives.",
                  "Improvement without direction"
                )],

              ["Imagine Qasr investing in a faster internal reporting procedure while its guest arrival experience remains unreliable.",
                null],

              ["The reporting improvement might be genuine, but it could leave the organisation's most important customer problem untouched.",
                q(
                  "Does improving an activity automatically mean improving what matters most to the organisation?"
                )],

              ["Architecture helps managers make that distinction by connecting strategic priorities with the processes responsible for delivering them.",
                null],

              ["It also gives later framework phases a dependable starting point, including the Launch Pad phase coming next week.",
                dg(
                  "Strategy gives architecture direction",
                  D.flow([
                    "Organisation strategy",
                    "Process architecture",
                    "Launch Pad",
                    "Understand",
                    "Innovate"
                  ]),
                  "Architecture translates strategic direction into a process landscape that later BPM phases can use."
                )],

              ["Without that landscape, different improvement teams might unknowingly redesign overlapping processes while pursuing conflicting departmental objectives.",
                null],

              ["Qasr could then spend money on separate solutions that make the overall guest experience even harder to coordinate.",
                iss(
                  "Separate improvement projects can create conflicting changes when nobody understands the complete process landscape.",
                  "Disconnected investments"
                )],

              ["A useful architecture prevents this by making process boundaries, relationships, and responsibilities visible before detailed modelling begins.",
                null],

              ["It does not require managers to document every employee action before they can understand the organisation.",
                st(
                  "Architecture establishes the overall structure before detailed process modelling begins."
                )],

              ["Instead, it provides enough structure to decide where detailed investigation will genuinely help management make better choices.",
                null],

              ["Notice that architecture is not simply another diagram to place in a presentation or store in a folder.",
                null],

              ["Its value comes from supporting decisions about priorities, ownership, investment, standardisation, and the consequences of change.",
                it(
                  1, 3, "target",
                  "Connect processes to strategy",
                  "The architecture shows which processes contribute to the organisation's strategic objectives."
                )],

              ["For Qasr, that means seeing guest arrival alongside the other processes required to deliver a successful hotel stay.",
                null],

              ["It also means recognising that changes to one process may affect several others that depend on its results.",
                it(
                  2, 3, "link",
                  "Understand relationships",
                  "Managers can identify how changes in one process may affect other processes."
                )],

              ["And it means identifying who should answer when a complete process performs poorly across several departmental boundaries.",
                it(
                  3, 3, "users",
                  "Establish accountability",
                  "Each process needs an accountable owner whose responsibility extends across functional boundaries."
                )],

              ["These decisions turn architecture into a management tool rather than an attractive collection of process pictures.",
                null],

              ["As we continue, keep one question in mind whenever someone proudly shows you a folder of process diagrams.",
                q(
                  "Can these diagrams help Qasr understand the organisation and make better decisions?"
                )],

              ["If the answer is uncertain, the organisation may possess documentation without possessing a useful process architecture.",
                null],

              ["Let's examine that distinction carefully, because it explains why so many apparently impressive process repositories disappoint their managers.",
                null]

            ],

            review: [

              // -----------------------------------------------
              // REMEDIAL W6O1a — ALTERNATIVE 1
              // New angle: an airport terminal
              // -----------------------------------------------

              {
                title: "A terminal full of signs but no route",
                lines: [

                  ["Let's approach process architecture through an airport, because airports make the importance of connected work unusually easy to see.",
                    t(
                      "A different way to understand architecture",
                      "An airport needs more than descriptions of its individual services."
                    )],

                  ["Imagine arriving at a large international terminal where every service counter has a detailed operating manual.",
                    null],

                  ["Security knows its procedures, baggage handling knows its responsibilities, and the boarding team follows its own instructions.",
                    dg(
                      "Specialised airport services",
                      D.flow([
                        "Check-in",
                        "Security",
                        "Baggage",
                        "Boarding"
                      ]),
                      "Each airport service can be documented individually without explaining how the services work together."
                    )],

                  ["Those manuals might be excellent, but they do not necessarily explain how a passenger moves through the terminal.",
                    null],

                  ["Suppose security changes its screening arrangements without understanding how the change affects boarding and passenger queues.",
                    null],

                  ["The security team might improve its own performance while creating serious congestion elsewhere in the airport.",
                    iss(
                      "A local operational change can create delays in connected services.",
                      "The whole journey suffers"
                    )],

                  ["The difficulty is not necessarily poor documentation, because each department may have described its own work accurately.",
                    null],

                  ["The missing element is a shared understanding of how the complete passenger journey fits together.",
                    st(
                      "Accurate descriptions of separate activities do not automatically explain the complete process."
                    )],

                  ["Now imagine the airport creating a structured map of its major passenger and baggage processes.",
                    null],

                  ["That map shows how work connects, where responsibilities meet, and which processes depend on information from others.",
                    dg(
                      "A connected passenger journey",
                      D.flow([
                        "Passenger arrives",
                        "Check-in completed",
                        "Security cleared",
                        "Boarding completed"
                      ]),
                      "A process architecture helps managers understand the relationships between major airport processes."
                    )],

                  ["Managers can now examine the consequences of a proposed change before introducing it into one isolated department.",
                    null],

                  ["They can also identify who should coordinate decisions affecting the passenger's complete journey across several functions.",
                    null],

                  ["This is the practical difference between having documentation and having an architecture that supports management decisions.",
                    st(
                      "Architecture makes relationships and accountability visible so that managers can coordinate change."
                    )],

                  ["Let's bring that understanding back to Qasr, where the same challenge appears across hotel properties and departments.",
                    null],

                  ["Qasr may possess detailed instructions for reservations, reception, revenue, and housekeeping without understanding their complete relationships.",
                    null],

                  ["Improving one instruction could then create unexpected difficulties elsewhere because nobody examined the wider process landscape.",
                    null],

                  ["Process Architecture addresses that problem before the organisation commits resources to redesigning individual procedures.",
                    q(
                      "What must managers understand before changing one part of a connected customer journey?"
                    )],

                  ["Remember that Organisation Strategy establishes the desired direction, while Process Architecture identifies the connected work supporting it.",
                    null],

                  ["That is why architecture belongs near the beginning of the BPM framework rather than after detailed process redesign.",
                    null],

                  ["The important lesson is that a useful map explains relationships, not merely the existence of individual activities.",
                    null]

                ]
              },

              // -----------------------------------------------
              // REMEDIAL W6O1a — ALTERNATIVE 2
              // New angle: a university student journey
              // -----------------------------------------------

              {
                title: "A university with excellent departments",
                lines: [

                  ["Let's consider a university, because you already understand how several services contribute to one student's educational experience.",
                    t(
                      "Process architecture in a university",
                      "The student experiences connected services rather than isolated administrative departments."
                    )],

                  ["Imagine a new postgraduate student receiving an admission offer and preparing to begin an online programme.",
                    null],

                  ["Admissions confirms eligibility, finance manages payment, and academic services arrange access to the learning environment.",
                    dg(
                      "The student's connected journey",
                      D.flow([
                        "Admission",
                        "Payment",
                        "Registration",
                        "Learning access"
                      ]),
                      "Several university processes must connect before a student can begin learning successfully."
                    )],

                  ["Each department may follow an excellent procedure and still leave the student unable to access the course.",
                    null],

                  ["Perhaps finance records the payment correctly, but the registration system does not receive the updated information.",
                    iss(
                      "The payment is recorded, but the student's registration remains incomplete.",
                      "A broken connection"
                    )],

                  ["The problem appears between services rather than inside the individual procedure that each department follows.",
                    null],

                  ["A process architecture helps university managers see those relationships before they decide which systems or procedures to improve.",
                    st(
                      "Architecture connects the processes that contribute to the student's complete experience."
                    )],

                  ["Notice that this is different from writing a detailed instruction explaining how an administrator updates a registration record.",
                    null],

                  ["That instruction describes particular work, while the architecture shows where the work belongs within the wider organisation.",
                    null],

                  ["Both are useful, but they answer different questions and support decisions at different levels.",
                    null],

                  ["A university leader needs the wider view when deciding how admissions, finance, and registration should coordinate.",
                    dg(
                      "A broader management view",
                      D.flow([
                        "Student recruitment",
                        "Student admission",
                        "Student enrolment",
                        "Learning delivery"
                      ]),
                      "The wider process structure helps leaders coordinate decisions affecting the complete student journey."
                    )],

                  ["An administrator needs the detailed instruction when performing a particular task accurately and consistently.",
                    null],

                  ["Confusing those purposes can lead organisations to collect thousands of instructions without creating a useful management map.",
                    null],

                  ["Now imagine the university introducing a new payment platform without examining the processes that depend on payment confirmation.",
                    null],

                  ["A technical improvement could accidentally delay enrolment because its effects on connected services were overlooked.",
                    iss(
                      "Changing one system without understanding process relationships can disrupt another service.",
                      "An unexpected consequence"
                    )],

                  ["Architecture makes those connections visible, allowing managers to consider consequences before approving major changes.",
                    null],

                  ["The same reasoning applies when Qasr considers improving reservations or changing the way hotels verify corporate rates.",
                    null],

                  ["The organisation needs to understand the wider process landscape before treating a departmental improvement as a complete solution.",
                    q(
                      "Why should managers examine process relationships before approving a local improvement?"
                    )],

                  ["Keep the central distinction clear: strategy establishes direction, and architecture organises the processes needed to deliver it.",
                    null],

                  ["Detailed modelling can follow once managers understand which processes deserve attention and how they connect.",
                    null],

                  ["That sequence makes improvement more coherent because decisions begin with the organisation rather than isolated tasks.",
                    null]

                ]
              }

            ]

          },

          // =====================================================
          // W6O1b — ARCHITECTURE VERSUS DOCUMENTATION
          // =====================================================

          {
            title: "Architecture versus documentation and process models",
            sec: "W6O1b",

            lines: [

              ["Let's return to Qasr's improvement programme, where the team has started collecting diagrams of guest arrival procedures.",
                t(
                  "A folder is not an architecture",
                  "Understanding the difference between process documentation, process models, and process architecture"
                )],

              ["The analysts are pleased because their repository contains increasingly detailed descriptions of how different hotels receive guests.",
                null],

              ["A repository is simply a place where documents and models are stored, organised, and made available for use.",
                st(
                  "A repository stores process information, but storage alone does not create process architecture."
                )],

              ["Imagine opening that repository and finding diagrams describing reception activities, corporate rate checks, and room preparation.",
                null],

              ["You might learn how individual activities happen, yet remain uncertain about which diagram represents the agreed process.",
                iss(
                  "Several diagrams describe related work, but their authority and relationships remain unclear.",
                  "Documentation without architecture"
                )],

              ["That uncertainty matters because managers cannot confidently redesign work when they do not know which description to trust.",
                null],

              ["A process model describes how a particular process operates, usually through activities, decisions, events, and their connections.",
                dg(
                  "An individual process model",
                  D.flow([
                    "Guest arrives",
                    "Booking checked",
                    "Room confirmed",
                    "Guest settled"
                  ]),
                  "A process model describes the activities and sequence within one particular process."
                )],

              ["For example, a check-in model might show how reception verifies a reservation and confirms that the room is ready.",
                null],

              ["That model helps employees understand the work and investigate where delays or mistakes might occur.",
                null],

              ["But it does not automatically explain how check-in relates to reservations, billing, housekeeping, or wider organisational strategy.",
                q(
                  "What important organisational relationships remain invisible when we examine only one process model?"
                )],

              ["Process architecture provides that wider structure by locating individual processes within an agreed organisational landscape.",
                null],

              ["It also identifies relationships, classifications, ownership, and the conventions used to describe processes consistently.",
                dg(
                  "Processes within a wider structure",
                  D.flow([
                    "Manage reservations",
                    "Deliver guest arrival",
                    "Provide accommodation",
                    "Complete departure"
                  ]),
                  "Architecture shows how major processes fit together rather than describing every activity inside one process."
                )],

              ["Think of a process model as a detailed street view and architecture as the map connecting different streets.",
                null],

              ["Neither view replaces the other, because each supports a different kind of management decision.",
                [
                  cmp(
                    "a",
                    "Process model",
                    "Describes how one process works through its activities and decisions."
                  ),
                  cmp(
                    "b",
                    "Process architecture",
                    "Shows the wider structure, relationships, and ownership of organisational processes."
                  )
                ]],

              ["Now imagine two analysts independently drawing Qasr's arrival process using different names and different levels of detail.",
                null],

              ["One calls the work reception administration, while another calls it the complete guest arrival journey.",
                iss(
                  "Different naming and modelling choices make related processes difficult to compare.",
                  "Inconsistent conventions"
                )],

              ["Both descriptions may contain useful information, but managers cannot compare them confidently without agreed modelling conventions.",
                null],

              ["A convention is a shared rule governing how something is named, represented, classified, or maintained.",
                st(
                  "Naming and modelling conventions make independently produced process descriptions comparable."
                )],

              ["Architecture establishes those conventions before detailed modelling begins, so the repository develops into a coherent resource.",
                null],

              ["It also requires agreement about which version is authoritative when several descriptions of the same process disagree.",
                null],

              ["Authoritative means officially recognised as the version managers and employees should rely upon when making decisions.",
                it(
                  1, 3, "check",
                  "Authoritative versions",
                  "The organisation establishes which process description is officially recognised."
                )],

              ["Without that rule, an analyst may unknowingly redesign work using an outdated or factually incorrect description.",
                null],

              ["A useful architecture also identifies who owns each process, rather than assuming the author of a diagram is responsible.",
                it(
                  2, 3, "users",
                  "Named ownership",
                  "A process owner is accountable for the complete process across departmental boundaries."
                )],

              ["Ownership matters because somebody must resolve disagreements and approve changes affecting the complete flow of work.",
                null],

              ["Finally, architecture shows relationships between processes so managers can anticipate the effects of proposed changes.",
                it(
                  3, 3, "link",
                  "Connected processes",
                  "Relationships reveal which processes may be affected when another process changes."
                )],

              ["Imagine Qasr changing how corporate reservations are confirmed without considering the information reception needs during guest arrival.",
                null],

              ["The change might improve reservations while making the arrival process slower or less reliable.",
                iss(
                  "A reservation change may disrupt guest arrival when connected processes are not considered.",
                  "An unseen dependency"
                )],

              ["A dependable architecture helps managers recognise that dependency before the change is introduced.",
                null],

              ["Now consider another distinction that becomes important when Qasr begins organising its process landscape.",
                null],

              ["Architecture is hierarchical, meaning broader process groupings contain more specific processes and eventually detailed activities.",
                dg(
                  "A hierarchy of process detail",
                  D.hier([
                    ["Value chain", "Serve the guest"],
                    ["Process", "Manage guest arrival"],
                    ["Sub-process", "Verify reservation"],
                    ["Activity", "Confirm corporate rate"],
                    ["Task", "Open account record"]
                  ], -1),
                  "A process hierarchy connects the organisation's broad work with increasingly detailed activities and tasks."
                )],

              ["The agreed level determines whether managers are discussing a complete business flow or one small operational activity.",
                null],

              ["If analysts confuse those levels, they may disagree about diagrams that are actually describing different amounts of work.",
                null],

              ["This is why a useful architecture establishes structure and levels before encouraging extensive detailed modelling.",
                st(
                  "Architecture establishes the process structure, while models describe the work within that structure."
                )],

              ["So the question is not whether Qasr has collected enough diagrams to fill its repository.",
                null],

              ["The real question is whether those diagrams belong to a trustworthy structure that managers can actually use.",
                q(
                  "Can Qasr identify each process, its owner, its relationships, and its authoritative description?"
                )],

              ["Once those foundations exist, process documentation becomes far more valuable because every model has a clear organisational purpose.",
                null]

            ],

            review: [

              // -----------------------------------------------
              // REMEDIAL W6O1b — ALTERNATIVE 1
              // New angle: a library catalogue
              // -----------------------------------------------

              {
                title: "A library full of books but no catalogue",
                lines: [

                  ["Let's imagine visiting a large library where thousands of excellent books have been placed on shelves without a catalogue.",
                    t(
                      "Documentation and architecture",
                      "A library collection becomes useful when its contents have an agreed structure."
                    )],

                  ["Every book contains valuable information, and the librarians may know many individual titles extremely well.",
                    null],

                  ["Yet finding the right book becomes difficult because nobody has agreed how the collection should be organised.",
                    iss(
                      "The information exists, but users cannot reliably locate or relate it.",
                      "A missing structure"
                    )],

                  ["One librarian groups books by author, another uses subject areas, and a third follows the order of arrival.",
                    null],

                  ["None of those approaches is necessarily unreasonable, but mixing them without agreement makes the collection difficult to navigate.",
                    null],

                  ["Now imagine the library establishing a catalogue with consistent subjects, identifiers, relationships, and rules for maintaining records.",
                    st(
                      "A shared classification and naming system makes a large information collection usable."
                    )],

                  ["The books have not changed, but readers can now understand where each belongs and how related subjects connect.",
                    null],

                  ["This is similar to what process architecture contributes to an organisation's existing process documentation.",
                    null],

                  ["A process model resembles an individual book because it contains detailed information about one particular subject.",
                    [
                      cmp(
                        "a",
                        "Individual book",
                        "Contains detailed information about a particular subject."
                      ),
                      cmp(
                        "b",
                        "Process model",
                        "Contains detailed information about a particular process."
                      )
                    ]],

                  ["The architecture resembles the catalogue because it provides the structure that makes individual descriptions understandable together.",
                    null],

                  ["Now suppose the library discovers several editions of the same reference book, each containing different information.",
                    null],

                  ["Readers need to know which edition should be used for a particular purpose, rather than choosing randomly.",
                    iss(
                      "Several versions exist, but nobody knows which should guide decisions.",
                      "No authoritative version"
                    )],

                  ["Qasr faces the same risk when different process diagrams describe the same guest arrival work in conflicting ways.",
                    null],

                  ["A repository can store every diagram without deciding which version represents the agreed way of working.",
                    null],

                  ["Architecture adds the conventions, ownership, and authority needed to resolve that uncertainty.",
                    st(
                      "A useful architecture makes process descriptions comparable, connected, and accountable."
                    )],

                  ["Consider how difficult it would be to manage the library if nobody were responsible for maintaining its catalogue.",
                    null],

                  ["Even a carefully designed structure would gradually deteriorate as new books arrived and classification practices changed.",
                    null],

                  ["Similarly, Qasr needs process owners and maintenance rules to keep its architecture useful after the initial modelling work.",
                    null],

                  ["The central lesson is that collecting information and organising information are different management activities.",
                    q(
                      "Why can a large collection of accurate process models still be difficult to use?"
                    )],

                  ["A process model explains particular work, while architecture makes that work understandable within the wider organisation.",
                    null],

                  ["Once you recognise that difference, the value of architecture becomes much easier to appreciate.",
                    null]

                ]
              },

              // -----------------------------------------------
              // REMEDIAL W6O1b — ALTERNATIVE 2
              // New angle: a hospital information system
              // -----------------------------------------------

              {
                title: "Several accurate records, one confused hospital",
                lines: [

                  ["Let's consider a hospital where different clinical and administrative teams maintain detailed descriptions of their own procedures.",
                    t(
                      "Why accurate models are not enough",
                      "A hospital needs an agreed structure connecting its many processes."
                    )],

                  ["The emergency department documents patient admission, laboratories describe testing, and wards explain how patients receive ongoing care.",
                    null],

                  ["Each description may be accurate, but the hospital still needs to understand how those processes connect.",
                    dg(
                      "Connected hospital processes",
                      D.flow([
                        "Patient admitted",
                        "Tests completed",
                        "Treatment delivered",
                        "Patient discharged"
                      ]),
                      "A patient's journey depends on several processes that must work together."
                    )],

                  ["Imagine the laboratory changing how test results are communicated without considering how doctors receive and interpret those results.",
                    null],

                  ["The laboratory's own procedure might become more efficient while the wider patient journey becomes less reliable.",
                    iss(
                      "A local improvement disrupts another process because their relationship was overlooked.",
                      "A hidden dependency"
                    )],

                  ["The hospital therefore needs more than separate diagrams explaining what employees do inside individual departments.",
                    null],

                  ["It needs a structured view showing which processes exist, how they relate, and who is accountable.",
                    st(
                      "Architecture explains the relationships and responsibilities connecting individual processes."
                    )],

                  ["That structured view is the process architecture, while each detailed description remains a process model.",
                    null],

                  ["Now imagine two hospital teams drawing different versions of the same patient transfer process.",
                    null],

                  ["One model describes the complete transfer, while another focuses only on updating the electronic record.",
                    null],

                  ["The disagreement may arise because the teams are working at different levels of detail.",
                    [
                      cmp(
                        "a",
                        "Complete patient transfer",
                        "A broader process covering the patient's movement and care."
                      ),
                      cmp(
                        "b",
                        "Electronic record update",
                        "A narrower activity within the transfer process."
                      )
                    ]],

                  ["A process hierarchy helps managers recognise that distinction instead of arguing about which description is correct.",
                    null],

                  ["The hierarchy groups broad processes and shows how they contain smaller processes and activities.",
                    null],

                  ["Agreed modelling conventions also help different teams produce descriptions that can be compared consistently.",
                    null],

                  ["Without those conventions, the hospital might accumulate hundreds of diagrams that use incompatible names and boundaries.",
                    iss(
                      "Inconsistent process descriptions prevent reliable comparison and coordinated management.",
                      "A fragmented repository"
                    )],

                  ["The hospital must also establish which descriptions are authoritative when several versions disagree about the same work.",
                    null],

                  ["That decision requires ownership, because somebody must take responsibility for maintaining and approving the agreed process.",
                    null],

                  ["Qasr's hotel group faces precisely the same architectural challenge, even though its services are very different.",
                    null],

                  ["Its managers need to understand the relationships between reservations, guest arrival, accommodation, and other connected processes.",
                    q(
                      "What does architecture provide that a detailed model of one process cannot provide?"
                    )],

                  ["Remember that process models explain how particular work happens, while architecture establishes the wider organisational structure.",
                    null],

                  ["Both are necessary, but confusing them can produce extensive documentation without dependable management decisions.",
                    null]

                ]
              }

            ]

          },

          // =====================================================
          // W6O1c — CORE, SUPPORTING, AND MANAGEMENT PROCESSES
          // =====================================================

          {
            title: "Three kinds of processes — core, supporting and management",
            sec: "W6O1c",

            lines: [

              ["Now that we understand why Qasr needs an architecture, let's consider how its many processes should be organised.",
                t(
                  "Classifying the process landscape",
                  "Core, supporting, and management processes serve different strategic purposes."
                )],

              ["Imagine the leadership team examining the work performed across the group's fourteen hotels and resorts.",
                null],

              ["Some processes directly shape the guest experience, while others provide resources or guide how the organisation operates.",
                null],

              ["Treating every process as strategically identical would make investment decisions difficult because their contributions are not the same.",
                q(
                  "Should Qasr invest in every process as though each creates the same customer value?"
                )],

              ["Process architecture addresses this problem by distinguishing core processes, supporting processes, and management processes.",
                dg(
                  "Three process categories",
                  D.flow([
                    "Core processes",
                    "Supporting processes",
                    "Management processes"
                  ]),
                  "The architecture distinguishes customer-facing value creation, enabling services, and organisational direction."
                )],

              ["A core process directly contributes to the outcome customers recognise and are willing to pay the organisation to deliver.",
                null],

              ["For Qasr, delivering a reliable guest stay is central because guests choose accommodation for the experience they receive.",
                st(
                  "Core processes deliver outcomes that customers notice and value."
                )],

              ["Think about our traveller at Qasr Marina, who expected a correct room and a smooth arrival.",
                null],

              ["Her experience depended on connected work that directly influenced whether the hotel fulfilled its promise.",
                null],

              ["That makes the guest arrival journey an important part of Qasr's core value delivery.",
                it(
                  1, 3, "target",
                  "Core processes",
                  "These processes create the outcomes customers notice and are willing to pay for."
                )],

              ["Because core processes influence customer choice, organisations may invest in making them distinctive rather than merely adequate.",
                null],

              ["For example, Qasr might decide that consistently reliable arrivals are important to its competitive positioning.",
                null],

              ["That would justify examining the complete arrival experience rather than simply purchasing a faster reception computer.",
                st(
                  "Core processes may justify differentiated investment because they influence customer value and competitive position."
                )],

              ["But the guest experience also depends on processes that customers rarely notice unless something goes wrong.",
                null],

              ["Consider payroll, routine technology maintenance, or purchasing ordinary office supplies for the hotel group.",
                null],

              ["These activities are necessary, but guests do not normally select a hotel because its payroll procedure is unusual.",
                it(
                  2, 3, "layers",
                  "Supporting processes",
                  "These processes enable the organisation to operate without normally providing the reason customers choose it."
                )],

              ["We call these supporting processes because they enable core work without usually creating the organisation's distinctive customer promise.",
                null],

              ["Their importance is real, even though the appropriate investment approach may be quite different.",
                null],

              ["Qasr might standardise routine administrative work or purchase established solutions instead of developing every system internally.",
                [
                  cmp(
                    "a",
                    "Core process investment",
                    "Differentiate where the customer values the result."
                  ),
                  cmp(
                    "b",
                    "Supporting process investment",
                    "Standardise where reliability and efficiency matter more than uniqueness."
                  )
                ]],

              ["That choice can release resources for improvements that matter more directly to the guest's experience.",
                null],

              ["However, supporting does not mean unimportant, because failures in enabling services can still disrupt core processes.",
                null],

              ["A hotel cannot deliver a reliable stay if essential technology or supplies are consistently unavailable.",
                iss(
                  "A supporting process can disrupt customer value when it fails.",
                  "Necessary does not mean distinctive"
                )],

              ["Now imagine Qasr's executives deciding how much to invest in guest experience and how performance should be measured.",
                null],

              ["Those decisions belong to management processes, which direct, coordinate, and evaluate the organisation's other processes.",
                it(
                  3, 3, "chart",
                  "Management processes",
                  "These processes establish direction, allocate resources, and govern organisational performance."
                )],

              ["Strategic planning and performance governance are examples because they influence how core and supporting work is managed.",
                null],

              ["Management processes deserve deliberate design because unclear decision rights can undermine otherwise well-designed operational processes.",
                null],

              ["Think about Qasr appointing a process owner who cannot influence changes proposed by individual departments.",
                iss(
                  "Unclear governance prevents a process owner from coordinating improvements across departments.",
                  "Management arrangements matter"
                )],

              ["The architecture must therefore show management processes as part of the organisation's work, not as an afterthought.",
                null],

              ["Now here's an important subtlety that prevents this classification from becoming a mechanical exercise.",
                null],

              ["The same activity can be strategically core in one organisation and supporting in another organisation.",
                q(
                  "Why might the same process belong to different categories in different organisations?"
                )],

              ["Imagine a specialist technology company selling payroll services to businesses that depend on its expertise.",
                null],

              ["Payroll delivery could be core for that company because customers purchase the service as its main offering.",
                null],

              ["For Qasr, payroll would normally remain supporting because guests purchase accommodation rather than payroll administration.",
                [
                  cmp(
                    "a",
                    "Qasr Hospitality",
                    "Payroll supports the delivery of hotel services."
                  ),
                  cmp(
                    "b",
                    "Payroll service provider",
                    "Payroll delivery is the service customers purchase."
                  )
                ]],

              ["The difference comes from organisational strategy and customer value, not from the technical steps inside the process.",
                null],

              ["This is why Organisation Strategy comes before Process Architecture in the BPM implementation framework.",
                st(
                  "Process classification follows strategy because strategy determines what creates distinctive customer value."
                )],

              ["Without strategic direction, managers may classify processes according to departmental importance rather than their contribution to customers.",
                null],

              ["A department can be large, expensive, or politically influential without its processes necessarily being core.",
                null],

              ["The architecture should instead reflect the organisation's purpose and the value its customers actually receive.",
                null],

              ["As Qasr develops its map, these categories will help managers distinguish where differentiation matters from where standardisation is sensible.",
                null],

              ["They will also help reveal which management arrangements are needed to keep the complete process landscape coordinated.",
                dg(
                  "Classification supports investment",
                  D.flow([
                    "Business strategy",
                    "Process classification",
                    "Investment choices",
                    "Customer value"
                  ]),
                  "Strategy informs process classification, which helps managers direct resources toward appropriate forms of improvement."
                )],

              ["So our next challenge is to organise these categories into useful levels without drowning the architecture in unnecessary detail.",
                null],

              ["That is where we'll continue, using Qasr's fourteen properties to understand how an architecture becomes genuinely manageable.",
                null]

            ],

            review: [

              // -----------------------------------------------
              // REMEDIAL W6O1c — ALTERNATIVE 1
              // New angle: an online retailer
              // -----------------------------------------------

              {
                title: "What customers buy, and what makes it possible",
                lines: [

                  ["Let's explore process classification through an online retailer, because the difference between customer value and enabling work becomes clear.",
                    t(
                      "Three kinds of processes",
                      "An online retailer needs customer value, operational support, and management direction."
                    )],

                  ["Imagine ordering a birthday gift from a company promising reliable delivery before an important family celebration.",
                    null],

                  ["You care whether the correct product arrives when promised and whether the purchasing experience feels dependable.",
                    null],

                  ["The processes delivering that outcome are central to the value the retailer offers its customers.",
                    st(
                      "Core processes deliver the outcomes customers recognise and are willing to pay for."
                    )],

                  ["Order fulfilment may therefore be core because it directly determines whether the company keeps its customer promise.",
                    null],

                  ["If reliable delivery distinguishes the retailer from competitors, improving fulfilment can strengthen its competitive position.",
                    dg(
                      "A customer's order",
                      D.flow([
                        "Order received",
                        "Product prepared",
                        "Parcel dispatched",
                        "Customer receives"
                      ]),
                      "The retailer's core fulfilment process delivers the outcome customers expect."
                    )],

                  ["Now consider the retailer's internal payroll process, which ensures employees receive their wages accurately and on time.",
                    null],

                  ["Payroll matters enormously to employees, but customers generally do not choose this retailer because its payroll system is distinctive.",
                    null],

                  ["Payroll therefore supports the business without normally defining the value customers purchase from the retailer.",
                    st(
                      "Supporting processes are necessary even when customers do not choose the organisation because of them."
                    )],

                  ["The retailer might sensibly purchase a reliable payroll service rather than developing a unique system internally.",
                    null],

                  ["That decision could free investment for improving the delivery experience that customers actually notice.",
                    null],

                  ["Now imagine senior managers deciding whether faster delivery justifies additional investment in distribution facilities.",
                    null],

                  ["They must compare strategic priorities, allocate resources, and establish measures for evaluating the results.",
                    null],

                  ["Those decisions belong to management processes because they govern how the organisation directs its other work.",
                    [
                      cmp(
                        "a",
                        "Supporting processes",
                        "Provide necessary capabilities and resources."
                      ),
                      cmp(
                        "b",
                        "Management processes",
                        "Set direction, allocate resources, and evaluate performance."
                      )
                    ]],

                  ["Notice that none of these categories means the other processes can safely be ignored.",
                    null],

                  ["Poor payroll administration could damage employee morale, while weak governance could undermine an excellent delivery operation.",
                    null],

                  ["Classification instead helps managers decide where differentiation is valuable and where standardisation is more appropriate.",
                    q(
                      "Which processes should receive distinctive investment, and which should be reliably standardised?"
                    )],

                  ["For Qasr, the same reasoning applies to guest experiences, internal administration, and strategic performance management.",
                    null],

                  ["The classification must follow what the hotel group promises its guests rather than departmental prestige or size.",
                    null],

                  ["That is why strategy guides architecture, and architecture then guides sensible investment decisions.",
                    null]

                ]
              },

              // -----------------------------------------------
              // REMEDIAL W6O1c — ALTERNATIVE 2
              // New angle: a specialist restaurant
              // -----------------------------------------------

              {
                title: "Why the same process changes category",
                lines: [

                  ["Let's try a different example involving a restaurant known for preparing distinctive meals for special occasions.",
                    t(
                      "Classification depends on strategy",
                      "The same process may be core in one organisation and supporting in another."
                    )],

                  ["Imagine customers choosing this restaurant because its chefs create memorable dishes that cannot easily be found elsewhere.",
                    null],

                  ["The food preparation process contributes directly to the experience customers value and are willing to purchase.",
                    null],

                  ["That makes preparing the distinctive meals a core process within the restaurant's chosen business strategy.",
                    st(
                      "A core process contributes directly to the distinctive value customers purchase."
                    )],

                  ["Now consider the restaurant's routine cleaning arrangements, which are essential for safe and reliable operation.",
                    null],

                  ["Customers expect proper cleanliness, but they do not normally select this restaurant because its cleaning method is unusual.",
                    null],

                  ["Cleaning therefore generally supports the restaurant's core offering rather than providing its main source of differentiation.",
                    null],

                  ["The restaurant should manage cleaning carefully while avoiding unnecessary investment in creating unique administrative arrangements.",
                    [
                      cmp(
                        "a",
                        "Core restaurant process",
                        "Distinctive food preparation creates customer value."
                      ),
                      cmp(
                        "b",
                        "Supporting restaurant process",
                        "Routine cleaning enables safe and dependable operations."
                      )
                    ]],

                  ["Now imagine a specialist cleaning company whose customers purchase professional cleaning services as its primary offering.",
                    null],

                  ["For that company, delivering cleaning services becomes core because customers directly pay for the outcome.",
                    null],

                  ["The technical work may resemble the restaurant's cleaning activities, but its strategic role is entirely different.",
                    iss(
                      "Identical work can have different strategic roles in different organisations.",
                      "Classification depends on purpose"
                    )],

                  ["That difference shows why process categories cannot be assigned solely by examining what employees physically do.",
                    null],

                  ["Managers must understand the organisation's strategy and the outcomes its customers consider valuable.",
                    null],

                  ["Now imagine the restaurant owner deciding whether to expand the menu or invest in additional kitchen equipment.",
                    null],

                  ["Those choices require planning, budgeting, performance evaluation, and coordination across the business.",
                    null],

                  ["Such work belongs to management processes because it directs and governs the restaurant's other activities.",
                    st(
                      "Management processes establish direction and control how core and supporting processes operate."
                    )],

                  ["Without deliberate management arrangements, the restaurant might invest heavily in equipment that does not support its strategy.",
                    null],

                  ["This is why architecture includes management processes rather than focusing exclusively on activities customers can observe.",
                    null],

                  ["Return now to Qasr, where the same classification challenge applies across the hotel group's operations.",
                    null],

                  ["Guest arrival contributes directly to the accommodation experience, while routine administration generally enables that experience.",
                    q(
                      "What determines whether a process is core, supporting, or management?"
                    )],

                  ["The answer depends on customer value, organisational strategy, and the role the process plays in delivering both.",
                    null],

                  ["When Qasr understands those relationships, it can make more defensible choices about investment and standardisation.",
                    null]

                ]
              }

            ]

          }

        ]

      },

      {
  id: "l2",
  title: "Building an architecture that works",

  sections: [

    // =========================================================
    // W6O2a — THREE LEVELS: KNOWING HOW FAR TO ZOOM IN
    // =========================================================

    {
      title: "Three levels — knowing how far to zoom in",
      sec: "W6O2a",

      lines: [

        ["Welcome back to Qasr Hospitality, where our team now understands why collecting process diagrams cannot replace an architecture.",
          t(
            "Lesson 2 · Building an architecture that works",
            "Three levels — knowing how far to zoom in"
          )],

        ["The next challenge is deciding how much detail belongs in the map before detailed modelling begins.",
          null],

        ["Imagine the Qasr leadership team asking you to show how the group's fourteen properties deliver guest experiences.",
          q(
            "How much detail should Qasr's process architecture contain?"
          )],

        ["You could begin with every employee activity, but the resulting diagram would quickly become impossible to understand.",
          null],

        ["Alternatively, you could draw one box labelled hotel operations, but that would reveal almost nothing useful.",
          [
            cmp(
              "a",
              "Too much detail",
              "Hundreds of activities obscure the overall structure."
            ),
            cmp(
              "b",
              "Too little detail",
              "One broad label hides important process relationships."
            )
          ]],

        ["A useful architecture therefore needs an appropriate level of granularity, meaning the amount of detail represented.",
          st(
            "Granularity means how finely a process is divided into smaller parts."
          )],

        ["Think about a digital map that lets you examine an entire country before exploring a particular neighbourhood.",
          null],

        ["The country view helps you understand broad relationships, while the neighbourhood view supports decisions requiring greater precision.",
          dg(
            "Different levels of detail",
            D.hier([
              ["Level 1", "Hotel operations"],
              ["Level 2", "Guest arrival"],
              ["Level 3", "Verify booking"]
            ], -1),
            "Each level reveals more detail while remaining connected to the wider process structure."
          )],

        ["Process architecture uses a similar hierarchy, where broader processes contain smaller processes and eventually individual activities.",
          null],

        ["At the broadest level, Qasr needs a landscape showing the major processes required to deliver its strategy.",
          st(
            "The highest architectural level shows the organisation's major processes and their relationships."
          )],

        ["That landscape might include managing reservations, delivering guest services, maintaining properties, and governing business performance.",
          null],

        ["These labels describe substantial areas of work rather than the individual tasks performed by particular employees.",
          null],

        ["The purpose is to make the organisation understandable without losing the relationships that matter for strategic decisions.",
          dg(
            "A broad process landscape",
            D.flow([
              "Manage|reservations",
              "Deliver|guest arrival",
              "Provide|accommodation",
              "Complete|departure"
            ]),
            "A high-level architecture identifies major processes without describing every activity inside them."
          )],

        ["Now imagine the leadership team deciding that guest arrival deserves closer attention because it influences customer satisfaction.",
          null],

        ["The architecture can reveal the processes contained within that broader area without abandoning the overall map.",
          null],

        ["This deeper level is useful because managers can identify meaningful process boundaries and assign responsibility more precisely.",
          dg(
            "Decomposing a process",
            D.hier([
              ["Level 1", "Guest services"],
              ["Level 2", "Guest arrival"],
              ["Level 3", "Confirm booking"]
            ], 1),
            "Decomposition divides a broader process into smaller, manageable components."
          )],

        ["Decomposition simply means dividing a larger process into smaller components while preserving their relationship to the whole.",
          null],

        ["For example, guest arrival may involve reservation verification, room readiness confirmation, and the completion of arrival formalities.",
          null],

        ["Those components help explain how the broader process works, but they should not automatically become separate top-level processes.",
          iss(
            "Treating every activity as a major process destroys the usefulness of the architecture.",
            "Excessive decomposition"
          )],

        ["If Qasr places every small activity on its highest-level map, managers will struggle to recognise meaningful organisational relationships.",
          null],

        ["The opposite mistake occurs when a process remains so broad that nobody can identify where responsibility or performance problems lie.",
          null],

        ["A label such as manage the hotel may conceal too many different outcomes to support practical process management.",
          [
            cmp(
              "a",
              "Overly broad boundary",
              "The process contains too much unrelated work."
            ),
            cmp(
              "b",
              "Useful boundary",
              "The process delivers a recognisable outcome that can be managed."
            )
          ]],

        ["The right level depends on the decision managers need to make rather than a universal number of boxes.",
          null],

        ["A strategic architecture needs enough detail to identify major processes, their relationships, and their contribution to organisational objectives.",
          null],

        ["An operational improvement project may need much greater detail to understand delays, decisions, and employee activities.",
          st(
            "The appropriate level of detail depends on the management decision being supported."
          )],

        ["Notice that these different views are connected, rather than competing descriptions of the organisation.",
          null],

        ["A detailed arrival activity should belong to a recognisable process, which itself belongs within the wider architecture.",
          null],

        ["That connection allows managers to move between strategic questions and operational problems without losing their organisational context.",
          dg(
            "Connected architectural levels",
            D.hier([
              ["Landscape", "Guest services"],
              ["Process", "Guest arrival"],
              ["Sub-process", "Verify reservation"],
              ["Activity", "Check booking"],
              ["Task", "Open record"]
            ], -1),
            "Each detailed activity remains connected to a broader process and the organisational landscape."
          )],

        ["Let's return to the fourteen Qasr properties, where similar work may be described at different levels of detail.",
          null],

        ["One hotel might call guest arrival a single process, while another divides it into several separately named procedures.",
          null],

        ["Before comparing those descriptions, the team must determine whether they represent equivalent levels of work.",
          q(
            "Are these genuinely different processes, or different levels of description?"
          )],

        ["Otherwise, managers may mistake differences in documentation for differences in how the hotels actually operate.",
          null],

        ["An agreed hierarchy helps Qasr compare equivalent processes while preserving the detail needed for local investigation.",
          null],

        ["That is the real purpose of choosing granularity carefully: making the architecture understandable, comparable, and useful for decisions.",
          null],

        ["Our next challenge is identifying who should take responsibility for processes that cross several departmental boundaries.",
          null]

      ],

      review: [

        // -----------------------------------------------------
        // W6O2a REMEDIAL 1
        // New angle: a city transport network
        // -----------------------------------------------------

        {
          title: "A transport map that knows when to stop",
          lines: [

            ["Let's understand process granularity through a city transport network, where different maps answer very different questions.",
              t(
                "A different view of granularity",
                "A transport map becomes useful when its detail matches the traveller's decision."
              )],

            ["Imagine planning a journey across a large city using a map showing every pavement, doorway, and traffic signal.",
              null],

            ["The information might be accurate, but it would overwhelm you when choosing which train line to take.",
              null],

            ["You need a broader map showing the main stations and the connections between different routes.",
              dg(
                "A useful network overview",
                D.flow([
                  "Airport",
                  "Central|station",
                  "Business|district",
                  "University"
                ]),
                "A network overview shows major connections without displaying every local detail."
              )],

            ["That overview resembles the highest level of a process architecture because it makes major relationships visible.",
              null],

            ["Now imagine reaching the central station and needing to find the correct platform for your connecting train.",
              null],

            ["The broad network map is no longer sufficient because your immediate decision requires more precise information.",
              null],

            ["You therefore consult a station map showing platforms, entrances, and the routes connecting them.",
              st(
                "Different decisions require different levels of detail."
              )],

            ["Both maps describe the same transport system, but they operate at different levels of granularity.",
              null],

            ["Granularity means the amount of detail included in a representation of something larger.",
              null],

            ["A process architecture works similarly because its broad landscape can be decomposed into more detailed processes.",
              dg(
                "A hierarchy of detail",
                D.hier([
                  ["Network", "City transport"],
                  ["Route", "Airport connection"],
                  ["Activity", "Change platforms"]
                ], -1),
                "Broader levels provide context, while narrower levels support detailed operational decisions."
              )],

            ["For Qasr, the broad map identifies major processes needed to deliver hotel services across its properties.",
              null],

            ["A closer view of guest arrival reveals the smaller processes contributing to that customer experience.",
              null],

            ["An even closer view may explain how an employee verifies a reservation or resolves a booking discrepancy.",
              null],

            ["Those views should remain connected because the detailed activity contributes to a broader organisational outcome.",
              null],

            ["Now imagine a transport authority placing every station doorway on its national network map.",
              null],

            ["The map would become difficult to read, even though the additional information might be technically correct.",
              iss(
                "Too much detail can make an otherwise accurate map unusable.",
                "Information overload"
              )],

            ["The same problem appears when Qasr treats every small activity as a separate major process.",
              null],

            ["The architecture becomes crowded, and managers lose sight of the relationships they actually need to understand.",
              null],

            ["The opposite mistake is drawing a map so broad that it provides no useful guidance.",
              q(
                "How much detail is necessary for the decision you are trying to make?"
              )],

            ["A useful architecture therefore includes enough detail to support its intended management decisions without becoming unnecessarily complicated.",
              null],

            ["That principle helps Qasr build a map that managers can understand, maintain, and use.",
              null]

          ]
        },

        // -----------------------------------------------------
        // W6O2a REMEDIAL 2
        // New angle: a university programme
        // -----------------------------------------------------

        {
          title: "From a degree programme to one learning activity",
          lines: [

            ["Let's approach architectural levels through a university programme, where broad educational goals depend on many smaller activities.",
              t(
                "Understanding decomposition",
                "A university programme contains courses, learning activities, and individual tasks."
              )],

            ["Imagine a postgraduate student asking how a complete degree programme is organised and what it aims to achieve.",
              null],

            ["You would probably explain the programme's main areas before describing every individual classroom activity.",
              null],

            ["That broad explanation helps the student understand the overall structure without becoming distracted by unnecessary detail.",
              st(
                "A broad view helps people understand the overall structure."
              )],

            ["Now imagine the same student asking what will happen during a particular course.",
              null],

            ["You would provide a more detailed description because the student's question has become more specific.",
              null],

            ["The student might eventually ask how to complete one particular learning activity within that course.",
              dg(
                "Levels of educational detail",
                D.hier([
                  ["Programme", "Postgraduate degree"],
                  ["Course", "Business process management"],
                  ["Activity", "Analyse a case"]
                ], -1),
                "The same educational system can be understood at different levels of detail."
              )],

            ["These explanations do not contradict one another because they describe connected levels of the same educational structure.",
              null],

            ["Process architecture uses this principle when organising broad processes and their smaller components.",
              null],

            ["The act of dividing a larger process into smaller parts is called decomposition.",
              st(
                "Decomposition divides broader processes into smaller, related components."
              )],

            ["For Qasr, a broad guest services process may contain guest arrival and other recognisable service processes.",
              null],

            ["Guest arrival may then contain smaller activities involving reservation verification and room readiness.",
              null],

            ["The architecture connects those levels so managers understand how detailed work contributes to broader outcomes.",
              null],

            ["But imagine presenting every individual classroom instruction as though it were an entire degree programme.",
              null],

            ["That would confuse the student because activities and programmes represent fundamentally different levels of detail.",
              iss(
                "Confusing levels makes organisational structures difficult to interpret.",
                "Inconsistent granularity"
              )],

            ["Qasr faces the same difficulty when different hotels describe equivalent work using inconsistent process boundaries.",
              null],

            ["One property might document a complete arrival journey, while another records only a narrow reception activity.",
              null],

            ["Comparing those descriptions directly would be misleading because they do not represent equivalent units of work.",
              null],

            ["The team must therefore agree which level each description represents before deciding whether the processes differ.",
              q(
                "Are the descriptions showing the same amount of work?"
              )],

            ["A useful architectural level contains enough detail to support the decision managers are making.",
              null],

            ["The goal is not maximum detail, but a consistent structure connecting strategic outcomes with operational work.",
              null],

            ["That consistency makes Qasr's fourteen properties easier to compare without hiding genuine operational differences.",
              null]

          ]
        }

      ]
    },

    // =========================================================
    // W6O2b — PROCESS OWNERSHIP: A TITLE OR REAL AUTHORITY?
    // =========================================================

    {
      title: "Process ownership — a title or real authority?",
      sec: "W6O2b",

      lines: [

        ["Our Qasr team has now organised its processes into meaningful levels, but another difficult question remains unanswered.",
          t(
            "Building an architecture that works",
            "Process ownership — a title or real authority?"
          )],

        ["When a process crosses several departments, who should be accountable for its performance and improvement?",
          q(
            "Who owns a process that crosses departmental boundaries?"
          )],

        ["Think again about our traveller arriving at Qasr Marina after a long and exhausting journey.",
          null],

        ["Her reservation involves revenue management, her room readiness involves housekeeping, and her arrival involves reception.",
          dg(
            "The guest journey crosses departments",
            D.org("process", {
              depts: [
                "Revenue",
                "Front desk",
                "House-|keeping",
                "Finance"
              ],
              from: "Guest arrives",
              to: "Guest settled"
            }),
            "The guest experiences one connected journey, even though several departments contribute to it."
          )],

        ["Each department has a manager, but the guest experiences their combined work as one connected service.",
          null],

        ["Suppose the room is unavailable because reservation information and housekeeping updates have not been coordinated properly.",
          iss(
            "A failure between departments delays the guest's arrival.",
            "The handoff problem"
          )],

        ["The reception manager may explain that the booking was correct, while housekeeping insists its own procedure was followed.",
          null],

        ["Both managers might be describing their departmental responsibilities accurately without resolving the guest's complete problem.",
          null],

        ["That is why process architecture needs ownership extending beyond the boundaries of individual organisational functions.",
          st(
            "A process owner is accountable for the performance and improvement of an end-to-end process."
          )],

        ["A process owner is the person accountable for ensuring that a complete process achieves its intended outcomes.",
          null],

        ["End-to-end means considering the entire flow from the event that begins the process to its completed result.",
          null],

        ["For guest arrival, that means understanding the connected work rather than treating reception as an isolated activity.",
          dg(
            "End-to-end accountability",
            D.flow([
              "Arrival|trigger",
              "Reservation|verified",
              "Room|confirmed",
              "Guest|settled"
            ]),
            "The process owner considers the complete outcome rather than one department's contribution."
          )],

        ["Now notice the important difference between being responsible for an activity and being accountable for a process.",
          null],

        ["Employees and departmental managers remain responsible for performing their assigned work accurately and reliably.",
          null],

        ["The process owner is accountable for whether the connected process delivers its intended outcome across those contributions.",
          [
            cmp(
              "a",
              "Functional responsibility",
              "Manage the work performed within a department."
            ),
            cmp(
              "b",
              "Process accountability",
              "Ensure the complete process delivers its intended outcome."
            )
          ]],

        ["This distinction matters because an organisation can have excellent departmental managers while still delivering a disappointing customer experience.",
          null],

        ["A process owner should therefore have sufficient authority to coordinate improvements affecting several functions.",
          null],

        ["Authority means having recognised decision rights and access to the people needed to influence the process.",
          st(
            "Accountability requires sufficient authority to influence the complete process."
          )],

        ["Imagine Qasr appointing an arrival process owner but refusing that person any influence over reservations or housekeeping.",
          null],

        ["The title might look impressive on the architecture, yet the owner could not resolve the problems crossing departments.",
          iss(
            "A named process owner lacks authority over the changes needed to improve performance.",
            "Accountability without authority"
          )],

        ["That would create responsibility on paper without providing the practical means to deliver better results.",
          null],

        ["A credible ownership arrangement must therefore clarify decision rights, escalation routes, and relationships with functional managers.",
          null],

        ["An escalation route explains how unresolved disagreements reach someone with the authority to make a decision.",
          dg(
            "Coordinating across functions",
            D.org("process", {
              depts: [
                "Reception",
                "Revenue",
                "House-|keeping",
                "Finance"
              ],
              top: "Process governance",
              from: "Arrival begins",
              to: "Arrival complete"
            }),
            "Cross-functional governance supports decisions that individual departments cannot resolve alone."
          )],

        ["This does not mean the process owner personally performs every activity or replaces the existing departmental managers.",
          null],

        ["Instead, the owner coordinates performance, improvement priorities, and decisions affecting the process as a whole.",
          null],

        ["Functional managers continue managing their people and resources while contributing to agreed process outcomes.",
          st(
            "Process ownership complements functional management rather than replacing it."
          )],

        ["Now imagine Qasr's fourteen properties disagreeing about whether one arrival procedure should become the group standard.",
          null],

        ["A local manager might favour existing practices, while another property argues that a different approach performs better.",
          null],

        ["Without agreed ownership, that disagreement could remain unresolved or produce several incompatible versions of the process.",
          iss(
            "Unresolved disagreements allow inconsistent process versions to multiply.",
            "Fragmented governance"
          )],

        ["A recognised process owner can coordinate evidence, examine local requirements, and recommend decisions through the appropriate governance arrangements.",
          null],

        ["The owner should not assume every hotel must operate identically without considering justified local differences.",
          null],

        ["Instead, ownership creates a responsible way to decide what should be common and what genuinely requires variation.",
          q(
            "Who should decide when a local process variation is justified?"
          )],

        ["Ownership also supports maintenance because processes change as customer expectations, technology, and organisational requirements evolve.",
          null],

        ["Someone must ensure that approved changes are reflected in the architecture and its authoritative process descriptions.",
          null],

        ["Otherwise, Qasr could create a useful map today and discover that nobody trusts it next year.",
          null],

        ["So when you examine a process architecture, do not stop after finding a person's name beside each process.",
          null],

        ["Ask whether that person has the authority, relationships, and governance support needed to influence the complete outcome.",
          st(
            "Effective ownership combines accountability, decision rights, coordination, and ongoing maintenance."
          )],

        ["Our architecture is becoming more useful, but it still needs shared conventions that keep its descriptions consistent.",
          null],

        ["Let's explore how Qasr can prevent its process repository from becoming another collection of conflicting diagrams.",
          null]

      ],

      review: [

        // -----------------------------------------------------
        // W6O2b REMEDIAL 1
        // New angle: a parcel delivery company
        // -----------------------------------------------------

        {
          title: "A parcel that belongs to nobody",
          lines: [

            ["Let's understand process ownership through a parcel delivery company, where one customer's experience depends on several operational teams.",
              t(
                "Understanding process ownership",
                "The customer experiences one delivery, even when many departments contribute."
              )],

            ["Imagine ordering an important document that must arrive before a meeting scheduled for the following morning.",
              null],

            ["The collection team receives the parcel, sorting staff process it, and a driver completes the delivery.",
              dg(
                "One delivery, several teams",
                D.flow([
                  "Parcel|collected",
                  "Parcel|sorted",
                  "Parcel|transported",
                  "Parcel|delivered"
                ]),
                "Several teams contribute to the complete delivery process."
              )],

            ["Now suppose the parcel arrives late because information was lost between sorting and transportation.",
              null],

            ["The sorting manager claims the parcel left the facility correctly, while transportation reports receiving incomplete instructions.",
              null],

            ["Both teams might have followed their internal procedures without delivering the outcome the customer expected.",
              iss(
                "Departmental compliance does not guarantee successful end-to-end delivery.",
                "The customer's problem remains"
              )],

            ["A process owner considers the entire delivery journey rather than defending the performance of one department.",
              null],

            ["That person is accountable for understanding failures, coordinating improvements, and ensuring the complete process delivers its outcome.",
              st(
                "Process ownership means accountability for the complete outcome across functional boundaries."
              )],

            ["Notice that the owner does not need to collect, sort, transport, and deliver every parcel personally.",
              null],

            ["Employees and departmental managers remain responsible for performing the activities assigned to their respective teams.",
              null],

            ["The process owner coordinates how those activities fit together and how problems crossing departments are resolved.",
              null],

            ["But imagine appointing someone as delivery process owner without allowing that person to influence sorting or transportation.",
              iss(
                "A process owner cannot coordinate improvements without appropriate decision rights.",
                "A title without authority"
              )],

            ["The title would provide accountability without the authority required to change the conditions causing poor performance.",
              null],

            ["Effective ownership therefore requires recognised decision rights and an agreed route for escalating unresolved disagreements.",
              null],

            ["An escalation route identifies who can make a decision when the people involved cannot reach agreement.",
              null],

            ["Now return to Qasr, where reservations, reception, and housekeeping contribute to the guest arrival experience.",
              dg(
                "Qasr's connected arrival process",
                D.org("process", {
                  depts: [
                    "Revenue",
                    "Reception",
                    "House-|keeping",
                    "Finance"
                  ]
                }),
                "The guest arrival process crosses departmental boundaries."
              )],

            ["The same ownership challenge appears whenever those departments disagree about responsibilities or proposed changes.",
              null],

            ["A credible owner coordinates the complete process while functional managers continue managing their own teams.",
              null],

            ["That arrangement makes it possible to improve the customer's experience without dismantling the organisational structure.",
              q(
                "What must a process owner possess besides a formal title?"
              )],

            ["The answer is sufficient authority, clear accountability, and the relationships needed to coordinate decisions across functions.",
              null],

            ["Those conditions turn process ownership from an organisational label into a practical management responsibility.",
              null]

          ]
        },

        // -----------------------------------------------------
        // W6O2b REMEDIAL 2
        // New angle: university student enrolment
        // -----------------------------------------------------

        {
          title: "The student nobody could enrol",
          lines: [

            ["Let's examine process ownership through university enrolment, where several departments contribute to one student's ability to begin learning.",
              t(
                "Ownership across boundaries",
                "One student outcome depends on several administrative and academic services."
              )],

            ["Imagine a postgraduate student who has accepted an admission offer and paid the required tuition fees.",
              null],

            ["The student expects registration to be completed and access to the learning platform to become available.",
              null],

            ["Admissions has processed the offer, finance has recorded payment, and academic services manages course access.",
              dg(
                "A connected enrolment journey",
                D.flow([
                  "Offer|accepted",
                  "Payment|confirmed",
                  "Registration|completed",
                  "Learning|access"
                ]),
                "The student's outcome depends on several connected processes."
              )],

            ["Unfortunately, the student cannot enter the learning environment because the registration record has not been updated.",
              null],

            ["Each department insists that its own responsibilities have been completed according to the established procedure.",
              null],

            ["The student remains unable to study, demonstrating that departmental performance does not guarantee a successful complete journey.",
              iss(
                "Every department reports compliance, but the student still cannot begin learning.",
                "End-to-end failure"
              )],

            ["A process owner would examine the complete enrolment journey and coordinate the resolution of problems crossing departmental boundaries.",
              null],

            ["The owner is accountable for the overall outcome rather than one narrow administrative activity.",
              st(
                "End-to-end ownership focuses on the complete result experienced by the service recipient."
              )],

            ["However, ownership cannot work if the appointed person lacks the authority to influence the departments involved.",
              null],

            ["Imagine asking someone to improve enrolment while denying access to registration decisions and system change discussions.",
              null],

            ["That person would carry responsibility without having the practical ability to correct recurring problems.",
              [
                cmp(
                  "a",
                  "Nominal ownership",
                  "A person is named but cannot influence decisions."
                ),
                cmp(
                  "b",
                  "Effective ownership",
                  "A person can coordinate decisions and resolve cross-functional problems."
                )
              ]],

            ["Effective ownership therefore requires agreed decision rights and a recognised process for resolving disagreements.",
              null],

            ["It also requires cooperation with departmental managers who remain responsible for their employees and resources.",
              null],

            ["The process owner does not replace those managers or perform every operational activity personally.",
              null],

            ["Instead, the owner coordinates how their contributions combine to produce the student's intended outcome.",
              null],

            ["The same principle applies when Qasr's revenue, reception, and housekeeping teams contribute to guest arrival.",
              null],

            ["An arrival process owner must consider the complete guest experience rather than the performance of reception alone.",
              q(
                "Why is departmental responsibility insufficient for managing a cross-functional process?"
              )],

            ["Because the customer experiences the combined result, somebody must remain accountable for the relationships between departments.",
              null],

            ["A credible architecture identifies that accountability and supports it with appropriate authority and governance arrangements.",
              null],

            ["That is what makes process ownership a management mechanism rather than simply another name on a diagram.",
              null]

          ]
        }

      ]
    },

    // =========================================================
    // W6O2c — STRUCTURE FIRST, DETAIL SECOND
    // =========================================================

    {
      title: "Structure first, detail second — conventions and authoritative versions",
      sec: "W6O2c",

      lines: [

        ["Our Qasr architecture now has meaningful levels and accountable owners, but one final foundation is still missing.",
          t(
            "Building an architecture that works",
            "Structure first, detail second — conventions and authoritative versions"
          )],

        ["The team must agree how processes will be named, described, approved, and maintained across the fourteen properties.",
          null],

        ["Without those agreements, even a carefully designed architecture can gradually become another confusing collection of incompatible diagrams.",
          iss(
            "Inconsistent descriptions undermine the usefulness of the architecture.",
            "A structure without shared rules"
          )],

        ["Imagine asking analysts from different hotels to document the same guest arrival process without providing common modelling conventions.",
          null],

        ["One analyst might describe every employee action, while another records only the major stages of the guest journey.",
          null],

        ["A third might use departmental names as process titles, making the diagrams difficult to compare.",
          q(
            "How can Qasr compare process descriptions created using different rules?"
          )],

        ["A modelling convention is an agreed rule governing how processes are named, represented, classified, and described.",
          st(
            "Modelling conventions establish consistent rules for describing organisational processes."
          )],

        ["These conventions matter because the architecture must remain understandable even when different people produce its individual models.",
          null],

        ["For example, Qasr might agree that process names should describe actions and outcomes rather than departmental labels.",
          [
            cmp(
              "a",
              "Departmental label",
              "Reception administration"
            ),
            cmp(
              "b",
              "Process-oriented name",
              "Manage guest arrival"
            )
          ]],

        ["The second name is more useful because it identifies the work being managed rather than the department performing it.",
          null],

        ["That distinction helps managers recognise processes crossing organisational boundaries instead of reproducing the existing departmental structure.",
          null],

        ["Qasr also needs conventions for process boundaries, meaning the agreed starting and ending points of a process.",
          st(
            "A process boundary identifies where the process begins and where its intended outcome is completed."
          )],

        ["Consider whether guest arrival begins when a reservation is made or when the guest reaches the property.",
          null],

        ["Both choices might support different modelling purposes, but they describe different amounts of work.",
          null],

        ["Unless Qasr agrees which boundary applies, its analysts may produce diagrams that appear contradictory without describing equivalent processes.",
          dg(
            "Different possible boundaries",
            D.flow(
              [
                "Reservation|created",
                "Guest|arrives",
                "Booking|verified",
                "Guest|settled"
              ],
              {
                bracket: [1, 3, "Guest arrival boundary"]
              }
            ),
            "Agreed boundaries clarify which activities belong within a particular process."
          )],

        ["Shared boundaries also help identify handoffs, where work or information passes between processes or organisational functions.",
          null],

        ["A handoff matters because missing or delayed information can interrupt the customer's journey even when individual activities work correctly.",
          dg(
            "Handoffs across departments",
            D.lanes(
              ["Revenue", "Reception", "Housekeeping"],
              [
                [0, "Confirm|booking"],
                [1, "Check|arrival"],
                [2, "Confirm|room"],
                [1, "Complete|arrival"]
              ]
            ),
            "The diagram makes transfers of work and information between departments visible."
          )],

        ["Now imagine the team agreeing its naming conventions and process boundaries before producing hundreds of detailed models.",
          null],

        ["That preparation makes later documentation easier to compare because every analyst works within the same architectural structure.",
          null],

        ["It also reduces unnecessary rework, since inconsistent descriptions can be corrected before they spread across the repository.",
          st(
            "Agreeing the structure early prevents inconsistent documentation from multiplying."
          )],

        ["But consistent names and diagrams are not enough if nobody knows which process description is officially recognised.",
          null],

        ["Qasr may discover several versions of a guest arrival model, each describing a different way of performing similar work.",
          iss(
            "Several process models exist, but their authority is unclear.",
            "Competing versions"
          )],

        ["Some differences might reflect legitimate local requirements, while others could result from outdated information or inconsistent modelling.",
          null],

        ["The team must therefore distinguish genuine operational variation from disagreements about documentation.",
          null],

        ["An authoritative version is the officially recognised description that employees and managers should use for a defined purpose.",
          st(
            "An authoritative version is the approved process description used as the recognised reference."
          )],

        ["Authority does not mean assuming that one hotel's procedure must automatically replace every other property's practices.",
          null],

        ["Instead, the organisation must establish which common rules apply and where justified local variations are permitted.",
          [
            cmp(
              "a",
              "Common architecture",
              "Shared process structure and agreed conventions."
            ),
            cmp(
              "b",
              "Justified local variation",
              "Approved differences supported by genuine operational requirements."
            )
          ]],

        ["That distinction is particularly important for Qasr because its properties may operate under different physical and service conditions.",
          null],

        ["A useful architecture provides consistency without pretending that every operational situation must be identical.",
          null],

        ["Process owners and governance arrangements should determine how descriptions are approved, updated, and withdrawn when they become obsolete.",
          dg(
            "Maintaining authoritative descriptions",
            D.flow([
              "Draft|model",
              "Review|evidence",
              "Approve|version",
              "Maintain|record"
            ]),
            "A controlled process ensures that approved descriptions remain dependable as organisational work changes."
          )],

        ["Otherwise, employees may continue following outdated instructions even after managers have approved a different way of working.",
          null],

        ["The architecture would then lose credibility because its documented structure no longer reflects recognised organisational practice.",
          iss(
            "Outdated process descriptions weaken confidence in the architecture.",
            "The map no longer reflects reality"
          )],

        ["This is why architecture must be maintained as an ongoing management resource rather than completed as a temporary documentation project.",
          null],

        ["The aim is not to create the largest possible repository, but to establish a dependable structure supporting decisions.",
          null],

        ["Now imagine the Qasr team opening its collection of guest arrival diagrams after agreeing these architectural foundations.",
          null],

        ["The analysts can examine equivalent processes, identify disputed versions, and investigate whether local differences are justified.",
          q(
            "Which differences reflect real operational needs, and which reflect inconsistent documentation?"
          )],

        ["That investigation is more useful than simply combining diagrams because it begins with evidence and agreed architectural rules.",
          null],

        ["The team can now move from collecting descriptions toward making defensible decisions about the group's process landscape.",
          null],

        ["In our next lesson, Qasr's fourteen properties will reveal why that distinction becomes difficult in practice.",
          null],

        ["You'll help the team examine conflicting arrival models without assuming that another diagram will automatically solve the problem.",
          null]

      ],

      review: [

        // -----------------------------------------------------
        // W6O2c REMEDIAL 1
        // New angle: a recipe collection
        // -----------------------------------------------------

        {
          title: "A kitchen with twelve versions of the same recipe",
          lines: [

            ["Let's understand architectural conventions through a restaurant group that has collected many recipes from its different kitchens.",
              t(
                "Why conventions matter",
                "A shared recipe collection needs agreed names, boundaries, and approved versions."
              )],

            ["Imagine several chefs documenting the same signature dish using their own preferred terminology and level of detail.",
              null],

            ["One chef records ingredients and cooking stages, while another includes purchasing arrangements and detailed cleaning instructions.",
              null],

            ["A different chef uses a familiar local nickname that other kitchens do not recognise.",
              iss(
                "Different descriptions make equivalent work difficult to identify and compare.",
                "Inconsistent documentation"
              )],

            ["Every description might contain useful information, but the collection becomes difficult to manage without shared conventions.",
              null],

            ["A convention is an agreed rule that helps different people describe similar work consistently.",
              st(
                "Shared conventions make independently created descriptions understandable and comparable."
              )],

            ["The restaurant group might agree how dishes are named, where each recipe begins, and what information must be recorded.",
              null],

            ["Those rules would allow chefs to compare equivalent recipes without confusing different levels of preparation detail.",
              null],

            ["Now imagine discovering several versions of the same recipe, each claiming to represent the approved preparation method.",
              null],

            ["The kitchens need to know which version should guide their work and who can approve changes.",
              dg(
                "A controlled recipe record",
                D.flow([
                  "Recipe|drafted",
                  "Method|reviewed",
                  "Version|approved",
                  "Record|maintained"
                ]),
                "A recognised approval process establishes which description should be used."
              )],

            ["The approved version becomes authoritative because it is recognised as the dependable reference for a defined purpose.",
              null],

            ["But imagine one kitchen using different equipment that genuinely requires a small adjustment to the preparation method.",
              null],

            ["The group should examine that difference rather than automatically treating every variation as an error.",
              null],

            ["An approved local variation can preserve necessary flexibility while maintaining a consistent overall structure.",
              [
                cmp(
                  "a",
                  "Shared standard",
                  "Common preparation principles and agreed descriptions."
                ),
                cmp(
                  "b",
                  "Approved variation",
                  "A justified difference required by local conditions."
                )
              ]],

            ["Qasr faces a similar problem when its fourteen properties describe guest arrival using different names and modelling approaches.",
              null],

            ["Some differences may reflect genuine operational requirements, while others may arise from inconsistent or outdated documentation.",
              null],

            ["The team needs common conventions before deciding which differences are meaningful.",
              null],

            ["It also needs process owners who can approve descriptions and maintain their authority over time.",
              q(
                "Why should Qasr establish common rules before producing more detailed process models?"
              )],

            ["Without those rules, additional documentation may increase confusion rather than improve organisational understanding.",
              null],

            ["A dependable architecture makes process descriptions comparable, authoritative, and useful for management decisions.",
              null],

            ["That is why the structure should be agreed before detailed modelling expands across the organisation.",
              null]

          ]
        },

        // -----------------------------------------------------
        // W6O2c REMEDIAL 2
        // New angle: an engineering drawing repository
        // -----------------------------------------------------

        {
          title: "The drawing nobody knew was current",
          lines: [

            ["Let's examine authoritative versions through an engineering company responsible for maintaining equipment across several industrial facilities.",
              t(
                "Keeping process descriptions dependable",
                "A technical drawing is useful only when people know which version is approved."
              )],

            ["Imagine an engineer preparing maintenance work using a drawing retrieved from the company's shared document repository.",
              null],

            ["The drawing appears detailed and professional, but the engineer cannot determine when it was last approved.",
              null],

            ["Another department has a different drawing that appears to describe the same equipment.",
              iss(
                "Two conflicting drawings exist without a clearly recognised authoritative version.",
                "Uncertain information"
              )],

            ["The problem is not simply that the company lacks documentation, because both drawings may contain extensive technical detail.",
              null],

            ["The problem is that employees cannot confidently identify which description should guide their decisions.",
              null],

            ["An authoritative version is the officially recognised reference that should be used for its intended purpose.",
              st(
                "An authoritative version gives employees a dependable reference for making decisions."
              )],

            ["The engineering company therefore needs rules for naming drawings, recording revisions, and approving changes.",
              null],

            ["Those rules are conventions because they establish a consistent way to create and manage information.",
              null],

            ["A revision records a change to an existing description, allowing people to understand how the approved information has evolved.",
              null],

            ["Now imagine an engineer proposing an equipment modification that affects maintenance procedures at several facilities.",
              null],

            ["The company needs a recognised owner to review the proposal and determine which records must change.",
              dg(
                "Managing approved information",
                D.flow([
                  "Change|proposed",
                  "Impact|reviewed",
                  "Revision|approved",
                  "Records|updated"
                ]),
                "Controlled revisions help ensure that approved information remains consistent."
              )],

            ["Without ownership, different facilities might adopt incompatible descriptions even when the underlying equipment is identical.",
              null],

            ["But the company must also recognise genuine equipment differences rather than imposing one drawing on every facility.",
              null],

            ["A local variation may be justified when a facility operates equipment with different technical requirements.",
              [
                cmp(
                  "a",
                  "Uncontrolled difference",
                  "Conflicting records without an agreed explanation."
                ),
                cmp(
                  "b",
                  "Justified variation",
                  "An approved difference supported by actual operating conditions."
                )
              ]],

            ["The important distinction is whether differences have been investigated, explained, and approved through appropriate governance.",
              null],

            ["Qasr faces the same challenge when different hotels maintain conflicting descriptions of guest arrival.",
              null],

            ["The team cannot assume every variation is wrong, but it also cannot treat every document as equally authoritative.",
              null],

            ["Common naming rules, agreed process boundaries, and recognised owners make those decisions more dependable.",
              q(
                "What makes an approved process description more trustworthy than an uncontrolled document?"
              )],

            ["Its authority comes from evidence, agreed conventions, recognised approval, and responsibility for keeping the description current.",
              null],

            ["Those foundations help Qasr create a living architecture rather than a repository that gradually becomes obsolete.",
              null],

            ["The purpose is dependable management information, not simply producing more diagrams for the organisation to store.",
              null]

          ]
        }

      ]
    }

  ]
},
// W06-course-l3
{
  id: "l3",
  title: "Fourteen hotels, eleven different answers",

  sections: [

    // =========================================================
    // W6O3a — WHICH ONE IS THE PROCESS?
    // =========================================================

    {
      title: "Which one is the process? — Qasr's conflicting models",
      sec: "W6O3a",

      lines: [

        ["Welcome back to Qasr Hospitality, where our architecture team is finally ready to examine the evidence collected across the properties.",
          t(
            "Lesson 3 · Fourteen hotels, eleven different answers",
            "Which one is the process?"
          )],

        ["You already understand why we need agreed process levels, accountable owners, and consistent rules before detailed modelling begins.",
          null],

        ["Now we discover what happens when an improvement programme begins collecting diagrams without establishing those foundations.",
          st(
            "Qasr Hospitality Group",
            "Fourteen properties · Eleven documented arrival models"
          )],

        ["Qasr operates fourteen properties, and its programme has produced eleven documented versions of the guest arrival process.",
          null],

        ["That sounds like substantial progress until we examine where those models came from and whether anyone trusts them.",
          q(
            "Do eleven documented processes mean Qasr understands how guest arrival actually works?"
          )],

        ["Exhibit Six separates the models by property group, origin, factual disputes, and whether an owner has been named.",
          null],

        ["The Marina and Corniche properties account for two models, both prepared by their own property teams.",
          dg(
            "Exhibit 6 · Marina and Corniche",
            D.flow([
              "2 models",
              "Property|teams",
              "0 factual|disputes",
              "Front office|manager"
            ]),
            "Marina and Corniche: two property-team models, zero factual disputes, and a named front office manager."
          )],

        ["Neither model has been disputed on factual grounds, and the front office manager is identified as owner.",
          null],

        ["That makes their documentation a useful starting point, although ownership still needs an effective cross-functional mandate.",
          null],

        ["The Old Town and two Heritage properties have three models prepared by the programme analysts.",
          dg(
            "Exhibit 6 · Old Town and Heritage",
            D.flow([
              "3 models",
              "Programme|analysts",
              "2 factual|disputes",
              "!No named|owner"
            ]),
            "Old Town and Heritage: three analyst models, two factually disputed, with no named owner."
          )],

        ["Two of those three models have been disputed on points of fact, and none has a named owner.",
          null],

        ["The Desert Ridge and three Oasis properties account for four analyst models, with three disputed on factual grounds.",
          dg(
            "Exhibit 6 · Desert Ridge and Oasis",
            D.flow([
              "4 models",
              "Programme|analysts",
              "3 factual|disputes",
              "!No named|owner"
            ]),
            "Desert Ridge and Oasis: four analyst models, three factually disputed, with no named owner."
          )],

        ["The Airport and City group contributes two more analyst models, including one factual dispute and no named owner.",
          null],

        ["The remaining three properties have no documented arrival model, which means the repository does not cover every property.",
          dg(
            "Exhibit 6 · Remaining coverage",
            D.flow([
              "Airport and|City: 2",
              "1 factual|dispute",
              "Remaining|properties: 3",
              "!0 models"
            ]),
            "Airport and City have two analyst models, one disputed; the remaining three properties have no models."
          )],

        ["Notice how the totals fit together: two property-team models and nine analyst models produce eleven documented versions.",
          null],

        ["The analyst models were based on the group's standard operating manual, last revised four years ago.",
          iss(
            "Nine models were prepared using a manual last revised four years ago.",
            "Documentation may not reflect current practice"
          )],

        ["When property teams examined those analyst models, six were disputed because their descriptions did not match operational facts.",
          null],

        ["Six disputed models out of nine analyst-produced models represent two-thirds of that particular group.",
          st(
            "6 of 9 analyst models disputed",
            "Two-thirds of the analyst-produced descriptions were challenged on factual grounds."
          )],

        ["That ratio does not prove every disputed model is completely wrong, but it raises serious concerns about reliability.",
          null],

        ["It also warns us against treating an old manual as sufficient evidence of how employees currently work.",
          null],

        ["A process model should describe a defined process accurately enough to support the decision managers intend to make.",
          q(
            "What happens when an improvement programme redesigns work using descriptions that employees dispute?"
          )],

        ["The programme could invest in changing activities that no longer exist or misunderstand important local operating conditions.",
          null],

        ["Now consider the repository itself, which contains no field identifying which version is authoritative.",
          iss(
            "The repository cannot identify which documented version should guide redesign.",
            "No authoritative-version rule"
          )],

        ["Authoritative means officially recognised as the dependable description for a particular process and its approved variations.",
          null],

        ["Without that designation, managers cannot confidently select the description on which their redesign decisions should depend.",
          null],

        ["The lead analyst has proposed drawing a twelfth model that combines the existing eleven descriptions.",
          [
            cmp(
              "a",
              "Proposed response",
              "Combine eleven descriptions into a twelfth model."
            ),
            cmp(
              "b",
              "Unresolved problem",
              "The original descriptions remain disputed and lack agreed authority."
            )
          ]],

        ["I want you to pause here, because combining uncertain descriptions does not automatically produce a trustworthy account.",
          null],

        ["A new diagram could reproduce factual errors while concealing genuine differences between the properties.",
          null],

        ["A better response begins by agreeing the process boundary and checking descriptions against current operational evidence.",
          dg(
            "A more defensible investigation",
            D.flow([
              "Agree|boundary",
              "Verify|practice",
              "Resolve|disputes",
              "Approve|versions"
            ]),
            "The team should establish comparable boundaries, verify current practice, and resolve disputes before approving models."
          )],

        ["The team must also identify accountable owners who can approve descriptions and resolve disagreements across departments.",
          null],

        ["Only then can it distinguish common process requirements from local variations that deserve explicit recognition.",
          null],

        ["The lesson is not that documenting processes is pointless, because accurate documentation remains essential for improvement.",
          null],

        ["The lesson is that documentation without architecture can multiply uncertainty instead of producing dependable management knowledge.",
          st(
            "More models do not necessarily mean better process understanding."
          )],

        ["Let's now examine Qasr's local differences and decide which ones might deserve standardisation or formal permission.",
          null]

      ],

      review: [

        // -----------------------------------------------------
        // W6O3a REMEDIAL 1
        // New angle: a railway maintenance programme
        // -----------------------------------------------------

        {
          title: "The railway manuals nobody could trust",

          lines: [

            ["Let's revisit Qasr's documentation problem through a railway company preparing to modernise its maintenance operations.",
              t(
                "Understanding unreliable documentation",
                "A large collection of models is not necessarily a reliable description of current work."
              )],

            ["Imagine several railway depots submitting maintenance diagrams to a central improvement team responsible for standardising procedures.",
              null],

            ["Some diagrams come directly from depot engineers, while others are reconstructed using an old company maintenance manual.",
              null],

            ["The central team proudly reports that its repository now contains many detailed descriptions of maintenance activities.",
              st(
                "Documentation volume does not establish factual reliability."
              )],

            ["But when experienced depot employees examine those descriptions, they discover that several procedures no longer reflect current practice.",
              null],

            ["Some equipment has changed, and certain activities are now performed differently from the manual's original instructions.",
              iss(
                "Old reference material produces descriptions that conflict with current operational practice.",
                "Unverified documentation"
              )],

            ["The improvement team now faces a choice between creating another combined diagram and investigating the disputed descriptions.",
              null],

            ["Combining inaccurate diagrams might produce a more attractive picture without correcting the underlying factual problems.",
              null],

            ["A dependable approach would compare the models against current work and establish which descriptions are authoritative.",
              dg(
                "Checking current practice",
                D.flow([
                  "Existing|description",
                  "Operational|evidence",
                  "Disputes|resolved",
                  "Approved|model"
                ]),
                "Current operational evidence must inform the approval of process descriptions."
              )],

            ["Authoritative means officially recognised as the description employees and managers should rely upon for a defined purpose.",
              null],

            ["The company also needs owners who can approve changes and resolve disagreements between maintenance teams.",
              null],

            ["Without that accountability, conflicting versions may continue circulating even after a revised diagram has been published.",
              null],

            ["Now return to Qasr, where eleven documented arrival models have been produced across fourteen hotel properties.",
              null],

            ["Two models came from property teams, while nine were prepared by analysts using a four-year-old manual.",
              null],

            ["Six of those nine analyst models were disputed on factual grounds when the property teams examined them.",
              st(
                "6 disputed analyst models out of 9",
                "Two-thirds of the analyst-produced models were challenged on factual grounds."
              )],

            ["That evidence should make you question whether producing another model would resolve the programme's actual problem.",
              null],

            ["The missing foundations include verified descriptions, agreed process boundaries, authoritative versions, and accountable ownership.",
              null],

            ["The remaining three Qasr properties also lack documented models, so the repository is not yet complete.",
              q(
                "Why should Qasr verify existing descriptions before producing another combined model?"
              )],

            ["Because a new model built from unreliable information can reproduce errors rather than improve understanding.",
              null],

            ["A useful architecture helps managers establish what is known, what remains disputed, and who can approve decisions.",
              null],

            ["That makes the evidence dependable enough to support later improvement rather than simply increasing documentation volume.",
              null]

          ]
        },

        // -----------------------------------------------------
        // W6O3a REMEDIAL 2
        // New angle: a hospital patient-transfer project
        // -----------------------------------------------------

        {
          title: "Eleven diagrams and no dependable patient journey",

          lines: [

            ["Let's explore the same problem through a hospital group trying to improve how patients move between clinical departments.",
              t(
                "Models versus evidence",
                "An improvement programme must distinguish documented assumptions from verified operational practice."
              )],

            ["Imagine the programme collecting patient-transfer diagrams from hospitals operating under the same healthcare organisation.",
              null],

            ["Several diagrams are prepared by analysts using an old procedure manual rather than observing current clinical practice.",
              null],

            ["When nurses and doctors examine the models, they challenge important details about how transfers actually happen.",
              iss(
                "Operational staff dispute descriptions produced from outdated reference material.",
                "The evidence is unreliable"
              )],

            ["The programme leader suggests merging the diagrams into one comprehensive model covering every documented activity.",
              null],

            ["That proposal sounds efficient because it promises one picture instead of several conflicting descriptions.",
              null],

            ["But merging descriptions does not establish whether the activities are accurate or appropriate for every hospital.",
              st(
                "Combining disputed descriptions does not resolve factual disagreements."
              )],

            ["A more defensible approach would begin by defining what the patient-transfer process includes and excludes.",
              null],

            ["Those boundaries matter because different diagrams may describe different amounts of work rather than genuinely different procedures.",
              null],

            ["The team would then verify current practices with the people responsible for performing the work.",
              dg(
                "From disputed models to dependable evidence",
                D.flow([
                  "Define|scope",
                  "Check|practice",
                  "Explain|differences",
                  "Approve|reference"
                ]),
                "A reliable process description requires agreed scope and verification against current practice."
              )],

            ["The programme should also distinguish legitimate clinical differences from inconsistencies caused by poor documentation.",
              null],

            ["An accountable owner would help resolve disputes and establish which approved description should guide future decisions.",
              null],

            ["Now consider Qasr's eleven guest arrival models, where the same reliability problem appears across hotel properties.",
              null],

            ["Nine models were drawn by programme analysts using a manual that had not been revised for four years.",
              null],

            ["Six of those nine models were disputed on factual grounds, making uncritical reliance on them difficult to defend.",
              null],

            ["The repository also lacks an authoritative-version field, so managers cannot identify an officially recognised reference.",
              iss(
                "The repository contains competing descriptions without a clear rule for selecting the authoritative version.",
                "Uncertain decision foundations"
              )],

            ["The proposed twelfth model would not automatically correct those weaknesses because its source descriptions remain uncertain.",
              null],

            ["Qasr needs evidence, ownership, agreed boundaries, and approval rules before choosing which models should guide redesign.",
              q(
                "What should managers establish before trusting a process model as the basis for improvement?"
              )],

            ["They need a verified description, a defined scope, and an accountable authority responsible for approving its use.",
              null],

            ["That is how architecture turns a collection of documents into information managers can confidently use.",
              null]

          ]
        }

      ]
    },

    // =========================================================
    // W6O3b — ONE STANDARD OR FOURTEEN VARIANTS?
    // =========================================================

    {
      title: "One standard or fourteen variants? — evidence, granularity and local differences",
      sec: "W6O3b",

      lines: [

        ["We have established why Qasr cannot simply combine its eleven arrival models and declare the documentation problem solved.",
          t(
            "Lesson 3 · Making sense of variation",
            "One standard or fourteen variants?"
          )],

        ["Now let's examine the operational differences that make standardisation a genuine management decision rather than a drawing exercise.",
          null],

        ["Standardisation means establishing an agreed way of performing comparable work so unnecessary differences do not create additional costs.",
          st(
            "Standardisation",
            "An agreed approach to comparable work, with unnecessary variation reduced."
          )],

        ["A variant is an approved difference from that standard, retained because a particular operating situation genuinely requires it.",
          null],

        ["The important question is whether variation creates meaningful value or merely reflects habits that nobody has challenged.",
          q(
            "Which differences should Qasr remove, and which should it deliberately preserve?"
          )],

        ["At Qasr Marina, guest arrival includes corporate rate verification performed by the revenue office.",
          null],

        ["At Old Town, the front-desk agent performs that verification because the heritage property has no back office.",
          dg(
            "The same requirement, different responsibility",
            D.lanes(
              ["Revenue", "Front desk"],
              [
                [0, "Marina|rate check"],
                [1, "Marina|arrival"],
                [1, "Old Town|rate check"],
                [1, "Old Town|arrival"]
              ]
            ),
            "Marina uses the revenue office, while Old Town assigns corporate rate verification to the front desk."
          )],

        ["Both properties may be pursuing the same control objective, even though different employees perform the verification.",
          null],

        ["That distinction matters because identical outcomes do not always require identical departmental arrangements.",
          st(
            "A shared process outcome can be delivered through different operational arrangements."
          )],

        ["Old Town's building constraints provide a reason to investigate whether its arrangement should remain an approved local variant.",
          null],

        ["But we should still examine whether the alternative creates avoidable errors, delays, or inconsistent treatment of guests.",
          null],

        ["A justified difference needs evidence rather than an explanation based only on local preference or longstanding custom.",
          q(
            "Does Old Town's different arrangement reflect a genuine constraint or an unnecessary exception?"
          )],

        ["Now consider Desert Ridge, where leisure guests dominate and the corporate rate verification step does not appear.",
          null],

        ["That absence might reflect a different customer mix, but we should verify the underlying requirement before approving it.",
          iss(
            "A missing step may reflect genuine local conditions or an incomplete process description.",
            "The evidence must decide"
          )],

        ["A useful architecture does not assume that every missing activity represents either an error or an acceptable variation.",
          null],

        ["It asks what outcome the activity supports and whether the local process still achieves that outcome reliably.",
          null],

        ["The same reasoning applies to guest recognition, a step documented at three Qasr properties using different descriptions.",
          dg(
            "Guest recognition descriptions",
            D.flow([
              "Property|description A",
              "Property|description B",
              "Property|description C"
            ]),
            "Three properties document guest recognition differently; the case does not establish that the underlying work is equivalent."
          )],

        ["Those descriptions might represent different activities, different levels of detail, or different interpretations of the same service.",
          null],

        ["Until the team agrees what guest recognition means, comparing the diagrams could produce misleading conclusions.",
          null],

        ["This brings us back to granularity, which describes the amount of detail included in a process model.",
          st(
            "Agree the process level before comparing different models."
          )],

        ["One property might describe guest recognition as a broad service process, while another documents a particular reception activity.",
          null],

        ["Those models cannot be compared fairly until the team establishes equivalent boundaries and levels.",
          null],

        ["A process boundary identifies where the work begins and where its intended outcome has been achieved.",
          dg(
            "Comparing equivalent process levels",
            D.hier([
              ["Value chain", "Serve the guest"],
              ["Process", "Manage guest arrival"],
              ["Sub-process", "Recognise guest"],
              ["Activity", "Confirm preference"]
            ], 1),
            "A comparison is meaningful only when models describe equivalent process boundaries and levels."
          )],

        ["Now imagine Qasr approving a common arrival architecture while allowing documented differences supported by local conditions.",
          null],

        ["The shared architecture would establish process purpose, boundaries, ownership, and the outcomes each property must deliver.",
          null],

        ["An approved variant would record the specific difference and explain why the local arrangement is necessary.",
          [
            cmp(
              "a",
              "Common architecture",
              "Shared purpose, boundaries, ownership, and expected outcomes."
            ),
            cmp(
              "b",
              "Registered variant",
              "A documented local difference supported by an explicit reason."
            )
          ]],

        ["Registration matters because an undocumented exception can spread without anyone recognising that the organisation's standard is changing.",
          null],

        ["Across fourteen properties, those uncontrolled differences could eventually produce fourteen incompatible interpretations of one process.",
          iss(
            "Unregistered local exceptions can gradually fragment a shared process architecture.",
            "Uncontrolled variation"
          )],

        ["The organisation should therefore standardise where differences create costs without providing meaningful customer or operational benefits.",
          null],

        ["It should permit variation where regulation, scale, market conditions, or genuine physical constraints make identical arrangements inappropriate.",
          null],

        ["This is not a choice between absolute uniformity and unlimited local freedom, because both extremes create management problems.",
          [
            cmp(
              "a",
              "Forced uniformity",
              "Ignores justified differences in local operating conditions."
            ),
            cmp(
              "b",
              "Uncontrolled variation",
              "Allows unnecessary differences to multiply without accountability."
            )
          ]],

        ["A dependable architecture balances consistency with justified flexibility through evidence, ownership, and explicit approval.",
          null],

        ["The process owner should examine proposed variants and coordinate decisions affecting the wider guest arrival process.",
          null],

        ["That owner also needs sufficient authority to challenge arrangements inside departments beyond their direct management responsibility.",
          null],

        ["Otherwise, every property could defend its existing practices without anyone considering the group's complete process performance.",
          q(
            "Who should approve a local variation, and what evidence should support that decision?"
          )],

        ["Our Qasr team can now investigate differences without assuming that every hotel must copy Marina's operating arrangements.",
          null],

        ["The aim is an architecture that makes genuine variation visible while preventing avoidable complexity from accumulating unnoticed.",
          st(
            "Standardise unnecessary differences; register and justify necessary local variations."
          )],

        ["Next, we'll use these decisions to examine how Qasr can maintain its architecture and understand the consequences of change.",
          null]

      ],

      review: [

        // -----------------------------------------------------
        // W6O3b REMEDIAL 1
        // New angle: a regional pharmacy chain
        // -----------------------------------------------------

        {
          title: "One pharmacy standard, different local conditions",

          lines: [

            ["Let's understand standardisation through a regional pharmacy chain operating branches in locations with different customer needs.",
              t(
                "Standardisation and justified variation",
                "A common service standard can accommodate genuine local differences."
              )],

            ["Imagine the pharmacy group requiring every branch to verify prescriptions before dispensing medicines to customers.",
              null],

            ["The shared requirement protects customers because the organisation must provide accurate and dependable dispensing services.",
              st(
                "A common standard establishes the outcome every location must deliver."
              )],

            ["Now imagine a busy urban branch using a dedicated verification desk staffed by specialist employees.",
              null],

            ["A smaller rural branch might perform the same verification through a qualified employee working at its main counter.",
              null],

            ["The arrangements differ, but both branches may still achieve the same required control outcome.",
              [
                cmp(
                  "a",
                  "Urban branch",
                  "Verification performed at a dedicated desk."
                ),
                cmp(
                  "b",
                  "Rural branch",
                  "Verification performed at the main counter."
                )
              ]],

            ["The organisation should examine whether the different arrangement is justified by staffing, scale, and operational conditions.",
              null],

            ["If the smaller branch achieves the required outcome reliably, identical physical arrangements may offer little additional benefit.",
              null],

            ["But the group should not automatically accept every difference simply because employees have always worked that way.",
              null],

            ["An approved variant is a documented difference supported by a genuine reason and recognised through appropriate governance.",
              st(
                "A justified variant must be explained, approved, and linked to the common standard."
              )],

            ["Now imagine another branch omitting verification entirely because its manager considers the procedure inconvenient.",
              null],

            ["That difference would require careful examination because it could undermine the outcome the common standard protects.",
              iss(
                "A local exception may weaken the shared process outcome.",
                "Variation requires evidence"
              )],

            ["The organisation therefore needs to distinguish differences in how work is arranged from differences that compromise its purpose.",
              null],

            ["This is precisely the distinction facing Qasr's fourteen properties during the guest arrival investigation.",
              null],

            ["Marina uses the revenue office for corporate rate verification, while Old Town assigns the work to reception.",
              null],

            ["Old Town's lack of a back office provides a plausible reason for the alternative arrangement.",
              null],

            ["However, Qasr should verify that the local method delivers the required outcome before approving it.",
              q(
                "Does the local arrangement achieve the shared outcome without creating unnecessary risk or cost?"
              )],

            ["The architecture should record the common process and any justified differences rather than allowing undocumented exceptions to multiply.",
              null],

            ["A process owner with appropriate authority can coordinate those decisions across the properties.",
              null],

            ["The goal is consistency in what matters, supported by flexibility where local conditions genuinely require it.",
              null],

            ["That balance protects organisational coherence without pretending every location operates under identical circumstances.",
              null]

          ]
        },

        // -----------------------------------------------------
        // W6O3b REMEDIAL 2
        // New angle: a university assessment process
        // -----------------------------------------------------

        {
          title: "A common assessment standard with different teaching formats",

          lines: [

            ["Let's explore the same decision through a university offering comparable courses in classroom and online learning environments.",
              t(
                "One standard or several variants?",
                "Shared educational outcomes do not always require identical operational arrangements."
              )],

            ["Imagine the university requiring every course to assess whether students have achieved the approved learning outcomes.",
              null],

            ["That requirement should remain consistent because academic quality depends on credible evidence of student learning.",
              st(
                "The common standard defines the outcome that every course must achieve."
              )],

            ["A classroom course might assess students through supervised activities, while an online course uses an approved digital assessment method.",
              null],

            ["The delivery arrangements differ, but both methods may provide valid evidence of the intended learning outcomes.",
              [
                cmp(
                  "a",
                  "Classroom course",
                  "Learning is assessed through approved face-to-face arrangements."
                ),
                cmp(
                  "b",
                  "Online course",
                  "Learning is assessed through approved digital arrangements."
                )
              ]],

            ["The university should therefore evaluate the evidence produced rather than insisting that every course uses identical activities.",
              null],

            ["But imagine one department abandoning assessment moderation simply because its staff prefer a less demanding procedure.",
              null],

            ["That difference may undermine academic quality and would require stronger justification than local convenience.",
              iss(
                "A local preference can weaken the outcome protected by the common standard.",
                "Unjustified variation"
              )],

            ["Moderation means reviewing assessment decisions to support consistent academic standards and dependable judgements about student achievement.",
              null],

            ["The university needs an agreed process for approving any legitimate differences in how moderation is conducted.",
              null],

            ["An approved variant should record what differs, why the difference is necessary, and who authorised it.",
              dg(
                "Controlling local variations",
                D.flow([
                  "Common|standard",
                  "Local|need",
                  "Evidence|reviewed",
                  "Variant|approved"
                ]),
                "A local variation should be linked to the common standard and supported by an explicit reason."
              )],

            ["That record prevents local arrangements from becoming uncontrolled exceptions that gradually undermine the organisation's shared approach.",
              null],

            ["Now return to Qasr, where different hotels perform corporate rate verification through different departmental arrangements.",
              null],

            ["Marina uses the revenue office, while Old Town uses its front-desk agent because the property lacks a back office.",
              null],

            ["Qasr should investigate whether both arrangements deliver the required verification outcome accurately and reliably.",
              null],

            ["If the difference is justified, the architecture can recognise it as an approved local variant.",
              null],

            ["If the difference adds cost without providing operational or customer benefit, standardisation becomes more attractive.",
              q(
                "Does the difference protect a genuine local requirement or merely preserve an unnecessary habit?"
              )],

            ["The process owner must coordinate that decision and ensure the approved variation remains visible within the architecture.",
              null],

            ["The same principle applies to Desert Ridge and the disputed descriptions of guest recognition across Qasr properties.",
              null],

            ["The architecture should make differences understandable before managers decide which ones deserve to remain.",
              null],

            ["That is how an organisation achieves useful consistency without sacrificing necessary local flexibility.",
              null]

          ]
        }

      ]
    }

  ]
},
// END-BLOCK
// W06-course-l4
{
  id: "l4",
  title: "Making the architecture useful",

  sections: [

    // =========================================================
    // W6O3c — AN ARCHITECTURE THAT SURVIVES CHANGE
    // =========================================================

    {
      title: "An architecture that survives change — dependencies, decisions and governance",
      sec: "W6O3c",

      lines: [

        ["Welcome back to Qasr Hospitality, where our team has learned that agreeing a process architecture is only the beginning.",
          t(
            "Lesson 4 · Making the architecture useful",
            "An architecture that survives change"
          )],

        ["The real test comes when managers begin changing operations and discover that their decisions affect several connected processes.",
          null],

        ["Remember our traveller at Qasr Marina, whose arrival depended on reservations, revenue, reception, and housekeeping working together.",
          null],

        ["Now imagine Qasr proposing a new reservation platform intended to make booking confirmations faster and more reliable.",
          q(
            "What else might change when Qasr introduces a new reservation platform?"
          )],

        ["The proposal sounds attractive, but faster confirmations could change the information available to reception and other departments.",
          null],

        ["A process architecture helps managers examine those relationships before approving a change that appears beneficial in isolation.",
          st(
            "A useful architecture reveals which processes may be affected by a proposed change."
          )],

        ["We call these relationships dependencies, meaning that one process relies on information, resources, or outcomes from another.",
          null],

        ["For example, reception may depend on reservation information being accurate before an arriving guest can be checked in.",
          dg(
            "Connected hotel processes",
            D.flow([
              "Manage|reservations",
              "Prepare|arrival",
              "Complete|check-in",
              "Deliver|stay"
            ]),
            "Changes to reservation information can affect several connected guest-service processes."
          )],

        ["When managers change one process, they should consider how those dependencies might influence the results elsewhere.",
          null],

        ["The collection of potentially affected processes is sometimes called the change's blast radius.",
          st(
            "Blast radius",
            "The set of processes and relationships potentially affected by a proposed change."
          )],

        ["The expression comes from the idea that an apparently local change can have consequences beyond its immediate location.",
          null],

        ["In BPM, the aim is not to predict every possible consequence with certainty before making a decision.",
          null],

        ["Instead, managers use the architecture to identify plausible effects that deserve investigation before resources are committed.",
          null],

        ["Consider Qasr introducing a new rule for confirming corporate rates during the reservation process.",
          null],

        ["That decision might influence the revenue office, reception employees, billing arrangements, and the guest's final experience.",
          dg(
            "Possible effects of a rate-verification change",
            D.flow([
              "Corporate|rate rule",
              "Reservation|information",
              "Guest|arrival",
              "Billing|accuracy"
            ]),
            "A change in one process may affect the information and decisions used by connected processes."
          )],

        ["Without an architecture, each department might assess only its own responsibilities and overlook the wider consequences.",
          null],

        ["That creates the risk of improving one activity while making the complete customer journey less dependable.",
          iss(
            "A local improvement may create problems in connected processes.",
            "Unexamined dependencies"
          )],

        ["A useful architecture also helps Qasr recognise when separate improvement programmes are working on overlapping processes.",
          null],

        ["Imagine one programme redesigning reservation verification while another independently changes the same verification requirements during arrival.",
          null],

        ["Both teams might have reasonable objectives, yet their proposed changes could conflict when introduced together.",
          [
            cmp(
              "a",
              "Disconnected programmes",
              "Separate teams redesign overlapping work without coordination."
            ),
            cmp(
              "b",
              "Architecture-led coordination",
              "Teams examine shared processes and dependencies before approving changes."
            )
          ]],

        ["The architecture gives managers a common reference for identifying those overlaps and coordinating decisions before implementation.",
          null],

        ["But the map itself cannot resolve disagreements unless somebody has authority to act on what it reveals.",
          null],

        ["That brings us back to process ownership, which must extend across the complete flow rather than one department.",
          st(
            "Architecture needs governance",
            "Ownership and decision rights make the process map usable when departments disagree."
          )],

        ["Governance means the arrangements determining who makes decisions, who approves changes, and how disagreements are resolved.",
          null],

        ["At Qasr, a process owner should understand end-to-end performance and influence changes proposed by other departments.",
          null],

        ["The owner also needs an agreed way to escalate disputes when the affected managers cannot reach a decision.",
          null],

        ["Without those arrangements, an architecture may look convincing but fail during its earliest departmental disagreement.",
          iss(
            "A process owner cannot protect the complete flow without appropriate cross-functional authority.",
            "Governance without a mandate"
          )],

        ["Now imagine Qasr approving a justified local variation for a property operating under different physical constraints.",
          null],

        ["That variation should remain linked to the common process rather than becoming an undocumented alternative that nobody maintains.",
          null],

        ["A registered variant records what differs, why the difference exists, and which authority approved it.",
          dg(
            "Maintaining controlled variation",
            D.flow([
              "Common|process",
              "Local|requirement",
              "Approved|variant",
              "Ongoing|review"
            ]),
            "Approved variations remain connected to the shared architecture and subject to review."
          )],

        ["This matters because organisational conditions change, and a previously justified exception may eventually become unnecessary.",
          null],

        ["The process owner should therefore review whether the variation still supports the intended outcome without creating avoidable complexity.",
          null],

        ["The same maintenance principle applies whenever Qasr changes technology, responsibilities, operating procedures, or strategic priorities.",
          null],

        ["An authoritative process description must remain dependable after changes are approved, not merely when the original diagram was created.",
          st(
            "An architecture remains useful only when approved changes are reflected in its authoritative descriptions."
          )],

        ["Otherwise, employees may consult outdated models and make decisions based on arrangements that no longer apply.",
          null],

        ["This is how a comprehensive repository can become practically useless despite containing hundreds of carefully drawn diagrams.",
          null],

        ["The problem is not the number of documents, but the absence of ownership, maintenance, and meaningful relationships.",
          q(
            "Would Qasr's architecture still help managers make decisions after several years of operational change?"
          )],

        ["A living architecture supports investment choices, reveals dependencies, controls variations, and helps managers coordinate improvement programmes.",
          null],

        ["It also prepares Qasr for the next BPM phase, when managers must decide where improvement should begin.",
          null],

        ["That decision belongs to the Launch Pad phase, which we will examine next week rather than attempting prematurely.",
          null],

        ["For now, remember that architecture earns its value through the decisions it supports, not the diagrams it contains.",
          null]

      ],

      review: [

        // -----------------------------------------------------
        // W6O3c REMEDIAL 1
        // New angle: an airline changing its booking system
        // -----------------------------------------------------

        {
          title: "When one airline change affects the whole journey",

          lines: [

            ["Let's understand process dependencies through an airline introducing a new booking system across its international operations.",
              t(
                "Understanding dependencies",
                "One operational change can affect several connected processes."
              )],

            ["Imagine the airline replacing its reservation platform to make ticket purchases faster and reduce booking errors.",
              null],

            ["The project team concentrates on the booking experience because that is where the proposed improvement begins.",
              null],

            ["But passengers also depend on accurate booking information when checking in, selecting seats, and boarding their flights.",
              dg(
                "A connected passenger journey",
                D.flow([
                  "Book|flight",
                  "Confirm|reservation",
                  "Complete|check-in",
                  "Board|aircraft"
                ]),
                "Several airline processes depend on information created during booking."
              )],

            ["If the new system changes how reservation information is recorded, other processes may need corresponding adjustments.",
              null],

            ["Those relationships are dependencies because one process relies on information or outcomes produced by another.",
              st(
                "A dependency exists when one process relies on another process's information, resources, or outcomes."
              )],

            ["Now imagine the airline changing its booking system without consulting the teams responsible for airport check-in.",
              null],

            ["The booking experience might improve while check-in employees struggle to retrieve information needed to serve passengers.",
              iss(
                "A local technology improvement creates difficulties in a connected operational process.",
                "An overlooked dependency"
              )],

            ["The airline's process architecture should help managers identify those relationships before approving the proposed change.",
              null],

            ["The potentially affected processes form what managers sometimes call the change's blast radius.",
              null],

            ["That term describes the wider consequences a change may create beyond the process where it begins.",
              null],

            ["A process owner can use the architecture to coordinate discussions with managers responsible for affected activities.",
              null],

            ["But effective coordination requires recognised authority rather than merely asking departments to cooperate voluntarily.",
              st(
                "Process governance establishes who can approve changes and resolve cross-functional disagreements."
              )],

            ["Governance means the arrangements through which decisions are made, responsibilities are assigned, and disagreements are resolved.",
              null],

            ["Now imagine another airline programme independently changing airport check-in procedures while the booking project is underway.",
              null],

            ["Without coordination, the programmes might introduce incompatible changes to the same passenger journey.",
              null],

            ["A shared architecture makes overlapping work visible so the teams can examine their proposed changes together.",
              null],

            ["Qasr faces the same challenge when changing reservations, corporate rate verification, or guest arrival procedures.",
              q(
                "Why should Qasr examine connected processes before approving a local operational change?"
              )],

            ["Because the change may affect information, responsibilities, and outcomes beyond the department proposing it.",
              null],

            ["The architecture provides a dependable reference, while process ownership provides the authority needed to coordinate decisions.",
              null],

            ["Together, they help managers improve the complete customer experience rather than isolated departmental activities.",
              null]

          ]
        },

        // -----------------------------------------------------
        // W6O3c REMEDIAL 2
        // New angle: a hospital updating patient records
        // -----------------------------------------------------

        {
          title: "A hospital map that nobody maintained",

          lines: [

            ["Let's examine architectural maintenance through a hospital group that has carefully documented its patient-service processes.",
              t(
                "Keeping architecture useful",
                "A process map must remain dependable after operational changes."
              )],

            ["Imagine the hospital introducing a new electronic record system intended to improve how clinical information is shared.",
              null],

            ["The existing process architecture shows relationships between patient admission, diagnostic testing, treatment, and discharge.",
              dg(
                "Connected hospital processes",
                D.flow([
                  "Admit|patient",
                  "Complete|diagnosis",
                  "Deliver|treatment",
                  "Arrange|discharge"
                ]),
                "Several clinical processes depend on information exchanged during the patient journey."
              )],

            ["That map helps managers identify which processes may be affected when the information system changes.",
              null],

            ["But imagine the hospital updating its technology without revising the approved descriptions of the affected processes.",
              null],

            ["Employees might continue consulting diagrams that describe information transfers which no longer happen in the same way.",
              iss(
                "The documented architecture no longer reflects approved operational arrangements.",
                "Outdated information"
              )],

            ["The original map may have been accurate, yet it gradually becomes unreliable because nobody maintains it.",
              null],

            ["This illustrates why architecture needs governance rather than simply a successful documentation project.",
              st(
                "Architecture requires ongoing ownership, approval, and maintenance."
              )],

            ["Governance establishes who can approve changes, who maintains records, and how conflicting decisions are resolved.",
              null],

            ["A process owner should understand the complete patient journey and coordinate changes affecting several clinical departments.",
              null],

            ["The owner does not personally perform every activity, but remains accountable for the process's overall performance.",
              null],

            ["Now imagine two hospital improvement programmes independently redesigning the same patient discharge process.",
              null],

            ["One programme changes discharge documentation while another changes how patients receive follow-up instructions.",
              null],

            ["Without a shared architectural reference, their decisions might conflict or duplicate work already being undertaken.",
              [
                cmp(
                  "a",
                  "Disconnected changes",
                  "Separate programmes modify overlapping processes independently."
                ),
                cmp(
                  "b",
                  "Coordinated changes",
                  "Process relationships and ownership guide shared decisions."
                )
              ]],

            ["The architecture makes those overlaps visible, allowing managers to examine the consequences before implementation.",
              null],

            ["This wider effect is sometimes called the blast radius of a proposed process change.",
              null],

            ["Qasr faces the same risk whenever reservations, reception, or housekeeping changes an activity affecting guest arrival.",
              null],

            ["Its architecture should reveal affected processes and identify who can coordinate the necessary decisions.",
              q(
                "What happens when an organisation changes operations but leaves its architecture unchanged?"
              )],

            ["The map gradually loses credibility because its descriptions no longer represent the arrangements managers have approved.",
              null],

            ["A living architecture remains useful because owners maintain its relationships, authoritative versions, and registered variations.",
              null],

            ["That makes it a continuing management resource rather than a collection of historical diagrams.",
              null]

          ]
        }

      ]
    },

    // =========================================================
    // W6O3d — BUILD THE FIRST-LEVEL MAP
    // =========================================================

    {
      title: "Build the first-level map — synthesis and forum handover",
      sec: "W6O3d",

      lines: [

        ["We have reached the final part of our Process Architecture journey, and Qasr's leadership now needs something practical.",
          t(
            "Week 6 · Bringing the architecture together",
            "Build the first-level map"
          )],

        ["The team has investigated conflicting arrival descriptions, questioned local variations, and recognised the importance of accountable ownership.",
          null],

        ["Now imagine the executives asking you to explain what the group's initial process architecture should actually show.",
          q(
            "What would make Qasr's initial architecture useful for management decisions?"
          )],

        ["You should resist the temptation to answer by drawing every reception activity across all fourteen properties.",
          null],

        ["A first-level architecture provides a manageable view of the organisation's major end-to-end processes and their relationships.",
          st(
            "A first-level architecture",
            "A manageable view of the major processes through which an organisation delivers its strategy."
          )],

        ["End-to-end means considering the complete flow needed to deliver a recognisable outcome rather than one department's contribution.",
          null],

        ["For Qasr, the architecture should connect major guest-service processes with the supporting and management processes they depend upon.",
          dg(
            "A first-level guest-service view",
            D.flow([
              "Attract|guests",
              "Manage|reservations",
              "Deliver|guest stay",
              "Complete|departure"
            ]),
            "An illustrative first-level view shows major guest-service flows without detailing individual employee activities."
          )],

        ["This is an illustrative starting structure, not a claim that Qasr has already approved these particular process boundaries.",
          null],

        ["The executives must agree which broad flows reflect the group's strategy before the team treats them as authoritative.",
          null],

        ["That agreement matters because architecture should represent the organisation's value delivery rather than reproduce its departmental chart.",
          st(
            "Agree the broad process structure with leadership before expanding detailed documentation."
          )],

        ["Once the broad structure is agreed, the team can identify smaller processes that deserve distinct ownership and performance measures.",
          null],

        ["A performance measure is an indicator showing whether a process achieves its intended result reliably and efficiently.",
          null],

        ["Ownership matters because somebody must remain accountable when a process crosses reservations, revenue, reception, and housekeeping.",
          dg(
            "From broad structure to ownership",
            D.hier([
              ["Value chain", "Deliver guest services"],
              ["Process", "Manage guest arrival"],
              ["Sub-process", "Verify reservation"],
              ["Activity", "Check booking"]
            ], 1),
            "Broad flows provide context, while manageable processes receive ownership and appropriate performance measures."
          )],

        ["The team should then establish shared naming conventions and state the agreed level on each process description.",
          null],

        ["Those conventions help analysts compare equivalent work rather than arguing about diagrams drawn at different levels of detail.",
          null],

        ["Detailed activity modelling should follow only where a management decision genuinely depends on that additional information.",
          iss(
            "Extensive detailed modelling before agreeing the architecture can waste effort and create incompatible descriptions.",
            "Detail before structure"
          )],

        ["Now return to the eleven guest arrival models that originally made Qasr's documentation problem so difficult.",
          null],

        ["Nine were prepared from a manual last revised four years ago, and six were disputed on factual grounds.",
          null],

        ["Those figures remind us that producing more diagrams does not automatically create more dependable knowledge.",
          st(
            "6 of 9 analyst models disputed",
            "Factual reliability matters more than documentation volume."
          )],

        ["The team should verify current practice, resolve disagreements, and establish which approved descriptions are authoritative.",
          null],

        ["It should also record justified local variants against the common process instead of allowing undocumented exceptions to multiply.",
          null],

        ["That approach respects differences between Qasr properties without surrendering the benefits of a coherent group architecture.",
          [
            cmp(
              "a",
              "Uncontrolled documentation",
              "Conflicting descriptions with unclear authority."
            ),
            cmp(
              "b",
              "Managed architecture",
              "Agreed structure, accountable owners, and approved variations."
            )
          ]],

        ["A useful architecture must also show dependencies so managers understand which processes may be affected by proposed changes.",
          null],

        ["That visibility helps prevent separate programmes from redesigning overlapping work in incompatible directions.",
          null],

        ["Notice how these architectural decisions reinforce one another rather than functioning as isolated documentation requirements.",
          st(
            "Architecture combines structure, ownership, conventions, and relationships to support management decisions."
          )],

        ["The architecture becomes valuable when leaders can use it to discuss priorities, consequences, and responsibilities with confidence.",
          null],

        ["That brings us naturally to the next phase of the BPM framework, called the Launch Pad.",
          null],

        ["Next week, we will examine how managers choose an initial process, establish its scope, and assemble an effective improvement team.",
          dg(
            "From architecture to the Launch Pad",
            D.flow([
              "Organisation|strategy",
              "Process|architecture",
              "Launch|Pad"
            ]),
            "Process Architecture provides the organisational map needed before selecting and launching an improvement initiative."
          )],

        ["For now, our attention turns to your asynchronous forum, where you will encounter a different organisation.",
          null],

        ["The case is called Four Hundred Processes and No Map, and it tests whether you can transfer today's reasoning.",
          q(
            "Can you apply architectural principles to an unfamiliar organisation without copying Qasr's solution?"
          )],

        ["You will need to examine the case evidence and defend a suitable first-level architecture and level of decomposition.",
          null],

        ["Decomposition means dividing broader processes into smaller components while preserving their relationship to the complete organisational structure.",
          null],

        ["The forum is not asking you merely to produce an attractive diagram or repeat definitions from this lesson.",
          null],

        ["It asks you to justify architectural choices using the unfamiliar organisation's circumstances and the principles from Jeston's chapter.",
          st(
            "Your forum task",
            "Develop and defend an evidence-based architectural argument for a different organisation."
          )],

        ["Post your own substantive response before reading your classmates' contributions, so your reasoning begins independently.",
          null],

        ["Then engage meaningfully with at least two peers, including a reasoned disagreement that challenges or extends an argument.",
          null],

        ["Support your position with the chapter rather than relying on unsupported assertions or personal preference.",
          null],

        ["I will leave the case solution to you because transferring these ideas is the real purpose of the exercise.",
          null],

        ["As you finish, remember that process architecture is not a folder of diagrams or a substitute for management judgement.",
          null],

        ["It is the structure that makes ownership, comparison, coordination, and informed improvement decisions possible.",
          st(
            "Week 6 · The central lesson",
            "A dependable process architecture makes later BPM decisions possible."
          )],

        ["You now have the conceptual tools to recognise when an organisation has documented its work without truly understanding it.",
          null],

        ["Carry that distinction into your forum discussion, and we will build on it during the Launch Pad phase.",
          null]

      ],

      review: [

        // -----------------------------------------------------
        // W6O3d REMEDIAL 1
        // New angle: a regional logistics company
        // -----------------------------------------------------

        {
          title: "A logistics company that mapped every activity",

          lines: [

            ["Let's bring the architecture together through a regional logistics company operating several warehouses and distribution centres.",
              t(
                "Building a useful first-level architecture",
                "A broad process map should make the organisation understandable before detailed modelling begins."
              )],

            ["Imagine the company collecting hundreds of diagrams describing individual warehouse tasks, delivery activities, and administrative procedures.",
              null],

            ["The documentation looks impressive, but managers struggle to understand how the complete logistics service is organised.",
              iss(
                "Detailed documentation exists without a dependable overall process structure.",
                "A missing architecture"
              )],

            ["The company needs a first-level architecture showing the major processes through which it delivers customer value.",
              null],

            ["Such a map might distinguish receiving orders, preparing shipments, transporting goods, and completing deliveries.",
              dg(
                "Illustrative logistics architecture",
                D.flow([
                  "Receive|orders",
                  "Prepare|shipments",
                  "Transport|goods",
                  "Complete|delivery"
                ]),
                "A first-level architecture shows major end-to-end processes without describing every operational activity."
              )],

            ["These broad processes should reflect the company's strategy rather than simply reproduce the names of existing departments.",
              null],

            ["Managers can then examine which smaller processes belong within each major flow and require accountable ownership.",
              null],

            ["A process owner remains accountable for the complete outcome, including work performed inside several departments.",
              st(
                "Ownership connects the process map with responsibility for performance and improvement."
              )],

            ["The company also needs consistent naming conventions so different analysts describe comparable work using agreed terminology.",
              null],

            ["Without those conventions, one warehouse might document shipment preparation while another describes several overlapping departmental procedures.",
              null],

            ["Those descriptions become difficult to compare because they may represent different levels or boundaries.",
              null],

            ["A process boundary identifies where work begins and where its intended outcome is completed.",
              null],

            ["The organisation should agree those boundaries before investing heavily in detailed activity models.",
              null],

            ["Now imagine different warehouses using genuinely different arrangements because their equipment or customer requirements vary.",
              null],

            ["The architecture can preserve approved local variants while maintaining a common structure across the organisation.",
              [
                cmp(
                  "a",
                  "Common architecture",
                  "Shared process purpose, boundaries, and ownership."
                ),
                cmp(
                  "b",
                  "Approved local variant",
                  "A justified operational difference linked to the common process."
                )
              ]],

            ["Managers should also identify relationships between processes because a change in shipment preparation may affect delivery performance.",
              null],

            ["Those dependencies make the architecture useful when assessing proposed improvements and coordinating separate projects.",
              null],

            ["Qasr faces the same challenge across its fourteen properties and conflicting guest arrival descriptions.",
              null],

            ["Its architecture must support decisions rather than merely increase the number of diagrams stored in the repository.",
              q(
                "What makes a first-level architecture useful instead of merely comprehensive?"
              )],

            ["It provides agreed structure, meaningful relationships, accountable ownership, and consistent rules for maintaining approved descriptions.",
              null],

            ["Those foundations help managers decide where detailed investigation is worthwhile without losing sight of the organisation.",
              null]

          ]
        },

        // -----------------------------------------------------
        // W6O3d REMEDIAL 2
        // New angle: a public transport authority
        // -----------------------------------------------------

        {
          title: "From scattered procedures to a management map",

          lines: [

            ["Let's finish with a public transport authority responsible for coordinating services across a growing metropolitan region.",
              t(
                "From documentation to architecture",
                "A useful map connects strategic purpose with manageable processes and clear accountability."
              )],

            ["Imagine the authority collecting detailed procedures from bus operations, ticketing services, maintenance teams, and customer support.",
              null],

            ["Each department has documented its work, but senior managers cannot easily see how the complete service fits together.",
              iss(
                "Departmental documentation does not reveal the organisation's complete process landscape.",
                "Structure is missing"
              )],

            ["The authority needs a first-level architecture showing the major processes required to deliver reliable public transport.",
              null],

            ["That architecture should connect customer-facing services with the supporting and management processes needed to sustain them.",
              dg(
                "Illustrative transport architecture",
                D.flow([
                  "Plan|services",
                  "Operate|transport",
                  "Support|passengers",
                  "Review|performance"
                ]),
                "A broad architecture helps managers understand major processes and their relationships."
              )],

            ["The executives must agree which broad flows reflect the authority's strategy before detailed modelling expands.",
              null],

            ["That agreement matters because departmental structures do not necessarily correspond to complete processes experienced by passengers.",
              null],

            ["The authority can then identify smaller processes that have recognisable outcomes and can sensibly receive accountable owners.",
              st(
                "Process ownership should follow meaningful end-to-end outcomes rather than departmental boundaries."
              )],

            ["Those owners need sufficient authority to coordinate changes affecting functions outside their direct management responsibility.",
              null],

            ["Otherwise, a process owner might recognise a problem without being able to influence the departments responsible.",
              null],

            ["The authority must also establish conventions for naming processes and recording their agreed boundaries.",
              null],

            ["These conventions make independently prepared models comparable and prevent inconsistent documentation from multiplying.",
              null],

            ["Now imagine two transport districts using different ticket inspection arrangements because their passenger volumes differ substantially.",
              null],

            ["The authority should investigate whether those differences are justified before imposing one arrangement everywhere.",
              null],

            ["An approved variant records a legitimate difference while preserving its relationship to the common process.",
              [
                cmp(
                  "a",
                  "Uncontrolled variation",
                  "Different practices exist without documented justification."
                ),
                cmp(
                  "b",
                  "Managed variation",
                  "Differences are examined, approved, and linked to the common architecture."
                )
              ]],

            ["The architecture should also reveal dependencies between services, allowing managers to anticipate the consequences of proposed changes.",
              null],

            ["A timetable change might affect passenger information, staffing arrangements, and the reliability of connecting services.",
              null],

            ["Recognising those relationships helps prevent improvements in one area from creating unexpected problems elsewhere.",
              q(
                "How does a process architecture help managers make better decisions about organisational change?"
              )],

            ["It makes the structure, responsibilities, and relationships visible before managers commit resources to particular improvements.",
              null],

            ["Now return to Qasr, where the same principles guide the construction of a dependable first-level architecture.",
              null],

            ["Your forum case will ask you to apply these principles to a different organisation without borrowing Qasr's answer.",
              null],

            ["The important skill is explaining why your chosen structure and level of detail suit the organisation's circumstances.",
              null],

            ["That reasoning is what turns a process map into a useful management tool.",
              null]

          ]
        }

      ]
    }

  ]
},
// END-BLOCK
//__MORE_LESSONS__

    ]

  };

  // Claude review fixes (28 Oct 2026), original line indices; applied before TRIM.
  const FIX_MAIN = [["W6O1b",24,"Architecture also shows relationships between processes, so managers can anticipate the effects of a proposed change before introducing it."],["W6O2a",32,"Because level is agreed rather than discovered, Qasr should state the agreed level on every model, which prevents the argument."],["W6O2b",17,"Here, authority means the owner reports the end-to-end measure and can at least veto spending that would change the process."],["W6O2b",19,"Such an owner would be a coordinator with a better title, and the architecture would not survive its first departmental dispute."]];
  const FIX_REM = [["W6O3b",1,18,"The same principle applies to Desert Ridge\u0027s missing step and the three differing descriptions of guest recognition."]];
  COURSE.lessons.forEach((l) => l.sections.forEach((s) => {
    FIX_MAIN.filter((f) => f[0] === s.sec).forEach((f) => { s.lines[f[1]][0] = f[2]; });
    FIX_REM.filter((f) => f[0] === s.sec).forEach((f) => { s.review[f[1]].lines[f[2]][0] = f[3]; });
  }));
  // Length trim (28 Oct 2026): narration lines flagged by the length check, removed by original index (GPT-6 edit list).
  const TRIM = {"W6O1a":[26,22,14,9,5],"W6O1b":[27,18,7,3],"W6O1c":[37,36,29,26,20,19,17,13,11,8,7,1],"W6O2a":[26,11,6,1],"W6O2b":[28,26,20,12,7,4,2],"W6O2c":[35,29,27,23,20,18,17,13,10,7,4],"W6O3b":[25,21,17,14,10,7,1],"W6O3c":[31,28,24,21,18,15,13,11,10,8,4,2],"W6O3d":[33,30,27,24,22,20,17,14,11,10,8,5,3,1]};
  COURSE.lessons.forEach((l) => l.sections.forEach((s) => (TRIM[s.sec] || []).forEach((i) => s.lines.splice(i, 1))));

  // Plain-text scripts for tools that expect them.
  COURSE.lessons.forEach((l) =>
    l.sections.forEach((s) => {
      s.script = s.lines.map((x) => x[0]).join(" ");

      if (Array.isArray(s.review)) {
        s.review.forEach((r) => {
          r.script = r.lines.map((x) => x[0]).join(" ");
        });
      }
    })
  );

})();