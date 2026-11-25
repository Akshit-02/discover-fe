"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, EnvelopeSimple, LockSimple } from "@phosphor-icons/react";
import { confirmSignUp, resendSignUpCode, signIn } from "aws-amplify/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { safeRedirect } from "@/config/routes";
import { authErrorMessage } from "@/lib/utils/authErrors";
import AuthLayout from "./AuthLayout";
import FormAlert from "./FormAlert";
import VerifyCodeStep from "./VerifyCodeStep";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));
  const justReset = searchParams.get("reset") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!EMAIL_REGEX.test(email.trim())) next.email = "Enter a valid email address";
    if (!password) next.password = "Enter your password";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const doSignIn = async () => {
    const { nextStep } = await signIn({ username: email.trim().toLowerCase(), password });
    if (nextStep.signInStep === "DONE") {
      router.replace(redirectTo);
      return;
    }
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({ username: email.trim().toLowerCase() });
      setNeedsConfirmation(true);
      return;
    }
    throw new Error("Additional verification is required for this account.");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      await doSignIn();
    } catch (error) {
      if ((error as { name?: string }).name === "UserAlreadyAuthenticatedException") {
        router.replace(redirectTo);
        return;
      }
      setFormError(authErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (code: string) => {
    setFormError(null);
    setLoading(true);
    try {
      await confirmSignUp({ username: email.trim().toLowerCase(), confirmationCode: code });
      await doSignIn();
    } catch (error) {
      setFormError(authErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  if (needsConfirmation) {
    return (
      <AuthLayout
        title="Verify your email"
        subtitle="Your account isn't verified yet. Enter the code we just emailed you to finish signing in."
      >
        <VerifyCodeStep
          email={email}
          submitLabel="Verify & sign in"
          loading={loading}
          error={formError}
          onSubmit={handleConfirm}
          onResend={() => resendSignUpCode({ username: email.trim().toLowerCase() }).then(() => undefined)}
          onBack={() => {
            setNeedsConfirmation(false);
            setFormError(null);
          }}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={
        <>
          Welcome <span className="italic text-coral">back</span>
        </>
      }
      subtitle="Sign in to Kudozz Influencer Discovery to find creators for your next campaign."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-semibold text-coral-600 hover:text-coral-700">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {justReset && !formError && (
          <FormAlert tone="success" message="Password updated. Sign in with your new password." />
        )}
        <FormAlert message={formError} />
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
          autoFocus
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          icon={<LockSimple size={19} weight="duotone" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          hint={
            <Link
              href="/forgot-password"
              className="text-[13px] font-semibold text-coral-600 hover:text-coral-700"
            >
              Forgot password?
            </Link>
          }
        />
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={<ArrowRight size={18} weight="bold" />}
        >
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
