'use client'

import { useState } from 'react'
import { Button, Input, Card, Badge, Skeleton, ToastProvider, useToast } from '@/components/UI'

function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const { showToast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value.length > 0 && value.length < 3) {
      setInputError('Must be at least 3 characters')
    } else {
      setInputError('')
    }
  }

  return (
    <div className="min-h-screen p-8 space-y-12">
      <h1 className="font-display text-6xl uppercase text-center mb-12 gradient-text">
        UI Component Library
      </h1>

      {/* Buttons */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-purple">Buttons</h2>
        <div className="space-y-6">
          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">Primary Variant</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">Small Primary</Button>
              <Button variant="primary" size="md">Medium Primary</Button>
              <Button variant="primary" size="lg">Large Primary</Button>
              <Button variant="primary" loading>Loading...</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">Secondary Variant</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="sm">Small Secondary</Button>
              <Button variant="secondary" size="md">Medium Secondary</Button>
              <Button variant="secondary" size="lg">Large Secondary</Button>
            </div>
          </div>

          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">Ghost Variant</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" size="sm">Small Ghost</Button>
              <Button variant="ghost" size="md">Medium Ghost</Button>
              <Button variant="ghost" size="lg">Large Ghost</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-blue">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Input
            label="Text Input"
            placeholder="Enter text..."
            value={inputValue}
            onChange={handleInputChange}
            error={inputError}
            maxLength={50}
          />
          <Input
            label="Email Input"
            type="email"
            placeholder="your@email.com"
            helperText="We'll never share your email"
          />
          <Input
            label="Password Input"
            type="password"
            placeholder="••••••••"
            required
          />
          <Input
            label="Success State"
            value="Valid input"
            success
            helperText="Looks good!"
            readOnly
          />
          <div className="md:col-span-2">
            <Input
              type="textarea"
              label="Textarea"
              placeholder="Enter long text..."
              helperText="Maximum 200 characters"
              maxLength={200}
            />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-cyan">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-display text-2xl uppercase mb-2 text-brand-purple">Default Card</h3>
            <p className="font-mono text-sm text-gray-400">
              This is a basic card with hover lift effect.
            </p>
          </Card>

          <Card glow>
            <h3 className="font-display text-2xl uppercase mb-2 text-brand-blue">Glow Card</h3>
            <p className="font-mono text-sm text-gray-400">
              This card has a purple glow on hover.
            </p>
          </Card>

          <Card glass>
            <h3 className="font-display text-2xl uppercase mb-2 text-brand-cyan">Glass Card</h3>
            <p className="font-mono text-sm text-gray-400">
              This card uses glass morphism effect.
            </p>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-purple">Badges</h2>
        <div className="space-y-6">
          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">Color Variants</p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="purple">Training Chronicles</Badge>
              <Badge variant="blue">Dual Life Tactics</Badge>
              <Badge variant="cyan">Underground Endurance</Badge>
            </div>
          </div>

          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="purple" size="sm">Small</Badge>
              <Badge variant="blue" size="md">Medium</Badge>
              <Badge variant="cyan" size="lg">Large</Badge>
            </div>
          </div>

          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">With Dot & Removable</p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="purple" dot>With Dot</Badge>
              <Badge
                variant="blue"
                onRemove={() => showToast({ type: 'info', message: 'Badge removed!' })}
              >
                Removable
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Skeletons */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-blue">Skeletons</h2>
        <div className="space-y-6">
          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">Text Skeleton</p>
            <div className="space-y-2 max-w-xl">
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </div>
          </div>

          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">Card & Image Skeletons</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <Skeleton variant="card" />
              <Skeleton variant="image" />
            </div>
          </div>

          <div>
            <p className="font-mono text-sm text-gray-400 mb-4">Custom Skeleton</p>
            <Skeleton variant="custom" width={200} height={100} rounded />
          </div>
        </div>
      </section>

      {/* Toasts */}
      <section>
        <h2 className="font-display text-3xl uppercase mb-6 text-brand-cyan">Toasts</h2>
        <p className="font-mono text-sm text-gray-400 mb-6">
          Click buttons to trigger toast notifications in the bottom-right corner
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            onClick={() =>
              showToast({
                type: 'success',
                message: 'Success!',
                description: 'Your action completed successfully.',
              })
            }
          >
            Show Success
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showToast({
                type: 'error',
                message: 'Error!',
                description: 'Something went wrong. Please try again.',
              })
            }
          >
            Show Error
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              showToast({
                type: 'info',
                message: 'Info',
                description: 'Here is some helpful information.',
              })
            }
          >
            Show Info
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showToast({
                type: 'warning',
                message: 'Warning!',
                description: 'Please review this carefully.',
              })
            }
          >
            Show Warning
          </Button>
        </div>
      </section>
    </div>
  )
}

export default function ComponentsTestPage() {
  return (
    <ToastProvider>
      <ComponentShowcase />
    </ToastProvider>
  )
}
