import {
  Button,
  ButtonText,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useToggle } from "@/custom-components/ToggleProvider";
import CustomVStack from "@/custom-components/CustomVStack";
import { Animated } from "react-native";
import { Defs, Path, Pattern, Svg } from "react-native-svg";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

const staggeredText =
  "Hello world, this is a staggered text animation. The effect slowly reveal the entire text word by word.";

export default function Home() {
  const { autoToggle } = useToggle();

  return (
    <VStack flex={1} backgroundColor="$white" space="lg" px="$6">
      <Heading>Kapa kapa ta run</Heading>
      {/* <CustomVStack h="$40">
        <Heading>SVG Wave</Heading>
        <Svg>
          <Defs>
            <Pattern
              viewBox="10 0 170 100"
              id="pattern"
              patternUnits="userSpaceOnUse"
              width={80}
              height={80}
            >
              <Path
                d={`M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80`}
                stroke="black"
                strokeWidth={5}
                fill="transparent"
              />
            </Pattern>
          </Defs>
          <Path fill="url(#pattern)" d="M0 0 L0 100 L800 100 L800 0 Z" />
        </Svg>
        <Text>
          Note: Pattern rendering is slow, might be an issue with
          react-native-svg
        </Text>
      </CustomVStack> */}
      <Button
        onPress={() => {
          router.push("/animation/heartbeat");
        }}
      >
        <ButtonText>HeartBeat</ButtonText>
      </Button>
      <Button
        onPress={() => {
          router.push("/animation/swipe");
        }}
      >
        <ButtonText>Swipe</ButtonText>
      </Button>
    </VStack>
  );
}
