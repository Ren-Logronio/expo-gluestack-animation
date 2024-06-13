
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
import { View } from "react-native";
import { Link } from "expo-router";
import { AnimatePresence, AnimatedText, AnimatedView } from "@gluestack-style/animation-resolver";
import { useState, useEffect } from "react";
import AnimationPanel from "@/custom-components/AnimationPanel";
import LeftAndRight from "@/custom-components/basic-animations/LeftAndRight";
import LeftAndRightSpring from "@/custom-components/basic-animations/LeftAndRightSpring";
import LeftAndRightSpringStretch from "@/custom-components/basic-animations/LeftAndRightSpringStretch";
import LeftRightSpring from "@/custom-components/basic-animations/LeftRightSpring";
import PressableMorph from "@/custom-components/basic-animations/PressableMorph";


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

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

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
  useEffect(() => {
    console.log("🚀 ~ Home ~ isPressed:", isPressed)

  }, [isPressed]);

  const AnimatedContainer = styled(AnimatedView, {

  });

  return (
    <VStack flex={1} backgroundColor="$white" space="lg">
      <Heading>Basic Animations</Heading>

      {/* <Button onPress={() => setToggle((prevState) => !prevState)}><Text>Show</Text></Button> */}
      {/* <AnimatePresence> */}
        <PressableMorph
            animateProps={{
              opacity: isPressed ? 0.2 : 1,
            }}
            onPress={() => setIsPressed((prevState) => !prevState)}
          />
      {/* </AnimatePresence> */}

        {/* <AnimatePresence>
        <LeftRightSpring 
          states={{ pressed: isPressed }}
          onPress={() => setIsPressed((prevState) => !prevState)}
        /> 

        </AnimatePresence> */} 
    </VStack>
  );
}
