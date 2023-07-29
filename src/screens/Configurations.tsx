import React from 'react'
import { Box, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import * as MenuItems from '../components/MenuItems'
import { Feather } from '@expo/vector-icons'

export interface GroupForm {
  title: string
  members: string[]
}

export default function Configurations() {
  const { navigate } = useNavigation()

  return <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
    <VStack>
      <Box my={3}>
        <BackButton />
      </Box>
      <MenuItems.GroupItems name='Configurações'>
        <MenuItems.ListItem
          title="Usuario"
          subTitle="Gerencie sua foto, nome e informações pessoais"
          left={<Feather name="user" size={24} color="white" />}
          onPress={() => navigate('ConfigurationsUser')}
        />
        <MenuItems.ListItem
          title="Aplicativo"
          subTitle="Tema, notificações e segurança"
          left={<Feather name="settings" size={24} color="white" />}
          onPress={() => navigate('ConfigurationsApplication')}
        />
        <MenuItems.ListItem
          title="Logout"
          subTitle="Desconectar usuario"
          left={<Feather name="log-out" size={24} color="white" />}
          onPress={() => console.log('logout')}
        />
      </MenuItems.GroupItems>
    </VStack>
  </VStack>
}
