import React, { useState } from 'react'
import { Box, HStack, ScrollView, Switch, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import * as MenuItems from '../components/MenuItems'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { MemberAvatar } from '../components/MemberAvatar'
import { useAuth } from '../hooks/useAuth'
import ConfirmLogout from '../components/ConfirmLogout'
import ChangeAvatar from '../components/ChangeAvatar'
import Me from '../components/Me'
import TermSheet from '../components/TermSheet'

export interface GroupForm {
  title: string
  members: string[]
}

export default function Configurations() {
  const { navigate } = useNavigation()
  const { user } = useAuth()
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false)
  const [openChangeAvatar, setOpenChangeAvatar] = useState(false)
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)
  const [openTermsOfUse, setOpenTermsOfUse] = useState(false)

  return (
    <ScrollView h="full">
      <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
        <VStack space={4}>
          <Box my={3}>
            <BackButton />
          </Box>
          <Me onPressOnAvatar={() => setOpenChangeAvatar(true)} />
          <MenuItems.GroupItems name="Conta">
            <MenuItems.ListItem
              title="Perfil"
              subTitle="Altere seus dados de perfil no aplicativo"
              left={<Ionicons name="person" size={24} color="white" />}
              onPress={() => navigate('Profile')}
            />
            <MenuItems.ListItem
              title="Foto"
              subTitle={`${
                user.avatarUri ? 'Altere' : 'Crie'
              } sua foto de perfil no aplicativo`}
              left={<Ionicons name="person-circle" size={28} color="white" />}
              onPress={() => setOpenChangeAvatar(true)}
            />
            <MenuItems.ListItem
              title="E-mail"
              subTitle="Altere o e-mail da sua conta"
              left={<Ionicons name="mail-open" size={26} color="white" />}
              onPress={() => navigate('Email', user)}
            />
          </MenuItems.GroupItems>
          <MenuItems.GroupItems name="Segurança">
            <MenuItems.ListItem
              title="Senha"
              subTitle={`${
                user.hasPassword ? 'Altere' : 'Crie'
              } sua senha de acesso ao aplicativo`}
              left={<Ionicons name="key-sharp" size={24} color="white" />}
              onPress={() =>
                user.hasPassword
                  ? navigate('SignIn', { user, isConfirmPassword: true })
                  : navigate('Password', { user })
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
          <MenuItems.GroupItems name="Aplicativo">
            <MenuItems.ListItem
              title="Política de privacidade"
              subTitle="Como usamos os seus dados"
              left={
                <Ionicons name="shield-checkmark" size={24} color="white" />
              }
              onPress={() => setOpenPrivacyPolicy(true)}
            />
            <MenuItems.ListItem
              title="Termos de uso"
              subTitle="Como usar nosso app"
              left={<Ionicons name="document-text" size={24} color="white" />}
              onPress={() => setOpenTermsOfUse(true)}
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
        <TermSheet
          slug="privacy-policy"
          isOpen={openPrivacyPolicy}
          onClose={() => setOpenPrivacyPolicy(false)}
        />
        <TermSheet
          slug="terms-of-use"
          isOpen={openTermsOfUse}
          onClose={() => setOpenTermsOfUse(false)}
        />
        <ConfirmLogout
          isOpen={openConfirmLogout}
          onClose={() => setOpenConfirmLogout(false)}
        />
        <ChangeAvatar
          isOpen={openChangeAvatar}
          onClose={() => setOpenChangeAvatar(false)}
        />
      </VStack>
    </ScrollView>
  )
}
