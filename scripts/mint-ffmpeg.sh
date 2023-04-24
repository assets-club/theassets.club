#!/usr/bin/env bash
original="public/mint/original.mp4"
dark="public/mint/dark"
end="public/mint/end"

crf=30
time='4.20'

# Generate the dark part
ffmpeg -y -i $original -loglevel debug -filter_complex \
  "[0:v]split[in0][in1]; \
  [in0]trim=end=$time,  setpts=PTS-STARTPTS,split[t0][t1];[t1]reverse[r];[t0][r]concat=n=2:v=1:a=0,split[dark.mp4][dark.webm]; \
  [in1]trim=start=$time,setpts=PTS-STARTPTS,split[end.mp4][end.webm]" \
  -map "[dark.mp4]"  -c:v libx265 -crf $crf -preset fast -c:a aac -b:a 128k "$dark.mp4" \
  -map "[dark.webm]" -c:v libvpx-vp9 -crf $crf -b:v 0 -b:a 128k -c:a libopus "$dark.webm" \
  -map "[end.mp4]"  -c:v libx265 -crf $crf -preset fast -c:a aac -b:a 128k "$end.mp4" \
  -map "[end.webm]" -c:v libvpx-vp9 -crf $crf -b:v 0 -b:a 128k -c:a libopus "$end.webm"
