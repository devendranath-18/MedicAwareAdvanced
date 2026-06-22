"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function SearchBar() {

  const router = useRouter();

  const [search,setSearch] = useState("");
  const [debouncedSearch,setDebouncedSearch] =
  useState("");
const [showRequest,setShowRequest]=
useState(false);
  const [suggestions,setSuggestions] =
  useState([]);

  useEffect(()=>{

    const timer=setTimeout(()=>{

      setDebouncedSearch(search);

    },500);

    return ()=>clearTimeout(timer);

  },[search]);
const requestMedicine=async()=>{

try{

const response=await fetch(
"http://localhost:5000/api/requests",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
medicine_name:search
})

}
);

const data=await response.json();

if(data.success){

toast.success(
"Medicine request submitted successfully ✅"
);

setSearch("");
setSuggestions([]);
setShowRequest(false);

}

}
catch(error){

console.log(error);

toast.error(
"Failed to submit request ❌"
);

}

};

  useEffect(()=>{

    const fetchSuggestions=async()=>{

     if(!debouncedSearch.trim()){

    setSuggestions([]);
    setShowRequest(false);

    return;

}
      try{

        const response=await fetch(
        `http://localhost:5000/api/medicines/suggestions?query=${debouncedSearch}`
        );

        const data=await response.json();
setSuggestions(data);

if(
debouncedSearch.trim() &&
data.length===0
){

setShowRequest(true);

}
else{

setShowRequest(false);

}

      }
      catch(error){

        console.log(error);

      }

    };

    fetchSuggestions();

  },[debouncedSearch]);



  return (

    <div className="relative w-full max-w-5xl">

      <input
      type="text"
      placeholder="Search medicines..."
      value={search}
      onChange={(e)=>
      setSearch(e.target.value)
      }
      className="
      w-full
      py-6
      px-10
      pr-24
      rounded-full
      bg-white
      text-black
      text-xl
      shadow-xl
      outline-none
      "
      />

      <Search
      className="
      absolute
      right-8
      top-1/2
      -translate-y-1/2
      text-cyan-500
      "
      />

      {suggestions.length>0 && (

        <div
        className="
        absolute
        w-full
        bg-white
        rounded-2xl
        mt-2
        shadow-xl
        overflow-hidden
        "
        >

        {suggestions.map((item:any)=>(

        <div
        key={item.id}

        onClick={()=>
        router.push(
        `/medicine/${item.id}`
        )
        }

        className="
        p-4
        cursor-pointer
        hover:bg-gray-100
        text-black
        "
        >

        {item.medicine_name}

        </div>

        ))}

        </div>

      )}
{showRequest && (

<div
className="
mt-6
bg-white/10
backdrop-blur-xl
rounded-3xl
p-8
border
border-white/20
text-center
"
>

<h2
className="
text-2xl
font-bold
mb-3
"
>

Sorry 😔 Medicine not found

</h2>

<p
className="
text-blue-100
mb-6
"
>

Want this medicine added for future users?

</p>

<button

onClick={requestMedicine}

className="
px-8
py-3
rounded-full
bg-white
text-blue-700
font-semibold
hover:scale-105
transition
"

>

Request Medicine

</button>

</div>

)}
    </div>

  );
}