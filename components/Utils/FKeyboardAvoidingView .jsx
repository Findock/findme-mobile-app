import { KeyboardAvoidingView, Platform } from "react-native";

export const FKeyboardAvoidingView = ({ children }) => {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    );
    }