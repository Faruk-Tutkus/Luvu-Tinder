import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieHome from '../component/lottieHome'
import Login from "./(auth)/login"
import Register from "./(auth)/register"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    FadeIn, FadeOut,
    BounceIn,
    SlideOutDown,
    useAnimatedScrollHandler
} from 'react-native-reanimated';

const WIDTH = 400
const pages = [
    { id: "1", title: "Login", backgroundColor: "transparant" },
    { id: "2", title: "Register", backgroundColor: "transparant" },
];

export default function Starting() {
    const arr = ['Yeni insanlarla tanış, eğlen, arkadaşlık kur!', 'Hayatına renk kat, yeni arkadaşlıklar keşfet!', 'Eğlenceli sohbetler, samimi arkadaşlıklar burada!']
    const scrollX = useSharedValue()
    const flatListRef = useRef(null)
    const [screen, setScreen] = useState(null)
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
          scrollX.value = withSpring(event.contentOffset.x)
        }
    })
    //const { setBgColor } = useContext(ThemeContext);
    
    const renderItem = ({ item }) => {
        if (item.id === "1") {
            return (
                <View style={{ backgroundColor: item.backgroundColor, width: WIDTH, height: 625 }}>
                    <Register />
                </View>
            );
        } else {
            return (
                <View style={{ backgroundColor: item.backgroundColor, width: WIDTH, height: 675 }}>
                    <Login />
                </View>
            );
        }
    };
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setScreen(viewableItems[0].item.id);
        }
      }).current;
    
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={[style.container]}>
            <LottieHome />
            <Text style={style.text}>{arr[Math.round(Math.random() * (arr.length - 1))]}</Text>
            <Animated.FlatList
                ref={flatListRef}
                data={pages}
                keyExtractor={(item) => item.id}
                horizontal
                onScroll={scrollHandler}
                decelerationRate={1}
                snapToInterval={WIDTH}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            />
        </Animated.View>
    )
}

const style = StyleSheet.create({
    container: {
        width: WIDTH,
        alignContent:'center',
        alignItems:'center',
    },
    text: {
        fontFamily: 'Love',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 5
    }
})