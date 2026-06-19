export interface CreateRideDto {
    name: string;
    description?: string;
    rating?: number;
    categoryId?: number;
    startTime?: string;
    endTime: string;
}