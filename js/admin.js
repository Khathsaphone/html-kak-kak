document.addEventListener('DOMContentLoaded', () => {
    // check login status
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
    loadProducts();
});

// load products from localStorage and display in table
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tbody = document.getElementById('productTableBody');
    const emptyState = document.getElementById('emptyState');

    tbody.innerHTML = '';

    if (products.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    products.forEach((p, index) => {
        let mainImg = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (p.image || 'https://via.placeholder.com/100?text=No+Img');
        
        const row = `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100 last:border-0">
                <td class="p-4">
                    <div class="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                        <img src="${mainImg}" class="w-full h-full object-cover">
                    </div>
                </td>
                <td class="p-4">
                    <div class="font-bold text-slate-800 text-base">${p.name}</div>
                    <div class="text-xs text-slate-400">ID: ${p.id}</div>
                </td>
                <td class="p-4">
                    <span class="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        ${p.category}
                    </span>
                </td>
                <td class="p-4 font-bold text-slate-700">
                    ₭${parseInt(p.price).toLocaleString()}
                </td>
                <td class="p-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="viewProduct(${index})" class="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition flex items-center justify-center shadow-sm" title="ເບິ່ງລາຍລະອຽດ">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button onclick="editProduct(${index})" class="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition flex items-center justify-center shadow-sm" title="ແກ້ໄຂ">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="deleteProduct(${index})" class="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition flex items-center justify-center shadow-sm" title="ລຶບ">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// function to convert image to base64
function convertImage(input, previewId, urlInputId) {
    const file = input.files[0];
    if (file) {
        //if file size > 500KB, show error
        if (file.size > 500000) {
            Swal.fire({
                icon: 'error',
                title: 'ໄຟລ໌ໃຫຍ່ເກີນໄປ!',
                text: 'ກະລຸນາໃຊ້ຮູບຂະໜາດບໍ່ເກີນ 500KB ຫຼື ໃຊ້ URL ແທນ',
                confirmButtonColor: '#ef4444'
            });
            input.value = ''; // clear the input
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const base64 = e.target.result;
            // 1. show preview image
            const preview = document.getElementById(previewId);
            preview.src = base64;
            preview.classList.remove('hidden');
            
            // base64 to input field
            document.getElementById(urlInputId).value = base64;
        };
        reader.readAsDataURL(file);
    }
}

// manage modal edit/add product
function openModal(mode, index = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('modalTitle');
    const editInput = document.getElementById('editIndex');

    // clear previous previews
    ['img1Preview', 'img2Preview', 'img3Preview'].forEach(id => {
        const el = document.getElementById(id);
        el.src = '';
        el.classList.add('hidden');
    });

    modal.classList.remove('hidden');

    if (mode === 'add') {
        form.reset();
        title.innerHTML = '<i class="fa-solid fa-plus text-blue-600"></i> <span>ເພີ່ມສິນຄ້າໃໝ່</span>';
        editInput.value = '-1';
    } else if (mode === 'edit') {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const p = products[index];

        title.innerHTML = '<i class="fa-solid fa-pen-to-square text-yellow-500"></i> <span>ແກ້ໄຂສິນຄ້າ</span>';
        editInput.value = index;

        document.getElementById('pName').value = p.name;
        document.getElementById('pPrice').value = p.price;
        document.getElementById('pCategory').value = p.category;
        document.getElementById('pDesc').value = p.description || '';

        // insert images into preview and url inputs
        let imgs = Array.isArray(p.images) ? p.images : [p.image];
        
        const setImg = (urlId, previewId, url) => {
            const input = document.getElementById(urlId);
            const preview = document.getElementById(previewId);
            input.value = url || '';
            if (url) {
                preview.src = url;
                preview.classList.remove('hidden');
            }
        };

        setImg('img1Url', 'img1Preview', imgs[0]);
        setImg('img2Url', 'img2Preview', imgs[1]);
        setImg('img3Url', 'img3Preview', imgs[2]);
    }
}

function closeModal() {
    document.getElementById('productModal').classList.add('hidden');
}

// save product (add or edit)
function saveProduct(event) {
    event.preventDefault();

    const index = document.getElementById('editIndex').value;
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // get image URLs from inputs
    const img1 = document.getElementById('img1Url').value;
    const img2 = document.getElementById('img2Url').value;
    const img3 = document.getElementById('img3Url').value;

    const newProduct = {
        id: index == '-1' ? Date.now() : products[index].id,
        name: document.getElementById('pName').value,
        price: document.getElementById('pPrice').value,
        category: document.getElementById('pCategory').value,
        description: document.getElementById('pDesc').value,
        images: [img1, img2, img3].filter(url => url !== "")
    };

    try {
        if (index == '-1') {
            products.push(newProduct);
        } else {
            products[index] = newProduct;
        }

        localStorage.setItem('products', JSON.stringify(products));
        closeModal();
        loadProducts();
        
        Swal.fire({
            icon: 'success',
            title: 'ສຳເລັດ!',
            text: 'ຂໍ້ມູນສິນຄ້າຖືກບັນທຶກຮຽບຮ້ອຍແລ້ວ',
            confirmButtonColor: '#3b82f6'
        });

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'ຄວາມຈຳເຕັມ!',
            text: 'ຮູບພາບມີຂະໜາດໃຫຍ່ເກີນໄປ ກະລຸນາໃຊ້ URL ຫຼື ຫຼຸດຂະໜາດຮູບ',
            confirmButtonColor: '#ef4444'
        });
        console.error(e);
    }
}

// view product details in modal
function viewProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const p = products[index];
    const modal = document.getElementById('viewModal');

    let imgs = Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || 'https://via.placeholder.com/400'];
    
    document.getElementById('viewName').innerText = p.name;
    document.getElementById('viewCategory').innerText = p.category;
    document.getElementById('viewPrice').innerText = `₭${parseInt(p.price).toLocaleString()}`;
    document.getElementById('viewDesc').innerText = p.description || "ບໍ່ມີລາຍລະອຽດ";

    document.getElementById('viewMainImg').src = imgs[0];
    document.getElementById('viewThumb1').src = imgs[0];
    document.getElementById('viewThumb2').src = imgs[1] || imgs[0];
    document.getElementById('viewThumb3').src = imgs[2] || imgs[0];

    document.getElementById('viewThumb2').style.display = imgs[1] ? 'block' : 'none';
    document.getElementById('viewThumb3').style.display = imgs[2] ? 'block' : 'none';

    modal.classList.remove('hidden');
}

function closeViewModal() {
    document.getElementById('viewModal').classList.add('hidden');
}

function swapViewImg(src) {
    document.getElementById('viewMainImg').src = src;
}

// edit product in modal
function editProduct(index) {
    openModal('edit', index);
}

function deleteProduct(index) {
    Swal.fire({
        title: 'ຢືນຢັນການລົບ?',
        text: "ທ່ານຕ້ອງການລົບສິນຄ້ານີ້ແທ້ບໍ່? (ກູ້ຄືນບໍ່ໄດ້)",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#94a3b8',
        confirmButtonText: 'ລົບເລີຍ!',
        cancelButtonText: 'ຍົກເລີກ',
        customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
        if (result.isConfirmed) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
            Swal.fire('ລົບສຳເລັດ!', 'ສິນຄ້າຖືກລົບອອກຈາກລະບົບແລ້ວ', 'success');
        }
    });
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}