import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

interface HomePageCardProps {
  title: string;
  description: string;
  icon: ImageSourcePropType;
  className?: string;
  iconStyle?: string;
  descriptionStyle?: string;
  titleStyle?: string;
  onPress?: () => void;
  destination?: string;
}

const HomePageCard = ({
  title,
  description,
  icon,
  className,
  iconStyle,
  descriptionStyle,
  titleStyle,
  onPress,
  destination,
}: HomePageCardProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (destination) {
      router.push(destination as never);
    }
  };

  return (
    <TouchableOpacity
      className={`flex flex-row justify-between rounded-2xl p-4 mb-4 ${className}`}
      onPress={handlePress}
    >
      <View className="flex-1">
        <Text className={`text-white text-2xl my-3 font-bold ${titleStyle}`}>
          {title}
        </Text>
        <Text className={`text-white text-lg ${descriptionStyle}`}>
          {description}
        </Text>
      </View>
      <View className="justify-center items-center">
        <Image
          source={icon}
          className={`w-11 h-11 ${iconStyle}`}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default HomePageCard;
