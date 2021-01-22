'use strict';

const Redis = require('ioredis');
const config = require('config');

const connect = () => new Redis(config.redis);

const defaultClient = connect();

module.exports = { defaultClient, connect };
