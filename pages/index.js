import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        background-color: ${appConfig.theme.colors.light["00"]};
        font-family: "Open Sans", sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}

function Titulo(props) {
  console.log(props);
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
  const username = "navegantes";

  return (
    <>
      <GlobalStyle />
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.light["00"],
          // backgroundImage:
          //   "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
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
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            // boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            boxShadow: appConfig.theme.colors.light["bs0"],
            backgroundColor: appConfig.theme.colors.light["00"],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
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
              fullWidth
              styleSheet={{
                border: "none",
                backgroundColor: "#ecfbfe",
                boxShadow: "inset 6px 6px 10px #dbe9ec, inset -6px -6px 10px #fdffff",
                borderRadius: "1000px",
                padding: " 10px 20px",
                marginBottom: "12px",
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["200"],
                mainColor: appConfig.theme.colors.light["00"],
                // mainColorLight: appConfig.theme.colors.neutrals[200],
                mainColorStrong: appConfig.theme.colors.neutrals[300],
              }}
              styleSheet={{
                borderRadius: "1000px",
                boxShadow: appConfig.theme.colors.light["bs0"],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.light["00"],
              boxShadow: appConfig.theme.colors.light["bs1"],
              // border: "1px solid",
              // borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
                // boxShadow: appConfig.theme.colors.light["bs0"],
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[100],
                backgroundColor: appConfig.theme.colors.neutrals[300],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
