import * as React from "react"
import { cn } from "@/lib/utils"

// Lightweight tooltip implementation to avoid external hook/runtime issues
// API compatible with shadcn/ui usage in this project

type Side = "top" | "right" | "bottom" | "left"

type TooltipContextValue = {
  open: boolean
  setOpen: (o: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

function useTooltipContext() {
  const ctx = React.useContext(TooltipContext)
  if (!ctx) throw new Error("Tooltip components must be used within <Tooltip>")
  return ctx
}

// Small ref utility to safely merge refs
function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) return
  if (typeof ref === "function") ref(value as T)
  else (ref as React.MutableRefObject<T | null>).current = value
}

const TooltipProvider: React.FC<React.PropsWithChildren<{ delayDuration?: number }>> = ({ children }) => {
  // No-op provider to keep API parity
  return <>{children}</>
}

const Tooltip: React.FC<React.PropsWithChildren<{ defaultOpen?: boolean }>> = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLElement>(null)

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      <span className="relative inline-flex items-center">{children}</span>
    </TooltipContext.Provider>
  )
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const { setOpen, triggerRef } = useTooltipContext()

    const handlers = {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      onFocus: () => setOpen(true),
      onBlur: () => setOpen(false),
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ref: (node: HTMLElement | null) => {
          setRef(ref, node)
          ;(triggerRef as React.MutableRefObject<HTMLElement | null>).current = node
        },
        ...handlers,
        ...props,
      })
    }

    return (
      <button
        ref={(node) => {
          setRef(ref, (node as unknown as HTMLElement) ?? null)
          ;(triggerRef as React.MutableRefObject<HTMLElement | null>).current = (node as unknown as HTMLElement) ?? null
        }}
        {...handlers}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: Side
  align?: "start" | "center" | "end"
  sideOffset?: number
  hidden?: boolean
}

const positionClasses = (side: Side, align: "start" | "center" | "end") => {
  const base = {
    top: "bottom-full mb-2",
    right: "left-full ml-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
  }[side]

  const alignCls = align === "start" ? "" : align === "end" ? "" : ""

  return cn("absolute z-50", base, alignCls)
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", align = "center", sideOffset = 4, hidden, style, children, ...props }, ref) => {
    const { open, triggerRef } = useTooltipContext()

    if (hidden || !open) return null

    return (
      <div
        ref={ref}
        role="tooltip"
        className={cn(
          positionClasses(side, align),
          "min-w-max rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          className
        )}
        style={{
          // simple offset handling
          margin: side === "top" || side === "bottom" ? `${sideOffset}px 0` : undefined,
          ...(style as React.CSSProperties),
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

