import TodosList from "./TodosList"

// dynamic layout specific to /todos
export default function RootLayout({
    children, // from page.tsx
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="flex">
        <div>
            {/* @ts-ignore */}
          <TodosList />
        </div>
        <div className="flex-1">{children}</div>
      </main>
    )
  }