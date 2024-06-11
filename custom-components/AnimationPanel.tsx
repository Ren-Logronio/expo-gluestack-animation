import { AnimatedView } from "@gluestack-style/animation-resolver";
import { Box, styled } from "@gluestack-ui/themed";
import { useTransitionDirection } from "./TransitionDirectionProvider";

export default function AnimationPanel({ children }: { children: React.ReactNode }) {
    return (
        <Box flex={1} borderColor="$rose200" borderWidth="$1" p="$4">
            {children}
        </Box>
    );
}