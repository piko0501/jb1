// Load images from localStorage
function loadAccountImages() {
    const savedImages = localStorage.getItem('accountImages');
    return savedImages ? JSON.parse(savedImages) : {};
}

function saveAccountImages(images) {
    localStorage.setItem('accountImages', JSON.stringify(images));
}

// Load QR code from localStorage
function loadQRCode() {
    return localStorage.getItem('paymentQRCode') || null;
}

function saveQRCode(qrCodeData) {
    localStorage.setItem('paymentQRCode', qrCodeData);
}

// Initialize account images
let accountImages = loadAccountImages();
let paymentQRCode = loadQRCode();

// Sample game accounts data
const gameAccounts = [
    {
        id: 1,
        title: "Mobile Legends - Mythic Glory",
        category: "mobile",
        image: "🎮",
        price: 250000,
        level: "Level 100",
        rank: "Mythic Glory",
        heroes: "80+ Heroes",
        skins: "150+ Skins",
        description: "Akun Mobile Legends dengan rank Mythic Glory, memiliki 80+ heroes dan 150+ skins eksklusif. Akun aman dengan email recovery tersedia."
    },
    {
        id: 2,
        title: "PUBG Mobile - Conqueror",
        category: "mobile",
        image: "🔫",
        price: 300000,
        level: "Level 70",
        rank: "Conqueror",
        skins: "100+ Outfits",
        items: "Premium Items",
        description: "Akun PUBG Mobile dengan rank Conqueror, dilengkapi dengan berbagai outfit dan item premium. Season pass aktif."
    },
    {
        id: 3,
        title: "Genshin Impact - AR 60",
        category: "mobile",
        image: "⚔️",
        price: 500000,
        level: "AR 60",
        characters: "40+ Characters",
        weapons: "50+ 5-Star Weapons",
        description: "Akun Genshin Impact Adventure Rank 60, memiliki banyak karakter 5-star dan weapon langka. Spiral Abyss cleared."
    },
    {
        id: 4,
        title: "Free Fire - Heroic",
        category: "mobile",
        image: "💣",
        price: 200000,
        level: "Level 50",
        rank: "Heroic",
        characters: "30+ Characters",
        items: "Rare Items",
        description: "Akun Free Fire dengan rank Heroic, memiliki banyak karakter dan item langka. Akun stabil dan aman."
    },
    {
        id: 5,
        title: "Valorant - Radiant",
        category: "pc",
        image: "🎯",
        price: 400000,
        level: "Level 100",
        rank: "Radiant",
        agents: "All Agents",
        skins: "Premium Skins",
        description: "Akun Valorant dengan rank Radiant, semua agent unlocked dan dilengkapi dengan skin premium. Prime collection included."
    },
    {
        id: 6,
        title: "CS:GO - Global Elite",
        category: "pc",
        image: "🔫",
        price: 350000,
        level: "Level 40",
        rank: "Global Elite",
        items: "Rare Skins",
        medals: "Achievement Badges",
        description: "Akun CS:GO dengan rank Global Elite, memiliki skin langka dan berbagai achievement. Prime status aktif."
    },
    {
        id: 7,
        title: "Call of Duty Mobile - Legendary",
        category: "mobile",
        image: "🎖️",
        price: 280000,
        level: "Level 150",
        rank: "Legendary",
        operators: "All Operators",
        weapons: "Maxed Weapons",
        description: "Akun COD Mobile dengan rank Legendary, semua operator unlocked dan weapon sudah di-upgrade maksimal."
    },
    {
        id: 8,
        title: "Fortnite - Chapter 5",
        category: "pc",
        image: "🏗️",
        price: 320000,
        level: "Level 200",
        skins: "150+ Skins",
        vbucks: "5000 V-Bucks",
        description: "Akun Fortnite dengan banyak skin eksklusif dan V-Bucks. Battle pass season terbaru sudah dibeli."
    },
    {
        id: 9,
        title: "Apex Legends - Predator",
        category: "pc",
        image: "🏹",
        price: 380000,
        level: "Level 500",
        rank: "Predator",
        legends: "All Legends",
        skins: "Heirloom Items",
        description: "Akun Apex Legends dengan rank Predator, semua legend unlocked dan memiliki heirloom items langka."
    },
    {
        id: 10,
        title: "Clash of Clans - TH 15",
        category: "mobile",
        image: "🏰",
        price: 450000,
        level: "TH 15 Max",
        trophies: "5000+ Trophies",
        heroes: "All Max Heroes",
        description: "Akun Clash of Clans Town Hall 15 maksimal, semua hero dan building sudah di-upgrade maksimal."
    },
    {
        id: 11,
        title: "FIFA Mobile - 120 OVR",
        category: "mobile",
        image: "⚽",
        price: 220000,
        level: "OVR 120",
        players: "Prime Icons",
        coins: "50M+ Coins",
        description: "Akun FIFA Mobile dengan overall 120, memiliki banyak Prime Icon players dan coins melimpah."
    },
    {
        id: 12,
        title: "Wild Rift - Challenger",
        category: "mobile",
        image: "⚔️",
        price: 270000,
        level: "Level 40",
        rank: "Challenger",
        champions: "All Champions",
        skins: "100+ Skins",
        description: "Akun League of Legends: Wild Rift dengan rank Challenger, semua champion unlocked dan banyak skin."
    }
];

// DOM Elements
const accountsGrid = document.getElementById('accountsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const accountModal = document.getElementById('accountModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');

// Format currency to Rupiah
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Upload account image
function uploadAccountImage(accountId, file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Silakan pilih file gambar yang valid!');
        return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 5MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        accountImages[accountId] = e.target.result;
        saveAccountImages(accountImages);
        displayAccounts(getFilteredAccounts());
        // Show success notification
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; z-index: 3000; box-shadow: 0 4px 12px rgba(0,0,0,0.3); animation: slideIn 0.3s ease;';
        successMsg.textContent = '✅ Foto akun berhasil diubah!';
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => successMsg.remove(), 300);
        }, 2000);
    };
    reader.onerror = function() {
        alert('Error membaca file! Silakan coba lagi.');
    };
    reader.readAsDataURL(file);
}

// Display accounts
function displayAccounts(accounts) {
    if (accounts.length === 0) {
        accountsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">🔍</div>
                <h3>Tidak ada akun yang ditemukan</h3>
                <p>Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
        `;
        return;
    }

    accountsGrid.innerHTML = accounts.map(account => {
        const accountImage = accountImages[account.id];
        return `
        <div class="account-card" data-id="${account.id}">
            <div class="account-image-container">
                ${accountImage 
                    ? `<img src="${accountImage}" alt="${account.title}" class="account-image">`
                    : `<div class="account-image-placeholder">${account.image}</div>`
                }
                <div class="image-upload-overlay">
                    <input type="file" 
                           accept="image/*" 
                           class="image-upload-input" 
                           id="imageUpload-${account.id}"
                           onchange="uploadAccountImage(${account.id}, this.files[0])">
                    <button class="image-upload-btn" onclick="document.getElementById('imageUpload-${account.id}').click()">
                        📷 Ganti Foto
                    </button>
                </div>
            </div>
            <span class="account-category">${getCategoryName(account.category)}</span>
            <h3 class="account-title">${account.title}</h3>
            <div class="account-details">
                ${account.level ? `<span>📊 ${account.level}</span>` : ''}
                ${account.rank ? `<span>🏆 ${account.rank}</span>` : ''}
                ${account.heroes ? `<span>👤 ${account.heroes}</span>` : ''}
                ${account.characters ? `<span>👤 ${account.characters}</span>` : ''}
                ${account.agents ? `<span>👤 ${account.agents}</span>` : ''}
                ${account.legends ? `<span>👤 ${account.legends}</span>` : ''}
                ${account.champions ? `<span>👤 ${account.champions}</span>` : ''}
                ${account.skins ? `<span>🎨 ${account.skins}</span>` : ''}
            </div>
            <div class="account-price">${formatCurrency(account.price)}</div>
            <div class="account-actions">
                <button class="btn btn-primary" onclick="viewAccount(${account.id})">Detail</button>
                <button class="btn btn-secondary" onclick="buyAccount(${account.id})">Beli</button>
            </div>
        </div>
    `;
    }).join('');
}

// Get filtered accounts for display
function getFilteredAccounts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortFilter.value;

    let filtered = gameAccounts.filter(account => {
        const matchesSearch = account.title.toLowerCase().includes(searchTerm) ||
                             account.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || account.category === category;
        return matchesSearch && matchesCategory;
    });

    // Sort accounts
    switch (sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        default:
            break;
    }

    return filtered;
}

// Get category name in Indonesian
function getCategoryName(category) {
    const categories = {
        'mobile': 'Mobile Game',
        'pc': 'PC Game',
        'console': 'Console Game'
    };
    return categories[category] || category;
}

// Filter and sort accounts
function filterAndSortAccounts() {
    displayAccounts(getFilteredAccounts());
}

// View account details
function viewAccount(id) {
    const account = gameAccounts.find(acc => acc.id === id);
    if (!account) return;

    const accountImage = accountImages[account.id];

    modalBody.innerHTML = `
        <div class="modal-details">
            <div class="modal-image-container" style="text-align: center; margin-bottom: 1.5rem;">
                ${accountImage 
                    ? `<img src="${accountImage}" alt="${account.title}" style="max-width: 100%; max-height: 300px; border-radius: 15px; margin-bottom: 1rem;">`
                    : `<div style="font-size: 5rem; margin-bottom: 1rem;">${account.image}</div>`
                }
                <span class="account-category">${getCategoryName(account.category)}</span>
                <div class="modal-image-upload">
                    <input type="file" 
                           accept="image/*" 
                           class="modal-image-upload-input" 
                           id="modalImageUpload-${account.id}"
                           onchange="uploadAccountImage(${account.id}, this.files[0]); viewAccount(${account.id});">
                    <button class="modal-image-upload-btn" onclick="document.getElementById('modalImageUpload-${account.id}').click()">
                        📷 Ganti Foto Akun
                    </button>
                </div>
            </div>
            <h2>${account.title}</h2>
            <div class="modal-price">${formatCurrency(account.price)}</div>
            <p style="margin-bottom: 1.5rem; line-height: 1.8;">${account.description}</p>
            <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Detail Akun:</h3>
            <div class="account-details" style="margin-bottom: 1.5rem;">
                ${account.level ? `<p>📊 <strong>Level:</strong> ${account.level}</p>` : ''}
                ${account.rank ? `<p>🏆 <strong>Rank:</strong> ${account.rank}</p>` : ''}
                ${account.heroes ? `<p>👤 <strong>Heroes:</strong> ${account.heroes}</p>` : ''}
                ${account.characters ? `<p>👤 <strong>Characters:</strong> ${account.characters}</p>` : ''}
                ${account.agents ? `<p>👤 <strong>Agents:</strong> ${account.agents}</p>` : ''}
                ${account.legends ? `<p>👤 <strong>Legends:</strong> ${account.legends}</p>` : ''}
                ${account.champions ? `<p>👤 <strong>Champions:</strong> ${account.champions}</p>` : ''}
                ${account.operators ? `<p>👤 <strong>Operators:</strong> ${account.operators}</p>` : ''}
                ${account.skins ? `<p>🎨 <strong>Skins/Items:</strong> ${account.skins}</p>` : ''}
                ${account.weapons ? `<p>⚔️ <strong>Weapons:</strong> ${account.weapons}</p>` : ''}
                ${account.items ? `<p>🎁 <strong>Items:</strong> ${account.items}</p>` : ''}
                ${account.trophies ? `<p>🏆 <strong>Trophies:</strong> ${account.trophies}</p>` : ''}
                ${account.coins ? `<p>💰 <strong>Coins:</strong> ${account.coins}</p>` : ''}
                ${account.vbucks ? `<p>💎 <strong>V-Bucks:</strong> ${account.vbucks}</p>` : ''}
                ${account.medals ? `<p>🎖️ <strong>Medals:</strong> ${account.medals}</p>` : ''}
                ${account.players ? `<p>👥 <strong>Players:</strong> ${account.players}</p>` : ''}
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn btn-primary" style="flex: 1;" onclick="buyAccount(${account.id})">Beli Sekarang</button>
                <button class="btn btn-secondary" onclick="closeModal()">Tutup</button>
            </div>
        </div>
    `;
    accountModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Upload QR Code
function uploadQRCode(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Silakan pilih file gambar QR code yang valid!');
        return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 5MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        paymentQRCode = e.target.result;
        saveQRCode(paymentQRCode);
        // Refresh QR modal to show uploaded image
        setTimeout(() => {
            showQRCode();
            // Show success message briefly
            const qrModalBody = document.getElementById('qrModalBody');
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; z-index: 3000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
            successMsg.textContent = '✅ QR Code berhasil diupload!';
            document.body.appendChild(successMsg);
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        }, 100);
    };
    reader.onerror = function() {
        alert('Error membaca file! Silakan coba lagi.');
    };
    reader.readAsDataURL(file);
}

// Show QR Code Modal
function showQRCode() {
    const qrModal = document.getElementById('qrModal');
    const qrModalBody = document.getElementById('qrModalBody');
    const account = gameAccounts.find(acc => acc.id === currentBuyingAccountId);
    
    if (!account) return;

    let qrContent = `
        <div class="qr-code-container">
            <h2 class="qr-code-title">Pembayaran</h2>
            <p class="qr-code-subtitle">Scan QR code di bawah untuk melakukan pembayaran</p>
            <div class="qr-code-wrapper">
    `;

    if (paymentQRCode) {
        // Display uploaded QR code image
        qrContent += `<img src="${paymentQRCode}" alt="QR Code Pembayaran" class="qr-uploaded-image">`;
    } else {
        // Generate QR code from payment URL or default message
        const paymentUrl = `https://wa.me/6281234567890?text=Pembayaran%20untuk%20${encodeURIComponent(account.title)}%20-%20${account.price}`;
        qrContent += `<canvas id="qrCanvas"></canvas>`;
    }

    qrContent += `
            </div>
            <div class="qr-code-info">
                <h3>Informasi Pembayaran</h3>
                <p><strong>Produk:</strong> ${account.title}</p>
                <p><strong>Total Pembayaran:</strong> ${formatCurrency(account.price)}</p>
                <p style="margin-top: 1rem; color: var(--accent-color); font-weight: 600;">
                    Setelah melakukan pembayaran, kirim bukti transfer melalui WhatsApp
                </p>
            </div>
            <div class="qr-upload-section">
                <label class="qr-upload-label">Upload QR Code Pembayaran:</label>
                <input type="file" 
                       accept="image/*" 
                       class="qr-upload-input" 
                       id="qrUploadInput"
                       onchange="uploadQRCode(this.files[0])">
                <button class="qr-upload-btn" onclick="document.getElementById('qrUploadInput').click()">
                    📷 Upload QR Code
                </button>
            </div>
        </div>
    `;

    qrModalBody.innerHTML = qrContent;

    // Generate QR code if no uploaded image
    if (!paymentQRCode) {
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            const canvas = document.getElementById('qrCanvas');
            if (canvas && typeof QRCode !== 'undefined') {
                const paymentUrl = `https://wa.me/6281234567890?text=Pembayaran%20untuk%20${encodeURIComponent(account.title)}%20-%20${formatCurrency(account.price)}`;
                QRCode.toCanvas(canvas, paymentUrl, {
                    width: 300,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                }, function (error) {
                    if (error) {
                        console.error('Error generating QR code:', error);
                        // Show message to upload QR code instead
                        const qrWrapper = document.querySelector('.qr-code-wrapper');
                        if (qrWrapper) {
                            qrWrapper.innerHTML = `
                                <p style="color: var(--text-secondary); padding: 2rem;">
                                    Silakan upload QR code pembayaran Anda menggunakan tombol di bawah
                                </p>
                            `;
                        }
                    }
                });
            } else if (!canvas) {
                // If canvas doesn't exist, show message to upload QR code
                const qrWrapper = document.querySelector('.qr-code-wrapper');
                if (qrWrapper) {
                    qrWrapper.innerHTML = `
                        <p style="color: var(--text-secondary); padding: 2rem;">
                            Silakan upload QR code pembayaran Anda menggunakan tombol di bawah
                        </p>
                    `;
                }
            }
        }, 100);
    }

    qrModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close QR Modal
function closeQRModal() {
    const qrModal = document.getElementById('qrModal');
    qrModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Current buying account ID
let currentBuyingAccountId = null;

// Buy account
function buyAccount(id) {
    const account = gameAccounts.find(acc => acc.id === id);
    if (!account) return;

    currentBuyingAccountId = id;
    closeModal();
    showQRCode();
}

// Close modal
function closeModal() {
    accountModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
searchInput.addEventListener('input', filterAndSortAccounts);
categoryFilter.addEventListener('change', filterAndSortAccounts);
sortFilter.addEventListener('change', filterAndSortAccounts);

modalClose.addEventListener('click', closeModal);

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const accountModal = document.getElementById('accountModal');
    const qrModal = document.getElementById('qrModal');
    
    if (e.target === accountModal) {
        closeModal();
    }
    if (e.target === qrModal) {
        closeQRModal();
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.');
    contactForm.reset();
});

// Initialize
displayAccounts(gameAccounts);

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.account-card, .feature-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

