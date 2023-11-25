import { FlexContainer } from "@app/containers";
import React from "react";
import NoNetworkIndicatorImage from "@assets/images/NoNetwork.png";
import Spacer from "../components/Spacer";
import AppText from "../components/AppText";
import { Image } from "react-native";
import { AppColors } from "@app/utils";

function NoNetwork(): JSX.Element {
  return (
    <FlexContainer fillHeight position="center">
      <Image
        source={NoNetworkIndicatorImage}
        style={{ height: 200, width: 200 }}
      />
      <Spacer value={10} />
      <AppText
        style={{
          color: AppColors.SkyBlue,
          width: 290,
          textAlign: "center",
        }}
      >
        Uh, oh! Looks like you aren't connected to the internet.
      </AppText>
    </FlexContainer>
  );
}

export default NoNetwork;
