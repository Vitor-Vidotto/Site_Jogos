class Rocket {
    constructor(x, y, heading) {
        this.x = x;
        this.y = y;
        this.heading = heading;
        this.velocity = 150;
        this.size = 2;
        this.age = 0;
    }// Cria o Tiro
    
    render() {
        game.ctx.fillStyle = '#ff0000';
        game.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}