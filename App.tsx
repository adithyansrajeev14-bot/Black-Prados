import React, { useState } from 'react';

// Types & Interfaces
interface GalleryPhoto {
  id: number;
  category: 'training' | 'daycare' | 'grooming';
  title: string;
  url: string;
}

interface Booking {
  user: string;
  service: string;
  price: number;
  method: string;
}

export default function App() {
  // Application State
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'gallery' | 'login' | 'dashboard'>('home');
  const [currentRole, setCurrentRole] = useState<'visitor' | 'user' | 'admin'>('visitor');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<{ name: string; price: number } | null>(null);
  
  // Dynamic Content States
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([
    { id: 1, category: 'training', title: 'Obedience Leash Focus', url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600' },
    { id: 2, category: 'daycare', title: 'Group Yard Agility Runs', url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600' },
    { id: 3, category: 'grooming', title: 'Sleek Undercoat Blowouts', url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600' }
  ]);

  // Form Inputs States
  const [inputUrl, setInputUrl] = useState('');
  const [inputCategory, setInputCategory] = useState<'training' | 'daycare' | 'grooming'>('training');

  // Authentication Handlers
  const handleLogin = (role: 'user' | 'admin', email: string) => {
    setCurrentRole(role);
    setLoggedInUser(email);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentRole('visitor');
    setLoggedInUser(null);
    setCurrentPage('home');
  };

  // Gallery Management
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;
    
    const newPhoto: GalleryPhoto = {
      id: Date.now(),
      category: inputCategory,
      title: `System Deployment Area (#${Math.floor(1000 + Math.random() * 9000)})`,
      url: inputUrl
    };
    
    setGalleryPhotos([newPhoto, ...galleryPhotos]);
    setInputUrl('');
  };

  const handleDeletePhoto = (id: number) => {
    setGalleryPhotos(galleryPhotos.filter(photo => photo.id !== id));
  };

  // Checkout Handling
  const handleProcessGPay = () => {
    if (!selectedService) return;
    
    const newBooking: Booking = {
      user: loggedInUser || 'Walk-In Guest Ledger',
      service: selectedService.name,
      price: selectedService.price,
      method: 'G-Pay Network Token'
    };

    setBookings([...bookings, newBooking]);
    setTotalRevenue(prev => prev + selectedService.price);
    setSelectedService(null);
    setCurrentPage(loggedInUser ? 'dashboard' : 'home');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 antialiased font-sans selection:bg-yellow-500 selection:text-slate-950">
      
      {/* ─── NAVIGATION HEADER ─── */}
      <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-yellow-600/20">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img src="unnamed_2.jpg" alt="Logo" className="h-14 w-14 object-contain rounded-lg border border-yellow-600/30" />
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg tracking-wider text-white uppercase">BLACK PRADOS K9</span>
              <span className="text-[10px] tracking-widest font-bold text-yellow-500 uppercase">From Wild to Wise</span>
            </div>
          </div>
          <div className="flex space-x-3 items-center text-sm font-semibold">
            <button onClick={() => setCurrentPage('home')} className={`px-3 py-2 transition ${currentPage === 'home' ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}`}>Home</button>
            <button onClick={() => setCurrentPage('services')} className={`px-3 py-2 transition ${currentPage === 'services' ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}`}>Services</button>
            <button onClick={() => setCurrentPage('gallery')} className={`px-3 py-2 transition ${currentPage === 'gallery' ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}`}>Gallery</button>
            
            <button 
              onClick={() => setCurrentPage(currentRole !== 'visitor' ? 'dashboard' : 'login')} 
              className="bg-gradient-to-b from-fde047 to-ca8a04 text-slate-950 px-5 py-2 rounded-xl font-black transition transform active:scale-95 border border-yellow-300"
            >
              {currentRole === 'visitor' ? 'Login' : currentRole === 'admin' ? 'Admin Hub' : 'Dashboard'}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── PAGE RENDERING MATRIX ─── */}
      <main>
        
        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <section className="relative min-h-[calc(100vh-5rem)] flex items-center">
            <div className="absolute inset-0 opacity-15 bg-center bg-no-repeat bg-contain pointer-events-none" style={{ backgroundImage: "url('unnamed_2.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-12 gap-12 items-center w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-yellow-600/30 rounded-full py-1.5 px-4 text-xs font-bold text-yellow-400">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
                  <span>Forged In Care. Built For Results.</span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-black text-white leading-tight">
                  BLACK PRADOS K9:<br />
                  <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">FROM WILD TO WISE.</span>
                </h1>
                <p class="text-slate-300 text-lg max-w-xl">Elite K9 conditioning protocols, active day care frameworks, and luxury boarding options built around behavioral discipline.</p>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setCurrentPage('services')} className="bg-gradient-to-b from-yellow-300 to-yellow-600 text-slate-950 px-6 py-3.5 rounded-xl font-black">Book with G-Pay</button>
                  <button onClick={() => setCurrentPage('gallery')} className="bg-slate-900/80 border border-slate-700 px-6 py-3.5 rounded-xl font-bold">Explore Media</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SERVICES SECTION */}
        {currentPage === 'services' && (
          <section className="py-16 max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-3xl font-black text-center mb-12 uppercase">Elite K9 Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'K9 Obedience Training', price: 120, desc: 'Obedience logic & reactive tuning.' },
                { name: 'Premium Day Care', price: 45, desc: 'Social structures and monitored playing.' },
                { name: 'Luxury Boarding Suite', price: 90, desc: 'Climate-controlled overnight safety.' },
                { name: 'Spa & Grooming', price: 75, desc: 'Precision aesthetic health care cleans.' }
              ].map((srv, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-yellow-600/40 transition">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{srv.name}</h3>
                    <p className="text-xs text-slate-400 mb-6">{srv.desc}</p>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white mb-4">${srv.price}<span className="text-[10px] text-slate-500"> / unit</span></div>
                    <button onClick={() => setSelectedService(srv)} className="w-full bg-slate-800 hover:bg-slate-700 py-2 rounded-xl text-xs font-bold transition">Book Package</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GALLERY SECTION (WITH CONTROL SYSTEM HOOKS) */}
        {currentPage === 'gallery' && (
          <section className="py-16 max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-3xl font-black text-center mb-10 uppercase">Media Gallery</h2>

            {/* Admin Asset Posting Engine Viewport */}
            {currentRole === 'admin' && (
              <div className="mb-12 max-w-3xl mx-auto p-6 bg-gradient-to-b from-slate-900 to-slate-950 border border-yellow-600/40 rounded-2xl">
                <h3 className="text-yellow-400 font-bold mb-4 text-sm uppercase flex items-center gap-2">
                  <i className="fa-solid fa-cloud-arrow-up"></i> Admin Media Dispatch Panel
                </h3>
                <form onSubmit={handleAddPhoto} className="grid sm:grid-cols-12 gap-4">
                  <input type="url" placeholder="Image Link Address URL" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} required className="sm:col-span-6 bg-slate-950 border border-slate-800 rounded-xl px-4 text-xs text-white outline-none focus:border-yellow-500" />
                  <select value={inputCategory} onChange={(e: any) => setInputCategory(e.target.value)} className="sm:col-span-3 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-slate-300 outline-none">
                    <option value="training">Training</option>
                    <option value="daycare">Day Care</option>
                    <option value="grooming">Grooming</option>
                  </select>
                  <button type="submit" className="sm:col-span-3 bg-gradient-to-b from-yellow-300 to-yellow-600 text-slate-950 font-black text-xs uppercase py-2.5 rounded-xl">Publish</button>
                </form>
              </div>
            )}

            {/* Filter Submenu */}
            <div className="flex justify-center gap-2 mb-10">
              {['all', 'training', 'daycare', 'grooming'].map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2 rounded-xl text-xs font-bold uppercase transition ${activeFilter === cat ? 'bg-slate-900 border border-yellow-600/40 text-yellow-400' : 'bg-slate-950 border border-slate-800 text-slate-400'}`}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Output Matrix layout */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryPhotos.filter(p => activeFilter === 'all' || p.category === activeFilter).map(photo => (
                <div key={photo.id} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 h-64">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-5 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">{photo.category}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{photo.title}</h4>
                    </div>
                    {currentRole === 'admin' && (
                      <button onClick={() => handleDeletePhoto(photo.id)} className="bg-red-500/20 hover:bg-red-500 border border-red-500/40 text-white p-2 rounded-xl transition">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LOGIN TERMINAL SECTION */}
        {currentPage === 'login' && (
          <section className="py-16 px-4 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-yellow-600/20">
              <h2 className="font-serif text-xl font-bold uppercase text-center mb-6">Client Portal</h2>
              <button onClick={() => handleLogin('user', 'client.auth@gmail.com')} className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-sm mb-4">Sign in with Google</button>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-yellow-600/20">
              <h2 className="font-serif text-xl font-bold uppercase text-center mb-6">Admin Control</h2>
              <button onClick={() => handleLogin('admin', 'admin@blackprados.com')} className="w-full py-3 bg-gradient-to-b from-yellow-300 to-yellow-600 text-slate-950 font-black rounded-xl text-sm tracking-wide">Verify Admin Access</button>
            </div>
          </section>
        )}

        {/* SECURE DASHBOARDS GRID */}
        {currentPage === 'dashboard' && (
          <section className="py-16 px-4 max-w-5xl mx-auto">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-6 flex justify-between items-center">
              <div>
                <h2 className="font-serif text-xl font-black uppercase text-white">{currentRole === 'admin' ? 'Root Administration' : 'Client Cloud Terminal'}</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">{loggedInUser}</p>
              </div>
              <button onClick={handleLogout} className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl hover:bg-red-500/20 transition">Log Out</button>
            </div>

            {currentRole === 'admin' ? (
              <div className="space-y-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-yellow-600/20 w-48">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Gross Revenue</p>
                  <p className="text-3xl font-black text-yellow-400 tracking-tight mt-1">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-xs">
                  <h3 className="font-bold text-sm text-slate-300 mb-4">Master Operations Ledger</h3>
                  {bookings.length === 0 ? <p className="text-slate-500">No transactions recorded.</p> : (
                    <div className="space-y-2">
                      {bookings.map((b, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-800 pb-2 text-slate-300">
                          <span>{b.user} — <b>{b.service}</b></span>
                          <span className="text-emerald-400 font-bold">${b.price}.00 Captured</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-xs">
                <h3 className="font-bold text-sm text-slate-300 mb-4">Your Dynamic Schedules</h3>
                {bookings.filter(b => b.user === loggedInUser).length === 0 ? <p className="text-slate-500">No active bookings found.</p> : (
                  <div className="space-y-2">
                    {bookings.filter(b => b.user === loggedInUser).map((b, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-800">
                        <div>
                          <p className="font-bold text-white text-sm">{b.service}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Dispatched via {b.method}</p>
                        </div>
                        <span className="bg-slate-800 text-yellow-400 border border-yellow-600/20 px-3 py-1 rounded-xl text-[10px]">Settled</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

      </main>

      {/* ─── ENCRYPTED CHECKOUT OVERLAY DIALOG ─── */}
      {selectedService && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-yellow-600/20 shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300">G-Pay Secure Checkout</h3>
              <button onClick={() => setSelectedService(null)} className="text-slate-500 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Selected Protocol</p>
              <p className="font-bold text-white text-base mt-0.5">{selectedService.name}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Total Bill Matrix</p>
              <p className="font-black text-yellow-400 text-3xl mt-0.5">${selectedService.price}.00</p>
            </div>
            <button onClick={handleProcessGPay} className="w-full bg-white hover:bg-slate-100 text-slate-950 py-3.5 rounded-xl flex items-center justify-center space-x-2 font-black text-sm tracking-wide shadow-xl transition active:scale-95">
              <i className="fa-brands fa-google-pay text-3xl"></i>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
