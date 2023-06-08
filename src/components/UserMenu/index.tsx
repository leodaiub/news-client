import { useAuth } from "@/hooks/useAuth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";

export default function UserMenu() {
  const { logout, user } = useAuth({});

  if (!user) return null;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {user?.name}
      </MenuButton>
      <MenuList>
        <Link href={"/preferences"}>
          <MenuItem>Preferences</MenuItem>
        </Link>
        <MenuItem onClick={logout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
