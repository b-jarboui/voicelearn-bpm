// Adaptive layer: course learning outcomes (CLOs), Week 1 lesson outcomes, sections, mastery rule and remedial micro-lessons.
// The question bank itself is in bank.js. Remedial micro-lessons are used ONLY in remediation (never in the main lessons).
// Writing rule: full sentences with the reason and a concrete example; each micro-lesson uses a NEW example, not the hotel.
(() => {
  const D = window.DIAG, { t, it, q, st, iss, cmp, dg } = window.MOMENT_KIT;
  const hosp = [["Value chain", "Care for patients"], ["Process", "Admit a patient"], ["Sub-process", "Register the patient"], ["Activity", "Verify insurance"], ["Task", "Scan the Emirates ID"]];
  window.ADAPTIVE = {
    target: 0.8,          // mastery threshold per section, per outcome and per CLO
    window: 5,            // section mastery = share correct in the learner's last 5 answers on that section
    minEvidence: 3,       // a section needs at least 3 answers before it can count as mastered
    firstCheck: 4,        // minimum items per lesson check (spread evenly over the lesson's sections)
    firstCheckPerSection: 3, // at least 3 items per section in every lesson check
    perWeak: 3,           // fresh items per weak section in every remediation round
    clos: {
      K1: { name: "K1", full: "Analyse the utilization of Business Process Management in today's business environment" },
    },
    outcomes: {
      O1: { clo: "K1", name: "Define", full: "Define a business process and identify its start and end points" },
      O2: { clo: "K1", name: "Explain the gap", full: "Explain why cross-functional processes fail even when every department meets its own targets" },
      O3: { clo: "K1", name: "Process-centred", full: "Distinguish process management from functional management (the process-centred organisation)" },
      O4: { clo: "K1", name: "Role of BPM", full: "Analyse the role and scope of BPM: what BPM is and is not, maturity, and the framework" },
    },
    sections: {
      O1a: { lo: "O1", lesson: "l1", name: "What a process is" },
      O1b: { lo: "O1", lesson: "l1", name: "Levels and boundaries" },
      O2a: { lo: "O2", lesson: "l2", name: "Vertical departments, horizontal customers" },
      O2b: { lo: "O2", lesson: "l2", name: "Handoffs and end-to-end measures" },
      O3a: { lo: "O3", lesson: "l3", name: "What process-centred organisations do" },
      O3b: { lo: "O3", lesson: "l3", name: "Two lenses and ownership without authority" },
      O4a: { lo: "O4", lesson: "l4", name: "BPM versus BPI" },
      O4b: { lo: "O4", lesson: "l4", name: "Process maturity" },
      O4c: { lo: "O4", lesson: "l5", name: "The framework: a route, not a ratchet" },
    },

    // Remedial micro-lessons: two per section, each a different angle and a fresh everyday example.
    // Round 1 of remediation on a section plays variant 0, round 2 plays variant 1, then they alternate.
    review: {
      O1a: [
        { title: "A process you know: renewing a driving licence", lines: [
          ["Let's look at the same idea with a different example: renewing your driving licence.", t("Another way to see it", "Renewing your driving licence")],
          ["The trigger, the event that starts the process, is you applying online.", it(1, 3, "flag", "The trigger", "You start the process by applying online.")],
          ["The sequence, the steps in between, is an eye test, a payment, and printing the card.", it(2, 3, "route", "The sequence", "The steps in between are the eye test, the payment and the printing.")],
          ["The end state, the result you wanted, is a valid licence in your hand.", it(3, 3, "check", "The end state", "The process ends when a valid licence is in your hand.")],
          ["Along the way, the work passes through an optician, the traffic department, and a courier, so it crosses several teams.", dg("It crosses several teams", D.lanes(["Optician", "Traffic dept", "Courier"], [[1, "Apply"], [0, "Eye|test"], [1, "Pay &|print"], [2, "Deliver"]]), "Three different organisations each do one part, and together they produce one result for you.")],
          ["You can name the customer, which is you, and the outcome, which is a valid licence, so it passes Jeston's test for a process.", [cmp("a", "Who is the customer?", "You, the driver"), cmp("b", "What is the outcome?", "A valid licence in your hand")]],
        ] },
        { title: "A task, or a whole process?", lines: [
          ["Here is a quick way to tell a single task from a whole process.", t("Another way to see it", "Is it a task, or a whole process?")],
          ["Imagine you ask your bank for a personal loan.", t("A new example", "Asking your bank for a loan")],
          ["Checking your salary certificate is a single task, done by one person in one team.", iss("Checking the salary certificate is one task, done by one person, so on its own it is not a process.", "Just a task")],
          ["The loan process is much bigger: it starts when you apply, and it ends when the money reaches your account.", dg("The whole loan process", D.flow(["You|apply", "Sales", "Credit|check", "Contract", "+Money in|account"], { bracket: [0, 4, "The loan process"] }), "The loan process runs from your application to the money arriving in your account.")],
          ["It crosses sales, credit, and operations, and it ends in something you value, so it is a process.", st("Because it crosses several teams and ends in something the customer values, the loan is a process.")],
          ["So always ask two questions: who is the customer, and what outcome do they get? If you can answer both, you have found a process.", q("Ask: who is the customer, and what outcome do they get? If you can answer both, you have found a process.")],
        ] },
      ],
      O1b: [
        { title: "Levels in a hospital", lines: [
          ["Let's climb the five levels again, this time in a hospital.", t("Another way to see it", "The five levels in a hospital", 5)],
          ["At the top, the value chain is everything the hospital does: care for patients.", dg("Level 1 · the value chain", D.hier(hosp, 0), "Caring for patients is the whole business of the hospital.")],
          ["One process inside it is: admit a patient, which involves several departments.", dg("Level 2 · a process", D.hier(hosp, 1), "Admitting a patient is one process, and it passes through several departments.")],
          ["Inside admission there is a sub-process, register the patient, and inside that an activity, verify the insurance.", dg("Levels 3 and 4", D.hier(hosp, 3), "Registering the patient contains the activity of verifying the insurance.")],
          ["And at the bottom there is one single task: scan the patient's Emirates ID card.", dg("Level 5 · a task", D.hier(hosp, 4), "Scanning the ID card is one action, done by one person.")],
          ["If a nurse is mapping admission while a manager is mapping the ID scan, they will argue all afternoon. So they should agree the level first.", st("Two people drawing different levels will argue without knowing why, so agree the level before you draw.")],
        ] },
        { title: "Drawing the boundary: an online return", lines: [
          ["Now let's practise drawing a boundary, using an online return.", t("Another way to see it", "Where does a return start and end?")],
          ["From the customer's side, the trigger is clicking Return on the website.", it(1, 2, "flag", "Where it starts", "The process starts when the customer clicks Return.")],
          ["And the outcome the customer wants is the refund arriving in their account.", it(2, 2, "check", "Where it ends", "The process ends when the refund arrives in the customer's account.")],
          ["Suppose the shop draws its process only from 'the parcel arrives at the warehouse' to 'the parcel is checked'.", dg("A boundary that is too narrow", D.flow(["Click|Return", "Courier", "*Parcel|arrives", "*Parcel|checked", "Refund"], { bracket: [2, 3, "The shop's boundary"] }), "The shop only looks at the warehouse part, so it starts too late and ends too early.")],
          ["That boundary starts too late and ends too early, so a slow courier or a slow refund would be invisible to the shop.", iss("The real delays, the courier and the refund, sit outside the shop's boundary, so nobody sees them.", "Hidden delays")],
          ["A good boundary runs from the customer's trigger to the customer's outcome.", dg("A better boundary", D.flow(["Click|Return", "Courier", "Parcel|arrives", "Parcel|checked", "+Refund"], { bracket: [0, 4, "The customer's boundary"] }), "Drawn from the customer's side, the boundary includes every step that affects them.")],
        ] },
      ],
      O2a: [
        { title: "The relay race", lines: [
          ["Picture a relay race, where four runners pass a baton to each other.", t("Another way to see it", "A relay race")],
          ["Every runner on the team runs the fastest lap of their life.", it(1, 2, "check", "Each runner", "Every runner runs a personal best.")],
          ["But they drop the baton at every changeover between runners.", it(2, 2, "link", "The changeovers", "The baton is dropped every time it passes to the next runner.")],
          ["So the team loses the race, even though every single runner did brilliantly.", [cmp("a", "Each runner", "Ran brilliantly", "up"), cmp("b", "The team", "Lost the race", "down")]],
          ["Departments are like the runners, and the customer only cares about the team's total time.", dg("The same idea in an organisation", D.org("process", { depts: ["Runner 1", "Runner 2", "Runner 3", "Runner 4"], top: "Coach", from: "Start", to: "Finish", bad: true }), "The red points are the changeovers, and that is where the race is lost.")],
          ["Measuring each runner on their own can never tell you why the team lost.", st("Each department can meet its own target while the customer's overall result still fails.")],
        ] },
        { title: "Five weeks for a loan", lines: [
          ["Here is a fresh case: a bank where a simple loan takes five weeks.", t("Another way to see it", "Why does a loan take five weeks?")],
          ["The sales team logs every application within one day, so it meets its target.", it(1, 3, "check", "Sales", "It logs every application within one day, so it meets its target.")],
          ["The credit team decides within three days, so it meets its target too.", it(2, 3, "check", "Credit", "It decides within three days, so it meets its target.")],
          ["Operations prepares the contract within two days, and it meets its target as well.", it(3, 3, "check", "Operations", "It prepares the contract within two days, so it meets its target.")],
          ["Yet the customer waits five weeks, because the file sits in an in-tray between each team, and nobody measures that waiting time.", iss("The file waits between the teams, and nobody measures that waiting time, so the customer waits five weeks.", "5 weeks")],
          ["So no department is broken; what is broken is the process that runs across them.", st("No single department is broken. The process that runs across the departments is broken.")],
        ] },
      ],
      O2b: [
        { title: "Three leaks at every handoff", lines: [
          ["Think about renewing a residence visa, where you visit several counters.", t("Another way to see it", "Three things leak at every handoff", 3)],
          ["First, time leaks, because your file waits in a new queue at each counter.", it(1, 3, "clock", "Time", "Your file waits in a new queue each time it changes counter.")],
          ["Second, information leaks, because you are asked for the same documents again and again.", it(2, 3, "audit", "Information", "You have to hand over the same papers again at the next counter.")],
          ["Third, responsibility leaks, because when something goes wrong, each counter says it is the next counter's job.", it(3, 3, "users", "Responsibility", "When something goes wrong, every counter points to another one.")],
          ["So having fewer handoffs, or better handoffs, is where most of the lost time can be won back.", dg("Fewer handoffs", D.lanes(["Counter A", "Counter B"], [[0, "Submit"], [0, "Check"], [0, "Approve"], [1, "Print"]]), "Here the work changes hands only once, so far less time and information is lost.")],
        ] },
        { title: "When speeding up slows everything down", lines: [
          ["Let's look at local optimisation in a busy restaurant.", t("Another way to see it", "When speeding up slows everything down")],
          ["The restaurant's ordering app starts accepting orders twice as fast as before.", it(1, 2, "dash", "The app", "The app now accepts orders twice as fast.")],
          ["But the kitchen cannot cook any faster, so the orders pile up, the riders wait, and the food goes cold.", dg("The pile-up", D.flow(["*Orders|faster", "!Kitchen|overloaded", "!Riders|wait", "!Cold|food"]), "The faster app simply moved the queue into the kitchen, so customers waited longer.")],
          ["The app's own measure improved, while the customer's experience got worse.", [cmp("a", "The app's own measure", "Got better", "up"), cmp("b", "The customer's experience", "Got worse", "down")]],
          ["The measure that tells the truth is end to end: from the moment you tap Order to the moment the food is at your door.", dg("Measure the whole journey", D.flow(["Tap|Order", "Cook", "Collect", "+At the|door"], { bracket: [0, 3, "Order to door"] }), "Only the end-to-end time shows what the customer really experienced.")],
        ] },
      ],
      O3a: [
        { title: "A hospital that runs on processes", lines: [
          ["Picture a hospital that is organised around its processes.", t("Another way to see it", "A hospital organised around its processes", 4)],
          ["One patient-flow owner is responsible for the whole journey, from arrival at the emergency department to going home.", it(1, 4, "key", "A named owner", "One person is responsible from the patient's arrival until they go home.")],
          ["The key measure is the total time from arrival to a bed, not each ward's own numbers.", it(2, 4, "gauge", "An end-to-end measure", "The hospital measures the total time from arrival to a bed.")],
          ["Money for improvement is given to patient flow as a whole, instead of being split between the wards.", it(3, 4, "chart", "Money follows the process", "Improvement money goes to the patient's whole journey.")],
          ["And a nurse can explain the patient's whole journey, not only her own step in it.", it(4, 4, "users", "Staff see the whole", "Staff understand the whole journey, not just their own step.")],
          ["The wards and departments still exist; the process is simply managed across them.", st("The departments stay. The patient's journey is managed across them.")],
        ] },
        { title: "Spot the process-centred airport", lines: [
          ["Let's compare two airports.", t("Another way to see it", "Which airport is process-centred?")],
          ["At the first airport, check-in, security, and the gates each report their own numbers, and nobody owns the passenger's whole trip.", iss("Each area reports its own numbers, and nobody is responsible for the passenger's whole trip.", "Airport A")],
          ["At the second airport, one owner is responsible from the kerb to the gate, with a single measure: the kerb-to-gate time.", dg("Airport B", D.flow(["Kerb", "Check-in", "Security", "Passport", "+Gate"], { bracket: [0, 4, "Kerb-to-gate owner"] }), "One owner and one measure cover the passenger's whole journey through the airport.")],
          ["The second airport also funds improvements for the whole journey, and trains its staff to understand it.", st("At Airport B, the money for improvement and the staff training both follow the passenger's journey.")],
          ["So the second airport is the process-centred one.", [cmp("a", "Airport A", "Managed department by department"), cmp("b", "Airport B", "Managed as one process, end to end")]],
        ] },
      ],
      O3b: [
        { title: "A close-up or a wide shot", lines: [
          ["Think of the two views as two ways of using a camera.", t("Another way to see it", "A close-up, or a wide shot?")],
          ["The functional view is like a close-up of each department: you see sharp detail, but you lose the story.", cmp("a", "The functional view is a close-up", "You see each department in detail, but you lose the customer's story")],
          ["The process view is like the wide shot, showing the customer's whole journey.", cmp("b", "The process view is a wide shot", "You see the customer's whole journey from start to finish")],
          ["The close-up measures efficiency, while the wide shot measures total time, quality, and the cost to serve the customer.", [cmp("a", "The close-up measures", "How efficient each department is"), cmp("b", "The wide shot measures", "Total time, quality and cost to serve")]],
          ["The close-up's typical failure is local wins with a global loss: every department looks good, and the customer still loses.", iss("Every department looks good in close-up, while the customer's overall experience fails.", "Functional failure")],
        ] },
        { title: "A captain who cannot pick the team", lines: [
          ["Here is the trap on the process side, explained with football.", t("Another way to see it", "A captain who cannot pick the team")],
          ["Imagine a football captain who is not allowed to choose the players, the tactics, or the training.", st("He wears the captain's armband, but he is not allowed to make any of the decisions.")],
          ["That is what ownership without authority means.", iss("Having the title of owner without the power to change anything is ownership without authority.", "Process failure")],
          ["In the same way, a bank might name a complaints process owner, but not let her change any system, any target, or any budget.", dg("No tools to change anything", D.flow(["~Systems", "~Targets", "~Budget"]), "The dashed boxes are the things she is not allowed to change.")],
          ["Then everyone relaxes, because someone owns the problem, and so nothing improves.", st("It is worse than having no owner, because everyone thinks the problem is being handled.")],
          ["Real ownership means authority over the flow of work, the measures, and the budget.", t("Real ownership means authority over", "The flow of work, the measures, and the budget", 3)],
        ] },
      ],
      O4a: [
        { title: "A repair, or a service plan?", lines: [
          ["Think about how you look after your car.", t("Another way to see it", "A one-off repair, or a service plan?")],
          ["A one-off repair is like BPI: the garage fixes the fault, and then you are done.", dg("BPI is like a repair", D.cycle("line", { mid: "Fix the|fault" }), "The garage fixes one fault, and then the job is finished.")],
          ["A service plan is like BPM: regular checks, a named garage, and a service record, for the whole life of the car.", dg("BPM is like a service plan", D.cycle("loop", { mid: "Check|Record|Service", l: "Year 1", r: "Year 8…" }), "The car is checked and looked after again and again, for as long as you own it.")],
          ["A service plan still includes repairs when they are needed, in the same way that BPM includes BPI projects.", st("BPM includes BPI projects, just as a service plan includes repairs.")],
          ["What BPM adds is the ownership, measurement, and governance that keep going after each repair is done.", t("What BPM adds", "Ownership, measurement and governance that continue after each project", 3)],
        ] },
        { title: "Spot the difference", lines: [
          ["Let's practise telling BPI and BPM apart.", t("Another way to see it", "Is this BPI or BPM?")],
          ["A six-month project to cut check-in time, which then closes, is BPI.", cmp("a", "A six-month project that then closes", "This is BPI")],
          ["A check-in owner who reviews the measures every month, for years, is BPM.", cmp("b", "An owner who reviews the measures every month, for years", "This is BPM")],
          ["The clue is governance, which means asking: who keeps watching the process after the project ends?", q("Who keeps watching the process after the project ends?")],
          ["If nobody keeps watching, the improvement fades, and three years later someone has to fix the same process again.", iss("When nobody keeps watching, the gains fade and the same process has to be fixed again.", "No governance")],
        ] },
      ],
      O4b: [
        { title: "Learning to swim", lines: [
          ["Process maturity is a lot like learning to swim.", t("Another way to see it", "Learning to swim", 5)],
          ["At level one, you splash and hope, and how well it goes depends on the day.", dg("Level 1 · Initial", D.stairs(0), "At level one, results depend on effort and luck.")],
          ["At level two, you have a routine you mostly follow, and at level three, the whole swimming club swims the same way.", dg("Levels 2 and 3", D.stairs([1, 2]), "First the routine is written down, then everyone follows the same standard.")],
          ["At level four, a coach times every lap and compares it with a target.", dg("Level 4 · Managed", D.stairs(3), "At level four, performance is measured against targets.")],
          ["At level five, the swimmers themselves keep finding small improvements.", dg("Level 5 · Optimising", D.stairs(4), "At level five, the people doing the work improve it themselves.")],
          ["You would never teach racing turns to someone at level one, because first they need the basics.", st("Choose improvements that match the level, because advanced methods fail without the basics.")],
        ] },
        { title: "Using maturity honestly", lines: [
          ["Let's see how to use maturity honestly, with a small clinic.", t("Another way to see it", "Appointments at a small clinic")],
          ["At this clinic, each receptionist books appointments in their own way, so results vary from person to person.", iss("Every receptionist books appointments differently, so the process is at level one.", "Level 1")],
          ["Buying an advanced AI scheduling tool now would fail, because there is no standard way of working yet. First, they need to write one down.", iss("An advanced tool would be rejected, because there is no standard way of working for it to support.", "Rejected")],
          ["Meanwhile, the same clinic's billing might already be measured and controlled, which is level four.", dg("Different levels, same clinic", D.stairs([0, 3], { alt: "Appointments at level 1, billing at level 4" }), "Appointments are at level one while billing is at level four, so each process needs its own assessment.")],
          ["And a level only counts if there is evidence for it, such as documents, measures and records.", st("A maturity level only counts if you can show the evidence for it.")],
        ] },
      ],
      O4c: [
        { title: "A road trip with a GPS", lines: [
          ["Think of a long road trip, using a GPS.", t("Another way to see it", "A road trip with a GPS")],
          ["You follow the route stop by stop, in order.", dg("In order", D.route([0, 1, 2, 3]), "Normally, you work through the phases one after another.")],
          ["But if you find a road closed, the GPS sends you back to an earlier turn, and that is perfectly normal.", dg("Going back when you learn something", D.route([4, 1], { back: [4, 1], alt: "Arrow from Innovate back to Process architecture" }), "A discovery in a later phase can send you back to an earlier one.")],
          ["A ratchet would refuse to let you turn back, so you would drive straight into the closed road.", iss("A framework used like a ratchet never goes back, so the team keeps building on a mistake.", "Stuck")],
          ["And during the whole trip, three things never switch off: project management, people change management, and leadership.", dg("Always switched on", D.route([], { band: true }), "These three essentials run under every phase of the framework.")],
        ] },
        { title: "Ten phases in three groups", lines: [
          ["Here is an easy way to remember the ten phases: put them in three groups.", t("Another way to see it", "Ten phases in three groups", 3)],
          ["The first group sets things up: organisation strategy, process architecture, and the launch pad.", dg("Group 1 · setting up", D.route([0, 1, 2]), "Weeks 5 to 7 set up the programme.")],
          ["The second group looks closely: understand, innovate, and people.", dg("Group 2 · looking closely", D.route([3, 4, 5]), "Weeks 8 to 10 study the process, design a better one, and prepare the people.")],
          ["The third group delivers: develop, implement, realise value, and sustainable performance.", dg("Group 3 · delivering", D.route([6, 7, 8, 9]), "Weeks 11 to 14 build, launch, and keep the gains.")],
          ["Like safety on a building site, the three essentials are present every day, not on one special day.", st("The three essentials run through every phase, just as safety matters every day on a building site.")],
          ["And if a team uses the framework as a checklist, it usually produces a system that nobody uses.", iss("Ticking off phases like a checklist usually produces a system that nobody uses.", "Checklist thinking")],
        ] },
      ],
    },
  };
})();
