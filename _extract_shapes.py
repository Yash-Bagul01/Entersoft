import os
import cv2

src = r"c:\Users\Asus\Videos\Screen Recordings\Screen Recording 2026-10-06 150601.mp4"
out = r"c:\Users\Asus\OneDrive\Desktop\Entersoft 1\entersoft-web\_cyphr_frames"
os.makedirs(out, exist_ok=True)
cap = cv2.VideoCapture(src)
frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
print("frames", frames)
# denser sample
for i in range(16):
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(frames * (i / 15.5)))
    ok, frame = cap.read()
    if ok:
        path = os.path.join(out, f"s{i:02d}.jpg")
        cv2.imwrite(path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 82])
        print("wrote", path)
cap.release()
