'use client'

import { useTranslations } from 'next-intl'
import { Section } from '@/components/Layout/Section'
import { BPMCounter } from '@/components/Metrics/BPMCounter'
import { StatCard } from '@/components/Metrics/StatCard'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'

interface HomeContentProps {
  locale: string
}

export function HomeContent({ locale }: HomeContentProps) {
  const t = useTranslations()

  return (
    <>
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        {/* BPM Display */}
        <div className="mb-8">
          <BPMCounter bpm={140} zone="high" size="sm" showZone={false} />
        </div>

        {/* Logo */}
        <h1 className="mb-8 font-[family-name:var(--font-bebas)] text-6xl md:text-9xl leading-none">
          <span className="block text-purple-500 animate-[glitchReveal_0.8s_cubic-bezier(0.23,1,0.32,1)_0.1s_forwards] opacity-0">
            LIFE
          </span>
          <span className="block text-blue-500 animate-[glitchReveal_0.8s_cubic-bezier(0.23,1,0.32,1)_0.3s_forwards] opacity-0">
            IS
          </span>
          <span className="block text-cyan-400 animate-[glitchReveal_0.8s_cubic-bezier(0.23,1,0.32,1)_0.5s_forwards] opacity-0">
            TEMPO
          </span>
        </h1>

        {/* Tagline */}
        <p className="mb-16 font-mono text-sm tracking-[0.25em] uppercase opacity-70">
          {t('hero.tagline')}
        </p>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-2xl font-mono text-sm leading-relaxed opacity-70 md:text-base">
          {t('hero.subtitle')}
        </p>

        {/* CTA Button */}
        <Button variant="primary" size="lg" href={`/${locale}/blog`}>
          {t('hero.cta')}
        </Button>

        {/* Metrics */}
        <div className="mt-20 w-full max-w-3xl">
          <StatCard
            columns={3}
            glass
            metrics={[
              {
                value: 70.3,
                label: t('hero.raceDistance'),
                variant: 'counter',
                color: 'cyan',
              },
              {
                value: 214,
                label: t('hero.daysToBerlin'),
                variant: 'counter',
                color: 'cyan',
              },
              {
                value: 2600,
                label: t('hero.altitude'),
                variant: 'counter',
                color: 'cyan',
              },
            ]}
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <Section py="lg">
        <div className="relative overflow-hidden border-2 border-purple-600 bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 md:p-16 rounded-lg">
          {/* Rotating gradient background */}
          <div className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] animate-[rotate_20s_linear_infinite] bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_70%)]" />

          <div className="relative z-10 text-center">
            <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-4xl md:text-5xl bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {t('newsletter.title')}
            </h2>
            <p className="mb-10 font-mono text-sm opacity-70 md:text-base">
              {t('newsletter.subtitle')}
            </p>

            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                {t('newsletter.submit')}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  )
}
