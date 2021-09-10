import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface IIconProps {
  disabled?: boolean;
  iconID: string;
  text: string;
  color?: string;
}

export function Icon(props: IIconProps) {
  
  return (
    <View style={[styles.container, Boolean(props.text) && Boolean(props.iconID) ? {
      justifyContent: "space-between"
    } : { height: 40, justifyContent: "center" }, ]}>
      {Boolean(props.iconID) && <MaterialIcons
        name={props.iconID}
        size={26}
        color={props.color ? props.color : props.disabled ? "#f5f6Fa" : "#444"}
      />}
      {Boolean(props.text) && <Text
        style={[
          styles.text,
          props.color ?
            { color : props.color } :
            props.disabled && { color: "#f5f6Fa" },
          !Boolean(props.iconID) ? { fontSize: 16 } : {}
        ]}>
        {props.text}
      </Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: 80,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  text: {
    color: "#444",
    textAlign: "center",
  },
});
