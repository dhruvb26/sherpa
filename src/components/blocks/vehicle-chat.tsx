"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Loader2 } from "lucide-react";
import CarMetricsCard from "@/components/blocks/car-metrics-card";

type Message = {
  vehicle: {
    id: string;
    role: string;
  };
  message: string | { message: string } | Record<string, unknown>;
};

export default function VehicleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    setMessages([]); // Reset messages when starting new fetch
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: messages,
        }),
      });
      const data: any = await response.json();

      // Clean up the JSON string by removing markdown code blocks if present
      const cleanData =
        typeof data === "string"
          ? JSON.parse(data.replace(/^```json\n?/, "").replace(/```$/, ""))
          : data;

      setLoading(false);

      // Parse all messages at once
      const parsedMessages = Object.entries(cleanData).map(
        ([vehicle, message]) => ({
          vehicle: { id: vehicle, role: "" },
          message: message as string,
        })
      );

      // Add all messages to state
      setMessages(parsedMessages);
      //   setShowMetrics(true);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showMetrics ? (
        <CarMetricsCard />
      ) : (
        <div className="absolute bottom-4 right-4 w-[500px] bg-black/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden ">
          <ScrollArea className="h-96 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-white mb-4 text-sm">
                  <Brain className="w-4 h-4 mr-1 inline" /> Get the network
                  thinking
                </p>
                <Button onClick={fetchMessages} disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Run Sherpa"
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((msg, index) => {
                    const messageText =
                      typeof msg.message === "object"
                        ? msg.message.message || JSON.stringify(msg.message)
                        : msg.message;
                    return (
                      <div key={index} className="space-y-2">
                        <p className="text-xs text-white font-light font-mono uppercase">
                          {msg.vehicle.id}
                        </p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`p-3 w-fit rounded-lg bg-white text-black text-xs`}
                        >
                          <p className="whitespace-pre-wrap">
                            {String(messageText)}
                          </p>
                        </motion.div>
                      </div>
                    );
                  })}
                  {loading && messages.length > 0 && (
                    <div className="flex justify-center">
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </>
  );
}
