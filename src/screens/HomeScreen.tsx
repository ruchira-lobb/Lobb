// src/screens/HomeScreen.tsx
import React, { useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';
import { useMeals, Meal } from '../hooks/useMeals';
import MealCard from '../components/MealCard';
import TopBar from '../components/TopBar';

const HomeScreen: React.FC = () => {
  const { meals, loading, error, fetchMore, updateQuery } = useMeals();
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

  const handleEndReached = () => {
    if (!loading) fetchMore();
  };

  return (
    <View style={styles.container}>
      <TopBar />
      {loading && meals.length === 0 ? (
        <ActivityIndicator size="large" color="#00695c" style={styles.loader} />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={item => item.idMeal}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="small" color="#00695c" /> : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;
