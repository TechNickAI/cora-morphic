import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppStateProvider } from '@/lib/utils/app-state'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const logoUrl = "https://d1xiic2ql9d7gm.cloudfront.net/logo_cora.png"

export const metadata = {
    title: {
        default: "Cora: Heart-Centered SI",
        template: `%s - Cora: Heart-Centered SI`,
    },
    description: "Cora is the heart-centered interface for Super Intelligence",
    keywords: ["Cora", "Heart-Centered AI", "Super Intelligence"],
    icons: {
        icon: logoUrl,
        shortcut: logoUrl,
        apple: logoUrl,
    },
    openGraph: {
        images: [logoUrl],
    },
    twitter: {
        card: "summary_large_image",
        images: [logoUrl],
        creator: '@TechNickAI'
    },
}


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppStateProvider>
            <Header />
            {children}
            <Sidebar />
            <Footer />
            <Toaster />
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
