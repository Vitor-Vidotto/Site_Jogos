class AsteroidField {
    constructor() {
        this.asteroidSizes = [8, 16, 32];
        this.nAsteroids = 15;
        this.asteroids = [];
        this.asteroidsPerSplit = 3;
        this.minVelocity = 15;
        this.maxVelocity = 90;
        
	// Loop pra sempre ter asteroides aparecendo
        for (let i = 0; i < this.nAsteroids; i++) {
            this.asteroids.push(this._createRandomAsteroid());
        }
    }
	// Colisão entre o tiro e o asteroide
    rocketHitsAsteroid(rocket, asteroid) {
        if (asteroid.size > this.asteroidSizes[0]) {
            for (let i = 0; i < this.asteroidsPerSplit; i++) {
                this.asteroids.push(new Asteroid(asteroid.x, asteroid.y, Math.random() * 360, asteroid.velocity, asteroid.size / 2));
            }
        }
        asteroid.size = 0;
        rocket.age = game.ship.maxRocketAge;
        this.asteroids = this.asteroids.filter(asteroid => asteroid.size > 0);
    }
    
	// Cria a plano de fundo preto
    render() {
        game.ctx.fillStyle = '#000000';
        game.ctx.fillRect(0, 0, game.width, game.height);

        for (let asteroid of this.asteroids) {
            asteroid.render();
        }
    }
    
	// Cria os Asteroides de forma aleatória
    _createRandomAsteroid() {
        let xPos = Math.random() * game.width;
        let yPos = Math.random() * game.height;
        let size = this.asteroidSizes[Math.floor(Math.random() * this.asteroidSizes.length)];
        let velocity = this.minVelocity + (Math.random() * (this.maxVelocity - this.minVelocity));
        let heading = Math.random() * 360;
        return new Asteroid(xPos, yPos, heading, velocity, size);
    }
}