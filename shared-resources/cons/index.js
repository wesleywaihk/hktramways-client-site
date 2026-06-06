'use strict';
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
exports.PREVIEW_SECRET = process.env.PREVIEW_SECRET ?? '';
