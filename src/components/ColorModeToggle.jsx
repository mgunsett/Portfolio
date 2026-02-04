import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { MotionBox } from "./Motion";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MotionBox
      whileTap={{ scale: 0.9 }}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 100,
      }}
    >
      <Tooltip label="Cambiar modo">
        <IconButton
          aria-label="Toggle color mode"
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          bg="green"
          color="background"
          _hover={{ bg: "yellow", color: "background" }}
          borderRadius="full"
          size="lg"
        />
      </Tooltip>
    </MotionBox>
  );
};

export default ColorModeToggle;
