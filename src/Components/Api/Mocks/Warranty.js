/* mock response for warranty forms */
const testMock = mockAdapter => {
  mockAdapter.onGet('/users').reply(200, {
    users: [
      { id: 1, name: 'John Smith' }
    ]
  });
};

const warrantySave = mockAdapter => {
  mockAdapter.onPost(/\/warranty\/.*/).reply(200, {
    message: 'Your warranty has been registered.',
  });
  mockAdapter.onGet('/warranty').reply(500, {});
};

export default function applyWarrantyMocks(mockAdapter) {
  testMock(mockAdapter);
  warrantySave(mockAdapter);
}
