import React from 'react';
import { iso } from '@iso';
import { Container, Stack } from '@mui/material';
import { useLazyReference, useResult } from '@isograph/react';
import { Route, PetDetailRoute, useNavigateTo } from './routes';

export const PetDetailRouteComponent = iso(`
  field Query.PetDetailRoute($id: ID!) @component {
    pet(id: $id) {
      name
      PetCheckinsCard
      PetBestFriendCard
      PetPhraseCard
      PetTaglineCard
      PetStatsCard
    }
  }
`)(function PetDetailRouteComponent(data) {
  const navigateTo = useNavigateTo();
  const { pet } = data;
  if (pet == null) {
    return <h1>Pet not found.</h1>;
  }
  return (
    <Container maxWidth="md">
      <h1>Pet Detail for {pet.name}</h1>
      <h3
        onClick={() => navigateTo({ kind: 'Home' })}
        style={{ cursor: 'pointer' }}
      >
        ← Home
      </h3>
      <React.Suspense fallback={<h2>Loading pet details...</h2>}>
        <Stack direction="row" spacing={4}>
          <Stack direction="column" spacing={4}>
            <pet.PetCheckinsCard />
            <pet.PetStatsCard />
          </Stack>
          <Stack direction="column" spacing={4}>
            <pet.PetBestFriendCard />

            <pet.PetPhraseCard />
            <pet.PetTaglineCard />
          </Stack>
        </Stack>
      </React.Suspense>
    </Container>
  );
});

export function PetDetailRouteLoader({ route }: { route: PetDetailRoute }) {
  const { queryReference } = useLazyReference(
    iso(`entrypoint Query.PetDetailRoute`),
    { id: route.id },
  );

  const Component = useResult(queryReference);
  return <Component />;
}
