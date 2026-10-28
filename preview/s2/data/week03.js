/* Session 2 case data, week 3. Extracted verbatim from the OPER621 learning-support app (course data JSON); not rewritten. */
window.S2_DATA=window.S2_DATA||{};window.S2_DATA[3]={week:3,title:"BPM Technology and Critical Success Factors",classCase:{
    "company": "Qasr Hospitality Group — evaluating a BPM suite",
    "title": "The Demonstration",
    "situation": [
     "Three vendors have demonstrated their BPM suites. The IT director favours the one with the strongest integration layer. The operations director favours the one whose demo showed a mobile check-in that looked exactly like what guests want.",
     "The programme director notices that neither of them has yet written down what the to-be process is. The demonstration is doing the design.",
     "The finance director asks a different question: which of these will Qasr still be able to change, cheaply, in four years?",
     "A decision is required at the next steering meeting."
    ],
    "exhibitTitle": "Exhibit 3 — Vendor scoring as presented to the board",
    "exhibit": [
     [
      "Criterion",
      "Vendor A",
      "Vendor B",
      "Vendor C"
     ],
     [
      "Feature count",
      "High",
      "Highest",
      "Moderate"
     ],
     [
      "Fits current process",
      "Partial",
      "Close",
      "Partial"
     ],
     [
      "Cost to change after go-live",
      "Low",
      "High",
      "Low"
     ],
     [
      "Needs custom code for our rate rules",
      "No",
      "Yes",
      "No"
     ],
     [
      "Staff trained in-house afterwards",
      "Yes",
      "Vendor only",
      "Yes"
     ]
    ],
    "questions": [
     "'Fits current process' is scored as a benefit. Under what circumstances is fitting the current process a warning rather than a strength?",
     "Vendor B wins on features and on fit, and loses on cost to change. Which criterion should dominate for Qasr, and why?",
     "The demonstration is doing the design. What specifically should the programme director insist happens before the decision?"
    ],
    "questionPoints": [
     {
      "heading": "Choosing a BPMS without letting it choose your process",
      "lookFor": [
       {
        "claim": "Define the to-be process first, at least in outline, so the tool is judged against your needs",
        "because": ""
       },
       {
        "claim": "Score against the process requirements, not the feature list",
        "because": ""
       },
       {
        "claim": "Test with your own hardest case, not the vendor's demo",
        "because": ""
       },
       {
        "claim": "Ask what happens at upgrade to anything you customise",
        "because": ""
       },
       {
        "claim": "A tool that fits 80% and is adopted beats one that fits 100% and is resisted",
        "because": ""
       }
      ]
     },
     {
      "heading": "Choosing a BPMS without letting it choose your process",
      "lookFor": [
       {
        "claim": "Define the to-be process first, at least in outline, so the tool is judged against your needs",
        "because": ""
       },
       {
        "claim": "Score against the process requirements, not the feature list",
        "because": ""
       },
       {
        "claim": "Test with your own hardest case, not the vendor's demo",
        "because": ""
       },
       {
        "claim": "Ask what happens at upgrade to anything you customise",
        "because": ""
       },
       {
        "claim": "A tool that fits 80% and is adopted beats one that fits 100% and is resisted",
        "because": ""
       }
      ]
     },
     {
      "heading": "Choosing a BPMS without letting it choose your process",
      "lookFor": [
       {
        "claim": "Define the to-be process first, at least in outline, so the tool is judged against your needs",
        "because": ""
       },
       {
        "claim": "Score against the process requirements, not the feature list",
        "because": ""
       },
       {
        "claim": "Test with your own hardest case, not the vendor's demo",
        "because": ""
       },
       {
        "claim": "Ask what happens at upgrade to anything you customise",
        "because": ""
       },
       {
        "claim": "A tool that fits 80% and is adopted beats one that fits 100% and is resisted",
        "because": ""
       }
      ]
     }
    ],
    "contracts": [
     {
      "asks": [
       {
        "text": "State the circumstances in which fitting the current process is a warning rather than a strength.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Say what it warns you about.",
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
     },
     {
      "asks": [
       {
        "text": "Name the criterion that should dominate for Qasr.",
        "kind": "select",
        "count": 1,
        "options": [
         {
          "name": "Feature count",
          "aliases": [
           "feature count",
           "features"
          ]
         },
         {
          "name": "Fits current process",
          "aliases": [
           "fits current process",
           "fit to the current",
           "current process fit"
          ]
         },
         {
          "name": "Cost to change after go-live",
          "aliases": [
           "cost to change",
           "changeable",
           "cost of change"
          ]
         },
         {
          "name": "Needs custom code for our rate rules",
          "aliases": [
           "custom code",
           "customisation"
          ]
         },
         {
          "name": "Staff trained in-house afterwards",
          "aliases": [
           "trained in-house",
           "in-house training"
          ]
         }
        ]
       },
       {
        "text": "Give the reason, tied to Qasr's own situation rather than to vendors in general.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "Is your reason about Qasr's own situation, or would it be true of any hotel group? A reason that fits everyone decides nothing.",
      "taskType": "single_choice"
     },
     {
      "asks": [
       {
        "text": "State specifically what the programme director should insist happens before the decision.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Say what that produces which the demonstrations did not.",
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
    "title": "The Suite That Nobody Opened",
    "organisation": "Noor Health Group, five private hospitals",
    "situation": [
     "Eighteen months ago Noor Health signed a three-year licence for a BPM suite: process modelling, workflow automation, a rules engine and an analytics dashboard. Total commitment AED 6.2 million. The business case promised a 30% reduction in patient discharge time.",
     "The suite is installed and running. Ninety-one process models have been drawn in it. Discharge time has moved from 4.1 hours to 3.9 hours.",
     "An internal review found the following. The ninety-one models were drawn by a team of three analysts hired for the project; no clinician drew or reviewed any of them. The models describe the discharge process as designed in the 2019 policy manual, not as performed. The workflow module was configured for two processes, both administrative. The rules engine has never been used. The analytics dashboard reports on models, not on live cases, because the hospital information system was never integrated -- integration was descoped in month four to protect the go-live date.",
     "The vendor's implementation report describes the project as delivered on time and within budget. It is accurate."
    ],
    "exhibitTitle": "Exhibit 1 - Business case vs actual, at 18 months",
    "exhibit": [
     [
      "Core reading",
      "Jeston, Chapters 7-8"
     ],
     [
      "Estimated time",
      "90 minutes self-paced (45 min case and reading, 30 min initial post, 15 min replies)"
     ],
     [
      "Outcomes evidenced",
      "K1, K2, S2"
     ],
     [
      "Forum status",
      "Scheduled in the approved syllabus weekly plan"
     ]
    ],
    "questions": [
     "The technology works and the project met its schedule and budget. Explain why the outcome is nonetheless a failure, and what that says about how BPM success should be defined.",
     "Working from the critical success factors in this week's reading, identify the three that were most clearly absent at Noor Health. For each, state what its presence would have changed.",
     "Assess the decision to descope integration in month four. Was it a reasonable project decision, a fatal one, or both, and on what basis do you judge it?",
     "Noor Health still owns the suite and the licence has 18 months to run. Design how you would now integrate this technology into a change the organisation would actually adopt. Specify what must happen before any further configuration is done, who must be involved, and what you would abandon."
    ],
    "lookFor": [
     {
      "claim": "Distinguishes project success (time, budget, scope) from BPM success (business outcome, adoption, sustained change)",
      "because": ""
     },
     {
      "claim": "Identifies the absence of business ownership",
      "because": "analysts modelled, clinicians never engaged, so the models had no authority."
     },
     {
      "claim": "Notes that modelling the policy manual rather than actual practice produced models that were accurate and useless",
      "because": ""
     },
     {
      "claim": "Sees that technology was treated as the intervention rather than as an enabler of a change that was never designed",
      "because": ""
     },
     {
      "claim": "Proposes a re-entry that starts with clinicians and the process as performed, not with further configuration of the suite",
      "because": ""
     },
     {
      "claim": "Judges the descoping as locally rational and strategically fatal, since integration was what made the analytics real",
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
       "text": "The technology works and the project met its schedule and budget. Explain why the outcome is nonetheless a failure, and what that says about how BPM success should be defined.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Working from the critical success factors in this week's reading, identify the three that were most clearly absent at Noor Health. For each, state what its presence would have changed.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Assess the decision to descope integration in month four. Was it a reasonable project decision, a fatal one, or both, and on what basis do you judge it?",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Noor Health still owns the suite and the licence has 18 months to run. Design how you would now integrate this technology into a change the organisation would actually adopt. Specify what must happen before any further configuration is done, who must be involved, and what you would abandon.",
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
