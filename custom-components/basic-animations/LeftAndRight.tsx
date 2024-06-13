import { Box, Center, Heading, styled } from "@gluestack-ui/themed";
import AnimationPanel from "../AnimationPanel";
import { AnimatedView } from "@gluestack-style/animation-resolver";
import { useToggle } from "../ToggleProvider";

export default function LeftAndRight() {

    const { autoToggle } = useToggle();

    const distance = 200;

    const AnimatedBoxView = styled(AnimatedView, {
        ":initial": {
            x: autoToggle ? 0 : distance,
        },
        ":animate": {
            x: autoToggle ? distance : 0,
        }
    });
    
    return (
        <AnimationPanel>
            <Heading fontSize="$lg">x pos</Heading>
            <AnimatedBoxView>
                <Box w="$20" h="$20" backgroundColor="$rose500"></Box>
            </AnimatedBoxView>
        </AnimationPanel>
    );
}