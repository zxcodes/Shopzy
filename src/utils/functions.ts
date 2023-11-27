import Toast from 'react-native-toast-message';

const showToast = (text1: string, text2?: string) => {
  Toast.show({
    type: 'info',
    text1: text1,
    text2: text2,
    autoHide: true,
    visibilityTime: 2000,
    topOffset: 60,
    position: 'top',
  });
};

const showProductRemovedToast = (productName: string) => {
  showToast(
    'Product Removed',
    `${productName} has been removed from your cart!`
  );
};

const showProductAddedToast = (productName: string) => {
  showToast('Product Added', `${productName} has been added to your cart!`);
};

export {showToast, showProductAddedToast, showProductRemovedToast};
