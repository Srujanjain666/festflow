import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
import { useState } from 'react';

// --- Components & Layouts ---

const PageWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={cn("min-h-screen w-full relative overflow-hidden", className)}
  >
    {children}
  </motion.div>
);

const Navbar = ({ dark = false }: { dark?: boolean }) => {
  const navigate = useNavigate();
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4",
      dark ? "text-white" : "text-gray-900"
    )}>
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
        <span className="font-bold text-xl tracking-tight">FestFlow</span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/notifications')} className="p-2 rounded-full hover:bg-black/10 transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-black/10 transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
};

// --- Pages ---

// Page 1: Splash / Welcome
const SplashPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper className="flex flex-col justify-end bg-black">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop" 
          alt="VVCE Campus" 
          className="w-full h-full object-cover opacity-60 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>
      
      <div className="relative z-10 p-8 pb-16 space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <span className="text-white/60 uppercase tracking-[0.3em] text-xs font-semibold">Vidyavardhaka College OF Engineering</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
            VVCE<br />FestFlow
          </h1>
          <p className="text-white/70 text-lg max-w-sm font-light">
            Managing 5000+ participants during VVCE fests seamlessly with real-time analytics.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-3"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group lg:w-fit lg:px-12"
          >
            <User size={20} />
            Login as Student
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex gap-3 lg:w-fit">
            <button 
              onClick={() => navigate('/organizer')}
              className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 lg:px-8 px-4"
            >
              <ShieldCheck size={18} />
              Organizer
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 lg:px-8 px-4">
              <GraduationCap size={18} />
              Faculty
            </button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

// Page 2: Event Registration Dashboard
const DashboardPage = () => {
  const navigate = useNavigate();
  const categories = ["Technical", "Cultural", "Sports", "Workshops"];
  const events = [
    { id: 1, name: "Hackathon 2026", time: "10:00 AM", venue: "Seminar Hall 1", slots: "12/50", category: "Technical", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, name: "Dance Faceoff", time: "02:00 PM", venue: "Main Stage", slots: "Full", category: "Cultural", image: "https://images.unsplash.com/photo-1514525253344-76240346a3ef?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, name: "Cricket League", time: "08:00 AM", venue: "Football Ground", slots: "5/11", category: "Sports", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop" },
  ];

  return (
    <PageWrapper className="bg-gray-50 pt-24 pb-12 px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Event Dashboard</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for events..." 
              className="w-full bg-white border border-gray-200 py-3.5 pl-12 pr-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold whitespace-nowrap hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {events.map((event, idx) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => navigate('/confirmation')}
            >
              <div className="relative h-48">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {event.category}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
                  <div className="flex items-center gap-3 text-gray-500 text-sm mt-1">
                    <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Slots Left</span>
                    <span className="font-bold text-blue-600">{event.slots}</span>
                  </div>
                  <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all">
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </PageWrapper>
  );
};

// Page 3: QR Confirmation
const ConfirmationPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper className="bg-blue-600 pt-24 pb-12 px-6 flex flex-col items-center justify-center">
      <Navbar dark />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-white rounded-[40px] p-8 space-y-8 shadow-2xl"
      >
        <div className="text-center space-y-1">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
            <CheckCircle2 size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Registration confirmed!</h2>
          <p className="text-gray-500 text-sm">Event: Hackathon 2026</p>
        </div>

        <div className="bg-gray-100 rounded-3xl p-6 flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-inner">
            <QrCode size={180} className="text-gray-900" />
          </div>
          <p className="text-xs font-mono font-bold text-gray-400">PID: VVCE-2026-X8412</p>
        </div>

        <div className="grid gap-3 pt-4">
          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
            <Download size={18} /> Download Pass
          </button>
          <button className="w-full border-2 border-gray-100 hover:border-gray-200 text-gray-600 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
            <Share2 size={18} /> Share
          </button>
        </div>
      </motion.div>
      <button 
        onClick={() => navigate('/map')}
        className="mt-8 text-white/80 font-bold flex items-center gap-2 hover:text-white transition-colors"
      >
        <MapIcon size={18} /> View Event Map
      </button>
    </PageWrapper>
  );
};

// Page 4: Live Event Map
const MapPage = () => {
  const navigate = useNavigate();
  const locations = [
    { name: "Auditorium", x: 20, y: 30, active: true },
    { name: "Main Stage", x: 70, y: 50, active: true },
    { name: "Canteen", x: 40, y: 80, active: false },
    { name: "Parking", x: 80, y: 10, active: false }
  ];

  return (
    <PageWrapper className="bg-gray-900 overflow-hidden">
      <Navbar dark />
      <div className="absolute inset-0 pt-20">
        <div className="relative w-full h-full bg-blue-900/20">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Campus Map"
            referrerPolicy="no-referrer"
          />
          
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="absolute cursor-pointer group"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onClick={() => navigate('/notifications')}
            >
              <div className="relative">
                <div className={cn(
                  "w-4 h-4 rounded-full animate-ping absolute inset-0",
                  loc.active ? "bg-red-500" : "bg-blue-500"
                )} />
                <div className={cn(
                  "w-4 h-4 rounded-full relative z-10",
                  loc.active ? "bg-red-500" : "bg-blue-500"
                )} />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-gray-900">{loc.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] space-y-4">
        <div className="flex items-center justify-between text-white">
          <h3 className="text-xl font-bold">Campus Navigator</h3>
          <span className="bg-red-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase animate-pulse">LIVE</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["Shortest Route", "Crowd Density", "Help Desk"].map(item => (
              <button key={item} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold text-white border border-white/10 whitespace-nowrap">
                {item}
              </button>
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};

// Page 5: Notifications
const NotificationsPage = () => {
  const navigate = useNavigate();
  const alerts = [
    { id: 1, title: "Event Delay", message: "Dance Faceoff is delayed by 15 mins due to technical issues.", time: "2 min ago", type: "warning" },
    { id: 2, title: "Venue Change", message: "Hackathon moved to Diamond Jubilee block Hall 4.", time: "10 min ago", type: "info" },
    { id: 3, title: "Winner Alert!", message: "Congratulations to CS Dept for winning Code-Sprint!", time: "1 hour ago", type: "success" },
  ];

  return (
    <PageWrapper className="bg-white pt-24 pb-12 px-6">
      <Navbar />
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Alerts</h2>
          <button className="text-blue-600 text-sm font-bold">Mark all read</button>
        </header>

        <div className="space-y-4">
          {alerts.map((alert, idx) => (
            <motion.div 
              key={alert.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-5 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                  alert.type === 'warning' ? "bg-orange-100 text-orange-600" :
                  alert.type === 'info' ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                )}>
                  {alert.type === 'warning' ? <AlertTriangle size={20} /> : 
                   alert.type === 'info' ? <Bell size={20} /> : <CheckCircle2 size={20} />}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{alert.title}</h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{alert.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/attendance')}
          className="w-full mt-12 bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
        >
          Go to Attendance Portal
        </button>
      </div>
    </PageWrapper>
  );
};

// Page 6: Attendance Tracking (Organizer)
const AttendancePage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper className="bg-gray-50 pt-24 pb-12 px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none italic">Gate Monitor</h2>
            <p className="text-gray-500 font-medium">Scanning: Main Auditorium North Entry</p>
          </div>
          <div className="hidden sm:flex gap-3">
             <div className="bg-blue-600 text-white p-4 rounded-2xl flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase opacity-80">Checked In</span>
                <span className="text-2xl font-black">4200</span>
             </div>
             <div className="bg-white border border-gray-200 p-4 rounded-2xl flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase text-gray-400">Target</span>
                <span className="text-2xl font-black text-gray-900">5000</span>
             </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 flex flex-col items-center justify-center space-y-6 shadow-sm">
              <div className="w-full aspect-square bg-gray-900 rounded-3xl flex flex-col items-center justify-center text-white space-y-4 relative overflow-hidden">
                <QrCode size={120} className="relative z-10 opacity-80" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] relative z-10 text-center">Scan Participant Pass</p>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all hover:scale-[0.98]">
                Start Camera
              </button>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-gray-100 space-y-6 shadow-sm overflow-hidden flex flex-col">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 underline decoration-blue-500 decoration-4 underline-offset-4">Recent Entries</h3>
              <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
                {[
                  { name: "Arjun Kumar", dept: "CSE", time: "14:22:04" },
                  { name: "Priya Rao", dept: "ISE", time: "14:21:44" },
                  { name: "Samarth V", dept: "ECE", time: "14:21:12" },
                  { name: "Lekha M", dept: "MECH", time: "14:20:55" },
                  { name: "Rahul S", dept: "CIVIL", time: "14:20:30" },
                ].map((entry, idx) => (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-xs">
                        {entry.name[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{entry.name}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{entry.dept} Dept</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-blue-600">{entry.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
        </section>

        <button 
          onClick={() => navigate('/organizer')}
          className="w-full mt-12 bg-white border border-gray-200 text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
        >
          <ShieldCheck size={18} /> Admin Dashboard
        </button>
      </div>
    </PageWrapper>
  );
};

// Page 7: Organizer Control Panel
const OrganizerPage = () => {
  const navigate = useNavigate();
  const stats = [
    { label: "Volunteers", value: "142", icon: Users },
    { label: "Venues", value: "12", icon: MapPin },
    { label: "Reports", value: "24", icon: AlertTriangle },
    { label: "Live Events", value: "8", icon: Calendar },
  ];

  return (
    <PageWrapper className="bg-gray-100 pt-24 pb-12 px-6">
      <Navbar />
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none italic">Command Center</h2>
            <p className="text-gray-500 font-medium">VVCE Fest 2026 Admin Portal</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-100">
              <AlertTriangle size={18} /> Global Alert
            </button>
            <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-200 shadow-sm">
              Reports
            </button>
          </div>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[32px] border border-gray-200 shadow-sm flex flex-col items-center justify-center space-y-2 text-center"
            >
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-blue-600">
                <stat.icon size={20} />
              </div>
              <span className="text-3xl font-black text-gray-900">{stat.value}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-200 p-8 space-y-6 shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Crowd Analytics <span className="bg-green-100 text-green-600 text-[10px] px-2 py-1 rounded-full">+12% vs last year</span>
            </h3>
            <div className="h-64 bg-gray-50 rounded-3xl flex items-end justify-between p-6 gap-2">
               {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="flex-1 bg-blue-600 rounded-t-xl opacity-80 hover:opacity-100 transition-opacity" 
                  />
               ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-400 p-2 uppercase tracking-widest">
              <span>9AM</span><span>12PM</span><span>3PM</span><span>6PM</span><span>9PM</span>
            </div>
          </div>

          <div className="bg-gray-900 rounded-[40px] p-8 space-y-6 text-white shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">Quick Actions</h3>
              <div className="grid gap-3">
                <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between group transition-all">
                  <span className="font-bold text-sm">Assign Volunteers</span>
                  <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between group transition-all">
                  <span className="font-bold text-sm">Update Venues</span>
                  <Settings size={18} />
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between group transition-all">
                  <span className="font-bold text-sm">Winner Approval</span>
                  <Trophy size={18} />
                </button>
              </div>
            </div>
            <button 
              onClick={() => navigate('/results')}
              className="w-full bg-blue-600 py-4 rounded-2xl font-bold shadow-2xl shadow-blue-500/20"
            >
              Post Event Results
            </button>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

// Page 8: Results & Feedback
const ResultsPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper className="bg-white pt-24 pb-12 px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-24 h-24 bg-yellow-400 rounded-[32px] flex items-center justify-center text-white mx-auto shadow-xl shadow-yellow-100"
          >
            <Trophy size={48} />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">Hall of Fame</h1>
            <p className="text-gray-500 text-lg font-medium">VVCE Fest 2026 Concluded</p>
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-3">
          {[
            { place: "1st", team: "Binary Bandits", event: "Hackathon", dept: "CSE", color: "bg-blue-600" },
            { place: "2nd", team: "Pixel Pushers", event: "UI Design", dept: "ISE", color: "bg-gray-800" },
            { place: "3rd", team: "Mech Knights", event: "Robot Wars", dept: "ME", color: "bg-orange-600" },
          ].map((winner, i) => (
            <motion.div 
              key={winner.team}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="relative p-8 rounded-[40px] border border-gray-200 overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="space-y-4 relative z-10">
                <span className={cn("inline-block px-3 py-1 rounded-full text-white text-[10px] font-black uppercase", winner.color)}>
                  {winner.place} Place
                </span>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{winner.team}</h3>
                  <p className="text-sm font-bold text-gray-400 italic">{winner.event}</p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                  <span className="text-[10px] font-black uppercase text-gray-900">{winner.dept} DEPT</span>
                  <button className="p-2 bg-gray-100 rounded-full">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="bg-gray-900 rounded-[40px] p-10 text-white space-y-8 text-center relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h3 className="text-3xl font-bold">Feedback Ceremony</h3>
            <p className="text-white/60">Share your experience to help us improve the next year!</p>
          </div>
          <div className="flex justify-center gap-3 relative z-10">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} className="p-4 bg-white/10 rounded-2xl hover:bg-yellow-400 hover:text-white transition-all">
                <Star size={32} />
              </button>
            ))}
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full md:w-fit px-12 py-4 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-sm relative z-10"
          >
            Wrap Up Fest
          </button>
        </section>
      </div>
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
          <Route path="/confirmation" element={<ConfirmationPage />} />
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
