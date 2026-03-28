import { create } from "zustand";

interface ClipSelectionState {
  selectedClips: Set<string>;
  toggleClip: (clipId: string) => void;
  selectAll: (clipIds: string[]) => void;
  clearSelection: () => void;
  isSelected: (clipId: string) => boolean;
  isAllSelected: (clipIds: string[]) => boolean;
}

export const useClipSelectionStore = create<ClipSelectionState>((set, get) => ({
  selectedClips: new Set(),

  toggleClip: (clipId: string) => {
    set((state) => {
      const newSet = new Set(state.selectedClips);
      if (newSet.has(clipId)) {
        newSet.delete(clipId);
      } else {
        newSet.add(clipId);
      }
      return { selectedClips: newSet };
    });
  },

  selectAll: (clipIds: string[]) => {
    set((state) => {
      const allSelected = clipIds.every((id) => state.selectedClips.has(id));
      if (allSelected) {
        return { selectedClips: new Set() };
      }
      return { selectedClips: new Set(clipIds) };
    });
  },

  clearSelection: () => {
    set({ selectedClips: new Set() });
  },

  isSelected: (clipId: string) => {
    return get().selectedClips.has(clipId);
  },

  isAllSelected: (clipIds: string[]) => {
    if (clipIds.length === 0) return false;
    return clipIds.every((id) => get().selectedClips.has(id));
  },
}));
