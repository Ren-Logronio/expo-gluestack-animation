import { View } from "@gluestack-ui/themed";
import { Center } from "@gluestack-ui/themed";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Defs, Path, RadialGradient, Stop, Svg } from "react-native-svg";
import { BlurView } from "expo-blur";
import { Text } from "@gluestack-ui/themed";

export const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function Heartbeat() {
  const beat = useRef(new Animated.Value(0)).current;
  const iteration = useRef(new Animated.Value(0)).current;
  const coreHeartScale = beat.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const hearbeatAnimation = Animated.stagger(250, [
    Animated.spring(beat, {
      toValue: 1,
      useNativeDriver: true,
    }),
    Animated.spring(beat, {
      toValue: 0,
      useNativeDriver: true,
    }),
  ]);

  useEffect(() => {
    Animated.loop(hearbeatAnimation).start();
  }, []);

  return (
    <Center flex={1} bg="black">
      <AnimatedSvg
        width={200}
        height={200}
        viewBox="0 -4 62 74"
        style={{
          transform: [
            {
              scale: 1,
            },
          ],
          position: "absolute",
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <Path
          stroke="red"
          strokeWidth={1}
          d="M 32 60 C -29.2 19.6 13.2 -12 31.2 4.4 C 31.6 4.8 31.6 5.2 32 5.2 A 12.4 12.4 90 0 1 32.8 4.4 C 50.8 -12 93.2 19.6 32 60 Z"
        />
      </AnimatedSvg>
      {/** Core Heart */}
      <AnimatedSvg
        width={200}
        height={200}
        viewBox="0 -4 62 74"
        style={{
          transform: [
            {
              scale: coreHeartScale,
            },
          ],
          position: "absolute",
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <Path
          stroke="red"
          strokeWidth={1}
          d="M 32 60 C -29.2 19.6 13.2 -12 31.2 4.4 C 31.6 4.8 31.6 5.2 32 5.2 A 12.4 12.4 90 0 1 32.8 4.4 C 50.8 -12 93.2 19.6 32 60 Z"
        />
      </AnimatedSvg>
      <AnimatedSvg
        width={200}
        height={200}
        viewBox="0 -4 62 74"
        style={{
          transform: [
            {
              scale: coreHeartScale,
            },
          ],
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <Defs>
          {/** radial gradient */}
          <RadialGradient id="grad" cx="50%" cy="55%" r="50%" fx="50%" fy="50%">
            <Stop offset="100%" stopColor="red" stopOpacity={1} />
            <Stop offset="0%" stopColor="black" stopOpacity={1} />
          </RadialGradient>
        </Defs>
        <Path
          fill="url(#grad)"
          d="M 32 60 C -29.2 19.6 13.2 -12 31.2 4.4 C 31.6 4.8 31.6 5.2 32 5.2 A 12.4 12.4 90 0 1 32.8 4.4 C 50.8 -12 93.2 19.6 32 60 Z"
        />
      </AnimatedSvg>
    </Center>
  );
}
