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
        className="text-3xl md:text-4xl font-bold text-center mb-8 uppercase text-white"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        Ticket Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="bg-surface border border-white/10 p-4 hover:border-white/30 transition-all duration-300"
          >
            <div className="space-y-3">
              {/* Color indicator */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: category.color,
                    borderColor:
                      category.color === "#000000"
                        ? "#ffffff80" // white border for black seats
                        : category.color,
                    boxShadow:
                      category.color === "#000000"
                        ? "0 0 10px rgba(255,255,255,0.25)"
                        : `0 0 10px ${category.color}55`,
                  }}
                >
                  {category.icon && (
                    <Accessibility
                      className="w-5 h-5"
                      style={{
                        color:
                          category.color === "#000000"
                            ? "#11D369"
                            : category.color,
                      }}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white uppercase leading-tight">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Price */}
              <div className="text-center pt-2 border-t border-white/10">
                <div className="text-xs text-muted-grey mb-1">
                  {category.description}
                </div>
                <div className="text-lg font-bold text-white">
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
