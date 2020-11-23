class Game {
  constructor(id, player) {
    this.id = id;
    this.active = false;
    this.isQuestionPhase = true;
    this.showResults = false;
    this.questionAmount = 3;
    this.questions = [];
    this.question = null;
    this.results = [];
    this.players = [player];
    this.delay = 20000;
    this.answers = [];
    this.allAnswers = [];
  }
  addPlayer(player) {
    if (!this.players.includes(player)) {
      this.players.push(player);
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async questionPhase(start) {
    console.log('questionPhase');
    let time = start;
    const endTime = start + this.delay + 1000;
    while (time < endTime && this.answers.length < this.players.length) {
      await this.sleep(1000);
      time = Date.now();
    }
  }

  async answerPhase(start) {
    console.log('answerPhase');
    let time = start;
    const endTime = (start + this.delay + 1000) / 6;
    while (time < endTime) {
      await this.sleep(1000);
      time = Date.now();
    }
    console.log(this.answers);
    this.answers.forEach((answer) => {
      answer.rightAnswer = false;
      if (answer.answer === this.question.answer) {
        answer.rightAnswer = true;
      }
    });
    this.allAnswers.push(this.answers);
    this.answers = [];
  }

  async displayResultsPhase(start) {
    console.log('displayResultsPhase');
    let time = start;
    const endTime = (start + this.delay + 1000) / 6;
    while (time < endTime) {
      await this.sleep(1000);
      time = Date.now();
    }
  }
}
module.exports = Game;
