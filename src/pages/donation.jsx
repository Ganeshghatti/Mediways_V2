import { useParams } from "react-router-dom";
import { Heading } from "../components";

const Donation = (props) => {
  const { amount } = useParams();

  return (
    <div className="overflow-x-hidden pt-24">
      <div>
        <Heading
          title={"Donation Window"}
          subtitle={"Donate to make a Difference"}
          pretitle={"Support our cause"}
        />
      </div>
      <div className="flex flex-col items-center justify-center space-y-8 p-5">
        <h1 className="family-poppins text-center text-2xl font-semibold">
          You have decided to donated ₹{amount} for the better cause.
        </h1>
        <p className="family-poppins text-center font-medium text-gray-500">
          Please Scan the UPI QR code below to make a payment and help various
          needy people around the India to live a better life.
        </p>
        <div className="border-2 border-lightBlue">
          <img
            src="https://mediways.s3.ap-south-1.amazonaws.com/campaigns/CAMPAIGNc8356f/qrCode/qrCode.webp"
            className="w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default Donation;
