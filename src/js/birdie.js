import ground from './ground';

const birdie = {
    game: null,
    frames: [
        {sx: 6, sy: 982},
        {sx: 62, sy: 982},
        {sx: 118, sy: 982}
    ],
    maxAnimationStep: 2,
    animationStep: 0,
    counterInterval: 0,
    maxInterval: 5,
    width: 34,
    height: 24,
    x: 0,
    y: 0,
    fallSpeed: 0,
    maxFallSpeed: 7,
    update() {
        this.render();
    },
    init(game) {
        this.game = game;
        this.y = (game.canvas.height - ground.frame.sh) / 2;
        this.x = this.width / 2 + 3;
    },
    render() {
        this.counterInterval++;
        if (!(this.counterInterval % this.maxInterval)) {
            this.counterInterval = 0;
            this.animationStep = this.animationStep < this.maxAnimationStep ? this.animationStep + 1 : 0;
        }
        this.game.context.save();
        this.game.context.translate(this.x, this.y);
        this.game.context.rotate(0);
        this.game.renderSpriteFrame(
            {
                sx: this.frames[this.animationStep].sx,
                sy: this.frames[this.animationStep].sy,
                sw: this.width,
                sh: this.height,
                dx: -this.width / 2,
                dy: -this.height / 2,
                dw: this.width,
                dh: this.height,
            }
        );
        this.game.context.restore();
    }
}

export default birdie;