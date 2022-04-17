import { FAnnouncementForm } from 'components/Forms/FAnnouncementForm';
import { FFormLayout } from 'layouts/FFormLayout';
import React, { useRef } from 'react';

export const AddAnnouncementScreen = () => {
  const scrollRef = useRef();
  return (
    <FFormLayout scrollRef={scrollRef}>
      <FAnnouncementForm />
    </FFormLayout>
  );
};
