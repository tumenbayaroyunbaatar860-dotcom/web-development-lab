import os
import re

bs_html = r"c:\Users\admin\OneDrive\Documents - Copy\web-development-lab\lab8\bootstrap\index.html"
tw_html = r"c:\Users\admin\OneDrive\Documents - Copy\web-development-lab\lab8\tailwind\index.html"
tw_css  = r"c:\Users\admin\OneDrive\Documents - Copy\web-development-lab\lab8\tailwind\output.css"

def get_file_size(path):
    return os.path.getsize(path)

def analyze_card(html_path):
    with open(html_path, "r", encoding="utf-8") as f:
        text = f.read()

    match = re.search(r"<!-- Card 1 -->(.*?)<!-- Card 2 -->", text, re.DOTALL)
    if not match:
        return {}
    card_snippet = match.group(1).strip()
    
    # Class attributes
    class_attrs = re.findall(r'class="([^"]+)"', card_snippet)
    all_classes = []
    for c in class_attrs:
        all_classes.extend(c.split())
    
    # The main card container
    # For bootstrap, div.col or div.card:
    # <div class="card h-100 shadow-sm border-0"> has 4 classes
    # For tailwind:
    # <div class="overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:-translate-y-1 dark:bg-gray-900"> has 7 classes
    
    return {
        "snippet": card_snippet,
        "class_attrs_count": len(class_attrs),
        "total_classes": len(all_classes),
        "unique_classes": len(set(all_classes)),
        "all_classes": all_classes
    }

bs_card = analyze_card(bs_html)
tw_card = analyze_card(tw_html)

print("=== FILE SIZES ===")
print("Bootstrap index.html:", get_file_size(bs_html), "bytes (~", round(get_file_size(bs_html)/1024, 2), "KB)")
print("Bootstrap CDN CSS (bootstrap.min.css): ~232 KB (network transfer ~34 KB gzipped)")
print("Bootstrap CDN JS (bootstrap.bundle.min.js): ~80 KB (network transfer ~28 KB gzipped)")
print("Bootstrap Icons CSS: ~85 KB")
print()
print("Tailwind index.html:", get_file_size(tw_html), "bytes (~", round(get_file_size(tw_html)/1024, 2), "KB)")
print("Tailwind output.css (compiled & minified):", get_file_size(tw_css), "bytes (~", round(get_file_size(tw_css)/1024, 2), "KB)")
print()
print("=== CARD CLASSES ===")
print("Bootstrap Card 1 total classes on elements:", bs_card["total_classes"])
print("Bootstrap Card 1 unique classes:", bs_card["unique_classes"])
print("Bootstrap Card 1 class list:", bs_card["all_classes"])
print()
print("Tailwind Card 1 total classes on elements:", tw_card["total_classes"])
print("Tailwind Card 1 unique classes:", tw_card["unique_classes"])
print("Tailwind Card 1 class list:", tw_card["all_classes"])
