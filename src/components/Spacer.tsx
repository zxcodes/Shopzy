import React from "react";
import { View } from "react-native";
import { isAndroid } from "@app/utils";

type SpacerProps = {
  value: number;
  between?: boolean;
};

export default function Spacer({ value, between }: SpacerProps) {
  return value ? (
    <View
      style={{
        height: between ? 0 : isAndroid ? value + 1.5 : value,
        width: between ? (isAndroid ? value + 1.5 : value) : 0,
      }}
    />
  ) : null;
}

// <Spacer value={10} between />
