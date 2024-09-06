import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, InputBase, Box, IconButton, Modal, TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const initialItems = [
  { name: "Item Title 1", description: "A short description of the item", image: "", category: "Category 1" },
  { name: "Item Title 2", description: "A short description of the item", image: "", category: "Category 2" },
  { name: "Item Title 3", description: "A short description of the item", image: "", category: "Category 1" },
  { name: "Item Title 4", description: "A short description of the item", image: "", category: "Category 3" },
];

const ResponsiveTable = () => {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", description: "", image: "", category: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: "", description: "", image: "", category: "" });
    handleClose();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <h1>Items</h1>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleSearch}
            sx={{ color: "white", borderBottom: "1px solid #666" }}
          />
          <IconButton sx={{ color: "white" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleOpen}>
            + Add
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>Image</TableCell>
              <TableCell sx={{ color: "white" }}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "white" }}>{item.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{item.description}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#555",
                      borderRadius: "4px",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "white" }}>{item.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for adding new item */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <h2>Add New Item</h2>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleAddItem} sx={{ mt: 2 }}>
            Add
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ResponsiveTable;
