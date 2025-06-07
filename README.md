# 📦 @simuratli/react-json-csv-converter

A lightweight and customizable React component that enables users to download JSON data as a CSV file with a single button click.

## 🚀 Features

- 🧠 Auto-detects headers from your JSON data.
- 🎯 Supports custom headers with label/key mapping.
- 💡 Handles special characters in CSV (e.g., commas, quotes, newlines).
- ⚛️ Fully typed with TypeScript.
- 🎨 Accepts any button props (`className`, `disabled`, etc.) for customization.

---

## 📦 Installation

```bash
npm install @simuratli/react-json-csv-converter
```

or

```bash
yarn add @simuratli/react-json-csv-converter
```

---

## ✨ Usage

### 1. Auto-detect headers from JSON:

```tsx
import { JsonToCsvDownload } from '@simuratli/react-json-csv-converter';

const data = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 }
];

<JsonToCsvDownload data={data} filename="users.csv">
  Export Users
</JsonToCsvDownload>;
```

---

### 2. With custom headers (label + key):

```tsx
import { JsonToCsvDownload } from '@simuratli/react-json-csv-converter';

const data = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 }
];

const headers = [
  { label: 'User ID', key: 'id' },
  { label: 'Full Name', key: 'name' },
  { label: 'User Age', key: 'age' }
];

<JsonToCsvDownload
  data={data}
  headers={headers}
  filename="custom_users.csv"
  className="my-custom-button"
>
  Download CSV
</JsonToCsvDownload>;
```

---

## 📘 Props

| Prop        | Type                                                   | Description                                                                 |
|-------------|--------------------------------------------------------|-----------------------------------------------------------------------------|
| `data`      | `object[]`                                             | Required. The JSON array to convert and download as CSV.                   |
| `headers`   | `{ label: string, key: string }[]` \| `null`           | Optional. Custom headers for CSV: display `label` and extract from `key`.  |
| `filename`  | `string`                                               | Optional. Name of the downloaded CSV file. Default is `data.csv`.          |
| `className` | `string`                                               | Optional. Custom CSS classes for the button.                               |
| `children`  | `ReactNode`                                            | Optional. Button label/content. Default is `"Download CSV"`.               |
| `onDownload`| `() => void`                                           | Optional. Callback after successful CSV download.                          |
| `...props`  | `ButtonHTMLAttributes<HTMLButtonElement>`              | Optional. All standard `<button>` props supported.                         |

---

## 🧪 Development

```bash
npm run dev
```

---

## 📄 License

MIT © Your Name or GitHub Handle
