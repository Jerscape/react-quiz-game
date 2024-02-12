import React, { Component} from 'react'
import Question from './Question';
import { loadQuestions } from '../helpers/QuestionsHelpers';


export default class Game extends Component {
  //it should be obvious, but this is a class based component, not a functinal one

  //the below attributes are states
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: null,
      loading: true
    }
  }

  
  //the componentDiMount function trigger when teh components is ead
  //ie JN it seems like a load event?
  async componentDidMount(){
    
    try {
      //when using asynch you need to put await before calling other functions (I think)
      const questions = await loadQuestions();
      console.log(questions)

      this.setState({ questions, 
        currentQuestion: questions[0],
        loading: false
      })
    } catch (err) {
      console.error(err)
    }
    
    //alternative but less intuitive way to do it
    // fetch(url)
    //   .then(res => {
    //     console.log(res)
    
    //     return res.json();
    //   })
    //   .then(({results})=> {
    //     console.log(results)
    //   })
    //   .catch( err => {
    //     console.log(err)
    //   })
  }

  render() {
    return (
      <>
        <h2>Game</h2>
        {/* do not display unless current questions is there */}
        {this.state.loading && <div id="loader"/>}
        {this.state.currentQuestion && (
           <Question question={this.state.currentQuestion}/>
        )}
       
        
      </>
    )
  }
}