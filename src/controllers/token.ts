// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { requestAuthToken } from '@subql/apollo-links';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

import { getIndexer, getServiceAgreements } from '../utils/query';

dotenv.config();

const consumer = process.env.CONSUMER;
const chainId = process.env.CHAIN_ID;
const sk = process.env.sk;

export async function requestToken(req: Request, res: Response) {
  try {
    const { indexer, deploymentId } = req.body;
    const sas = await getServiceAgreements(deploymentId, consumer, indexer);
    if (sas.length === 0) {
      return res.status(500).send(`No service agreements found for consumer: ${consumer}`);
    }

    const { metadata } = await getIndexer(indexer);
    const url = metadata.url.replace(/\/+$/, '');
    const authUrl = `${url}/token`;

    const timestamp = Date.now();
    const agreement = sas[0].id;
    const message = { indexer, consumer, agreement, deploymentId, timestamp };
    const token = await requestAuthToken(authUrl, message, sk, Number(chainId));
  
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).send(`Failed to get token: ${e}`);
  }
}