export function useTranslations() {
  return (key: string) => key
}

export function useLocale() {
  return 'en'
}

export function useMessages() {
  return {}
}

export function NextIntlClientProvider({ children }: { children: React.ReactNode }) {
  return children
}
