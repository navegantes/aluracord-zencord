import React from "react";
import { Box, Button, Text, Image, Icon } from "@skynexui/components";
import appConfig from "../../../config.json";

export default function MessageList({ mensagens, removerMensagem }) {
  // console.log("MessageList", props);

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "auto",
        scrollbarColor: appConfig.theme.colors.light["scrl"],
        scrollbarWidth: "thin",
        display: "flex",
        alignItems: "center",
        flexDirection: "column-reverse",
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "8px",
        padding: "0px 20px 16px",
      }}
    >
      {mensagens.map((mensagem) => {
        return (
          <Box
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "15px",
              padding: "12px",
              margin: "12px 0px",
              width: "85%",
              color: appConfig.theme.colors.neutrals[300],
              boxShadow: appConfig.theme.colors.light["bs1"],
              hover: {
                boxShadow: appConfig.theme.colors.light["bs0"],
                transition: "box-shadow 1s",
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                display: "flex",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "12px",
                }}
                tag="span"
              >
                {new Date(mensagem.created_at).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </Text>

              <Button
                label={<Icon name="FaTimes" />}
                // iconName="times"
                // size="md"
                buttonColors={{
                  mainColor: appConfig.theme.colors.light["00"],
                  mainColorStrong: appConfig.theme.colors.light["00"],
                }}
                onClick={() => {
                  removerMensagem(mensagem);
                  // removerMensagem(mensagem.id);
                }}
                styleSheet={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  marginLeft: "auto",
                  transition: "box-shadow 2s, color 2s, opacity 1s",
                  borderRadius: "500px",
                  opacity: "0",
                  hover: {
                    boxShadow: appConfig.theme.colors.light["bs00"],
                    opacity: "1",
                    color: appConfig.theme.colors.neutrals["200"],
                  },
                  focus: {
                    boxShadow: appConfig.theme.colors.light["bs00"],
                    color: appConfig.theme.colors.neutrals["200"],
                  },
                }}
              />
            </Box>

            <Text
              tag="span"
              styleSheet={{
                fontSize: "14px",
                marginLeft: "20px",
                color: appConfig.theme.colors.neutrals[300],
                padding: "0px 10px",
                overflow: "auto",
                scrollbarColor: appConfig.theme.colors.light["scrl"],
                scrollbarWidth: "thin",
                wordBreak: "break-all",
                minWidth: "40wv",
                // maxHeight: "124px",
              }}
            >
              {mensagem.texto.startsWith(":sticker:") ? (
                <>
                  <Image
                    src={mensagem.texto.replace(":sticker:", "").trim().split(" ")[0]}
                    styleSheet={{
                      maxWidth: "280px",
                      // width: "110px",
                    }}
                  />
                  {mensagem.texto.replace(":sticker:", "").trim().split(" ")[1]}
                </>
              ) : (
                mensagem.texto
              )}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
