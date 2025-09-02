"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Camera,
  Edit3,
  Trash2,
  Download,
  Upload
} from "lucide-react"

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  })

  const [profileData, setProfileData] = useState({
    firstName: "Shanmuga",
    lastName: "Priya",
    email: "shanmugapriyakit@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://shanmuga.dev",
    bio: "Full-stack developer passionate about creating innovative web applications. Specialized in React, Node.js, and modern web technologies.",
    company: "Tech Solutions Inc.",
    role: "Senior Developer",
    timezone: "America/Los_Angeles",
    language: "English"
  })

  const [avatar, setAvatar] = useState("/placeholder-user.jpg")

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Profile saved:", profileData)
    console.log("Notifications:", notifications)
    setIsEditMode(false)
  }

  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    // Reset to original data if needed
  }

  const handleChangePassword = () => {
    setShowPasswordModal(true)
  }

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false)
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Profile Settings</h1>
            <p className="text-slate-600 mt-1">Manage your account and preferences</p>
          </div>
          <div className="flex space-x-3">
            {!isEditMode ? (
              <Button 
                onClick={handleEdit}
                className="bg-white border-2 border-purple-600 text-purple-700 hover:bg-purple-50 rounded-xl px-6 shadow-sm"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Changes
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl px-6"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-green-600 border-2 border-green-400 text-white hover:bg-green-700 rounded-xl px-6 shadow-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            <TabsTrigger value="profile" className="rounded-xl text-slate-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-500">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl text-slate-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-500">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl text-slate-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-500">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-xl text-slate-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-500">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold text-slate-800">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-purple-200 shadow-lg">
                      <AvatarImage src={avatar} alt="Profile" />
                      <AvatarFallback className="bg-purple-600 text-white text-2xl">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-8 h-8 p-0 shadow-md"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Button variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                      disabled={!isEditMode}
                      className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                      disabled={!isEditMode}
                      className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-800 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-purple-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        disabled={!isEditMode}
                        className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        disabled={!isEditMode}
                        className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Location and Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-700 font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleProfileUpdate('location', e.target.value)}
                      disabled={!isEditMode}
                      className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-slate-700 font-medium flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-purple-600" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleProfileUpdate('website', e.target.value)}
                      disabled={!isEditMode}
                      className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-slate-700 font-medium">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                    rows={4}
                    disabled={!isEditMode}
                    className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-800">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-slate-700 font-medium">Timezone</Label>
                      <Select value={profileData.timezone} onValueChange={(value) => handleProfileUpdate('timezone', value)} disabled={!isEditMode}>
                        <SelectTrigger className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-slate-700 font-medium">Language</Label>
                      <Select value={profileData.language} onValueChange={(value) => handleProfileUpdate('language', value)} disabled={!isEditMode}>
                        <SelectTrigger className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed">
                          <SelectValue />
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-purple-600" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-medium text-slate-800">Email Notifications</h4>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <div className="relative w-28 flex justify-end">
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-white border-2 border-purple-400 data-[state=checked]:border-purple-600 data-[state=unchecked]:border-purple-400 [&>span]:border-2 [&>span]:border-purple-400 [&>span]:bg-white"
                      />
                      {notifications.email && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold text-white">
                          ON
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-medium text-slate-800">Push Notifications</h4>
                      <p className="text-sm text-slate-600">Receive push notifications in browser</p>
                    </div>
                    <div className="relative w-28 flex justify-end">
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-white border-2 border-purple-400 data-[state=checked]:border-purple-600 data-[state=unchecked]:border-purple-400 [&>span]:border-2 [&>span]:border-purple-400 [&>span]:bg-white"
                      />
                      {notifications.push && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold text-white">
                          ON
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-medium text-slate-800">SMS Notifications</h4>
                      <p className="text-sm text-slate-600">Receive notifications via SMS</p>
                    </div>
                    <div className="relative w-28 flex justify-end">
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-white border-2 border-purple-400 data-[state=checked]:border-purple-600 data-[state=unchecked]:border-purple-400 [&>span]:border-2 [&>span]:border-purple-400 [&>span]:bg-white"
                      />
                      {notifications.sms && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold text-white">
                          ON
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-medium text-slate-800">Marketing Communications</h4>
                      <p className="text-sm text-slate-600">Receive marketing and promotional emails</p>
                    </div>
                    <div className="relative w-28 flex justify-end">
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-white border-2 border-purple-400 data-[state=checked]:border-purple-600 data-[state=unchecked]:border-purple-400 [&>span]:border-2 [&>span]:border-purple-400 [&>span]:bg-white"
                      />
                      {notifications.marketing && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold text-white">
                          ON
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-800">Notification Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-medium text-slate-800 mb-2">Course Updates</h4>
                      <p className="text-sm text-slate-600 mb-3">Get notified about new courses and updates</p>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">Active</Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-medium text-slate-800 mb-2">Community</h4>
                      <p className="text-sm text-slate-600 mb-3">Notifications from community discussions</p>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">Active</Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-medium text-slate-800 mb-2">Achievements</h4>
                      <p className="text-sm text-slate-600 mb-3">Celebrate your learning milestones</p>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">Active</Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-medium text-slate-800 mb-2">System Updates</h4>
                      <p className="text-sm text-slate-600 mb-3">Important platform updates and maintenance</p>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-600" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-2">Change Password</h4>
                    <p className="text-sm text-slate-600 mb-4">Update your password to keep your account secure</p>
                    <Button 
                      onClick={handleChangePassword}
                      variant="outline" 
                      className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-600 mb-4">Add an extra layer of security to your account</p>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-28 flex justify-end">
                        <Switch className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-white border-2 border-purple-400 data-[state=checked]:border-purple-600 data-[state=unchecked]:border-purple-400 [&>span]:border-2 [&>span]:border-purple-400 [&>span]:bg-white" />

                      </div>
                      <span className="text-sm text-slate-600">Enable 2FA</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-2">Active Sessions</h4>
                    <p className="text-sm text-slate-600 mb-4">Manage your active login sessions</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                        <div>
                          <p className="font-medium text-slate-800">Current Session</p>
                          <p className="text-sm text-slate-600">Windows • Chrome • San Francisco, CA</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                        <div>
                          <p className="font-medium text-slate-800">Mobile Session</p>
                          <p className="text-sm text-slate-600">iPhone • Safari • San Francisco, CA</p>
                        </div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-purple-600" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-2">Theme</h4>
                    <p className="text-sm text-slate-600 mb-4">Choose your preferred theme</p>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl">
                        Dark
                      </Button>
                      <Button variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl">
                        Light
                      </Button>
                      <Button variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl">
                        Auto
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-2">Font Size</h4>
                    <p className="text-sm text-slate-600 mb-4">Adjust the text size</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-slate-600">Small</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full w-2/3"></div>
                      </div>
                      <span className="text-sm text-slate-600">Large</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 bg-white rounded-2xl border border-slate-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
              <CardTitle className="text-xl font-semibold text-center text-slate-800">Change Password</CardTitle>
              <p className="text-slate-600 text-center">Update your password to keep your account secure</p>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-slate-700 font-medium">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-slate-700 font-medium">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="rounded-xl border-slate-300 focus:border-purple-400 focus:ring-purple-200"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleClosePasswordModal}
                  variant="outline"
                  className="flex-1 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl"
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-white border-2 border-purple-600 text-purple-700 hover:bg-purple-50 rounded-xl"
                >
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}