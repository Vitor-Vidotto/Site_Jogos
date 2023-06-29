class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heading = 0;
        this.velocity = 0;
        this.size = 20;
        this.rockets = [];
        this.maxRockets = 10;
        this.maxRocketAge = 5;
        this.maxVelocity = 50;
        this.minVelocity = -25;
    }
    
    fireRocket() {
       let youngestRocketAge = this.rockets.length > 0 ? this.rockets[this.rockets.length - 1].age : Infinity;

        if (this.rockets.length < this.maxRockets && youngestRocketAge > 0.4) {
            this.rockets.push(new Rocket(this._getTipPos().x, this._getTipPos().y, this.heading));
        }
    }// Permite a a nave atire
    
    accelerate() {
        if (this.velocity < this.maxVelocity) {
            this.velocity += 5;
        }
    } // Vai pra frente
    
    brake() {
        if (this.velocity > this.minVelocity) {
            this.velocity -= 5;
        } 
    } // Da re
    
    turnLeft() {
        this.heading <= 0 ? this.heading = 359 : this.heading -= 5;
    } // Vira pra esquerda
    
    turnRight() {
        this.heading >= 360 ? this.heading = 1 : this.heading += 5;
    } // Vira pra direita
    
    render() {
        this._renderShip()
        this._renderRockets()
    }// Chama as funções que criam a Nave e os tiros
    
    _renderShip() {
        let x = this._getTipPos().x;
        let y = this._getTipPos().y
        
        game.ctx.beginPath();
        let opposite = this.heading <= 180 ? this.heading + 180 : this.heading - 180;
        let startAngle = Utils.toRadians(opposite - 22.5);
        let endAngle = Utils.toRadians(opposite + 22.5);
        game.ctx.arc(x, y, this.size, startAngle, endAngle);
        game.ctx.lineTo(x, y);
        game.ctx.closePath();
        game.ctx.lineWidth = 2;
        game.ctx.strokeStyle = '#ffffff';
        game.ctx.stroke();
    } // Cria a Nave
    
    _getTipPos() {
        return {
            x: this.x + Utils.dXFromAngleAndHypot(this.heading, this.size / 2),
            y: this.y + Utils.dYFromAngleAndHypot(this.heading, this.size / 2)
        };
    }
    
    _renderRockets() {
        for (let rocket of this.rockets) {
            rocket.render();
        } // Puxa a função que crio os tiros
    }
}