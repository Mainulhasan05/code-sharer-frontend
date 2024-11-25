"use client"

import Link from "next/link"
import { Menu } from 'lucide-react'


import { Button } from "../ui/button"
import { DashboardNav } from "./DashboardNav"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-14 items-center">
        
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <span className="font-bold">Codesharer</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/pricing">
                Pricing
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Sign Up
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

