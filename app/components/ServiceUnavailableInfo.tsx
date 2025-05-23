import Shape from "~/components/Shape";
import { Center, Text } from "@mantine/core";
import { useTranslation } from "react-i18next"; // добавил импорт

export default function ServiceUnavailableInfo({ serviceName }) {
  const { t } = useTranslation(); // добавил хук
  return (
    <>
      <Shape>
        <Center>
          <Text size='2rem' color='red' weight={800}>
            {t("service-unavailable", { service: serviceName })}
          </Text>
        </Center>
        <Center>
          <Text size='1.7rem' color='red' weight={800}>
            {t("please-try-later")}
          </Text>
        </Center>
      </Shape>
    </>
  )
}
