"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ShinyText } from "@/components/text/shiny";

export const HeroSection = () => {
  return (
    <section className="w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20">
        <div className="text-center space-y-4">
          <ShinyText />

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>Transform your research with Sherpa</h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-lg text-muted-foreground">
            Unlock the power of visual thinking. Analyze papers, create mind
            maps, and connect ideas effortlessly.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button>Get Started</Button>

            <Button asChild variant="outline">
              <Link
                href="https://github.com/nobruf/shadcn-landing-page.git"
                target="_blank"
              >
                Github
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-12">
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center "
            src="/hero.jpeg"
            alt="dashboard"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
