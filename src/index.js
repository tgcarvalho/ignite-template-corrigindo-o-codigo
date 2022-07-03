const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repos = repositories.find(repository => repository.id === id);

  if (!repos) {
    return response.status(404).json({ error: "Repository not found" });
  }

  title !== '' ? repos.title = title : repos.title = repos.title;
  url !== '' ? repos.url = url : repos.url = repos.url;
  techs !== '' ? repos.techs = techs : repos.techs = repos.techs;

  return response.json(repos);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find(repository => repository.id === id);

  if (repo) {
    repo.likes = repo.likes + 1;
    return response.json(repo);
  } else {
    return response.status(404).json({ error: "Repository not found" });
  }
});

module.exports = app;
