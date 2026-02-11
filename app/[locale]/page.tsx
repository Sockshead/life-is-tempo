'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const t = useTranslations();
  const [bpm, setBpm] = useState(140);
  const [trainingMode, setTrainingMode] = useState(true);

  // BPM alternating animation
  useEffect(() => {
    const interval = setInterval(() => {
      const targetBpm = trainingMode
        ? Math.floor(Math.random() * (180 - 140) + 140) // Training: 140-180
        : Math.floor(Math.random() * (140 - 128) + 128); // Techno: 128-140

      setBpm(targetBpm);
      setTrainingMode(!trainingMode);
    }, 2000);

    return () => clearInterval(interval);
  }, [trainingMode]);

  // Animated counter
  const [counts, setCounts] = useState({ race: 0, days: 0, altitude: 0 });

  useEffect(() => {
    const targets = { race: 70.3, days: 214, altitude: 2600 };
    const duration = 2000;
    const steps = 60;

    const timers = Object.keys(targets).map((key) => {
      const target = targets[key as keyof typeof targets];
      const increment = target / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= target) {
          setCounts((prev) => ({ ...prev, [key]: target }));
        } else {
          setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, duration / steps);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        {/* BPM Display */}
        <div className="mb-8 font-mono text-sm tracking-[0.5em] text-cyan-400 opacity-80 animate-pulse">
          {t('hero.bpm')}: <span>{bpm}</span>
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
        <button className="group relative overflow-hidden bg-purple-600 px-10 py-4 font-mono text-sm font-bold uppercase tracking-wider text-white transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5">
          <span className="relative z-10">{t('hero.cta')}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        </button>

        {/* Metrics */}
        <div className="mt-20 flex flex-col gap-12 md:flex-row md:gap-16">
          <div className="text-center">
            <div className="mb-2 font-mono text-5xl font-bold text-cyan-400">
              {counts.race}
            </div>
            <div className="font-mono text-xs uppercase tracking-wider opacity-50">
              {t('hero.raceDistance')}
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-mono text-5xl font-bold text-cyan-400">
              {counts.days}
            </div>
            <div className="font-mono text-xs uppercase tracking-wider opacity-50">
              {t('hero.daysToBerlin')}
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-mono text-5xl font-bold text-cyan-400">
              {counts.altitude}
            </div>
            <div className="font-mono text-xs uppercase tracking-wider opacity-50">
              {t('hero.altitude')}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="relative overflow-hidden border-2 border-purple-600 bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 md:p-16">
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
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 border border-purple-500/50 bg-black/50 px-6 py-4 font-mono text-sm text-white transition-all focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 px-10 py-4 font-mono text-sm font-bold uppercase tracking-wider text-white transition-all hover:shadow-[0_5px_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5"
              >
                {t('newsletter.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
