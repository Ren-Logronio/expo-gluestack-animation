import { AnimatedView } from "@gluestack-style/animation-resolver";
import { Center, Text, View, styled } from "@gluestack-ui/themed";
import { getIosPushNotificationServiceEnvironmentAsync } from "expo-application";
import { useRef } from "react";
import { Animated, useWindowDimensions } from "react-native";

const StyledAnimatedView = styled(AnimatedView);

export default function Swipe() {
  const liftViewY = useRef(new Animated.Value(0)).current;
  const liftedViewHeight = useWindowDimensions().height;
  const prevTouchEvent = useRef({ pageY: 0, timestamp: 0 });
  return (
    <View flex={1}>
      <View bg="$lightBlue300" flex={1}>
        <Text>View 2</Text>
      </View>
      <StyledAnimatedView
        position="absolute"
        w="$full"
        h="$full"
        style={{
          top: liftViewY,
        }}
      >
        <View
          flex={1}
          bg="$trueGray700"
          borderBottomLeftRadius="$2xl"
          borderBottomRightRadius="$2xl"
        >
          <Center flex={1}>
            <Text color="white">View 1</Text>
          </Center>
        </View>
        <View
          minHeight="$20"
          onMoveShouldSetResponder={() => true}
          onResponderMove={(event) => {
            liftViewY.setValue(event.nativeEvent.pageY - liftedViewHeight);
            prevTouchEvent.current = event.nativeEvent;
          }}
          onResponderRelease={(event) => {
            const pageY = event.nativeEvent.pageY;
            const timestamp = event.nativeEvent.timestamp;
            const prevPageY = prevTouchEvent.current?.pageY;
            const prevTimestamp = prevTouchEvent.current?.timestamp;
            const velocity = (pageY - prevPageY) / (timestamp - prevTimestamp);
            console.log("🚀 ~ Swipe ~ velocity:", velocity);
            if (pageY > liftedViewHeight * 0.1 && velocity < 1.5) {
              Animated.spring(liftViewY, {
                toValue: 0,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.spring(liftViewY, {
                toValue: -liftedViewHeight,
                useNativeDriver: false,
              }).start();
            }
          }}
        >
          <Center flex={1}>
            <Text>Swipe up to continue</Text>
          </Center>
        </View>
      </StyledAnimatedView>
    </View>
  );
}
