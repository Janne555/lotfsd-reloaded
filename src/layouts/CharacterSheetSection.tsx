export const CharacterSheetSection = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section className={`${className ?? ''} p-2 border m-2 flex flex-col gap-4 max-w-md relative`} id={id}>
    {children}
  </section>
)
