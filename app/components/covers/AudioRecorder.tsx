import React, { useEffect, useRef } from 'react';
import { useRecorder } from 'react-microphone-recorder';
import { Button, Group } from "@mantine/core";
import { Microphone, PlayerPlay, PlayerStop } from "tabler-icons-react";
import type { FileWithPath } from "file-selector";
import { useTranslation } from "react-i18next";

// https://github.com/dinakar17/react-microphone-recorder?tab=readme-ov-file#installation
// https://react-microphone-recorder.vercel.app/

const AudioRecorder = ({ form, updArtistName, updTrackName, showAudio, setShowAudio }) => {
  const { t } = useTranslation();

  const {
    startRecording,
    pauseRecording,
    stopRecording,
    resetRecording,
    resumeRecording,
    audioLevel,
    timeElapsed,
    recordingState,
    audioURL,
    audioFile,
    isRecording
  } = useRecorder();

  const savedOnce = useRef(false);

  useEffect(() => {
    if (audioFile && !savedOnce.current) {
      const fileWithPath: FileWithPath = Object.assign(audioFile, {
        path: audioFile.name.replace(".mp3",".webm"),
      });
      console.log(fileWithPath);
      form.setFieldValue('audio_file', fileWithPath);
      updArtistName("myBand");
      updTrackName("myTrack");
      savedOnce.current = true;
      setShowAudio(true);
    }
  }, [audioFile]);

  const myStopRecording = () => {
    stopRecording();
    savedOnce.current = false;
  }

  return (
    <Group>
      <div className="top-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
        {
          isRecording ?
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center"
                 style={{ transform: `scale(${Math.min(audioLevel / 10, 5)})` }}>
              <div className="w-2 h-2 bg-gray-400 rounded-full">
              </div>
            </div>
            :
            <></>
        }
        <Microphone size={40} color="gray" className="lucide lucide-mic absolute"></Microphone>
      </div>
      {/*<div className="mb-4">*/}
      {/*  <div className="flex items-center justify-between mb-2">*/}
      {/*    <span className="text-gray-900">Audio Level:</span>*/}
      {/*    <span className="text-gray-900">{audioLevel}</span>*/}
      {/*  </div>*/}
      {/*  <div className="w-full h-2 bg-gray-200 rounded-full">*/}
      {/*    <div className={"h-full w-full bg-green-500 rounded-full"}></div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="mb-4">*/}
      {/*  <span className="text-gray-900">Time: {timeElapsed}s</span>*/}
      {/*</div>*/}
      {
        (recordingState === "idle" || recordingState === "stopped") ?
          <Button
            onClick={startRecording}
            className="px-4 py-2 rounded shadow"
            leftIcon={<PlayerPlay size={20} color="red"/>}
            variant="outline"
          >
            {t("record")}
          </Button>
          :
          <Button
            onClick={myStopRecording}
            className="px-4 py-2 rounded shadow"
            leftIcon={<PlayerStop size={20} color="red"/>}
            variant="outline"
          >
            {t("stop")}
          </Button>
      }

      {/*{*/}
      {/*  recordingState === "paused" ?*/}
      {/*    <button onClick={resumeRecording}*/}
      {/*            className="px-4 py-2 text-white bg-green-500 rounded shadow hover:bg-green-600">Resume</button>*/}
      {/*    :*/}
      {/*    <button onClick={pauseRecording}*/}
      {/*            className="px-4 py-2 text-white bg-yellow-500 rounded shadow hover:bg-yellow-600">Pause</button>*/}

      {/*}*/}
      {/*<button onClick={stopRecording}*/}
      {/*        className="px-4 py-2 text-white bg-red-500 rounded shadow hover:bg-red-600">Stop*/}
      {/*</button>*/}
      {/*<button onClick={resetRecording}*/}
      {/*        className="px-4 py-2 text-white bg-gray-500 rounded shadow hover:bg-gray-600">Reset*/}
      {/*</button>*/}
      {
        showAudio && recordingState === "stopped" && audioFile && (
          <audio src={audioURL} controls></audio>
        )
      }
      {/*<div className="mt-4">*/}
      {/*<span className="text-gray-900">Recording State: {recordingState}</span>*/}
      {/*</div>*/}
    </Group>
  );
};

export default AudioRecorder;
