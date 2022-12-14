// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

import { getIndexer, getServiceAgreements } from '../utils/query';
import { projects } from '../constants/projects';

dotenv.config();

const consumer = process.env.CONSUMER;

export async function requestMetadata(req: Request, res: Response) {
  try {
    const genesisHash = req.params.id;
    const deploymentId = projects[genesisHash];
    if (!deploymentId) {
      return res.status(500).send(`No project found for genesis hash ${genesisHash}`);
    }

    const sas = await getServiceAgreements(deploymentId, consumer);
    if (sas.length === 0) {
      return res.status(500).send(`No service agreements for ${deploymentId}`);
    }

    const { indexerAddress: indexer } = sas[0];
    const { metadata } = await getIndexer(indexer);
    const url = metadata.url.replace(/\/+$/, '');

    res.status(200).json({ indexer, uri: `${url}/query/${deploymentId}`, deploymentId });
  } catch (e) {
    res.status(500).send(`Failed to get agreement metadata: ${e}`);
  }
}