**@ortio/core**

> [README](../README.md) / [Globals](../globals.md) / ["classes/Ortio"](../modules/_classes_ortio_.md) / Ortio

# Class: Ortio

Ortio class that manages a discord client

## Hierarchy

* **Ortio**

## Index

### Constructors

* [constructor](_classes_ortio_.ortio.md#constructor)

### Properties

* [\_commands](_classes_ortio_.ortio.md#_commands)
* [\_root](_classes_ortio_.ortio.md#_root)
* [client](_classes_ortio_.ortio.md#client)

### Methods

* [automaticallyComposeCommands](_classes_ortio_.ortio.md#automaticallycomposecommands)
* [disable](_classes_ortio_.ortio.md#disable)
* [enable](_classes_ortio_.ortio.md#enable)
* [manuallyAttachCommands](_classes_ortio_.ortio.md#manuallyattachcommands)

### Object literals

* [\_options](_classes_ortio_.ortio.md#_options)

## Constructors

### constructor

\+ **new Ortio**(`options`: Partial\<Omit\<[OrtioOptions](../interfaces/_classes_ortio_.ortiooptions.md), \"client\">> & Pick\<[OrtioOptions](../interfaces/_classes_ortio_.ortiooptions.md), \"client\">): [Ortio](_classes_ortio_.ortio.md)

*Defined in [classes/Ortio.ts:55](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L55)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`options` | Partial\<Omit\<[OrtioOptions](../interfaces/_classes_ortio_.ortiooptions.md), \"client\">> & Pick\<[OrtioOptions](../interfaces/_classes_ortio_.ortiooptions.md), \"client\"> | Options that define this Ortio instance  |

**Returns:** [Ortio](_classes_ortio_.ortio.md)

## Properties

### \_commands

• `Private` **\_commands**: [Command](_classes_command_.command.md)[] = []

*Defined in [classes/Ortio.ts:55](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L55)*

___

### \_root

• `Private` **\_root**: string

*Defined in [classes/Ortio.ts:48](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L48)*

___

### client

•  **client**: Client

*Defined in [classes/Ortio.ts:47](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L47)*

Instance of client to be used for commands handled by this ortio instance

## Methods

### automaticallyComposeCommands

▸ **automaticallyComposeCommands**(`customParser?`: undefined \| (message: Message) => ParsedMessage\<Message>): Promise\<void>

*Defined in [classes/Ortio.ts:98](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L98)*

Automatically compose commands from the specified path on initialized options

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`customParser?` | undefined \| (message: Message) => ParsedMessage\<Message> | A custom parser to be used for extracting commands  |

**Returns:** Promise\<void>

___

### disable

▸ **disable**(): this

*Defined in [classes/Ortio.ts:194](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L194)*

Disable command execution

**Returns:** this

___

### enable

▸ **enable**(): this

*Defined in [classes/Ortio.ts:187](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L187)*

Enable command execution

**Returns:** this

___

### manuallyAttachCommands

▸ **manuallyAttachCommands**(`commands`: [Command](_classes_command_.command.md)[], `customParser?`: undefined \| (message: Message) => ParsedMessage\<Message>): void

*Defined in [classes/Ortio.ts:160](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L160)*

Manually attach the passed commands to the client

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`commands` | [Command](_classes_command_.command.md)[] | The commands to be attached to the client |
`customParser?` | undefined \| (message: Message) => ParsedMessage\<Message> | A custome parser for extracting commands from messages  |

**Returns:** void

## Object literals

### \_options

▪ `Private` **\_options**: object

*Defined in [classes/Ortio.ts:49](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L49)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`commandsPath` | string | "./commands" |
`defaultPrefix` | string | "&" |
`enabled` | true | true |
`filterRegex` | RegExp | /^\w+Command.(ts\|js)$/ |
