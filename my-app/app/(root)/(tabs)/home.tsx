import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomePageCard from "@/app/components/HomePageCard";
import ArrowPointer from "@/app/components/ArrowPointer";
import { icons, images } from "@/constants";
import { useEffect, useState } from "react";
import GoogleTextInput from "@/app/components/GoogleTextInput";
import { useLocationStore } from "@/store";
import * as Location from "expo-location";
import { router } from "expo-router";

const Home = () => {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude,
        latitude: 14.5916,
        longitude: 120.9778,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  const cards = [
    {
      title: "Violations",
      description: "3",
      icon: icons.crisis,
      className: "bg-[#FC574E] w-[48%] mb-2 h-[100px]",
      destination: "/(tabs)/chat",
    },
    {
      title: "Weather",
      description: "Sunny",
      icon: icons.cloudy,
      className: "bg-blue-500 w-[48%] mb-2 h-[100px]",
      destination: "",
    },
    {
      title: "Safety Tips",
      description: "8",
      icon: icons.helmet,
      className: "bg-[#F7C846] w-[48%] mb-2 h-[100px]",
      destination: "/(tabs)/rides",
    },
    {
      title: "Notifications",
      description: "2",
      icon: icons.berk,
      className: "bg-[#8AE98D] w-[48%] mb-2 h-[100px]",
      destination: "/(tabs)/chat",
    },
  ];

  const parts = [
    {
      parts: "Full Face Helmet",
      className: "absolute top-8 left-72",
      position: "left-[-20px] top-[4]",
    },
    {
      parts: "Rider Suit",
      className: "absolute top-[132px] left-[245px]",
      position: "left-[-20px] top-[4]",
    },
    {
      parts: "Knee Armor",
      className: "absolute top-[250px] left-72",
      position: "left-[-20px] top-[4]",
    },
    {
      parts: "Elbow Armor",
      className: "absolute top-[106px] left-[0px]",
      position: "left-[82px] top-[4]",
      enableBorderLeft: true,
    },
    {
      parts: "Motorcycle Gloves",
      className: "absolute top-[210px] left-[0px]",
      position: "left-[76px] top-[-16px]",
      enableBorderLeft: true,
    },
    {
      parts: "Boots",
      className: "absolute top-[326px] left-[72px]",
      position: "left-[42px] top-[4]",
      enableBorderLeft: true,
    },
  ];

  const email = user?.emailAddresses?.[0]?.emailAddress;
  const username = email?.split("@")[0] || "Rider";
  return (
    <SafeAreaView className="bg-[#0E121A]">
      <View className="mb-8 mt-4">
        <Text
          className="text-3xl font-semibold ml-4"
          style={{ color: "#6e727a" }}
        >
          Hello, {username}
        </Text>
      </View>

      <View className="mx-4 mb-4">
        {/* <View className="mb-4">
          <GoogleTextInput
            icon={icons.search}
            containerStyle="bg-white shadow-md shadow-neutral-300"
            handlePress={handleDestinationPress}
          />
        </View> */}

        <View className="flex flex-row flex-wrap justify-between items-center mb-4">
          {cards.map((card, index) => (
            <HomePageCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              className={card.className}
              destination={card.destination}
            />
          ))}
        </View>

        <View className="">
          <Text className="text-3xl font-extrabold ml-4 text-white text-center">
            What Makes Up a Riders Gear?
          </Text>
        </View>

        <View className="mt-8">
          <Image
            source={images.dmodel}
            className="w-full h-[400px] rounded-2xl"
            resizeMode="contain"
          />
          {parts.map((part, index) => (
            <ArrowPointer
              key={index}
              parts={part.parts}
              className={part.className}
              position={part.position}
              enableBorderLeft={part.enableBorderLeft}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
