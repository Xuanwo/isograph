import React from "react";
import { bDeclare, read, useLazyReference } from "@isograph/react";
import { Container } from "@mui/material";

import repositoryPageQuery from "./__isograph/Query__repository_page.isograph";
import { FullPageLoading, Route, RepositoryRoute } from "./github_demo";

bDeclare`
  Query.repository_page($repositoryName: String!, $repositoryOwner: String!, $first: Int!,) @fetchable {
    header,
    repository_detail,
  }
`;

export function RepositoryRoute({
  route,
  setRoute,
}: {
  route: RepositoryRoute;
  setRoute: (route: Route) => void;
}) {
  const { queryReference } = useLazyReference(repositoryPageQuery, {
    repositoryName: route.repositoryName,
    repositoryOwner: route.repositoryOwner,
    first: 20,
  });
  console.log("repository route", { queryReference });
  const data = read(queryReference);
  return (
    <>
      {data.header({ route, setRoute })}
      <Container maxWidth="md">
        <React.Suspense fallback={<FullPageLoading />}>
          {data.repository_detail({
            setRoute,
          })}
        </React.Suspense>
      </Container>
    </>
  );
}
