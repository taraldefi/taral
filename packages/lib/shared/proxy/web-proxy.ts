import { ClarityAbi } from "../clarity";
import { BaseWebProvider } from "../providers";
import { toCamelCase } from "../utils";
import { Noop } from "./types";
import { ProxyConstructor } from ".";

const makeWebHandler = (provider: BaseWebProvider, onFinish?: Noop, onCancel?: Noop) => {
    const noop: Noop = () => { };
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
                            onCancel: onCancel || noop,
                            onFinish: onFinish || noop
                        });
                    };
                } else if (foundFunction.access === "public") {
                    return (...args: any[]) => {
                        return provider.callPublic({
                            arguments: args,
                            function: foundFunction,
                            onCancel: onCancel || noop,
                            onFinish: onFinish || noop
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
): ((onFinish?: Noop, onCancel?: Noop) => T) => {
    return (onFinish?: Noop, onCancel?: Noop) =>
        new Proxy<T, ClarityAbi>(target, makeWebHandler(provider, onFinish, onCancel));
};
