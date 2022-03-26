import { FDefaultLayout } from 'layouts/FDefault.layout';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FSpinner } from 'components/Composition/FSpinner';
import { FSettingsScreen } from 'components/Scoped/Settings/FSettingsScreen';
import { FSettingsFormScreen } from 'components/Scoped/Settings/FSettingsFormScreen';

export const SettingsScreen = () => {
  const me = useSelector((state) => state.me.me);
  const [
    isForm,
    setIsForm,
  ] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [isForm]);

  return (
    <FDefaultLayout
      hasFlatList={false}
      isAlwaysScrollable
      scrollViewRef={scrollViewRef}
    >
      {!me ? <FSpinner /> : (
        isForm ? (
          <FSettingsFormScreen
            me={me}
            setIsForm={setIsForm}
          />
        ) : (
          <FSettingsScreen
            me={me}
            setIsForm={setIsForm}
            scrollViewRef={scrollViewRef}
          />
        )
      )}
    </FDefaultLayout>
  );
};
