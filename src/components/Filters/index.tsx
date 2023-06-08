"use client";
import { useArticles, useAuth } from "@/hooks";
import {
  Stack,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import React from "react";
import DateRangePicker from "../DateRangePicker";
import { useStore } from "@/store";
import { shallow } from "zustand/shallow";
import SearchInput from "../SearchInput";

export default function Filters() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user: { preferences = {} } = {} } = useAuth({ middleware: "auth" });

  const { sourcesList, categoriesList, handleSearch } = useArticles();
  const [categories, sources, updateCategories, updateSources] = useStore(
    (state) => [
      state.categories,
      state.sources,
      state.updateCategories,
      state.updateSources,
    ],
    shallow
  );

  return (
    <>
      <Button
        colorScheme="teal"
        onClick={onOpen}
        aria-label={""}
        mb={4}
        width={150}
      >
        Filters
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            <Stack
              spacing={4}
              p={4}
              //bg={useColorModeValue("gray.100", "gray.900")}
            >
              <SearchInput />
              <DateRangePicker />
              <MultiSelect
                options={sourcesList?.map((source) => ({
                  label: source.name,
                  value: source.id,
                }))}
                value={[
                  ...((sources as any) || []),
                  ...(preferences?.sources?.split(",") || []),
                ]}
                placeholder="Choose your favorite sources"
                onChange={updateSources as any}
                multiple
              />

              <MultiSelect
                options={categoriesList?.map((category) => ({
                  label:
                    category[0].toUpperCase() + category.slice(1).toLowerCase(),
                  value: category,
                }))}
                value={[
                  ...((categories as any) || []),
                  ...(preferences?.categories?.split(",") || []),
                ]}
                placeholder="Choose your favorite categories"
                onChange={updateCategories as any}
                multiple
              />
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onClose;
                handleSearch();
              }}
            >
              Search
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
