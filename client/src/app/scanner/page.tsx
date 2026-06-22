"use client";
import Tesseract from "tesseract.js";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useLanguage }
from "@/context/LanguageContext";

import { translations }
from "@/constants/translations";
export default function ScannerPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [extractedText, setExtractedText] = useState("");
const {
language
}
=
useLanguage();

const t =
translations[
language as keyof typeof translations
];
  const scanPrescription = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const result = await Tesseract.recognize(image, "eng");
      const text = result.data.text;

      setExtractedText(text);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medicines/scan`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text,
        }),
      });

      const data = await response.json();

      setMedicines(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);

    setExtractedText("");
    setMedicines([]);
  };

  return (
    <main
      className="
min-h-screen
bg-gradient-to-r
      from-cyan-700
      to-blue-500
      text-white
flex
justify-center
items-center
px-4
sm:px-6
md:px-8
py-6
"
    >
      <div
        className="
w-full
max-w-3xl
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-5
sm:p-8
md:p-10
shadow-2xl
"
      >
        <h1
          className="
text-2xl
sm:text-3xl
md:text-4xl
font-bold
text-center
mb-3
"
        >
          {t.prescriptionScanner}
        </h1>

        <p
          className="
text-center
text-sm
md:text-base
text-blue-100
mb-8
md:mb-10
px-2
"
        >
          {t.prescriptionScanner}
        </p>

        <label
          className="
border-2
border-dashed
border-white/30
rounded-3xl
p-6
sm:p-8
md:p-12
flex
flex-col
items-center
justify-center
cursor-pointer
hover:bg-white/5
transition
"
        >
          <input type="file" accept="image/*" hidden onChange={handleImage} />

          <Upload
            size={50}
            className="
mb-4
text-blue-300
"
          />

          <p
            className="
text-sm
md:text-lg
text-center
"
          >
           {t.uploadPrescription}
          </p>
        </label>

        {image && (
          <>
            <div
              className="
mt-8
relative
"
            >
              <img
                src={image}
                alt="preview"
                className="
w-full
rounded-2xl
max-h-[400px]
object-contain
"
              />

              <button
                onClick={() => {
                  setImage(null);
                  setExtractedText("");
                  setMedicines([]);
                }}
                className="
absolute
top-4
right-4
bg-red-500
p-2
rounded-full
"
              >
                <X size={20} />
              </button>
            </div>

            <button
              onClick={scanPrescription}
              className="
w-full
mt-6
bg-cyan-500
p-4
rounded-2xl
font-semibold
hover:scale-105
transition
"
            >
              {loading ? "Scanning..." : "Scan Prescription"}
            </button>

            {extractedText && (
              <div
                className="
mt-6
bg-white/10
rounded-2xl
p-6
"
              >
                <h2
                  className="
text-xl
md:text-2xl
font-bold
mb-4
"
                >
                  Detected Medicines
                </h2>

                {medicines.length > 0 ? (
                  <div
                    className="
flex
flex-wrap
gap-3
"
                  >
                    {medicines.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="
px-3
md:px-4
py-2
text-sm
md:text-base
bg-cyan-500/20
rounded-full
text-white
font-medium
"
                      >
                        {item.medicine_name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="
text-yellow-300
text-lg
"
                  >
                    ⚠ No medicines found in database
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
