**@ortio/core**

> [README](../README.md) / [Globals](../globals.md) / ["classes/Command"](../modules/_classes_command_.md) / Command

# Class: Command

A class that defines a command

## Hierarchy

* **Command**

## Index

### Constructors

* [constructor](_classes_command_.command.md#constructor)

### Properties

* [initialHandler](_classes_command_.command.md#initialhandler)
* [name](_classes_command_.command.md#name)
* [subCommands](_classes_command_.command.md#subcommands)

### Methods

* [addSubCommand](_classes_command_.command.md#addsubcommand)
* [exec](_classes_command_.command.md#exec)
* [initialExecution](_classes_command_.command.md#initialexecution)
* [setInitialCommandHandler](_classes_command_.command.md#setinitialcommandhandler)

## Constructors

### constructor

\+ **new Command**(`name`: string): [Command](_classes_command_.command.md)

*Defined in [classes/Command.ts:53](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Command.ts#L53)*

Constructor for Command

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The special identifier associated with this command  |

**Returns:** [Command](_classes_command_.command.md)

## Properties

### initialHandler

• `Private` **initialHandler**: [CommandExecutionHandler](../modules/_classes_command_.md#commandexecutionhandler) = this.initialExecution

*Defined in [classes/Command.ts:48](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Command.ts#L48)*

An initial handler to execute when this command is run without subcommands

___

### name

•  **name**: string

*Defined in [classes/Command.ts:43](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Command.ts#L43)*

An identifier that opts into this command

___

### subCommands

• `Private` **subCommands**: [SubCommand](../interfaces/_classes_command_.subcommand.md)[] = []

*Defined in [classes/Command.ts:53](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Command.ts#L53)*

A list of subcommands stored inside this supercommand

## Methods

### addSubCommand

▸ **addSubCommand**(`name`: string, `executionCallback`: [CommandExecutionHandler](../modules/_classes_command_.md#commandexecutionhandler)): this

*Defined in [classes/Command.ts:85](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Command.ts#L85)*

This function overwrites the subcommand with the new call back @param executionCallback if it exists
or creates a new subcommand if none were found

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | Name of the subcommand |
`executionCallback` | [CommandExecutionHandler](../modules/_classes_command_.md#commandexecutionhandler) | The function to be executed when this command is run  |

**Returns:** this

___

### exec

▸ **exec**(`message`: Message, `args`: string[]): void

*Defined in [classes/Command.ts:107](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Command.ts#L107)*

A function that forwards execution based on level

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | Message | The message that triggered this instance of Command |
`args` | string[] | Arguments parsed from the special command parser defined by Ortio instance  |

**Returns:** void

___

### initialExecution

▸ `Private`**initialExecution**(`message`: Message, `args`: string[]): void

*Defined in [classes/Command.ts:66](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Command.ts#L66)*

The function that executes when this command is triggered

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | Message | The message that triggered execution of this function |
`args` | string[] | Arguments parsed from message.content  |

**Returns:** void

___

### setInitialCommandHandler

▸ **setInitialCommandHandler**(`executionCallback`: [CommandExecutionHandler](../modules/_classes_command_.md#commandexecutionhandler)): this

*Defined in [classes/Command.ts:73](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Command.ts#L73)*

This function overwrites whatever function is stored in this instance with a new function @param executionCallback

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`executionCallback` | [CommandExecutionHandler](../modules/_classes_command_.md#commandexecutionhandler) | The function that will be executed when this command is run without subcommands  |

**Returns:** this
