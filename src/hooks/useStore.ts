import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { loadIndex } from '../lib/bibleData';
import { subscribe } from '../lib/storage';
import type { BibleIndex } from '../lib/types';

/**
 * Liest einen Wert aus dem lokalen Speicher und hält ihn aktuell, sobald
 * irgendwo in der App geschrieben wird.
 *
 * **Wichtig:** `read` muss bei unverändertem Speicher dasselbe Objekt
 * zurückgeben. Die Funktionen in `lib/storage` erfüllen das über ihre
 * Memoisierung. Ein im Selektor notiertes Literal wie `?? []` erzeugt dagegen
 * bei jedem Aufruf einen neuen Wert – React bricht das mit „Maximum update
 * depth exceeded“ ab. Fallwerte gehören deshalb in die Speicherschicht.
 */
export function usePersisted<T>(read: () => T): T {
  const getSnapshot = useCallback(read, [read]);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

/** Lädt den Bibel-Index (Buchliste). */
export function useBibleIndex(): AsyncState<BibleIndex> {
  const [state, setState] = useState<AsyncState<BibleIndex>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;
    loadIndex().then(
      (data) => active && setState({ data, error: null, loading: false }),
      (error: Error) => active && setState({ data: null, error, loading: false }),
    );
    return () => {
      active = false;
    };
  }, []);

  return state;
}

/** Führt eine asynchrone Ladefunktion aus und verwirft veraltete Ergebnisse. */
export function useAsync<T>(factory: () => Promise<T> | null, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, error: null, loading: true });

  useEffect(() => {
    let active = true;
    const promise = factory();
    if (!promise) {
      setState({ data: null, error: null, loading: false });
      return;
    }
    setState((prev) => ({ ...prev, loading: true }));
    promise.then(
      (data) => active && setState({ data, error: null, loading: false }),
      (error: Error) => active && setState({ data: null, error, loading: false }),
    );
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
