import { useState } from 'react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = form
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please fill in all fields before submitting.')
      return
    }
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="bg-white px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="text-center text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12a817]">
          Get in Touch
        </p>

        <h2 className="mt-4 text-center font-['Orbitron',sans-serif] text-[clamp(1.9rem,3vw,3.35rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#1f1f1f]">
          Contact Us
        </h2>

        <p className="mx-auto mt-4 max-w-[500px] text-center text-base leading-7 text-[#6b7280]">
          Have questions about a part, need a recommendation, or ready to place an order? Drop us a message.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#12f215]/20">
                <svg className="h-8 w-8 text-[#12a817]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-['Orbitron',sans-serif] text-xl font-bold tracking-[-0.02em] text-[#1f1f1f]">
                Message Sent!
              </h3>
              <p className="mt-2 text-base text-[#6b7280]">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#374151]">
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
                <label htmlFor="email" className="block text-sm font-medium text-[#374151]">
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
              <label htmlFor="subject" className="block text-sm font-medium text-[#374151]">
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
              <label htmlFor="message" className="block text-sm font-medium text-[#374151]">
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
              className="inline-flex h-14 w-full items-center justify-center rounded-[6px] bg-[#12f215] px-7 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5"
            >
              SEND MESSAGE
            </button>
          </form>
          )}

          <div className="overflow-hidden rounded-[18px] border border-[#ececec] shadow-[0_10px_26px_rgba(0,0,0,0.04)]">
            <iframe
              title="AVE Automotives location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.979158870078!2d85.30880874166583!3d27.68703901501477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b4ad7096dd%3A0x29fa3d73b99dcc97!2sKupondole%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1781237235303!5m2!1sen!2snp"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[300px]"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
