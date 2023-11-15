"use client"
 
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const icon = (theme === 'light') ?
    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    :
    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

  const toggleTheme = (theme === 'light') ?
    () => setTheme('dark') : () => setTheme('light')

  return (
    <Button variant='outline' size='icon' onClick={toggleTheme}>
      {icon}
    </Button>
  )
}