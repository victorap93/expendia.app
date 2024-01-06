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
      bgColor: 'palette.blue',
      children: <Box height="full">
        <Center flex={1}>
          <VStack alignItems="center" space={2}>
            <Container>
              <Text color="white" fontSize="3xl" fontFamily="heading">
                Divida, Registre, Simplifique.
              </Text>
            </Container>
            <Image
              source={require('../assets/partners.png')}
              alt="Divida, Registre, Simplifique."
              width={400}
              height={330}
            />
          </VStack>
        </Center>
      </Box>
    },
    {
      bgColor: 'palette.orange',
      children: <VStack alignItems="center" height="full" space={0} >
        <Center width="full" flex={1}>
          <Container>
            <Text color="white" fontSize="3xl" fontFamily="heading" pt={150}>
              Multiplique momentos, divida as despesas.
            </Text>
          </Container>
        </Center>
        <Image
          source={require('../assets/share_moments.png')}
          alt="Multiplique momentos, divida as despesas."
          width={480}
          height={480}
        />
      </VStack>
    },
    {
      bgColor: 'palette.purple',
      children: <VStack alignItems="center" height="full" space={0} >
        <Center width="full" flex={1}>
          <Container>
            <Text color="white" fontSize="3xl" fontFamily="heading" pt={150}>
              Pronto para dividir as despesas?
            </Text>
          </Container>
        </Center>
        <Image
          source={require('../assets/friends.png')}
          alt="Pronto para dividir as despesas?"
          width={480}
          height={480}
        />
      </VStack>
    }
  ]

  return <Intro
    data={data}
    onDone={() => onDone(true)}
  />
}