import React from 'react'

export function Diamond({ children }: React.PropsWithChildren<{}>) {
  return (
    <span className="p-4 h-6 w-6 border box-content flex items-center justify-center transform rotate-45">
      <span className="transform -rotate-45">
        {children}
      </span>
    </span>
  )
}
