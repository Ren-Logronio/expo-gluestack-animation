
import {
  Heading,
  VStack,
  styled,
  Fab,
  FabLabel,
  Text,
} from "@gluestack-ui/themed";
import { useToggle } from "@/custom-components/ToggleProvider";
import { AnimatePresence, AnimatedText, AnimatedView,  } from "@gluestack-style/animation-resolver";
import CustomVStack from "@/custom-components/CustomVStack";

const StyledAnimatedText = styled(AnimatedText, {
  ":initial": {opacity: 1},
  ":animate": {opacity: 0},
  ":transition": {
    duration: 500,
    type: "spring",
  }
});

const staggeredText = "Hello world, this is a staggered text animation. The effect slowly reveal the entire text word by word."

export default function Home() {

  const { autoToggle } = useToggle();

  return (
    <VStack flex={1} backgroundColor="$white" space="lg">
      {/* <Fab placement="top right">
        <FabLabel>Reanimate</FabLabel>
      </Fab> */}
      <Heading>UI Elements</Heading>
      <CustomVStack h="$96">
        <Heading>Staggered Text</Heading>
        <AnimatePresence>
          <StyledAnimatedText color="$amber500">test</StyledAnimatedText>
        </AnimatePresence>
      </CustomVStack>
    </VStack>
  );
}
