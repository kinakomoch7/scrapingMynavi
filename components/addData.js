const sql = require("./neonDB.js");

module.exports = async function addData(props) {
  const { name, deadline, industry } = props;

  try {
    await sql`INSERT INTO job_listings (name, deadline, industry ) VALUES (${name}, ${deadline}, ${industry})`;
    console.log(`success`);
  } catch (e) {
    throw new Error(e);
  }
};
