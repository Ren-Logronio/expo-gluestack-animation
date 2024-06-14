import { Box, Center, Heading, styled } from "@gluestack-ui/themed";
import { AnimatedPressable } from "@gluestack-style/animation-resolver";
import { useToggle } from "../ToggleProvider";
import { useState } from "react";
import { VStack } from "@gluestack-ui/themed";

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
        <VStack space="lg" flex={1} borderColor="$rose200" borderWidth="$1" p="$4">
            <Heading fontSize="$lg">Tapped</Heading>
            <AnimatedBoxPressable 
                animate={{ x: isTapped ? 200 : 0 }}
                onPress={() => setIsTapped(!isTapped)}
            >
            </AnimatedBoxPressable>
        </VStack>
    );
}