class Boliche {
    constructor(posX, posY){
        this.raio = 30;
        var config = {
        isStatic: true
        }
        this.corpo = Bodies.circle(posX, posY, this.raio, config);
        this.imagem = loadImage("./assets/cannonball.png");
        this.rastros = []
        World.add(world,this.corpo);
    }

    rabisco(){
        var pos = this.corpo.position;
        push();
        imageMode(CENTER)
        image(this.imagem, pos.x, pos.y, this.raio, this.raio);
        pop();
        if (this.corpo.velocity.x>0 && pos.x>0)
        {
        var salada = [pos.x, pos.y]
        this.rastros.push (salada)
        }
        for(var i = 0; i < this.rastros.length; i++) {
        image(this.imagem, this.rastros[i][0], this.rastros[i][1], 5, 5);
        }
    }
    bang(){
        var novoAng = birinbinha.ang - 28;
        novoAng *= (3.14/180);
        var velocidade = p5.Vector.fromAngle(novoAng);
        velocidade.mult(0.5);
        Matter.Body.setStatic(this.corpo,false);
        Matter.Body.setVelocity(this.corpo,{x:velocidade.x*(180/3.14),y:velocidade.y*(180/3.14)});
    }
}    