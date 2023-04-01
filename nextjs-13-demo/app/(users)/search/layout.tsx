import Link from "next/link";
import Search from "./Search";

// dynamic layout specific to /search
export default function RootLayout({
  children, // from page.tsx
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex space-x-4 divide-x-2 p-2">
      <div>
        <Link href="/search">
          <h1 className="text-xl text-blue-500 font-semibold">Search</h1>
        </Link>
      </div>

      <div className="flex-1 pl-5">
        <Search />

        <div>{children}</div>
      </div>
    </main>
  );
}
