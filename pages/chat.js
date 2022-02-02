import { Box, Text, TextField, Image, Button, Icon } from "@skynexui/components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { ButtonSendSticker } from "../src/components/ButtonSendStiker";

import appConfig from "../config.json";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQzNzA1MSwiZXhwIjoxOTU5MDEzMDUxfQ.EqLlvrV_ICTIN_lLiOwekQwxBkNk3yrvGmIP5NhwVFs";
const SUPABASE_URL = "https://fbnphjfxswmlcwcgbgdg.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  // Sua lógica vai aqui
  const roteamento = useRouter();
  const userLogado = roteamento.query.username;
  const [mensagem, setMensagem] = useState("");
  const [listaMsg, setListaMsg] = useState([]);
  const [isMsgEnable, setIsMsgEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dadosSupabase = supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        // console.log("Dados da consulta", dados);
        setListaMsg(data);
        // setTimeout Demonstração loading
        setTimeout(() => {
          setIsLoading(false);
        }, 3300);
        // setIsLoading(true);
      });
  }, []);

  function handleNovaMsg(novaMsg) {
    const mensagem = {
      // id: listaMsg.length + 1,
      de: userLogado,
      texto: novaMsg,
    };

    supabaseClient
      .from("mensagens")
      .insert([mensagem])
      .then(({ data }) => {
        // console.log('Criando mensagem', resp);
        if (mensagem.texto.trim() != "") {
          setListaMsg([data[0], ...listaMsg]);
        }
        setMensagem("");
        setIsMsgEnable(false);
      });
  }

  async function removerMensagem(mensagemId) {
    try {
      await supabaseClient.from("mensagens").delete().match({ id: mensagemId });
      console.log("Menssagem excluida");
      setListaMsg(listaMsg.filter((msg) => msg.id != mensagemId));
    } catch (error) {
      console.log(error);
    }
  }
  // ./Sua lógica vai aqui

  return (
    <Box
      styleSheet={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.light["00"],
        color: appConfig.theme.colors.neutrals["300"],
        overflowX: "hidden",
      }}
    >
      {isLoading ? (
        <>
          <Box
            as="span"
            className="waves"
            styleSheet={{
              position: "absolute",
              height: "130px",
              width: "130px",
              borderRadius: "1000px",
              animation: "shockwaves 2s ease-out infinite",
            }}
          />
          <Box
            as="span"
            className="waves"
            styleSheet={{
              position: "absolute",
              height: "130px",
              width: "130px",
              borderRadius: "1000px",
              animation: "shockwaves 2s ease-out 1s infinite",
            }}
          />
          INICIANDO...
        </>
      ) : (
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            // flex: 1,
            boxShadow: appConfig.theme.colors.light["bs1"],
            borderRadius: "10px",
            backgroundColor: appConfig.theme.colors.light["00"],
            width: "auto",
            height: "100%",
            maxWidth: "70%",
            maxHeight: "90vh",
            padding: "20px 48px",
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
              padding: "20px 26px 2px 20px",
              marginBottom: "8px",
            }}
          >
            <MessageList mensagens={listaMsg} removerMensagem={removerMensagem} />
            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                marginTop: "auto",
                padding: "10px 0px",
              }}
            >
              <Box
                styleSheet={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "62px",
                }}
              >
                <Image
                  styleSheet={{
                    borderRadius: "50%",
                    maxWidth: "90%",
                    boxShadow: appConfig.theme.colors.light["bs00"],
                    opacity: "1",
                    transition: "box-shadow 2s, opacity 2s",
                  }}
                  src={`https://github.com/${userLogado}.png`}
                />
              </Box>
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
                placeholder="Sua mensagem..."
                type="textarea"
                styleSheet={{
                  display: "flex",
                  // mainAxisAlignment: "center",
                  width: "80%",
                  border: "0",
                  resize: "none",
                  borderRadius: "10px",
                  padding: "6px 8px",
                  margin: "8px 16px 12px",
                  backgroundColor: appConfig.theme.colors.light["00"],
                  boxShadow: appConfig.theme.colors.light["bs2"],
                  padding: "16px 20px 16px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
              />

              <ButtonSendSticker />
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
                        borderRadius: "1000px",
                        margin: "auto",
                        width: "100px",
                        height: "50px",
                        margin: "0px 18px 0px",
                        color: appConfig.theme.colors.neutrals["200"],
                        transition: "box-shadow .5s, color 2s",
                        boxShadow: appConfig.theme.colors.light["bs0"],
                        hover: {
                          boxShadow: appConfig.theme.colors.light["bs00"],
                        },
                        focus: {
                          boxShadow: appConfig.theme.colors.light["bs00"],
                        },
                      }
                    : {
                        display: "flex",
                        borderRadius: "1000px",
                        margin: "0px 18px 0px",
                        width: "100px",
                        height: "50px",
                        color: appConfig.theme.colors.light["00"],
                        transition: "box-shadow 2s, color .5s",
                        boxShadow: "none",
                      }
                }
              />
            </Box>
          </Box>
        </Box>
      )}
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
                  removerMensagem(mensagem.id);
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
                maxHeight: "50px",
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
