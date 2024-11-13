document.addEventListener("DOMContentLoaded", () => {
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const dateInput = document.getElementById("date");
  const addExpenseButton = document.getElementById("add-expense");
  const expensesList = document.getElementById("expenses-list");
  const totalExpenses = document.getElementById("total-expenses");

  let expenses = [];

  function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpenses.innerText = `Total das Despesas: R$${total.toFixed(2)}`;
  }

  function renderExpenses() {
    expensesList.innerHTML = "";
    expenses.forEach((expense, index) => {
      const expenseItem = document.createElement("div");
      expenseItem.className = "expense-item";
      expenseItem.innerHTML = `
                ${expense.description} - R$${expense.amount.toFixed(2)} - ${
        expense.date
      }
                <button class="edit" onclick="editExpense(${index})">Alterar</button>
                <button class="delete" onclick="deleteExpense(${index})">Excluir</button>
            `;
      expensesList.appendChild(expenseItem);
    });
  }

  addExpenseButton.addEventListener("click", () => {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (description && !isNaN(amount) && date) {
      const newExpense = { description, amount, date };
      expenses.push(newExpense);
      renderExpenses();
      updateTotal();
      descriptionInput.value = "";
      amountInput.value = "";
      dateInput.value = "";
    }
  });

  window.editExpense = function (index) {
    const expense = expenses[index];
    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    dateInput.value = expense.date;
    expenses.splice(index, 1);
    renderExpenses();
    updateTotal();
  };

  window.deleteExpense = function (index) {
    expenses.splice(index, 1);
    renderExpenses();
    updateTotal();
  };
});
