import { useState, useEffect, useMemo, useCallback } from "react";

export interface UseKonamiCodeConfig {
  sequence: number[];
}

export function useKonamiCode(
  fn: () => void,
  { sequence }: UseKonamiCodeConfig
) {
  const [typedSequence, typedSequenceSet] = useState<number[]>([]);

  const hasTypedAllCharacters = useMemo(
    () => sequence.length === typedSequence.length,
    [sequence, typedSequence]
  );

  const typedSequenceMatchesWithSequence = useMemo(
    () =>
      typedSequence.reduce(
        (previous, current, index) => previous && sequence[index] === current,
        true
      ),
    [typedSequence, sequence]
  );

  const listener = useCallback(
    (event: KeyboardEvent) =>
      sequence.includes(event.keyCode) &&
      typedSequenceSet((latest) => [...latest, event.keyCode]),
    [sequence]
  );

  useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [listener]);

  useEffect(() => {
    if (hasTypedAllCharacters) {
      typedSequenceMatchesWithSequence && fn();
      typedSequenceSet([]);
    }
  }, [hasTypedAllCharacters, typedSequenceMatchesWithSequence, fn]);
}
