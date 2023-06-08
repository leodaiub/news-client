"use client";
import ArticleCard from "@/components/Article";
import Filters from "@/components/Filters";
import { useArticles, useAuth } from "@/hooks";
import { Box, Center, Spinner, Stack } from "@chakra-ui/react";

export default function Home() {
  const { articles = [], isLoading } = useArticles();

  const { userLoading } = useAuth({ middleware: "auth" });

  if (userLoading || isLoading)
    return (
      <Center>
        <Spinner m={"0 auto"} />
      </Center>
    );

  return (
    <>
      <Center>
        <Filters />
      </Center>
      <Stack
        id="stack"
        as={Box}
        textAlign={"center"}
        py={{ base: 10, md: 18 }}
        direction={"row"}
        wrap={"wrap"}
        overflow={"hidden"}
        objectFit={"cover"}
      >
        {articles?.map?.((item, k) => (
          <ArticleCard key={k} data={item} />
        ))}
      </Stack>
    </>
  );
}
