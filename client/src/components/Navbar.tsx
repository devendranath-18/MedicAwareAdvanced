"use client";

;
import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const pathname = usePathname();
  return (
    <nav
      className="
flex
flex-col
md:flex-row
justify-between
items-center
px-4
md:px-10
py-4
md:py-6
border-b
gap-4
"
    >
      <Link href="/">

<h1
className="
text-2xl
md:text-3xl
font-bold
cursor-pointer
hover:opacity-80
transition
"
>

{t.title}

</h1>

</Link>

      <div
        className="
flex
flex-wrap
justify-center
items-center
gap-2
sm:gap-4
md:gap-8
w-full
md:w-auto
"
      >
       <Link
href="/about"
className="
hover:text-blue-500
text-sm
md:text-base
"
>
{t.about}
</Link>

<Link
href="/services"
className="
hover:text-blue-500
text-sm
md:text-base
"
>
{t.services}
</Link>

<Link
href="/features"
className="
hover:text-blue-500
text-sm
md:text-base
"
>
{t.features}
</Link>
{pathname === "/" && (

<select
value={language}
onChange={(e)=>
setLanguage(
e.target.value as
"English" |
"Telugu" |
"Hindi" |
"Tamil" |
"Kannada"
)
}
className="
border
rounded-lg
bg-white
text-black
px-2
md:px-3
py-1
md:py-2
text-sm
md:text-base
"
>

<option value="English">
English
</option>

<option value="Telugu">
తెలుగు
</option>

<option value="Hindi">
हिंदी
</option>

<option value="Tamil">
தமிழ்
</option>

<option value="Kannada">
ಕನ್ನಡ
</option>

</select>

)}
      </div>
    </nav>
  );
}
