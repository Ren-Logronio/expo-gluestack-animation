import { Box, Center, Heading, styled } from "@gluestack-ui/themed";
import AnimationPanel from "../AnimationPanel";
import { AnimatedView } from "@gluestack-style/animation-resolver";
import { useToggle } from "../ToggleProvider";

export default function LeftAndRightSpringStretch() {

    const { autoToggle } = useToggle();

    const distance = 200;

    const AnimatedBoxView = styled(AnimatedView, {
        ":initial": {
            x: autoToggle ? 0 : distance,
            scaleX: 1.4,
        },
        ":animate": {
            x: autoToggle ? distance : 0,
            scaleX: 1,
        },
        ":exit": {
            scaleX: 2,
        },
        ":transition": {
            x: {
                type: "spring",
            },
            scaleX: {
                type: "spring",
                duration: 1500,
            }
        }
    });
    
    return (
        <AnimationPanel>
            <Heading fontSize="$lg">x pos with spring + stretch</Heading>
            <AnimatedBoxView>
                <Box borderRadius="$full" w="$20" h="$20" backgroundColor="$rose500"></Box>
            </AnimatedBoxView>
        </AnimationPanel>
    );
}