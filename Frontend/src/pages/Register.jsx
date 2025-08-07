import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
    storeAddress: "",
    storeContact: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name) e.name = "Name is required.";
    if (!form.email) e.email = "Email is required.";
    if (!form.password) e.password = "Password is required.";
    if (!form.storeName) e.storeName = "Store Name is required.";
    if (!form.storeAddress) e.storeAddress = "Store Address is required.";
    if (!form.storeContact) e.storeContact = "Contact number is required.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setLoading(true);
      await register(form);
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-[#EDF6F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-2xl bg-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <rect
                x="4"
                y="7"
                width="3"
                height="10"
                rx="1.5"
                className="fill-slate-900"
              />
              <rect
                x="10.5"
                y="5"
                width="3"
                height="14"
                rx="1.5"
                className="fill-slate-900"
              />
              <rect
                x="17"
                y="9"
                width="3"
                height="8"
                rx="1.5"
                className="fill-slate-900"
              />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Stock Master
            </h1>
            <p className="text-sm text-slate-600">Create your free account</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/90 backdrop-blur border border-slate-200 shadow-xl max-h-[75vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-1.5"
                />
                {errors.name && (
                  <p className="text-xs text-rose-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-1.5"
                />
                {errors.email && (
                  <p className="text-xs text-rose-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-3 py-1.5 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="1.4"
                          d="M3 3l18 18M10.6 10.6A3 3 0 0012 15a3 3 0 001.4-5.4M9.9 5.1A10.7 10.7 0 0112 5c5.2 0 9.6 3.6 10.8 8a11.6 11.6 0 01-2.6 4.7M6.2 6.2A11.7 11.7 0 001.2 13c1.1 4.4 5.5 8 10.8 8 1.5 0 2.9-.3 4.2-.9"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="1.4"
                          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-600">{errors.password}</p>
                )}
              </div>

              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Store Name
                </label>
                <input
                  name="storeName"
                  value={form.storeName}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-1.5"
                />
                {errors.storeName && (
                  <p className="text-xs text-rose-600">{errors.storeName}</p>
                )}
              </div>

              {/* Store Contact */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Store Contact
                </label>
                <input
                  name="storeContact"
                  value={form.storeContact}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                    if (onlyNums.length <= 10) {
                      setForm((f) => ({ ...f, storeContact: onlyNums }));
                    }
                  }}
                  placeholder="10 digit mobile"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-1.5"
                />
                {errors.storeContact && (
                  <p className="text-xs text-rose-600">{errors.storeContact}</p>
                )}
              </div>

              {/* Store Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  Store Address
                </label>
                <textarea
                  name="storeAddress"
                  value={form.storeAddress}
                  onChange={handleChange}
                  rows={3}
                  maxLength={255}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-1.5 resize-none"
                />
                <div className="flex justify-between text-[11px] mt-1">
                  {errors.storeAddress ? (
                    <p className="text-rose-600">{errors.storeAddress}</p>
                  ) : (
                    <span></span>
                  )}
                  <span className="text-slate-500">
                    {form.storeAddress.length}/255
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 w-full rounded-xl bg-[#1AB2E6] text-white px-4 py-2 font-medium shadow-md hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              {/* Login Link */}
              <div className="md:col-span-2 text-center text-sm mt-1">
                Already have an account?
                <a href="/login" className="text-blue-600 hover:underline ml-1">
                  Sign In
                </a>
              </div>
              <a href="/" className="text-blue-600 hover:underline">
                ← Back to Home
              </a>
            </form>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Stock Master
        </p>
      </div>
    </div>
  );
}
