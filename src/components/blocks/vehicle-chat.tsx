"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Loader2, Sparkles } from "lucide-react";
import CarMetricsCard from "@/components/blocks/car-metrics-card";

interface Message {
  vehicle: {
    id: string;
    role: string;
  };
  message: string | { message: string } | Record<string, unknown>;
}

interface VehicleMetrics {
  idealSpeed: number;
  fuelConsumption: number;
  co2EmissionSaved: number;
  timeSaved: number;
  ecoScore: number;
}

interface CalculationResponse {
  idealSpeed: number;
  fuelConsumption: number;
  co2EmissionSaved: number;
  timeSaved: number;
  ecoScore: number;
}

const carImages = ["/cars/275.png", "/cars/620.png", "/cars/1290.png"];

export default function VehicleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = useState<VehicleMetrics[]>([]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: messages,
        }),
      });
      const data: any = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      // These hardcoded values will be used instead of the API data
      const hardcodedValues = [
        { idealSpeed: 48.0, fuelConsumption: 6.2, co2EmissionSaved: 150, timeSaved: 9.5, ecoScore: 85 },
        { idealSpeed: 52.0, fuelConsumption: 6.8, co2EmissionSaved: 200, timeSaved: 11.0, ecoScore: 90 },
        { idealSpeed: 50.5, fuelConsumption: 6.3, co2EmissionSaved: 170, timeSaved: 10.2, ecoScore: 88 },
        { idealSpeed: 49.0, fuelConsumption: 6.6, co2EmissionSaved: 180, timeSaved: 10.8, ecoScore: 87 },
      ];

      // Use hardcoded values instead of API data to simulate results
      setMetrics(hardcodedValues);
      setShowMetrics(true);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {showMetrics ? (
        <>
          <div className="absolute bottom-[40rem] right-4 z-10">
            <Button
              variant="default"
              size="default"
              onClick={() => setShowMetrics(false)}
            >
              Back to Chat
            </Button>
          </div>

          <ScrollArea className="h-[40rem] p-4">
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <CarMetricsCard
                  key={index}
                  idealSpeed={metric.idealSpeed}
                  fuelConsumption={metric.fuelConsumption}
                  co2EmissionSaved={metric.co2EmissionSaved}
                  timeSaved={metric.timeSaved}
                  ecoScore={metric.ecoScore}
                  imageSrc={carImages[index % carImages.length]}
                />
              ))}
            </div>
          </ScrollArea>
        </>
      ) : (
        <>
          {messages.length > 0 && (
            <div className="absolute bottom-[26rem] right-4 z-10">
              <Button variant="default" size="default" onClick={fetchMetrics}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 inline" /> Insights
                  </>
                )}
              </Button>
            </div>
          )}

          <div className="absolute bottom-4 right-4 w-[500px] bg-black/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
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
        </>
      )}
    </>
  );
}
