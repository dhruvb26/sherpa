"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Car, Github, MessageSquare, Zap, Leaf } from "lucide-react";
import CarData from "../../public/Car.json";
import bgData from "../../public/bg.json";
import Link from "next/link";

export default function Component() {
  const [score, setScore] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const performCalculations = async () => {
      try {
        const response = await fetch("/api/calculations", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to perform calculations");
        }
        const data = await response.json();
        console.log("Success", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    performCalculations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore + 10);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white overflow-hidden">
      {/* Star Background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="star"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: Math.random() * 3 + 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 3,
          }}
          style={{
            width: Math.random() * 2 + "px",
            height: Math.random() * 2 + "px",
            left: Math.random() * 100 + "vw",
            top: Math.random() * 100 + "vh",
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        <div className="inset z-0">
          <Lottie animationData={CarData} className="w-screen opacity-[0.80] inset z-0" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl relative z-10"
        >
          <div style={{ position: "relative", top: "-1150px" }}>
            <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold glow-text tracking-tight text-[#e94560]">
              SHERPA 2024
            </h1>
            <p className="text-lg md:text-xl text-[white] mt-4 pixel-text">
              LEVEL UP YOUR CITY WITH AUTOMATED DRIVERS
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              <Link href="/dashboard/map">
                <Button className="bg-[#e94560] hover:bg-[#c13050] text-white pixel-corners game-button text-lg py-4 px-6">
                  START GAME
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-[#e94560] text-[#e94560] hover:bg-[#e94560] hover:text-white pixel-corners game-button text-lg py-4 px-6"
              >
                LEADERBOARD
              </Button>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <Link href="#" className="text-[#0f3460] hover:text-[#e94560] transition-colors">
                <Github className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-[#0f3460] hover:text-[#e94560] transition-colors">
                <MessageSquare className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div className="absolute inset-0 z-0 opacity-30" style={{ y: y1 }}>
          <div className="w-full h-full bg-gradient-to-b from-[#e94560]/10 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="min-h-screen py-20 relative">
        <Lottie
          animationData={bgData}
          className="w-full"
          style={{ position: "relative", top: "-700px" }}
        />
        <div className="max-w-6xl mx-auto px-4" style={{ position: "relative", top: "-1000px" }}>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 glow-text text-[#e94560]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            POWER-UPS
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "REAL-TIME AUTOMATION",
                description: "Boost your city's IQ with cutting-edge AUTOMATION",
                icon: <Zap className="w-10 h-10 text-[#e94560]" />,
                color: "from-[#e94560]/20 to-[#e94560]/40",
              },
              {
                title: "SMART TRAFFIC",
                description: "Unlock smooth traffic flow across your urban grid",
                icon: <Car className="w-10 h-10 text-[#0f3460]" />,
                color: "from-[#0f3460]/20 to-[#0f3460]/40",
              },
              {
                title: "ECO POWER",
                description: "Level up your city's green score",
                icon: <Leaf className="w-10 h-10 text-[#4f46e5]" />,
                color: "from-[#4f46e5]/20 to-[#4f46e5]/40",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#16213e] p-6 rounded-lg pixel-corners neon-border overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-40 mb-4 overflow-hidden rounded-t-lg">
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color}`} />
                  <div className="absolute bottom-4 left-4">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#e94560]">{feature.title}</h3>
                <p className="text-sm text-[white] group-hover:text-[#e94560] transition-colors pixel-text">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl px-4 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold glow-text text-[#e94560]">
            READY TO PLAY?
          </h2>
          <p className="text-xl text-[#0f3460] pixel-text">
            Join the urban revolution and level up your city!
          </p>
          <Button className="bg-[#e94560] hover:bg-[#c13050] text-white pixel-corners game-button text-xl py-6 px-10">
            INSERT COIN
          </Button>
        </motion.div>
        <motion.div className="absolute inset-0 z-0 opacity-20" style={{ y: y2 }}>
          <div className="w-full h-full bg-gradient-to-t from-[#4f46e5]/10 to-transparent" />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0f3460] py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-[#0f3460]">© 2024 Sherpa. All rights reserved.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-[#0f3460] hover:text-[#e94560] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-[#0f3460] hover:text-[#e94560] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}