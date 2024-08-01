import { useEffect, useState, useRef } from "react";
import { useSnackbar } from "notistack";
import WalletDetail from "./components/WalletDetail";
import TransactionItem from "./components/TransactionItem";
import PieRepresentation from "./components/PieRepresentation";
import ExpenseRepresentation from "./components/ExpenseRepresentation";
import Pagination from "./components/Pagination";
import AddBalanceModal from "./components/AddBalanceModal";
import AddExpenseModal from "./components/AddExpenseModal";
import EditExpenseModal from "./components/EditExpenseModal";
import "./App.css";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  let totalRerenders = useRef(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [expensesAmount, setExpensesAmount] = useState(0);
  const [transactionList, setTransactionList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    totalRerenders.current += 1;
    console.log(
      "Total Re-Renders of App Component => ",
      totalRerenders.current
    );
  });

  useEffect(() => {
    if (!dataLoaded) {
      const loadData = () => {
        // Getting Wallet Balance on Initial Load
        const savedWalletBalance = localStorage.getItem("WalletBalance");
        if (savedWalletBalance === null) {
          localStorage.setItem("WalletBalance", 5000);
          setWalletBalance(5000);
        } else {
          setWalletBalance(parseInt(savedWalletBalance, 10));
        }

        // Getting Expenses Amount on Initial Load
        const savedExpenseAmount = localStorage.getItem("ExpenseAmount");
        if (savedExpenseAmount === null) {
          localStorage.setItem("ExpenseAmount", 0);
          setExpensesAmount(0);
        } else {
          setExpensesAmount(parseInt(savedExpenseAmount, 10));
        }

        // Getting Transaction List on Initial Load
        const savedTransactionList = JSON.parse(
          localStorage.getItem("TransactionList")
        );
        if (
          savedTransactionList === null ||
          savedTransactionList.length === 0
        ) {
          localStorage.setItem("TransactionList", JSON.stringify([]));
          setTransactionList([]);
        } else {
          setTransactionList(savedTransactionList);
        }

        // Getting Expenses List on Initial Load
        const savedExpensesList = JSON.parse(
          localStorage.getItem("ExpensesList")
        );
        if (savedExpensesList === null || savedExpensesList.length === 0) {
          localStorage.setItem("ExpensesList", JSON.stringify([]));
          setExpensesList([]);
        } else {
          setExpensesList(savedExpensesList);
        }
      };

      loadData();
      setDataLoaded(true);
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("WalletBalance", walletBalance);
    }
  }, [walletBalance, dataLoaded]);

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("ExpenseAmount", expensesAmount);
    }
  }, [expensesAmount, dataLoaded]);

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("TransactionList", JSON.stringify(transactionList));
      const categoryTotals = transactionList.reduce((acc, transaction) => {
        const { category, amount } = transaction;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += parseInt(amount, 10);
        return acc;
      }, {});

      const newExpensesList = Object.keys(categoryTotals).map((category) => ({
        category: category.toUpperCase(),
        amount: categoryTotals[category],
      }));

      setExpensesList(newExpensesList);
    }
  }, [transactionList, dataLoaded]);

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("ExpensesList", JSON.stringify(expensesList));
    }
  }, [expensesList, dataLoaded]);

  const [addBalanceModalIsOpen, setAddBalanceModalIsOpen] = useState(false);
  const [addExpenseModalIsOpen, setAddExpenseModalIsOpen] = useState(false);
  const [editExpenseModalIsOpen, setEditExpenseModalIsOpen] = useState({
    openstatus: false,
    currentexpense: {},
    transactionid: -1,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactionList.slice(indexOfFirstItem, indexOfLastItem);

  const openAddBalanceModal = () => setAddBalanceModalIsOpen(true);
  const closeAddBalanceModal = () => setAddBalanceModalIsOpen(false);

  const openAddExpenseModal = () => setAddExpenseModalIsOpen(true);
  const closeAddExpenseModal = () => setAddExpenseModalIsOpen(false);

  const openEditExpenseModal = (index) => {
    setEditExpenseModalIsOpen({
      openstatus: true,
      currentexpense: transactionList[indexOfFirstItem + index],
      transactionid: index,
    });
  };
  const closeEditExpenseModal = () =>
    setEditExpenseModalIsOpen({
      openstatus: false,
      currentexpense: {},
      transactionid: -1,
    });

  const handleAddBalance = (amount) => {
    setWalletBalance(
      (prevAmount) => parseInt(prevAmount, 10) + parseInt(amount, 10)
    );
    enqueueSnackbar("Balance Added Successfully", {
      variant: "success",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
      className: "notification",
    });
  };
  const handleAddExpense = (expensedata) => {
    if (parseInt(expensedata.amount) > parseInt(walletBalance)) {
      enqueueSnackbar(
        "You Don't have Sufficient Balance to add more expenses",
        {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          className: "notification",
        }
      );
      return;
    }

    setExpensesAmount(
      (prevExpenses) =>
        parseInt(prevExpenses, 10) + parseInt(expensedata.amount, 10)
    );
    setWalletBalance(
      (prevWalletBalance) =>
        parseInt(prevWalletBalance, 10) - parseInt(expensedata.amount, 10)
    );
    setTransactionList((prevTransactions) => [
      ...prevTransactions,
      expensedata,
    ]);
    enqueueSnackbar("Expense Added Successfully", {
      variant: "success",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
      className: "notification",
    });
  };
  const handleEditExpense = (updatedExpenseData, oldExpenseDataIndex) => {
    if (
      parseInt(updatedExpenseData.amount) >
      parseInt(walletBalance) +
        parseInt(transactionList[oldExpenseDataIndex + indexOfFirstItem].amount)
    ) {
      enqueueSnackbar(
        "You Don't have Sufficient Balance to Edit current expense with higher amount",
        {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          className: "notification",
        }
      );
      return;
    }

    const newTransactionList = transactionList.map((transaction, index) => {
      if (index === oldExpenseDataIndex + indexOfFirstItem) {
        return {
          ...updatedExpenseData,
          date: new Date(updatedExpenseData.date).getTime(),
        };
      }
      return transaction;
    });

    const categoryTotals = newTransactionList.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = parseInt(0);
      }
      acc[category] = parseInt(acc[category]) + parseInt(amount);
      return acc;
    }, {});

    const newExpensesList = Object.keys(categoryTotals).map((category) => ({
      category,
      amount: parseInt(categoryTotals[category]),
    }));

    setTransactionList(newTransactionList);
    setExpensesList(newExpensesList);

    const amountToRemove = parseInt(
      transactionList[oldExpenseDataIndex + indexOfFirstItem].amount
    );
    const amountToAdd = parseInt(updatedExpenseData.amount);
    const adjustedExpenseAmount = amountToAdd - amountToRemove;
    setExpensesAmount(
      (prev) => parseInt(prev) + parseInt(adjustedExpenseAmount)
    );
    setWalletBalance(
      (prev) => parseInt(prev) - parseInt(adjustedExpenseAmount)
    );

    enqueueSnackbar("Expense Updated Successfully", {
      variant: "success",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
      className: "notification",
    });
  };

  const deleteTransactionItem = (indexToDelete) => {
    const filteredTransactionList = transactionList.filter(
      (transactions, index) => {
        return index !== indexToDelete + indexOfFirstItem;
      }
    );
    setWalletBalance(
      (prev) =>
        parseInt(prev) +
        parseInt(transactionList[indexToDelete + indexOfFirstItem].amount)
    );
    setExpensesAmount(
      (prev) =>
        parseInt(prev) -
        parseInt(transactionList[indexToDelete + indexOfFirstItem].amount)
    );
    setTransactionList([...filteredTransactionList]);
    enqueueSnackbar("Expense Deleted Successfully", {
      variant: "success",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
      className: "notification",
    });
  };

  return (
    <>
      <div className="main">
        <h1 className="heading">Expense Tracker</h1>
        <div className="tracker">
          <div className="top">
            <div className="balanceandexpenses">
              <WalletDetail
                title={"Wallet Balance"}
                amount={walletBalance}
                theme={"green"}
                buttontext={"+ Add Income"}
                clickHandler={openAddBalanceModal}
                type={"addincome"}
              />
              <WalletDetail
                title={"Expenses"}
                amount={expensesAmount}
                theme={"red"}
                buttontext={"+ Add Expense"}
                clickHandler={openAddExpenseModal}
                type={"addexpense"}
              />
            </div>
            <div className="piesection">
              {expensesList.length === 0 ? (
                <>
                  <div className="emptyPie">
                    Start adding expenses to visualize your spending! 📈
                  </div>
                </>
              ) : (
                <>
                  <PieRepresentation data={expensesList} />
                </>
              )}
            </div>
          </div>
          <div className="bottom">
            <div className="transactions">
              <h2 className="secondaryheading">Recent Transactions</h2>
              <div className="transactioncontent">
                {transactionList.length === 0 ? (
                  <>
                    <div className="emptyTransactionList">
                      Add transactions to see your spending history! 🧾
                    </div>
                  </>
                ) : (
                  <>
                    {currentItems.map((transaction, index) => (
                      <TransactionItem
                        key={index}
                        transactionid={index}
                        transaction={transaction}
                        editHandler={openEditExpenseModal}
                        deleteHandler={deleteTransactionItem}
                      />
                    ))}
                    <Pagination
                      totalItems={transactionList.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="expenses">
              <h2 className="secondaryheading">Top Expenses</h2>
              <div className="expensecontent">
                {expensesList.length === 0 ? (
                  <>
                    <div className="emptyBarChart">
                      Add your first expense to track spending! 📒
                    </div>
                  </>
                ) : (
                  <>
                    <ExpenseRepresentation data={expensesList} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddBalanceModal
        isOpen={addBalanceModalIsOpen}
        onRequestClose={closeAddBalanceModal}
        onAddBalance={handleAddBalance}
      />
      <AddExpenseModal
        isOpen={addExpenseModalIsOpen}
        onRequestClose={closeAddExpenseModal}
        onAddExpense={handleAddExpense}
      />
      <EditExpenseModal
        isOpen={editExpenseModalIsOpen.openstatus}
        onRequestClose={closeEditExpenseModal}
        onEditExpense={handleEditExpense}
        currentExpenseData={editExpenseModalIsOpen.currentexpense}
        transactionid={editExpenseModalIsOpen.transactionid}
      />
    </>
  );
}

export default App;
