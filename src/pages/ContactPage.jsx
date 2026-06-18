import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";

const contactDetails = [
  {
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Visit Us",
    value: "Kupondol-Lalitpur, Nepal",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Call Us",
    value: "+977 01 5553000",
    href: "tel:+977015553000",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email Us",
    value: "info@aveautomotive.com.np",
    href: "mailto:info@aveautomotive.com.np",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Business Hours",
    value: "Sun – Fri: 9:00 AM – 6:00 PM",
  },
];

function ContactDetailCard({ detail }) {
  const Tag = detail.href ? "a" : "div";
  const extraProps = detail.href ? { href: detail.href } : {};

  return (
    <Tag
      {...extraProps}
      className="group flex items-start gap-4 rounded-[14px] border border-[#ececec] bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#12f215]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#ececec] bg-[#fafafa] text-[#12a817] transition-colors duration-200 group-hover:bg-[#12f215]/10 group-hover:text-[#12f215]">
        {detail.icon}
      </div>
      <div>
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-[#9ca3af]">
          {detail.label}
        </p>
        <p className="mt-1 text-[0.95rem] font-medium text-[#1f1f1f]">
          {detail.value}
        </p>
      </div>
    </Tag>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Please fill in all fields before submitting.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PageHeader
        badge="Get in Touch"
        titleBefore="Let's Start a"
        highlight="Conversation"
        description="Have a question about a specific part, need help with an order, or want to discuss a custom request? We are here to help."
      />

      {/* ───── FORM + DETAILS ───── */}
      <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(18,242,21,0.06),transparent_35%)]" />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            {/* ── FORM ── */}
            <div>
              <h2 className="font-['Orbitron',sans-serif] text-[clamp(1.3rem,2vw,1.6rem)] font-bold tracking-[-0.02em] text-[#1f1f1f]">
                Send us a Message
              </h2>
              <p className="mt-2 text-[0.95rem] leading-7 text-[#6b7280]">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              {submitted ? (
                <div className="mt-8 flex flex-col items-center rounded-[18px] border border-[#ececec] bg-white py-14 text-center shadow-[0_10px_26px_rgba(0,0,0,0.04)]">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#12f215]/20">
                    <svg
                      className="h-8 w-8 text-[#12a817]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-['Orbitron',sans-serif] text-xl font-bold tracking-[-0.02em] text-[#1f1f1f]">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-base text-[#6b7280]">
                    Thank you for reaching out. We will get back to you soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                  noValidate
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#374151]"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="mt-1.5 block w-full rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#12f215] focus:bg-white focus:ring-2 focus:ring-[#12f215]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#374151]"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="mt-1.5 block w-full rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#12f215] focus:bg-white focus:ring-2 focus:ring-[#12f215]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#374151]"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="mt-1.5 block w-full rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#12f215] focus:bg-white focus:ring-2 focus:ring-[#12f215]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#374151]"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what you need..."
                      className="mt-1.5 block w-full rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#12f215] focus:bg-white focus:ring-2 focus:ring-[#12f215]/20 resize-y"
                    />
                  </div>

                  {error && (
                    <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex h-14 w-full items-center justify-center rounded-[6px] bg-[#12f215] px-7 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto sm:px-10"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>

            {/* ── DETAILS ── */}
            <div>
              <h2 className="font-['Orbitron',sans-serif] text-[clamp(1.3rem,2vw,1.6rem)] font-bold tracking-[-0.02em] text-[#1f1f1f]">
                Contact Information
              </h2>
              <p className="mt-2 text-[0.95rem] leading-7 text-[#6b7280]">
                Reach out through any of the channels below.
              </p>

              <div className="mt-8 space-y-4">
                {contactDetails.map((detail) => (
                  <ContactDetailCard key={detail.label} detail={detail} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── MAP ───── */}
      <section className="bg-[#060606] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="overflow-hidden rounded-[18px] border border-white/8 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
            <iframe
              title="AVE Automotives location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.979158870078!2d85.30880874166583!3d27.68703901501477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b4ad7096dd%3A0x29fa3d73b99dcc97!2sKupondole%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1781237235303!5m2!1sen!2snp"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: "block" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
