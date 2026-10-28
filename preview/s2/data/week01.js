/* Session 2 case data, week 1. Extracted verbatim from the OPER621 learning-support app (course data JSON); not rewritten. */
window.S2_DATA=window.S2_DATA||{};window.S2_DATA[1]={week:1,title:"Fundamentals of Process Management",classCase:{
    "company": "Qasr Hospitality Group — 14 hotels and resorts, 3,100 staff",
    "title": "One Guest, Nine Departments",
    "situation": [
     "A corporate guest arrives at the Qasr Marina property at 19:40 after a delayed flight. Her company booked through a travel management firm; the rate is governed by a corporate agreement the front desk cannot see.",
     "Reservations holds the booking in one system. The revenue office holds the rate agreement in a second. Housekeeping holds room status in a third. Finance holds the billing instruction in a fourth.",
     "She waits 23 minutes at the desk, is asked for her passport twice, and is given a room that housekeeping had not yet released. Her feedback score for the stay is 4 out of 10.",
     "The front-desk agent met the 90-second-per-guest standard for every transaction she completed. The revenue office answered within its 10-minute service level. Housekeeping released the room within its 45-minute target."
    ],
    "exhibitTitle": "Exhibit 1 — Where the 23 minutes went",
    "exhibit": [
     [
      "Step",
      "Department",
      "Minutes",
      "Adds value for the guest?"
     ],
     [
      "Queue at desk",
      "Front desk",
      "6",
      "No"
     ],
     [
      "Locate booking across two systems",
      "Front desk",
      "4",
      "No"
     ],
     [
      "Re-key guest details",
      "Front desk",
      "3",
      "No"
     ],
     [
      "Call revenue office to confirm rate",
      "Revenue office",
      "7",
      "No"
     ],
     [
      "Confirm room released",
      "Housekeeping",
      "2",
      "No"
     ],
     [
      "Hand over key and directions",
      "Front desk",
      "1",
      "Yes"
     ]
    ],
    "questions": [
     "You may remove exactly two of the six steps. Choose them, and state the specific risk Qasr accepts by removing each.",
     "Every department met its own published standard and the guest scored the stay 4 out of 10. What does that tell you about how Qasr measures performance?",
     "Draw the boundary of the process you would improve. Where does it start, where does it end, and who would object to that boundary?"
    ],
    "questionPoints": [
     {
      "heading": "Why functional excellence is not enough",
      "lookFor": [
       {
        "claim": "Every department can hit its targets while the end-to-end process fails the customer",
        "because": ""
       },
       {
        "claim": "Handoffs are where time, information and accountability are lost",
        "because": ""
       },
       {
        "claim": "Local optimisation frequently makes the whole worse",
        "because": "faster sales creates a backlog downstream"
       },
       {
        "claim": "The measure that matters is end-to-end, and almost nobody owns it",
        "because": ""
       }
      ]
     },
     {
      "heading": "Why functional excellence is not enough",
      "lookFor": [
       {
        "claim": "Every department can hit its targets while the end-to-end process fails the customer",
        "because": ""
       },
       {
        "claim": "Handoffs are where time, information and accountability are lost",
        "because": ""
       },
       {
        "claim": "Local optimisation frequently makes the whole worse",
        "because": "faster sales creates a backlog downstream"
       },
       {
        "claim": "The measure that matters is end-to-end, and almost nobody owns it",
        "because": ""
       }
      ]
     },
     {
      "heading": "What a process-centred organisation does differently",
      "lookFor": [
       {
        "claim": "Processes have named owners with authority over the whole flow, not one department's segment",
        "because": ""
       },
       {
        "claim": "Performance is measured end to end, from the customer's trigger to the customer's outcome",
        "because": ""
       },
       {
        "claim": "Budgets and improvement effort follow processes, not departments",
        "because": ""
       },
       {
        "claim": "Staff can describe the process they work in, not only their own step",
        "because": ""
       },
       {
        "claim": "The organisation chart does not disappear",
        "because": "the process view is laid over it"
       }
      ]
     }
    ],
    "contracts": [
     {
      "asks": [
       {
        "text": "Choose exactly two of the six steps to remove.",
        "kind": "select",
        "count": 2,
        "options": [
         {
          "name": "Queue at desk",
          "aliases": [
           "queue",
           "queuing",
           "waiting at the desk"
          ]
         },
         {
          "name": "Locate booking across two systems",
          "aliases": [
           "locate the booking",
           "locating the booking",
           "locate booking",
           "find the booking",
           "finding the booking",
           "two systems",
           "across systems",
           "search for the booking",
           "search for reservations",
           "searching for the reservation",
           "multiple platforms",
           "multiple systems",
           "different systems",
           "look up the booking",
           "looking up the booking",
           "manual search"
          ]
         },
         {
          "name": "Re-key guest details",
          "aliases": [
           "re-key",
           "rekey",
           "re-keying",
           "rekeying",
           "re-enter",
           "reenter",
           "retype",
           "re-type",
           "re-typing",
           "key in the guest",
           "typing in guest",
           "typing guest",
           "manual data entry",
           "re-entering the guest",
           "entering the guest details",
           "duplicate data entry",
           "typing the guest"
          ]
         },
         {
          "name": "Call revenue office to confirm rate",
          "aliases": [
           "call revenue",
           "revenue call",
           "calling revenue",
           "call to revenue",
           "call the revenue",
           "confirm the rate",
           "rate confirmation",
           "phone the revenue",
           "rate call",
           "revenue office",
           "confirmation call",
           "rate confirming",
           "confirming the rate",
           "rate confirmation call",
           "rate-confirmation call",
           "revenue-rate call",
           "revenue rate call",
           "corporate rate call",
           "rate-confirmation step",
           "confirming the corporate rate"
          ]
         },
         {
          "name": "Confirm room released",
          "aliases": [
           "confirm room released",
           "room release",
           "confirm the room",
           "room status check",
           "housekeeping confirmation",
           "confirming the room",
           "release confirmation",
           "released room check"
          ]
         },
         {
          "name": "Hand over key and directions",
          "aliases": [
           "hand over the key",
           "hand over key",
           "hand the key",
           "handing the key",
           "key and directions",
           "give the key",
           "giving the key"
          ]
         }
        ]
       },
       {
        "text": "For each step you remove, state the specific risk Qasr accepts by removing it. A general risk is not an answer to this question; the risk has to belong to that step.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "Hand over key and directions",
        "reasoning": [
         "remove",
         "cut",
         "delete",
         "drop",
         "eliminate",
         "unnecessary",
         "no value",
         "waste"
        ],
        "conflict": "This is the only step in Exhibit 1 marked as adding value for the guest. Removing it removes the part of the process the guest is actually there for.",
        "caseFact": "Exhibit 1 marks 'Hand over key and directions' as the one step that adds value for the guest; the other five are marked No."
       },
       {
        "option": "Confirm room released",
        "reasoning": [
         "later",
         "afterwards",
         "clean it after",
         "not needed",
         "unnecessary",
         "housekeeping can",
         "no risk",
         "little risk",
         "minor"
        ],
        "conflict": "The case already shows what happens without this check. Removing it as low-risk argues against the evidence in front of you.",
        "caseFact": "The guest 'is given a room that housekeeping had not yet released', and her score for the stay is 4 out of 10."
       }
      ],
      "note": "",
      "choiceNeeds": "the specific risk Qasr accepts by removing it",
      "nextCheck": "Does each risk follow from removing that step in particular, or would it have happened anyway? That is the part the app cannot judge, and the part the question is really testing.",
      "taskType": "remove_with_risk"
     },
     {
      "asks": [
       {
        "text": "Say what the gap between the departmental standards and the guest's score of 4 out of 10 tells you about how Qasr measures performance.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Your answer has to be about the measurement, not about the departments. Every department met its standard, so 'they performed badly' is ruled out by the case.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "",
        "reasoning": [
         "did not meet",
         "failed to meet",
         "missed their standard",
         "did not do their job",
         "poor performance by",
         "underperformed"
        ],
        "conflict": "The case states the opposite. Front desk met the 90-second standard, revenue answered inside its 10-minute service level, and housekeeping released the room inside its 45-minute target.",
        "caseFact": "'The front-desk agent met the 90-second-per-guest standard for every transaction she completed. The revenue office answered within its 10-minute service level. Housekeeping released the room within its 45-minute target.'"
       }
      ],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "",
      "taskType": "multi_requirement"
     },
     {
      "asks": [
       {
        "text": "State where the process you would improve starts.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "State where it ends.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Name who would object to that boundary, and say why they would object.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "",
      "taskType": "boundary"
     }
    ]
   },forumCase:{
    "title": "The Complaint That Nobody Owned",
    "organisation": "Al Madar Logistics, a regional freight forwarder, 1,400 staff, six GCC countries",
    "situation": [
     "A pharmaceutical client shipped a temperature-controlled consignment from Jebel Ali to Dammam. It arrived eleven hours late and four degrees warm. The client rejected the load, wrote off USD 180,000 of product, and sent one email to their account manager.",
     "That email travelled for nineteen days. The account manager forwarded it to Customer Service, who opened a ticket and asked Operations for a root cause. Operations said the delay was a customs hold and referred it to Compliance. Compliance said the paperwork was submitted correctly and the delay was a carrier issue, referring it to Vendor Management. Vendor Management noted the carrier had been flagged twice before and asked Quality to investigate. Quality asked Customer Service for the original ticket. The ticket had been closed nine days earlier as 'referred out'.",
     "Every department answered the question it was asked. Every department answered it correctly. Each of the six managers involved met their individual KPI that month: Customer Service closed tickets within SLA, Operations reported on-time gate-out, Compliance reported zero rejected declarations. Nobody's KPI measured whether the client got an answer.",
     "The CEO's reaction was to ask HR to design a customer-service training course."
    ],
    "exhibitTitle": "Exhibit 1 - Departmental KPIs for the month in question",
    "exhibit": [
     [
      "Core reading",
      "Jeston, Chapters 1-2"
     ],
     [
      "Estimated time",
      "90 minutes self-paced (45 min case and reading, 30 min initial post, 15 min replies)"
     ],
     [
      "Outcomes evidenced",
      "K1"
     ],
     [
      "Forum status",
      "Formative - supports Assessment 4 (Participation)"
     ]
    ],
    "questions": [
     "Al Madar has no broken department. Explain, using the distinction between a functional view and a process view, how six functions can each perform well while the outcome the client experiences fails completely.",
     "The CEO proposed customer-service training. State whether that intervention addresses the cause, and say what it would and would not fix.",
     "Identify who, in a process-centred organisation, would own this end-to-end. Describe what authority that person would need in order for the ownership to be real rather than nominal."
    ],
    "lookFor": [
     {
      "claim": "Names the core problem as optimisation of the parts at the expense of the whole",
      "because": "local KPIs that are individually met while the end-to-end outcome fails."
     },
     {
      "claim": "Recognises the hand-off points as where the value is lost, and counts them (at least five)",
      "because": ""
     },
     {
      "claim": "Rejects training as a cause-level fix",
      "because": "the staff behaved correctly within the structure they were given."
     },
     {
      "claim": "Describes a process owner with authority over budget, measures and hand-offs across functional boundaries",
      "because": "not merely a coordinator."
     },
     {
      "claim": "Proposes at least one end-to-end measure, e.g. time from client contact to resolution, owned by one person",
      "because": ""
     }
    ],
    "pushFurther": [
     "If the thread converges too early, post the strongest counter-argument yourself and attribute it to 'a view from the other side of the table'.",
     "Watch for answers that restate the case narrative instead of analysing it -- the most common postgraduate failure mode on case forums.",
     "Push any learner who proposes a solution to state what their solution costs, and who in the case would object to it."
    ],
    "contract": {
     "asks": [
      {
       "text": "Al Madar has no broken department. Explain, using the distinction between a functional view and a process view, how six functions can each perform well while the outcome the client experiences fails completely.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The CEO proposed customer-service training. State whether that intervention addresses the cause, and say what it would and would not fix.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Identify who, in a process-centred organisation, would own this end-to-end. Describe what authority that person would need in order for the ownership to be real rather than nominal.",
       "kind": "prose",
       "count": null,
       "options": []
      }
     ],
     "contradictions": [],
     "note": "",
     "choiceNeeds": "",
     "nextCheck": "",
     "taskType": "forum_multi_question"
    }
   }};
