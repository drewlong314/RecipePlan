import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import Calendar from "./Calendar";

function CalendarModal({day, time}) {
  const dispatch = useDispatch();
  //   const showModal = useSelector((state) => state.modals.create);
  const [showModal, setShowModal] = useState(false);
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
          <Calendar day={day} time={time}/>
        </Modal>
      )}
    </>
  );
}

export default CalendarModal;
