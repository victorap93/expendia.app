import React from 'react'
import { Box, Center, Container, Image, Text, VStack } from 'native-base'
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import Intro from './Intro'

export interface IntroStepsProps {
  onDone: (finished: boolean) => void
}

export default function IntroSteps({ onDone }: IntroStepsProps) {
  const data: InterfaceVStackProps[] = [
    {
      bgColor: 'palette.lightBlue',
      children: <VStack alignItems="center" height="full">
        <Center width="full" flex={1}>
          <Container>
            <Text color="white" fontSize="4xl" fontFamily="heading">
              Sua organização financeira começa aqui
            </Text>
          </Container>
        </Center>
        <Image
          source={require('../assets/shopping.png')}
          alt="Sua organização financeira começa aqui"
          width={480}
          height={570}
        />
      </VStack>
    },
    {
      bgColor: 'palette.blue',
      children: <Box height="full">
        <Center flex={1}>
          <VStack alignItems="center" space={12}>
            <Container>
              <Text color="white" fontSize="4xl" fontFamily="heading">
                Divida, Registre, Simplifique
              </Text>
            </Container>
            <Image
              source={require('../assets/partners.png')}
              alt="Divida, Registre, Simplifique"
              width={440}
              height={300}
            />
          </VStack>
        </Center>
      </Box>
    },
    {
      bgColor: 'palette.orange',
      children: <VStack alignItems="center" height="full">
        <Center width="full" flex={1}>
          <Container>
            <Text color="white" fontSize="4xl" fontFamily="heading">
              Multiplique momentos, divida as despesas
            </Text>
          </Container>
        </Center>
        <Image
          source={require('../assets/share_moments.png')}
          alt="Multiplique momentos, divida as despesas"
          width={480}
          height={570}
        />
      </VStack>
    },
    {
      bgColor: 'palette.purple',
      children: <VStack alignItems="center" height="full">
        <Center width="full" flex={1}>
          <Container>
            <Text color="white" fontSize="4xl" fontFamily="heading">
              Bem-vindo ao jeito expendia de dividir despesas
            </Text>
          </Container>
        </Center>
        <Image
          source={require('../assets/on_computer.png')}
          alt="Bem-vindo ao jeito expendia de dividir despesas"
          width={480}
          height={570}
        />
      </VStack>
    }
  ]

  return <Intro
    data={data}
    onDone={() => onDone(true)}
  />
}