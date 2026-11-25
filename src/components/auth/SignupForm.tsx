"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, EnvelopeSimple, LockSimple, Sparkle, UserCircle } from "@phosphor-icons/react";
import { autoSignIn, confirmSignUp, resendSignUpCode, signIn, signUp } from "aws-amplify/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { DEFAULT_AUTHED_ROUTE } from "@/config/routes";
import { authErrorMessage } from "@/lib/utils/authErrors";
import AuthLayout from "./AuthLayout";
import FormAlert from "./FormAlert";
import PasswordStrength, { isStrongPassword } from "./PasswordStrength";
import VerifyCodeStep from "./VerifyCodeStep";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "verify">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const username = email.trim().toLowerCase();

  const validate = () => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Tell us your name";
    if (!EMAIL_REGEX.test(username)) next.email = "Enter a valid email address";
    if (!isStrongPassword(password)) next.password = "Password doesn't meet all requirements";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const { nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: { email: username, name: name.trim() },
          autoSignIn: true,
        },
      });
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") setStep("verify");
      else router.replace(DEFAULT_AUTHED_ROUTE);
    } catch (error) {
      setFormError(authErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (code: string) => {
    setFormError(null);
    setLoading(true);
    try {
      const { nextStep } = await confirmSignUp({ username, confirmationCode: code });
      try {
        if (nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") await autoSignIn();
        else await signIn({ username, password });
      } catch {
        await signIn({ username, password });
      }
      router.replace(DEFAULT_AUTHED_ROUTE);
    } catch (error) {
      setFormError(authErrorMessage(error));
      setLoading(false);
    }
  };

  if (step === "verify") {
    return (
      <AuthLayout
        title={
          <>
            Check your <span className="italic text-coral">inbox</span>
          </>
        }
        subtitle="We've sent a 6-digit code to confirm it's really you. It expires in 24 hours."
      >
        <VerifyCodeStep
          email={username}
          submitLabel="Verify & continue"
          loading={loading}
          error={formError}
          onSubmit={handleConfirm}
          onResend={() => resendSignUpCode({ username }).then(() => undefined)}
          onBack={() => {
            setStep("details");
            setFormError(null);
          }}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      badge={
        <span className="mb-5 inline-flex items-center gap-1.5 self-start rounded-full bg-coral-50 px-3 py-1.5 text-xs font-semibold text-coral-700">
          <Sparkle size={13} weight="fill" />
          Start discovering in under a minute
        </span>
      }
      title={
        <>
          Create your <span className="italic text-coral">account</span>
        </>
      }
      subtitle="Get access to Kudozz Influencer Discovery and build shortlists of creators that match your brand and audience."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-coral-600 hover:text-coral-700">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSignup} className="space-y-5" noValidate>
        <FormAlert message={formError} />
        <Input
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Jane Cooper"
          icon={<UserCircle size={19} weight="duotone" />}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoFocus
        />
        <Input
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          icon={<EnvelopeSimple size={19} weight="duotone" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a strong password"
            icon={<LockSimple size={19} weight="duotone" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          {password && <PasswordStrength password={password} />}
        </div>
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={<ArrowRight size={18} weight="bold" />}
        >
          Create account
        </Button>
        <p className="text-center text-xs leading-relaxed text-charcoal-300">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignupForm;
