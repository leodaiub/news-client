"use client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import logo from "@app/../public/logo.png";
import { Link } from "@chakra-ui/next-js";
import UserMenu from "../UserMenu";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      mb="6"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link href="/" cursor={"pointer"}>
          <IconButton aria-label={""}>
            <Image src={logo} alt={""} width="40" />
          </IconButton>
        </Link>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={7}>
            <UserMenu></UserMenu>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
