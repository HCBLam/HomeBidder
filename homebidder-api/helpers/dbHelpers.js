module.exports = (db) => {

  //GET ALL USERS
  const getUsers = () => {
    const query = {
        text: 'SELECT * FROM users',
    };

    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  //CHECK IF USER EMAIL ALREADY EXIST
  const getUserByEmail = email => {

    const query = {
        text: `SELECT * FROM users WHERE email = $1` ,
        values: [email]
    }

    return db
        .query(query)
        .then(result => result.rows[0])
        .catch((err) => err);
  };

  //ADD USER
  const addUser = (firstName, lastName, email, password) => {
    const query = {
        text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
        values: [firstName, lastName, email, password]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };

  //GET ALL PROPERTIES
  const getProperties = () => {
    const query = {
        text: 'SELECT * FROM properties',
    };

    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  //ADD A PROPERTY TO THE LISTINGS
  const addProperties = (ownerId, numBaths, numBeds, numParking, street, city, province, postCode, squareFootage, propertyType, yearBuilt) => {
    const query = {
      text: `INSERT INTO properties
        (owner_id, number_of_bathrooms, number_of_bedrooms, parking_spaces, street, city, province, post_code, square_footage, property_type, year_built)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      values: [ownerId, numBaths, numBeds, numParking, street, city, province, postCode, squareFootage, propertyType, yearBuilt]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };


  return {
    getUsers,
    addUser,
    getUserByEmail,
    getProperties,
    addProperties
  };
};