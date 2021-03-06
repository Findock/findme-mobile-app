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
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  }, [isForm]);

  if (!me) return <FSpinner />;
  return (
    isForm ? (
      <FSettingsFormScreen
        me={me}
        setIsForm={setIsForm}
      />
    ) : (
      <FSettingsScreen
        me={me}
        setIsForm={setIsForm}
      />
    ));
};
