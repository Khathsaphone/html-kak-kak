import { allUsers } from './user.js'; 

function handleLogin(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const originalText = loginBtn.innerText;

    loginBtn.innerHTML = '<span class="animate-pulse">ກຳລັງກວດສອບຄວາມປອດໄພ</span>';
    loginBtn.disabled = true;

    setTimeout(() => {
        const inputUser = usernameInput.value;
        const inputPass = passwordInput.value;

        const foundUser = allUsers.find(user =>
            user.username === inputUser && user.password === inputPass
        );

        if (foundUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', foundUser.name);
            localStorage.setItem('role', foundUser.role);

            Swal.fire({
                title: '<span style="color:#0f172a; font-weight:600">ຍິນດີຕ້ອນຮັບກັບເຂົ້າສູ່ລະບົບ</span>',
                html: `
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div style="width:80px; height:80px; background:#f0fdf4; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:15px;">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        </div>
                        <p style="color:#64748b; margin:0">ທ່ານໄດ້ເຂົ້າສູ່ລະບົບດ້ວຍຊື່</p>
                        <b style="font-size:1.2rem; color:#2563eb">${foundUser.name}</b>
                    </div>
                `,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#ffffff',
                backdrop: `
                    rgba(15, 23, 42, 0.4)
                    url("https://sweetalert2.github.io/images/nyan-cat.gif")
                    left top
                    no-repeat
                `,
                showClass: {
                    popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then(() => {
                if (foundUser.role === 'admin') {
                    window.location.href = 'admin.html'; 
                } else {
                    window.location.href = 'index.html';
                }
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: '<span style="color:#fff">ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ</span>',
                html: '<span style="color:#cbd5e1">ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ <br> <small style="opacity:0.7">ກະລຸນາລອງໃໝ່ອີກຄັ້ງ</small></span>',
                background: '#1e293b',
                confirmButtonText: 'ລອງໃໜ່ອີກຄັ້ງ',
                confirmButtonColor: '#3b82f6',
                iconColor: '#f87171',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                }
            });

            loginBtn.innerText = originalText;
            loginBtn.disabled = false;
            passwordInput.value = '';
        }
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('loginBtn');
    if (btn) {
        btn.addEventListener('click', handleLogin);
    }
});