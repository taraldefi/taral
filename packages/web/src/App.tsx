import './App.css';
import {
  AppConfig,
  UserData,
  showConnect,
  UserSession,
} from "@stacks/connect";
import { useState } from "react";
import { AppDetails, SimpleStacksWebProvider } from "lib-web";
import { webTaralContracts } from "taral-contracts";
import { NETWORK } from "taral-configuration";

const appConfig = new AppConfig();
const userSession = new UserSession({appConfig});

const appDetails: AppDetails = {
  icon: "https://webpack.js.org/site-logo.1fcab817090e78435061.svg",
  name: 'Testing'
};

async function callGetName() {
  const webProvider = SimpleStacksWebProvider.fromContracts(webTaralContracts, {
    appDetails,
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
              appDetails,
              onFinish: () => {
                setUser(userSession.loadUserData());
              },
              onCancel: () => {
                console.error('Cancelled connect');
              }
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
