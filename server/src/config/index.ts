import * as dotenv from 'dotenv';

export const loadDotEnv = (envPath: string) => {
    dotenv.config({ path: envPath });
};
