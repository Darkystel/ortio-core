import { Command } from "./Command";
import { generateMocks } from "../mock";
import { Message } from "discord.js";
jest.setTimeout(15000);
test("Command", async () => {
  const { message, client } = await generateMocks(
    "test subtest hello",
    process.env
  );
  expect(message).toBeDefined();
  const command = new Command("test");
  const newCallback = (message: Message, args: string[]) => {
    return message;
  };
  expect(() => command.setInitialCommandHandler(newCallback)).not.toThrow();
  expect(() =>
    command.addSubCommand(
      "subtest",
      (message: Message, args: string[]) => message
    )
  ).not.toThrow();
  expect(() => command.exec(message, ["subtest"])).not.toThrow();
  afterAll(() => {
    client.destroy();
  });
});
