# Evidencing LLM Misuse — KDD 2026 Hands-on Tutorial

Website for the ACM SIGKDD 2026 hands-on tutorial **“Evidencing LLM Misuse: A Hands-on Forensic
Tutorial on Copyright Infringement and Plagiarism Detection.”**

🗓️ **Wed, Aug 12, 2026 · 1:30–4:30 PM** &nbsp;·&nbsp; 📍 **ICC Jeju, South Korea**

## Tutors
- **Denghui Zhang** — Assistant Professor, Stevens Institute of Technology *(corresponding)*
- **Guangwei Zhang** — Algorithm Engineer, Pine AI
- **Dongwon Lee** — Professor, The Pennsylvania State University

## Tech
A fully static site — no build step, no dependencies.

```
index.html              # page content
assets/css/styles.css   # design system + components (light & dark themes)
assets/js/main.js        # theme toggle, scroll-spy, reveal animations, copy-BibTeX
```

## Run locally
Just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy (GitHub Pages)
Push to GitHub and enable **Settings → Pages → Deploy from branch → `main` / root**.
The included `.nojekyll` file tells Pages to serve the files as-is.

## Editing tips
- **Slides / proposal / plagiarism materials**: update the `href`s in the *Materials* section of
  `index.html`. To host PDFs in this repo, drop them in `assets/` and point the links there.
- **Schedule** times are marked *tentative* — edit the `.timeline` list in `index.html`.
- **Colors / fonts**: tweak the CSS custom properties at the top of `assets/css/styles.css`.

## References
1. Zhang, G., et al. (2026). *Copyright Detective: A Forensic System to Evidence LLMs Flickering
   Copyright Leakage Risks.* arXiv:2602.05252. <https://arxiv.org/abs/2602.05252>
2. Lee, J., Le, T., Chen, J., & Lee, D. (2023). *Do Language Models Plagiarize?* WWW '23, 3637–3647.
   <https://doi.org/10.1145/3543507.3583199>
