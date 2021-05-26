import Modal from "react-modal";
import { useHistory } from "react-router-dom";

const Submission = ({ modalStatus, setModalStatus }) => {
  const history = useHistory();

  const closeModalFunction = (e) => {
    e.preventDefault();
    history.push("/");
    setModalStatus(false);
  };

  return (
    <Modal
      isOpen={modalStatus}
      onRequestClose={(e) => closeModalFunction(e)}
      className="react-modal"
      ariaHideApp={false}
    >
      <div className="row react-modal-title-container">
        <div className="react-modal-title col-12">
          <h4> Profile Added Successfully</h4>
        </div>
      </div>

      <div className="modal-body pt-0">
        <div className="row">
          <div className="col-12">
            <span>
              Thank you! If you land a job through this initiative, please do
              leave a message at{" "}
              <span className="text-primary"> help@awsug.in </span> or{" "}
              <a
                href="https://twitter.com/awsugindia"
                target="_blank"
                className="text-primary"
                rel="noreferrer"
              >
                {" "}
                @awsugindia{" "}
              </a>{" "}
              handle to know the community is on the right track.
            </span>
          </div>
        </div>

        <div className="row text-end mt-3">
          <div className="col-12">
            <button
              className="btn btn-primary font-14 text-white btn-lg"
              onClick={(e) => closeModalFunction(e)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Submission;
