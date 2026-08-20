from pypdf import PdfReader

try:
    reader = PdfReader("Ddd Mongo Practical Example.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    with open("pdf_content_utf8.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Done writing to pdf_content_utf8.txt")
except Exception as e:
    print(f"Error: {e}")
