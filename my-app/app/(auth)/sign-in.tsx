import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "../components/InputField";
import { useState } from "react";
import CustomButton from "../components/CustomeButton";
import { Link, useRouter } from "expo-router";
import OAuth from "../components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#0E121A]">
      <View className="flex-1 bg-[#0E121A] mb-8">
        <View className="flex-1 px-6 pt-8">
          {/* Header Section */}
          <View>
            <Text className="text-[#F0F0F0] text-[14rem] font-extrabold">
              Log
            </Text>
            <Text className="text-[#F0F0F0] text-[14rem] font-extrabold mt-[-62px]">
              in
            </Text>
          </View>
          <View className="absolute top-[222px] left-[175px]">
            <Text className="text-[#6E727A] text-3xl mt-1">
              Happy to see you{"\n"}again. Now let's{"\n"}make memories.
            </Text>
          </View>
        </View>
        <View className="px-5">
          <InputField
            label="Email"
            placeholder="Enter your Email"
            icon={icons.email}
            value={form.email}
            labelStyle="text-[#F0F0F0]"
            placeholderTextColor="#6E727A"
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            labelStyle="text-[#F0F0F0]"
            placeholderTextColor="#6E727A"
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>

        {/* Verification Modal*/}
      </View>
    </ScrollView>
  );
};
export default SignIn;
