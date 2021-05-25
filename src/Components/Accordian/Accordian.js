/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Chevron from "./Chevron";
import { Formik, FieldArray } from "formik";
import "./Accordin.css";

function Accordion({
  title,
  filtersArray,
  finalArray,
  setFinalArray,
  filterData,
  smileHelper,
  setSmileHelper,
}) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");
  let initalArray = [];

  useEffect(() => {
    if (smileHelper) {
      helloWorld();
    }
  }, [smileHelper]);

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  const helloWorld = () => {
    document.getElementById(title).reset();
    setSmileHelper(false);
  };

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <span className="accordion__title">
          {title === "industry"
            ? "Industries"
            : title === "city"
            ? "Cities"
            : title === "skills"
            ? "Skills"
            : "Job Roles"}
        </span>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <Formik
          initialValues={{ initalArray }}
          render={({ values }) => (
            <FieldArray
              name="finalArray"
              render={(arrayHelpers) => (
                <form id={title}>
                  <div className="skills_list px-2">
                    {filtersArray &&
                      filtersArray.map((filters, idx) => (
                        <div className="form-check" key={idx}>
                          <input
                            className="form-check-input font-12"
                            type="checkbox"
                            id={filters.replace(/ /g, "")}
                            style={{ marginTop: "7px" }}
                            onChange={(e) => {
                              if (e.target.checked) {
                                arrayHelpers.push(filters);
                                finalArray[title].push(filters);
                                const temp = finalArray;
                                setFinalArray(temp);
                                filterData(finalArray);
                              } else {
                                const rashmi =
                                  values.initalArray.indexOf(filters);
                                arrayHelpers.remove(rashmi);
                                const finalIdx =
                                  finalArray[title].indexOf(filters);
                                if (finalIdx > -1) {
                                  finalArray[title].splice(finalIdx, 1);
                                }
                                setFinalArray(finalArray);
                                filterData(finalArray);
                              }
                            }}
                          />
                          <label
                            className="form-check-label font-12 text-break"
                            htmlFor="defaultCheck1"
                            style={{ color: "black" }}
                          >
                            {filters}
                          </label>
                        </div>
                      ))}
                  </div>
                  <div className="clear_all">
                    <div
                      className="px-2 py-1 clear_all_div"
                      onClick={() => {
                        finalArray[title] = [];
                        document.getElementById(title).reset();
                        filterData(finalArray);
                      }}
                    >
                      Clear
                    </div>
                  </div>
                </form>
              )}
            />
          )}
        />
      </div>
    </div>
  );
}

export default Accordion;
