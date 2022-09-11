import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeImage = ({ question }) => {
  const [codeImage, setCodeImage] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGetCodeImage = async (question) => {
    if (question) {
      question.code.map(async (code, index) => {
        const element = document.getElementById(`code-image-${index}`);
        element.style.display = "flex";
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/jpg");
        if (element.style.display !== "none") {
          setCodeImage((codeImage) => [...codeImage, data]);
        }
        element.style.display = "none";
      });
    }
  };

  useEffect(() => {
    setCodeImage([]);
    handleGetCodeImage(question);
  }, [question]);

  if (!question) {
    return <Typography>Loading</Typography>;
  }

  function TabPanel(props) {
    const { children, value, index } = props;

    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {question.code.map((question, index) => (
            <Tab label={`Code snippet ${index + 1}`} key={index} />
          ))}
        </Tabs>
      </Box>
      {codeImage &&
        question.code.map((code, index) => (
          <div key={index}>
            <TabPanel value={value} index={index}>
              <Box component="img" src={codeImage[index]} maxWidth={800} />
            </TabPanel>
            <Box id={`code-image-${index}`} justifyContent="center">
              <SyntaxHighlighter
                language={question.syntaxHighlighting}
                style={nord}
              >
                {code}
              </SyntaxHighlighter>
            </Box>
          </div>
        ))}
    </>
  );
};

export default CodeImage;
