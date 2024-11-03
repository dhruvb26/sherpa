'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button"
import { Car, Gamepad2, Github, MessageSquare, Zap, Leaf } from "lucide-react"
import CarData from "../../public/Car.json";
import bgData from "../../public/bg.json";
import arcData from "../../public/animationArc.json";
import Link from "next/link"
import dynamic from 'next/dynamic';

export default function Component() {
  const [scrollPromptVisible, setScrollPromptVisible] = useState(true)
  const [score, setScore] = useState(0)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [calculationStatus, setCalculationStatus] = useState('idle')

  useEffect(() => {
    const performCalculations = async () => {
      try {
        const response = await fetch('/api/calculations', { method: 'GET' })
        if (!response.ok) {
          throw new Error('Failed to perform calculations')
        }
        const data = await response.json()
        console.log("Success")
      } catch (error) {
        console.error('Error:', error)
      }
    }
    performCalculations()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollPromptVisible(false)
      } else {
        setScrollPromptVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => prevScore + 10)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        body {
          font-family: 'Press Start 2P', cursive;
          background: #1a1a2e;
        }
        .pixel-corners {
          clip-path: polygon(
            0 4px, 4px 4px, 4px 0,
            calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
            100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px),
            calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px),
            0 calc(100% - 4px)
          );
        }
        .glow-text {
          text-shadow: 0 0 5px #4f46e5, 0 0 10px #4f46e5, 0 0 15px #4f46e5;
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle var(--duration) infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.1; }
        }
        .scroll-prompt {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        .neon-border {
          box-shadow: 0 0 3px #4f46e5, 0 0 6px #4f46e5;
        }
        .game-button {
          transition: all 0.1s ease;
        }
        .game-button:active {
          transform: scale(0.95);
          box-shadow: 0 0 2px #4f46e5, 0 0 4px #4f46e5;
        }
        .pixel-text {
          font-size: 16px;
          line-height: 1.5;
          letter-spacing: 1px;
        }
      `}</style>

      {/* Star Background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="star"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: Math.random() * 3 + 1, repeat: Infinity, repeatType: 'reverse', delay: Math.random() * 3 }}
          style={{
            width: Math.random() * 2 + 'px',
            height: Math.random() * 2 + 'px',
            left: Math.random() * 100 + 'vw',
            top: Math.random() * 100 + 'vh',
          }}
        />
      ))}

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[#16213e]/80"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Car className="w-8 h-8 text-[#e94560]" />
          <span className="text-xl text-[#e94560]">SHERPA</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="#about" className="text-sm hover:text-[#e94560] transition-colors">About</Link>
          <Link href="#features" className="text-sm hover:text-[#e94560] transition-colors">Features</Link>
          <Link href="#contact" className="text-sm hover:text-[#e94560] transition-colors">Contact</Link>
          <Button className="bg-[#e94560] hover:bg-[#c13050] text-white pixel-corners game-button">
            PLAY NOW
          </Button>
        </div>
        <div className="absolute top-full left-0 w-full bg-[#16213e]/80 text-center py-2">
          <span className="text-[#e94560]">SCORE: {score.toString().padStart(6, '0')}</span>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        <div className="inset z-0">
          <Lottie animationData={CarData} className="w-screen opacity-[0.80] inset z-0"/>
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
              <Button className="bg-[#e94560] hover:bg-[#c13050] text-white pixel-corners game-button text-lg py-4 px-6">
                START GAME
              </Button>
              <Button variant="outline" className="border-[#e94560] text-[#e94560] hover:bg-[#e94560]/10 pixel-corners game-button text-lg py-4 px-6">
                HIGH SCORES
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
        <Lottie animationData={bgData} className="w-full" style={{ position: "relative", top: "-700px" }} />
        <div className="max-w-6xl mx-auto px-4" style={{position: "relative", top: "-1900px"}}>
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
                color: "from-[#e94560]/20 to-[#e94560]/40"
              },
              {
                title: "SMART TRAFFIC",
                description: "Unlock smooth traffic flow across your urban grid",
                icon: <Car className="w-10 h-10 text-[#0f3460]" />,
                color: "from-[#0f3460]/20 to-[#0f3460]/40"
              },
              {
                title: "ECO POWER",
                description: "Level up your city's green score",
                icon: <Leaf className="w-10 h-10 text-[#4f46e5]" />,
                color: "from-[#4f46e5]/20 to-[#4f46e5]/40"
              }
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
                  <div className="absolute bottom-4 left-4">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#e94560]">{feature.title}</h3>
                <p className="text-sm text-[white] group-hover:text-[#e94560] transition-colors pixel-text">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
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
  )
}