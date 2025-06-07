import React, { ReactNode , ButtonHTMLAttributes} from "react";

// Type definitions
interface JsonObject {
  [key: string]: any;
}


interface CsvHeader {
  label: string;
  key: string;
}


interface JsonToCsvDownloadProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  data: JsonObject[];
  headers?: CsvHeader[] | null;
  filename?: string;
  className?: string;
  children?: ReactNode;
  onDownload?: () => void;
}

  // Extract headers automatically from JSON data  
  const extractAutoHeaders = (jsonData: JsonObject[]): string[] => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) return [];
    
    const allKeys = new Set<string>();
    jsonData.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => allKeys.add(key));
      }
    });
    
    return Array.from(allKeys);
  };

export const JsonToCsvDownload: React.FC<JsonToCsvDownloadProps> = ({ 
  data = [], 
  headers = null, 
  filename = "data.csv",
  className = "",
  children = "Download CSV",
  onDownload = () => {},
  ...props 
}) => {
  


  // Convert JSON to CSV and download
 const handleDownload = (): void => {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("JsonToCsvDownload: No data provided or data is empty");
      return;
    }

    // Determine headers and keys
    let keys: string[] = [];
    let headerLabels: string[] = [];

    if (headers && headers.length > 0) {
      headerLabels = headers.map(h => h.label);
      keys = headers.map(h => h.key);
    } else {
      keys = extractAutoHeaders(data);
      headerLabels = [...keys]; // use keys as labels if not custom
    }

    if (keys.length === 0) {
      console.warn("JsonToCsvDownload: No keys found");
      return;
    }

    // Prepare CSV rows
    const csvRows: string[][] = [];

    // Add headers
    csvRows.push(headerLabels);

    // Add data
    data.forEach(item => {
      const row = keys.map(key => {
        const value = item[key];
        if (value === null || value === undefined) return '';

        if (typeof value === 'string') {
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
        }

        return String(value);
      });
      csvRows.push(row);
    });

    const csvContent: string = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onDownload();
  } catch (error) {
    console.error("JsonToCsvDownload: Error generating CSV", error);
  }
};


  return (
    <button 
      onClick={handleDownload}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export type { JsonToCsvDownloadProps, JsonObject , CsvHeader };