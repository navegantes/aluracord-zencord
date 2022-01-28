import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";

function Titulo(props) {
  const Tag = props.tag || "h1";

  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["300"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

// function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//       <Titulo tag="h2">Boas vindas de volta!</Titulo>
//       <h2>Discord - Alura Matrix. </h2>
//     </div>
//   );
// }

// export default HomePage;

export default function PaginaInicial() {
  const [username, setUsername] = useState("");
  const roteamento = useRouter();
  const [isFormEnable, setIsFormEnable] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    setIsFormEnable(username.length > 2);
  }, [username]);

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.light["00"],
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            height: "35vh",
            maxWidth: "700px",
            borderRadius: "10px",
            padding: "32px",
            margin: "16px",
            boxShadow: appConfig.theme.colors.light["bs0"],
            backgroundColor: appConfig.theme.colors.light["00"],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              if (isFormEnable) {
                console.log("Pagina submetida");
                roteamento.push("/chat");
              }
            }}
            styleSheet={
              !isFormEnable
                ? {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: "100%" },
                    transition: "width 2s",
                  }
                : {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: "100%", sm: "50%" },
                    textAlign: "center",
                    marginBottom: "32px",
                    transition: "width 2s",
                  }
            }
          >
            <Titulo tag="h2">Bem-vindos a Zion</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              // value={username}
              onChange={function (event) {
                setUsername(event.target.value);
              }}
              // fullWidth
              styleSheet={{
                border: "none",
                textAlign: "center",
                color: appConfig.theme.colors.neutrals[300],
                backgroundColor: "#ecfbfe",
                boxShadow: "inset 6px 6px 10px #dbe9ec, inset -6px -6px 10px #fdffff",
                borderRadius: "1000px",
                padding: " 10px 20px",
                marginBottom: "12px",
                width: "80%",
                // maxWidth: "60%",
              }}
            />
            <Button
              type="submit"
              label={!isFormEnable ? "" : "Entrar"}
              disabled={!isFormEnable}
              // fullWidth
              buttonColors={
                !isFormEnable
                  ? {
                      mainColor: appConfig.theme.colors.light["00"],
                    }
                  : {
                      contrastColor: appConfig.theme.colors.neutrals["200"],
                      mainColor: appConfig.theme.colors.light["00"],
                      // mainColorLight: appConfig.theme.colors.neutrals[200],
                      mainColorStrong: appConfig.theme.colors.light["00"],
                    }
              }
              styleSheet={
                !isFormEnable
                  ? {
                      borderRadius: "1000px",
                      boxShadow: "none",
                      padding: "15px 0px 15px",
                      transition: "box-shadow 2s",
                      // border: "1px solide black",
                    }
                  : {
                      width: "80%",
                      borderRadius: "1000px",
                      boxShadow: appConfig.theme.colors.light["bs0"],
                      transition: "box-shadow 2s",
                      hover: {
                        boxShadow: appConfig.theme.colors.light["bs00"],
                      },
                      focus: {
                        boxShadow: appConfig.theme.colors.light["bs00"],
                      },
                    }
              }
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={
              !isFormEnable
                ? { boxShadow: "none", transition: "box-shadow 2s" }
                : {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: "200px",
                    padding: "16px",
                    backgroundColor: appConfig.theme.colors.light["00"],
                    boxShadow: appConfig.theme.colors.light["bs1"],
                    borderRadius: "10px",
                    flex: 1,
                    minHeight: "240px",
                    transition: "box-shadow 1s, max-width 2s",
                  }
            }
          >
            <Image
              styleSheet={
                !isFormEnable
                  ? {
                      boxShadow: "none",
                      opacity: "0",
                      transition: "box-shadow 2s, opacity 2s",
                    }
                  : {
                      borderRadius: "50%",
                      marginBottom: "20px",
                      maxWidth: "90%",
                      boxShadow: appConfig.theme.colors.light["bs00"],
                      opacity: "1",
                      transition: "box-shadow 2s, opacity 3s",
                    }
              }
              src={!isFormEnable ? "" : `https://github.com/${username}.png`}
            />
            {!isFormEnable ? (
              ""
            ) : (
              <Text
                variant="body4"
                styleSheet={{
                  fontSize: "0.9rem",
                  color: appConfig.theme.colors.neutrals[300],
                  backgroundColor: appConfig.theme.colors.light["00"],
                  boxShadow: appConfig.theme.colors.light["bs00"],
                  padding: "3px 10px",
                  borderRadius: "1000px",
                  transition: "box-shadow 2.5s",
                }}
              >
                {username}
              </Text>
            )}
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
