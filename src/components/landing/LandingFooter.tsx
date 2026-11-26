import Link from "next/link";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Logo from "@/components/ui/Logo";
import {
  APP_NAME,
  LEGAL_NAME,
  PARENT_CONTACT_URL,
  PARENT_SITE_LABEL,
  PARENT_SITE_URL,
  SOCIAL_LINKS,
  SUPPORT_EMAIL,
} from "@/config/brand";
import { LOGIN_HREF, SIGNUP_HREF } from "./content";

/** Site footer shared by the landing page and the blog. Section links are root-relative so they work from any page. */
const LandingFooter = () => (
  <footer className="border-t border-sand-200/80 bg-white">
    <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div className="max-w-[340px]">
        <Logo />
        <p className="mt-4 text-[14px] leading-relaxed text-charcoal-500">
          {APP_NAME} helps brands and agencies in India search, evaluate and shortlist Instagram creators.
        </p>
      </div>
      <nav aria-label="Product">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal-400">Product</p>
        <ul className="mt-4 space-y-2.5 text-[14px] text-charcoal-600">
          <li><Link href="/#features" className="hover:text-coral-700">Features</Link></li>
          <li><Link href="/#how-it-works" className="hover:text-coral-700">How It Works</Link></li>
          <li><Link href="/#pricing" className="hover:text-coral-700">Pricing</Link></li>
          <li><Link href="/#faq" className="hover:text-coral-700">FAQs</Link></li>
          <li><Link href="/blog" className="hover:text-coral-700">Blog</Link></li>
        </ul>
      </nav>
      <nav aria-label="Account">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal-400">Account</p>
        <ul className="mt-4 space-y-2.5 text-[14px] text-charcoal-600">
          <li><Link href={SIGNUP_HREF} data-cta="signup-footer" className="hover:text-coral-700">Sign up</Link></li>
          <li><Link href={LOGIN_HREF} data-cta="login" className="hover:text-coral-700">Login</Link></li>
        </ul>
      </nav>
      <nav aria-label="Company">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal-400">Company</p>
        <ul className="mt-4 space-y-2.5 text-[14px] text-charcoal-600">
          <li><a href={PARENT_CONTACT_URL} className="hover:text-coral-700">Contact</a></li>
          <li><a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-coral-700">{SUPPORT_EMAIL}</a></li>
          <li><a href={PARENT_SITE_URL} className="hover:text-coral-700">{PARENT_SITE_LABEL}</a></li>
          <li className="flex gap-3 pt-1">
            <a href={SOCIAL_LINKS.instagram} rel="noopener" target="_blank" aria-label="Kudozz on Instagram" className="text-charcoal-400 hover:text-coral-700">
              <InstagramLogo size={20} weight="duotone" aria-hidden />
            </a>
            <a href={SOCIAL_LINKS.linkedin} rel="noopener" target="_blank" aria-label="Kudozz on LinkedIn" className="text-[13px] font-semibold text-charcoal-400 hover:text-coral-700">
              LinkedIn
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div className="border-t border-sand-200/80">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 text-[12.5px] text-charcoal-400 sm:px-6">
        © {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.
      </div>
    </div>
  </footer>
);

export default LandingFooter;
