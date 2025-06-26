// src/data/elemetManager.js

import { v4 as uuidv4 } from "uuid";

const getRandomTotalItems = () => {
  const choices = [0, 8, 9];
  return choices[Math.floor(Math.random() * choices.length)];
};

export const mocksUniversalElements = Array.from({ length: 5 }).map((_, i) => {
  const name = `Category ${i + 1}`;
  const totalItems = getRandomTotalItems();

  const listItems = Array.from({ length: totalItems }).map((_, j) => {
    const itemNumber = j + 1;
    return {
      id: uuidv4(),
      name: `Element ${itemNumber}`,
      code: `E${String(itemNumber).padStart(2, "0")}`,
    };
  });

  return {
    id: uuidv4(),
    name,
    totalItems,
    listItems,
  };
});
