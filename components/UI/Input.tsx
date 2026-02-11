import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, useId } from 'react'

type InputType = 'text' | 'email' | 'password' | 'textarea'

interface BaseInputProps {
  type?: InputType
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  required?: boolean
  maxLength?: number
  className?: string
}

type InputAsInput = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps | 'type'> & {
    type?: Exclude<InputType, 'textarea'>
  }

type InputAsTextarea = BaseInputProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseInputProps | 'type'> & {
    type: 'textarea'
  }

export type InputProps = InputAsInput | InputAsTextarea

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      type = 'text',
      label,
      error,
      success = false,
      helperText,
      required = false,
      maxLength,
      className = '',
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = props.id || `input-${generatedId}`

    const baseStyles =
      'w-full px-4 py-3 font-mono text-base bg-gray-900 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-600'

    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50 text-red-400'
      : success
        ? 'border-green-500 focus:border-green-500 focus:ring-green-500/50 text-green-400'
        : 'border-gray-800 focus:border-brand-cyan focus:ring-brand-cyan/50 text-gray-300'

    const combinedClassName = `${baseStyles} ${stateStyles} ${className}`

    const showCharCount = maxLength && props.value !== undefined
    const currentLength = typeof props.value === 'string' ? props.value.length : 0

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 font-mono text-sm font-medium text-gray-300"
          >
            {label}
            {required && <span className="ml-1 text-brand-cyan">*</span>}
          </label>
        )}

        {type === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            className={`${combinedClassName} min-h-[120px] resize-y`}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            aria-required={required}
            maxLength={maxLength}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            id={id}
            className={combinedClassName}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            aria-required={required}
            maxLength={maxLength}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Character count */}
        {showCharCount && (
          <div className="mt-1 text-right">
            <span
              className={`font-mono text-xs ${
                currentLength > maxLength! ? 'text-red-400' : 'text-gray-600'
              }`}
            >
              {currentLength} / {maxLength}
            </span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p id={`${id}-error`} className="mt-2 font-mono text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        {/* Helper text */}
        {!error && helperText && (
          <p
            id={`${id}-helper`}
            className={`mt-2 font-mono text-sm ${success ? 'text-green-400' : 'text-gray-500'}`}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
