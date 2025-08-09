// components/ui/loading-spinner.jsx
import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className }) {
  return (
    <div className="flex items-center justify-center p-6">
      <Loader2 className={`h-6 w-6 animate-spin text-muted-foreground ${className}`} />
    </div>
  )
}