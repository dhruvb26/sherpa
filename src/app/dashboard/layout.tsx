import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {/* <AppSidebar /> */}
        <div className="w-full">{children}</div>
      </SidebarProvider>
    </div>
  );
}
