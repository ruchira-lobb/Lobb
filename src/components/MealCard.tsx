// src/components/MealCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Meal } from '../hooks/useMeals';

interface Props {
  meal: Meal;
  onToggleFav: () => void;
  onAddToCart: () => void;
}

const MealCard: React.FC<Props> = ({ meal, onToggleFav, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        {meal.strCategory ? <Text style={styles.sub}>Category: {meal.strCategory}</Text> : null}
        {meal.strArea ? <Text style={styles.sub}>Area: {meal.strArea}</Text> : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onToggleFav} style={styles.iconBtn}>
          <Icon name="heart" size={24} color="#e53935" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddToCart} style={styles.iconBtn}>
          <Icon name="cart-plus" size={24} color="#00695c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
  },
  info: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  sub: {
    fontSize: 12,
    color: '#757575',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 8,
  },
  iconBtn: {
    marginVertical: 4,
  },
});

export default MealCard;
