import React, { useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import Modal from "react-overlays/Modal";
import "./App.css";
const FADE_DURATION = 500;
const AModal = styled(Modal)`
  position: fixed;
  width: 400px;
  z-index: 1040;
  top: 20px;
  left: 30px;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;
const fadeStyles = {
  entering: "show",
  entered: "show"
};
const Fade = ({ children, ...props }) => (
  <Transition {...props} timeout={FADE_DURATION}>
    {(status, innerProps) =>
      React.cloneElement(children, {
        ...innerProps,
        className: `fade ${fadeStyles[status]} ${children.props.className}`
      })
    }
  </Transition>
);
export default function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="btn btn-primary mr-3"
        onClick={() => setShowModal((prev) => !prev)}
      >
        Show Animated Modal
      </button>
      <AModal
        show={showModal}
        onHide={() => setShowModal(false)}
        transition={Fade}
        backdropTransition={Fade}
        renderBackdrop={(props) => (
          <div {...props} className="backdrop absolute inset-0 bg-black z-40" />
        )}
        renderDialog={(props) => (
          <div
            {...props}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="dialog bg-white shadow rounded-lg pointer-events-auto">
              <h4 id="modal-label">I&apos;m fading in!</h4>
              <p>Anim pariatur</p>
              <button
                type="button"
                className="btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}