import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  GluestackUIProvider,
  Text,
  Box,
  VStack,
  ScrollView,
  styled,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useColorScheme } from "@/components/useColorScheme";
import { Slot, Tabs, router, usePathname } from "expo-router";
import { AnimationResolver } from "@gluestack-style/animation-resolver";
import { MotionAnimationDriver } from "@gluestack-style/legend-motion-animation-driver";
import BottomNavigationBar, {
  BottomNavigationBarItem,
} from "@/custom-components/BottomNavigationBar";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import TransitionDirectionProvider from "@/custom-components/TransitionDirectionProvider";
import ToggleProvider from "@/custom-components/ToggleProvider";
import * as Application from "expo-application";
import { SafeAreaView } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useLayoutEffect(() => {
  //   setStyleLoaded(true);
  // }, [styleLoaded]);

  // if (!loaded || !styleLoaded) {
  //   return null;
  // }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathname = usePathname();
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider
      config={{
        ...config,
        plugins: [new AnimationResolver(MotionAnimationDriver)],
      }}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <TransitionDirectionProvider>
          <ToggleProvider>
            <ScrollView flex={1}>
              <SafeAreaView>
                <Slot />
              </SafeAreaView>
            </ScrollView>
            {!pathname.startsWith("/animation") && (
              <BottomNavigationBar>
                <BottomNavigationBarItem href="/">Test</BottomNavigationBarItem>
                <BottomNavigationBarItem href="/toggles">
                  Gluestack
                </BottomNavigationBarItem>
                <BottomNavigationBarItem href="/basic">
                  Gluestack Animations
                </BottomNavigationBarItem>
              </BottomNavigationBar>
            )}
          </ToggleProvider>
        </TransitionDirectionProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
