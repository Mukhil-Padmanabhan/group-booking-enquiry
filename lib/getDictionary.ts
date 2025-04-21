export const getDictionary = async (locale: string) => {
  const messages = await import(`@/messages/${locale}.json`);
  return messages.default;
};
