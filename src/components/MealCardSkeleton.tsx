// src/components/MealCardSkeleton.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width } = Dimensions.get('window');

export const MealCardSkeleton: React.FC = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.info}>
          <View style={styles.title} />
          <View style={styles.sub} />
          <View style={styles.sub} />
        </View>
        <View style={styles.actions}>
          <View style={styles.iconBtn} />
          <View style={styles.iconBtn} />
        </View>
      </View>
    </SkeletonPlaceholder>
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
    padding: 8,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    width: width * 0.4,
    height: 20,
    borderRadius: 4,
    marginBottom: 6,
  },
  sub: {
    width: width * 0.3,
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 8,
  },
  iconBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginVertical: 4,
  },
});
