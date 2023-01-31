const db = require("../helper/db.helper");

exports.selectAllUsers = (callback) => {
  const sql = `SELECT * FROM users`;

  return db.query(sql, callback);
};

exports.countAllEmployeBySkill = (filter, callback) => {
  const sql = `SELECT COUNT(DISTINCT(us."userId")) AS "totalData" FROM users u JOIN "userSkills" us ON us."userId" = u.id JOIN skills s ON us."skillId" = s.id WHERE s.name LIKE $1 AND u.status LIKE $2 AND u.role='EMPLOYE'`;

  const values = [`%${filter.search}%`, `%${filter.status}%`];

  return db.query(sql, values, callback);
};

exports.selectEmployesBySkill = (filter, callback) => {
  const sql = `SELECT u.id,u.picture, u.name, u."jobDesk", u.address, u.status, array_agg(s.name) as skills FROM users u LEFT JOIN "userSkills" us ON us."userId" = u.id LEFT JOIN skills s ON us."skillId" = s.id WHERE s.name LIKE $1 AND u.status LIKE $4 AND u.role='EMPLOYE' GROUP BY u.id, u.name, u."jobDesk", u.address ORDER BY "${filter.sortBy}" LIMIT $2 OFFSET $3`;

  const values = [
    `%${filter.search}%`,
    filter.limit,
    filter.offset,
    `%${filter.status}%`,
  ];

  return db.query(sql, values, callback);
};

exports.selectUser = (id, callback) => {
  const sql = `SELECT * FROM users WHERE id=$1`;

  const values = [id];

  return db.query(sql, values, callback);
};

exports.selectUserByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email=$1`;

  const values = [email];

  return db.query(sql, values, callback);
};

exports.selectCompanyByUserId = (id, callback) => {
  const sql = `SELECT u.picture, c.* FROM users u LEFT JOIN company c ON u.id = c."userId" WHERE u.id = $1`;

  const values = [id];

  return db.query(sql, values, callback);
};

exports.insertUser = (data, callback) => {
  const sql = `INSERT INTO users ("picture", "name", "phoneNumber", "email", "password", "address", "bio", "jobDesk", "instagram", "linkedin", "github", gitlab", "status", "role") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;

  const values = [
    data.picture,
    data.name,
    data.phoneNumber,
    data.email,
    data.password,
    data.address,
    data.bio,
    data.jobDesk,
    data.instagram,
    data.linkedin,
    data.github,
    data.gitlab,
    data.status,
    data.role,
  ];

  return db.query(sql, values, callback);
};

exports.patchUser = (id, data, callback) => {
  const sql = `UPDATE users SET "picture"=COALESCE(NULLIF($1, ''), "picture"), "name"=COALESCE(NULLIF($2, ''), "name"), "phoneNumber"=COALESCE(NULLIF($3, ''), "phoneNumber"), "email"=COALESCE(NULLIF($4, ''), "email"), "password"=COALESCE(NULLIF($5, ''), "password"), "address"=COALESCE(NULLIF($6, ''), "address"), "bio"=COALESCE(NULLIF($7, ''), "bio"),
    "jobDesk"=COALESCE(NULLIF($8, ''), "jobDesk"),"instagram"=COALESCE(NULLIF($9, ''), "instagram"), "linkedin"=COALESCE(NULLIF($10, ''), "linkedin"), "github"=COALESCE(NULLIF($11, ''), "github"), "gitlab"=COALESCE(NULLIF($12, ''), "gitlab"), "status"=COALESCE(NULLIF($13, ''), "status"), "role"=COALESCE(NULLIF($14, ''), "role"), "updatedAt"=$15
    WHERE id=$16 RETURNING *`;

  const values = [
    data.picture,
    data.name,
    data.phoneNumber,
    data.email,
    data.password,
    data.address,
    data.bio,
    data.jobDesk,
    data.instagram,
    data.linkedin,
    data.github,
    data.gitlab,
    data.status,
    data.role,
    new Date(),
    id,
  ];

  return db.query(sql, values, callback);
};

exports.deleteUser = (id, callback) => {
  const sql = `DELETE FROM users WHERE id=$1 RETURNING *`;

  const values = [id];

  return db.query(sql, values, callback);
};

exports.insertRegisterEmploye = (data, callback) => {
  const sql = `INSERT INTO users ("name", "phoneNumber", "email", "password", "role") VALUES ($1, $2, $3, $4, $5)  RETURNING *`;

  const values = [
    data.name,
    data.phoneNumber,
    data.email,
    data.password,
    "EMPLOYE",
  ];

  return db.query(sql, values, callback);
};

exports.insertRegisterRecruter = async (data, callback) => {
  const dataBody = {
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: data.password,
    company: data.company,
    field: data.field,
  };
  try {
    await db.query("BEGIN");

    const sqlUser = `INSERT INTO users ("name", "phoneNumber", "email", "password", "role") VALUES ($1, $2, $3, $4, $5)  RETURNING *`;

    const userQuery = await db.query(sqlUser, [
      dataBody.name,
      dataBody.phoneNumber,
      dataBody.email,
      dataBody.password,
      "RECRUITER",
    ]);

    const sqlCompany = `INSERT INTO company ("name","field","userId") VALUES ($1,$2,currval(pg_get_serial_sequence('users','id'))) RETURNING *`;

    const companyQuery = await db.query(sqlCompany, [
      dataBody.company,
      dataBody.field,
    ]);

    await db.query("COMMIT");

    const results = {
      userQuery,
      companyQuery,
    };

    callback(null, results);
  } catch (error) {
    callback(error, null);
  }
};

exports.patchUserByToken = (id, data, callback) => {
  const sql = `UPDATE users SET "picture"=COALESCE(NULLIF($1, ''), "picture"), "name"=COALESCE(NULLIF($2, ''), "name"), "phoneNumber"=COALESCE(NULLIF($3, ''), "phoneNumber"), "email"=COALESCE(NULLIF($4, ''), "email"), "password"=COALESCE(NULLIF($5, ''), "password"), "address"=COALESCE(NULLIF($6, ''), "address"), "bio"=COALESCE(NULLIF($7, ''), "bio"),
    "jobDesk"=COALESCE(NULLIF($8, ''), "jobDesk"),"instagram"=COALESCE(NULLIF($9, ''), "instagram"), "linkedin"=COALESCE(NULLIF($10, ''), "linkedin"), "github"=COALESCE(NULLIF($11, ''), "github"), "gitlab"=COALESCE(NULLIF($12, ''), "gitlab"), "status"=COALESCE(NULLIF($13, ''), "status"), "role"=COALESCE(NULLIF($14, ''), "role"), "updatedAt"=$15
    WHERE id=$16 RETURNING *`;

  const values = [
    data.picture,
    data.name,
    data.phoneNumber,
    data.email,
    data.password,
    data.address,
    data.bio,
    data.jobDesk,
    data.instagram,
    data.linkedin,
    data.github,
    data.gitlab,
    data.status,
    data.role,
    new Date(),
    id,
  ];

  return db.query(sql, values, callback);
};
