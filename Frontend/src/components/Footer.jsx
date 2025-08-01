// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 text-xs text-center py-3 border-t border-slate-200 dark:border-slate-700">
      © {new Date().getFullYear()} Stock Master. All rights reserved.
    </footer>
  );
}
