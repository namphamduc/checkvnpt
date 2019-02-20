import SQLite from "react-native-sqlite-storage";
import {DatabaseInitialization} from "./DatabaseInitialization";
import {QUERY_SCAN_HISTORY} from "./Constance";
import {getCurrentDateTime} from "../utils/TimeUtils";

export interface Database {
    open(): Promise<SQLite.SQLiteDatabase>;

    close(): Promise<void>;

    getAllHistory(userName: string): Promise<any>;

    addHistoryItem(data: any, itemCode: any): Promise<void>;

    // updateHistoryItem(listItem: any): Promise<void>;

    deleteHistory(list: any): Promise<void>;
}

class DatabaseImpl implements Database {
    private databaseName = "AppDatabase.db";
    private database: SQLite.SQLiteDatabase | undefined;

    // Open the connection to the database
    public open(): Promise<SQLite.SQLiteDatabase> {
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        let databaseInstance: SQLite.SQLiteDatabase;

        return SQLite.openDatabase({
            name: this.databaseName,
            location: "default"
        })
            .then(db => {
                databaseInstance = db;
                // Perform any database initialization or updates, if needed
                const databaseInitialization = new DatabaseInitialization();
                return databaseInitialization.updateDatabaseTables(databaseInstance);
            })
            .then(() => {
                this.database = databaseInstance;
                return databaseInstance;
            });
    }

    // Close the connection to the database
    public close(): Promise<void> {
        if (this.database === undefined) {
            return Promise.reject("[db] Database was not open; unable to close.");
        }
        return this.database.close().then(status => {
            console.log("[db] Database closed.");
            this.database = undefined;
        });
    }

    // Get an array of all the lists in the database
    public getAllHistory(userName: string): Promise<any[]> {
        console.log("[db] Fetching getAllHistory from the db...");
        return this.getDatabase()
            .then(db =>
                // Get all the lists, ordered by newest lists first
                db.executeSql(QUERY_SCAN_HISTORY.SELECT_ALL, [userName])
            )
            .then(([results]) => {
                if (results === undefined) {
                    return [];
                }
                const count = results.rows.length;
                console.log("GetHistory data" + JSON.stringify(results.rows))
                const lists: any[] = [];
                for (let i = 0; i < count; i++) {
                    const row = results.rows.item(i);
                    const {title, id} = row;
                    lists.push(row);
                }
                return lists;
            });
    }

    public addHistoryItem(data: any, itemCode: any): Promise<void> {
        const {pro_name, ite_status, com_name, username} = data
        console.log('xxxxxxx addHistoryItem')
        return this.getDatabase()
            .then(db =>
                db.executeSql(QUERY_SCAN_HISTORY.INSERT_HITORY, [
                    itemCode, pro_name, ite_status, com_name, getCurrentDateTime(), username
                ])
            )
            .then(([results]) =>
                console.log(
                    `[db] addHistoryItem with "${pro_name}" created successfully with id: ${
                        results.insertId
                        }`
                )
            ).catch(reason => {
                console.log(
                    `[db] addHistoryItem with "${pro_name}" created error with id: ${reason
                        }`
                )
            });
    }

    public getListItems(list: any, orderByDone = false): Promise<any[]> {
        if (list === undefined) {
            return Promise.resolve([]);
        }
        return this.getDatabase()
            .then(db =>
                db.executeSql(
                    `SELECT item_id as id, text, done FROM ListItem WHERE list_id = ? ${
                        orderByDone ? "ORDER BY done" : ""
                        };`,
                    [list.id]
                )
            )
            .then(([results]) => {
                if (results === undefined) {
                    return [];
                }
                const count = results.rows.length;
                const listItems: any[] = [];
                for (let i = 0; i < count; i++) {
                    const row = results.rows.item(i);
                    const {text, done: doneNumber, id} = row;
                    const done = doneNumber === 1 ? true : false;

                    console.log(`[db] List item text: ${text}, done? ${done} id: ${id}`);
                    listItems.push({id, text, done});
                }
                console.log(`[db] List items for list "${list.title}":`, listItems);
                return listItems;
            });
    }

    // public updateHistoryItem(listItem: any): Promise<void> {
    //     const doneNumber = listItem.done ? 1 : 0;
    //     return this.getDatabase()
    //         .then(db =>
    //             db.executeSql(
    //                 "UPDATE ListItem SET text = ?, done = ? WHERE item_id = ?;",
    //                 [listItem.text, doneNumber, listItem.id]
    //             )
    //         )
    //         .then(([results]) => {
    //             console.log(`[db] List item with id: ${listItem.id} updated.`);
    //         });
    // }

    public deleteHistory(id: any): Promise<void> {
        return this.getDatabase()
            .then(db => {
                return db
                    .executeSql(QUERY_SCAN_HISTORY.DELETE_HISTORY, [id])
            })
            .then((result: any) => {
                    console.log(`[db] Deleted deleteHistory `);
                }
            )
        // .then(() => {
        //     console.log(`[db] Deleted list titled: "${list.title}"!`);
        //     return;
        // });
    }

    private getDatabase = (): Promise<SQLite.SQLiteDatabase> => {
        console.log('xcx')
        if (this.database !== undefined) {


            
            return Promise.resolve(this.database);
        }
        return this.open();
    }
}

// Export a single instance of DatabaseImpl
export const database: Database = new DatabaseImpl();
