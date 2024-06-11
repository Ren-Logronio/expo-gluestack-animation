import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

export const TransitionDirectionContext = createContext<[string, Dispatch<SetStateAction<string>>]>(["left", () => {}]);

export default function TransitionDirectionProvider({ children }: { children: React.ReactNode }) {
    const [direction, setDirection] = useState("left");

    return (
        <TransitionDirectionContext.Provider value={[direction, setDirection]}>
            {children}
        </TransitionDirectionContext.Provider>
    );
}

export function useTransitionDirection() {
    return useContext(TransitionDirectionContext);
}