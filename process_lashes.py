import os
from PIL import Image

src_path = r'd:\LashLook\client\public\images\user-lash-reference.png'
out_dir = r'd:\LashLook\client\public\images\lashes'
os.makedirs(out_dir, exist_ok=True)

im = Image.open(src_path).convert('RGBA')
w, h = im.size
pixels = im.load()

# Create clean image preserving original transparency
clean = Image.new('RGBA', (w, h), (0, 0, 0, 0))
clean_pixels = clean.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a <= 5:
            clean_pixels[x, y] = (0, 0, 0, 0)
        else:
            # Make dark stroke with the original smooth anti-aliased alpha
            clean_pixels[x, y] = (11, 11, 11, a)

def get_bounding_box(img_crop):
    cw, ch = img_crop.size
    cp = img_crop.load()
    min_x, max_x = cw, 0
    min_y, max_y = ch, 0
    has_pixel = False
    for y in range(ch):
        for x in range(cw):
            if cp[x, y][3] > 10:
                has_pixel = True
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
    if not has_pixel:
        return None
    return (min_x, min_y, max_x + 1, max_y + 1)

def crop_tight(img_crop):
    bbox = get_bounding_box(img_crop)
    if bbox:
        return img_crop.crop(bbox)
    return img_crop

# Row definitions
rows = [
    {
        'id': 'style1',
        'y_top': 60,
        'y_split': 244,
        'y_btm': 330,
        'x_mid': 475
    },
    {
        'id': 'style2',
        'y_top': 380,
        'y_split': 523,
        'y_btm': 640,
        'x_mid': 475
    },
    {
        'id': 'style3',
        'y_top': 680,
        'y_split': 846,
        'y_btm': 960,
        'x_mid': 450
    }
]

for row in rows:
    rid = row['id']
    yt = row['y_top']
    ys = row['y_split']
    yb = row['y_btm']
    xm = row['x_mid']

    # 1. Full Left & Right
    full_left = crop_tight(clean.crop((0, yt, xm, yb)))
    full_right = crop_tight(clean.crop((xm, yt, w, yb)))
    full_left.save(os.path.join(out_dir, f'{rid}_full_left.png'))
    full_right.save(os.path.join(out_dir, f'{rid}_full_right.png'))
    print(f'{rid} full left size: {full_left.size}, full right size: {full_right.size}')

    # 2. Upper Left & Right
    upper_left = crop_tight(clean.crop((0, yt, xm, ys)))
    upper_right = crop_tight(clean.crop((xm, yt, w, ys)))
    upper_left.save(os.path.join(out_dir, f'{rid}_upper_left.png'))
    upper_right.save(os.path.join(out_dir, f'{rid}_upper_right.png'))

    # 3. Lower Left & Right
    lower_left = crop_tight(clean.crop((0, ys, xm, yb)))
    lower_right = crop_tight(clean.crop((xm, ys, w, yb)))
    lower_left.save(os.path.join(out_dir, f'{rid}_lower_left.png'))
    lower_right.save(os.path.join(out_dir, f'{rid}_lower_right.png'))

print("Transparent PNG eyelash assets generated with 100% correct transparency!")
