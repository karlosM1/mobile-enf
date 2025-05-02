import type React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ViolationProps } from "@/types/type";

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

const NotificationCard: React.FC<NotificationCardProps> = ({
  violation,
  onPress,
  read,
}) => {
  const isNoHelmet = violation.violation_type === "No Helmet";

  return (
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
        >
          {/* <AlertTriangle width={24} height={24} color={isNoHelmet ? "#ef4444" : "#10b981"} /> */}
        </View>
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

        {violation.image_url ? (
          <Image
            source={{ uri: violation.image_url }}
            className="w-full h-24 rounded-md mt-3 bg-gray-200"
          />
        ) : (
          <View className="w-full h-24 rounded-md mt-3 bg-gray-200 items-center justify-center">
            <Text className="text-gray-500 text-xs">No image available</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
