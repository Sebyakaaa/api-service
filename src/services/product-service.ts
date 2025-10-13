import { apiService } from './api-service';
import { ProductDTO } from '../types/product-dto';
import { HttpMethod } from '../types/httpMethod';

const product_endpoint = 'products';

export const getProductById = (id: number): Promise<ProductDTO> => {
  return apiService.request(`${product_endpoint}/${id}`, { method: HttpMethod.GET });
}

export const getProductAll = (): Promise<ProductDTO> => {
  return apiService.request(product_endpoint, { method: HttpMethod.GET });
}

export const createProduct = (title: string, price: number): Promise<ProductDTO> => {
  return apiService.request(product_endpoint, { method: HttpMethod.POST, body: JSON.stringify({ title, price }) });
}

export const updateProduct = (id: number, title: string, price: number): Promise<ProductDTO> => {
  return apiService.request(`${product_endpoint}/${id}`, { method: HttpMethod.PUT, body: JSON.stringify({ title, price }) });
}

export const deleteProductById = (id: number): Promise<ProductDTO> => {
  return apiService.request(`${product_endpoint}/${id}`, { method: HttpMethod.DELETE });
}
