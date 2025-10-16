"use client";

import React from "react";
import Link from "next/link";
import { XCircle, Home, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PaymentFailed() {
  const [showAnimation, setShowAnimation] = useState(false);
    const orderId = "ORD/2025/TZESZ"
  React.useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Failure Animation */}
        <div
          className={`text-center transition-all duration-1000 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface border-4 border-red-500 mb-6 relative">
            <XCircle className="w-12 h-12 text-red-500" />
            <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-75" />
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold uppercase mb-4 text-red-500"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Payment Failed
          </h1>
          <p className="text-xl text-muted-grey">
            We couldn’t process your payment for Order #{orderId}.
          </p>
        </div>

        {/* Info Card */}
        <Card
          className={`bg-surface border-red-500/30 overflow-hidden transition-all duration-1000 delay-300 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 p-6">
            <h2
              className="text-3xl font-bold text-white uppercase"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              Transaction Unsuccessful
            </h2>
            <p className="text-white/90 text-lg mt-1">
              Your payment could not be completed. Please start over to book your tickets again.
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-4 text-muted-grey text-sm">
              <p>• Your transaction was not successful and no tickets were issued.</p>
              <p>• If money was deducted, please contact our support team with your order ID.</p>
              <p>• You can return to the Details page to start a new checkout process.</p>
            </div>

            {/* Back Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-red-500/30">
              <Link href="/details" className="flex-1">
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6 rounded-lg transition-all duration-300 hover:scale-105 uppercase tracking-wide gap-2 neon-glow"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Details
                </Button>
              </Link>

              <Link href="/" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-background font-bold py-6 rounded-lg transition-all duration-300 hover:scale-105 uppercase tracking-wide gap-2 bg-transparent"
                >
                  <Home className="w-5 h-5" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Support Message */}
        <Card className="bg-surface border-red-500/30 p-6">
          <h4 className="text-white font-bold mb-2 uppercase text-sm">Need Help?</h4>
          <p className="text-muted-grey text-sm">
            If you believe this is an error or funds were deducted, contact{" "}
            <a
              href="mailto:support@dreambeyondborders.com"
              className="text-red-400 hover:text-red-300 underline"
            >
              support@dreambeyondborders.com
            </a>{" "}
            with your Order ID #{orderId}.
          </p>
        </Card>
      </div>
    </div>
  );
}
