import { Article } from "@/types";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Image, Text, chakra } from "@chakra-ui/react";
import moment from "moment";

export default function ArticleCard({ data }: { data: Article }) {
  return (
    <Box
      p={5}
      w={{ base: "100%", md: "48%" }}
      alignItems="center"
      justifyContent="center"
      mx="auto"
      rounded="lg"
      shadow="md"
      bg="gray.100"
      _dark={{
        bg: "gray.900",
      }}
      mb={4}
    >
      <Link href={data.url || ""} target="blank">
        <Image
          roundedTop="lg"
          w="full"
          h={64}
          fit="cover"
          src={data.image || data.urlToImage}
          alt="Article"
        />
      </Link>
      <Box p={6}>
        <Box>
          <chakra.span
            fontSize="xs"
            textTransform="uppercase"
            color="brand.600"
            _dark={{
              color: "brand.400",
            }}
          >
            {data.category}
          </chakra.span>
          <Link
            display="block"
            color="gray.800"
            _dark={{
              color: "white",
            }}
            fontWeight="bold"
            fontSize="2xl"
            mt={2}
            _hover={{
              color: "gray.600",
              textDecor: "underline",
            }}
            href={data.url || ""}
            target="blank"
            dangerouslySetInnerHTML={{ __html: data.title }}
          ></Link>
          <chakra.p
            mt={2}
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            dangerouslySetInnerHTML={{ __html: data.title }}
          ></chakra.p>
        </Box>

        <Flex
          alignItems="center"
          mt={4}
          w={"full"}
          justifyContent={"space-around"}
        >
          <Text
            mx={2}
            fontWeight="bold"
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            {data.author}
          </Text>
          <Text
            mx={1}
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.300",
            }}
          >
            {moment(data.published_at).format("DD/MM/YYYY")}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
