import { X } from "lucide-react";
import React, { useState } from "react";

type Props = {
  closeDrawer: () => void;
  title: string;
  children: React.ReactNode;
};

type DrawerSize = 50 | 85;

export default function BottomDrawer({ closeDrawer, title, children }: Props) {
  const [drawerSize, setDrawerSize] = useState<DrawerSize>(50);

  const handleResize = () => {
    setDrawerSize((s) => (s === 50 ? 85 : 50));
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/20"
        onPointerDown={closeDrawer}
      />

      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] px-5 pb-5 transition-all duration-200 flex flex-col"
        style={{ height: `${drawerSize}dvh` }}
        onPointerDown={(e) => e.stopPropagation()} // CRITICAL
      >
        {/* Handle */}
        <div className="relative mt-2.5 mb-3.5 mx-auto w-16 h-1.5 rounded-full bg-gray-200">
          <button
            type="button"
            className="absolute w-[150%] h-[400%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResize();
            }}
          />
        </div>

        <div className="flex pb-4 shrink-0">
          <h2 className="text-xl font-semibold flex-1">{title}</h2>
          <button type="button" onClick={closeDrawer}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <hr className="mb-4 text-[#E6E6E6]" />

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
