import '../styles/globals.css' // activate TailwindCSS
import Header from './Header'

export const metadata = {
  title: 'NextJS 13 Website', // default page title must be set here if there are to be multiple page titles
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children, // from page.tsx
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className='px-6 py-4'>
        {children}
        </div>
      </body>
    </html>
  )
}