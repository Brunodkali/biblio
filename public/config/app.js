const logOut = document.getElementById("logOut");
const shared = document.getElementById('share');
const btn = document.getElementById('fa-eye');

if (logOut) {
    logOut.addEventListener("click", function() {
        window.location.assign('http://localhost:3000');
    });
}

if (shared) {
    shared.addEventListener("click", function() {
       (function share(){
            try {
                if (navigator.share !== undefined) {
                    navigator.share({
                        title: 'Compartilhe a Biblioteca Pública Bruno Duarte',
                        text: 'Biblioteca Pública Bruno Duarte',
                        url: 'http://localhost:3000',
                    });
                }
            }catch(err) {
                return err;
            }
        })();
    });
}

if (btn) {
    btn.addEventListener('click', function() {
        const input = document.getElementById('senha');
       
        if (input.getAttribute('type') == 'password') {
            input.setAttribute('type', 'text');
        }else {
            input.setAttribute('type', 'password');
        }
    });
}