import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Adjust the path based on your directory structure
import Game from './components/Game'; // Adjust the path based on your directory structure
import HighScores from './components/HighScores'; // Adjust the path based on your directory structure

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/highScores" element={<HighScores />} />
      </Routes>
    </Router>
  );
}

export default App;



// import React from 'react';
// import './App.css';
// import Home from './components/Home';
// import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import Game from './components/Game';
// import HighScores from './components/HighScores';

// function App() {
//     return (
//         <Router>
//            <Routes>
//            <div className="container">
//                 <Route exact path="/" component={Home} />
//                 <Route path="/game" component={Game} />
//                 <Route path="/highScores" component={HighScores} />
//             </div>

//            </Routes>
        
//         </Router>
//     );
// }

// export default App;