// Renders a white sidebar with logo + search and a simple top header across the workspace.

"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarInput,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { LayoutDashboard, BookOpen, Brain, Briefcase, Users, User, Settings, HelpCircle } from "lucide-react"

function usePageTitle() {
  const pathname = usePathname()
  const first = `/${pathname.split("/").filter(Boolean)[0] || ""}`
  switch (first) {
    case "/dashboard":
      return "Dashboard"
    case "/problem-solving":
      return "Problem Solving"
    case "/career-tools":
      return "Career Tools"
    case "/community":
      return "Community"
    case "/profile":
      return "Profile"
    default:
      return "Dashboard"
  }
}

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const title = usePageTitle()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <SidebarProvider>
      {/* Sidebar: white bg, logo, search, nav with icons, settings/help footer */}
      <Sidebar className="[&_[data-sidebar=sidebar]]:bg-white [&_[data-sidebar=sidebar]]:text-gray-900 [&_[data-sidebar=sidebar]]:border-r [&_[data-sidebar=sidebar]]:border-black/5">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <Image
              src="/images/dark-logo.png"
              alt="Devora logo"
              width={120}
              height={24}
              className="h-6 w-auto"
              priority
            />
          </div>
          <div className="px-2">
            <SidebarInput placeholder="Search..." />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/courses")}>
                <Link href="/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Courses
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/problem-solving")}>
                <Link href="/problem-solving">
                  <Brain className="mr-2 h-4 w-4" />
                  Problem Solving
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/career-tools")}>
                <Link href="/career-tools">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Career Tools
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/community")}>
                <Link href="/community">
                  <Users className="mr-2 h-4 w-4" />
                  Community
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/profile")}>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Shared header + content container; inherits global bg (#F5F6FB) */}
      <SidebarInset className="bg-[#F5F6FB]">
        <header className="mx-auto w-full max-w-6xl px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-lg font-semibold text-gray-900">{title}</span>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 ring-1 ring-black/10">
                <AvatarFallback className="bg-black/5 text-gray-900">AS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-6xl px-4 pb-8 md:pb-12">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
