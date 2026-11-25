"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, EnvelopeSimple, LockSimple } from "@phosphor-icons/react";
import { confirmResetPassword, resetPassword } from "aws-amplify/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authErrorMessage } from "@/lib/utils/authErrors";
import AuthLayout from "./AuthLayout";
import FormAlert from "./FormAlert";
import PasswordStrength, { isStrongPassword } from "./PasswordStrength";
import VerifyCodeStep from "./VerifyCodeStep";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "reset">("request");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const username = email.trim().toLowerCase();

  const sendCode = async () => {
    await resetPassword({ username });
  };

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!EMAIL_REGEX.test(username)) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError(null);
    setLoading(true);
    try {
      await sendCode();
      setStep("reset");
    } catch (error) {
      setFormError(authErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (code: string) => {
    setFormError(null);
    if (!isStrongPassword(newPassword)) {
      setFormError("Choose a password that meets all requirements.");
      return;
    }
    setLoading(true);
    try {
      await confirmResetPassword({ username, confirmationCode: code, newPassword });
      router.replace("/login?reset=1");
    } catch (error) {
      setFormError(authErrorMessage(error));
      setLoading(false);
    }
  };

  if (step === "reset") {
    return (
      <AuthLayout
        title={
          <>
            Set a new <span className="italic text-coral">password</span>
          </>
        }
        subtitle="Enter the code from your email and choose a new password."
      >
        <VerifyCodeStep
          email={username}
          submitLabel="Update password"
          loading={loading}
          error={formError}
          onSubmit={handleReset}
          onResend={sendCode}
          onBack={() => {
            setStep("request");
            setFormError(null);
          }}
          canSubmit={isStrongPassword(newPassword)}
        >
          <div>
            <Input
              label="New password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              icon={<LockSimple size={19} weight="duotone" />}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {newPassword && <PasswordStrength password={newPassword} />}
          </div>
        </VerifyCodeStep>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={
        <>
          Forgot your <span className="italic text-coral">password?</span>
        </>
      }
      subtitle="No worries. Enter the email you signed up with and we'll send you a reset code."
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-charcoal-500 hover:text-charcoal"
        >
          <ArrowLeft size={15} weight="bold" /> Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleRequest} className="space-y-5" noValidate>
        <FormAlert message={formError} />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          icon={<EnvelopeSimple size={19} weight="duotone" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          autoFocus
        />
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={<ArrowRight size={18} weight="bold" />}
        >
          Send reset code
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
