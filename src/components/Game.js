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
      return this.setState((prevState) => ({
        done: true,
        score: prevState.score + bonus
  
      }));
    
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
    const {loading, done, score, currentQuestion, questionNumber} = this.state;
    return (
      <>
        <h2>Game</h2>

        {/* do not display unless current questions is there */}
        {loading && !done && <div id="loader" />}


        {!done && !loading && currentQuestion && (
          
          <>
            <HUD
              score={score}
              questionNumber={questionNumber}
            />
            <Question question={currentQuestion}
            // he specifically left the this.change quesiton (ie not destructured here)
              changeQuestion={this.changeQuestion} />
          </>
        )}

        {/* in this context, the thing after teh END will display if the condition to the left is true */}
        {this.state.done && <SaveScoreForm score={this.state.score}/>}

      </>
    );
  }
}