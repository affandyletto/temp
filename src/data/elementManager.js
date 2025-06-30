// src/data/elemetManager.js

import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

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

export const mocksElements = Array.from({ length: 5 }).map((_, i) => {
  return {
    id: uuidv4(),
    name: `Element ${i + 1}`,
    total: faker.number.int({ min: 0, max: 20 }),
    selected: i === 0,
  };
});

export const mocksAccessories = Array.from({ length: 15 }).map((_, i) => {
  return {
    id: uuidv4(),
    name: `Accesory ${i + 1}`,
    price: faker.number.int({ min: 10, max: 80 }),
    selected: false,
  };
});

const getRandomTotalSuper = () => {
  const choices = [0, 4, 5];
  return choices[Math.floor(Math.random() * choices.length)];
};

export const mocksSuperCategories = Array.from({ length: 3 }).map((_, superIndex) => {
  const superName = `Super Category ${superIndex + 1}`;

    const totalCategories = getRandomTotalSuper();
    const listCategories = Array.from({ length: totalCategories }).map((_, catIndex) => {
    const categoryName = `Category ${superIndex + 1}-${catIndex + 1}`;

    const totalItems = getRandomTotalItems();
    const listItems = Array.from({ length: totalItems }).map((_, elIndex) => {
      const num = elIndex + 1;
      return {
        id: uuidv4(),
        name: `Element ${num}`,
        code: `E${String(num).padStart(2, "0")}`,
      };
    });

    return {
      id: uuidv4(),
      name: categoryName,
      totalItems,
      listItems,
    };
  });

  return {
    id: uuidv4(),
    name: superName,
    totalCategories,
    listCategories,
  };
});
