import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";
import NewChatLink from "../components/NewChatLink";

function Homepage() {

  return (
    // in Tailwind, centering the items and justification won't center everthing to the screen
    // until you set the height `h-screen` of the screen, taking up the FULL HEIGHT of the screen!
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1
        className="text-5xl font-bold mb-20 mt-5"
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <Link
          href="https://joeybonneville.com/reactjs-portfolio"
          target="_blank"
          rel="noreferrer"
        >
          <div style={{ width: 100 }}>
            {/* My Brand Logo */}
            <Image src={logo} alt="Logo" width={100} height={100} />
          </div>
        </Link>
        &nbsp;GPT
      </h1>

      <div className="flex space-x-2 text-center overflow-auto">
        <div>
          <div className="flex flex-col items-center mb-5">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-2 d-inline-block">
            {/* <p className="infoText">Explain the phrase 'cash me outside'</p> */}
            {/* Add Link component to navigate to new chat */}

           {/* Loop through the examples array and render a NewChat component for each example */}
           <NewChatLink />
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center mb-5">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Change the ChatGPT Model to use</p>
            <p className="infoText">
              Messages are sorted in Firebase's Firestore
            </p>
            <p className="infoText">
              Hot Toast notifications when ChatGPT is thinking hard
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>
          <div className="space-y-3">
            {/* <p className="infoText">
              <span className="font-bold">Mobile users:</span> please flip your phone sideways to start new chat!
            </p> */}
            <p className="infoText">
              May occasionally generate incorrect information
            </p>
            <p className="infoText">
              May occasionally produce harmful instructions or biased content
            </p>
            <p className="infoText">
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
