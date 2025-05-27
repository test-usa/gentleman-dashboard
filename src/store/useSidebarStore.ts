import { create } from "zustand"

interface SidebarState {
  isOpen: boolean
  isMobile: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
  setMobile: (isMobile: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  isMobile: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  setMobile: (isMobile) => set({ isMobile }),
}))
