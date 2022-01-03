import React from "react";
import { View } from "react-native";

interface IUniversalModalProps extends React.ComponentProps<typeof View> {
  children: React.ReactNode;
}

export const UniversalModal = (props: IUniversalModalProps) => {
  return <View {...props} />;
};
