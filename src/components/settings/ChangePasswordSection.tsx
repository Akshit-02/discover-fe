"use client";

import { FormEvent, useState } from "react";
import { LockSimple, ShieldCheck } from "@phosphor-icons/react";
import { updatePassword } from "aws-amplify/auth";
import FormAlert from "@/components/auth/FormAlert";
import PasswordStrength, { isStrongPassword } from "@/components/auth/PasswordStrength";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toaster";
import { authErrorMessage } from "@/lib/utils/authErrors";
import SettingsSection from "./SettingsSection";

const ChangePasswordSection = () => {
  const toast = useToast();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ current?: string; next?: string; confirm?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const nextErrors: typeof errors = {};
    if (!current) nextErrors.current = "Enter your current password";
    if (!isStrongPassword(next)) nextErrors.next = "Password doesn't meet all requirements";
    else if (next === current) nextErrors.next = "Choose a password different from your current one";
    if (confirm !== next) nextErrors.confirm = "Passwords don't match";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    try {
      await updatePassword({ oldPassword: current, newPassword: next });
      setCurrent("");
      setNext("");
      setConfirm("");
      toast("Password updated");
    } catch (error) {
      const name = (error as { name?: string }).name;
      if (name === "NotAuthorizedException") setErrors({ current: "Current password is incorrect" });
      else setFormError(authErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsSection
      id="security"
      icon={<ShieldCheck size={22} weight="duotone" />}
      title="Password"
      description="Use a strong password you don't use anywhere else."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormAlert message={formError} />
        <Input
          label="Current password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          icon={<LockSimple size={19} weight="duotone" />}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          error={errors.current}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input
              label="New password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              icon={<LockSimple size={19} weight="duotone" />}
              value={next}
              onChange={(e) => setNext(e.target.value)}
              error={errors.next}
            />
            {next && <PasswordStrength password={next} />}
          </div>
          <Input
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            icon={<LockSimple size={19} weight="duotone" />}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="dark" loading={saving} disabled={!current || !next || !confirm}>
            Update password
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
};

export default ChangePasswordSection;
