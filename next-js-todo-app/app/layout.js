import "../styles/globals.css";

export const metadata = {
  title: "Next.js 13 TODOS App",
  description: "Generated by create next app rendered on server/client",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
          <h1>DAILY TODO</h1>
          {children}
      </body>
    </html>
  );
}
