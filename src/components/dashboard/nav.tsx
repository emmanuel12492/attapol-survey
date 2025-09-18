"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "My Surveys",
      href: "/dashboard/surveys",
    },
    {
      name: "Create Survey",
      href: "/dashboard/surveys/create",
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 px-8 h-16 border-b">
      <div className="flex-1 flex items-center space-x-4 lg:space-x-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === item.href
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        {session?.user ? (
          <span className="text-sm text-muted-foreground">
            {session.user.email}
          </span>
        ) : null}
      </div>
    </nav>
  )
}