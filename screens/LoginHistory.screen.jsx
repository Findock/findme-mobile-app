import { FLoginHistoryList } from 'components/Scoped/LoginHistory/FLoginHistoryList';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import React from 'react';

export const LoginHistoryScreen = () => (
  <FDefaultLayout
    noPaddingVertical
    noPaddingHorizontal
  >
    <FLoginHistoryList />
  </FDefaultLayout>
);
