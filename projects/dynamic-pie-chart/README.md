# The Dynamic Pie Chart

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.11.

It aims to provide a `dynamic pie chart`, a sector diagram widget with a surrounding legend.

![Dynamic Pie Chart](./screen-copy.png)

## How to install and use `dynamic-pie-chart` in your application ?

A simple `npm install dynamic-pie-chart` will install this library

To include this component into a container, you just have to declare this section into the HTML template.

```
<lib-dynamic-pie-chart
	[radius]=150
	[active]=true
	[legend]=legend
	[slices$]=slices$
	[typeSlices$]=typeSlices$
	(selected)="sliceSelection($event)" 
	(activated)="sliceActivation($event)" 
	[pie]=1>
</lib-dynamic-pie-chart>
```

The parameters are :

Parameter | Comment
------------ | -------------
pie | the pie identifier inside the container. There can be multiple pies in the same component. Each pie must have a unique pie.
radius | the radius of the Pie in pixel.
active | Does this pie have to be active, or not ? A pie is a set of slices. An active pie allows each slice to be activated, or selected, by the mouse cursor.
legend | `true` or `false`. _Does this pie has a legend ?_  In this current release (1.0.0), the legend is a circle with lebel surrounding the pie.
slices$ | an observable which emits an array of slices. the sector diagram is made up of pieces, from various angles and whose sum is equal to 360.
typeSlices$ | an observable which emits an array of type od slices. 

## Input and output parameters of the widget ?




