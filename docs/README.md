# Personal Website Mockup

A small Jekyll site for GitHub Pages. All page content lives in **index.md**.
The design comparison is local work in progress; nothing has been published.

## Edit Content

Open `index.md` in any text editor or GitHub's editor. The header between the
first two `---` lines selects the page template and lists the selected papers.
Keep the `---` lines and `layout: default` in place.

- Keep the biography before `## Research`. You can wrap its source across several
  lines; a blank line starts a new paragraph with a small gap above it.
- Use `##` for sections, `###` for research categories, and `####` for paper titles.
- Use Title Case for section and category headings.
- Under `## Research`, `###` headings group papers by topic in the All Papers view.
- To add a paper, copy one of the existing entries and edit it.
- Two spaces at the end of the author line put the venue on the next line.
- Put supplemental notes in a separate paragraph after the authors and venue.
  These extra paragraphs appear only in the All Papers view.
- To add a section such as Teaching, put `## Teaching` and its content anywhere
  after Research. It inherits the same typography and spacing.

Example paper entry:

```markdown
#### [Paper Title](https://example.org/paper.pdf)

With First Author and Second Author  
*Full Conference Name (Acronym) · 2027*

Optional supplemental note, shown only with All Papers.
```

For an unlinked paper, just write `#### Paper Title`.
All 13 current papers link directly to arXiv PDFs, including the two November 2026
preprints. Use the `/pdf/` form for future arXiv links.

## Selected and All Papers

The default Selected Papers view shows four papers without topic headings or
supplemental notes. The single Show All Papers button switches to all 13 papers,
with topic headings and complete notes; Show Selected Papers switches back.

Edit the shortlist in the `selected_papers` list at the top of `index.md`:

```yaml
selected_papers:
  - agnostic-learning-by-imitating
  - universal-hardness-from-masking-channels
  - efficient-and-private-property-testing-via-indistinguishability
  - differentially-private-learning-beyond-the-classical-dimensionality-regime
```

Each value is the paper heading's generated HTML ID. For example, `#### Paper Title`
has the ID `paper-title`. If you rename a selected paper, update its ID in this list.
The list controls membership; display order follows the topics and paper order
in the Markdown source, regardless of the list's order.

The page template `_includes/page-content.html` generates one complete list of
`article` elements, marking shortlist membership with `data-selected`.
`assets/research.js` switches views without duplicating paper content. A direct
link to an unselected paper or topic opens All Papers automatically. Adding
`?papers=all` to the page URL opens that view directly. With JavaScript disabled,
all papers and notes remain visible.

## Design Defaults

The page uses a fixed top profile. The design controls at `/?preview=1` let you
compare accent colors and fonts. They change only the current preview URL;
they do not save changes to source files. Set the defaults in `_config.yml`:

```yaml
accent: blue  # blue or forest
font: system
```

Available font values:

| Value | Font |
| --- | --- |
| `system` | System Sans, the default |
| `garamond` | EB Garamond |

The layout template is `_layouts/default.html`. Spacing, colors, and font choices
are in `assets/styles.css`. System Sans uses fonts on the visitor's
device; EB Garamond is self-hosted in `assets/fonts/`.
There are no external font requests or JavaScript
frameworks. Preview controls are in `assets/preview.css` and `assets/preview.js`.

Identity and contact details are in `_config.yml`. `name` controls the heading;
`footer_name` is currently `Pranay Bennett Tankala`. A new Markdown section gets
an automatic anchor, so `## Teaching` can be linked with `#teaching`.

## Photo and Optional CV

The current photo was downloaded from `https://pbt17.github.io/assets/img/logo.png`
and saved as `assets/photo.png`. To change it, replace that file or update
`photo_url` in `_config.yml`. Leave `photo_url` empty to show the placeholder.

To include a CV later, add the intended public PDF to `assets/cv.pdf`, then set
`cv_url: "/assets/cv.pdf"`. Leave the value empty to omit the link. No CV or
research statement has been copied into this site.

## Preview Locally

On this Mac, Ruby and the required gems are already installed. Open Terminal and
run these two lines. The explicit Ruby path avoids macOS's older system Ruby:

```sh
cd "/Users/pbt/Documents/ChatGPT/Personal Website/mockup"
PATH="$HOME/.rubies/ruby-3.4.1/bin:$PATH" bundle exec jekyll serve --host 127.0.0.1 --port 4174
```

Open `http://127.0.0.1:4174/` for the normal page, or
`http://127.0.0.1:4174/?preview=1` for design controls. Port 4174 keeps this
independent of the existing assistant-started preview on port 4173.

Leave Terminal running while you edit. Jekyll rebuilds when you save `index.md`;
refresh the browser to see the changes. Press **Control-C** in Terminal to stop.
After changing `_config.yml`, stop and rerun the second command. These commands
preview only on your own computer; they do not publish anything.

Edit the source files in `mockup`, not the generated copies in `_site`.
For setup on another computer, install a compatible Ruby and Bundler, run
`bundle install` in this directory, then use `bundle exec jekyll serve`.

## GitHub Pages, When the Design Is Ready

These are standard Jekyll source files compatible with GitHub Pages. The intended
user-site URL is `https://pbt17.github.io`, with an empty `baseurl`.
Keep the existing repository history and preserve any existing public files and
URLs when integrating this mockup. Do not upload `_site/`, screenshots, or private
application documents. Inspect the repository's existing Pages settings before
choosing its build and deployment configuration.

[GitHub's Jekyll setup documentation](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll).
