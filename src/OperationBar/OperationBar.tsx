import * as React from "react";
import { Animated, LayoutRectangle, StyleSheet, View } from "react-native";
import { editingModeState } from "../Store";
import { useRecoilState } from "recoil";
import { OperationSelection } from "./OperationSelection";
import { Crop } from "./Crop";
import { Rotate } from "./Rotate";
import { Blur } from "./Blur";
import { useState } from "react";

export function OperationBar() {
  //
  const [editingMode] = useRecoilState(editingModeState);

  const getOperationWindow = () => {
    switch (editingMode) {
      case "crop":
        return <Crop />;
      case "rotate":
        return <Rotate />;
      case "blur":
        return <Blur />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, ["rotate", "blur"].includes(editingMode) ? { height: 140 } : {}]}>
      <OperationSelection />
      {editingMode !== "operation-select" && (
        <View style={[styles.container, ["rotate", "blur"].includes(editingMode) ? { height: 140 } : {}, { position: "absolute" }]}>
          {getOperationWindow()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
});
