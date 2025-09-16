"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sora } from "next/font/google"
import { UserPlus, Plus, Megaphone, Sparkles, Users, MessageCircle, Lightbulb, Heart } from "lucide-react"

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700"] })

export default function CommunityPage() {
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "", tags: "" })
  const [newIdea, setNewIdea] = useState({ title: "", content: "" })

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-2 relative overflow-hidden"
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "1rem",
        maxWidth: "1100px",
        margin: "40px auto",
        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.05)",
      }}
    >
      {/* Enhanced Decorative Elements */}
      <div className="absolute left-8 top-8 text-blue-400 opacity-30 w-12 h-12 animate-pulse">
        <Sparkles className="w-full h-full" />
      </div>
      <div className="absolute right-8 top-16 text-purple-400 opacity-25 w-16 h-16 animate-bounce">
        <Sparkles className="w-full h-full" />
      </div>
      <div className="absolute right-12 bottom-12 text-pink-400 opacity-20 w-14 h-14 animate-spin-slow">
        <Sparkles className="w-full h-full" />
      </div>
      <div className="absolute left-16 bottom-8 text-emerald-400 opacity-25 w-10 h-10 animate-pulse">
        <Sparkles className="w-full h-full" />
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-ping"></div>
      <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-15 animate-bounce"></div>

      {/* Wonderful Header Section */}
      <div className="w-full max-w-5xl text-center mb-16 relative z-10">
        {/* Main Title with Enhanced Styling */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 scale-110"></div>
          <h1
            className="relative text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight"
            style={{ fontFamily: sora.style.fontFamily }}
          >
            Devora
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Community
            </span>
          </h1>
        </div>

        {/* Subtitle with Enhanced Design */}
        <div className="relative mb-10">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <p className="text-lg md:text-xl text-gray-700 font-semibold">
                Where ideas ignite, friendships blossom, and creativity thrives!
              </p>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <Button
            size="lg"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 rounded-full font-semibold text-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            <UserPlus className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative">Join the Community</span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="group px-8 py-4 border-2 border-gradient-to-r from-blue-500 to-purple-500 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105 transition-all duration-300 rounded-full font-semibold text-lg shadow-lg"
          >
            <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
            Start a Discussion
          </Button>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full group-hover:rotate-12 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">1,200+</div>
            <div className="text-gray-600 font-medium">Active Members</div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full group-hover:rotate-12 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">850+</div>
            <div className="text-gray-600 font-medium">Discussions</div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full group-hover:rotate-12 transition-transform duration-300">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-pink-600 mb-2">2,400+</div>
            <div className="text-gray-600 font-medium">Ideas Shared</div>
          </div>
        </div>
      </div>

      {/* Welcome Message Section */}
      <div className="w-full max-w-4xl mx-auto mb-12 relative z-10">
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-blue-200 shadow-lg">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Welcome to Our Amazing Community! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of developers, designers, and innovators who are building the future together. 
              Share your ideas, get feedback, and grow with our supportive community.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Always supportive
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Knowledge sharing
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Creative collaboration
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Boxes */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
        {/* Discussion Box */}
        <Card className="bg-white border-2 border-dashed border-[#d1d5db] min-h-[240px] flex flex-col justify-center items-center shadow-none hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-[#374151] text-lg flex items-center gap-2">
              <Plus className="w-5 h-5" /> Start a Discussion
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full">
            <div className="w-full mb-3">
              <Label htmlFor="discussion-title" className="text-[#374151] mb-1 block">Discussion Title</Label>
              <Input
                id="discussion-title"
                placeholder="Enter your discussion title"
                className="w-full border-[#d1d5db] focus:border-[#6b7280]"
                value={newDiscussion.title}
                onChange={e => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
              />
            </div>
            <div className="w-full mb-3">
              <Label htmlFor="discussion-content" className="text-[#374151] mb-1 block">Discussion Content</Label>
              <Textarea
                id="discussion-content"
                placeholder="Share your thoughts or questions..."
                className="w-full border-[#d1d5db] focus:border-[#6b7280]"
                value={newDiscussion.content}
                onChange={e => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
              />
            </div>
            <div className="w-full mb-3">
              <Label htmlFor="discussion-tags" className="text-[#374151] mb-1 block">Tags</Label>
              <Input
                id="discussion-tags"
                placeholder="Tags (comma separated)"
                className="w-full border-[#d1d5db] focus:border-[#6b7280]"
                value={newDiscussion.tags}
                onChange={e => setNewDiscussion({ ...newDiscussion, tags: e.target.value })}
              />
            </div>
            <Button
              className="bg-gradient-to-r from-[#374151] to-[#6b7280] text-white w-full"
              onClick={() => setNewDiscussion({ title: "", content: "", tags: "" })}
            >
              Post Discussion
            </Button>
          </CardContent>
        </Card>

        {/* Idea Box */}
        <Card className="bg-white border-2 border-dashed border-[#d1d5db] min-h-[240px] flex flex-col justify-center items-center shadow-none hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-[#374151] text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Share a Creative Idea
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full">
            <div className="w-full mb-3">
              <Label htmlFor="idea-title" className="text-[#374151] mb-1 block">Idea Title</Label>
              <Input
                id="idea-title"
                placeholder="Enter your idea title"
                className="w-full border-[#d1d5db] focus:border-[#6b7280]"
                value={newIdea.title}
                onChange={e => setNewIdea({ ...newIdea, title: e.target.value })}
              />
            </div>
            <div className="w-full mb-3">
              <Label htmlFor="idea-content" className="text-[#374151] mb-1 block">Idea Description</Label>
              <Textarea
                id="idea-content"
                placeholder="Describe your creative idea..."
                className="w-full border-[#d1d5db] focus:border-[#6b7280]"
                value={newIdea.content}
                onChange={e => setNewIdea({ ...newIdea, content: e.target.value })}
              />
            </div>
            <Button
              className="bg-gradient-to-r from-[#374151] to-[#6b7280] text-white w-full"
              onClick={() => setNewIdea({ title: "", content: "" })}
            >
              Submit Idea
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Announcements Box */}
      <div className="w-full max-w-4xl mb-10 relative z-10">
        <Card className="bg-white border-2 border-dashed border-[#d1d5db] min-h-[120px] flex flex-col justify-center items-center shadow-none hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-[#374151] text-lg flex items-center gap-2">
              <Megaphone className="w-5 h-5" /> Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full text-center text-[#6b7280]">
            <span>No announcements yet. Stay tuned for updates!</span>
          </CardContent>
        </Card>
      </div>

      {/* Friendly Footer */}
      <div className="w-full max-w-3xl text-center mt-8 text-[#6b7280] font-semibold text-base opacity-80 z-10">
        <span>
          ✨ Devora Community – Dream. Discuss. Develop. Together. ✨
        </span>
      </div>
    </div>
  )
}