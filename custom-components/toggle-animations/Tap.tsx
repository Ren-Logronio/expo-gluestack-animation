import { Box, Center, Heading, styled } from "@gluestack-ui/themed";
import AnimationPanel from "../AnimationPanel";
import { AnimatedPressable } from "@gluestack-style/animation-resolver";
import { useToggle } from "../ToggleProvider";
import { useState } from "react";

const AnimatedBoxPressable = styled(AnimatedPressable, {
    w: "$20",
    h: "$20",
    backgroundColor: "$rose500",
    ":initial": {
        x: 0,
    },
    ":transition": {
        x: {
            type: "spring",
            duration: 200,
        }
    }
});

export default function Tap() {

    const [isTapped, setIsTapped] = useState(false);
    
    return (
        <AnimationPanel>
            <Heading fontSize="$lg">Tapped</Heading>
            <AnimatedBoxPressable 
                animate={{ x: isTapped ? 200 : 0 }}
                onPress={() => setIsTapped(!isTapped)}
            >
            </AnimatedBoxPressable>
        </AnimationPanel>
    );
}