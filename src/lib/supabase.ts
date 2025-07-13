import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export type CarSpec = 'gcc' | 'korean';
export type LanguageCode = 'en' | 'ar';

export interface Car {
  id: string;
  spec: CarSpec;
  brand: string;
  model: string;
  year: number;
  price?: number;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  engine_size?: string;
  color?: string;
  is_available: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CarTranslation {
  id: string;
  car_id: string;
  language: LanguageCode;
  title?: string;
  description?: string;
  features?: string[];
}

export interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface CarWithDetails extends Car {
  translations: CarTranslation[];
  images: CarImage[];
}
