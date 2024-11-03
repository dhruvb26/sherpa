"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShinyText } from "@/components/text/shiny";
import ShineBorder from "../ui/shine-border";
import { ArrowDown } from "lucide-react";
import GridPattern from "../ui/grid-pattern";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const scrollToNextSection = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth",
    });
  };
  return (
    <section className="w-full ">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-12">
        <div className="text-center space-y-4">
          <ShinyText />

          <div className="max-w-screen-lg mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>Your City's Answer to Minimizing Traffic Congestion</h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-lg text-muted-foreground">
            Our platform redefines urban mobility by bridging the gap between
            autonomous vehicles and human-driven cars with real-time,
            data-driven insights.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-center justify-center z-10">
            <Button className="z-10">Get Started</Button>

            <Button className="z-10" asChild variant="outline">
              <Link
                href="https://github.com/nobruf/shadcn-landing-page.git"
                target="_blank"
              >
                <Image src="/github.svg" alt="Github" width={20} height={20} />
                Github
              </Link>
            </Button>
          </div>
          <Button
            variant={"link"}
            className="font-mono"
            onClick={scrollToNextSection}
          >
            Learn More <ArrowDown className="w-4 h-4" />
          </Button>
        </div>

        <ShineBorder
          className="relative flex h-fit w-fit flex-col items-center justify-center overflow-hidden rounded-[8px] bg-background md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <Image
            width={1500}
            height={1200}
            className="w-full rounded-md relative leading-none flex items-center z-10"
            src="/hero.jpg"
            alt="dashboard"
          />
        </ShineBorder>
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
    </section>
  );
};
