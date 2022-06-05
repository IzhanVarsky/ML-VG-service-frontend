import { Stack, Grid, InputWrapper, ColorInput, Textarea, Code, Space, Accordion, Container } from '@mantine/core';
import Shape from '~/components/Shape';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 1024 1024">
<style>@import url('https://fonts.googleapis.com/css?family=Nokora');
  @import url('https://fonts.googleapis.com/css?family=Eczar');
</style>
<defs />
<rect width="1024" height="1024" fill="#EE84A6" fill-opacity="1" />
<path fill="#021F39" fill-opacity="1" stroke="#021F39" stroke-opacity="1" stroke-width="0" stroke-linejoin="miter" d="M 638,346
  C 642,344 668,328 661,333
  C 657,337 651,345 693,318
  C 659,268 659,270 613,304
  C 624,298 626,299 613,310
  C 559,347 552,352 490,468
  C 422,512 385,469 313,518
  C 302,602 253,636 162,624
  C 105,663 86,753 29,793
  C -20,825 -17,821 -22,822
  C -46,782 -19,811 -26,805
  C -39,794 -24,808 11,765
  C -3,796 -31,814 -68,761
  C 39,687 80,735 183,663
  C 241,621 272,547 354,544
  C 369,533 415,500 435,411
  C 490,372 579,381 638,346
  Z "/>
<path fill="#FFFEF7" fill-opacity="0.3019608" stroke="#FFFEF7" stroke-opacity="0.3019608" stroke-width="0" stroke-linejoin="miter" d="M 803,175
  C 786,320 673,243 565,279
  C 516,312 467,345 418,378
  C 368,410 319,443 270,476
  C 349,623 302,656 134,696
  C 119,516 115,457 209,419
  C 237,453 234,392 223,230
  C 219,155 215,94 211,36
  C 86,0 89,46 121,-106
  C 183,-62 192,37 244,67
  C 298,93 352,120 403,146
  C 456,172 509,199 562,225
  C 617,251 673,160 803,175
  Z "/>
<path fill="#FFFEDF" fill-opacity="0.25490198" stroke="#FFFEDF" stroke-opacity="0.25490198" stroke-width="0" stroke-linejoin="miter" d="M 1251,748
  C 1168,802 1129,811 1062,784
  C 1044,659 1002,665 964,674
  C 922,841 949,802 855,871
  C 746,803 751,820 654,822
  C 626,781 613,753 586,711
  C 738,667 718,632 698,598
  C 678,563 658,528 628,485
  C 541,537 518,509 407,400
  C 441,365 479,322 558,252
  C 619,291 629,331 656,302
  C 762,184 777,166 814,122
  C 742,23 771,-10 808,-49
  C 931,45 862,113 920,164
  C 962,186 1000,203 947,139
  C 1063,65 1100,80 1139,97
  C 1261,191 1286,207 1279,284
  C 1215,322 1192,318 1158,357
  C 1150,395 1146,435 1162,452
  C 1301,510 1291,539 1135,594
  C 1209,675 1291,662 1251,748
  Z "/>
<text fill="#0A0A0A" fill-opacity="1" x="20" y="980" textLength="743" lengthAdjust="spacing" writing-mode="lr">
  George Michael
</text>
<text fill="#0E5947" fill-opacity="1" x="733" y="474" textLength="180" lengthAdjust="spacing" writing-mode="lr">
  Carles
</text>
<text fill="#0E5947" fill-opacity="1" x="700" y="574" textLength="246" lengthAdjust="spacing" writing-mode="lr">
  Whisper
</text>
</svg>`


export default function Main() {
  return (
    <Shape>
      <Grid>
        <Container m='xs'>
          <image dangerouslySetInnerHTML={{ __html: svg }} />
        </Container>
        <Stack justify="space-around" p="xl" m="xl">
          <InputWrapper label="Colors">
            <Stack>
              <ColorInput defaultValue="#C5D899" />
              <ColorInput defaultValue="#CF3636" />
              <ColorInput defaultValue="#E08D07" />
            </Stack>
          </InputWrapper>
        </Stack>
      </Grid>
      <Accordion>
        <Accordion.Item label="Edit raw svg">
          <Textarea
            minRows={10}
          >{svg}</Textarea>
        </Accordion.Item>
      </Accordion>

    </Shape>
  )
}