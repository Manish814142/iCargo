import { Suspense } from "react";
import FwbPageComponent from "./FwbPageComponent";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FwbPageComponent />
    </Suspense>
  );
}

















// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// export default function Opr352FwbPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const awb = searchParams?.get("awb") ?? "";

//   // Full FWB text exactly as provided
//   const fwbText = `QK BOMFMAI
// .DSGTPXA 311607 REUAGT87DEHTL/FRA01
// FWB/16
// 098-30680650FRADEL/T60K1533.6                 
// FLT/AI2026/01
// RTG/DELAI
// SHP
// /SUPPLYX GMBH
// /GEBAEUDE 568 A CARGO CITY SUED
// /FRANKFURT AM MAIN
// /DE/60549/TE/49069697647971
// CNE
// /PRAKASH FREIGHT MOVERS LIMITED
// /POCKET - 10 SECTOR - 13 DWARKA
// /110075 NEW DELHI
// /IN
// AGT//2347521/0010
// /SUPPLYX GMBH
// /FRANKFURT AM MA
// SSR/SECURITY STATUS AS PER ATTACHEMENT SX DERA01674-01
// /DANGEROUS GOODS AS PER ASSOCIATED DGD 45 PCS
// /NOT SUBJECT TO RELEVANT WAR WEAPONS CONTROL RULESSUBJECT TO
// NFY/PRAKASH FREIGHT MOVERS LIMITED
// /POCKET - 10 SECTOR - 13 DWARKA
// /110075 NEW DELHI
// /IN
// ACC/GEN/NOTIFY
// /GEN/PRAKASH FREIGHT MOVERS LIMITED
// /GEN/PLOT NO. 96-A THIRD FLOOR BLOCK-
// /GEN/POCKET - 10 SECTOR - 13 DWARKA
// /GEN/110075 NEW DELHI INDIA
// /GEN/E-MAIL SARITA PFMLINDIA.COM
// CVD/EUR//PP/NVD/NCV/XXX
// RTD/1/P60/K1533.6/CQ/W1534.0/R2.17/T3328.78
// /NC/DANGEROUS GOODS CONS
// /2/NC/OLIDATION AS PER ATT
// /3/NC/ACHED MANIFEST - NOT
// /4/NC/RESTRICTED -
// /5/ND//CMT119-37-17/1
// /6/ND//CMT43-19-16/2
// /7/ND//CMT44-21-17/1
// /8/ND//CMT50-30-26/1
// /9/ND//CMT26-31-8/5
// /10/ND//CMT43-19-16/2
// /11/ND//CMT50-30-27/1
// PPD/WT3328.78
// /CT3328.78
// CER/SUPPLYX GMBH
// ISU/31OCT25/FRANKFURT AM MA/MINH HO
// OSI/WEAPONS ACT NOT SUBJECT TO BANNED WEAPON LISTWEAPONS ACT
// REF/ZCSTXLH/EXACF325100006
// COR/X
// OCI/DE/ISS/RA/01674-01
// ///ED/1299
// ///SN/MINH HO
// ///SD/29OCT25
// /DE/EXP/M/25DE655171674953B2
// /DE/EXP/M/25DE655171735254B8
// /DE/EXP/M/25DE655171744992B7
// /DE/EXP/M/25DE655171750325B6
// /DE/EXP/M/25DE655171760068B1
// /DE/EXP/M/25DE655171999668B5
// /DE/EXP/M/25DE655171999828B1
// /DE/EXP/M/25DE655172027716B9
// /DE/EXP/M/25DE655172031800B7
// /DE/EXP/M/25DE655172031887B7
// /DE/EXP/M/25DE655172040214B2
// /DE/EXP/M/25DE655172041862B4
// /DE/EXP/M/25DE655172044377B9
// /DE/EXP/M/25DE655172058805B1
// /DE/EXP/M/25DE655172059695B1
// /DE/EXP/M/25DE655172063074B0
// /DE/EXP/M/25DE655172064871B4
// /DE/EXP/M/25DE655172082021B0
// /DE/SHP/T/EUROPEAN VAT NUMBERDE363028252
// /DE/SHP/CT/49069697647971
// /IN/CNE/T/9999IN
// /IN/NFY/T/9999IN`;

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownload = () => {
//     const blob = new Blob([fwbText], { type: "text/plain;charset=utf-8" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${awb || "fwb"}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-[980px] mx-auto">

//         {/* Viewer header */}
//         <div className="bg-blue-50 border border-blue-200 rounded-t px-4 py-3 flex items-center justify-between shadow-sm">
//           <div>
//             <div className="text-sm text-blue-700 font-semibold">FWB Viewer</div>
//             <div className="text-xs text-gray-600">{awb ? `AWB: ${awb}` : "AWB"}</div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button onClick={handlePrint} className="px-3 py-1 bg-white border rounded text-sm">Print</button>
//             <button onClick={handleDownload} className="px-3 py-1 bg-white border rounded text-sm">Download</button>
//             <button onClick={() => router.back()} className="px-3 py-1 bg-white border rounded text-sm">Close</button>
//           </div>
//         </div>

//         {/* Message body */}
//         <div className="bg-white border rounded-b p-4 mt-0 shadow-sm">
//           <pre className="whitespace-pre-wrap overflow-auto text-xs leading-5 font-mono" style={{ maxHeight: "70vh" }}>
//             {fwbText}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }
