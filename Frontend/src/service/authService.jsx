// src/services/authService.js
export async function loginUser(formData) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // to receive token in cookie
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
}
