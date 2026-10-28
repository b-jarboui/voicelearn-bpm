/* Session 2 case data, week 9. Extracted verbatim from the OPER621 learning-support app (course data JSON); not rewritten. */
window.S2_DATA=window.S2_DATA||{};window.S2_DATA[9]={week:9,title:"The Innovate Phase",classCase:{
    "company": "Qasr Hospitality Group — two designs on the table",
    "title": "The Kiosk or the Arrival",
    "situation": [
     "Phase 4 established a mean of 82.0 minutes from lobby to room for corporate arrivals, of which 8.1 minutes are activity a guest would recognise as being served, and 47.0 minutes are waiting for rate approval in 61% of cases. Two designs have been produced.",
     "Design A keeps the shape of arrival and removes waste from it: identity capture moves to a kiosk, rate approval is requested automatically when the booking is made rather than when the guest appears, and re-keying is eliminated. Modelled result 44 minutes. It requires no change to how housekeeping or reservations work, and reaches all fourteen properties in eighteen weeks.",
     "Design B removes arrival as an event: identity and payment complete at booking, rate approval resolves overnight against the corporate agreement, the room is assigned the previous evening against actual housekeeping status, and the guest's phone opens the door. Modelled result 22 minutes overall, with no desk step at all for the 74% of guests whose booking is complete. It requires reservations, revenue, housekeeping and finance to change how they work, integration across all four systems, and 14 months.",
     "At the design review, seven of the nine objections raised concerned the 26% of guests who would still need a desk. The tourism authority's digital guest record rule takes effect in January, eleven months away, and Design B's integration work is the same integration work that rule requires."
    ],
    "exhibitTitle": "Exhibit 9 — The two designs against the phase 4 baseline",
    "exhibit": [
     [
      "",
      "Baseline",
      "Design A",
      "Design B"
     ],
     [
      "Lobby to room, minutes",
      "82.0",
      "44.0",
      "22.0"
     ],
     [
      "Value-adding minutes",
      "8.1",
      "8.1",
      "8.1"
     ],
     [
      "47-minute approval wait",
      "61% of cases",
      "Removed",
      "Removed"
     ],
     [
      "Functions required to change",
      "—",
      "1",
      "4"
     ],
     [
      "Time to all fourteen properties",
      "—",
      "18 weeks",
      "14 months"
     ],
     [
      "Shares the January regulatory work",
      "—",
      "No",
      "Yes"
     ]
    ],
    "questions": [
     "Choose A, B, or a stated sequence of both, and say precisely what your choice forecloses that the alternative would have kept open.",
     "Seven of nine objections concerned 26% of guests. Decide whether that concentration is a legitimate signal about the design or a predictable distortion, and give the reasoning that lets you tell the two apart.",
     "Design B's integration work is the same work the January regulatory deadline already requires. Decide whether that shared dependency makes B cheaper than it looks or more dangerous than it looks, and act on your decision."
    ],
    "questionPoints": [
     {
      "heading": "Banking the small gain",
      "lookFor": [
       {
        "claim": "A delivered 12% makes a proposed 60% harder to fund, not easier",
        "because": ""
       },
       {
        "claim": "The organisation's appetite for disruption is spent once and recovers slowly",
        "because": ""
       },
       {
        "claim": "Sequencing improvement before redesign is defensible",
        "because": "but decide it, do not drift into it"
       },
       {
        "claim": "If the small version is chosen, record what it forecloses so the choice is visible later",
        "because": ""
       }
      ]
     },
     {
      "heading": "What legitimately bounds the redesign",
      "lookFor": [
       {
        "claim": "Regulation, where the requirement is genuine rather than assumed",
        "because": ""
       },
       {
        "claim": "Physical and contractual reality",
        "because": "leases, licences, union agreements"
       },
       {
        "claim": "Capability: what the organisation can actually absorb, from week 1's maturity discussion",
        "because": ""
       },
       {
        "claim": "Time, where an external deadline is fixed and real",
        "because": ""
       },
       {
        "claim": "A delivered 12% makes a proposed 60% harder to fund, not easier",
        "because": ""
       },
       {
        "claim": "The organisation's appetite for disruption is spent once and recovers slowly",
        "because": ""
       },
       {
        "claim": "Sequencing improvement before redesign is defensible",
        "because": "but decide it, do not drift into it"
       },
       {
        "claim": "If the small version is chosen, record what it forecloses so the choice is visible later",
        "because": ""
       }
      ]
     },
     {
      "heading": "What legitimately bounds the redesign",
      "lookFor": [
       {
        "claim": "Regulation, where the requirement is genuine rather than assumed",
        "because": ""
       },
       {
        "claim": "Physical and contractual reality",
        "because": "leases, licences, union agreements"
       },
       {
        "claim": "Capability",
        "because": "what the organisation can actually absorb, from week 1's maturity discussion"
       },
       {
        "claim": "Time, where an external deadline is fixed and real",
        "because": ""
       }
      ]
     }
    ],
    "contracts": [
     {
      "asks": [
       {
        "text": "Choose Design A, Design B, or a stated sequence of both.",
        "kind": "select",
        "count": 1,
        "options": [
         {
          "name": "Design A",
          "aliases": [
           "design a",
           "option a"
          ]
         },
         {
          "name": "Design B",
          "aliases": [
           "design b",
           "option b"
          ]
         },
         {
          "name": "A sequence of both",
          "aliases": [
           "sequence",
           "a first then b",
           "a then b",
           "both in sequence"
          ]
         }
        ]
       },
       {
        "text": "Say precisely what your choice forecloses that the alternative would have kept open.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "Design B",
        "reasoning": [
         "no change to",
         "does not require other",
         "only the front desk",
         "one function",
         "single function",
         "without changing how"
        ],
        "conflict": "Design B is the one that requires four functions to change. Describing it as contained understates the cost the exhibit puts on it.",
        "caseFact": "Exhibit 9: 'Functions required to change' is 1 for Design A and 4 for Design B."
       }
      ],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "Have you said what your choice forecloses, and not only what it gains? The question asks what the alternative would have kept open.",
      "taskType": "choice_or_sequence"
     },
     {
      "asks": [
       {
        "text": "Decide: is the concentration of objections a legitimate signal about the design, or a predictable distortion?",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Give the reasoning that lets you tell the two apart. The question asks for the test, not only the verdict.",
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
        "text": "Decide: does the shared regulatory work make Design B cheaper than it looks, or more dangerous than it looks?",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Act on your decision — say what you would do differently as a result of it.",
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
    "title": "Twelve Percent or Sixty",
    "organisation": "Rafid Airlines Cargo, air freight, hub operation",
    "situation": [
     "Rafid's cargo acceptance process takes 4.5 hours from truck arrival to aircraft-ready. The Innovate workshop produced two redesigns.",
     "Option A removes duplicate documentation checks, moves the weight and dimension check to arrival instead of after screening, and reallocates two staff. It reaches 3.9 hours, a 13% improvement. It requires no capital, no system change, and can be live in seven weeks. Every workshop participant agreed it would work.",
     "Option B redesigns acceptance around pre-lodged electronic manifests: freight forwarders submit documentation before the truck departs, screening is scheduled against the manifest, and physical checks become exception-based. It reaches 1.8 hours, a 60% improvement. It requires integration with 140 freight forwarders of varying sophistication, a new rules engine, regulatory approval for exception-based screening, and 14-18 months. Roughly 30 of the 140 forwarders have no electronic capability at all.",
     "The Cargo Director must recommend one to a board that approved the BPM programme on a promise of 'demonstrable results within the year'.",
     "The workshop facilitator observed that when Option B was presented, the room's objections were all about the 30 unsophisticated forwarders -- who represent 4% of tonnage."
    ],
    "exhibitTitle": "Exhibit 1 - Option comparison",
    "exhibit": [
     [
      "Core reading",
      "Jeston, Chapter 17"
     ],
     [
      "Estimated time",
      "90 minutes self-paced (45 min case and reading, 30 min initial post, 15 min replies)"
     ],
     [
      "Outcomes evidenced",
      "S1, S2"
     ],
     [
      "Forum status",
      "Formative - supports Assessment 4 (Participation)"
     ]
    ],
    "questions": [
     "Recommend Option A or Option B, or a sequence of both, and justify the recommendation in terms of what the Innovate phase is for.",
     "The room's objections to Option B concentrated on forwarders representing 4% of tonnage. Analyse what that pattern reveals about how organisations evaluate radical redesign, and how a facilitator should handle it.",
     "Assess the risk that doing Option A first makes Option B less likely to happen, and say whether that changes your recommendation."
    ],
    "lookFor": [
     {
      "claim": "Frames the choice as incremental improvement versus process innovation, not as low risk versus high risk",
      "because": ""
     },
     {
      "claim": "Notices the 4% objection as loss aversion and edge-case anchoring against a change affecting 96%",
      "because": ""
     },
     {
      "claim": "Engages with the real danger of sequencing",
      "because": "banking a 13% gain can dissolve the case for the 60% one."
     },
     {
      "claim": "Considers a staged Option B (top forwarders by tonnage first) rather than treating the choice as binary",
      "because": ""
     },
     {
      "claim": "Connects to the board's expectation of results within the year without simply capitulating to it",
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
       "text": "Recommend Option A or Option B, or a sequence of both, and justify the recommendation in terms of what the Innovate phase is for.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The room's objections to Option B concentrated on forwarders representing 4% of tonnage. Analyse what that pattern reveals about how organisations evaluate radical redesign, and how a facilitator should handle it.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Assess the risk that doing Option A first makes Option B less likely to happen, and say whether that changes your recommendation.",
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
