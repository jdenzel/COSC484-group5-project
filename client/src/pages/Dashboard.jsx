import React from "react";
import "./styles/Dashboard.css";

const Dashboard = () => {
  // place holders for now
  const transactions = [
    { id: 1, description: "Chipotle", amount: 12, type: "expense" },
    { id: 2, description: "Paycheck", amount: 1200, type: "income" },
    { id: 3, description: "Netflix", amount: 15, type: "expense" }
  ];

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Top cards that show Balance, Income, and Expenses */}
      <div className="cards">
        <div className="card">
          <h3>Balance</h3>
          <p>${balance}</p>
        </div>

        <div className="card">
          <h3>Income</h3>
          <p>${income}</p>
        </div>

        <div className="card">
          <h3>Expenses</h3>
          <p>${expenses}</p>
        </div>
      </div>

      {/* Transaction table */}
      <div className="transactions">
        <h2>Recent Transactions</h2>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.description}</td>
                <td>${t.amount}</td>
                <td>{t.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;