let taustakuva;
let kissakuva;
let kissa;

let lautan_leveys = 80;
let lautanY = 350;

let taustan_leveys = 800;
let taustan_korkeus = 400;

var kissalista = [];
var kissa_ajastin;

function preload() {
  taustakuva = loadImage('https://igno.cc/opetus/kuvat/tausta.png')
  kissakuva = loadImage('https://igno.cc/opetus/kuvat/cat.png')
}

function setup() {
  var canvas = createCanvas(taustan_leveys, taustan_korkeus);

  kissa = new Kissa();
  luo_kissoja();
  angleMode(DEGREES);
}

function draw() {
  image(taustakuva, 0, 0, taustan_leveys, taustan_korkeus);

  luo_lautta();

  kissalista.forEach((kissa, monesko) => {
    kissa.liikuta();
  });

}

function luo_lautta() {
  fill('rgba(0, 0, 150, 0.1)');
  rect(mouseX, taustan_korkeus - 50, lautan_leveys, 30, 30, 20, 0, 0 )
}

function luo_kissoja() {
 let uusi_kisu = new Kissa ();
 kissalista.unshift(uusi_kisu);
 kissa_ajastin = setTimeout(luo_kissoja, 2000);
}

class Kissa {
  constructor() {
    this.X = 30;
    this.Y = 200;
    this.leveys = 50;
    this.korkeus = 50;
    this.Xnopeus = 2;
    this.Ynopeus = -2;
    this.kulma = 0;
  }
  liikuta() {

//    this.X = this.X + this.Xnopeus; Tämä on täsmälleen sama asia
//    kuin rivi 47, mutta pidempi tapa kirjoittaa.
    this.X += this.Xnopeus;
    this.Ynopeus += 0.05; // painovoima

    if (this.Y + this.korkeus > lautanY) {
      if (this.X > mouseX && this.X < mouseX + lautan_leveys) {
        this.Ynopeus = -abs(this.Ynopeus);
      }
    }

    this.Y += this.Ynopeus;

    this.kulma += 1;

    push();
    translate(this.X, this.Y);
    rotate(this.kulma);
    imageMode(CENTER);
    image(kissakuva, 0, 0, this.leveys, this.korkeus)
    pop();
  }
}
