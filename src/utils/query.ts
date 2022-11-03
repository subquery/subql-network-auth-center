
// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { GraphqlQueryClient, NETWORK_CONFIGS } from '@subql/network-clients';
import { GetIndexer, GetIndexerQuery, GetOngoingServiceAgreements, GetOngoingServiceAgreementsQuery } from '@subql/network-query';

const config = NETWORK_CONFIGS.kepler;
const client = new GraphqlQueryClient(config);
const networkClient = client.explorerClient;

export async function getServiceAgreements(deploymentId: string, consumer: string, indexer?: string) {
  const result = await networkClient.query<GetOngoingServiceAgreementsQuery>({
    query: GetOngoingServiceAgreements,
    variables: { address: indexer ?? consumer, now: new Date() },
  });

  const sas = result.data.serviceAgreements.nodes;
  return sas.filter((sa) => sa.consumerAddress === consumer && sa.deploymentId === deploymentId);
}

export async function getIndexer(address: string) {
  const result = await networkClient.query<GetIndexerQuery>({
    query: GetIndexer,
    variables: { address },
  });

  return result.data.indexer;
}