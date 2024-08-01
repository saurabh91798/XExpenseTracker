import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EditExpenseModal = ({
  isOpen,
  onRequestClose,
  onEditExpense,
  currentExpenseData,
  transactionid,
}) => {
  const [editExpenseDetails, setEditExpenseDetails] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (currentExpenseData.date) {
      const date = new Date(currentExpenseData.date);
      const formattedDate = date.toISOString().split("T")[0];
      setEditExpenseDetails({ ...currentExpenseData, date: formattedDate });
    } else {
      setEditExpenseDetails(currentExpenseData);
    }
  }, [currentExpenseData]);

  const handleEditExpense = (index) => {
    const amount = parseInt(editExpenseDetails.amount);
    if (
      !isNaN(amount) &&
      editExpenseDetails.title.length !== 0 &&
      editExpenseDetails.category.length !== 0 &&
      editExpenseDetails.date.length !== 0
    ) {
      onEditExpense(editExpenseDetails, index);
      setEditExpenseDetails({
        title: "",
        amount: "",
        category: "",
        date: "",
      });
      onRequestClose();
    } else {
      alert("Please enter a valid Details");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Expense"
      className="addexpensemodal"
      overlayClassName="addexpenseoverlay"
    >
      <h2 className="addexpenseheading">Edit Expenses</h2>
      <div className="addexpensemodalinputs">
        <input
          className="addexpenseinput"
          type="text"
          value={editExpenseDetails.title}
          onChange={(e) =>
            setEditExpenseDetails({
              ...editExpenseDetails,
              title: e.target.value,
            })
          }
          placeholder="Title"
        />
        <input
          className="addexpenseinput"
          type="text"
          value={editExpenseDetails.amount}
          onChange={(e) =>
            setEditExpenseDetails({
              ...editExpenseDetails,
              amount: e.target.value.replace(/\D/g, ""),
            })
          }
          placeholder="Price"
        />
        <select
          className="addexpenseinput"
          value={editExpenseDetails.category}
          onChange={(e) =>
            setEditExpenseDetails({
              ...editExpenseDetails,
              category: e.target.value,
            })
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
          value={editExpenseDetails.date}
          onChange={(e) =>
            setEditExpenseDetails({
              ...editExpenseDetails,
              date: e.target.value,
            })
          }
          placeholder="dd/mm/yyyy"
        />
        <button
          className="addexpensebutton"
          onClick={() => handleEditExpense(transactionid)}
        >
          Add Expense
        </button>
        <button
          className="expensecancelbutton"
          onClick={() => {
            setEditExpenseDetails({
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

export default EditExpenseModal;
