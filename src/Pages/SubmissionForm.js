/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getStates, getCities } from "../CRUD/locations.crud";
import { createProfile } from "../CRUD/talentboard.crud";
import Reaptcha from "reaptcha";
import { Link } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  skills,
  industeries,
  experienceList,
  proficienyLevelList,
} from "../Helpers/constants";
import _ from "lodash";
import SuccessModal from "./SuccessModal";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify";
toast.configure();

const SubmissionForm = () => {
  // State Variables
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [proficienyLevel, setProficiencyLevel] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [skillsList, setSkills] = useState("");
  const [states, setStates] = useState([]);
  const [stateValue, setStateValue] = useState("");
  const [cities, setCities] = useState([]);
  const [cityValue, setCityValue] = useState("");
  const [relocationPossibility, setRelocationPossibility] = useState(false);
  const [profileExpiresIn, setProfileExpiresIn] = useState("2");
  const [acceptTnc, setAcceptTnc] = useState(true);
  const [onVerify, setOnVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  let [errors, setErrors] = useState({});
  let [visited, setVisited] = useState({
    name: false,
    linkedinUrl: false,
    industry: false,
    skillsList: false,
    jobRole: false,
    proficienyLevel: false,
    experience: false,
    cityValue: false,
    stateValue: false,
  });

  // Getting Initial States List
  useEffect(() => {
    getStatesList();
  }, []);

  // Style for Dropdown
  const customStyles = {
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "black",
      transition: "all .2s ease",
      transform: state.isFocused ? "rotate(180deg)" : null,
      borderLeft: "none",
    }),
  };

  // Helper Functions

  // Handle Visited Fields
  const handleVisited = (e) => {
    let { name } = e.target || e;
    _.set(visited, name, true);
    setVisited({ ...visited });
    doValidate();
  };

  // Handling Skills
  const handleChange = (newValue) => {
    setSkills(newValue);
  };

  // Validations
  // Initial Validation
  const doValidate = () => {
    errors = {};

    if ((name.trim() === undefined || name.trim() === "") && visited.name)
      errors.name = "Please enter your name";

    if (
      (industry.value === undefined || industry.value === "") &&
      visited.industry
    )
      errors.industry = "Please enter the industry name";

    if (!skillsList.length > 0 && visited.skillsList)
      errors.skills = "Please enter your skills";

    if (
      (jobRole.trim() === undefined || jobRole.trim() === "") &&
      visited.jobRole
    )
      errors.jobRole = "Please enter your job role";

    if (
      (proficienyLevel.value === undefined || proficienyLevel.value === "") &&
      visited.proficienyLevel
    )
      errors.proficienyLevel = "Please mention your AWS proficiency level";

    if (
      (experience.value === undefined || experience.value === "") &&
      visited.experience
    )
      errors.experience = "Please enter your experience";

    if (
      (linkedinUrl.trim() === undefined || linkedinUrl.trim() === "") &&
      visited.linkedinUrl
    )
      errors.linkedinUrl = "Please enter your LinkedIn URL";

    if (
      linkedinUrl !== "" &&
      linkedinUrl !== null &&
      linkedinUrl !== undefined &&
      visited.linkedinUrl
    ) {
      if (!/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/.test(linkedinUrl))
        errors.linkedinUrl = "Please enter a valid LinkedIn URL.";
    }

    if (
      (stateValue.value === undefined || stateValue.value === "") &&
      visited.stateValue
    )
      errors.stateValue = "Please enter your state";

    if (
      (cityValue.value === undefined || cityValue.value === "") &&
      visited.cityValue
    )
      errors.cityValue = "Please enter your city";

    setErrors(errors);

    if (Object.entries(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // Final Validation
  const finalValidate = () => {
    errors = {};

    if (name.trim() === undefined || name.trim() === "")
      errors.name = "Please enter your name";

    if (industry.value === undefined || industry.value === "")
      errors.industry = "Please enter the industry name";

    if (!skillsList.length > 0) errors.skills = "Please enter your skills";

    if (jobRole.trim() === undefined || jobRole.trim() === "")
      errors.jobRole = "Please enter your job role";

    if (proficienyLevel.value === undefined || proficienyLevel.value === "")
      errors.proficienyLevel = "Please mention your AWS proficiency level";

    if (experience.value === undefined || experience.value === "")
      errors.experience = "Please enter your experience";

    if (linkedinUrl.trim() === undefined || linkedinUrl.trim() === "")
      errors.linkedinUrl = "Please enter your LinkedIn URL";

    if (
      linkedinUrl !== "" &&
      linkedinUrl !== null &&
      linkedinUrl !== undefined
    ) {
      if (!/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/.test(linkedinUrl))
        errors.linkedinUrl = "Please enter a valid LinkedIn URL.";
    }

    if (experience.value === undefined || experience.value === "")
      errors.experience = "Please enter your experience";

    if (stateValue.value === undefined || stateValue.value === "")
      errors.stateValue = "Please enter your state";

    if (cityValue.value === undefined || cityValue.value === "")
      errors.cityValue = "Please enter your city";

    setErrors(errors);

    if (Object.entries(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // API Calls
  // API to get State list
  const getStatesList = async () => {
    const res = await getStates();
    let temp = [];
    for (let i = 0; i < res.data.length; i++) {
      temp.push({
        value: res.data[i].state_name,
        label: res.data[i].state_name,
      });
    }
    setStates(temp);
  };

  // API to get cities list
  const getCitiesList = async (value) => {
    const res = await getCities(value);
    let temp = [];
    for (let i = 0; i < res.data.length; i++) {
      temp.push({
        value: res.data[i].city_name,
        label: res.data[i].city_name,
      });
    }
    setCities(temp);
  };

  // Final Submission
  const submitResponse = async (e) => {
    e.preventDefault();
    const temp = [];
    for (let i = 0; i < skillsList.length; i++) {
      temp.push(skillsList[i].value);
    }
    let expiresAfter = "";
    switch (profileExpiresIn) {
      case 1:
        expiresAfter = String(
          moment(new Date()).add("15", "days")._d.toISOString()
        ).slice(0, 10);
        break;
      case 2:
        expiresAfter = String(
          moment(new Date()).add("30", "days")._d.toISOString()
        ).slice(0, 10);
        break;
      case 3:
        expiresAfter = String(
          moment(new Date()).add("45", "days")._d.toISOString()
        ).slice(0, 10);
        break;
      case 4:
        expiresAfter = String(
          moment(new Date()).add("60", "days")._d.toISOString()
        ).slice(0, 10);
        break;
      case 5:
        expiresAfter = String(
          moment(new Date()).add("90", "days")._d.toISOString()
        ).slice(0, 10);
        break;
      default:
        expiresAfter = String(
          moment(new Date()).add("30", "days")._d.toISOString()
        ).slice(0, 10);
    }

    if (!finalValidate()) return;
    setLoading(true);
    try {
      await createProfile(
        name,
        temp,
        industry.value,
        jobRole,
        proficienyLevel.value,
        profileExpiresIn,
        experience.value,
        relocationPossibility,
        linkedinUrl,
        stateValue.value,
        cityValue.value,
        expiresAfter
      );
      setModalStatus(true);
    } catch (err) {
      let error = err.message;
      toast.error(error, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setLoading(false);
    setName(false);
    setIndustry(false);
    setJobRole(false);
    setProficiencyLevel(false);
    setExperience(false);
    setLinkedinUrl(false);
    setSkills(false);
    setRelocationPossibility(false);
    setProfileExpiresIn("2");
  };

  return (
    <div className="submitdetails">
      <div className="container align-middle">
        <div className="d-flex justify-content-center flex-column m-md-5 my-2">
          <h2 className="mb-3">
            <Link to="/">
              <i className="las la-arrow-left arrow" />{" "}
            </Link>{" "}
            &nbsp; Add Your Profile to Talent Board
          </h2>
          <div className="card border-20 submission_content">
            <form>
              <div className="row p-md-5 p-4 no-gutters">
                <div className="col-lg-6 pr-md-4 pr-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="nameInput"
                      className="form-label mb-1 text-bold"
                    >
                      Full Name*
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="nameInput"
                      maxLength="132"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={handleVisited}
                    />
                    <span className="form-text text-danger">
                      {errors.name || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pl-md-4 pl-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="jobroles"
                      className="form-label mb-1 text-bold"
                    >
                      Job Role*
                    </label>
                    <input
                      name="jobRole"
                      type="text"
                      className="form-control"
                      id="nameInput"
                      maxLength="132"
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      onBlur={handleVisited}
                    />
                    <span className="form-text text-danger">
                      {errors.jobRole || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pr-md-4 pr-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="industeries"
                      className="form-label mb-1 text-bold"
                    >
                      Industry*
                    </label>
                    <Select
                      name="industry"
                      placeholder="Select from options"
                      value={industry}
                      options={industeries}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFF5E5",
                          primary: "#EC7211",
                        },
                      })}
                      styles={customStyles}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      classNamePrefix="react-select-padding"
                      className="react-select-padding"
                      onChange={(event) => {
                        setIndustry({
                          label: event.label,
                          value: event.value,
                        });
                      }}
                      onBlur={(e) => {
                        visited.industry = true;
                        handleVisited(e);
                      }}
                    ></Select>
                    <span className="form-text text-danger">
                      {errors.industry || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pl-md-4 pl-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="awsProficiency"
                      className="form-label mb-1 text-bold"
                    >
                      Experience*
                    </label>
                    <Select
                      placeholder="Select from options"
                      value={experience}
                      options={experienceList}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFF5E5",
                          primary: "#EC7211",
                        },
                      })}
                      styles={customStyles}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      onBlur={(e) => {
                        visited.experience = true;
                        handleVisited(e);
                      }}
                      classNamePrefix="react-select-padding"
                      className="react-select-padding"
                      onChange={(event) => {
                        setExperience({
                          label: event.label,
                          value: event.value,
                        });
                      }}
                    ></Select>
                    <span className="form-text text-danger">
                      {errors.experience || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pr-md-4 pr-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="awsProficiency"
                      className="form-label mb-1 text-bold"
                    >
                      AWS Cloud Proficiency*
                    </label>
                    <Select
                      placeholder="Select from options"
                      value={proficienyLevel}
                      options={proficienyLevelList}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFF5E5",
                          primary: "#EC7211",
                        },
                      })}
                      styles={customStyles}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      classNamePrefix="react-select-padding"
                      className="react-select-padding"
                      onBlur={(e) => {
                        visited.proficienyLevel = true;
                        handleVisited(e);
                      }}
                      onChange={(event) => {
                        setProficiencyLevel({
                          label: event.label,
                          value: event.value,
                        });
                      }}
                    ></Select>
                    <span className="form-text text-danger">
                      {errors.proficienyLevel || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pl-md-4 pl-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="linkedin"
                      className="form-label mb-1 text-bold"
                    >
                      Linkedin Profile*
                    </label>
                    <input
                      id="linkedinUrl"
                      name="linkedinUrl"
                      type="text"
                      className="form-control"
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      value={linkedinUrl}
                      onBlur={handleVisited}
                    />
                    <span className="form-text text-danger">
                      {errors.linkedinUrl || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pr-md-4 pr-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="skills"
                      className="form-label mb-1 text-bold"
                    >
                      SkillSet*
                    </label>
                    <CreatableSelect
                      isMulti
                      isClearable
                      placeholder="Select from options"
                      options={skillsList.length >= 10 ? [] : skills}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFF5E5",
                          primary: "#EC7211",
                        },
                      })}
                      styles={customStyles}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      classNamePrefix="react-select-padding"
                      className="react-select-padding"
                      onChange={handleChange}
                      onBlur={(e) => {
                        visited.skillsList = true;
                        handleVisited(e);
                      }}
                    />
                    <span className="form-text text-danger">
                      {errors.skills || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pl-md-4 pl-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="skills"
                      className="form-label mb-1 text-bold"
                    >
                      State*
                    </label>
                    <Select
                      placeholder="Select from options"
                      value={stateValue}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFF5E5",
                          primary: "#EC7211",
                        },
                      })}
                      styles={customStyles}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      onBlur={(e) => {
                        visited.stateValue = true;
                        handleVisited(e);
                      }}
                      options={states}
                      classNamePrefix="react-select-padding"
                      className="react-select-padding"
                      onChange={(event) => {
                        getCitiesList(event.value);
                        setStateValue({
                          label: event.label,
                          value: event.value,
                        });
                        setCityValue("");
                      }}
                    />
                    <span className="form-text text-danger">
                      {errors.stateValue || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pl-md-4 pl-0 col-xs-12 mb-2">
                  <label
                    htmlFor="skills"
                    className="form-label mb-1 text-bold"
                    style={{ display: "block" }}
                  >
                    {" "}
                    Profile Visibility Duration*{" "}
                    <Tippy
                      content="Once you submit your profile, you cannot edit or delete the profile. You can choose to limit your profile visibility duration to determine the amount of time you want your profile listing to be available.
                      Tip: Once your profile expires, you can submit it again."
                      placement="top"
                      arrow={true}
                      className="custom-tippy"
                    >
                      <i className="la la-info-circle"></i>
                    </Tippy>
                  </label>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="1"
                      checked={profileExpiresIn === "1"}
                      onChange={(e) => setProfileExpiresIn(e.target.id)}
                    />
                    <label
                      className="btn btn-outline-primary autoDeleteProfile"
                      htmlFor="1"
                    >
                      15 Days
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="2"
                      checked={profileExpiresIn === "2"}
                      onChange={(e) => setProfileExpiresIn(e.target.id)}
                    />
                    <label
                      className="btn btn-outline-primary autoDeleteProfile"
                      htmlFor="2"
                    >
                      30 Days
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="3"
                      onChange={(e) => setProfileExpiresIn(e.target.id)}
                      checked={profileExpiresIn === "3"}
                    />
                    <label
                      className="btn btn-outline-primary autoDeleteProfile"
                      htmlFor="3"
                    >
                      45 Days
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="4"
                      onChange={(e) => setProfileExpiresIn(e.target.id)}
                      checked={profileExpiresIn === "4"}
                    />
                    <label
                      className="btn btn-outline-primary autoDeleteProfile"
                      htmlFor="4"
                    >
                      60 Days
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="5"
                      onChange={(e) => setProfileExpiresIn(e.target.id)}
                      checked={profileExpiresIn === "5"}
                    />
                    <label
                      className="btn btn-outline-primary autoDeleteProfile"
                      htmlFor="5"
                    >
                      90 Days
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 pr-md-4 pr-0 col-xs-12 mb-2">
                  <div className="mb-3">
                    <label
                      htmlFor="skills"
                      className="form-label mb-1 text-bold"
                    >
                      City*
                    </label>
                    <Select
                      placeholder="Select from options"
                      value={cityValue}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFF5E5",
                          primary: "#EC7211",
                        },
                      })}
                      styles={customStyles}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      onBlur={(e) => {
                        visited.cityValue = true;
                        handleVisited(e);
                      }}
                      options={cities}
                      classNamePrefix="react-select-padding"
                      className="react-select-padding"
                      onChange={(event) => {
                        setCityValue({
                          label: event.label,
                          value: event.value,
                        });
                      }}
                    />
                    <span className="form-text text-danger">
                      {errors.cityValue || ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 pr-md-4 pr-0 col-xs-12 align-middle">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="relocationPossibility"
                        id="setRelocationPossibilityStatus"
                        checked={relocationPossibility}
                        onChange={(e) =>
                          setRelocationPossibility(e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="setRelocationPossibilityStatus"
                      >
                        Relocation Possibility
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 pl-md-4 pl-0 col-xs-12 mb-2 my-auto">
                  <div className="mb-3">
                    <Reaptcha
                      sitekey="6LcbTeMaAAAAACgLmm78gE8I_wr-ToH3G0U-6ooE"
                      onVerify={() => setOnVerify(true)}
                    />
                  </div>
                </div>
                <div className="col-lg-9 col-xs-12 mb-2">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="acceptTnc"
                      id="setAcceptTncStatus"
                      checked={acceptTnc}
                      onChange={(e) => setAcceptTnc(e.target.checked)}
                    />
                    <label
                      className="form-check-label text-muted font-12"
                      htmlFor="setAcceptTncStatus"
                      style={{ marginTop: "2px" }}
                    >
                      I understand that this is a community driven initiative
                      and that AWS User Group and referrer can only promote the
                      profile and not guarantee a job. I give consent to share
                      the above information be publicly listed and confirm that
                      the details shared (by me) are correct.
                    </label>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-xs-12 mb-2 pr-0 text-md-end text-center"
                  style={{ textAlign: "end" }}
                >
                  <button
                    className="btn btn-primary text-white w-75  border-20"
                    onClick={(e) => submitResponse(e)}
                    disabled={!acceptTnc || loading || !onVerify}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SuccessModal modalStatus={modalStatus} setModalStatus={setModalStatus} />
    </div>
  );
};

export default SubmissionForm;
