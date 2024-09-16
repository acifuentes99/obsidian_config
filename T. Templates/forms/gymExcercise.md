<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm(
{
      "title": "Gym Excercise",
      "name": "GymExcercise",
      "fields": [
        {
          "name": "Date",
          "label": "Date",
          "description": "",
          "isRequired": false,
          "input": {
            "type": "date"
          }
        },
        {
          "name": "Exercise",
          "label": "Exercise",
          "description": "Pick one option",
          "input": {
            "type": "select",
            "allowUnknownValues": true,
            "source": "fixed",
            "options": [
            {
            name: "Barbell Bench Press",
            label: "Barbell Bench Press"
            },
            {
            name: "Bench Press (Close Grip)",
            label: "Bench Press (Close Grip)"
            },
            {
            name: "Incline Bench Press",
            label: "Incline Bench Press"
            },
            {
            name: "Reverse Grip Bench Press",
            label: "Reverse Grip Bench Press"
            },
            {
            name: "Bench Press (DB)",
            label: "Bench Press (DB)"
            },
            {
            name: "Military Press (Stand)",
            label: "Military Press (Stand)"
            },
            {
            name: "Military Press (Seated)",
            label: "Military Press (Seated)"
            },
            {
            name: "Push Press",
            label: "Push Press"
            },
            {
            name: "Deadlift (BB)",
            label: "Deadlift (BB)"
            },
            {
            name: "Deadlift (Trap Bar)",
            label: "Deadlift (Trap Bar)"
            },
            {
            name: "Sumo Deadlift",
            label: "Sumo Deadlift"
            },
            {
            name: "Romanian Deadlift",
            label: "Romanian Deadlift"
            },
            {
            name: "PullUp",
            label: "PullUp"
            },
            {
            name: "ChinUp",
            label: "ChinUp"
            },
            {
            name: "Back Squat (BB)",
            label: "Back Squat (BB)"
            },
            {
            name: "Front/Zombie Squat",
            label: "Front/Zombie Squat"
            },
            {
            name: "Good Morning (BB)",
            label: "Good Morning (BB)"
            },
            {
            name: "Dip",
            label: "Dip"
            },
            {
            name: "Tricep Pressdown",
            label: "Tricep Pressdown"
            },
            {
            name: "EZ Bar Skullcrusher",
            label: "EZ Bar Skullcrusher"
            },
            {
            name: "Tricep OH Press",
            label: "Tricep OH Press"
            },
            {
            name: "Side Rise (DB)",
            label: "Side Rise (DB)"
            },
            {
            name: "Rear delt fly (Cable)",
            label: "Rear delt fly (Cable)"
            },
            {
            name: "Row (Barbell)",
            label: "Row (Barbell)"
            },
            {
            name: "Row (Cable)",
            label: "Row (Cable)"
            },
            {
            name: "One Arm DB Row",
            label: "One Arm DB Row"
            },
            {
            name: "T Bar Row",
            label: "T Bar Row"
            },
            {
            name: "DB Curl (alternate)",
            label: "DB Curl (alternate)"
            },
            {
            name: "Hammer Curl",
            label: "Hammer Curl"
            },
            {
            name: "Cable Curl",
            label: "Cable Curl"
            },
            {
            name: "EZ Bar Preacher Curl",
            label: "EZ Bar Preacher Curl"
            },
            {
            name: "Walking DB Lunge",
            label: "Walking DB Lunge"
            },
            {
            name: "Bulgarian Split Squat",
            label: "Bulgarian Split Squat"
            },
            {
            name: "Leg Curl (Lying/Seat)",
            label: "Leg Curl (Lying/Seat)"
            },
            {
            name: "Calf Raise (Leg Press)",
            label: "Calf Raise (Leg Press)"
            },
            {
            name: "Calf Rise (Seated)",
            label: "Calf Rise (Seated)"
            },
            {
            name: "Calf Rise (Standing)",
            label: "Calf Rise (Standing)"
            },
            {
            name: "Cross Cable Fly",
            label: "Cross Cable Fly"
            },
            {
            name: "Cable Bench Press",
            label: "Cable Bench Press"
            },
            {
            name: "Inclined DB Bench Press",
            label: "Inclined DB Bench Press"
            },
            {
            name: "2 DB Tricep Extension",
            label: "2 DB Tricep Extension"
            },
            {
            name: "Close Grip Cable Row",
            label: "Close Grip Cable Row"
            },
            {
            name: "Close Grip Cable Pullup",
            label: "Close Grip Cable Pullup"
            },
            {
            name: "Cable Pullup",
            label: "Cable Pullup"
            },
            {
            name: "Smith Machine Lunges",
            label: "Smith Machine Lunges"
            },
            {
            name: "Snatch",
            label: "Snatch"
            },
            {
            name: "Clean",
            label: "Clean"
            },
            {
            name: "Snatch Pull",
            label: "Snatch Pull"
            },
            {
            name: "Clean Pull",
            label: "Clean Pull"
            },
            {
            name: "Overhead Squat",
            label: "Overhead Squat"
            },
            {
            name: "High Hang Snatch",
            label: "High Hang Snatch"
            },
            {
            name: "High Hang Clean",
            label: "High Hang Clean"
            },
            {
            name: "Power Snatch",
            label: "Power Snatch"
            },
            {
            name: "Power Clean",
            label: "Power Clean"
            },
            {
            name: "High Hang Power Snatch",
            label: "High Hang Power Snatch"
            },
            {
            name: "High Hang Power Clean",
            label: "High Hang Power Clean"
            },
            {
            name: "Snatch Deadlift",
            label: "Snatch Deadlift"
            },
            {
            name: "Clean Deadlift",
            label: "Clean Deadlift"
            }
            ]
          }
        },
		{
          "name": "Weekday",
          "label": "Dia semana",
          "isRequired": false,
			"input": {
            "type": "select",
            "allowUnknownValues": true,
            "source": "fixed",
            "options": [
            {
            name: "Lunes",
            label: "Lunes"
            },
            {
            name: "Martes",
            label: "Martes"
            },
            {
            name: "Miercoles",
            label: "Miercoles"
            },
            {
            name: "Jueves",
            label: "Jueves"
            },
            {
            name: "Viernes",
            label: "Viernes"
            },
            {
            name: "Sabado",
            label: "Sabado"
            },
            {
            name: "Domingo",
            label: "Domingo"
            },
						]}
        },	
        {
          "name": "Weight",
          "label": "Weight",
          "description": "In Kgs",
          "isRequired": false,
          "input": {
            "type": "number"
          }
        },
        {
          "name": "Sets",
          "label": "Sets",
          "description": "",
          "isRequired": false,
          "input": {
            "type": "number"
          }
        },
        {
          "name": "Reps",
          "label": "Reps",
          "description": "",
          "isRequired": false,
          "input": {
            "type": "number"
          }
        }
      ],
      "version": "1"
    }
);
tR += result.asString('* [ ] [date:: {{Date}}]! [weekday:: {{Weekday}}]! [exercise:: {{Exercise}}]! [weight:: {{Weight}}]! [sets:: {{Sets}}]! [reps:: {{Reps}}]! [usedweightlbs:: ]! [usedweightkg:: ]! [finalreps:: ]!');
-%>