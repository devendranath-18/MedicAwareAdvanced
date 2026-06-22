"use client";

import {
createContext,
useContext,
useState
} from "react";
type LanguageType =
"English"
| "Telugu"
| "Hindi"
| "Tamil"
| "Kannada";

type LanguageContextType = {

language: LanguageType;

setLanguage:
React.Dispatch<
React.SetStateAction<LanguageType>
>;

};

const LanguageContext =
createContext<
LanguageContextType | null
>(null);

export function LanguageProvider({

children

}:{

children:React.ReactNode

}){

const [language,
setLanguage]=
useState<LanguageType>(
"English"
);

return(

<LanguageContext.Provider
value={{
language,
setLanguage
}}
>

{children}

</LanguageContext.Provider>

);

}

export function useLanguage(){

const context=
useContext(
LanguageContext
);

if(!context){

throw new Error(
"useLanguage must be used inside LanguageProvider"
);

}

return context;

}