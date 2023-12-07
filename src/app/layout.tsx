import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthWrapper from './contexts/AuthWrapper'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PC Jazzerne',
  description: 'Det beste laget i 7dentligaen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  )
}
