import "./TransactionItem.css";
import { PiPizzaThin } from "react-icons/pi";
import TransactionActionButton from "./TransactionActionButton";

const TransactionItem = ({
  transaction,
  transactionid,
  editHandler,
  deleteHandler,
}) => {
  console.log(transaction, transactionid, editHandler, deleteHandler);
  return (
    <>
      <div className="transactionItem">
        <div className="transactionDetails">
          <div className="transactionIcon">
            <PiPizzaThin />
          </div>
          <div className="transactionTitle">
            <h3 className="transactionName">{transaction.title}</h3>
            <p className="transactionDate">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="transactionActions">
          <p className="transactionAmount">&#8377;{transaction.amount}</p>
          <div className="actionButtons">
            <TransactionActionButton
              action={"remove"}
              transactionid={transactionid}
              clickHandler={deleteHandler}
            />
            <TransactionActionButton
              action={"edit"}
              transactionid={transactionid}
              clickHandler={editHandler}
            />
          </div>
        </div>
      </div>
      <div className="transactionDivider" />
    </>
  );
};

export default TransactionItem;
