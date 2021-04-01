# 0030 v-bind and v-model

## Interpolation to real data

Interpolation works in the innerHTML

## Directives

All view directives start with v-

### v-html

### v-show

The value of v-show is evaluated as truthy

### ```v-bind``` vs ```v-model```
n simple words v-model is for two way bindings means: if you change input value, the bound data will be changed and vice versa.

but v-bind:value is called one way binding that means: you can change input value by changing bound data but you can't change bound data by changing input value through the element.

check out this simple example: https://jsfiddle.net/gs0kphvc/

### v-model modifiers

There are quite a few modifiers that can fix input.  

* .lazy  -- Only reacts when the field changes, not just a letter
* .trim  -- trims leading and trailing blanks

Modifiers may be stacked.

<input type="input" v-model.trim.lazy="thing">

## data function

 <h2>The Model</h2>

```JavaScript
       data: function(){
           return {
               something:0,
               something_else:99
           }
       }
```

#### OR

```JavaScript
       data: {
           return {
               something:0,
               something_else:99
           }
```