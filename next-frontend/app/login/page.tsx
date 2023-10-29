"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, FormControl, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type loginSchema = z.infer<typeof loginSchema>;

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmitHandler(values: loginSchema) {
    console.log(values);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="login-email"
            label="Email"
            variant="outlined"
            {...register("email")}
          />
        </Box>
        <Typography variant="body2" color="red">
          {errors.email && <p>{errors.email.message}</p>}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="login-password"
            label="Password"
            variant="outlined"
            {...register("password")}
          />
        </Box>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default page;
