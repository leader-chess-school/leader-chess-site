type Props = {
  crumb: string
  onHome: () => void
}

export default function Crumbs({ crumb, onHome }: Props) {
  return (
    <div className="crumbs">
      <a onClick={onHome}>главная</a>
      <span className="sep">/</span>
      <b>{crumb}</b>
    </div>
  )
}
