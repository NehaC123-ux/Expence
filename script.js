document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalAmount = document.getElementById('total-amount');
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  const updateTotal = () => {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    totalAmount.textContent = total.toFixed(2);
  };

  const renderExpenses = () => {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
      const expenseRow = document.createElement('tr');
      expenseRow.innerHTML = `
        <td>${expense.name}</td>
        <td>$${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.date || 'N/A'}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editExpense(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
        </td>
      `;
      expenseList.appendChild(expenseRow);
    });
    updateTotal();
  };

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value || new Date().toISOString().split('T')[0];

    if (name && amount && category) {
      expenses.push({ name, amount, category, date });
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
      expenseForm.reset();
    }
  });

  window.editExpense = (index) => {
    const expense = expenses[index];
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-category').value = expense.category;
    document.getElementById('expense-date').value = expense.date;
    deleteExpense(index); // Remove the old entry before editing
  };

  window.deleteExpense = (index) => {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  };

  renderExpenses();
});
