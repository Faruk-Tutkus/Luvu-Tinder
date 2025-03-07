import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import LottieMan from '../../component/lottieMan'
import LottieQuestion from '../../component/lottieQuestion'
import LottieWoman from '../../component/lottieWoman'
import LottiePeople from '../../component/lottiePeople'
import { ThemeProvider, ThemeContext } from "../../content/ThemeContext";
import { useContext } from "react";
import Living from "../../content/living"

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
        question: 'Boyun kaç cm?'
    },
    {
        id: '5',
        question: 'Nerede yaşıyorsun?'
    },
    {
        id: '6',
        question: 'Eğitim durumun nedir?'
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
        age: 18,
        height: 100,
        country: '',
        city: '',
        intersting: [],
        weight: 25,
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
        //CİNSİYET
        if (item.id == "0") {
            return (
                <View style={{ backgroundColor: 'red', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor}}>
                        {item.question}
                    </Text>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            changeColor("bgColor", Color.man.background);
                            changeColor("bColor", Color.man.button);
                            changeColor("iColor", Color.man.input);
                            changeColor("tColor", Color.man.text);
                            changeColor("btColor", Color.man.btext);
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
                                <Text style={{fontSize: 25, textAlign:'center', fontFamily: 'RMM', color: colors.btColor}}>Erkek</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            changeColor("bgColor", Color.woman.background);
                            changeColor("bColor", Color.woman.button);
                            changeColor("iColor", Color.woman.input);
                            changeColor("tColor", Color.woman.text);
                            changeColor("btColor", Color.woman.btext);
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
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Kız</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            )
        }
        //YÖNELİM
        if (item.id == "1" && lock[0]) {
            return (
                <View style={{ backgroundColor:'blue', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor}}>
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
                                <Text style={{fontSize: 25, textAlign:'center', fontFamily: 'RMM', color: colors.btColor}}>Erkek</Text>
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
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Kız</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Fark etmez', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                choose: 2,
                            }));
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <LottiePeople />
                            <View style={{width:'65%'}}>
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Fark Etmez</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            )
        }
        //İLİŞKİ TÜRÜ
        else if (item.id == "2" && lock[1]) {
            return (
                <View style={{ backgroundColor:'green', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor}}>
                        {item.question}
                    </Text>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Ciddi', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                type: 0,
                            }));
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <View style={{width:'100%'}}>
                                <Text style={{fontSize: 25, textAlign:'center', fontFamily: 'RMM', color: colors.btColor}}>Ciddi</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Rahat', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                type: 1,
                            }));
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <View style={{width:'100%'}}>
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Rahat</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                        onPress={()=> {
                            handleButtonPress('Toksik', item.id);
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                type: 2,
                            }));
                        }}
                    >
                        <View style={style.buttonContainer}>
                            <View style={{width:'100%'}}>
                                <Text style={{fontSize: 25, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Toksik</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            )
        }
        //YAŞ
        else if (item.id == "3" && lock[2]){
            return (
                <View style={{ backgroundColor:'green', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor}}>
                        {item.question}
                    </Text>
                    <View style={[style.pickerContainer, { backgroundColor: colors.bColor }]}>
                        <Picker
                            selectedValue={metrics.age}
                            onValueChange={(itemValue) => {
                                setMetrics(prevMetrics => ({
                                  ...prevMetrics,
                                  age: itemValue,
                                }));
                            }}
                            style={[style.picker, {color: colors.btColor}]}
                        >
                            <Picker.Item label="Seçiniz..." value='18' style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            {Array.from({ length: 81 }, (_, i) => (
                                <Picker.Item key={i} label={`${18 + i}`} value={parseInt(`${18 + i}`)} style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            ))}
                        </Picker>
                    </View>
                        <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                            onPress={()=> {
                                handleButtonPress('Yaş', item.id);
                            }}
                        >
                            <View style={style.buttonContainer}>
                                <View style={{width:'100%'}}>
                                    <Text style={{fontSize: 20, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Evet {metrics.age} yaşındayım</Text>
                                </View>
                            </View>
                        </Pressable>
                </View>
            )
        }
        //BOY
        else if (item.id == "4" && lock[3]){
            return (
                <View style={{ backgroundColor:'green', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor}}>
                        {item.question}
                    </Text>
                    <View style={[style.pickerContainer, { backgroundColor: colors.bColor }]}>
                        <Picker
                            selectedValue={metrics.height}
                            onValueChange={(itemValue) => {
                                setMetrics(prevMetrics => ({
                                  ...prevMetrics,
                                  height: itemValue,
                                }));
                            }}
                            style={[style.picker, {color: colors.btColor}]}
                        >
                            <Picker.Item label="Seçiniz..." value="" style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            {Array.from({ length: 100 }, (_, i) => (
                                <Picker.Item key={i} label={`${100 + i} cm`} value={parseInt(`${100 + i} cm`)} style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            ))}
                        </Picker>
                    </View>
                        <Pressable style={[style.button, {backgroundColor: colors.bColor}]}
                            onPress={()=> {
                                handleButtonPress('Kilo', item.id);
                            }}
                        >
                            <View style={style.buttonContainer}>
                                <View style={{width:'100%'}}>
                                    <Text style={{fontSize: 20, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Evet boyum {metrics.height} cm</Text>
                                </View>
                            </View>
                        </Pressable>
                </View>
            )
        }
        else if (item.id == "5" && lock[4]){
            return (
                <View style={{ backgroundColor:'green', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Living
                        setCountry={(country)=> {
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                country: country,
                                }));
                                //handleButtonPress('Yer', item.id);
                            }
                        }
                        setCity={(city)=> {
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                city: city,
                            }));
                            handleButtonPress('Yer', item.id);
                        }}
                    />
                </View>
            )
        }
        else if (item.id == "6" && lock[5]){
            return (
                <View style={{ backgroundColor:'green', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    
                </View>
            )
        }


        return null;
    };
    console.log(metrics)
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