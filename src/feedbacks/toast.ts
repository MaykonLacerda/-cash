import { toast as toastify, ToastContent, ToastOptions } from 'react-toastify';

export const toast = <TData = unknown>(
  content: ToastContent<TData>, options?: ToastOptions | undefined,
) => toastify(content, {
    ...options,
    autoClose: 7000,
  });
