class Bola {
    constructor(posX, posY, lar, alt, ang){
        this.posX = posX;
        this.posY = posY;
        this.lar = lar;
        this.alt = alt;
        this.ang = ang;
        this.canudinho = loadImage ("./assets/canon.png");
        this.saude = loadImage ("./assets/cannonBase.png");
    }

        rabisco(){
        push();
        imageMode(CENTER);
        image(this.canudinho,this.posX,this.posY,this.lar,this.alt);
        pop();
        image(this.saude,70,20,200,200);
        }
}