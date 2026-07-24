import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: string
  children?: ReactNode
  after?: ReactNode
}

export default function PageHead({ eyebrow, title, children, after }: Props) {
  return (
    <div className="page-head">
      <div className="page-head-inner">
        {eyebrow && <span className="v4v-eyebrow">{eyebrow}</span>}
        <h1 className="v4v-h1">{title}</h1>
        {children && <p className="v4v-body-sm">{children}</p>}
        {after}
      </div>
    </div>
  )
}
