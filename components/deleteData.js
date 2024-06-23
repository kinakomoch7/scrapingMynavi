const sql = require("./neonDB.js");

const deleteData = async (props) => {
  try {
    // テーブルを初期化
    const res = await sql`TRUNCATE TABLE job_listings`;
    if (res) {
      console.log(`delete success`);
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = deleteData;
