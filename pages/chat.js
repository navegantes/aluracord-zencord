import { Box, TextField, Image, Button } from "@skynexui/components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
// Exportar em grupo
import { ButtonSendSticker, MessageList } from "../src/components";
// import { MessageList } from "../src/components/MessageList/zindex";
import Header from "../src/components/Header";
import toast from "react-hot-toast";

import appConfig from "../config.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

function escutaMsgTempoReal(addMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (respLive) => {
      addMensagem(respLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
  // Sua lógica vai aqui
  const roteamento = useRouter();
  const userLogado = roteamento.query.username;
  const [mensagem, setMensagem] = useState("");
  const [isMsgEnable, setIsMsgEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listaMsg, setListaMsg] = useState([]);

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        // console.log("Dados da consulta", data);
        setListaMsg(data); // voltar essa linha
        setIsLoading(false);
        toast("Bem-vindes a Zion.");
      });

    escutaMsgTempoReal((novaMensagem) => {
      if (novaMensagem.texto != "") {
        setListaMsg((valorAtualLista) => {
          return [novaMensagem, ...valorAtualLista];
        });
        // toast("Nova mensagem.", { icon: "🛸" });
      }
    });
  }, []);

  function handleNovaMsg(novaMsg) {
    const mensagem = {
      // id: listaMsg.length + 1,
      de: userLogado,
      texto: novaMsg,
    };

    if (mensagem.texto.length) {
      supabaseClient
        .from("mensagens")
        .insert([mensagem])
        .then(({ data }) => {
          setMensagem("");
          setIsMsgEnable(false);
        });
    }
    // setMensagem("");
    // setIsMsgEnable(false);
  }

  async function removerMensagem(mensagem) {
    // console.log(mensagem);
    if (confirm("Deseja realmente excluir a mensagem?")) {
      try {
        // implementar logica de ADMs para excluir qualquer mensagem
        userLogado === mensagem.de || userLogado === "navegantes"
          ? (await supabaseClient.from("mensagens").delete().match({ id: mensagem.id }),
            // console.log("Menssagem excluida");
            setListaMsg((listaAtual) => {
              return listaAtual.filter((msg) => msg.id != mensagem.id);
            }),
            toast.success("Mensagem excluida!"))
          : toast.error("Você não têm permissão para excluir essa mensagem!");
      } catch (error) {
        console.log(error);
      }
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
              height: "160px",
              width: "160px",
              borderRadius: "1000px",
              animation: "shockwaves 2.5s ease-out .5s infinite",
            }}
          />
          <Box
            as="span"
            className="waves"
            styleSheet={{
              position: "absolute",
              height: "160px",
              width: "160px",
              borderRadius: "1000px",
              animation: "shockwaves 2.5s ease-out infinite",
            }}
          />
          INICIANDO...
        </>
      ) : (
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: appConfig.theme.colors.light["00"],
            width: "55%",
            height: "100%",
            maxHeight: "95vh",
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
            <MessageList
              mensagens={listaMsg}
              removerMensagem={removerMensagem}
              loggedUser={userLogado}
            />

            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                // marginTop: "auto",
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
                  if (ev.target.value.length) {
                    setIsMsgEnable(true);
                  } else {
                    setIsMsgEnable(false);
                  }

                  setMensagem(ev.target.value);
                }}
                onKeyPress={(ev) => {
                  // console.log(ev);
                  // if (ev.shiftKey) {
                  //   console.log("Shift pressed");
                  // }
                  if (ev.key === "Enter") {
                    if (ev.shiftKey) {
                      setMensagem(mensagem);
                    } else {
                      ev.preventDefault();
                      handleNovaMsg(mensagem);
                    }
                  }
                }}
                placeholder="Sua mensagem..."
                type="textarea"
                styleSheet={{
                  display: "flex",
                  width: "80%",
                  border: "0",
                  // resize: "none",
                  borderRadius: "10px",
                  padding: "6px 8px",
                  margin: "8px 16px 12px",
                  backgroundColor: appConfig.theme.colors.light["00"],
                  boxShadow: appConfig.theme.colors.light["bs2"],
                  padding: "16px 20px 16px",
                  whiteSpace: "pre-wrap",
                  color: appConfig.theme.colors.neutrals[300],
                }}
              />

              {/* Callback */}
              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  handleNovaMsg(`:sticker: ${sticker}`);
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
