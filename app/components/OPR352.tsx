"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";

export default function OPR352({ awb }: { awb: string }) {
  const router = useRouter();

  const openFWB = () => {
    router.push(`/opr352/fwb?awb=${awb}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-8 mt-6">

      {/* -------- AWB STRIP --------
      <div className="bg-white border rounded-md p-3 mb-4 shadow-sm">
        <div className="flex items-center gap-4"> */}

          {/* AWB Number
          <div>
            <div className="text-xs text-gray-600">AWB Number</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-yellow-300 px-2 py-1 rounded text-sm font-medium min-w-[56px] text-center">
                {awb ? awb.slice(0, 3) : "098"}
              </div>
              <div className="bg-yellow-200 px-3 py-1 rounded text-sm font-medium">
                {awb ? awb.slice(3) : "30680650"}
              </div>
            </div>
          </div> */}

          {/* <div className="ml-auto flex items-center gap-2">
            <button className="px-3 py-1 border rounded text-sm bg-green-600 text-white">
              List
            </button>
            <button className="px-3 py-1 border rounded text-sm">Clear</button>
          </div>
        </div>
      </div> */}

      {/* -------- EXTERNAL MESSAGING -------- */}
      <div className="bg-white border rounded shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold text-sm text-yellow-600">
            External Messaging
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 text-xs">
              <input type="radio" name="msgview" defaultChecked /> Incoming
            </label>
            <label className="flex items-center gap-1 text-xs">
              <input type="radio" name="msgview" /> Outgoing
            </label>
          </div>
        </div>

        {/* Message Types */}
        <div className="p-4 space-y-3">

          <div className="p-3 border rounded flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <div className="font-medium">FSU</div>
            <div className="text-gray-500">+ 21 more</div>
          </div>

          <div className="p-3 border rounded flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <div className="font-medium">FHL</div>
            <div className="text-gray-500">+ 14 more</div>
          </div>

          <button
            onClick={openFWB}
            className="w-full text-left p-3 border rounded bg-white hover:bg-gray-50 flex items-center justify-between"
          >
            <div className="font-medium">FWB</div>
            <div className="text-gray-500">1</div>
          </button>

        </div>
      </div>

    </div>
  );
}
