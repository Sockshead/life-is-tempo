'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Logo and Tagline */}
        <div className="mb-12">
          <Link
            href="/"
            locale={locale as 'en' | 'es'}
            className="font-display text-3xl tracking-wider gradient-text hover:opacity-80 transition-opacity"
            aria-label="Life Is Tempo - Home"
          >
            LIFE IS TEMPO
          </Link>
          <p className="font-mono text-sm text-gray-400 mt-3 max-w-md">
            {t('about')}
          </p>
          <p className="font-mono text-xs text-gray-600 mt-2">
            {t('location')}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Train Column */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-brand-purple mb-4 uppercase">
              {t('train')}
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <Link
                  href="/training"
                  locale={locale as 'en' | 'es'}
                  className="font-mono text-sm text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  {t('trainingChronicles')}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  locale={locale as 'en' | 'es'}
                  className="font-mono text-sm text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  {t('berlin703')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Live Column */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-brand-purple mb-4 uppercase">
              {t('live')}
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <Link
                  href="/dual-life"
                  locale={locale as 'en' | 'es'}
                  className="font-mono text-sm text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  {t('dualLifeTactics')}
                </Link>
              </li>
              <li>
                <Link
                  href="/underground"
                  locale={locale as 'en' | 'es'}
                  className="font-mono text-sm text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  {t('undergroundEndurance')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-brand-purple mb-4 uppercase">
              {t('connect')}
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  {t('instagram')}
                </a>
              </li>
              <li>
                <a
                  href="https://strava.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  {t('strava')}
                </a>
              </li>
              <li>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  {t('spotify')}
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@lifeistempo.com"
                  className="font-mono text-sm text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  {t('email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="font-mono text-xs text-gray-600 text-center">
            &copy; {currentYear} Life Is Tempo. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
