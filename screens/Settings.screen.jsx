import { FDefaultLayout } from 'layouts/FDefault.layout';
import React, { useState } from 'react';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { FSpinner } from 'components/Composition/FSpinner';
import { FSettingsScreen } from 'components/Scoped/Settings/FSettingsScreen';
import { FSettingsFormScreen } from 'components/Scoped/Settings/FSettingsFormScreen';

export const SettingsScreen = () => {
  const [
    status,
    requestPermission,
  ] = Location.useForegroundPermissions();
  const me = useSelector((state) => state.me.me);
  const [
    isForm,
    setIsForm,
  ] = useState(false);

  return (
    <FDefaultLayout
      hasFlatList={false}
      withLogo={false}
      isAlwaysScrollable={isForm}
    >
      {!me ? <FSpinner /> : (
        isForm ? (
          <FSettingsFormScreen
            me={me}
            status={status}
            setIsForm={setIsForm}
          />
        ) : (
          <FSettingsScreen
            me={me}
            status={status}
            setIsForm={setIsForm}
          />
        )
      )}
    </FDefaultLayout>
  );
};
