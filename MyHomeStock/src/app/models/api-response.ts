export interface ApiResponse<Data> {
  error: boolean;
  data?: Data;
  message?: string;
}
