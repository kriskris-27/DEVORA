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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            <p className="text-purple-200 mt-1">Manage your account and preferences</p>
          </div>
          <div className="flex space-x-3">
            {!isEditMode ? (
              <Button 
                onClick={handleEdit}
                className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-6"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Changes
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full px-6"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-black text-white hover:bg-black/90 rounded-full px-6"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200 rounded-full"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200 rounded-full"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200 rounded-full"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="appearance" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200 rounded-full"
            >
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-white/20">
                      <AvatarImage src={avatar} alt="Profile" />
                      <AvatarFallback className="bg-purple-600 text-white text-2xl">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 bg-black text-white hover:bg-black/90 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                      disabled={!isEditMode}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                      disabled={!isEditMode}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        disabled={!isEditMode}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        disabled={!isEditMode}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Location and Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleProfileUpdate('location', e.target.value)}
                      disabled={!isEditMode}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-white flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleProfileUpdate('website', e.target.value)}
                      disabled={!isEditMode}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                    rows={4}
                    disabled={!isEditMode}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-2xl resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                

                {/* Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-white">Timezone</Label>
                      <Select value={profileData.timezone} onValueChange={(value) => handleProfileUpdate('timezone', value)} disabled={!isEditMode}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-white/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-900 border-purple-700 text-white">
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-white">Language</Label>
                      <Select value={profileData.language} onValueChange={(value) => handleProfileUpdate('language', value)} disabled={!isEditMode}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-white/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-900 border-purple-700 text-white">
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
            <Card className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <div>
                      <h4 className="font-medium text-white">Email Notifications</h4>
                      <p className="text-sm text-purple-200">Receive notifications via email</p>
                    </div>
                    <div className="relative w-28 flex justify-end">
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
                      />
                      <span className={`absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold ${notifications.email ? 'text-white' : 'text-gray-700'}`}>
                        {notifications.email ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <div>
                      <h4 className="font-medium text-white">Push Notifications</h4>
                      <p className="text-sm text-purple-200">Receive push notifications in browser</p>
                    </div>
                    <div className="relative w-28 flex justify-end">
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
                      />
                      <span className={`absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold ${notifications.push ? 'text-white' : 'text-gray-700'}`}>
                        {notifications.push ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <div>
                      <h4 className="font-medium text-white">SMS Notifications</h4>
                      <p className="text-sm text-purple-200">Receive notifications via SMS</p>
                    </div>
                    <div className="relative w-28 flex justify-end">
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
                      />
                      <span className={`absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold ${notifications.sms ? 'text-white' : 'text-gray-700'}`}>
                        {notifications.sms ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <div>
                      <h4 className="font-medium text-white">Marketing Communications</h4>
                      <p className="text-sm text-purple-200">Receive marketing and promotional emails</p>
                    </div>
                    <div className="relative w-28 flex justify-end">
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
                      />
                      <span className={`absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold ${notifications.marketing ? 'text-white' : 'text-gray-700'}`}>
                        {notifications.marketing ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Notification Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <h4 className="font-medium text-white mb-2">Course Updates</h4>
                      <p className="text-sm text-purple-200 mb-3">Get notified about new courses and updates</p>
                      <Badge variant="secondary" className="bg-purple-600 text-white">Active</Badge>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <h4 className="font-medium text-white mb-2">Community</h4>
                      <p className="text-sm text-purple-200 mb-3">Notifications from community discussions</p>
                      <Badge variant="secondary" className="bg-purple-600 text-white">Active</Badge>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <h4 className="font-medium text-white mb-2">Achievements</h4>
                      <p className="text-sm text-purple-200 mb-3">Celebrate your learning milestones</p>
                      <Badge variant="secondary" className="bg-purple-600 text-white">Active</Badge>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <h4 className="font-medium text-white mb-2">System Updates</h4>
                      <p className="text-sm text-purple-200 mb-3">Important platform updates and maintenance</p>
                      <Badge variant="secondary" className="bg-purple-600 text-white">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <h4 className="font-medium text-white mb-2">Change Password</h4>
                    <p className="text-sm text-purple-200 mb-4">Update your password to keep your account secure</p>
                                         <Button 
                       onClick={handleChangePassword}
                       variant="outline" 
                       className="bg-purple-600 border-purple-500 text-white hover:bg-purple-700 rounded-full px-6"
                     >
                       <Edit3 className="w-4 h-4 mr-2" />
                       Change Password
                     </Button>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl">
                    <h4 className="font-medium text-white mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-purple-200 mb-4">Add an extra layer of security to your account</p>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-28 flex justify-end">
                        <Switch className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300" />
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-xs font-semibold text-gray-700">OFF</span>
                      </div>
                      <span className="text-sm text-purple-200">Enable 2FA</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl">
                    <h4 className="font-medium text-white mb-2">Active Sessions</h4>
                    <p className="text-sm text-purple-200 mb-4">Manage your active login sessions</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div>
                          <p className="text-white font-medium">Current Session</p>
                          <p className="text-sm text-purple-200">Windows • Chrome • San Francisco, CA</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-600 text-white">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div>
                          <p className="text-white font-medium">Mobile Session</p>
                          <p className="text-sm text-purple-200">iPhone • Safari • San Francisco, CA</p>
                        </div>
                        <Badge variant="secondary" className="bg-purple-600 text-white">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <h4 className="font-medium text-white mb-2">Theme</h4>
                    <p className="text-sm text-purple-200 mb-4">Choose your preferred theme</p>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="bg-purple-600 border-purple-500 text-white rounded-full">
                        Dark
                      </Button>
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full">
                        Light
                      </Button>
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full">
                        Auto
                      </Button>
                    </div>
                  </div>



                  <div className="p-4 bg-white/5 rounded-2xl">
                    <h4 className="font-medium text-white mb-2">Font Size</h4>
                    <p className="text-sm text-purple-200 mb-4">Adjust the text size</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-purple-200">Small</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full w-2/3"></div>
                      </div>
                      <span className="text-sm text-purple-200">Large</span>
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
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
           <Card className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-3xl w-full max-w-md mx-4">
             <CardHeader>
               <CardTitle className="text-xl font-semibold text-white text-center">Change Password</CardTitle>
               <p className="text-purple-200 text-center">Update your password to keep your account secure</p>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                 <Input
                   id="currentPassword"
                   type="password"
                   placeholder="Enter current password"
                   className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="newPassword" className="text-white">New Password</Label>
                 <Input
                   id="newPassword"
                   type="password"
                   placeholder="Enter new password"
                   className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                 <Input
                   id="confirmPassword"
                   type="password"
                   placeholder="Confirm new password"
                   className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40 rounded-full"
                 />
               </div>
               <div className="flex space-x-3 pt-4">
                 <Button 
                   onClick={handleClosePasswordModal}
                   variant="outline"
                   className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full"
                 >
                   Cancel
                 </Button>
                 <Button 
                   className="flex-1 bg-purple-600 text-white hover:bg-purple-700 rounded-full"
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
