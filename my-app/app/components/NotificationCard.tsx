import type React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { ViolationProps } from "@/types/type";
import { useState } from "react";

interface NotificationCardProps {
  violation: ViolationProps;
  onPress: () => void;
  read: boolean;
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
};

const isAbsoluteUrl = (url: string) => /^https?:\/\//.test(url);

const NotificationCard: React.FC<NotificationCardProps> = ({
  violation,
  onPress,
  read,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const baseUrl = ""; // Replace with your base URL for images
  const imageUrl = violation.image_url
    ? isAbsoluteUrl(violation.image_url)
      ? violation.image_url
      : `${baseUrl}/images/${violation.image_url}`
    : null;

  const isNoHelmet = violation.violation_type === "No Helmet";

  return (
    <>
      <TouchableOpacity
        className={`flex-row bg-white rounded-xl p-4 mb-3 shadow-sm ${
          !read ? "bg-blue-50" : ""
        }`}
        onPress={onPress}
      >
        <View className="mr-3 relative">
          <View
            className={`p-2 rounded-full ${
              isNoHelmet ? "bg-red-100" : "bg-green-100"
            }`}
          />
          {!read && (
            <View className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-blue-50" />
          )}
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <Text
              className="text-base font-semibold text-gray-800"
              numberOfLines={1}
            >
              {isNoHelmet ? "Helmet Violation" : "Helmet Compliance"}
            </Text>
            <Text className="text-xs text-gray-500">
              {formatTimeAgo(violation.detected_at)}
            </Text>
          </View>

          <Text className="text-sm text-gray-600 mb-2">
            Vehicle {violation.plate_number} detected with{" "}
            {violation.violation_type.toLowerCase()}.
          </Text>

          <View className="flex-row justify-between items-center">
            <View className="bg-gray-100 px-2 py-1 rounded">
              <Text className="text-xs text-gray-600">
                {violation.plate_number}
              </Text>
            </View>
          </View>

          {imageUrl ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={{ uri: imageUrl }}
                className="w-full h-24 rounded-md mt-3 bg-gray-200"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <View className="w-full h-24 rounded-md mt-3 bg-gray-200 items-center justify-center">
              <Text className="text-gray-500 text-xs">No image available</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black bg-opacity-90 justify-center items-center">
          <Pressable
            style={{ position: "absolute", top: 50, right: 20, zIndex: 10 }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Close ✕</Text>
          </Pressable>

          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          ) : (
            <Text style={{ color: "white", fontSize: 18 }}>
              No image available
            </Text>
          )}
        </View>
      </Modal>
    </>
  );
};

export default NotificationCard;
