import { useRef } from "react";
import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import videoBg from "./assets/video.mp4";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [started, setStarted] = useState(false);
  const [clicked, setClicked] = useState(true);
  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((value) => value + 1);
    }
  }, [seconds]);
  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0);
      setHours((value) => value + 1);
    }
  }, [minutes]);

  const obj = useRef();
  function handleTimer() {
    if (ticking) {
      clearInterval(obj.current);
      setTicking(false);
    } else {
      obj.current = setInterval(() => {
        setSeconds((value) => value + 1);
      }, 1000);
      setTicking(true);
      setStarted(true);
      setClicked(false);
    }
  }
  return (
    <div className="w-full h-screen ">
      <div
        style={{ backgroundColor: `rgba(0,0,0,0.4)` }}
        className="w-full h-screen absolute -z-10"
      ></div>
      <video
        src={videoBg}
        autoPlay
        muted
        loop
        className="object-cover w-full h-screen absolute -z-20"
      ></video>
      <div className="flex justify-center">
        <div className=" bg-gradient-to-tr from-[rgba(255,255,255,0.1)] from-10% to-[rgba(255,255,255,0)] backdrop-blur  bg-cover bg-no-repeat bg-bottom h-[50vh] w-[100vh] mt-28 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]  rounded-2xl border border-solid border-[rgba(2255,255,255,0.18)] flex flex-col justify-evenly items-center">
          <div className="text-4xl font-bold text-[#fff]">STOPWATCH</div>
          <div className=" text-4xl font-bold text-[#fff]">
            {hours < 10 ? "0" + hours : hours}:
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </div>
          <div className={clicked && "active:scale-0 duration-1000"}>
            <button
              onClick={() => handleTimer()}
              className="btn1 text-[#fff] hover:bg-[rgba(255,255,255,0.1)] active:scale-0 duration-1000 rounded-full m-2 p-2"
            >
              {(ticking && <PauseIcon fontSize="large" />) || (
                <PlayArrowIcon fontSize="large" />
              )}
            </button>

            {started && (
              <button
                onClick={() => {
                  clearInterval(obj.current);
                  setSeconds(0);
                  setMinutes(0);
                  setHours(0);
                  setTicking(false);
                  setStarted(false);
                  setClicked(true);
                }}
                className="btn2 text-[#fff] hover:bg-[rgba(255,255,255,0.1)] rounded-full m-2 p-2 active:scale-0 duration-1000"
              >
                <RestartAltIcon fontSize="large" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
