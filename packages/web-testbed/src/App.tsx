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
  name: 'Taral testbed'
};

async function callGetName(userSession: UserSession): Promise<string> {
  const webProvider = SimpleStacksWebProvider.fromContracts(webTaralContracts, {
    appDetails,
    network: NETWORK,
  });

  const stxAddress = userSession.loadUserData().profile.stxAddress.testnet;
  const name = (await webProvider.webTaralCoin.contract(stxAddress).getName())._unsafeUnwrap();
  return name;
}

function App() {
  
  const [user, setUser] = useState<UserData>();
  const [name, setName] = useState('Not yet requested');

  if (user || userSession.isUserSignedIn()) {
    return (
      <div>
        <button
          onClick={async () => {
            const name = await callGetName(userSession);
            setName(name);
          }}
        >
          Call public function get-name
        </button>
        <button
          onClick={() => {
            userSession.signUserOut();
            setUser(undefined);
          }}
        >
          Disconnect
        </button>
        <p>Get name result: {name}</p>
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
