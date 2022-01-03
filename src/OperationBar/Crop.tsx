import * as React from "react";
import { StyleSheet, View, Text, Platform, Alert } from "react-native";
import { useRecoilState } from "recoil";
import { IconButton } from "../components/IconButton";
import { editingModeState } from "../Store";
import { usePerformCrop } from "../customHooks/usePerformCrop";

export function Crop() {
  const [, setEditingMode] = useRecoilState(editingModeState);

  const onPerformCrop = usePerformCrop();

  return (
    <View style={styles.container}>
      <IconButton
        iconID="close"
        text=""
        onPress={() => setEditingMode("operation-select")}
      />
      <Text style={styles.prompt}>자르기</Text>
      <IconButton iconID="check" text="" onPress={onPerformCrop} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#f5f6Fa",
    borderTopWidth: 1,
  },
  prompt: {
    color: "#444",
    fontSize: 21,
    textAlign: "center",
  },
});
