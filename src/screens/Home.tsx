import React, { useEffect } from 'react'
import { Box, Button, Center, HStack, Image, Text, VStack } from 'native-base'
import { EnvelopeSimple } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import IntroSteps from '../components/IntroSteps'
import { useIntro } from '../hooks/useIntro'

const Home = () => {
  const { navigate } = useNavigation()
  const { continueWithGoogle, isOAuthLoading, user } = useAuth()
  const { introduced, setIntroduced } = useIntro()

  useEffect(() => {
    if (user.email && user.noRedirect !== true) navigate('Groups')
  }, [user])

  return !introduced ? (
    <IntroSteps onDone={() => setIntroduced(true)} />
  ) : (
    <VStack flex={1} justifyContent="flex-end" space={2} p={4}>
      <Center mb={6}>
        <Image
          source={require('../assets/homepayers.gif')}
          alt="Payers"
          size={400}
        />
      </Center>
      <Box px={4}>
        <Image
          source={require('../assets/logo.png')}
          alt="Expendia Logo"
          width={200}
          height={30}
        />
      </Box>
      <Box mt={2} mb={6} px={4}>
        <Text
          color="gray.200"
          fontSize={20}
          fontFamily="body"
          fontWeight="medium"
        >
          Pronto para <Text color="palette.purple">simplificar</Text> suas
          finanças e nunca mais brigar por contas?
        </Text>
      </Box>
      <Box my={1.5} px={4}>
        <Button
          borderColor="palette.purple"
          variant="outline"
          onPress={() => navigate('Email')}
        >
          <HStack space={4} alignItems="center">
            <EnvelopeSimple size={28} color="white" />
            <Text fontSize="lg" color="white" fontWeight="bold">
              Continuar com email
            </Text>
          </HStack>
        </Button>
      </Box>
      <Box my={1.5} px={4}>
        <Button
          onPress={continueWithGoogle}
          isLoading={isOAuthLoading}
          _pressed={{
            bg: 'amber.100'
          }}
          bg="white"
          borderColor="red.600"
          borderWidth={1}
          height="12"
        >
          <HStack space={4} alignItems="center">
            <Image
              size={28}
              source={require('../assets/google.png')}
              alt="Continuar com Google"
            />
            <Text fontSize="lg" color="black" fontWeight="bold">
              Continuar com Google
            </Text>
          </HStack>
        </Button>
      </Box>
    </VStack>
  )
}

export default Home
