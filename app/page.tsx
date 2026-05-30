"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Cpu,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Palette,
  Phone,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Wand2,
  X,
  Zap
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const XLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const navItems = ["About", "Services", "Work", "Clients", "Contact"];

const counters = [
  { label: "Projects Completed", value: "120+", numeric: 120 },
  { label: "Happy Clients", value: "58+", numeric: 58 },
  { label: "Years of Experience", value: "6+", numeric: 6 },
  { label: "Countries Served", value: "12+", numeric: 12 }
];

const services = [
  { title: "Website Development", icon: Code2, copy: "High-performance, conversion-ready websites with cinematic interactions." },
  { title: "SaaS Platforms", icon: Layers3, copy: "Scalable product architecture, dashboards, billing flows, and admin systems." },
  { title: "UI/UX Design", icon: Palette, copy: "Premium interfaces shaped around clarity, emotion, and business outcomes." },
  { title: "Branding", icon: Sparkles, copy: "Identity systems, launch assets, pitch visuals, and expressive digital brands." },
  { title: "AI Integrations", icon: Cpu, copy: "Assistants, copilots, automation agents, and intelligent workflow layers." },
  { title: "Automation Solutions", icon: Zap, copy: "Operational systems that remove repetition and speed up teams." },
  { title: "Mobile Apps", icon: Smartphone, copy: "Polished mobile products with responsive design systems and fluid flows." },
  { title: "Cloud Solutions", icon: Cloud, copy: "Secure, observable infrastructure built for scale and reliability." }
];

const projects = [
  {
    title: "NovaOps Command Center",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75",
    stack: ["Next.js", "AI", "Stripe", "AWS"],
    copy: "An executive operations cockpit for a logistics startup, built around predictive routing and live metrics."
  },
  {
    title: "Auraluxe Brand System",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=75",
    stack: ["Identity", "WebGL", "CMS"],
    copy: "A luxury audio brand launch with immersive product pages and motion-led storytelling."
  },
  {
    title: "PulseAI Growth Engine",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=75",
    stack: ["LLM", "Automation", "CRM"],
    copy: "An AI sales assistant that turns inbound leads into qualified opportunities with human-grade handoff."
  },
  {
    title: "Finory Mobile Vault",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=75",
    stack: ["React Native", "Security", "UX"],
    copy: "A refined finance app experience with encrypted onboarding and confidence-building product design."
  }
];

const testimonials = [
  {
    quote: "BuildiT turned our vague product idea into a launch-ready platform that looked sharper than our funded competitors.",
    name: "Aarav Mehta",
    role: "Founder, NovaOps"
  },
  {
    quote: "The motion, the clarity, the speed of execution. Everything felt like working with a senior product studio.",
    name: "Nisha Rao",
    role: "CEO, Auraluxe"
  },
  {
    quote: "Our workflows are faster, our dashboard is cleaner, and our team finally trusts the tools they use every day.",
    name: "Daniel Kim",
    role: "COO, PulseAI"
  }
];

const choices = [
  "Fast Delivery",
  "Modern Tech Stack",
  "Scalable Architecture",
  "Premium UI/UX",
  "Dedicated Support",
  "Startup Friendly Pricing"
];

const ParticleField = memo(function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(200);
    for (let i = 0; i < 200; i += 3) {
      positions[i] = (Math.random() - 0.5) * 9;
      positions[i + 1] = (Math.random() - 0.5) * 5.5;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.018 + mouse.x * 0.06;
    pointsRef.current.rotation.x = mouse.y * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#2d78ff"
        transparent
        opacity={0.28}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const target = { value: 0 };
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(target, {
          value,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => setDisplay(Math.round(target.value))
        });
      }
    });
    return () => trigger.kill();
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function MagneticButton({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    event.currentTarget.style.transform = `translate(${x * 0.16}px, ${y * 0.24}px)`;
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold transition-transform duration-300 ${className}`}
    >
      {children}
    </a>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
      {success ? (
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-center text-green-400">
          Booking requested successfully! Our team will contact you shortly.
        </div>
      ) : (
        <>
          <div className="grid gap-3 md:grid-cols-2">
            <input required name="name" aria-label="Name" placeholder="Name" className="contact-input rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-400" />
            <input required name="email" type="email" aria-label="Email" placeholder="Email" className="contact-input rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-400" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <input required name="phone" type="tel" aria-label="Phone Number" placeholder="Phone Number" className="contact-input rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-400" />
            <select required name="service" aria-label="Project type" className="contact-input appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-400">
              <option value="">Select Service</option>
              {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <input required name="date" type="date" aria-label="Preferred Date" className="contact-input rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-400" />
            <input required name="time" type="time" aria-label="Preferred Time" className="contact-input rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-400" />
          </div>
          <textarea required name="message" aria-label="Project details" placeholder="Project details & requirements" rows={3} className="contact-input resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-400" />
          <button disabled={loading} type="submit" className="accent-gradient mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white disabled:opacity-70">
            {loading ? "Sending..." : "Book Call"} <Send className="h-4 w-4" />
          </button>
        </>
      )}
    </form>
  );
}

function ComingSoonWrapper({ title, children, show = false }: { title: string, children: React.ReactNode, show?: boolean }) {
  if (show) return <>{children}</>;
  
  return (
    <div className="mx-auto max-w-7xl">
      <div data-reveal className="glass flex flex-col items-center justify-center rounded-3xl p-10 text-center md:p-16">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 shadow-[0_0_30px_rgba(0,87,255,0.15)]">
          <Sparkles className="h-7 w-7 text-blue-300" />
        </div>
        <h2 className="font-display mb-3 text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
          We're currently polishing this section to ensure it meets our premium standards. Check back soon for updates!
        </p>
      </div>
    </div>
  );
}

const FAQ_DATA = [
  {
    answer: "We offer Website Development, SaaS Platforms, UI/UX Design, Branding, AI Integrations, Automation Solutions, Mobile Apps, and Cloud Solutions tailored for modern businesses.",
    keywords: ["services", "offer", "provide", "solution", "build", "development", "ai", "website", "saas", "branding"]
  },
  {
    answer: "Pricing depends on the services, project scope, features, and complexity you need. Contact us with your requirements for a custom quote.",
    keywords: ["pricing", "cost", "budget", "charges", "quote", "payment", "rate"]
  },
  {
    answer: "We always try to deliver projects as fast as possible. Timeline depends on the project size, features, revisions, and overall complexity.",
    keywords: ["time", "duration", "deadline", "delivery", "how long", "complete", "finish"]
  },
  {
    answer: "Just book a call or send us a mail with your project details. Once everything is confirmed, we’ll start the project immediately.",
    keywords: ["start", "begin", "work together", "process", "onboarding", "contact"]
  },
  {
    answer: "Yes, we work with startups, creators, agencies, and growing businesses to build scalable digital products and systems.",
    keywords: ["startup", "business", "agency", "founder", "company"]
  },
  {
    answer: "Yes, we provide post-launch support, fixes, improvements, and maintenance depending on the project plan.",
    keywords: ["support", "maintenance", "bug", "fix", "after delivery", "help"]
  },
  {
    answer: "Yes, we can redesign and modernize existing websites, apps, dashboards, and digital products.",
    keywords: ["redesign", "improve", "upgrade", "modernize", "existing website"]
  },
  {
    answer: "Yes, we develop AI-powered systems including assistants, automation workflows, AI integrations, and smart business tools.",
    keywords: ["ai", "chatbot", "automation", "assistant", "machine learning", "smart tools"]
  }
];

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: "ai" | "user", content: React.ReactNode}[]>([
    { role: "ai", content: "Hi there! I'm the BuildiT assistant. How can I help you today?" }
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userText = input;
    setMessages(prev => [...prev, { role: "user", content: userText }]);
    setInput("");
    
    setTimeout(() => {
      const lowerInput = userText.toLowerCase();
      let matchedAnswer: React.ReactNode = null;
      
      for (const faq of FAQ_DATA) {
        if (faq.keywords.some(kw => lowerInput.includes(kw.toLowerCase()))) {
          matchedAnswer = faq.answer;
          break;
        }
      }
      
      if (!matchedAnswer) {
        matchedAnswer = (
          <>
            Please contact us for more information.<br/><br/>
            <strong>Phone:</strong> 8260540773<br/>
            <strong>Email:</strong> connect.buildit@gmail.com
          </>
        );
      }
      
      setMessages(prev => [...prev, { role: "ai", content: matchedAnswer }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass relative flex h-[420px] w-[340px] flex-col overflow-hidden rounded-3xl shadow-2xl md:w-[380px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                  <Bot className="h-4 w-4 text-blue-300" />
                </div>
                <span className="font-display font-semibold text-white">BuildiT AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-1 transition hover:bg-white/10">
                <X className="h-4 w-4 text-white/70" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
              <div className="flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${msg.role === 'ai' ? 'self-start bg-white/10 text-white/90' : 'self-end bg-blue-600 text-white'}`}>
                    {msg.content}
                  </div>
                ))}
                <div ref={endRef} />
              </div>
            </div>
            
            <div className="border-t border-white/10 bg-black/40 p-3 backdrop-blur-md">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-4 pr-12 text-sm text-white placeholder-white/40 outline-none transition focus:border-blue-400"
                />
                <button type="submit" disabled={!input.trim()} className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition disabled:opacity-50 hover:bg-blue-400">
                  <Send className="h-3.5 w-3.5 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accent-gradient flex h-14 w-14 items-center justify-center rounded-full shadow-[0_0_40px_rgba(0,87,255,0.38)] transition-transform hover:scale-110 active:scale-95"
        aria-label="AI chatbot assistant"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Bot className="h-6 w-6 text-white" />}
      </button>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [openChoice, setOpenChoice] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 180 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 180 });
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 180]);
  const filters = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const filteredProjects = activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1750);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.09
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 52, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%"
            }
          }
        );
      });
    });
    return () => ctx.revert();
  }, [loaded]);

  function handlePointer(event: React.PointerEvent<HTMLDivElement>) {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  }

  return (
    <main
      onPointerMove={handlePointer}
      className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="noise" />
      <motion.div
        className="pointer-events-none fixed z-50 hidden h-44 w-44 rounded-full bg-blue-600/10 blur-3xl xl:block"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />

      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030409]"
            exit={{ opacity: 0, transition: { duration: 0.75, ease: "easeInOut" } }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="mx-auto mb-7 h-16 w-16 rounded-full border border-white/10 border-t-blue-500"
              />
              <motion.p
                initial={{ letterSpacing: "0.08em" }}
                animate={{ letterSpacing: "0.22em" }}
                className="font-display text-sm uppercase text-white/70"
              >
                Initializing BuildiT
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed left-0 right-0 top-0 z-40 px-4 py-3 md:px-8">
        <nav className="glass-transparent mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2">
          <a href="#hero" className="flex items-center gap-2.5">
            <span className="relative h-8 w-8 overflow-hidden rounded-full border border-white/15 bg-black shadow-[0_0_20px_rgba(0,87,255,0.3)]">
              <Image src="/buildit-logo.jpg" alt="BuildiT logo" fill sizes="32px" className="object-cover" priority />
            </span>
            <span className="font-display text-lg font-bold">BuildiT</span>
          </a>
          <div className="nav-links hidden items-center gap-6 text-sm md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="glass flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-105"
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="glass flex h-8 w-8 items-center justify-center rounded-full md:hidden"
            >
              {menuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="glass-transparent mx-4 mt-3 grid gap-3 rounded-3xl p-4 md:hidden"
            >
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 text-white/80">
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="hero" className="relative overflow-hidden px-4 pb-8 pt-[110px] md:px-8 md:pt-[120px] lg:pb-12 lg:pt-[120px]">
        {/* <div className="absolute inset-0 grid-bg opacity-80" /> */}
        {/* <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }}>
            <ambientLight intensity={0.8} />
            <ParticleField />
          </Canvas>
        </div> */}
        <motion.div style={{ y: heroY }} className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-8 md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[1fr_0.92fr] lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
              transition={{ delay: 0.15 }}
              className="glass hero-kicker mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              Premium digital innovation studio
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="hero-title font-display text-[clamp(4rem,8vw,9rem)] font-black leading-[0.9] tracking-normal drop-shadow-[0_0_34px_rgba(255,255,255,0.18)]"
            >
              <span className="block">BuildiT.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 28 }}
              transition={{ delay: 0.48, duration: 0.8 }}
              className="hero-copy mt-6 max-w-2xl text-balance text-lg leading-8 md:text-2xl"
            >
              Crafting world-class software and premium digital experiences for ambitious brands.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 28 }}
              transition={{ delay: 0.62, duration: 0.8 }}
              className="mt-7 flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton href="#work" className="accent-gradient shadow-[0_0_52px_rgba(0,87,255,0.42)]">
                View Our Work <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="#contact" className="glass secondary-cta light-sweep">
                Book a Consultation <CalendarDays className="h-4 w-4" />
              </MagneticButton>
            </motion.div>

            {/* Compact Trust Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-10 flex items-center gap-5"
            >
              {/* Overlapping Placeholders */}
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`relative h-11 w-11 overflow-hidden rounded-full border-2 border-black bg-[#151c2f] flex items-center justify-center ${i === 0 ? 'shadow-[0_0_15px_rgba(59,130,246,0.6)] ring-1 ring-blue-500/50' : 'shadow-md'}`}
                    style={{ zIndex: 5 - i }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  </div>
                ))}
              </div>
              
              {/* Text and Stars */}
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-white/90 mb-0.5">Trusted by 50+ Happy Clients</span>
                <div className="flex items-center gap-0.5 text-[#fbbf24] text-[15px]">
                  ★★★★★
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.95 }}
            transition={{ delay: 0.55, duration: 1.2, ease: "easeOut" }}
            className="relative flex min-h-[400px] w-full items-start justify-center perspective-[1000px] pt-12 md:min-h-[500px] lg:min-h-[560px] lg:pt-[72px]"
          >
            {/* The Glowing Orb */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-tr from-blue-700 via-blue-400 to-white/20 blur-[80px] md:h-[400px] md:w-[400px]"
            />
            {/* Inner Core Glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0]
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute h-[150px] w-[150px] rounded-full bg-blue-300/30 blur-[40px] md:h-[220px] md:w-[220px]"
            />
            
            {/* Parallax Container */}
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative z-10 w-full max-w-[320px] md:max-w-[380px] lg:max-w-md"
            >
              {/* Main Glass Card */}
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-50" />
                
                {/* Inner content simulating AI UI */}
                <div className="relative z-20 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 shadow-[0_0_15px_rgba(0,87,255,0.3)]">
                        <Sparkles className="h-5 w-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-white/90">BuildiT Studio</p>
                        <p className="text-xs text-white/50">Digital Excellence</p>
                      </div>
                    </div>
                    <div className="flex h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                  </div>
                  
                  <div className="flex flex-col gap-4 py-2">
                    <h3 className="font-display text-3xl font-bold text-white leading-tight">
                      Building the<br /><span className="text-blue-400">Future, Together</span>
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed pr-4">
                      We craft digital products that help brands stand out and scale faster.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>



      <section id="about" className="relative px-4 pb-12 pt-8 md:px-6 lg:pb-16 lg:pt-12">
        <div className="mx-auto max-w-4xl text-center">
          <div data-reveal>
            <p className="mb-4 font-display text-sm uppercase tracking-[0.26em] text-blue-300">Who We Are</p>
            <h2 className="font-display text-3xl font-bold md:text-5xl">A startup studio for ambitious digital products.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              BuildiT blends product strategy, premium interface design, scalable engineering, AI integrations, and automation systems for founders who need more than a generic website.
            </p>
          </div>
        </div>
        
        <div className="mx-auto mt-16 mb-8 grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { label: "Projects Completed", value: "Coming Soon" },
            { label: "Happy Clients", value: "Coming Soon" },
            { label: "Years of Experience", value: "Coming Soon" },
            { label: "Countries Served", value: "Coming Soon" },
          ].map((stat, i) => (
            <div key={i} data-reveal className="flex flex-col items-center justify-center text-center">
              <span className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">{stat.value}</span>
              <span className="mt-2 text-sm text-[var(--muted)]">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-4 md:grid-cols-3">
          {["Discovery", "Prototype", "Scale"].map((step, index) => (
            <div key={step} data-reveal className="glass rounded-3xl p-6">
              <span className="text-sm text-blue-300">0{index + 1}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {index === 0 && "We map the business model, user journey, competitive field, and launch priorities."}
                {index === 1 && "We create polished interfaces, interactive prototypes, and validated product flows."}
                {index === 2 && "We ship maintainable systems with analytics, automation, performance, and support."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 font-display text-sm uppercase tracking-[0.26em] text-blue-300">How Can We Help You</p>
              <h2 className="font-display text-3xl font-bold md:text-5xl">Services built for velocity and elegance.</h2>
            </div>
            <p className="max-w-xl text-[var(--muted)]">Every engagement combines taste, technology, and operational clarity so your product feels expensive and performs seriously.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  data-reveal
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="service-card glass glow-border group relative flex items-center gap-4 overflow-hidden rounded-[1.25rem] p-4 transition-all duration-300 md:p-5"
                >
                  <div className="relative h-11 w-11 shrink-0">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-transparent blur-md transition-all duration-500 group-hover:bg-blue-400/40" />
                    <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <Icon className="service-icon h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold transition-colors duration-300 group-hover:text-blue-100">{service.title}</h3>
                    <p className="service-copy mt-1 line-clamp-1 text-xs leading-5 text-[var(--muted)] transition-colors duration-300 group-hover:text-white/80">{service.copy}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="work" className="px-4 py-12 md:px-6 lg:py-16">
        <ComingSoonWrapper title="Our Work">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 font-display text-sm uppercase tracking-[0.26em] text-blue-300">Our Work</p>
              <h2 className="font-display text-3xl font-bold md:text-5xl">Cinematic products with measurable impact.</h2>
            </div>
            <div className="glass flex max-w-full flex-nowrap gap-2 overflow-x-auto rounded-full p-2 hide-scrollbar">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${activeFilter === filter ? "accent-gradient text-white" : "text-white/60 hover:text-white"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <motion.div layout className="hide-scrollbar flex gap-5 overflow-x-auto pb-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  className="glass light-sweep relative min-w-[82vw] overflow-hidden rounded-[2rem] p-4 md:min-w-[560px]"
                >
                  <div className="relative h-72 overflow-hidden rounded-3xl">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 82vw, 560px" className="object-cover transition duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1 text-sm text-white backdrop-blur-xl">{project.category}</span>
                  </div>
                  <div className="p-3">
                    <h3 className="mt-3 font-display text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.copy}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">{item}</span>
                      ))}
                    </div>
                    <button onClick={() => setSelectedProject(project)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-200">
                      Live preview <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        </ComingSoonWrapper>
      </section>

      <section id="clients" className="px-4 py-12 md:px-6 lg:py-16">
        <ComingSoonWrapper title="Happy Clients">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="text-center">
            <p className="mb-4 font-display text-sm uppercase tracking-[0.26em] text-blue-300">Happy Clients</p>
            <h2 className="font-display text-3xl font-bold md:text-5xl">Trusted by teams building their next chapter.</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                data-reveal
                animate={{ y: [0, index % 2 ? 14 : -14, 0] }}
                transition={{ repeat: Infinity, duration: 7 + index, ease: "easeInOut" }}
                className="glass rounded-3xl p-7"
              >
                <div className="mb-5 flex gap-1 text-blue-200">
                  {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-lg leading-8 text-white/82">"{item.quote}"</p>
                <div className="mt-8">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-[var(--muted)]">{item.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-12 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="flex w-max gap-4"
            >
              {[...["NOVAAI", "AURALUXE", "FINORY", "CLOUDMINT", "SCALEOS", "LUMEN"], ...["NOVAAI", "AURALUXE", "FINORY", "CLOUDMINT", "SCALEOS", "LUMEN"]].map((logo, index) => (
                <div key={`${logo}-${index}`} className="glass flex h-20 w-48 items-center justify-center rounded-3xl font-display text-sm tracking-[0.22em] text-white/60">
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        </ComingSoonWrapper>
      </section>

      <section className="relative px-4 py-12 md:px-6 lg:py-16">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ["100", "+ Projects"],
            ["50", "+ Clients"],
            ["95", "% Satisfaction"],
            ["24", "/7 Support"]
          ].map(([number, label]) => (
            <div key={label} data-reveal className="glass relative rounded-3xl p-7 text-center">
              <p className="stat-number font-display text-5xl font-bold">
                <AnimatedNumber value={Number(number)} suffix={label.split(" ")[0]} />
              </p>
              <p className="mt-3 text-sm text-[var(--muted)]">{label.replace(label.split(" ")[0], "").trim() || label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="sticky top-32 h-fit">
            <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.26em] text-blue-400/80">Why Choose BuildiT</p>
            <h2 className="font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[3.5rem] tracking-tight">
              Built like a product team.<br />
              <span className="text-white/30">Polished like a luxury studio.</span>
            </h2>
          </div>
          <div className="flex flex-col border-y border-white/10 divide-y divide-white/10">
            {choices.map((choice, index) => {
              const isOpen = openChoice === index;
              return (
              <div key={choice} data-reveal className="group">
                <button onClick={() => setOpenChoice(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 py-6 md:py-8 text-left outline-none">
                  <span className={`font-display text-2xl md:text-3xl font-semibold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>{choice}</span>
                  <div className={`flex shrink-0 items-center justify-center transition-colors duration-300 ${isOpen ? 'text-blue-400' : 'text-white/30 group-hover:text-white/60'}`}>
                    <ChevronDown className={`h-6 w-6 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="pb-6 md:pb-8 pt-0 text-base md:text-lg leading-relaxed text-white/50 max-w-2xl">
                        BuildiT combines senior execution, transparent communication, reusable systems, and premium design taste so your product can launch confidently and keep evolving.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          
          {/* Card 1: Book a Call */}
          <div data-reveal className="glass rounded-[2rem] p-6 md:p-8">
            <p className="mb-2 font-display text-xs uppercase tracking-[0.2em] text-blue-300">Book a Call</p>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Discuss your project with us.</h2>
            <ContactForm />
          </div>

          {/* Card 2: Mail Us */}
          <div data-reveal className="glass relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-[2rem] p-6 text-center md:flex-row md:px-8 md:py-6 md:text-left">
            <div className="absolute inset-0 grid-bg opacity-30" />
            
            <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 shadow-[0_0_20px_rgba(0,87,255,0.15)]">
                <Mail className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Mail Us</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">Prefer direct communication? Drop us an email.</p>
              </div>
            </div>
            
            <a 
              href="mailto:connect.buildit@gmail.com" 
              className="accent-gradient group relative z-10 inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,87,255,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,87,255,0.4)] md:w-auto"
            >
              Send Email
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </section>

      <footer className="px-4 pb-6 md:px-8">
        <div className="glass-transparent mx-auto max-w-5xl rounded-3xl p-5">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <a href="#hero" className="flex items-center gap-2.5">
              <span className="relative h-9 w-9 overflow-hidden rounded-full border border-white/15 bg-black shadow-[0_0_20px_rgba(0,87,255,0.3)]">
                <Image src="/buildit-logo.jpg" alt="BuildiT logo" fill sizes="36px" className="object-cover" />
              </span>
              <span className="font-display text-xl font-bold">BuildiT</span>
            </a>
            <div className="flex flex-wrap gap-2.5">
              {[
                { Icon: Instagram, link: "https://www.instagram.com/buildit.co.in/" },
                { Icon: Linkedin, link: "https://www.linkedin.com/in/buildit-services-1a7852411" },
                { Icon: XLogo, link: "#" }
              ].map((social, index) => {
                const Icon = social.Icon;
                return (
                  <a key={index} href={social.link} target="_blank" rel="noreferrer" aria-label="Social media" className="glass flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-110 hover:text-blue-200">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-4 text-[13px] text-[var(--muted)] md:flex-row">
            <p>© 2026 BuildiT. All rights reserved.</p>
            <a href="#hero" className="transition hover:text-blue-200">Back to top</a>
          </div>
        </div>
      </footer>

      <AIChatbot />

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }} className="glass max-w-3xl overflow-hidden rounded-[2rem]">
              <div className="relative h-72">
                <Image src={selectedProject.image} alt={selectedProject.title} fill sizes="768px" className="object-cover" />
                <button onClick={() => setSelectedProject(null)} className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-7">
                <p className="text-sm text-blue-200">{selectedProject.category} Case Study</p>
                <h3 className="mt-2 font-display text-3xl font-bold">{selectedProject.title}</h3>
                <p className="mt-4 leading-7 text-[var(--muted)]">{selectedProject.copy}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.stack.map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/70">{item}</span>)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
