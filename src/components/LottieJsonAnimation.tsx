// src/components/LottieJsonAnimation.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ViewStyle,
} from 'react-native';

import LottieView from 'lottie-react-native';

interface Props {
  style?: ViewStyle;
  loop?: boolean;
}

const { width } = Dimensions.get('window');

const LottieJsonAnimation: React.FC<Props> = ({
  style,
  loop = true,
}) => {

  const source = require('../assets/animations/Loading Animation.json');

  return (
    <View style={[styles.container, style]}>
      <LottieView
        source={source}
        autoPlay
        loop={loop}
        resizeMode="contain"
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  animation: {
    width: width * 0.5,
    height: width * 0.5,
  },
});

export default LottieJsonAnimation;