const sql = require("./neonDB.js");

const addData = async (props) => {
  const { name, deadline, industry, link } = props;

  try {
    // データを追加
    await sql`INSERT INTO job_listings (name, deadline, industry, link ) VALUES (${name}, ${deadline}, ${industry}, ${link})`;
    console.log(`success`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = addData;
