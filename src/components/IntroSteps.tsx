import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import Intro, { IntroProps } from './Intro'

export interface IntroStepsProps {
  onDone: (finished: boolean) => void
}

export default function IntroSteps({ onDone }: IntroStepsProps) {
  const data: IntroProps[] = [
    {
      index: 1,
      title: 'Divida, Registre, Simplifique.',
      description: '',
      imageSource: require('../assets/partners.png'),
      bgColor: 'palette.blue'
    },
    {
      index: 2,
      title: 'Multiplique momentos, divida as despesas.',
      description: '',
      imageSource: require('../assets/share_moments.png'),
      bgColor: 'palette.orange'
    },
    {
      index: 3,
      title: 'Momentos a gente multiplica. O barzinho a gente divide.',
      description: '',
      imageSource: require('../assets/friends.png'),
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
          index={index}
          onSkip={() => onDone(index === data.length - 1)}
        />
      )}
      data={data}
      onDone={() => onDone(true)}
    />
  )
}
