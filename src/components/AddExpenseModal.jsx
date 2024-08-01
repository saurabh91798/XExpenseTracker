import { useState } from "react";
import "./AddExpenseModal.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddExpenseModal = ({ isOpen, onRequestClose, onAddExpense }) => {
  const [expenseDetails, setExpenseDetails] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleAddExpense = () => {
    const amount = parseInt(expenseDetails.amount);
    if (
      !isNaN(amount) &&
      !(Math.sign(amount) === -1) &&
      expenseDetails.title.length !== 0 &&
      expenseDetails.category.length !== 0 &&
      expenseDetails.date.length !== 0
    ) {
      onAddExpense({
        ...expenseDetails,
        amount: parseInt(expenseDetails.amount),
        date: new Date(expenseDetails.date).getTime(),
      });
      setExpenseDetails({
        title: "",
        amount: "",
        category: "",
        date: "",
      });
      onRequestClose();
    } else {
      alert("Please Enter Valid Details");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Expense"
      className="addexpensemodal"
      overlayClassName="addexpenseoverlay"
    >
      <h2 className="addexpenseheading">Add Expenses</h2>
      <div className="addexpensemodalinputs">
        <input
          className="addexpenseinput"
          type="text"
          value={expenseDetails.title}
          onChange={(e) =>
            setExpenseDetails({ ...expenseDetails, title: e.target.value })
          }
          placeholder="Title"
        />
        <input
          className="addexpenseinput"
          type="text"
          value={expenseDetails.amount}
          onChange={(e) =>
            setExpenseDetails({
              ...expenseDetails,
              amount: e.target.value.replace(/\D/g, ""),
            })
          }
          placeholder="Price"
        />
        <select
          className="addexpenseinput"
          value={expenseDetails.category}
          onChange={(e) =>
            setExpenseDetails({ ...expenseDetails, category: e.target.value })
          }
        >
          <option disabled value="" hidden>
            Select Category
          </option>
          <option value={"entertainment"}>Entertainment</option>
          <option value={"travel"}>Travel</option>
          <option value={"food"}>Food</option>
        </select>
        <input
          className="addexpenseinput"
          type="date"
          value={expenseDetails.date}
          onChange={(e) => {
            setExpenseDetails({ ...expenseDetails, date: e.target.value });
          }}
          placeholder="dd/mm/yyyy"
        />
        <button className="addexpensebutton" onClick={handleAddExpense}>
          Add Expense
        </button>
        <button
          className="expensecancelbutton"
          onClick={() => {
            setExpenseDetails({
              title: "",
              amount: "",
              category: "",
              date: "",
            });
            onRequestClose();
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
