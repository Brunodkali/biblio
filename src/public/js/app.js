const logOut = document.getElementById("logOut");
const clickButton = document.getElementById('livro');
// const nome = 'Ressureicao.pdf';

logOut.addEventListener("click", function() {
    window.location.assign('http://localhost:3000');
});

function download(content, filename, contentType){
    if(!contentType){
        contentType = 'application/octet-stream';
    }
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}