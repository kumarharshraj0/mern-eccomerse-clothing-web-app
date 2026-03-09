import React from "react";

export default function SiteHeader() {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Notifications
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Profile
        </button>
      </div>
    </header>
  );
}
