import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import { calculateRegion } from "@/lib/map";
import { icons } from "@/constants";

import RideLayout from "@/app/components/RideLayout";
import GoogleTextInput from "@/app/components/GoogleTextInput";
import CustomButton from "../components/CustomeButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Explore">
      <Text className="text-2xl font-semibold">Search Destination</Text>

      <View className="my-3">
        <Text className="text-lg font-semibold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-semibold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
    </RideLayout>
  );
};
export default FindRide;
