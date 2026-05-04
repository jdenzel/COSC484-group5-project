import SpendingTrendWidget from "./SpendingTrendWidget.jsx";
import BudgetBarWidget from "./BudgetBarWidget.jsx";

export const WIDGET_DEFS = [
  {
    id:    "spending_trend", title: "Spending Trend", icon:  "↗", color: "#4caf50", w: 420, h: 300,},
  { id: "budget_bar", title: "Budget Overview", icon: "◎", color: "#a5d6a7", w: 380, h: 300 }
  // Add more widgets
];

export const INITIAL_POSITIONS = {
  spending_trend: { x: 24, y: 24 },
  budget_bar: { x: 460, y: 24 }
};

export const WIDGET_CONTENT = {
  spending_trend: <SpendingTrendWidget />,
  budget_bar: <BudgetBarWidget />
};
