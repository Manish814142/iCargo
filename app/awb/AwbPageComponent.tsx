"use client";

export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// CHARGES & ACCOUNTING TAB UI
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// CHARGES & ACCOUNTING TAB UI
// ---------------------------------------------------------------------------
function ChargesTab({ data, onChange, errorFields }: { data: any, onChange: (field: string, value: any) => void, errorFields: Set<string> }) {

    const getInputClass = (fieldKey: string) => {
        return errorFields.has(fieldKey)
            ? "border rounded px-2 py-1 w-full border-red-500 bg-red-50"
            : "border rounded px-2 py-1 w-full";
    };

    const handleRatingChange = (index: number, field: string, value: string) => {
        const newRatings = [...data.ratingDetails];
        newRatings[index] = { ...newRatings[index], [field]: value };
        onChange("ratingDetails", newRatings);
    };

    const handleChargeDetailChange = (index: number, colIndex: number, value: string) => {
        const newCharges = [...data.chargeDetails];
        // colIndex mapping: 0:checkbox, 1:code, 2:name, 3:charge, 4:ppcc, 5:dueCarrier, 6:dueAgent, 7:remarks
        // We only edit data fields
        const fields = ["", "code", "name", "charge", "ppcc", "dueCarrier", "dueAgent", "remarks"];
        const fieldName = fields[colIndex];
        if (fieldName) {
            newCharges[index] = { ...newCharges[index], [fieldName]: value };
            onChange("chargeDetails", newCharges);
        }
    };

    return (
        <div className="px-4 py-4 text-sm">

            {/* Top block */}
            <div className="border p-3 rounded bg-white shadow-sm">
                <div className="mb-2 font-semibold">
                    Shipment Details - {data.origin || "DEL"} &gt; {data.destination || "MEL"} | {data.ratingDetails[0]?.pcs || "0"} pcs | {data.ratingDetails[0]?.weight || "0"} Kilogram | {data.ratingDetails[0]?.rateClass || "GEN"}
                </div>

                {/* First grid */}
                <div className="grid grid-cols-12 gap-4 mb-3">

                    <div className="col-span-2">
                        <label className="text-xs text-gray-600">Currency</label>
                        <input
                            className={getInputClass("Currency")}
                            value={data.currency}
                            onChange={(e) => onChange("currency", e.target.value)}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs text-gray-600">Charge Code</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.chargeCode}
                            onChange={(e) => onChange("chargeCode", e.target.value)}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs text-gray-600">Payment Type *</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.paymentType}
                            onChange={(e) => onChange("paymentType", e.target.value)}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs text-gray-600">Insurance Amt</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.insuranceAmt}
                            onChange={(e) => onChange("insuranceAmt", e.target.value)}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs text-gray-600">DV for customs</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.dvCustoms}
                            onChange={(e) => onChange("dvCustoms", e.target.value)}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs text-gray-600">DV for carriage</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.dvCarriage}
                            onChange={(e) => onChange("dvCarriage", e.target.value)}
                        />
                    </div>
                </div>

                {/* Second grid */}
                <div className="grid grid-cols-12 gap-4 mb-3">
                    <div className="col-span-3">
                        <label className="text-xs text-gray-600">Rated Customer *</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.ratedCustomer}
                            onChange={(e) => onChange("ratedCustomer", e.target.value)}
                        />
                    </div>

                    <div className="col-span-3 flex items-end">
                        <input
                            type="checkbox"
                            checked={data.applyHigherRate}
                            onChange={(e) => onChange("applyHigherRate", e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-xs">Apply Higher Weight Break Rate</span>
                    </div>
                </div>

                {/* Third grid */}
                <div className="grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-3">
                        <label className="text-xs text-gray-600">Date of Journey</label>
                        <input
                            className={getInputClass("Journey_Date")}
                            value={data.dateOfJourney}
                            onChange={(e) => onChange("dateOfJourney", e.target.value)}
                        />
                    </div>

                    <div className="col-span-3">
                        <label className="text-xs text-gray-600">Unique Reference</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.uniqueRef}
                            onChange={(e) => onChange("uniqueRef", e.target.value)}
                        />
                    </div>

                    <div className="col-span-3">
                        <label className="text-xs text-gray-600">Spot Rate ID</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.spotRateId}
                            onChange={(e) => onChange("spotRateId", e.target.value)}
                        />
                    </div>

                    <div className="col-span-3">
                        <label className="text-xs text-gray-600">Construct Rate ID</label>
                        <input
                            className="border rounded px-2 py-1 w-full"
                            value={data.constructRateId}
                            onChange={(e) => onChange("constructRateId", e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Rating Details */}
            <div className="mt-6 font-semibold text-sm">RATING DETAILS</div>

            <div className="overflow-auto border rounded mt-2 text-xs bg-white">
                <table className="min-w-[1200px] w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            {[
                                "No of Pcs", "Weight", "Adjusted Weight", "RCP", "Rate Class",
                                "Commodity", "IATA Code", "Service Code", "Chargeable Weight",
                                "IATA Rate", "IATA Charge", "Volume",
                                "Country of Origin", "ULD", "Description", "Rate/Pivot", "Net Charge"
                            ].map((h, i) => (
                                <th key={i} className="border px-2 py-1">{h}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.ratingDetails.map((row: any, i: number) => (
                            <tr key={i}>
                                {Object.keys(row).map((key, j) => (
                                    <td key={j} className="border px-2 py-1">
                                        <input
                                            className={`w-full bg-transparent focus:outline-none ${(key === "pcs" && errorFields.has("No_of_Pieces")) ||
                                                (key === "weight" && errorFields.has("Gross_Weight")) ||
                                                (key === "chargeableWeight" && errorFields.has("Chargeable_Weight")) ||
                                                (key === "rateClass" && errorFields.has("Rate_Class"))
                                                ? "bg-red-50 border border-red-500 rounded px-1"
                                                : ""
                                                }`}
                                            value={row[key]}
                                            onChange={(e) => handleRatingChange(i, key, e.target.value)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Charge Details */}
            <div className="mt-6 font-semibold text-sm">CHARGE DETAILS</div>

            <div className="border rounded p-3 bg-white mt-2">
                <div className="text-xs mb-3">
                    Payment Type *
                    <input
                        className="border ml-2 rounded px-2 py-1 w-20"
                        value={data.paymentType}
                        onChange={(e) => onChange("paymentType", e.target.value)}
                    />
                </div>

                <table className="min-w-full text-xs border-collapse border">
                    <thead className="bg-gray-100">
                        <tr>
                            {["", "Code", "Charge Head Name", "Charge", "PP/CC", "Due Carrier", "Due Agent", "Remarks"]
                                .map((h, i) => (
                                    <th key={i} className="border px-2 py-1">{h}</th>
                                ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.chargeDetails.map((row: any, i: number) => (
                            <tr key={i}>
                                <td className="border px-2 py-1"><input type="checkbox" /></td>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={row.code} onChange={(e) => handleChargeDetailChange(i, 1, e.target.value)} />
                                </td>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={row.name} onChange={(e) => handleChargeDetailChange(i, 2, e.target.value)} />
                                </td>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={row.charge} onChange={(e) => handleChargeDetailChange(i, 3, e.target.value)} />
                                </td>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={row.ppcc} onChange={(e) => handleChargeDetailChange(i, 4, e.target.value)} />
                                </td>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={row.dueCarrier} onChange={(e) => handleChargeDetailChange(i, 5, e.target.value)} />
                                </td>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={row.dueAgent} onChange={(e) => handleChargeDetailChange(i, 6, e.target.value)} />
                                </td>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={row.remarks || ""} onChange={(e) => handleChargeDetailChange(i, 7, e.target.value)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Accounting Summary */}
            <div className="mt-6 flex justify-end">
                <div className="border rounded p-3 bg-white text-xs w-[350px] shadow-sm">
                    <div className="font-semibold text-sm mb-2">Auto Compute Tax</div>

                    <table className="min-w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className="border px-2 py-1">Prepaid</td>
                                <td className="border px-2 py-1">Weight Charge</td>
                                <td className="border px-2 py-1">Collect</td>
                            </tr>

                            <tr>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={data.accounting.prepaid.weight} onChange={(e) => {
                                        const newAcc = { ...data.accounting };
                                        newAcc.prepaid.weight = e.target.value;
                                        onChange("accounting", newAcc);
                                    }} />
                                </td>
                                <td className="border px-2 py-1">0.00</td>
                                <td className="border px-2 py-1">0.00</td>
                            </tr>

                            <tr>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={data.accounting.prepaid.tax} onChange={(e) => {
                                        const newAcc = { ...data.accounting };
                                        newAcc.prepaid.tax = e.target.value;
                                        onChange("accounting", newAcc);
                                    }} />
                                </td>
                                <td className="border px-2 py-1">0.00</td>
                                <td className="border px-2 py-1">0.00</td>
                            </tr>

                            <tr>
                                <td className="border px-2 py-1">
                                    <input className="w-full" value={data.accounting.prepaid.other} onChange={(e) => {
                                        const newAcc = { ...data.accounting };
                                        newAcc.prepaid.other = e.target.value;
                                        onChange("accounting", newAcc);
                                    }} />
                                </td>
                                <td className="border px-2 py-1">0.00</td>
                                <td className="border px-2 py-1">0.00</td>
                            </tr>

                            <tr className="font-semibold">
                                <td className="border px-2 py-1">
                                    <input className="w-full font-bold" value={data.accounting.prepaid.total} onChange={(e) => {
                                        const newAcc = { ...data.accounting };
                                        newAcc.prepaid.total = e.target.value;
                                        onChange("accounting", newAcc);
                                    }} />
                                </td>
                                <td className="border px-2 py-1">Total</td>
                                <td className="border px-2 py-1">0.00</td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="mt-3 w-full bg-gray-200 py-1 rounded text-sm">
                        Compute Total
                    </button>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// MAIN PAGE (YOUR GENERAL UI + TAB SWITCHING + CHARGES TAB)
// ---------------------------------------------------------------------------
export default function AwbPageComponent() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const awbFromQuery = searchParams.get("awb");
    const typeFromQuery = searchParams.get("type") ?? "";

    const [activeTab, setActiveTab] = useState("general");
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<any[] | null>(null);
    const [modalTitle, setModalTitle] = useState("");

    const [hasErrors, setHasErrors] = useState(false);
    const [errorFields, setErrorFields] = useState<Set<string>>(new Set());

    const getInputClass = (fieldKey: string) => {
        return errorFields.has(fieldKey)
            ? "w-full border rounded px-2 py-1 border-red-500 bg-red-50"
            : "w-full border rounded px-2 py-1";
    };


    // Initial Data State
    const [generalData, setGeneralData] = useState({
        ownerCode: "",
        ubrNo: "",
        groupId: "",
        origin: "",
        destination: "",
        routing: "",
        requestedFlight: "",
        agentCode: "",
        agentName: "",
        iataCode: "",
        cassCode: "",
        shipper: "",
        consignee: "",
        statusBadge: "Ready for Carriage",
        shipperCode: "",
        shipperAc: "",
        consigneeCode: "",
        consigneeAc: "",
        scc: "",
        product: ""
    });

    const [chargesData, setChargesData] = useState({
        currency: "",
        chargeCode: "",
        paymentType: "",
        insuranceAmt: "",
        dvCustoms: "",
        dvCarriage: "",
        ratedCustomer: "",
        applyHigherRate: false,
        dateOfJourney: "",
        uniqueRef: "",
        spotRateId: "",
        constructRateId: "",
        ratingDetails: [
            { pcs: "", weight: "", adjustedWeight: "", rcp: "", rateClass: "", commodity: "", iataCode: "", serviceCode: "", chargeableWeight: "", iataRate: "", iataCharge: "", volume: "", origin: "", uld: "", description: "", ratePivot: "", netCharge: "" }
        ],
        chargeDetails: [
            { code: "", name: "", charge: "", ppcc: "", dueCarrier: "", dueAgent: "", remarks: "" },
            { code: "", name: "", charge: "", ppcc: "", dueCarrier: "", dueAgent: "", remarks: "" }
        ],
        accounting: {
            prepaid: { weight: "", tax: "", other: "", total: "" },
            collect: { weight: "", tax: "", other: "", total: "" }
        }
    });

    const handleGeneralChange = (field: string, value: any) => {
        setGeneralData(prev => ({ ...prev, [field]: value }));
    };

    const handleChargesChange = (field: string, value: any) => {
        setChargesData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        if (!awbFromQuery) return;

        const fetchAwbDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://uat.aiqod.com:453/gibots-api/crud/iCargo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        collectionName: "iCargo",
                        searchKey: "AWB_No",
                        searchValue: awbFromQuery
                    })
                });

                const result = await response.json();
                console.log("API Response:", result);

                if ((result.status === 200 || result.status === 0) && result.data) {
                    const apiData = result.data;

                    // Map API data to General Data
                    setGeneralData(prev => ({
                        ...prev,
                        origin: apiData.Origin_Code || "",
                        destination: apiData.Destination_Code || "",
                        agentCode: apiData.Agent_Code || "",
                        iataCode: apiData.IATA_Code || "",
                        scc: apiData.SCC_Code || "",
                        product: apiData.Product_Code || ""
                    }));

                    // Map API data to Charges Data
                    setChargesData(prev => ({
                        ...prev,
                        currency: apiData.Currency || "",
                        paymentType: apiData.Payment_Type || "",
                        dateOfJourney: apiData.Journey_Date || "",
                        spotRateId: apiData.Spot_Rate_ID || "",

                        // Rating Details (First row)
                        ratingDetails: [
                            {
                                pcs: apiData.No_of_Pieces || "",
                                weight: apiData.Gross_Weight || "",
                                adjustedWeight: "",
                                rcp: "",
                                rateClass: apiData.Rate_Class || "",
                                commodity: "",
                                iataCode: "",
                                serviceCode: "",
                                chargeableWeight: apiData.Chargeable_Weight || "",
                                iataRate: "",
                                iataCharge: "",
                                volume: "",
                                origin: "",
                                uld: "",
                                description: "",
                                ratePivot: apiData.Rate_Pivot || "",
                                netCharge: apiData.Net_Rate || ""
                            }
                        ],

                        // Charge Details (Row 1 & Row 2)
                        chargeDetails: [
                            {
                                code: apiData.Charge_Details_Code || "",
                                name: apiData.Charge_Details_Charge_Head_Name || "",
                                charge: apiData.Charge_Details_Charge || "",
                                ppcc: apiData.Charge_Details_PP_CC || "",
                                dueCarrier: "",
                                dueAgent: "",
                                remarks: ""
                            },
                            {
                                code: apiData["1_Charge_Details_Code"] || "",
                                name: apiData["1_Charge_Details_Charge_Head_Name"] || "",
                                charge: apiData["1_Charge_Details_Charge"] || "",
                                ppcc: apiData["1_Charge_Details_PP_CC"] || "",
                                dueCarrier: "",
                                dueAgent: "",
                                remarks: ""
                            }
                        ],

                        // Preserve existing accounting
                        accounting: prev.accounting
                    }));
                }
            } catch (error) {
                console.error("Error fetching AWB details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAwbDetails();
    }, [awbFromQuery, typeFromQuery]);

    useEffect(() => {
        if (!awbFromQuery) return;

        const timer = setTimeout(() => {
            const fetchAwbDocuments = async () => {
                try {
                    console.log("Fetching AWB Documents (Delayed)...");
                    const response = await fetch("https://uat.aiqod.com:453/gibots-api/crud/iCargo", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            collectionName: typeFromQuery === "FWB" ? "FWB_Documents_POC" : "AWB_Documents_POC",
                            searchKey: "AWB_No",
                            searchValue: awbFromQuery
                        })
                    });

                    const result = await response.json();
                    console.log("AWB Documents Response:", result);

                    if ((result.status === 0 || result.status === 200) && result.data) {
                        const rulesSetValue = result.data;

                        let airule;

                        if (typeFromQuery === "FWB") {
                            airule = {
                                "id": "rule51",
                                "overallRuleName": "FWB Data Comparison",
                                "rules": [
                                    {
                                        "ruleName": "FWB Data Comparison",
                                        "ruleDescription": "For a given AWB_No, retrieve the matching record from:\nFWB_Documents_POC & \niCargo collection \nCompare the following fields:\nOrigin_Code\nDestination_Code\nIATA_Code\nCurrency\nNo_of_Pieces\nChargeable_Weight\nProduct_Code\nSSC_Code\nGross_Weight\nComparison Logic\nFor each field:\nIf the field exists in both collections AND values match exactly:\n  Then Mark field as MATCHED and If the field is missing in either collection OR values do not match exactly:\n  Then Mark field as MISMATCH",
                                        "message": "Highlight the field if any mismatch or not found in between the both document data",
                                        "additionalInfoCode": "if \"AWB_No\" in input_data and input_data[\"AWB_No\"] is not None:\n    awb_no = input_data[\"AWB_No\"]\n\n    awb_doc_poc_data = db.FWB_Documents_POC.find_one({\"AWB_No\": awb_no})\n    icargo_data = db.iCargo.find_one({\"AWB_No\": awb_no})\n\n    additional_data = [\n        {\n            \"Query_Description\": f\"FWB_Documents_POC record for AWB_No: {awb_no}\",\n            \"Query_Result\": awb_doc_poc_data\n        },\n        {\n            \"Query_Description\": f\"iCargo record for AWB_No: {awb_no}\",\n            \"Query_Result\": icargo_data\n        }\n    ]\nelse:\n    additional_data = []"
                                    },
                                    {
                                        "ruleName": "Chargeable Weight Check",
                                        "ruleDescription": "Check the FWB_Documents_POC collection for the fields Dimension_B, Dimension_H, Dimension_L and Dimension_Unit individually.\nIf Dimension_B, Dimension_H, Dimension_L and Dimension_Unit are blank, then set Calculated_Chargeable_Weight = Chargeable_Weight.",
                                        "message": "Chargeable Weight Check",
                                        "additionalInfoCode": "additional_data = None"
                                    },
                                    {
                                        "ruleName": "Calculated_Dimensional_Weight",
                                        "ruleDescription": "if Dimension_B,Dimension_H,Dimension_L Dimension_Unit are not blank in FWB_Documents_POC collection then step1 -If Dimension_Unit is CM or CMS Then Calculated Dimensional_Weight = Dimension_L * Dimension_B * Dimension_H * No of Pieces / 6000 Step-2 If Dimension_Unit is INCHES or IN Then Calculated Dimensional_Weight = Dimension_L * Dimension_B * Dimension_H * No of Pieces / 366 Step 3 Add up all the Calculated_Dimensional_Weight If Total Calculated_Dimensional_Weight> Gross_Weight Then Calculated_Chargeable_Weight =Calculated_Dimensional_Weight and If Calculated_Chargeable_Weight< Gross_Weight Then Calculated_Chargeable_Weight = Gross_Weight In case of discrepancy, highlight\nDimension_Unit are blank, then set Calculated_Chargeable_Weight = Chargeable_Weight.",
                                        "message": "Calculated_Dimensional_Weight",
                                        "additionalInfoCode": "calculated_dimensional_weight = 0.0\ncalculated_chargeable_weight = 0.0\ndiscrepancy_message = None\n\ndef get_float_or_none(data, key):\n    value = data.get(key)\n    if value is not None and value != \"\":\n        try:\n            return float(value)\n        except (ValueError, TypeError):\n            return None\n    return None\n\ndimension_b = get_float_or_none(input_data, \"Dimension_B\")\ndimension_h = get_float_or_none(input_data, \"Dimension_H\")\ndimension_l = get_float_or_none(input_data, \"Dimension_L\")\ndimension_unit_raw = input_data.get(\"Dimension_Unit\")\ndimension_unit = dimension_unit_raw.upper() if dimension_unit_raw else \"\"\nno_of_pieces = get_float_or_none(input_data, \"No_of_Pieces\")\ngross_weight = get_float_or_none(input_data, \"Gross_Weight\")\nchargeable_weight_input = get_float_or_none(input_data, \"Chargeable_Weight\")\n\nif dimension_unit_raw is None or dimension_unit_raw == \"\":\n    if chargeable_weight_input is not None:\n        calculated_chargeable_weight = chargeable_weight_input\n        discrepancy_message = \"Dimension_Unit is blank. Calculated_Chargeable_Weight set to input Chargeable_Weight.\"\n    else:\n        calculated_chargeable_weight = 0.0\n        discrepancy_message = \"Dimension_Unit is blank and input Chargeable_Weight is also missing/invalid. Calculated_Chargeable_Weight set to 0.\"\n    calculated_dimensional_weight = 0.0\nelse:\n    if all(val is not None for val in [dimension_b, dimension_h, dimension_l, no_of_pieces, gross_weight]) and dimension_unit in [\"CM\", \"CMS\", \"INCHES\", \"IN\"]:\n        if dimension_unit in [\"CM\", \"CMS\"]:\n            calculated_dimensional_weight = (dimension_l * dimension_b * dimension_h * no_of_pieces) / 6000\n        elif dimension_unit in [\"INCHES\", \"IN\"]:\n            calculated_dimensional_weight = (dimension_l * dimension_b * dimension_h * no_of_pieces) / 366\n\n        if calculated_dimensional_weight > gross_weight:\n            calculated_chargeable_weight = calculated_dimensional_weight\n        else:\n            calculated_chargeable_weight = gross_weight\n    else:\n        if chargeable_weight_input is not None:\n            calculated_chargeable_weight = chargeable_weight_input\n            if not all(val is not None for val in [dimension_b, dimension_h, dimension_l, no_of_pieces, gross_weight]):\n                discrepancy_message = \"Missing or invalid dimension/weight fields for dimensional weight calculation. Calculated_Chargeable_Weight set to input Chargeable_Weight.\"\n            elif dimension_unit not in [\"CM\", \"CMS\", \"INCHES\", \"IN\"]:\n                discrepancy_message = f\"Unrecognized Dimension_Unit '{dimension_unit_raw}'. Calculated_Chargeable_Weight set to input Chargeable_Weight.\"\n        else:\n            calculated_chargeable_weight = 0.0\n            discrepancy_message = \"Cannot calculate dimensional weight due to missing/invalid dimension/weight fields, and input Chargeable_Weight is also missing/invalid. Calculated_Chargeable_Weight set to 0.\"\n        calculated_dimensional_weight = 0.0\n\nadditional_data = [\n    {\n        \"Query_Description\": \"Calculated Dimensional Weight and Chargeable Weight based on FWB_Documents_POC data.\",\n        \"Calculated_Dimensional_Weight\": calculated_dimensional_weight,\n        \"Calculated_Chargeable_Weight\": calculated_chargeable_weight,\n    }\n]\n\nif discrepancy_message:\n    additional_data[0][\"Discrepancy_Message\"] = discrepancy_message"
                                    },
                                    {
                                        "ruleName": "Extract Awb number",
                                        "ruleDescription": "Step 1 :Take the AWB_No value from the FWB_Documents_POC collection.\nRemove all spaces and hyphens.\nExtract the last 8 digits of the cleaned AWB.\nStore this value as finalAWB.\nStep 2 : Lookup corresponding record in Spot Rate\nIn the Spot Rate collection, extract the AWB number from AWB_Date_of_Journey using characters 5 to 12 (inclusive).\nStore this value as spotAWB.\nMatch spotAWB with finalAWB.\nIf a match is found, retrieve the following fields:\nOrigin\nDestination\nSpot Category\nOffered Spot\nStep 3 : Apply Spot Category Rule\nIf Spot Category is \"SPR\", set Rate/Pivot = Offered Spot.\nIf Spot Category is \"SPC\", set Net Charge = Offered Spot.\nStep 4 : Discrepancy Handling\nHighlight a discrepancy if any of the following issues are found:\nNo matching Spot Rate record\nCleaned AWB does not match Spot Rate AWB\nMissing Spot Category\nMissing Offered Spot\nIncorrect or inconsistent calculationUse this AWB Number to lookup the corresponding record in the Spot Rate collection.\nIn the Spot Rate collection, extract the AWB Number using characters 5 to 12 from the AWB_Date_of_Journey field and match it with the cleaned AWB Number.\nWhen the AWB matches, retrieve Origin, Destination, Spot Category, and Offered Spot.\nIf Spot Category = SPR, then Rate/Pivot = Offered Spot.\nIf Spot Category = SPC, then Net Charge = Offered Spot.",
                                        "message": "Extract Awb number",
                                        "additionalInfoCode": "if \"AWB_No\" in input_data and input_data[\"AWB_No\"] is not None:\n    awb_no_raw = str(input_data[\"AWB_No\"])\n    cleaned_awb = awb_no_raw.replace(\" \", \"\").replace(\"-\", \"\")\n    \n    # Extract the last 8 digits of the cleaned AWB\n    final_awb = cleaned_awb[-8:]\n\n    # Construct the query for Spot_Rate collection\n    # The AWB_Date_of_Journey field in Spot_Rate is like \"098-43888736, 08 Sep 2025\"\n    # The AWB number (e.g., \"43888736\") is at characters 5 to 12 (inclusive), which corresponds to index 4 to 12 in Python slicing.\n    # The regex pattern matches any 4 characters at the beginning (e.g., \"098-\"), followed by the final_awb, and then any remaining characters.\n    query = {\n        \"AWB_Date_of_Journey\": {\"$regex\": f\"^.{4}{final_awb}.*\"}\n    }\n\n    # Retrieve specified fields from matching Spot_Rate records\n    projection = {\n        \"Origin\": 1,\n        \"Destination\": 1,\n        \"Spot_Category\": 1,\n        \"Offered_Spot\": 1,\n        \"_id\": 0\n    }\n\n    spot_rate_records = list(db.Spot_Rate.find(query, projection))\n\n    additional_data = [\n        {\n            \"Query_Description\": \"Spot Rate records matching the extracted AWB number\",\n            \"Query_Result\": spot_rate_records\n        }\n    ]\nelse:\n    additional_data = []"
                                    },
                                    {
                                        "ruleName": "Weight Break Master Lookup & Rate/Pivot Calculation",
                                        "ruleDescription": "Rule 2 — Weight Break Master Lookup & Rate/Pivot Calculation\nStep 1 : Weight Break Master Lookup\nIf no valid Spot Rate record is available, use iCargo fields to search for a matching record in the Weight Break Master collection using the below filters:\nRATE TYPE = CONTRACT or MARKET\nOrigin Level = ARP or CNT\nDestination Level = ARP or CNT or REGGRP\nOrigin = Origin Airport or Origin Country\nDestination = Destination Airport or Destination Country or WWEI\nRate Line Start Date >= iCargo Journey Date\nRate Line End Date <= iCargo Journey Date\nRate Line Status = ACT or EXP\nAgent Code = iCargo Agent Code\nProduct Code = iCargo Product Code\nIf a matching record is found, retrieve:\nNormal Rate\nMinimum Charge\nApplicable Market Rate\nProduct Code\nIf no matching record is found  then highlight discrepancy.",
                                        "message": "Weight Break Master Lookup & Rate/Pivot Calculation",
                                        "additionalInfoCode": "import re\nfrom datetime import datetime\n\n# Helper function to parse dates in \"DD/MM/YYYY\" format\ndef parse_date_ddmmyyyy(date_str):\n    try:\n        return datetime.strptime(date_str, \"%d/%m/%Y\")\n    except (ValueError, TypeError):\n        return None\n\n# Helper function to parse journey date from various formats\ndef parse_journey_date(date_str):\n    if not date_str:\n        return None\n    # Try \"DD Mon YYYY\" format (e.g., \"08 Sep 2025\")\n    try:\n        return datetime.strptime(date_str, \"%d %b %Y\")\n    except ValueError:\n        pass\n    # Try \"DD/MM/YYYY\" format (e.g., \"01/11/2025\")\n    try:\n        return datetime.strptime(date_str, \"%d/%m/%Y\")\n    except ValueError:\n        pass\n    # Try to extract \"DD Mon YYYY\" from a longer string (e.g., \"098-43888736, 08 Sep 2025\")\n    match = re.search(r'(\\d{1,2} \\w{3} \\d{4})', date_str)\n    if match:\n        try:\n            return datetime.strptime(match.group(1), \"%d %b %Y\")\n        except ValueError:\n            pass\n    return None\n\nadditional_data = None\n\n# Rule 2: Weight Break Master Lookup & Rate/Pivot Calculation\n# Step 1: Check if a valid Spot Rate record is available.\n# The rule implies that if Spot_Rate_ID is present and not empty in iCargo data,\n# then a spot rate is available, and the Weight Break Master lookup should be skipped.\nif input_data.get(\"Spot_Rate_ID\") and input_data[\"Spot_Rate_ID\"].strip():\n    additional_data = [\n        {\n            \"Query_Description\": \"Spot Rate ID found in iCargo data, Weight Break Master lookup skipped.\",\n            \"Query_Result\": {\"message\": \"Spot Rate ID present, no Weight Break Master lookup needed.\"}\n        }\n    ]\nelse:\n    # If no valid Spot Rate record is available, proceed with Weight Break Master lookup.\n    # Extract necessary fields from input_data (iCargo fields)\n    origin_code = input_data.get(\"Origin_Code\")\n    destination_code = input_data.get(\"Destination_Code\")\n    agent_code = input_data.get(\"Agent_Code\")\n    product_code = input_data.get(\"Product_Code\")\n    journey_date_str = input_data.get(\"Journey_Date\")\n\n    # Parse journey_date from input_data\n    journey_date = parse_journey_date(journey_date_str)\n\n    # Build MongoDB query conditions\n    conditions = []\n\n    # Fixed filters\n    conditions.append({\"RATE_TYPE\": {\"$in\": [\"CONTRACT\", \"MARKET\"]}})\n    conditions.append({\"RATE_LINE_STATUS\": {\"$in\": [\"ACT\", \"EXP\"]}})\n    conditions.append({\"isDeleted\": False})\n\n    # Origin conditions\n    if origin_code:\n        conditions.append({\n            \"$or\": [\n                {\"ORIGIN_LEVEL\": \"ARP\", \"ORIGIN\": origin_code},\n                {\"ORIGIN_LEVEL\": \"CNT\", \"ORIGIN\": origin_code}\n            ]\n        })\n\n    # Destination conditions\n    if destination_code:\n        conditions.append({\n            \"$or\": [\n                {\"DESTINATION_LEVEL\": \"ARP\", \"DESTINATION\": destination_code},\n                {\"DESTINATION_LEVEL\": \"CNT\", \"DESTINATION\": destination_code},\n                {\"DESTINATION\": \"WWEI\"} # Fixed value for destination\n            ]\n        })\n\n    # Agent Code filter\n    if agent_code:\n        conditions.append({\"AGENT_CODE\": agent_code})\n\n    # Product Code filter\n    if product_code:\n        conditions.append({\"PRODUCT_CODE\": product_code})\n\n    # Combine all conditions with $and for the MongoDB query\n    mongo_query = {\"$and\": conditions} if conditions else {}\n\n    # Execute the query to get raw records (date filtering will be done in Python)\n    query_description = \"Weight Break Master Lookup (initial filters) and Python-side date filtering.\"\n    raw_records = list(db.Weight_Break.find(mongo_query))\n\n    filtered_records = []\n    if journey_date:\n        for record in raw_records:\n            db_start_date_str = record.get(\"RATE_LINE_START_DATE\")\n            db_end_date_str = record.get(\"RATE_LINE_END_DATE\")\n\n            db_start_date = parse_date_ddmmyyyy(db_start_date_str)\n            db_end_date = parse_date_ddmmyyyy(db_end_date_str)\n\n            # Compare only date parts, ignoring time\n            if db_start_date and db_end_date and (db_start_date.date() <= journey_date.date() <= db_end_date.date()):\n                filtered_records.append(record)\n    else:\n        # If journey_date is not available or invalid, no records can match the date criteria.\n        query_description = \"Weight Break Master Lookup: Journey Date missing or invalid, no records can match date criteria.\"\n        filtered_records = []\n\n    if filtered_records:\n        # If matching records are found, retrieve specified fields\n        results = []\n        for record in filtered_records:\n            result_item = {\n                \"Normal Rate\": record.get(\"NORMAL_RATE\"),\n                \"Minimum Charge\": record.get(\"MINIMUM_CHARGE\"),\n                \"Product Code\": record.get(\"PRODUCT_CODE\")\n            }\n            # \"Applicable Market Rate\" is ambiguous, so include all WB-* fields\n            wb_rates = {}\n            for key, value in record.items():\n                if key.startswith(\"WB-\"):\n                    try:\n                        # Attempt to convert to float, otherwise keep original value\n                        wb_rates[key] = float(value) if value is not None else None\n                    except (ValueError, TypeError):\n                        wb_rates[key] = value\n            if wb_rates:\n                result_item[\"Weight_Break_Rates\"] = wb_rates\n            results.append(result_item)\n\n        additional_data = [\n            {\n                \"Query_Description\": query_description,\n                \"Query_Result\": results\n            }\n        ]\n    else:\n        # If no matching record is found, highlight discrepancy.\n        additional_data = [\n            {\n                \"Query_Description\": query_description,\n                \"Query_Result\": {\"message\": \"No matching Weight Break Master record found.\"}\n            }\n        ]"
                                    }
                                ]
                            };
                        } else {
                            airule = {
                                "id": "rule50",
                                "overallRuleName": "AWB Data Comparison",
                                "rules": [
                                    {
                                        "ruleName": "AWB Data Comparison",
                                        "ruleDescription": "For a given AWB_No, retrieve the matching record from:\nAWB_Documents_POC & \niCargo collection \nCompare the following fields:\nOrigin_Code\nDestination_Code\nIATA_Code\nCurrency\nNo_of_Pieces\nChargeable_Weight\nProduct_Code\nSSC_Code\nGross_Weight\nComparison Logic\nFor each field:\nIf the field exists in both collections AND values match exactly:\n  Then Mark field as MATCHED and If the field is missing in either collection OR values do not match exactly:\n  Then Mark field as MISMATCH",
                                        "message": "Highlight the field if any mismatch or not found in between the both document data",
                                        "additionalInfoCode": "if \"AWB_No\" in input_data and input_data[\"AWB_No\"] is not None:\n    awb_no = input_data[\"AWB_No\"]\n\n    awb_doc_poc_data = db.AWB_Documents_POC.find_one({\"AWB_No\": awb_no})\n    icargo_data = db.iCargo.find_one({\"AWB_No\": awb_no})\n\n    additional_data = [\n        {\n            \"Query_Description\": f\"AWB_Documents_POC record for AWB_No: {awb_no}\",\n            \"Query_Result\": awb_doc_poc_data\n        },\n        {\n            \"Query_Description\": f\"iCargo record for AWB_No: {awb_no}\",\n            \"Query_Result\": icargo_data\n        }\n    ]\nelse:\n    additional_data = []"
                                    },
                                    {
                                        "ruleName": "Chargeable Weight Check",
                                        "ruleDescription": "Check the AWB_Documents_POC collection for the fields Dimension_B, Dimension_H, Dimension_L and Dimension_Unit individually.\nIf Dimension_B, Dimension_H, Dimension_L and Dimension_Unit are blank, then set Calculated_Chargeable_Weight = Chargeable_Weight.",
                                        "message": "Chargeable Weight Check",
                                        "additionalInfoCode": "additional_data = None"
                                    },
                                    {
                                        "ruleName": "Calculated_Dimensional_Weight",
                                        "ruleDescription": "if Dimension_B,Dimension_H,Dimension_L Dimension_Unit are not blank in AWB_Documents_POC collection then step1 -If Dimension_Unit is CM or CMS Then Calculated Dimensional_Weight = Dimension_L * Dimension_B * Dimension_H * No of Pieces / 6000 Step-2 If Dimension_Unit is INCHES or IN Then Calculated Dimensional_Weight = Dimension_L * Dimension_B * Dimension_H * No of Pieces / 366 Step 3 Add up all the Calculated_Dimensional_Weight If Total Calculated_Dimensional_Weight> Gross_Weight Then Calculated_Chargeable_Weight =Calculated_Dimensional_Weight and If Calculated_Chargeable_Weight< Gross_Weight Then Calculated_Chargeable_Weight = Gross_Weight In case of discrepancy, highlight\nDimension_Unit are blank, then set Calculated_Chargeable_Weight = Chargeable_Weight.",
                                        "message": "Calculated_Dimensional_Weight",
                                        "additionalInfoCode": "calculated_dimensional_weight = 0.0\ncalculated_chargeable_weight = 0.0\ndiscrepancy_message = None\n\ndef get_float_or_none(data, key):\n    value = data.get(key)\n    if value is not None and value != \"\":\n        try:\n            return float(value)\n        except (ValueError, TypeError):\n            return None\n    return None\n\ndimension_b = get_float_or_none(input_data, \"Dimension_B\")\ndimension_h = get_float_or_none(input_data, \"Dimension_H\")\ndimension_l = get_float_or_none(input_data, \"Dimension_L\")\ndimension_unit_raw = input_data.get(\"Dimension_Unit\")\ndimension_unit = dimension_unit_raw.upper() if dimension_unit_raw else \"\"\nno_of_pieces = get_float_or_none(input_data, \"No_of_Pieces\")\ngross_weight = get_float_or_none(input_data, \"Gross_Weight\")\nchargeable_weight_input = get_float_or_none(input_data, \"Chargeable_Weight\")\n\nif dimension_unit_raw is None or dimension_unit_raw == \"\":\n    if chargeable_weight_input is not None:\n        calculated_chargeable_weight = chargeable_weight_input\n        discrepancy_message = \"Dimension_Unit is blank. Calculated_Chargeable_Weight set to input Chargeable_Weight.\"\n    else:\n        calculated_chargeable_weight = 0.0\n        discrepancy_message = \"Dimension_Unit is blank and input Chargeable_Weight is also missing/invalid. Calculated_Chargeable_Weight set to 0.\"\n    calculated_dimensional_weight = 0.0\nelse:\n    if all(val is not None for val in [dimension_b, dimension_h, dimension_l, no_of_pieces, gross_weight]) and dimension_unit in [\"CM\", \"CMS\", \"INCHES\", \"IN\"]:\n        if dimension_unit in [\"CM\", \"CMS\"]:\n            calculated_dimensional_weight = (dimension_l * dimension_b * dimension_h * no_of_pieces) / 6000\n        elif dimension_unit in [\"INCHES\", \"IN\"]:\n            calculated_dimensional_weight = (dimension_l * dimension_b * dimension_h * no_of_pieces) / 366\n\n        if calculated_dimensional_weight > gross_weight:\n            calculated_chargeable_weight = calculated_dimensional_weight\n        else:\n            calculated_chargeable_weight = gross_weight\n    else:\n        if chargeable_weight_input is not None:\n            calculated_chargeable_weight = chargeable_weight_input\n            if not all(val is not None for val in [dimension_b, dimension_h, dimension_l, no_of_pieces, gross_weight]):\n                discrepancy_message = \"Missing or invalid dimension/weight fields for dimensional weight calculation. Calculated_Chargeable_Weight set to input Chargeable_Weight.\"\n            elif dimension_unit not in [\"CM\", \"CMS\", \"INCHES\", \"IN\"]:\n                discrepancy_message = f\"Unrecognized Dimension_Unit '{dimension_unit_raw}'. Calculated_Chargeable_Weight set to input Chargeable_Weight.\"\n        else:\n            calculated_chargeable_weight = 0.0\n            discrepancy_message = \"Cannot calculate dimensional weight due to missing/invalid dimension/weight fields, and input Chargeable_Weight is also missing/invalid. Calculated_Chargeable_Weight set to 0.\"\n        calculated_dimensional_weight = 0.0\n\nadditional_data = [\n    {\n        \"Query_Description\": \"Calculated Dimensional Weight and Chargeable Weight based on AWB_Documents_POC data.\",\n        \"Calculated_Dimensional_Weight\": calculated_dimensional_weight,\n        \"Calculated_Chargeable_Weight\": calculated_chargeable_weight,\n    }\n]\n\nif discrepancy_message:\n    additional_data[0][\"Discrepancy_Message\"] = discrepancy_message"
                                    },
                                    {
                                        "ruleName": "Extract Awb number",
                                        "ruleDescription": "Step 1 :Take the AWB_No value from the AWB_Documents_POC collection.\nRemove all spaces and hyphens.\nExtract the last 8 digits of the cleaned AWB.\nStore this value as finalAWB.\nStep 2 : Lookup corresponding record in Spot Rate\nIn the Spot Rate collection, extract the AWB number from AWB_Date_of_Journey using characters 5 to 12 (inclusive).\nStore this value as spotAWB.\nMatch spotAWB with finalAWB.\nIf a match is found, retrieve the following fields:\nOrigin\nDestination\nSpot Category\nOffered Spot\nStep 3 : Apply Spot Category Rule\nIf Spot Category is \"SPR\", set Rate/Pivot = Offered Spot.\nIf Spot Category is \"SPC\", set Net Charge = Offered Spot.\nStep 4 : Discrepancy Handling\nHighlight a discrepancy if any of the following issues are found:\nNo matching Spot Rate record\nCleaned AWB does not match Spot Rate AWB\nMissing Spot Category\nMissing Offered Spot\nIncorrect or inconsistent calculationUse this AWB Number to lookup the corresponding record in the Spot Rate collection.\nIn the Spot Rate collection, extract the AWB Number using characters 5 to 12 from the AWB_Date_of_Journey field and match it with the cleaned AWB Number.\nWhen the AWB matches, retrieve Origin, Destination, Spot Category, and Offered Spot.\nIf Spot Category = SPR, then Rate/Pivot = Offered Spot.\nIf Spot Category = SPC, then Net Charge = Offered Spot.",
                                        "message": "Extract Awb number",
                                        "additionalInfoCode": "if \"AWB_No\" in input_data and input_data[\"AWB_No\"] is not None:\n    awb_no_raw = str(input_data[\"AWB_No\"])\n    cleaned_awb = awb_no_raw.replace(\" \", \"\").replace(\"-\", \"\")\n    \n    # Extract the last 8 digits of the cleaned AWB\n    final_awb = cleaned_awb[-8:]\n\n    # Construct the query for Spot_Rate collection\n    # The AWB_Date_of_Journey field in Spot_Rate is like \"098-43888736, 08 Sep 2025\"\n    # The AWB number (e.g., \"43888736\") is at characters 5 to 12 (inclusive), which corresponds to index 4 to 12 in Python slicing.\n    # The regex pattern matches any 4 characters at the beginning (e.g., \"098-\"), followed by the final_awb, and then any remaining characters.\n    query = {\n        \"AWB_Date_of_Journey\": {\"$regex\": f\"^.{4}{final_awb}.*\"}\n    }\n\n    # Retrieve specified fields from matching Spot_Rate records\n    projection = {\n        \"Origin\": 1,\n        \"Destination\": 1,\n        \"Spot_Category\": 1,\n        \"Offered_Spot\": 1,\n        \"_id\": 0\n    }\n\n    spot_rate_records = list(db.Spot_Rate.find(query, projection))\n\n    additional_data = [\n        {\n            \"Query_Description\": \"Spot Rate records matching the extracted AWB number\",\n            \"Query_Result\": spot_rate_records\n        }\n    ]\nelse:\n    additional_data = []"
                                    },
                                    {
                                        "ruleName": "Weight Break Master Lookup & Rate/Pivot Calculation",
                                        "ruleDescription": "Rule 2 — Weight Break Master Lookup & Rate/Pivot Calculation\nStep 1 : Weight Break Master Lookup\nIf no valid Spot Rate record is available, use iCargo fields to search for a matching record in the Weight Break Master collection using the below filters:\nRATE TYPE = CONTRACT or MARKET\nOrigin Level = ARP or CNT\nDestination Level = ARP or CNT or REGGRP\nOrigin = Origin Airport or Origin Country\nDestination = Destination Airport or Destination Country or WWEI\nRate Line Start Date >= iCargo Journey Date\nRate Line End Date <= iCargo Journey Date\nRate Line Status = ACT or EXP\nAgent Code = iCargo Agent Code\nProduct Code = iCargo Product Code\nIf a matching record is found, retrieve:\nNormal Rate\nMinimum Charge\nApplicable Market Rate\nProduct Code\nIf no matching record is found  then highlight discrepancy.",
                                        "message": "Weight Break Master Lookup & Rate/Pivot Calculation",
                                        "additionalInfoCode": "import re\nfrom datetime import datetime\n\n# Helper function to parse dates in \"DD/MM/YYYY\" format\ndef parse_date_ddmmyyyy(date_str):\n    try:\n        return datetime.strptime(date_str, \"%d/%m/%Y\")\n    except (ValueError, TypeError):\n        return None\n\n# Helper function to parse journey date from various formats\ndef parse_journey_date(date_str):\n    if not date_str:\n        return None\n    # Try \"DD Mon YYYY\" format (e.g., \"08 Sep 2025\")\n    try:\n        return datetime.strptime(date_str, \"%d %b %Y\")\n    except ValueError:\n        pass\n    # Try \"DD/MM/YYYY\" format (e.g., \"01/11/2025\")\n    try:\n        return datetime.strptime(date_str, \"%d/%m/%Y\")\n    except ValueError:\n        pass\n    # Try to extract \"DD Mon YYYY\" from a longer string (e.g., \"098-43888736, 08 Sep 2025\")\n    match = re.search(r'(\\d{1,2} \\w{3} \\d{4})', date_str)\n    if match:\n        try:\n            return datetime.strptime(match.group(1), \"%d %b %Y\")\n        except ValueError:\n            pass\n    return None\n\nadditional_data = None\n\n# Rule 2: Weight Break Master Lookup & Rate/Pivot Calculation\n# Step 1: Check if a valid Spot Rate record is available.\n# The rule implies that if Spot_Rate_ID is present and not empty in iCargo data,\n# then a spot rate is available, and the Weight Break Master lookup should be skipped.\nif input_data.get(\"Spot_Rate_ID\") and input_data[\"Spot_Rate_ID\"].strip():\n    additional_data = [\n        {\n            \"Query_Description\": \"Spot Rate ID found in iCargo data, Weight Break Master lookup skipped.\",\n            \"Query_Result\": {\"message\": \"Spot Rate ID present, no Weight Break Master lookup needed.\"}\n        }\n    ]\nelse:\n    # If no valid Spot Rate record is available, proceed with Weight Break Master lookup.\n    # Extract necessary fields from input_data (iCargo fields)\n    origin_code = input_data.get(\"Origin_Code\")\n    destination_code = input_data.get(\"Destination_Code\")\n    agent_code = input_data.get(\"Agent_Code\")\n    product_code = input_data.get(\"Product_Code\")\n    journey_date_str = input_data.get(\"Journey_Date\")\n\n    # Parse journey_date from input_data\n    journey_date = parse_journey_date(journey_date_str)\n\n    # Build MongoDB query conditions\n    conditions = []\n\n    # Fixed filters\n    conditions.append({\"RATE_TYPE\": {\"$in\": [\"CONTRACT\", \"MARKET\"]}})\n    conditions.append({\"RATE_LINE_STATUS\": {\"$in\": [\"ACT\", \"EXP\"]}})\n    conditions.append({\"isDeleted\": False})\n\n    # Origin conditions\n    if origin_code:\n        conditions.append({\n            \"$or\": [\n                {\"ORIGIN_LEVEL\": \"ARP\", \"ORIGIN\": origin_code},\n                {\"ORIGIN_LEVEL\": \"CNT\", \"ORIGIN\": origin_code}\n            ]\n        })\n\n    # Destination conditions\n    if destination_code:\n        conditions.append({\n            \"$or\": [\n                {\"DESTINATION_LEVEL\": \"ARP\", \"DESTINATION\": destination_code},\n                {\"DESTINATION_LEVEL\": \"CNT\", \"DESTINATION\": destination_code},\n                {\"DESTINATION\": \"WWEI\"} # Fixed value for destination\n            ]\n        })\n\n    # Agent Code filter\n    if agent_code:\n        conditions.append({\"AGENT_CODE\": agent_code})\n\n    # Product Code filter\n    if product_code:\n        conditions.append({\"PRODUCT_CODE\": product_code})\n\n    # Combine all conditions with $and for the MongoDB query\n    mongo_query = {\"$and\": conditions} if conditions else {}\n\n    # Execute the query to get raw records (date filtering will be done in Python)\n    query_description = \"Weight Break Master Lookup (initial filters) and Python-side date filtering.\"\n    raw_records = list(db.Weight_Break.find(mongo_query))\n\n    filtered_records = []\n    if journey_date:\n        for record in raw_records:\n            db_start_date_str = record.get(\"RATE_LINE_START_DATE\")\n            db_end_date_str = record.get(\"RATE_LINE_END_DATE\")\n\n            db_start_date = parse_date_ddmmyyyy(db_start_date_str)\n            db_end_date = parse_date_ddmmyyyy(db_end_date_str)\n\n            # Compare only date parts, ignoring time\n            if db_start_date and db_end_date and (db_start_date.date() <= journey_date.date() <= db_end_date.date()):\n                filtered_records.append(record)\n    else:\n        # If journey_date is not available or invalid, no records can match the date criteria.\n        query_description = \"Weight Break Master Lookup: Journey Date missing or invalid, no records can match date criteria.\"\n        filtered_records = []\n\n    if filtered_records:\n        # If matching records are found, retrieve specified fields\n        results = []\n        for record in filtered_records:\n            result_item = {\n                \"Normal Rate\": record.get(\"NORMAL_RATE\"),\n                \"Minimum Charge\": record.get(\"MINIMUM_CHARGE\"),\n                \"Product Code\": record.get(\"PRODUCT_CODE\")\n            }\n            # \"Applicable Market Rate\" is ambiguous, so include all WB-* fields\n            wb_rates = {}\n            for key, value in record.items():\n                if key.startswith(\"WB-\"):\n                    try:\n                        # Attempt to convert to float, otherwise keep original value\n                        wb_rates[key] = float(value) if value is not None else None\n                    except (ValueError, TypeError):\n                        wb_rates[key] = value\n            if wb_rates:\n                result_item[\"Weight_Break_Rates\"] = wb_rates\n            results.append(result_item)\n\n        additional_data = [\n            {\n                \"Query_Description\": query_description,\n                \"Query_Result\": results\n            }\n        ]\n    else:\n        # If no matching record is found, highlight discrepancy.\n        additional_data = [\n            {\n                \"Query_Description\": query_description,\n                \"Query_Result\": {\"message\": \"No matching Weight Break Master record found.\"}\n            }\n        ]"
                                    }
                                ]
                            };
                        }

                        console.log("Evaluating AI Rule...");
                        const ruleResponse = await fetch("https://uat.aiqod.com:453/aiqod-agent/agent/evaluateAIRule", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                rulesSetValue: rulesSetValue,
                                airule: airule
                            })
                        });

                        const ruleResult = await ruleResponse.json();
                        console.log("AI Rule Evaluation Response:", ruleResult);

                        if (ruleResult?.data?.DocumentLevelError && ruleResult.data.DocumentLevelError.length > 0) {
                            setModalTitle("Error Details");
                            setModalData(ruleResult.data.DocumentLevelError);
                            setHasErrors(true);
                            setShowModal(true);

                            // Extract error fields
                            const newErrorFields = new Set<string>();
                            ruleResult.data.DocumentLevelError.forEach((err: any) => {
                                const key = Object.keys(err)[0];
                                newErrorFields.add(key);
                            });
                            setErrorFields(newErrorFields);

                        } else {
                            setModalTitle("Success");
                            setModalData(null);
                            setHasErrors(false);
                            setShowModal(true);
                            setErrorFields(new Set());
                        }


                    }

                } catch (error) {
                    console.error("Error fetching AWB Documents:", error);
                }
            };

            fetchAwbDocuments();
        }, 4000);

        return () => clearTimeout(timer);
    }, [awbFromQuery, typeFromQuery]);

    return (
        <div className="min-h-screen bg-gray-50 text-sans">

            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center gap-4">

                    <div className="text-sm text-gray-600">🏠 Home</div>

                    <div className="flex-1 text-center text-sm text-blue-600 font-semibold">
                        Capture AWB / Screen : OPR026
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push("/")}
                            className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
                        >
                            ← Back
                        </button>

                        <div className="text-sm text-gray-600">User: C_DIVESH.CHOUDHARY1</div>
                    </div>

                </div>
            </header>

            {/* SCREEN SWITCHER TAB */}
            <div className="max-w-[1200px] mx-auto px-4 mt-3">
                <div className="flex gap-2">

                    <button
                        onClick={() => router.push(`/awb?awb=${awbFromQuery}`)}
                        className="px-4 py-2 rounded-t bg-blue-600 text-white text-sm font-semibold"
                    >
                        Capture AWB (OPR026)
                    </button>

                    <button
                        onClick={() => router.push(`/opr352?awb=${awbFromQuery}`)}
                        className="px-4 py-2 rounded-t bg-gray-200 text-sm"
                    >
                        FWB Messaging (OPR352)
                    </button>

                    {hasErrors && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded-full"
                            title="Show Errors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                        </button>
                    )}

                </div>

            </div>

            {/* AWB Header Block */}
            <section className="max-w-[1200px] mx-auto px-4 py-3">
                <div className="bg-white border rounded-md p-3 shadow-sm">
                    <div className="flex items-start gap-4">

                        <div>
                            <div className="text-xs text-gray-600 mb-1">AWB Number</div>
                            <div className="flex items-center gap-1">
                                <div className="bg-yellow-300 border border-yellow-400 px-2 py-1 rounded text-sm font-medium min-w-[56px] text-center">
                                    {awbFromQuery ? awbFromQuery.slice(0, 3) : "098"}
                                </div>
                                <div className="bg-yellow-200 border border-yellow-300 px-3 py-1 rounded text-sm font-medium">
                                    {awbFromQuery ? awbFromQuery.slice(3) : "49170704"}
                                </div>
                            </div>
                        </div>

                        <div className="ml-6">
                            <div className="text-xs text-gray-600 mb-1">Owner Code</div>
                            <input
                                className="border rounded px-2 py-1 w-20 text-sm"
                                value={generalData.ownerCode}
                                onChange={(e) => handleGeneralChange("ownerCode", e.target.value)}
                            />
                        </div>

                        <div className="ml-6 flex-1">
                            <div className="text-xs text-gray-600 mb-1">UBR No</div>
                            <input
                                className="border rounded px-2 py-1 w-full text-sm"
                                value={generalData.ubrNo}
                                onChange={(e) => handleGeneralChange("ubrNo", e.target.value)}
                            />
                        </div>

                        <div className="ml-4 w-28">
                            <div className="text-xs text-gray-600 mb-1">Group ID</div>
                            <input
                                className="border rounded px-2 py-1 w-full text-sm"
                                value={generalData.groupId}
                                onChange={(e) => handleGeneralChange("groupId", e.target.value)}
                            />
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <button className="px-3 py-1 border rounded text-sm bg-gray-100">Select/Save Template</button>
                            <button className="px-3 py-1 rounded text-sm bg-green-600 text-white">List</button>
                            <button className="px-3 py-1 border rounded text-sm">Duplicate</button>
                            <button className="px-3 py-1 border rounded text-sm">Clear</button>
                        </div>

                    </div>
                </div>
            </section>

            {/* Main content wrapper */}
            <main className="max-w-[1200px] mx-auto px-4">

                <div className="bg-white border rounded-md shadow-sm relative">

                    {isLoading && (
                        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                            <div className="text-blue-600 font-semibold">Loading AWB Details...</div>
                        </div>
                    )}

                    {/* Toolbar */}
                    <div className="px-3 py-2 border-b">
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-gray-600">Houses (0)</div>
                            <div className="text-sm text-gray-600">HAWB Documents Finalized</div>
                            <div className="ml-auto text-sm text-blue-600">
                                Source : Portal Booking | Status : Executed
                            </div>
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="px-3 pt-3">
                        <nav className="flex gap-2 text-sm">

                            <button
                                onClick={() => setActiveTab("general")}
                                className={`px-3 py-2 bg-white border rounded-t ${activeTab === "general"
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-600"
                                    }`}
                            >
                                General
                            </button>

                            <button
                                onClick={() => setActiveTab("charges")}
                                className={`px-3 py-2 bg-white border rounded-t ${activeTab === "charges"
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-600"
                                    }`}
                            >
                                Charges and Accounting
                            </button>

                            <button className="px-3 py-2 bg-white border rounded-t text-gray-600">
                                Additional Information
                            </button>
                            <button className="px-3 py-2 bg-white border rounded-t text-gray-600">
                                Booking Details
                            </button>
                            <button className="px-3 py-2 bg-white border rounded-t text-gray-600">
                                Electronic Data Status
                            </button>

                        </nav>
                    </div>

                    {/* TAB CONTENT AREA */}
                    <div className="px-4 pb-4 pt-2">

                        {/* GENERAL TAB CONTENT */}
                        {activeTab === "general" && (
                            <>
                                {/* TOP ROW */}
                                <div className="grid grid-cols-12 gap-4 items-center">

                                    <div className="col-span-2">
                                        <label className="text-xs text-gray-600">Origin *</label>
                                        <input
                                            className={getInputClass("Origin_Code")}
                                            value={generalData.origin}
                                            onChange={(e) => handleGeneralChange("origin", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="text-xs text-gray-600">Destination *</label>
                                        <input
                                            className={getInputClass("Destination_Code")}
                                            value={generalData.destination}
                                            onChange={(e) => handleGeneralChange("destination", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-3">
                                        <label className="text-xs text-gray-600">Routing *</label>
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={generalData.routing}
                                            onChange={(e) => handleGeneralChange("routing", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-3">
                                        <label className="text-xs text-gray-600">Requested Flight</label>
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={generalData.requestedFlight}
                                            onChange={(e) => handleGeneralChange("requestedFlight", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-1">
                                        <label className="text-xs text-gray-600">SCC</label>
                                        <input
                                            className={getInputClass("SSC_Code")}
                                            value={generalData.scc}
                                            onChange={(e) => handleGeneralChange("scc", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-1">
                                        <label className="text-xs text-gray-600">Product</label>
                                        <input
                                            className={getInputClass("Product_Code")}
                                            value={generalData.product}
                                            onChange={(e) => handleGeneralChange("product", e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className="h-4" />

                                {/* AGENT DETAILS */}
                                <div className="border rounded p-3 bg-gray-50">
                                    <div className="text-sm font-semibold mb-2">AGENT DETAILS</div>

                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-2">
                                            <label className="text-xs text-gray-600">Code</label>
                                            <input
                                                className={getInputClass("Agent_Code")}
                                                value={generalData.agentCode}
                                                onChange={(e) => handleGeneralChange("agentCode", e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-5">
                                            <label className="text-xs text-gray-600">Name</label>
                                            <input
                                                className="w-full border rounded px-2 py-1"
                                                value={generalData.agentName}
                                                onChange={(e) => handleGeneralChange("agentName", e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="text-xs text-gray-600">IATA Code</label>
                                            <input
                                                className={getInputClass("IATA_Code")}
                                                value={generalData.iataCode}
                                                onChange={(e) => handleGeneralChange("iataCode", e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="text-xs text-gray-600">CASS Code</label>
                                            <input
                                                className="w-full border rounded px-2 py-1"
                                                value={generalData.cassCode}
                                                onChange={(e) => handleGeneralChange("cassCode", e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-1 flex items-end">
                                            <button className="px-3 py-1 border rounded text-sm">Tax Info</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-4" />

                                {/* SHIPPER/CONSIGNEE */}
                                <div className="grid grid-cols-12 gap-4">

                                    <div className="col-span-6 border rounded p-3 bg-white">
                                        <div className="text-sm font-semibold mb-2">
                                            SHIPPER / CONSIGNEE DETAILS
                                        </div>

                                        <div className="text-xs text-gray-600 mb-1">
                                            Shipper : {generalData.shipper}
                                        </div>

                                        <div className="grid grid-cols-12 gap-2 mt-2">
                                            <div className="col-span-6">
                                                <label className="text-xs text-gray-600">Code *</label>
                                                <input
                                                    className="w-full border rounded px-2 py-1"
                                                    value={generalData.shipperCode}
                                                    onChange={(e) => handleGeneralChange("shipperCode", e.target.value)}
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label className="text-xs text-gray-600">A/C Number</label>
                                                <input
                                                    className="w-full border rounded px-2 py-1"
                                                    value={generalData.shipperAc}
                                                    onChange={(e) => handleGeneralChange("shipperAc", e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3 flex gap-2">
                                            <button className="px-3 py-1 border rounded text-sm bg-gray-100">Capture Irregularity</button>
                                            <button className="px-3 py-1 border rounded text-sm">Split Shipment</button>
                                            <button className="px-3 py-1 border rounded text-sm">HAWB</button>
                                            <button className="px-3 py-1 border rounded text-sm">Accept</button>
                                        </div>
                                    </div>

                                    <div className="col-span-6 border rounded p-3 bg-white">
                                        <div className="text-sm font-semibold mb-2">CONSIGNEE</div>

                                        <div className="text-xs text-gray-600 mb-1">
                                            Consignee : {generalData.consignee}
                                        </div>

                                        <div className="grid grid-cols-12 gap-2 mt-2">
                                            <div className="col-span-6">
                                                <label className="text-xs text-gray-600">Code *</label>
                                                <input
                                                    className="w-full border rounded px-2 py-1"
                                                    value={generalData.consigneeCode}
                                                    onChange={(e) => handleGeneralChange("consigneeCode", e.target.value)}
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label className="text-xs text-gray-600">A/C Number</label>
                                                <input
                                                    className="w-full border rounded px-2 py-1"
                                                    value={generalData.consigneeAc}
                                                    onChange={(e) => handleGeneralChange("consigneeAc", e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3 flex justify-end gap-2">
                                            <button className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">View/Upload Files</button>
                                            <button className="px-3 py-1 border rounded text-sm bg-gray-200">Print</button>
                                            <button className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">Send</button>
                                        </div>
                                    </div>

                                </div>

                                <div className="h-6" />

                            </>
                        )}

                        {/* CHARGES TAB CONTENT */}
                        {activeTab === "charges" && <ChargesTab data={chargesData} onChange={handleChargesChange} errorFields={errorFields} />}

                    </div>

                    {/* Footer actions */}
                    <div className="px-4 py-3 border-t bg-gray-50 flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1 border rounded text-sm bg-gray-100">Delete AWB</button>
                            <button className="px-3 py-1 border rounded text-sm">Update Prenomination</button>
                            <button className="px-3 py-1 border rounded text-sm">Save</button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1 border rounded text-sm">Close</button>
                            <div className="text-sm text-gray-500">
                                Last updated by: C_DIVESH.CHOUDHARY1
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Error/Success Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
                        <div className="max-h-[60vh] overflow-y-auto">
                            {modalData ? (
                                <ul className="space-y-2">
                                    {modalData.map((err: any, idx: number) => {
                                        const key = Object.keys(err)[0];
                                        const value = err[key];
                                        return (
                                            <li key={idx} className="text-sm text-black">
                                                <span className="font-semibold">{idx + 1}. {key}:</span> {value}
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div className="text-green-600 font-medium flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Success! No errors found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
