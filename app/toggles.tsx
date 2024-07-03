import {
  Button,
  ButtonText,
  Center,
  HStack,
  Heading,
  SelectBackdrop,
  SelectIcon,
  SelectInput,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectDragIndicator,
  SelectContent,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { useState } from "react";
import Tap from "@/custom-components/toggle-animations/Tap";
import CustomVStack from "@/custom-components/CustomVStack";
import AnimatedBoxView from "@/custom-components/AnimatedBoxView";
import { ChevronDown } from "lucide-react-native";
import { Select } from "@gluestack-ui/themed";
import { SelectTrigger } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { SelectPortal } from "@gluestack-ui/themed";
import Filler from "@/custom-components/Filler";
import CustomAnimatedPressable from "@/custom-components/AnimatedPressable";

export default function Root() {
  const [type, setType] = useState("spring");
  const [stiffness, setStiffness] = useState(200);
  const [damping, setDamping] = useState(20);
  const [duration, setDuration] = useState(250);
  const [isPressed, setIsPressed] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  return (
    <VStack flex={1} backgroundColor="$white" space="lg" px="$6">
      <Heading>Toggles</Heading>

      {/*//* ON PRESS ANIMATION  */}
      <Tap />

      <HStack space="lg">
        {/*//* WHILE PRESSED IN ANIMATION  */}
        <CustomVStack>
          <Heading>While Tapped</Heading>
          <CustomAnimatedPressable
            h="$12"
            w="$32"
            initial={{ y: 0 }}
            animate={{ y: isTapped ? 4 : 0 }}
            transition={{
              y: {
                type: "spring",
                stiffness: 1000,
                dampening: 20,
                duration: 100,
                timing: "ms",
              },
            }}
            onPressIn={() => setIsTapped(true)}
            onPressOut={() => setIsTapped(false)}
          >
            <Center flex={1}>
              <Text color="$white">Hello World</Text>
            </Center>
          </CustomAnimatedPressable>
        </CustomVStack>
      </HStack>

      {/*//* STIFFNESS AND DAMPENING ANIMATION */}
      <CustomVStack space="lg">
        <Heading>Stiffness and Dampening</Heading>
        <Text>Type</Text>
        <Select onValueChange={(value) => setType(value)}>
          <SelectTrigger variant="outline" size="md">
            <SelectInput value={type} placeholder="Select option" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDown} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Linear" value="linear" />
              <SelectItem label="Spring" value="spring" />
              <SelectItem label="Tween" value="tween" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Text>Stiffness ({stiffness})</Text>
        <Slider
          defaultValue={stiffness}
          minValue={1}
          maxValue={1500}
          onChange={(value) => setStiffness(value)}
          size="md"
          orientation="horizontal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>Dampening ({damping})</Text>
        <Slider
          defaultValue={damping}
          minValue={1}
          maxValue={300}
          onChange={(value) => setDamping(value)}
          size="md"
          orientation="horizontal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>Duration ({duration} ms)</Text>
        <Slider
          defaultValue={duration}
          minValue={0}
          maxValue={3000}
          onChange={(value) => setDuration(value)}
          size="md"
          orientation="horizontal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button onPress={() => setIsPressed((prev) => !prev)}>
          <ButtonText>Animate</ButtonText>
        </Button>
        <AnimatedBoxView
          animate={{
            x: isPressed ? 200 : 0,
            backgroundColor: isPressed ? "#00f" : "#0f0",
          }}
          transition={{
            x: {
              type: type,
              stiffness: stiffness,
              damping: damping,
              duration: duration,
              timing: "ms",
            },
            backgroundColor: {
              type: type,
              duration: duration,
              timing: "ms",
            },
          }}
        />
      </CustomVStack>

      <Filler />
    </VStack>
  );
}
