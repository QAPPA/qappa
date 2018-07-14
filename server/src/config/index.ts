import * as dotenv from 'dotenv';

export default (envPath: string) => {
    dotenv.config({ path: envPath });
};
