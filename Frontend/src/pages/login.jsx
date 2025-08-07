import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  console.log("Rendering login page");
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    const e = {};
    if (!form.email) e.email = "Email is required.";
    if (!form.password) e.password = "Password is required.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setLoading(true);
      const { email, password } = form;
      await login({ email, password });
      // await login(form);
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // Unchanged JS logic above...

  return (
    <div className="min-h-screen bg-[#EDF6F7] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8">
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
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Stock Master
            </h1>
            <p className="text-sm text-slate-600">
              Sign in to manage your portfolio
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/90 backdrop-blur border border-slate-200 shadow-xl">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800/20"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-slate-600 hover:text-slate-800"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="mt-1.5 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      // Eye-off icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18M10.6 10.6A3 3 0 0012 15a3 3 0 001.4-5.4M9.9 5.1A10.7 10.7 0 0112 5c5.2 0 9.6 3.6 10.8 8a11.6 11.6 0 01-2.6 4.7M6.2 6.2A11.7 11.7 0 001.2 13c1.1 4.4 5.5 8 10.8 8 1.5 0 2.9-.3 4.2-.9"
                        />
                      </svg>
                    ) : (
                      // Eye icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-[#1AB2E6] text-[#1AB2E6] focus:ring-[#1AB2E6]"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className=" cursor-pointer w-full inline-flex items-center justify-center rounded-xl bg-[#1AB2E6] text-white px-4 py-2.5 font-medium shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            <div className="col-span-1 md:col-span-2 text-center text-sm mt-2">
              Already have an account?
              <a
                href="/register"
                className="text-blue-600 hover:underline ml-1"
              >
                Sign up
              </a>
            </div>
            <a href="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </a>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 bg-slate-50 rounded-b-2xl border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              By signing in, you agree to the{" "}
              <a href="#" className="underline hover:text-slate-700">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-slate-700">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Stock Master
        </p>
      </div>
    </div>
  );
}
