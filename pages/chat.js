import { Box, Text, TextField, Image, Button, Icon } from "@skynexui/components";
import React, { useState } from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  // Sua lógica vai aqui
  const [mensagem, setMensagem] = useState("");
  const [listaMsg, setListaMsg] = useState([]);
  const [isMsgEnable, setIsMsgEnable] = useState(false);

  function handleNovaMsg(novaMsg) {
    const mensagem = {
      id: listaMsg.length + 1,
      de: "navegantes",
      texto: novaMsg.trim(),
    };

    if (mensagem.texto != "") {
      setListaMsg([mensagem, ...listaMsg]);
    }
    setMensagem("");
    setIsMsgEnable(false);
  }

  function removerMensagem(mensagemId) {
    setListaMsg(listaMsg.filter((msg) => msg.id != mensagemId));
  }
  // ./Sua lógica vai aqui

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.light["00"],
        color: appConfig.theme.colors.neutrals["300"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: appConfig.theme.colors.light["bs1"],
          borderRadius: "10px",
          backgroundColor: appConfig.theme.colors.light["00"],
          height: "100%",
          maxWidth: "70%",
          maxHeight: "90vh",
          padding: "20px 46px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.light["00"],
            boxShadow: appConfig.theme.colors.light["bs0"],
            flexDirection: "column",
            borderRadius: "10px",
            padding: "20px 30px 2px",
            marginBottom: "30px",
          }}
        >
          <MessageList mensagens={listaMsg} removerMensagem={removerMensagem} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "auto",
              padding: "0px 40px",
              // border: "2px solid lime",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(ev) => {
                ev.preventDefault();
                if (ev.target.value.length > 0) {
                  setIsMsgEnable(true);
                } else {
                  setIsMsgEnable(false);
                }
                setMensagem(ev.target.value);
              }}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  handleNovaMsg(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                display: "flex",
                mainAxisAlignment: "center",
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "10px",
                padding: "6px 8px",
                marginBottom: "16px",
                backgroundColor: appConfig.theme.colors.light["00"],
                boxShadow: appConfig.theme.colors.light["bs2"],
                marginRight: "18px",
                padding: "16px 20px 10px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            />
            <Button
              type="submit"
              label="Enviar"
              disabled={!isMsgEnable}
              onClick={(ev) => {
                ev.preventDefault();
                handleNovaMsg(mensagem);
              }}
              buttonColors={{
                mainColor: appConfig.theme.colors.light["00"],
                mainColorStrong: appConfig.theme.colors.light["00"],
              }}
              styleSheet={
                isMsgEnable
                  ? {
                      display: "flex",
                      alignSelf: "flex-end",
                      boxShadow: appConfig.theme.colors.light["bs0"],
                      borderRadius: "1000px",
                      padding: "8px",
                      margin: "0px 18px 18px",
                      width: "100px",
                      color: appConfig.theme.colors.neutrals["200"],
                      transition: "box-shadow 1s, color 2s",
                      hover: {
                        boxShadow: appConfig.theme.colors.light["bs00"],
                      },
                      focus: {
                        boxShadow: appConfig.theme.colors.light["bs00"],
                      },
                    }
                  : {
                      display: "flex",
                      alignSelf: "flex-end",
                      boxShadow: "none",
                      width: "100px",
                      borderRadius: "1000px",
                      color: appConfig.theme.colors.light["00"],
                      padding: "8px",
                      margin: "0px 18px 18px",
                      transition: "box-shadow 2s, color 2s",
                    }
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
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
        <Button variant="tertiary" colorVariant="neutral" label="Logout" href="/" />
      </Box>
    </>
  );
}

function MessageList({ mensagens, removerMensagem }) {
  // console.log("MessageList", props);

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "auto",
        scrollbarColor: appConfig.theme.colors.light["scrl"],
        scrollbarWidth: "thin",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "8px",
      }}
    >
      {mensagens.map((mensagem) => {
        return (
          <Box
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "12px",
              margin: "0px 28px 16px 12px",
              boxShadow: appConfig.theme.colors.light["bs1"],
              transition: "box-shadow 3s",
              color: appConfig.theme.colors.neutrals[300],
              hover: {
                // backgroundColor: appConfig.theme.colors.light["00"],
                boxShadow: appConfig.theme.colors.light["bs0"],
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
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Button
                iconName="FaTimes"
                buttonColors={{
                  mainColor: appConfig.theme.colors.light["00"],
                  mainColorStrong: appConfig.theme.colors.light["00"],
                }}
                onClick={() => {
                  removerMensagem(mensagem.id);
                }}
                styleSheet={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "auto",
                  fontSize: "18px",
                  transition: "box-shadow 2s, color 2s, opacity 2s",
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
              }}
            >
              {mensagem.texto}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
