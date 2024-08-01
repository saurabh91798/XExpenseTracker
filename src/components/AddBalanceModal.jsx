import { useState } from "react";
import Modal from "react-modal";
import "./AddBalanceModal.css";

Modal.setAppElement("#root");

const AddBalanceModal = ({ isOpen, onRequestClose, onAddBalance }) => {
  const [balanceAmount, setBalanceAmount] = useState("");
  const handleAddBalance = () => {
    const amount = parseInt(balanceAmount);
    if (!isNaN(amount)) {
      onAddBalance(amount);
      setBalanceAmount("");
      onRequestClose();
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Income"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="addbalancemodalheading">Add Balance</h2>
      <div className="addbalancemodalinputs">
        <input
          type="text"
          value={balanceAmount}
          onChange={(e) => setBalanceAmount(e.target.value.replace(/\D/g, ""))}
          placeholder="Income Amount"
        />
        <button className="addbalancebutton" onClick={handleAddBalance}>
          Add Balance
        </button>
        <button
          className="cancelbutton"
          onClick={() => {
            setBalanceAmount("");
            onRequestClose();
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddBalanceModal;
