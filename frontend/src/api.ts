export interface FileDto {
  id: string;
  name: string;
  size: number;
}

export interface ErrorResponse {
  message: string;
  status: number;
}
