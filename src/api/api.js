export const api = async (data) => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbyaQdUoAFRK8yaSEp2eaqrJlsMMsu-BzWS95K7i0K8wVszhEMFzVORG3fi7UkQy6JEHGg/exec",
    {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    }
  );
  const text = await res.text();
  return JSON.parse(text);
};
