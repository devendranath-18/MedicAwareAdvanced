"use client";

import { useState } from "react";

export default function Navbar() {
  const [language, setLanguage] =
    useState("English");

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
      <h1
className="
text-2xl
md:text-3xl
font-bold
"
>
        MedicAware
      </h1>

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
        <button
className="
hover:text-blue-500
text-sm
md:text-base
"
>
          About Us
        </button>

        <button
className="
hover:text-blue-500
text-sm
md:text-base
"
>
          Services
        </button>

       <button
className="
hover:text-blue-500
text-sm
md:text-base
"
>
          Features
        </button>

        <select
value={language}
onChange={(e)=>
setLanguage(e.target.value)
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
          <option>
            English
          </option>

          <option>
            Telugu
          </option>

          <option>
            Hindi
          </option>

        </select>

      </div>
    </nav>
  );
}