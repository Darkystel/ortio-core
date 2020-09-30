**@ortio/core**

> [README](../README.md) / [Globals](../globals.md) / ["classes/Ortio"](../modules/_classes_ortio_.md) / OrtioOptions

# Interface: OrtioOptions

## Hierarchy

* **OrtioOptions**

## Index

### Properties

* [client](_classes_ortio_.ortiooptions.md#client)
* [commandsPath](_classes_ortio_.ortiooptions.md#commandspath)
* [defaultPrefix](_classes_ortio_.ortiooptions.md#defaultprefix)
* [enabled](_classes_ortio_.ortiooptions.md#enabled)
* [filterRegex](_classes_ortio_.ortiooptions.md#filterregex)

## Properties

### client

•  **client**: Client

*Defined in [classes/Ortio.ts:37](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L37)*

An instance of the discord client

___

### commandsPath

•  **commandsPath**: string

*Defined in [classes/Ortio.ts:20](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L20)*

Relative paths to the commands directory for automatic composition

**`default`** "./commands"

___

### defaultPrefix

•  **defaultPrefix**: string

*Defined in [classes/Ortio.ts:32](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L32)*

The prefix used for parsing message content

**`default`** "&"

___

### enabled

• `Optional` **enabled**: undefined \| false \| true

*Defined in [classes/Ortio.ts:14](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L14)*

Whether the command handler is enabled or not

**`default`** true

___

### filterRegex

•  **filterRegex**: RegExp

*Defined in [classes/Ortio.ts:26](https://github.com/Darkystel/ortio-core/blob/af00dd2/src/classes/Ortio.ts#L26)*

Regular expression used to validate file names and only import from required ones

**`default`** /^\w+Command.(ts|js)$/
