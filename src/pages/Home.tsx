import Hero from '@/components/Hero'
import Storyboard from '@/components/Storyboard'
import Stats from '@/components/Stats'
import Benefits from '@/components/Benefits'
import Coaches from '@/components/Coaches'
import Reviews from '@/components/Reviews'
import Where from '@/components/Where'

type Props = {
  onCTA: () => void
}

export default function Home({ onCTA }: Props) {
  return (
    <>
      <Hero onCTA={onCTA} />
      <Storyboard />
      <Stats />
      <Benefits />
      <Coaches />
      <Reviews />
      <Where />
    </>
  )
}
