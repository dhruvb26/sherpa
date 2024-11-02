"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

const libraryItems: { title: string; href: string; description: string }[] = [
  {
    title: "Upload Paper",
    href: "/library/upload",
    description: "Upload a new research paper to your library.",
  },
  {
    title: "My Papers",
    href: "/library/papers",
    description: "View and manage your collection of research papers.",
  },
  {
    title: "Analyze Paper",
    href: "/library/analyze",
    description: "Start analyzing a paper and create a mind map.",
  },
  {
    title: "Search Papers",
    href: "/library/search",
    description: "Search through your paper library or find new papers.",
  },
];

const exploreItems: { title: string; href: string; description: string }[] = [
  {
    title: "Trending Topics",
    href: "/explore/trending",
    description: "Discover hot topics and papers in various fields.",
  },
  {
    title: "Recommended Papers",
    href: "/explore/recommended",
    description: "Papers suggested based on your interests and history.",
  },
  {
    title: "Public Mind Maps",
    href: "/explore/public-maps",
    description: "Explore mind maps shared by the community.",
  },
  {
    title: "Collaborations",
    href: "/explore/collaborations",
    description: "Find and join collaborative research projects.",
  },
];

export function Navbar() {
  return (
    <div className="flex justify-between items-center py-8 px-12 space-x-4 ">
      <div className="flex items-center space-x-4">
        {/* <Separator orientation="vertical" className="h-10" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Library</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {libraryItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {exploreItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
