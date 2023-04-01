import Sidebar from '@/components/Sidebar'
import './globals.css'
import Header from '@/components/Header'
import ClientProvider from '@/components/ClientProvider'

export const metadata = {
  title: 'Amazon Web Scraper',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* using h-screen to reach the entire height of the screen and setup for scrolling content */}
      <body className="flex bg-[#F7FBFF] h-screen">
        <ClientProvider>

        <Sidebar />

        <main className="p-10 max-w-7xl w-full mx-auto overflow-y-auto">

          <Header />
          {/* page.tsx is the child here */}
          {children}
        </main>
        </ClientProvider>
      </body>
    </html>
  )
}