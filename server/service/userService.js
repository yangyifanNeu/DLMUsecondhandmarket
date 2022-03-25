const { models } = require('../middleware/sequelize');
//const { getIdParam } = require('../helpers');
async function getById(id) {
	const user = await models.user.findByPk(id);
	if (user) {
		return user
	} else {
		return null;
	}
};
module.exports = {
	getById,
};
