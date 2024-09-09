import "./App.css";
import * as React from "react";
//import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Ensure this is correctly imported
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Avatar from "@mui/material/Avatar"; // Import Avatar component
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Alert,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function App() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [state, setState] = React.useState("");
  const [filePreview, setFilePreview] = React.useState("");
  const [profile, setProfile] = React.useState(
    "Ali Developer\nSenior Software Engineer\nNew York"
  );
  const [isFocused, setIsFocused] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    gender: "",
  });
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

  const handleFileRemove = (event) => {
    // Reset file preview and name
    event.stopPropagation(); // Prevent triggering file input

    setFilePreview("");
    setFileName("");
    URL.revokeObjectURL(filePreview);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the file and set it in state
      const fileUrl = URL.createObjectURL(file);
      setFilePreview(fileUrl);
      setFileName(file.name); // Update fileName state with the selected file's name
    }
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validation logic
    if (!firstName) {
      newErrors.firstName = "First name is required.";
      valid = false;
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
      valid = false;
    }
    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
      valid = false;
    }
    if (!address) {
      newErrors.address = "Address is required.";
      valid = false;
    }
    if (!city) {
      newErrors.city = "City is required.";
      valid = false;
    }
    if (!zip) {
      newErrors.zip = "Zip is required.";
      valid = false;
    }
    if (!state) {
      newErrors.state = "State is required.";
      valid = false;
    }
    if (!gender) {
      newErrors.gender = "Gender is required.";
      valid = false;
    }
    if (!fileName) {
      newErrors.fileName = "File is required.";
      valid = false;
    }
    if (!birthday) {
      newErrors.birthday = "Birthday is required.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Submit form
      setFormError("");
      setOpenConfirmDialog(true);
    } else {
      setFormError("Please correct the errors in the form.");
    }
  };
  const handleConfirmSubmit = () => {
    // Submit the form data here...
    console.log("Form submitted!");
    alert("Form submitted successfully!");
    setOpenConfirmDialog(false);
  };

  const handleCancelSubmit = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Container
      maxWidth={false} // Ensure Container covers the full width of the viewport
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 0, // Remove default padding
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
        }}
      >
        {formError && <Alert severity="error">{formError}</Alert>}

        <Typography variant="h4" component="h1" gutterBottom>
          General Information
        </Typography>

        {/* Row for First Name and Last Name */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2, // Adds space below this row
          }}
        >
          <TextField
            required
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2, // Adds space below this row
          }}
        >
          <TextField
            fullWidth
            required
            label="Birthday"
            variant="outlined"
            margin="normal"
            type="date"
            slotProps={{
              inputLabel: { shrink: true }, // Updated to use slotProps
            }}
            error={!!errors.birthday}
            helperText={errors.birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={handleGenderChange}
              label="Gender"
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="male">male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              {/* Add more states as needed */}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2, // Adds space below this row
          }}
        >
          <TextField
            required
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.email}
            helperText={!!errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Phone Number"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Address{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2, // Adds space below this row
          }}
        >
          <TextField
            label="Address"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.address}
            helperText={errors.address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="NO"
            variant="outlined"
            margin="normal"
            type="number"
            fullWidth
            error={!!errors.zip}
            helperText={errors.zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2, // Adds space below this row
          }}
        >
          <TextField
            label="City"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.city}
            helperText={errors.city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>State</InputLabel>
            <Select
              value={state}
              onChange={handleStateChange}
              label="State"
              error={!!errors.state}
            >
              <MenuItem value="pu">Punjab</MenuItem>
              <MenuItem value="sn">Sindh</MenuItem>
              <MenuItem value="bch">Balochistan</MenuItem>
              <MenuItem value="kpk">Khyber Pakhtunkhwa</MenuItem>
              {/* Add more states as needed */}
            </Select>
            <FormHelperText>{errors.state}</FormHelperText>
          </FormControl>
          <TextField
            label="Zip"
            variant="outlined"
            margin="normal"
            type="number"
            fullWidth
            error={!!errors.zip}
            helperText={errors.zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "black",
            textTransform: "none",
          }}
          onClick={handleSubmit}
        >
          Save All
        </Button>
      </Box>
      <Box
        sx={{
          width: "30%", // Second Box covers 30% of the page width
          height: "60vh", // 70% of the viewport height
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          marginTop: "1rem", // Adds space above the Box
          marginLeft: "2rem", // Adds space to the left
        }}
      >
        <img
          src="./bk.jpg" // Replace with your image URL
          alt="Placeholder"
          style={{
            marginTop: "0rem",
            height: "40%", // 40% of the Box height
            width: "100%", // Maintain aspect ratio
            objectFit: "cover", // Ensure image covers the area
          }}
        />
        <Box
          sx={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "25%",
            left: "80%",
            transform: "translate(-50%, -50%)",
            border: "3px solid #ccc",
            backgroundColor: "#f0f0f0",
            zIndex: 10, // Ensure avatar is above other content
          }}
        >
          {filePreview ? (
            <Avatar
              src={filePreview}
              alt="Preview"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Avatar sx={{ width: "100%", height: "100%", bgcolor: "#c0c0c0" }}>
              <PermIdentityIcon style={{ fontSize: "50px" }} />
            </Avatar>
          )}
        </Box>
        <Box
          sx={{
            padding: "1rem",
            marginTop: "2rem", // Adjust to make space for the avatar
            display: "flex",
            flexDirection: "column",
            gap: 1,
            textAlign: "center",
          }}
        >
          {!isFocused ? (
            <Typography
              onClick={() => {
                setIsFocused(true);
              }}
              style={{ cursor: "pointer", whiteSpace: "pre-line" }}
            >
              <span style={{ fontWeight: "bold" }}>
                {profile.split("\n")[0]} {/* Bold first line */}
              </span>
              <br />
              {profile.split("\n").slice(1).join("\n")} {/* Remaining lines */}
            </Typography>
          ) : (
            <TextField
              autoFocus
              multiline
              rows={3}
              value={profile}
              onChange={(event) => setProfile(event.target.value)}
              onBlur={() => setIsFocused(false)}
            />
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "1rem",
            marginLeft: "6rem",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            textTransform: "none",
          }}
          startIcon={<PersonAddIcon />}
        >
          Connect
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "1rem",
            marginLeft: "1rem",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
          }}
        >
          send message
        </Button>

        <Box
          sx={{
            width: "100%", // New Box covers 30% of the page width
            height: "25vh", // 40% of the viewport height
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            marginTop: "6rem", // Adds space above the Box
            marginLeft: "0rem", // Aligns with the existing second box
          }}
        >
          <Typography variant="h6" component="h2" sx={{ padding: "0.5rem" }}>
            Select profile photo{" "}
          </Typography>
          <Button
            variant="standard"
            component="label"
            sx={{
              marginTop: "1rem",
              marginLeft: "1rem",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              display: "flex", // Add this line
              width: "100%", // Add this line
            }}
          >
            {filePreview ? (
              <>
                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <img
                    src={filePreview}
                    alt="Preview"
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                      marginRight: "0.5rem",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ flex: 1, textAlign: "left" }}
                  >
                    {fileName}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={handleFileRemove} sx={{ padding: 0 }}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AttachFileIcon />
                  <Typography variant="body2" sx={{ marginLeft: "0.5rem" }}>
                    Choose Image <br /> jpg, GIF, or PNG max size 300k
                  </Typography>
                </div>
              </>
            )}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
      </Box>
      <Dialog open={openConfirmDialog} onClose={handleCancelSubmit}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>Are you sure you want to submit?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit}>No</Button>
          <Button onClick={handleConfirmSubmit}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
