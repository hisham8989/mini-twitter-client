import { Paper, Typography, Box, Button } from "@mui/material";
import { destroyToken } from "../manager/user.manager";

const UserInfo = ({ user, updateLoggedIn }) => {
  const handleLogout = () => {
    destroyToken();
    updateLoggedIn(false);
  };

  return (
    <Paper
      sx={{
        height: "70%",
        p: 2,
        bgcolor: "#f0f0f0",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        {user.username}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Followers
        </Typography>
        <Typography variant="body1">{user.followers.length}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Following
        </Typography>
        <Typography variant="body1">{user.following.length}</Typography>
      </Box>

      <Button
        sx={{ marginTop: 2 }}
        fullWidth
        variant="outlined"
        color="error"
        onClick={() => handleLogout()}
      >
        logout
      </Button>
    </Paper>
  );
};

export default UserInfo;
