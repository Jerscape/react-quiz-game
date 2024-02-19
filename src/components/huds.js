export default function HUD({ score, questionNumber }) {
  return (
    <div id="hud">
      <div className="hud-item">
        <p className="hud-prefix">Question {questionNumber}/10</p>
      
      </div>

      <div className="hud-item">
        <p className="hud-prefix">Score</p>
        <h1 className="hud-main-text">{score}/10</h1>
      </div>

    </div>
  );
}