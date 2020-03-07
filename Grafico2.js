var canvas = document.getElementById("quadro07");
var ctx = canvas.getContext("2d");
ctx.font = "20px Arial";

function Circle(x, y, raio, anguloInicial, AnguloFinal, sentido, cor) {
    ctx.beginPath();
    ctx.fillStyle = cor; //Informa a cor do preenchimento
    ctx.arc(x, y, raio, anguloInicial, AnguloFinal, sentido); //360
    ctx.lineTo(300, 150);
    ctx.fill();
}

function RToP(porcent) {return (porcent / 100) * (Math.PI * 2) }

function legenda(text, x , y) {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillText(text, x, y);
}

function desehoLegenda(cor, y, x = 500) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, 20, 20);
}

legenda("36%", 345, 268);
legenda("29%", 150, 168);
legenda("11%", 250, 40);
legenda("7%", 320, 40);
legenda("17%", 400, 100);
    
desehoLegenda("rgba(105,0,0,1)", 50);
legenda("Sem Filho", 530, 65);

desehoLegenda("rgba(0,105,0,1)", 85);
legenda("1 Filho", 530, 100);

desehoLegenda("rgba(0,0,105,1)", 125);
legenda("2 Filhos", 530, 142);

desehoLegenda("rgba(200,200,10,1)", 160);
legenda("3 Filhos", 530, 177);

desehoLegenda("rgba(80,80,80,1)", 195);
legenda("4 ou Mais Filhos", 530, 213);


Circle(300, 150, 100, RToP(0), RToP(36), false, "rgba(0,105,0,1)");
Circle(300, 150, 100, RToP(36), RToP(65), false, "rgba(0,0,105,1)");
Circle(300, 150, 100, RToP(65), RToP(76), false, "rgba(200,200,10,1)");
Circle(300, 150, 100, RToP(76), RToP(83), false, "rgba(80,80,80,1)");
Circle(300, 150, 100, RToP(83), RToP(100), false, "rgba(105,0,0,1)");