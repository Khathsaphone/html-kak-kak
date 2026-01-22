document.addEventListener('DOMContentLoaded', () => {
    // get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // load products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // serch for product by ID
    const product = products.find(p => p.id == productId);

    if (product) {
        // not found

        // name of product
        document.getElementById('productName').innerText = product.name;

        // price
        document.getElementById('productPrice').innerText = `₭${parseInt(product.price).toLocaleString()}`;

        // translate category
        const categoryMap = {
            'watch': 'ໂມງ',
            'audio': 'ເຄື່ອງສຽງ',
            'headphone': 'ຫູຟັງ',
            'smart-home': 'ອຸປະກອນບ້ານ',
            'camera': 'ກ້ອງ',
            'gadget': 'ອຸປະກອນເສີມ',
            'shoe': 'ເກີບ'
        };
        // if category not found, show original value
        const categoryLao = categoryMap[product.category] || product.category;
        document.getElementById('productCategory').innerText = categoryLao;
        
        // description
        const descElement = document.getElementById('productDesc');
        if (descElement) {
            descElement.innerText = product.description || "ສິນຄ້າຄຸນນະພາບຈາກ GadgetPro ຮັບປະກັນສູນແທ້ 100% ພ້ອມບໍລິການຫຼັງການຂາຍທີ່ດີຢ້ຽມ.";
        }

        // manage images
        let images = [];
        if (Array.isArray(product.images) && product.images.length > 0) {
            images = product.images; // array of images
        } else {
            // if not an array, use single image (String)
            const defaultImg = 'https://via.placeholder.com/400?text=No+Image';
            images = [
                product.image || defaultImg,
                product.image || defaultImg,
                product.image || defaultImg
            ];
        }

        // main image
        document.getElementById('mainImg').src = images[0];
        
        // set images 
        document.getElementById('thumb1').src = images[0];
        document.getElementById('thumb2').src = images[1] || images[0]; 
        document.getElementById('thumb3').src = images[2] || images[0];

    } else {
        // no product found
        document.getElementById('productName').innerText = "ບໍ່ພົບສິນຄ້ານີ້";
        Swal.fire({
            icon: 'error',
            title: 'ຂໍອະໄພ',
            text: 'ບໍ່ພົບຂໍ້ມູນສິນຄ້ານີ້ ຫຼື ສິນຄ້າອາດຖືກລົບໄປແລ້ວ',
            confirmButtonText: 'ກັບຄືນ'
        }).then(() => {
            window.location.href = 'products.html';
        });
    }
});

// fade transition
function changeImage(src) {
    const mainImg = document.getElementById('mainImg');
    
    mainImg.style.opacity = 0;
    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = 1;
    }, 200);
}