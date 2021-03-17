const asset_Play = {
    game: null,
    frame: {
        sx: 708,
        sy: 236,
        sw: 104,
        sh: 58,
        dx: 0,
        dy: 0,
        dw: 104,
        dh: 58,
    },
    init(game) {
        this.game = game;
        this.frame.dy = game.canvas.height / 2;
        this.frame.dx = game.canvas.width / 3;
    },
    update() {
        this.game.renderSpriteFrame(this.frame);
    },
}

export default asset_Play;