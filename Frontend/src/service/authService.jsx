import { apiBaseUrl } from "./api";

export async function loginUser(formData) {
  const res = await fetch(`${apiBaseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // to receive token in cookie
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
}

export async function userLogout() {
  const res = await fetch(`${apiBaseUrl}/api/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // to receive token in cookie
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
}

export async function sessionUser() {
  const res = await fetch(`${apiBaseUrl}/api/admin/session`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
}
