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
import LottieTabIcon from '../component/lottieTabIcon'
const { width } = Dimensions.get('window');

const WaterDropTabBar = ({ state, descriptors, navigation }) => {
  const [prevIndex, setPrevIndex] = useState(state.index);
  
  const tabBarWidth = width * 0.9;
  const marginHorizontal = (width - tabBarWidth) / 2;
  
  const dropPosition = useRef(new Animated.Value(state.index * (tabBarWidth / state.routes.length))).current;
  const dropScale = useRef(new Animated.Value(1.5)).current;
  const dropStretch = useRef(new Animated.Value(1)).current;
  const dropOpacity = useRef(new Animated.Value(0.6)).current;
  
  const iconScales = useRef(
    state.routes.map((_, i) => new Animated.Value(i === state.index ? 1.2 : 1))
  ).current;
  
  const iconTranslateYs = useRef(
    state.routes.map((_, i) => new Animated.Value(i === state.index ? -8 : 0))
  ).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.spring(iconScales[state.index], {
        toValue: 1.9,
        friction: 5,
        tension: 300,
        useNativeDriver: true,
      }),
      Animated.spring(iconTranslateYs[state.index], {
        toValue: -15,
        friction: 5,
        tension: 300,
        useNativeDriver: true,
      }),
      Animated.spring(dropPosition, {
        toValue: state.index * (tabBarWidth / state.routes.length),
        friction: 5,
        tension: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  useEffect(() => {
    if (prevIndex !== state.index) {
      const movingRight = state.index > prevIndex;
      
      state.routes.forEach((_, i) => {
        const toScale = i === state.index ? 1.9 : 1;
        const toTranslateY = i === state.index ? -15 : 0;
        
        Animated.parallel([
          Animated.spring(iconScales[i], {
            toValue: toScale,
            friction: 5,
            tension: 300,
            useNativeDriver: true,
          }),
          Animated.spring(iconTranslateYs[i], {
            toValue: toTranslateY,
            friction: 5,
            tension: 300,
            useNativeDriver: true,
          })
        ]).start();
      });
      
      Animated.sequence([
        Animated.parallel([
          Animated.timing(dropScale, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(dropStretch, {
            toValue: movingRight ? 1.3 : 0.7,
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
        Animated.parallel([
          Animated.timing(dropPosition, {
            toValue: state.index * (tabBarWidth / state.routes.length),
            duration: 400,
            useNativeDriver: true,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          Animated.timing(dropStretch, {
            toValue: movingRight ? 0.7 : 1.3,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.in(Easing.cubic),
          }),
        ]),
        Animated.parallel([
          Animated.spring(dropScale, {
            toValue: 1.5,
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
  }, [state.index]);

  const tabWidth = tabBarWidth / state.routes.length;
  
  const getTabIcon = (routeName, isFocused) => {
    const iconMap = {
      Luvu: isFocused ? 'home' : 'home-outline',
      Profile: isFocused ? 'person' : 'person-outline',
      Comment: isFocused ? 'settings' : 'settings-outline',
    };
    
    return iconMap[routeName] || 'apps';
  };

  return (
    <View style={[styles.container, { width: tabBarWidth, marginHorizontal }]}> 
      <Animated.View
        style={[
          styles.waterDrop,
          {
            opacity: dropOpacity,
            transform: [
              { translateX: Animated.add(dropPosition, new Animated.Value(tabWidth / 2 - 25)) },
              { scale: dropScale },
              { scaleX: dropStretch },
            ],
          },
        ]}
      />
      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => {navigation.navigate(route.name), console.log(route.name)}}
              style={[styles.tab, { width: tabWidth }]}
            >
              <Animated.View 
                style={{ transform: [{ scale: iconScales[index] }, { translateY: iconTranslateYs[index] }] }}
              >
                <LottieTabIcon
                  routeName={route.name}
                  isFocused={isFocused}
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
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 10,
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
    width: 50,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    zIndex: -1,
    top: -28
  },
});

export default WaterDropTabBar;
