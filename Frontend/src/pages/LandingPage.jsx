import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/image.png";
import feature1 from "../assets/images/feature1.png";
import feature2 from "../assets/images/feature2.png";
import feature3 from "../assets/images/feature3.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-4 shadow-sm bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-2">
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
          <span className="font-semibold text-xl">Stock Master</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="font-medium hover:text-blue-600">
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:shadow-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="flex flex-col lg:flex-row items-center px-8 py-16">
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Smarter Inventory <br /> Management.
          </h1>
          <p className="text-gray-600 mb-8">
            Powerful AI insights to track stock, users and performance in one
            sleek dashboard.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm hover:shadow-xl hover:bg-blue-700 transition"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium hover:text-blue-600"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="flex-1 mt-10 lg:mt-0 lg:ml-16">
          <img
            src={heroImage}
            alt="Dashboard"
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Stock Master?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              img: feature1,
              title: "Real-time Tracking",
              desc: "Live monitoring across all warehouses.",
            },
            {
              img: feature2,
              title: "AI Auto-Mapping",
              desc: "Machine learning to reduce manual work.",
            },
            {
              img: feature3,
              title: "Smart Insights",
              desc: "Visual analytics to grow faster.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 cursor-pointer bg-white rounded-xl text-center shadow-md hover:shadow-xl transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / MISSION */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Transforming Inventory for Tomorrow’s Businesses
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Stock Master empowers teams with modern AI tools to manage stock
            effortlessly, improve decision making and scale operations.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-8 py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">
          {[
            {
              step: "1",
              title: "Connect",
              desc: "Integrate systems & upload inventory data",
            },
            {
              step: "2",
              title: "Automate",
              desc: "AI handles tracking, alerts and forecasting",
            },
            {
              step: "3",
              title: "Grow",
              desc: "Use insights to reduce cost & scale faster",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="text-blue-600 text-4xl font-bold mb-2">
                {s.step}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="px-8 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Pricing Plans
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "₹0",
              features: ["1 Warehouse", "Basic Analytics"],
            },
            {
              name: "Pro",
              price: "₹999/mo",
              features: ["Unlimited Warehouses", "Advanced AI", "Support"],
            },
            {
              name: "Enterprise",
              price: "Custom",
              features: ["Custom Integrations", "Dedicated Manager"],
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition text-center"
            >
              <h3 className="font-semibold text-xl mb-2">{p.name}</h3>
              <div className="text-blue-600 text-4xl font-bold mb-4">
                {p.price}
              </div>
              <ul className="space-y-1 text-gray-600 text-sm">
                {p.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-8 py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Rahul Sharma",
              review: "Stock Master changed how we manage stock completely!",
            },
            {
              name: "Ananya Singh",
              review: "Amazing product with top-class support.",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition"
            >
              <p className="text-gray-600 mb-4">“{t.review}”</p>
              <h4 className="font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "Is there a free trial?",
              a: "Yes, our Starter plan is completely free to get started.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely. There are no lock-in contracts.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section className="px-8 py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Grow Your Business?
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          Reach out or start your free trial today and see how Stock Master can
          transform your operations.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50"
          >
            Start Free
          </Link>
          <a
            href="mailto:info@stockmaster.com"
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Stock Master. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
