class Message {
    vehicle VehicleInfo
    message string
}
class VehicleInfo {
    id string
    role string
}

function ExtractConversation(conversation: string) -> Message[] {
    client "openai/gpt-4o"
    prompt #"
        Extract the conversation from the following text:

    {{ ctx.output_format }}

        Conversation:
        ------------
        {{ conversation }}
        ------------
    "#
}

test extract_conversation {
    functions [ExtractConversation]
    args {
        conversation #"[
  {
    "vehicle": {
      "id": "CAV_01",
      "role": "not assigned"
    },
    "message": "Good day, fellow vehicles! This is Vehicle 01. Our current positions suggest the following order for optimal traffic flow: Vehicle 1, Vehicle 2, Vehicle 3. Each vehicle should maintain a safe following distance. Given my position at latitude 30.2672 and longitude -97.7431, I propose leading initially. Please confirm your agreement or suggest adjustments."
  },
  {
    "vehicle": {
      "id": "CAV_02",
      "role": "not assigned"
    },
    "message": "Hello everyone, this is Vehicle 02. I agree with Vehicle 01's proposed order. My current location at latitude 30.2680 and longitude -97.7435 supports this sequence. I suggest we set our speeds to maintain safe distances. Awaiting confirmation from Vehicle 03."
  },
  {
    "vehicle": {
      "id": "CAV_03",
      "role": "not assigned"
    },
    "message": "Greetings, this is Vehicle 03. I concur with the proposed order. My position at latitude 30.2688 and longitude -97.7439 is suitable for the third position. I am ready to adjust speed accordingly and maintain safe following distances."
  },
  {
    "vehicle": {
      "id": "CAV_01",
      "role": "leader"
    },
    "message": "Thank you for your cooperation. I will assume the role of leader, setting a speed of 20 to ensure optimal traffic flow and safety. Vehicle 02, please follow at a distance of 50 meters, and Vehicle 03, maintain a distance of 50 meters behind Vehicle 02."
  },
  {
    "vehicle": {
      "id": "CAV_02",
      "role": "follower"
    },
    "message": "Acknowledged, Vehicle 01. I will maintain a speed of 18 to ensure a safe distance of 50 meters from you. Vehicle 03, please ensure a similar distance from me. Let's optimize our flow through the upcoming traffic light cycle efficiently."
  },
  {
    "vehicle": {
      "id": "CAV_03",
      "role": "follower"
    },
    "message": "Understood, Vehicle 02. I will maintain a speed of 15 to keep a safe distance of 50 meters. This coordination should help us minimize stops and maintain a steady flow."
  },
  {
    "vehicle": {
      "id": "CAV_01",
      "role": "leader"
    },
    "message": "As the leader, I will monitor the traffic light phases closely. Currently, all vehicles are at a red phase with 20 seconds remaining. I will adjust speeds as necessary to time our approach optimally to the next green phase."
  },
  {
    "vehicle": {
      "id": "CAV_02",
      "role": "follower"
    },
    "message": "Copy that, Vehicle 01. I will be ready to adapt my speed and distance based on your adjustments to ensure we all pass safely and efficiently through the intersection."
  },
  {
    "vehicle": {
      "id": "CAV_03",
      "role": "follower"
    },
    "message": "Message received, Vehicle 01. I am prepared to adjust as instructed to maintain the optimal flow and ensure safety for all vehicles."
  },
  {
    "vehicle": {
      "id": "CAV_01",
      "role": "leader"
    },
    "message": "Excellent coordination, team. As the light turns green, I will increase my speed gradually to 25. Please adjust your speeds accordingly to maintain safe distances. Let's proceed safely and efficiently. Drive safely, everyone!"
  }
]"#
    }
}