var canvas = document.getElementById("grafico01");
var ctx = canvas.getContext("2d");

function desenharLinhas(numLinhas, distanciaLinhasNum, valorInicial) {
    distanciaLinhas = distanciaLinhasNum - 5;
    valor = valorInicial;
    for (let index = 0; index < numLinhas; index++) {
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 1; /*Define a espessura da linha do retÃ¢ngulo*/
        ctx.strokeRect(30, distanciaLinhas, 450, 0);
        ctx.fillText(valor, 10, distanciaLinhas);
        distanciaLinhas += distanciaLinhasNum;
        valor -= 100;
    }
}

desenharLinhas(10, 25, 900);

function desenharColunas(distanciaEsquerda, baixo, cima, cor) {
ctx.lineWidth = 2;
ctx.fillStyle = cor;
ctx.fillRect(distanciaEsquerda, baixo, 30, cima);
}

desenharColunas(60, 45, 200, "rgba(0,0,255,0.95)");
desenharColunas(95, 95, 150, "rgba(255,0,0,0.95)");
desenharColunas(130, 235, 10, "rgba(0,250,0,0.95)");

desenharColunas(200, 95, 150, "rgba(0,0,255,0.95)");
desenharColunas(235, 70, 175, "rgba(255,0,0,0.95)");
desenharColunas(270, 225, 20, "rgba(0,250,0,0.95)");

desenharColunas(340, 230, 15, "rgba(0,0,255,0.95)"); 
desenharColunas(375, 110, 135, "rgba(255,0,0,0.95)");
desenharColunas(410, 205, 40, "rgba(0,250,0,0.95)");

function legenda(x, y, cor, text) {
    ctx.lineWidth = 2;
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, 10, 10);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillText(text, x + 15, y + 8);
}

legenda(150, 260, "rgba(0,0,255,1)", 2013);
legenda(210, 260, "rgba(255,0,0,1)", 2014);
legenda(280, 260, "rgba(0,255,0,1)", 2015);

