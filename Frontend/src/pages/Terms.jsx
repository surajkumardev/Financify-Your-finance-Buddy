// export default function Terms() {
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-extrabold">Terms & Conditions</h1>
//       <p className="mt-3 text-slate-600 dark:text-slate-300">By using Financify, you agree to the following terms. These terms are a simple summary for demo purposes.</p>
//       <ul className="mt-4 list-disc pl-6 text-slate-600 dark:text-slate-300">
//         <li>Data Usage: Budget and goal data is stored securely in your MySQL database.</li>
//         <li>Security: Passwords are hashed with bcrypt; never share your credentials.</li>
//         <li>Acceptable Use: Don’t misuse, attempt to break security, or harm others.</li>
//         <li>Limitation: Financify is provided “as is” without warranties for demo use.</li>
//         <li>Changes: Terms may change; continued use means acceptance of updates.</li>
//       </ul>
//       <p className="mt-4 text-slate-600 dark:text-slate-300">For any queries, contact the developer.</p>
//     </div>
//   )
// }





// src/components/Terms.jsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

// small inline doodle svg for background (no import needed)
function DoodleShield({ className = "w-24" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <path
        d="M60 10 L100 25 V60 C100 90 60 110 60 110 C60 110 20 90 20 60 V25 Z"
        fill="rgba(79,70,229,0.08)"
        stroke="rgba(79,70,229,0.5)"
        strokeWidth="3"
      />
      <path
        d="M45 60 L58 72 L80 45"
        stroke="rgba(79,70,229,0.7)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Terms() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-950 dark:to-gray-900">
      {/* Decorative background doodles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <DoodleShield className="absolute top-10 left-10 w-28 rotate-6" />
        <DoodleShield className="absolute bottom-10 right-10 w-32 -rotate-6" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6 py-20 relative z-10 text-left"
      >
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck size={22} className="text-indigo-600" />
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
            Terms & Conditions
          </h1>
        </div>

        <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
          By using Financify, you agree to the following terms.  
          These terms are a simplified version for demonstration purposes.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm shadow-sm">
          <ul className="list-disc pl-6 space-y-3 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Data Usage:</strong> Budget and goal data is stored securely in your MySQL database.
            </li>
            <li>
              <strong>Security:</strong> Passwords are hashed with bcrypt; never share your credentials.
            </li>
            <li>
              <strong>Acceptable Use:</strong> Don’t misuse, attempt to break security, or harm others.
            </li>
            <li>
              <strong>Limitation:</strong> Financify is provided “as is” without warranties for demo use.
            </li>
            <li>
              <strong>Changes:</strong> Terms may change; continued use means acceptance of updates.
            </li>
          </ul>
        </div>

        <p className="mt-6 text-slate-700 dark:text-slate-300">
          For any queries, contact the developer.
        </p>
      </motion.div>
    </div>
  );
}
