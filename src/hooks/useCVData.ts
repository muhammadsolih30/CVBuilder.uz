import { useState, useEffect } from 'react';
import { CVData, defaultCVData } from '@/types/cv';
import { DEMO_CV_DATA } from '@/data/demoData';

const STORAGE_KEY = 'cv-builder-data';

export function useCVData() {
  const [cvData, setCVData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return defaultCVData;

      const parsed = JSON.parse(saved);

      return {
        ...defaultCVData,
        ...parsed,
        personalInfo: {
          ...defaultCVData.personalInfo,
          ...(parsed.personalInfo || {}),
        },
        skills: {
          technical: parsed.skills?.technical ?? defaultCVData.skills.technical,
          soft: parsed.skills?.soft ?? defaultCVData.skills.soft,
        },
        projects: parsed.projects ?? [],
        certificates: parsed.certificates ?? [],
        fontSize: parsed.fontSize ?? 22,
      };
    } catch {
      return defaultCVData;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
      }
    } catch {}
  }, [cvData]);

  const updatePersonalInfo = (field: string, value: string | null) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const loadDemo = (type: 'it' | 'marketing' = 'it') => {
    const demo = DEMO_CV_DATA[type] || DEMO_CV_DATA.it;
    setCVData({ ...demo });
  };

  const exportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(cvData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `${cvData.personalInfo.fullName || 'cv-backup'}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJSON = (importedData: CVData) => {
    setCVData({
      ...defaultCVData,
      ...importedData,
      personalInfo: {
        ...defaultCVData.personalInfo,
        ...(importedData.personalInfo || {}),
      },
      skills: {
        technical: importedData.skills?.technical ?? [],
        soft: importedData.skills?.soft ?? [],
      },
      projects: importedData.projects ?? [],
      certificates: importedData.certificates ?? [],
    });
  };

  const resetData = () => {
    setCVData(defaultCVData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    cvData,
    setCVData,
    updatePersonalInfo,
    resetData,
    loadDemo,
    exportJSON,
    importJSON,
  };
}