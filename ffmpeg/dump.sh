#!/bin/bash
######################################################################
# Requirements:
# 1. Create a new directory and copy the video file and script to
#    the directory and run the script
######################################################################
ffmpeg -i $1 -vf "select=eq(pict_type\,I)" -vsync vfr %03d.png
ffprobe -select_streams v -show_frames $1 2>&1 | awk -F= '
  /pict_type=/ { if (index($2, "I")) { i=1; } else { i=0; } }
  /pkt_pts_time/ { if (i && ($2 >= 0)) print $2; }
' >timestamps.txt
ls -1 *.png >frames.txt
paste timestamps.txt frames.txt > combined.txt
cat combined.txt
