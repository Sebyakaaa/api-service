export class ApiService2 {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = 'https://fakestoreapi.com', defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      ...defaultHeaders
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();

      if (!text) {
        throw new Error('Empty response from server');
      }

      return JSON.parse(text) as T;
    } catch (error) {
      throw error;
    }
  }
}

export const apiService = new ApiService2();