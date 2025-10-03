import { apiService } from './api-service';
import { ProductDTO } from '../types/product-dto';

export const getProductById = (id: number): Promise<ProductDTO> => {
  return apiService.get(`products/${id}`);
}

export const getProductAll = (): Promise<ProductDTO> => {
  return apiService.get(`products`);
}

export const createProduct = (title: string, price: number): Promise<ProductDTO> => {
  return apiService.post(`products`, { body: JSON.stringify({ title, price }) });
}

export const updateProduct = (id: number, title: string, price: number): Promise<ProductDTO> => {
  return apiService.put(`products/${id}`, { body: JSON.stringify({ title, price }) });
}

export const deleteProductById = (id: number): Promise<ProductDTO> => {
  return apiService.delete(`products/${id}`);
}
