"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  Buildings,
  ChartLineUp,
  CheckCircle,
  EnvelopeSimple,
  Factory,
  Globe,
  IdentificationCard,
  LockSimple,
  MapPin,
  Phone,
  SignOut,
  UserCircle,
  UsersThree,
  Wallet,
  Bell,
} from "@phosphor-icons/react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Skeleton from "@/components/ui/Skeleton";
import Switch from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toaster";
import {
  COMPANY_SIZE_OPTIONS,
  INDUSTRY_OPTIONS,
  MONTHLY_BUDGET_OPTIONS,
  PROFILE_COMPLETION_FIELDS,
} from "@/lib/constants/profile";
import { useSignOut } from "@/lib/hooks/useSignOut";
import { ProfileInput, User } from "@/lib/models/user";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateProfile } from "@/lib/store/slices/userDetailsSlice";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format";
import ChangePasswordSection from "./ChangePasswordSection";
import SettingsSection from "./SettingsSection";

type FieldErrors = Partial<Record<keyof ProfileInput, string>>;

const toForm = (user: User | null): ProfileInput => ({
  name: user?.name ?? "",
  phone: user?.phone ?? "",
  jobTitle: user?.jobTitle ?? "",
  companyName: user?.companyName ?? "",
  companyWebsite: user?.companyWebsite ?? "",
  industry: user?.industry ?? "",
  companySize: user?.companySize ?? "",
  monthlyBudget: user?.monthlyBudget ?? "",
  city: user?.city ?? "",
  country: user?.country ?? "",
  marketingOptIn: Boolean(user?.marketingOptIn),
});

const validate = (form: ProfileInput): FieldErrors => {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  const phone = form.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!/^\+?[\d\s()-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = "Enter a valid phone number, e.g. +91 98765 43210";
    }
  }
  const website = form.companyWebsite.trim();
  if (website) {
    try {
      const url = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
      if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(url.hostname)) throw new Error();
    } catch {
      errors.companyWebsite = "Enter a valid website, e.g. yourbrand.com";
    }
  }
  return errors;
};

const SettingsView = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user, loading } = useAppSelector((s) => s.userDetails);
  const { signOut, signingOut } = useSignOut();
  const [form, setForm] = useState<ProfileInput>(() => toForm(user));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  const saved = useMemo(() => toForm(user), [user]);
  useEffect(() => setForm(saved), [saved]);

  const dirty = (Object.keys(saved) as (keyof ProfileInput)[]).some((k) => saved[k] !== form[k]);

  const set = <K extends keyof ProfileInput>(key: K, value: ProfileInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const completed = PROFILE_COMPLETION_FIELDS.filter(({ key }) => Boolean(saved[key]?.toString().trim()));
  const missing = PROFILE_COMPLETION_FIELDS.filter(({ key }) => !saved[key]?.toString().trim());
  const completion = Math.round((completed.length / PROFILE_COMPLETION_FIELDS.length) * 100);

  const handleSave = async (e?: FormEvent) => {
    e?.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast("Fix the highlighted fields", "error");
      return;
    }
    setSaving(true);
    const result = await dispatch(updateProfile(form));
    setSaving(false);
    if (result.meta.requestStatus === "rejected") toast(result.payload as string, "error");
    else toast("Profile saved");
  };

  if (!user && loading) {
    return (
      <div className="mx-auto max-w-[1100px] space-y-4">
        <Skeleton className="h-24 rounded-3xl" />
        <Skeleton className="h-[420px] rounded-3xl" />
      </div>
    );
  }

  const displayName = form.name || user?.email?.split("@")[0] || "You";

  return (
    <form onSubmit={handleSave} className="mx-auto max-w-[1100px] space-y-6 pb-24" noValidate>
      <div className="animate-fade-up">
        <h1 className="font-display text-[34px] font-medium leading-tight tracking-[-0.02em] text-charcoal sm:text-[40px]">
          Account <span className="italic text-coral">settings</span>
        </h1>
        <p className="mt-1.5 text-[15px] text-charcoal-400">
          Manage your profile, company details and security.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-charcoal p-6 text-white shadow-lift sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-coral/40 blur-[70px]" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar name={displayName} seed={user?.id} size="xl" className="ring-4 ring-white/10" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xl font-bold tracking-tight">{displayName}</p>
            <p className="truncate text-sm text-white/55">
              {[form.jobTitle, form.companyName].filter(Boolean).join(" · ") || user?.email}
            </p>
            <p className="mt-1 text-xs text-white/40">Member since {formatDate(user?.createdAt)}</p>
          </div>
          <div className="w-full sm:w-64">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white/70">Profile completeness</span>
              <span className="font-bold text-tangerine">{completion}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-gradient transition-all duration-700"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-white/45">
              {missing.length ? (
                <>Add your {missing.slice(0, 2).map((m) => m.label).join(" and ")}{missing.length > 2 ? " and more" : ""}.</>
              ) : (
                <span className="inline-flex items-center gap-1 text-emerald-300">
                  <CheckCircle size={14} weight="fill" /> All set
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <SettingsSection
        id="profile"
        icon={<UserCircle size={22} weight="duotone" />}
        title="Your profile"
        description="How the Kudozz team will address and reach you."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input
              label="Full name"
              name="name"
              autoComplete="name"
              placeholder="Jane Cooper"
              icon={<IdentificationCard size={19} weight="duotone" />}
              value={form.name}
              maxLength={80}
              onChange={(e) => set("name", e.target.value)}
              error={errors.name}
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="Email"
              name="email"
              type="email"
              value={user?.email ?? ""}
              disabled
              icon={<EnvelopeSimple size={19} weight="duotone" />}
              trailing={<LockSimple size={16} weight="bold" className="text-charcoal-300" />}
              hint={<span className="text-xs font-medium text-charcoal-300">Used to sign in · can&apos;t be changed</span>}
            />
          </div>
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            icon={<Phone size={19} weight="duotone" />}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            error={errors.phone}
          />
          <Input
            label="Job title"
            name="jobTitle"
            autoComplete="organization-title"
            placeholder="Brand manager"
            icon={<Briefcase size={19} weight="duotone" />}
            value={form.jobTitle}
            maxLength={80}
            onChange={(e) => set("jobTitle", e.target.value)}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        id="company"
        icon={<Buildings size={22} weight="duotone" />}
        title="Company"
        description="Helps us recommend creators that fit your brand and budget."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Company name"
            name="companyName"
            autoComplete="organization"
            placeholder="Acme Foods Pvt. Ltd."
            icon={<Buildings size={19} weight="duotone" />}
            value={form.companyName}
            maxLength={120}
            onChange={(e) => set("companyName", e.target.value)}
          />
          <Input
            label="Company website"
            name="companyWebsite"
            type="url"
            autoComplete="url"
            placeholder="yourbrand.com"
            icon={<Globe size={19} weight="duotone" />}
            value={form.companyWebsite}
            onChange={(e) => set("companyWebsite", e.target.value)}
            error={errors.companyWebsite}
          />
          <Select
            label="Industry"
            name="industry"
            options={INDUSTRY_OPTIONS}
            placeholder="Select your industry"
            icon={<Factory size={19} weight="duotone" />}
            value={form.industry}
            onChange={(e) => set("industry", e.target.value)}
          />
          <Select
            label="Company size"
            name="companySize"
            options={COMPANY_SIZE_OPTIONS}
            placeholder="Select team size"
            icon={<UsersThree size={19} weight="duotone" />}
            value={form.companySize}
            onChange={(e) => set("companySize", e.target.value)}
          />
          <Input
            label="City"
            name="city"
            autoComplete="address-level2"
            placeholder="Mumbai"
            icon={<MapPin size={19} weight="duotone" />}
            value={form.city}
            maxLength={80}
            onChange={(e) => set("city", e.target.value)}
          />
          <Input
            label="Country"
            name="country"
            autoComplete="country-name"
            placeholder="India"
            icon={<MapPin size={19} weight="duotone" />}
            value={form.country}
            maxLength={80}
            onChange={(e) => set("country", e.target.value)}
          />
          <div className="md:col-span-2">
            <Select
              label="Monthly influencer marketing budget"
              name="monthlyBudget"
              options={MONTHLY_BUDGET_OPTIONS}
              placeholder="Select a range"
              icon={<Wallet size={19} weight="duotone" />}
              value={form.monthlyBudget}
              onChange={(e) => set("monthlyBudget", e.target.value)}
            />
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-charcoal-400">
              <ChartLineUp size={14} weight="duotone" className="text-coral" />
              Only used to tailor recommendations. Never shared with creators.
            </p>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        id="preferences"
        icon={<Bell size={22} weight="duotone" />}
        title="Communication"
        description="Choose what we email you about. Account and security emails are always sent."
      >
        <div className="-mx-2 rounded-2xl border border-sand-100 p-1">
          <Switch
            checked={form.marketingOptIn}
            onChange={(v) => set("marketingOptIn", v)}
            label={
              <span>
                Product updates & creator insights
                <span className="block text-xs font-normal text-charcoal-400">
                  New features, trending creators and campaign tips from Kudozz. About twice a month.
                </span>
              </span>
            }
          />
        </div>
      </SettingsSection>

      <ChangePasswordSection />

      <SettingsSection
        id="account"
        icon={<SignOut size={22} weight="duotone" />}
        title="Session"
        description="Sign out of Kudozz Influencer Discovery on this device."
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-sand-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            <p className="font-semibold text-charcoal">Signed in as {user?.email}</p>
            <p className="text-charcoal-400">Last profile update {formatDate(user?.updatedAt)}</p>
          </div>
          <Button type="button" variant="secondary" loading={signingOut} onClick={signOut} leftIcon={<SignOut size={17} weight="bold" />}>
            Sign out
          </Button>
        </div>
      </SettingsSection>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-sand-200 bg-white/90 backdrop-blur-xl transition-transform duration-300 lg:left-[272px]",
          dirty ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!dirty}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <p className="text-sm font-medium text-charcoal-500">You have unsaved changes</p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setForm(saved);
                setErrors({});
              }}
              tabIndex={dirty ? 0 : -1}
            >
              Discard
            </Button>
            <Button type="submit" size="sm" loading={saving} tabIndex={dirty ? 0 : -1}>
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SettingsView;
