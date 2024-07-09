import { GestureContext } from "@/custom-components/SwipeableTransition";
import { useContext } from "react";

export default function useSwipeTransition() {
    return useContext(GestureContext);
};