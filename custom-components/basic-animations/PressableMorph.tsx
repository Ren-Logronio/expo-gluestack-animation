import { AnimatedPressable } from "@gluestack-style/animation-resolver";
import { styled } from "@gluestack-style/react";

const PressableMorph = styled(AnimatedPressable, {
    w:"$20",
    h:"$20",
    backgroundColor:"$rose500",
    left: 150,
    // ":initial": {
    //     "rotate": 0,

    // },
    // ":animate": {
    //     "rotate": 200,
    // },
    // ":onAnimationComplete": {
    //     x: 100,
    // }
}); 

export default PressableMorph;