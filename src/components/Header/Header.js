import React from "react";
import { Box, Button, Text, Icon } from "@skynexui/components";

import appConfig from "../../../config.json";

export default function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Controle de Zion</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Sair"
          href="/"
          buttonColors={{
            mainColor: appConfig.theme.colors.neutrals["300"],
            mainColorStrong: appConfig.theme.colors.light["00"],
          }}
          styleSheet={{
            borderRadius: "500px",
            marginBottom: "6px",
            hover: {
              boxShadow: appConfig.theme.colors.light["bs00"],
            },
            focus: {
              boxShadow: appConfig.theme.colors.light["bs00"],
            },
          }}
        />
        {/* <Button
          variant="tertiary"
          colorVariant="neutral"
          label={<Icon name="FaCog" />}
          // href="/"
          buttonColors={{
            mainColor: appConfig.theme.colors.neutrals["300"],
            mainColorStrong: appConfig.theme.colors.light["00"],
          }}
          styleSheet={{
            borderRadius: "500px",
            marginBottom: "6px",
            hover: {
              boxShadow: appConfig.theme.colors.light["bs00"],
            },
            focus: {
              boxShadow: appConfig.theme.colors.light["bs00"],
            },
          }}
        /> */}
      </Box>
    </>
  );
}
