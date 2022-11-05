export const getContacts = store => store.contacts.items;
export const getState = ({ contacts }) => ({
  loading: contacts.loading,
  error: contacts.error,
});
export const getFilteredContacts = ({ contacts, filter }) => {
  if (filter.length === 0) {
    return contacts.items;
  }
  const normalisedFilter = filter.toLowerCase();
  const filteredContacts = contacts.items.filter(({ name }) => {
    const normalizedName = name.toLowerCase();
    const result = normalizedName.includes(normalisedFilter);
    return result;
  });
  return filteredContacts;
};
