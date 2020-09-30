import { Client, Message } from "discord.js";
import ora from "ora";
import { readdirSync } from "fs";
import { join, relative, resolve } from "path";
import { Command } from "./Command";
import { parse, ParsedMessage } from "discord-command-parser";
const rexThisFile = /\bOrtio\.[tj]s:/i;
export interface OrtioOptions {
  /**
   * Whether the command handler is enabled or not
   * @type {boolean}
   * @default true
   */
  enabled?: boolean;
  /**
   * Relative paths to the commands directory for automatic composition
   * @type {string}
   * @default "./commands"
   */
  commandsPath: string;
  /**
   * Regular expression used to validate file names and only import from required ones
   * @type {RegExp}
   * @default /^\w+Command.(ts|js)$/
   */
  filterRegex: RegExp;
  /**
   * The prefix used for parsing message content
   * @type {string}
   * @default "&"
   */
  defaultPrefix: string;
  /**
   * An instance of the discord client
   * @type {Client}
   */
  client: Client;
}

/**
 * Ortio class that manages a discord client
 */
export class Ortio {
  /**
   * Instance of client to be used for commands handled by this ortio instance
   */
  public client: Client;
  private _root: string;
  private _options: Omit<OrtioOptions, "client"> = {
    enabled: true,
    commandsPath: "./commands",
    filterRegex: /^\w+Command.(ts|js)$/,
    defaultPrefix: "&",
  };
  private _commands: Command[] = [];
  /**
   *
   * @param options Options that define this Ortio instance
   */
  constructor(
    options: Partial<Omit<OrtioOptions, "client">> &
      Pick<OrtioOptions, "client">
  ) {
    const stackLines = new Error().stack?.split(/\r\n|\r|\n/);
    if (stackLines) {
      const line = stackLines.find(
        (line, index) => index > 0 && !rexThisFile.test(line)
      );
      if (line) {
        const splitDirname = line
          .replace(/^\s*at\s*/, "")
          .replace(/\w+\.[tj]s[:\d]+$/, "")
          .replace(/^file:\/\//, "")
          .split("/");
        splitDirname.pop();
        splitDirname.shift();
        const instanceOfDirName = splitDirname.join("/");
        this._root = relative(
          __dirname,
          instanceOfDirName.startsWith("/")
            ? instanceOfDirName
            : `/${instanceOfDirName}`
        );
      } else this._root = relative(__dirname, process.cwd());
    } else this._root = relative(__dirname, process.cwd());

    this._options = {
      ...this._options,
      ...options,
    };

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
      resolve(__dirname, join(this._root, this._options.commandsPath))
    ).filter((file) => this._options.filterRegex.test(file));
    resolvingDirectorySpinner.succeed();
    const importingFiles = ora("Importing command files..").start();
    const entities = await Promise.all(
      files.map(
        async (file) =>
          await import(
            join(
              this._root,
              this._options.commandsPath,
              file.replace(/(\.ts|\.js)/g, "")
            )
          )
      )
    );
    const commands: Command[] = entities
      .map((entity) => {
        if (entity instanceof Command) return entity as Command;
        else {
          for (const key in entity) {
            if (Object.prototype.hasOwnProperty.call(entity, key)) {
              if (entity[key] instanceof Command) return entity[key] as Command;
            }
          }
        }
      })
      .filter((entity) => entity !== undefined && entity !== null) as Command[];
    importingFiles.succeed();
    this._commands = commands;
    console.log(this._commands);
    const attachingCommands = ora("Attaching commands..").start();
    this.client.on("message", (message: Message) => {
      if (!this._options.enabled) return;
      let parsed: ParsedMessage<Message>;
      if (customParser) {
        parsed = customParser(message);
      } else {
        parsed = parse(message, this._options.defaultPrefix);
      }
      console.log(parsed);
      if (parsed.success) {
        const { arguments: args } = parsed;
        this._commands.forEach((command) => {
          console.log(command);
          if (command.name) command.exec(message, args);
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
    this._commands = commands;
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
        this._commands.forEach((command) => {
          if (command.name) command.exec(message, args);
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
