import type { Metadata } from 'next'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mira — AI Voice Receptionist for Airbnb Hosts',
  description:
    'Mira answers your guests when you\'re busy, sleeping, or managing another property — in English, Hindi, or Hinglish. 24/7, no app needed.',
  keywords: ['Airbnb host', 'AI receptionist', 'guest calls', 'India', 'Hinglish', 'property management'],
  openGraph: {
    title: 'Mira — AI Voice Receptionist for Airbnb Hosts',
    description: 'Every call answered. Every request logged.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${instrumentSerif.variable} ${dmSans.variable} bg-bg text-text-primary`}>
        {children}
      </body>
    </html>
  )
}
