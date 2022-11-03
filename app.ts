// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import express from 'express';
import bodyParser from 'body-parser';

import { requestToken } from './src/controllers/token';
import { requestMetadata } from './src/controllers/metadata';

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/token', requestToken);
app.get('/metadata/:id', requestMetadata);

app.listen(port, () => {
  console.log('Auth center start');
})