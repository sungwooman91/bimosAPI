var config = require("./dbconfig");
const sql = require("mssql");

async function getdata() {
  try {
    let pool = await sql.connect(config);
    console.log("sql cerver connected...");
  } catch (error) {
    console.log(" mathus-error : " + error);
  }
}

async function getdata_withQuery() {
  try {
    let pool = await sql.connect(config);
    // 쿼리
    let res = await pool
      .request()
      .query(
        "SELECT DISTINCT CATEGORY FROM COMMON_CODE WHERE CANCEL_BIT = 'N' ORDER BY CATEGORY ASC;"
      );
    return res.recordsets;
  } catch (error) {
    console.log(" mathus-error : " + error);
  }
}

async function get_Get_Category_List() {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .output("out_result_code", sql.NVarChar(2))
      .output("out_result_msg", sql.NVarChar(256))
      .execute("COMMON_CODE_Get_Category_List");

    // console.log("Procedure Total Return : ", result.recordsets.length); // count of recordsets returned by the procedure
    console.log("recordsets Total length : ", result.recordsets[0].length); // count of rows contained in first recordset
    console.log("recordsets value : ", result.recordset); // first recordset from result.recordsets
    // console.log("returnValue : ", result.returnValue); // procedure return value
    console.log("output : ", result.output); // key/value collection of output values
    console.log("rowsAffected : ", result.rowsAffected); // array of numbers, each number represents the number of rows affected by executed statemens
    return result;
  } catch (error) {
    console.log(" mathus-error : " + error);
  }
}
module.exports = {
  getdata: getdata,
  getdata_withQuery: getdata_withQuery,
  get_Get_Category_List: get_Get_Category_List,
};
