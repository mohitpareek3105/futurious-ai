"use client";

import { useEffect, useState } from "react";

export function usePromptFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("promptFavorites");

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    let updated: number[];

    if (favorites.includes(id)) {
      updated = favorites.filter((item) => item !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    localStorage.setItem(
      "promptFavorites",
      JSON.stringify(updated)
    );
  };

  return {
    favorites,
    toggleFavorite,
  };
}