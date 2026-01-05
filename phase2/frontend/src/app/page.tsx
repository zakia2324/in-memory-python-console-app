import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12 fade-in">
          <div className="float inline-block mb-6">
            <div className="text-8xl mb-4">✨</div>
          </div>
          <h1 className="text-6xl font-bold mb-6 gradient-text">
            MyMemory Todo
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Organize your life with beautiful task management. Simple, elegant, and designed for productivity.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-2xl p-6 card-hover scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Create Tasks</h3>
            <p className="text-gray-700/80">Add tasks with titles and descriptions in seconds</p>
          </div>

          <div className="glass rounded-2xl p-6 card-hover scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-700/80">Mark tasks as complete and stay organized</p>
          </div>

          <div className="glass rounded-2xl p-6 card-hover scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Stay Focused</h3>
            <p className="text-gray-700/80">Achieve your goals with better task management</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center slide-in-up">
          <Link
            href="/login"
            className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2 smooth-transition"
          >
            <span>Login</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/signup"
            className="bg-white/90 hover:bg-white text-gray-800 px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2 smooth-transition hover:scale-105"
          >
            <span>Sign Up</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="text-center mt-12 fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-white/70 text-sm">Built with ❤️ using Next.js & FastAPI</p>
        </div>
      </div>
    </main>
  );
}
