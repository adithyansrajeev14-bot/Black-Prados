/**
 * Black Prados K9 Core Application Engine Object
 * Tracks view matrices, admin protocols, and real-time app events
 */
function k9App() {
    return {
        currentPage: 'home',
        currentRole: 'visitor',
        loggedInUser: null,
        activeFilter: 'all',
        selectedService: null,
        totalRevenue: 0,
        inputUrl: '',
        inputCategory: 'training',
        bookings: [],
        
        // Hardcoded catalog structures
        servicesList: [
            { name: 'K9 Obedience Training', price: 120, desc: 'Obedience logic & reactive tuning.' },
            { name: 'Premium Day Care', price: 45, desc: 'Social structures and monitored playing.' },
            { name: 'Luxury Boarding Suite', price: 90, desc: 'Climate-controlled overnight safety.' },
            { name: 'Spa & Grooming', price: 75, desc: 'Precision aesthetic health care cleans.' }
        ],
        
        galleryPhotos: [
            { id: 1, category: 'training', title: 'Obedience Leash Focus', url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600' },
            { id: 2, category: 'daycare', title: 'Group Yard Agility Runs', url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600' },
            { id: 3, category: 'grooming', title: 'Sleek Undercoat Blowouts', url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600' }
        ],

        // Core App Functions
        handleLogin(role, email) {
            this.currentRole = role;
            this.loggedInUser = email;
            this.currentPage = 'dashboard';
        },

        handleLogout() {
            this.currentRole = 'visitor';
            this.loggedInUser = null;
            this.currentPage = 'home';
        },

        handleAddPhoto() {
            if (!this.inputUrl) return;
            
            this.galleryPhotos.unshift({
                id: Date.now(),
                category: this.inputCategory,
                title: 'System Deployment Area (#' + Math.floor(1000 + Math.random() * 9000) + ')',
                url: this.inputUrl
            });
            
            this.inputUrl = ''; // Clean field input tracking
        },

        handleDeletePhoto(id) {
            this.galleryPhotos = this.galleryPhotos.filter(p => p.id !== id);
        },

        handleProcessGPay() {
            if (!this.selectedService) return;

            this.bookings.push({
                user: this.loggedInUser || 'Walk-In Guest Ledger',
                service: this.selectedService.name,
                price: this.selectedService.price,
                method: 'G-Pay Network Token'
            });

            this.totalRevenue += this.selectedService.price;
            this.selectedService = null;
            
            // Redirect routing rules
            this.currentPage = this.loggedInUser ? 'dashboard' : 'home';
        }
    }
}
