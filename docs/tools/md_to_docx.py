"""
Convert docs/SRS.md into a Word document with the diagrams embedded.

Why not DokumenTulis: that tool renders Markdown but cannot carry images, and an SRS
whose use case, activity, class diagrams and ERD are missing is not the deliverable the
assignment asks for. python-docx writes the real OOXML package, so images, page numbers
and a table of contents all survive.

Image sizing rule: a picture can never be taller than the printable area, because Word
clips rather than scales. Tall activity diagrams are therefore fitted by HEIGHT and their
width follows; wide ones are fitted by width. Both are capped so nothing overflows a page.

Usage: python3 md_to_docx.py SRS.md SRS_Vita_Travel.docx
"""
import io
import re
import sys
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor
from PIL import Image

BODY_FONT = "Times New Roman"
HEAD_FONT = "Calibri"
CODE_FONT = "Consolas"
BRAND = RGBColor(0x0D, 0x2E, 0x37)
ACCENT = RGBColor(0xC2, 0x6A, 0x14)
GREY = RGBColor(0x55, 0x55, 0x55)

# Printable area on A4 with 2 cm margins.
MAX_W = 16.0   # cm
MAX_H = 23.0   # cm


# ---------------------------------------------------------------- helpers

def shade(element, hex_color):
    """Apply a solid background colour to a paragraph or table cell."""
    pr = element.get_or_add_pPr() if hasattr(element, "get_or_add_pPr") else element._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color)
    pr.append(shd)


def shade_cell(cell, hex_color):
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color)
    cell._tc.get_or_add_tcPr().append(shd)


def repeat_header(row):
    """Keep the header row visible when a long table breaks across pages."""
    tr_pr = row._tr.get_or_add_trPr()
    header = OxmlElement("w:tblHeader")
    header.set(qn("w:val"), "true")
    tr_pr.append(header)


def field(paragraph, instruction):
    """Insert a Word field (PAGE, TOC). Word fills it in when the document opens."""
    run = paragraph.add_run()
    begin = OxmlElement("w:fldChar"); begin.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText"); instr.set(qn("xml:space"), "preserve"); instr.text = instruction
    separate = OxmlElement("w:fldChar"); separate.set(qn("w:fldCharType"), "separate")
    placeholder = OxmlElement("w:t"); placeholder.text = " "
    end = OxmlElement("w:fldChar"); end.set(qn("w:fldCharType"), "end")
    for node in (begin, instr, separate, placeholder, end):
        run._r.append(node)
    return run


def add_runs(paragraph, text, base_size=None, base_bold=False, base_color=None):
    """Write inline Markdown (**bold**, `code`, *italic*) as real Word runs."""
    # Split on the three inline markers, keeping them so we know what each piece is.
    tokens = re.split(r"(\*\*.+?\*\*|`[^`]+`|\*[^*]+?\*)", text)
    for token in tokens:
        if not token:
            continue
        bold, mono, italic = base_bold, False, False
        value = token
        if token.startswith("**") and token.endswith("**") and len(token) > 4:
            bold, value = True, token[2:-2]
        elif token.startswith("`") and token.endswith("`") and len(token) > 2:
            mono, value = True, token[1:-1]
        elif token.startswith("*") and token.endswith("*") and len(token) > 2:
            italic, value = True, token[1:-1]
        run = paragraph.add_run(value)
        run.bold = bold
        run.italic = italic
        run.font.name = CODE_FONT if mono else BODY_FONT
        if base_size:
            run.font.size = Pt(base_size - 1 if mono else base_size)
        if base_color:
            run.font.color.rgb = base_color
    return paragraph


def add_image(doc, path, caption):
    """Insert a centred picture plus its caption, sized to never overflow the page.

    Pictures wider than EMBED_MAX_W are scaled down before embedding. A 2880 px
    screenshot printed across 16 cm is about 450 DPI: the extra pixels are invisible
    and only make the .docx heavier to open and send. The original file on disk is
    left untouched.
    """
    EMBED_MAX_W = 1800
    stream = None
    with Image.open(path) as im:
        px_w, px_h = im.size
        if px_w > EMBED_MAX_W:
            scale = EMBED_MAX_W / px_w
            small = im.convert("RGB") if im.mode in ("RGBA", "P", "LA") else im
            small = small.resize((EMBED_MAX_W, max(1, round(px_h * scale))), Image.LANCZOS)
            stream = io.BytesIO()
            small.save(stream, format="PNG", optimize=True)
            stream.seek(0)
            px_w, px_h = EMBED_MAX_W, small.size[1]

    ratio = px_h / px_w
    width = MAX_W
    height = width * ratio
    if height > MAX_H:              # a tall diagram: fit by height, width follows
        height = MAX_H
        width = height / ratio

    para = doc.add_paragraph()
    para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    para.paragraph_format.space_before = Pt(10)
    para.paragraph_format.space_after = Pt(4)
    para.add_run().add_picture(stream if stream else str(path), width=Cm(width))

    cap = doc.add_paragraph()
    cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cap.paragraph_format.space_after = Pt(14)
    run = cap.add_run(caption)
    run.italic = True
    run.font.size = Pt(9)
    run.font.color.rgb = GREY
    run.font.name = BODY_FONT
    return width, height


def add_code_block(doc, lines):
    """A shaded, monospaced block. Each line is its own shaded paragraph."""
    for index, line in enumerate(lines):
        para = doc.add_paragraph()
        fmt = para.paragraph_format
        fmt.space_before = Pt(6 if index == 0 else 0)
        fmt.space_after = Pt(6 if index == len(lines) - 1 else 0)
        fmt.line_spacing = 1.0
        fmt.left_indent = Cm(0.4)
        shade(para._p, "F4F6F7")
        run = para.add_run(line if line.strip() else " ")
        run.font.name = CODE_FONT
        run.font.size = Pt(8)
        if re.match(r"^\s*--", line):
            run.font.color.rgb = RGBColor(0x60, 0x7D, 0x8B)   # SQL comments
        elif re.search(r"\b(CREATE|TABLE|PRIMARY|FOREIGN|REFERENCES|NOT|NULL|DEFAULT|CHECK|UNIQUE)\b", line):
            run.font.color.rgb = RGBColor(0x0B, 0x3D, 0x91)


def add_table(doc, rows, header=True):
    """A real Word table with a shaded, repeating header row."""
    if not rows:
        return
    table = doc.add_table(rows=len(rows), cols=len(rows[0]))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = True

    for r, row in enumerate(rows):
        for c, value in enumerate(row):
            cell = table.cell(r, c)
            cell.text = ""
            para = cell.paragraphs[0]
            para.paragraph_format.space_before = Pt(1)
            para.paragraph_format.space_after = Pt(1)
            para.paragraph_format.line_spacing = 1.0
            if r == 0 and header:
                add_runs(para, value, base_size=9, base_bold=True)
                shade_cell(cell, "DCE8EA")
            else:
                add_runs(para, value, base_size=9)
    if header:
        repeat_header(table.rows[0])
    doc.add_paragraph().paragraph_format.space_after = Pt(6)


# ---------------------------------------------------------------- parse

def parse_table(lines, start):
    """Read a Markdown pipe table, returning (rows, next_index)."""
    rows = []
    i = start
    while i < len(lines) and lines[i].strip().startswith("|"):
        raw = lines[i].strip().strip("|")
        cells = [c.strip() for c in raw.split("|")]
        # The |---| separator row carries the alignment, not data.
        if not all(re.fullmatch(r":?-{2,}:?", c) for c in cells if c):
            rows.append(cells)
        i += 1
    # Normalise: a table must be rectangular or Word rejects the row.
    if rows:
        width = max(len(r) for r in rows)
        rows = [r + [""] * (width - len(r)) for r in rows]
    return rows, i


def build(md_path, docx_path):
    lines = Path(md_path).read_text(encoding="utf-8").splitlines()
    base = Path(md_path).parent
    doc = Document()

    # ---- page setup
    section = doc.sections[0]
    section.page_width, section.page_height = Cm(21), Cm(29.7)
    for attr in ("top_margin", "bottom_margin"):
        setattr(section, attr, Cm(2.2))
    for attr in ("left_margin", "right_margin"):
        setattr(section, attr, Cm(2.5))

    # ---- base styles
    normal = doc.styles["Normal"]
    normal.font.name = BODY_FONT
    normal.font.size = Pt(11)
    normal.paragraph_format.space_after = Pt(6)
    normal.paragraph_format.line_spacing = 1.15

    for name, size, color in (("Heading 1", 16, BRAND), ("Heading 2", 13, BRAND),
                              ("Heading 3", 11.5, BRAND), ("Heading 4", 11, ACCENT)):
        style = doc.styles[name]
        style.font.name = HEAD_FONT
        style.font.size = Pt(size)
        style.font.bold = True
        style.font.color.rgb = color
        style.paragraph_format.space_before = Pt(14 if name == "Heading 1" else 10)
        style.paragraph_format.space_after = Pt(6)
        style.paragraph_format.keep_with_next = True

    # ---- footer with page number
    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = footer.add_run("SRS Vita Travel  |  Halaman ")
    run.font.size = Pt(8)
    run.font.color.rgb = GREY
    field(footer, " PAGE ")
    for r in footer.runs:
        r.font.size = Pt(8)
        r.font.color.rgb = GREY

    # ---- cover: everything before the first horizontal rule
    first_rule = next((i for i, l in enumerate(lines) if l.strip() == "---"), 6)
    cover_done = False
    i = 0
    while i <= first_rule:
        line = lines[i].rstrip()
        if line.startswith("# "):
            para = doc.add_paragraph()
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            para.paragraph_format.space_before = Pt(40 if i < 4 else 4)
            para.paragraph_format.space_after = Pt(2)
            text = line[2:].strip()
            run = para.add_run(text)
            run.font.name = HEAD_FONT
            run.font.bold = True
            run.font.color.rgb = BRAND
            run.font.size = Pt(22 if "SOFTWARE" in text else 28)
        elif line.startswith("## "):
            para = doc.add_paragraph()
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            para.paragraph_format.space_after = Pt(24)
            run = para.add_run(line[3:].strip())
            run.font.name = HEAD_FONT
            run.font.size = Pt(13)
            run.font.color.rgb = ACCENT
        i += 1

    # identity table on the cover
    while i < len(lines) and not lines[i].strip().startswith("|"):
        i += 1
    if i < len(lines):
        rows, i = parse_table(lines, i)
        add_table(doc, rows)

    # table of contents
    doc.add_page_break()
    h = doc.add_paragraph()
    run = h.add_run("DAFTAR ISI")
    run.font.name = HEAD_FONT
    run.font.size = Pt(16)
    run.font.bold = True
    run.font.color.rgb = BRAND
    note = doc.add_paragraph()
    r = note.add_run("Klik kanan pada daftar di bawah lalu pilih Update Field agar nomor halaman terisi.")
    r.italic = True
    r.font.size = Pt(9)
    r.font.color.rgb = GREY
    toc = doc.add_paragraph()
    field(toc, r' TOC \o "1-3" \h \z \u ')
    doc.add_page_break()

    # ---- body
    images = 0
    while i < len(lines):
        raw = lines[i]
        line = raw.rstrip()
        stripped = line.strip()

        # image
        match = re.match(r"^!\[([^\]]*)\]\(([^)]+)\)", stripped)
        if match:
            path = base / match.group(2)
            if path.exists():
                add_image(doc, path, match.group(1))
                images += 1
            else:
                doc.add_paragraph(f"[gambar tidak ditemukan: {match.group(2)}]")
            i += 1
            continue

        # code fence
        if stripped.startswith("```"):
            block, j = [], i + 1
            while j < len(lines) and not lines[j].strip().startswith("```"):
                block.append(lines[j])
                j += 1
            add_code_block(doc, block)
            i = j + 1
            continue

        # table
        if stripped.startswith("|"):
            rows, j = parse_table(lines, i)
            add_table(doc, rows)
            i = j
            continue

        # horizontal rule
        if stripped == "---":
            para = doc.add_paragraph()
            para.paragraph_format.space_before = Pt(4)
            para.paragraph_format.space_after = Pt(4)
            pPr = para._p.get_or_add_pPr()
            borders = OxmlElement("w:pBdr")
            bottom = OxmlElement("w:bottom")
            bottom.set(qn("w:val"), "single")
            bottom.set(qn("w:sz"), "6")
            bottom.set(qn("w:color"), "BFCBD0")
            borders.append(bottom)
            pPr.append(borders)
            i += 1
            continue

        # headings
        heading = re.match(r"^(#{1,4})\s+(.*)$", stripped)
        if heading:
            level = len(heading.group(1))
            para = doc.add_heading(level=level)
            add_runs(para, heading.group(2))
            for r in para.runs:
                r.font.name = HEAD_FONT
                r.font.bold = True
            i += 1
            continue

        # blockquote
        if stripped.startswith(">"):
            para = doc.add_paragraph()
            para.paragraph_format.left_indent = Cm(0.6)
            add_runs(para, stripped.lstrip("> ").strip(), base_size=10, base_color=GREY)
            for r in para.runs:
                r.italic = True
            i += 1
            continue

        # bullets
        bullet = re.match(r"^(\s*)[-*]\s+(.*)$", raw)
        if bullet:
            indent = len(bullet.group(1)) // 2
            para = doc.add_paragraph(style="List Bullet" if indent == 0 else "List Bullet 2")
            para.paragraph_format.space_after = Pt(3)
            add_runs(para, bullet.group(2))
            i += 1
            continue

        # numbered
        numbered = re.match(r"^(\s*)\d+\.\s+(.*)$", raw)
        if numbered:
            indent = len(numbered.group(1)) // 2
            para = doc.add_paragraph(style="List Number" if indent == 0 else "List Number 2")
            para.paragraph_format.space_after = Pt(3)
            add_runs(para, numbered.group(2))
            i += 1
            continue

        # blank
        if not stripped:
            i += 1
            continue

        # ordinary paragraph
        para = doc.add_paragraph()
        para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        add_runs(para, stripped)
        i += 1

    doc.save(docx_path)
    return images


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    count = build(src, dst)
    size = Path(dst).stat().st_size / 1024
    print(f"Selesai: {dst}")
    print(f"  {count} gambar tertanam, ukuran berkas {size:.0f} KB")
