import { AnimatedView } from "@gluestack-style/animation-resolver";
import { Pressable, Textarea, TextareaInput } from "@gluestack-ui/themed";
import {
  Button,
  ButtonText,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  View,
  styled,
  set,
} from "@gluestack-ui/themed";
import { getIosPushNotificationServiceEnvironmentAsync } from "expo-application";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  GestureResponderEvent,
  useWindowDimensions,
} from "react-native";
import { Svg, Path } from "react-native-svg";

const StyledAnimatedView = styled(AnimatedView);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function Swipe() {
  const [disabled, setDisabled] = useState(false);
  const [feedbackCompleted, setFeedbackCompleted] = useState(false);
  const liftViewY = useRef(new Animated.Value(0)).current;
  const liftBoxY = useRef(new Animated.Value(0)).current;
  const roundBoxBottom = liftBoxY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 16],
  });
  const liftedViewHeight = useWindowDimensions().height;
  const prevTouchEvent = useRef({ pageY: 0, timestamp: 0 });

  useEffect(() => {
    if (disabled) {
      Animated.spring(liftBoxY, {
        toValue: 80,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(liftBoxY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [disabled]);

  const animateSpringBackToBottom = (animatedValue: Animated.Value) => {
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const animateSpringOutOfScreen = (animatedValue: Animated.Value) => {
    Animated.spring(animatedValue, {
      toValue: -liftedViewHeight,
      useNativeDriver: false,
    }).start();
  };

  const handleResponderMove = (event: GestureResponderEvent) => {
    if (!disabled) return;
    prevTouchEvent.current = event.nativeEvent;
    liftViewY.setValue(event.nativeEvent.pageY - liftedViewHeight);
  };

  const handleResponderRelease = (event: GestureResponderEvent) => {
    const pageY = event.nativeEvent?.pageY;
    const timestamp = event.nativeEvent?.timestamp;
    const prevPageY = prevTouchEvent.current?.pageY;
    const prevTimestamp = prevTouchEvent.current?.timestamp;
    const velocity = calculateVelocity(
      prevPageY,
      pageY,
      prevTimestamp,
      timestamp
    );
    if (pageY > liftedViewHeight * 0.2 && velocity < 1.5) {
      animateSpringBackToBottom(liftViewY);
    } else {
      animateSpringOutOfScreen(liftViewY);
      setFeedbackCompleted(true);
    }
  };

  return (
    <View flex={1}>
      <View bg="$lightBlue300" flex={1}>
        <SecondScreen liftViewY={liftViewY} begin={feedbackCompleted} />
      </View>
      <StyledAnimatedView
        position="absolute"
        w="$full"
        h="$full"
        style={{
          top: liftViewY,
        }}
      >
        <FirstScreen onChangeComplete={setDisabled} />
        <View
          flex={1}
          maxHeight="$20"
          onMoveShouldSetResponder={() => true}
          onResponderMove={handleResponderMove}
          onResponderRelease={handleResponderRelease}
        >
          <Center flex={1}>
            <Text>Swipe up to submit feedback</Text>
          </Center>
        </View>
        <StyledAnimatedView
          position="absolute"
          w="$full"
          h="$24"
          bg="$trueGray700"
          style={{
            bottom: liftBoxY,
            borderBottomLeftRadius: roundBoxBottom,
            borderBottomRightRadius: roundBoxBottom,
          }}
        ></StyledAnimatedView>
      </StyledAnimatedView>
    </View>
  );
}

export function FirstScreen({
  onChangeComplete,
}: {
  onChangeComplete: (completed: boolean) => void;
}) {
  return (
    <View
      flex={1}
      bg="$trueGray700"
      borderBottomLeftRadius="$2xl"
      borderBottomRightRadius="$2xl"
    >
      <Center flex={1}>
        <Heading color="white">Feedback</Heading>
        <ReviewForm
          onCompleted={() => {
            onChangeComplete && onChangeComplete(true);
          }}
          onUncompleted={() => {
            onChangeComplete && onChangeComplete(false);
          }}
        />
        <Textarea size="md" w="$72" mt="$4" borderColor="white">
          <TextareaInput placeholder="Enter comments (Optional)..." />
        </Textarea>
      </Center>
    </View>
  );
}

export function SecondScreen({
  begin,
  liftViewY,
}: {
  begin: boolean;
  liftViewY: Animated.Value;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const liftedViewHeight = useWindowDimensions().height;
  const beginTransition = useRef(new Animated.Value(0)).current;

  const floatEffect = liftViewY.interpolate({
    inputRange: [0, liftedViewHeight],
    outputRange: [35, -35],
  });

  useEffect(() => {
    if (begin) {
      Animated.timing(beginTransition, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();

      setLoading(true);
      sendRequest().then(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          router.back();
        }, 4000);
      });
    }
  }, [begin]);

  return (
    <Center flex={1}>
      <TripleCaretUpAnimation
        begin={begin}
        beginTransition={beginTransition}
        floatEffect={floatEffect}
      />
      {loading && (
        <VStack>
          <ActivityIndicator color="black" size="large"></ActivityIndicator>
          <Heading color="$trueGray700">Sending Feedback</Heading>
        </VStack>
      )}
      {success && <SuccessTransition />}
    </Center>
  );
}

export function TripleCaretUpAnimation({
  begin,
  beginTransition,
  floatEffect,
}: {
  begin: boolean;
  beginTransition: Animated.Value;
  floatEffect: Animated.AnimatedInterpolation<string | number>;
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
        transform: [
          {
            translateY: floatEffect,
          },
        ],
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

// artificial request to simulate a sent request
async function sendRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });
}

export function calculateVelocity(
  initialPosition: number,
  finalPosition: number,
  initialTimestamp: number,
  finalTimestamp: number
) {
  return (
    (finalPosition - initialPosition) / (finalTimestamp - initialTimestamp)
  );
}
