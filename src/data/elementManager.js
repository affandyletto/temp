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

export const generateDummyData3=()=> {
  // Helper function to generate random INTEGER within range
  const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Helper function to generate random color
  const randomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
                   '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Helper function to generate random background color (lighter shades)
  const randomBgColor = () => {
    const bgColors = ['#FFE5E5', '#E5F9F6', '#E5F4FD', '#F0F8F0', '#FFF8E1',
                     '#F5E6FF', '#E8F5F0', '#FDF4E3', '#F0E6F7', '#E1F0FD'];
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  };

  // Helper function to generate random camera URL
  const randomCameraUrl = () => {
    const cameraNumber = Math.floor(Math.random() * 5) + 1; // 1-5
    return `/images/dummyElements/camera${cameraNumber}.png`;
  };
    // Each category gets 3-8 random elements
    const elementCount = Math.floor(randomInRange(3, 9));
    const elements = [];

    for (let i = 0; i < elementCount; i++) {
      const elementId = `E${String(i + 1).padStart(3, '0')}`;
      
      elements.push({
        id: uuidv4(),
        name: `Element ${elementId.substring(1)}`,
        hasInitials: Math.random() > 0.5, // Random true/false
        type: 'marker',
        order: i + 1, // Sequential order within category
        angle: randomInRange(0, 360), // 0-360 degrees
        depth: randomInRange(0, 100), // 0-100 depth
        opacity: Math.floor(Math.random() * 10 + 1) *10, // 0.1-1.0 opacity (rounded to 1 decimal)
        color: randomColor(),
        bgColor: randomBgColor(),
        rotate: randomInRange(-180, 180), // -180 to 180 degrees
        iconRotate: randomInRange(-180, 180), // -180 to 180 degrees
        xposition: randomInRange(-500, 500), // Random X position
        yposition: randomInRange(-500, 500), // Random Y position
        url: randomCameraUrl() // Random camera URL
      });
    }

  return elements;
}


export const generateDummyData=()=> {
  const categories = [
    'Category-01', 'Category-02', 'Category-03', 'Category-04', 'Category-05',
    'Category-06', 'Category-07', 'Category-08', 'Category-09', 'Category-10',
    'Category-11', 'Category-12', 'Category-13', 'Category-14', 'Category-15',
    'Category-16', 'Category-17', 'Category-18', 'Category-19', 'Category-20',
    'Category-21', 'Category-22', 'Category-23', 'Category-24', 'Category-25',
    'Category-26'
  ];

  // Helper function to generate random INTEGER within range
  const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Helper function to generate random color
  const randomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
                   '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Helper function to generate random background color (lighter shades)
  const randomBgColor = () => {
    const bgColors = ['#FFE5E5', '#E5F9F6', '#E5F4FD', '#F0F8F0', '#FFF8E1',
                     '#F5E6FF', '#E8F5F0', '#FDF4E3', '#F0E6F7', '#E1F0FD'];
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  };

  // Helper function to generate random camera URL
  const randomCameraUrl = () => {
    const cameraNumber = Math.floor(Math.random() * 5) + 1; // 1-5
    return `/images/dummyElements/camera${cameraNumber}.png`;
  };

  // Generate elements for each category
  const result = categories.map((category, categoryIndex) => {
    // Each category gets 3-8 random elements
    const elementCount = Math.floor(randomInRange(3, 9));
    const elements = [];

    for (let i = 0; i < elementCount; i++) {
      const elementId = `E${String(categoryIndex * 10 + i + 1).padStart(3, '0')}`;
      
      elements.push({
        id: uuidv4(),
        name: `Element ${elementId.substring(1)}`,
        hasInitials: Math.random() > 0.5, // Random true/false
        type: 'marker',
        order: i + 1, // Sequential order within category
        angle: randomInRange(0, 360), // 0-360 degrees
        depth: randomInRange(0, 100), // 0-100 depth
        opacity: Math.floor(Math.random() * 10 + 1) *10, // 0.1-1.0 opacity (rounded to 1 decimal)
        color: randomColor(),
        bgColor: randomBgColor(),
        rotate: randomInRange(-180, 180), // -180 to 180 degrees
        iconRotate: randomInRange(-180, 180), // -180 to 180 degrees
        xposition: randomInRange(-500, 500), // Random X position
        yposition: randomInRange(-500, 500), // Random Y position
        url: randomCameraUrl() // Random camera URL
      });
    }

    return {
      name: category,
      elements: elements,
      id: uuidv4(),
    };
  });

  return result;
}

export const generateDummyData2 = () => {
  const superCategories = [
    'Super-Category-A', 'Super-Category-B', 'Super-Category-C', 
    'Super-Category-D', 'Super-Category-E', 'Super-Category-F'
  ];

  // Helper function to generate random INTEGER within range
  const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Helper function to generate random color
  const randomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
                   '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Helper function to generate random background color (lighter shades)
  const randomBgColor = () => {
    const bgColors = ['#FFE5E5', '#E5F9F6', '#E5F4FD', '#F0F8F0', '#FFF8E1',
                     '#F5E6FF', '#E8F5F0', '#FDF4E3', '#F0E6F7', '#E1F0FD'];
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  };

  // Helper function to generate random camera URL
  const randomCameraUrl = () => {
    const cameraNumber = Math.floor(Math.random() * 5) + 1; // 1-5
    return `/images/dummyElements/camera${cameraNumber}.png`;
  };

  // Generate super categories with nested categories and elements
  const result = superCategories.map((superCategory, superIndex) => {
    // Each super category gets 2-5 categories
    const categoryCount = randomInRange(2, 5);
    const categories = [];

    for (let catIndex = 0; catIndex < categoryCount; catIndex++) {
      const categoryName = `${superCategory}-Category-${catIndex + 1}`;
      
      // Each category gets 3-8 elements
      const elementCount = randomInRange(3, 8);
      const elements = [];

      for (let elemIndex = 0; elemIndex < elementCount; elemIndex++) {
        const elementId = `E${String(superIndex * 100 + catIndex * 10 + elemIndex + 1).padStart(3, '0')}`;
        
        elements.push({
          id: uuidv4(),
          name: `Element ${elementId.substring(1)}`,
          hasInitials: Math.random() > 0.5, // Random true/false
          type: 'marker',
          order: elemIndex + 1, // Sequential order within category
          angle: randomInRange(0, 360), // 0-360 degrees
          depth: randomInRange(0, 100), // 0-100 depth
          opacity: Math.floor(Math.random() * 10 + 1) * 10, // 10-100 opacity
          color: randomColor(),
          bgColor: randomBgColor(),
          rotate: randomInRange(-180, 180), // -180 to 180 degrees
          iconRotate: randomInRange(-180, 180), // -180 to 180 degrees
          xposition: randomInRange(-500, 500), // Random X position
          yposition: randomInRange(-500, 500), // Random Y position
          url: randomCameraUrl() // Random camera URL
        });
      }

      categories.push({
        id: uuidv4(),
        name: categoryName,
        elements: elements,
        totalElements: elements.length
      });
    }

    return {
      id: uuidv4(),
      name: superCategory,
      categories: categories,
      totalCategories: categories.length
    };
  });

  return result;
}