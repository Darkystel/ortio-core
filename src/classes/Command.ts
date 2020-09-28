import { Message } from "discord.js";

export type CommandExecutionHandler = (
  message: Message,
  args: string[]
) => void;

export interface SubCommand {
  /**
   * An identifier that executes this command
   */
  name: string;
  /**
   * The function to be executed when this subcommand is initiated
   */
  handler: CommandExecutionHandler;
}

export class Command {
  /**
   * An identifier that opts into this command
   */
  private _name: string;
  get name(): string {
    return this._name;
  }
  /**
   * An initial handler to execute when this command is run without subcommands
   */
  private initialHandler: CommandExecutionHandler = this.initialExecution;
  /**
   * A list of subcommands stored inside this supercommand
   */
  private subCommands: SubCommand[] = [];
  constructor(name: string) {
    this._name = name;
  }
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
  public _exec(message: Message, args: string[]) {
    const foundIndex = this.subCommands.findIndex(
      (subCommand) => subCommand.name === args[0]
    );
    if (foundIndex < 0) {
      this.initialHandler(message, args);
      return;
    } else {
      this.subCommands[foundIndex].handler(message, args);
      return;
    }
  }
}
