const logOut =document.getElementById("logOut");
var link = document.createElement('a');

logOut.addEventListener("click", function() {
    window.location.assign('http://localhost:3000');
});

link.href = url;
link.download = '../ArquivosPdf/ressurreicao.pdf';
link.dispatchEvent(new MouseEvent('click'));