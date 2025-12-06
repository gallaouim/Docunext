"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between py-3">
        <Button variant="outline" onClick={() => setOpen(true)}>Menu</Button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-80 rounded-r-lg bg-accent-soft p-4 shadow-xl dark:bg-accent-soft" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Navigation</div>
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            </div>
            <div className="mt-3">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
