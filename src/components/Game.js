import React, { Component } from 'react';
import Question from './Question';
import HUD from './huds';
import SaveScoreForm from './SaveScoreForm';
import { loadQuestions } from '../helpers/QuestionsHelpers';


export default class Game extends Component {
  //it should be obvious, but this is a class based component, not a functinal one

  //the below attributes are states
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0,
      done: false
    };

  }


  //the componentDiMount function trigger when teh components is ead
  //ie JN it seems like a load event?
  async componentDidMount() {

    try {
      //when using asynch you need to put await before calling other functions (I think)
      const questions = await loadQuestions();
      console.log("try: ", questions);
      this.setState({
        questions
      }, () => this.changeQuestion(this.count));
      console.log("catch questions: ", questions);
    } catch (err) {
      console.error(err);
    }


  }

  changeQuestion = (bonus = 0) => {

    //if no more questions, game is done (short circuit)
    if (this.state.questions.length === 0) {
      this.setState({ done: true });
      return;
    }

    console.log("bonus in changeQuestion", bonus);

    const randomQuestionIndex = Math.floor(Math.random() * this.state.questions.length);
    const currentQuestion = this.state.questions[randomQuestionIndex];
    const remainingQuestions = [...this.state.questions];
    remainingQuestions.splice(randomQuestionIndex, 1);

    console.log("remaining questions:", remainingQuestions);

    // this.setState(prevState => ({
    //   questions: remainingQuestions,
    //   currentQuestion,
    //   loading: false,
    //   score: prevState.score + bonus // Correct way to update score based on previous state
    // }))

    this.setState((prevState) => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: prevState.score + bonus,
      questionNumber: prevState.questionNumber + 1

    }));

    setTimeout(() => {
      console.log("this state score", this.state.score);
    }, 1000);

    // this.setState({
    //   questions: remainingQuestions, 
    //   currentQuestion, 
    //   loading: false })
  };

  render() {
    return (
      <>
        <h2>Game</h2>

        <SaveScoreForm></SaveScoreForm>
        {/* do not display unless current questions is there */}
        {this.state.loading && !this.state.done && <div id="loader" />}


        {!this.state.done && !this.state.loading && this.state.currentQuestion && (

          <>
            <HUD
              score={this.state.score}
              questionNumber={this.state.questionNumber}
            />
            <Question question={this.state.currentQuestion}
              changeQuestion={this.changeQuestion} />
          </>
        )}

        {this.state.done && <h1>DONE!!</h1>}

      </>
    );
  }
}