export interface Option {
  value: string;
  label: string;
}

export const INDUSTRY_OPTIONS: Option[] = [
  { value: "FASHION", label: "Fashion & apparel" },
  { value: "BEAUTY", label: "Beauty & personal care" },
  { value: "FOOD_BEVERAGE", label: "Food & beverage" },
  { value: "HEALTH_FITNESS", label: "Health & fitness" },
  { value: "ELECTRONICS", label: "Consumer electronics" },
  { value: "TRAVEL", label: "Travel & hospitality" },
  { value: "FINANCE", label: "Finance & fintech" },
  { value: "EDUCATION", label: "Education" },
  { value: "ENTERTAINMENT", label: "Gaming & entertainment" },
  { value: "HOME_LIFESTYLE", label: "Home & lifestyle" },
  { value: "AUTOMOTIVE", label: "Automotive" },
  { value: "TECHNOLOGY", label: "SaaS & technology" },
  { value: "AGENCY", label: "Marketing agency" },
  { value: "OTHER", label: "Other" },
];

export const COMPANY_SIZE_OPTIONS: Option[] = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-1000", label: "201–1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
];

export const MONTHLY_BUDGET_OPTIONS: Option[] = [
  { value: "UNDER_50K", label: "Under ₹50K / month" },
  { value: "50K_2L", label: "₹50K – ₹2L / month" },
  { value: "2L_10L", label: "₹2L – ₹10L / month" },
  { value: "10L_PLUS", label: "₹10L+ / month" },
  { value: "NOT_SURE", label: "Not sure yet" },
];

export const PROFILE_COMPLETION_FIELDS = [
  { key: "name", label: "name" },
  { key: "phone", label: "phone" },
  { key: "jobTitle", label: "job title" },
  { key: "companyName", label: "company name" },
  { key: "companyWebsite", label: "website" },
  { key: "industry", label: "industry" },
  { key: "companySize", label: "company size" },
  { key: "monthlyBudget", label: "budget" },
  { key: "city", label: "city" },
  { key: "country", label: "country" },
] as const;
