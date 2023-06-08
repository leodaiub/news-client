import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { useRef } from "react";

export default function SearchInput() {
  const [search, updateSearch] = useStore(
    (state) => [state.search, state.updateSearch],
    shallow
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        ref={inputRef}
        type="text"
        value={search || ""}
        onChange={() => {
          updateSearch(inputRef.current?.value);
        }}
        placeholder={`Search...`}
      />
      {search && (
        <InputRightElement
          role="clearSearch"
          cursor={"pointer"}
          onClick={() => {
            updateSearch("");
          }}
        >
          <CloseIcon
            fontSize={14}
            _hover={{ color: "gray.600" }}
            color="gray.300"
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
