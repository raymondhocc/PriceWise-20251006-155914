import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Product, StatCardData, PriceHistory } from '@/lib/types';
import { statCardsData, productData, priceHistoryData } from '@/lib/mock-data';
type AppState = {
  stats: StatCardData[];
  products: Product[];
  priceHistory: PriceHistory[];
  isLoading: boolean;
};
type AppActions = {
  setLoading: (isLoading: boolean) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  setProducts: (products: Product[]) => void;
  updateStats: (newStats: StatCardData[]) => void;
  updatePriceHistory: (newPriceHistory: PriceHistory[]) => void;
};
export const useAppStore = create<AppState & AppActions>()(
  immer((set) => ({
    stats: statCardsData,
    products: productData,
    priceHistory: priceHistoryData,
    isLoading: false,
    setLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),
    addProduct: (product) =>
      set((state) => {
        if (!state.products.some((p) => p.url === product.url)) {
          state.products.unshift(product);
        }
      }),
    removeProduct: (productId) =>
      set((state) => {
        state.products = state.products.filter((p) => p.id !== productId);
      }),
    setProducts: (products) =>
      set((state) => {
        state.products = products;
      }),
    updateStats: (newStats) =>
      set((state) => {
        state.stats = newStats;
      }),
    updatePriceHistory: (newPriceHistory) =>
      set((state) => {
        state.priceHistory = newPriceHistory;
      }),
  }))
);