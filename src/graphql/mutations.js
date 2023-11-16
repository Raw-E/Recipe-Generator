/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addRecipe = /* GraphQL */ `
  mutation AddRecipe(
    $title: String!
    $ingredients: [String]
    $instructions: [String]
  ) {
    addRecipe(
      title: $title
      ingredients: $ingredients
      instructions: $instructions
    ) {
      id
      variationID
      title
      ingredients
      instructions
      __typename
    }
  }
`;
