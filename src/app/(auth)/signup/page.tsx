import type { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create your free account",
  description:
    "Sign up for Kudozz Influencer Discovery and get 30 free credits to search Instagram creators in India by niche, followers, location, language and engagement.",
  alternates: { canonical: "/signup" },
};

export default function Page() {
  return <SignupForm />;
}
