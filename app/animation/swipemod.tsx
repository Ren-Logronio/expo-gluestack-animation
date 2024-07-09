import SwipeableTransition from "@/custom-components/SwipeableTransition";
import {
  HStack,
  Textarea,
  TextareaInput,
  VStack,
  View,
  styled,
} from "@gluestack-ui/themed";
import { Center } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { useEffect, useRef, useState } from "react";
import { Text } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import useSwipeTransition from "@/hooks/useSwipeTransition";
import { ActivityIndicator, Animated, useWindowDimensions } from "react-native";
import { Path, Svg } from "react-native-svg";
import { AnimatedView } from "@gluestack-style/animation-resolver";
import { router } from "expo-router";

const StyledAnimatedView = styled(AnimatedView);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function ModularSwipe() {
  return (
    <SwipeableTransition
      firstScreen={<FirstScreen />}
      secondScreen={<SecondScreen />}
    />
  );
}

export function FirstScreen() {
  const { raiseTransition, onBeginTransition, removeBeginTransition } =
    useSwipeTransition();

  useEffect(() => {
    const id = onBeginTransition(async () => {
      await sendRequest();
      setTimeout(() => {
        router.push("/");
      }, 4000);
    });
    return () => {
      removeBeginTransition(id);
    };
  }, []);

  return (
    <View flex={1} bg="$trueGray700">
      <Center flex={1}>
        <Heading color="white">Feedback</Heading>
        <ReviewForm
          onCompleted={() => {
            raiseTransition && raiseTransition(true);
          }}
          onUncompleted={() => {
            raiseTransition && raiseTransition(false);
          }}
        />
        <Textarea size="md" w="$72" mt="$4" borderColor="white">
          <TextareaInput placeholder="Enter comments (Optional)..." />
        </Textarea>
      </Center>
    </View>
  );
}

export function ReviewForm({
  onCompleted,
  onUncompleted,
}: {
  onCompleted?: () => void;
  onUncompleted?: () => void;
}) {
  const [reviewForm, setReviewForm] = useState([
    { id: 1, title: "Review 1", reviewed: false },
    { id: 2, title: "Review 2", reviewed: false },
    { id: 3, title: "Review 3", reviewed: false },
    { id: 4, title: "Review 4", reviewed: false },
    { id: 5, title: "Review 5", reviewed: false },
  ]);

  useEffect(() => {
    const allReviewed = reviewForm.every((review) => review.reviewed);
    if (allReviewed) {
      onCompleted && onCompleted();
    }
  }, [reviewForm]);

  return (
    <>
      <VStack w="$full" px="$4" space="md" mt="$3">
        {reviewForm.map((review, index) => {
          return (
            <HStack
              key={index}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text color="white" my="auto">
                {review.title}
              </Text>
              <Rate
                onComplete={(completed) => {
                  setReviewForm((prev) => {
                    const allReviewed = prev.every((review) => review.reviewed);
                    if (allReviewed) {
                      onUncompleted && onUncompleted();
                    }
                    return prev.map((prevReview) =>
                      prevReview.id === review.id
                        ? { ...prevReview, reviewed: completed }
                        : prevReview
                    );
                  });
                }}
              />
            </HStack>
          );
        })}
      </VStack>
    </>
  );
}

export function Rate({
  onComplete,
}: {
  onComplete: (complete: boolean) => void;
}) {
  const [rate, setRate] = useState(0);
  useEffect(() => {
    onComplete(!!rate);
  }, [rate]);
  return (
    <HStack>
      {Array.from({ length: 5 }).map((_, index) => {
        const rateIndex = index + 1;
        return (
          <Pressable
            key={index}
            onPress={() => {
              if (rateIndex === rate) {
                setRate(0);
                return;
              }
              setRate(rateIndex);
            }}
          >
            <Text color="yellow" fontSize="$3xl">
              {rateIndex <= rate ? "★" : "☆"}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
}

export function SecondScreen() {
  const beginTransition = useRef(new Animated.Value(0)).current;

  const { progress } = useSwipeTransition();

  useEffect(() => {
    if (progress === "loading") {
      Animated.timing(beginTransition, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [progress]);

  return (
    <Center flex={1}>
      <TripleCaretUpAnimation beginTransition={beginTransition} />
      {progress === "loading" && (
        <VStack>
          <ActivityIndicator color="black" size="large"></ActivityIndicator>
          <Heading color="$trueGray700">Sending Feedback</Heading>
        </VStack>
      )}
      {progress === "success" && <SuccessTransition />}
    </Center>
  );
}

export function TripleCaretUpAnimation({
  beginTransition,
}: {
  beginTransition: Animated.Value;
}) {
  const beat1 = useRef(new Animated.Value(0)).current;
  const beat2 = useRef(new Animated.Value(0)).current;
  const beat3 = useRef(new Animated.Value(0)).current;

  const liftAnimationOpacity = beginTransition.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
  });

  useEffect(() => {
    Animated.loop(
      Animated.stagger(100, [
        Animated.timing(beat1, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(beat2, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(beat3, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <StyledAnimatedView
      position="absolute"
      w="$full"
      h="$full"
      style={{
        opacity: liftAnimationOpacity,
      }}
    >
      <Center flex={1}>
        <VStack>
          <AnimatedSvg
            width={64}
            height={64}
            viewBox="0 0 512 512"
            style={{
              transform: [
                {
                  translateY: beat3.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, -2, 0],
                  }),
                },
              ],
              opacity: beat3.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.75, 1],
              }),
            }}
          >
            <Path
              fill="#0077e6"
              d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"
            />
          </AnimatedSvg>
          <AnimatedSvg
            width={64}
            height={64}
            viewBox="0 0 512 512"
            style={{
              transform: [
                {
                  translateY: beat2.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, -2, 0],
                  }),
                },
              ],
              opacity: beat2.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.75, 1],
              }),
            }}
          >
            <Path
              fill="#0077e6"
              d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"
            />
          </AnimatedSvg>
          <AnimatedSvg
            width={64}
            height={64}
            viewBox="0 0 512 512"
            style={{
              transform: [
                {
                  translateY: beat1.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, -2, 0],
                  }),
                },
              ],
              opacity: beat1.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.75, 1],
              }),
            }}
          >
            <Path
              fill="#0077e6"
              d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"
            />
          </AnimatedSvg>
        </VStack>
      </Center>
    </StyledAnimatedView>
  );
}

export function SuccessTransition() {
  const checkBoxAnimation = useRef(new Animated.Value(0)).current;
  const strokeOffset = checkBoxAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [55, 0],
  });

  useEffect(() => {
    Animated.timing(checkBoxAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <>
      <Svg width={64} height={64} viewBox="0 0 40 40">
        <AnimatedPath
          stroke="green"
          strokeWidth={5}
          strokeDasharray={55}
          strokeDashoffset={strokeOffset}
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        ></AnimatedPath>
      </Svg>
      <Heading
        fontSize="$lg"
        w="$48"
        mt="$5"
        textAlign="center"
        lineHeight="$sm"
        color="$trueGray700"
      >
        Your feedback has been successfully submitted
      </Heading>
    </>
  );
}

// artificial request to simulate a sent request
async function sendRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });
}
