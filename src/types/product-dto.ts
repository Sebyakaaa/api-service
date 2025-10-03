import { CategoryDTO } from "./category-dto";
import { RatingDTO } from "./rating-dto";

export interface ProductDTO {
    id: number;
    title: string;
    price: number;
    description_text: string;
    category: CategoryDTO;
    image: string;
    rating: RatingDTO;
}