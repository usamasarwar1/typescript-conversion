interface ServerResponse<T> {
  readonly status: number;
  message: string;
  body: T; // Adjust the type as per your use case
}

const defaultServerResponse: ServerResponse<any> = {
  status: 400,
  message: "",
  body: [],
};

export { defaultServerResponse };
