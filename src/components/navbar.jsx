import { NavbarData } from "../data";
import { CrossIcon, MenuIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../public/assets/logo.png";
import { callAPI } from "../App";
import { useContext } from "react";
import { FormContext } from "../../contextprovider";

const Navbar = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const [parsedData, setParsedData] = useState(null);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { isFormActive, setIsFormActive } = useContext(FormContext);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem("Specialities");
      if (data) {
        const paramData = JSON.parse(data).specialities;
        setParsedData(paramData);
      } else {
        const paramData = await callAPI();
        setParsedData(paramData);
      }
    };

    fetchData();
    console.log("The value is", isFormActive);
  }, []);

  const handleToggle = () => {
    setToggleNavbar(!toggleNavbar);
  };

  const handleItem = (item) => {
    navigate(item.link);
  };
  const handleItemClick = (item) => {
    navigate(`/specialities/${item.link}`);
    setToggleNavbar(false); // Close the mobile navbar
    setIsDropDownOpen(false); // Close the dropdown if it's open
  };
  return (
    <div className="max-w-screen fixed z-20 mx-auto flex h-[6rem] w-screen justify-center bg-white px-2.5 shadow-md lg:px-20">
      <div className="flex items-center justify-center">
        <img
          src={logo}
          className="w-36 cursor-pointer object-contain"
          onClick={() => navigate("/")}
        />
      </div>
      <ul className="my-auto hidden h-full w-full flex-1 items-center justify-center space-x-12 pl-[2rem] lg:flex">
        {NavbarData.map((item, index) => (
          <div
            key={index}
            className={`family-manrope cursor-pointer text-[15px] font-bold tracking-wide text-darkBlue transition hover:text-lightBlue`}
          >
            {item.dropdown ? (
              <>
                <div className="dropdown">
                  <span className={`hover:text-blue flex items-end`}>
                    Specialities
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mb-0.5"
                    >
                      <path
                        d="M10.5832 6.00018L7.99657 8.58684L5.4099 6.00018C5.1499 5.74018 4.7299 5.74018 4.4699 6.00018C4.2099 6.26018 4.2099 6.68018 4.4699 6.94018L7.5299 10.0002C7.7899 10.2602 8.2099 10.2602 8.4699 10.0002L11.5299 6.94018C11.7899 6.68018 11.7899 6.26018 11.5299 6.00018C11.2699 5.74684 10.8432 5.74018 10.5832 6.00018Z"
                        fill="#131316"
                      />
                    </svg>
                  </span>
                  {parsedData && (
                    <ul className="dropdown-content pt-6">
                      {parsedData.map((item) => (
                        <li key={item.id} className="flex items-center">
                          <Link
                            to={`/specialities/${item.link}`}
                            className="hover:text-blue text-black2 flex items-center"
                          >
                            <p>{item.title}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div onClick={() => handleItem(item)}>
                <li>{item.title}</li>
              </div>
            )}
          </div>
        ))}
      </ul>
      <div className="hidden items-center gap-2 lg:flex">
        <Link to={"/create-campaign"}>
          <button className="family-sora h-[3.4rem] rounded-full border border-lightBlue bg-white px-10 text-[1rem] font-semibold text-lightBlue active:bg-lightBlue/95 active:text-white">
            Create Campaign
          </button>
        </Link>
      </div>
      <div className="flex w-full justify-end py-5 lg:hidden">
        <button onClick={handleToggle} className="z-10">
          {toggleNavbar ? <X /> : <MenuIcon />}
        </button>
        <div>
          {toggleNavbar && (
            <div className="border">
              <div className="z-3 absolute bottom-0 left-0 right-0 top-0 mt-[6rem] h-screen w-screen bg-black/80"></div>
              <ul className="z-4 absolute right-0 flex h-screen w-[70%] flex-col items-center space-y-10 border-2 border-white bg-white p-4 pt-[10rem] shadow-md">
                {NavbarData.map((item, index) => (
                  <div
                    key={index}
                    className="family-manrope cursor-pointer text-[15px] font-bold tracking-wide text-darkBlue"
                  >
                    {item.dropdown ? (
                      <div className="relative text-center">
                        <li onClick={() => toggleDropDown(item)}>
                          {item.title} ▼
                        </li>
                        {isDropDownOpen && (
                          <ul className="mt-3 w-[12rem] rounded-md bg-gray-100 text-center text-darkBlue">
                            {parsedData.map((item, index) => (
                              <div key={index}>
                                <Link
                                  to={`/specialities/${item.link}`}
                                  onClick={handleToggle}
                                >
                                  <div
                                    className="px-4 py-2 hover:text-lightBlue"
                                    onClick={() => handleItemClick(item)}
                                  >
                                    <h1>{item.title}</h1>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <div onClick={() => handleItem(item)}>
                        <li onClick={handleToggle}>{item.title}</li>
                      </div>
                    )}
                  </div>
                ))}
                <Link onClick={handleToggle} to={"/"}>
                  <button
                    className="family-sora h-[3.4rem] rounded-full border border-lightBlue bg-white px-10 text-[1rem] font-semibold text-lightBlue active:bg-lightBlue/95 active:text-white"
                    onClick={() => setIsFormActive(!isFormActive)}
                  >
                    Create Campaign
                  </button>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
