import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { seedEvents, seedCards } from '@/data/seed.js';

const useLocal = create(persist((set) => ({
  events: seedEvents,
  cards: seedCards,
  init: () => set((state) => ({
    events: state.events || seedEvents,
    cards: state.cards || seedCards
  })),
  setEvents: (ev) => set({ events: ev }),
  setCards: (cards) => set({ cards })
}), { name: 'dotin-demo' }));

export default useLocal;
