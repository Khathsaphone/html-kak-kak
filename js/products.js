document.addEventListener('DOMContentLoaded', () => {
    // LOAD PRODUCTS FROM LOCALSTORAGE
    let products = JSON.parse(localStorage.getItem('products')) || [];
    renderProducts(products);
    
    updateWishlistBadge();
});

function renderProducts(items) {
    const grid = document.getElementById('productsContainer');
    
    if (!grid) {
        console.error("ຫາ id='productsContainer' ບໍ່ເຫັນ ກະລຸນາກວດສອບໄຟລ໌ HTML");
        return;
    }

    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20">
                <p class="text-xl text-gray-400 font-bold">ບໍ່ພົບສິນຄ້າ...</p>
            </div>
        `;
        return;
    }

    items.forEach(product => {
        // -----------------------------------------------------------
        // 1. cover image
        // -----------------------------------------------------------
        let coverImage = "";
        if (Array.isArray(product.images) && product.images.length > 0) {
            coverImage = product.images[0]; 
        } else {
            coverImage = product.image || 'https://via.placeholder.com/400x400?text=No+Image';
        }

        // -----------------------------------------------------------
        // translate category
        // -----------------------------------------------------------
        const categoryMap = {
            'watch': 'ໂມງ',
            'audio': 'ເຄື່ອງສຽງ',
            'headphone': 'ຫູຟັງ',
            'smart-home': 'ອຸປະກອນບ້ານ',
            'camera': 'ກ້ອງ',
            'gadget': 'ອຸປະກອນເສີມ',
            'shoe': 'ເກີບ'
        };
        const categoryLao = categoryMap[product.category] || product.category;
        
        // -----------------------------------------------------------
        // manage price display
        // -----------------------------------------------------------
        let displayPrice = "0";
        if(product.price) {
            displayPrice = parseInt(product.price).toLocaleString();
        }

        // -----------------------------------------------------------
        // product card template
        // -----------------------------------------------------------
        // 🔴 แก้ไข: ลบ font-sans ออกທັງໝົດ เพื่อให้ใช้ฟอนต์ Noto Sans Lao จาก HTML
        const card = `
            <div class="product-item group bg-white rounded-[2.5rem] p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative h-full flex flex-col" data-category="${product.category}">
                
                <div class="relative h-72 rounded-[2rem] overflow-hidden bg-gray-50 flex items-center justify-center mb-4">
                    <span class="absolute top-4 left-4 bg-[#1e293b] backdrop-blur-md text-white text-[12px] font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                        ${categoryLao}
                    </span>

                    <button onclick="toggleHeart(this)" class="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm hover:text-red-500 text-gray-400 transition transform hover:scale-110 z-20">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>

                    <img src="${coverImage}" 
                        onerror="this.src='https://via.placeholder.com/400x400?text=Error'"
                        class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out">
                </div>

                <div class="px-2 pb-2 flex-grow flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="text-xl font-bold text-gray-900 truncate pr-2">${product.name}</h3>
                            <span class="bg-blue-50 text-blue-600 text-base font-bold px-3 py-1 rounded-lg whitespace-nowrap">
                                ₭${displayPrice}
                            </span>
                        </div>
                        
                        <p class="text-gray-400 text-sm mb-6 line-clamp-1 font-light">
                            ໝວດໝູ່: ${categoryLao}
                        </p>
                    </div>
                    
                    <a href="detail.html?id=${product.id}" class="block w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold text-center hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 active:scale-95">
                        ເບິ່ງລາຍລະອຽດ
                    </a>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// -----------------------------------------------------------
// search and filter functions
// -----------------------------------------------------------

function searchProduct(text) {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
    renderProducts(filtered);
}

function filterProducts(category, btnElement) {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    let filtered = (category === 'all') ? allProducts : allProducts.filter(p => p.category === category);
    renderProducts(filtered);

    if(btnElement) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white', 'shadow-lg');
            btn.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-200');
        });
        btnElement.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-200');
        btnElement.classList.add('bg-blue-600', 'text-white', 'shadow-lg');
    }
}

let wishlistCount = 0;
function toggleHeart(btn) {
    const isLiked = btn.classList.contains('text-red-500');
    if (isLiked) {
        btn.classList.remove('text-red-500');
        btn.classList.add('text-gray-400');
        wishlistCount = Math.max(0, wishlistCount - 1);
    } else {
        btn.classList.remove('text-gray-400');
        btn.classList.add('text-red-500');
        wishlistCount++;
    }
    updateWishlistBadge();
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlistCount');
    if(badge) {
        if (wishlistCount > 0) {
            badge.innerText = wishlistCount;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

function showWishlistAlert() {
    Swal.fire({
        icon: 'info',
        title: 'ລາຍການທີ່ຖືກໃຈ',
        text: `ທ່ານມີສິນຄ້າທີ່ຖືກໃຈທັງໝົດ ${wishlistCount} ລາຍການ`,
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'ຕົກລົງ'
    });
}