import React from "react";

export default function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-6 bg-white rounded-xl shadow text-center">
        <h3 className="text-xl font-semibold mb-2">Card One</h3>
        <p className="text-gray-500">Dummy statistics preview</p>
      </div>

      <div className="p-6 bg-white rounded-xl shadow text-center">
        <h3 className="text-xl font-semibold mb-2">Card Two</h3>
        <p className="text-gray-500">Placeholder insights</p>
      </div>

      <div className="p-6 bg-white rounded-xl shadow text-center">
        <h3 className="text-xl font-semibold mb-2">Card Three</h3>
        <p className="text-gray-500">UI only — no data</p>
      </div>
    </div>
  );
}
