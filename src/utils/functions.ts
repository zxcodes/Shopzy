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

export {showToast};
