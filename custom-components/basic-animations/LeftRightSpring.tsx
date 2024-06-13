import { AnimatedView, AnimatedPressable } from "@gluestack-style/animation-resolver";
import { styled } from "@gluestack-style/react";

const LeftRightSpring = styled(AnimatedPressable, {
    w:"$20",
    h:"$20",
    backgroundColor:"$rose500",
    ":pressed": {
        backgroundColor: "$rose700",
    },
    ":initial": {
        x: 0,
    },
    ":animate": {
        x: 200
    },
    ":exit": {
        x: 0
    },
    ":transition": { 
        x: { 
            type: "tween",
            duration: 1000
        }
    }
})

export default LeftRightSpring;