import "./App.css";
import { About, Campaign, CampaignDetails } from "./pages";
import { Navbar } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "./sections";

import { PrimeReactProvider } from "primereact/api";

import ScrollToTop from "./components/scroll-to-top";
import { FormProvider } from "../contextprovider";

import axios from "axios";
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyPolicy from "./pages/privacy-policy";
import RefundPolicy from "./pages/refund-policy";
import Faq from "./pages/faq";
import Mission from "./pages/mission";
import CreateCampaign from "./pages/create-campaign";
import Donation from "./pages/donation";

export const callAPI = async () => {
  try {
    const response = await axios.get(
      "https://mediways-server.vercel.app/user/get-all-specialties",
    );
    return response.data.specialities;
  } catch (error) {
    console.error("Error fetching data from API", error);
    return [];
  }
};

function App() {
  const EXPIRATION_TIME_MS = 2 * 60 * 60 * 1000;

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("Specialities");
      let data;

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const currentTime = new Date().getTime();
          console.log("data is in local storage");

          // Check if the data is expired
          if (parsedData.expireTime > currentTime) {
            data = parsedData.specialities;
            console.log("data is not expired");
          } else {
            // Data is expired, fetch new data from the API
            data = await callAPI();
            const newExpireTime = currentTime + EXPIRATION_TIME_MS;
            const newData = { expireTime: newExpireTime, specialities: data };
            localStorage.setItem("Specialities", JSON.stringify(newData));
            console.log("data is expired");
          }
        } catch (error) {
          console.error("Error parsing or accessing local storage data", error);
          data = await callAPI(); // If there's an error, fetch new data
          const newExpireTime = new Date().getTime() + EXPIRATION_TIME_MS;
          localStorage.setItem(
            "Specialities",
            JSON.stringify({ expireTime: newExpireTime, specialities: data }),
          );
        }
      } else {
        // No data in local storage, fetch from the API
        data = await callAPI();
        console.log("No data in local storage");
        const newExpireTime = new Date().getTime() + EXPIRATION_TIME_MS;
        localStorage.setItem(
          "Specialities",
          JSON.stringify({ expireTime: newExpireTime, specialities: data }),
        );
      }
    };

    fetchData();
  }, []);

  return (
    <PrimeReactProvider>
      <FormProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" Component={Campaign} />
            <Route path="/about" Component={About} />
            <Route path="/faqs" Component={Faq} />
            <Route path="/campaigns/:link" Component={CampaignDetails} />{" "}
            <Route
              path="/terms-and-conditions"
              Component={TermsAndConditions}
            />
            <Route path="/privacy-policy" Component={PrivacyPolicy} />{" "}
            <Route path="/refund-policy" Component={RefundPolicy} />
            <Route path="/mission" Component={Mission} />
            <Route path="/create-campaign" Component={CreateCampaign} />
            <Route path="/donation/:amount" Component={Donation} />
          </Routes>
          <Footer />
        </Router>
      </FormProvider>
    </PrimeReactProvider>
  );
}

export default App;
