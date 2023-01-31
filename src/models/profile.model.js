const db = require("../helper/db.helper");

exports.selectProfile = (id, cb) => {
  const sql = `SELECT 
    u.name, 
    u.picture,
    u."phoneNumber",
    u.email,
    u.address,
    u.bio,
    u."jobDesk",
    u.instagram,
    u.github,
    u.gitlab,
    u.status,
    u.linkedin,
    u.role,
    string_to_array(string_agg(s.name, ', '), ', ') AS skills
    FROM users u 
    JOIN "userSkills" us ON us."userId" = u.id
    JOIN "skills" s ON s.id = us."skillId"
    WHERE u.id=$1 GROUP BY u.id;`;

  const values = [id];

  return db.query(sql, values, cb);
};

exports.selectExperienceProfile = (id, callback) => {
  const sql = `SELECT * FROM experiences WHERE "userId"=$1`;

  const values = [id];

  return db.query(sql, values, callback);
};

exports.selectPortofolioProfile = (id, callback) => {
  const sql = `SELECT * FROM portofolio WHERE "userId"=$1`;

  const values = [id];

  return db.query(sql, values, callback);
};

exports.updateSkills = async (id, data, callback) => {
  const dataBody = {
    name: data.name,
  };
  try {
    await db.query("BEGIN");

    const sqlSkills = `INSERT INTO skills ("name") VALUES ($1) RETURNING *`;

    const skillsQuery = await db.query(sqlSkills, [dataBody.name]);

    const sqlUserSkills = `INSERT INTO "userSkills" ("userId", "skillId") VALUES ($1, currval(pg_get_serial_sequence('skills','id'))) RETURNING *`;

    const userSkillsQuery = await db.query(sqlUserSkills, [id]);

    await db.query("COMMIT");

    const results = {
      skillsQuery,
      userSkillsQuery,
    };

    callback(null, results);
  } catch (error) {
    callback(error, null);
  }
};

exports.selectSkillsByToken = (id, callback) => {
  const sql = `SELECT s.id, s.name FROM skills s JOIN "userSkills" us ON us."skillId" = s.id WHERE us."userId"=$1`;

  const values = [id];

  return db.query(sql, values, callback);
};
