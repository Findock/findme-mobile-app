import { FAnnouncementForm } from 'components/Forms/FAnnouncementForm';
import { FKeyboardWrapper } from 'components/Utils/FKeyboardWrapper';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import React from 'react';

export const AddAnnouncementScreen = () => (
  <FDefaultLayout>
    <FKeyboardWrapper>
      <FAnnouncementForm />
    </FKeyboardWrapper>
  </FDefaultLayout>
);
