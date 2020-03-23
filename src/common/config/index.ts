export default () => ({
	server: {
		port: process.env.SERVER_PORT,
	},
	database: {
		uri: `${process.env.DATABASE_URI}:${process.env.DATABASE_PORT}/${process.env.DATEBASE_NAME}`,
	},
});
