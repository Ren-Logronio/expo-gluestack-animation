import CustomVStack from "@/custom-components/CustomVStack";
import { Heading, VStack } from "@gluestack-ui/themed";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { ClipPath, Defs, Mask, Path, Rect, LinearGradient, Stop } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function SvgScreen() {

    const strokeAnimation: any = useRef(new Animated.Value(60)).current;
    const fillAnimation: any = useRef(new Animated.Value(0)).current;
    const interpolatedFillAnimation = fillAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)']
    });

    useEffect(() => {

        // stroke animation looped sequence
        Animated.loop(
            Animated.sequence([
                Animated.timing(strokeAnimation, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(strokeAnimation, {
                    toValue: 60,
                    duration: 2000,
                    useNativeDriver: true
                })
            ])
        ).start();

        // fill color animation looped sequence
        // Animated.loop(
        //     Animated.sequence([
        //         Animated.timing(fillAnimation, {
        //             toValue: 0,
        //             duration: 2000,
        //             useNativeDriver: true
        //         }),
        //         Animated.timing(fillAnimation, {
        //             toValue: 1,
        //             duration: 2000,
        //             useNativeDriver: true
        //         })
        //     ])
        // ).start();
    }, [])

    return <VStack flex={1} backgroundColor="$white" space="lg">
        <Heading>SVG Animations</Heading>
        <CustomVStack>
            <Heading>React Native - Stroke</Heading>
            <Svg
            width={90}
            height={90}
            fill="none"
            >
                <AnimatedPath stroke="#ffaa00" strokeWidth={0.8} strokeDasharray={60} strokeDashoffset={strokeAnimation} scale={5} d="M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 1" ></AnimatedPath>
            </Svg>
        </CustomVStack>
        <CustomVStack>
            <Heading>React Native - Fill</Heading>
            <Svg
            width={64}
            height={64}
            fill="none"
            >
                <AnimatedPath 
                fill={interpolatedFillAnimation} 
                opacity={fillAnimation}
                scale={4} 
                d="M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 1" ></AnimatedPath>
            </Svg>
        </CustomVStack>
        <CustomVStack>
            <Heading>React Native - Mask</Heading>
            <Svg
                width={64}
                height={64}
                fill="none"
            >
                <Defs>
                    <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stop-color="white" stopOpacity="1" />
                        <Stop offset="1" stop-color="black" stopOpacity="1" />
                    </LinearGradient>
                    <Mask id="mask" scale={4} x="0" y="0" width="64" height="64">
                        <Path fill="url(#gradient)" d="M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 1" ></Path>
                    </Mask>
                </Defs>
                <Rect mask="url(#mask)" fill="red" scale={4} width="64" height="64"/>
            </Svg>
        </CustomVStack>
        <CustomVStack>
            <Heading>Gluestack Animation - Stroke</Heading>
        </CustomVStack>
        <CustomVStack>
            <Heading>Gluestack Animation - Mask</Heading>
        </CustomVStack>
    </VStack>
}