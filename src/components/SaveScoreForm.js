import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SaveScoreForm({ score }) {

  const [username, setUsername] = useState('');

    const onUserNameChange = (e) => {
    const updatedUsername = e.target.value;
    setUsername(updatedUsername);


  };

  const saveHighScore = (e) => {
    e.preventDefault()
    const record = {
      name: username,
      score
    }
    console.log(username)
    console.log(record)
  }

  return (
    <div>
      <h1>Score: {score}</h1>
      <form  onSubmit={saveHighScore}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="cool kid 123"
          value={username}
          onChange={onUserNameChange}
        />
        <button type="submit">Save</button>
      </form>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </div>
  );
}
