import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import LottieMan from '../../component/lottieMan'
import LottieQuestion from '../../component/lottieQuestion'
import LottieWoman from '../../component/lottieWoman'
import LottiePeople from '../../component/lottiePeople'
import { ThemeProvider, ThemeContext } from "../../content/ThemeContext";
import { useContext } from "react";
import { Picker } from '@react-native-picker/picker';
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
import Color from '../../content/colors'
const WIDTH = 400

const questions = [
    {
        id: "0",
        question: 'Cinsiyetini öğrenmekle başlayalım',
    },
    {
        id: "1",
        question: 'Peki, Kimleri arıyorsun?',
    },
    {
        id: "2",
        question: 'Ne tür bir ilişki arıyorsun?'
    },
    {
        id: '3',
        question: 'Kaç yaşındasın?'
    },
    {
        id: '4',
        question: 'Kaç yaşındasın?'
    },
    {
        id: '5',
        question: 'Nerede yaşıyorsun?'
    }

];

export default function Hello() {
    const flatListRef = useRef(null)
    const scrollX = useSharedValue()
    const [screen, setScreen] = useState(0)
    const { colors, setColors } = useContext(ThemeContext);
    const [lock, setLock] = useState(Array(10).fill(false));
    const [currentItemId, setCurrentItemId] = useState(0);
    const [metrics, setMetrics] = useState({
        gender: true,
        choose: 0,
        type: 0,
        age: 0,
        height: 0,
        living: '',
        interstin: [],
        weight: 0,
        useSmoke: false,
        useAlchol: false,
        haveChild: false,
        havePet: false
        
    })
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrollX.value = withSpring(event.contentOffset.x)
        }
    })

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const newScreenId = viewableItems[0].item.id;
            setScreen(newScreenId);
            setCurrentItemId(parseInt(newScreenId));
        }
    }).current;

    const changeColor = (key, value) => {
        setColors((prev) => ({ ...prev, [key]: value }));
    };
    const goToNextQuestion = () => {
        if (currentItemId < questions.length - 1) {
            const nextIndex = currentItemId + 1;
            
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true
            });
        }
    };

    const toggleLock = (index) => {
        setLock((prevLock) => {
          const newLock = [...prevLock];
          newLock[index] = true;
          return newLock;
        });
    };

    const handleButtonPress = (option, index) => {
        console.log("Selected option:", option);
        goToNextQuestion();
        toggleLock(index)
        
        console.log(lock, index)
    };

    const renderItem = ({ item }) => {
        if (item.id == "0") {
            return (
                <View style={{ backgroundColor: 'red', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center'}}>
                        {item.question}
                    </Text>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            changeColor("bgColor", Color.man.background);
                            changeColor("bColor", Color.man.button);
                            changeColor("iColor", Color.man.input);
                            changeColor("tColor", Color.man.text);
                            handleButtonPress('Erkek', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                gender: true,
                            }));
                              
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottieMan />
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize: 25, textAlign:'center', fontFamily: 'RMM'}}>Erkek</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            changeColor("bgColor", Color.woman.background);
                            changeColor("bColor", Color.woman.button);
                            changeColor("iColor", Color.woman.input);
                            changeColor("tColor", Color.woman.text);
                            handleButtonPress('Kız', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                gender: false,
                            }));
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottieWoman />
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center'}}>Kız</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            )
        }
        if (item.id == "1" && lock[0]) {
            return (
                <View style={{ backgroundColor:'blue', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: 'white'}}>
                        {item.question}
                    </Text>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Erkek', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                choose: 0,
                            }));
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottieMan />
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize: 25, textAlign:'center', fontFamily: 'RMM'}}>Erkek</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Kız', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                choose: 1,
                            }));
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottieWoman />
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center'}}>Kız</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Fark etmez', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                choose: 1,
                            }));
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottiePeople />
                            <View style={{width:'65%'}}>
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center'}}>Her ikiside</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            )
        }
        else if (item.id == "2" && lock[1]) {
            return (
                <View style={{ backgroundColor:'green', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center'}}>
                        {item.question}
                    </Text>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Ciddi', item.id);
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottieMan />
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize: 25, textAlign:'center', fontFamily: 'RMM'}}>Ciddi</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Rahat', item.id);
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottieWoman />
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center'}}>Rahat</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Her ikiside', item.id);
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottiePeople />
                            <View style={{width:'65%'}}>
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center'}}>Her ikiside</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            )
        }
        else if (item.id == "3" && lock[2]){
            return (
                <View style={{ backgroundColor:'green', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center'}}>
                        {item.question}
                    </Text>
                    <View style={[style.pickerContainer, { backgroundColor: colors.iColor }]}>
                        <Picker
                            selectedValue={metrics.age}
                            onValueChange={(itemValue) => {
                                setMetrics(prevMetrics => ({
                                  ...prevMetrics,
                                  age: itemValue,
                                }));
                            }}
                            style={[style.picker, {color: colors.tColor}]}
                        >
                            <Picker.Item label="Seçiniz..." value="18" style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            {Array.from({ length: 81 }, (_, i) => (
                                <Picker.Item key={i} label={`${18 + i}`} value={parseInt(`${18 + i}`)} style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            ))}
                        </Picker>
                    </View>
                        <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                            onPress={()=> {
                                handleButtonPress('Rahat', item.id);
                            }}
                        >
                            <View style={style.buttonContainer}>
                                <View style={{width:'100%'}}>
                                    <Text style={{fontSize: 20, fontFamily: 'RMM', textAlign:'center'}}>Evet {metrics.age} yaşındayım</Text>
                                </View>
                            </View>
                        </Pressable>
                </View>
            )
        }
        return null;
    };
    console.log(metrics.gender)
    return (
    <Animated.View entering={FadeIn} style={[style.container]}>
        <LottieQuestion />
        <Animated.FlatList
            entering={FadeIn}
            exiting={FadeOut}
            ref={flatListRef}
            data={questions}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            onScroll={scrollHandler}
            decelerationRate={1}
            snapToInterval={WIDTH}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            getItemLayout={(data, index) => (
                {length: WIDTH, offset: WIDTH * index, index}
            )}
            scrollEnabled={true}
        />
    </Animated.View>
    )
}

const style = StyleSheet.create({
    container: {
        width: WIDTH,
        alignItems: "center",
        justifyContent:'center',
    },
    button: {
        width: "75%",
        height: 50,
        borderRadius: 15,
        borderWidth: 2,
        marginVertical: 10,
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        position:'relative', 
        alignItems:'center', 
        paddingHorizontal: 15,
    },
    pickerContainer: {
        width: '80%',
        backgroundColor: '#656565',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#252525',
        overflow: 'hidden',
        justifyContent: 'center',
      },
      picker: {
        width: '100%',
        height: 75,
        textAlign:'center',
      },
})