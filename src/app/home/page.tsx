import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home - Survey App",
  description: "Create and share surveys easily",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Surveys with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Build engaging surveys, gather valuable feedback, and analyze responses in real-time.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button variant="default" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link href="/dashboard/surveys">
                  <Button variant="outline" size="lg">
                    View Surveys
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create surveys in minutes with our intuitive interface.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Real-time Results</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  View responses and analyze data as they come in.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure &amp; Private</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your data is encrypted and protected at all times.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 Survey App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}