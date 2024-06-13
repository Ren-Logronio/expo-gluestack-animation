import { AnimatedView } from "@gluestack-style/animation-resolver";
import { Box, VStack, styled } from "@gluestack-ui/themed";
import { useTransitionDirection } from "./TransitionDirectionProvider";

export default function AnimationPanel({ children }: { children: React.ReactNode }) {
    return (
        <VStack space="lg" flex={1} borderColor="$rose200" borderWidth="$1" p="$4">
            {children}
        </VStack>
    );
}