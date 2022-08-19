import { Add, ArrowForward } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";

const HomeTable = ({ rows, link, title, buttonLink }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length + 1) : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        marginX: 2,
        flexDirection: "column",
        marginTop: 2,
      }}
    >
      <Typography
        color={theme.palette.primary.main}
        variant="h5"
        sx={{ alignSelf: "center" }}
      >
        {title}
      </Typography>
      {buttonLink && (
        <Button
          onClick={() => navigate(buttonLink)}
          variant="contained"
          sx={{
            marginTop: 2,
            alignSelf: "center",
            borderRadius: 10,
            paddingX: 2,
            paddingY: 1,
          }}
          startIcon={<Add sx={{ margin: 0 }} />}
          size="medium"
        >
          <Box sx={{ lineHeight: "normal" }}>New</Box>
        </Button>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{row.data.title}</Typography>
                    <IconButton onClick={() => navigate(`${link}/${row.id}`)}>
                      <ArrowForward />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 55 * emptyRows,
              }}
            >
              <TableCell colSpan={12} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default HomeTable;
