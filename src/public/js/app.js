const logOut = document.getElementById("logOut");
const shared = document.getElementById('share');

logOut.addEventListener("click", function() {
    window.location.assign('http://localhost:3000');
});

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