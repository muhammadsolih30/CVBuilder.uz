import { useState, useEffect } from 'react';
import { CVData, defaultCVData } from '@/types/cv';

const STORAGE_KEY = 'cv-builder-data';

export function useCVData() {
  const [cvData, setCVData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultCVData, ...JSON.parse(saved) } : defaultCVData;
    } catch {
      return defaultCVData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  const updatePersonalInfo = (field: string, value: string | null) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const resetData = () => {
    setCVData(defaultCVData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { cvData, setCVData, updatePersonalInfo, resetData };
}
