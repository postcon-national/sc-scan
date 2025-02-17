import { Code } from "@/types/types";

export const exportToCSV = async (
  data: Code[],
  setData: (data: Code[]) => void
) => {
  try {
    // Check if there is data to export
    if (!data.length) {
      throw new Error("Keine Daten zum Exportieren vorhanden");
    }

    // Get the first record's zust value
    const firstZust = data[0].zust;

    // Check if all records have the same zust value
    const hasInconsistentZust = data.some((item) => item.zust !== firstZust);
    if (hasInconsistentZust) {
      throw new Error("Alle Datensätze müssen den gleichen ZUP + ABL haben");
    }

    // Generate timestamp in required format
    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getDate().toString().padStart(2, "0") +
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0");

    // Construct filename using the validated zust
    const filename = `${timestamp}_${firstZust}_Trackingdaten_dvs.csv`;

    // Create CSV content
    const csvContent = generateCSVContent(data);

    try {
      // Try SFTP upload first
      const response = await fetch("/api/upload-sftp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: csvContent, filename }),
      });

      if (!response.ok) {
        throw new Error("Upload fehlgeschlagen");
      }

      // Clear data after successful upload
      setData([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("scannedData");
      }

      return { success: true, filename };
    } catch {
      // If SFTP upload fails, throw a special error that the UI can handle
      throw new Error("SFTP_FAILED");
    }
  } catch (error) {
    console.error("Export error:", error);
    throw error;
  }
};

// Separate function for downloading the file
export const downloadCSV = (data: Code[], filename: string) => {
  const csvContent = generateCSVContent(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return { downloadComplete: true };
};

function generateCSVContent(data: Code[]): string {
  // Add headers
  const headers = [
    "UPOC_ZUP",
    "SendungsID_dvs",
    "DATAMATRIX_dvs",
    "EncodingDateTime",
    "shortStatus",
    "ZUPID_Erfasser",
    "ZUPID_Zusteller",
  ];
  const rows = data.map((item) => [
    item.sidZup || "", // UPOC_ZUP
    item.sidDVS || "", // SendungsID_dvs
    item.dmc || "", // DATAMATRIX_dvs
    item.gam || "", // EncodingDateTime
    `"${item.status || ""}"`, // shortStatus (quoted)
    `"${item.erfasser || ""}"`, // ZUPID_Erfasser (quoted)
    `"${item.zust || ""}"`, // ZUPID_Zusteller (quoted)
  ]);

  return [headers, ...rows].map((row) => row.join(";")).join("\n");
}
