const BASE_URL = "https://parallelum.com.br/fipe/api/v1";

export async function getBrands(vehicleType: string) {
  const response = await fetch(`${BASE_URL}/${vehicleType}/marcas`);
  if (!response.ok) throw new Error("Brands");
  return response.json();
}

export async function getModelsAndYears(vehicleType: string, brandId: string) {
  const response = await fetch(`${BASE_URL}/${vehicleType}/marcas/${brandId}/modelos`);
  if (!response.ok) throw new Error("Models");
  return response.json();
}

export async function getPrice(vehicleType: string, brandId: string, modelId: string, yearId: string) {
  const response = await fetch(`${BASE_URL}/${vehicleType}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`);
  if (!response.ok) throw new Error("Prices");
  return response.json();
}
