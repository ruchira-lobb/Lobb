// src/screens/HomeScreen.tsx
import React, { useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';
import { useMeals, Meal } from '../hooks/useMeals';
import MealCard from '../components/MealCard';
import { MealCardSkeleton } from '../components/MealCardSkeleton';
import TopBar from '../components/TopBar';

const HomeScreen: React.FC = () => {
  const { meals, loading, error, fetchMore } = useMeals();
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

  // ---------- Skeleton data ----------
  // Show 5 placeholder cards while the first page loads
  const skeletonData = Array.from({ length: 5 }, (_, i) => ({ id: `skeleton-${i}` }));

  // ---------- Pagination ----------
  const handleEndReached = () => {
    if (!loading) fetchMore();
  };

  // ---------- Render ----------
  return (
    <View style={styles.container}>
      <TopBar />

      {/* Error state */}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Failed to load meals.</Text>
        </View>
      )}

      {/* Initial load → skeleton list */}
      {loading && meals.length === 0 ? (
        <FlatList
          data={skeletonData}
          keyExtractor={item => item.id}
          renderItem={() => <MealCardSkeleton />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        // Normal data list
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
  errorBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#c62828', fontSize: 16 },
});

export default HomeScreen;
