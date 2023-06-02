import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';

const CleaningScreen = () => {
  const [cleaningPercentage, setCleaningPercentage] = useState(0);
  const rotationAnimation = new Animated.Value(0);

  const startCleaning = () => {
    // Simulating the cleaning process
    const interval = setInterval(() => {
      if (cleaningPercentage < 100) {
        setCleaningPercentage(cleaningPercentage + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    // Rotating animation
    Animated.loop(
      Animated.timing(rotationAnimation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const interpolatedRotation = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cleaning App</Text>
      <TouchableOpacity style={styles.cleanButton} onPress={startCleaning}>
        <Animated.View
          style={[styles.circularProgress, { transform: [{ rotate: interpolatedRotation }] }]}
        >
          <Text style={styles.percentage}>{cleaningPercentage}%</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cleanButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgress: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 10,
    borderColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});

export default CleaningScreen;
