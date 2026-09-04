import { Box, Grid, Flex, Text, Heading, GridItem, useDisclosure } from "@chakra-ui/react";
import { MotionBox } from "./Motion.jsx";
import ProjectPosterCard from "./ProjectPosterCard.jsx";
import ModalProyects from "./ModalProyects.jsx";
import { projects } from "../data/projects";
import { useState } from "react";

/** Retardo entre card y card al entrar en pantalla, en segundos. */
const STAGGER = 0.08;

const Portfolio = ({ number = "03" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const handleCloseProject = () => {
    onClose();
    setSelectedProject(null);
  };

  return (
    <Box id="proyectos" position="relative" >
      <Box
          w={{ base: "80%" , md: "70%" }}
          h="2px"
          bgGradient="linear(to-r, transparent, green , transparent)"
          mb={12}
          m={'auto'}
          mt={10}
        />

      {/* Portfolio */}
      <MotionBox
        as="section"
        py={24}
        px={[6, 12, 24]}
        mt={12}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box maxW="6xl" mx="auto">
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
            gap={12}
          >
            <GridItem colSpan={{ base: 1, md: 12 }}>
              <Flex align="center" gap={4} mb={6}>
                <Box
                  w={3}
                  h={3}
                  bg="yellow"
                  borderRadius="full"
                />
                <Text
                  fontSize="sm"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  fontWeight="semibold"
                  color="green"
                >
                  {number}
                </Text>
              </Flex>
              <Heading
                fontFamily={'"Syne", sans-serif'}
                fontSize={["3xl", "4xl"]}
                fontWeight="700"
                textTransform="uppercase"
                lineHeight="1.2"
              >
                PROYECTOS
              </Heading>
              <Text mt={4} fontSize={{ base: "md", md: "lg" }} opacity={0.8} fontFamily="space" maxW="2xl">
                Landing pages, E-commerce, plataformas y sitios corporativos. El respaldo técnico
                detrás de cada web: bases de datos, autenticación, pasarelas de
                pago y paneles de administración.
              </Text>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 12 }}>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                gap={{ base: 5, md: 6 }}
              >
                {projects.map((project, i) => (
                  <MotionBox
                    key={project.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: i * STAGGER }}
                  >
                    <ProjectPosterCard project={project} index={i} onOpen={handleOpenProject} />
                  </MotionBox>
                ))}
              </Grid>
            </GridItem>

          </Grid>
        </Box>
      </MotionBox>

      <ModalProyects
        isOpen={isOpen}
        onClose={handleCloseProject}
        project={selectedProject}
      />
    </Box>
  );
};
export default Portfolio;
