import { Center, ScrollView, Text, View } from "@gluestack-ui/themed";
import { createContext, useState, useEffect, useRef } from "react";
import { Animated, PanResponder, useWindowDimensions } from "react-native";
import { AnimatedView } from "./AnimatedView";

export type TransitionProgressType =
  | "covered"
  | "raised"
  | "loading"
  | "success"
  | "error";

export type GestureContextType = {
  progress: TransitionProgressType;
  raiseTransition: (raise?: boolean) => void;
  onBeginTransition: (callback: () => Promise<any>) => number;
  removeBeginTransition: (id: number) => void;
};

export interface TransitionConfig {
  initiallyRaised?: boolean;
  transitionToRouteOnSuccess?: string;
}

export const GestureContext = createContext<GestureContextType>({
  progress: "covered",
  raiseTransition: (raise) => {},
  onBeginTransition: () => -1,
  removeBeginTransition: (id) => {},
});

export default function SwipeableTransition({
  firstScreen,
  secondScreen,
  config = {},
}: {
  firstScreen: React.ReactNode;
  secondScreen: React.ReactNode;
  config?: TransitionConfig;
}) {
  const [progress, setProgress] = useState<TransitionProgressType>(
    config?.initiallyRaised ? "raised" : "covered"
  );
  const [listeners, setListeners] = useState<
    { fn: () => Promise<any>; id: number }[]
  >([]);
  const firstScreenLift = useRef(new Animated.Value(0)).current;
  const raiseScreenLift = useRef(new Animated.Value(0)).current;
  const screenHeight = useWindowDimensions().height;

  const SwipePanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;
        console.log("🚀 ~ dy:", dy);
      },
      onPanResponderRelease: (evt, gestureState) => {},
    })
  ).current;

  useEffect(() => {
    if (progress === "raised") {
      Animated.spring(raiseScreenLift, {
        toValue: 80,
        useNativeDriver: false,
      }).start();
    } else if (progress === "covered") {
      Animated.spring(raiseScreenLift, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [progress]);

  const raiseTransition = (raise = true) => {
    setProgress(raise ? "raised" : "covered");
  };

  const onBeginTransition = (callback: () => Promise<any>) => {
    let id: number = -1;
    setListeners((prev) => {
      id = prev.length;
      return [...prev, { fn: callback, id }];
    });
    return id;
  };

  const removeBeginTransition = (id: number) => {
    setListeners((prev) => prev.filter((listener) => listener.id !== id));
  };

  const handleBeginTransition = async () => {
    setProgress("loading");
    const listenerCallbacks = listeners.filter(
      (listener) => typeof listener.fn === "function"
    );
    for (const listener of listenerCallbacks) {
      await listener.fn();
    }
    setProgress("success");
  };

  return (
    <GestureContext.Provider
      value={{
        progress,
        raiseTransition,
        onBeginTransition,
        removeBeginTransition,
      }}
    >
      <View>{secondScreen}</View>
      <AnimatedView
        flex={1}
        position="absolute"
        bottom="$0"
        h="$20"
        w="$full"
        b
        style={{
          transform: [
            {
              translateY: firstScreenLift,
            },
          ],
        }}
        {...SwipePanResponder.panHandlers}
      >
        <Center flex={1}>
          <Text>Swipe up to submit feedback</Text>
        </Center>
      </AnimatedView>
      <AnimatedView
        position="absolute"
        h="$full"
        w="$full"
        overflow="hidden"
        style={{
          transform: [
            {
              translateY: Animated.add(
                firstScreenLift,
                Animated.multiply(raiseScreenLift, -1)
              ),
            },
          ],
          borderBottomLeftRadius: raiseScreenLift.interpolate({
            inputRange: [0, 80],
            outputRange: [0, 32],
          }),
          borderBottomRightRadius: raiseScreenLift.interpolate({
            inputRange: [0, 80],
            outputRange: [0, 32],
          }),
        }}
      >
        {firstScreen}
      </AnimatedView>

      <Text position="absolute" bottom="$0" color="$blueGray500">
        progress: {progress}
      </Text>
    </GestureContext.Provider>
  );
}
