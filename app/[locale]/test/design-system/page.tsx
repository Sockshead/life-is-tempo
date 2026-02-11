export default function DesignSystemTest() {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <h1 className="font-display text-6xl uppercase text-center mb-12 gradient-text">
        Life Is Tempo Design System
      </h1>

      {/* Colors */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-purple">Brand Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-24 bg-brand-purple rounded-lg" />
            <p className="font-mono text-sm">Purple</p>
            <p className="font-mono text-xs text-gray-400">#8B5CF6</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-brand-blue rounded-lg" />
            <p className="font-mono text-sm">Blue</p>
            <p className="font-mono text-xs text-gray-400">#3B82F6</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-brand-cyan rounded-lg" />
            <p className="font-mono text-sm">Cyan</p>
            <p className="font-mono text-xs text-gray-400">#06B6D4</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-brand-dark border border-gray-800 rounded-lg" />
            <p className="font-mono text-sm">Dark</p>
            <p className="font-mono text-xs text-gray-400">#0a0a0a</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-blue">Typography</h2>
        <div className="space-y-4">
          <div>
            <p className="font-mono text-xs text-gray-400 mb-2">Display Font (Bebas Neue)</p>
            <h1 className="font-display text-6xl uppercase">Life Is Tempo</h1>
          </div>
          <div>
            <p className="font-mono text-xs text-gray-400 mb-2">Mono Font (JetBrains Mono)</p>
            <p className="font-mono text-lg">Training for Berlin Ironman 70.3 from Colombia</p>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-cyan">Animations</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 border border-gray-800 rounded-lg">
            <p className="font-mono text-sm mb-4">Glitch Reveal (on hover)</p>
            <div className="h-24 bg-brand-purple rounded hover:animate-[glitchReveal_0.5s_ease-out] flex items-center justify-center">
              <span className="font-display text-2xl">HOVER ME</span>
            </div>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <p className="font-mono text-sm mb-4">Shine (continuous)</p>
            <div className="h-24 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan rounded animate-shine flex items-center justify-center">
              <span className="font-display text-2xl">SHINING</span>
            </div>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <p className="font-mono text-sm mb-4">Pulse (2s = 120 BPM)</p>
            <div className="h-24 bg-brand-blue rounded animate-pulse flex items-center justify-center">
              <span className="font-display text-2xl">120 BPM</span>
            </div>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <p className="font-mono text-sm mb-4">Gradient Rotate (10s)</p>
            <div className="h-24 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan bg-[length:200%_200%] rounded animate-gradient-rotate flex items-center justify-center">
              <span className="font-display text-2xl">ROTATING</span>
            </div>
          </div>
        </div>
      </section>

      {/* Utility Classes */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-purple">Utility Classes</h2>
        <div className="space-y-6">
          <div>
            <p className="font-mono text-sm text-gray-400 mb-2">Text Glow</p>
            <h3 className="font-display text-4xl uppercase text-glow text-brand-cyan">
              GLOWING TEXT EFFECT
            </h3>
          </div>
          <div>
            <p className="font-mono text-sm text-gray-400 mb-2">Gradient Text</p>
            <h3 className="font-display text-4xl uppercase gradient-text">
              PURPLE BLUE CYAN GRADIENT
            </h3>
          </div>
          <div>
            <p className="font-mono text-sm text-gray-400 mb-2">Box Glow</p>
            <div className="p-6 bg-brand-purple rounded-lg box-glow inline-block">
              <span className="font-display text-2xl">GLOWING BOX</span>
            </div>
          </div>
          <div>
            <p className="font-mono text-sm text-gray-400 mb-2">Glass Morphism</p>
            <div className="p-6 glass rounded-lg inline-block">
              <span className="font-mono text-lg">Blurred glass effect with subtle border</span>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing Scale */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-blue">Spacing Scale</h2>
        <div className="space-y-2">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128].map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="font-mono text-sm w-16">{size}px</span>
              <div
                className="bg-brand-cyan h-4 rounded"
                style={{ width: `${size}px` }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Gray Scale */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-cyan">Gray Scale</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="h-24 bg-gray-950 border border-gray-800 rounded-lg" />
            <p className="font-mono text-xs">gray-950</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-gray-900 rounded-lg" />
            <p className="font-mono text-xs">gray-900</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-gray-800 rounded-lg" />
            <p className="font-mono text-xs">gray-800</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-gray-600 rounded-lg" />
            <p className="font-mono text-xs">gray-600</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-gray-400 rounded-lg" />
            <p className="font-mono text-xs">gray-400</p>
          </div>
        </div>
      </section>
    </div>
  )
}
