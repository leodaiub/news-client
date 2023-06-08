"use client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Input,
  Card,
  CardBody,
  Stack,
  CardFooter,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Text,
  Flex,
  CardHeader,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function Home() {
  const { register, loading } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const submitForm: SubmitHandler<FormValues> = (data) => {
    const { name, email, password } = data;

    register({
      name,
      email,
      password,
      password_confirmation: password,
      setErrors: (errors: any) =>
        Object.entries(errors || {}).map((error: any) =>
          setError(error[0], { message: error[1] })
        ),
    });
  };

  return (
    <Flex
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      overflow={"auto"}
    >
      <form onSubmit={handleSubmit(submitForm)}>
        <Card width={"full"} p={6}>
          <CardHeader>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Register
            </Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <FormControl mt="2" isInvalid={!!errors.name}>
                <FormLabel htmlFor="name" fontWeight={"normal"}>
                  Name
                </FormLabel>
                <Input
                  {...registerField("name", {
                    required: true,
                  })}
                  id="name"
                  type="text"
                />
              </FormControl>

              <FormControl mt="2" isInvalid={!!errors.email}>
                <FormLabel htmlFor="email" fontWeight={"normal"}>
                  Email address
                </FormLabel>
                <Input
                  {...registerField("email", {
                    required: true,
                  })}
                  id="email"
                  type="email"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
                  Password
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    {...registerField("password", {
                      required: true,
                    })}
                    id="password"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
          </CardBody>
          <CardFooter as={Stack}>
            <Button w={"100%"} type="submit" isLoading={loading}>
              Register
            </Button>
            <Text>
              Already have an account? Then{" "}
              <Link href="/login">
                <Button
                  textDecor={"underline"}
                  cursor={"pointer"}
                  as={"span"}
                  variant="link"
                >
                  login here
                </Button>
              </Link>
            </Text>
          </CardFooter>
        </Card>
      </form>
    </Flex>
  );
}
