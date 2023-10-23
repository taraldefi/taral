interface CreateApplication {
  title: string;
  entityId: string;
}

interface CreateApplicationResponse {
  title: string;
  issuanceDate: string;
  status: string;
  createdAt: string;
  id: string;
}

export { CreateApplication, CreateApplicationResponse };
