import { VStack, HStack, styled, Box, Text, Center, Pressable } from "@gluestack-ui/themed";
import { AnimatedView } from "@gluestack-style/animation-resolver";
import { Link, useRouter, usePathname, useLocalSearchParams, useGlobalSearchParams  } from "expo-router";
import { useEffect, useState } from "react";
import { useTransitionDirection } from "./TransitionDirectionProvider";

export const BottomNavigationBarBottomBody = styled(VStack, {
    width: "$full",
    height: "$20",
    //
    borderWidth: "$1",
    borderColor: "$rose100",
});

export default function BottomNavigationBar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const globalParams = useGlobalSearchParams();
    const [direction, setDirection] = useTransitionDirection();

    const tabs = (children as any).map((child: any) => {
        return child.props.href;
    });

    const currentPathnameIndex = tabs.indexOf(pathname);
    const previousPathnameIndex = tabs.indexOf(globalParams.previousPathname);
    const animatedTabAccentDirection = currentPathnameIndex > previousPathnameIndex ? "right" : "left";

    useEffect(() => {
        setDirection(animatedTabAccentDirection);
    }, [pathname])

    const animationMovementDistance = 10;

    const animatedTabAccent = tabs.map((tab: string, idx: number) => {
        return styled(AnimatedView, {
            flex: 1,
            backgroundColor: "$rose300",
            ":initial": {
                opacity: previousPathnameIndex === idx ? 1 : 0,
                x: previousPathnameIndex === idx ? 0 : animatedTabAccentDirection === "right" ? -animationMovementDistance : animationMovementDistance,
            },
            ":animate": {
                opacity: currentPathnameIndex === idx ? 1 : 0,
                x: currentPathnameIndex === idx ? 0 : animatedTabAccentDirection === "right" ? animationMovementDistance : -animationMovementDistance,
            },
        });
    });

    return <BottomNavigationBarBottomBody>
        {/* <Text>{previousPathname}</Text> */}
        <HStack justifyContent="space-evenly" minHeight="$1" width="$full">
            {animatedTabAccent.map((Accent: any, index: number) => <Accent key={index}></Accent>)}
            {/* {tabs.map((tab: any, index: number) => <>
                <Box key={index} flex={1} backgroundColor="$rose100" opacity={tab === pathname ? "$100" : "$0"}></Box>
            </>)} */}
        </HStack>
        <HStack justifyContent="space-evenly" width="$full">
            {children}
        </HStack>
    </BottomNavigationBarBottomBody>
}

export function BottomNavigationBarItem({ children, href, ...props }: { children: React.ReactNode, href: string, props?: any }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleRedirect = () => {
        if (pathname === href) return;
        router.push(href);
        router.setParams({ previousPathname: pathname });
    }

    return <Box flex={1} minHeight="$full">
        
        <Pressable onPress={handleRedirect} flex={1} {...props}>
            <Center flex={1} marginBottom="$4">
                <Text textAlign="center">{children}</Text>
            </Center>
        </Pressable>
        
    </Box>
}