"use client";

import { useState } from "react";
import OPR026 from "./components/OPR026";
import OPR352 from "./components/OPR352";

export default function HomePage() {
  const [selectedScreen, setSelectedScreen] = useState<"OPR026" | "OPR352" | "">("");
  const [awb, setAwb] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handleList = () => {
    // 🔥 NO VALIDATION AT ALL
    setShowContent(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">

      {/* ---------------- TOP NAV BAR ---------------- */}
      <div className="w-full bg-[#0E4F6F] h-14 flex items-center px-5 text-white">
        <div className="font-bold text-xl">iCargo</div>

        <div className="flex items-center ml-10 gap-4">
          <button
            className={`px-4 py-2 rounded ${
              selectedScreen === "OPR026" ? "bg-white text-black" : "bg-[#1B6685]"
            }`}
            onClick={() => {
              setSelectedScreen("OPR026");
              setShowContent(false);
              setAwb("");
            }}
          >
            OPR026 – Capture AWB
          </button>

          <button
            className={`px-4 py-2 rounded ${
              selectedScreen === "OPR352" ? "bg-white text-black" : "bg-[#1B6685]"
            }`}
            onClick={() => {
              setSelectedScreen("OPR352");
              setShowContent(false);
              setAwb("");
            }}
          >
            OPR352 – FWB Enquiry
          </button>
        </div>

        <div className="ml-auto text-sm">Logged in as: USER | AT: BOM</div>
      </div>

      {/* ---------------- AWB INPUT SECTION ---------------- */}
      {selectedScreen && (
        <div className="flex justify-center mt-12">
          <div className="border rounded p-6 shadow bg-white w-[900px]">

            <div className="flex items-end gap-6">

              {/* SINGLE INPUT ONLY */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">AWB Number</label>
                <input
                  value={awb}
                  onChange={(e) => setAwb(e.target.value)}
                  className="border rounded p-2 w-60 text-center"
                  placeholder="Enter AWB Number"
                />
              </div>

              {/* OWNER CODE
              <div>
                <label className="text-sm font-medium">Owner Code</label>
                <input
                  value="AI"
                  readOnly
                  className="border rounded p-2 w-20 bg-gray-100 text-center"
                />
              </div> */}

              {/* LIST BUTTON */}
              <button
                onClick={handleList}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                LIST
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ---------------- SHOW SCREEN CONTENT ---------------- */}
      {showContent && (
        <div className="mt-10 flex justify-center pb-20">
          <div className="w-full max-w-[1300px] px-4">
            {selectedScreen === "OPR026" && <OPR026 awb={awb} />}
            {selectedScreen === "OPR352" && <OPR352 awb={awb} />}
          </div>
        </div>
      )}

    </div>
  );
}
