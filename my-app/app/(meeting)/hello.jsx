import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import LottieMan from '../../component/lottieMan'
import LottieQuestion from '../../component/lottieQuestion'
import LottieWoman from '../../component/lottieWoman'
import LottiePeople from '../../component/lottiePeople'
import { ThemeProvider, ThemeContext } from "../../content/ThemeContext";
import { useContext } from "react";
import Living from "../../content/living"
import Habit from "../../content/habbit"
import Hobby from "../../content/hobby"
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
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
const WIDTH = Dimensions.get('screen').width

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
        question: 'Kaç kilosun?'
    },
    {
        id: '6',
    },
    {
        id: '7',
    },
    {
        id:'8',
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
        weight: 25,
        country: '',
        city: '',
        intersting: [],
        habits: []
        
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
                <View style={{ backgroundColor: '', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor}}>
                        {item.question}
                    </Text>
                    <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
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
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
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
                    </TouchableOpacity>
                </View>
            )
        }
        //YÖNELİM
        if (item.id == "1" && lock[0]) {
            return (
                <View style={{ backgroundColor:'', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor}}>
                        {item.question}
                    </Text>
                    <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
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
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
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
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
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
                    </TouchableOpacity>
                </View>
            )
        }
        //İLİŞKİ TÜRÜ
        else if (item.id == "2" && lock[1]) {
            return (
                <View style={{ backgroundColor:'', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 26, textAlign: 'center', color: colors.tColor}}>
                        {item.question}
                    </Text>
                    <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
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
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
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
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
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
                    </TouchableOpacity>
                </View>
            )
        }
        //YAŞ
        else if (item.id == "3" && lock[2]){
            return (
                <View style={{ backgroundColor:'', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor, marginBottom: 15}}>
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
                            style={[style.picker, {color: colors.btColor}]}
                        >
                            <Picker.Item label="Seçiniz..." value='18' style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            {Array.from({ length: 81 }, (_, i) => (
                                <Picker.Item key={i} label={`${18 + i}`} value={parseInt(`${18 + i}`)} style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            ))}
                        </Picker>
                    </View>
                        <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
                            onPress={()=> {
                                handleButtonPress('Yaş', item.id);
                            }}
                        >
                            <View style={style.buttonContainer}>
                                <View style={{width:'100%'}}>
                                    <Text style={{fontSize: 20, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Evet {metrics.age} yaşındayım</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                </View>
            )
        }
        //BOY
        else if (item.id == "4" && lock[3]){
            return (
                <View style={{ backgroundColor:'', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor, marginBottom:15}}>
                        {item.question}
                    </Text>
                    <View style={[style.pickerContainer, { backgroundColor: colors.iColor }]}>
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
                        <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
                            onPress={()=> {
                                handleButtonPress('Boy', item.id);
                            }}
                        >
                            <View style={style.buttonContainer}>
                                <View style={{width:'100%'}}>
                                    <Text style={{fontSize: 20, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Evet boyum {metrics.height} cm</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                </View>
            )
        }
        //KİLO
        else if (item.id == "5" && lock[4]){
            return (
                <View style={{ backgroundColor:'', width: WIDTH,  justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'RMM', fontSize: 25, textAlign: 'center', color: colors.tColor , marginBottom: 15}}>
                        {item.question}
                    </Text>
                    <View style={[style.pickerContainer, { backgroundColor: colors.iColor }]}>
                        <Picker
                            selectedValue={metrics.weight}
                            onValueChange={(itemValue) => {
                                setMetrics(prevMetrics => ({
                                  ...prevMetrics,
                                  weight: itemValue,
                                }));
                            }}
                            style={[style.picker, {color: colors.btColor}]}
                        >
                            <Picker.Item label="Seçiniz..." value="" style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            {Array.from({ length: 150 }, (_, i) => (
                                <Picker.Item key={i} label={`${25 + i} kg`} value={parseInt(`${25 + i} kg`)} style={{fontSize: 25, fontFamily: 'RMM'}}/>
                            ))}
                        </Picker>
                    </View>
                        <TouchableOpacity style={[style.button, {backgroundColor: colors.bColor}]}
                            onPress={()=> {
                                handleButtonPress('Kilo', item.id);
                            }}
                        >
                            <View style={style.buttonContainer}>
                                <View style={{width:'100%'}}>
                                    <Text style={{fontSize: 20, fontFamily: 'RMM', textAlign:'center', color: colors.btColor}}>Evet {metrics.weight} kiloyum</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                </View>
            )
        }
        //YER
        else if (item.id == "6" && lock[5]){
            return (
                <View style={{ backgroundColor:'', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
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
                            setTimeout(()=> {
                                handleButtonPress('Yer', item.id);
                            },500)
                        }}
                    />
                </View>
            )
        }
        //İLGİ ALANI
        else if (item.id == "7"  && lock[6]){
            return (
                <View style={{ backgroundColor:'', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Hobby 
                        setHobby={(intersting)=> {
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                intersting: intersting,
                            }));
                            handleButtonPress('İlgi', item.id);
                            setTimeout(()=> {
                                handleButtonPress('İlgi', item.id);
                            }, 500)
                        }}
                    />
                </View>
            )
        }
        //ALIŞKANLIKLAR
        else if (item.id == "8"){
            return (
                <View style={{ backgroundColor:'', width: WIDTH, justifyContent:'flex-start', alignContent:'center', alignItems:'center', paddingVertical: 10}}>
                    <Habit 
                        setHabit={(habit)=> {
                            setMetrics(prevMetrics => ({
                                ...prevMetrics,
                                habits: habit,
                            }));
                            setTimeout(()=> {
                                router.navigate('/(auth)/register')
                            }, 500)
                        }}
                    />
                </View>
            )
        }
        return null;
    };
    console.log(metrics.habits)
    return (
    <Animated.View entering={FadeIn} style={[style.container, { backgroundColor: colors.bgColor }]}>
        <LottieQuestion />
        <Animated.FlatList
            ref={flatListRef}
            data={questions}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            decelerationRate={'normal'}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal
            snapToInterval={WIDTH}
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
        width: '100%',
        flex:1,
        height: '100%',
        alignItems: "center",
        justifyContent:'center',
        alignSelf:'center'
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
        marginBottom: 10,
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