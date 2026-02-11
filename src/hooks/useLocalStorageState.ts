"use client";

import { useEffect, useMemo, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        setState(JSON.parse(raw) as T);
      }
    } catch {
      setState(initialValue);
    } finally {
      setHydrated(true);
    }
  }, [initialValue, key]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(state));
  }, [hydrated, key, state]);

  return useMemo(() => ({ state, setState, hydrated }), [hydrated, state]);
}
