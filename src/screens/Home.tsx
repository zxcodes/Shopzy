import {
  AppText,
  CartButtonWithIndicator,
  DropdownSelector,
  HorizontalBannerList,
  ProductCard,
  Spacer,
} from '@app/components';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {BottomScreensParamsList, ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import {SearchIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';

type HomeScreenProps = BottomTabScreenProps<
  BottomScreensParamsList,
  'HomeScreen'
>;

export default ({navigation}: HomeScreenProps): JSX.Element => {
  const [productList, setProductList] = useState<ProductType[]>();

  const isFocused = useIsFocused();

  const getProductsList = useCallback(async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();

      if (Array.isArray(data.products) && data.products.length) {
        setProductList(data.products);
      }
    } catch (error) {
      console.error('Failed to get products list!', error);
    }
  }, []);

  const horizontalBannerList = useMemo(() => {
    if (!productList || productList.length === 0) {
      return undefined;
    }

    return productList.map(product => ({
      id: product.id,
      url: product.thumbnail,
    }));
  }, [productList]);

  useEffect(() => {
    getProductsList();
  }, [isFocused]);

  return (
    <ScrollView>
      <MainContainer
        style={styles.container}
        backgroundColor={AppColors.PureWhite}
        fillHeight>
        <View style={styles.extendedHeader}>
          <Spacer space={20} />
          <FlexContainer position="rowBetween" direction="row">
            <AppText
              style={{fontSize: 22}}
              color="PureWhite"
              fontFamily="ManropeSemiBold">
              Hey, Rahul
            </AppText>
            <CartButtonWithIndicator
              quantity={0}
              onPress={() => navigation.navigate('CategoriesScreen')}
            />
          </FlexContainer>
          <Spacer space={35} />
          <View style={styles.searchInput}>
            <SearchIcon height={18} width={18} />
            <Spacer space={12} between />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={AppColors.GreyLightest}
              placeholder="Search Products or store"
            />
          </View>
          <Spacer space={35} />
          <FlexContainer position="rowBetween" direction="row">
            <DropdownSelector
              title="Delivery to"
              selectedValue="Green Way 3000, Sylhet"
              onPress={value => alert(value)}
            />
            <DropdownSelector
              title="Within"
              selectedValue="1 Hour"
              onPress={value => alert(value)}
            />
          </FlexContainer>
        </View>
        <Spacer space={27} />
        <HorizontalBannerList
          list={horizontalBannerList}
          onPress={item => alert(JSON.stringify(item))}
        />
        <Spacer space={27} />
        <PaddingContainer style={{paddingVertical: 0}}>
          <AppText fontSize="extraLarge">Recommended</AppText>
          <Spacer space={20} />
          <ProductCard
            onAddToCart={add => console.log(add)}
            onPress={onP => console.log(onP)}
            isFavorite={false}
            productDetails={productList ? productList[5] : undefined}
          />
        </PaddingContainer>
      </MainContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  extendedHeader: {
    backgroundColor: AppColors.PrimaryBlue,
    padding: 20,
  },
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchInput: {
    borderRadius: 100,
    backgroundColor: AppColors.DarkBlue,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 56,
    flex: 1,
    color: AppColors.PureWhite,
  },
});
