'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type FormErrorContextType = {
  errors: Record<string, boolean>;
  setSectionError: (section: string, hasError: boolean) => void;
};

const FormErrorContext = createContext<FormErrorContextType | undefined>(undefined);

export const FormErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const setSectionError = (section: string, hasError: boolean) => {
    setErrors((prev) => ({ ...prev, [section]: hasError }));
  };

  return (
    <FormErrorContext.Provider value={{ errors, setSectionError }}>
      {children}
    </FormErrorContext.Provider>
  );
};

export const useFormErrorContext = () => {
  const context = useContext(FormErrorContext);
  if (!context) throw new Error('useFormErrorContext must be used within FormErrorProvider');
  return context;
};
