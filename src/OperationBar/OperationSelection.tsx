import * as React from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/IconButton";
import { editingModeState, EditingModes } from "../Store";
import { useRecoilState } from "recoil";
import { useContext } from "react";
import {
  AdjustmentOperations,
  EditingOperations,
  EditorContext,
  TransformOperations,
} from "..";
import { useMemo } from "react";

interface Operation<T> {
  title: string;
  iconID: React.ComponentProps<typeof Icon>["iconID"];
  operationID: T;
}

interface Operations {
  transform: Operation<TransformOperations>[];
  adjust: Operation<AdjustmentOperations>[];
}

const operations: Operations = {
  transform: [
    {
      title: "Crop",
      iconID: "crop",
      operationID: "crop",
    },
    {
      title: "Rotate",
      iconID: "rotate-90-degrees-ccw",
      operationID: "rotate",
    },
  ],
  adjust: [
    {
      title: "Blur",
      iconID: "blur-on",
      operationID: "blur",
    },
  ],
};

export function OperationSelection() {
  //
  const { allowedTransformOperations, allowedAdjustmentOperations } =
    useContext(EditorContext);

  const isTransformOnly =
    allowedTransformOperations && !allowedAdjustmentOperations;
  const isAdjustmentOnly =
    allowedAdjustmentOperations && !allowedTransformOperations;

  const [selectedOperationGroup, setSelectedOperationGroup] = React.useState<
    "transform" | "adjust"
  >(isAdjustmentOnly ? "adjust" : "transform");

  const [, setEditingMode] = useRecoilState(editingModeState);

  const filteredOperations = useMemo(() => {
    // If neither are specified then allow the full range of operations
    if (!allowedTransformOperations && !allowedAdjustmentOperations) {
      return operations;
    }
    const filteredTransforms = allowedTransformOperations
      ? operations.transform.filter((op) =>
          allowedTransformOperations.includes(op.operationID)
        )
      : operations.transform;
    const filteredAdjustments = allowedAdjustmentOperations
      ? operations.adjust.filter((op) =>
          allowedAdjustmentOperations.includes(op.operationID)
        )
      : operations.adjust;
    if (isTransformOnly) {
      return { transform: filteredTransforms, adjust: [] };
    }
    if (isAdjustmentOnly) {
      return { adjust: filteredAdjustments, transform: [] };
    }
    return { transform: filteredTransforms, adjust: filteredAdjustments };
  }, [
    allowedTransformOperations,
    allowedAdjustmentOperations,
    isTransformOnly,
    isAdjustmentOnly,
  ]);

  return (
    <>
      <ScrollView style={styles.opRow} horizontal>
        {filteredOperations["transform"].map(
          (item: Operation<EditingOperations>, index: number) => (
            <View style={styles.opContainer} key={item.title}>
              <IconButton
                text={
                  { Crop: "자르기", Rotate: "회전", Blur: "블러" }[
                    item.title
                  ] || ""
                }
                iconID={item.iconID}
                onPress={() => setEditingMode(item.operationID)}
              />
            </View>
          )
        )}
        {filteredOperations["adjust"].map(
          (item: Operation<EditingOperations>, index: number) => (
            <View style={styles.opContainer} key={item.title}>
              <IconButton
                text={
                  { Crop: "자르기", Rotate: "회전", Blur: "블러" }[
                    item.title
                  ] || ""
                }
                iconID={item.iconID}
                onPress={() => setEditingMode(item.operationID)}
              />
            </View>
          )
        )}
      </ScrollView>
      {/* {!isTransformOnly && !isAdjustmentOnly ? (
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => setSelectedOperationGroup("transform")}
          >
            <Icon color={selectedOperationGroup === "transform" ? "#c00c3f" : undefined} iconID="transform" text=" " />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => setSelectedOperationGroup("adjust")}
          >
            <Icon color={selectedOperationGroup === "adjust" ? "#c00c3f" : undefined } iconID="tune" text=" " />
          </TouchableOpacity>
        </View>
      ) : null} */}
    </>
  );
}

const styles = StyleSheet.create({
  opRow: {
    height: 40,
    width: "100%",
    backgroundColor: "#FFF",
  },
  opContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  modeRow: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modeButton: {
    height: 80,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});
