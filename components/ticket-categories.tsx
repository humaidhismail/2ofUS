"use client";

import { Card } from "@/components/ui/card";
import { Accessibility } from "lucide-react";

export function TicketCategories() {
  const categories = [
    {
      name: "VIP Zone",
      color: "#FDC70C",
      price: 120,
      description: "Premium center seats — exclusive VIP area",
    },
    {
      name: "Standard Zone",
      color: "#E83033",
      price: "80 – 100",
      description: "MYR 100 for mid-rows (A–D), MYR 80 for others",
    },
    {
      name: "Lower Section",
      color: "#000000",
      price: 70,
      description: "Back rows, limited visibility area",
    },
    {
      name: "Wheelchair Access",
      color: "#11D369",
      price: 50,
      description: "Accessible seating for wheelchair users",
      icon: true,
    },
  ];

  return (
    <div>
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-6 uppercase text-white"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Ticket Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="bg-surface border border-white/10 p-3 sm:p-4 transition-all duration-300 hover:border-white/30 h-full"
          >
            <div className="h-full flex flex-col">
              {/* Top: Color + Name */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded border-2 flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: category.color,
                    borderColor:
                      category.color === "#000000"
                        ? "#ffffff80"
                        : category.color,
                    boxShadow:
                      category.color === "#000000"
                        ? "0 0 8px rgba(255,255,255,0.22)"
                        : `0 0 8px ${category.color}55`,
                  }}
                >
                  {category.icon && (
                    <Accessibility
                      className="w-4 h-4"
                      style={{
                        color:
                          category.color === "#000000"
                            ? "#11D369"
                            : category.color,
                      }}
                    />
                  )}
                </div>

                <h3 className="text-[13px] sm:text-sm font-bold text-white uppercase leading-tight">
                  {category.name}
                </h3>
              </div>

              {/* Body: description + divider + price (aligned baseline) */}
              <div className="mt-3 sm:mt-4 border-t border-white/10 pt-2 sm:pt-3">
                {/* Equal height description so prices align */}
                <div className="text-[11px] sm:text-xs text-muted-grey min-h-[2.75rem] sm:min-h-[2.5rem]">
                  {category.description}
                </div>

                {/* Divider between caption and price */}
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Price */}
                <div className="text-base sm:text-lg font-bold text-white tracking-tight text-center">
                  {typeof category.price === "number"
                    ? `MYR ${category.price}`
                    : `MYR ${category.price}`}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
