# The Dynamic Pie Chart

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.11.

It aims to provide a `dynamic pie chart`, a sector diagram widget with a surrounding legend.

![Dynamic Pie Chart](./screen-copy.png)

## How to install and use `dynamic-pie-chart` in your application ?

A simple `npm install dynamic-pie-chart` will install this library

To include this component into a container, you just have to declare this section into the HTML template.

```
<lib-dynamic-pie-chart
	[pie]=1
	[radius]=150
	[active]=true
	[legend]=legend
	[slices$]=slices$
	[typeSlices$]=typeSlices$
	(selected)="sliceSelection($event)" 
	(activated)="sliceActivation($event)">
</lib-dynamic-pie-chart>
```

The parameters are :

Parameter | Decorator | Comment
------------ | ------------- | -------------
pie | INPUT | the pie identifier inside the container. There can be multiple pies in the same component. Each pie must have a unique pie.
radius | INPUT | the radius of the Pie in pixel.
active | INPUT | Does this pie have to be active, or not ? A pie is a set of slices. An active pie allows each slice to be activated, or selected, by the mouse cursor.
legend | `true` or `false`. _Does this pie has a legend ?_  In this current release (1.0.0), the legend is a circle with lebel surrounding the pie.
slices$ | INPUT | an observable which publishes an array of slices to be drawn. Each sector diagram is made up of pieces, from various angles, and whose sum is equal to 360. _(This widget supports a sum of tranches lower than 360)_. This array will be internally sorted on the `type` property to provide a legend.
typeSlices$ | INPUT | an observable which publishes an array of type of slices. the array ol slices  
selected | OUTPUT |  an eventEmitter to inform the parent component that a slice has been activated
activated | OUTPUT |  an eventEmitter to inform the parent component that a slice has been selected


## What is a slice ?

For the component, the pie is an array of slices.

A Slice is a piece of the pie. 

Property | type | Comment
------------ | ------------- | -------------
id | number | the identifier of the slice, un unique number per pie
type | number | the type of slice
angle | number | the angle of this slice ***in degree**
offset | number | the offset (in degrees) of this slice within the pie. This property is there for internal use. Its value will be processed by the component. 
color | string | the color of this slice
contents | string | an array of objects associated to this slice. 
activated | boolean | `true` or `false` if this slice is activated (the end-user has clicked on its),
selected | boolean | `true` or `false` if this slice is selectecd (the end-user has clicked on its),





