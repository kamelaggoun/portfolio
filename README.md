# Kamel Aggoun — Data Analyst Portfolio

**Live site:** [kamelaggoun.github.io/portfolio](https://kamelaggoun.github.io/portfolio/)

Personal portfolio site for **Kamel Aggoun**, a data analyst working in **Python, SQL, Excel, and Power BI**. Presents six end-to-end analytics projects — from a defined business question through data cleaning, analysis, and a Power BI dashboard — plus experience, education, and certifications.

---

## Projects featured

| Project | Focus | Repo |
|---|---|---|
| HR Analytics | Employee attrition, 1,470 records, 65 cross-validated SQL queries | [hr-analytics](https://github.com/kamelaggoun/hr-analytics) |
| Customer Segmentation | RFM segmentation on 1.07M transaction lines | [customer-segmentation](https://github.com/kamelaggoun/customer-segmentation) |
| Sales Forecasting | Time-series forecasting, 1M+ records, chronological validation | [sales-forecasting](https://github.com/kamelaggoun/sales-forecasting) |
| SQL Business Analysis | Advanced SQL — CTEs, window functions, cohort/LTV analysis | [sql-business-analysis](https://github.com/kamelaggoun/sql-business-analysis) |
| Financial Performance Analysis | Revenue, cost, and margin analysis with SQL window functions | [financial-performance-analysis](https://github.com/kamelaggoun/financial-performance-analysis) |
| Supply Chain & Inventory Analytics | Inventory, demand, and logistics KPIs | [supply-chain-inventory-analytics](https://github.com/kamelaggoun/supply-chain-inventory-analytics) |

Each project's own repo has the full write-up: business problem, dataset, methodology, SQL/Python cross-validation, and findings. This site is the front door to that work.

---

## Built with

- **HTML5, CSS3, vanilla JavaScript** — no framework, no build step
- **Google Fonts** — Inter & JetBrains Mono
- **GitHub Pages** — static hosting, no backend

## Features

- Responsive, mobile-first layout
- Dark / light mode, respects OS preference, persisted across visits
- Filterable project cards by technology (Python, SQL, Power BI, Excel)
- Fully accessible — semantic HTML, keyboard focus states, skip link, `prefers-reduced-motion` support
- SEO-ready — meta description, Open Graph tags, JSON-LD, `robots.txt`, `sitemap.xml`

## Structure

```
/
├── index.html            # The full single-page site
├── README.md             # This file
├── LICENSE               # MIT license
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── images/           # Project screenshots + Open Graph image
│   ├── icons/             # Favicon
│   └── cv/                # Kamel-Aggoun-CV.pdf
├── css/
│   └── style.css
└── js/
    └── script.js
```

## Running locally

```bash
git clone https://github.com/kamelaggoun/portfolio.git
cd portfolio
python3 -m http.server 8000
# visit http://localhost:8000
```

## Contact

- Email — kamel9aggoun@gmail.com
- LinkedIn — [linkedin.com/in/kamelaggoun](https://www.linkedin.com/in/kamelaggoun)
- GitHub — [github.com/kamelaggoun](https://github.com/kamelaggoun)

## License

MIT — see [LICENSE](LICENSE).
