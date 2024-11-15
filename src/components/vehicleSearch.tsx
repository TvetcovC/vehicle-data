import React, { useState, useEffect } from 'react';
import { getBrands, getModelsAndYears, getPrice } from '../services/fipeService';

export const VehicleSearch: React.FC = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [price, setPrice] = useState<string | null>(null);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBrands('carros');
        setBrands(data);
      } catch (err) {
        setError('Failed to load brands');
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandChange = async (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedModel(null);
    setSelectedYear(null);
    setModels([]);
    setYears([]);
    setPrice(null);

    if (brandId) {
      try {
        setLoading(true);
        const data = await getModelsAndYears('carros', brandId);
        setModels(data.modelos);
      } catch (err) {
        setError('Failed to load models');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleModelChange = async (modelId: string) => {
    setSelectedModel(modelId);
    setSelectedYear(null);
    setYears([]);
    setPrice(null);

    if (modelId && selectedBrand) {
      try {
        setLoading(true);
        const data = await getModelsAndYears('carros', selectedBrand);
        setYears(data.anos);
      } catch (err) {
        setError('Failed to load years');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleYearChange = async (yearId: string) => {
    setSelectedYear(yearId);
    setPrice(null);

    if (yearId && selectedBrand && selectedModel) {
      try {
        setLoading(true);
        const data = await getPrice('carros', selectedBrand, selectedModel, yearId);
        setPrice(data.Valor);
      } catch (err) {
        setError('Failed to load price');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Vehicle Price Search</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <select onChange={(e) => handleBrandChange(e.target.value)} disabled={loading}>
        <option value="">Select brand</option>
        {brands.map((brand: any) => (
          <option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
        ))}
      </select>

      <select onChange={(e) => handleModelChange(e.target.value)} disabled={!selectedBrand || loading}>
        <option value="">Select model</option>
        {models.map((model: any) => (
          <option key={model.codigo} value={model.codigo}>{model.nome}</option>
        ))}
      </select>

      <select onChange={(e) => handleYearChange(e.target.value)} disabled={!selectedModel || loading}>
        <option value="">Select year</option>
        {years.map((year: any) => (
          <option key={year.codigo} value={year.codigo}>{year.nome}</option>
        ))}
      </select>

      {price && <p>Price: {price}</p>}
    </div>
  );
};
