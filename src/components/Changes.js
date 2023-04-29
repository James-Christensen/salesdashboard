import React from "react";

import ChangesTable from "./ChangesTable";
//Table that takes in two datasets. One for the most recent week and one for the previous week.
//The table displays the difference between the two datasets and calculates the absolute value and the percentage each segmetn has changed.
function compareData(weekOne, weekTwo) {
  const excludedFields = ["id", "date", "order", "product", "segment"];
  const weeklyChange = [];

  weekOne.forEach((itemOne) => {
    const itemTwo = weekTwo.find((itemTwo) => itemTwo.order === itemOne.order);
    if (itemTwo) {
      const product = itemOne.product;
      const differences = {};
      for (const prop in itemOne) {
        if (!excludedFields.includes(prop)) {
          if (itemOne[prop] === itemTwo[prop]) {
            differences[prop] = 0;
          } else {
            differences[prop] = itemOne[prop] - itemTwo[prop];
          }
        }
      }
      weeklyChange.push({
        [product]: { segment: itemOne.segment, ...differences },
      });
    } else {
      const differences = {};
      for (const prop in itemOne) {
        if (!excludedFields.includes(prop)) {
          differences[prop] = itemOne[prop];
        }
      }
      weeklyChange.push({
        [itemOne.product]: { segment: itemOne.segment, ...differences },
      });
    }
  });

  weekTwo.forEach((itemTwo) => {
    const itemOne = weekOne.find((itemOne) => itemOne.order === itemTwo.order);
    if (!itemOne) {
      const differences = {};
      for (const prop in itemTwo) {
        if (!excludedFields.includes(prop)) {
          differences[prop] = itemTwo[prop];
        }
      }
      weeklyChange.push({
        [itemTwo.product]: { segment: itemTwo.segment, ...differences },
      });
    }
  });

  return weeklyChange.reduce((result, obj) => {
    const key = Object.keys(obj)[0];
    result.push({ product: key, ...obj[key] });
    return result;
  }, []);
}

function compareAllData(weekOne, weekTwo) {
  const excludedFields = ["id", "date", "order", "product", "segment"];
  const weeklyChange = [];

  weekOne.forEach((itemOne) => {
    const itemTwo = weekTwo.find((itemTwo) => itemTwo.order === itemOne.order);
    if (itemTwo) {
      const product = itemOne.product;
      const differences = {};
      for (const prop in itemOne) {
        if (!excludedFields.includes(prop)) {
          if (itemOne[prop] === itemTwo[prop]) {
            differences[prop] = { absolute: 0, percentage: 0 };
          } else {
            const absolute = itemOne[prop] - itemTwo[prop];
            const percentage = ((absolute / itemTwo[prop]) * 100).toFixed(2);
            differences[prop] = { absolute, percentage };
          }
        }
      }
      weeklyChange.push({
        [product]: { segment: itemOne.segment, ...differences },
      });
    } else {
      const differences = {};
      for (const prop in itemOne) {
        if (!excludedFields.includes(prop)) {
          differences[prop] = { absolute: itemOne[prop], percentage: 0 };
        }
      }
      weeklyChange.push({
        [itemOne.product]: { segment: itemOne.segment, ...differences },
      });
    }
  });

  weekTwo.forEach((itemTwo) => {
    const itemOne = weekOne.find((itemOne) => itemOne.order === itemTwo.order);
    if (!itemOne) {
      const differences = {};
      for (const prop in itemTwo) {
        if (!excludedFields.includes(prop)) {
          differences[prop] = { absolute: itemTwo[prop], percentage: 0 };
        }
      }
      weeklyChange.push({
        [itemTwo.product]: { segment: itemTwo.segment, ...differences },
      });
    }
  });

  return weeklyChange.reduce((result, obj) => {
    const key = Object.keys(obj)[0];
    result.push({ product: key, ...obj[key] });
    return result;
  }, []);
}

export default function Changes({ weekOne, weekTwo }) {
  //create resulting array of objects based on the differences between the two datasets.
  const result = compareData(weekOne, weekTwo);
  // console.log(result);

  const resultAll = compareAllData(weekOne, weekTwo);
  console.log(resultAll);
  return (
    <div>
      <ChangesTable data={resultAll} title={"Changes"} />
    </div>
  );
}
