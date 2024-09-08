'use client'

import { useState } from 'react'
import { Bell, Camera, ChevronDown, Globe, HelpCircle, Key, LogOut, Mail, Phone, User } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    language: 'English',
    notifications: {
      email: true,
      sms: false,
    },
  })

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleLanguageChange = (value: string) => {
    setUser({ ...user, language: value })
  }

  const handleNotificationChange = (type: 'email' | 'sms') => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [type]: !user.notifications[type],
      },
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      {/* User Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          <Button onClick={handleEditToggle}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Profile picture"
              layout="fill"
              objectFit="cover"
            />
            <button className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full text-white">
              <Camera size={20} />
            </button>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Language Preference */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Language Preference</h2>
        <div className="flex items-center space-x-4">
          <Globe className="text-gray-500" />
          <Select value={user.language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Settings and Preferences */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Settings and Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="text-gray-500" />
              <span>Email Notifications</span>
            </div>
            <Switch
              checked={user.notifications.email}
              onCheckedChange={() => handleNotificationChange('email')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="text-gray-500" />
              <span>SMS Alerts</span>
            </div>
            <Switch
              checked={user.notifications.sms}
              onCheckedChange={() => handleNotificationChange('sms')}
            />
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Account Management</h2>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Key className="mr-2 h-4 w-4" /> Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" /> Link Social Media Accounts
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" /> Delete Account
          </Button>
        </div>
      </div>

      {/* Activity and History */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Activity and History</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Recent Disease Detections</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li>Tomato Leaf Mold - Detected on 2023-06-15</li>
                <li>Potato Late Blight - Detected on 2023-06-10</li>
                <li>Corn Northern Leaf Blight - Detected on 2023-06-05</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Dashboard Interactions</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li>Updated crop rotation plan - 2023-06-14</li>
                <li>Reviewed monthly disease report - 2023-06-01</li>
                <li>Added new field to monitoring list - 2023-05-28</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button variant="outline" className="mt-4">
          Download Activity Report
        </Button>
      </div>

      {/* Support and Feedback */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Support and Feedback</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="feedback">Provide Feedback</Label>
            <Textarea id="feedback" placeholder="Share your thoughts or report an issue..." />
          </div>
          <Button>Submit Feedback</Button>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I update my notification settings?</AccordionTrigger>
              <AccordionContent>
                You can update your notification settings in the "Settings and Preferences" section above. Toggle the switches for email notifications and SMS alerts to your desired preferences.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I delete my account?</AccordionTrigger>
              <AccordionContent>
                Yes, you can delete your account by clicking the "Delete Account" button in the Account Management section. Please note that this action is irreversible and will permanently remove all your data from our system.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}