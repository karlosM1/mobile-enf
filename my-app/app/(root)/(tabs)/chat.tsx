"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import NotificationCard from "@/app/components/NotificationCard";
import { ViolationProps } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";

// Sample violation data
// const sampleViolations: ViolationProps[] = [
//   {
//     id: "1",
//     plate_number: "ABC123",
//     violation_type: "No Helmet",
//     detected_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
//     image_url: "",
//     is_notified: false,
//   },
//   {
//     id: "2",
//     plate_number: "XYZ789",
//     violation_type: "No Helmet",
//     detected_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
//     image_url: "",
//     is_notified: true,
//   },
//   {
//     id: "3",
//     plate_number: "DEF456",
//     violation_type: "Helmet",
//     detected_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago

//     image_url: "",
//     is_notified: false,
//   },
//   {
//     id: "4",
//     plate_number: "GHI789",
//     violation_type: "No Helmet",
//     detected_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
//     image_url: "",
//     is_notified: true,
//   },
// ];

type FilterType = "all" | "unread" | "violations";

const NotificationTab: React.FC = () => {
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const [notifications, setNotifications] = useState<ViolationProps[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userEmail) {
      const fetchViolations = async () => {
        try {
          setLoading(true);

          const ip = ""; // Replace with your API endpoint
          const url = `${ip}/mobile/userviolation/${encodeURIComponent(
            userEmail
          )}`;

          const response = await fetch(url);

          const text = await response.text();
          const data = JSON.parse(text);
          setNotifications(data.violations);
          setError(null);
        } catch (err: any) {
          console.error("Fetch error:", err);
          setError(err.message || "Failed to load violations");
        } finally {
          setLoading(false);
        }
      };

      fetchViolations();
    } else {
      console.log("No userEmail yet.");
    }
  }, [userEmail]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "unread") return !notification.is_notified;
    if (activeFilter === "violations")
      return notification.violation_type === "No Helmet";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.is_notified).length;
  const violationCount = notifications.filter(
    (n) => n.violation_type === "No Helmet"
  ).length;

  return (
    <SafeAreaView className="flex-1 bg-[#0E121A]">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-[#0E121A] bg-[#0E121A]">
        <View className="flex-row items-center">
          {/* <Bell width={24} height={24} color="#374151" /> */}
          <Text className="text-3xl font-extrabold ml-2 text-white">
            Notifications
          </Text>
        </View>
        <TouchableOpacity className="p-2">
          {/* <Filter width={20} height={20} color="#374151" /> */}
        </TouchableOpacity>
      </View>

      <View className="flex-row px-4 py-3 bg-[#0E121A] border-b border-[#0E121A]">
        <TouchableOpacity
          className={`mr-3 px-3 py-1.5 rounded-full ${
            activeFilter === "all" ? "bg-blue-100" : "bg-gray-100"
          }`}
          onPress={() => setActiveFilter("all")}
        >
          <Text
            className={`text-sm ${
              activeFilter === "all"
                ? "text-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            All ({notifications.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`mr-3 px-3 py-1.5 rounded-full ${
            activeFilter === "unread" ? "bg-blue-100" : "bg-gray-100"
          }`}
          onPress={() => setActiveFilter("unread")}
        >
          <Text
            className={`text-sm ${
              activeFilter === "unread"
                ? "text-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center px-3 py-1.5 rounded-full ${
            activeFilter === "violations" ? "bg-red-100" : "bg-gray-100"
          }`}
          onPress={() => setActiveFilter("violations")}
        >
          {/* <AlertTriangle
            width={16}
            height={16}
            color={activeFilter === "violations" ? "#dc2626" : "#4b5563"}
            className="mr-1"
          /> */}
          <Text
            className={`text-sm ${
              activeFilter === "violations"
                ? "text-red-600 font-medium"
                : "text-gray-600"
            }`}
          >
            No Helmet ({violationCount})
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="mt-4 text-base text-gray-500 text-center">
            Loading...
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="mt-4 text-base text-red-500 text-center">
            {error}
          </Text>
        </View>
      ) : filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              violation={item}
              onPress={() => markAsRead(item.id)}
              read={item.is_notified}
            />
          )}
          contentContainerClassName="px-4 py-2"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="mt-4 text-base text-gray-500 text-center">
            No notifications to display
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationTab;
