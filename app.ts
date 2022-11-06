// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import { requestMetadata } from './src/controllers/metadata';
import { requestToken } from './src/controllers/token';

dotenv.config();
const port = process.env.PORT ?? 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/token', requestToken);
app.get('/metadata/:id', requestMetadata);

app.listen(port, () => {
  console.log('Auth center start');
})