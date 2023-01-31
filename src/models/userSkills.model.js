const db = require("../helper/db.helper");

exports.selectAllUserSkills = (callback) => {
  const sql = `SELECT * FROM "userSkills"`;

  return db.query(sql, callback);
};

exports.selectUserSkill = (id, callback) => {
  const sql = `SELECT * FROM "userSkills" WHERE id=$1`;

  const values = [id];

  return db.query(sql, values, callback);
};

exports.insertUserSkill = (data, callback) => {
  const sql = `INSERT INTO "userSkills" ("userId", "skillId") VALUES ($1, $2) RETURNING *`;

  const values = [data.userId, data.skillId];

  return db.query(sql, values, callback);
};

exports.patchUserSkill = (id, data, callback) => {
  const sql = `UPDATE "userSkills" SET "userId"=COALESCE(NULLIF($1, '')::INTEGER, "userId"), "skillId"=COALESCE(NULLIF($2, '')::INTEGER, "skillId"), "updatedAt"=$3 WHERE id=$4 RETURNING *`;

  const values = [data.userId, data.skillId, new Date(), id];

  return db.query(sql, values, callback);
};

exports.deleteUserSkill = (userId, skillId, callback) => {
  const sql = `DELETE FROM "userSkills" WHERE "userId"=$1 AND "skillId"=$2 RETURNING *`;

  const values = [userId, skillId];
  console.log(values);

  return db.query(sql, values, callback);
};
