"use client";
import { useArticles, useAuth } from "@/hooks";
import {
  Button,
  Card,
  CardBody,
  Stack,
  CardFooter,
  FormControl,
  FormLabel,
  Text,
  Flex,
  CardHeader,

} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  categories: string[];
  sources: string[];
};

export default function Preferences() {
  const {
    updateUserPreferences,
    user: { preferences = {} } = {},
    loading,
  } = useAuth({
    middleware: "auth",
  });

  const { sourcesList = [], categoriesList } = useArticles();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      categories: preferences?.categories?.split(","),
      sources: preferences?.sources?.split(","),
    },
  });

  const submitForm: SubmitHandler<FormValues> = (data) => {
    const { categories, sources } = data;

    updateUserPreferences({
      categories: categories.join(","),
      sources: sources.join(","),
      setErrors: (errors: any) =>
        Object.entries(errors || {}).map((error: any) =>
          setError(error[0], { message: error[1] })
        ),
    });
  };

  return (
    <Flex height={"100%"} justifyContent={"center"} alignItems={"center"}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Card w={{ base: "full", md: "xl" }} p={6}>
          <CardHeader>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Preferences
            </Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <FormControl mt="2" isInvalid={!!errors.sources}>
                <FormLabel htmlFor="sources" fontWeight={"normal"}>
                  Sources
                </FormLabel>
                <Controller
                  control={control}
                  name="sources"
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      {...registerField("sources", {})}
                      options={sourcesList?.map((source) => ({
                        label: source.name,
                        value: source.id,
                      }))}
                      value={value}
                      placeholder="Choose favorite sources"
                      onChange={onChange}
                      multiple
                    />
                  )}
                />
              </FormControl>
              <FormControl mt="2" isInvalid={!!errors.categories}>
                <FormLabel htmlFor="categories" fontWeight={"normal"}>
                  Categories
                </FormLabel>
                <Controller
                  control={control}
                  name="categories"
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      {...registerField("categories", {})}
                      options={categoriesList.map((category) => ({
                        label:
                          category[0].toUpperCase() +
                          category.slice(1).toLowerCase(),
                        value: category,
                      }))}
                      value={value}
                      placeholder="Choose favorite categories"
                      onChange={onChange}
                      multiple
                    />
                  )}
                />
              </FormControl>
            </Stack>
          </CardBody>
          <CardFooter as={Stack}>
            <Button w={"100%"} type="submit" isLoading={loading}>
              Update preferences
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Flex>
  );
}
