import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}){
    const [theme, setTheme] = useState('Dark');

    function toggleTheme(){
        setTheme(prevTheme => prevTheme === 'Dark'? 'Light':'Dark');
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    return useContext(ThemeContext);
}