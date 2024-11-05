import React, { useState, useEffect } from 'react';
import { getBrands, getModelsAndYears, getPrice } from './fipeService';

export const VehicleSearch: React.FC = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [price, setPrice] = useState<string | null>(null);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      const data = await getBrands('carros');
      setBrands(data);
    }
    fetchBrands();
  }, []);

  const handleBrandChange = async (brandId: string) => {
    setSelectedBrand(brandId);
    const data = await getModelsAndYears('carros', brandId);
    setModels(data.modelos);
  };

  const handleModelChange = async (modelId: string) => {
    setSelectedModel(modelId);
    const data = await getModelsAndYears('carros', selectedBrand!);
    setYears(data.anos);
  };

  const handleYearChange = async (yearId: string) => {
    setSelectedYear(yearId);
    const data = await getPrice('carros', selectedBrand!, selectedModel!, yearId);
    setPrice(data.Valor);
  };

  return (
    <div>
      <h1>Vehicle price search</h1>

      <select onChange={(e) => handleBrandChange(e.target.value)}>
        <option value="">Select brand</option>
        {brands.map((brand: any) => (
          <option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
        ))}
      </select>

      <select onChange={(e) => handleModelChange(e.target.value)} disabled={!selectedBrand}>
        <option value="">Select model</option>
        {models.map((model: any) => (
          <option key={model.codigo} value={model.codigo}>{model.nome}</option>
        ))}
      </select>

      <select onChange={(e) => handleYearChange(e.target.value)} disabled={!selectedModel}>
        <option value="">Select year</option>
        {years.map((year: any) => (
          <option key={year.codigo} value={year.codigo}>{year.nome}</option>
        ))}
      </select>

      {price && <p>Price: {price}</p>}
    </div>
  );
};