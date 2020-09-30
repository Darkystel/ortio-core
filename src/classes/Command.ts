import { Message } from "discord.js";

/**
 * A function that executes when this command is triggered
 */
export type CommandExecutionHandler = (
  /**
   * The message that triggered this command to execute
   * @type {Message}
   */
  message: Message,
  /**
   * Parsed arguments from message.content
   * @type {string[]}
   */
  args: string[]
) => void;

/**
 * An interface for SubCommands associated with the command
 */
export interface SubCommand {
  /**
   * An identifier that executes this command
   * @type {string}
   */
  name: string;
  /**
   * The function to be executed when this subcommand is initiated
   * @type {CommandExecutionHandler}
   */
  handler: CommandExecutionHandler;
}

/**
 * A class that defines a command
 */
export class Command {
  /**
   * An identifier that opts into this command
   * @type {string}
   */
  public name: string;
  /**
   * An initial handler to execute when this command is run without subcommands
   * @type {CommandExecutionHandler}
   */
  private initialHandler: CommandExecutionHandler = this.initialExecution;
  /**
   * A list of subcommands stored inside this supercommand
   * @type {SubCommand}
   */
  private subCommands: SubCommand[] = [];
  /**
   * Constructor for Command
   * @param name The special identifier associated with this command
   */
  constructor(name: string) {
    this.name = name;
  }
  /**
   * The function that executes when this command is triggered
   * @param message The message that triggered execution of this function
   * @param args Arguments parsed from message.content
   */
  private initialExecution(message: Message, args: string[]) {
    message.reply("No execution was initialized to this command");
  }
  /**
   * This function overwrites whatever function is stored in this instance with a new function @param executionCallback
   * @param executionCallback The function that will be executed when this command is run without subcommands
   */
  public setInitialCommandHandler(
    executionCallback: CommandExecutionHandler
  ): this {
    this.initialHandler = executionCallback;
    return this;
  }
  /**
   * This function overwrites the subcommand with the new call back @param executionCallback if it exists
   * or creates a new subcommand if none were found
   * @param name Name of the subcommand
   * @param executionCallback The function to be executed when this command is run
   */
  public addSubCommand(
    name: string,
    executionCallback: CommandExecutionHandler
  ): this {
    const foundIndex = this.subCommands.findIndex(
      (subCommand) => subCommand.name === name
    );
    if (foundIndex < 0) {
      this.subCommands.push({
        name,
        handler: executionCallback,
      });
    } else {
      this.subCommands[foundIndex].handler = executionCallback;
    }
    return this;
  }
  /**
   * A function that forwards execution based on level
   * @param message The message that triggered this instance of Command
   * @param args Arguments parsed from the special command parser defined by Ortio instance
   */
  public exec(message: Message, args: string[]) {
    const foundIndex = this.subCommands.findIndex(
      (subCommand) => subCommand.name === args[0]
    );
    if (foundIndex < 0) {
      this.initialHandler(message, args);
      return;
    } else {
      args.shift();
      this.subCommands[foundIndex].handler(message, args);
      return;
    }
  }
}
