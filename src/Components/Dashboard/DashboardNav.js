"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Share2, CreditCard, Settings, HelpCircle } from 'lucide-react'


import { Button } from "../ui/button"
import { cn } from "@/app/lib/utils"


export function DashboardNav() {
  const pathname = usePathname()

  const items = [
    {
      title: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Share & Invite",
      href: "/dashboard/share",
      icon: Share2,
    },
    {
      title: "Plans",
      href: "/dashboard/plans",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Help",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
  ]

  return (
    <nav className="grid items-start gap-2 p-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
          >
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                pathname === item.href && "bg-muted font-medium"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

