import { Suspense } from "react";
import AddMedicineForm from "./AddMedicineForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddMedicineForm />
    </Suspense>
  );
}