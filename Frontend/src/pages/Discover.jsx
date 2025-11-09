// import React from 'react'

// const Discover = () => {
//   return (
//     <div>Discover</div>
//   )
// }

// export default Discover

import React from "react"
import { motion } from "framer-motion"
import { TrendingUp, Target, Wallet, Shield } from "lucide-react"

const features = [
  {
    icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
    title: "Track Growth",
    desc: "Visualize your income, expenses, and progress with clean charts and insights.",
  },
  {
    icon: <Target className="w-8 h-8 text-emerald-400" />,
    title: "Set Smart Goals",
    desc: "Plan short-term and long-term goals that align with your financial vision.",
  },
  {
    icon: <Wallet className="w-8 h-8 text-emerald-400" />,
    title: "Manage Expenses",
    desc: "Keep all your spending organized — understand where your money goes.",
  },
  {
    icon: <Shield className="w-8 h-8 text-emerald-400" />,
    title: "Secure Data",
    desc: "Your financial data is encrypted and stored safely with advanced protection.",
  },
]

const Discover = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0b1220] to-black text-white py-20 px-6">
      {/* ===== Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
          Discover Financify
        </h1>
        <p className="text-slate-300 mt-4 text-lg">
          Explore how Financify helps you manage money smartly — all in one place.
        </p>
      </motion.div>

      {/* ===== Features Section ===== */}
      <div className="max-w-6xl mx-auto mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border border-emerald-500/20 rounded-2xl p-6 text-center shadow-lg backdrop-blur-sm hover:border-emerald-400/40"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-emerald-400">
              {item.title}
            </h3>
            <p className="text-slate-300 mt-2 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ===== CTA Section ===== */}
      <div className="text-center mt-20">
        <motion.a
          href="/signup"
          whileHover={{ scale: 1.05 }}
          className="inline-block px-8 py-3 bg-emerald-500 text-black font-semibold rounded-full hover:bg-emerald-400 transition-all duration-300"
        >
          Get Started Now
        </motion.a>
        <p className="text-slate-400 mt-3 text-sm">
          Join Financify and start managing your money with confidence.
        </p>
      </div>
    </div>
  )
}

export default Discover
