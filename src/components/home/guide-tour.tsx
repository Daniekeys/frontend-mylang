import { useState } from "react";
import { CancelIcon, MicIcon, PhoneIcon } from "../../assets";
import woman from "../../assets/png/smile-woman.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const GuideTour = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      {open && (
        <div className="w-full bg-white rounded-md min-h-[225px] h-fit   flex-col mt-4 hidden lg:flex">
          <div className="w-full flex items-center px-4 justify-between pt-5">
            <h1 className="lg:text-3xl text-lg font-bold red-hat ">
              Take a Guided Tour
            </h1>
            {/* <span onClick={() => setOpen(false)}>
              <CancelIcon />
            </span> */}
          </div>
          <div className="w-full px-4 pt-4 flex flex-col lg:flex-row lg:items-start lg:justify-between mt-3 ">
            <div className="flex flex-col w-full lg:w-1/2">
              <p className="max-w-[347px] text-sm lg:text-base red-hat">
                Watch a video guide on how to start attending classes and
                choosing coachs.
              </p>

              <div className="flex gap-4 items-center mt-5">
                <Link
                  to={"https://youtu.be/4FYPvbPH8cU"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[0.5px] h-[30px] flex items-center justify-center px-3 rounded-[4px] border-opacity-50 gap-3 border-[#0E79FF] min-w-max "
                  // onClick={() => navigate("/create-new-class?type=ONE_TIME")}
                >
                  <span>
                    <PhoneIcon />
                  </span>
                  <p className="text-sm font-medium cursor-pointer dm-sans ">
                    1:1 Calls
                  </p>
                </Link>
                <Link  to={"https://youtu.be/4FYPvbPH8cU"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[0.5px] h-[30px] flex items-center justify-center px-3 rounded-[4px] border-opacity-50 gap-3 border-[#0E79FF] min-w-max "
                 
                >
                  <span>
                    <PhoneIcon />
                  </span>
                  <p className="text-sm font-medium cursor-pointer dm-sans ">
                    1:1 Monthly
                  </p>
                </Link>
                <Link
                   to={"https://youtu.be/4FYPvbPH8cU"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[0.5px] h-[30px] flex items-center justify-center px-3 rounded-[4px] border-opacity-50 gap-3 border-[#0E79FF] min-w-max "
                 
                >
                  <span>
                    <MicIcon />
                  </span>
                  <p className="text-sm font-medium cursor-pointer dm-sans ">
                    Live events
                  </p>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-end relative">
              <img src={woman} alt="" className="w-auto h-[200px]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuideTour;
