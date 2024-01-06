import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Icon, Text, VStack, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'

const styles = StyleSheet.create({
  buttonCircle: {
    width: 'auto',
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
      dotStyle={{ backgroundColor: 'rgba(0, 0, 0, .2)' }}
      renderPrevButton={() => 
        <View style={styles.buttonCircle}>
          <Icon name="arrow-left" size={24} color="white" />
        </View>
      } 
      renderNextButton={() => 
        <View style={styles.buttonCircle}>
          <Icon name="arrow-right" size={24} color="white" />
        </View>
      }     
      renderDoneButton={() => 
        <View style={styles.buttonCircle}>
          <Icon name="check" size={24} color="white" />
        </View>
      } 
      renderSkipButton={() =>
        <View style={styles.buttonCircle}>
          <Text color="white">Pular</Text>
        </View>
      }
      renderItem={({ item, index }) => 
        <VStack key={index} flex={1} {...item}/>
      }
      data={data}
      onDone={onDone}
    />
}