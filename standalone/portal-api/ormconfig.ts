import { DataSource } from "typeorm";
import dotenv from 'dotenv';


dotenv.config({ path: './.env' });

const ormConfigDataSource = new DataSource({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    logging: true,
    migrations: [
        "src\\database\\migrations\\**\\*{.ts,.js}"
    ]
  });

  export default ormConfigDataSource;