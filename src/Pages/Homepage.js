/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import AWSUG from "../Images/communityLogo.png";
import icon from "../Images/icon.svg";
import DataTable from "react-data-table-component";
import Accordion from "../Components/Accordian/Accordian";
import Loader from "../Components/Loader";
import { experienceFilter } from "../Helpers/constants";
import { getPofiles, getFitlers } from "../CRUD/talentboard.crud";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Homepage = () => {
  const defaultFilterMapping = {
    city: [],
    industry: [],
    skills: [],
    jobroles: [],
    experience: [],
  };
  // State Variables
  const [limit, setlimit] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("+name");
  const [data, setData] = useState();
  const [totalPages, setTotalPages] = useState();
  const [filtersArray, setFilters] = useState();
  const [filterHelper, setfilterHelper] = useState(false);
  let [finalArray, setFinalArray] = useState(defaultFilterMapping);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData(limit, 0, searchTerm, sort);
    getFilterData();
  }, []);

  // Getting Profiles
  const getData = async (limits, offsets, searchTerms, sortTerm) => {
    const res = await getPofiles(limits, offsets, searchTerms, sortTerm);
    setData(res.data.profiles);
    setTotalPages(res.data.count);
    setLoading(false);
  };

  // Fetching Filters
  const getFilterData = async () => {
    const res = await getFitlers();
    setFilters(res.data);
  };

  // Searching in Datatable
  const searchTermFun = async (e) => {
    e.preventDefault();
    const res = await getPofiles(limit, 0, searchTerm, sort);
    setCurrentPage(1);
    setData(res.data.profiles);
    setTotalPages(res.data.count);
  };

  // Data Table Related Functions
  const handlePageChange = (page) => {
    getData(limit, (page - 1) * limit, searchTerm, sort);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    getData(newPerPage, (page - 1) * limit, searchTerm, sort);
    setlimit(newPerPage);
  };

  // Clearing all filters
  const clearAll = async () => {
    setFinalArray(defaultFilterMapping);
    setfilterHelper(true);
    const res = await getPofiles(limit, 0, searchTerm, sort);
    setCurrentPage(1);
    setData(res.data.profiles);
    setTotalPages(res.data.count);
  };

  // Fetching Data After Adding Filters
  const filterData = async (finalArrayValue) => {
    const res = await getPofiles(limit, 0, searchTerm, sort, finalArrayValue);
    setCurrentPage(1);
    setData(res.data.profiles);
    setTotalPages(res.data.count);
  };

  // Sorting Data Table Fields
  const sortingFunction = async (e, sortValue) => {
    e.preventDefault();
    const res = await getPofiles(limit, 0, searchTerm, sortValue);
    setCurrentPage(1);
    setData(res.data.profiles);
    setSort(sortValue);
    setTotalPages(res.data.count);
  };

  // Data Table
  const columns = [
    {
      minWidth: "15%",
      maxWidth: "15%",
      name: (
        <div className="row">
          <div className="col-12">
            Full Name{" "}
            {sort === "+name" ? (
              <img
                src={icon}
                alt="text"
                onClick={(e) => sortingFunction(e, "-name")}
              />
            ) : (
              <img
                src={icon}
                alt="text"
                onClick={(e) => sortingFunction(e, "+name")}
              />
            )}
          </div>
        </div>
      ),
      selector: "name",
      wrap: true,
      cell: (row) => (
        <span className="cursor-pinter">
          <a
            href={row.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary"
          >
            {" "}
            {row.name} <i className="lab la-linkedin-in" />{" "}
          </a>
        </span>
      ),
    },
    {
      minWidth: "15%",
      maxWidth: "15%",
      name: (
        <div className="row">
          <div className="col-12">
            Job Role{" "}
            {sort === "+jobRole" ? (
              <img
                src={icon}
                alt="text"
                onClick={(e) => sortingFunction(e, "-jobRole")}
              />
            ) : (
              <img
                src={icon}
                alt="text"
                onClick={(e) => sortingFunction(e, "+jobRole")}
              />
            )}
          </div>
        </div>
      ),
      selector: "jobRole",
      wrap: true,
    },
    {
      minWidth: "16%",
      maxWidth: "16%",
      name: (
        <div className="row">
          <div className="col-12">
            Experience{" "}
            {sort === "+experience" ? (
              <img
                src={icon}
                alt="text"
                onClick={(e) => sortingFunction(e, "-experience")}
              />
            ) : (
              <img
                src={icon}
                alt="text"
                onClick={(e) => sortingFunction(e, "+experience")}
              />
            )}
          </div>
        </div>
      ),
      selector: "experience",
      wrap: true,
      format: (row) =>
        `${
          row.experience === 1
            ? "6 months-1 year"
            : row.experience === 2
            ? "1-3 years"
            : row.experience === 3
            ? "4-7 years"
            : row.experience === 4
            ? "8-10 years"
            : row.experience === 5
            ? "11-15 years"
            : "16+ years"
        }`,
    },
    {
      minWidth: "14%",
      maxWidth: "14%",
      name: (
        <>
          {" "}
          <span> AWS Cloud </span>{" "}
          <span style={{ display: "block", marginTop: "2px" }}>
            {" "}
            Proficiency{" "}
          </span>{" "}
        </>
      ),
      selector: "proficiencyLevel",
      cell: (row) => (
        <span className="badge rounded-pill grey-pill">
          {row.proficiencyLevel}
        </span>
      ),
    },
    {
      minWidth: "14%",
      maxWidth: "14%",
      name: "Skill Sets",
      selector: "skills",
      wrap: true,
      format: (row) => `${row.skills.join(", ")}`,
      cell: (row) => (
        <div>
          {" "}
          {row.skills.length <= 2 ? (
            <span> {row.skills.join(", ")} </span>
          ) : (
            <>
              <span>{row.skills.slice(0, 2).join(", ")}</span>{" "}
              <span className="badge rounded-pill pill">
                <Tippy
                  content={row.skills
                    .slice(-(row.skills.length - 2))
                    .join(", ")}
                  placement="top"
                  arrow={true}
                  className="custom-tippy"
                >
                  <span className="cursor-pointer">
                    {" "}
                    {`${row.skills.length - 2} more`}{" "}
                  </span>
                </Tippy>
              </span>
            </>
          )}
        </div>
      ),
    },
    {
      minWidth: "13%",
      maxWidth: "13%",
      name: "Industry",
      selector: "industry",
      wrap: true,
    },
    {
      minWidth: "12%",
      maxWidth: "12%",
      name: "Location",
      selector: "city",
      cell: (row) => (
        <div>
          <span className="text-captialise">
            {row.city}, {row.state}
          </span>
          <br />
          <span className="text-muted font-10">
            {row.relocation ? "Relocatable" : "Non Relocatable"}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="px-md-5 px-3 py-3">
      <nav className="px-3 navbar navbar-expand-lg no-gutters justify-content-between">
        <span className="navbar-brand">
          <img src={AWSUG} width="70" height="70" alt="awsug-india" /> &nbsp;{" "}
          <span className="font-24"> Talent Board </span>
        </span>

        <Link to="/add-profile">
          <button
            className="btn btn-primary my-2 my-sm-0 font-14 text-white btn-lg"
            style={{ fontWeight: "600" }}
          >
            Add Your Profile
          </button>
        </Link>
      </nav>

      <div className="row px-3 mt-4">
        <div className="col-10 font-16">
          This is a community initiative to connect active job seekers with
          organizations and people who participate in employee referral
          programs.
          <br /> <br />
          Currently we encourage only job seekers / candidates who lost their
          jobs in the pandemic scenario. Referrals should be verified via
          Linkedin profiles. (Click Linkedin Connect-&gt; Save profile as
          PDF-&gt; Refer). As a community, it will be a win-win situation for
          all of us if we can support and make the future safe for one another.
          Help them to resume their career by referring. #refer2resume
          <br />
        </div>
      </div>

      <div className="row px-3 mt-4">
        {loading ? (
          <div className="mt-5">
            {" "}
            <Loader />{" "}
          </div>
        ) : (
          <Fragment>
            {/* Data Table Section */}
            <div className="col-lg-10 col-xs-12 font-16 mt-5">
              <div className="searchComponent mb-4">
                <form onSubmit={(e) => searchTermFun(e)}>
                  <span>
                    <i
                      className="las la-search cursor-pointer la-flip-horizontal"
                      style={{ color: "#333333" }}
                    />
                  </span>
                  <input
                    type="search"
                    value={searchTerm}
                    className="searchBox"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="seachbutton" type="submit">
                    {" "}
                    Enter{" "}
                  </button>
                </form>
              </div>
              <h5 className="mb-3">Job Seekers</h5>
              <DataTable
                responsive
                title=""
                columns={columns}
                data={data}
                sortIcon={
                  <img src={icon} style={{ padding: "5px" }} alt="text" />
                }
                pagination
                paginationServer
                paginationTotalRows={totalPages}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationPerPage={30}
                paginationRowsPerPageOptions={[30, 50, 100, 200]}
              />
            </div>
            {/* Filter Section */}
            <div className="col-lg-2 col-xs-12 font-16 mt-3">
              <div className="row mb-2">
                <div className="col-6">Filter By:</div>
                <div
                  className="col-6 text-primary text-end cursor-pointer"
                  onClick={() => clearAll()}
                >
                  Clear All
                </div>
              </div>
              {filtersArray && filtersArray.industries && (
                <Accordion
                  displayHeading="Industries"
                  mappingName="industry"
                  filtersArray={filtersArray.industries}
                  finalArray={finalArray}
                  setFinalArray={setFinalArray}
                  filterData={filterData}
                  filterHelper={filterHelper}
                  setfilterHelper={setfilterHelper}
                />
              )}
              <br />
              {filtersArray && filtersArray.cities && (
                <Accordion
                  displayHeading="Cities"
                  mappingName="city"
                  filtersArray={filtersArray.cities}
                  finalArray={finalArray}
                  setFinalArray={setFinalArray}
                  filterData={filterData}
                  filterHelper={filterHelper}
                  setfilterHelper={setfilterHelper}
                />
              )}
              <br />
              {filtersArray && filtersArray.skills && (
                <Accordion
                  displayHeading="Skills"
                  mappingName="skills"
                  filtersArray={filtersArray.skills}
                  finalArray={finalArray}
                  setFinalArray={setFinalArray}
                  filterData={filterData}
                  filterHelper={filterHelper}
                  setfilterHelper={setfilterHelper}
                />
              )}
              <br />
              {filtersArray && (
                <Accordion
                  displayHeading="Experience"
                  mappingName="experience"
                  filtersArray={experienceFilter}
                  finalArray={finalArray}
                  setFinalArray={setFinalArray}
                  filterData={filterData}
                  filterHelper={filterHelper}
                  setfilterHelper={setfilterHelper}
                />
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Homepage;
