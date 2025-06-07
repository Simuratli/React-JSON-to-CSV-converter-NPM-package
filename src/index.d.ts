import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface JsonObject {
  [key: string]: any;
}

export interface JsonToCsvDownloadProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  data: JsonObject[];
  headers?: string[] | null;
  filename?: string;
  className?: string;
  children?: ReactNode;
  onDownload?: () => void;
}

declare const JsonToCsvDownload: React.FC<JsonToCsvDownloadProps>;

export default JsonToCsvDownload;