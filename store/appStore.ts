import { create } from "zustand";

type AppStore = {
  favorites: number[];
  compare: number[];

  loadData: () => void;

  toggleFavorite: (id: number) => void;
  toggleCompare: (id: number) => void;
};

export const useAppStore = create<AppStore>((set, get) => ({
  favorites: [],
  compare: [],

  loadData: () => {
    if (typeof window === "undefined") return;

    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const compare = JSON.parse(
      localStorage.getItem("compare") || "[]"
    );

    set({
      favorites,
      compare,
    });
  },

  toggleFavorite: (id) => {
    const favorites = get().favorites;

    const updated = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    set({
      favorites: updated,
    });
  },

  toggleCompare: (id) => {
    const compare = get().compare;

    let updated: number[];

    if (compare.includes(id)) {
      updated = compare.filter((item) => item !== id);
    } else {
      if (compare.length >= 4) {
        alert("Maximum 4 AI tools can be compared.");
        return;
      }

      updated = [...compare, id];
    }

    localStorage.setItem(
      "compare",
      JSON.stringify(updated)
    );

    set({
      compare: updated,
    });
  },
}));