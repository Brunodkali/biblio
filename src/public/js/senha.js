const btn = document.getElementById('fa-eye');

btn.addEventListener('click', function() {
    const input = document.getElementById('senha');
   
    if (input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
    }else {
        input.setAttribute('type', 'password');
    }
});