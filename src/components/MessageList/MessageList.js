import React from "react";
import { Box, Button, Text, Image, Icon } from "@skynexui/components";
import appConfig from "../../../config.json";

export default function MessageList(props) {
  // console.log("MessageList", props);

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "auto",
        overflowAnchor: "auto",
        scrollbarWidth: "thin",
        display: "flex",
        alignItems: "center",
        flexDirection: "column-reverse",
        marginBottom: "8px",
        padding: "0px 20px 16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Box
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "15px",
              padding: "12px",
              margin: "12px 0px",
              width: "95%",
              color: appConfig.theme.colors.neutrals[300],
              boxShadow: "", //appConfig.theme.colors.light["bs1"],
              transition: "box-shadow 1s",
              hover: {
                boxShadow: appConfig.theme.colors.light["bs0"],
                transition: "box-shadow 1s",
              },
            }}
          >
            <Box
              styleSheet={{
                // border: "1px solid green",
                display: "flex",
                flexDirection: "row",
                justifyContent: `${props.loggedUser !== mensagem.de ? "end" : "space-between"}`,
                height: "40px",
              }}
            >
              <Box
                styleSheet={{
                  // border: "1px solid red",
                  display: "flex",
                  flexDirection: `${props.loggedUser !== mensagem.de ? "row-reverse" : "row"}`,
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
                {/*implementer logica para simbolo de superuser */}
                {mensagem.de === "navegantes" ? <Icon name="FaAward" /> : <></>}
                <Text
                  tag="strong"
                  styleSheet={{
                    fontSize: "16px",
                    margin: "0px 6px",
                  }}
                >
                  {mensagem.de}
                </Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                  }}
                  tag="span"
                >
                  {new Date(mensagem.created_at).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </Text>
              </Box>

              {(props.loggedUser === mensagem.de || props.loggedUser === "navegantes") && (
                <Button
                  label={<Icon name="FaTimes" />}
                  buttonColors={{
                    mainColor: appConfig.theme.colors.light["00"],
                    mainColorStrong: appConfig.theme.colors.light["00"],
                  }}
                  onClick={() => {
                    props.removerMensagem(mensagem);
                  }}
                  styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    margin: "0px 8px 8px",
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
              )}
            </Box>

            <Text
              tag="span"
              styleSheet={{
                display: "flex",
                flexDirection: "column",
                alignItems: `${props.loggedUser === mensagem.de ? "" : "end"}`,
                fontSize: "14px",
                color: appConfig.theme.colors.neutrals[300],
                padding: "0px 10px 5px",
                overflow: "auto",
                scrollbarColor: appConfig.theme.colors.light["scrl"],
                scrollbarWidth: "thin",
                wordBreak: "break-all",
                minWidth: "40wv",
              }}
            >
              {mensagem.texto.startsWith(":sticker:") ? (
                <>
                  <Image
                    src={mensagem.texto.replace(":sticker:", "").trim().split(" ")[0]}
                    styleSheet={{
                      maxWidth: "280px",
                    }}
                  />
                  {/* Separa o link do sticker da mensagem/legenda */}
                  {mensagem.texto.replace(":sticker:", "").trim().split(" ").slice(1).join(" ")}
                </>
              ) : (
                mensagem.texto.split("\n").map((str) => <p>{str}</p>)
              )}
            </Text>
            <Box
                styleSheet={{
                  // border: "1px solid red",
                  display: "flex",
                  justifyContent: `${props.loggedUser === mensagem.de ? "flex-start" : "flex-end"}`,
                  marginRight: "50px",
                }}
              >
                <Button
                  label={<Icon name="FaShare" />}
                  buttonColors={{
                    mainColor: appConfig.theme.colors.light["00"],
                    mainColorStrong: appConfig.theme.colors.light["00"],
                  }}
                  styleSheet={{
                  color: appConfig.theme.colors.neutrals["300"],
                }}
                />
                <Button
                  label={<Icon name="FaShareAlt" />}
                  buttonColors={{
                    mainColor: appConfig.theme.colors.light["00"],
                    mainColorStrong: appConfig.theme.colors.light["00"],
                  }}
                  styleSheet={{
                  color: appConfig.theme.colors.neutrals["300"],
                }}
                />
                <Button
                  label={<Icon name="FaHeart" />}
                  buttonColors={{
                    mainColor: appConfig.theme.colors.light["00"],
                    mainColorStrong: appConfig.theme.colors.light["00"],
                  }}
                  styleSheet={{
                  color: appConfig.theme.colors.neutrals["300"],
                }}
                onClick={(ev) => {
                  ev.target.style.color = "red";
                  console.log(ev.target.style);
                  }}
                />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
