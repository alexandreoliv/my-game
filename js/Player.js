class Player {
	constructor() {
		this.velocity = -0.2; // as soon as the player is drawn, velocity will increase to 0 which should be the initial value so this works fine
		this.gravity = 0.2;
		this.width = 78;
		this.height = 140;
		this.x = 0;
		this.y = height - this.height;
		// height is the height of the canvas (provided by p5.js)
	}

	draw() {
		// gravity brings the player down
			this.velocity += this.gravity;
			this.velocity = Number(this.velocity.toFixed(1));
		
		console.log("Walking or falling down. Velocity: " + this.velocity + " Player Y + height: " + (this.y + this.height));

		// if distance between barrel and player is 0, there's a collision
		if (this.collision()) {
			//console.log(`collision. player x+width: ${this.x + this.width}, barrel x: ${game.barrel.x}`)
			this.x -= 1.5;
		}

		// gravity brings the player down, unless he's atop a barrel
		if (game.level < 5) { // levels 1-4
			console.log("Player Y + height: " + (this.y + this.height))
			if (!this.atopBarrel()) { // if player is NOT atop a barrel, he will fall down
					this.y += this.velocity;
					this.y = Number(this.y.toFixed(1));
				//	this.y = height - this.height;	
			}
		}
		else { // final stage
			this.y += this.velocity; // player will always fall down
			this.y = Number(this.y.toFixed(1));
		}

		// if the player moves out of the screen on the bottom, his starting position is restored
		if (this.y >= height - this.height)
		 	this.y = height - this.height;

		image(game.playerImage, this.x, this.y, this.width, this.height);
	}

	collision() {
		if ((game.barrel.x - (this.x + this.width) < 1.5) && // player is approaching barrel
			(game.barrel.x - (this.x + this.width) > 0) && // player is after barrel
			(this.y + this.height >= game.barrel.y)) // player is not completely above barrel
			return true;
		return false;
	}

	atopBarrel() {
		/* P.S.: The first comparison should be === 0, but player.y changes in multiple ways and will
		never have the exact y as the barrel.y so if he's close enough its y will be changed to the
		precise y of the barrel */
		if (
			(game.barrel.y - (this.y + this.height) < 10) // player is vertically one the position of the barrel
			&&
			(this.x + this.width > game.barrel.x) // player is horizontally after or exactly at the beginning of the barrel
			&&
			(this.x <= game.barrel.x + game.barrel.width) // player is horizontally before of exactly at the end of the barrel
		   ) {
			//    console.log(`
			//    player y+height: ${(this.y + this.height)},
			//    player x: ${this.x},
			//    player x+width: ${(this.x + this.width)},
			//    barrel y: ${game.barrel.y},
			//    barrel x: ${game.barrel.x},
			//    barrel x+width: ${(game.barrel.x + game.barrel.width)}`);
			console.log(this.velocity)
			this.y = game.barrel.y - this.height; // this is just to make the player precisely atop the barrel, so that he'll be able to jump
			return true; // player is atop the barrel
		}
		return false; // player is somewhere else
	}

	jump() {
		if (this.y === height - this.height || this.atopBarrel()) { // player is in the ground or atop the barrel
			//console.log	(this.atopBarrel());
			this.velocity = -10;
			this.y += this.velocity;
			this.y = Number(this.y.toFixed(1));
			console.log("Jumping! Velocity: " + this.velocity + " Player Y + height: " + (this.y + this.height) + " Barrel Y: " + game.barrel.y)
		}
	}

	runLeft() {
		if (game.level < 5) {
			if (this.x - 15 > 0) { // if the player is not at the left edge
				if (
					(this.x < game.barrel.x || this.x - 15 > game.barrel.x + game.barrel.width) || // if the player is not too close to barrel
					(this.y + this.height <= game.barrel.y) // player is above or on top of the barrel
					)
					this.x -= 15;
			}
		}
		else // Final stage
			if (this.x - 15 > 0) // if the player is not at the left edge
				this.x -= 15;
	}
	
	runRight() {
		if (game.level < 5) {
			if (this.x + 15 < 1216 - this.width) { // if the player is not at the right edge
				if (
					(this.x + this.width + 15 < game.barrel.x || this.x > game.barrel.x) || // if the player is not too close to barrel
					(this.y + this.height <= game.barrel.y) // player is above or on top of the barrel
					)
					this.x += 15;
			}
		}
		else // Final stage
			if (this.x + this.width + 15 < game.boss.rifleX) // if the player is not too close to the rifle
				this.x += 15;
	}
}