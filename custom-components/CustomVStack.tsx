import { styled } from "@gluestack-style/react";
import { VStack } from "@gluestack-ui/themed";

const CustomVStack = styled(VStack, {
    flex: 1, borderColor: "$rose200", borderWidth: "$1", p: "$2", 
  });

export default CustomVStack;