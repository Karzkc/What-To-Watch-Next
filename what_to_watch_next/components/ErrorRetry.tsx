"use client";

import React, { useState } from "react";

export default function ErrorRetry({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen text-white pt-16 text-center flex flex-col items-center justify-center">
      <p className="mb-4">Failed to load data. Please try again.</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
