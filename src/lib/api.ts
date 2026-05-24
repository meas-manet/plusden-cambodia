const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  sort_order: number | null;
  is_active: boolean | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  spec: string | null;
  notes: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  featured: boolean | null;
  badge: string | null;
  brand_id: string | null;
  rating: number | null;
  reviews_count: number | null;
}

export interface Brand {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

export interface HomeContent {
  id: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
}

export const api = {
  getHeroSlides: () => apiFetch<HeroSlide[]>("/api/hero-slides"),
  getProducts: () => apiFetch<Product[]>("/api/products"),
  getProduct: (id: string) => apiFetch<Product>(`/api/products/${id}`),
  getBrands: () => apiFetch<Brand[]>("/api/brands"),
  getBrand: (id: string) => apiFetch<Brand>(`/api/brands/${id}`),
  getHomeContent: () => apiFetch<HomeContent[]>("/api/home-content"),
};
