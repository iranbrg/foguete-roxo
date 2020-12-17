export default {
    dialect: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "sqlnode",
    define: {
        timestamps: true,
        underscored: true,
    },
};
