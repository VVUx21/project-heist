export interface ApiResponse {
    success: boolean;
    message: string;
    messages?: Array<Event>
  };