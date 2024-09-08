'use client'

import Link from 'next/link'
import { Bell, Home, Image, BarChart2, BookOpen, Users, User, Settings, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-600">CropCare AI</h1>
        </div>
        <ul className="space-y-2 py-4 flex-grow">
          <NavItem href="/" icon={<Home className="w-5 h-5" />} text="Home" />
          <NavItem href="/detect" icon={<Image className="w-5 h-5" />} text="Disease Detection" />
          <NavItem href="/dashboard" icon={<BarChart2 className="w-5 h-5" />} text="Dashboard" />
          <NavItem href="/resources" icon={<BookOpen className="w-5 h-5" />} text="Resources" />
          <NavItem href="/community" icon={<Users className="w-5 h-5" />} text="Community" />
        </ul>
        <div className="p-4 border-t">
          <UserProfile />
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}

function NavItem({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <li>
      <Link href={href} className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  )
}

function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span>John Doe</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <Link href='/user'><span>Profile</span></Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}