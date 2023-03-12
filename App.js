import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions ,TouchableOpacity, Animated } from 'react-native';
import { faTrash , faCircle , faPencil , faXmark } from '@fortawesome/free-solid-svg-icons';
const screenHeight = Dimensions.get('window').height
export default function App() {
  const colorValue = new Animated.Value(0)
  const [paintArray , setPaint ]  = useState([])
  const [displayValue , setDisplay] = useState(1)
  const handleEvent = (evt)=>{
    const xP = evt.nativeEvent.locationX
    const yP = evt.nativeEvent.locationY
    setPaint(OldPaintArray => [...OldPaintArray , {
      x : xP,
      y : yP
    } ])
  }
  const emptyArray = () => { 
    setPaint(OldArr => [])
  }
  const colorViewAnimation = () =>{
    Animated.timing(colorValue , { 
      useNativeDriver : false ,
      toValue : !colorValue._value  
    }).start()
  }
  useEffect(() =>{
    colorViewAnimation()
  }, [displayValue])
  return (
      <SafeAreaView>
        <View  style={styles.main}>
          <Text style={styles.headerText}>Drawing App</Text>
          <View onMoveShouldSetResponder={() => true} onResponderMove={handleEvent} style={styles.pressableStyle}>
            {paintArray.length != 0 ? paintArray.map((value , index) =>(
                <View key={index.toString()}  style={[styles.dotStyle ,{ left : parseInt(value.x) , top : parseInt(value.y)} ]}></View>
            )) : null}
          </View>
          <View style={styles.drawingTools}>
              <Animated.View style={[styles.colorsView , { 
                  width : colorValue.interpolate({
                    inputRange : [0,1], 
                    outputRange : ['0%', '92%']
                  }),
                  display : displayValue
              }]}>
                <View style={{flexDirection :'row' , gap : 20}}>
                <FontAwesomeIcon icon={faCircle} color={'yellow'} size={30}/>
                <FontAwesomeIcon icon={faCircle} color={'blue'} size={30}/>
                <FontAwesomeIcon icon={faCircle} color={'green'} size={30}/>
                <FontAwesomeIcon icon={faCircle} color={'orange'} size={30}/>
                <FontAwesomeIcon icon={faCircle} color={'black'} size={30}/>
                </View>
                <View>
                  <TouchableOpacity onPress={() => {
                    colorViewAnimation(); 
                    setTimeout(() => {
                      setDisplay(1)
                    }, 500);
                    }}><FontAwesomeIcon icon={faXmark} color={'black'} size={30}/></TouchableOpacity>
                </View>
              </Animated.View>
              <TouchableOpacity onPress={() => setDisplay(0)}><FontAwesomeIcon icon={faCircle} color={'yellow'} size={23}/></TouchableOpacity>
              <View><FontAwesomeIcon icon={faPencil} color={'black'} size={23}/></View>
              <TouchableOpacity onPress={() => emptyArray()}><FontAwesomeIcon icon={faTrash} color={'black'} size={23}/></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main : { 
    marginHorizontal : 20 , 
    marginVertical  : 20 , 
    gap : 30 ,
  },
  headerText : { 
    textAlign : 'center' , 
    fontSize : 32 , 
    fontWeight : '800',
    marginTop : 20 
  },
  pressableStyle : { 
    borderWidth : 10 , 
    borderColor : '#F2CD5C',
    height : screenHeight * 0.62,
    backgroundColor : '#43474B', 
  } , 
  drawingTools : { 
    backgroundColor : '#EDEDEE',
    width : '100%' , 
    paddingVertical : 20,
    borderRadius : 20,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    position : 'relative'
  },
  dotStyle : { 
    borderRadius : 40 , 
    position : 'absolute' , 
    backgroundColor : 'yellow',
    padding : 3 , 
    transform : [{translateX : -12.5} , { translateY :-10}]
  } , 
  colorsView :  { 
    paddingVertical : 20,
    backgroundColor : '#A6C4D0' , 
    zIndex : 99 ,
    position : 'absolute',
    borderRadius : 16,
    top :  7 , 
    bottom : 7, 
    right : 15 ,
    left : 15 ,
    flexDirection : 'row' , 
    justifyContent : 'space-between',
    paddingHorizontal : 20,
    alignItems : 'center' , 
    overflow : 'hidden'
  }
});
