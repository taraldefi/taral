import { ProxyConstructor } from ".";
import { ClarityAbi } from "../clarity";
import { BaseWebProvider } from "../providers";
import { toCamelCase } from "../utils";
import { Noop } from "./types";

const makeWebHandler = (
    provider: BaseWebProvider,
    caller?: string,
    onFinish?: Noop,
    onCancel?: Noop
) => {
    const noop: Noop = () => { };
    const handler: ProxyHandler<ClarityAbi> = {
        get: (contract, property) => {
            const foundFunction = contract.functions.find((func) => {
                return toCamelCase(func.name) === property;
            });
            if (foundFunction) {
                if (foundFunction.access === "read_only") {
                    if (caller == undefined) {
                        throw new Error("Caller needed for readonly function call");
                    }
                    const callerStxAddress = caller;
                    return (...args: any[]) => {
                        return provider.callReadOnly({
                            arguments: args,
                            caller: callerStxAddress,
                            function: foundFunction,
                            onCancel: onCancel || noop,
                            onFinish: onFinish || noop,
                        });
                    };
                } else if (foundFunction.access === "public") {
                    return (...args: any[]) => {
                        return provider.callPublic({
                            arguments: args,
                            function: foundFunction,
                            onCancel: onCancel || noop,
                            onFinish: onFinish || noop,
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

declare const Proxy: ProxyConstructor;

export const webProxy = <T extends object>(
    target: ClarityAbi,
    provider: BaseWebProvider
): ((caller?: string, onFinish?: Noop, onCancel?: Noop) => T) => {
    return (caller?: string, onFinish?: Noop, onCancel?: Noop) =>
        new Proxy<T, ClarityAbi>(
            target,
            makeWebHandler(provider, caller, onFinish, onCancel)
        );
};
