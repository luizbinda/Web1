var canvas = document.getElementById("grafico03");
var ctx = canvas.getContext("2d");

function RToP(porcent) {
  return (porcent / 100) * (Math.PI * 2);
}

function desenharLinhas(numLinhas, distanciaLinhasNum, valorInicial) {
  distanciaLinhas = distanciaLinhasNum - 40;
  ctx.fillStyle = "rgba(200,200,200,1)";
  ctx.strokeStyle = "rgba(200,200,200,1)";

  valor = valorInicial;
  for (let index = 0; index < numLinhas; index++) {
    ctx.lineWidth = 1; /*Define a espessura da linha do retÃ¢ngulo*/
    ctx.strokeRect(30, distanciaLinhas, 385, 0);
    ctx.fillText(valor, 10, distanciaLinhas);
    distanciaLinhas += distanciaLinhasNum;
    valor -= 10;
  }
}

function desenharcirculoGraficoLinha(x, y, cor) {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = cor;
  ctx.arc(x, y, 5, RToP(0), RToP(100), true); //360
  ctx.stroke();
}

function desenharcirculoGraficoConteudo(x, y, cor, raio = 3) {
  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.fillStyle = cor; //Informa a cor do preenchimento
  ctx.arc(x, y, raio, RToP(0), RToP(100), true);
  ctx.fill(); //Executa o preenchimento
}

function desenharLinhasGrafico(xInicio, yInicio, xFim, yFim, cor) {
  ctx.beginPath();
  ctx.strokeStyle = cor;
  ctx.lineWidth = 4;
  ctx.moveTo(xInicio, yInicio);
  ctx.lineTo(xFim, yFim);
  ctx.stroke();
  desenharcirculoGraficoLinha(xInicio, yInicio, cor);
  desenharcirculoGraficoLinha(xFim, yFim, cor);
  desenharcirculoGraficoConteudo(xFim, yFim, "rgba(255,255,255,1)");
  desenharcirculoGraficoConteudo(xInicio, yInicio, "rgba(255,255,255,1)");
}

function linhaslegenda(xInicio, yInicio, xFim, yFim, cor) {
  ctx.beginPath();
  ctx.strokeStyle = cor;
  ctx.lineWidth = 4;
  ctx.moveTo(xInicio, yInicio);
  ctx.lineTo(xFim, yFim);
  ctx.stroke();
}

function desenharLegendaGrafico(xInicio, yInicio, xFim, yFim, cor) {
  desenharcirculoGraficoLinha(xInicio, yInicio, cor);
  linhaslegenda(xFim, yInicio, yFim, yInicio, cor);
  desenharcirculoGraficoConteudo(xFim, yInicio, cor, 1);
  desenharcirculoGraficoConteudo(yFim, yInicio, cor, 1);
  desenharcirculoGraficoConteudo(xInicio, yInicio, "rgba(0,0,0,1)", 3);
}

function desenharLegenda(text, x, y) {
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(200,200,200,1)";
  ctx.fillText(text, x, y);
}

desenharLinhas(5, 70, 40);
desenharLinhasGrafico(30, 310, 140, 265, "rgba(0,80,255,1)");
desenharLinhasGrafico(140, 265, 210, 210, "rgba(0,80,255,1)");
desenharLinhasGrafico(210, 210, 260, 220, "rgba(0,80,255,1)");
desenharLinhasGrafico(260, 220, 355, 158, "rgba(0,80,255,1)");

desenharLinhasGrafico(30, 310, 110, 305, "rgba(0,130,0,1)");
desenharLinhasGrafico(110, 305, 185, 285, "rgba(0,130,0,1)");
desenharLinhasGrafico(185, 285, 245, 275, "rgba(0,130,0,1)");
desenharLinhasGrafico(245, 275, 320, 240, "rgba(0,130,0,1)");

desenharLinhasGrafico(30, 310, 110, 295, "rgba(255,45,0,1)");
desenharLinhasGrafico(110, 295, 185, 280, "rgba(255,45,0,1)");
desenharLinhasGrafico(185, 280, 250, 195, "rgba(255,45,0,1)");
desenharLinhasGrafico(250, 195, 340, 105, "rgba(255,45,0,1)");
desenharLinhasGrafico(340, 105, 408, 92, "rgba(255,45,0,1)");

desenharLegenda("jan/14", 10, 350);
desenharLegenda("fev/14", 85, 350);
desenharLegenda("mar/14", 160, 350);
desenharLegenda("abr/14", 235, 350);
desenharLegenda("mai/14", 305, 350);
desenharLegenda("jun/14", 380, 350);

desenharLegendaGrafico(130, 380, 118, 142, "rgba(255,45,0,1)");
desenharLegenda("dado A", 155, 382);
desenharLegendaGrafico(220, 380, 208, 232, "rgba(0,130,0,1)");
desenharLegenda("dado B", 245, 382);
desenharLegendaGrafico(315, 380, 303, 327, "rgba(0,0,255,1)");
desenharLegenda("dado C", 340, 382);
