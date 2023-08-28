import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Language Flashcard app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} container mx-auto min-h-screen box-border`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}