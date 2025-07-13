import { supabase, Car, CarWithDetails, CarSpec, LanguageCode } from './supabase';

export async function getCars(spec?: CarSpec): Promise<CarWithDetails[]> {
  let query = supabase
    .from('cars')
    .select(`
      *,
      translations:car_translations(*),
      images:car_images(*)
    `)
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (spec) {
    query = query.eq('spec', spec);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching cars:', error);
    throw new Error('Failed to fetch cars');
  }

  return data || [];
}

export async function getFeaturedCars(): Promise<CarWithDetails[]> {
  const { data, error } = await supabase
    .from('cars')
    .select(`
      *,
      translations:car_translations(*),
      images:car_images(*)
    `)
    .eq('is_available', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching featured cars:', error);
    throw new Error('Failed to fetch featured cars');
  }

  return data || [];
}

export async function getCarById(id: string): Promise<CarWithDetails | null> {
  const { data, error } = await supabase
    .from('cars')
    .select(`
      *,
      translations:car_translations(*),
      images:car_images(*)
    `)
    .eq('id', id)
    .eq('is_available', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Car not found
    }
    console.error('Error fetching car:', error);
    throw new Error('Failed to fetch car');
  }

  return data;
}

export async function getCarsByBrand(brand: string): Promise<CarWithDetails[]> {
  const { data, error } = await supabase
    .from('cars')
    .select(`
      *,
      translations:car_translations(*),
      images:car_images(*)
    `)
    .eq('is_available', true)
    .ilike('brand', brand)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching cars by brand:', error);
    throw new Error('Failed to fetch cars by brand');
  }

  return data || [];
}

export async function getBrands(): Promise<string[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('brand')
    .eq('is_available', true);

  if (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Failed to fetch brands');
  }

  const brands = [...new Set(data?.map(car => car.brand) || [])];
  return brands.sort();
}
