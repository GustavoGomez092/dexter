'use client'
import '../globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="login wrapper h-screen flex flex-col justify-between bg-gray-900">
          {children}
          </div>
  )
}
