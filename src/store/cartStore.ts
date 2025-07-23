import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  getCart,
} from "@/services/website/cartServices";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface CartState {
  items: CartItem[];
  shop_info: { id: number; name: string; url: string }[];
  selectedItems: number[]; // key dạng `${productId}-${variantId}`
  loading: boolean;

  getCart: () => Promise<{
    status: string;
    message: string;
    items: CartItem[];
    shop_info: { id: number; name: string; url: string }[];
  }>;
  setCart: (items: CartItem[]) => void;

  addToCart: (params: {
    productId: number;
    variantId: number;
    quantity: number;
    shopId: number;
    unitPriceAtTime: number;
  }) => Promise<void>;

  removeFromCart: (
    variantIds: number[]
  ) => Promise<{ status: string; message: string }>;
  updateQuantity: (
    variantId: number,
    quantity: number,
  ) => Promise<{ status: string; message: string }>;
  updateItemStock: (variantId: number,quantity:number, stock: number) => void;

  clearCart: () => Promise<void>;

  // Chọn sản phẩm
  toggleSelectItem: (key: number) => void;
  isItemSelected: (key: number) => boolean;
  selectAll: (keys: number[]) => void;
  clearSelection: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shop_info: [],
      selectedItems: [],
      loading: false,
    updateItemStock: (variantId: number, quantity: number, stock: number) => {
  set((state) => ({
    items: state.items.map((item) =>
      item.variantId === variantId
        ? {
            ...item,
            product_stock: stock,
            quantity: Math.min(quantity, stock), // ✅ đảm bảo quantity không vượt stock
          }
        : item
    ),
  }));
},

      getCart: async () => {
        set({ loading: true });
        try {
          const res = await getCart();
          if (res.status === "success") {
            set({
              items: res.items,
              shop_info: res.shop_info,
            });
          }
          return res;
        } finally {
          set({ loading: false });
        }
      },

      setCart: (items) => set({ items }),

      addToCart: async (item) => {
        set({ loading: true });
        try {
          const res = await addItem(item);
          if (res.status === "success" && res.data) {
            set((state) => {
              const existingIndex = state.items.findIndex(
                (i) =>
                  i.productId === res.data.productId &&
                  i.variantId === res.data.variantId
              );

              if (existingIndex !== -1) {
                const updatedItems = [...state.items];
                updatedItems[existingIndex] = res.data;
                return { items: updatedItems };
              }
              set({
                selectedItems: [...state.selectedItems, res.data.variantId],
              });
              return { items: [...state.items, res.data] };
            });
            toast.success(res.message);
          }
        } catch (error) {
          const axiosError = error as AxiosError<{
            status: string;
            message: string;
          }>;
          toast.error(axiosError.response?.data.message);
        } finally {
          set({ loading: false });
        }
      },

      removeFromCart: async (variantIds) => {
        set({ loading: true });
        try {
          const res = await removeItem(variantIds);
          if (res.status === "success") {
            set((state) => ({
              items: state.items.filter(
                (i) => !variantIds.includes(i.variantId)
              ),
              selectedItems: state.selectedItems.filter(
                (i) => !variantIds.includes(i)
              ),
            }));
          } else {
            toast.error(res.message);
          }
          return res;
        } finally {
          set({ loading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        set({ loading: true });
        try {
          const res = await updateQuantity(variantId, quantity);
          if (res.status === "success") {
            set((state) => ({
              items: state.items.map((i) => {
                if (i.variantId === variantId) {
                  return { ...i, quantity };
                }
                return i;
              }),
            }));
          } else {
            toast.error(res.message);
          }
          return res;
        } finally {
          set({ loading: false });
        }
      },

      clearCart: async () => {
        set({ loading: true });
        try {
          const cart = await clearCart();
          set({ items: cart });
        } finally {
          set({ loading: false });
        }
      },

      // === Chọn sản phẩm ===
      toggleSelectItem: (key) => {
        const { selectedItems } = get();
        const isSelected = selectedItems.includes(key);
        if (isSelected) {
          set({
            selectedItems: selectedItems.filter((k) => k !== key),
          });
        } else {
          set({
            selectedItems: [...selectedItems, key],
          });
        }
      },

      isItemSelected: (key) => {
        return get().selectedItems.includes(key);
      },

      selectAll: (keys) => {
        set({ selectedItems: keys });
      },

      clearSelection: () => {
        set({ selectedItems: [] });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        selectedItems: state.selectedItems,
        shop_info: state.shop_info,
      }),
    }
  )
);
