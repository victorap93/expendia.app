import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import {
  Actionsheet,
  Center,
  HStack,
  ScrollView,
  Skeleton,
  Text,
  VStack
} from 'native-base'
import { api } from '../lib/axios'
import dayjs from 'dayjs'

interface TermSheetProps {
  slug: string
  isOpen?: boolean
  onClose?: () => void
}

interface TermProps {
  id?: string
  title: string
  createdAt: string
  updatedAt: string
  text: string
}

export default function TermSheet({ slug, isOpen, onClose }: TermSheetProps) {
  const [term, setTerm] = useState<TermProps | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  async function getTerm() {
    try {
      setIsLoading(true)
      const response = await api.get(`/terms/${slug}`)
      if (response.data.term) setTerm(response.data.term)
      else Alert.alert('Ops!', 'Não foi possível buscar o termo')
    } catch (error) {
      console.error(error)
      Alert.alert('Ops!', 'Não foi possível buscar o termo')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTerm()
  }, [slug])

  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bgColor="gray.900">
          <ScrollView>
            <VStack space={6} w="full" p={4}>
              <VStack alignItems="center" w="full">
                {isLoading ? (
                  <Skeleton h={4} w="full" />
                ) : (
                  <Text color="white" fontSize="lg">
                    {term?.title || 'Termo'}
                  </Text>
                )}
              </VStack>
              <HStack w="full" space={1} alignItems="center">
                <Text color="white" fontSize="md">
                  Última atualização:{' '}
                  {!isLoading && dayjs(term?.updatedAt).format('DD/MM/YYYY')}
                </Text>
                {isLoading && <Skeleton h={4} w={'2/6'} />}
              </HStack>
              {isLoading ? (
                <VStack space={10}>
                  <VStack space={5}>
                    <Skeleton h={4} w="full" />
                    <Skeleton h={4} w="3/4" />
                    <Skeleton h={4} w="full" />
                    <Skeleton h={4} w="3/4" />
                  </VStack>
                  <VStack space={5}>
                    <Skeleton h={4} w="full" />
                    <Skeleton h={4} w="3/4" />
                    <Skeleton h={4} w="full" />
                    <Skeleton h={4} w="3/4" />
                  </VStack>
                </VStack>
              ) : (
                <Text color="white" fontSize="md">
                  {term?.text || 'Texto do termo'}
                </Text>
              )}
            </VStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  )
}
