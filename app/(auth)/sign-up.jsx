import { View, Text, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {

  const [ form, setForm ] = useState({
    username: '',
    email: '',
    password: ''
  })

  const { setUser, setIsLogged } = useGlobalContext()
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(form.username == "" || form.email == "" || form.password == "") {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username)
      setUser(result);
      setIsLogged(true);
      router.replace('/home')
    } catch(error) {
      Alert.alert('Error', error.message)
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>

      <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image 
            source={images.logo} resizeMethod='contain' className="w-[172.5px] h-[52.5px]" />
          
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to SyntheticCloud</Text>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username:e })}
            otherStyles="mt-10"
          />
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email:e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
          </View>
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp