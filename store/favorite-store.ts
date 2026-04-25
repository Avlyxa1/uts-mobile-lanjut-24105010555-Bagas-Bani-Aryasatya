import { BookItem } from '@/api/api';
import { create } from 'zustand';

type FavoriteState = {
  favoriteBooks: BookItem[];
  addFavoriteBook: (book: BookItem) => void;
  removeFavoriteBook: (bookKey: string) => void;
  isFavoriteBook: (bookKey: string) => boolean;
};

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteBooks: [],
  addFavoriteBook: (book) =>
    set((state) => {
      const isExist = state.favoriteBooks.some((item) => item.key === book.key);
      if (isExist) {
        return state;
      }

      return {
        favoriteBooks: [...state.favoriteBooks, book],
      };
    }),
  removeFavoriteBook: (bookKey) =>
    set((state) => ({
      favoriteBooks: state.favoriteBooks.filter((item) => item.key !== bookKey),
    })),
  isFavoriteBook: (bookKey) => get().favoriteBooks.some((item) => item.key === bookKey),
}));
