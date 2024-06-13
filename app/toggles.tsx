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
  
  import { Link } from "expo-router";
  import { AnimatePresence, AnimatedText, AnimatedView } from "@gluestack-style/animation-resolver";
  import { useState } from "react";
  import { AnimatedHeader } from "@/custom-components/AnimatedHeader";
import LeftAndRight from "@/custom-components/basic-animations/LeftAndRight";
import Tap from "@/custom-components/toggle-animations/Tap";
  
  // const StyledAnimatedView = styled(AnimatedView, {
  //   ":initial": {
  //     backgroundColor: "$amber100",
  //     scale: 0,
  //     marginTop: 0,
  //   },
  // });
  
  // const StyledText = styled(Text, {
  //   backgroundColor: "$transparent",
  //   color: "$black",
  // });
  
  export default function Root() {
    const [toggle, setToggle] = useState(false);
  
    // const StyledAnimatedView = styled(AnimatedView, {
    //   ":initial": {
    //     backgroundColor: "$amber100",
    //     scale: toggle ? 0.5 : 1,
    //     marginTop: 0,
    //   },
    //   ":animate": {
    //     scale: toggle ? 1 : 0.5,
    //   }
    // });
  
    return (
      <VStack flex={1} backgroundColor="$white" space="lg">
      <Heading>Toggles</Heading>
      <Tap/>
      {/* <Center flex={1} h="$full">
        <Text>Nothing to Show</Text>
      </Center> */}
    </VStack>
    );
  }
  