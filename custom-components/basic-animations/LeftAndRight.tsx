import { Box, Center } from "@gluestack-ui/themed";
import AnimationPanel from "../AnimationPanel";

export default function LeftAndRight() {
    return (
        <AnimationPanel>
            <Center>
                <Box w="$20" h="$20" backgroundColor="$rose500"></Box>
            </Center>
        </AnimationPanel>
    );
}