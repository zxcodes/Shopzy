type RootStackParamsList = {
  ProductDetails: ProductType;
  ShoppingCart: undefined;
  BottomNavBar: BottomScreensParamsList;
};

type BottomScreensParamsList = {
  HomeScreen: undefined;
  CategoriesScreen: undefined;
  FavoritesScreen: undefined;
  MoreScreen: undefined;
};

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type ProductsList = ProductType[];

export type {
  BottomScreensParamsList,
  RootStackParamsList,
  ProductType,
  ProductsList,
};
