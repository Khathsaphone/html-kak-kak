// function to handle login process
function handleLogin(event) {
    event.preventDefault(); 

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const originalText = loginBtn.innerText;

    // change button to loading state
    loginBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        ກຳລັງກວດສອບ...
    `;
    loginBtn.classList.add('opacity-75', 'cursor-not-allowed');
    loginBtn.disabled = true;

    // delay to simulate checking
    setTimeout(() => {
        const inputUser = usernameInput.value;
        const inputPass = passwordInput.value;

        // check against stored users
        const foundUser = (typeof allUsers !== 'undefined' ? allUsers : []).find(user =>
            user.username === inputUser && user.password === inputPass
        );

        if (foundUser) {
            // successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', foundUser.name);
            localStorage.setItem('role', foundUser.role);

            Swal.fire({
                title: '<span style="color:#0f172a; font-family:Noto Sans Lao; font-weight:bold;">ຍິນດີຕ້ອນຮັບ!</span>',
                html: `
                    <div style="display:flex; flex-direction:column; align-items:center; font-family:Noto Sans Lao;">
                        <div style="width:70px; height:70px; background:#f0fdf4; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:15px;">
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        </div>
                        <p style="color:#64748b; margin-bottom:5px;">ທ່ານໄດ້ເຂົ້າສູ່ລະບົບດ້ວຍຊື່</p>
                        <b style="font-size:1.4rem; color:#2563eb">${foundUser.name}</b>
                    </div>
                `,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                background: '#ffffff',
                backdrop: `rgba(15, 23, 42, 0.6)`, 
                showClass: { popup: 'animate__animated animate__zoomIn' },
                hideClass: { popup: 'animate__animated animate__zoomOut' }
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
                title: '<span style="color:#ef4444; font-family:Noto Sans Lao;">ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ</span>',
                html: '<span style="color:#64748b; font-family:Noto Sans Lao;">ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ<br>ກະລຸນາກວດສອບແລ້ວລອງໃໝ່ອີກຄັ້ງ</span>',
                confirmButtonText: 'ລອງໃໝ່',
                confirmButtonColor: '#3b82f6',
                background: '#ffffff',
                iconColor: '#ef4444',
                showClass: { popup: 'animate__animated animate__shakeX' },
                customClass: {
                    popup: 'rounded-2xl shadow-xl'
                }
            });

            // default button state
            loginBtn.innerHTML = originalText;
            loginBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            loginBtn.disabled = false;
            passwordInput.value = ''; //clear password field
        }
    }, 1500);
}

// start login function on button click
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('loginBtn');
    if (btn) {
        btn.addEventListener('click', handleLogin);
    }
});