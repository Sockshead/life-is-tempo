import { MetricDisplay, BPMCounter, ProgressBar, StatCard } from '@/components/Metrics'

export default function TestMetricsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-display text-brand-purple mb-2">
          Metrics Components Test Page
        </h1>
        <p className="font-mono text-sm text-gray-400 mb-12">
          Visual testing for all Metrics & Data Display components
        </p>

        {/* MetricDisplay Variants */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display text-brand-cyan">MetricDisplay Variants</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricDisplay
              value={70.3}
              label="STATIC DISPLAY"
              unit="MI"
              variant="static"
              color="purple"
            />

            <MetricDisplay
              value={214}
              label="COUNTER ANIMATION"
              variant="counter"
              color="cyan"
              description="Counts up on viewport entry"
            />

            <MetricDisplay
              value={165}
              label="PULSE EFFECT"
              unit="BPM"
              variant="pulse"
              color="blue"
            />

            <MetricDisplay
              value={45}
              maxValue={70}
              label="WITH PROGRESS"
              variant="progress"
              color="purple"
            />
          </div>
        </section>

        {/* MetricDisplay Sizes */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display text-brand-cyan">Size Variants</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricDisplay
              value={100}
              label="SMALL SIZE"
              size="sm"
              color="cyan"
            />

            <MetricDisplay
              value={200}
              label="MEDIUM SIZE"
              size="md"
              color="purple"
            />

            <MetricDisplay
              value={300}
              label="LARGE SIZE"
              size="lg"
              color="blue"
            />
          </div>
        </section>

        {/* BPM Counter Zones */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display text-brand-cyan">BPM Counter - Heart Rate Zones</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BPMCounter
              bpm={110}
              zone="low"
              showZone
            />

            <BPMCounter
              bpm={130}
              zone="moderate"
              showZone
            />

            <BPMCounter
              bpm={165}
              zone="high"
              showZone
            />
          </div>
        </section>

        {/* BPM Counter Sizes */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display text-brand-cyan">BPM Counter Sizes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BPMCounter
              bpm={130}
              zone="moderate"
              size="sm"
            />

            <BPMCounter
              bpm={130}
              zone="moderate"
              size="md"
            />

            <BPMCounter
              bpm={130}
              zone="moderate"
              size="lg"
            />
          </div>
        </section>

        {/* Progress Bars */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display text-brand-cyan">Progress Bars</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-sm text-gray-400 mb-3">Linear Progress</h3>
              <div className="space-y-4">
                <ProgressBar value={75} variant="linear" color="purple" showLabel />
                <ProgressBar value={50} variant="linear" color="cyan" size="lg" glow />
                <ProgressBar value={25} variant="linear" color="blue" size="sm" />
              </div>
            </div>

            <div>
              <h3 className="font-mono text-sm text-gray-400 mb-3">Circular Progress</h3>
              <div className="flex gap-8">
                <ProgressBar value={75} variant="circular" color="purple" showLabel size="sm" />
                <ProgressBar value={60} variant="circular" color="cyan" showLabel size="md" />
                <ProgressBar value={85} variant="circular" color="blue" showLabel size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* StatCard */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display text-brand-cyan">StatCard - Grouped Metrics</h2>

          <StatCard
            title="Race Stats"
            description="2026 Ironman 70.3 Training Metrics"
            columns={3}
            glass
            glow
            metrics={[
              { value: 70.3, label: "DISTANCE", unit: "MI", variant: "counter", color: "purple" },
              { value: 1.9, label: "SWIM", unit: "K", variant: "static", color: "cyan" },
              { value: 90, label: "BIKE", unit: "K", variant: "static", color: "blue" },
              { value: 21, label: "RUN", unit: "K", variant: "static", color: "purple" },
              { value: 6, label: "HOURS", unit: "MAX", variant: "counter", color: "cyan" },
              { value: 214, label: "DAYS LEFT", variant: "pulse", color: "blue" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Training Volume"
              columns={2}
              glass
              metrics={[
                { value: 12, label: "HOURS", unit: "WEEK", variant: "counter", color: "cyan" },
                { value: 180, label: "KM", unit: "WEEK", variant: "counter", color: "purple" },
              ]}
            />

            <StatCard
              title="Performance Metrics"
              columns={2}
              glow
              metrics={[
                { value: 165, label: "MAX HR", unit: "BPM", variant: "pulse", color: "blue" },
                { value: 340, label: "FTP", unit: "W", variant: "static", color: "cyan" },
              ]}
            />
          </div>
        </section>

        {/* Accessibility Note */}
        <section className="mt-16 p-6 border border-brand-cyan/30 rounded-lg">
          <h3 className="font-display text-2xl text-brand-cyan mb-2">Accessibility Testing</h3>
          <ul className="font-mono text-sm text-gray-400 space-y-2">
            <li>✓ Screen readers: Counter values announced with aria-live="polite"</li>
            <li>✓ Reduced motion: Disable animations via browser settings</li>
            <li>✓ Color zones: Include text labels (not color-only)</li>
            <li>✓ Progress bars: Proper ARIA attributes (role, valuenow, valuemin, valuemax)</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
