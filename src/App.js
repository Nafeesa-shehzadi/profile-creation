import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

// Define validation schema with Yup
const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  zip: yup
    .string()
    .matches(/^[0-9]+$/, "Zip must be digits only")
    .required("Zip is required"),
  state: yup.string().required("State is required"),
  gender: yup.string().required("Gender is required"),
  birthday: yup
    .date()
    .required("Birthday is required")
    .max(new Date(), "Birthday cannot be in the future"), // Ensures the date is not in the future

  file: yup.mixed().required("Image File is required"),
});

function App() {
  const {
    control,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [filePreview, setFilePreview] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false); // Define isFocused state
  const [profile, setProfile] = React.useState(
    "Ayesha Developer\nSenior Software Engineer\nNew York"
  ); // Define profile state

  const onSubmit = (data) => {
    console.log(data);
    setOpenConfirmDialog(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.");
        return;
      }

      // Create an image element to check dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        // Check if the image is square (1:1 ratio)
        if (img.width !== img.height) {
          alert("Image must be square (1:1 ratio).");
          URL.revokeObjectURL(objectUrl);
          return;
        }

        // If all checks pass
        setFilePreview(objectUrl);
        setFileName(file.name);
        setValue("file", file); // Set the file value in react-hook-form
      };

      img.src = objectUrl;

      // Clean up object URL after the image is loaded
      img.onloadend = () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  };

  const handleFileRemove = (event) => {
    event.stopPropagation(); // Prevent triggering file input
    setFilePreview("");
    setFileName("");
    setValue("file", null); // Reset the file value in react-hook-form
    URL.revokeObjectURL(filePreview);
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
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2, // Adds space below this row
          }}
        >
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Birthday"
                variant="outlined"
                margin="normal"
                type="date"
                max
                slotProps={{
                  inputLabel: { shrink: true }, // Updated to use slotProps
                }}
                fullWidth
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select {...field} label="Gender" error={!!errors.gender}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                <FormHelperText>{errors.gender?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2, // Adds space below this row
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
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
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
          <Controller
            name="No"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="No"
                variant="outlined"
                margin="normal"
                type="number"
                fullWidth
                error={!!errors.zip}
                helperText={errors.zip?.message}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2, // Adds space below this row
          }}
        >
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>State</InputLabel>
                <Select {...field} label="State" error={!!errors.state}>
                  <MenuItem value="pu">Punjab</MenuItem>
                  <MenuItem value="sn">Sindh</MenuItem>
                  <MenuItem value="bch">Balochistan</MenuItem>
                  <MenuItem value="kpk">Khyber Pakhtunkhwa</MenuItem>
                </Select>
                <FormHelperText>{errors.state?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="zip"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Zip"
                variant="outlined"
                margin="normal"
                type="number"
                fullWidth
                error={!!errors.zip}
                helperText={errors.zip?.message}
              />
            )}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "black",
            textTransform: "none",
          }}
          onClick={handleSubmit(onSubmit)} // onSubmit is passed here
        >
          Save All
        </Button>
      </Box>
      <Box
        sx={{
          width: "40%", // Second Box covers 30% of the page width
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem", // Space between the buttons
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
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
              textTransform: "none",
            }}
          >
            send message
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%", // New Box covers 30% of the page width
            height: "25vh", // 40% of the viewport height
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            marginTop: "5rem", // Adds space above the Box
            marginLeft: "0rem", // Aligns with the existing second box
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ padding: "0.5rem" }}
            gutterBottom
          >
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
                  <IconButton onClick={handleFileRemove} sx={{ padding: 5 }}>
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
        {errors.file && (
          <Typography
            variant="body2"
            color="error"
            sx={{ marginTop: "0.5rem" }}
          >
            {errors.file.message}
          </Typography>
        )}
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
