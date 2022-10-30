const BIT = 'העברה ב BIT בנה"פ';
const BIT_INCOME = "bit העברת כסף";
const BANK = "העב' לאחר-נייד";
const PAYBOX = "PAYBOX";

export const isThirdPartyTransaction = (name) => {
  return [BIT, BIT_INCOME, BANK, PAYBOX].includes(name);
};

export const aggregateTransactionsByName = (transactions) => {
  const aggregatedTransactions = [];

  for (const transaction of transactions) {
    const { name, amount, id } = transaction;

    if (isThirdPartyTransaction(name)) {
      transaction.updateTransactionsCount &&
        transaction.updateTransactionsCount();
      aggregatedTransactions.push(transaction);
      continue;
    }

    const transactionIndex = aggregatedTransactions.findIndex(
      (aggregatedTransaction) => aggregatedTransaction.name === name
    );

    const hasTransactionName = transactionIndex !== -1;

    if (transaction?.name === "מזנון בריכת גורדון") {
      console.log("transaction", transaction);
    }

    if (hasTransactionName) {
      transaction.updateTransactionsCount &&
        transaction.updateTransactionsCount();
      // console.log(aggregatedTransactions[transactionIndex]);
      aggregatedTransactions[transactionIndex].amount += amount;
      aggregatedTransactions[transactionIndex].transactions = [
        ...(aggregatedTransactions[transactionIndex].transactions || []),
        transaction,
      ];
      continue;
    }

    // console.debug("transaction", transaction);
    aggregatedTransactions.push({
      ...transaction,
      transactions: [transaction],
    });
  }

  return aggregatedTransactions;
};

// TODO:
// const getCategories = () => {
//   try {
//     const categories = JSON.parse(localStorage.getItem("categories"));
//     return categories
//       ? categories.map((category) => {
//           return new Category(category);
//         })
//       : [];
//   } catch (error) {
//     const Wolt = new Category({ name: "Wolt/Cibus" });
//     const Groceries = new Category({ name: "Groceries" });
//     const Resturants = new Category({ name: "Resturants/Cafes" });
//     const Bars = new Category({ name: "Bars/Pubs" });

//     const Eating = new Category({
//       name: "Eating",
//       subcategoriesIds: [Wolt.id, Groceries.id, Resturants.id, Bars.id],
//     });

//     const Lime = new Category({ name: "Lime/Bird" });
//     const Bus = new Category({ name: "Bus/Train/Other" });
//     const Kia = new Category({ name: "KIA" });

//     const Trasnportation = new Category({
//       name: "Trasnportation",
//       subcategoriesIds: [Lime.id, Bus.id, Kia.id],
//     });

//     const Rent = new Category({ name: "Rent" });
//     const Internet = new Category({ name: "Internet" });
//     const Electricity = new Category({ name: "Electricity" });
//     const Water = new Category({ name: "Water" });
//     const Vaad = new Category({ name: "Va'ad" });
//     const Arnona = new Category({ name: "Arnona" });
//     const Ella = new Category({ name: "Ella" });
//     const Boni = new Category({ name: "Boni" });

//     const Household = new Category({
//       name: "Household",
//       subcategoriesIds: [
//         Rent.id,
//         Internet.id,
//         Electricity.id,
//         Water.id,
//         Vaad.id,
//         Arnona.id,
//         Ella.id,
//         Boni.id,
//       ],
//     });

//     const Therapist = new Category({ name: "Therapist" });
//     const Gordon = new Category({ name: "Gordon" });
//     const Barber = new Category({ name: "Barber" });
//     const Space = new Category({ name: "Space" });
//     const SelfCare = new Category({ name: "Self Care" });
//   }
// };