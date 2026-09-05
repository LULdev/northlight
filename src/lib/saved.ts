import { create } from "zustand";

const KEY = "northlight-saved";

type SavedState = {
  ids: string[];
  toggle: (slug: string) => void;
  hydrate: () => void;
};

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export const useSaved = create<SavedState>((set, get) => ({
  ids: [],
  toggle: (slug) => {
    const ids = get().ids.includes(slug) ? get().ids.filter((id) => id !== slug) : [...get().ids, slug];
    set({ ids });
    try {
      window.localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* ignore quota */
    }
  },
  hydrate: () => set({ ids: read() }),
}));
