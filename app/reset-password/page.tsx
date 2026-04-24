import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <ResetPasswordClient />
    </Suspense>
  );
}