"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { CheckCircle, WarningCircle, Info } from "@phosphor-icons/react";

type ToastTone = "success" | "error" | "info";
interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

const ToastContext = createContext<(message: string, tone?: ToastTone) => void>(() => {});

export const useToast = () => useContext(ToastContext);

const icons = {
  success: <CheckCircle size={20} weight="duotone" className="text-emerald-400" />,
  error: <WarningCircle size={20} weight="duotone" className="text-red-400" />,
  info: <Info size={20} weight="duotone" className="text-tangerine" />,
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, tone: ToastTone = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex animate-fade-up items-center gap-2.5 rounded-2xl bg-charcoal px-4 py-3 text-sm font-medium text-white shadow-lift"
          >
            {icons[toast.tone]}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
