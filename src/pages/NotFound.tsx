import PageHead from '@/components/PageHead'
import { NOT_FOUND } from '@/content/nav'

type Props = {
  onHome: () => void
}

export default function NotFound({ onHome }: Props) {
  return (
    <main>
      <PageHead
        eyebrow={NOT_FOUND.eyebrow}
        title={NOT_FOUND.title}
        after={
          <button
            type="button"
            className="v4v-btn primary lg"
            style={{ marginTop: 16 }}
            onClick={onHome}
          >
            {NOT_FOUND.cta}
          </button>
        }
      >
        {NOT_FOUND.body}
      </PageHead>
    </main>
  )
}
