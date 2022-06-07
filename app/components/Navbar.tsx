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
} from '@mantine/core';
import Shape from './Shape';

export default function Navbar() {
  return (
    <Shape style={{height: '100%'}}>
      <Stack justify="space-around">
        <Button variant='outline'>
          Select Music file
        </Button>
        <TextInput
          label="Artist name"
          required
        />
        <TextInput
          label="Track name"
          required
        />
        <RadioGroup
          label="Generator type"
          required
        >
          <Radio value="1" label="1" />
          <Radio value="2" label="2" />
        </RadioGroup>
        <Switch
          label="Rasterize"
        />
        <RadioGroup
          label="Captioner type"
          required
        >
          <Radio value="1" label="1" />
          <Radio value="2" label="2" />
        </RadioGroup>
        <NumberInput
          defaultValue={5}
          placeholder="Number of covers"
          required
        />
        <InputWrapper label="Emotion">
          <Chips>
            <Chip value="anger">😠</Chip>
            <Chip value="fear">😨</Chip>
            <Chip value="funny">😂</Chip>
            <Chip value="happy">🤗</Chip>
            <Chip value="lonely">😔</Chip>
            {/* TODO: Дополнить список */}
            {/* TODO: Сделать всплывающее окошко с названием при наведении */}
          </Chips>
        </InputWrapper>
        <Button variant='gradient'>Generate</Button>
      </Stack>
    </Shape>
  )
}