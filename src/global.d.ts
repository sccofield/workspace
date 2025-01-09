/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    PaystackPop: {
      new (): PaystackPopInstance; // Define it as a constructable object
    };
  }
}

interface PaystackPopInstance {
  newTransaction: (options: {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    metadata?: Record<string, any>;
    onLoad?: (response: any) => void;
    onSuccess?: (transaction: { reference: string }) => void;
    onCancel?: () => void;
    onError?: (error: Error) => void;
  }) => void;

  open: () => void; // Define the open method
}
export {}; // Ensures the file is treated as a module
