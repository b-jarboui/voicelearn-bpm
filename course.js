// OPER621 Business Process Management · Week 1 · Fundamentals of Process Management.
// Source: Week 1 Session 1 slides, Week 1 Delivery Plan, Week 1 forum case (Moodle course 447), Jeston ch. 1–2.
// Each section is a list of [spoken sentence, visual moment(s)]: one moment per sentence, so voice and picture stay in step.
// Writing rule (Prof. Jarboui): write for human brains, not AI. Full sentences that give the reason ("because…"),
// a concrete example for every idea, one running story (the Qasr hotel guest). Diagram boxes may be short labels,
// but every diagram has a caption that says in a full sentence what the picture shows.
// `sec` links a section to the question-bank section it teaches (see adaptive.js).
(() => {
  const D = window.DIAG;
  const t = (kicker, text, count) => ({ type: "title", kicker, text, count });
  const it = (n, of, icon, title, text) => ({ type: "item", n, of, icon, title, text });
  const q = (text) => ({ type: "question", text });
  const st = (text) => ({ type: "statement", text });
  const iss = (text, effect) => ({ type: "issue", text, effect });
  const cmp = (side, label, note, dir) => ({ type: "compare", side, label, note, dir });
  const dg = (kicker, svg, caption) => ({ type: "diagram", kicker, svg, caption });
  const fm = (label, num, den) => ({ type: "formula", label, num, den });
  window.MOMENT_KIT = { t, it, q, st, iss, cmp, dg, fm };

  const hierRows = [["Value chain", "Serve the guest"], ["Process", "Check a guest in"], ["Sub-process", "Verify the booking"], ["Activity", "Check rate and guarantee"], ["Task", "Open the corporate portal"]];
  const exhibit = [["Queue at desk", 6, false], ["Find booking in 2 systems", 4, false], ["Re-key guest details", 3, false], ["Call revenue office", 7, false], ["Confirm room released", 2, false], ["Hand over key", 1, true]];

  window.COURSE = {
    id: "oper621-w1",
    code: "OPER621",
    title: "Fundamentals of Process Management",
    subtitle: "Business Process Management · Week 1",
    author: "Prof. Bassem Jarboui",
    teacher: { name: "Prof. Bassem Jarboui", email: "", sendReport: false },
    lessons: [
      {
        id: "l1",
        title: "What a process really is",
        sections: [
          {
            title: "Welcome to Week 1",
            lines: [
              ["Welcome to Business Process Management, week one.", t("OPER621 · Week 1", "Fundamentals of Process Management")],
              ["Let's start with a moment you have probably lived yourself.", q("Have you ever been passed from one desk to the next?")],
              ["You contact a company with a simple problem, and you are passed from one desk to the next.", dg("A familiar story", D.flow(["You", "Desk A", "Desk B", "Desk C", "!Still|waiting"]), "You move from desk to desk, and at the end you are still waiting for an answer.")],
              ["Everyone you speak to is polite.", st("Every person you speak to is polite and helpful.")],
              ["Each person does their own job well.", st("Each person does their own small part of the work correctly.")],
              ["And yet, nobody actually solves your problem.", iss("Your problem is still not solved, even though everyone did their part.", "Why?")],
              ["This week is about why that happens, and about what good organisations do to stop it.", t("This week", "Why this happens, and how good organisations fix it")],
              ["By the end of the week, you will be able to do four things.", t("By the end of Week 1", "You will be able to do four things", 4)],
              ["First, you will be able to define a business process, and say where it starts and where it ends.", it(1, 4, "target", "Define a process", "You can say what a process is, and where it starts and ends.")],
              ["Second, you will be able to explain why a process can fail, even when every department hits its own targets.", it(2, 4, "link", "Explain the gap", "You can explain how every department can succeed while the customer still has a bad experience.")],
              ["Third, you will be able to describe what a process-centred organisation does differently.", it(3, 4, "users", "Describe the alternative", "You can describe how organisations that manage processes, not just departments, actually work.")],
              ["And fourth, you will be able to explain what BPM is, what it is not, and how mature a process is.", it(4, 4, "layers", "Analyse BPM", "You can tell BPM from a one-off improvement project, and judge how mature a process is.")],
              ["All four build one course outcome, called K1, which is about analysing how organisations use Business Process Management today.", st("Course outcome K1: Analyse the utilization of Business Process Management in today's business environment.")],
              ["Our guide all term is a hotel group called Qasr Hospitality, which has fourteen hotels and resorts, and three thousand one hundred staff.", t("Our running case all term", "Qasr Hospitality Group runs 14 hotels and resorts with 3,100 staff.")],
            ],
          },
          {
            title: "A process, in plain words",
            sec: "O1a",
            lines: [
              ["So, what exactly is a business process?", q("What exactly is a business process?")],
              ["Think about the last time you ordered dinner on a food delivery app.", t("An example you know", "Ordering dinner on a food delivery app")],
              ["The whole thing starts at one clear moment: when you tap Order.", dg("Where it starts", D.flow(["*Tap|Order", "Restaurant|cooks", "Rider|collects", "Food at|your door"]), "The process starts the moment you tap Order.")],
              ["Then the restaurant cooks, a rider collects the bag, and the food reaches your door.", dg("How it flows", D.flow(["Tap|Order", "*Restaurant|cooks", "*Rider|collects", "+Food at|your door"]), "The work flows through the kitchen and the rider, and ends with food at your door.")],
              ["That whole chain of work, from your tap to your dinner, is a process.", st("The whole chain of work, from your tap to your dinner, is one process.")],
              ["Here is the definition we will use all term.", t("The definition we use all term", "What a business process is")],
              ["A business process is a set of activities that together produce an outcome of value to a customer.", st("A business process is a set of activities that together produce an outcome of value to a customer.")],
              ["Every process has three parts that you can point to.", t("Every process has", "Three parts you can point to", 3)],
              ["The first part is the trigger, which is the event that starts the process: here, you tapping Order.", it(1, 3, "flag", "The trigger", "The event that starts the process. In the food example, it is you tapping Order.")],
              ["The second part is the sequence, which means the steps in between: cooking, collecting and delivering.", it(2, 3, "route", "The sequence", "The steps in between. In the food example: cook, collect, deliver.")],
              ["The third part is the end state, which is the result the customer wanted: hot food in your hands.", it(3, 3, "check", "The end state", "The result the customer wanted. In the food example: hot food in your hands.")],
              ["Notice one more thing: the work passes through several teams, the kitchen, the rider, and the app's support desk.", dg("It passes through teams", D.lanes(["Kitchen", "Rider", "App team"], [[2, "Order|in"], [0, "Cook"], [1, "Collect"], [1, "Deliver"]]), "The order moves from the app team to the kitchen and then to the rider. Each move between teams is called a handoff.")],
              ["That crossing between teams is what makes it a process, and not just one team's task list.", st("Because the work crosses several teams, it is a process, and not just one team's to-do list.")],
              ["Jeston, the author of our core textbook, gives a simple test you can use anywhere.", t("Jeston's working test", "A simple test you can use anywhere")],
              ["If you cannot name the customer and the outcome, then you have not found a process yet.", q("Can you name the customer, and the outcome they receive? If not, you have not found a process yet.")],
              ["For our hotel, the customer is the arriving guest, and the outcome is the guest settled in the right room, quickly.", [cmp("a", "Who is the customer?", "The guest who is arriving at the hotel"), cmp("b", "What is the outcome?", "The guest settled in the right room, quickly")]],
            ],
          },
          {
            title: "Levels and boundaries",
            sec: "O1b",
            lines: [
              ["Processes come in different sizes, a bit like boxes that fit inside each other.", t("The process hierarchy", "Processes come in five levels, each one inside the one above", 5)],
              ["At the very top is the value chain, which for Qasr is simply: serve the guest.", dg("Level 1 · the value chain", D.hier(hierRows, 0), "The value chain is everything the hotel does for its guests.")],
              ["Inside it sits a process, for example: check a guest in.", dg("Level 2 · a process", D.hier(hierRows, 1), "Checking a guest in is one process inside the value chain.")],
              ["Inside that process sits a sub-process, for example: verify the booking.", dg("Level 3 · a sub-process", D.hier(hierRows, 2), "Verifying the booking is one part of checking the guest in.")],
              ["Inside that sits an activity, for example: check the rate and the payment guarantee.", dg("Level 4 · an activity", D.hier(hierRows, 3), "Checking the rate and the guarantee is one activity inside verifying the booking.")],
              ["And at the bottom is a single task, for example: open the corporate account portal.", dg("Level 5 · a task", D.hier(hierRows, 4), "Opening the corporate portal is one single action by one person.")],
              ["Here is a tip that will save you hours of argument.", t("A practical tip", "Agree the level before you start")],
              ["Before you draw any process map, agree with your team which level you are drawing.", st("Before you draw a process map, agree with everyone which level you are drawing.")],
              ["Most arguments about process maps happen because two people are drawing different levels without realising it.", iss("One person draws 'check a guest in' while another draws 'open the portal', so they argue without knowing why.", "Level mismatch")],
              ["The second skill is drawing the boundary, which means deciding exactly where the process starts and where it ends.", q("Where exactly does the process start, and where does it end?")],
              ["If you start too late, you miss the place where the problem begins.", iss("If the boundary starts too late, the cause of the problem sits outside your map.", "Cause missed")],
              ["If you end too early, you stop before the customer actually gets the outcome.", iss("If the boundary ends too early, you never see whether the customer got what they needed.", "Outcome missed")],
              ["For check-in, a good boundary starts when the guest walks up to the desk, and ends when she is inside the right room.", dg("A good boundary", D.flow(["Guest at|desk", "Find|booking", "Confirm|rate", "Room|ready?", "Guest in|room"], { bracket: [0, 4, "The check-in process"] }), "The boundary runs from the guest's first step to the guest's outcome, so nothing that affects her is left out.")],
              ["Hold on to this skill, because weeks six and eight come back to it.", st("You will use this boundary skill again in Weeks 6 and 8.")],
            ],
          },
        ],
      },
      {
        id: "l2",
        title: "Why good departments can still fail you",
        sections: [
          {
            title: "One guest, nine departments",
            sec: "O2a",
            lines: [
              ["Now let's meet the guest in our running story.", t("Qasr Marina hotel, 7:40 in the evening", "One guest, nine departments")],
              ["She lands late after a delayed flight, and reaches the Qasr Marina hotel at seven forty in the evening.", st("A business traveller arrives late and tired, after a delayed flight.")],
              ["Her company booked through a travel agency, at a special corporate rate that the front desk cannot see on its screen.", iss("The front desk cannot see the corporate rate, so it has to ask another department.", "Hidden information")],
              ["Her booking sits in one system, her rate in a second, her room status in a third, and her billing in a fourth.", dg("Four separate systems", D.flow(["~Bookings", "~Rates", "~Room|status", "~Billing"]), "Reservations, revenue, housekeeping and finance each keep their part of her stay in a different system.")],
              ["She waits twenty-three minutes, she is asked for her passport twice, and she is given a room that isn't ready yet.", iss("She waits 23 minutes, shows her passport twice, and gets a room that is not ready.", "Bad experience")],
              ["She gives her stay a score of four out of ten.", fm("Her feedback score for the stay", "4", "10")],
              ["Now, here is the surprising part of the story.", q("Which department failed her?")],
              ["The front desk met its standard of ninety seconds for every transaction.", it(1, 3, "check", "Front desk", "Its standard was 90 seconds per transaction, and it met that standard every time.")],
              ["The revenue office answered the front desk's call within its ten-minute service level.", it(2, 3, "check", "Revenue office", "Its standard was to answer within 10 minutes, and it met that standard.")],
              ["Housekeeping released the room within its forty-five-minute target.", it(3, 3, "check", "Housekeeping", "Its target was to release the room within 45 minutes, and it met that target.")],
              ["So every department passed its own test, and yet the guest still had a bad evening.", [cmp("a", "The departments", "Every department met its own target", "up"), cmp("b", "The guest", "She scored her stay 4 out of 10", "down")]],
              ["Why does this happen?", t("The core problem", "Departments look up and down; the customer moves across")],
              ["Departments are managed vertically, which means each one looks up and down its own column of the organisation chart.", dg("How departments are managed", D.org("silo"), "Each department pushes its own numbers upward, inside its own column.")],
              ["But the guest travels horizontally, which means her evening crosses all of those columns, one after another.", dg("How the guest experiences the hotel", D.org("process"), "The guest's evening runs across every department, and each crossing point is a place where things can go wrong.")],
              ["So each department polishes its own slice, and nobody is watching the guest's whole journey.", st("Each department improves its own slice, but nobody is responsible for the guest's whole journey, so nobody sees it fail.")],
            ],
          },
          {
            title: "Handoffs and the end-to-end measure",
            sec: "O2b",
            lines: [
              ["Let's look at exactly where those twenty-three minutes went.", t("Exhibit 1 from the case", "Where the guest's 23 minutes went")],
              ["Six minutes went on the queue, four on finding her booking across two systems, and three on typing her details in again.", dg("The first 13 minutes", D.bars(exhibit, { show: 3 }), "The first thirteen minutes were spent at the front desk: queuing, searching two systems, and re-typing.")],
              ["Then seven minutes went on a phone call to the revenue office, and two on checking that her room had been released.", dg("The next 9 minutes", D.bars(exhibit, { show: 5 }), "Nine more minutes were spent waiting for other departments to confirm the rate and the room.")],
              ["Only the last minute, handing her the key, added any value for her.", dg("What actually helped the guest", D.bars(exhibit, { hiNo: true }), "Only one minute out of twenty-three, handing over the key, was something the guest actually wanted.")],
              ["Most of the lost time sits in the handoffs, which are the moments when work passes from one team to another.", dg("The handoffs", D.lanes(["Front desk", "Revenue", "House-|keeping"], [[0, "Queue"], [0, "Find|booking"], [1, "Confirm|rate"], [0, "Re-key"], [2, "Room|released?"], [0, "Key"]]), "Every orange dot is a handoff, a moment when the work passes to another team and usually waits.")],
              ["At every handoff, three things can quietly leak away: time, information, and responsibility.", [iss("Time leaks, because the work waits in the next team's queue.", "Time"), iss("Information leaks, because details are lost or have to be typed again.", "Information"), iss("Responsibility leaks, because each team assumes the next one is handling it.", "Responsibility")]],
              ["You know this feeling from renewing an ID card, when one counter sends you to another, and you repeat your story each time.", dg("An everyday version", D.flow(["Counter 1", "!Wait", "Counter 2", "!Repeat|yourself", "Counter 3"]), "Each time you are sent to a new counter, you wait again and explain yourself again.")],
              ["There is a second trap as well, called local optimisation.", t("The second trap", "Local optimisation")],
              ["Local optimisation means that one team speeds itself up, but in doing so it makes the whole flow worse.", st("When one team speeds up on its own, the work simply piles up at the next team, so the customer can end up waiting longer.")],
              ["For example, if sales books rooms faster than housekeeping can clean them, the queue simply moves down the line to the front desk.", dg("The queue moves down the line", D.flow(["*Sales books|faster", "!Rooms not|ready", "!Queue|grows", "Guest|waits"]), "Sales got faster, but the rooms were not ready, so the queue moved to the front desk and the guest waited longer.")],
              ["So the measure that really matters is end to end, from the moment the guest arrives to the moment she is settled in her room.", dg("The measure that matters", D.flow(["Guest|arrives", "Desk", "Revenue", "House-|keeping", "Guest in|room"], { bracket: [0, 4, "End to end: 23 minutes"] }), "Measured from the guest's side, check-in took 23 minutes, even though every department's own number looked good.")],
              ["And here is the uncomfortable truth: almost nobody in the organisation owns that end-to-end measure.", st("The measure that matters to the customer is end to end, and in most organisations nobody owns it.")],
            ],
          },
        ],
      },
      {
        id: "l3",
        title: "The process-centred organisation",
        sections: [
          {
            title: "Four things they do differently",
            sec: "O3a",
            lines: [
              ["So what do organisations that get this right actually do differently?", q("What do organisations that get this right actually do?")],
              ["We call them process-centred organisations, and they do four things differently.", t("Process-centred organisations", "Four things they do differently", 4)],
              ["First, each process has a named owner, who has authority over the whole flow, and not just one department's slice.", it(1, 4, "key", "A named owner", "One person is responsible for the whole flow, and has the authority to change it across departments.")],
              ["Second, performance is measured end to end, from the customer's trigger to the customer's outcome.", it(2, 4, "gauge", "End-to-end measures", "Success is measured from the moment the customer starts to the moment they get their result.")],
              ["Third, budgets and improvement effort follow processes, and not departments.", it(3, 4, "chart", "Money follows the process", "Money for improvement goes to the whole flow the customer experiences, not to each department separately.")],
              ["Fourth, staff can describe the whole process they work in, and not only their own step.", it(4, 4, "users", "Staff see the whole", "People understand the whole journey, so they can see how their step affects the customer.")],
              ["To picture this, imagine a shop where returning an online order is effortless.", t("Picture this", "A shop where online returns are effortless")],
              ["One person owns the returns process, from the moment you click Return to the moment the refund lands in your account.", dg("One owner for the whole flow", D.flow(["Click|Return", "Courier|collects", "Warehouse|checks", "Finance|refunds", "+Money|back"], { bracket: [0, 4, "The returns owner"] }), "The returns owner is responsible across the courier, the warehouse and finance, so no step falls between teams.")],
              ["Her dashboard shows how many days customers wait for their refund, and not just how many parcels the warehouse scanned.", [cmp("a", "The old measure", "How many parcels the warehouse scanned"), cmp("b", "The end-to-end measure", "How many days the customer waits for the refund")]],
              ["One more point is important: the organisation chart does not disappear.", st("The departments and the organisation chart are still there.")],
              ["Instead, the process view is laid over the chart, a bit like a road map laid over a list of towns.", dg("Laid over the chart", D.org("process", { from: "You click Return", to: "Refund lands", depts: ["Customer|care", "Logistics", "Warehouse", "Finance"], top: "Managing Director" }), "The departments stay where they are, and the customer's flow is managed across them.")],
            ],
          },
          {
            title: "Two lenses, and a trap",
            sec: "O3b",
            lines: [
              ["Let's compare the two ways of looking at an organisation.", t("Two lenses", "The functional view and the process view")],
              ["The functional view focuses on departments, while the process view focuses on the end-to-end flow.", [cmp("a", "Functional view · it looks at", "Each department on its own"), cmp("b", "Process view · it looks at", "The whole flow, from start to finish")]],
              ["The functional view measures how efficient each department is, while the process view measures cycle time, quality, and the cost to serve a customer.", [cmp("a", "Functional view · it measures", "How efficient each department is"), cmp("b", "Process view · it measures", "Total time, quality and cost to serve the customer")]],
              ["So one improves the parts, and the other improves the whole.", [cmp("a", "Functional view · it improves", "Each part separately"), cmp("b", "Process view · it improves", "The whole flow together")]],
              ["And one sees the customer only indirectly, while the other sees the customer directly.", [cmp("a", "Functional view · the customer", "Is seen only indirectly"), cmp("b", "Process view · the customer", "Is seen directly")]],
              ["Each lens also has its own typical way of failing.", t("Each lens can fail", "Each view has its own typical failure", 2)],
              ["The functional view fails with local wins and a global loss, exactly like our hotel guest's evening.", iss("Every department wins locally, but the customer loses overall, like the Qasr guest.", "Functional view")],
              ["The process view fails with something called ownership without authority.", iss("A process owner is named, but she is not given the power to change anything.", "Process view")],
              ["Imagine Qasr names a check-in process owner, but she is not allowed to change the rate system, the housekeeping schedule, or anyone's targets.", dg("A title with no power", D.flow(["~Rate|system", "~Housekeeping|schedule", "~Team|targets"]), "The dashed boxes are things she is not allowed to change, so she cannot fix check-in.")],
              ["She has the title of owner, but none of the tools she needs to make a difference.", st("She has the title of owner, but no power to change the things that cause the problem.")],
              ["Naming an owner who cannot change anything is actually worse than naming no owner at all.", st("An owner who cannot change anything is worse than having no owner at all.")],
              ["It is worse because everyone now believes the problem is being handled, so nobody else pushes for change.", q("Why is it worse? Because everyone relaxes, believing that someone is handling it.")],
              ["Real ownership needs authority over three things: the flow of work, the measures, and the budget.", t("Real ownership needs authority over", "The flow of work, the measures, and the budget", 3)],
            ],
          },
        ],
      },
      {
        id: "l4",
        title: "BPM, BPI, and process maturity",
        sections: [
          {
            title: "A project, or a discipline?",
            sec: "O4a",
            lines: [
              ["Two terms sound almost the same, but they mean very different things.", t("Two terms that are easy to mix up", "BPM and BPI")],
              ["Business Process Improvement, or BPI, is a project.", dg("BPI is a project", D.cycle("line"), "A project has a start and a finish: you fix the process, and then the project closes.")],
              ["In a BPI project, you fix one process, and then the project finishes.", st("In BPI, a team fixes one process, and then the project ends.")],
              ["Business Process Management, or BPM, is a management discipline, which means it is part of how the organisation is run every day.", dg("BPM is a discipline", D.cycle("loop"), "A discipline never closes: processes are owned, measured and governed, year after year.")],
              ["In BPM, processes are owned, measured, and governed continuously, year after year.", st("In BPM, someone keeps owning, measuring and steering each process, long after any project ends.")],
              ["BPM includes improvement projects, and it adds the ownership, measurement, and governance that outlive any single project.", t("BPM includes BPI projects, and adds", "Ownership, measurement and governance that continue after the project", 3)],
              ["Think about your own health for a moment.", q("Think about your own health for a moment.")],
              ["A crash diet is like a project: you lose the weight, you stop, and slowly the weight comes back.", cmp("a", "A crash diet is like BPI", "You lose weight, you stop, and it slowly comes back", "down")],
              ["A healthy routine is like a discipline: small habits, checked every week, for good.", cmp("b", "A healthy routine is like BPM", "Small habits, checked every week, keep the gains for good", "up")],
              ["That is why an organisation that only does BPI ends up fixing the same process again, every few years.", iss("Without ongoing ownership, the improvement fades, so the same process has to be fixed again every few years.", "BPI only")],
              ["This difference matters for your exam, and it is the reason weeks thirteen and fourteen of the course exist.", st("BPM is a discipline and BPI is a project. The difference between them is governance, meaning who keeps watching after the project.")],
            ],
          },
          {
            title: "How mature is the process?",
            sec: "O4b",
            lines: [
              ["The next useful question to ask is: how mature is this process?", q("How mature is this process?")],
              ["Process maturity is usually described in five levels.", dg("Process maturity", D.stairs(-1), "Maturity is described as five steps, from level one at the bottom to level five at the top.")],
              ["At level one, called initial, the work depends on heroic effort, so results change from person to person.", dg("Level 1 · Initial", D.stairs(0), "At level one, how well the work goes depends on which person happens to do it.")],
              ["At level two, called repeatable, the process is written down, and it is followed most of the time.", dg("Level 2 · Repeatable", D.stairs(1), "At level two, there is a written way of working, and people follow it most of the time.")],
              ["At level three, called defined, the process is standardised across the whole organisation.", dg("Level 3 · Defined", D.stairs(2), "At level three, every branch and team works the same standard way.")],
              ["At level four, called managed, the process is measured and controlled against targets.", dg("Level 4 · Managed", D.stairs(3), "At level four, the process is measured, and managers act when it drifts away from its targets.")],
              ["At level five, called optimising, the people doing the work keep improving it themselves.", dg("Level 5 · Optimising", D.stairs(4), "At level five, the staff who run the process keep finding and making improvements.")],
              ["Maturity is a diagnosis, like a doctor's check-up, and not a score to chase.", st("Maturity is a diagnosis that tells you where you are, not a trophy to win.")],
              ["It tells you which improvements will work, and which ones the organisation will reject.", st("Knowing the level tells you which improvements the organisation can actually absorb.")],
              ["For example, a level-one process cannot absorb continuous improvement, because there is no standard way of working to improve yet. It needs writing down first.", iss("Advanced level-five methods fail at level one, because there is no standard way of working to improve yet.", "Rejected")],
              ["It is like a new driver: you teach the basics before you teach racing techniques.", st("A new driver learns the basics first; racing techniques only make sense later.")],
              ["Different processes in one organisation can sit at different levels, so you assess each process, not the whole company.", dg("Assess each process separately", D.stairs([0, 3], { alt: "One process at level 1 and another at level 4 in the same company" }), "In the same hotel, check-in might be at level one while billing is at level four.")],
              ["And never claim a level without evidence, because that is the most common misuse of these models.", iss("Claiming a maturity level without evidence is the most common misuse of these models.", "Misuse")],
            ],
          },
        ],
      },
      {
        id: "l5",
        title: "The road ahead, and your forum",
        sections: [
          {
            title: "A route, not a ratchet",
            sec: "O4c",
            lines: [
              ["Finally, let's look at the road map for the rest of the course.", t("The framework ahead", "The road map for the rest of the course")],
              ["We follow a framework of ten phases, one each week from week five to week fourteen.", dg("Ten phases", D.route([]), "The course framework has ten phases, worked from Week 5 to Week 14.")],
              ["It begins with organisation strategy, process architecture, and the launch pad.", dg("Getting started", D.route([0, 1, 2]), "The first three phases set the programme up: strategy, process architecture and the launch pad.")],
              ["Then come understand, innovate, and people.", dg("Looking closely", D.route([3, 4, 5]), "The middle phases study the current process, design a better one, and prepare the people.")],
              ["And it ends with develop, implement, realise value, and sustainable performance.", dg("Delivering", D.route([6, 7, 8, 9]), "The last four phases build the solution, put it in place, and make sure the gains last.")],
              ["Three things run through every phase: project management, people change management, and leadership.", dg("Always present", D.route([], { band: true }), "Project management, people change management and leadership run underneath every phase.")],
              ["These three are not a phase of their own; they are needed all the time.", st("The three essentials are not a separate phase. They are needed in every phase.")],
              ["The phases are worked in order, but the framework is a route, and not a ratchet.", t("How to read the framework", "A route, not a ratchet")],
              ["A ratchet is a tool that only turns one way, while a route lets you go back when you learn something new.", [cmp("a", "A ratchet", "Can only move forward, never back", "up"), cmp("b", "A route", "Lets you go back when you learn something new", "down")]],
              ["For example, if in the understand phase you discover that the process architecture was wrong, you go back to the work of week six.", dg("Going back is normal", D.route([1, 3], { back: [3, 1], alt: "An arrow from Understand back to Process architecture" }), "Learning something new in Understand can send you back to Process architecture, and that is the framework working as intended.")],
              ["Teams that treat the framework as a checklist usually deliver a system that nobody uses.", iss("Teams that tick the phases off like a checklist usually deliver a system nobody uses.", "Checklist thinking")],
            ],
          },
          {
            title: "Week 1 in four lines, and your forum",
            lines: [
              ["Let's pull the whole week together.", t("Summary", "Week 1 in four sentences", 4)],
              ["A process crosses functions, and it ends in an outcome the customer values.", it(1, 4, "route", "What a process is", "A process crosses several teams and ends in something the customer values.")],
              ["Departments can all succeed while the process fails, and that is the problem BPM addresses.", it(2, 4, "link", "The gap", "Every department can meet its targets while the customer still has a bad experience.")],
              ["BPM is a management discipline, BPI is a project, and the difference between them is governance.", it(3, 4, "loop", "BPM and BPI", "BPI fixes a process once; BPM keeps owning and measuring it for good.")],
              ["And maturity is a diagnosis that tells you which improvements can work.", it(4, 4, "chart", "Maturity", "Knowing the maturity level tells you which improvements the organisation can absorb.")],
              ["This week's forum takes you to a new company, called Al Madar Logistics.", t("Your forum this week", "The Complaint That Nobody Owned")],
              ["A client's complaint travelled for nineteen days across six departments, and every one of them met its own targets.", dg("Nineteen days", D.flow(["Account|manager", "Customer|service", "Operations", "Compliance", "Vendor|mgmt", "!Quality"]), "The complaint passed through six departments. Each one met its own KPI, and the client waited nineteen days for an answer.")],
              ["Post your own answer first, then reply to at least two classmates, and disagree with at least one of them.", st("Post your own answer first. Then reply to at least two classmates, and respectfully disagree with at least one.")],
              ["Next week, we will look at what makes an organisation start a BPM programme in the first place.", t("Next week", "What makes an organisation start a BPM programme")],
            ],
          },
        ],
      },
    ],
  };
  // Plain-text script for tools that expect it.
  COURSE.lessons.forEach((l) => l.sections.forEach((s) => (s.script = s.lines.map((x) => x[0]).join(" "))));
})();
