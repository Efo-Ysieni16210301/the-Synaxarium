"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ethio-saints-app:favorites";

function readStoredFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStoredFavorites(ids: string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* ignore - favoriting is a convenience, not critical data */
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readStoredFavorites());
  }, []);

  const isFavorite = (saintId: string) => favorites.includes(saintId);

  const toggleFavorite = (saintId: string) => {
    const next = isFavorite(saintId)
      ? favorites.filter((id) => id !== saintId)
      : [...favorites, saintId];
    setFavorites(next);
    writeStoredFavorites(next);
  };

  return { favorites, isFavorite, toggleFavorite };
}
