const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, grama;
var campo;
var torre;
var defesa;
var birinbinha;
var algulodabirinbinha;
var bola8;
var pastel = [];
var iogurte;
var barbanegra = [];
var barbanegraAnimation = [];
var barbanegraDados, barbanegraSpritesheet;
var aotAnimation = [];
var aotDados, aotSpritesheet;
var aguaAnimation = [];
var aguaDados, aguaSpritesheet;
var batata = false;

function preload() {
  campo = loadImage("./assets/background.gif");
  defesa = loadImage("./assets/tower.png");
  barbanegraSpritesheet = loadImage("./assets/boat/boat.png");
  barbanegraDados = loadJSON("./assets/boat/boat.json");
  aotSpritesheet = loadImage("./assets/boat/brokenBoat.png");
  aotDados = loadJSON("./assets/boat/brokenBoat.json");
  aguaSpritesheet = loadImage("./assets/waterSplash/waterSplash.png");
  aguaDados = loadJSON("./assets/waterSplash/waterSplash.json");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }
 
 grama = Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,grama);

 torre = Bodies.rectangle(160,350,160,310,options);
 World.add(world, torre);
 angleMode(DEGREES)
 algulodabirinbinha = 20
 birinbinha = new Bola (180,110,130,100,algulodabirinbinha)

 var barbanegraFrames = barbanegraDados.frames;

 for(var i = 0; i < barbanegraFrames.length; i++){
  var pos = barbanegraFrames[i].position;
  var img = barbanegraSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
  barbanegraAnimation.push(img);
 }

 var aotFrames = aotDados.frames;

 for(var i = 0; i < aotFrames.length; i++){
  var pos = aotFrames[i].position;
  var img = aotSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
  aotAnimation.push(img);
 }

 var aguaFrames = aguaDados.frames;

 for(var i = 0; i < aguaFrames.length; i++){
  var pos = aguaFrames[i].position;
  var img = aguaSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
  aguaAnimation.push(img);
 }

}

function draw() {
  background(189);
  image(campo, 0, 0, 1200, 600);

  Engine.update(engine);
 
 rect(grama.position.x, grama.position.y,width*2,1);
  
 push();
 imageMode(CENTER);
 image(defesa,torre.position.x, torre.position.y, 160, 310);
 pop();
 birinbinha.rabisco();
 for(var chiclete = 0; chiclete < pastel.length; chiclete ++)
 {
   caldoDeCana (pastel[chiclete],chiclete)
   embate (chiclete)
 }
 capitaogancho();
 
}
 function keyReleased(){
 if(keyCode === DOWN_ARROW){
 pastel[pastel.length -1].bang();
 }
 }
 function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var bola8 = new Boliche(birinbinha.posX, birinbinha.posY);
    pastel.push(bola8);
  }
 }
 function caldoDeCana(bola8, i){
    if(bola8){
      bola8.rabisco();
      bola8.marquinhos();
      if (bola8.corpo.position.x>=width||bola8.corpo.position.y>=height-50){
      bola8.jacksparrow(i)
      }
    }
 }
 function capitaogancho() {
 if (barbanegra.length >0 ){
 if(barbanegra[barbanegra.length-1] === undefined || barbanegra[barbanegra.length-1].corpo.position.x<width -300){
 var positions = [-40,-60,-70,-20];
 var position = random (positions);
 var iogurte = new Tripulacao(width, height-60, 170, 170, position, barbanegraAnimation);
 barbanegra.push(iogurte);

 }
for (var i = 0; i<barbanegra.length; i ++){
if (barbanegra[i]){
  Matter.Body.setVelocity(barbanegra[i].corpo, {x: -0.9, y:0});
  barbanegra[i].rabisco();
  barbanegra[i].marquinhos();
  var isi = Matter.SAT.collides(torre, barbanegra[i].corpo);
  if(isi.collided && !barbanegra[i].titanic){
    batata = true;
    ehOFim();
  }
}
}
 } else {
var iogurte = new Tripulacao(width, height-60, 170, 170, -80, barbanegraAnimation);
barbanegra.push(iogurte);
 }
 }
 function embate (index){
 for (var i = 0; i<barbanegra.length; i ++){
 if (pastel[index]!==undefined&&barbanegra[i]!==undefined){
 var isi = Matter.SAT.collides(pastel[index].corpo,barbanegra[i].corpo);
 if (isi.collided){
 barbanegra[i].jacksparrow(i);
 World.remove(world,pastel[index].corpo);
 delete pastel[index];
 }
 }
 }
 }

 function ehOFim(){
  swal({
    title: "Ih! Os piratas roubaram o seu tesouro!",
    text:"Terra à vista!",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Mais uma chance?"
  },
  function(botaoApertado){
    if(botaoApertado){
      location.reload();
    }
  })
 }