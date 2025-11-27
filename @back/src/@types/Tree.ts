interface Tree {
    tree_id?: number;
    name: string;
    description?: string;
    price: number;
    image?: string;
    created_at?: Date;
    updated_at?: Date;
}

type TreeProjectRow = {
    project_id: number | null;
    project_name: string;
    project_description: string;
    project_image: string;
    localization_id: number | null;
    project_created_at: string;
    project_updated_at: string;
    country: string;
    continent: string;
};

export type { Tree, TreeProjectRow };
