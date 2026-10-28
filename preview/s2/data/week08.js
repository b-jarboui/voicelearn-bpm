/* Session 2 case data, week 8. Extracted verbatim from the OPER621 learning-support app (course data JSON); not rewritten. */
window.S2_DATA=window.S2_DATA||{};window.S2_DATA[8]={week:8,title:"The Understand Phase",classCase:{
    "company": "Qasr Hospitality Group — baselining guest arrival",
    "title": "Twenty-Three Minutes or Eighty-Two",
    "situation": [
     "The programme has measured guest arrival across all fourteen properties for six weeks. Three numbers are now in circulation and all three are being quoted by different people.",
     "The property management system reports 12.4 minutes, measured from the moment an agent opens the guest's booking record to the moment the key is encoded. This is the figure in the operations pack and the one the front-office director has used for two years.",
     "The guest whose arrival opened this programme in week 1 waited 23 minutes at the desk. Her corporate rate was located by telephone in seven minutes because the revenue office happened to answer.",
     "The programme's own measurement, following 310 corporate arrivals from lobby entry to entering a released room, reports a mean of 82.0 minutes. The largest single component is 47.0 minutes waiting for corporate rate approval when the revenue office does not answer immediately, which occurred in 61% of the sample. The front-office director has written to the sponsor stating that the 82-minute figure 'is not check-in' and that the programme is measuring other departments' work and calling it his."
    ],
    "exhibitTitle": "Exhibit 8 — Three measurements of the same arrival",
    "exhibit": [
     [
      "Measured from",
      "Measured to",
      "Source",
      "Minutes"
     ],
     [
      "Agent opens booking record",
      "Key encoded",
      "Property system",
      "12.4"
     ],
     [
      "Guest joins queue",
      "Guest leaves desk",
      "Week 1 observation, n=1",
      "23.0"
     ],
     [
      "Lobby entry",
      "Guest enters released room",
      "Programme, n=310 corporate",
      "82.0"
     ],
     [
      "Rate approval requested",
      "Rate approval received",
      "Programme, 61% of cases",
      "47.0"
     ],
     [
      "Value-adding activity within the 82",
      "—",
      "Programme",
      "8.1"
     ]
    ],
    "questions": [
     "Choose the figure the redesign will be held to, and then justify that choice directly to the front-office director, whose reported performance it quadruples.",
     "The week 1 guest waited 23 minutes and the measured mean is 82. Both observations are accurate. Explain what produced the gap, and state what an organisation should do when its most-quoted story and its measurement disagree.",
     "The 47-minute approval wait occurs in 61% of corporate arrivals and sits inside the revenue office, not the front desk. Decide who should own the 82-minute measure, and say what authority that person needs for the ownership to mean anything."
    ],
    "questionPoints": [
     {
      "heading": "How the evidence is gathered",
      "lookFor": [
       {
        "claim": "Walk the process end to end, following one real case from trigger to outcome",
        "because": ""
       },
       {
        "claim": "Interview performers separately from supervisors; the accounts differ and the difference is data",
        "because": ""
       },
       {
        "claim": "Extract system data where it exists, and be explicit about what the system cannot see",
        "because": ""
       },
       {
        "claim": "Sample enough cases to distinguish the normal path from the exception path",
        "because": ""
       }
      ]
     },
     {
      "heading": "When the famous story and the data disagree",
      "lookFor": [
       {
        "claim": "The story that starts a programme is one case, remembered because somebody complained",
        "because": ""
       },
       {
        "claim": "The measurement is the distribution, and it is almost always worse than the story",
        "because": ""
       },
       {
        "claim": "A single observed case cannot show you a wait that happens in 61% of cases and not in that one",
        "because": ""
       },
       {
        "claim": "Reconcile them in public",
        "because": "say which is the anecdote, which is the baseline, and which governs the redesign"
       }
      ]
     },
     {
      "heading": "Getting past the symptom",
      "lookFor": [
       {
        "claim": "Ask why the step exists, not only how long it takes",
        "because": ""
       },
       {
        "claim": "Distinguish steps that add value, steps that enable, and steps that only check other steps",
        "because": ""
       },
       {
        "claim": "A control added after a past failure may still be preventing something real",
        "because": "check before removing"
       },
       {
        "claim": "Root causes cluster",
        "because": "several symptoms usually trace to one structural fault"
       }
      ]
     }
    ],
    "contracts": [
     {
      "asks": [
       {
        "text": "Choose the figure the redesign will be held to.",
        "kind": "select",
        "count": 1,
        "options": [
         {
          "name": "12.4 minutes, the property system figure",
          "aliases": [
           "12.4",
           "property system figure",
           "system figure"
          ]
         },
         {
          "name": "23 minutes, the week 1 observation",
          "aliases": [
           "23 minutes",
           "23-minute",
           "week 1 observation"
          ]
         },
         {
          "name": "82 minutes, the programme's measurement",
          "aliases": [
           "82",
           "82.0",
           "programme's measurement",
           "programme measurement"
          ]
         }
        ]
       },
       {
        "text": "Justify that choice directly to the front-office director, whose reported performance it quadruples.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "12.4 minutes, the property system figure",
        "reasoning": [
         "end to end",
         "end-to-end",
         "whole process",
         "the guest's experience",
         "what the guest experiences",
         "complete arrival"
        ],
        "conflict": "12.4 minutes is not an end-to-end figure. It starts after the guest has queued and ends before the guest reaches a released room, so it excludes the two waits the case is about.",
        "caseFact": "Exhibit 8: the 12.4-minute figure is measured from 'Agent opens booking record' to 'Key encoded'."
       }
      ],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "Would your justification hold up said out loud to the front-office director, whose reported performance this figure quadruples?",
      "taskType": "single_choice"
     },
     {
      "asks": [
       {
        "text": "Explain what produced the gap between 23 minutes and 82 minutes.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "State what an organisation should do when its most-quoted story and its measurement disagree.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "",
        "reasoning": [
         "is wrong",
         "is inaccurate",
         "is false",
         "was measured incorrectly",
         "is a mistake",
         "is not accurate",
         "one of them must be wrong"
        ],
        "conflict": "The question states that both observations are accurate. They measure different spans, which is the thing to explain — not an error to find.",
        "caseFact": "'The week 1 guest waited 23 minutes and the measured mean is 82. Both observations are accurate.'"
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
        "text": "Name who should own the 82-minute measure.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Say what authority that person needs for the ownership to mean anything.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "",
      "taskType": "multi_requirement"
     }
    ]
   },forumCase:{
    "title": "Whose Number Is Right",
    "organisation": "Barakah Insurance, motor and property claims",
    "situation": [
     "Barakah is modelling its motor claims process as-is. Three sources disagree about how long it takes.",
     "The claims system reports average settlement of 9.2 days, measured from claim registration to payment instruction. The Head of Claims cites this figure in board reports.",
     "A sample of 200 claims traced manually by the BPM team found 21.6 days, measured from the customer's first contact to money reaching the customer's account. The difference is explained by: an average of 4.1 days between first contact and registration, during which documents are collected by email; and an average of 8.3 days between payment instruction and settlement, which sits with Finance and is not in the claims system.",
     "The customer complaints log, independently, shows the most common complaint is 'no update for weeks', concentrated in the pre-registration window that the official metric does not measure at all.",
     "The Head of Claims has objected to the BPM team's figure, on the grounds that Barakah cannot be held responsible for time spent waiting for the customer to send documents. He is not wrong that some of the 4.1 days is customer time. The BPM team has not separated it."
    ],
    "exhibitTitle": "Exhibit 1 - Three views of the same process",
    "exhibit": [
     [
      "Core reading",
      "Jeston, Chapter 16"
     ],
     [
      "Estimated time",
      "90 minutes self-paced (45 min case and reading, 30 min initial post, 15 min replies)"
     ],
     [
      "Outcomes evidenced",
      "K3, S1"
     ],
     [
      "Assessment",
      "Assessment 2 - Virtual Lab (20%)"
     ],
     [
      "Forum status",
      "Formative - supports Assessment 4 (Participation)"
     ]
    ],
    "questions": [
     "Both the 9.2-day and 21.6-day figures are defensible. Explain what each one measures, and argue which should govern the redesign.",
     "The Head of Claims objects that customer document-collection time is not Barakah's responsibility. Evaluate that objection. Is waiting time caused by the customer outside the scope of process improvement?",
     "The Understand phase is meant to establish an agreed baseline. Describe how you would resolve this disagreement so that the redesign proceeds from a number both parties accept."
    ],
    "lookFor": [
     {
      "claim": "Distinguishes an internal system boundary from the customer's experienced end-to-end",
      "because": ""
     },
     {
      "claim": "Argues for the customer-experienced measure while acknowledging the internal measure has a legitimate operational use",
      "because": ""
     },
     {
      "claim": "Challenges the objection",
      "because": "how documents are requested is a design choice that determines how long the customer takes."
     },
     {
      "claim": "Concedes the BPM team's methodological weakness in not separating customer wait from internal wait",
      "because": ""
     },
     {
      "claim": "Proposes a decomposed baseline agreed with the process owner before redesign, not a single contested number",
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
       "text": "Both the 9.2-day and 21.6-day figures are defensible. Explain what each one measures, and argue which should govern the redesign.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The Head of Claims objects that customer document-collection time is not Barakah's responsibility. Evaluate that objection. Is waiting time caused by the customer outside the scope of process improvement?",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The Understand phase is meant to establish an agreed baseline. Describe how you would resolve this disagreement so that the redesign proceeds from a number both parties accept.",
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
