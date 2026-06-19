import { Category } from "./Category";
import { User } from "./User";

export interface Ride {
    id: number;
    name: string;
    description?: string;
    user: User;
    userId: number;
    rating?: number;
    category: Category;
    categoryId?: number;
    duration?: string;
    startTime?: string;
    endTime: string;
}