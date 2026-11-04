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
{
title: "A process you know: renewing a driving licence",
lines: [
["Let's approach the idea of a business process through something you might have experienced yourself.", t("Another way to understand a process", "Renewing a driving licence involves several organisations working toward one customer outcome.")],
["Imagine your driving licence is about to expire, and you decide to renew it online.", null],
["You submit your application, expecting to receive a valid licence without unnecessary complications.", null],
["That application is the trigger, which means the event that starts the renewal process.", it(1, 3, "flag", "The trigger", "Submitting the online renewal application starts the process.")],
["But submitting the application doesn't mean you've completed the renewal, because several things still need to happen.", null],
["You may need an eye test, followed by payment and the printing of your renewed licence.", dg("The renewal journey", D.flow(["Apply|online", "Eye|test", "Payment", "Print|licence", "+Licence|delivered"]), "The renewal process connects the application, eye test, payment, printing, and delivery of the licence.")],
["Together, those connected activities form the sequence, meaning the work between your application and the completed renewal.", it(2, 3, "route", "The sequence", "The renewal sequence includes the eye test, payment, printing, and delivery.")],
["Now notice that no single organisation necessarily performs every part of that work.", null],
["The optician checks your eyesight, the traffic department handles the renewal, and a courier delivers the card.", dg("Work crosses organisations", D.lanes(["Optician", "Traffic dept", "Courier"], [[1, "Apply"], [0, "Eye|test"], [1, "Pay &|print"], [2, "Deliver"]]), "The optician, traffic department, and courier contribute to one connected customer journey.")],
["When the work moves between these organisations, those transfers are called handoffs.", null],
["And although each organisation has its own responsibilities, you experience the renewal as one complete journey.", null],
["So when should we say that journey has reached its end state, meaning its intended final result?", q("Is the renewal complete when payment succeeds, or when you receive your valid licence?")],
["From your perspective, the desired outcome is receiving a valid driving licence.", it(3, 3, "check", "The end state", "The process reaches its intended outcome when you receive a valid licence.")],
["That's also how we can apply Jeston's test, which asks us to identify the customer and the outcome.", null],
["You're the customer, and the valid licence is the result you value.", [cmp("a", "The customer", "The driver applying to renew a licence."), cmp("b", "The outcome", "The driver receives a valid driving licence.")]],
["So remember that a process connects a starting event, activities across teams, and a valuable customer outcome.", null],
["Whenever you're unsure what the process is, follow the customer's journey rather than one employee's task.", null]
]
},
{
title: "A task, or a whole process?",
lines: [
["Imagine you're applying for a personal loan because you need money for an important purchase.", t("Another way to understand a process", "A bank loan shows the difference between one task and the complete customer journey.")],
["You submit your application to the bank and wait to hear whether the money will become available.", null],
["Now imagine someone inside the bank tells you that your salary certificate has been checked.", null],
["That's useful progress, but would you consider your loan application finished?", q("Does checking one document mean the customer has received the loan?")],
["Of course not, because checking a salary certificate is only one task within a much larger journey.", iss("Checking the salary certificate completes one task, but it does not complete the loan process.", "A task is not the whole process")],
["A task is one specific action, while a process connects activities that produce a valuable customer outcome.", null],
["Your application starts the process, so it acts as the trigger, meaning the event that sets the work in motion.", null],
["The bank then needs to move your request through sales, credit assessment, and the preparation of your contract.", dg("The complete loan journey", D.flow(["You|apply", "Sales", "Credit|check", "Contract", "+Money in|account"], { bracket: [0, 4, "The loan process"] }), "The loan process connects the customer's application with the work needed to place the approved funds in their account.")],
["These activities form the sequence, which means the connected work between your application and the final result.", null],
["And because several departments contribute, the process is broader than any single employee's responsibilities.", st("The loan process crosses sales, credit, and operations rather than belonging to one employee.")],
["But there's still something important we haven't checked: whether the customer has received the desired outcome.", null],
["For an approved loan, that end state is the money reaching the customer's account.", it(3, 3, "check", "The end state", "The loan process ends when the approved money reaches the customer's account.")],
["Imagine the contract has been signed, but the funds haven't arrived yet.", null],
["The bank may have completed several internal tasks, but your journey remains unfinished.", iss("The contract is signed, but the approved funds have not reached the customer's account.", "The outcome is incomplete")],
["This brings us back to Jeston's test: can we identify the customer and the outcome they value?", q("Who is the customer, and what result tells us the process is complete?")],
["Here, you're the customer, and receiving the approved loan funds is the outcome.", null],
["So when you're trying to distinguish a task from a process, look beyond the individual action.", [cmp("a", "A task", "One action, such as checking a salary certificate."), cmp("b", "A process", "The whole journey, from the application to the money in the customer's account.")]],
["Follow the complete journey until the customer receives the result that gives the work its purpose.", null]
]
}
],
O1b: [
{
title: "Levels in a hospital",
lines: [
["Let's imagine you're visiting a hospital, where several people are trying to describe how patients are admitted.", t("Another way to understand process levels", "A hospital shows how broad processes contain smaller pieces of work.")],
["A hospital manager begins talking about everything the organisation does to care for patients.", null],
["A receptionist, meanwhile, starts explaining how she scans a patient's Emirates ID.", null],
["Both are describing hospital work, but they're looking at very different levels of detail.", q("Are these people describing the same level of work?")],
["To understand the difference, imagine moving from a broad view of the hospital toward one specific action.", null],
["At the broadest level, the value chain describes the hospital's overall work of caring for patients.", dg("The hospital value chain", D.hier(hosp, 0), "The hospital's value chain represents its broad work of caring for patients.")],
["But caring for patients involves many connected journeys, including the process of admitting a patient.", null],
["A process is a connected set of activities that produces a valuable outcome for a customer.", dg("The admission process", D.hier(hosp, 1), "Admitting a patient is one process within the hospital's broader patient-care value chain.")],
["Now imagine a patient arriving for admission and needing to complete their registration.", null],
["Registering the patient is a sub-process, meaning a smaller connected part of the admission process.", dg("The registration sub-process", D.hier(hosp, 2), "Registering a patient is a sub-process within the larger admission process.")],
["During registration, an employee needs to verify the patient's insurance information.", null],
["That verification is an activity, meaning a defined piece of work within registration.", dg("The insurance activity", D.hier(hosp, 3), "Verifying insurance is an activity within the patient-registration sub-process.")],
["And one specific task within the work might involve scanning the patient's Emirates ID.", null],
["A task is a single action, so scanning the card is much narrower than admitting the patient.", dg("The Emirates ID task", D.hier(hosp, 4), "Scanning the patient's Emirates ID is one task within the hospital's admission work.")],
["Now imagine the manager and receptionist trying to combine their drawings without agreeing on the level.", null],
["The manager wants to understand patient admission, while the receptionist keeps describing the scanner.", iss("The manager maps patient admission, while the receptionist maps one scanning task.", "A level mismatch")],
["Neither person is necessarily wrong, but their diagrams answer completely different questions.", null],
["That's why a useful mapping discussion begins by agreeing on the level of detail.", st("Agree on the process level before mapping, because different levels answer different questions.")],
["And once the level is clear, the team can decide exactly where the process should begin and end.", null]
]
},
{
title: "Drawing the boundary: an online return",
lines: [
["Imagine ordering a jacket online, only to discover that it doesn't fit when it arrives.", t("Another way to understand boundaries", "An online return shows why the customer's journey must determine the process boundary.")],
["You open the retailer's website, click Return, and arrange to send the jacket back.", null],
["From your perspective, that click is the trigger, meaning the event that starts the return process.", it(1, 2, "flag", "The starting boundary", "The return process starts when the customer clicks Return.")],
["Now imagine the retailer asks its warehouse manager to draw the company's returns process.", null],
["The manager begins the diagram when the returned parcel arrives at the warehouse.", null],
["Then the diagram ends as soon as an employee checks the jacket.", dg("A narrow warehouse boundary", D.flow(["Click|Return", "Courier", "*Parcel|arrives", "*Parcel|checked", "Refund"], { bracket: [2, 3, "The shop's boundary"] }), "The warehouse boundary includes parcel receipt and checking, but excludes collection and refund.")],
["That diagram may describe the warehouse's work accurately, but it doesn't capture your complete experience.", null],
["Suppose the courier takes several days to collect the parcel, leaving you wondering what's happening.", iss("The courier's delay is invisible because the process boundary begins only when the parcel reaches the warehouse.", "The boundary starts too late")],
["The warehouse diagram cannot reveal that delay because the journey begins outside its chosen boundary.", null],
["And even after the jacket is checked, you may still be waiting for your money.", null],
["If the diagram stops at the warehouse inspection, the refund delay remains invisible as well.", iss("The customer is still waiting for a refund, but the warehouse's process map has already ended.", "The boundary ends too early")],
["So let's redraw the process from your perspective rather than the warehouse manager's perspective.", null],
["The boundary should begin when you click Return and continue until the refund reaches your account.", dg("The customer-centred boundary", D.flow(["Click|Return", "Courier", "Parcel|arrives", "Parcel|checked", "+Refund"], { bracket: [0, 4, "The customer's boundary"] }), "The complete return boundary includes the customer's request, parcel collection, warehouse checking, and final refund.")],
["This wider boundary allows us to see delays that a warehouse-only diagram would miss.", null],
["And it defines the end state, meaning the outcome that tells us the customer's journey is complete.", it(2, 2, "check", "The ending boundary", "The return process ends when the customer's refund reaches their account.")],
["Now pause and ask yourself whether checking the parcel is really the result the customer wanted.", q("Does the customer want a checked parcel, or their money returned?")],
["The answer explains why a process boundary must reflect the customer's actual outcome.", null],
["Remember that starting too late hides possible causes, while ending too early hides incomplete results.", st("A good process boundary begins with the customer's trigger and ends with the customer's intended outcome.")],
["Once the boundary is clear, the organisation can examine the entire journey instead of improving only one department's work.", null]
]
}
],
O2a: [
{
title: "The relay race",
lines: [
["Imagine you're watching a relay race, and the team you're supporting has four exceptionally fast runners.", t("Another way to see departmental performance", "A relay race shows why individual excellence does not guarantee team success.")],
["Each runner has trained hard, and every athlete is capable of producing an outstanding individual performance.", null],
["As the race begins, the opening runner moves quickly and reaches the changeover area ahead of the competition.", null],
["But when the baton passes to the next runner, something goes wrong and the baton falls.", it(1, 2, "check", "Individual performance", "Each runner performs exceptionally well during their own section of the race.")],
["The next runner recovers it and runs brilliantly, but another difficult changeover costs the team valuable time.", null],
["By the finish, every runner has achieved a personal best, yet the team has lost the race.", it(2, 2, "link", "The changeovers", "The team loses time because the baton is dropped during transfers between runners.")],
["Now pause for a moment and ask yourself whether the runners were individually successful.", q("Can every runner perform brilliantly while the team still loses?")],
["They certainly were, but the result depended on more than their individual running speeds.", null],
["The team needed the baton to move smoothly from the start of the race to the finish.", [cmp("a", "Individual performance", "Every runner achieves a personal best.", "up"), cmp("b", "Overall performance", "The team loses because the baton is dropped at changeovers.", "down")]],
["That's exactly how departmental performance can differ from the customer's experience of a business process.", null],
["Departments resemble individual runners, while the customer depends on the complete journey across those departments.", dg("The organisation as a relay team", D.org("process", { depts: ["Runner 1", "Runner 2", "Runner 3", "Runner 4"], top: "Coach", from: "Start", to: "Finish", bad: true }), "The team loses time at the changeovers even though each runner performs well.")],
["The organisation chart shows departments vertically, but the customer's journey moves horizontally across their boundaries.", null],
["If managers measure only departmental performance, they may never discover where the overall journey is failing.", null],
["So remember that excellent individual results cannot compensate for a broken connection between parts of the process.", st("Departments can meet their own targets while the complete customer journey fails.")],
["To understand success, we must measure the complete journey rather than judging each participant separately.", null]
]
},
{
title: "Five weeks for a loan",
lines: [
["Imagine applying for a personal loan because you've found something important that you need to purchase.", t("Another way to understand the performance gap", "A bank loan takes five weeks even though every department meets its targets.")],
["You submit your documents and expect the bank to give you an answer within a reasonable time.", null],
["The sales department receives your application and records it in the system within one day.", null],
["Its manager is pleased, because the department has met its published performance target.", it(1, 3, "check", "Sales performance", "The sales department records each application within its one-day target.")],
["Your application then reaches the credit department, where employees assess whether the loan can be approved.", null],
["Credit completes its decision within three days, which also meets that department's target.", it(2, 3, "check", "Credit performance", "The credit department completes its decision within its three-day target.")],
["Operations subsequently prepares the loan contract within two days, meeting its own performance standard as well.", it(3, 3, "check", "Operations performance", "Operations prepares the contract within its two-day target.")],
["Looking at these departmental reports, you might reasonably expect the loan process to be working well.", null],
["But here's the surprise: the customer still waits five weeks for the complete loan journey.", iss("The customer waits five weeks even though sales, credit, and operations meet their individual targets.", "Five weeks")],
["How can that happen when the departments themselves appear to be working efficiently?", q("Where does the waiting time come from if every department meets its target?")],
["The answer lies in the periods when your application sits waiting between departments.", null],
["After sales finishes, the file may remain in an in-tray before credit begins its work.", null],
["And after credit finishes, another queue may develop before operations receives the file.", dg("The complete loan journey", D.flow(["Sales", "!Waiting", "Credit", "!Waiting", "Operations"]), "The application can spend considerable time waiting between departments even when each department works efficiently.")],
["These waiting periods belong to the complete process, but they aren't captured by the individual departmental targets.", null],
["So the departments can all report success while the customer experiences an unacceptable delay.", null],
["This is the difference between vertical departmental management and the horizontal journey experienced by the customer.", st("Departmental targets measure individual contributions, while the customer experiences the complete process.")],
["The lesson is that we must examine the time between departments, not only the time spent inside them.", null],
["Otherwise, everyone may celebrate good performance while the customer continues waiting.", null]
]
}
],
O2b: [
{
title: "Three leaks at every handoff",
lines: [
["Imagine you're renewing your residence visa and need to visit several service counters to complete the application.", t("Another way to understand handoffs", "A residence visa renewal shows how transfers can lose time, information, and responsibility.")],
["You arrive with your documents carefully prepared, hoping the renewal will be straightforward.", null],
["At the opening counter, an employee checks your application and directs you toward another desk.", null],
["You join a new queue, even though the employee at the previous counter finished the work quickly.", it(1, 3, "clock", "Time", "The application waits in a new queue whenever it moves to another counter.")],
["This is how time can disappear during a handoff, which means transferring work between people or teams.", null],
["Now imagine reaching the next counter and being asked for documents you've already submitted.", null],
["The employee may not have access to the earlier information, so you must explain your situation again.", it(2, 3, "audit", "Information", "The customer repeats information because the next counter cannot access everything already provided.")],
["Nothing necessarily went wrong with the original document check, but information wasn't carried smoothly between teams.", null],
["Then suppose your application becomes delayed, and you ask who is responsible for resolving the problem.", null],
["One counter directs you elsewhere, while the next insists that another department must handle it.", it(3, 3, "users", "Responsibility", "Responsibility becomes unclear when each counter assumes another team should resolve the problem.")],
["Now pause and think about what has happened during this supposedly routine service.", q("Why is the customer struggling when each counter may be doing its job correctly?")],
["You've lost time in queues, repeated information, and struggled to identify who owns the unresolved problem.", null],
["These difficulties illustrate why handoffs can damage the complete process without any individual employee performing badly.", null],
["One possible improvement is reducing unnecessary transfers, so fewer queues and information gaps can develop.", dg("A simpler handoff pattern", D.lanes(["Counter A", "Counter B"], [[0, "Submit"], [0, "Check"], [0, "Approve"], [1, "Print"]]), "Keeping connected activities together can reduce unnecessary transfers and the opportunities for delay.")],
["But fewer handoffs aren't automatically better if important checks or responsibilities disappear.", null],
["The real aim is to make transfers clear, reliable, and appropriate for the customer's complete journey.", st("Better handoffs protect time, information, and responsibility throughout the customer's journey.")],
["So when a service feels unnecessarily complicated, look carefully at what happens between the teams.", null],
["That's often where the customer's experience begins to break down.", null]
]
},
{
title: "When speeding up slows everything down",
lines: [
["Imagine ordering dinner through a restaurant's delivery app on a particularly busy evening.", t("Another way to understand local optimisation", "A faster ordering app can make the complete delivery experience worse.")],
["The restaurant has recently improved its app, allowing customers to place orders twice as fast as before.", null],
["The team responsible for the app is delighted, because its performance measure shows a major improvement.", it(1, 2, "dash", "The ordering app", "The app now accepts orders twice as fast as before.")],
["But something important hasn't changed: the kitchen still has the same capacity to prepare meals.", null],
["As orders arrive more quickly, the kitchen struggles to prepare them at the same pace.", null],
["Unfinished orders begin accumulating, while delivery riders wait for food that isn't ready.", dg("The growing backlog", D.flow(["*Orders|faster", "!Kitchen|overloaded", "!Riders|wait", "!Cold|food"]), "Faster order acceptance creates a backlog because the kitchen cannot prepare meals at the same rate.")],
["And by the time some meals reach customers, the food may already be cold.", null],
["Now imagine asking the app team whether its improvement project was successful.", q("Was the app team's improvement a success?")],
["Its members might confidently say yes, because customers can now submit orders much faster.", null],
["But ask the customers, and you may hear a completely different story.", [cmp("a", "The app's performance", "Orders are accepted twice as fast.", "up"), cmp("b", "The customer's experience", "Orders accumulate, riders wait, and meals can arrive cold.", "down")]],
["This situation illustrates local optimisation, which means improving one part of a process without considering the complete flow.", null],
["And local optimisation can make the whole process worse when another part cannot handle the additional work.", st("A faster department can create a backlog elsewhere, making the complete customer experience worse.")],
["So how should the restaurant decide whether its service has genuinely improved?", q("Does faster ordering matter if customers wait longer for their meals?")],
["It needs an end-to-end measure, meaning a measure covering the customer's journey from the starting event to the final outcome.", null],
["For food delivery, that journey begins when the customer taps Order and ends when the meal reaches their door.", dg("The complete delivery journey", D.flow(["Tap|Order", "Cook", "Collect", "+At the|door"], { bracket: [0, 3, "Order to door"] }), "The end-to-end measure covers the complete journey from placing the order to receiving the meal.")],
["Measuring that complete journey reveals delays that the app's individual performance figures cannot show.", null],
["And it helps managers recognise that improvements must work together rather than simply moving queues elsewhere.", null],
["So remember that faster individual activities don't necessarily produce faster or better customer outcomes.", st("The complete customer journey determines whether an improvement genuinely creates value.")],
["The real test is whether the customer receives the desired result more effectively.", null]
]
}
],
O3a: [
{
title: "A hospital that runs on processes",
lines: [
["Imagine arriving at a hospital's emergency department with a family member who needs urgent medical attention.", t("A hospital organised around its processes", "The patient's complete journey becomes a shared responsibility.")],
["The receptionist registers your family member, nurses assess the situation, and doctors begin providing the necessary care.", null],
["But suppose every department concentrates only on completing its own work as quickly as possible.", null],
["You might find yourself waiting between departments without knowing who is responsible for the complete journey.", iss("The patient waits between departments even though individual teams may be meeting their targets.", "Fragmented patient care")],
["Now imagine a hospital that manages the patient's journey as one connected process.", null],
["It appoints a patient-flow owner who is responsible for the journey from emergency arrival through to going home.", it(1, 4, "key", "A named owner", "One person is responsible for the patient's complete journey from emergency arrival until discharge.")],
["This owner can coordinate work across departments rather than concentrating on one ward's responsibilities.", null],
["The hospital also measures the total time from arrival until the patient reaches a bed.", it(2, 4, "gauge", "An end-to-end measure", "The hospital measures the total time between emergency arrival and reaching a bed.")],
["That measure reveals delays that individual ward reports might overlook.", null],
["And when managers discover a problem, improvement money supports the complete patient journey rather than separate ward projects.", it(3, 4, "chart", "Money follows the process", "Improvement funding supports the patient's complete journey across departments.")],
["Imagine a nurse noticing that patients repeatedly wait because information isn't transferred smoothly between teams.", null],
["She understands how registration, assessment, treatment, and discharge fit together, so she can recognise the wider consequences.", it(4, 4, "users", "Staff understand the whole", "Employees understand how their activities contribute to the patient's complete journey.")],
["Now pause and consider whether the hospital needs to abolish its wards to achieve these improvements.", q("Must the hospital remove its departments to manage patient flow effectively?")],
["Of course not, because the departments still provide the specialist knowledge and services patients need.", null],
["The difference is that someone also manages the connections between those departments.", st("The departments remain in place, while the patient's complete journey is managed across them.")],
["That's what makes the hospital process-centred: ownership, measurement, improvement funding, and employee understanding follow the patient's journey.", null],
["And the result is an organisation that can recognise problems extending beyond any single department.", null]
]
},
{
title: "Spot the process-centred airport",
lines: [
["Imagine travelling through two airports on separate journeys, with enough time to notice how each one operates.", t("Which airport is process-centred?", "Compare how two airports manage the passenger's journey.")],
["At Airport A, check-in employees work efficiently, security officers meet their targets, and gate staff report their own performance.", null],
["Each department has a manager who concentrates on improving that department's individual results.", null],
["But nobody takes responsibility for the complete passenger journey from the kerb to the departure gate.", iss("Airport A measures departments separately, but nobody owns the complete passenger journey.", "Airport A")],
["Now imagine reaching Airport B, where managers have organised their responsibilities differently.", null],
["The airport still has check-in, security, passport control, and gate teams performing their specialist work.", null],
["But someone is responsible for how those activities connect throughout the passenger's complete journey.", dg("Airport B's passenger journey", D.flow(["Kerb", "Check-in", "Security", "Passport", "+Gate"], { bracket: [0, 4, "Kerb-to-gate owner"] }), "One process owner manages the passenger's complete journey from the kerb to the departure gate.")],
["That person is the process owner, meaning someone accountable for the connected work across departments.", null],
["Instead of examining only security waiting times or check-in transaction speeds, Airport B measures kerb-to-gate time.", st("Airport B measures the complete time from the passenger's arrival at the kerb until reaching the gate.")],
["This end-to-end measure shows whether the passenger's complete experience is improving.", null],
["And when the airport invests in improvements, funding supports the whole passenger journey rather than isolated departmental projects.", null],
["Staff also learn how their own decisions affect passengers before and after they encounter them.", st("Improvement funding and employee training support the passenger's complete journey across departments.")],
["Now pause and decide which airport would be better equipped to recognise delays between teams.", q("Which airport can see problems that fall between departments?")],
["Airport B is the process-centred organisation because it manages the connected journey rather than only its individual parts.", [cmp("a", "Airport A", "Each department manages and measures its own work."), cmp("b", "Airport B", "One owner manages the complete journey with shared measures and improvement funding.")]],
["Notice that both airports still need their departments, because specialist work doesn't disappear.", null],
["What changes is how responsibility, measurement, improvement funding, and employee understanding connect those departments.", st("Both airports keep their departments. What changes is that ownership, measures, funding and staff understanding follow the passenger's whole journey.")],
["That's the distinction to remember whenever you're asked to recognise a process-centred organisation.", null]
]
}
],
O3b: [
{
title: "A close-up or a wide shot",
lines: [
["Imagine you're watching a film about a family preparing for an important celebration.", t("Two ways to see the same organisation", "A close-up reveals details, while a wide shot reveals the complete story.")],
["The camera begins with a close-up of someone carefully decorating a cake in the kitchen.", null],
["You can see every detail of that person's work, including how efficiently the cake is being prepared.", null],
["But the camera doesn't show whether the guests have arrived or whether anyone has prepared the dining room.", cmp("a", "The close-up", "You can examine one activity in detail, but you cannot see the complete celebration.")],
["Now imagine the camera moving back to reveal the entire house and everyone preparing for the event.", null],
["Suddenly, you notice that the guests are waiting outside while the dining room remains unfinished.", null],
["The cake may be perfect, but the complete celebration isn't ready.", cmp("b", "The wide shot", "You can see how separate activities combine to create the guests' complete experience.")],
["That's a useful way to understand the functional view and the process view of an organisation.", null],
["The functional view resembles the close-up because it examines individual departments and their efficiency.", null],
["The process view resembles the wide shot because it follows the complete journey experienced by the customer.", [cmp("a", "Functional measures", "Managers measure the efficiency of individual departments."), cmp("b", "Process measures", "Managers measure total cycle time, service quality, and cost to serve.")]],
["Cycle time means the total elapsed time required to complete the customer's journey, including waiting between activities.", null],
["Cost to serve means the resources and expenditure needed to deliver the complete service.", st("Cycle time is the total time the customer's journey takes, waiting included. Cost to serve is what it costs to deliver the whole service.")],
["So the close-up encourages improvements to individual activities, while the wide shot reveals opportunities to improve the whole.", null],
["The close-up sees the customer indirectly, while the wide shot places the customer's experience directly in view.", null],
["But here's the danger when managers rely exclusively on the close-up.", q("What happens when every individual activity looks excellent, but the complete experience fails?")],
["They may celebrate local improvements while the customer experiences a global loss.", iss("Every individual activity appears successful, but the complete customer experience is unsuccessful.", "Local wins, global loss")],
["Neither camera view is useless, because detailed work and the complete story both matter.", null],
["The important lesson is to examine the connections between activities before deciding that the overall process succeeds.", null]
]
},
{
title: "A captain who cannot pick the team",
lines: [
["Imagine a football club announcing that its captain will now be responsible for improving the team's performance.", t("A captain without authority", "Responsibility means little when the person cannot influence the decisions that determine results.")],
["The announcement sounds promising, and supporters expect the captain to help the team achieve better results.", null],
["But there's a problem that nobody mentions during the announcement.", q("What does the captain need in order to improve the team's results?")],
["The captain isn't allowed to influence which players are selected or how the team approaches its matches.", null],
["He also has no say in training arrangements or the resources available to prepare the players.", st("The captain is held responsible for team performance but cannot influence selection, tactics, or training.")],
["Now imagine the team begins losing matches, and everyone turns to the captain for an explanation.", null],
["He's accountable for the result, but he cannot change the decisions contributing to the poor performance.", null],
["This is ownership without authority, meaning responsibility for an outcome without the power needed to influence it.", iss("The captain carries responsibility for the outcome but lacks the authority needed to improve it.", "Ownership without authority")],
["The same trap can appear when a bank appoints someone to manage its complete complaints process.", null],
["The new owner discovers that customers wait because different departments use disconnected systems and conflicting performance targets.", null],
["But she cannot change those systems, adjust the targets, or approve improvement spending.", dg("A process owner without effective authority", D.flow(["~Systems", "~Targets", "~Budget"]), "The complaints process owner cannot change the systems, targets, or budget affecting the customer journey.")],
["So the bank has created the appearance of responsibility without providing the means to improve anything.", null],
["And here's why that arrangement can be worse than having no owner at all.", null],
["Other managers may stop investigating complaints because they believe someone has already taken responsibility.", st("A powerless owner can create false confidence that the problem is being managed.")],
["Now pause and ask yourself what the complaints owner would need to make a genuine difference.", q("What authority would allow the process owner to improve the customer's complete journey?")],
["She needs authority over the flow of work, the measures used to judge success, and the improvement budget.", t("Real process ownership requires", "Authority over the flow of work, the performance measures, and the improvement budget.")],
["That doesn't mean every employee must report directly to her or that specialist departments should disappear.", null],
["It means she must be empowered to coordinate changes across the departments contributing to the process.", st("Departments stay in place, but the owner can coordinate changes across all of them.")],
["So remember that naming an owner is only meaningful when the organisation gives that person genuine authority.", null]
]
}
],
O4a: [
{
title: "A repair, or a service plan?",
lines: [
["Imagine driving your car to work when you suddenly hear an unfamiliar noise coming from the engine.", t("A repair or a service plan?", "Looking after a car helps explain the difference between BPI and BPM.")],
["You visit a garage, where a mechanic identifies the problem and explains what needs to be repaired.", null],
["The garage fixes the fault, checks that the car is working properly, and hands back your keys.", null],
["That particular job is now finished, and you can drive away knowing the immediate problem has been addressed.", dg("A one-off repair", D.cycle("line", { mid: "Fix the|fault" }), "A repair addresses a particular fault and finishes when the work is completed.")],
["This resembles Business Process Improvement, or BPI, which is a project that improves a particular process and then ends.", null],
["The project has a defined problem, a period of work, and a point when the team finishes.", st("BPI is a project: a defined problem, a period of work, and a finish.")],
["But imagine deciding that your car never needs attention again because the mechanic has completed that repair.", null],
["Over time, other problems may develop, and the original fault could even return.", iss("A completed repair does not remove the need to maintain the car afterward.", "The repair has ended")],
["Now imagine arranging a continuing service plan with the garage.", null],
["The garage keeps a service record, checks the car regularly, and monitors its condition throughout your ownership.", dg("A continuing service plan", D.cycle("loop", { mid: "Check|Record|Service", l: "Year 1", r: "Year 8..." }), "A service plan provides continuing checks, records, and maintenance throughout the car's life.")],
["When something needs repairing, the service plan can still include a focused repair.", null],
["But the responsibility for monitoring the car continues after that particular job finishes.", null],
["That's how Business Process Management, or BPM, works as an ongoing management discipline.", st("BPM includes BPI projects, but process ownership and management continue after each project ends.")],
["It includes improvement projects when necessary, while adding continuing ownership, measurement, and governance.", null],
["Governance means having arrangements that determine who monitors performance and who acts when something needs attention.", null],
["Now pause and consider which approach is more likely to preserve the car's condition over time.", q("Would you rely on occasional repairs alone, or continue checking and maintaining the car?")],
["The lesson isn't that repairs are unimportant, because sometimes a focused repair is exactly what you need.", null],
["It's that a completed repair cannot replace the continuing responsibility to keep something working properly.", [cmp("a", "BPI, the repair", "A focused project that fixes one fault and then ends."), cmp("b", "BPM, the service plan", "Continuing ownership and checks that keep the car, or the process, working.")]],
["So remember that BPI is the improvement project, while BPM is the discipline that keeps managing the process.", null]
]
},
{
title: "Spot the difference",
lines: [
["Imagine a university discovering that students are spending too long waiting for their academic transcripts.", t("Recognising BPI and BPM", "A university transcript service shows the difference between an improvement project and continuing process management.")],
["The administration team investigates the delays and launches a six-month project to improve the transcript request process.", null],
["Employees simplify the approval arrangements, reduce unnecessary waiting, and introduce a more efficient way of handling requests.", null],
["When the changes are implemented, the project team completes its final report and closes the project.", dg("A six-month improvement project", D.cycle("line"), "The transcript improvement project has a defined objective and ends when its work is completed.")],
["This is Business Process Improvement, or BPI, because the university has carried out a project to improve one process.", null],
["Now imagine the university returning to its normal routines without assigning anyone responsibility for monitoring transcript requests.", null],
["As staff members change and new requirements appear, waiting times may gradually increase again.", iss("Without continuing management, the transcript process may deteriorate after the improvement project closes.", "The gains may fade")],
["Perhaps three years later, another team must investigate the same delays and launch another improvement project.", null],
["But let's imagine the university making a different decision when the original project finishes.", null],
["It appoints a transcript process owner who reviews the complete request journey every month for years.", dg("Continuing process management", D.cycle("loop"), "A named owner regularly reviews the transcript process and responds when performance changes.")],
["That owner monitors how long students wait, investigates problems, and coordinates improvements whenever necessary.", null],
["This is Business Process Management, or BPM, because responsibility continues after the original improvement project ends.", null],
["And here's the important connection: the university can still launch another focused improvement project within its ongoing BPM arrangements.", st("BPM includes individual BPI projects and adds ownership, measurement, and governance that continue afterward.")],
["So the difference isn't whether the organisation ever changes a process, because both approaches can involve improvement.", null],
["The real distinction is governance, meaning who remains responsible for monitoring and managing the process afterward.", q("Who keeps watching the transcript process after the improvement project finishes?")],
["If the answer is nobody, the organisation is relying on projects rather than continuing process management.", null],
["If a named owner keeps reviewing performance and coordinating improvements, the organisation is practising BPM.", [cmp("a", "Nobody keeps watching", "The organisation relies on projects, which is BPI alone."), cmp("b", "A named owner keeps reviewing", "The process is managed continuously, which is BPM.")]],
["So whenever you need to distinguish these approaches, follow what happens after the project team leaves.", null]
]
}
],
O4b: [
{
title: "Learning to swim",
lines: [
["Imagine joining a swimming club where the coach is helping people become more confident and capable swimmers.", t("Learning to swim", "Process maturity develops from unpredictable effort toward consistent performance and continuous improvement.")],
["You arrive for your opening lesson, jump into the pool, and discover that you're mostly splashing and hoping.", null],
["Sometimes you manage a few strokes, but your results change depending on how you feel that day.", dg("Initial", D.stairs(0), "At Initial, results depend heavily on individual effort, and performance is unpredictable.")],
["That resembles level one, called Initial, where a process depends on individual effort because there isn't yet a dependable way of working.", null],
["Your coach helps you establish a routine, and you begin following the same basic movements during each practice.", null],
["You now have something you can repeat, rather than improvising every time you enter the water.", dg("Repeatable", D.stairs(1), "At Repeatable, a documented routine exists and is followed most of the time.")],
["That's like level two, called Repeatable, where a process has written procedures that people generally follow.", null],
["Now imagine the swimming club agreeing on a common training method for all its groups.", null],
["Everyone follows the same established approach, making instruction and performance more consistent across the club.", dg("Defined", D.stairs(2), "At Defined, the process follows a common standard across the organisation.")],
["This resembles level three, called Defined, where the process is standardised throughout the organisation.", null],
["As swimmers become more consistent, the coach starts timing their laps and comparing results with agreed targets.", null],
["When performance falls below expectations, the coach investigates and adjusts the training.", dg("Managed", D.stairs(3), "At Managed, performance is measured against targets and controlled when results drift.")],
["That's like level four, called Managed, where a process is measured and controlled against performance targets.", null],
["Eventually, experienced swimmers begin recognising opportunities to improve their own technique and making adjustments themselves.", dg("Optimising", D.stairs(4), "At Optimising, the people performing the work continually identify and make improvements.")],
["This resembles level five, called Optimising, where employees continually improve the processes they perform.", null],
["But imagine the coach teaching advanced racing turns to someone who still struggles to stay afloat.", q("Would advanced racing techniques help someone who hasn't learned the basics?")],
["Of course not, because improvement methods must match the learner's current capabilities.", null],
["Process maturity works the same way: advanced techniques cannot compensate for the absence of dependable basic procedures.", st("Maturity helps identify which improvements a process can realistically support.")],
["So remember that maturity isn't a prize to chase, but a diagnosis that helps determine what the process needs next.", null]
]
},
{
title: "Using maturity honestly",
lines: [
["Imagine visiting a small medical clinic where patients have complained about confusing appointment arrangements.", t("Using maturity honestly", "A small clinic shows why maturity must be diagnosed separately for each process and supported by evidence.")],
["The clinic manager wants to improve the service and is considering purchasing an advanced artificial intelligence scheduling system.", null],
["But before spending money, she watches how the receptionists actually arrange appointments.", null],
["She discovers that every receptionist follows a different method, with no common written procedure.", iss("Appointment booking depends on individual receptionists because the clinic has no shared written procedure.", "Initial")],
["Some employees manage appointments efficiently, while others make mistakes or struggle when the clinic becomes busy.", null],
["This is Initial, where results depend on individual effort rather than a reliable, documented process.", dg("Appointment booking is Initial", D.stairs(0), "The appointment process is Initial because employees work differently and results vary.")],
["Now pause and consider what would happen if the clinic immediately installed the advanced scheduling system.", q("Can an advanced scheduling tool fix a process that has no agreed way of working?")],
["The technology might struggle because employees haven't agreed on the basic procedure it should support.", iss("An advanced scheduling system may fail because the clinic has not established a standard appointment process.", "The process is not ready")],
["So the manager begins by documenting how appointments should be booked and helping employees follow that routine.", null],
["This prepares the process to become Repeatable, where written procedures are followed most of the time.", st("The appointment process needs a documented routine before more advanced improvements can work reliably.")],
["But here's something interesting that the manager discovers while examining other activities in the same clinic.", null],
["The billing process already follows established procedures, records performance, and responds when results fall outside agreed targets.", null],
["That process may be Managed, even though appointment booking is still Initial.", dg("Different processes in the same clinic", D.stairs([0, 3], { alt: "Appointment booking is Initial while billing is Managed." }), "Appointment booking can be Initial while billing is Managed within the same clinic.")],
["So it would be misleading to give the entire clinic a single maturity level based on either process.", null],
["Each process needs its own assessment because different activities can develop at different rates.", st("Assess each process on its own, not the whole clinic at once.")],
["And the manager shouldn't claim that billing is Managed simply because someone describes it as well organised.", null],
["She needs evidence, including documented procedures, performance measures, and records showing how employees actually work.", st("A maturity assessment must be supported by evidence such as documents, measures, and records.")],
["Claiming a level without evidence is a misuse of the maturity model, not a meaningful diagnosis.", null],
["So remember that maturity tells us where a process stands and which improvements it can realistically support.", st("Maturity is a diagnosis: it shows where a process stands and what it needs next.")],
["The honest question isn't how impressive the maturity label sounds, but what the evidence says the process needs next.", null]
]
}
],
O4c: [
{
title: "A road trip with a GPS",
lines: [
["Imagine setting off on a long road trip through several unfamiliar cities, using a GPS to guide you.", t("A road trip with a GPS", "The BPM framework provides a route, but new discoveries can require changes.")],
["Before leaving, you enter your destination, and the GPS suggests a route with several planned stops.", null],
["You expect to follow that route in order because each part helps you move toward your destination.", dg("Following the planned route", D.route([0, 1, 2, 3]), "The BPM framework provides an organised sequence of phases, just as a GPS provides a planned route.")],
["That's similar to using a BPM framework, where the phases give an organisation a structured way to manage improvement.", null],
["But imagine reaching a city and discovering that the road ahead has unexpectedly closed.", iss("The planned road is closed, so the original route no longer works.", "A road closure")],
["Your GPS recognises the problem and directs you back toward an earlier junction.", null],
["You wouldn't insist on continuing along the closed road simply because it appeared in your original plan.", q("Would you follow the original route even after discovering that the road is closed?")],
["Instead, you would accept the new information and adjust your journey accordingly.", null],
["That's how the BPM framework should work when a later phase reveals a mistake in earlier decisions.", dg("Returning to an earlier phase", D.route([4, 1], { back: [4, 1], alt: "Innovate returns to Process Architecture when a new discovery requires reconsideration." }), "A discovery during Innovate can require the team to return to Process Architecture.")],
["For example, a team working in Innovate might discover that its original Process Architecture was incomplete.", null],
["Returning to correct the architecture isn't a failure; it's a sensible response to what the team has learned.", st("Going back to correct earlier work is a sensible response to new evidence, not a failure.")],
["A ratchet, by contrast, is a mechanism that permits movement in only one direction.", null],
["If you treated the framework like a ratchet, you would refuse to revisit earlier work even when the evidence demanded it.", iss("A rigid framework prevents teams from correcting earlier mistakes, even when later discoveries reveal them.", "The ratchet trap")],
["And that can leave an organisation implementing a solution built on assumptions it already knows are wrong.", null],
["Now imagine the people and arrangements supporting you throughout your road trip.", q("What keeps the whole trip running smoothly, from the first stop to the last?")],
["You still need to manage the journey, help passengers adapt when plans change, and make decisions when problems arise.", null],
["Similarly, Project Management, People Change Management, and Leadership must support every phase of a BPM programme.", dg("Support throughout the journey", D.route([], { band: true }), "Project Management, People Change Management, and Leadership support every phase rather than forming separate phases.")],
["These essentials don't appear only at one particular stop; they remain important throughout the entire journey.", null],
["So remember that the framework provides direction without preventing teams from learning and correcting their course.", st("The BPM framework is a route, not a ratchet, because teams can revisit earlier phases when new evidence requires it.")],
["The aim is to reach a useful outcome, not merely to prove that every planned step was completed.", null]
]
},
{
title: "Ten phases in three groups",
lines: [
["Imagine a university planning to replace a complicated student registration process with something easier for everyone to use.", t("The BPM framework in three groups", "A university registration project illustrates how the ten phases work together.")],
["The university knows that registration causes frustration, but it needs a structured way to organise the improvement.", null],
["The team begins with Organisation Strategy, asking how better registration supports the university's wider goals.", dg("Organisation Strategy", D.route([0]), "The programme starts by linking better registration to the university's wider goals.")],
["Then Process Architecture helps everyone understand where registration fits among the university's other processes.", null],
["With that picture established, the Launch Pad prepares the programme so the improvement work can begin properly.", dg("Establishing the foundations", D.route([0, 1, 2]), "Organisation Strategy, Process Architecture, and the Launch Pad establish the programme's foundations during Weeks 5 to 7.")],
["Together, these opening phases establish the foundations for the programme during Weeks 5 to 7.", null],
["Now imagine the team sitting beside students and employees to discover what actually happens during registration.", null],
["Understand examines the current process, revealing delays, repeated information, and difficulties that students encounter.", dg("Understand", D.route([3]), "Understand studies how registration works today and why students struggle with it.")],
["Those discoveries inform Innovate, where the team designs a better registration experience.", null],
["But the new design will only succeed if the people affected understand and are prepared for the changes.", null],
["That's where People helps prepare employees and others who must work with the new arrangements.", dg("Understanding and designing change", D.route([3, 4, 5]), "Understand, Innovate, and People examine the process, design improvements, and prepare those affected during Weeks 8 to 10.")],
["These phases help the university investigate, design, and prepare for change during Weeks 8 to 10.", null],
["With a workable design in place, Develop builds the solution needed to support the improved registration process.", null],
["Implement then introduces that solution so students and employees can begin using it.", dg("Develop and Implement", D.route([6, 7]), "Develop builds the new registration solution, and Implement puts it into use.")],
["But launching the solution doesn't automatically mean the university has achieved the improvements it wanted.", null],
["Realise Value checks whether the intended benefits have actually been delivered.", dg("Realise Value", D.route([8]), "Realise Value checks whether the new registration process really delivers the benefits it promised.")],
["And Sustainable Performance focuses on maintaining those benefits rather than allowing the process to deteriorate afterward.", dg("Delivering and sustaining results", D.route([6, 7, 8, 9]), "Develop, Implement, Realise Value, and Sustainable Performance deliver, verify, and sustain improvements during Weeks 11 to 14.")],
["These closing phases run from Weeks 11 to 14, bringing the framework's complete journey together.", null],
["Now pause and imagine the team treating these phases as a checklist that must never be revisited.", q("What happens if the team discovers an earlier mistake but refuses to go back?")],
["It might deliver a technically completed system that employees don't actually use.", iss("Treating the framework as a rigid checklist can produce a system that nobody uses.", "Checklist thinking")],
["That's why the framework is a route rather than a ratchet, allowing teams to revisit earlier work when necessary.", null],
["And throughout the journey, Project Management, People Change Management, and Leadership remain essential.", dg("The essentials across every phase", D.route([], { band: true }), "Project Management, People Change Management, and Leadership support every phase of the BPM framework.")],
["These essentials are not separate phases, because the programme needs them continuously.", null],
["So remember that the framework helps organisations organise improvement, verify real value, and sustain performance over time.", null]
]
}
],
    },
  };
})();
