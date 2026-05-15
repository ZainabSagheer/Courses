"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderContext {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeProviderContext | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  ...props
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  [key: string]: any
}) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
  }, [])

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }
    
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    // Return a fallback to prevent breaking components like Entropy if used outside provider
    return { theme: "dark" as Theme, setTheme: () => {} }
  }
  return context
}
