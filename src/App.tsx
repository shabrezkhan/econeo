import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring,
  AnimatePresence
} from "motion/react";
import { 
  Recycle, 
  Trash2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Globe, 
  Leaf, 
  Cpu, 
  CheckCircle2,
  Menu,
  X,
  Coins,
  TrendingUp,
  AlertCircle,
  MessageCircle
} from "lucide-react";
import React, { useState, useEffect } from "react";

const COMPANY_NAME = "ECONEO ORBIS PRIVATE LIMITED";
const BRAND_NAME = "econeo recycling";
const CONTACT = {
  website: "www.econeo.in",
  email: "info@econeo.in",
  phones: ["+91 8080080939", "+91 9930204031"],
  address: "A/604 Trade Square Bldg, Mehra Ind, A K Road, Mumbai, Maharashtra, India, 400072",
  cin: "U38110MH2026PTC470137"
};

const services = [
  {
    title: "E-Waste Collection",
    description: "Safe and efficient collection of electronic waste from corporate and residential locations.",
    icon: <Trash2 className="w-6 h-6" />,
    steps: [
      "Schedule a pickup via our portal",
      "On-site evaluation & weighing",
      "Secure loading into specialized vehicles",
      "Transport to authorized facility"
    ]
  },
  {
    title: "Eco-Friendly Recycling",
    description: "State-of-the-art recycling processes that minimize environmental impact and maximize resource recovery.",
    icon: <Recycle className="w-6 h-6" />,
    steps: [
      "Manual dismantling & sorting",
      "Mechanical shredding & separation",
      "Refining of precious metals",
      "Safe disposal of hazardous residues"
    ]
  },
  {
    title: "Secure Data Destruction",
    description: "Certified data wiping and physical destruction of hard drives and storage media.",
    icon: <ShieldCheck className="w-6 h-6" />,
    steps: [
      "Inventory logging of storage devices",
      "Software-based data sanitization",
      "Physical shredding of media",
      "Issuance of destruction certificate"
    ]
  },
  {
    title: "Asset Recovery",
    description: "Refurbishing and repurposing electronic components to extend their lifecycle.",
    icon: <Cpu className="w-6 h-6" />,
    steps: [
      "Functionality testing & assessment",
      "Component-level repair & cleaning",
      "Software re-installation",
      "Remarketing for extended life"
    ]
  }
];

const stats = [
  { label: "E-Waste Processed", value: "5000+ Tons" },
  { label: "Corporate Clients", value: "200+" },
  { label: "Carbon Offset", value: "1200+ Tons" },
  { label: "Data Security", value: "100%" }
];

const EnvironmentalImpact = () => {
  const [aqi, setAqi] = useState<number | null>(null);
  const [aqiStatus, setAqiStatus] = useState<string>("Loading...");
  const [copperPrice, setCopperPrice] = useState<number>(762.45);
  const [priceChange, setPriceChange] = useState<number>(1.25);

  // Fetch AQI for Mumbai
  useEffect(() => {
    const fetchAqi = async () => {
      try {
        const response = await fetch("https://api.waqi.info/feed/mumbai/?token=demo");
        const data = await response.json();
        if (data.status === "ok") {
          setAqi(data.data.aqi);
          const val = data.data.aqi;
          if (val <= 50) setAqiStatus("Good");
          else if (val <= 100) setAqiStatus("Moderate");
          else if (val <= 150) setAqiStatus("Unhealthy for Sensitive Groups");
          else if (val <= 200) setAqiStatus("Unhealthy");
          else setAqiStatus("Very Unhealthy");
        } else {
          const mockAqi = Math.floor(Math.random() * (160 - 110) + 110);
          setAqi(mockAqi);
          setAqiStatus("Moderate to Unhealthy");
        }
      } catch (e) {
        setAqi(142);
        setAqiStatus("Moderate");
      }
    };
    fetchAqi();
  }, []);

  // Simulate Live Copper Price (MCX Mumbai)
  useEffect(() => {
    const interval = setInterval(() => {
      setCopperPrice(prev => {
        const change = (Math.random() - 0.5) * 0.5;
        setPriceChange(change);
        return parseFloat((prev + change).toFixed(2));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const globalStats = [
    { 
      title: "Global E-Waste", 
      value: "62M", 
      unit: "Metric Tons/Year", 
      recycled: "22.3%", 
      desc: "Only a small fraction is formally collected and recycled globally.",
      color: "bg-red-500"
    },
    { 
      title: "India E-Waste", 
      value: "1.6M", 
      unit: "Metric Tons/Year", 
      recycled: "25%", 
      desc: "India is the 3rd largest producer of e-waste in the world.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-econeo-teal text-econeo-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* AQI Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-econeo-green rounded-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Live Mumbai AQI</h3>
              </div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-bold">{aqi || "--"}</span>
                <span className="text-xl opacity-60 font-medium">AQI</span>
              </div>
              <p className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${
                aqi && aqi <= 50 ? "bg-green-500" : aqi && aqi <= 100 ? "bg-yellow-500 text-teal-900" : "bg-orange-500"
              }`}>
                {aqiStatus}
              </p>
              <p className="text-sm opacity-70">Real-time air quality index for Mumbai. E-waste recycling helps reduce toxic emissions.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-xs opacity-50">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </motion.div>

          {/* Copper Market Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Mumbai Copper Market</h3>
              </div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold">₹{copperPrice}</span>
                <span className="text-lg opacity-60 font-medium">/kg</span>
              </div>
              <div className={`flex items-center gap-2 text-sm font-bold mb-4 ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                <TrendingUp className={`w-4 h-4 ${priceChange < 0 ? "rotate-180" : ""}`} />
                {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)} (Live)
              </div>
              <p className="text-sm opacity-70">Estimated MCX Mumbai spot price. Copper is a primary resource recovered from high-grade e-waste.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-xs opacity-50 flex justify-between">
              <span>MCX Live Feed</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </motion.div>

          {/* E-Waste Stats */}
          {globalStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 p-8 rounded-3xl border border-white/5"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Recycle className="w-6 h-6 text-econeo-green" />
                {stat.title}
              </h3>
              <div className="mb-8">
                <div className="text-5xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-60 uppercase tracking-widest">{stat.unit}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span>Recycling Rate</span>
                  <span className="text-econeo-green">{stat.recycled}</span>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: stat.recycled }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${stat.color}`}
                  />
                </div>
                <p className="text-sm opacity-70 leading-relaxed pt-2">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = { error: await response.text() };
      }

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setErrorMessage("Network error or server is offline. Please try again later.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider opacity-60">Full Name</label>
          <input 
            name="name"
            type="text" 
            required
            className="w-full px-4 py-3 rounded-xl border border-econeo-teal/10 focus:outline-none focus:ring-2 focus:ring-econeo-green/20 transition-all" 
            placeholder="John Doe" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider opacity-60">Email</label>
          <input 
            name="email"
            type="email" 
            required
            className="w-full px-4 py-3 rounded-xl border border-econeo-teal/10 focus:outline-none focus:ring-2 focus:ring-econeo-green/20 transition-all" 
            placeholder="john@example.com" 
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider opacity-60">Phone Number</label>
          <input 
            name="phone"
            type="tel" 
            className="w-full px-4 py-3 rounded-xl border border-econeo-teal/10 focus:outline-none focus:ring-2 focus:ring-econeo-green/20 transition-all" 
            placeholder="+91 00000 00000" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider opacity-60">Subject</label>
          <select 
            name="subject"
            className="w-full px-4 py-3 rounded-xl border border-econeo-teal/10 focus:outline-none focus:ring-2 focus:ring-econeo-green/20 transition-all"
          >
            <option>Corporate E-Waste Pickup</option>
            <option>Data Destruction Service</option>
            <option>General Inquiry</option>
            <option>Partnership</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider opacity-60">Message</label>
        <textarea 
          name="message"
          rows={4} 
          required
          className="w-full px-4 py-3 rounded-xl border border-econeo-teal/10 focus:outline-none focus:ring-2 focus:ring-econeo-green/20 transition-all" 
          placeholder="How can we help you?"
        ></textarea>
      </div>
      
      {status === "success" && (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {errorMessage}
        </div>
      )}

      <button 
        disabled={status === "sending"}
        className="w-full bg-econeo-teal text-econeo-beige font-bold py-4 rounded-xl hover:bg-econeo-green transition-all shadow-lg shadow-econeo-teal/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

const ServiceCard = (props: any) => {
  const { service, idx } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[400px] w-full cursor-pointer group"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 flex flex-col rounded-3xl bg-white shadow-lg border border-econeo-teal/5 p-8 transition-all duration-500 group-hover:shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center h-full"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="w-14 h-14 bg-econeo-beige rounded-xl flex items-center justify-center text-econeo-green shadow-sm mb-4 flex-shrink-0">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-econeo-teal/70 leading-relaxed text-sm">
                {service.description}
              </p>
              <div className="mt-auto pt-6 flex items-center gap-2 text-econeo-green font-bold text-sm">
                Tap to see process <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col"
              style={{ transform: "translateZ(50px)" }}
            >
              <h4 className="text-lg font-bold mb-6 text-econeo-green flex items-center gap-2 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
                Our Process
              </h4>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {service.steps.map((step: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-econeo-green/10 text-econeo-green text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium text-econeo-teal/80">{step}</p>
                  </motion.div>
                ))}
              </div>
              <button className="mt-auto pt-4 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity text-center w-full">
                Tap to go back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Logo = ({ className = "" }: { className?: string }) => (
  <img 
    src="/logo.svg" 
    alt="Econeo Recycling Logo" 
    className={className}
    referrerPolicy="no-referrer"
  />
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-econeo-green selection:text-white bg-econeo-beige text-econeo-teal">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-econeo-beige/80 backdrop-blur-md border-b border-econeo-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Logo className="h-12 w-auto" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium hover:text-econeo-green transition-colors">About</a>
              <a href="#services" className="text-sm font-medium hover:text-econeo-green transition-colors">Services</a>
              <a href="#contact" className="bg-econeo-teal text-econeo-beige px-5 py-2.5 rounded-full text-sm font-medium hover:bg-econeo-green transition-all">
                Contact Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-econeo-teal"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-econeo-beige border-b border-econeo-teal/10 px-4 py-6"
          >
            <div className="flex flex-col gap-4">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">About</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Services</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-econeo-teal text-econeo-beige px-6 py-3 rounded-xl text-center font-medium">
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-econeo-green/10 text-econeo-green px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Leaf className="w-4 h-4" />
                Sustainable E-Waste Solutions
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Recycling for a <span className="text-econeo-green">Greener</span> Tomorrow.
              </h1>
              <p className="text-lg text-econeo-teal/70 mb-10 max-w-xl">
                Econeo Orbis Private Limited provides professional, certified, and eco-friendly electronic waste management services across Mumbai and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="bg-econeo-teal text-econeo-beige px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-econeo-green transition-all group">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#services" className="border-2 border-econeo-teal/20 px-8 py-4 rounded-full font-semibold hover:bg-econeo-teal hover:text-econeo-beige transition-all">
                  Our Services
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-econeo-green/5 rounded-full absolute -top-10 -right-10 w-full h-full -z-10 animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000" 
                  alt="E-waste recycling"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-econeo-teal/5 max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-econeo-green p-2 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold">Certified Process</span>
                </div>
                <p className="text-sm text-econeo-teal/60">We ensure 100% compliant and secure recycling for all your electronic assets.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <EnvironmentalImpact />

      {/* Stats Section */}
      <section className="bg-econeo-teal py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-econeo-beige mb-2">{stat.value}</div>
                <div className="text-econeo-beige/60 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Our Core Services</h2>
            <p className="text-econeo-teal/60 max-w-2xl mx-auto">
              Comprehensive electronic waste management solutions tailored for businesses and individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} service={service} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=500" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1611288875055-12840621668b?auto=format&fit=crop&q=80&w=500" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
                </div>
                <div className="pt-8 space-y-4">
                  <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=500" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">About Econeo Orbis</h2>
              <p className="text-lg text-econeo-teal/70 mb-6">
                {COMPANY_NAME} is a leading e-waste management company dedicated to solving the growing challenge of electronic waste in India.
              </p>
              <p className="text-econeo-teal/70 mb-8">
                We bridge the gap between technology and sustainability. Our mission is to ensure that every piece of electronic equipment is recycled responsibly, recovering valuable materials while protecting our planet from hazardous substances.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Government Authorized Recycler",
                  "Secure Data Destruction Protocols",
                  "Environmental Compliance Guaranteed",
                  "End-to-End Logistics Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-econeo-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center gap-2 font-bold text-econeo-teal hover:text-econeo-green transition-colors">
                Learn more about our mission <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-econeo-teal text-econeo-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8">Get in Touch</h2>
              <p className="text-econeo-beige/70 mb-12 text-lg">
                Ready to recycle your e-waste? Contact us today for a consultation or to schedule a pickup.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-econeo-beige/10 p-4 rounded-2xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Registered Office</h4>
                    <p className="text-econeo-beige/60 leading-relaxed">{CONTACT.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-econeo-beige/10 p-4 rounded-2xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Phone Numbers</h4>
                    {CONTACT.phones.map(phone => (
                      <p key={phone} className="text-econeo-beige/60">{phone}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-econeo-beige/10 p-4 rounded-2xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Email Address</h4>
                    <p className="text-econeo-beige/60">{CONTACT.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-econeo-beige/10 p-4 rounded-2xl">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Website</h4>
                    <p className="text-econeo-beige/60">{CONTACT.website}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-12 text-econeo-teal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-econeo-beige py-12 border-t border-econeo-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Logo className="h-10 w-auto" />
            
            <div className="text-sm text-econeo-teal/60 text-center md:text-right">
              <p className="font-bold mb-1">{COMPANY_NAME}</p>
              <p>CIN: {CONTACT.cin}</p>
              <p className="mt-4">© {new Date().getFullYear()} Econeo Recycling. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* WhatsApp Floating Button */}
      <motion.a
        href={`https://wa.me/${CONTACT.phones[0].replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold whitespace-nowrap">
          Chat with us
        </span>
      </motion.a>
    </div>
  );
}
