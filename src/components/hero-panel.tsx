import heroIllustration from '@/assets/hero-illustration.png'

export const HeroPanel = () => (
    <img
      src={heroIllustration}
      alt="Minimal hand illustration holding a lime clock"
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
)