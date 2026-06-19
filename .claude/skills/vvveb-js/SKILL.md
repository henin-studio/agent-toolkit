---
name: vvveb-js
description: Use when building drag-and-drop page builders, WYSIWYG editors, or visual HTML composition tools. VvvebJs is a vanilla JS page builder library with zero dependencies, Bootstrap 5 components, undo/redo, live code editing, and ZIP export.
origin: VvvebJs
---

# VvvebJs

> Source: VvvebJs (v2.0.6) by givanz | License: Apache 2.0 | 8.5k ⭐

Drag-and-drop page builder library written in vanilla JavaScript with zero external dependencies. Creates WYSIWYG web page editors with Bootstrap 5 components, live code editing, and full export capabilities.

## When to Activate

- Building a drag-and-drop page builder or visual editor
- Creating a WYSIWYG HTML editor with Bootstrap 5 support
- Implementing a landing page builder or email template editor
- Adding visual editing capabilities to a web application
- Creating a CMS or website builder with live preview
- Building a newsletter/campaign builder with component drag-and-drop

## Installation

### Local / Git Clone

```bash
git clone --recurse-submodules https://github.com/givanz/VvvebJs.git
# Open editor.html through a web server
```

### Docker

```bash
docker run -p 8080:80 vvveb/vvvebjs
# Open http://localhost:8080/editor.php
```

### Node.js (for save functionality)

```bash
npm install express
node save.js
# Starts Express on port 8080 with POST /save.php endpoint
```

### PHP (for save + upload + scan)

Use `save.php`, `upload.php`, and `scan.php` from the repository.

### Minimal Initialization

```html
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="libs/builder/builder.js"></script>
<script src="libs/builder/undo.js"></script>
<script src="libs/builder/inputs.js"></script>
<script src="libs/builder/components-bootstrap5.js"></script>
<script src="libs/builder/components-widgets.js"></script>

<script>
let pages = [
  {name:"my-page", title:"My Page",
   url: "demo/my-page/index.html",
   file: "demo/my-page/index.html"},
];

Vvveb.Builder.init(pages[0]["url"], function() {
  // callback after page loads
});
Vvveb.Gui.init();
Vvveb.FileManager.init();
Vvveb.SectionList.init();
Vvveb.Breadcrumb.init();
Vvveb.FileManager.addPages(pages);
Vvveb.FileManager.loadPage(pages[0]["name"]);
</script>
```

## Core API

### Builder

```js
// Initialize with page URL
Vvveb.Builder.init(url, callback);

// Load a different page
Vvveb.Builder.loadUrl(url, callback);

// Get clean HTML (strips editor attributes)
let html = Vvveb.Builder.getHtml(true, true);

// Set HTML content
Vvveb.Builder.setHtml(html);

// Select a DOM node
Vvveb.Builder.selectNode(node);

// Load component for selected node
Vvveb.Builder.loadNodeComponent(node);

// Clone, move, delete
Vvveb.Builder.cloneNode(node);
Vvveb.Builder.moveNodeUp(node);
Vvveb.Builder.moveNodeDown(node);

// Designer mode (free-position dragging)
Vvveb.Builder.setDesignerMode(true);

// Save via AJAX
Vvveb.Builder.saveAjax(data, saveUrl, callback, error);
```

### GUI Actions

```js
Vvveb.Gui.undo();               // Undo last action
Vvveb.Gui.redo();               // Redo last undone action
Vvveb.Gui.save();               // Save current page
Vvveb.Gui.saveAjax();           // Save via AJAX
Vvveb.Gui.download();           // Download HTML (or ZIP if plugin loaded)
Vvveb.Gui.preview();            // Preview in new tab
Vvveb.Gui.fullscreen();         // Toggle fullscreen
Vvveb.Gui.toggleEditor();       // Toggle code editor
Vvveb.Gui.toggleLeftColumn();   // Toggle left panel
Vvveb.Gui.toggleRightColumn();  // Toggle right panel
Vvveb.Gui.viewport('md');       // Responsive preview (sm/md/lg/xl/xxl)
Vvveb.Gui.darkMode();           // Toggle dark/light theme
Vvveb.Gui.newPage();            // New page dialog
Vvveb.Gui.newSection();          // New section dialog
Vvveb.Gui.search('query');      // Search components/blocks/sections
```

### Component System

```js
// Add a custom component
Vvveb.Components.add("my-group/my-component", {
    name: "My Component",
    nodes: ["div"],                    // Auto-match by tag
    classes: ["my-class"],             // Auto-match by CSS class
    attributes: ["data-my-attr"],      // Auto-match by attribute
    image: "icons/my-component.svg",  // Icon in panel
    html: '<div class="my-class">Default content</div>',
    resizable: true,
    resizeMode: "css",                  // "css" or "attribute"
    properties: [
        {
            name: "Text Content",
            key: "textContent",
            htmlAttr: "innerText",
            inputtype: TextInput,
            section: "content"
        },
        {
            name: "Background Color",
            key: "backgroundColor",
            htmlAttr: "style",
            inputtype: ColorInput,
            section: "style"
        },
        {
            name: "Link URL",
            key: "href",
            htmlAttr: "href",
            child: "a",               // Target child element
            inputtype: TextInput,
            section: "content"
        }
    ],
    onChange: function(element, property, value, input) {
        // Called after any property change
    },
    afterDrop: function(node) {
        // Called after element is dropped on canvas
    }
});

// Extend an existing component
Vvveb.Components.extend("_base", "my-group/enhanced", {
    name: "Enhanced Base",
    properties: [
        // Additional properties merged after inherited ones
    ]
});

// Register in a group
Vvveb.ComponentsGroup['My Group'] = ["my-group/my-component", "my-group/enhanced"];
```

### Sections and Blocks

```js
// Add a section (page-level block)
Vvveb.Sections.add("my-group/hero", {
    name: "Hero Section",
    image: "img/sections/hero.jpg",
    html: '<section class="hero">...</section>'
});

// Add a block (reusable component group)
Vvveb.Blocks.add("my-group/pricing", {
    name: "Pricing Card",
    image: "img/blocks/pricing.jpg",
    html: '<div class="card pricing-card">...</div>'
});

// Register in groups
Vvveb.SectionsGroup['My Sections'] = ["my-group/hero"];
Vvveb.BlocksGroup['My Blocks'] = ["my-group/pricing"];
```

### Input Types

| Type | Usage |
|------|-------|
| `TextInput` | Single-line text |
| `TextareaInput` | Multi-line text |
| `CheckboxInput` | Boolean toggle |
| `SelectInput` | Dropdown select |
| `RadioButtonInput` | Radio button group |
| `RangeInput` | Slider with min/max |
| `ColorInput` | Color picker |
| `ImageInput` | Image selector with upload |
| `VideoInput` | Video selector |
| `SvgInput` | SVG icon selector |
| `SectionInput` | Property section header |
| `TagsInput` | Tag/multi-value input |
| `CssUnitInput` | CSS value with unit selector |
| `HtmlListSelectInput` | HTML list selector |
| `ButtonInput` | Action button |

### Undo/Redo

```js
// Track mutations
Vvveb.Undo.addMutation(mutation);

// Undo/redo
Vvveb.Undo.undo();
Vvveb.Undo.redo();
Vvveb.Undo.reset();

// Check for changes
let hasChanges = Vvveb.Undo.hasChanges();
```

### Style Management

```js
// Responsive breakpoints
Vvveb.StyleManager.breakpoints = {
    sm: 575.98, md: 767.98, lg: 991.98,
    xl: 1199.98, xxl: 1399.98
};

// Set/get styles
Vvveb.StyleManager.setStyle(element, 'color', 'red');
let color = Vvveb.StyleManager.getStyle(element, 'color');

// Get/set full CSS
let css = Vvveb.StyleManager.getCss();
Vvveb.StyleManager.setCss(css);
let generated = Vvveb.StyleManager.generateCss();
```

### File Manager

```js
Vvveb.FileManager.init();
Vvveb.FileManager.addPage(name, data);
Vvveb.FileManager.addPages(pages);
Vvveb.FileManager.loadPage(name);
Vvveb.FileManager.getCurrentPage();
Vvveb.FileManager.deletePage();
Vvveb.FileManager.renamePage(name);
```

## Plugins

### CodeMirror (Live Code Editor)

```html
<script src="libs/builder/plugin-codemirror.js"></script>
```

Enables syntax-highlighted HTML/CSS editing with bidirectional sync to visual canvas.

### JSZip (ZIP Export)

```html
<script src="libs/builder/plugin-jszip.js"></script>
```

Overrides `Vvveb.Gui.download()` to produce a ZIP file with all assets bundled. External assets keep absolute URLs; local assets are rebundled with relative paths.

### AI Assistant (OpenAI)

```html
<script src="libs/builder/plugin-ai-assistant.js"></script>
```

Integrates OpenAI Completions API for generating HTML from text prompts. Can insert or replace element content.

### Google Fonts

```html
<script src="libs/builder/plugin-google-fonts.js"></script>
```

Loads the full Google Fonts catalog from `resources/google-fonts.json` and dynamically injects `<link>` tags.

### Animate on Scroll (AOS)

```html
<script src="libs/builder/plugin-aos.js"></script>
```

Adds AOS animation properties (type, duration, delay) to any element's advanced section.

### Media Gallery

```html
<script src="libs/builder/plugin-media.js"></script>
```

Overrides `ImageInput` with a media modal supporting CC0 image search and server upload.

## Save Mechanisms

| Method | Endpoint | Description |
|--------|----------|-------------|
| PHP save | POST `save.php` | `file` + `html` params. Actions: save, delete, rename, saveReusable, oembedProxy |
| Node.js save | POST `/save.php` | Express server on port 8080. Same params as PHP |
| HTML download | Browser | `data:application/octet-stream` URI from `getHtml()` |
| ZIP export | Browser | JSZip bundles all assets into self-contained ZIP |

## Custom Events

| Event | When |
|-------|------|
| `vvveb.iframe.loaded` | Iframe finished loading |
| `vvveb.Builder.selectNode` | Element selected |
| `vvveb.Builder.saveAjax` | After successful save |
| `vvveb.undo.add` / `vvveb.undo.restore` | Undo/redo on `frameBody` |
| `vvveb.getHtml.before` / `vvveb.getHtml.after` | HTML export hooks |
| `vvveb.getHtml.filter` | Filter HTML before export |
| `vvveb.ModalCodeEditor.save` | Modal code editor save |
| `vvveb.StyleManager.setStyle` | CSS style changed |
| `vvveb.FileManager.loadPage` / `addPage` / `deletePage` / `renamePage` | File manager actions |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Redo |
| `Ctrl+Shift+L` | Toggle tree list |
| `Ctrl+E` | Toggle editor |
| `Ctrl+Shift+P` | New page |
| `Ctrl+Shift+S` | New section |

## Theming

- **Dark/Light mode**: `Vvveb.Gui.darkMode()` toggles `data-bs-theme` on `<html>`
- **CSS Variables**: `Vvveb.ColorPaletteManager` scans `--bs-*` variables and categorizes as color/font/dimensions
- **Section theming**: Background (image/video/YouTube + parallax), overlay, top/bottom SVG separators
- **Typography**: 15 web-safe fonts + full Google Fonts catalog with dynamic `<link>` injection

## Focus Areas

- Zero-dependency vanilla JS page builder integration
- Custom component system with auto-matching and property panels
- Responsive editing with breakpoint preview
- Plugin architecture (CodeMirror, JSZip, AI, Google Fonts, AOS)
- Save mechanisms (PHP, Node.js, HTML download, ZIP export)
- Undo/redo mutation tracking with full history

## Related

- Skill: `frontend-patterns` — React/Next.js patterns
- Skill: `frontend-design-direction` — Design direction for new UI projects
- Skill: `api-design` — REST API patterns
- Repo: `03-CONTENT-GENERATION/VvvebJs/` — Full source code