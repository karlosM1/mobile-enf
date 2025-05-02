import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";

// Define content for each menu item
const contentData: Record<
  string,
  {
    title: string;
    backgroundImage: string;
    items: { title: string; description: string }[];
    buttonText: string;
  }
> = {
  "earth-day": {
    title: "Safety Tips Before the Ride",
    backgroundImage: "/placeholder.svg?height=800&width=400",
    items: [
      {
        title: "Inspect Your Motorcycle",
        description: "Check brakes, tires, lights, mirrors, and oil levels.",
      },
      {
        title: "Wear the Right Gear",
        description:
          "Put on a DOT-certified helmet, gloves, jacket, pants, and boots.",
      },
      {
        title: "Check Weather Conditions",
        description:
          "Avoid riding during storms, strong winds, or heavy rain if possible.",
      },
      {
        title: "Plan Your Route",
        description:
          "Know where you're going; avoid unfamiliar or risky roads.",
      },
      {
        title: "Warm Up the Bike",
        description:
          "Let your motorcycle warm up to operating temperature before heavy riding.",
      },
    ],
    buttonText: "Review Safety Checklist",
  },
  "photos-camera": {
    title: "Safety Tips During the Ride",
    backgroundImage: "/placeholder.svg?height=800&width=400",
    items: [
      {
        title: "Maintain Safe Distance",
        description:
          "Keep at least 3-4 seconds following distance from vehicles ahead.",
      },
      {
        title: "Scan the Road Ahead",
        description:
          "Look 12-15 seconds ahead to anticipate hazards and changes.",
      },
      {
        title: "Use Both Brakes",
        description:
          "Apply front and rear brakes simultaneously for maximum stopping power.",
      },
      {
        title: "Stay Visible",
        description:
          "Position yourself where drivers can see you in their mirrors.",
      },
      {
        title: "Avoid Blind Spots",
        description: "Don't linger in areas where drivers might not see you.",
      },
    ],
    buttonText: "Review Riding Techniques",
  },
  personalize: {
    title: "Safety Tips for Gearing and Clothing",
    backgroundImage: "/placeholder.svg?height=800&width=400",
    items: [
      {
        title: "Helmet Selection",
        description:
          "Choose a DOT-certified full-face helmet that fits properly.",
      },
      {
        title: "Protective Jacket",
        description:
          "Wear abrasion-resistant material with armor in impact zones.",
      },
      {
        title: "Riding Pants",
        description: "Use reinforced pants with knee and hip protection.",
      },
      {
        title: "Proper Footwear",
        description: "Wear over-the-ankle boots with oil-resistant soles.",
      },
      {
        title: "Gloves",
        description:
          "Select gloves with knuckle protection and palm reinforcement.",
      },
    ],
    buttonText: "Shop Gear Options",
  },
  "genius-picks": {
    title: "Emergency Preparedness Tips",
    backgroundImage: "/placeholder.svg?height=800&width=400",
    items: [
      {
        title: "Carry a First Aid Kit",
        description: "Include bandages, antiseptic wipes, and pain relievers.",
      },
      {
        title: "Emergency Contacts",
        description: "Store ICE (In Case of Emergency) contacts in your phone.",
      },
      {
        title: "Basic Tool Kit",
        description:
          "Pack essential tools for roadside repairs and adjustments.",
      },
      {
        title: "Know Basic Repairs",
        description: "Learn to fix flat tires and other common issues.",
      },
      {
        title: "Roadside Assistance",
        description:
          "Consider membership in a motorcycle roadside assistance program.",
      },
    ],
    buttonText: "Prepare Emergency Kit",
  },
  "keep-in-touch": {
    title: "Passenger Safety Tips",
    backgroundImage: "/placeholder.svg?height=800&width=400",
    items: [
      {
        title: "Passenger Gear",
        description:
          "Ensure your passenger has proper helmet and protective gear.",
      },
      {
        title: "Mounting Instructions",
        description: "Teach passengers to mount only when you say it's safe.",
      },
      {
        title: "Holding Position",
        description:
          "Passengers should hold your waist or grab rails, not shoulders.",
      },
      {
        title: "Leaning Technique",
        description: "Instruct passengers to lean with you, not against turns.",
      },
      {
        title: "Communication Signals",
        description:
          "Establish hand signals for basic communication while riding.",
      },
    ],
    buttonText: "Passenger Guidelines",
  },
};

// Icons for the header
const icons = {
  back: { uri: "/placeholder.svg?height=24&width=24" },
  share: { uri: "/placeholder.svg?height=22&width=22" },
  bookmark: { uri: "/placeholder.svg?height=22&width=22" },
};

const { width } = Dimensions.get("window");

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const id = params.id as string;

  const content = contentData[id] || {
    title: "Content Not Found",
    backgroundImage: "/placeholder.svg?height=800&width=400",
    items: [],
    buttonText: "Go Back",
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { title: string; description: string };
    index: number;
  }) => (
    <View
      style={{ width: width - 48 }}
      className="bg-[#1A1A1A] rounded-xl p-6 mr-4"
    >
      <Text className="text-white text-xl font-bold mb-3">{item.title}</Text>
      <Text className="text-gray-300 text-base">{item.description}</Text>
    </View>
  );

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width - 48));
    setCurrentIndex(index);
  };

  return (
    <ImageBackground
      source={{ uri: content.backgroundImage }}
      className="flex-1"
    >
      <View className="flex-1 bg-black/70">
        <StatusBar style="light" />

        {/* Header */}
        <SafeAreaView className="flex-1">
          <View className="flex-row items-center justify-between px-4 h-14 border-b border-gray-800">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center"
            >
              <Image
                source={icons.back}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-[#3B82F6] text-lg font-medium ml-1">
                Back
              </Text>
            </TouchableOpacity>

            <Text className="text-white text-lg font-semibold">
              Setup Checklist
            </Text>

            <View className="flex-row">
              <TouchableOpacity className="px-2">
                <Image
                  source={icons.share}
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                />
              </TouchableOpacity>
              <TouchableOpacity className="px-2 ml-2">
                <Image
                  source={icons.bookmark}
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Content */}
          <View className="flex-1">
            {/* Title Section */}
            <View className="px-6 py-10">
              <Text className="text-white text-3xl font-bold">
                {content.title}
              </Text>
            </View>

            {/* Horizontal FlatList */}
            <View className="px-6 flex-1">
              <FlatList
                data={content.items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
                snapToInterval={width - 40}
                contentContainerStyle={{ paddingRight: 24 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              />
            </View>

            {/* Button */}
            <View className="px-6 pb-8 pt-6">
              <TouchableOpacity
                className="bg-[#1A1A1A] rounded-full py-4 items-center"
                // onPress={() => router.push("/(root)/(tabs)/profile")}
              >
                <Text className="text-[#3B82F6] text-lg font-medium">
                  {content.buttonText}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Pagination Dots */}
            <View className="flex-row justify-center pb-8">
              {content.items.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 w-2 mx-1 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
