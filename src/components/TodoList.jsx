import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
const useStyles = makeStyles({
  input: {
    width: "70%",
    marginBottom: 30,
  },
  addButton: {
    height: 55,
    marginBottom: 30,
  },
  container: {
    textAlign: "center",
    marginTop: 100,
  },

  list: {
    width: "80%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
  },
  text: {
    width: "70%",
  },
  listButtons: {
    marginLeft: 10,
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sortContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
function TodoList() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const classes = useStyles();
  const [selectedDate, setselectedDate] = React.useState(null);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Added date");
  const handleDateChange = (newDate) => {
    setselectedDate(newDate);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const onChange = (e) => {
    setInputVal(e.target.value);
    if (isEdited) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === editedId ? { ...todo } : todo))
      );
    }
  };

  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        {
          val: inputVal,
          isDone: false,
          id: new Date().getTime(),
          date: selectedDate,
        },
      ]);
    } else {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: editedId, date: selectedDate },
      ]);
    }
    setInputVal("");
    setIsEdited(false);
    setselectedDate(null); // Clear selected date after adding or editing task
  };
  const onDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleDone = (id) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(updated);
  };

  const handleEdit = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    const editVal = todos.find((todo) => todo.id === id);
    setEditedId(editVal.id);
    setInputVal(editVal.val);
    setselectedDate(editVal.date);
    setTodos(newTodos);
    setIsEdited(true);
  };
  // Filter logic
  const filteredTodos =
    filter === "All"
      ? todos
      : filter === "Completed"
      ? todos.filter((todo) => todo.isDone)
      : todos.filter((todo) => !todo.isDone);

  // Sort logic
  const sortedTodos =
    sort === "Added date"
      ? filteredTodos
      : sort === "Completed first"
      ? filteredTodos.sort((a, b) => (a.isDone ? -1 : 1))
      : filteredTodos.sort((a, b) => (b.isDone ? -1 : 1));

  return (
    <Container
      component="main"
      className={classes.container}
      maxWidth={false} // Ensure Container covers the full width of the viewport
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5, // Remove default padding
      }}
    >
      <Box
        sx={{
          width: "60%", // Box covers half of the page width
          padding: "2rem",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          marginTop: "1rem",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="white"
          fontWeight="bold"
          textAlign="center"
          sx={{
            backgroundColor: "blue", // Set background color
            display: "inline", // Ensure background color applies only to the text
            padding: "0.5rem", // Optional: Add some padding around the text
          }}
        >
          TODO LIST
        </Typography>

        <Box
          sx={{
            width: "100%", // New Box covers 30% of the page width
            height: "20vh", // 40% of the viewport height
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            marginTop: "3rem", // Adds space above the Box
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard"
            onChange={onChange}
            label="Type your task"
            value={inputVal}
            className={classes.input}
            sx={{
              flex: 0.5, // Takes up available space
              marginRight: "1rem", // Adds space to the right of the TextField
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                minDate={dayjs()} // Prevent selecting past dates
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button
            size="small"
            variant={isEdited ? "outlined" : "contained"}
            color="primary"
            onClick={handleClick}
            className={classes.addButton}
            disabled={!inputVal || !selectedDate} // Disable button if inputVal or selectedDate is null
            sx={{
              marginLeft: "3rem",
            }}
          >
            {isEdited ? "Edit Task" : "Add Task"}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Aligns items to the right
            alignItems: "center",
            width: "100%", // Ensures full width for alignment
            gap: 2, // Adds space between items
          }}
        >
          {/* Filter Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="standard">Filter:</Typography>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="filter-label"
                id="filter-select"
                value={filter}
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Sort Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="standard">Sort:</Typography>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <Select
                labelId="sort-label"
                id="sort-select"
                value={sort}
                onChange={handleSortChange}
              >
                <MenuItem value="Added date">Added date</MenuItem>
                <MenuItem value="Completed first">Completed first</MenuItem>
                <MenuItem value="Pending first">Pending first</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <List>
          {sortedTodos.map((todo) => {
            return (
              <>
                <ListItem divider="bool" className={classes.list}>
                  <Checkbox
                    onClick={() => handleDone(todo.id)}
                    checked={todo.isDone}
                  />
                  <Typography
                    className={classes.text}
                    style={{ color: todo.isDone ? "green" : "" }}
                    key={todo.id}
                  >
                    {todo.val}
                  </Typography>
                  {todo.date && (
                    <Typography variant="caption" color="textSecondary">
                      Date: {todo.date.format("DD/MM/YYYY")}
                    </Typography>
                  )}
                  <EditIcon
                    onClick={() => handleEdit(todo.id)}
                    variant="contained"
                    sx={{ marginLeft: 2 }}
                    color="primary"
                  />
                  <DeleteIcon
                    onClick={() => onDelete(todo.id)}
                    variant="contained"
                    sx={{ marginLeft: 2 }}
                    color="error"
                  />
                </ListItem>
              </>
            );
          })}
        </List>
      </Box>
    </Container>
  );
}

export default TodoList;
