import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { icons, images } from "@/constants";
const contentData: Record<
  string,
  {
    title: string;
    items: { title: string; description: string; image: ImageSourcePropType }[];
    buttonText: string;
  }
> = {
  "earth-day": {
    title: "Safety Tips Before the Ride",
    items: [
      {
        title: "Inspect Your Motorcycle",
        description: "Check brakes, tires, lights, mirrors, and oil levels.",
        image: images.inspectbike,
      },
      {
        title: "Wear the Right Gear",
        description:
          "Put on a DOT-certified helmet, gloves, jacket, pants, and boots.",
        image: images.dmodel,
      },
      {
        title: "Check Weather Conditions",
        description:
          "Avoid riding during storms, strong winds, or heavy rain if possible.",
        image: images.checkweathercondition,
      },
      {
        title: "Plan Your Route",
        description:
          "Know where you're going; avoid unfamiliar or risky roads.",
        image: images.planroute,
      },
      {
        title: "Warm Up the Bike",
        description:
          "Let your motorcycle warm up to operating temperature before heavy riding.",
        image: images.warmupbike,
      },
    ],
    buttonText: "Review Safety Checklist",
  },
  "photos-camera": {
    title: "Safety Tips During the Ride",
    items: [
      {
        title: "Maintain Safe Distance",
        description:
          "Keep at least 3-4 seconds following distance from vehicles ahead.",
        image: images.distance,
      },
      {
        title: "Scan the Road Ahead",
        description:
          "Look 12-15 seconds ahead to anticipate hazards and changes.",
        image: images.scanroad,
      },
      {
        title: "Use Both Brakes",
        description:
          "Apply front and rear brakes simultaneously for maximum stopping power.",
        image: images.checkbreaks,
      },
      {
        title: "Avoid Blind Spots",
        description: "Don't linger in areas where drivers might not see you.",
        image: images.blindspot,
      },
    ],
    buttonText: "Review Riding Techniques",
  },
  personalize: {
    title: "Safety Tips for Gearing and Clothing",
    items: [
      {
        title: "Helmet Fit is Key",
        description:
          "Choose a helmet that fits snugly and is properly fastened.",
        image: images.helmetkey,
      },
      {
        title: "Wear Abrasion-Resistant Clothing",
        description:
          "Wear abrasion-resistant material with armor in impact zones.",
        image: images.checkbreaks,
      },
      {
        title: "Riding Pants",
        description: "Use reinforced pants with knee and hip protection.",
        image: images.pants,
      },
      {
        title: "Proper Footwear",
        description: "Wear over-the-ankle boots with oil-resistant soles.",
        image: images.checkbreaks,
      },
      {
        title: "Gloves",
        description:
          "Select gloves with knuckle protection and palm reinforcement.",
        image: images.gloves,
      },
      {
        title: "Visibility Matters",
        description: "Add reflective strips to your gear for nighttime riding.",
        image: images.reflective,
      },
    ],
    buttonText: "Shop Gear Options",
  },
  "genius-picks": {
    title: "Emergency Preparedness Tips",
    items: [
      {
        title: "Carry a First Aid Kit",
        description: "Include bandages, antiseptic wipes, and pain relievers.",
        image: images.firstaid,
      },
      {
        title: "Emergency Contacts",
        description: "Store ICE (In Case of Emergency) contacts in your phone.",
        image: images.emergencycontact,
      },
      {
        title: "Basic Tool Kit",
        description:
          "Pack essential tools for roadside repairs and adjustments.",
        image: images.basictools,
      },
      {
        title: "Know Basic Repairs",
        description: "Learn to fix flat tires and other common issues.",
        image: images.knowbasicrepair,
      },
      {
        title: "Roadside Assistance",
        description:
          "Consider membership in a motorcycle roadside assistance program.",
        image: images.checkbreaks,
      },
    ],
    buttonText: "Prepare Emergency Kit",
  },
  "keep-in-touch": {
    title: "Passenger Safety Tips",
    items: [
      {
        title: "Passenger Gear",
        description:
          "Ensure your passenger has proper helmet and protective gear.",
        image: images.checkbreaks,
      },
      {
        title: "Mounting Instructions",
        description: "Teach passengers to mount only when you say it's safe.",
        image: images.checkbreaks,
      },
      {
        title: "Holding Position",
        description:
          "Passengers should hold your waist or grab rails, not shoulders.",
        image: images.holding,
      },
      {
        title: "Leaning Technique",
        description: "Instruct passengers to lean with you, not against turns.",
        image: images.checkbreaks,
      },
      {
        title: "Communication Signals",
        description:
          "Establish hand signals for basic communication while riding.",
        image: images.checkbreaks,
      },
    ],
    buttonText: "Passenger Guidelines",
  },
};

// Icons for the header
const icon = {
  back: icons.backArrow,
  share: icons.share,
  bookmark: icons.bookmark,
};

const { width } = Dimensions.get("window");

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const id = params.id as string;

  const content = contentData[id] || {
    items: [],
    buttonText: "Go Back",
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { title: string; description: string; image: ImageSourcePropType };
    index: number;
  }) => (
    <View
      style={{ width: width - 48 }}
      className="bg-[#0E121A] rounded-xl p-2 mr-4"
    >
      <View className="flex-1 items-center justify-center">
        <Image
          source={item.image}
          resizeMode="contain"
          className="w-[380px] h-[380px] items-center"
        />
      </View>
      <View className="px-4 py-2">
        <Text className="text-white text-xl font-bold mb-3">{item.title}</Text>
        <Text className="text-gray-300 text-base">{item.description}</Text>
      </View>
    </View>
  );

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width - 48));
    setCurrentIndex(index);
  };

  return (
    <View className="flex-1 bg-[#0E121A]">
      <StatusBar style="light" />

      {/* Header */}
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-4 h-14 border-b border-gray-800">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <Image
              source={icon.back}
              resizeMode="contain"
              style={{ width: 24, height: 24, tintColor: "white" }}
            />
            <Text className="text-[#3B82F6] text-lg font-medium ml-1">
              Back
            </Text>
          </TouchableOpacity>

          <Text className="text-white text-lg font-semibold">
            {content.items[currentIndex].title}
          </Text>

          <View className="flex-row">
            <TouchableOpacity className="px-2">
              <Image
                source={icon.share}
                resizeMode="contain"
                style={{ width: 22, height: 22, tintColor: "white" }}
              />
            </TouchableOpacity>
            <TouchableOpacity className="px-2 ml-2">
              <Image
                source={icon.bookmark}
                resizeMode="contain"
                style={{ width: 22, height: 22, tintColor: "white" }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Horizontal FlatList */}
          <View className="px-2 flex-1">
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
              className="bg-[#0E121A] rounded-full py-4 items-center"
              onPress={() => router.push("/(root)/(tabs)/profile")}
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
  );
}
