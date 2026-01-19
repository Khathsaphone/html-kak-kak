// function for checking special privilege
function checkPrivilege() {
    Swal.fire({
        title: '<h2 style="color:#06c755; font-family:Noto Sans Lao;">ສິດທິພິເສດສຳລັບທ່ານ</h2>',
        html: `
            <div style="margin-top:10px">
                <img src="https://cdn-icons-png.flaticon.com/512/3014/3014234.png" style="width:80px; margin-bottom:15px; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.1));">
                <p style="font-size:1.1rem; color:#475569; font-family:Noto Sans Lao;">
                    ກະລຸນາຕິດຕໍ່ເຈົ້າໜ້າທີ່ຜ່ານ <b style="color:#06c755">LINE</b><br>
                    ເພື່ອສອບຖາມໂປຣໂມຊັ່ນບັດເຄຣດິດລ່າສຸດ
                </p>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: '<i class="fa-brands fa-line"></i> ຕິດຕໍ່ຜ່ານ LINE',
        cancelButtonText: 'ປິດໜ້າຕ່າງ',
        confirmButtonColor: '#06c755', // line green
        cancelButtonColor: '#94a3b8',
        background: '#fff',
        backdrop: `rgba(0,0,0,0.4)`,
        showClass: {
            popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOut'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // link to LINE chat
            window.open('https://line.me/ti/p/your_line_id', '_blank');
        }
    });
}

// function for email subscription
function subscribe() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;

    if (email && email.includes('@')) {
        //  sweetalert success
        Swal.fire({
            title: '<span style="color:#2563eb; font-family:Noto Sans Lao;">ຂອບໃຈທີ່ຕິດຕາມ!</span>',
            html: `
                <div style="text-align:center">
                    <div style="font-size:3rem; margin-bottom:10px">📩</div>
                    <p style="font-family:Noto Sans Lao; color:#64748b;">
                        ຂ່າວສານໂປຣໂມຊັ່ນດີໆ ຈະຖືກສົ່ງໄປທີ່:
                    </p>
                    <div style="background:#eff6ff; padding:10px; border-radius:8px; color:#1e40af; font-weight:bold; margin-top:5px;">
                        ${email}
                    </div>
                </div>
            `,
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            // Backdrop (Confetti)
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://media.giphy.com/media/26tOZ42Mg6pbTUPcY/giphy.gif")
                center center
                no-repeat
            `
        });
        
        emailInput.value = ''; // clear input
    } else {
        // error alert
        Swal.fire({
            icon: 'warning',
            title: '<span style="font-family:Noto Sans Lao; color:#b91c1c;">ຂໍ້ມູນບໍ່ຖືກຕ້ອງ</span>',
            html: '<span style="font-family:Noto Sans Lao;">ກະລຸນາກວດສອບທີ່ຢູ່ອີເມວຂອງທ່ານອີກຄັ້ງ</span>',
            confirmButtonText: 'ລອງໃໝ່',
            confirmButtonColor: '#ef4444',
            background: '#fef2f2',
            iconColor: '#ef4444',
            showClass: {
                popup: 'animate__animated animate__shakeX'
            }
        });
    }
}