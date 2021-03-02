"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.db = exports.port = exports.hostname = void 0;
exports.hostname = process.env.SERVER_HOSTNAME || 'localhost';
exports.port = parseInt(process.env.PORT || '3001', 10);
exports.db = process.env.MONGODB_URI || 'mongodb://localhost/graphql_app';
exports.hash = process.env.HASH || 'callbacks 4 everyone';
//# sourceMappingURL=config.js.map