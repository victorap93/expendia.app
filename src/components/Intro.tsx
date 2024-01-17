import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Text, VStack, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
  buttonCircle: {
    width: 'auto',
    height: 60,
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  }
})

export interface IntroProps {
  data: InterfaceVStackProps[]
  onDone: () => void
}

export default function Intro({ data, onDone }: IntroProps) {

  return <AppIntroSlider
      doneLabel="Pronto"
      nextLabel="Próximo"
      prevLabel="Anterior"
      skipLabel="Pular"
      showSkipButton
      showPrevButton
      dotStyle={{ 
        backgroundColor: 'rgba(0, 0, 0, .2)',
        marginTop: -10
      }}
      activeDotStyle={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: -10
      }}
      renderPrevButton={() => 
        <View style={styles.buttonCircle}>
          <Icon name="arrow-left" size={30} color="white" />
        </View>
      } 
      renderNextButton={() => 
        <View style={styles.buttonCircle}>
          <Icon name="arrow-right" size={30} color="white" />
        </View>
      }     
      renderDoneButton={() => 
        <View style={styles.buttonCircle}>
          <Icon name="check" size={30} color="white" />
        </View>
      } 
      renderSkipButton={() =>
        <View style={styles.buttonCircle}>
          <Text fontSize={20} color="white">Pular</Text>
        </View>
      }
      renderItem={({ item, index }) => 
        <VStack key={index} flex={1} {...item}/>
      }
      data={data}
      onDone={onDone}
    />
}