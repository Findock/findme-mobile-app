import { FAnnouncementForm } from 'components/Forms/Annoucement/FAnnouncementFormuncementForm';
import { FFormLayout } from 'layouts/FFormLayout';
import React, { useRef } from 'react';

export const EditAnnouncementScreen = () => {
  const scrollRef = useRef();

  return (
    <FFormLayout scrollRef={scrollRef}>
      <FAnnouncementForm />
    </FFormLayout>
  );
};
