/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Formik, FieldArray } from "formik";
import { experienceFilter } from "../../Helpers/constants";
import Chevron from "./Chevron";
import "./Accordin.css";

function Accordion({
  displayHeading,
  mappingName,
  filtersArray,
  finalArray,
  setFinalArray,
  filterData,
  filterHelper,
  setfilterHelper,
}) {
  // State Variables
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");
  let initalArray = [];
  const content = useRef(null);

  useEffect(() => {
    if (filterHelper) {
      clearingFilters();
    }
  }, [filterHelper]);

  // Helper Function for Accordian
  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  };

  // Function to clear all filters
  const clearingFilters = () => {
    document.getElementById(mappingName).reset();
    setfilterHelper(false);
  };

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <span className="accordion__title">{displayHeading}</span>
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
                <form id={mappingName}>
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
                                // Mapping for just Experience filter
                                if (experienceFilter.includes(filters)) {
                                  arrayHelpers.push(
                                    experienceFilter.indexOf(filters) + 1
                                  );
                                  finalArray[mappingName].push(
                                    experienceFilter.indexOf(filters) + 1
                                  );
                                } else {
                                  arrayHelpers.push(filters);
                                  finalArray[mappingName].push(filters);
                                }
                                setFinalArray(finalArray);
                                filterData(finalArray);
                              } else {
                                const filter =
                                  values.initalArray.indexOf(filters);
                                arrayHelpers.remove(filter);

                                let finalIdx;
                                // Mapping for just Experience filter
                                if (experienceFilter.includes(filters)) {
                                  finalIdx = finalArray[mappingName].indexOf(
                                    experienceFilter.indexOf(filters) + 1
                                  );
                                } else {
                                  finalIdx =
                                    finalArray[mappingName].indexOf(filters);
                                }
                                if (finalIdx > -1) {
                                  finalArray[mappingName].splice(finalIdx, 1);
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
                        finalArray[mappingName] = [];
                        document.getElementById(mappingName).reset();
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
