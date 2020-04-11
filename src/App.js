import React, { useState, useEffect, useCallback } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  const handleAddRepository = useCallback(async () => {
    try {
      const { data } = await api.post('/repositories', {
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      })

      setRepositories([
        ...repositories,
        data
      ])
    } catch (err) {
      console.log(err)
    }
  }, [repositories])

  const handleRemoveRepository = useCallback(async (id) => {
    try {
      await api.delete(`/repositories/${id}`);

      const index = repositories.findIndex(repo => repo.id === id);
  
      const updatedRepos = repositories.filter((_, i) => i !== index)

      setRepositories(updatedRepos);
    } catch (err) {
      console.log(err)
    }
  }, [repositories])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
