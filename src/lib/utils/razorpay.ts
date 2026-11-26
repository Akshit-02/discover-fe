// Razorpay Checkout (https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/).
const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export interface RazorpaySuccess {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayFailure {
  error?: { description?: string; reason?: string };
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: RazorpaySuccess) => void;
  modal?: { ondismiss?: () => void; confirm_close?: boolean };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: "payment.failed", cb: (response: RazorpayFailure) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let loader: Promise<void> | null = null;

/** Loads checkout.js once. */
export const loadRazorpay = () => {
  if (typeof window === "undefined") return Promise.reject(new Error("Not in a browser"));
  if (window.Razorpay) return Promise.resolve();
  loader ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loader = null;
      script.remove();
      reject(new Error("Couldn't load the payment window. Check your connection and try again."));
    };
    document.body.appendChild(script);
  });
  return loader;
};

export const openRazorpay = (options: RazorpayOptions, onFailure: (response: RazorpayFailure) => void) => {
  if (!window.Razorpay) throw new Error("Payment window isn't ready");
  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", onFailure);
  rzp.open();
};
