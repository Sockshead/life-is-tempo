'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastProps {
  id: string
  type: ToastType
  message: string
  description?: string
  duration?: number
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastProps, 'id'>) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const newToast: ToastProps = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss after duration
    const duration = toast.duration || 5000
    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }, [dismissToast])

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

// Toast Container
function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastProps[]
  onDismiss: (id: string) => void
}) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-md w-full px-4"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  )
}

// Individual Toast
function Toast({ type, message, description, onDismiss }: ToastProps & { onDismiss: () => void }) {
  const typeStyles: Record<ToastType, { border: string; icon: string; iconColor: string }> = {
    success: { border: 'border-l-green-500', icon: '✓', iconColor: 'text-green-500' },
    error: { border: 'border-l-red-500', icon: '✕', iconColor: 'text-red-500' },
    info: { border: 'border-l-brand-cyan', icon: 'ℹ', iconColor: 'text-brand-cyan' },
    warning: { border: 'border-l-yellow-500', icon: '⚠', iconColor: 'text-yellow-500' },
  }

  const styles = typeStyles[type]

  return (
    <div
      className={`glass ${styles.border} border-l-4 p-4 rounded-lg animate-in slide-in-from-right-5 fade-in duration-300`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className={`text-2xl ${styles.iconColor}`} aria-hidden="true">
          {styles.icon}
        </span>
        <div className="flex-1">
          <p className="font-mono text-sm font-medium text-gray-200">{message}</p>
          {description && (
            <p className="mt-1 font-mono text-xs text-gray-400">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="text-gray-500 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan rounded"
          aria-label="Dismiss notification"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { Toast }
