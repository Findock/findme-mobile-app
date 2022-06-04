import { FModal } from 'components/Composition/FModal';
import { useState } from 'react';
import modalTypes from 'constants/components/modals/modalTypes';

export const useSuccessModal = (title, onContinue) => {
  const [
    showSuccessModal,
    setShowSuccessModal,
  ] = useState(false);

  const drawSuccessModal = () => (
    <FModal
      setVisible={setShowSuccessModal}
      visible={showSuccessModal}
      title={title}
      type={modalTypes.INFO_SUCCESS_MODAL}
      onContinue={onContinue}
    />
  );

  return {
    setShowSuccessModal,
    drawSuccessModal,
  };
};
