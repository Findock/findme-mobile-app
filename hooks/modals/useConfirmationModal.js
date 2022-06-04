import { useState } from 'react';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modals/modalTypes';

export const useConfirmationModal = (title, onConfirm) => {
  const [
    showConfirmationModal,
    setShowConfirmationModal,
  ] = useState(false);

  const drawConfirmationModal = () => (
    <FModal
      setVisible={setShowConfirmationModal}
      visible={showConfirmationModal}
      title={title}
      type={modalTypes.CONFIRM_MODAL}
      onConfirm={onConfirm}
    />
  );

  return {
    setShowConfirmationModal,
    drawConfirmationModal,
  };
};
