import { useCallback } from "react";
import {
  customNetworksAtom,
  currentNetworkIndexAtom,
  networksAtom,
  anyNetworkStatusAtom,
  currentStacksNetworkAtom,
} from "@store/networkStore";
import { useAtomCallback } from "jotai/utils";
import { useAtom, useAtomValue } from "jotai";

export const useNetworks = () => {
  const [customNetworks, setCustomNetworks] = useAtom(customNetworksAtom);
  const networks = useAtomValue(networksAtom);
  const currentStacksNetwork = useAtomValue(currentStacksNetworkAtom);
  const [currentNetworkIndex, setCurrentNetworkIndex] = useAtom(
    currentNetworkIndexAtom
  );

  const handleUpdateNetworkIndex = useAtomCallback<void, any>(
    useCallback((get, set, arg) => {
      void set(currentNetworkIndexAtom, arg);
    }, [])
  );

  const handleAddNetwork = useAtomCallback<void, any>(
    useCallback((get, set, arg) => {
      void set(customNetworksAtom, [...customNetworks, arg]);
      void handleUpdateNetworkIndex(networks.length);
    }, [])
  );

  const handleRemoveNetwork = useAtomCallback<void, any>(
    useCallback((get, set, arg) => {
      const networksSet = new Set(customNetworks);
      anyNetworkStatusAtom.remove(arg.name); // remove the status query
      networksSet.delete(arg);
      Array.from(networksSet);
      void set(customNetworksAtom, Array.from(networksSet));
      void handleUpdateNetworkIndex(0);
    }, [])
  );

  return {
    networks,
    currentStacksNetwork,
    setCustomNetworks,
    currentNetworkIndex,
    setCurrentNetworkIndex,
    handleUpdateNetworkIndex,
    handleAddNetwork,
    handleRemoveNetwork,
  };
};
