"use client";

import { useState, useCallback } from "react";

export function useClipSelection() {
  const [selectedClips, setSelectedClips] = useState<Set<string>>(new Set());

  const toggleClip = useCallback((clipId: string) => {
    setSelectedClips((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(clipId)) {
        newSet.delete(clipId);
      } else {
        newSet.add(clipId);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback((clipIds: string[]) => {
    setSelectedClips((prev) => {
      const allSelected = clipIds.every((id) => prev.has(id));
      if (allSelected) {
        return new Set();
      }
      return new Set(clipIds);
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedClips(new Set());
  }, []);

  const isSelected = useCallback(
    (clipId: string) => selectedClips.has(clipId),
    [selectedClips],
  );

  const isAllSelected = useCallback(
    (clipIds: string[]) => {
      if (clipIds.length === 0) return false;
      return clipIds.every((id) => selectedClips.has(id));
    },
    [selectedClips],
  );

  return {
    selectedClips,
    toggleClip,
    selectAll,
    clearSelection,
    isSelected,
    isAllSelected,
  };
}
