import {
  InputWrapper,
  Stack,
  Button,
  TextInput,
  RadioGroup,
  Radio,
  Switch,
  Chips,
  Chip,
  NumberInput,
  Text,
  Divider,
} from '@mantine/core';
import Shape from './Shape';
import { useForm } from '@mantine/form';
import { Dropzone } from '@mantine/dropzone';

const sendData = (data) => {
  console.log('Send data to server:', data);

  fetch('http://MY_UPLOAD_SERVER.COM/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: data, // TODO: возможно надо запихнуть в класс FormData
  }).then(res => {
    const json = res.json();
    console.log('Server answer:', json);
  }).catch(err => {
    console.log("Uploading error error", err);
  });
};

export default function Form() {
  const form = useForm({
    initialValues: {
      musicFile: undefined,
      artistName: '',
      trackName: '',
      generatorType: "1",
      rasterize: true,
      captionerType: "1",
      numberCovers: 5,
      emotion: 'anger',
    },
  });

  return (
    <Shape style={{ height: '100%' }}>
      <form onSubmit={form.onSubmit(sendData)}>
        <Stack justify="space-around">
          <Text>Select music file</Text>
          <Dropzone
            multiple={false}
            accept={["audio/*"]}
            onDrop={(files) => form.setFieldValue('musicFile', files[0])}
          >
            {() => <Text color='lightgray'>Drag or click</Text>}
          </Dropzone>
          {form.values['musicFile']
            && <Text color='blue'>{form.values['musicFile'].name} is selected</Text>}
          <Divider my="sm" />
          <TextInput
            label="Artist name"
            required
            {...form.getInputProps('artistName')}
          />
          <TextInput
            label="Track name"
            required
            {...form.getInputProps('trackName')}
          />
          <RadioGroup
            label="Generator type"
            required
            {...form.getInputProps('generatorType')}
          >
            <Radio value="1" label="1" />
            <Radio value="2" label="2" />
          </RadioGroup>
          <Switch
            label="Rasterize"
            {...form.getInputProps('rasterize')}
          />
          <RadioGroup
            label="Captioner type"
            required
            {...form.getInputProps('captionerType')}
          >
            <Radio value="1" label="1" />
            <Radio value="2" label="2" />
          </RadioGroup>
          <NumberInput
            placeholder="Number of covers"
            required
            {...form.getInputProps('numberCovers')}
          />
          <InputWrapper label="Emotion">
            <Chips
              {...form.getInputProps('emotion')}
            >
              <Chip value="anger">😠</Chip>
              <Chip value="fear">😨</Chip>
              <Chip value="funny">😂</Chip>
              <Chip value="happy">🤗</Chip>
              <Chip value="lonely">😔</Chip>
              {/* TODO: Дополнить список */}
              {/* TODO: Сделать всплывающее окошко с названием при наведении */}
            </Chips>
          </InputWrapper>
          <Button type='submit' variant='gradient'>Generate</Button>
        </Stack>
      </form>
    </Shape >
  )
}