"use client";

import { useEffect, useState } from "react";

export function useCompare() {
  const [compare, setCompare] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("compare");

    if (stored) {
      setCompare(JSON.parse(stored));
    }
  }, []);

  const toggleCompare = (id: number) => {
    let updated: number[];

    if (compare.includes(id)) {
      updated = compare.filter((item) => item !== id);
    } else {
      if (compare.length >= 4) {
        alert("You can compare maximum 4 AI tools.");
        return;
      }

      updated = [...compare, id];
    }

    setCompare(updated);
    localStorage.setItem("compare", JSON.stringify(updated));
  };

  const isCompared = (id: number) => {
    return compare.includes(id);
  };

  return {
    compare,
    toggleCompare,
    isCompared,
  };
}