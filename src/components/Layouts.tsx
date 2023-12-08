import { PropsWithChildren } from "react"

export const Page = (props: PropsWithChildren<{ className?: string }>) => (
  <main className={`${props.className || ''} flex flex-col p-4 gap-4`}>{props.children}</main>
)
