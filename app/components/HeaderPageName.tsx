import { Text } from "@mantine/core";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const HeaderPageName = ({ text }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      minHeight: 56, // 56–64px — обычно норм для header, если иконки крупные
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem 1rem",
      boxSizing: "border-box",
      overflow: "visible", // <--- Важно! (не hidden)
    }}
  >
    <Text
      size="1.4rem"
      weight={800}
      variant="gradient"
      gradient={{ from: "indigo", to: "red", deg: 10 }}
      style={{
        fontFamily: "Greycliff CF, sans-serif",
        userSelect: "none",
        textAlign: "center",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      - - - {text} - - -
    </Text>
    <div
      style={{
        position: "absolute",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        // background: "transparent"
      }}
    >
      <LanguageSwitcher />
    </div>
  </div>
);
