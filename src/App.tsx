/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  User as UserIcon, 
  Stethoscope, 
  LogOut, 
  PlusCircle, 
  Calendar, 
  FileText, 
  Activity,
  ChevronRight,
  MapPin,
  Mail,
  UserCircle,
  Lock,
  ArrowRight
} from 'lucide-react';
import { storage } from './utils/storage';
import { User, UserRole, PatientProfile, DoctorProfile } from './types';
import { cn } from './lib/utils';

// --- Auth Component ---

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleManualAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUser = storage.getUser();
    if (isLogin) {
      if (existingUser) {
        navigate(existingUser.role === 'PATIENT' ? '/dashboard/patient' : '/dashboard/doctor');
      } else {
        alert("No profile found. Please Sign Up to create your profile.");
        setIsLogin(false);
      }
    } else {
      // Navigate to role selection for signup
      navigate('/landing');
    }
  };

  const handleGoogleLogin = () => {
    const existingUser = storage.getUser();
    if (existingUser) {
      navigate(existingUser.role === 'PATIENT' ? '/dashboard/patient' : '/dashboard/doctor');
    } else {
      navigate('/landing');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">MedVault</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Secure Health Infrastructure</p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-4 py-4 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-blue-200 transition-all mb-8 font-bold text-slate-700 shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300 tracking-[0.2em]">
            <span className="bg-white px-4">Secure Network Login</span>
          </div>
        </div>

        <form onSubmit={handleManualAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-5 top-5 text-slate-400" size={18} />
            <input 
              required
              type="email" 
              placeholder="Email ID"
              className="w-full p-5 pl-14 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none font-bold text-slate-900 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-5 top-5 text-slate-400" size={18} />
            <input 
              required
              type="password" 
              placeholder="Private Key"
              className="w-full p-5 pl-14 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none font-bold text-slate-900 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] uppercase tracking-widest text-xs"
          >
            {isLogin ? 'Initialize Session' : 'Create Vault'}
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-10 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">
          {isLogin ? "New to the network?" : "Security established?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-600 hover:underline"
          >
            {isLogin ? 'Register Now' : 'Login instead'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

// --- Landing / Role Select ---

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-lg shadow-blue-500/20">Identity Selection</span>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-[0.9]">Establish <br/>your role.</h1>
        <p className="text-slate-400 max-w-xs mx-auto font-bold uppercase text-[10px] tracking-widest leading-relaxed">Choose your clearance level <br/>to access the MedVault network.</p>
      </motion.div>

      <div className="grid w-full max-w-sm gap-4">
        {[
          { role: 'PATIENT', title: 'Patient', sub: 'Personal Health Records', icon: UserIcon, path: '/onboarding/patient' },
          { role: 'DOCTOR', title: 'Medical', sub: 'Clinician Workspace', icon: Stethoscope, path: '/onboarding/doctor' }
        ].map((item) => (
          <button 
            key={item.role}
            onClick={() => navigate(item.path)}
            className="group relative flex items-center justify-between p-8 bg-white border border-slate-200 rounded-[2.5rem] hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                <item.icon size={28} />
              </div>
              <div className="text-left">
                <span className="block text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{item.title}</span>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.sub}</span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500 bg-blue-50 p-2 rounded-xl text-blue-600">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const OnboardingPage = ({ role }: { role: UserRole }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    address: '',
    bloodGroup: 'O+',
    gender: 'Male',
    age: '',
    degree: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: 'vault_' + Math.random().toString(36).substr(2, 9),
      role,
      profile: role === 'PATIENT' ? {
        name: formData.name,
        email: formData.email,
        bloodGroup: formData.bloodGroup,
        gender: formData.gender,
        age: parseInt(formData.age),
        address: formData.address,
      } as PatientProfile : {
        name: formData.name,
        email: formData.email,
        degree: formData.degree,
        specialization: 'Qualified Physician',
        address: formData.address,
      } as DoctorProfile
    };
    storage.setUser(user);
    window.dispatchEvent(new Event('authChange'));
    navigate(role === 'PATIENT' ? '/dashboard/patient' : '/dashboard/doctor');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <button onClick={() => navigate('/landing')} className="font-black text-slate-300 text-[10px] tracking-[0.3em] mb-12 flex items-center gap-3 hover:text-slate-900 transition-colors uppercase">
           &larr; Switch Role
        </button>
        <h2 className="text-5xl font-black text-slate-900 mb-4 leading-[0.85] uppercase tracking-tighter">
          {role === 'PATIENT' ? 'Patient \nProfile' : 'Doctor \nRegistry'}
        </h2>
        <p className="text-slate-400 mb-12 font-bold uppercase text-[10px] tracking-widest leading-relaxed">Initialize your encrypted storage <br/>by verifying your identity.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] ml-2">Display Name</label>
            <input 
              required
              type="text" 
              placeholder="Full Name"
              className="w-full p-5 bg-white border border-slate-200 rounded-3xl focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] ml-2">Network Email</label>
            <input 
              required
              type="email" 
              placeholder="email@access.com"
              className="w-full p-5 bg-white border border-slate-200 rounded-3xl focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {role === 'PATIENT' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] ml-2">Age</label>
                  <input 
                    required
                    type="number" 
                    placeholder="25"
                    className="w-full p-5 bg-white border border-slate-200 rounded-3xl focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] ml-2">Life Group</label>
                  <select 
                    className="w-full p-5 bg-white border border-slate-200 rounded-3xl focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-black text-slate-900 appearance-none cursor-pointer"
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                  <div className="absolute right-6 bottom-6 pointer-events-none text-slate-400">
                    <ChevronRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] ml-2">Gender Biology</label>
                <div className="flex gap-3">
                  {['Male', 'Female', 'Other'].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({...formData, gender: g})}
                      className={cn(
                        "flex-1 p-5 rounded-3xl border text-[10px] font-black transition-all uppercase tracking-widest",
                        formData.gender === g ? "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-900/20" : "bg-white text-slate-400 border-slate-200"
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] ml-2">Medical Credentials</label>
              <input 
                required
                type="text" 
                placeholder="e.g. MBBS, FRCS"
                className="w-full p-5 bg-white border border-slate-200 rounded-3xl focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                value={formData.degree}
                onChange={(e) => setFormData({...formData, degree: e.target.value})}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] ml-2">Primary Address</label>
            <textarea 
              required
              rows={3}
              placeholder="Physical Jurisdiction Access"
              className="w-full p-5 bg-white border border-slate-200 rounded-[2rem] focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 resize-none shadow-sm shadow-slate-50"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-[0.2em] text-[11px]"
          >
            Establish Connection
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- Dashboard Logic ---

const DashboardLayout = ({ children, user, onLogout }: { children: React.ReactNode, user: User, onLogout: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-32 lg:pb-0 lg:pl-80">
      <aside className="hidden lg:flex flex-col w-80 h-full fixed left-0 top-0 bg-white border-r border-slate-100 p-10">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-slate-900 rounded-[1.25rem] flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-slate-900 tracking-tighter">MedVault</span>
        </div>

        <nav className="flex-1 space-y-4">
          {[
            { label: 'Network Root', icon: Activity, active: true },
            { label: 'Schedule', icon: Calendar },
            { label: 'Vault Data', icon: FileText },
            { label: 'Identity', icon: UserCircle }
          ].map(link => (
            <div key={link.label} className={cn(
              "p-5 rounded-3xl flex items-center gap-5 font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer",
              link.active ? "bg-blue-600 text-white shadow-2xl shadow-blue-600/20" : "text-slate-300 hover:bg-slate-50 hover:text-slate-900"
            )}>
              <link.icon size={18} /> {link.label}
            </div>
          ))}
        </nav>

        <div className="pt-10 border-t border-slate-50">
          <div className="bg-slate-50 p-5 rounded-3xl flex items-center gap-4 mb-6 shadow-inner">
            <div className="w-12 h-12 bg-white rounded-3xl flex items-center justify-center border border-slate-100 overflow-hidden shrink-0 shadow-sm">
               <UserCircle className="text-slate-200" />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tighter leading-none mb-1">{user.profile.name}</p>
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <p className="text-[9px] text-emerald-600 font-black uppercase tracking-[0.2em]">{user.role}</p>
               </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-5 text-red-500 hover:bg-red-50 rounded-3xl transition-all text-[10px] font-black uppercase tracking-[0.3em] border border-transparent hover:border-red-100"
          >
            <LogOut size={16} /> Termination
          </button>
        </div>
      </aside>

      <main className="p-8 lg:p-16 max-w-6xl mx-auto">
        <header className="flex lg:hidden items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/10">
              <Shield className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-2xl tracking-tighter">MedVault</span>
          </div>
          <button onClick={onLogout} className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-red-500 shadow-sm">
            <LogOut size={20} />
          </button>
        </header>
        {children}
      </main>

      <nav className="lg:hidden fixed bottom-10 left-8 right-8 h-24 bg-slate-900/90 backdrop-blur-2xl rounded-[3rem] flex items-center justify-around px-8 shadow-2xl shadow-slate-900/30 z-50">
        <button className="text-white bg-blue-600 p-4 rounded-[1.5rem] shadow-xl shadow-blue-500/20"><Activity size={24} /></button>
        <button className="text-slate-400"><Calendar size={24} /></button>
        <div className="relative -mt-24">
          <button className="w-20 h-20 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl shadow-slate-900/40 active:scale-90 transition-transform ring-8 ring-slate-900/5">
            <PlusCircle size={36} />
          </button>
        </div>
        <button className="text-slate-400"><FileText size={24} /></button>
        <button className="text-slate-400"><UserCircle size={24} /></button>
      </nav>
    </div>
  );
};

const PatientDashboard = ({ user }: { user: User }) => {
  const profile = user.profile as PatientProfile;
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-slate-900/20">
               {profile.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2 inline-block">Authorized Profile</span>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">{profile.name}</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mt-4"><Mail size={12} className="text-blue-500" /> {profile.email}</p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-6 items-center md:items-end">
             <div className="px-8 py-3 bg-red-600 text-white text-2xl font-black rounded-3xl shadow-2xl shadow-red-600/30 items-center justify-center flex">
               {profile.bloodGroup}
             </div>
             <div className="text-right">
                <p className="text-[11px] text-slate-900 font-black uppercase tracking-[0.2em] leading-none mb-1">{profile.age} Years</p>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{profile.gender} Biological</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-[2rem] text-slate-500 font-bold text-xs mt-10 shadow-inner">
           <MapPin size={18} className="text-blue-600 shrink-0" /> <span className="truncate uppercase tracking-tight">{profile.address}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:gap-10">
        <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl shadow-slate-900/20 group hover:-translate-y-2 transition-all duration-500">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-10 text-emerald-400 group-hover:scale-110 transition-transform">
            <Activity size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-white/40">Cardiac Rhythm</p>
          <p className="text-5xl font-black text-white tracking-tighter leading-none">72 <span className="text-lg font-black text-white/20 uppercase tracking-[0.2em] ml-2">bpm</span></p>
        </div>
        <div className="bg-blue-600 p-10 rounded-[3.5rem] shadow-2xl shadow-blue-600/20 group hover:-translate-y-2 transition-all duration-500">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-10 text-white group-hover:scale-110 transition-transform">
            <Activity size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-white/60">Blood Force</p>
          <p className="text-5xl font-black text-white tracking-tighter leading-none">120<span className="text-white/30 tracking-tight">/</span>80</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-20 pt-10 border-t border-slate-100">
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Scheduled Events</h3>
        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 hover:underline">Manage All</button>
      </div>

      <div className="grid gap-6">
        {[
          { name: 'Dr. Sarah Johnson', role: 'Radiology Expert', time: '10:30 AM', color: 'blue' },
          { name: 'Dr. Alan Miller', role: 'Cardiac Registry', time: '02:15 PM', color: 'slate' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                <Stethoscope size={32} />
              </div>
              <div className="text-left">
                <p className="text-xl font-black text-slate-900 tracking-tighter leading-none group-hover:text-blue-600 transition-colors uppercase mb-2">{item.name}</p>
                <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-[0.2em] flex items-center gap-2">
                  {item.role} <span className="w-1 h-1 rounded-full bg-slate-200"></span> <span className="text-blue-600">{item.time}</span>
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-2">
              <ChevronRight size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DoctorDashboard = ({ user }: { user: User }) => {
  const profile = user.profile as DoctorProfile;
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-100/50 relative overflow-hidden">
        <div className="flex items-center gap-10 mb-10">
          <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-500/30">
             {profile.name.charAt(0)}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2 inline-block">Chief Professional</span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8] mb-4">{profile.name}</h2>
            <div className="flex items-center gap-3">
               <span className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">{profile.specialization}</span>
               <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg uppercase tracking-widest">{profile.degree}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] text-slate-400 font-bold text-xs shadow-inner">
           <MapPin size={18} className="text-blue-600 shrink-0" /> <span className="truncate uppercase tracking-tight">{profile.address}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-16 pb-6 border-b border-slate-100">
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Clinical Queue</h3>
        <div className="flex items-center gap-3">
          <div className="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-xl shadow-blue-600/20">8 Pending</div>
          <div className="px-6 py-2.5 bg-white text-slate-400 text-[10px] font-black rounded-2xl uppercase tracking-widest border border-slate-100">Filtered</div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {[
          { name: 'Michael Chen', issue: 'Chronic Inflammation', time: '09:00', status: 'Active', pulse: '88' },
          { name: 'Emma Wilson', issue: 'Post-Op Review', time: '10:15', status: 'Waiting', pulse: '72' },
          { name: 'Robert Fox', issue: 'Cardiac Evaluation', time: '11:00', status: 'Scheduled', pulse: '64' },
          { name: 'Jenny Kim', issue: 'Neuroscreen', time: '12:30', status: 'Scheduled', pulse: '70' },
        ].map((patient, i) => (
          <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500 cursor-pointer group relative overflow-hidden">
             <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black text-white bg-slate-900 px-5 py-2 rounded-full uppercase tracking-[0.3em]">{patient.time}</span>
                <div className="w-12 h-12 flex items-center justify-center text-slate-200 group-hover:text-blue-600 group-hover:translate-x-2 transition-all">
                   <ChevronRight size={24} />
                </div>
             </div>
             <p className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tighter leading-none mb-3">{patient.name}</p>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-8">{patient.issue}</p>
             
             <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                <div className="flex items-center gap-3">
                   <div className={cn(
                     "w-2.5 h-2.5 rounded-full",
                     patient.status === 'Active' ? "bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" : patient.status === 'Waiting' ? "bg-orange-500" : "bg-slate-200"
                   )}></div>
                   <span className="text-[9px] font-black uppercase text-slate-900 tracking-widest">{patient.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600">
                   <Activity size={14} />
                   <span className="text-lg font-black tracking-tight">{patient.pulse}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- App Root ---

export default function App() {
  const [user, setUser] = useState<User | null>(storage.getUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(storage.getUser());
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    storage.clearAuth();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            user ? (
              <Navigate to={user.role === 'PATIENT' ? '/dashboard/patient' : '/dashboard/doctor'} />
            ) : (
              <LoginPage />
            )
          } />
          
          <Route path="/landing" element={user ? <Navigate to="/" /> : <LandingPage />} />
          <Route path="/onboarding/patient" element={<OnboardingPage role="PATIENT" />} />
          <Route path="/onboarding/doctor" element={<OnboardingPage role="DOCTOR" />} />

          <Route 
            path="/dashboard/patient" 
            element={
              user?.role === 'PATIENT' ? (
                <DashboardLayout user={user} onLogout={handleLogout}>
                   <PatientDashboard user={user} />
                </DashboardLayout>
              ) : <Navigate to="/" />
            } 
          />

          <Route 
            path="/dashboard/doctor" 
            element={
              user?.role === 'DOCTOR' ? (
                <DashboardLayout user={user} onLogout={handleLogout}>
                   <DoctorDashboard user={user} />
                </DashboardLayout>
              ) : <Navigate to="/" />
            } 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
