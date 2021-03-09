const background = {
    game: null,
    frame: {
        sx: 0,
        sy: 0,
        sw: 288,
        sh: 511,
        dx: 0,
        dy: 0,
        dw: 288,
        dh: 511,
    },
    update() {
        this.game.renderSpriteFrame(this.frame);

    },
    init(game) {
        this.game = game;
        this.frame.dh = game.canvas.height;
        this.frame.dw = game.canvas.width;
        this.frame.sh = game.canvas.height;
        this.frame.sw = game.canvas.width;
    },
}

export default background;