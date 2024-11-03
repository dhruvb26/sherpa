"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Leaf, Timer, Trophy, Fuel } from "lucide-react";
import Image from "next/image";
import BoxReveal from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";

export default function CarMetricsCard() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="p-4">
        <Image
          src="/cars/275.png"
          alt="Car"
          width={200}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent className="p-6 pt-2">
        <div className="size-full max-w-lg items-center justify-center overflow-hidden">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-xl font-semibold">
              Insights by <span className="text-primary">Sherpa.</span>
            </p>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="mt-[.5rem] text-[1rem]">
              Ideal speed for this car should be{" "}
              <span className="text-primary font-medium ">65 mph.</span>
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="mt-6 space-y-2">
              <p>
                <Fuel className="w-4 h-4 mr-2 inline" />
                Save on your fuel consumption by{" "}
                <span className="font-medium text-primary"> 10%</span>
              </p>
              <p>
                <Leaf className="w-4 h-4 mr-2 inline" />
                Your car's CO2 emissions could go down by{" "}
                <span className="font-medium text-primary"> 15%</span>
              </p>
              <p>
                <Timer className="w-4 h-4 mr-2 inline" />
                But most importantly here's how much time you saved -{" "}
                <span className="font-medium text-primary"> 1 hour</span>
              </p>
            </div>
          </BoxReveal>
          <div className="flex flex-row items-center  justify-between">
            <Button variant={"outline"} className="mt-4">
              New Eco-Score: 78
            </Button>
            <BoxReveal duration={0.5}>
              <Button className="mt-4">
                <Trophy className="w-4 h-4 mr-1 inline" />
                Leaderboard
              </Button>
            </BoxReveal>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
