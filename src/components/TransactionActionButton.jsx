import "./TransactionActionButton.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoPencil } from "react-icons/go";

const TransactionActionButton = ({ action, transactionid, clickHandler }) => {
  return (
    <>
      <button
        onClick={() => {
          clickHandler(transactionid);
        }}
        className={
          action === "remove" ? "removeTransaction" : "editTransaction"
        }
      >
        {action === "remove" ? (
          <>
            <IoIosCloseCircleOutline />
          </>
        ) : (
          <>
            <GoPencil />
          </>
        )}
      </button>
    </>
  );
};

export default TransactionActionButton;
