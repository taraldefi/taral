import { ClarinetAccount } from "..";
import { ClarityAbi } from "../clarity";
import { BaseProvider } from "../providers";
import { toCamelCase } from "../utils";

const makeHandler = (provider: BaseProvider, caller: ClarinetAccount) => {
    const handler: ProxyHandler<ClarityAbi> = {
        get: (contract, property) => {
            const foundFunction = contract.functions.find((func) => {
                return toCamelCase(func.name) === property;
            });
            if (foundFunction) {
                if (foundFunction.access === "read_only") {
                    return (...args: any[]) => {
                        return provider.callReadOnly({
                            arguments: args,
                            function: foundFunction,
                            caller,
                        });
                    };
                } else if (foundFunction.access === "public") {
                    return (...args: any[]) => {
                        return provider.callPublic({
                            arguments: args,
                            function: foundFunction,
                            caller,
                        });
                    };
                }
            }

            const foundVariable = contract.variables.find((variable) => {
                return toCamelCase(variable.name) === property;
            });
            if (foundVariable) {
                return () => {
                    return provider.callVariable(foundVariable);
                };
            }

            const foundMap = contract.maps.find((map) => {
                return toCamelCase(map.name) === property;
            });
            if (foundMap) {
                return (key: any) => {
                    return provider.callMap(foundMap, key);
                };
            }

            return null;
        },
    };

    return handler;
};

interface ProxyConstructor {
    revocable<T extends object, S extends object>(
        target: T,
        handler: ProxyHandler<S>
    ): { proxy: T; revoke: () => void };
    new <T extends object>(target: T, handler: ProxyHandler<T>): T;
    new <T extends object, S extends object>(
        target: S,
        handler: ProxyHandler<S>
    ): T;
}

declare const Proxy: ProxyConstructor;

export const proxy = <T extends object>(
    target: ClarityAbi,
    provider: BaseProvider
): ((account: ClarinetAccount) => T) => {
    return (account: ClarinetAccount) =>
        new Proxy<T, ClarityAbi>(target, makeHandler(provider, account));
};
