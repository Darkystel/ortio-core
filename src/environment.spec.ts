test("Environment variables", () => {
  expect(process.env.TEST_TOKEN).toBeDefined();
  expect(process.env.TEST_GUILD_ID).toBeDefined();
});
