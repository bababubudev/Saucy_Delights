export default interface Recipe {
    id: number;
    recipe_name: string;
    description: string;
    nationality: string | null;
    main_igr: string | null;
    food_time: string | null;
    difficulty: number | null;
    time_taken: number | null;
    created_at: Date;
}