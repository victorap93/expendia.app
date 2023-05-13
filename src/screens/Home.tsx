import React from 'react'
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
  View
} from 'native-base'
import { EnvelopeSimple, GoogleLogo } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const { navigate } = useNavigation()

  return (
    <VStack flex={1} justifyContent="flex-end" space={2} p={4}>
      <Center mb={6}>
        <Image
          source={require('../assets/homepayers.gif')}
          alt="Alternate Text"
          size={400}
        />
      </Center>
      <Box px={4}>
        <Text color="white" fontSize={40} fontFamily="heading">
          Troo<Text color="yellow.400">Pay</Text>
        </Text>
      </Box>
      <Box mb={6} px={4}>
        <Text color="gray.200" fontSize={20} fontFamily="body">
          Descomplique o <Text color="violet.600">controle de despesas</Text> em
          grupos, casais e famílias.
        </Text>
      </Box>
      <Box my={1.5} px={4}>
        <Button
          borderColor="violet.600"
          variant="outline"
          onPress={() => navigate('Email')}
        >
          <HStack space={4} alignItems="center">
            <EnvelopeSimple size={28} color="white" />
            <Text fontSize={20} color="white" fontWeight="bold">
              Continuar com email
            </Text>
          </HStack>
        </Button>
      </Box>
      <Box my={1.5} px={4}>
        <Button
          _pressed={{
            bg: 'amber.100'
          }}
          bg="white"
          borderColor="red.600"
          borderWidth={1}
        >
          <HStack space={4} alignItems="center">
            <Image
              size={28}
              source={require('../assets/google.png')}
              alt="Continuar com Google"
            />
            <Text fontSize={20} color="black" fontWeight="bold">
              Continuar com Google
            </Text>
          </HStack>
        </Button>
      </Box>
    </VStack>
  )
}

export default Home
