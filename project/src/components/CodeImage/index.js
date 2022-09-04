import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeImage = ({ question }) => {
  const [codeImage, setCodeImage] = useState();

  const handleGetCodeImage = async (question) => {
    if (question) {
      const element = document.getElementById("code-image");
      element.style.display = "flex";
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/jpg");
      if (element.style.display !== "none") {
        setCodeImage(data);
      }
      element.style.display = "none";
    }
  };

  useEffect(() => {
    handleGetCodeImage(question);
  }, [question]);

  if (!question) {
    return <Typography>Loading</Typography>;
  }

  return (
    <>
      <Box component="img" src={codeImage} maxWidth={800} />
      <Box id="code-image" justifyContent="center">
        <SyntaxHighlighter language={question.syntaxHighlighting} style={nord}>
          {question.code}
        </SyntaxHighlighter>
      </Box>
    </>
  );
};

export default CodeImage;
