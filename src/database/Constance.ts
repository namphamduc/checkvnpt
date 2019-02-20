const TBL_NAME = {
    TBL_QRCODE: "tbl_qrcode",
    TBL_USER: "tbl_user",
    TBL_GROUP: "tbl_group",
    TBL_NOTIFICATION: "tbl_notification",
    TBL_INVOICE: "tbl_invoice",
    TBL_INVOICE_HISTORY: "tbl_invoice_history",
    TBL_SCANNED_HISTORY: 'tbl_scanned_history'
}
const TBL_USER = {
    COL_USER_ID: "id",
    COL_USER_TYPE: "type",
    COL_USER_USERNAME: "username",
    COL_USER_PASSWORD: "password",
    COL_USER_FULLNAME: "fullname",
    COL_USER_SESSION_ID: "session_id",
    COL_USER_MOBILE: "mobile",
    COL_USER_EMAIL: "email",
    COL_USER_COM_ID: "com_id",
    COL_USER_COM_NAME: "com_fullname"
}

const TBL_HISTORY = {
    COL_HIS_ID: "id",
    COL_HIS_PRO_NAME: "item_name",
    COL_HIS_PRO_CODE: "item_code",
    COL_HIS_PRO_MAN: "item_man",
    COL_HIS_PRO_STATUS: "item_status",
    COL_HIS_TIME_SCANNED: "time",
    COL_HIS_USER_SCANNED: "user",
    TBL_SCANNED_HISTORY: "tbl_scanned_history",
}

const CREATE_TBL_SCANNED_HISTORY = "create table  IF NOT EXISTS " + TBL_NAME.TBL_SCANNED_HISTORY +
    "(" + TBL_HISTORY.COL_HIS_ID + " integer primary key autoincrement," +
    TBL_HISTORY.COL_HIS_PRO_NAME + " text," +
    TBL_HISTORY.COL_HIS_PRO_CODE + " text," +
    TBL_HISTORY.COL_HIS_PRO_STATUS + " integer," +
    TBL_HISTORY.COL_HIS_PRO_MAN + " text," +
    TBL_HISTORY.COL_HIS_TIME_SCANNED + " text," +
    TBL_HISTORY.COL_HIS_USER_SCANNED + " text);"

const CREATE_TBL_USER = "create table IF NOT EXISTS "
    + TBL_NAME.TBL_USER +
    "(" + TBL_USER.COL_USER_ID + " integer primary key autoincrement," +
    TBL_USER.COL_USER_TYPE + " text," +
    TBL_USER.COL_USER_USERNAME + " text," +
    TBL_USER.COL_USER_PASSWORD + " text," +
    TBL_USER.COL_USER_FULLNAME + " text," +
    TBL_USER.COL_USER_SESSION_ID + " text," +
    TBL_USER.COL_USER_MOBILE + " text," +
    TBL_USER.COL_USER_EMAIL + " text," +
    TBL_USER.COL_USER_COM_ID + " text," +
    TBL_USER.COL_USER_COM_NAME + " text);"
const QUERY_SCAN_HISTORY = {
    SELECT_ALL: "SELECT  * FROM " + TBL_NAME.TBL_SCANNED_HISTORY
        + " WHERE " + TBL_HISTORY.COL_HIS_USER_SCANNED + " = ?"
        + " ORDER BY " + TBL_HISTORY.COL_HIS_ID + " DESC ",

    INSERT_HITORY: "INSERT INTO " + TBL_NAME.TBL_SCANNED_HISTORY + "("
        + TBL_HISTORY.COL_HIS_PRO_CODE + ","
        + TBL_HISTORY.COL_HIS_PRO_NAME + ","
        + TBL_HISTORY.COL_HIS_PRO_STATUS + ","
        + TBL_HISTORY.COL_HIS_PRO_MAN + ","
        + TBL_HISTORY.COL_HIS_TIME_SCANNED + ","
        + TBL_HISTORY.COL_HIS_USER_SCANNED + ")" +
        " VALUES (?, ? ,?, ? ,?, ? );",
    DELETE_HISTORY: "DELETE FROM " + TBL_NAME.TBL_SCANNED_HISTORY + " WHERE " + TBL_HISTORY.COL_HIS_ID + "= ?"
}
export {
    TBL_USER, TBL_NAME, CREATE_TBL_SCANNED_HISTORY, CREATE_TBL_USER, TBL_HISTORY, QUERY_SCAN_HISTORY
}