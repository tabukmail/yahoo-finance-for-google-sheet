# 📈 Yahoo Finance for Google Sheets

**Historical stock data, straight into Google Sheets.**
A lightweight Google Apps Script custom function that queries the Yahoo! Finance chart API and returns date, open, high, low, close, and volume with a single formula — `=YAHOOF()`.

[![License: MIT](https://img.shields.io/github/license/tabukmail/Yahoo-Finance-for-Google-Sheet)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/tabukmail/Yahoo-Finance-for-Google-Sheet)](https://github.com/tabukmail/Yahoo-Finance-for-Google-Sheet/commits)
[![Stars](https://img.shields.io/github/stars/tabukmail/Yahoo-Finance-for-Google-Sheet?style=social)](https://github.com/tabukmail/Yahoo-Finance-for-Google-Sheet/stargazers)
[![Follow](https://img.shields.io/twitter/url/https/twitter.com/tabukmail.svg?style=social&label=Follow%20%40tabukmail)](https://twitter.com/tabukmail)

## Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Arguments](#-arguments)
- [Examples](#-examples)
- [Tips](#-tips)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features
- Pulls historical **open, high, low, close, and volume** data directly into a range of cells
- Works as a native Google Sheets **custom function** — no add-on install or API key required
- Supports **intraday, daily, weekly, and monthly** intervals
- Accepts either a fixed lookback **range** (`"1y"`, `"6mo"`, …) or explicit **start/end dates**
- Friendly, in-cell error messages instead of cryptic script failures

## 📦 Installation
1. Open your Google Sheet
2. Click **Extensions → Apps Script**
3. Delete any existing code in the **Code.gs** file that opens
4. Copy the full script from [**Yahoof.gs**](./Yahoof.gs), paste it in, then press **Ctrl+S** (or **Cmd+S** on Mac) to save
5. Go back to your Google Sheet — `=YAHOOF()` is now ready to use

## 🧩 Usage
```
=YAHOOF(stock, [interval], [start], [end])
```
Only `stock` is required — everything else falls back to a sensible default (see below).

## ⚙️ Arguments

| Argument | Description | Default | Accepted values |
|---|---|---|---|
| `stock` | Ticker symbol as listed on Yahoo Finance | *required* | e.g. `"AAPL"`, `"DBK.DE"` |
| `interval` | Time interval between data points | `"1h"` | `1m` `2m` `5m` `15m` `30m` `60m` `90m` `1h` `1d` `5d` `1wk` `1mo` `3mo` |
| `start` | Start date (`"MM/DD/YYYY"`), **or** a fixed lookback range | `"1y"` | a date string, or `1d` `5d` `1mo` `3mo` `6mo` `1y` `2y` `5y` `10y` `ytd` `max` |
| `end` | End date (`"MM/DD/YYYY"`) | today | a date string |

## 💡 Examples

| Formula | Result |
|---|---|
| `=YAHOOF()` | Shows help info |
| `=YAHOOF("DBK.DE")` | Data for `DBK.DE` with default interval (`1h`) and default range (`1y`) |
| `=YAHOOF("DBK.DE", "1h")` | Same as above, interval explicit |
| `=YAHOOF("DBK.DE", "30m", "1mo")` | Last one month of data at `30m` intervals |
| `=YAHOOF("DBK.DE", , "1mo")` | Last one month of data at the default `1h` interval |
| `=YAHOOF("DBK.DE", "1h", "10/01/2022", "11/01/2022")` | Data between the given start and end dates |
| `=YAHOOF("DBK.DE", "1h", "10/01/2022", "11/01/2021")` | ⚠️ Error — end date is before start date |
| `=YAHOOF("DBK.DE", "1h", "10/01/2022")` | From the given start date to today (span is under a year) |
| `=YAHOOF("DBK.DE", "1h", "10/01/2020")` | Falls back to the default 1‑year range, since the span exceeds a year |
| `=YAHOOF("DBK.DE", "1h", "1mo", "10/01/2022")` | ⚠️ Error — `start` and `end` must use the same `MM/DD/YYYY` format |
| `=YAHOOF("DBK.DE", "1h", , "10/01/2022")` | One year back from the given end date, since `start` was omitted |
| `=YAHOOF("DBK.DE", , , "10/01/2022")` | Same as above, with the default `1h` interval |

## 📝 Tips
> If a date column shows a raw number instead of a date, select the column and go to **Format → Number → Date**.

## 🤝 Contributing
Contributions, ideas, and 🐛 bug reports are always welcome — open an [issue](https://github.com/tabukmail/Yahoo-Finance-for-Google-Sheet/issues) or a pull request.

## 📄 License
Released under the [MIT License](LICENSE).

---

⭐️ If this saved you time, consider starring the repo, and follow [@tabukmail](https://twitter.com/tabukmail) for updates.

Wishing you profitable investments ☕📈

*P.S. Your interest is the best motivation to keep adding more API functionality to this script.* 🚀🚀🚀
