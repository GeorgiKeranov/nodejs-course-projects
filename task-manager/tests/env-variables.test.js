test('Are the enviroment variables set', () => {
    expect(process.env.MONGODB_CONNECTION_URI).toBeTruthy();
    expect(process.env.JWT_SECRET_KEY).toBeTruthy();
});
