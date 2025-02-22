import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, Text, View, Image } from 'react-native'

import { images } from '../../constants';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={[{ id: 1 }, { id: 2 }, { id: 3 },]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  babygronk
                </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-10 h-11"
                  resizeMode='contain'
                />
              </View>
            </View>
          </View>
        )}
      /> 
    </SafeAreaView>
  )
}

export default Home