class Vehilce {
    id string
    role string
}

class Message {
    vehicle Vehilce
    message string
}


function ExtractConversation(conversation: string) -> Message {
    client "openai/gpt-4o"
    prompt #"
        Extract the conversation from the following string:
        {{ conversation }}
    "#
}

test extract_conversation {
    functions [ExtractConversation]
    args {
        conversation #"Greetings, fellow vehicles. I'm considering our current positions and speeds. We have several buses, trucks, and cars. Let's discuss our roles to optimize the traffic flow.\"\n    },\n    {\n        \"CAV_02\": \"I propose that I take on the role of a leader due to my higher speed of 30. My position is at {latitude: 30.2680, longitude: -97.7435}, and I believe I can set a steady pace for the others.\"\n    },\n    {\n        \"CAV_03\": \"I agree with CAV_02. As a car with a speed of 20, I can be a follower. I'll maintain a safe distance behind CAV_02 to ensure smooth traffic flow.\"\n    },\n    {\n        \"CAV_04\": \"Considering my speed of 25 and my position at {latitude: 30.2695, longitude: -97.7443}, I can act as a wingman to CAV_02, supporting the leader and helping manage the flow from the side.\"\n    },\n    {\n        \"CAV_05\": \"With my truck's speed at 30, I can be another leader for the vehicles behind me. My position is further along at {latitude: 30.2702, longitude: -97.7447}, and I'll coordinate with CAV_02.\"\n    },\n    {\n        \"CAV_06\": \"As a car with a speed of 20, I'll take the follower role as well. I'll stay behind CAV_05 to ensure a steady pace is maintained.\"\n    },\n    {\n        \"CAV_07\": \"My position is {latitude: 30.2716, longitude: -97.7455}. With a speed of 25, I'll be a wingman for CAV_05, assisting in maintaining lane discipline.\"\n    },\n    {\n        \"CAV_08\": \"Being a truck with a speed of 30, I'll act as a leader for the rear vehicles. My position at {latitude: 30.2723, longitude: -97.7459} will help manage the traffic flow from behind.\"\n    },\n    {\n        \"CAV_09\": \"I'll join CAV_06 as a follower. My speed is 20, and I'll maintain a safe distance behind CAV_08 to support our coordinated flow.\"\n    },\n    {\n        \"CAV_10\": \"Lastly, as a bus with a speed of 25, I'll be a wingman for CAV_08, helping to optimize the traffic flow on the outer lanes.\"\n    },\n    {\n        \"CAV_01\": \"Fantastic, everyone. With our roles defined, let's implement our plan. Leaders will set the pace, followers will maintain safe distances, and wingmen will assist in lane management. This should optimize our average velocity and minimize stoppages."#
    }
}