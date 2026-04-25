import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeCanvas } from 'qrcode.react';
import { cn } from '@/src/lib/utils';
import { 
  Plus, 
  Search, 
  QrCode, 
  Map as MapIcon, 
  Bell, 
  Users, 
  Settings, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin,
  ChevronRight,
  User,
  ShieldCheck,
  GraduationCap,
  Trophy,
  Star,
  Download,
  Share2,
  AlertTriangle,
  Menu
} from 'lucide-react';

// --- Constants ---

const CATEGORIES = ["Technical", "Cultural", "Sports", "Workshops"];

const EVENTS = [
  { 
    id: 1, 
    name: "Hackathon 2026", 
    time: "10:00 AM", 
    date: "April 25, 2026", 
    venue: "Seminar Hall 1", 
    slots: "12/50", 
    category: "Technical", 
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", 
    description: "Join the most intense 24-hour coding challenge at VVCE. Build innovative solutions for real-world problems and win from a prize pool of ₹50,000. This year's theme focuses on Sustainable Engineering and AI-driven campus accessibility.", 
    organizer: "CSE Department", 
    speaker: "Dr. Tech Enthusiast (Google AI Lead)" 
  },
  { 
    id: 2, 
    name: "Dance Faceoff", 
    time: "02:00 PM", 
    date: "April 26, 2026", 
    venue: "Main Stage", 
    slots: "Full", 
    category: "Cultural", 
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2070&auto=format&fit=crop", 
    description: "Battle it out on stage in the ultimate dance faceoff. From hip-hop to classical, show your moves and claim the trophy in front of a live audience of 5,000+ peers.", 
    organizer: "Cultural Committee", 
    speaker: "Master Remo (Choreographer)" 
  },
  { 
    id: 5, 
    name: "Battle of Bands", 
    time: "06:00 PM", 
    date: "April 26, 2026", 
    venue: "Open Air Theatre", 
    slots: "15/100", 
    category: "Cultural", 
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop", 
    description: "The loudest evening of VVCE Fest. Rock, Pop, and Indie bands from all over the state compete for the title of 'Best Campus Band'. Feel the energy and the bass!", 
    organizer: "Music Club", 
    speaker: "Sangeeth S (Independent Artist)" 
  },
  { 
    id: 6, 
    name: "Drama Night", 
    time: "04:30 PM", 
    date: "April 27, 2026", 
    venue: "Main Stage", 
    slots: "30/200", 
    category: "Cultural", 
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069&auto=format&fit=crop", 
    description: "A night of storytelling, emotions, and brilliant performances. Watch the DRAMA club bring classic and modern scripts to life on the grand stage.", 
    organizer: "DRAMA Club", 
    speaker: "Director Ramesh (Theatre Veteran)" 
  },
  { 
    id: 3, 
    name: "Cricket League", 
    time: "08:00 AM", 
    date: "April 27, 2026", 
    venue: "Football Ground", 
    slots: "5/11", 
    category: "Sports", 
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop", 
    description: "The annual inter-departmental cricket tournament. High stakes, intense rivalries, and the love for the game. May the best department win!", 
    organizer: "Sports Department", 
    speaker: "Coach Venkatesh (State Level)" 
  },
  { 
    id: 4, 
    name: "AI Workshop", 
    time: "11:00 AM", 
    date: "April 28, 2026", 
    venue: "Lab 3", 
    slots: "20/30", 
    category: "Workshops", 
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop", 
    description: "Hands-on workshop on the latest in Generative AI. Learn how to build and deploy your own AI models using modern frameworks like PyTorch and TensorFlow.", 
    organizer: "AI & ML Lab", 
    speaker: "Prof. Brainiac (Research Scientist)" 
  },
];

// --- Components & Layouts ---

const Sidebar = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const menuItems = [
    { icon: User, label: "Home", path: "/" },
    { icon: Calendar, label: "Events", path: "/dashboard" },
    { icon: QrCode, label: "Pass", path: "/confirmation" },
    { icon: MapIcon, label: "Map", path: "/map" },
    { icon: Bell, label: "Alerts", path: "/notifications" },
    { icon: ShieldCheck, label: "Check-in", path: "/attendance" },
    { icon: Settings, label: "Admin", path: "/organizer" },
    { icon: Trophy, label: "Winners", path: "/results" },
  ];

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-6 top-6 bottom-6 w-20 hover:w-64 bg-bento-dark rounded-[40px] z-50 p-4 transition-all duration-500 ease-[0.22, 1, 0.36, 1] shadow-2xl flex flex-col group overflow-hidden"
    >
      <div className="flex items-center gap-4 mb-10 px-2">
        <div className="w-12 h-12 bg-bento-accent rounded-2xl flex items-center justify-center text-white font-black text-2xl shrink-0">
          V
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h1 className="text-white font-black text-xl italic tracking-tighter">FestFlow</h1>
          <p className="text-white/40 text-[10px] font-bold uppercase whitespace-nowrap tracking-widest">VVCE Mysore</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            onMouseEnter={() => setHovered(item.label)}
            onMouseLeave={() => setHovered(null)}
            className="w-full flex items-center gap-4 p-3 rounded-2xl transition-all relative group/item"
          >
            {window.location.pathname === item.path && (
              <motion.div 
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/10 rounded-2xl"
              />
            )}
            <item.icon 
              size={24} 
              className={cn(
                "shrink-0 transition-colors duration-300",
                window.location.pathname === item.path ? "text-bento-accent" : "text-white/60 group-hover/item:text-white"
              )} 
            />
            <span className="text-white font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white overflow-hidden group-hover:w-full group-hover:h-14 group-hover:rounded-2xl transition-all duration-300">
          <User size={20} className="shrink-0" />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
            <p className="text-xs font-bold whitespace-nowrap">John Doe</p>
            <p className="text-[10px] text-white/40 font-bold whitespace-nowrap">Student</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-bento-border">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-bento-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">VV</div>
        <div>
          <h1 className="text-2xl font-black text-bento-primary tracking-tight">FestFlow <span className="text-bento-accent">2026</span></h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">VVCE Mysore Event Management System</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Live: 4,821 / 5,000 In
          </span>
          <span className="px-3 py-1 bg-bento-accent/10 text-bento-accent rounded-full text-xs font-bold">12 Ongoing Events</span>
        </div>
      </div>
    </header>
  );
};

const PageWrapper = ({ children, className, noNav = false }: { children: React.ReactNode; className?: string; noNav?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "min-h-screen py-6 pr-6", 
      noNav ? "px-6" : "pl-32",
      className
    )}
  >
    {!noNav && <Sidebar />}
    <div className="h-full">
      {children}
    </div>
  </motion.div>
);

// --- Pages ---

// Page 1: Splash / Welcome
const SplashPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper noNav className="flex flex-col justify-end bg-bento-dark p-0 overflow-hidden relative min-h-screen">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop" 
          alt="VVCE Campus" 
          className="w-full h-full object-cover opacity-40 scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bento-dark via-bento-dark/40 to-transparent" />
      </div>
      
      <div className="relative z-10 p-12 pb-24 max-w-7xl mx-auto w-full space-y-12">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <span className="w-12 h-1 bg-bento-accent rounded-full block"></span>
            <span className="text-white/60 uppercase tracking-[0.4em] text-[10px] font-black">Vidyavardhaka College OF Engineering</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase italic">
            VVCE<br /><span className="text-bento-accent">Fest</span>Flow
          </h1>
          <p className="text-white/70 text-xl max-w-md font-light leading-relaxed">
            Revolutionizing event management for 5,000+ students with real-time analytics and seamless QR check-ins.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-bento-dark px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-bento-accent hover:text-white transition-all shadow-2xl flex items-center gap-3 group"
          >
            Get Started
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('/organizer')}
            className="border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
          >
            <ShieldCheck size={20} />
            Organizer Path
          </button>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

// Page 2: Event Registration Dashboard
const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = EVENTS.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper className="flex flex-col gap-6">
      <Header />
      
      <main className="grid grid-cols-12 grid-rows-6 gap-6 flex-1 min-h-[800px]">
        {/* Events Section (Large) */}
        <div className="col-span-8 row-span-4 flex flex-col gap-6">
          <div className="bento-card bento-card-hover p-6 space-y-6 flex-1">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-bento-primary uppercase italic tracking-tighter">Event Portal</h2>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search events..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-bento-bg border border-bento-border text-[10px] font-bold uppercase tracking-widest pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-bento-accent transition-all min-w-[200px]"
                  />
                </div>
              </div>
              <div className="flex gap-2 bg-bento-bg p-1 rounded-xl">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                    selectedCategory === null ? "bg-white shadow-sm" : "hover:bg-white/50"
                  )}
                >
                  All
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                      selectedCategory === cat ? "bg-white shadow-sm" : "hover:bg-white/50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 overflow-y-auto max-h-[600px] pr-2 scrollbar-hide">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, idx) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-bento-bg rounded-3xl overflow-hidden border border-transparent hover:border-bento-accent/20 transition-all cursor-pointer"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <div className="relative h-40">
                      <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute top-3 left-3 bg-white px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider text-bento-primary">
                        {event.category}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-black text-bento-dark italic">{event.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                          <Clock size={12} /> {event.time}
                        </span>
                        <span className="font-black text-bento-accent text-xs">{event.slots} Slots</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-bento-bg rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Search size={32} />
                  </div>
                  <div>
                    <h4 className="font-black italic uppercase tracking-tighter text-lg text-bento-dark">No Events Found</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Try adjusting your search or category</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Quick Pass (Right Side) */}
        <div className="col-span-4 row-span-3 bento-card p-6 bg-bento-primary text-white space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-black italic uppercase tracking-tighter text-xl">Quick Pass</h4>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <QrCode size={20} />
            </div>
          </div>
          <div className="bg-white/10 rounded-3xl p-6 border border-white/10 flex flex-col items-center gap-4 backdrop-blur-xl">
            <div className="bg-white p-3 rounded-2xl shadow-inner cursor-pointer hover:scale-105 transition-transform" title="Scan to visit website">
              <QRCodeCanvas 
                value={window.location.origin} 
                size={140} 
                level={"H"}
                includeMargin={false}
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div className="text-center">
              <p className="font-mono text-[8px] font-black opacity-40 tracking-widest uppercase mb-1">Scan to Visit Site</p>
              <p className="font-mono text-xs font-bold opacity-60 tracking-widest uppercase">Fest-Portal-V1</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/confirmation')}
            className="w-full bg-white text-bento-dark py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-bento-accent hover:text-white transition-all shadow-xl"
          >
            Expand Pass
          </button>
        </div>

        {/* Map Preview (Small Bottom Right) */}
        <div 
          onClick={() => navigate('/map')}
          className="col-span-4 row-span-3 bento-card bento-card-hover group cursor-pointer relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale border-none"
            alt="Campus Map"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
            <div className="flex items-center justify-between">
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg animate-pulse uppercase">Live Map</span>
              <MapIcon size={20} className="text-bento-primary" />
            </div>
            <div>
              <h5 className="font-black text-bento-dark tracking-tighter uppercase italic text-lg leading-tight">Campus<br />Navigator</h5>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Find events and density</p>
            </div>
          </div>
        </div>

        {/* Stats Grid (Bottom Left Small Boxes) */}
        <div className="col-span-4 row-span-2 bento-card p-6 border-bento-accent/20 bg-gradient-to-br from-white to-blue-50 flex flex-col justify-between">
           <div className="flex items-center justify-between">
             <Trophy size={28} className="text-bento-accent" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Achievements</span>
           </div>
           <div>
             <span className="text-3xl font-black text-bento-dark tracking-tighter">04</span>
             <p className="text-xs font-bold text-slate-500 uppercase mt-1">Events Participated</p>
           </div>
        </div>

        <div className="col-span-4 row-span-2 bento-card p-6 flex flex-col justify-between">
           <div className="flex items-center justify-between">
             <Users size={28} className="text-blue-900" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network</span>
           </div>
           <div>
             <span className="text-3xl font-black text-bento-dark tracking-tighter">4.8k</span>
             <p className="text-xs font-bold text-slate-500 uppercase mt-1">Total Attendees</p>
           </div>
        </div>
      </main>

      <footer className="flex items-center justify-between py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <div className="flex gap-4">
          <span>Session: Fest Day 01</span>
          <span>Role: Student Dashboard</span>
        </div>
        <span className="text-bento-accent">Vidyavardhaka College OF Engineering © 2026</span>
      </footer>
    </PageWrapper>
  );
};

// Page 2.5: Event Detail View
const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === Number(id));

  if (!event) return <div>Event not found</div>;

  return (
    <PageWrapper className="flex flex-col gap-6">
      <Header />
      <main className="grid grid-cols-12 gap-6 flex-1">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="bento-card overflow-hidden flex flex-col">
            <div className="relative h-[400px]">
              <img 
                src={event.image} 
                className="w-full h-full object-cover" 
                alt={event.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-bento-dark to-transparent">
                <div className="space-y-4">
                  <span className="bg-bento-accent text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {event.category}
                  </span>
                  <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                    {event.name}
                  </h1>
                </div>
              </div>
            </div>
            <div className="p-10 space-y-8 bg-white">
               <div className="flex flex-wrap gap-8 py-6 border-y border-bento-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bento-bg rounded-xl flex items-center justify-center text-bento-primary">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                      <p className="font-black text-bento-dark italic">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bento-bg rounded-xl flex items-center justify-center text-bento-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                      <p className="font-black text-bento-dark italic">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bento-bg rounded-xl flex items-center justify-center text-bento-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Venue</p>
                      <p className="font-black text-bento-dark italic">{event.venue}</p>
                    </div>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-bento-dark">About the Event</h3>
                  <p className="text-slate-600 font-medium leading-loose text-lg">
                    {event.description}
                  </p>
               </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
           <div className="bento-card p-10 bg-bento-primary text-white space-y-6">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Registration</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                    <span className="text-xs font-black uppercase opacity-60">Slots Left</span>
                    <span className="font-black text-2xl">{event.slots}</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                    <span className="text-xs font-black uppercase opacity-60">Status</span>
                    <span className="bg-green-500 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">Open</span>
                 </div>
              </div>
              <button 
                onClick={() => navigate(`/confirmation/${event.id}`)}
                className="w-full bg-white text-bento-dark py-5 rounded-3xl font-black uppercase text-sm tracking-widest hover:bg-bento-accent hover:text-white transition-all shadow-2xl"
              >
                Register Now
              </button>
           </div>

           <div className="bento-card p-10 bg-white space-y-6 flex-1">
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-bento-dark">Organizer Details</h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bento-bg rounded-2xl flex items-center justify-center text-bento-primary font-black">
                       {event.organizer[0]}
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-slate-400">Department</p>
                       <p className="font-black text-bento-dark italic">{event.organizer}</p>
                    </div>
                 </div>
                 <div className="pt-6 border-t border-bento-border">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Key Speaker</p>
                    <div className="flex items-center gap-3">
                       <User size={16} className="text-bento-accent" />
                       <span className="font-black text-bento-dark italic">{event.speaker}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </PageWrapper>
  );
};

// Page 3: QR Confirmation
const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const event = EVENTS.find(e => e.id === Number(id)) || EVENTS[0];

  return (
    <PageWrapper className="flex flex-col gap-6">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg bento-card p-10 space-y-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-[100px]" />
          
          <div className="text-center space-y-4">
            <div className="bg-green-100 w-16 h-16 rounded-3xl flex items-center justify-center text-green-600 mx-auto shadow-lg shadow-green-100">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-bento-dark uppercase italic tracking-tighter">Access Granted!</h2>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Event: {event.name} • {event.time}</p>
            </div>
          </div>

          <div className="bg-bento-bg rounded-[40px] p-8 flex flex-col items-center gap-6 border border-bento-border shadow-inner">
            <div className="bg-white p-5 rounded-[32px] shadow-xl border border-white">
              <QRCodeCanvas 
                value={`${window.location.origin}/event/${id}`} 
                size={220} 
                level={"H"}
                includeMargin={false}
                style={{ borderRadius: '16px' }}
              />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Electronic Access Ticket</p>
              <p className="text-sm font-mono font-black text-bento-accent">VVCE-2026-{id?.padStart(4, '0')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-bento-dark text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-bento-accent transition-all">
              <Download size={16} /> Save Pass
            </button>
            <button className="bg-white border-2 border-bento-border text-bento-dark py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:border-bento-accent transition-all">
              <Share2 size={16} /> Share
            </button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

// Page 4: Live Event Map
const MapPage = () => {
  const navigate = useNavigate();
  const locations = [
    { name: "Admin Block", x: 20, y: 20, active: true, density: "Low" },
    { name: "Auditorium", x: 50, y: 50, active: true, density: "High" },
    { name: "Grounds", x: 80, y: 80, active: true, density: "Medium" },
    { name: "Canteen", x: 40, y: 80, active: false, density: "Medium" }
  ];

  const getDensityStyle = (density: string) => {
    switch(density) {
      case "High": return { color: "bg-red-500", shadow: "shadow-red-500/50", scale: [1, 1.4, 1] };
      case "Medium": return { color: "bg-amber-500", shadow: "shadow-amber-500/50", scale: [1, 1.25, 1] };
      default: return { color: "bg-green-500", shadow: "shadow-green-500/50", scale: [1, 1.15, 1] };
    }
  };

  return (
    <PageWrapper className="flex flex-col gap-6 h-screen overflow-hidden">
      <Header />
      <div className="bento-card flex-1 relative bg-blue-50 overflow-hidden min-h-0">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-20 grayscale border-none"
          alt="Campus Map"
          referrerPolicy="no-referrer"
        />
        
        {locations.map((loc, i) => {
          const config = getDensityStyle(loc.density);
          return (
            <motion.div
              key={loc.name}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="absolute cursor-pointer flex flex-col items-center"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onClick={() => navigate('/notifications')}
            >
              <div className="relative group flex flex-col items-center">
                {/* Heatmap Pulsing Rings */}
                <motion.div 
                  animate={{ scale: config.scale, opacity: [0.6, 0.2, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={cn("absolute w-12 h-12 rounded-full -top-4", config.color, "opacity-20")}
                />
                
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-bento-border shadow-xl min-w-[140px] transition-all hover:scale-110 hover:shadow-bento-accent/20 relative z-10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-bento-primary uppercase truncate pr-2">{loc.name}</span>
                    <div className={cn("w-2 h-2 rounded-full", config.color)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[8px] font-bold px-1.5 py-0.5 rounded uppercase",
                      loc.density === "High" ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600"
                    )}>
                      {loc.density} density
                    </span>
                    {loc.density === "High" && <AlertTriangle size={10} className="text-red-500" />}
                  </div>
                </div>
                
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={cn("w-4 h-4 rounded-full border-2 border-white shadow-lg mt-2 relative z-10", config.color)} 
                />
              </div>
            </motion.div>
          );
        })}

        <div className="absolute bottom-6 left-6 p-6 bento-card bg-white/80 backdrop-blur-xl border-white max-w-sm space-y-4 shadow-2xl">
           <div className="flex items-center justify-between">
              <h3 className="font-black italic uppercase tracking-tighter text-lg">Density Radar</h3>
              <span className="text-[8px] font-black bg-bento-accent text-white px-2 py-0.5 rounded-full animate-pulse uppercase">Live Sync</span>
           </div>
           <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Critical Zone</span>
                </div>
                <span className="text-[8px] font-black text-red-500">A1, G2 Locations</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">High Load</span>
                </div>
                <span className="text-[8px] font-black text-amber-500">Wait: ~15m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Optimized</span>
                </div>
                <span className="text-[8px] font-black text-green-500">No Wait</span>
              </div>
           </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// Page 5: Notifications
const NotificationsPage = () => {
  const navigate = useNavigate();
  const alerts = [
    { id: 1, title: "Workshop Delay", description: "Robotics session moved to Seminar Hall B at 14:30.", time: "2 min ago", type: "warning" },
    { id: 2, title: "Winner Alert!", description: "CS Dept takes 1st place in Coding Challenge.", time: "10 min ago", type: "success" },
    { id: 3, title: "Security Alert", description: "Crowd congestion at Main Gate. Please use North Entry.", time: "1 hour ago", type: "urgent" },
    { id: 4, title: "Lunch Service", description: "Canteen queue estimated 12 min. Pre-orders live.", time: "2 hours ago", type: "info" },
  ];

  return (
    <PageWrapper className="flex flex-col gap-6">
      <Header />
      <div className="grid grid-cols-12 gap-6 flex-1">
        <div className="col-span-12 lg:col-span-8 bento-card bg-bento-dark p-8 text-white flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Real-Time Feed</h2>
            <div className="flex gap-2">
               <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60">All Alerts</span>
               <span className="bg-bento-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">3 New</span>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-4 scrollbar-hide">
            {alerts.map((alert, idx) => (
              <motion.div 
                key={alert.id}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "p-6 rounded-3xl border transition-all cursor-pointer",
                  alert.type === 'urgent' ? "bg-red-500/10 border-red-500/30 hover:bg-red-500/20" : 
                  alert.type === 'warning' ? "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20" :
                  "bg-white/5 border-white/10 hover:bg-white/10"
                )}
              >
                <div className="flex gap-6 items-start">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                    alert.type === 'urgent' ? "bg-red-500 text-white" : 
                    alert.type === 'warning' ? "bg-amber-500 text-white" : "bg-white text-bento-dark"
                  )}>
                    {alert.type === 'urgent' ? <AlertTriangle size={24} /> : <Bell size={24} />}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                       <h4 className={cn(
                         "text-xl font-black italic uppercase tracking-tighter",
                         alert.type === 'urgent' ? "text-red-400" : alert.type === 'warning' ? "text-amber-400" : "text-white"
                       )}>{alert.title}</h4>
                       <span className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-widest">{alert.time}</span>
                    </div>
                    <p className="text-white/60 font-medium leading-relaxed">{alert.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bento-card p-8 bg-white space-y-6 flex-1">
             <h3 className="font-black italic uppercase tracking-tighter text-xl text-bento-primary">Event Status</h3>
             <div className="space-y-6">
                {[
                  { label: "Technical Events", value: 85 },
                  { label: "Cultural", value: 40 },
                  { label: "Sports", value: 65 }
                ].map(stat => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{stat.label}</span>
                      <span>{stat.value}% Ready</span>
                    </div>
                    <div className="h-2 bg-bento-bg rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        className="h-full bg-bento-accent"
                      />
                    </div>
                  </div>
                ))}
             </div>
          </div>
          <button 
            onClick={() => navigate('/attendance')}
            className="bento-card bg-bento-accent text-white p-6 font-black uppercase tracking-widest text-xs hover:bg-bento-primary transition-all flex items-center justify-between"
          >
            Go to Check-in
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

// Page 6: Attendance Tracking (Organizer)
const AttendancePage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper className="flex flex-col gap-6">
      <Header />
      <div className="grid grid-cols-12 gap-6 flex-1">
        <div className="col-span-12 lg:col-span-5 bento-card p-10 flex flex-col items-center justify-center space-y-10 shadow-2xl bg-white border-bento-accent/20">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-bento-dark">Gate Controller</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Scanner ID: VVCE-NORTH-01</p>
          </div>
          
          <div className="w-full aspect-square bg-bento-dark rounded-[48px] flex flex-col items-center justify-center text-white space-y-6 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-bento-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-white p-6 rounded-[40px] relative z-10 shadow-2xl">
              <QRCodeCanvas 
                value="SCANNER-READY" 
                size={180} 
                level={"H"}
                className="opacity-90"
              />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.3em] relative z-10 text-center opacity-60">Ready to Scan Participant Pass</p>
          </div>
          
          <button className="w-full bg-bento-accent text-white py-6 rounded-[32px] font-black uppercase tracking-widest text-sm shadow-2xl shadow-bento-accent/30 transition-all hover:scale-[0.98] active:scale-95">
            Activate Camera
          </button>
        </div>

        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          <div className="bento-card p-8 flex flex-col flex-1 space-y-8 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-bento-primary">Recent Logs</h3>
              <div className="flex gap-4">
                 <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400">In Venue</p>
                    <p className="text-xl font-black text-bento-dark italic">4,203</p>
                 </div>
                 <div className="w-px h-10 bg-bento-border" />
                 <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400">Expected</p>
                    <p className="text-xl font-black text-slate-300 italic">5,000</p>
                 </div>
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 scrollbar-hide">
              {[
                { name: "Arjun Kumar", dept: "CSE", time: "14:22:04", status: "Valid" },
                { name: "Priya Rao", dept: "ISE", time: "14:21:44", status: "Valid" },
                { name: "Samarth V", dept: "ECE", time: "14:21:12", status: "Valid" },
                { name: "Lekha M", dept: "MECH", time: "14:20:55", status: "Valid" },
                { name: "Rahul S", dept: "CIVIL", time: "14:20:30", status: "Valid" },
                { name: "Kiara J", dept: "MBA", time: "14:19:10", status: "Valid" },
              ].map((entry, idx) => (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={idx} 
                  className="flex items-center justify-between p-5 bg-bento-bg rounded-3xl border border-transparent hover:border-bento-accent/10 transition-all group"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-bento-primary shadow-sm group-hover:scale-110 transition-transform">
                      {entry.name[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-bento-dark italic uppercase tracking-tighter">{entry.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{entry.dept} Department</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-black text-bento-accent block">{entry.time}</span>
                    <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-green-100 text-green-600 rounded mt-1">Verified</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// Page 7: Organizer Control Panel
const OrganizerPage = () => {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState([40, 70, 45, 90, 65, 80, 50, 100, 60, 40, 75, 95]);
  const [liveStats, setLiveStats] = useState([
    { label: "Volunteers", value: 142, icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Venues", value: 12, icon: MapPin, color: "bg-purple-100 text-purple-600" },
    { label: "Reports", value: 24, icon: AlertTriangle, color: "bg-orange-100 text-orange-600" },
    { label: "Live Events", value: 8, icon: Calendar, color: "bg-green-100 text-green-600" },
  ]);

  const [venueStatus, setVenueStatus] = useState([
    { name: "Main Stage", status: "Active", users: 1200, trend: "up" },
    { name: "Food Court", status: "Crowded", users: 850, trend: "down" },
    { name: "Hack Zone", status: "Active", users: 450, trend: "up" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate Analytics
      setAnalyticsData(prev => prev.map(val => Math.max(20, Math.min(100, val + (Math.random() > 0.5 ? 5 : -5)))));
      
      // Fluctuate Stats
      setLiveStats(prev => prev.map(stat => {
        if (stat.label === "Volunteers") return { ...stat, value: stat.value + (Math.random() > 0.8 ? 1 : 0) };
        if (stat.label === "Reports") return { ...stat, value: stat.value + (Math.random() > 0.9 ? 1 : 0) };
        return stat;
      }));

      // Fluctuate Venues
      setVenueStatus(prev => prev.map(v => ({
        ...v,
        users: Math.max(10, v.users + Math.floor(Math.random() * 21) - 10),
        trend: Math.random() > 0.5 ? "up" : "down"
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper className="flex flex-col gap-6">
      <Header />
      
      <main className="grid grid-cols-12 grid-rows-6 gap-6 flex-1 min-h-[900px]">
        {/* Statistics Grid */}
        <div className="col-span-12 row-span-1 grid grid-cols-4 gap-6">
          {liveStats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bento-card p-6 flex items-center gap-6"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg", stat.color)}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-bento-dark italic tracking-tighter leading-none">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analytics Card */}
        <div className="col-span-8 row-span-5 bento-card p-10 space-y-10 flex flex-col bg-white">
          <div className="flex items-center justify-between">
             <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-bento-dark">Live Analytics</h3>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Real-time crowd movement tracking</p>
             </div>
             <div className="flex gap-2">
                <button className="px-4 py-2 bg-bento-bg rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Hourly</button>
                <button className="px-4 py-2 bg-bento-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Live</button>
             </div>
          </div>

          <div className="flex-1 bg-bento-bg rounded-[48px] p-10 flex items-end justify-between gap-4 border border-bento-border relative overflow-hidden group">
             <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
             {analyticsData.map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex-1 bg-bento-accent rounded-2xl opacity-80 hover:opacity-100 transition-all hover:scale-105 shadow-xl relative z-10"
                />
             ))}
          </div>
          
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-bento-border">
            {venueStatus.map((v) => (
              <div key={v.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black uppercase text-slate-400">{v.name}</p>
                  <span className={cn(
                    "text-[8px] font-black px-1.5 py-0.5 rounded uppercase",
                    v.status === "Crowded" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  )}>{v.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-black text-bento-dark italic">{v.users.toLocaleString()}</p>
                  <span className={cn(
                    "text-[10px] font-bold",
                    v.trend === "up" ? "text-green-500" : "text-red-500"
                  )}>
                    {v.trend === "up" ? "↑" : "↓"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between px-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
            <span>08:00 AM</span><span>12:00 PM</span><span>04:00 PM</span><span>08:00 PM</span>
          </div>
        </div>

        {/* Command Controls */}
        <div className="col-span-4 row-span-5 flex flex-col gap-6">
          <div className="bento-card bg-bento-dark p-8 flex flex-col flex-1 text-white space-y-8">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Command Unit</h3>
            <div className="grid gap-4 flex-1">
               <button className="w-full bg-white/5 border border-white/10 hover:bg-bento-accent hover:border-transparent p-6 rounded-3xl transition-all group flex items-start justify-between">
                  <div className="text-left space-y-1">
                    <p className="font-black italic uppercase tracking-tighter text-lg">Broadcast</p>
                    <p className="text-[10px] opacity-40 uppercase font-bold">Push to all 5,000+ users</p>
                  </div>
                  <Bell size={20} className="group-hover:animate-swing" />
               </button>
               <button className="w-full bg-white/5 border border-white/10 hover:bg-bento-accent hover:border-transparent p-6 rounded-3xl transition-all group flex items-start justify-between">
                  <div className="text-left space-y-1">
                    <p className="font-black italic uppercase tracking-tighter text-lg">Volunteer Ops</p>
                    <p className="text-[10px] opacity-40 uppercase font-bold">Manage 142 active units</p>
                  </div>
                  <Users size={20} />
               </button>
               <button className="w-full bg-white/5 border border-white/10 hover:bg-bento-accent hover:border-transparent p-6 rounded-3xl transition-all group flex items-start justify-between">
                  <div className="text-left space-y-1">
                    <p className="font-black italic uppercase tracking-tighter text-lg">Venue Lock</p>
                    <p className="text-[10px] opacity-40 uppercase font-bold">Emergency state override</p>
                  </div>
                  <AlertTriangle size={20} />
               </button>
            </div>
            <button 
              onClick={() => navigate('/results')}
              className="w-full bg-white text-bento-dark py-5 rounded-[28px] font-black uppercase text-xs tracking-widest hover:bg-bento-accent hover:text-white transition-all shadow-2xl"
            >
              Event Closing Ops
            </button>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

// Page 8: Results & Feedback
const ResultsPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper className="flex flex-col gap-6">
      <Header />
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10 }}
            className="w-32 h-32 bg-yellow-400 rounded-[48px] flex items-center justify-center text-white mx-auto shadow-2xl shadow-yellow-200"
          >
            <Trophy size={64} />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-6xl font-black text-bento-dark tracking-tighter uppercase italic leading-none">Hall of Fame</h1>
            <p className="text-slate-500 text-xl font-bold uppercase tracking-widest animate-pulse">VVCE Fest 2026 Concluded</p>
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-3">
          {[
             { place: "1st", team: "Binary Bandits", event: "Hackathon", dept: "CSE", color: "bg-bento-accent" },
             { place: "2nd", team: "Pixel Pushers", event: "UI Design", dept: "ISE", color: "bg-bento-dark" },
             { place: "3rd", team: "Mech Knights", event: "Robot Wars", dept: "ME", color: "bg-orange-600" },
           ].map((winner, i) => (
             <motion.div 
               key={winner.team}
               initial={{ y: 60, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: i * 0.2 }}
               className="bento-card group hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
             >
               <div className="p-10 space-y-6 relative overflow-hidden">
                 <div className="bg-bento-bg -m-10 p-10 mb-6 border-b border-bento-border relative overflow-hidden">
                   <div className={cn("absolute top-0 right-0 p-4 rounded-bl-3xl text-white font-black text-xs italic", winner.color)}>
                     {winner.place} PLACE
                   </div>
                   <div className="text-4xl font-black text-bento-primary opacity-10 absolute -bottom-4 -left-4">#0{i+1}</div>
                   <h3 className="text-3xl font-black text-bento-dark italic tracking-tighter leading-tight relative z-10">{winner.team}</h3>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{winner.event} Champion</span>
                     <span className="bg-bento-bg px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter text-bento-primary">{winner.dept} Dept</span>
                   </div>
                   <div className="flex gap-2">
                      <button className="flex-1 bg-bento-dark text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-bento-accent transition-all flex items-center justify-center gap-2">
                         <Download size={14} /> Certificate
                      </button>
                      <button className="px-4 border-2 border-bento-border rounded-xl text-bento-dark hover:border-bento-accent transition-all">
                         <Share2 size={16} />
                      </button>
                   </div>
                 </div>
               </div>
             </motion.div>
           ))}
        </section>

        <section className="bento-card bg-bento-dark p-16 text-white text-center space-y-10 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>
           <div className="space-y-4 relative z-10">
              <h3 className="text-4xl font-black italic uppercase tracking-tighter">Feedback Ceremony</h3>
              <p className="text-white/40 font-bold max-w-lg mx-auto leading-relaxed">Help us pioneer the next evolution of VVCE fests. Your experience dictates the blueprint for 2027.</p>
           </div>
           <div className="flex justify-center gap-4 relative z-10">
             {[1, 2, 3, 4, 5].map(star => (
               <motion.button 
                 key={star} 
                 whileHover={{ scale: 1.2, rotate: 10 }}
                 className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-yellow-400 hover:text-white transition-all shadow-xl"
               >
                 <Star size={32} />
               </motion.button>
             ))}
           </div>
           <button 
             onClick={() => navigate('/')}
             className="relative z-10 px-16 py-6 bg-bento-accent text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_-12px_rgba(37,99,235,0.5)]"
           >
             Finalize Fest Experience
           </button>
        </section>
      </div>

      <footer className="flex items-center justify-between py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
         <span>System Finalized: 4.25.26</span>
         <span className="text-bento-accent">Vidyavardhaka College OF Engineering</span>
      </footer>
    </PageWrapper>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/confirmation/:id" element={<ConfirmationPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/organizer" element={<OrganizerPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}
