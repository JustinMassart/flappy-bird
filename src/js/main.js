import gameController from './gameController';
import background from './background';
import TubesPairs from "./tubesPairs";
import asset_Play from './assets';
import ground from './ground';
import birdie from './birdie';

const game = {
    canvas: document.getElementById('game'),
    context: null,
    spriteSheetSrc: './resources/sprite.png',
    sprite: new Image(),
    gravity: 0.9,
    hasStarted: false,
    tubesPairs: [],
    frameCounter: 0,
    frameInterval: 80,
    maxTubesPairs: 3,
    requestId: 0,
    init() {
        this.context = this.canvas.getContext('2d');
        this.sprite.src = this.spriteSheetSrc;
        this.sprite.addEventListener('load', () => {
            gameController.init(this);
            background.init(this);
            asset_Play.init(this);
            ground.init(this);
            birdie.init(this);
            this.animate();
        });
    },
    animate() {
        this.requestId = window.requestAnimationFrame(() => {
            this.animate();
        })
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        background.update();
        if (this.hasStarted) {
            if (this.frameCounter++ > this.frameInterval) {
                if (this.tubesPairs.length >= this.maxTubesPairs) {
                    this.tubesPairs.splice(0, 1);
                }
                this.tubesPairs.push(new TubesPairs(this));
                this.frameCounter = 0;
            }
            this.tubesPairs.forEach(tubePair => {
                tubePair.update();
            })
        } else {
            asset_Play.update();
        }
        ground.update();
        birdie.update();
    },
    renderSpriteFrame(coordinates) {
        this.context.drawImage(
            this.sprite,
            coordinates.sx,
            coordinates.sy,
            coordinates.sw,
            coordinates.sh,
            coordinates.dx,
            coordinates.dy,
            coordinates.dw,
            coordinates.dh,
        );
    },
    cancelAnimation() {
        window.cancelAnimationFrame(this.requestId);
    }
}

game.init();