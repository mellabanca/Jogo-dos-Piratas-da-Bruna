class Tripulacao {
    constructor(posX, posY, lar, alt, posicao){
        this.corpo = Bodies.rectangle(posX, posY, lar, alt);
        this.lar = lar;
        this.alt = alt;
        this.posicao = posicao;
        this.imagem = loadImage("./assets/boat.png");
        World.add(world, this.corpo);
    }

    rabisco(){
        var pos = this.corpo.position;
        var angle = this.corpo.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.imagem, 0, this.posicao, this.lar, this.alt);
        pop();
    }
}