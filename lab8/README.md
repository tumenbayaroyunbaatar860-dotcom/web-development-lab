# Лаборатори 8: Bootstrap ба Tailwind CSS – Нэг хуудас, хоёр арга

Энэхүү ажилд **Лаб 6**-д бүтээсэн бугуйн цагны зургийн цомгийн хуудсыг **Bootstrap 5** болон **Tailwind CSS v4** гэсэн хоёр өөр арга барилаар бүрэн хэрэгжүүлж, файлын хэмжээ, картын class тоо, Lighthouse үзүүлэлтүүдээр харьцуулан үнэлгээ өглөө.

---

## 1. Төслийн бүтэц

```text
lab8/
├── bootstrap/
│   ├── img/                  # Зургийн файлууд (photo1-6, poster)
│   ├── video/                # Видео болон .vtt хадмал
│   └── index.html            # Bootstrap 5 CDN, navbar, 3-col grid, form validation, dark mode
├── tailwind/
│   ├── img/                  # Зургийн файлууд
│   ├── video/                # Видео болон .vtt хадмал
│   ├── input.css             # Tailwind эх CSS (@theme, @custom-variant dark)
│   ├── output.css            # CLI-аар build хийсэн minified CSS (~16 KB)
│   └── index.html            # Tailwind CSS бүтэцтэй хуудас
├── analyze.py                # Файлын хэмжээ, картын class тоог нарийвчлан тооцоолох скрипт
└── README.md                 # Харьцуулсан тайлан, хүснэгт, дүгнэлт
```

---

## 2. Даалгаврын шаардлагуудын биелэлт

| № | Шаардлага | Bootstrap хэрэгжүүлэлт | Tailwind CSS хэрэгжүүлэлт | Төлөв |
|---|---|---|---|:---:|
| 1 | **Navbar, 3 баганатай grid, Form validation** | Bootstrap `.navbar` + `.navbar-toggler`, `.row-cols-lg-3` card grid, `.needs-validation` form | Tailwind Flex navbar, `grid lg:grid-cols-3` card grid, custom JS validation | Бүрэн биелсэн |
| 2 | **CDN vs CLI Build** | Bootstrap 5.3.3 + Icons CDN холболттой | `@tailwindcss/cli` (v4.3.4)-аар `output.css` болгон build хийсэн | Бүрэн биелсэн |
| 3 | **Dark mode горим** | `data-bs-theme="dark"` аттрибутаар шилжинэ | `@custom-variant dark (&:where(.dark, .dark *))` тодорхойлж, `.dark` class-аар шилжинэ | Бүрэн биелсэн |
| 4 | **Brand өнгө тодорхойлох** | CSS хувьсагч `--color-brand` болон `.btn-brand` class үүсгэсэн | `input.css` дотор `@theme { --color-brand: #c9a24d; }` тодорхойлж ашигласан | Бүрэн биелсэн |
| 5 | **Хэмжилт, хүснэгт, дүгнэлт** | Файлын хэмжээ, class тоо, Lighthouse оноог нарийвчлан хэмжиж хүснэгтэд оруулав | Нэг догол мөр дүгнэлтийг доор нэгтгэн бичив | Бүрэн биелсэн |

---

## 3. Харьцуулсан хүснэгт (Хэмжилтийн үр дүн)

| Үзүүлэлт | Bootstrap 5 (CDN) | Tailwind CSS v4 (CLI build) | Ялгаа ба тайлбар |
|---|:---:|:---:|---|
| **HTML файлын хэмжээ** | 19.3 KB (19,760 bytes) | 19.7 KB (20,196 bytes) | Бараг ижил (+0.4 KB Tailwind class-уудын уртаас шалтгаалсан) |
| **CSS файлын хэмжээ** | ~232.8 KB (Bootstrap min) + ~85.9 KB (Icons) = **~318.7 KB** | **15.9 KB** (16,298 bytes, output.css) | **Tailwind 95%-иар бага** (Зөвхөн ашигласан классууд л үлдэх тул маш авсаархан) |
| **JS файлын хэмжээ** | 80.7 KB (bootstrap.bundle.min.js) | 0 KB гадаад (1.2 KB цэвэр JS) | Bootstrap-д modal, dropdown, collapse зэрэгт тусдаа багц хэрэгтэй |
| **Гадаад сүлжээний хүсэлт** | 3 хүсэлт (jsdelivr CDN) | **0 хүсэлт** (Бүх CSS орон нутагт үүссэн) | Tailwind офлайн болон бага дататай үед шууд ажиллана |
| **Нэг картын нийт class тоо** | **24** class | **39** class | Bootstrap бэлэн бүрэлдэхүүн ашигладаг тул бага, Tailwind utility тус бүрийг бичдэг тул их |
| **Нэг картын ялгаатай class тоо** | **15** class | **25** class | Tailwind-д layout, spacing, colors тус бүр class болдог |
| **Картын үндсэн `div`-ийн class тоо** | **4** (`card h-100 shadow-sm border-0`) | **7** (`overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:-translate-y-1 dark:bg-gray-900`) | Tailwind-д дугуйралт, сүүдэр, дэвсгэр, hover, dark mode бүгд салангид |
| **Lighthouse: Performance** | **93** / 100 | **99** / 100 | Tailwind-ийн 16 KB жижиг CSS, гадаад CDN сааталгүй нь илүү хурдан ачаална |
| **Lighthouse: Accessibility** | **100** / 100 | **100** / 100 | Хоёр хувилбарт semantic хаягууд, тодосгогч өнгө, ARIA тэмдэглэгээ бүрэн хангагдсан |
| **Lighthouse: Best Practices** | **100** / 100 | **100** / 100 | Аюулгүй байдал, зөв meta, орчин үеийн стандартыг бүрэн хангасан |
| **Lighthouse: SEO** | **100** / 100 | **100** / 100 | Meta description, гарчиг, хариу үйлдэлтэй viewport бүрэн тохирсон |

---

## 4. Дүгнэлт (Нэг догол мөр)

> **Дүгнэлт:** Bootstrap 5 нь бэлэн бүрэлдэхүүн (components), бага тооны class болон хурдан прототип хийхэд нэн тохиромжтой боловч шаардлагагүй бүх загварыг агуулсан 300+ KB хэмжээтэй том санг ачаалладаг сул талтай бол; Tailwind CSS v4 нь HTML дотор олон тооны utility class бичих шаарддаг ч `@tailwindcss/cli`-ийн дэвшилтэт сканнерийн ачаар эцсийн CSS файлын хэмжээг ердөө 15.9 KB хүртэл 95 хувиар эрс багасгаж, 0 гадаад хамааралтайгаар Lighthouse Performance оноог 99 хүргэн, брэнд өнгө болон dark mode-ийг илүү уян хатан, нарийвчлалтай удирдах боломжийг олгож байна.

---

## 5. Туршиж ажиллуулах заавар

1. **Bootstrap хувилбарыг үзэх:**
   `lab8/bootstrap/index.html` файлыг хөтөч дээр шууд нээнэ.
2. **Tailwind хувилбарыг үзэх:**
   `lab8/tailwind/index.html` файлыг хөтөч дээр шууд нээнэ.
3. **Tailwind CSS-ийг дахин build хийх (хүсвэл):**
   ```powershell
   cd "lab8/tailwind"
   tailwindcss -i input.css -o output.css --minify
   ```
4. **Хэмжилтийн тооцоог дахин гүйцэтгэх:**
   ```powershell
   cd "lab8"
   python analyze.py
   ```
