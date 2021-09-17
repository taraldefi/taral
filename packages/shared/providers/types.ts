export function unchanged(codeBody: string) {
    return codeBody;
}

export interface DeployerAccount {
    secretKey: string;
    stacksAddress: string;
}
