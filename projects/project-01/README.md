# 📊 E-Commerce Sales Analysis

**End-to-end business analytics project: raw data → cleaning → EDA → SQL → Power BI → insights.**

A 4-year, multi-category US retail dataset (9,993 line items · 5,009 orders · 793 customers ·
1,862 products) analysed with **Python · Pandas · SQL · Power BI** to answer a specific business
question: *where is revenue growing, and where is profit leaking?*

| 🟦 Total Revenue | 🟩 Total Profit | 🟨 Total Orders | 🟦 Avg Order Value | 🟩 Profit Margin |
|---|---|---|---|---|
| **$2,296,919** | **$286,409** | **5,009** | **$458.56** | **12.47%** |

```
═══════════════════════════════════════════════════════════════════════════════
 ✔  Data cleaning pipeline   ✔  65 SQL queries cross-validated vs Python
 ✔  12 business-driven charts   ✔  3-page Power BI dashboard (build kit)
 ✔  Every metric computed from the dataset — nothing invented
═══════════════════════════════════════════════════════════════════════════════
```

---

## 🎯 Business problem

A retail company sells furniture, office supplies and technology through e-commerce/catalogue
channels across **4 US sales regions** (Central, East, South, West). After several years of growth,
management asks a simple question they cannot answer from their raw order export:

> **"We keep growing — but are we growing profitably? Which products, categories, regions and
> customers actually make us money, and which ones quietly destroy it?"**

The order system exports a raw workbook (multiple tables concatenated, mixed date formats, hidden
duplicates). This project delivers the answer end-to-end: a defensible dataset, the evidence, and a
dashboard the business can use.

## 🎯 Objectives

1. Convert a messy raw export into an **audited, analysis-ready dataset** (documented decisions).
2. Quantify **revenue, profit, orders, AOV, margin** and their trends (2014–2017).
3. Identify **what drives profit** — products, categories, sub-categories, regions, customers, discounts.
4. Answer **15 business questions** with reproducible SQL (`sql/`).
5. Package the findings in a **3-page Power BI dashboard** and an executive report.

## 📁 Dataset

| Item | Detail |
|---|---|
| Source | Tableau **Sample Superstore** (public dataset, Tableau community workbook); downloaded from a public GitHub mirror of the workbook, stored in `data/raw/superstore_full_export.csv` |
| Size | 10,296 raw rows (9,994 order lines + appended Returns & People sheets) → **9,993 clean line items** |
| Period | 2014-01-03 → 2017-12-30 (48 months) |
| Geography | United States, 4 regions · 793 customers · 1,862 SKUs |
| Grain | **1 row = 1 product line within an order** (order-level = `DISTINCT order_id`) |

**Columns (raw → clean):** Order ID, Order Date, Ship Date, Ship Mode, Customer ID/Name, Segment,
Country, City, State, Postal Code, Region, Product ID, Category, Sub-Category, Product Name, Sales,
Quantity, Discount, Profit — **plus derived:** unit price, margin, shipping days, year/month,
discount band, returned flag. Two reference tables were recovered from the same export:
**Returns** (296 returned orders) and **People** (4 regional managers).

**Limitations (explicit, documented in `reports/business-insights.md` §4)**
- Returns are **order-level** (no returned quantities) → return figures are an upper bound.
- No marketing/traffic data, no cost breakdown, no product attributes beyond category/sub-category.
- Effective unit price = Sales ÷ Quantity (list price not recorded).
- The weekday pattern in the data is a **sample artifact** (Wednesday severely under-represented)
  and is excluded from conclusions.

## 🛠 Tools

**Python 3 · Pandas · NumPy · Matplotlib · Seaborn · SQL (SQLite 3.35+) · Power BI Desktop · Excel (openpyxl)**

## 🧹 Data cleaning (`notebooks/01_data_cleaning.ipynb`)

| Audit | Finding | Decision (logged) |
|---|---|---|
| Structure | 3 tables concatenated in one CSV (`Orders`, `Returns`, `People`) | split on boundaries, kept as 3 tables |
| Missing values | 0 in the orders table | no imputation needed |
| Duplicates | 1 exact duplicate line | removed (1 row, double-counted sales) |
| Near-duplicates | 8 order/product pairs with different quantities | **kept** — legitimate split lines |
| Data types | Dates are text in **two formats** (`11-08-2016` and `11/8/2016`) | parsed, zero failures |
| Impossible values | none (no ≤0 sales, discounts ∈ [0,1)) | check passed |
| Negative profit | 1,870 lines (18.7%) | **kept** — real loss-making activity |
| Outliers | 1,167 lines > IQR fence = 64.3% of revenue | **quantified, kept** — big-ticket orders are real |
| Categories | all value sets clean (3 segments, 4 regions, 3 categories, 4 ship modes) | check passed |
| Identifiers | Customer ID ↔ Name 1:1; a few names shared across SKUs | `Product ID` used as canonical key |

**Every transformation is logged** → `data/processed/cleaning_log.csv`. No silent deletion; each
removed/changed row is counted and justified.

## 📈 Exploratory data analysis (`notebooks/02_exploratory_analysis.ipynb`)

12 charts, each tied to a business question, saved to `images/analysis/`:
KPI summary · monthly revenue/profit & margin · yearly growth · seasonality heatmap +
calendar-month share · category performance · sub-category quadrant (revenue vs margin) ·
top SKUs by revenue/profit · Pareto concentration · discount margin curve & heatmap ·
region performance · segment performance · customer concentration & top customers ·
returns by region · shipping economics.

**EDA headline findings**

| Finding | Evidence |
|---|---|
| Revenue growing **14.9% CAGR** | +29.5% (2016), +20.4% (2017) |
| Sales are **highly seasonal** | Nov 15.3% + Dec 14.2% + Sep 13.4%; **Q4 = 38.2%** of revenue |
| **Discounts destroy margin** | 52% of lines discounted → **−2.9%** margin vs **+29.5%** full price; >30% band → **−48.2%**, −$125.0k |
| Furniture is the weak category | $741.7k revenue (32.3%) at **2.5% margin** |
| Tables / Bookcases / Supplies lose money | −8.6% / −3.0% / −2.5% margin; Machines only 1.8% |
| Concentrated but not extreme mix | top 10% SKUs = 59.1% of revenue; **414 SKUs → 80%** |
| **301 SKUs (16%) are net unprofitable** | −$156.1k absorbed on 20.4% of revenue |
| Central region lags | 21.8% of revenue at **7.9% margin** |
| Returns cluster in West | **189/296 returns (64%)** |
| Customer base healthy & diversified | median 6 orders; top 10% customers = 30.9% of revenue |

## 🗄 SQL analysis (`sql/`)

7 scripted analyses + schema, runnable on SQLite (SQLite 3.35+), compatible with PostgreSQL/MySQL
with minor tweaks. **65 result sets, all cross-validated against Python** (`tests/validate_sql.py`).

| File | Focus | Techniques |
|---|---|---|
| `00_schema.sql` | schema + indexes + grain notes | DDL, PK/FK reasoning |
| `01_data_quality.sql` | re-run quality audits in SQL | CASE, aggregation, NTILE, anti-joins |
| `02_kpi_analysis.sql` | headline KPIs, by year/segment/pricing | GROUP BY, window shares, LAG |
| `03_product_analysis.sql` | categories, sub-categories, SKUs, Pareto | rankings, CTEs, cumulative windows |
| `04_customer_analysis.sql` | top customers, concentration, cohorts | CTEs, HAVING, window functions |
| `05_regional_analysis.sql` | regions, managers (JOIN), mix, returns | JOINs, conditional aggregation, YoY LAG |
| `06_time_analysis.sql` | monthly trend, MoM, running total, seasonality | LAG, moving average, running totals |
| `07_advanced_analysis.sql` | discount paradox, cohorts, what-if, sub-category map | CASE buckets, subqueries, scenario modelling |

## 📊 Power BI dashboard (`powerbi/`)

3 pages, 4 synced slicers (Date · Category · Region · Customer Segment), professional BI theme.

| Page | Content |
|---|---|
| **1 · Executive Overview** | 6 KPI cards (Revenue, Profit, Orders, AOV, Margin, Units) · Revenue & Profit trend · Sales by Category · Sales & Margin by Region · Segment donut |
| **2 · Product Performance** | Top 10 SKUs by revenue · Bottom 10 SKUs by profit · Sub-category revenue-vs-margin quadrant · Margin by discount band · Quantity by category |
| **3 · Customer & Regional** | Top 10 customers · Customer concentration (Pareto) · Revenue/Profit + margin by region · Returns by region · Segment share |

> The `.pbix` is a binary file that cannot be generated in this repository — instead
> [`powerbi/README.md`](powerbi/README.md) provides the **complete build kit**: data model, star
> schema, DAX measures, exact page/visual layouts, theme and refresh steps (~15 min in Power BI
> Desktop). The screenshots below are rendered **from the same data** by
> `scripts/render_dashboard_previews.py`.

![Page 1 — Executive Overview](images/dashboard-overview.png)
![Page 2 — Product Performance](images/product-analysis.png)
![Page 3 — Customer & Regional Analysis](images/customer-analysis.png)

## 💡 Key insights

1. **Discounting is the dominant profit driver.** 52% of line items are discounted; they deliver
   52.6% of revenue at a **−2.9% margin**. Deep discounts (>30%) alone turn **−$125.0k** profit and
   represent 11.3% of revenue.
2. **Margin erosion is non-linear.** ≤10% discount: healthy margins (25–16.6%). ≥20%: negative.
   >30%: **−48.2%**. A cap at 20–30% would reclaim an estimated **$146.4k** of profit (scenario in
   `07_advanced_analysis.sql`, assumption-based).
3. **Furniture is a volume trap.** A third of revenue (32.3%), 2.5% margin, 6.4% of profit; Tables
   and Bookcases are structurally loss-making.
4. **Loss-makers are identifiable, not random.** 301 SKUs and 155 customers are net unprofitable —
   both driven by deep discounts, not by low demand.
5. **Growth is seasonal and healthy.** 14.9% CAGR; Q4 = 38.2% of revenue — but only 2 of 48 months
   are loss-making, so the model is sound apart from pricing.
6. **Central region, West returns, Consumer discounts** are the three operational hotspots.

## ✅ Business recommendations

1. **Govern discounts** — approval workflow above 20%; margin-per-order shown at approval.
2. **Fix Furniture economics** — renegotiate cost, re-price, or prune Tables/Bookcases SKUs.
3. **Review 301 loss-making SKUs** — discontinue, re-price, or stop discounting.
4. **Central turnaround program** — copy West/East discount discipline and mix.
5. **Investigate West return process** (quality control, order accuracy, packaging).
6. **Plan peak capacity** — stock/people/ads for Sep–Dec (38.2% of revenue in Q4).
7. **Protect star catalogues** (Canon imageCLASS 2200, Fellowes PB500 = 11.5% of total profit).
8. **Keep expedited shipping** — profitable (First Class 13.9% margin) and a competitive lever.
9. **Track customer-level profit** in CRM — 20% of customers are net loss-making (−$71.2k).

## 📂 Project structure

```
ecommerce-sales-analysis/
├── data/
│   ├── raw/                       # superstore_full_export.csv (original export)
│   └── processed/                 # cleaned CSVs + cleaning log + SQLite DB + Power BI tables
├── notebooks/
│   ├── 01_data_cleaning.ipynb     # audit + transformations (executed)
│   └── 02_exploratory_analysis.ipynb  # EDA, 12 business-driven charts (executed)
├── sql/
│   ├── 00_schema.sql
│   ├── 01_data_quality.sql        ├── 02_kpi_analysis.sql
│   ├── 03_product_analysis.sql    ├── 04_customer_analysis.sql
│   ├── 05_regional_analysis.sql   ├── 06_time_analysis.sql
│   └── 07_advanced_analysis.sql
├── powerbi/
│   └── README.md                  # build kit: model, DAX, layouts, theme, screenshots
├── images/
│   ├── dashboard-overview.png     ├── product-analysis.png
│   ├── customer-analysis.png
│   └── analysis/                  # 12 EDA charts (PNG)
├── reports/
│   └── business-insights.md       # executive report with every figure sourced
├── scripts/
│   ├── db_setup.py                # builds superstore.db + dashboard tables (SQL-driven)
│   └── render_dashboard_previews.py
├── tests/
│   └── validate_sql.py            # runs all 65 SQL queries, cross-checks vs pandas
├── README.md
├── requirements.txt
└── .gitignore
```

## 🔁 How to reproduce

```bash
# 1. clone
git clone https://github.com/kamelaggoun/ecommerce-sales-analysis.git
cd ecommerce-sales-analysis

# 2. environment (Python 3.10+)
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# 3. notebooks (run top to bottom; outputs already committed)
jupyter notebook notebooks/01_data_cleaning.ipynb
jupyter notebook notebooks/02_exploratory_analysis.ipynb

# 4. SQL — build the database from the cleaned data, then run/validate every query
python scripts/db_setup.py
python tests/validate_sql.py        # 65 expected result sets, all PASS

# 5. (optional) update the SQLite DB in any SQL client
sqlite3 data/processed/superstore.db < sql/02_kpi_analysis.sql
```

**Power BI:** follow [`powerbi/README.md`](powerbi/README.md) — load
`data/processed/superstore_orders_clean.csv` (+ returns/people), create `dim_Date`, paste the DAX
measures, place the visuals per the page specs, sync the 4 slicers.

## 🧠 Skills demonstrated

| | |
|---|---|
| **Data Cleaning** | missing values, duplicates, type coercion, mixed date formats, outliers, identifier integrity, full decision log |
| **Exploratory Data Analysis** | descriptive stats, trends, seasonality, Pareto, quadrant analysis, margins |
| **Python & Pandas** | groupby/aggregations, resampling, pivots, window logic, vectorised validation |
| **SQL** | CTEs, window functions, rankings, running totals, MoM/YoY, conditional aggregation, JOINs, subqueries, scenario modelling |
| **Data Visualization** | Matplotlib + Seaborn (12 purpose-built charts), Power BI (3-page dashboard) |
| **Business Intelligence** | star schema, DAX measures, KPI design, slicer architecture |
| **Business Analysis** | 15 business questions, cross-validated metrics, insight → recommendation mapping |
| **Data Storytelling** | every chart answers a question; findings presented in an executive README + report |

---

## ⚠️ Note on results

All figures in this repository are **calculated directly from the dataset** (validated twice: pandas
and SQL). The only estimated quantity is the explicit *what-if scenario* (§7.9 of
`07_advanced_analysis.sql`), which is labelled as an assumption-based estimate in the query and in
`reports/business-insights.md`. Recommendations are business interpretations of those calculated
results — never fabricated numbers.

*Dataset: Tableau "Sample Superstore" (public). Business scenario is illustrative.*
