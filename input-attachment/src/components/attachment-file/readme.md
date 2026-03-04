# attachment-file



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type      | Default      |
| ------------------- | -------------------- | ----------- | --------- | ------------ |
| `accepts`           | `accepts`            |             | `string`  | `undefined`  |
| `filename`          | `filename`           |             | `string`  | `undefined`  |
| `filetype`          | `filetype`           |             | `string`  | `undefined`  |
| `max`               | `max`                |             | `number`  | `undefined`  |
| `name`              | `name`               |             | `string`  | `undefined`  |
| `percent`           | `percent`            |             | `number`  | `100`        |
| `preview`           | `preview`            |             | `boolean` | `true`       |
| `size`              | `size`               |             | `number`  | `undefined`  |
| `src`               | `src`                |             | `string`  | `undefined`  |
| `state`             | `state`              |             | `string`  | `"complete"` |
| `url`               | `url`                |             | `string`  | `undefined`  |
| `validationMessage` | `validation-message` |             | `string`  | `undefined`  |
| `value`             | `value`              |             | `string`  | `""`         |


## Events

| Event                        | Description | Type               |
| ---------------------------- | ----------- | ------------------ |
| `attachment-file:ready`      |             | `CustomEvent<any>` |
| `attachment-file:remove`     |             | `CustomEvent<any>` |
| `attachment-file:validation` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [input-attachment](../input-attachment)

### Depends on

- [attachment-preview](../attachment-preview)

### Graph
```mermaid
graph TD;
  attachment-file --> attachment-preview
  input-attachment --> attachment-file
  style attachment-file fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
