"""Remove flat cast shadows and background residue from MI6 PNG frames.

Preserves each original RGBA canvas and alignment. Does not alter dark outlines,
suit fabric, skin, glasses, or internal white shirt regions.
"""
from collections import deque
from pathlib import Path
from PIL import Image

FRAMES = Path("Images/EasterEggs")

def background_pixel(r, g, b, a):
    return a < 20 or (min(r, g, b) >= 218 and max(r, g, b) - min(r, g, b) <= 25)

def clean(path):
    im = Image.open(path).convert("RGBA")
    width, height = im.size
    pixels = im.load()
    visited = bytearray(width * height)
    queue = deque()

    def add(x, y):
        p = y * width + x
        if not visited[p] and background_pixel(*pixels[x, y]):
            visited[p] = 1
            queue.append((x, y))

    # Remove ONLY near-white connected to the outer image border.
    # This intentionally leaves enclosed shirt and cuff whites untouched.
    for x in range(width):
        add(x, 0)
        add(x, height - 1)
    for y in range(height):
        add(0, y)
        add(width - 1, y)
    while queue:
        x, y = queue.popleft()
        if x:
            add(x - 1, y)
        if x + 1 < width:
            add(x + 1, y)
        if y:
            add(x, y - 1)
        if y + 1 < height:
            add(x, y + 1)

    removed = 0
    # The ground shadows are flat, almost-neutral gray beneath the shoes.
    # Restrict that filter to the bottom 25 rows so jacket/suit shading stays.
    # Also clear enclosed white gaps between feet in the lower 95 rows.
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            lower_white = (
                y >= height - 95
                and min(r, g, b) >= 218
                and max(r, g, b) - min(r, g, b) <= 25
            )
            floor_shadow = (
                y >= height - 25
                and min(r, g, b) >= 125
                and max(r, g, b) - min(r, g, b) <= 17
            )
            if visited[y * width + x] or lower_white or floor_shadow:
                if a:
                    removed += 1
                pixels[x, y] = (0, 0, 0, 0)

    im.save(path, optimize=True)
    print(f"{path.name}: cleared {removed} background/shadow pixels, size {width}x{height}")


if __name__ == "__main__":
    paths = sorted(FRAMES.glob("Bond_Frame_*.png"))
    if len(paths) != 14:
        raise SystemExit(f"Expected 14 Bond frames, found {len(paths)}")
    for path in paths:
        clean(path)
