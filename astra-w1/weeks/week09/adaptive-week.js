// OPER621 Business Process Management - Week 9
// Adaptive layer: mastery rules, CLOs, weekly outcomes, section mappings,
// and remedial micro-lessons.
//
// Topic: The Innovate Phase - Framework Phase 5.
// Sources: OPER621 Week 9 Session 1 slides, Week 9 Delivery Plan,
// Jeston Chapter 17, and the Week 1 VoiceLearn template.
// Running case: Qasr Hospitality Group and Qasr Marina.
// Author: Prof. Bassem Jarboui
//
// OFFICIAL COURSE LEARNING OUTCOMES
// S1 - Design a framework for BPM and explain and assess related phases
//      in the context of a regional company.
// S2 - Integrate new technologies to manage organizational changes.
//
// WEEKLY LEARNING OUTCOMES
// O1 - Design a to-be process that addresses root causes rather than symptoms.
// O2 - Evaluate incremental against radical redesign options on benefit
//      and feasibility.
// O3 - Integrate technology options into a redesigned process.
//
// PRIMARY CLO MAPPINGS
// O1: S1
// O2: S1
// O3: S2
//
// SUPPORTING CLO MAPPINGS
// O1: S2
// O2: S2
// O3: S1
//
// Each outcome retains one primary CLO in the runtime schema.
//
// LESSON AND SECTION MAPPINGS
// l1 - Designing the process that should exist
//   O1a - From Understand to Innovate
//   O1b - Three levels of ambition
//   O1c - Designing Qasr's future arrival
//
// l2 - Choosing between competing designs
//   O2a - Comparing redesign alternatives
//   O2b - Qasr's two competing designs
//   O2c - The quick-win trap
//
// l3 - Making the future process workable
//   O3a - Technology that changes the process
//   O3b - Constraints and exceptions
//   O3c - Testing before implementation
//
// l4 - Making and defending the Innovate decision
//   O2d - Choosing the defensible design
//   O2e - The Innovate handover
//
// RUNTIME SECTION KEYS
// O1a, O1b, O1c, O2a, O2b, O2c, O3a, O3b, O3c, O2d, O2e.
//
// The question bank is maintained separately in bank.js.
// Remedial micro-lessons are used only during remediation.
// Every section has exactly two remedial variants.
// Each variant uses a different explanatory angle and a fresh example.
// Remedial variants contain 230-360 spoken words.
// Every spoken sentence contains 6-30 words.
// Target average sentence length is 15-18 words.
// Narration uses warm, natural, connected speech.
// Avoid mechanical enumeration and disconnected spoken lists.
// Avoid the banned spoken patterns "first,", "second,", and "third,".
// Do not use arrows or bullet characters in narration.
// Every spoken line has the structure [sentence, moment].
// Null moments retain the previous visual.
// Introduce a meaningful new visual moment every 1-3 sentences.
// Use only existing MOMENT_KIT helpers and DIAG diagram types.
// Remedial explanations must not simply repeat the main lesson.
// Each variant must use a genuinely different teaching approach.
// Never contradict the Week 9 slides or delivery plan.
// Distinguish projected performance from demonstrated results.
// Preserve essential verification, compliance, and guest assistance.
// Do not confuse the 82-minute lobby-to-room baseline with desk service time.
//
// Remediation behaviour:
// Round 1 on a weak section plays variant 0.
// Round 2 plays variant 1.
// Subsequent rounds alternate between the two variants.
// Each remediation round uses three fresh questions per weak section.

(() => {
  const D = window.DIAG;
  const { t, it, q, st, iss, cmp, dg, fm } = window.MOMENT_KIT;

  window.ADAPTIVE = {

    target: 0.8,
    window: 5,
    minEvidence: 3,
    firstCheck: 4,
    firstCheckPerSection: 3,
    perWeak: 3,

    clos: {

      S1: {
        name: "S1",
        full: "Design a framework for BPM and explain and assess related phases in the context of a regional company"
      },

      S2: {
        name: "S2",
        full: "Integrate new technologies to manage organizational changes"
      }

    },

    outcomes: {

      O1: {
        clo: "S1",
        name: "Design a root-cause-based to-be process",
        full: "Design a to-be process that addresses root causes rather than symptoms"
      },

      O2: {
        clo: "S1",
        name: "Evaluate redesign ambition and feasibility",
        full: "Evaluate incremental against radical redesign options on benefit and feasibility"
      },

      O3: {
        clo: "S2",
        name: "Integrate technology into process redesign",
        full: "Integrate technology options into a redesigned process"
      }

    },

    sections: {

      O1a: {
        lo: "O1",
        lesson: "l1",
        name: "From Understand to Innovate"
      },

      O1b: {
        lo: "O1",
        lesson: "l1",
        name: "Three levels of ambition"
      },

      O1c: {
        lo: "O1",
        lesson: "l1",
        name: "Designing Qasr's future arrival"
      },

      O2a: {
        lo: "O2",
        lesson: "l2",
        name: "Comparing redesign alternatives"
      },

      O2b: {
        lo: "O2",
        lesson: "l2",
        name: "Qasr's two competing designs"
      },

      O2c: {
        lo: "O2",
        lesson: "l2",
        name: "The quick-win trap"
      },

      O3a: {
        lo: "O3",
        lesson: "l3",
        name: "Technology that changes the process"
      },

      O3b: {
        lo: "O3",
        lesson: "l3",
        name: "Constraints and exceptions"
      },

      O3c: {
        lo: "O3",
        lesson: "l3",
        name: "Testing before implementation"
      },

      O2d: {
        lo: "O2",
        lesson: "l4",
        name: "Choosing the defensible design"
      },

      O2e: {
        lo: "O2",
        lesson: "l4",
        name: "The Innovate handover"
      }

    },

    // Two remedial micro-lessons per section.
    // Each variant has its own explanatory angle and fresh example.
    // The runtime selects variants according to remediation round.

    review: {

      O1a: [

        {
          title: "The hospital that made its queue move faster",

          lines: [

            [
              "Imagine a hospital where patients regularly wait too long before receiving their prescribed medication.",
              t(
                "From symptoms to causes",
                "A faster activity does not necessarily solve the problem creating the delay."
              )
            ],

            [
              "The pharmacy manager notices a long queue and asks employees to process prescriptions more quickly.",
              null
            ],

            [
              "Employees respond enthusiastically, but patients continue waiting because many prescriptions arrive without complete approval information.",
              iss(
                "Incomplete approval information prevents prescriptions from moving smoothly through the pharmacy.",
                "The underlying problem"
              )
            ],

            [
              "The manager initially believes that additional counter staff will solve the problem.",
              null
            ],

            [
              "However, more employees cannot dispense medication while the required approval remains unavailable.",
              q(
                "Would adding pharmacy employees remove the delay caused by missing approval information?"
              )
            ],

            [
              "This is the difference between treating a symptom and addressing the cause responsible for it.",
              null
            ],

            [
              "The queue is visible, but the missing information explains why work cannot proceed.",
              cmp(
                "a",
                "Visible symptom",
                "Patients wait in a long pharmacy queue."
              )
            ],

            [
              "During Understand, the team investigates where approvals originate and why information reaches the pharmacy late.",
              null
            ],

            [
              "It discovers that doctors sometimes complete approval details after sending prescriptions for dispensing.",
              cmp(
                "b",
                "Underlying cause",
                "Required approval information is completed after the prescription reaches the pharmacy."
              )
            ],

            [
              "Now the team enters Innovate and asks how the future process could prevent that delay.",
              null
            ],

            [
              "One proposal requires complete approval information before the prescription enters the dispensing queue.",
              dg(
                "Redesigned prescription journey",
                D.flow([
                  "Prescription created",
                  "Approval completed",
                  "Pharmacy receives",
                  "+Medication prepared"
                ]),
                "The redesigned process makes necessary approval information available before dispensing begins."
              )
            ],

            [
              "This proposal changes the sequence of work rather than simply asking pharmacy employees to work faster.",
              null
            ],

            [
              "Patients could experience less waiting because prescriptions would arrive ready for the next necessary activity.",
              st(
                "Root-cause redesign changes the conditions that create delay instead of merely accelerating visible activities."
              )
            ],

            [
              "However, the team must preserve clinical checks because faster dispensing cannot justify unsafe medication decisions.",
              null
            ],

            [
              "The redesigned workflow therefore retains necessary professional verification while reducing avoidable administrative waiting.",
              iss(
                "Removing administrative delay must not weaken necessary clinical safeguards.",
                "A design constraint"
              )
            ],

            [
              "The hospital has now produced a proposed future process, but its performance has not yet been demonstrated.",
              null
            ],

            [
              "Testing and implementation will determine whether the proposed changes actually reduce waiting without creating new problems.",
              q(
                "What evidence would show that the hospital removed the cause rather than temporarily hiding the queue?"
              )
            ],

            [
              "Remember that Understand explains why the current process performs poorly, while Innovate designs a better arrangement.",
              null
            ],

            [
              "A credible to-be process uses that explanation to remove unnecessary work and protect activities that remain essential.",
              st(
                "Understand identifies the causes; Innovate designs how work should change to address them."
              )
            ]

          ]
        },

        {
          title: "The airport that bought more luggage carts",

          lines: [

            [
              "Imagine an airport receiving complaints because arriving passengers wait too long for their checked luggage.",
              t(
                "Question the work, not just the equipment",
                "The visible location of a delay may not reveal the activity causing it."
              )
            ],

            [
              "The airport manager sees crowded baggage carousels and proposes purchasing additional luggage carts.",
              null
            ],

            [
              "The proposal seems reasonable because more equipment could help employees transport bags more efficiently.",
              null
            ],

            [
              "But the improvement team asks whether cart availability actually explains the longest delays.",
              q(
                "What if baggage waits because information reaches handlers too late?"
              )
            ],

            [
              "During Understand, employees discover that unloading teams sometimes receive aircraft arrival information after the aircraft has landed.",
              iss(
                "Late arrival information prevents baggage teams from preparing their work at the appropriate time.",
                "The real dependency"
              )
            ],

            [
              "The carts are not the main obstacle because available employees cannot prepare effectively without reliable timing information.",
              null
            ],

            [
              "Buying additional carts might increase capacity without changing the information problem that creates unnecessary waiting.",
              cmp(
                "a",
                "Equipment-centred response",
                "Purchase more carts while preserving late communication."
              )
            ],

            [
              "Now imagine redesigning the process so baggage teams receive updated arrival information before aircraft reach their gates.",
              null
            ],

            [
              "Handlers could prepare the necessary resources earlier and coordinate unloading with the actual arrival schedule.",
              dg(
                "Information before physical work",
                D.flow([
                  "Arrival update",
                  "Handlers informed",
                  "Resources prepared",
                  "+Baggage unloaded"
                ]),
                "Earlier operational information allows baggage teams to prepare before unloading begins."
              )
            ],

            [
              "Notice that the redesigned process changes the timing of coordination rather than merely adding physical resources.",
              null
            ],

            [
              "This matters because information can be a process input just as important as equipment or employee availability.",
              st(
                "A process may perform poorly because essential information arrives too late, even when physical resources are sufficient."
              )
            ],

            [
              "The team must still investigate whether the airport's systems can provide accurate updates consistently.",
              null
            ],

            [
              "If information remains unreliable, the proposed redesign could simply move uncertainty to an earlier activity.",
              iss(
                "Unreliable arrival updates could undermine the proposed preparation process.",
                "An unresolved assumption"
              )
            ],

            [
              "That is why Innovate should produce a testable future design rather than an unsupported promise of faster service.",
              null
            ],

            [
              "The airport could examine difficult arrival conditions and check whether handlers receive information early enough.",
              q(
                "Would the redesigned process still work when several aircraft arrive unexpectedly close together?"
              )
            ],

            [
              "The example shows why understanding the actual cause must precede selecting an attractive solution.",
              null
            ],

            [
              "It also shows that redesign can change information flows without removing the physical work customers still need.",
              st(
                "The best redesign changes the activities and dependencies responsible for poor performance."
              )
            ],

            [
              "When you return to Qasr Marina, apply the same reasoning to its repeated checks and approval delays.",
              null
            ],

            [
              "Ask what information should arrive earlier, because that question may reveal a more valuable redesign opportunity.",
              null
            ]

          ]
        }

      ],

      O1b: [

        {
          title: "The university choosing how far to redesign enrolment",

          lines: [

            [
              "Imagine a university receiving complaints from students who find its enrolment process confusing and unnecessarily slow.",
              t(
                "Choosing the level of ambition",
                "Different redesign approaches change different aspects of the process."
              )
            ],

            [
              "The university wants improvement, but managers disagree about how much of the existing process should change.",
              null
            ],

            [
              "The registrar proposes clearer instructions and better employee training to reduce mistakes during enrolment.",
              it(
                1,
                3,
                "check",
                "Improve existing steps",
                "Strengthen execution while retaining the established enrolment workflow."
              )
            ],

            [
              "This approach could help when employees apply correct procedures inconsistently or students misunderstand required information.",
              null
            ],

            [
              "However, the improvement team discovers that students must submit the same documents to several departments.",
              iss(
                "Repeated document submission creates unnecessary work even when employees follow their procedures correctly.",
                "A structural problem"
              )
            ],

            [
              "Clearer instructions cannot eliminate duplication when the process itself requires students to repeat the same activity.",
              null
            ],

            [
              "The team therefore considers redesigning the workflow so departments use information from one verified student record.",
              it(
                2,
                3,
                "route",
                "Redesign the workflow",
                "Change information flows and handoffs to remove repeated work."
              )
            ],

            [
              "A shared record could reduce repeated submissions because verified information would become available to authorised departments.",
              null
            ],

            [
              "That proposal changes how work connects across departments rather than merely improving individual employee performance.",
              dg(
                "A redesigned enrolment workflow",
                D.flow([
                  "Student applies",
                  "Documents verified",
                  "Departments access",
                  "+Enrolment confirmed"
                ]),
                "A shared verification process can remove unnecessary document submissions across departments."
              )
            ],

            [
              "Now imagine another manager questioning whether students should complete traditional enrolment transactions at all.",
              null
            ],

            [
              "For eligible returning students, the university might confirm enrolment automatically when established conditions are satisfied.",
              it(
                3,
                3,
                "target",
                "Rethink the service",
                "Question whether the traditional customer journey remains necessary."
              )
            ],

            [
              "Students would receive confirmation without repeating activities already supported by reliable university records.",
              null
            ],

            [
              "This approach changes the service experience itself, making it more ambitious than improving existing enrolment steps.",
              cmp(
                "a",
                "Traditional enrolment",
                "Students complete repeated administrative transactions."
              )
            ],

            [
              "However, the university must preserve academic eligibility checks and provide assistance when student circumstances require review.",
              cmp(
                "b",
                "Rethought enrolment",
                "Eligible students receive streamlined confirmation while exceptions receive appropriate review."
              )
            ],

            [
              "The more ambitious approach could offer greater benefits, but it also creates stronger technology and governance dependencies.",
              null
            ],

            [
              "The university should therefore choose its ambition according to the causes identified and its ability to deliver change.",
              q(
                "Would radical redesign be justified if the university could not reliably verify student eligibility?"
              )
            ],

            [
              "Remember that greater ambition is not automatically superior because expected benefits must be balanced against feasibility.",
              null
            ],

            [
              "The strongest choice addresses the real problem without creating unnecessary implementation risk.",
              st(
                "Choose redesign ambition according to root causes, customer value, and practical delivery conditions."
              )
            ]

          ]
        },

        {
          title: "The delivery company and the broken bridge",

          lines: [

            [
              "Imagine a regional delivery company whose drivers repeatedly arrive late because parcels follow an inefficient distribution route.",
              t(
                "Three levels of process change",
                "Improving a route differs from redesigning the network or changing the delivery service."
              )
            ],

            [
              "The operations manager suggests training drivers to load vehicles more quickly before beginning their daily journeys.",
              null
            ],

            [
              "That improvement could reduce preparation time, but it would leave the existing distribution route unchanged.",
              cmp(
                "a",
                "Improve execution",
                "Load vehicles more efficiently while preserving the current route."
              )
            ],

            [
              "Suppose the current route sends parcels through a distant depot even when their destinations are nearby.",
              null
            ],

            [
              "The depot creates unnecessary travel because the distribution network was designed around older operating arrangements.",
              iss(
                "An unnecessary depot transfer adds travel and handling regardless of driver efficiency.",
                "A workflow problem"
              )
            ],

            [
              "The company could redesign the workflow by sending suitable parcels directly from the regional sorting centre.",
              null
            ],

            [
              "This removes an unnecessary handoff because the parcel no longer needs to visit the distant depot.",
              dg(
                "Removing an unnecessary transfer",
                D.flow([
                  "Regional sorting",
                  "Direct dispatch",
                  "Local delivery",
                  "+Customer receives"
                ]),
                "The redesigned workflow removes a depot transfer when direct dispatch is operationally appropriate."
              )
            ],

            [
              "The change is more ambitious than faster loading because it alters the connected activities making up the journey.",
              null
            ],

            [
              "Now imagine the company questioning whether every customer actually needs conventional delivery to a home address.",
              q(
                "Could some customers receive parcels more conveniently through a different delivery service?"
              )
            ],

            [
              "It might offer secure collection locations where customers can retrieve parcels when their schedules permit.",
              null
            ],

            [
              "That proposal rethinks the service experience because customers no longer depend entirely on traditional home delivery.",
              cmp(
                "b",
                "Rethink the service",
                "Offer an alternative collection experience rather than preserving every conventional delivery transaction."
              )
            ],

            [
              "However, collection locations require appropriate security, reliable notifications, and arrangements for customers needing home delivery.",
              null
            ],

            [
              "The organisation must also consider whether the new service would genuinely meet customer expectations.",
              iss(
                "An alternative delivery model can create new difficulties when customer needs and operating requirements are overlooked.",
                "Service redesign risk"
              )
            ],

            [
              "Notice how the three approaches address different questions about the same delivery problem.",
              null
            ],

            [
              "Faster loading improves execution, direct dispatch changes the workflow, and collection locations reconsider the service.",
              it(
                1,
                3,
                "check",
                "Improve",
                "Strengthen the performance of existing activities."
              )
            ],

            [
              "None should be selected automatically because each responds to different causes and creates different requirements.",
              it(
                2,
                3,
                "route",
                "Redesign",
                "Change the connections and sequence of work."
              )
            ],

            [
              "A company facing only inconsistent loading might not need a completely different delivery service.",
              it(
                3,
                3,
                "target",
                "Rethink",
                "Question whether the existing service model remains appropriate."
              )
            ],

            [
              "Conversely, faster loading cannot solve unnecessary depot transfers that are built into the distribution network.",
              null
            ],

            [
              "The lesson is to match redesign ambition with the underlying cause and the organisation's delivery capabilities.",
              st(
                "The appropriate level of ambition depends on what causes poor performance and what change can realistically achieve."
              )
            ]

          ]
        }

      ],

      O1c: [

        {
          title: "The library designing a better membership journey",

          lines: [

            [
              "Imagine a public library whose visitors complain that obtaining a membership card takes longer than expected.",
              t(
                "Design around the customer outcome",
                "The future process should deliver the intended service without unnecessary transactions."
              )
            ],

            [
              "The librarian explains that visitors must complete a paper form and repeat their details at another counter.",
              null
            ],

            [
              "Employees then check eligibility before creating an account and issuing the membership card.",
              dg(
                "The current membership journey",
                D.flow([
                  "Paper form",
                  "Details re-entered",
                  "Eligibility checked",
                  "+Card issued"
                ]),
                "The existing process requires repeated information entry before the visitor receives a usable membership."
              )
            ],

            [
              "The improvement team asks what visitors actually want when they approach the library.",
              null
            ],

            [
              "They want a usable membership that allows them to borrow resources, not an opportunity to complete administrative paperwork.",
              q(
                "Which activities genuinely help the visitor obtain a usable library membership?"
              )
            ],

            [
              "That customer outcome becomes the design anchor for deciding which activities should remain.",
              null
            ],

            [
              "The team proposes collecting membership information once and making it available to authorised employees.",
              st(
                "The future process should organise necessary work around the visitor's intended outcome."
              )
            ],

            [
              "A visitor could provide details through an accessible online form or receive assistance at the library.",
              null
            ],

            [
              "Eligibility verification would still occur because the library must confirm that membership conditions are satisfied.",
              iss(
                "Removing repeated data entry must not remove necessary membership eligibility checks.",
                "Preserve essential controls"
              )
            ],

            [
              "Once verified, the information could create a usable account without requiring employees to enter identical details again.",
              null
            ],

            [
              "A digital membership could become available immediately when the necessary conditions are satisfied.",
              dg(
                "The proposed membership journey",
                D.flow([
                  "Details submitted",
                  "Eligibility verified",
                  "Account created",
                  "+Membership available"
                ]),
                "The redesigned process collects information once and retains necessary verification before activating membership."
              )
            ],

            [
              "Notice that the design changes the information flow rather than simply asking employees to complete forms faster.",
              null
            ],

            [
              "The team also examines whether printed cards remain necessary for every visitor or only for particular circumstances.",
              q(
                "Could the library preserve access while offering visitors different ways to use their membership?"
              )
            ],

            [
              "Visitors without suitable devices would still need an accessible alternative because digital convenience should not create exclusion.",
              null
            ],

            [
              "Employees must also understand who resolves incomplete applications and how unusual eligibility cases receive review.",
              cmp(
                "a",
                "Standard route",
                "Complete applications proceed through verified account creation."
              )
            ],

            [
              "The future process therefore includes a reliable assistance route instead of assuming every application follows ideal conditions.",
              cmp(
                "b",
                "Assistance route",
                "Incomplete or unusual applications receive appropriate employee support."
              )
            ],

            [
              "The team has designed a plausible future journey, but its expected performance still requires testing.",
              null
            ],

            [
              "Remember that a strong to-be design removes unnecessary work while preserving controls and supporting different customer needs.",
              st(
                "Design around customer value, remove avoidable repetition, and retain necessary safeguards and assistance."
              )
            ]

          ]
        },

        {
          title: "The manufacturer that redesigned the wrong handoff",

          lines: [

            [
              "Imagine a furniture manufacturer receiving complaints because customers frequently discover incorrect specifications after placing their orders.",
              t(
                "Follow the information across departments",
                "A to-be process must address the handoffs responsible for errors and rework."
              )
            ],

            [
              "The sales manager proposes improving the order form because employees sometimes misunderstand customers' requirements.",
              null
            ],

            [
              "A clearer form might help, but the improvement team investigates what happens after sales accepts an order.",
              q(
                "Would a better order form solve the problem if production receives incomplete specifications?"
              )
            ],

            [
              "The team discovers that sales and production maintain separate records with different versions of customer requirements.",
              iss(
                "Separate records create inconsistent specifications and unnecessary correction work.",
                "The information problem"
              )
            ],

            [
              "Production employees sometimes begin preparing materials before the latest customer changes reach their department.",
              null
            ],

            [
              "When the discrepancy becomes visible, employees must stop work and seek clarification from sales.",
              cmp(
                "a",
                "Current process",
                "Different departments use inconsistent specifications and discover errors after work begins."
              )
            ],

            [
              "The redesign team now asks how the future process could prevent those errors from reaching production.",
              null
            ],

            [
              "It proposes one controlled specification record that both departments use when preparing and accepting customer orders.",
              dg(
                "A shared specification record",
                D.flow([
                  "Customer requirements",
                  "Specifications verified",
                  "Shared record",
                  "+Production receives"
                ]),
                "The redesigned process makes verified customer specifications available before production begins."
              )
            ],

            [
              "A controlled record means changes are recorded consistently and authorised employees can identify the current approved version.",
              null
            ],

            [
              "The team also proposes confirming important specifications with customers before releasing orders for production.",
              st(
                "Earlier verification can prevent errors from entering later activities where correction becomes more expensive."
              )
            ],

            [
              "This changes when information is checked, reducing the chance that mistakes become costly production problems.",
              null
            ],

            [
              "However, the manufacturer must preserve necessary approval authority when customers request changes affecting price or delivery.",
              iss(
                "A faster specification process must preserve appropriate approval of changes affecting contractual commitments.",
                "A necessary control"
              )
            ],

            [
              "The redesigned workflow therefore separates routine information updates from changes requiring commercial authorisation.",
              null
            ],

            [
              "It also identifies who resolves disagreements when sales and production interpret a requirement differently.",
              cmp(
                "b",
                "Future process",
                "Verified specifications and clear ownership reduce errors before production begins."
              )
            ],

            [
              "The team could test difficult orders to determine whether employees understand the new responsibilities.",
              null
            ],

            [
              "Testing matters because a shared record cannot create reliable information when employees enter inaccurate details.",
              q(
                "What happens if the shared system contains information that nobody has properly verified?"
              )
            ],

            [
              "The manufacturer has now designed a process addressing the source of errors rather than merely improving form appearance.",
              null
            ],

            [
              "Remember that a useful to-be process changes the work and information dependencies responsible for poor performance.",
              st(
                "A strong redesign prevents avoidable errors before they travel through the process and create further rework."
              )
            ]

          ]
        }

      ],

      O2a: [

        {
          title: "The clinic choosing between two appointment systems",

          lines: [

            [
              "Imagine a medical clinic where patients regularly wait too long before seeing their doctors.",
              t(
                "Comparing redesign alternatives",
                "A promising improvement must be judged against what it costs and requires."
              )
            ],

            [
              "The clinic manager receives two proposals, and both promise a better experience for patients.",
              null
            ],

            [
              "One proposal improves appointment scheduling, while another redesigns how patients receive routine consultations.",
              q(
                "How should the clinic compare two proposals that change the patient journey differently?"
              )
            ],

            [
              "The scheduling proposal uses existing systems and trains reception employees to allocate appointments more consistently.",
              null
            ],

            [
              "The alternative introduces suitable remote consultations and changes how clinicians manage routine follow-up appointments.",
              cmp(
                "a",
                "Scheduling improvement",
                "Improve appointment allocation while retaining the established consultation process."
              )
            ],

            [
              "The second proposal could reduce unnecessary visits, but it requires stronger technology and different working arrangements.",
              cmp(
                "b",
                "Consultation redesign",
                "Offer suitable remote consultations while preserving necessary face-to-face care."
              )
            ],

            [
              "The manager initially prefers the cheaper scheduling proposal because its implementation appears easier.",
              null
            ],

            [
              "However, low implementation cost does not establish whether the proposal addresses the clinic's main problem.",
              st(
                "The cheapest redesign is not necessarily the option that creates the greatest organisational value."
              )
            ],

            [
              "Suppose patients mainly wait because routine consultations occupy appointments needed for more complex cases.",
              null
            ],

            [
              "Better scheduling might help, but appropriate remote consultations could address more of that underlying constraint.",
              iss(
                "Improving appointment allocation may leave the underlying demand for unnecessary visits unchanged.",
                "A remaining structural problem"
              )
            ],

            [
              "The manager must therefore compare expected patient benefits with the resources required to achieve them.",
              null
            ],

            [
              "Benefit means the improvement a proposal could deliver, rather than the attractiveness of its technology.",
              it(
                1,
                4,
                "target",
                "Expected benefit",
                "Estimate improvements in waiting, access, and service quality."
              )
            ],

            [
              "Cost includes technology, training, clinical preparation, and the continuing resources needed to operate the redesigned service.",
              null
            ],

            [
              "Risk concerns what might go wrong, including unsuitable remote consultations or unreliable patient information.",
              it(
                2,
                4,
                "check",
                "Cost and risk",
                "Examine required resources and the consequences of important uncertainties."
              )
            ],

            [
              "Implementation time matters because patients continue experiencing current problems while the clinic prepares its changes.",
              null
            ],

            [
              "Feasibility asks whether clinicians, patients, and supporting systems can realistically make the proposed arrangement work.",
              it(
                3,
                4,
                "route",
                "Time and feasibility",
                "Assess delivery schedules and the capabilities needed for successful operation."
              )
            ],

            [
              "The manager should also preserve face-to-face care whenever clinical circumstances make remote consultation inappropriate.",
              null
            ],

            [
              "That requirement may reduce the apparent simplicity of redesign, but it protects the quality of care.",
              iss(
                "Remote consultations must not replace examinations that require direct clinical assessment.",
                "An essential constraint"
              )
            ],

            [
              "Notice that neither proposal becomes preferable simply because it promises faster appointments.",
              null
            ],

            [
              "The defensible choice depends on expected value, realistic delivery conditions, and the risks management accepts.",
              q(
                "Which proposal would you recommend if you were responsible for its actual performance?"
              )
            ],

            [
              "When you return to Qasr Marina, apply the same reasoning to its competing arrival designs.",
              null
            ],

            [
              "Compare what each option changes, what it requires, and whether its projected benefits justify those commitments.",
              st(
                "A defensible comparison balances expected benefit, cost, risk, time, and feasibility."
              )
            ]

          ]
        },

        {
          title: "The warehouse deciding whether to automate",

          lines: [

            [
              "Imagine a distribution warehouse where customer orders frequently leave later than promised during busy periods.",
              t(
                "Look beyond the headline benefit",
                "A redesign decision must consider the assumptions behind projected performance."
              )
            ],

            [
              "The operations director receives a proposal for improved picking procedures and another for automated order handling.",
              null
            ],

            [
              "The automated option promises much faster processing, making it immediately attractive to senior management.",
              q(
                "Should the warehouse choose automation simply because its projected processing time is lower?"
              )
            ],

            [
              "Before answering, consider how the warehouse currently prepares and dispatches customer orders.",
              null
            ],

            [
              "Employees collect products from storage locations, verify quantities, and transfer completed orders for packing.",
              dg(
                "The existing order journey",
                D.flow([
                  "Order received",
                  "Products picked",
                  "Quantities checked",
                  "+Order packed"
                ]),
                "The current process depends on coordinated picking, verification, and packing activities."
              )
            ],

            [
              "The procedural improvement could reduce mistakes by making product locations clearer and strengthening employee guidance.",
              null
            ],

            [
              "Automation could change the workflow more substantially, but it depends on reliable product records and compatible equipment.",
              cmp(
                "a",
                "Procedural improvement",
                "Lower disruption, with benefits limited by the existing workflow."
              )
            ],

            [
              "If inventory records are inaccurate, automated equipment may move incorrect products more quickly rather than prevent errors.",
              cmp(
                "b",
                "Automated redesign",
                "Greater potential change, with stronger technology and data dependencies."
              )
            ],

            [
              "This illustrates why projected speed should never be separated from the conditions required to achieve it.",
              null
            ],

            [
              "The director asks whether the warehouse can maintain accurate records and support the proposed technology.",
              iss(
                "Automation cannot reliably improve fulfilment when the information guiding it is inaccurate.",
                "A critical dependency"
              )
            ],

            [
              "The team also considers implementation time because installing equipment may interrupt normal warehouse operations.",
              null
            ],

            [
              "A long installation period could create temporary delays that offset some expected short-term benefits.",
              st(
                "Implementation consequences belong in the comparison alongside expected performance after completion."
              )
            ],

            [
              "Employee training creates another requirement because new equipment changes responsibilities and the skills needed for daily work.",
              null
            ],

            [
              "The director therefore asks what happens when equipment fails during a period of unusually high demand.",
              q(
                "Could employees continue fulfilling urgent orders if the automated system became unavailable?"
              )
            ],

            [
              "A credible proposal includes a workable fallback rather than assuming technology will operate perfectly.",
              null
            ],

            [
              "The team must also estimate continuing maintenance costs instead of comparing only the initial purchase price.",
              it(
                1,
                3,
                "check",
                "Whole-life cost",
                "Consider implementation, training, operation, maintenance, and potential disruption."
              )
            ],

            [
              "These questions do not prove that automation is undesirable, because ambitious redesign may create substantial long-term value.",
              null
            ],

            [
              "They establish what management must understand before treating projected performance as a credible business case.",
              st(
                "A strong business case connects expected improvements with the resources and conditions needed to deliver them."
              )
            ],

            [
              "The warehouse might ultimately choose automation, procedural improvement, or a carefully justified combination.",
              null
            ],

            [
              "Whatever the decision, its rationale should explain the alternatives considered and the uncertainty knowingly accepted.",
              q(
                "What evidence would make the automated proposal worth its additional cost and delivery risk?"
              )
            ]

          ]
        }

      ],

      O2b: [

        {
          title: "The railway station and two passenger journeys",

          lines: [

            [
              "Imagine a busy railway station where passengers spend too long moving from the entrance to their departure platforms.",
              t(
                "Comparing two future journeys",
                "Use the same baseline and distinguish projected benefits from actual results."
              )
            ],

            [
              "The station manager wants a better passenger experience but receives two proposals with very different ambitions.",
              null
            ],

            [
              "One team proposes improving ticket machines and signs while preserving the existing ticket inspection arrangements.",
              cmp(
                "a",
                "Design A · Improve access",
                "Make existing ticketing and inspection activities more efficient."
              )
            ],

            [
              "Another team proposes verified digital tickets that allow eligible passengers to move directly toward their platforms.",
              cmp(
                "b",
                "Design B · Redesign access",
                "Change the passenger journey by moving appropriate verification away from the entrance."
              )
            ],

            [
              "The manager cannot compare these designs fairly without establishing how long the complete journey currently takes.",
              null
            ],

            [
              "A baseline is the measured starting performance against which the proposed improvements will be evaluated.",
              st(
                "Both redesign alternatives must be evaluated against the same clearly defined performance baseline."
              )
            ],

            [
              "Suppose the station measures an average journey of thirty minutes from entrance to platform.",
              null
            ],

            [
              "The improvement team estimates twenty minutes, while the digital redesign team projects twelve minutes.",
              dg(
                "Illustrative station journey times",
                D.bars(
                  ["Current", "Improve", "Redesign"],
                  [30, 20, 12],
                  "minutes"
                ),
                "This hypothetical station example compares a 30-minute baseline with projected journeys of 20 and 12 minutes."
              )
            ],

            [
              "These figures are illustrative estimates, not results that the station has already achieved.",
              null
            ],

            [
              "The more ambitious proposal appears stronger on journey time, but it may require substantial system integration.",
              q(
                "Would the shorter projected journey automatically make digital redesign the better decision?"
              )
            ],

            [
              "Digital access might depend on reliable ticket records, functioning inspection equipment, and appropriate security arrangements.",
              null
            ],

            [
              "Passengers without compatible devices would also need a practical alternative that preserves access to the railway.",
              iss(
                "A digital journey must accommodate passengers who cannot use its standard technology.",
                "An accessibility requirement"
              )
            ],

            [
              "The improvement proposal may be easier to deliver because it changes fewer activities and responsibilities.",
              null
            ],

            [
              "However, it could leave the traditional inspection bottleneck largely unchanged during peak travel periods.",
              st(
                "A less disruptive improvement may preserve the structural constraint responsible for much of the waiting."
              )
            ],

            [
              "The manager should therefore examine the causes of delay rather than relying exclusively on projected journey times.",
              null
            ],

            [
              "If inspection arrangements create the largest bottleneck, redesigning verification may offer greater potential value.",
              dg(
                "Moving verification earlier",
                D.flow([
                  "Ticket purchased",
                  "Ticket verified",
                  "Passenger arrives",
                  "+Platform accessed"
                ]),
                "Earlier ticket verification could reduce entrance delays when appropriate safeguards and access arrangements are maintained."
              )
            ],

            [
              "Yet that potential matters only if the station can implement and operate the proposed system reliably.",
              null
            ],

            [
              "The same reasoning applies to Qasr Marina, where Design A and Design B promise different arrival experiences.",
              st(
                "Compare the complete customer journey, the proposed process changes, and the requirements behind each projection."
              )
            ],

            [
              "Remember that the strongest numerical target is not necessarily the most defensible organisational commitment.",
              null
            ],

            [
              "A sound recommendation explains what each design achieves and whether the organisation can realistically deliver it.",
              q(
                "Which station design would you defend after examining its benefits, dependencies, and implementation risks?"
              )
            ]

          ]
        },

        {
          title: "The restaurant that could speed service or remove waiting",

          lines: [

            [
              "Imagine a popular restaurant where customers regularly wait outside even after making reservations.",
              t(
                "Improve the transaction or redesign the journey",
                "Two options can address the same complaint through fundamentally different process changes."
              )
            ],

            [
              "The restaurant manager discovers that guests often wait while employees confirm reservations and prepare available tables.",
              null
            ],

            [
              "One proposal introduces faster reservation checks and clearer communication between reception and dining staff.",
              cmp(
                "a",
                "Design A · Faster reception",
                "Improve the existing arrival and seating activities."
              )
            ],

            [
              "Another proposal connects reservations with live table readiness and invites guests to arrive when seating is confirmed.",
              cmp(
                "b",
                "Design B · Redesigned arrival",
                "Coordinate table readiness before guests reach the restaurant."
              )
            ],

            [
              "Both proposals aim to reduce waiting, but they change different parts of the customer journey.",
              null
            ],

            [
              "The faster reception option improves the existing transaction while retaining much of the original process.",
              q(
                "Would faster reservation checking eliminate waiting when the customer's table is still unavailable?"
              )
            ],

            [
              "The redesigned arrival option changes when information reaches customers and how table availability shapes their arrival.",
              null
            ],

            [
              "This matters because the visible reception queue may be a symptom of poor coordination with dining operations.",
              iss(
                "Customers may wait because table readiness information is unavailable when they arrive.",
                "A coordination problem"
              )
            ],

            [
              "Suppose the restaurant currently measures an average of twenty-five minutes between arrival and seating.",
              null
            ],

            [
              "Management should compare both proposals against that same baseline rather than using different definitions of waiting.",
              fm(
                "Illustrative current waiting time",
                "25",
                "minutes"
              )
            ],

            [
              "The team must then estimate the improvement each proposal could deliver and identify the evidence supporting those estimates.",
              null
            ],

            [
              "Faster reception might require modest training, while redesigned arrival could depend on reliable table-status information.",
              st(
                "Projected benefits should be evaluated alongside the operational changes required to achieve them."
              )
            ],

            [
              "The restaurant must also consider customers who arrive early or cannot receive digital notifications.",
              null
            ],

            [
              "A workable redesign would provide assistance rather than treating every customer as someone who follows the standard route.",
              dg(
                "A coordinated restaurant arrival",
                D.flow([
                  "Reservation confirmed",
                  "Table status updated",
                  "Guest notified",
                  "+Guest seated"
                ]),
                "The redesigned journey coordinates reservations and table readiness while retaining assistance for unusual situations."
              )
            ],

            [
              "Now imagine the manager asking whether improved reception procedures could support the more ambitious redesign later.",
              null
            ],

            [
              "Better reservation records might be reusable, while equipment tied exclusively to the old process might not be.",
              q(
                "Which early improvements would remain useful if the restaurant eventually redesigned its arrival journey?"
              )
            ],

            [
              "The manager must avoid confusing a larger projected benefit with proof that the ambitious design will succeed.",
              null
            ],

            [
              "The decision should explain which delays each option addresses and what implementation uncertainty the restaurant accepts.",
              st(
                "A credible comparison connects the proposed customer experience with root causes, feasibility, and accepted risk."
              )
            ],

            [
              "At Qasr Marina, apply this same distinction between improving check-in and redesigning the complete arrival experience.",
              null
            ],

            [
              "The essential question is whether the chosen option changes the activities responsible for the customer's waiting.",
              q(
                "Does the proposal merely accelerate reception, or does it remove unnecessary work from the arrival journey?"
              )
            ]

          ]
        }

      ],

      O2c: [

        {
          title: "The university that invested in temporary software",

          lines: [

            [
              "Imagine a university planning to replace several disconnected student administration systems with one integrated platform.",
              t(
                "When a quick win becomes a trap",
                "An early improvement can make the intended future process harder to deliver."
              )
            ],

            [
              "The integrated platform promises better information sharing, but its implementation will require substantial preparation.",
              null
            ],

            [
              "Meanwhile, students continue complaining about delays when requesting official letters and academic records.",
              q(
                "Should the university purchase a temporary system to improve service while preparing the larger transformation?"
              )
            ],

            [
              "A department proposes buying inexpensive software that automates requests within its existing administrative workflow.",
              null
            ],

            [
              "The proposal appears attractive because it could produce visible improvements before the integrated platform becomes available.",
              cmp(
                "a",
                "Immediate improvement",
                "Automate the current departmental request process."
              )
            ],

            [
              "However, the temporary software stores information in a format that the future platform cannot easily use.",
              null
            ],

            [
              "Employees would need to transfer records and learn another set of procedures when the integrated platform arrives.",
              iss(
                "Temporary technology may create migration work and training that the future redesign would otherwise avoid.",
                "The quick-win trap"
              )
            ],

            [
              "The university could therefore spend money improving a process that it intends to replace.",
              null
            ],

            [
              "That earlier expenditure becomes a sunk cost when the organisation cannot recover it through the later decision.",
              st(
                "A sunk cost is money already spent that should not determine which future option creates greater value."
              )
            ],

            [
              "Managers may nevertheless resist replacing the temporary system because they want to justify their earlier investment.",
              null
            ],

            [
              "This creates a risk that yesterday's improvement will influence tomorrow's decision more than the evidence deserves.",
              q(
                "Would management reject a better future process simply because it had already purchased temporary software?"
              )
            ],

            [
              "The problem is not that quick improvements are always undesirable, because some can prepare the organisation for transformation.",
              null
            ],

            [
              "For example, correcting inaccurate student records would improve current services and support the future integrated platform.",
              cmp(
                "b",
                "Reusable quick win",
                "Improve data quality and capabilities needed by the future platform."
              )
            ],

            [
              "Training employees to resolve unusual requests could also remain valuable after the technology changes.",
              null
            ],

            [
              "The university should therefore distinguish reusable capabilities from investments that depend on retaining the old process.",
              dg(
                "A compatible improvement path",
                D.flow([
                  "Clean student records",
                  "Strengthen capabilities",
                  "Integrate systems",
                  "+Improve student service"
                ]),
                "Early improvements can support transformation when their benefits remain useful within the intended future process."
              )
            ],

            [
              "This distinction helps management avoid confusing immediate progress with genuine movement toward its preferred future.",
              null
            ],

            [
              "A quick win should be judged partly by whether it strengthens or obstructs the longer-term redesign.",
              st(
                "A valuable quick win provides early benefits without creating unnecessary barriers to the future process."
              )
            ],

            [
              "Now return to Qasr Marina and consider technology purchased exclusively for its existing reception workflow.",
              null
            ],

            [
              "If that investment cannot support the later arrival redesign, its short-term benefit may carry a hidden cost.",
              q(
                "Which Qasr improvements would remain useful if conventional check-in became optional?"
              )
            ]

          ]
        },

        {
          title: "The transport company and its temporary depot",

          lines: [

            [
              "Imagine a transport company planning a new distribution network that would send suitable deliveries directly to regional destinations.",
              t(
                "The hidden commitment",
                "A short-term solution can create contracts and routines that obstruct later redesign."
              )
            ],

            [
              "The new network could reduce unnecessary transfers, but the company needs time to establish its operating arrangements.",
              null
            ],

            [
              "Customers are already complaining about delays, so management considers opening an additional depot immediately.",
              q(
                "Could a temporary depot solve today's problem while making tomorrow's network more difficult to establish?"
              )
            ],

            [
              "The depot could reduce congestion at existing facilities and demonstrate that management is responding to complaints.",
              null
            ],

            [
              "However, operating it would require a property agreement, new equipment, and employees trained for additional handling.",
              cmp(
                "a",
                "Short-term depot",
                "Increase capacity within the existing distribution structure."
              )
            ],

            [
              "Those commitments might continue after the company introduces its intended direct distribution routes.",
              null
            ],

            [
              "Management could then face costs for facilities and routines that the future process no longer requires.",
              iss(
                "Longer-term commitments can preserve activities that the redesigned network intends to remove.",
                "Structural lock-in"
              )
            ],

            [
              "This is a form of lock-in, where earlier decisions make changing direction more difficult or expensive.",
              null
            ],

            [
              "The depot might also encourage managers to defend the old network because they invested in expanding it.",
              st(
                "An early improvement becomes problematic when it creates financial or organisational pressure to preserve outdated arrangements."
              )
            ],

            [
              "Now imagine another proposal that improves parcel information and prepares employees for direct regional dispatch.",
              null
            ],

            [
              "Accurate destination records would help current operations while remaining useful after the distribution network changes.",
              cmp(
                "b",
                "Compatible quick win",
                "Improve information quality and employee capabilities needed by the future network."
              )
            ],

            [
              "This proposal may produce less dramatic immediate results, but it could reduce the difficulty of later implementation.",
              null
            ],

            [
              "The company should compare these alternatives against both present service needs and future strategic requirements.",
              dg(
                "Building toward the future network",
                D.flow([
                  "Improve parcel data",
                  "Prepare employees",
                  "Redesign routes",
                  "+Direct distribution"
                ]),
                "A compatible improvement strengthens capabilities that remain useful when the distribution network is redesigned."
              )
            ],

            [
              "A staged approach is defensible when each stage contributes to the intended destination rather than creating unnecessary detours.",
              null
            ],

            [
              "But the company must still examine contracts, implementation schedules, and resources before claiming that staging is feasible.",
              q(
                "What would happen if the temporary depot contract extended beyond the planned network redesign?"
              )
            ],

            [
              "The example shows that the quickest response is not always the most responsible response.",
              null
            ],

            [
              "Management must understand what it gains immediately and what future flexibility it may sacrifice.",
              st(
                "A defensible quick-win decision considers immediate benefits, future compatibility, and the risk of lock-in."
              )
            ],

            [
              "At Qasr Marina, the same reasoning applies when considering Design A before the more ambitious Design B.",
              null
            ],

            [
              "The crucial question is whether early investment supports the future arrival experience or reinforces the old process.",
              q(
                "Would the proposed quick win make Qasr better prepared for its preferred long-term design?"
              )
            ]

          ]
        }

      ],
O3a: [

        {
          title: "The supermarket that automated the wrong activity",

          lines: [

            [
              "Imagine a supermarket where customers complain about long waits when collecting groceries ordered online.",
              t(
                "Technology should change the work",
                "Automating an existing activity does not necessarily remove the cause of delay."
              )
            ],

            [
              "The manager proposes faster barcode scanners because employees spend time checking each collected order.",
              null
            ],

            [
              "The scanners might improve checking speed, but the team discovers that missing products cause most delays.",
              iss(
                "Orders cannot be completed when promised products are unavailable at collection.",
                "The underlying constraint"
              )
            ],

            [
              "Employees often discover shortages only after customers arrive, forcing them to search shelves and suggest substitutions.",
              null
            ],

            [
              "A faster scanner cannot make an unavailable product appear, so the proposed technology addresses the wrong activity.",
              q(
                "What information should become available before the customer reaches the collection counter?"
              )
            ],

            [
              "The redesign team proposes connecting online orders with reliable stock information and earlier picking activities.",
              null
            ],

            [
              "When an order arrives, the system checks availability and alerts employees before the promised collection time.",
              dg(
                "Redesigned grocery collection",
                D.flow([
                  "Order received",
                  "Stock checked",
                  "Products prepared",
                  "+Customer collects"
                ]),
                "Earlier stock checking allows employees to identify shortages before customers arrive."
              )
            ],

            [
              "If a product is unavailable, employees can contact the customer about an appropriate substitution.",
              null
            ],

            [
              "This changes the timing of work rather than simply accelerating the final collection transaction.",
              st(
                "Technology creates greater value when it removes unnecessary waiting or changes when essential activities occur."
              )
            ],

            [
              "The proposed process also requires accurate stock records because automation cannot compensate for unreliable information.",
              null
            ],

            [
              "If the system reports products that are missing, customers may still arrive to discover incomplete orders.",
              iss(
                "Inaccurate stock information can undermine an otherwise promising automated collection process.",
                "A technology dependency"
              )
            ],

            [
              "The team therefore includes stock accuracy and exception handling within the redesign rather than treating them as separate concerns.",
              null
            ],

            [
              "Employees remain responsible for unusual orders because some substitutions require customer judgement or additional assistance.",
              cmp(
                "a",
                "Technology alone",
                "Faster scanning preserves the existing problem of discovering shortages late."
              )
            ],

            [
              "The improved workflow could reduce waiting by coordinating information and preparation before the customer arrives.",
              cmp(
                "b",
                "Technology-enabled redesign",
                "Reliable stock information supports earlier preparation and timely exception handling."
              )
            ],

            [
              "Notice that the supermarket has not simply purchased equipment and hoped for better performance.",
              null
            ],

            [
              "It has identified the cause of delay and selected technology that supports a different process.",
              q(
                "Would the same redesign principle help Qasr move corporate rate checks before guest arrival?"
              )
            ],

            [
              "Remember that the desired process should guide technology selection rather than being shaped around an attractive device.",
              null
            ],

            [
              "A strong redesign connects digital capabilities with customer value, reliable information, and necessary human support.",
              st(
                "Design the workflow around the customer outcome, then use technology to make that workflow possible."
              )
            ]

          ]
        },

        {
          title: "The maintenance team that connected its information",

          lines: [

            [
              "Imagine a property maintenance company whose technicians frequently arrive at buildings without the correct replacement parts.",
              t(
                "Connecting information across the process",
                "Shared information can prevent wasted journeys and repeated coordination."
              )
            ],

            [
              "The operations manager proposes a mobile application that allows technicians to complete service reports more quickly.",
              null
            ],

            [
              "That improvement could reduce paperwork, but it would not necessarily prevent technicians from arriving unprepared.",
              q(
                "Would faster reporting solve the problem of missing parts?"
              )
            ],

            [
              "The improvement team discovers that customer service records faults separately from the warehouse inventory system.",
              null
            ],

            [
              "Technicians receive job assignments without reliable confirmation that the required parts are available.",
              iss(
                "Disconnected fault records and inventory information create unnecessary technician journeys.",
                "The coordination problem"
              )
            ],

            [
              "The redesign team proposes a shared work order connecting the reported fault with parts availability.",
              null
            ],

            [
              "A work order is the record describing the service request, required activities, and responsibility for completion.",
              dg(
                "Connected maintenance information",
                D.flow([
                  "Fault reported",
                  "Parts checked",
                  "Technician assigned",
                  "+Repair completed"
                ]),
                "The redesigned process checks parts availability before assigning a technician to complete the repair."
              )
            ],

            [
              "When a customer reports a problem, the system helps employees identify likely requirements before scheduling the visit.",
              null
            ],

            [
              "The warehouse can then confirm whether suitable parts are available or whether additional preparation is needed.",
              st(
                "Reliable shared information helps departments coordinate work before costly physical activities begin."
              )
            ],

            [
              "This changes the workflow because scheduling now depends on information that previously arrived too late.",
              null
            ],

            [
              "The mobile application remains useful, but its value comes from supporting the redesigned coordination process.",
              cmp(
                "a",
                "Technology added to old work",
                "Technicians complete reports faster but may still arrive without necessary parts."
              )
            ],

            [
              "The company must also consider unusual faults that cannot be diagnosed accurately before an inspection.",
              null
            ],

            [
              "Those cases require an appropriate diagnostic visit rather than an automated assumption about replacement parts.",
              cmp(
                "b",
                "Technology supporting redesign",
                "Shared work orders coordinate preparation while preserving specialist judgement."
              )
            ],

            [
              "This distinction matters because technology should support decisions without pretending every situation follows a predictable pattern.",
              null
            ],

            [
              "The redesigned process therefore includes a route for technicians to update requirements when new evidence appears.",
              iss(
                "Unexpected faults require a controlled way to revise work orders and obtain additional parts.",
                "Exception handling"
              )
            ],

            [
              "The team should test whether information remains accurate as customer service, warehouse employees, and technicians update records.",
              null
            ],

            [
              "If those updates fail, the shared system could reproduce the original coordination problem in digital form.",
              q(
                "What would happen if the warehouse confirmed availability but another technician used the part?"
              )
            ],

            [
              "The lesson is that digital integration creates value only when information and responsibilities remain reliable.",
              null
            ],

            [
              "At Qasr Marina, the same principle connects booking records, rate confirmation, room readiness, and guest access.",
              st(
                "Technology-enabled redesign changes how information supports work across the complete process."
              )
            ]

          ]
        }

      ],

      O3b: [

        {
          title: "The bank that redesigned account opening",

          lines: [

            [
              "Imagine a bank introducing digital account opening so customers can complete applications without visiting a branch.",
              t(
                "Designing for exceptions",
                "A convenient standard process still needs reliable handling of unusual cases."
              )
            ],

            [
              "The demonstration works beautifully when customers provide complete information and their identification is verified automatically.",
              null
            ],

            [
              "The project team celebrates because the digital journey removes several traditional branch transactions.",
              q(
                "What happens when a customer's identity cannot be verified through the standard digital route?"
              )
            ],

            [
              "During testing, an applicant submits a valid document that the verification system cannot recognise.",
              null
            ],

            [
              "The application stops, leaving the customer uncertain about whether the bank has received the information.",
              iss(
                "An unsuccessful identity check leaves the customer without a clear route to completion.",
                "A process exception"
              )
            ],

            [
              "An exception is a case that cannot follow the normal process without additional investigation or assistance.",
              null
            ],

            [
              "The bank must preserve necessary identity controls because convenience cannot justify opening accounts without appropriate verification.",
              st(
                "A redesigned process must retain essential controls even when their execution changes."
              )
            ],

            [
              "The team therefore creates a controlled route allowing authorised employees to examine unusual applications.",
              null
            ],

            [
              "Customers receive clear instructions and can obtain assistance rather than repeatedly attempting the same unsuccessful check.",
              dg(
                "Digital account opening with assistance",
                D.flow([
                  "Application submitted",
                  "Verification attempted",
                  "Exception reviewed",
                  "+Account decision"
                ]),
                "Applications requiring additional verification move to an authorised review route rather than remaining unresolved."
              )
            ],

            [
              "This alternative is called a fallback, meaning a workable route when the preferred process cannot continue.",
              null
            ],

            [
              "A fallback should preserve security and customer access instead of simply bypassing the failed activity.",
              cmp(
                "a",
                "Weak exception handling",
                "The customer repeatedly attempts verification without receiving effective assistance."
              )
            ],

            [
              "The bank also considers applicants who need accessibility support or cannot use the required digital technology.",
              null
            ],

            [
              "A customer-centred design provides appropriate assistance without treating these applicants as failures of the system.",
              cmp(
                "b",
                "Workable exception handling",
                "Authorised employees resolve unusual cases while preserving verification and accessibility."
              )
            ],

            [
              "Employee responsibilities must be clear because unresolved applications can otherwise move repeatedly between departments.",
              null
            ],

            [
              "The team defines who investigates discrepancies and who has authority to approve the resulting account decision.",
              iss(
                "Unclear ownership can leave unusual applications unresolved even when the technology functions correctly.",
                "Responsibility gap"
              )
            ],

            [
              "These requirements affect the future process itself, so they cannot be postponed until after implementation.",
              null
            ],

            [
              "The bank should test difficult applications to confirm that the alternative route operates safely and efficiently.",
              q(
                "Could the redesigned account process still serve customers when automatic verification is unavailable?"
              )
            ],

            [
              "Remember that successful redesign accommodates real customer variation rather than assuming every case follows ideal conditions.",
              null
            ],

            [
              "The same principle applies to Qasr guests who need assistance or cannot complete digital arrival.",
              st(
                "A workable to-be process combines efficient standard activities with safe, accessible exception handling."
              )
            ]

          ]
        },

        {
          title: "The factory that depended on one supplier",

          lines: [

            [
              "Imagine a furniture factory redesigning production so customer orders move directly into an automated cutting system.",
              t(
                "Dependencies determine feasibility",
                "A future process must work within real organisational and external constraints."
              )
            ],

            [
              "The proposed workflow promises fewer manual transfers and more consistent preparation of furniture components.",
              null
            ],

            [
              "However, the new cutting system depends on a specialist supplier providing compatible materials at predictable times.",
              q(
                "Can the factory promise faster production when a critical supplier cannot guarantee delivery?"
              )
            ],

            [
              "The redesign team initially treats supplier availability as a purchasing issue outside the process design.",
              null
            ],

            [
              "But delayed materials would stop production regardless of how efficiently the automated equipment performs.",
              iss(
                "Unreliable material supply can prevent the redesigned production process from operating as intended.",
                "An external dependency"
              )
            ],

            [
              "A dependency is a condition that must be satisfied before another activity can proceed successfully.",
              null
            ],

            [
              "The team therefore examines supplier commitments and whether suitable alternative materials can be approved.",
              st(
                "Feasibility depends on the availability of resources and conditions required by the proposed workflow."
              )
            ],

            [
              "It also discovers that experienced operators need additional training before they can manage the automated equipment safely.",
              null
            ],

            [
              "Training matters because new technology changes employee responsibilities rather than eliminating the need for human judgement.",
              cmp(
                "a",
                "Current operator role",
                "Employees perform manual cutting and inspect completed components."
              )
            ],

            [
              "Under the proposed design, employees would monitor automated operations and respond when material specifications require attention.",
              cmp(
                "b",
                "Redesigned operator role",
                "Employees supervise automated cutting and resolve situations requiring specialist judgement."
              )
            ],

            [
              "The factory must therefore assess whether sufficient employees can acquire those capabilities before the intended launch.",
              null
            ],

            [
              "Management also discovers that maintenance support depends on contractual arrangements with the equipment provider.",
              iss(
                "Unresolved maintenance commitments could leave production stopped when specialist equipment fails.",
                "Contractual constraint"
              )
            ],

            [
              "A faster design is not feasible if equipment failures cannot be resolved within acceptable operating conditions.",
              null
            ],

            [
              "The team develops a contingency arrangement for production interruptions rather than assuming failures will never occur.",
              dg(
                "Production contingency",
                D.flow([
                  "Equipment monitored",
                  "Problem detected",
                  "Support activated",
                  "+Production restored"
                ]),
                "The proposed process includes a defined response when critical production equipment becomes unavailable."
              )
            ],

            [
              "This does not guarantee uninterrupted production, but it makes responsibilities and recovery arrangements more credible.",
              null
            ],

            [
              "The factory must also preserve necessary safety requirements when changing how cutting activities are performed.",
              q(
                "Would faster production justify operating equipment without the required safety controls?"
              )
            ],

            [
              "The answer is no, because essential controls remain necessary even when technology changes their execution.",
              null
            ],

            [
              "The team now understands that feasibility includes suppliers, employee capabilities, contracts, and safe operating arrangements.",
              st(
                "A credible redesign identifies critical dependencies and provides workable responses when expected conditions fail."
              )
            ],

            [
              "At Qasr Marina, equivalent dependencies involve connected systems, regulatory requirements, staff readiness, and guest assistance.",
              null
            ],

            [
              "The strongest design makes those requirements visible before the organisation commits to implementation.",
              null
            ]

          ]
        }

      ],

      O3c: [

        {
          title: "The museum testing its new visitor journey",

          lines: [

            [
              "Imagine a museum designing a new visitor journey that allows guests to reserve entry times and receive digital tickets.",
              t(
                "Test beyond the ideal visitor",
                "A convincing process diagram must survive realistic operating conditions."
              )
            ],

            [
              "The proposed process looks efficient because visitors can complete ticket checks before reaching the entrance.",
              null
            ],

            [
              "During a demonstration, one visitor arrives with a valid digital ticket and enters without difficulty.",
              q(
                "Does one successful visitor journey prove that the redesigned process is ready for implementation?"
              )
            ],

            [
              "The demonstration confirms that the standard route can work, but it does not reveal how the system handles pressure.",
              null
            ],

            [
              "The team therefore imagines a school group arriving alongside several hundred visitors during a popular exhibition.",
              iss(
                "Simultaneous arrivals may overwhelm entry verification and visitor assistance.",
                "Peak-demand risk"
              )
            ],

            [
              "Peak demand occurs when service requests become concentrated within a short period rather than arriving evenly.",
              null
            ],

            [
              "The museum tests whether ticket verification and entrance staffing can handle that concentration without creating dangerous congestion.",
              dg(
                "Testing a busy museum entrance",
                D.flow([
                  "Visitors arrive",
                  "Tickets checked",
                  "Exceptions assisted",
                  "+Visitors enter"
                ]),
                "The peak-demand test examines whether verification and assistance remain workable during concentrated arrivals."
              )
            ],

            [
              "The test reveals that one employee handles every ticket exception while also answering general visitor questions.",
              null
            ],

            [
              "That responsibility creates a bottleneck, meaning an activity whose limited capacity restricts the wider process.",
              st(
                "Testing can reveal hidden capacity constraints that remain invisible during a successful demonstration."
              )
            ],

            [
              "The team revises responsibilities so trained employees can resolve common exceptions without interrupting routine entry.",
              null
            ],

            [
              "It then tests visitors whose tickets cannot be displayed because their phones have stopped working.",
              q(
                "How should the museum verify legitimate reservations when visitors cannot display digital tickets?"
              )
            ],

            [
              "A controlled alternative allows employees to retrieve reservations using appropriate information while preserving admission checks.",
              null
            ],

            [
              "The team also considers visitors who need accessibility assistance or cannot navigate the standard digital route.",
              cmp(
                "a",
                "Standard journey",
                "Visitors with valid digital tickets complete routine verification efficiently."
              )
            ],

            [
              "These cases matter because the redesigned process must serve real visitors rather than only ideal demonstration participants.",
              cmp(
                "b",
                "Assisted journey",
                "Employees provide accessible verification and support when the standard route cannot proceed."
              )
            ],

            [
              "Testing reveals where the proposed workflow needs clearer responsibilities, additional capacity, or alternative arrangements.",
              null
            ],

            [
              "The team records these findings and revises the design before committing to full implementation.",
              st(
                "Discovering weaknesses during design is more valuable than allowing customers to encounter them during live operations."
              )
            ],

            [
              "The museum has not yet proved every projected benefit, but its testing provides stronger evidence about feasibility.",
              null
            ],

            [
              "At Qasr Marina, the same reasoning applies to simultaneous arrivals, digital verification failures, and guests needing assistance.",
              q(
                "Which difficult arrival situation would you test before recommending Qasr's more ambitious redesign?"
              )
            ],

            [
              "Remember that a workable process must handle both routine cases and the situations that challenge its assumptions.",
              null
            ],

            [
              "Testing turns an attractive proposal into a more credible design by exposing weaknesses before implementation.",
              st(
                "A credible to-be process is tested against realistic demand, exceptions, and operational dependencies."
              )
            ]

          ]
        },

        {
          title: "The courier company testing a redesigned dispatch process",

          lines: [

            [
              "Imagine a courier company proposing a new dispatch process that automatically assigns deliveries to available drivers.",
              t(
                "Challenge the design assumptions",
                "Testing should expose weaknesses before the organisation depends on the redesigned process."
              )
            ],

            [
              "The new system considers delivery locations and driver availability when preparing daily assignments.",
              null
            ],

            [
              "During a demonstration, every parcel reaches its destination within the planned schedule.",
              q(
                "Would you approve the redesign after seeing only one successful delivery simulation?"
              )
            ],

            [
              "The operations manager remains cautious because the demonstration assumes accurate addresses and uninterrupted driver availability.",
              null
            ],

            [
              "Those assumptions may not hold when customers change destinations or vehicles become unavailable.",
              iss(
                "Unexpected address changes and vehicle failures can disrupt automated delivery assignments.",
                "Untested assumptions"
              )
            ],

            [
              "The team begins testing unusual situations rather than repeating the same successful demonstration.",
              null
            ],

            [
              "Imagine a customer correcting an address after the system has already assigned the parcel to a driver.",
              dg(
                "Testing an address change",
                D.flow([
                  "Delivery assigned",
                  "Address corrected",
                  "Route reviewed",
                  "+Assignment updated"
                ]),
                "The redesigned process must provide a controlled response when delivery information changes after assignment."
              )
            ],

            [
              "The system must explain who can approve the change and how the driver receives accurate instructions.",
              null
            ],

            [
              "Without clear ownership, automated dispatch could distribute incorrect information faster than the original manual process.",
              st(
                "Automation increases the importance of accurate information and clear responsibility for exceptions."
              )
            ],

            [
              "Now imagine a delivery vehicle breaking down while carrying several urgent parcels.",
              null
            ],

            [
              "The team tests whether remaining drivers can accept reassigned work without creating unrealistic schedules.",
              q(
                "Can the redesigned dispatch process recover when an assigned driver becomes unavailable?"
              )
            ],

            [
              "A fallback route allows dispatch employees to review priorities and arrange suitable alternative delivery assignments.",
              null
            ],

            [
              "That response should preserve safety requirements rather than pressuring drivers to compensate through unsafe behaviour.",
              cmp(
                "a",
                "Normal dispatch",
                "The system assigns deliveries using reliable information and available capacity."
              )
            ],

            [
              "The company also tests unusually high order volumes because average demand can hide important capacity limitations.",
              null
            ],

            [
              "A process that works with ordinary demand may fail when many urgent orders arrive together.",
              cmp(
                "b",
                "Disrupted dispatch",
                "Employees manage exceptions when information, capacity, or vehicle availability changes."
              )
            ],

            [
              "Frontline drivers participate because they understand road conditions and delivery difficulties that software demonstrations may overlook.",
              null
            ],

            [
              "Their observations help the team identify unrealistic assumptions and improve the proposed decision rules.",
              iss(
                "Ignoring frontline experience can leave practical delivery constraints outside the redesigned workflow.",
                "Design validation risk"
              )
            ],

            [
              "The company records the problems discovered and adjusts the future process before making implementation commitments.",
              null
            ],

            [
              "Testing does not guarantee perfect performance, but it provides evidence about whether the design can operate reliably.",
              st(
                "A useful test challenges the conditions required for success rather than merely demonstrating the intended outcome."
              )
            ],

            [
              "The same principle applies when Qasr evaluates its proposed digital arrival journey.",
              null
            ],

            [
              "A convincing recommendation must explain how the process handles difficult cases and what remains uncertain.",
              q(
                "What evidence would persuade you that Qasr's proposed arrival process is genuinely workable?"
              )
            ]

          ]
        }

      ],
O2d: [

        {
          title: "The city choosing how to improve bus services",

          lines: [

            [
              "Imagine a city transport authority facing complaints about unreliable buses and long passenger waiting times.",
              t(
                "Defending a redesign decision",
                "A responsible choice explains the expected benefit and the risk being accepted."
              )
            ],

            [
              "The authority has investigated the delays and now faces two competing proposals for improving the service.",
              null
            ],

            [
              "One proposal adjusts timetables and improves dispatch coordination while preserving the existing network.",
              cmp(
                "a",
                "Improve existing operations",
                "Adjust schedules and coordination while retaining established bus routes."
              )
            ],

            [
              "Another proposal redesigns routes around major passenger destinations and introduces coordinated connections between services.",
              cmp(
                "b",
                "Redesign the network",
                "Change routes and connections to address structural causes of passenger waiting."
              )
            ],

            [
              "The transport director prefers the timetable improvement because it appears cheaper and easier to implement.",
              null
            ],

            [
              "However, the planning manager argues that disconnected routes create delays that timetable adjustments cannot fully remove.",
              q(
                "Should the authority choose earlier relief or pursue a more substantial network redesign?"
              )
            ],

            [
              "The committee needs evidence about passenger benefits and the resources required by each alternative.",
              null
            ],

            [
              "The timetable proposal could provide earlier improvements, but passengers might continue making unnecessary connections.",
              iss(
                "Improved scheduling may leave inefficient route connections largely unchanged.",
                "Risk accepted with limited improvement"
              )
            ],

            [
              "The network redesign could reduce those connections, but it requires new arrangements and substantial passenger communication.",
              null
            ],

            [
              "Changing routes may also inconvenience some passengers even when the overall network becomes more efficient.",
              st(
                "A redesign decision must consider who benefits, who experiences disruption, and whether the organisation can deliver."
              )
            ],

            [
              "Now imagine the committee considering a staged approach that improves information while preparing the new network.",
              null
            ],

            [
              "Reliable passenger information could support both alternatives without committing the authority to outdated routes.",
              dg(
                "A compatible improvement path",
                D.flow([
                  "Improve information",
                  "Validate new routes",
                  "Prepare operations",
                  "+Introduce network"
                ]),
                "Early information improvements can support the proposed network redesign without preserving unnecessary route arrangements."
              )
            ],

            [
              "That approach deserves consideration because it may provide immediate value while strengthening future delivery capabilities.",
              null
            ],

            [
              "However, the committee must confirm that the proposed stages are affordable and operationally realistic.",
              q(
                "What evidence would demonstrate that the staged approach is feasible rather than merely attractive?"
              )
            ],

            [
              "Suppose the committee conditionally supports network redesign because the current routes create persistent structural delays.",
              null
            ],

            [
              "Its recommendation should explain why expected benefits justify the additional cost, disruption, and implementation uncertainty.",
              cmp(
                "b",
                "Conditional recommendation",
                "Support network redesign if operational readiness and passenger access can be demonstrated."
              )
            ],

            [
              "The authority should also state what circumstances would cause it to reconsider that recommendation.",
              null
            ],

            [
              "For example, unresolved accessibility problems could justify delaying implementation until suitable arrangements are demonstrated.",
              iss(
                "Unresolved passenger accessibility requirements can make an otherwise attractive network redesign unacceptable.",
                "Decision condition"
              )
            ],

            [
              "Notice that the committee has not discovered a risk-free option because every alternative involves trade-offs.",
              null
            ],

            [
              "Its responsibility is to make those trade-offs explicit and explain why the selected risk is acceptable.",
              st(
                "A defensible recommendation identifies the preferred option, supporting evidence, rejected alternatives, and accepted risk."
              )
            ],

            [
              "At Qasr Marina, apply the same reasoning when comparing earlier check-in improvement with ambitious arrival redesign.",
              null
            ],

            [
              "The strongest decision is the one management can justify and realistically support, not necessarily the most ambitious.",
              q(
                "Could you defend your preferred Qasr design while acknowledging its most serious weakness?"
              )
            ]

          ]
        },

        {
          title: "The manufacturer facing an uncertain redesign",

          lines: [

            [
              "Imagine a regional manufacturer deciding whether to improve its existing production line or introduce a substantially redesigned process.",
              t(
                "Make uncertainty part of the decision",
                "A credible recommendation distinguishes expected benefits from assumptions that remain unproven."
              )
            ],

            [
              "The current line produces reliable products, but repeated transfers between workstations create unnecessary waiting.",
              null
            ],

            [
              "One team proposes better workstation coordination, while another recommends replacing several transfers with integrated equipment.",
              q(
                "Which proposal should management support when the ambitious option promises more but depends on uncertain capabilities?"
              )
            ],

            [
              "The coordination proposal requires limited disruption because employees would continue using familiar production equipment.",
              null
            ],

            [
              "However, it would preserve some transfers that contribute to the existing delays.",
              cmp(
                "a",
                "Improve coordination",
                "Deliver a less disruptive improvement while retaining some structural limitations."
              )
            ],

            [
              "The integrated equipment could remove unnecessary handling, but its expected performance depends on reliable installation and operation.",
              cmp(
                "b",
                "Redesign production",
                "Remove structural transfers while accepting stronger technology and delivery dependencies."
              )
            ],

            [
              "The ambitious proposal therefore offers a potentially greater benefit without guaranteeing that the manufacturer can achieve it.",
              null
            ],

            [
              "Management asks whether employees possess the skills needed to operate and maintain the proposed equipment.",
              iss(
                "Unproven operating capabilities could prevent the redesigned production process from achieving its expected benefits.",
                "Critical uncertainty"
              )
            ],

            [
              "The team discovers that specialist training and supplier support would be necessary before the new process could operate.",
              null
            ],

            [
              "Those requirements do not automatically invalidate redesign, but they affect its feasibility and implementation schedule.",
              st(
                "An unresolved dependency should influence the recommendation rather than disappear behind an attractive performance estimate."
              )
            ],

            [
              "The production director suggests testing the equipment with representative products before committing to full replacement.",
              null
            ],

            [
              "A controlled trial could reveal whether the proposed workflow performs reliably under realistic production conditions.",
              dg(
                "Testing the ambitious option",
                D.flow([
                  "Proposed design",
                  "Representative trial",
                  "Results reviewed",
                  "+Decision refined"
                ]),
                "A controlled trial provides evidence about the redesigned process before management makes a larger implementation commitment."
              )
            ],

            [
              "Suppose the trial reveals difficulty handling unusual product specifications, despite strong results for standard products.",
              null
            ],

            [
              "Management must then decide whether additional development can resolve the weakness at an acceptable cost.",
              q(
                "Would you approve the redesign before understanding how unusual products will be handled?"
              )
            ],

            [
              "A conditional recommendation might support redesign only after the equipment demonstrates reliable handling of those cases.",
              null
            ],

            [
              "Alternatively, management could choose limited improvement while accepting that some structural waiting will remain.",
              iss(
                "Choosing limited improvement means accepting that the underlying transfer problem may not disappear.",
                "Risk of the safer alternative"
              )
            ],

            [
              "Neither recommendation is automatically correct because the appropriate choice depends on evidence and organisational readiness.",
              null
            ],

            [
              "The important discipline is explaining why the selected option justifies its costs and uncertainties.",
              st(
                "A sound redesign decision connects expected benefits with feasibility, supporting evidence, and consciously accepted risk."
              )
            ],

            [
              "The manufacturer should also record which new evidence would justify revisiting its decision.",
              null
            ],

            [
              "That makes the recommendation accountable without pretending the future can be predicted perfectly.",
              q(
                "What evidence would cause you to change your preferred recommendation?"
              )
            ],

            [
              "For Qasr Marina, the same reasoning applies to digital verification, system integration, and employee readiness.",
              null
            ],

            [
              "A defensible decision recognises uncertainty and identifies what must be demonstrated before ambitious change proceeds.",
              st(
                "Choose the option whose expected value and delivery conditions can be defended with credible evidence."
              )
            ]

          ]
        }

      ],

      O2e: [

        {
          title: "The university handing over a redesigned admissions process",

          lines: [

            [
              "Imagine a university completing the design of a new admissions process that reduces repeated document submissions.",
              t(
                "Turning design into a usable handover",
                "The future process must be clear enough for others to develop and implement."
              )
            ],

            [
              "The project team has proposed a shared application record that connects admissions officers with academic departments.",
              null
            ],

            [
              "Senior management approves the concept and asks the team to prepare the next stage of work.",
              q(
                "What must the team communicate so the redesigned admissions process can become operational?"
              )
            ],

            [
              "A colourful process diagram is helpful, but it cannot explain every responsibility or unresolved implementation requirement.",
              null
            ],

            [
              "The handover must show how applications should move through the future process and who performs necessary activities.",
              dg(
                "The proposed admissions journey",
                D.flow([
                  "Application received",
                  "Documents verified",
                  "Academic review",
                  "+Decision communicated"
                ]),
                "The proposed process connects document verification and academic review through a coordinated application journey."
              )
            ],

            [
              "Admissions employees need to know when applications are ready for academic review and who resolves missing information.",
              null
            ],

            [
              "Without clear ownership, the new shared record could expose problems without ensuring anyone resolves them.",
              iss(
                "Unclear responsibility can recreate delays even when information becomes available through one system.",
                "Handover risk"
              )
            ],

            [
              "The team therefore documents the responsibilities and handoffs required by the proposed workflow.",
              null
            ],

            [
              "It also explains why the design was selected, linking repeated submissions with the original admissions difficulties.",
              st(
                "A useful handover connects design decisions with the problems they are intended to solve."
              )
            ],

            [
              "Now imagine the university promising faster admissions decisions without recording how current performance was measured.",
              null
            ],

            [
              "Management would struggle to establish whether the new process actually delivered the expected improvement.",
              q(
                "How can the university evaluate success without a reliable starting measure?"
              )
            ],

            [
              "The team therefore records the current decision time as a baseline and defines a proposed future target.",
              null
            ],

            [
              "A baseline describes existing performance, while a target states what the redesigned process aims to achieve.",
              cmp(
                "a",
                "Baseline",
                "Measured admissions performance before the proposed redesign."
              )
            ],

            [
              "The target remains a commitment to investigate and deliver rather than proof of improvement already achieved.",
              cmp(
                "b",
                "Target",
                "The intended performance that later implementation and evaluation must verify."
              )
            ],

            [
              "The handover must also identify technology dependencies because shared records require reliable access and accurate information.",
              null
            ],

            [
              "Employees may need training, while unusual applications still require appropriate academic and administrative judgement.",
              iss(
                "Incomplete training or unresolved exception handling could undermine the future admissions process.",
                "Delivery requirement"
              )
            ],

            [
              "The team records these requirements so later work can address them before the new process becomes operational.",
              null
            ],

            [
              "This is why Innovate should not be confused with implementation or proof that the intended benefits exist.",
              st(
                "Innovate produces a justified future design that later work must develop, implement, and evaluate."
              )
            ],

            [
              "The university now has a clearer proposal because its design, rationale, measures, and dependencies are documented.",
              null
            ],

            [
              "At Qasr Marina, the same handover discipline applies to the proposed guest arrival journey.",
              q(
                "Could another team understand Qasr's proposed process and its unresolved requirements from the handover?"
              )
            ]

          ]
        },

        {
          title: "The water utility preparing a new repair process",

          lines: [

            [
              "Imagine a water utility redesigning how it responds when customers report leaks in neighbourhood distribution pipes.",
              t(
                "A handover that protects the intended benefits",
                "Design decisions must remain understandable when responsibility moves to delivery teams."
              )
            ],

            [
              "The current process sometimes sends repair crews without reliable information about the location or severity of faults.",
              null
            ],

            [
              "The proposed redesign connects customer reports with technical assessment before crews receive their assignments.",
              dg(
                "The proposed repair journey",
                D.flow([
                  "Leak reported",
                  "Fault assessed",
                  "Crew assigned",
                  "+Repair completed"
                ]),
                "The redesigned process uses fault assessment to prepare repair crews before dispatch."
              )
            ],

            [
              "The design team believes this could reduce unnecessary journeys and help crews reach urgent problems sooner.",
              null
            ],

            [
              "However, the utility cannot simply announce the redesign and expect employees to understand their new responsibilities.",
              q(
                "What information would repair managers need before taking responsibility for the proposed process?"
              )
            ],

            [
              "They need a clear process map showing how reports move between customer service and technical operations.",
              null
            ],

            [
              "The map should identify who assesses urgency and who has authority to dispatch emergency crews.",
              st(
                "A future process map should make responsibilities and important decisions visible across organisational boundaries."
              )
            ],

            [
              "The team also explains why early assessment matters, connecting unnecessary journeys with incomplete fault information.",
              null
            ],

            [
              "That rationale helps employees understand the purpose of change rather than treating new procedures as arbitrary instructions.",
              cmp(
                "a",
                "Incomplete handover",
                "Employees receive a new workflow without understanding its purpose or responsibilities."
              )
            ],

            [
              "A stronger handover connects the proposed activities with the root causes identified during process investigation.",
              cmp(
                "b",
                "Complete handover",
                "Employees understand the proposed workflow, design rationale, and responsibilities."
              )
            ],

            [
              "Now consider performance measurement, because management wants evidence that the redesigned process improves repair responsiveness.",
              null
            ],

            [
              "The team records current response performance and defines how future response times will be measured.",
              q(
                "How would the utility know whether its new process actually improves emergency response?"
              )
            ],

            [
              "It must also consider repair quality because faster dispatch does not guarantee that faults are resolved safely.",
              null
            ],

            [
              "Measures should therefore reflect customer outcomes and essential operating controls rather than speed alone.",
              st(
                "Success measures should capture intended benefits without ignoring quality, safety, or necessary controls."
              )
            ],

            [
              "The proposed workflow depends on reliable location information and communication between customer service and repair crews.",
              null
            ],

            [
              "If those systems cannot exchange accurate information, the intended improvement may remain impossible to deliver.",
              iss(
                "Unresolved information dependencies can prevent the proposed repair process from operating reliably.",
                "Technology requirement"
              )
            ],

            [
              "The handover must therefore record system requirements and identify the teams responsible for resolving them.",
              null
            ],

            [
              "It should also describe emergency exceptions because serious leaks may require immediate action before routine assessment finishes.",
              dg(
                "Handling an urgent leak",
                D.flow([
                  "Urgent report",
                  "Priority confirmed",
                  "Emergency crew",
                  "+Safe response"
                ]),
                "The proposed process includes an appropriate emergency route when waiting for routine assessment would be unsafe."
              )
            ],

            [
              "These arrangements remain proposed until later work demonstrates that employees and systems can operate them.",
              null
            ],

            [
              "A credible handover therefore distinguishes the intended future process from benefits that have already been verified.",
              st(
                "The handover documents the proposed design, measurable targets, essential requirements, and remaining uncertainties."
              )
            ],

            [
              "The same discipline helps Qasr transfer its preferred arrival design into the next phase of work.",
              null
            ],

            [
              "Remember that a strong Innovate handover explains what should change, why it matters, and what delivery requires.",
              q(
                "Could the receiving team implement the intended process without guessing about responsibilities or unresolved assumptions?"
              )
            ]

          ]
        }

      ],

    }

  };

})();