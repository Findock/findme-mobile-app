import { FCreateAnnouncementForm } from 'components/Forms/Annoucement/FCreateAnnouncementForm';
import { FFormLayout } from 'layouts/FFormLayout';
import React, { useRef } from 'react';

export const AddAnnouncementScreen = () => {
  const scrollRef = useRef();
  return (
    <FFormLayout scrollRef={scrollRef}>
      <FCreateAnnouncementForm />
    </FFormLayout>
  );
};
