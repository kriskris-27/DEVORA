"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  return (
    <main className="min-h-svh grid place-items-center px-4">
      <Card className="w-full md:w-[500px] rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-2xl">
        <CardHeader className="space-y-2">
          <img
            src="/images/devora-logo.png"
            alt="Devora"
            className="mx-auto h-8 md:h-10 w-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
          />
          <CardTitle className="text-2xl md:text-3xl font-semibold text-white text-center">Welcome back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email/password form */}
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              router.push("/dashboard")
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Link href="#" className="text-xs text-white/70 hover:text-white underline underline-offset-4">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/40"
              />
            </div>
            <Button type="submit" className="w-full rounded-full bg-black text-white hover:bg-black/90">
              Log in
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-white/60">or</span>
            </div>
          </div>

          {/* Providers stacked vertically */}
          <div className="grid gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              onClick={() => router.push("/dashboard")}
            >
              <img src="/images/google-icon.png" alt="Google" className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            <Button
              type="button"
              className="w-full rounded-full bg-black text-white hover:bg-black/90"
              onClick={() => router.push("/dashboard")}
            >
              <img src="/images/github-icon.png" alt="GitHub" className="mr-2 h-5 w-5" />
              Continue with GitHub
            </Button>

            <p className="text-center text-sm text-white/70">
              {"Don't have an account? "}
              <Link href="/signup" className="underline underline-offset-4 text-white hover:text-white">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
