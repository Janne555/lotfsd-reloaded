export const Page = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <main className={`${className ?? ''} flex flex-col items-start gap-4 w-screen h-screen`}>
    {children}
  </main>
)
