import React, { useState } from 'react';

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
      <h1>Score:</h1>
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
    </div>
  );
}
