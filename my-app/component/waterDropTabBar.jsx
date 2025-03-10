import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WaterDropTabBar = ({ state, descriptors, navigation }) => {
  // Store the previous and current tab index
  const [prevIndex, setPrevIndex] = useState(state.index);
  
  // Animation value for the water drop position
  const dropPosition = useRef(new Animated.Value(state.index * (width / state.routes.length))).current;
  
  // Animation values for more complex water drop animation
  const dropScale = useRef(new Animated.Value(1)).current;
  const dropStretch = useRef(new Animated.Value(1)).current;
  const dropOpacity = useRef(new Animated.Value(0.6)).current;
  
  // Update position when tab changes
  useEffect(() => {
    if (prevIndex !== state.index) {
      // Calculate direction of movement
      const movingRight = state.index > prevIndex;
      
      // Enhanced animation sequence
      Animated.sequence([
        // Initial preparation - slightly compress and increase opacity
        Animated.parallel([
          Animated.timing(dropScale, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(dropStretch, {
            toValue: movingRight ? 1.3 : 0.7, // Stretch horizontally in direction of movement
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(dropOpacity, {
            toValue: 0.8,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        
        // Main movement with acceleration and stretching
        Animated.parallel([
          Animated.timing(dropPosition, {
            toValue: state.index * (width / state.routes.length),
            duration: 400,
            useNativeDriver: true,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Improved acceleration curve
          }),
          Animated.timing(dropStretch, {
            toValue: movingRight ? 0.7 : 1.3, // Change stretch direction during movement
            duration: 300,
            useNativeDriver: true,
            easing: Easing.in(Easing.cubic),
          }),
        ]),
        
        // Final settling animation
        Animated.parallel([
          Animated.spring(dropScale, {
            toValue: 1,
            friction: 5,
            tension: 300,
            useNativeDriver: true,
          }),
          Animated.spring(dropStretch, {
            toValue: 1,
            friction: 5,
            tension: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dropOpacity, {
            toValue: 0.6,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
      
      setPrevIndex(state.index);
    }
  }, [state.index, dropPosition, dropScale, dropStretch, dropOpacity, prevIndex]);

  // Calculate tabWidth based on number of tabs
  const tabWidth = width / state.routes.length;
  
  // Get icons for tabs
  const getTabIcon = (routeName, isFocused) => {
    const iconMap = {
      Home: isFocused ? 'home' : 'home-outline',
      Profile: isFocused ? 'person' : 'person-outline',
      Settings: isFocused ? 'settings' : 'settings-outline',
      Favorites: isFocused ? 'heart' : 'heart-outline',
    };
    
    return iconMap[routeName] || 'apps';
  };

  return (
    <View style={styles.container}>
      {/* Water drop indicator */}
      <Animated.View
        style={[
          styles.waterDrop,
          {
            opacity: dropOpacity,
            transform: [
              { 
                translateX: Animated.add(
                  dropPosition, 
                  new Animated.Value(tabWidth / 2 - 20) // Center on tab - half of bubble width
                ) 
              },
              { scale: dropScale },
              { scaleX: dropStretch }, // Horizontal stretching for water drop effect
            ],
          },
        ]}
      />
      
      {/* Tab buttons */}
      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Animation for icon scaling and color
          const iconScale = useRef(new Animated.Value(isFocused ? 1.1 : 1)).current;
          
          useEffect(() => {
            Animated.spring(iconScale, {
              toValue: isFocused ? 1.1 : 1,
              friction: 5,
              tension: 300,
              useNativeDriver: true,
            }).start();
          }, [isFocused]);

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[styles.tab, { width: tabWidth }]}
            >
              <Animated.View 
                style={[
                  styles.iconContainer,
                  {
                    transform: [{ scale: iconScale }]
                  }
                ]}
              >
                <Ionicons 
                  name={getTabIcon(route.name, isFocused)} 
                  size={24} 
                  color={isFocused ? '#2E86DE' : '#8395A7'} 
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    flexDirection: 'row',
    position: 'relative',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabs: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterDrop: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    top: 10,
    zIndex: -1,
  },
});

export default WaterDropTabBar;