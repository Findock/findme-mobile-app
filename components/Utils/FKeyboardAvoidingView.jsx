import React, { useEffect, useState } from 'react';

import {
  Keyboard, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';

export const FKeyboardAvoidingView = ({ children, style }) => (
  <KeyboardAvoidingView
    behavior="position"
    keyboardVerticalOffset={-150}
    contentContainerStyle={{
      flex: 1,
    }}
    style={{
      flex: 1,
    }}
  >
    {children}
  </KeyboardAvoidingView>
);
