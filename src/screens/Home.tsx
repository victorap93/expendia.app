import React, { useEffect } from 'react'
import { Box, Button, Center, HStack, Image, Text, VStack } from 'native-base'
import { EnvelopeSimple } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import IntroSteps from '../components/IntroSteps'
import { useIntro } from '../hooks/useIntro'

const Home = () => {
  const { navigate } = useNavigation()
  const { continueWithGoogle, isOAuthLoading, user, disabledOAuth } = useAuth()
  const { introduced, setIntroduced } = useIntro()

  useEffect(() => {
    if (user.email && user.noRedirect !== true) navigate('Groups')
  }, [user])

  return !introduced ? (
    <IntroSteps onDone={() => setIntroduced(true)} />
  ) : (
    <VStack
      flex={1}
      p={8}
    >
      <Center flex={1}>
        <Image
          source={require('../assets/shopping.png')}
          alt="Payers"
          width={360}
          height={400}
        />
      </Center>
      <VStack>
        <Box>
          <Image
            source={require('../assets/logo.png')}
            alt="Expendia Logo"
            width={200}
            height={30}
          />
        </Box>
        <Box mt={2} mb={6}>
          <Text
            color="gray.200"
            fontSize={20}
            fontFamily="body"
          >
            Pronto para{' '}
            <Text color="palette.light.purple" fontWeight="extrabold">dividir e simplificar</Text>{' '}
            suas finanças e da galera e nunca mais brigarem por contas?
          </Text>
        </Box>
        <Box my={1.5}>
          <Button
            backgroundColor="palette.light.purple"
            backgroundColor="palette.purple"
            _pressed={{
              bg: 'palette.purpleDark'
            }}
            variant="solid"
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
        {!disabledOAuth && (
          <Box my={1.5}>
            <Button
              onPress={continueWithGoogle}
              isLoading={isOAuthLoading}
              _pressed={{
                bg: 'amber.100'
              }}
              bg="white"
              borderColor="white"
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
        )}
      </VStack>
    </VStack>
  )
}

export default Home
