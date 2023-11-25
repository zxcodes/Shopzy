import { ProductType } from "@app/types";
import { create } from "zustand";

type CartItem = {
  product: ProductType;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
};

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product, quantity) => {
    set((state) => ({
      cart: [
        ...state.cart,
        {
          product,
          quantity,
        },
      ],
    }));
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }));
  },
  updateCartItemQuantity: (productId, newQuantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ),
    }));
  },
  clearCart: () => {
    set({ cart: [] });
  },
}));

export default useCartStore;
