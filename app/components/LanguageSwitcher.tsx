import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';

const languages = [
  { code: 'ru', label: 'Русский', country: 'RU' },
  { code: 'en', label: 'English', country: 'GB' },  // GB — красивее флаг, чем US
  // { code: 'ja', label: '日本語', country: 'JP' },    // Можно добавить японский
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <Group spacing="xs">
      {languages.map(({ code, label, country }) => (
        <Tooltip label={label} key={code} withArrow>
          <ActionIcon
            variant={currentLang === code ? "filled" : "light"}
            color={currentLang === code ? "blue" : "gray"}
            onClick={() => i18n.changeLanguage(code)}
            aria-label={label}
            size="lg"
          >
            <ReactCountryFlag
              countryCode={country}
              svg
              style={{
                width: "1.8em",
                height: "1.8em",
                borderRadius: "3px",
                boxShadow: currentLang === code ? "0 0 4px #228be6" : undefined,
                border: currentLang === code ? "1.5px solid #228be6" : "1px solid #ced4da",
                transition: "all 0.15s"
              }}
              title={label}
            />
          </ActionIcon>
        </Tooltip>
      ))}
    </Group>
  );
}
