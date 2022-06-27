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
        if(keyIsDown(RIGHT_ARROW)&&this.ang<70){
        this.ang += 1
        }
        if(keyIsDown(LEFT_ARROW)&&this.ang>-30){
        this.ang -= 1
        }
        push();
        translate(this.posX,this.posY);
        rotate(this.ang);
        imageMode(CENTER);
        image(this.canudinho,0,0,this.lar,this.alt);
        pop();
        image(this.saude,70,20,200,200);
        }
}