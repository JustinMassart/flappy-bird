import birdie from "./birdie";

const gameController = {

    init(game) {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'j' ) {
                if (!game.hasStarted) {
                    game.hasStarted = true;
                }
                birdie.goUp();
            }
        })
    }
}

export default gameController;