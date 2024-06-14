import AnimatedBoxView from "@/custom-components/AnimatedBoxView";
import { AnimatePresence, AnimatedView } from "@gluestack-style/animation-resolver";
import {
    Box,
    Button,
    ButtonText,
    Center,
    HStack,
    Heading,
    ScrollView,
    Text,
    VStack,
    styled,
  } from "@gluestack-ui/themed";
  import { useState } from "react";
  
  const FadeInAndOutBox = styled(AnimatedView, {
    h: "$24", w: "$24", backgroundColor: "$rose500",
    ":initial": {
      opacity: 0.2,
      x: 0,
    },
    ":animate": {
      opacity: 1,
      x: 200,
    },
    ":exit": {
      opacity: 0,
      x: 0,
    },
  })
  
  
  export default function Root() {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <VStack flex={1} backgroundColor="$white" space="lg">
      <Heading>Animate Presence</Heading>
      <Button
        onPress={() => setIsVisible(prev => !prev)}
      >
        <ButtonText>{isVisible ? "unmount" : "mount"}</ButtonText>
      </Button>
      <AnimatePresence>
        {
          isVisible && <FadeInAndOutBox />
        }
      </AnimatePresence>
    </VStack>
    );
  }
  