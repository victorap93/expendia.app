import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import Intro, { IntroProps } from './Intro'
import { Image } from 'native-base'

export interface IntroStepsProps {
  onDone: (finished: boolean) => void
}

export default function IntroSteps({ onDone }: IntroStepsProps) {
  const data: IntroProps[] = [
    {
      title: 'Divida, Registre, Simplifique.',
      description: '',
      image: (
        <Image
          source={require('../assets/partners.png')}
          alt="Divida, Registre, Simplifique."
          width="full"
          height="66.6%"
        />
      ),
      bgColor: 'palette.blue'
    },
    {
      title: 'Multiplique momentos, divida as despesas.',
      description: '',
      image: (
        <Image
          source={require('../assets/share_moments.png')}
          alt="Multiplique momentos, divida as despesas."
          width="full"
          height="60%"
        />
      ),
      bgColor: 'palette.orange'
    },
    {
      title: 'Pronto para dividir as despesas?',
      description: '',
      image: (
        <Image
          source={require('../assets/friends.png')}
          alt="Pronto para dividir as despesas?"
          width="full"
          height="69.5%"
        />
      ),
      bgColor: 'palette.purple'
    }
  ]

  return (
    <AppIntroSlider
      doneLabel="Pronto"
      nextLabel="Próximo"
      prevLabel="Anterior"
      showPrevButton
      renderItem={({ item, index }) => (
        <Intro
          {...item}
          key={index}
          onSkip={index < data.length - 1 ? () => onDone(false) : undefined}
        />
      )}
      data={data}
      onDone={() => onDone(true)}
    />
  )
}
