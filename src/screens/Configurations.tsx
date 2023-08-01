import React from 'react'
import { Box, HStack, Switch, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import * as MenuItems from '../components/MenuItems'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { MemberAvatar } from '../components/MemberAvatar'
import { useAuth } from '../hooks/useAuth'

export interface GroupForm {
  title: string
  members: string[]
}

export default function Configurations() {
  const { navigate } = useNavigation()
  const { user } = useAuth()

  return <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
    <VStack space={4}>
      <Box my={3}>
        <BackButton />
      </Box>
      <HStack alignItems={'center'} space={3} ml={2}>
        <MemberAvatar member={user} size="md" />
        {user.firstname && user.firstname && <Text color="white" fontSize={30}>{user.firstname + " " + user.lastname}</Text>}
      </HStack>
      <MenuItems.GroupItems name='Segurança'>
        <MenuItems.ListItem
          title="Senha"
          subTitle="Gerencie sua foto, nome e informações pessoais"
          left={<Ionicons name="key-sharp" size={24} color="white" />}
          onPress={() => navigate('ConfigurationsUser')}
        />
        <MenuItems.ListItem
          title="Biometria"
          subTitle="Tema, notificações e segurança"
          left={<Ionicons name="finger-print" size={24} color="white" />}
          right={<Switch offTrackColor="violet.100" onTrackColor="violet.400" onThumbColor="violet.500" offThumbColor="violet.400" />}
        />
        <MenuItems.ListItem
          title="Contas sociais"
          subTitle="Tema, notificações e segurança"
          left={<MaterialIcons name="group" size={24} color="white" />}
          onPress={() => navigate('ConfigurationsApplication')}
        />
      </MenuItems.GroupItems>
      <MenuItems.GroupItems name='Configurações'>
        <MenuItems.ListItem
          title="Tema"
          subTitle="Tema, notificações e segurança"
          left={false ? <Ionicons name="sunny" size={24} color="white" /> : <Ionicons name="moon" size={24} color="white" />}
          right={<Switch offTrackColor="violet.100" onTrackColor="violet.400" onThumbColor="violet.500" offThumbColor="violet.400" />}
        />
        <MenuItems.ListItem
          title="Notificações"
          subTitle="Tema, notificações e segurança"
          left={<Ionicons name="notifications" size={24} color="white" />}
          onPress={() => navigate('ConfigurationsApplication')}
        />
      </MenuItems.GroupItems>
      <MenuItems.GroupItems name='Sessão'>
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
