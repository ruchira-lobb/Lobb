// src/screens/CartScreen.tsx
import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import MealCard from '../components/MealCard';
import TopBar from '../components/TopBar';
import { CartItem } from '../redux/cartSlice';

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items) as CartItem[];

  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <MealCard
        meal={item}
        onToggleFav={() => dispatch(removeFromCart(item.idMeal))}
        onAddToCart={() =>
          dispatch(updateQuantity({ idMeal: item.idMeal, quantity: item.quantity + 1 }))
        }
      />
    ),
    [dispatch]
  );

  const totalPrice = items.reduce((sum: number, i) => sum + i.quantity * 1, 0);

  return (
    <View style={styles.container}>
      <TopBar />
      {items.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList data={items} keyExtractor={i => i.idMeal} renderItem={renderItem} />
          <View style={styles.footer}>
            <Text style={styles.total}>Total items: {items.length}</Text>
            <TouchableOpacity onPress={() => dispatch(clearCart())} style={styles.clearBtn}>
              <Text style={styles.clearText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 18, color: '#777' },
  footer: { padding: 12, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  total: { fontWeight: 'bold', fontSize: 16 },
  clearBtn: { backgroundColor: '#c62828', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4 },
  clearText: { color: '#fff', fontWeight: '600' },
});

export default CartScreen;
