// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

import { getIndexer, getServiceAgreements } from '../utils/query';

dotenv.config();

const consumer = process.env.CONSUMER;

// a map between `genesis hash` and `deploymentId`
// update map with latest deploymentId for a project
// TODO: move to env config
const genesisHashToDeploymentId = {
  '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527' : 'Qmdpka4MpaUtGP7B3AAoPji4H6X7a2ir53a1mxnUumqMm4',
}

export async function requestMetadata(req: Request, res: Response) {
  try {
    const genesisHash = req.params.id;
    const deploymentId = genesisHashToDeploymentId[genesisHash];
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