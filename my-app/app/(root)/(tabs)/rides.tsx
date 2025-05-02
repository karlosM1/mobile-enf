import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { router } from "expo-router";
import { icons } from "@/constants";

// Define the menu item type
type MenuItem = {
  id: string;
  title: string;
  icon: any;
};

const Rides = () => {
  const menuItems: MenuItem[] = [
    {
      id: "earth-day",
      title: "Safety Tips Before the Ride",
      icon: icons.checkcurve,
    },
    {
      id: "photos-camera",
      title: "Safety Tips During the Ride",
      icon: icons.pinmap,
    },
    {
      id: "personalize",
      title: "Safety Tips for Gearing and Clothing",
      icon: icons.gear,
    },
    {
      id: "genius-picks",
      title: "Emergency Preparedness Tips",
      icon: icons.alert,
    },
    {
      id: "keep-in-touch",
      title: "Passenger Safety Tips",
      icon: icons.idea,
    },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    router.push({
      pathname: "/(root)/tips",
      params: { id: item.id, title: item.title },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0E121A]">
      <StatusBar style="light" />

      <View className="px-4 pt-12 pb-4">
        <Text className="text-white text-4xl font-bold mb-4">
          Discover More
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-800 rounded-lg px-3 py-2 mb-4">
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: "white" }}
          />
          <TextInput
            className="flex-1 text-white ml-2 h-10"
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-gray-900 rounded-xl overflow-hidden">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center px-5 py-6 ${
                index !== menuItems.length - 1 ? "border-b border-gray-800" : ""
              }`}
              onPress={() => handleMenuItemPress(item)}
            >
              <View className="mr-4">
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <Text className="text-white text-xl flex-1">{item.title}</Text>
              <Image
                source={icons.chevron}
                resizeMode="contain"
                style={{ width: 18, height: 16, tintColor: "white" }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rides;
