import { Grid } from "@mantine/core";
import Shape from "~/components/Shape";
import ImageLoaderAndViewer from "~/components/ImageLoaderAndViewer";
import { useState } from "react";
import { useForm } from "@mantine/form";

export default function MainVectorStyleTransfer() {
  const [styleImage, setStyleImage] = useState("");
  const [styleError, setStyleError] = useState(false);
  const [contentImage, setContentImage] = useState("");
  const [contentError, setContentError] = useState(false);
  const [resultImage, setResultImage] = useState("");

  const form = useForm({
    initialValues: {
      styleSVG: "",
      contentSVG: ""
    },
  });

  return (
    <>
      <Shape>
        <Grid justify='space-around' align="flex-start" columns={3}>
          <Grid.Col span={1}>
            <ImageLoaderAndViewer image={styleImage}
                                  setImage={setStyleImage}
                                  imageType={"Style"}
                                  updateForm={(x) => form.setFieldValue("styleSVG", x)}
                                  showError={styleError}
                                  setShowError={setStyleError}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <ImageLoaderAndViewer image={contentImage}
                                  setImage={setContentImage}
                                  imageType={"Content"}
                                  updateForm={(x) => form.setFieldValue("contentSVG", x)}
                                  showError={contentError}
                                  setShowError={setContentError}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <ImageLoaderAndViewer image={resultImage}
                                  setImage={setResultImage}
                                  imageType={"Result"}
                                  callbackRunApp={() => {
                                    let checks_passed = true;
                                    if (styleImage === "") {
                                      setStyleError(true);
                                      checks_passed = false;
                                    }
                                    if (contentImage === "") {
                                      setContentError(true);
                                      checks_passed = false;
                                    }
                                    if (!checks_passed) return;
                                    // alert("You wil run this app :)");
                                    // alert(form.values.styleSVG);
                                    // alert(form.values.contentSVG);
                                  }}/>
          </Grid.Col>
        </Grid>
      </Shape>
    </>
  )
}
