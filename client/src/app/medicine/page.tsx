"use client";

import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/constants/translations";

export default function MedicinePage() {

const { language } =
useLanguage();

const t =
translations[
language as keyof typeof translations
];

return (

<main
className="
min-h-screen
bg-gradient-to-r
from-cyan-700
to-blue-500
text-white
flex
flex-col
items-center
pt-16
md:pt-24
px-4
sm:px-6
md:px-8
"
>

<h1
className="
text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
font-extrabold
mb-5
tracking-tight
text-center
"
>
{t.searchMedicine}
</h1>

<p
className="
text-sm
sm:text-base
md:text-lg
lg:text-xl
text-blue-100
text-center
max-w-2xl
mb-10
md:mb-14
px-2
"
>
{t.searchMedicineDescription}
</p>

<SearchBar/>

</main>

);

}