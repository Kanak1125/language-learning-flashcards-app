import './globals.css'
import { Noto_Sans } from 'next/font/google'
import AuthProvider from '@/contexts/AuthContext'

const noto = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Language Flashcard app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${noto.className} mx-auto min-h-screen box-border bg-black text-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}