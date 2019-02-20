import SQLite from "react-native-sqlite-storage";
import {CREATE_TBL_SCANNED_HISTORY, CREATE_TBL_USER} from './Constance'

export class DatabaseInitialization {

    public updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
        let dbVersion: number = 0;
        console.log("Beginning database updates...");
        // First: create tables if they do not already exist
        return database
            .transaction(this.createTables)
            .then(() => {
                // Get the current database version
                return this.getDatabaseVersion(database);
            })
            .then(version => {
                dbVersion = version;
                console.log("Current database version is: " + dbVersion);
                if (dbVersion < 1) {
                    // Uncomment the next line, and the referenced function below, to enable this
                    // return database.transaction(this.preVersion1Inserts);
                }
                // otherwise,
                return;
            })
            .then(() => {
                if (dbVersion < 2) {
                    // Uncomment the next line, and the referenced function below, to enable this
                    // return database.transaction(this.preVersion2Inserts);
                }
                // otherwise,
                return;
            });
    }

    // Perform initial setup of the database tables
    private createTables(transaction: SQLite.Transaction) {
        // DANGER! For dev only
        // const dropAllTables = false;
        // if (dropAllTables) {
        //     transaction.executeSql("DROP TABLE IF EXISTS List;");
        //     transaction.executeSql("DROP TABLE IF EXISTS ListItem;");
        //     transaction.executeSql("DROP TABLE IF EXISTS Version;");
        // }
        transaction.executeSql(CREATE_TBL_USER);

        transaction.executeSql(CREATE_TBL_SCANNED_HISTORY);
        // Version table
        transaction.executeSql(
            "CREATE TABLE IF NOT EXISTS Version( " +
            "version_id INTEGER PRIMARY KEY NOT NULL, " +
            "version INTEGER" +
            ");"
        );
    }

    // Get the version of the database, as specified in the Version table
    private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
        // Select the highest version number from the version table
        return database
            .executeSql("SELECT version FROM Version ORDER BY version DESC LIMIT 1;")
            .then(([results]) => {
                if (results.rows && results.rows.length > 0) {
                    const version = results.rows.item(0).version;
                    return version;
                } else {
                    return 0;
                }
            })
            .catch(error => {
                console.log(`No version set. Returning 0. Details: ${error}`);
                return 0;
            });
    }

    // todo updating the database:
    // This function should be called when the version of the db is < 1
    private preVersion1Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 1 DB inserts");

    }

    // This function should be called when the version of the db is < 2
    private preVersion2Inserts(transaction: SQLite.Transaction) {

    }

}
