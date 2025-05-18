import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? "";

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState(initialLocation ?? "");
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async (input: string) => {
    if (!input.trim() || !googlePlacesApiKey) {
      setPredictions([]);
      return;
    }
    setLoading(true);
    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&key=${googlePlacesApiKey}&language=en`;
      const response = await fetch(url);
      const json = await response.json();
      if (json.status === "OK") {
        setPredictions(json.predictions);
      } else {
        setPredictions([]);
        console.warn(
          "Google Places Autocomplete API error:",
          json.status,
          json.error_message
        );
      }
    } catch (error) {
      console.error("Failed to fetch Google Places predictions:", error);
      setPredictions([]);
    }
    setLoading(false);
  };

  // debounce fetchPredictions so it only runs 300ms after user stops typing
  const debouncedFetch = useCallback(debounce(fetchPredictions, 300), []);

  const onChangeText = (text: string) => {
    setQuery(text);
    debouncedFetch(text);
  };

  const onSelectPlace = async (place: any) => {
    setQuery(place.description);
    setPredictions([]);

    // Fetch place details to get lat/lng
    try {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${googlePlacesApiKey}&language=en`;
      const response = await fetch(detailsUrl);
      const json = await response.json();
      if (json.status === "OK") {
        const location = json.result.geometry.location;
        if (handlePress) {
          handlePress({
            latitude: location.lat,
            longitude: location.lng,
            address: place.description,
          });
        }
      } else {
        console.warn(
          "Place details fetch error:",
          json.status,
          json.error_message
        );
      }
    } catch (error) {
      console.error("Failed to fetch place details:", error);
    }
  };

  return (
    <View className={`relative z-50 rounded-xl ${containerStyle}`}>
      <View className="flex flex-row items-center justify-center">
        {icon && (
          <Image
            source={icons.search}
            className="w-6 h-22 mr-2 ml-5"
            resizeMode="contain"
          />
        )}
        <TextInput
          value={query}
          onChangeText={onChangeText}
          placeholder="Where do you want to go?"
          placeholderTextColor="gray"
          style={{
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "600",
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 8,
            flex: 1,
          }}
        />
      </View>

      {predictions.length > 0 && (
        <View
          style={{
            backgroundColor: textInputBackgroundColor || "white",
            borderRadius: 10,
            marginTop: 5,
            shadowColor: "#d4d4d4",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            maxHeight: 200,
            zIndex: 99,
          }}
        >
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelectPlace(item)}
                style={{ padding: 10 }}
              >
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default GoogleTextInput;
