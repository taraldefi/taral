import './App.css';
import {
  AppConfig,
  UserData,
  showConnect,
  UserSession,
} from "@stacks/connect";
import { useState } from "react";
import { SimpleStacksWebProvider } from "lib-web";
import { webTaralContracts } from "taral-contracts";
import { NETWORK } from "taral-configuration";

const appConfig = new AppConfig();
const userSession = new UserSession({appConfig});

async function callGetName() {
  const webProvider = SimpleStacksWebProvider.fromContracts(webTaralContracts, {
    appDetails: {
      icon: "https://webpack.js.org/site-logo.1fcab817090e78435061.svg",
      name: 'Testing'
    },
    network: NETWORK,
    stxAddress: ''
  });

  const name = (await webProvider.webTaralCoin.contract().getName())._unsafeUnwrap();
  console.log(name);
}

function App() {
  
  const [user, setUser] = useState<UserData>();

  if (user || userSession.isUserSignedIn()) {
    return (
      <div>
        <button
          onClick={async () => await callGetName()}
        >
          Call
        </button>
        <button
          onClick={() => {
            userSession.signUserOut();
            setUser(undefined);
          }}
        >
          Disconnect
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() =>
            showConnect({
              appDetails: {
                name: "Webflow",
                icon: "https://webpack.js.org/site-logo.1fcab817090e78435061.svg",
              },
              onFinish: () => {
                setUser(userSession.loadUserData());
              },
            })
          }
        >
          Connect with Stacks Wallet
        </button>
      </div>
    );
  }
}
export default App;
