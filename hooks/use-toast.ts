"use client"

import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  duration?: number
}

function toast({ title, description, duration }: ToastProps) {
  return sonnerToast(title ?? "", {
    description,
    duration,
  })
}

function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}

export { useToast, toast }
