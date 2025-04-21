export function useInputStyle(error?: string, extraClass = '') {
    return `
      w-full border rounded p-2 text-sm focus:outline-none focus:ring-2
      ${error ? 'border-red-600 focus:ring-red-600' : 'border-gray-300 focus:ring-purple-600'}
      ${extraClass}
    `.trim();
  }
  