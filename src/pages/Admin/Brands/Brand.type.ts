export type Brand={
    id: number;
    name: string;
    slug: string;
    logo: string;
    status: 'active' | 'inactive';
    description: string;
    url: string;
    categories: { id: number; name: string }[];
}