interface ServerResponse {
  readonly status: number;
  message: string;
  body: any[]; // Adjust the type as per your use case
}

const defaultServerResponse: ServerResponse = {
  status: 400,
  message: "",
  body: [],
};

export { defaultServerResponse };
