import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';

import {
  AppConfig,
  showConnect,
  UserData,
  UserSession,
} from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import React, { useState } from "react";
import { SimpleStacksWebProvider } from "lib-web";
import { webTaralContracts } from "taral-contracts";
import { NETWORK } from "taral-configuration";

const appConfig = new AppConfig();
const userSession = new UserSession({appConfig});

export default function Home() {

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

  const [user, setUser] = useState<UserData>();
  if (user || userSession.isUserSignedIn()) {
  return (
    <div>
      <button onClick={async () => await callGetName()}> Get name </button>
      <button onClick={async () => await callGetName()}> Disconnect </button>
    </div>
  );
  }else {
    return (
      <div>
        <button
          onClick={() =>
            showConnect({
              redirectTo: '/',
              appDetails: {
                name: "Testing",
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
