"use client";

import { useState } from "react";
import { CreditCard, Home, Star, User } from "lucide-react";
import { StoreOrderView } from "./StoreOrderView";
import { StoreProfile } from "./StoreProfile";
import { StoreJejak } from "./StoreJejak";
import { StorePencairan } from "./StorePencairan";

export function StoreDashboard() {
  const [activeTab, setActiveTab] = useState("order");

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <div className="flex-1 overflow-y-auto">
        {activeTab === "order" && <StoreOrderView />}
        {activeTab === "toko" && <StoreProfile />}
        {activeTab === "jejak" && <StoreJejak />}
        {activeTab === "pencairan" && <StorePencairan />}
      </div>

      <div
        className="fixed inset-x-0 bottom-0 flex justify-between border-t border-black/5 bg-surface px-6 pt-2"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <button
          onClick={() => setActiveTab("order")}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === "order" ? "text-main" : "text-black/40"}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-bold">Order</span>
        </button>
        <button
          onClick={() => setActiveTab("pencairan")}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === "pencairan" ? "text-main" : "text-black/40"}`}
        >
          <CreditCard className="h-6 w-6" />
          <span className="text-[10px] font-semibold">Pencairan</span>
        </button>
        <button
          onClick={() => setActiveTab("jejak")}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === "jejak" ? "text-main" : "text-black/40"}`}
        >
          <Star className="h-6 w-6" />
          <span className="text-[10px] font-semibold">Jejak</span>
        </button>
        <button
          onClick={() => setActiveTab("toko")}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === "toko" ? "text-main" : "text-black/40"}`}
        >
          <User className="h-6 w-6" />
          <span className="text-[10px] font-semibold">Toko</span>
        </button>
      </div>
    </div>
  );
}
