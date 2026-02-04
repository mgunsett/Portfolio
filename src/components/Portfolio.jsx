import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Tag,
  Stack,
} from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import { projects } from "../data/projects";

const Portfolio = () => {
  return (
    <Box py={24} px={[6, 12, 24]}>
      <Heading mb={12}>Experiencia & Proyectos</Heading>

      <SimpleGrid columns={[1, 2]} spacing={8}>
        {projects.map((p, i) => (
          <MotionBox
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <Box
              p={8}
              border="1px solid"
              borderColor="green"
              bg="surface"
            >
              <Text fontSize="sm" color="green">
                {p.year}
              </Text>
              <Heading size="md" my={3}>
                {p.title}
              </Heading>
              <Text opacity={0.8}>{p.description}</Text>

              <Stack direction="row" mt={4} wrap="wrap">
                {p.tech.map(t => (
                  <Tag key={t} bg="yellow">
                    {t}
                  </Tag>
                ))}
              </Stack>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Portfolio;
