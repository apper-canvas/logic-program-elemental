import companiesData from "@/services/mockData/companies.json";

const STORAGE_KEY = "crm_companies";

const loadCompaniesFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companiesData));
  return companiesData;
};

const saveCompaniesToStorage = (companies) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
};

export const companyService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...loadCompaniesFromStorage()];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const companies = loadCompaniesFromStorage();
    return companies.find(company => company.Id === parseInt(id));
  },

  create: async (companyData) => {
    await new Promise(resolve => setTimeout(resolve, 450));
    const companies = loadCompaniesFromStorage();
    const maxId = Math.max(...companies.map(c => c.Id), 0);
    const newCompany = {
      ...companyData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedCompanies = [...companies, newCompany];
    saveCompaniesToStorage(updatedCompanies);
    return { ...newCompany };
  },

  update: async (id, companyData) => {
    await new Promise(resolve => setTimeout(resolve, 450));
    const companies = loadCompaniesFromStorage();
    const index = companies.findIndex(company => company.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Company not found");
    }
    const updatedCompany = {
      ...companies[index],
      ...companyData,
      updatedAt: new Date().toISOString()
    };
    companies[index] = updatedCompany;
    saveCompaniesToStorage(companies);
    return { ...updatedCompany };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const companies = loadCompaniesFromStorage();
    const filteredCompanies = companies.filter(company => company.Id !== parseInt(id));
    if (filteredCompanies.length === companies.length) {
      throw new Error("Company not found");
    }
    saveCompaniesToStorage(filteredCompanies);
    return true;
  }
};