// 1. Time Detection (Greeting)
function detectTime() {
    const hour = new Date().getHours();
    let greeting = "";
    let icon = "";
    let color = "";

    if (hour >= 5 && hour < 12) {
        greeting = "ສະບາຍດີຕອນເຊົ້າ";
        icon = "☀️";
        color = "text-yellow-500";
    } else if (hour >= 12 && hour < 18) {
        greeting = "ສະບາຍດີຕອນບ່າຍ";
        icon = "🌤️";
        color = "text-orange-400";
    } else {
        greeting = "ສະບາຍດີຕອນຄ່ຳ";
        icon = "🌙";
        color = "text-indigo-600";
    }

    const msgElement = document.getElementById('greetingMsg');
    if (msgElement) {
        msgElement.innerHTML = `
            <span class="animate__animated animate__fadeIn">
                ${icon} <span class="${color} font-bold">${greeting}!</span> ເລີ່ມຕົ້ນມື້ດີໆກັບ GadgetPro
            </span>
        `;
    }
}

// 2. Scroll Detection
function handleScroll() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-lg', 'py-2');
        nav.classList.remove('p-4');
    } else {
        nav.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-lg', 'py-2');
        nav.classList.add('p-4');
    }
}

// 3. Login Status Check 
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    const authSection = document.getElementById('authSection');

    if (isLoggedIn === 'true' && authSection) {
        authSection.innerHTML = `
            <div class="flex items-center gap-4 animate__animated animate__fadeInRight">
                <div class="flex flex-col items-end">
                    <span class="text-xs text-gray-400">ຍິນດີຕ້ອນຮັບ</span>
                    <span class="text-blue-600 font-bold">👤 ${username}</span>
                </div>
                <button onclick="handleLogout()" 
                    class="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-red-200 hover:scale-105 transition-transform active:scale-95">
                    ອອກຈາກລະບົບ
                </button>
            </div>
        `;
    }
}

// 4. Logout Function 
function handleLogout() {
    Swal.fire({
        title: 'ຢືນຢັນການອອກຈາກລະບົບ?',
        text: "ທ່ານຕ້ອງການອອກຈາກລະບົບແທ້ບໍ່?",
        icon: 'warning',
        showCancelButton: true,
        background: '#ffffff',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'ແມ່ນ, ອອກເລີຍ',
        cancelButtonText: 'ຍົກເລີກ',
        reverseButtons: true,
        showClass: { popup: 'animate__animated animate__fadeInUp' },
        hideClass: { popup: 'animate__animated animate__fadeOutDown' },
        customClass: { popup: 'rounded-3xl' }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'ອອກຈາກລະບົບສຳເລັດ!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#ffffff',
                customClass: { popup: 'rounded-3xl' }
            }).then(() => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.reload();
            });
        }
    });
}

// load product detail
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProductsContainer');
    if (!container) return;

    // get products from localStorage
    const storedProducts = localStorage.getItem('products');
    let products = [];

    if (storedProducts) {
        try {
            products = JSON.parse(storedProducts);
        } catch (e) {
            console.error("Error parsing products", e);
        }
    }

    // if no products, use sample data
    if (products.length === 0) {
        products = [
            {
                id: 1,
                name: "Smart Watch Pro Z",
                price: "2500000",
                images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800"],
                category: "watch"
            },
            {
                id: 2,
                name: "Premium Headphones",
                price: "1800000",
                images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800"],
                category: "audio"
            },
            {
                id: 3,
                name: "Smart Sound Home",
                price: "950000",
                images: ["https://images.unsplash.com/photo-1589003020619-47a696f863b1?q=80&w=800"],
                category: "smart-home"
            }
        ];
    }

    // latest 3 products
    const top3Products = products.slice(-3).reverse();

    // render products
    container.innerHTML = top3Products.map((product, index) => {

        // manage cover image
        let coverImage = "";
        if (Array.isArray(product.images) && product.images.length > 0) {
            coverImage = product.images[0];
        } else {
            coverImage = product.image || product.img || 'https://via.placeholder.com/400x300?text=No+Image';
        }

        // translate category
        const categoryMap = {
            'watch': 'ໂມງ',
            'audio': 'ເຄື່ອງສຽງ',
            'headphone': 'ຫູຟັງ',
            'smart-home': 'ອຸປະກອນບ້ານ',
            'camera': 'ກ້ອງ',
            'gadget': 'ອຸປະກອນເສີມ',
        };
        const categoryLao = categoryMap[product.category] || product.category;

        // manage price display
        let displayPrice = product.price;
        if (!isNaN(product.price)) {
            displayPrice = Number(product.price).toLocaleString();
        }

        // --- (Product Card) ---
        return `
        <div class="product-item group bg-white rounded-[2.5rem] p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative animate__animated animate__fadeInUp" style="animation-delay: ${index * 0.1}s">
            
            <div class="relative h-72 rounded-[2rem] overflow-hidden bg-gray-50 flex items-center justify-center mb-4">
                <span class="absolute top-4 left-4 bg-[#1e293b] backdrop-blur-md text-white text-[12px] font-bold px-3 py-1 rounded-full z-10 shadow-lg font-sans">
                    ${categoryLao}
                </span>

                <img src="${coverImage}" 
                    onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Image+Error';"
                    class="h-full w-full object-cover group-hover:scale-110 transition duration-700 ease-in-out">
            </div>
            
            <div class="px-2 pb-2">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-xl font-bold text-gray-900 truncate pr-2 font-sans">${product.name}</h3>
                    
                    <span class="bg-blue-50 text-blue-600 text-base font-bold px-3 py-1 rounded-lg whitespace-nowrap font-sans">
                        ₭${displayPrice}
                    </span>
                </div>
                
                <p class="text-gray-400 text-sm mb-6 line-clamp-1 font-light font-sans">
                    ໝວດໝູ່: ${categoryLao}
                </p>

                <a href="detail.html?id=${product.id}" 
                    class="block w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold text-center hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 active:scale-95 font-sans">
                    ເບິ່ງລາຍລະອຽດ
                </a>
            </div>
        </div>
        `;
    }).join('');
}

// start here
document.addEventListener('DOMContentLoaded', () => {
    detectTime();
    checkLoginStatus();
    loadFeaturedProducts();
    window.addEventListener('scroll', handleScroll);
});