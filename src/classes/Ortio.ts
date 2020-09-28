import { Client, Message } from "discord.js";
import ora from "ora";
import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "./Command";
import { parse, ParsedMessage, BasicMessage } from "discord-command-parser";

export interface OrtioOptions {
  /**
   * Whether the command handler is enabled or not
   * @default true
   */
  enabled?: boolean;
  /**
   * Relative paths to the commands directory for automatic composition
   * @default "./commands"
   */
  commandsPath: string;
  /**
   * Regular expression used to validate file names and only import from required ones
   * @default /^\w+Command.(ts|js)$/
   */
  filterRegex: RegExp;
  /**
   * The prefix used for parsing message content
   * @default "&"
   */
  defaultPrefix: string;
  /**
   * An instance of the discord client
   */
  client: Client;
}

export class Ortio {
  /**
   * Instance of client to be used for commands handled by this ortio instance
   */
  public client: Client;
  private _options: Omit<OrtioOptions, "client"> = {
    commandsPath: "./commands",
    filterRegex: /^\w+Command.(ts|js)$/,
    defaultPrefix: "&",
  };
  constructor(
    options: Partial<Omit<OrtioOptions, "client">> &
      Pick<OrtioOptions, "client">
  ) {
    this._options = { ...this._options, ...options };
    this.client = options.client;
  }
  /**
   * Automatically compose commands from the specified path on initialized options
   * @param customParser A custom parser to be used for extracting commands
   */
  public async automaticallyComposeCommands(
    customParser?: (message: Message) => ParsedMessage<Message>
  ) {
    const resolvingDirectorySpinner = ora("Resolving directory..").start();
    const files = readdirSync(
      join(__dirname, this._options.commandsPath)
    ).filter((file) => this._options.filterRegex.test(file));
    resolvingDirectorySpinner.succeed();
    const importingFiles = ora("Importing command files..").start();
    const entities = await Promise.all(
      files.map(
        async (file) =>
          await import(
            join(this._options.commandsPath, file.replace(/(\.ts|\.js)/g, ""))
          )
      )
    );
    const commands: Command[] = entities
      .map((entity) => {
        if (entity instanceof Command) return entity as Command;
        if (
          Object.prototype.hasOwnProperty.call(entity, "default") ||
          entity.default instanceof Command
        )
          return entity as Command;
        return undefined;
      })
      .filter((entity) => entity !== undefined && entity !== null) as Command[];
    importingFiles.succeed();
    const attachingCommands = ora("Attaching commands..").start();
    this.client.on("message", (message: Message) => {
      if (!this._options.enabled) return;
      let parsed: ParsedMessage<Message>;
      if (customParser) {
        parsed = customParser(message);
      } else {
        parsed = parse(message, this._options.defaultPrefix);
      }
      if (parsed.success) {
        const { arguments: args } = parsed;
        commands.forEach((command) => {
          if (command.name) command._exec(message, args);
        });
      }
    });
    attachingCommands.succeed();
    return;
  }
  /**
   * Manually attach the passed commands to the client
   * @param commands The commands to be attached to the client
   * @param customParser A custome parser for extracting commands from messages
   */
  public manuallyAttachCommands(
    commands: Command[],
    customParser?: (message: Message) => ParsedMessage<Message>
  ) {
    const attachingCommands = ora("Attaching commands..").start();
    this.client.on("message", (message: Message) => {
      if (!this._options.enabled) return;
      let parsed: ParsedMessage<Message>;
      if (customParser) {
        parsed = customParser(message);
      } else {
        parsed = parse(message, this._options.defaultPrefix);
      }
      if (parsed.success) {
        const { arguments: args } = parsed;
        commands.forEach((command) => {
          if (command.name) command._exec(message, args);
        });
      }
    });
    attachingCommands.succeed();
    return;
  }
  /**
   * Enable command execution
   */
  enable(): this {
    this._options.enabled = true;
    return this;
  }
  /**
   * Disable command execution
   */
  disable(): this {
    this._options.enabled = false;
    return this;
  }
}
