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

## Todo

- [ ] Add API docs
- [ ] Add test section

## License

MIT © Ibrahim Elaradi
