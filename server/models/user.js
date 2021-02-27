module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		userEmail: {
			type: DataTypes.STRING(50),
			unique: true,
		},
		userPassword: {
			type: DataTypes.STRING(50),
		},
		name: {
			type: DataTypes.STRING(50),
		},
		emailHash: {
			type: DataTypes.STRING(10),
		},
		emailChecked: {
			type: DataTypes.BOOLEAN,
		},
		token: {
			type: DataTypes.STRING(30),
		},
		tokenExp: {
			type: DataTypes.STRING(15),
		},
		role: {
			type: DataTypes.INTEGER.UNSIGNED,
			defaultValue: 0,
		},
		kkoID: {
			type: DataTypes.STRING(10),
			unique: true,
		},
		kkoEmail: {
			type: DataTypes.STRING(50),
			unique: true,
		},
		nvrID: {
			type: DataTypes.STRING(10),
			unique: true,
		},
		nvrEmail: {
			type: DataTypes.STRING(50),
			unique: true,
		},
		gglID: {
			type: DataTypes.STRING(30),
			unique: true,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('now()'),
		},
		// product: {
		// 	type: DataTypes.TEXT,
		// 	allowNull: true,
		// },
	}, {
		timestamps: false,
		charset: 'utf8',
    collate: 'utf8_general_ci',
    paranoid: false,
	});
};