import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

export type ToggleContextType = {
    toggle: boolean;
    autoToggle: boolean;
    setToggle: Dispatch<SetStateAction<boolean>>;
}

export const ToggleContext = createContext<ToggleContextType>({ toggle: false, autoToggle: false, setToggle: () => {} });

export default function ToggleProvider({ children }: { children: React.ReactNode } ) {
    const [toggle, setToggle] = useState(false);
    const [autoToggle, setAutoToggle] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            
            setAutoToggle(prev => {
                return !prev
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [])

    return <ToggleContext.Provider value={{ toggle, autoToggle, setToggle }}>
        { children }
    </ToggleContext.Provider>;
}

export function useToggle() {
    return useContext(ToggleContext);
}