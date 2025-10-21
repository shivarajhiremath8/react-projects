
// Removed @heroicons/react import due to missing dependency
import { useMemo, useState } from "react";

// --------- Utilities (colors, mock data, helpers) ----------
const brand = {
  primary: "bg-emerald-600",
  primaryHover: "hover:bg-emerald-700",
  ring: "focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
};

import logo from "./assets/KS_Logo.png";
import heroImageSrc from "./assets/pexels-jahoo-388415.jpg"; // adjust path if needed
import s1 from "./assets/s1.png";
import s2 from "./assets/s2.png";
import s3 from "./assets/s3.png";

const heroImage = heroImageSrc;

const midBannerImage =
  "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=2100&auto=format&fit=crop"; // Replace with your asset

const phoneUIs = [
  s1,
  s3,
  s2,
]; // Local app screens

const stats = [
  { value: "200+", label: "Websites built" },
  { value: "97%", label: "Client satisfaction" },
  { value: "34+", label: "Team members" },
  { value: "100+", label: "Amazing clients" },
];

const features = [
  {
    title: "Sketch Version",
    body:
      "Work quickly on low‑fidelity wireframes or refine hi‑fi with stacks of reusable blocks.",
  },
  {
    title: "30+ New Ready Pages",
    body:
      "A flexible set of templates—auth, marketing, product, and support—to ship faster.",
  },
  {
    title: "Well Organized",
    body:
      "Atomic components, documented props, and examples help you scale the design system.",
  },
  {
    title: "HTML/CSS First",
    body:
      "Clean Tailwind utilities and accessible HTML patterns that render fast and look great.",
  },
];

const steps = [
  {
    id: 1,
    title: "How Kisan Sampurnam works?",
    desc:
      "Use our tools to combine your domain knowledge with ready components and export code. It’s fast, flexible, and maintainable.",
  },
  {
    id: 2,
    title: "Twenty five awesome samples",
    desc:
      "Pick from curated layouts. Remix sections, swap media, and finalize in minutes—no vendor lock‑in.",
    media:
      "https://images.unsplash.com/photo-1624201363071-5c6dae1f5f7b?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Variety of designs",
    desc:
      "Decide whether you want UI blocks or full pages. Mix and match to fit your workflow.",
  },
];

const faqTabs = ["General", "Farming", "Support", "Product"];
const faqItems = [
  {
    q: "How long does a web design project take?",
    a: "Typical projects take 2–6 weeks depending on scope, number of pages, content readiness, and feedback cycles.",
  },
  {
    q: "What factors affect the cost of web design?",
    a: "Scope, custom components, animations, CMS integration, SEO depth, and accessibility requirements influence pricing.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. We offer maintenance, performance monitoring, security updates, and small enhancements via monthly plans.",
  },
  {
    q: "What is your web design process?",
    a: "Discovery → IA & wireframes → visual design → implementation → QA & accessibility → launch → handoff & docs.",
  },
];

const testimonials = [
  {
    author: "Brian Clark",
    role: "VP Marketing @ Shopify",
    quote:
      "“A fabulous result for a fair budget. Our internal teams can now build pages in hours and still get pixel‑perfect results.”",
  },
  {
    author: "Stephanie Powell",
    role: "Head of Sales @ Salesforce",
    quote:
      "“The design system is clean and consistent. Hand‑off to engineering is painless, saving us sprint time.”",
  },
  {
    author: "Christopher Wade",
    role: "VP Design @ Spotify",
    quote:
      "“UI feels modern, fast, and accessible. The components are documented beautifully and easy to extend.”",
  },
  {
    author: "Taylor Turner",
    role: "PM @ Figma",
    quote:
      "“We shipped our new marketing site in record time. Tailwind utilities keep the codebase lightweight and readable.”",
  },
];

// --------- Reusable UI atoms ----------
function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <p className="text-emerald-600 text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white ${brand.primary} ${brand.primaryHover} ${brand.ring} transition ${className}`}
      {...props}
    >
      {children} <span className="h-4 w-4" aria-hidden="true">&rarr;</span>
    </button>
  );
}

// --------- Main page ----------
export default function LandingPage() {
  return (
    <div className="min-h-screen text-gray-800 antialiased">
      <TopNav />

      {/* Hero */}
      <Hero />

      {/* Stats */}
      <Stats />

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Level‑Up Your Design"
            subtitle="Huge, trendy collection of web screens and components. Fully customized."
            center
          />
          <FeaturesGrid />
        </div>
      </section>

      {/* Steps / Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Easy steps"
            subtitle="Follow a simple path to ship fast with quality."
          />
          <StepsTimeline />
        </div>
      </section>

      {/* Mid CTA with phones */}
      <MidPhonesCTA />

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Learn about our stack, process, and support."
            center
          />
          <FaqTabs />
        </div>
      </section>

      {/* Video Promo */}
      <VideoPromo />

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What our clients have to say"
            subtitle="Love from leaders across product and design."
            center
          />
          <TestimonialsSlider />
        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

// --------- Sections ----------
function TopNav() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <img
          src={logo}
          alt="Kisan Sampurnam Logo"
          className="h-10 w-auto"
        />

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {["Home", "About", "Features", "Services", "Contact Us"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                {item}
              </a>
            )
          )}
        </nav>

      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      {/* Background image */}
      <div
        className="h-[60vh] md:h-[70vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="Green farm landscape hero"
      />

      {/* Text card overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl p-0"> {/* Removed background and blur */}
            <h1 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Discover the key to grow your Farming
            </h1>
            <p className="mt-3 text-gray-700">
              Leverage clean patterns, accessible design, and scalable
              components to ship beautiful products—fast.
            </p>

            <div className="mt-5">
              <PrimaryButton>Get in touch</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-4">
        <h3 className="text-center text-xl md:text-2xl font-semibold text-gray-900">
          Numbers that showcase our success
        </h3>
        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <dt className="text-2xl font-semibold text-emerald-700">
                {s.value}
              </dt>
              <dd className="font-mono mt-1 text-md text-gray-600">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f) => (
        <div key={f.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <span className="h-7 w-7 text-emerald-600" aria-hidden="true">★</span>
          <h4 className="mt-4 font-semibold text-gray-900">{f.title}</h4>
          <p className="mt-2 text-sm text-gray-600">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

function StepsTimeline() {
  return (
    <ol className="mt-10 relative border-l border-gray-200 pl-6">
      {steps.map((s, idx) => (
        <li key={s.id} className="mb-10 ml-2">
          {/* Step bullet */}
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-semibold">
            {idx + 1}
          </span>

          <h5 className="font-semibold text-gray-900">{s.title}</h5>
          <p className="mt-2 text-gray-600">{s.desc}</p>

          {s.media && (
            <img
              src={s.media}
              alt="Step illustration"
              className="mt-4 rounded-lg shadow-sm ring-1 ring-gray-100 w-full max-w-md"
              loading="lazy"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function MidPhonesCTA() {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-emerald-50 p-10 text-center">
          <SectionHeading
            title="The Second Sneak‑Peek of Startup Framework"
            subtitle="Download a ready starter and see how fast you can ship."
            center
          />
          <div className="mt-10 flex items-end justify-center gap-4 md:gap-8">
            {/* Three phone screenshots overlapped */}
            {phoneUIs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`App screen ${i + 1}`}
                className={`h-72 md:h-96 rounded-2xl shadow-xl ring-1 ring-gray-200 object-cover ${i === 1 ? "scale-100" : "hidden sm:block md:scale-95"
                  }`}
                loading="lazy"
              />
            ))}
          </div>
          <div className="mt-10">
            <PrimaryButton>Download Now</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqTabs() {
  const [activeTab, setActiveTab] = useState(faqTabs[0]);
  const [openIndex, setOpenIndex] = useState(0);

  const filteredItems = useMemo(() => faqItems, []); // No dependency needed

  return (
    <div className="mt-10">
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {faqTabs.map((t) => {
          const active = t === activeTab;
          return (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-md text-sm border ${active
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Accordion */}
      <div className="mx-auto mt-8 max-w-2xl divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {filteredItems.map((item, i) => {
          const open = i === openIndex;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="w-full text-left px-4 sm:px-6 py-4 flex items-center justify-between gap-4"
                aria-expanded={open}
              >
                <span className="font-medium text-gray-900">{item.q}</span>
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${open ? "rotate-45" : ""
                    } transition`}
                >
                  +
                </span>
              </button>
              {open && (
                <div className="px-4 sm:px-6 pb-4 text-gray-700">{item.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VideoPromo() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-2 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Many Blocks and Components
            </h3>
            <p className="mt-2 text-gray-600">
              Combine elements and complex blocks for complete landing pages and
              marketing sites—no heavy frameworks required.
            </p>
            <PrimaryButton className="mt-6 inline-flex">Explore</PrimaryButton>
          </div>

          <div className="rounded-2xl overflow-hidden ring-1 ring-gray-200 bg-black relative">
            {/* Replace with your own video or embed */}
            <img
              src="https://plus.unsplash.com/premium_photo-1674019234994-eceabbdd091d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Video cover"
              className="w-full h-64 md:h-full object-cover opacity-80"
              loading="lazy"
            />
            <button
              className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/90 flex items-center justify-center"
              aria-label="Play video"
            >
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-semibold">How to Use Kisan Sampurnam?</p>
              <p className="text-sm text-white/80">
                Learn how to get crop advice in 1 minute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const visible = useMemo(() => {
    // Show up to 3 cards (like the design)
    const arr = [];
    for (let i = 0; i < 3; i++) arr.push(testimonials[(index + i) % testimonials.length]);
    return arr;
  }, [index]);

  return (
    <div className="mt-10">
      <div className="flex justify-end gap-2 mb-3">
        <button
          onClick={prev}
          className="h-8 w-8 rounded-md border border-gray-200 bg-white flex items-center justify-center"
          aria-label="Previous testimonial"
        >
          <span className="h-4 w-4" aria-hidden="true">&larr;</span>
        </button>
        <button
          onClick={next}
          className="h-8 w-8 rounded-md border border-gray-200 bg-white flex items-center justify-center"
          aria-label="Next testimonial"
        >
          <span className="h-4 w-4" aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t, i) => (
          <figure
            key={i}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="h-10 w-10 rounded-full bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center">
              <span className="h-5 w-5 text-gray-400" aria-hidden="true">📱</span>
            </div>
            <blockquote className="mt-4 text-gray-700">{t.quote}</blockquote>
            <figcaption className="mt-4">
              <p className="font-medium text-gray-900">{t.author}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function PromoBanner() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl overflow-hidden relative"
          aria-label="Discount banner"
        >
          <img
            src={midBannerImage}
            alt=""
            className="h-64 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 sm:px-10">
              <h3 className="text-white text-2xl md:text-3xl font-semibold">
                Join our members and get
                <br />
                discount up to 50%
              </h3>
              <PrimaryButton className="mt-6">Sign up</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
                KS
              </span>
              <span className="font-semibold">Startup 3</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Be sure to take a look at our Terms of Use and Privacy Policy.
            </p>
            <div className="mt-4 flex items-center gap-3 text-gray-500">
              <span className="sr-only">Socials</span> •
              <a href="#" className="hover:text-gray-300">fb</a>
              <a href="#" className="hover:text-gray-300">tw</a>
              <a href="#" className="hover:text-gray-300">ig</a>
              <a href="#" className="hover:text-gray-300">in</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Tour</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Work</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Our Portfolio</a></li>
              <li><a href="#" className="hover:text-white">Latest Works</a></li>
              <li><a href="#" className="hover:text-white">Awards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Stuff</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <label className="text-sm font-semibold text-white">
              Language
            </label>
            <select className="mt-3 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600">
              <option>English</option>
              <option>हिन्दी</option>
            </select>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} Startup 3. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
