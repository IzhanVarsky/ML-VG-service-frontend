import Shape from "~/components/Shape";
import { Center, Text } from "@mantine/core";

export default function ServiceUnavailableInfo({ serviceName }) {
  return (
    <>
      <Shape>
        <Center>
          <Text size='2rem' color='red' weight={800}>
            {serviceName} service is not available at the moment :(
          </Text>
        </Center>
        <Center>
          <Text size='1.7rem' color='red' weight={800}>
            Please, try again later...
          </Text>
        </Center>
      </Shape>
    </>)
}
