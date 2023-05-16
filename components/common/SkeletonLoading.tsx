import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
} from "@mui/material";

export default function SkeletonLoading() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={120}
          sx={{ mr: 2 }}
        />
        <Box
          width={"70%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={60} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={50} />
            <Box sx={{ display: "flex" }}>
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={120}
          sx={{ mr: 2 }}
        />
        <Box
          width={"70%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={60} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={50} />
            <Box sx={{ display: "flex" }}>
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={120}
          sx={{ mr: 2 }}
        />
        <Box
          width={"70%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={60} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={50} />
            <Box sx={{ display: "flex" }}>
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={120}
          sx={{ mr: 2 }}
        />
        <Box
          width={"70%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={60} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={50} />
            <Box sx={{ display: "flex" }}>
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={120}
          sx={{ mr: 2 }}
        />
        <Box
          width={"70%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={60} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={50} />
            <Box sx={{ display: "flex" }}>
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={120}
          sx={{ mr: 2 }}
        />
        <Box
          width={"70%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={60} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={50} />
            <Box sx={{ display: "flex" }}>
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 3 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
    </>
  );
}
