import contactsData from "@/services/mockData/contacts.json";

const STORAGE_KEY = "crm_contacts";

const loadContactsFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsData));
  return contactsData;
};

const saveContactsToStorage = (contacts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const contactService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...loadContactsFromStorage()];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const contacts = loadContactsFromStorage();
    return contacts.find(contact => contact.Id === parseInt(id));
  },

  create: async (contactData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const contacts = loadContactsFromStorage();
    const maxId = Math.max(...contacts.map(c => c.Id), 0);
    const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedContacts = [...contacts, newContact];
    saveContactsToStorage(updatedContacts);
    return { ...newContact };
  },

  update: async (id, contactData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const contacts = loadContactsFromStorage();
    const index = contacts.findIndex(contact => contact.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    const updatedContact = {
      ...contacts[index],
      ...contactData,
      updatedAt: new Date().toISOString()
    };
    contacts[index] = updatedContact;
    saveContactsToStorage(contacts);
    return { ...updatedContact };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const contacts = loadContactsFromStorage();
    const filteredContacts = contacts.filter(contact => contact.Id !== parseInt(id));
    if (filteredContacts.length === contacts.length) {
      throw new Error("Contact not found");
    }
    saveContactsToStorage(filteredContacts);
    return true;
  }
};