import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

type AppStore = {
  favorites: number[];
  compare: number[];
  isLoadingFavorites: boolean;

  loadData: () => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
  toggleCompare: (id: number) => void;
};

function readStoredIds(key: string): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]");

    return Array.isArray(value)
      ? value.filter((item): item is number => typeof item === "number")
      : [];
  } catch {
    return [];
  }
}

export const useAppStore = create<AppStore>((set, get) => ({
  favorites: [],
  compare: [],
  isLoadingFavorites: true,

  loadData: async () => {
    if (typeof window === "undefined") {
      return;
    }

    const compare = readStoredIds("compare");
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const favorites = readStoredIds("favorites");

      set({
        favorites,
        compare,
        isLoadingFavorites: false,
      });

      return;
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("tool_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Failed to load favorites:", error.message);

      const favorites = readStoredIds(`favorites:${user.id}`);

      set({
        favorites,
        compare,
        isLoadingFavorites: false,
      });

      return;
    }

    const favorites = (data ?? []).map(
      (item) => Number(item.tool_id)
    );

    localStorage.setItem(
      `favorites:${user.id}`,
      JSON.stringify(favorites)
    );

    set({
      favorites,
      compare,
      isLoadingFavorites: false,
    });
  },

  toggleFavorite: async (id) => {
    const currentFavorites = get().favorites;

    const isRemoving = currentFavorites.includes(id);

    const updated = isRemoving
      ? currentFavorites.filter((item) => item !== id)
      : [...currentFavorites, id];

    // Optimistic UI update
    set({
      favorites: updated,
    });

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

      return;
    }

    localStorage.setItem(
      `favorites:${user.id}`,
      JSON.stringify(updated)
    );

    if (isRemoving) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("tool_id", id);

      if (error) {
        console.error("Failed to remove favorite:", error.message);
        set({ favorites: currentFavorites });
      }

      return;
    }

    const { error } = await supabase
      .from("favorites")
      .upsert(
        {
          user_id: user.id,
          tool_id: id,
        },
        {
          onConflict: "user_id,tool_id",
        }
      );

    if (error) {
      console.error("Failed to add favorite:", error.message);
      set({ favorites: currentFavorites });
    }
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