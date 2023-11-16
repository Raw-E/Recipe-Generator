import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const API_KEY = process.env.API_KEY;

app.post('/add-recipe', (req, res) => {
  const { title, ingredients, instructions } = req.body;

  const mutation = `
    mutation AddRecipe($title: String!, $ingredients: [String!]!, $instructions: [String!]!) {
      addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions) {
        RecipeID
        title
      }
    }
  `;

  const variables = { title, ingredients, instructions };

  fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({ query: mutation, variables }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Recipe added:', data);
    res.json({ message: 'Recipe added successfully', data });
  })
  .catch(error => {
    console.error('Error adding recipe:', error);
    res.status(500).json({ message: 'Error adding recipe', error });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
