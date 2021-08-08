class Scores {
    constructor(score) {
        this.score = score;
    }

    set(number) {
        this.score += number;
    }

    get() {
        return this.score;
    }

    reset() {
        this.score = 0;
    }

}

export default Scores;