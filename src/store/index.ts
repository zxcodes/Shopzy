import {ProductType} from '@app/types';
import {create} from 'zustand';

type CartItem = {
  product: ProductType;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  favorites: ProductType[];
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (productId: number) => void;
};

const useCartStore = create<CartStore>(set => ({
  cart: [],
  favorites: [],
  addToCart: (product, quantity) => {
    set(state => {
      if (!state.cart.some(item => item.product.id === product.id)) {
        return {
          cart: [
            ...state.cart,
            {
              product,
              quantity,
            },
          ],
        };
      }
      return state;
    });
  },
  removeFromCart: productId => {
    set(state => ({
      cart: state.cart.filter(item => item.product.id !== productId),
    }));
  },
  updateCartItemQuantity: (productId, newQuantity) => {
    set(state => ({
      cart: state.cart.map(item =>
        item.product.id === productId ? {...item, quantity: newQuantity} : item
      ),
    }));
  },
  clearCart: () => {
    set({cart: []});
  },
  addToFavorites: product => {
    set(state => {
      if (!state.favorites.some(fav => fav.id === product.id)) {
        return {
          favorites: [...state.favorites, product],
        };
      }
      return state;
    });
  },
  removeFromFavorites: productId => {
    set(state => ({
      favorites: state.favorites.filter(product => product.id !== productId),
    }));
  },
}));

export {useCartStore};
