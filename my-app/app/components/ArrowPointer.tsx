import { View, Text } from "react-native";

interface ArrowPointerProps {
  parts: string;
  className?: string;
  position?: string;
  enableBorderLeft?: boolean;
}

const ArrowPointer = ({
  parts,
  className,
  position,
  enableBorderLeft,
}: ArrowPointerProps) => {
  return (
    <View className={`absolute top-8 left-72 ${className}`}>
      <Text className="text-white text-lg">{parts}</Text>
      <View className={`absolute left-[-20px] top-[4] ${position}`}>
        <View
          style={{
            width: 0,
            height: 0,
            borderTopWidth: 7,
            borderBottomWidth: 7,
            borderRightWidth: enableBorderLeft ? 0 : 7,
            borderLeftWidth: enableBorderLeft ? 7 : 0,
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            borderRightColor: enableBorderLeft ? undefined : "white",
            borderLeftColor: enableBorderLeft ? "white" : undefined,
          }}
        />
      </View>
    </View>
  );
};

export default ArrowPointer;
