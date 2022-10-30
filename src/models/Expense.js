import { v4 as uuidv4 } from "uuid";

class Expense {
  constructor({
    name = "",
    amount = 0,
    note,
    timestamp,
    categoryId = null,
    transactionsCount = 0,
  }) {
    this.id = uuidv4();
    this.name = name;
    this.amount = amount;
    this.note = note;
    this.timestamp = timestamp;
    this.categoryId = categoryId;
    this.transactionsCount = transactionsCount;
  }

  setCategoryId(id) {
    this.categoryId = id;
  }

  updateTransactionsCount() {
    this.transactionsCount++;
  }
}

export default Expense;