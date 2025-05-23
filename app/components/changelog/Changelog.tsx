import React from "react";  // <-- ОБЯЗАТЕЛЬНО!
import { Divider, Center, List, Text } from "@mantine/core";
import Shape from "~/components/Shape";
import { useTranslation } from "react-i18next";
import enChangelog from "~/locales/en/changelog.json";
import ruChangelog from "~/locales/ru/changelog.json";
import {
  CoverGANLink,
  MantineAnchor,
  SVGEditorLink,
  VectorNSTLink,
  MainPageLink,
  VectorWeaverLink,
  ChangelogLink
} from "~/components/Links";

const LinkMap = {
  "CoverGANLink": <CoverGANLink />,
  "MantineAnchor": <MantineAnchor />,
  "SVGEditorLink": <SVGEditorLink />,
  "VectorNSTLink": <VectorNSTLink />,
  "MainPageLink": <MainPageLink />,
  "VectorWeaverLink": <VectorWeaverLink />,
  "ChangelogLink": <ChangelogLink />
};

function renderDetail(detail: string) {
  const parts: (string | React.ReactNode)[] = [];
  let str = detail;
  let found = false;

  while (str.length > 0) {
    let minIdx = -1;
    let minKey = "";
    for (const key in LinkMap) {
      const idx = str.indexOf(key);
      if (idx !== -1 && (minIdx === -1 || idx < minIdx)) {
        minIdx = idx;
        minKey = key;
      }
    }
    if (minIdx === -1) {
      parts.push(str);
      break;
    }
    if (minIdx > 0) {
      parts.push(str.slice(0, minIdx));
    }
    parts.push(LinkMap[minKey]);
    str = str.slice(minIdx + minKey.length);
    found = true;
  }

  if (found) {
    return <Text>{parts.map((p, i) => <React.Fragment key={i}>{p}</React.Fragment>)}</Text>;
  }
  return <Text>{detail}</Text>;
}

export default function Changelog() {
  const { i18n } = useTranslation();
  const entries = i18n.language.startsWith("ru") ? ruChangelog : enChangelog;
  const entriesReversed = [...entries].reverse();

  return (
    <Center>
      <Shape style={{ width: '60%' }}>
        {entriesReversed.map((entry, i) => (
          <div key={i}>
            <Text size="md" style={{ paddingBottom: '1rem' }}>
              <Text weight={600} span>{entry.date}</Text>
            </Text>
            <List size="md" withPadding>
              {entry.details.map((detail: string, j: number) => (
                <List.Item
                  key={j}
                  style={{
                    paddingBottom: j === entry.details.length - 1 ? undefined : '1rem'
                  }}
                >
                  {renderDetail(detail)}
                </List.Item>
              ))}
            </List>
            {i < entriesReversed.length - 1 && <Divider my="sm" />}
          </div>
        ))}
      </Shape>
    </Center>
  );
}
