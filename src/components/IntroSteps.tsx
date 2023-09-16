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
      title: 'Divida suas despesas',
      description:
        'Uma maneira descomplicada de dividir suas despesas em grupos, famílias e amigos.',
      imageSource: require('../assets/intro1.png'),
      bgColor: 'violet.500'
    },
    {
      index: 2,
      title: 'Todos no controle',
      description:
        'Todos controlam e organizam os gastos e contas do grupo, cientes de cada valor gasto individualmente e em grupo.',
      imageSource: require('../assets/intro2.png'),
      bgColor: 'blueGray.500'
    },
    {
      index: 3,
      title: 'Tudo em dia',
      description:
        'Ninguém precisa cobrar e nem lembrar ninguém! O app mostra e alerta todas as contas e a parte de cada um de maneira simplificada.',
      imageSource: require('../assets/intro3.png'),
      bgColor: 'blueGray.800'
    }
  ]

  return (
    <AppIntroSlider
      doneLabel="Pronto"
      nextLabel="Próximo"
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
