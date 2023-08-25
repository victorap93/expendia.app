import React, { useState } from 'react'
import { Box, HStack, Switch, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import * as MenuItems from '../components/MenuItems'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { MemberAvatar } from '../components/MemberAvatar'
import { useAuth } from '../hooks/useAuth'
import ConfirmLogout from '../components/ConfirmLogout'

export interface GroupForm {
  title: string
  members: string[]
}

export default function Configurations() {
  const { navigate } = useNavigation()
  const { user } = useAuth()
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false)

  return (
    <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
      <VStack space={4}>
        <Box my={3}>
          <BackButton />
        </Box>
        <HStack alignItems={'center'} space={3} ml={2}>
          <MemberAvatar member={user} size="md" />
          {user.firstname && user.firstname && (
            <Text color="white" fontSize={30}>
              {user.firstname + ' ' + user.lastname}
            </Text>
          )}
        </HStack>
        <MenuItems.GroupItems name="Segurança">
          <MenuItems.ListItem
            title="Senha"
            subTitle="Altere sua senha de acesso ao aplicativo"
            left={<Ionicons name="key-sharp" size={24} color="white" />}
            onPress={() =>
              navigate('Password', {
                user
              })
            }
          />
          <MenuItems.ListItem
            title="Biometria"
            subTitle="Facilite seu acesso com o uso da biometria"
            left={<Ionicons name="finger-print" size={24} color="#999" />}
            right={
              <Switch
                offTrackColor="violet.100"
                onTrackColor="violet.400"
                onThumbColor="violet.500"
                offThumbColor="violet.400"
                disabled={true}
              />
            }
            disabled={true}
          />
          <MenuItems.ListItem
            title="Contas sociais"
            subTitle="Gerencie as contas sociais vinculadas ao seu perfil"
            left={<MaterialIcons name="group" size={24} color="#999" />}
            disabled={true}
          />
        </MenuItems.GroupItems>
        <MenuItems.GroupItems name="Configurações">
          <MenuItems.ListItem
            title="Tema"
            subTitle="Escolha o tema que mais te agrada"
            left={
              false ? (
                <Ionicons name="sunny" size={24} color="#999" />
              ) : (
                <Ionicons name="moon" size={24} color="#999" />
              )
            }
            right={
              <Switch
                offTrackColor="violet.100"
                onTrackColor="violet.400"
                onThumbColor="violet.500"
                offThumbColor="violet.400"
                disabled={true}
              />
            }
            disabled={true}
          />
          <MenuItems.ListItem
            title="Notificações"
            subTitle="Foque nas notificações mais importantes"
            left={<Ionicons name="notifications" size={24} color="#999" />}
            disabled={true}
          />
        </MenuItems.GroupItems>
        <MenuItems.GroupItems name="Sessão">
          <MenuItems.ListItem
            title="Logout"
            subTitle="Desconectar usuário"
            left={<Feather name="log-out" size={24} color="white" />}
            onPress={() => setOpenConfirmLogout(true)}
          />
        </MenuItems.GroupItems>
      </VStack>
      <ConfirmLogout
        isOpen={openConfirmLogout}
        onClose={() => setOpenConfirmLogout(false)}
      />
    </VStack>
  )
}
