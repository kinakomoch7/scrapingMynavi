const sql = require("./neonDB.js");

const addData = async (props) => {
  const { name, deadline, industry } = props;

  try {
    const res = await sql`SELECT * FROM job_listings WHERE name = ${name}`;

    // すでにデータが存在する場合は追加しない
    if (res.length > 0) {
      console.log(`already exists`);
      return;
    }

    // データを追加
    await sql`INSERT INTO job_listings (name, deadline, industry ) VALUES (${name}, ${deadline}, ${industry})`;
    console.log(`success`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = addData;
