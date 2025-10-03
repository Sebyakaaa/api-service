export class ApiService2 {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = 'https://fakestoreapi.com', defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, options);
  }

  async post<T>(endpoint: string, options?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', ...options });
  }

  async put<T>(endpoint: string, options?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', ...options });
  }

  async delete<T>(endpoint: string, options?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService2();