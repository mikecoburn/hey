import type { NextPage } from 'next';

import Footer from '@components/Shared/Footer';
import NotLoggedIn from '@components/Shared/NotLoggedIn';
import { PAGEVIEW } from '@hey/data/tracking';
import { Card, GridItemEight, GridItemFour, GridLayout } from '@hey/ui';
import isFeatureEnabled from '@lib/isFeatureEnabled';
import { Leafwatch } from '@lib/leafwatch';
import useProfileStore from 'src/store/persisted/useProfileStore';
import { useEffectOnce } from 'usehooks-ts';

const Pro: NextPage = () => {
  const currentProfile = useProfileStore((state) => state.currentProfile);

  useEffectOnce(() => {
    Leafwatch.track(PAGEVIEW, { page: 'pro' });
  });

  if (!currentProfile || !isFeatureEnabled('pro')) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <GridItemEight className="space-y-5">
        <Card className="p-5">gm</Card>
      </GridItemEight>
      <GridItemFour>
        <Card className="p-5">gm</Card>
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
};

export default Pro;
