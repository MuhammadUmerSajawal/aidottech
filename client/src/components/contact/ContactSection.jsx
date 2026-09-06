import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import PageBackground from '../shared/PageBackground';
import ContactForm from './ContactForm';

const CONTACT_DETAILS = [
  {
    label: 'Address',
    value: 'Peshawar, Pakistan',
    href: null,
  },
  {
    label: 'Contact',
    value: '+92 XXX XXXXXXX',
    href: 'tel:+92XXXXXXXXX',
  },
  {
    label: 'Email',
    value: 'hello@aidot.tech',
    href: 'mailto:hello@aidot.tech',
  },
];

const SOCIAL_LINKS = [
  { label: 'X / Twitter', href: 'https://x.com/dot', icon: Twitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aidottech', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/dot', icon: Github },
];

export default function ContactSection() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';

  const labelClass = `font-space-mono text-[10px] uppercase tracking-[0.18em] mb-1.5 ${
    isDark ? 'text-[#858EA2]' : 'text-dot-navy/50'
  }`;

  const valueClass = `font-sans text-base sm:text-lg transition-colors duration-200 ${
    isDark ? 'text-[#F5F6FA]' : 'text-dot-navy'
  }`;

  const linkClass = `font-sans text-base sm:text-lg transition-colors duration-200 ${
    isDark
      ? 'text-[#668DD8] hover:text-[#F5F6FA]'
      : 'text-dot-blue hover:text-dot-navy'
  }`;

  return (
    <PageBackground
      isDark={isDark}
      className="min-h-[calc(100vh-140px)] py-16 md:py-24 px-6 md:px-[64px]"
    >
      <div className="max-w-[1320px] mx-auto w-full relative z-10">
        <div className="space-y-10 md:space-y-14">
          <div className="max-w-[620px] space-y-5">
            <h1
              className={`about-reveal font-sans font-bold text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.02] tracking-tight transition-colors duration-300 ${
                isDark ? 'text-[#F5F6FA]' : 'text-dot-navy'
              }`}
            >
              Let's Build Together
            </h1>
            <p
              className={`about-reveal about-reveal-delay-1 font-sans text-base sm:text-lg leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-[#B8BFCE]' : 'text-dot-navy/80'
              }`}
            >
              Have a workflow to improve or an AI product to explore? Let's build something precise and measurable.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pt-2 border-t transition-colors duration-300 ${
              isDark ? 'border-[rgba(120,140,190,0.18)]' : 'border-dot-navy/10'
            }`}
          >
            <div className="space-y-0 about-reveal about-reveal-delay-1">
              {CONTACT_DETAILS.map((item, index) => (
                <div
                  key={item.label}
                  className={`contact-row group py-6 transition-colors duration-300 ${
                    index < CONTACT_DETAILS.length - 1
                      ? isDark
                        ? 'border-b border-[rgba(120,140,190,0.18)]'
                        : 'border-b border-dot-navy/10'
                      : ''
                  }`}
                >
                  <p
                    className={`${labelClass} transition-colors duration-300 ${
                      isDark ? 'group-hover:text-[#668DD8]' : 'group-hover:text-dot-blue'
                    }`}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className={linkClass}>
                      {item.value}
                    </a>
                  ) : (
                    <p className={valueClass}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div
              className={`lg:pl-8 lg:border-l transition-colors duration-300 ${
                isDark ? 'lg:border-[rgba(120,140,190,0.18)]' : 'lg:border-dot-navy/10'
              }`}
            >
              <ContactForm />
            </div>
          </div>

          <div
            className={`about-reveal about-reveal-delay-3 flex justify-center items-center gap-5 pt-6 border-t transition-colors duration-300 ${
              isDark ? 'border-[rgba(120,140,190,0.18)]' : 'border-dot-navy/10'
            }`}
          >
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`social-icon-btn flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                  isDark
                    ? 'text-[#858EA2] hover:text-[#F5F6FA] hover:bg-white/5'
                    : 'text-dot-navy/50 hover:text-dot-blue hover:bg-dot-navy/5'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
