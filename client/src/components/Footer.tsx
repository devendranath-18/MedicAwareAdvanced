"use client";

export default function Footer() {
  return (
    <footer
      className="
      bg-gradient-to-r
      from-cyan-800
      to-blue-600
      text-white
      px-6
      py-10
      
      "
    >
      <div
        className="
        max-w-6xl
        mx-auto
        grid
        md:grid-cols-3
        gap-10
        "
      >
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            MedicAware
          </h2>
          <p className="text-white/80">
            Making medicine information simple,
            accessible, and understandable for everyone.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-white/80">
            <li className="hover:text-white cursor-pointer">
              Medicine Search
            </li>
            <li className="hover:text-white cursor-pointer">
              Prescription Scanner
            </li>
            <li className="hover:text-white cursor-pointer">
              About
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Contact
          </h3>

          <p className="text-white/80">
            Email: support@medicaware.ai
          </p>

          <p className="text-white/80 mt-2">
            Built with Next.js + AI
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center mt-10 text-white/60 text-sm">
        © {new Date().getFullYear()} MedicAware AI. All rights reserved.
      </div>
    </footer>
  );
}