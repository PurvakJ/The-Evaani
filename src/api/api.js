export const api = async (data) => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbx1ZwBF1Tzr6lvWDNpGhMJESz1ZgLD2aT3nKFfXipIClr4DPSoUFktcTeesjCli_ar7AQ/exec",
    {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    }
  );
  const text = await res.text();
  return JSON.parse(text);
};
