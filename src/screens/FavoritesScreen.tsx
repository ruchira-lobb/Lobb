// src/screens/FavoritesScreen.tsx
import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleFavorite } from '../redux/favoritesSlice';
import { addToCart } from '../redux/cartSlice';
import MealCard from '../components/MealCard';
import { Meal } from '../hooks/useMeals';
import TopBar from '../components/TopBar';

const FavoritesScreen: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ item }: { item: Meal }) => (
      <MealCard
        meal={item}
        onToggleFav={() => dispatch(toggleFavorite(item))}
        onAddToCart={() => dispatch(addToCart(item))}
      />
    ),
    [dispatch]
  );

  return (
    <View style={styles.container}>
      <TopBar />
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.idMeal}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  empty: { marginTop: 20, textAlign: 'center', color: '#757575' },
});

export default FavoritesScreen;
