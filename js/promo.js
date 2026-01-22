// check user privilege for special promo
function checkPrivilege() {
    Swal.fire({
        title: '<h2 style="color:#06c755; font-family:Noto Sans Lao; font-size:1.5rem;">ສິດທິພິເສດສຳລັບທ່ານ</h2>',
        html: `
            <div style="margin-top:15px; text-align:center;">
                <img src="https://cdn-icons-png.flaticon.com/512/893/893268.png" 
                     style="width:80px; margin-bottom:20px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">
                
                <p style="font-size:1rem; color:#475569; font-family:Noto Sans Lao; line-height:1.6;">
                    ສິດທິພິເສດສຳລັບລູກຄ້າທີ່ຖືບັດເຄຣດິດທີ່ຮ່ວມລາຍການ<br>
                    ກະລຸນາຕິດຕໍ່ເຈົ້າໜ້າທີ່ຜ່ານ <b style="color:#06c755; font-weight:bold;">LINE Official</b><br>
                    ເພື່ອຮັບລະຫັດສ່ວນຫຼຸດເພີ່ມຕື່ມ
                </p>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: '<i class="fa-brands fa-line" style="margin-right:5px;"></i> ຕິດຕໍ່ຜ່ານ LINE',
        cancelButtonText: 'ປິດໜ້າຕ່າງ',
        confirmButtonColor: '#06c755', 
        cancelButtonColor: '#94a3b8',
        background: '#ffffff',
        backdrop: `rgba(0,0,0,0.5)`,
        customClass: {
            popup: 'rounded-[2rem] shadow-2xl', // change the popup style
            confirmButton: 'rounded-xl px-6 py-2.5',
            cancelButton: 'rounded-xl px-6 py-2.5'
        },
        showClass: {
            popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOut'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // link to LINE Official
            window.open('https://line.me/ti/p/@GadgetPro_LA', '_blank');
        }
    });
}

// function to handle newsletter subscription
function subscribe() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;

    if (email && email.includes('@')) {
        Swal.fire({
            title: '<span style="color:#2563eb; font-family:Noto Sans Lao;">ຂອບໃຈທີ່ຕິດຕາມ!</span>',
            html: `
                <div style="text-align:center; padding:10px;">
                    <div style="font-size:4rem; margin-bottom:15px; animation: bounce 2s infinite;">📩</div>
                    
                    <p style="font-family:Noto Sans Lao; color:#64748b; margin-bottom:10px;">
                        ຂ່າວສານ ແລະ ໂປຣໂມຊັ່ນດີໆ ຈະຖືກສົ່ງໄປທີ່:
                    </p>
                    
                    <div style="background:#eff6ff; padding:12px; border-radius:12px; color:#1d4ed8; font-weight:bold; border: 1px dashed #bfdbfe;">
                        ${email}
                    </div>
                </div>
            `,
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: '#ffffff',
            customClass: {
                popup: 'rounded-[2rem]'
            },
            // Effect backdrop with animated gif
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://media.giphy.com/media/26tOZ42Mg6pbTUPcY/giphy.gif")
                center center
                no-repeat
            `
        });
        
        emailInput.value = ''; 
    } else {
        Swal.fire({
            icon: 'warning',
            title: '<span style="font-family:Noto Sans Lao; color:#b91c1c;">ຂໍ້ມູນບໍ່ຖືກຕ້ອງ</span>',
            html: '<span style="font-family:Noto Sans Lao; color:#4b5563;">ກະລຸນາກວດສອບຮູບແບບອີເມວຂອງທ່ານອີກຄັ້ງ<br>(ຕົວຢ່າງ: name@example.com)</span>',
            confirmButtonText: 'ລອງໃໝ່',
            confirmButtonColor: '#ef4444',
            background: '#fef2f2',
            iconColor: '#ef4444',
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-xl px-6'
            },
            showClass: {
                popup: 'animate__animated animate__shakeX' // shake effect
            }
        });
    }
}