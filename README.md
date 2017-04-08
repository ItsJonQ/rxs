# Reactive CSS

A super fast dynamic CSS rules. Dependency-free!

## Getting started
```
npm install reactive-css
```

## Example
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
