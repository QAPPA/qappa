module.exports = {
    "type": process.env.DB_DIALECT || "mysql",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 3306,
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || "",
    "database": process.env.DB_NAME || "qappa",
    "entities": ["server/src/entities/*.ts"],
    "migrationsTableName": "custom_migration_table",
    "migrations": ["server/src/migrations/*.ts"],
    "cli": {
        "entitiesDir": "server/src/entities",
        "migrationsDir": "server/src/migrations"
    }
};
