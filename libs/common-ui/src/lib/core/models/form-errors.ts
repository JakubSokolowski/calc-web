export type FormErrors<T> = Partial<{ [F in keyof T]: string }>
