**@ortio/core**

> README / [Globals](globals.md)

# Ortio 1.0.x

A simple package that provides an easy to use development environment for command driven discord bots

## Install

In your project root, run the following:

- Using NPM `npm i @ortio/core --save`
- Using Yarn `yarn add @ortio/core`

## Usage

```
// src/index.js
// ES6 Import
import { Client } from "discord.js";
import { Ortio } from "@ortio/core";
// Or
const { Client } = require("discord.js");
const { Ortio } = require("@ortio/core");

// Create an instance of Client
const client = new Client(/* ... */);

// Create an instance of Ortio
const ortio = new Ortio({
  // The client instance
  client,
})
```

Make a directory in `src` and name it commands, each file will have its own command, structured as follows

```
// src/commands/SomeCommand.js
import { Command } from "@ortio/core";
// or const { Command } = require("@ortio/core");
const command = new Command("ping");
command
  .setInitialCommandHandler(
    (message, args) => {
      message.reply("pong");
    }
  );

export default command;
// or module.exports = command;
```

Ortio offers two options to compose commands and attach them into the client message listener

```
// Automatic
ortio.automaticallyComposeCommands(); // async

// Manual
import helpCommand from "./commands/HelpCommand.js";
import pingCommand from "./commands/PingCommand.js";
ortio.manuallyAttachCommands(
  [helpCommand, pingCommand]
);
```

## API

### **Class**: Command

A class that defines a command

#### Constructor

\+ **new Command**(`name`: string)

| Parameter | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| `name`    | string | A special identifier associated with this command |

#### Methods

▸ **setInitialCommandHandler**(`executionCallback`: CommandExecutionHandler): this

This function overwrites whatever function is stored in this instance with a new function @param executionCallback

##### Parameters:

| Name                | Type                    | Description                                                                     |
| ------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| `executionCallback` | CommandExecutionHandler | The function that will be executed when this command is run without subcommands |

**Returns:** this

▸ **addSubCommand**(`name`: string, `executionCallback`: CommandExecutionHandler): this

This function overwrites the subcommand with the new call back executionCallback if it exists
or creates a new subcommand if none were found

##### Parameters:

| Name                | Type                    | Description                                          |
| ------------------- | ----------------------- | ---------------------------------------------------- |
| `name`              | string                  | Name of the subcommand                               |
| `executionCallback` | CommandExecutionHandler | The function to be executed when this command is run |

**Returns:** this

---

### **Class**: Ortio

Ortio class that manages a discord client

#### Constructor

\+ **new Ortio**(`options`: OrtioOptions)

**Options:**
Name | Type | Default Value | Description
------ | ------ | ------ |
`client` | Discord.Client | none | **Required** The client instance that will be managed by Ortio |
`commandsPath` | string | "./commands" | **Optional** The relative path to the commands directory |
`defaultPrefix` | string | "&" | **Optional** The special prefix character to be used by the default parser |
`enabled` | true | true | **Optional** If set to false, no commands will be forwarded to the command handlers |
`filterRegex` | RegExp | /^\w+Command.(ts\|js)\$/ | **Optional** A filtering regex to apply to file names in the automatic import of commands |

---

#### Methods

▸ **automaticallyComposeCommands**(`customParser?`: undefined \| (message: Message) => ParsedMessage\<Message>): Promise\<void>

Automatically compose commands from the specified path on initialized options

#### Parameters:

| Name            | Type                                                       | Description                                        |
| --------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| `customParser?` | undefined \| (message: Message) => ParsedMessage\<Message> | A custom parser to be used for extracting commands |

**Returns:** Promise\<void>

▸ **manuallyAttachCommands**(`commands`: Command[], `customParser?`: undefined \| (message: Message) => ParsedMessage\<Message>): void

Manually attach the passed commands to the client

#### Parameters:

| Name            | Type                                                       | Description                                            |
| --------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| `commands`      | Command[]                                                  | The commands to be attached to the client              |
| `customParser?` | undefined \| (message: Message) => ParsedMessage\<Message> | A custome parser for extracting commands from messages |

**Returns:** void

▸ **enable**(): this

Enable command execution

**Returns:** this

▸ **disable**(): this

Disable command execution

**Returns:** this

[More docs..](./docs/globals.md)

## Todo

- [ ] Add API docs
- [ ] Add test section

## License

MIT © Ibrahim Elaradi
