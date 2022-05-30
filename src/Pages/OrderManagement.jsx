import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { TablePagination, TextField } from "@mui/material";

const Row = ({
  row,
  orders,
  setOrders,
  spesificOrdersArray,
  setSpesificOrdersArray,
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:8001/orders/" + id, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const newOrders = orders.filter((order) => order.id !== id);
        setOrders(newOrders);
      }
    });
  };

  const handleDeleteSpesificRow = (title, id) => {
    const index = orders.findIndex((obj) => obj.id === id);
    let newTotalPrice;
    let itemArray = [];
    spesificOrdersArray.forEach((t) => {
      if (t.itemTitle !== title) {
        itemArray.push({
          itemTitle: t.itemTitle,
          amount: t.amount,
          itemPrice: t.itemPrice,
        });
      } else {
        newTotalPrice = orders[index].totalPrice - t.itemPrice * t.amount;
      }
    });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:8001/orders/" + id, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            itemOrdered: itemArray,
            totalPrice: newTotalPrice,
          }),
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const newSpesificOrder = spesificOrdersArray.filter(
          (order) => order.itemTitle !== title
        );
        orders[index].itemOrdered = newSpesificOrder;
        orders[index].totalPrice = newTotalPrice;
        setOrders(orders);
        setSpesificOrdersArray(newSpesificOrder);
      }
    });
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              fetch("http://localhost:8001/orders/" + row.id)
                .then((res) => res.json())
                .then((data) => {
                  setSpesificOrdersArray(data.itemOrdered);
                });
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.userOrderedID}</TableCell>
        <TableCell>{row.personName}</TableCell>
        <TableCell>${row.totalPrice}</TableCell>
        <TableCell>{row.purchaseDate}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="large"
            size="small"
            onClick={() => handleDelete(row.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items ordered
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.itemOrdered.map((historyRow) => (
                    <TableRow key={historyRow.itemTitle}>
                      <TableCell>{historyRow.itemTitle}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {`${historyRow.amount} X ${historyRow.itemPrice} = `}
                        {Math.round(
                          historyRow.amount * historyRow.itemPrice * 100
                        ) / 100}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() =>
                            handleDeleteSpesificRow(
                              historyRow.itemTitle,
                              row.id
                            )
                          }
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [spesificOrdersArray, setSpesificOrdersArray] = useState([]);
  const [filterObj, setFilterObj] = useState({
    id: "",
    userOrderedID: "",
    personName: "",
    totalPrice: "",
    purchaseDate: "",
  });

  useEffect(() => {
    fetch("http://localhost:8001/orders")
      .then((res) => res.json())
      .then((data) => {
        setPage(0);
        if (
          !filterObj.id &&
          !filterObj.userOrderedID &&
          !filterObj.personName &&
          !filterObj.totalPrice &&
          !filterObj.purchaseDate
        ) {
          const insertRows = data.map((item) => {
            return {
              id: item.id,
              userOrderedID: item.userOrderedID,
              personName: item.personName,
              totalPrice: item.totalPrice,
              purchaseDate: item.purchaseDate,
              itemOrdered: item.itemOrdered,
            };
          });
          setOrders(insertRows);
        } else {
          const insertRows = data
            .filter((item) => {
              if (filterObj.id !== "" && item.id !== parseInt(filterObj.id)) {
                return false;
              }

              if (
                filterObj.userOrderedID !== "" &&
                item.userOrderedID !== parseInt(filterObj.userOrderedID)
              ) {
                return false;
              }

              if (
                filterObj.personName !== "" &&
                !item.personName
                  .toLowerCase()
                  .includes(filterObj.personName.toLowerCase())
              ) {
                return false;
              }

              if (
                filterObj.totalPrice !== "" &&
                !item.totalPrice
                  .toString()
                  .includes(parseInt(filterObj.totalPrice))
              ) {
                return false;
              }

              if (
                filterObj.purchaseDate !== "" &&
                !item.purchaseDate
                  .toLowerCase()
                  .includes(filterObj.purchaseDate.toLowerCase())
              ) {
                return false;
              }

              return true;
            })
            .map((item) => {
              return {
                id: item.id,
                userOrderedID: item.userOrderedID,
                personName: item.personName,
                totalPrice: item.totalPrice,
                purchaseDate: item.purchaseDate,
                itemOrdered: item.itemOrdered,
              };
            });
          setOrders(insertRows);
        }
      });
  }, [filterObj]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ minHeight: "90vh", width: "80%", margin: "5vh 0 5vh 10vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "2vh",
        }}
      ></div>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="subtitle2" display="block">
                  Order ID
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  // InputProps={{ inputProps: { min: 1 } }}
                  sx={{ width: "7vh" }}
                  onChange={(e) =>
                    setFilterObj({
                      ...filterObj,
                      id: e.target.value,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" display="block">
                  User ID
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  // InputProps={{ inputProps: { min: 1 } }}
                  sx={{ width: "7vh" }}
                  onChange={(e) =>
                    setFilterObj({
                      ...filterObj,
                      userOrderedID: e.target.value,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" display="block">
                  Buyer Name
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  sx={{ width: "15vh" }}
                  onChange={(e) =>
                    setFilterObj({ ...filterObj, personName: e.target.value })
                  }
                />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" display="block">
                  Total price
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  // InputProps={{ inputProps: { min: 1 } }}
                  sx={{ width: "8vh" }}
                  onChange={(e) =>
                    setFilterObj({ ...filterObj, totalPrice: e.target.value })
                  }
                />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" display="block">
                  Purchase Date
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  sx={{ width: "20vh" }}
                  onChange={(e) =>
                    setFilterObj({ ...filterObj, purchaseDate: e.target.value })
                  }
                />
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  orders={orders}
                  setOrders={setOrders}
                  spesificOrdersArray={spesificOrdersArray}
                  setSpesificOrdersArray={setSpesificOrdersArray}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrderManagement;
