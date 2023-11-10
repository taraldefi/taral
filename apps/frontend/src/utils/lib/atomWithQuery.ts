import { QueryClient, QueryObserver } from "@tanstack/query-core";
import type {
  QueryKey,
  QueryObserverOptions,
  QueryObserverResult,
} from "@tanstack/query-core";
import type { Getter, WritableAtom } from "jotai";

import { atom } from "jotai";
import { createAtoms } from "./createAtoms";

export const queryClientAtom = atom(new QueryClient());

type Action = {
  type: "refetch";
  force?: boolean;
  options?: Parameters<QueryObserver["refetch"]>[0];
};

export function atomsWithQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  getOptions: (
    get: Getter
  ) => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
  getQueryClient: (get: Getter) => QueryClient = (get) => get(queryClientAtom)
): readonly [
  dataAtom: WritableAtom<
    TData | Promise<TData>,
    [Action],
    Promise<QueryObserverResult<TData, TError>> | undefined
  >,
  statusAtom: WritableAtom<
    QueryObserverResult<TData, TError>,
    [Action],
    Promise<QueryObserverResult<TData, TError>> | undefined
  >
] {
  return createAtoms(
    getOptions,
    getQueryClient,
    (client, options) => new QueryObserver(client, options),
    (action, observer, refresh) => {
      if (action.type === "refetch") {
        if (action.force) {
          observer.destroy();
          refresh();
          return;
        }
        return observer.refetch(action.options);
      }
    }
  );
}
