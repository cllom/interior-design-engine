import Link from "next/link";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/data";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-gray-500">Start free. Upgrade when you need more power.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl border p-8 card-hover ${
                plan.popular ? "border-brand-500 shadow-lg shadow-brand-100" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-600 text-white text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-gray-500">{plan.period}</span>}
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/tools/room-designer"
                className={`block w-full text-center mt-8 py-3 rounded-xl font-medium transition-colors ${
                  plan.popular
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
