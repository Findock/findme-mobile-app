import { FAnnouncementForm } from 'components/Forms/FAnnouncementForm';
import { FKeyboardWrapper } from 'components/Utils/FKeyboardWrapper';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import React, { useRef } from 'react';

export const AddAnnouncementScreen = () => {
  const scrollRef = useRef();
  return (
    <FDefaultLayout scrollRef={scrollRef}>
      <FKeyboardWrapper scrollRef={scrollRef}>
        <FAnnouncementForm />
      </FKeyboardWrapper>
    </FDefaultLayout>
  );
};
