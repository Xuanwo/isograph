import type { RefetchReaderArtifact, ReaderAst, RefetchQueryNormalizationArtifact } from '@isograph/react';
const includeReadOutData = (variables: any, readOutData: any) => {
  return variables;
};

import { makeNetworkRequest, type IsographEnvironment, type DataId, type TopLevelReaderArtifact, type FragmentReference, type RefetchQueryNormalizationArtifactWrapper } from '@isograph/react';
import { type ItemCleanupPair } from '@isograph/react-disposable-state';
const resolver = (
  environment: IsographEnvironment,
  artifact: RefetchQueryNormalizationArtifact,
  readOutData: any,
  filteredVariables: any,
  rootId: DataId,
  // TODO type this
  readerArtifact: TopLevelReaderArtifact<any, any, any>,
  nestedRefetchQueries: RefetchQueryNormalizationArtifactWrapper[],
) => (mutationParams: any): ItemCleanupPair<FragmentReference<any, any>> | undefined => {
  const variables = includeReadOutData({...filteredVariables, ...mutationParams}, readOutData);
  const [_networkRequest, disposeNetworkRequest] = makeNetworkRequest(environment, artifact, variables);
  if (readerArtifact == null) return;
  const fragmentReference = {
    kind: 'FragmentReference',
    readerArtifact,
    root: rootId,
    variables,
    nestedRefetchQueries,
  } as const;
  return [fragmentReference, disposeNetworkRequest];
};


const readerAst: ReaderAst<unknown> = [
];

const artifact: RefetchReaderArtifact = {
  kind: "RefetchReaderArtifact",
  // @ts-ignore
  resolver,
  readerAst,
};

export default artifact;
