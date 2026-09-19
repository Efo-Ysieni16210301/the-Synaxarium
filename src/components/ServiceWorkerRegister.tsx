'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Offline registration failures are non-fatal - the app still
        // works online, it just won't have offline caching this run.
      });
    }
  }, []);

  return null;
}
