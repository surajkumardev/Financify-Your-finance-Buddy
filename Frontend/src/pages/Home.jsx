import { Link } from 'react-router-dom';
import logo from '../assets/logoo.png';
import heroVideo from '../assets/video.5e99e701.mp4';

export default function Home() {
  return (
    <div>
      {/* Hero with background video */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <video className="absolute inset-0 -z-10 w-full h-full object-cover" src={heroVideo} autoPlay loop muted playsInline />
        <div className="absolute inset-0 -z-10 bg-black/60" />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center">
            {/* <img src={logo} alt="Financify" className="w-100 h-100 md:w-12 md:h-12" /> */}
          
                <img
        src={logo}
        alt="Financify"
        className="mx-auto size-50 mb-4 drop-shadow-lg object-contain"
        loading="eager"
      />
</div>
          <h1 className="mt-6 text-white text-4xl md:text-6xl font-extrabold tracking-tight">Managing Finances Made Easy</h1>
          <p className="mt-5 text-slate-200/90 text-lg md:text-xl">Create a new account and keep a track record of all your finances, transactions and subscriptions.</p>
          <div className="mt-8 flex items-center justify-center">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition">Get Started <span>›</span></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 mt-12 grid md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
          <h3 className="text-lg font-semibold"> Expense Tracking</h3>
          <p className="text-slate-400 mt-1">Log monthly income and expenses. Understand where your money goes.</p>
        </div>
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
          <h3 className="text-lg font-semibold"> Budget Planning</h3>
          <p className="text-slate-400 mt-1">Create a realistic monthly budget and keep spending on track.</p>
        </div>
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
          <h3 className="text-lg font-semibold"> Saving Goals</h3>
          <p className="text-slate-400 mt-1">Set goals for a car, home, travel — see saved vs remaining at a glance.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold">How it works</h2>
        <div className="grid md:grid-cols-4 gap-4 mt-4">
          {[
            ['Create your account','Sign up in seconds and secure your data with JWT-based authentication.'],
            ['Set a monthly budget','Add your expected income and expenses — we’ll compute savings.'],
            ['Add saving goals','Choose a goal (car, home, etc.), enter target and current saved amount.'],
            ['Track progress visually','See a clean bar chart of Saved vs Remaining for each goal.'],
          ].map(([title,desc],i) => (
            <div key={i} className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
              <div className="w-7 h-7 text-xs text-slate-400 border border-slate-700 rounded-full flex items-center justify-center mb-2">{i+1}</div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-slate-400 mt-1 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 text-center mt-12">
        <p className="text-slate-400">Made with ❤️ for mindful money management</p>
      </section>
    </div>
  );
}

