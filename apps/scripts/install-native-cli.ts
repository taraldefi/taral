import { installDefaultPath } from "lib-clarity-bin";

export default (async () => {
    try {
        const installSuccessful = await installDefaultPath();
        if (!installSuccessful) {
            process.exit(1);
        } else {
            process.exit();
        }
    } catch (error) {
        console.error(`Failed to install clarity-cli native binary:`);
        console.error(error);
        process.exit(1);
    }
})();
