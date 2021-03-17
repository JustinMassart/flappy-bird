const ground = {
    game: null,
    frame: {
        sx: 584,
        sy: 0,
        sw: 336,
        sh: 112,
        dx: 0,
        dy: 0,
        dw: 336,
        dh: 112,
    },
    speed: 3,
    maxOffset: 0,

    init(game) {
        this.game = game;
        this.maxOffset = this.frame.sw - game.canvas.width;
        this.frame.dy = game.canvas.height - this.frame.sh;
    },
    update() {
        if (this.frame.dx <= -this.maxOffset) {
            this.frame.dx = 0;
        }
        this.frame.dx -= this.speed;
        this.game.renderSpriteFrame(this.frame);
    },
}

export default ground;