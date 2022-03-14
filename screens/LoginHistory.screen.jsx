import { FLoginHistoryList } from 'components/Scoped/LoginHistory/FLoginHistoryList';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import React from 'react';

export const LoginHistoryScreen = () => (
  <FDefaultLayout
    withLogo={false}
    hasFlatList
    noPaddingVertical
    noPaddingHorizontal
  >
    <FLoginHistoryList />
  </FDefaultLayout>
);
