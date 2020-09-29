import { Client, Message, TextChannel } from "discord.js";

export const mockClient = async (env: any) => {
  const client = new Client();
  await client.login(env.TEST_TOKEN);
  return client;
};

export const generateMocks = async (
  content: string,
  env: any
): Promise<{ message: Message; client: Client }> => {
  const { TEST_TOKEN, TEST_GUILD_ID, TEST_CHANNEL_ID } = env;
  const client = new Client();
  await client.login(TEST_TOKEN);
  const channel = (await client.channels.fetch(
    TEST_CHANNEL_ID,
    false,
    true
  )) as TextChannel;
  if (channel) {
    const message = await channel.send(content);
    return {
      message,
      client,
    };
  } else throw new Error("Channel is not a text channel");
};

export const mockMessage = async (
  client: Client,
  content: string,
  env: any
) => {
  const channel = (await client.channels.fetch(
    env.TEST_CHANNEL_ID,
    false,
    true
  )) as TextChannel;
  if (channel) {
    const message = await channel.send(content);
    return {
      message,
      client,
    };
  } else throw new Error("Channel is not a text channel");
};
