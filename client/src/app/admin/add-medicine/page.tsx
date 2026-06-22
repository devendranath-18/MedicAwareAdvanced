"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AdminProtectedRoute
from "@/components/AdminProtectedRoute";
export default function AddMedicinePage() {

  const searchParams = useSearchParams();

  const requestId =
  searchParams.get("id");

  const medicineName =
  searchParams.get("name") || "";

  const [formData,setFormData] =
  useState({

    medicine_name:medicineName,
    composition:"",
    uses:"",
    side_effects:"",
    image_url:"",
    manufacturer:""

  });


const handleChange=(

e:React.ChangeEvent<
HTMLInputElement|
HTMLTextAreaElement
>

)=>{

setFormData({

...formData,
[e.target.name]:
e.target.value

});

};


const handleSubmit=
async()=>{

try{

const token=
localStorage.getItem(
"adminToken"
);

const response=
await fetch(
"http://localhost:5000/api/admin/add-medicine",
{

method:"POST",

headers:{
"Content-Type":
"application/json",
Authorization:
`Bearer ${token}`
},

body:JSON.stringify({

requestId,
...formData

})

}

);

const data=
await response.json();

if(data.success){

toast.success(
"Medicine added successfully ✅"
);

setTimeout(()=>{

window.location.href=
"/admin/requests";

},1500);

}

}
catch(error){

console.log(error);

toast.error(
"Failed to add medicine ❌"
);

}

};


return(
<AdminProtectedRoute>
<main
className="
min-h-screen
bg-gradient-to-br
from-slate-900
via-blue-900
to-indigo-950
p-10
text-white
"
>

<div
className="
max-w-4xl
mx-auto
bg-white/10
backdrop-blur-xl
rounded-3xl
border
border-white/20
p-10
"
>

<h1
className="
text-4xl
font-bold
mb-8
"
>

Add Medicine

</h1>


<div
className="
space-y-6
"
>

<input
name="medicine_name"
value={formData.medicine_name}
onChange={handleChange}
placeholder="Medicine Name"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<input
name="composition"
value={formData.composition}
onChange={handleChange}
placeholder="Composition"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<textarea
name="uses"
value={formData.uses}
onChange={handleChange}
placeholder="Uses"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<textarea
name="side_effects"
value={formData.side_effects}
onChange={handleChange}
placeholder="Side Effects"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<input
name="image_url"
value={formData.image_url}
onChange={handleChange}
placeholder="Image URL"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<input
name="manufacturer"
value={formData.manufacturer}
onChange={handleChange}
placeholder="Manufacturer"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<button

onClick={handleSubmit}

className="
w-full
bg-green-500
p-4
rounded-xl
font-semibold
hover:scale-105
transition
"

>

Save Medicine

</button>

</div>

</div>

</main>
</AdminProtectedRoute>
);

}