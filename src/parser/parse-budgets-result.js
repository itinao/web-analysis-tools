'use strict';

const parseBudgetsResult = (audits) => {
  const budgetIndex = 'performance-budget';

  return audits[budgetIndex].details.items.reduce(
    (obj, item) => {
      const sizeOverBudget = item.sizeOverBudget ? item.sizeOverBudget : 0;
      return Object.assign({}, obj, {[`${budgetIndex}-${item.resourceType}`]: transferSize})
    }, {}
  );
};

module.exports = parseBudgetsResult;
