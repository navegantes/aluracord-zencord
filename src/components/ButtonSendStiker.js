import React from "react";
import { Box, Button, Text, Image } from "@skynexui/components";
import appConfig from "../../config.json";

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState("");

  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <Button
        buttonColors={{
          mainColor: appConfig.theme.colors.light["00"],
          mainColorStrong: appConfig.theme.colors.light["00"],
        }}
        styleSheet={{
          borderRadius: "50%",
          padding: "0 3px 0 0",
          minWidth: "50px",
          minHeight: "50px",
          fontSize: "20px",
          marginLeft: "10px",
          lineHeight: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.light["00"],
          boxShadow: appConfig.theme.colors.light["bs0"],
          // filter: isOpen ? "grayscale(0)" : "grayscale(1)",
          hover: {
            boxShadow: appConfig.theme.colors.light["bs00"],
          },
          focus: {
            boxShadow: appConfig.theme.colors.light["bs00"],
          },
        }}
        label="😋"
        onClick={() => setOpenState(!isOpen)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            position: "absolute",
            backgroundColor: appConfig.theme.colors.light["00"],
            width: {
              xs: "200px",
              sm: "290px",
            },
            height: "300px",
            right: "30px",
            bottom: "30px",
            padding: "16px",
            boxShadow: "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["300"],
              fontWeight: "bold",
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flex: 1,
              paddingTop: "16px",
              overflowY: "auto",
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li"
                key={sticker}
                styleSheet={{
                  width: "50%",
                  borderRadius: "5px",
                  padding: "10px",
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[200],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[200],
                  },
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
