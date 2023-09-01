import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../hooks/useAuth'
import {
  Actionsheet,
  Button,
  Center,
  HStack,
  Text,
  VStack,
  useToast
} from 'native-base'
import { MemberAvatar } from '../components/MemberAvatar'
import SubmitButton from '../components/SubmitButton'
import { Trash } from 'phosphor-react-native'
import { api } from '../lib/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Props {
  isOpen?: boolean
  onClose: () => void
}

export default function ChangeAvatar({ isOpen, onClose }: Props) {
  const toast = useToast()
  const { user, setUser } = useAuth()
  const [editedImage, setEditedImage] = useState<{ uri: string } | null>(
    user.avatarUrl ? { uri: user.avatarUrl } : null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null)

  useEffect(() => {
    checkPermissions()
  }, [])

  const checkPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    setHasCameraPermission(status === 'granted')
    const { status: mediaLibraryStatus } =
      await MediaLibrary.requestPermissionsAsync()

    if (status !== 'granted' || mediaLibraryStatus !== 'granted') {
      // Handle permissions not granted
    }
  }

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled && result.assets.length > 0) {
      editImage(result.assets[0].uri)
    }
  }

  const editImage = async (uri: string) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(uri, [
      { resize: { width: 500 } }
    ])
    setEditedImage(manipulatedImage)
  }

  const uploadImage = async () => {
    setIsLoading(true)
    if (editedImage?.uri === user.avatarUrl) return handleClose()

    try {
      const formData = new FormData()
      if (editedImage) {
        const response = await fetch(editedImage.uri)
        const blob = await response.blob()
        formData.append('avatar', blob)
      }

      const response = await api.post('/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.status && response.data.avatarUrl) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            ...user,
            avatarUrl: response.data.avatarUrl
          })
        )
        setUser({
          ...user,
          avatarUrl: response.data.avatarUrl
        })
        toast.show({
          title: 'Foto alterada com sucesso!'
        })
      } else {
        Alert.alert(
          'Ops!',
          'Ocorreu um erro ao fazer o upload da imagem. Tente novamente mais tarde!'
        )
      }
    } catch (error) {
      Alert.alert(
        'Ops!',
        'Ocorreu um erro ao fazer o upload da imagem. Tente novamente mais tarde!'
      )
      if (error instanceof AxiosError && error.isAxiosError) {
        console.log('Axios error', error)
      } else console.log('erro genérico', error)
    } finally {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsLoading(false)
    setEditedImage(user.avatarUrl ? { uri: user.avatarUrl } : null)
    onClose()
  }

  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={handleClose}>
        <Actionsheet.Content bgColor="gray.900">
          <VStack space={6} w="full" p={4} alignItems="center">
            <VStack>
              <Text my={4} fontSize={28} color="white">
                Alterar foto de perfil
              </Text>
              <VStack alignItems="center">
                <TouchableOpacity onPress={selectImage}>
                  <MemberAvatar
                    member={{
                      ...user,
                      avatarUrl: editedImage?.uri || undefined
                    }}
                    size="2xl"
                  />
                </TouchableOpacity>
              </VStack>
            </VStack>
            <HStack w="full" space={1}>
              {editedImage && (
                <Button
                  width="1/5"
                  onPress={() => setEditedImage(null)}
                  bg="red.500"
                  _pressed={{
                    bg: 'red.600'
                  }}
                  height="12"
                >
                  <Trash color="white" />
                </Button>
              )}
              <SubmitButton
                buttonProps={{
                  width: editedImage ? '5/6' : 'full'
                }}
                title="Salvar"
                isSubmitting={isLoading}
                handleSubmit={uploadImage}
              />
            </HStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  )
}
