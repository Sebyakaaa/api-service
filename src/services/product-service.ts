import { apiService } from './api-service';
import { ProductDTO } from '../types/product-dto';

const product_endpoint = 'products';

export const getProductById = (id: number): Promise<ProductDTO> => {
  return apiService.get(`${product_endpoint}/${id}`);
}

export const getProductAll = (): Promise<ProductDTO> => {
  return apiService.get(product_endpoint);
}

export const createProduct = (title: string, price: number): Promise<ProductDTO> => {
  return apiService.post(product_endpoint, { body: JSON.stringify({ title, price }) });
}

export const updateProduct = (id: number, title: string, price: number): Promise<ProductDTO> => {
  return apiService.put(`${product_endpoint}/${id}`, { body: JSON.stringify({ title, price }) });
}

export const deleteProductById = (id: number): Promise<ProductDTO> => {
  return apiService.delete(`${product_endpoint}/${id}`);
}
