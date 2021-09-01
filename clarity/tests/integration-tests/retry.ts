function runTest(handler: (arg0: (err: any) => void) => any) {
    return new Promise<void>((resolve, reject) => {
        const result = handler((err: any) => err ? reject(err) : resolve());
        
        if (result && result.then) {
            result.catch(reject).then(resolve);
        } else {
            resolve();
        }
    });
}


export async function retry(description: string, retries: number, handler: (arg0: (err: any) => void) => any) {
    if (!description || typeof description !== 'string') {
        throw new Error('Invalid argument, description must be a string')
    }

    if (typeof retries === 'function' && !handler) {
        handler = retries;
        retries = 1;
    }

    if (!retries || typeof retries !== 'number' || retries < 1) {
        throw new Error('Invalid argument, retries must be a greather than 0')
    }

    test(description, async () => {
        let latestError;
        for (let tries = 0; tries < retries; tries++) {           
            try {
                await runTest(handler);
                return;
            } catch(error) {
                latestError = error;
            }
        }

        throw latestError;
    });
}
