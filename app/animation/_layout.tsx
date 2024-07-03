import { View } from "@gluestack-ui/themed";
import { Slot } from "expo-router";
import { useWindowDimensions } from "react-native";

export default function AnimationLayout() {
  const { height, width } = useWindowDimensions();

  return (
    <View
      style={{
        height,
      }}
    >
      <Slot />
    </View>
  );
}
