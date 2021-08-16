export function getRelativeImportPath(subFolder: string) {
    let relativeImportPath = "../../";
    if (subFolder != "") {
        if (subFolder.indexOf("/") > 0) {
            const occurrences = subFolder.split("/").length;
            for (var i = 0; i < occurrences; i++) {
                relativeImportPath += "../";
            }
        } else {
            relativeImportPath += "../";
        }
    }

    return relativeImportPath;
}
