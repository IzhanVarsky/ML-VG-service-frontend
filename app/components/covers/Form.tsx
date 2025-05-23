import {
  Button,
  Container,
  Grid, Group,
  Loader,
  NativeSelect,
  NumberInput,
  Radio,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import Shape from '../Shape';
import { useForm } from '@mantine/form';
import { Dropzone } from '@mantine/dropzone';
import { useOutletContext } from "@remix-run/react";
import { useState } from 'react';
import { FileMusic, PlayerRecord, Refresh } from 'tabler-icons-react';
import { config } from '~/config.js';
import AudioRecorder from "~/components/covers/AudioRecorder";
import { useTranslation } from "react-i18next"; // добавил импорт

const emotions = [
  'ANGER',
  'COMFORTABLE',
  'FEAR',
  'FUNNY',
  'HAPPY',
  'INSPIRATIONAL',
  'JOY',
  'LONELY',
  'NOSTALGIC',
  'PASSIONATE',
  'QUIET',
  'RELAXED',
  'ROMANTIC',
  'SADNESS',
  'SERIOUS',
  'SOULFUL',
  'SURPRISE',
  'SWEET',
  'WARY'
];

export default function Form() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');

  const [showAudio, setShowAudio] = useState(false);
  const { t } = useTranslation(); // добавил хук
  const emotionOptions = emotions.map((key) => ({
    value: key,
    label: t(`emotion-${key}`)
  }));

  const splitByLast = (text: string, SEP: string = ".") => {
    const index = text.lastIndexOf(SEP);
    return index < 0 ? [text] : [text.slice(0, index), text.slice(index + SEP.length)];
  }

  const updArtistName = (name) => {
    form.setFieldValue("track_artist", name);
    setArtistName(name);
  }
  const updTrackName = (name) => {
    form.setFieldValue("track_name", name);
    setTrackName(name);
  }

  const setArtistAndTrackNames = (audioFilename) => {
    audioFilename = audioFilename.replace(/_/g, " ")
    const fname = splitByLast(audioFilename, ".");
    if (fname.length < 2) {
      updArtistName(audioFilename);
      updTrackName('');
      return
    }
    const SEP = " - ";
    const arr = splitByLast(fname[0], SEP);
    if (arr.length == 2) {
      updArtistName(arr[0]);
      updTrackName(arr[1]);
    } else {
      updArtistName(arr[0]);
      updTrackName('');
    }
  }

  const sendData = (data) => {
    setIsLoading(true);
    console.log('Send data to server:', data);
    const formData = new FormData()
    for (let key in data) {
      formData.append(key, data[key]);
    }
    $.ajax({
      url: `${config.covergan_backend_host}/generate`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success: (response) => {
        console.log('SUCC', response);
        setCovers(response.result);
        setIsLoading(false);
      },
      error: (e) => {
        console.log('ERR', e);
        setIsLoading(false);
      }
    });
  };

  const form = useForm({
    initialValues: {
      audio_file: undefined,
      track_artist: { artistName },
      track_name: { trackName },
      emotion: 'HAPPY',
      gen_type: "2",
      use_captioner: "False",
      num_samples: 5,
      use_filters: false,
    },
  });

  return (
    <>
      <Shape style={{ height: '100%', width: '23rem' }}>
        <form onSubmit={form.onSubmit((data) => {
          if (form.values['audio_file']) {
            setShowError(false);
            sendData(data);
          } else {
            setShowError(true);
          }
        })}>
          <Stack justify="space-around">
            <Text>{t("select-music-file")}</Text>
            <Group>
              <Dropzone
                multiple={false}
                onDrop={(files) => {
                  console.log(files[0]);
                  form.setFieldValue('audio_file', files[0]);
                  setArtistAndTrackNames(files[0].name);
                  setShowError(false);
                  setShowAudio(false);
                }}
                onReject={(files) => console.log('rejected files', files)}
                // maxSize={3 * 1024 ** 2}
                accept={["audio/*"]}
                style={{
                  borderColor: showError ? '#ffa3a3' : '',
                  backgroundColor: showError ? '#fff6f5' : '',
                  padding: '8px'
                }}
              >
                <Grid align='center' columns={8}
                      style={{ margin: 0 }}>
                  <Grid.Col span={2}>
                    <FileMusic
                      color={showError ? '#ff3b3b' : 'grey'}
                      style={{ display: 'block', margin: 'auto' }}
                      size={'25px'}/>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    {form.values['audio_file']
                      ? <Text
                        color='grey'
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >{form.values['audio_file'].name}</Text>
                      : <Text color={showError ? 'red' : 'grey'}>{t("drag-or-click")}</Text>}
                  </Grid.Col>
                </Grid>
              </Dropzone>
              <Text>{t("or")}</Text>
              <AudioRecorder
                form={form}
                updArtistName={updArtistName}
                updTrackName={updTrackName}
                showAudio={showAudio}
                setShowAudio={setShowAudio}
              ></AudioRecorder>
            </Group>

            <TextInput
              placeholder={t("artist-name")}
              label={t("artist-name")}
              required
              onChange={(event) => updArtistName(event.currentTarget.value)}
              value={artistName}
            />
            <TextInput
              placeholder={t("track-name")}
              label={t("track-name")}
              required
              onChange={(event) => updTrackName(event.currentTarget.value)}
              value={trackName}
            />
            <Radio.Group
              label={t("generator-type")}
              withAsterisk
              {...form.getInputProps('gen_type')}
              // spacing="xs"
              // size="md"
            >
              <Group mt="xs">
                <Radio value="1" label={t("gen-old")}/>
                <Radio value="2" label={t("gen-new-1")}/>
                <Radio value="3" label={t("gen-new-2")}/>
                <Radio value="4" label={t("gen-new-3")}/>
                <Radio value="5" label={t("gen-new-4")}/>
              </Group>
            </Radio.Group>
            <Radio.Group
              label={t("captioner-type")}
              required
              {...form.getInputProps('use_captioner')}
            >
              <Group mt="xs">
                <Radio value="True" label={t("old")}/>
                <Radio value="False" label={t("new")}/>
              </Group>
            </Radio.Group>
            <NativeSelect
              label={t("emotion")}
              data={emotionOptions}
              required
              {...form.getInputProps('emotion')}
            />
            <NumberInput
              placeholder={t("num-covers")}
              label={t("num-covers")}
              min={1}
              max={20}
              required
              {...form.getInputProps('num_samples')}
            />
            <Switch
              size="md"
              checked={form.values.use_filters}
              onChange={(event) =>
                form.setFieldValue("use_filters", event.currentTarget.checked)
              }
              label={
                <span>
                  {t("use-filters")}
                </span>
              }
              styles={{
                body: { alignItems: 'center' },
              }}
            />
            <Button type='submit' variant='gradient' loading={isLoading}>{t("generate")}</Button>
          </Stack>
        </form>
      </Shape>
    </>
  )
}
