
import {
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { useToggle } from "@/custom-components/ToggleProvider";
import CustomVStack from "@/custom-components/CustomVStack";
import Filler from "@/custom-components/Filler";
import AnimatedBoxView from "@/custom-components/AnimatedBoxView";
import { Center } from "@gluestack-ui/themed";



export default function Home() {
  const [isPressed, setIsPressed] = useState(false);
  const { autoToggle } = useToggle();

  const distance = 200;

  return (
    <VStack flex={1} backgroundColor="$white" space="lg">
      <Heading>Basic Animations</Heading>


      <HStack space="lg">

        {/*//* OPACITY ANIMATION  */}
        <CustomVStack>
          <Heading>opacity</Heading>
          <AnimatedBoxView 
            animate={{
              opacity: autoToggle ? 0 : 1,
            }}
            transition={{
              type: "spring",
            }}
          />
        </CustomVStack>

        {/*//* COLOR ANIMATION  */}
        <CustomVStack>
          <Heading>color</Heading>
          <AnimatedBoxView 
            animate={{
              backgroundColor: autoToggle ? "hsl(23, 100%, 50%)" : "#0bf",
            }}
            transition={{
              type: "spring",
            }}
          />
        </CustomVStack>

        {/*//* GRADIENT ANIMATION  */}
        <CustomVStack>
          <Heading>gradient</Heading>
          <AnimatedBoxView>
            <Center flex={1}>
              <Text color="$white">???</Text>
            </Center>
          </AnimatedBoxView>
        </CustomVStack>

        
      </HStack>

      {/*//* POSITION X ANIMATION  */}
      <CustomVStack>
        <Heading>x position</Heading>
        <AnimatedBoxView 
          animate={{
            left: autoToggle ? distance : 0,
          }} 
          transition={{
            type: "spring",
          }}
        />
      </CustomVStack>

      <HStack space="lg">
        
      {/*//* POSITION Y ANIMATION  */}
      <CustomVStack>
        <Heading>y position</Heading>
        <AnimatedBoxView 
          animate={{
            top: autoToggle ? distance : 0,
          }} 
          transition={{
            type: "spring",
          }}
        />
      </CustomVStack>

        <VStack space="lg">

          {/*//* ROTATION ANIMATION  */}
          <CustomVStack>
            <Heading>rotation</Heading>
            <AnimatedBoxView 
              animate={{
                rotate: autoToggle ? "90deg" : "0deg",
              }}
              transition={{
                type: "spring",
              }}
            />
          </CustomVStack>

          {/*//* ROTATION X ANIMATION  */}
          <CustomVStack>
            <Heading>rotation x</Heading>
            <AnimatedBoxView 
              shadowColor="#000"
              shadowOpacity={0.2}
              animate={{
                rotateX: autoToggle ? "65deg" : "0deg",
              }}
              transition={{
                type: "spring",
              }}
            >
              <Center flex={1}>
                <Text color="$white">Hello World</Text>
              </Center>
            </AnimatedBoxView>
          </CustomVStack>

          {/*//* ROTATION Y ANIMATION  */}
          <CustomVStack>
            <Heading>rotation y</Heading>
            <AnimatedBoxView 
              animate={{
                rotateY: autoToggle ? "50deg" : "0deg",
              }}
              transition={{
                type: "spring",
              }}
            >
              <Center flex={1}>
                <Text color="$white">Hello World</Text>
              </Center>
            </AnimatedBoxView>
          </CustomVStack>

          </VStack>
        
      </HStack>
              
        {/*//* ROTATION XY ANIMATION  */}
      <CustomVStack>
        <Heading>rotation xy</Heading>
        <AnimatedBoxView 
          animate={{
            rotateX: autoToggle ? "40deg" : "0deg",
            rotateY: autoToggle ? "40deg" : "0deg",
          }}
          transition={{
            type: "spring",
          }}
        >
          <Center flex={1}>
            <Text color="$white">Hello World</Text>
          </Center>
        </AnimatedBoxView>
      </CustomVStack>

      <HStack space="md">

        {/*//* SCALE ANIMATION  */}
        <CustomVStack>
          <Heading>scale</Heading>
          <AnimatedBoxView 
            animate={{
              scale: autoToggle ? 0.5 : 1,
            }}
            transition={{
              type: "spring",
            }}
          />
        </CustomVStack>

        {/*//* SCALE X ANIMATION  */}
        <CustomVStack>
          <Heading>scale x</Heading>
          <AnimatedBoxView 
            animate={{
              scaleX: autoToggle ? 0.5 : 1,
            }}
            transition={{
              type: "spring",
            }}
          />
        </CustomVStack>

        {/*//* SCALE Y ANIMATION  */}
        <CustomVStack>
          <Heading>scale y</Heading>
          <AnimatedBoxView 
            animate={{
              scaleY: autoToggle ? 0.5 : 1,
            }}
            transition={{
              type: "spring",
            }}
          />
        </CustomVStack>

      </HStack>
      

      <Filler />
    </VStack>
  );
}
