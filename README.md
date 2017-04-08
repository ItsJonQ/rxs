# Reactive CSS

A super fast dynamic CSS rules. Dependency-free at 1.5 KB minified!

## Installing
```
npm install reactive-css --save
```

## Getting Started
```html
<!-- Add a dynamic className to your element -->
<!-- It can be whatever className, you want. `.rx-` convention not required. -->
<div class="card rx-height">
  ...
</div>

<!-- Add the reactive-css script -->
<script src="../js/reactive-css.js"></script>
<!-- Define the reactive-css rules -->
<script>
  // Add a new CSS rule to the Reactive Stylesheet
  var rxHeight = rxs('.rx-height');

  window.addEventListener('resize', function() {
    // Everytime the window is resized, update the height property for
    // the class `.rx-height` to a computed height
    rxHeight.set({
      height: (window.innerHeight * 0.65) + 'px',
    });
  });
</script>
```

## Example Demo
Clone this repo, and open up the [example/index.html](https://github.com/ItsJonQ/reactive-css/blob/master/example/index.html) file.
