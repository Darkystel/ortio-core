import { Command } from "./Command";
import { mockClient, mockMessage } from "../mock";
import { Ortio } from "./Ortio";
import { Message } from "discord.js";
jest.setTimeout(15000);
test("Ortio", async () => {
  const client = await mockClient(process.env);
  const ortio = new Ortio({
    client,
  });
  const command = new Command("test");
  command.setInitialCommandHandler((message: Message, args: string[]) =>
    message.reply("Hi")
  );
  command.addSubCommand("subtest", (message: Message, args: string[]) =>
    message.reply("Hi sub")
  );
  expect(() => ortio.manuallyAttachCommands([command])).not.toThrow();
  await mockMessage(client, "test hi", process.env);
  await mockMessage(client, "test subtest", process.env);
  afterAll(() => {
    client.destroy();
  });
});
