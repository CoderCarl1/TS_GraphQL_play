export const hostname: string = process.env.SERVER_HOSTNAME || 'localhost';
export const port: number = parseInt(process.env.PORT || '3001', 10);
export const db: string = process.env.MONGODB_URI || 'mongodb://localhost/graphql_app';
export const hash: string = process.env.HASH || 'callbacks 4 everyone';
