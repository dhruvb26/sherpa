import type { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { b } from "@/baml_client";

export async function POST(request: NextRequest) {
  const exampleConversation = [
    {
      vehicle: "CAV_01",
      message:
        "Good day, fellow vehicles! This is Vehicle 01. In order to form an efficient queue that allows us all to pass quickly and safely, I propose the following initial order according to our current positions: Vehicle 1, Vehicle 2, Vehicle 3, Vehicle 4 ...... Each vehicle should maintain a safe following distance from the vehicle in front. Please confirm your agreement or suggest adjustments. Let's ensure we avoid collisions and maintain optimal speed!",
      role: "not assigned",
    },
    {
      vehicle: "CAV_02",
      message:
        "Hello everyone, this is Vehicle 02. I agree with Vehicle 01's proposed order since it reflects our current positions accurately. If no one has any objections, I suggest we move forward with this plan and start adjusting our speeds to maintain safe distances. Waiting for confirmation from the rest. Thank you!",
      role: "follower",
    },
    {
      vehicle: "CAV_01",
      message:
        "Thank you all for your cooperation. Since everyone has confirmed their positions and roles, I will lead the queue, setting a consistent speed to maintain safe distances. Here's the final order and role assignment: 1. Vehicle 1 (Leader) 2. Vehicle 2 (Leading Follower) 3. Vehicle 3 (Follower).... Let's proceed safely and ensure we avoid collisions while maintaining optimal speed. Drive safely, everyone!",
      role: "leader",
    },
  ];

  const vehicleData = readFileSync(
    join(process.cwd(), "src/utils/vehicles_austin_data.md"),
    "utf-8"
  );

  const stream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are simulating a conversation between connected autonomous vehicles (CAVs) that are coordinating to optimize traffic flow.

                    The vehicles need to:
                    1. Analyze their current positions, speeds and vehicle characteristics
                    2. Assign roles (leader, follower, wingman) based on their capabilities
                    3. Develop a coordinated plan to maximize average velocity and minimize stops
                    4. Consider safety distances and collision avoidance
                    5. Communicate formally and professionally using vehicle IDs (e.g. CAV_01)

                    Map: 2000m x 2000m area
                    Vehicle Data: ${JSON.stringify(vehicleData)}

                    Example conversation format:
                    ${JSON.stringify(exampleConversation, null, 2)}

                    When discussing the plan:
                    - Reference specific vehicle data (speed, position, etc.)
                    - Show logical decision making process
                    - Allow back-and-forth discussion between vehicles
                    - Focus on practical coordination to optimize traffic flow
                    - Consider factors like safe following distances
                    - Aim to minimize red lights and maintain optimal speeds

                    Return object should be an array of at least 10 Message {
                                                                  vehicle: {
                                                                    id: string;
                                                                    role: string;
                                                                  };
                                                                  message: string | { message: string } | Record<string, unknown>;
                                                                };  
                    objects
                    `,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      stream: false,
    }),
  });

  if (!stream.ok) {
    throw new Error(`OpenAI API error: ${stream.statusText}`);
  }

  const response: any = await stream.json();

  const data = response.choices[0].message.content;

  const finalRespose = await b.ExtractConversation(data);

  return new Response(JSON.stringify(finalRespose), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
