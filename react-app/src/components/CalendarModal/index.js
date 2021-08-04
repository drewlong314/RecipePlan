import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import Calendar from "./Calendar";

function CalendarModal() {
  const dispatch = useDispatch();
  //   const showModal = useSelector((state) => state.modals.create);
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  return (
    <>
      <button
        className={"calendar-options__button"}
        // onClick={() => {
        //   dispatch(showCreate());
        // }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Recipe
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Calendar />
        </Modal>
      )}
    </>
  );
}

export default CalendarModal;
