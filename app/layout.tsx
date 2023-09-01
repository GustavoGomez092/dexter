import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
const inter = Inter({ subsets: ['latin'] })
import 'react-perfect-scrollbar/dist/css/styles.css';


export const metadata: Metadata = {
  title: 'Dexter - Code Challenges',
  description: 'Code challenges for job applicants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper h-screen flex flex-col justify-between ">
          <Header />
          {children}
          <Footer />
          </div>
      </body>
    </html>
  )
}
