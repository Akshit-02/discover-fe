export interface User {
  id: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  companyName?: string | null;
  companyWebsite?: string | null;
  industry?: string | null;
  companySize?: string | null;
  monthlyBudget?: string | null;
  city?: string | null;
  country?: string | null;
  marketingOptIn?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileInput {
  name: string;
  phone: string;
  jobTitle: string;
  companyName: string;
  companyWebsite: string;
  industry: string;
  companySize: string;
  monthlyBudget: string;
  city: string;
  country: string;
  marketingOptIn: boolean;
}
