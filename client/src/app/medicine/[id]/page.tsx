"use client";

import { use, useEffect, useState } from "react";
import ReviewSection from "@/components/ReviewSection";
export default function MedicineDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [medicine, setMedicine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/medicines/${id}`
      );

      const data = await response.json();

      setMedicine(data.data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <main
className="
min-h-screen

bg-blue-500
px-4
sm:px-6
md:px-8
py-6
md:py-10
"
>

<div
className="
max-w-6xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-5
sm:p-8
md:p-10
"
>

<img
src={medicine.image_url}
alt={medicine.medicine_name}
className="
w-32
h-32
sm:w-44
sm:h-44
md:w-56
md:h-56
object-contain
mx-auto
"
/>

<h1
className="
text-2xl
sm:text-3xl
md:text-4xl
font-bold
text-center
mt-6
break-words
"
>
{medicine.medicine_name}
</h1>


        <div className="space-y-8 mt-10">

  <div>
    <h2 className="
text-lg
md:text-xl
font-bold
mb-3
">
      Composition
    </h2>

    <div className="
bg-blue-50
p-4
rounded-xl
text-sm
md:text-base
break-words
">
      {medicine.composition}
    </div>
  </div>


  <div>
    <h2 className="text-xl font-bold mb-3">
      Uses
    </h2>

    <div className="flex flex-wrap gap-3">

      {medicine.uses
        ?.replace(/([a-z])([A-Z])/g,"$1,$2")
        .split(",")

        .map((use:string,index:number)=>(

          <span
            key={index}
           className="
bg-green-100
text-green-800
px-3
md:px-4
py-2
rounded-full
text-sm
md:text-base
"
          >
            {use.trim()}
          </span>

      ))}

    </div>
  </div>


  <div>
  <h2 className="text-xl font-bold mb-3">
    Side Effects
  </h2>

  <div className="flex flex-wrap gap-3">

    {medicine.side_effects
      ?.match(
        /[A-Z][a-z]+(?:\s[a-z]+)*/g
      )
      ?.map(
        (effect:string,index:number)=>(
          <span
            key={index}
           className="
bg-red-100
text-red-700
px-3
md:px-4
py-2
rounded-full
text-sm
md:text-base
"
          >
            {effect}
          </span>
      ))}

  </div>
</div>




  <div>
    <h2 className="text-xl font-bold mb-3">
      Manufacturer
    </h2>

    <div className="
bg-gray-100
p-4
rounded-xl
text-sm
md:text-base
break-words
">
      {medicine.manufacturer}
    </div>
  </div>

    <div className="border-t ">
    <ReviewSection
      medicineId={id}
    />
  </div>

        </div> {/* closes space-y-8 mt-10 */}
      </div> {/* closes max-w-6xl container */}
    </main>
  );
}