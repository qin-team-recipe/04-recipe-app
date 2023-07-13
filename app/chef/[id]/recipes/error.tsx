"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="pt-[20px] px-[15px] pb-[48px] text-title">
      <h2>{error.message}</h2>
      <button
        className="mt-[20px] underline"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        もう一度ためす
      </button>
    </div>
  );
}
