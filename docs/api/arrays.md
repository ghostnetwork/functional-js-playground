arrays
=======

# Arrays
  * Construction:
    > not necessary to construct an instance; attached methods provide functionality
  * Public API
    * <code>Arrays.firstItem(array)</code>
      * Returns the first item in the given <code>array</code>; <code>undefined</code> if <code>array</code> is <code>[notExisty](TODO:add-link)</code> or empty.
    * <code>Arrays.lastItem(array)</code>
      * Returns the last item in the given <code>array</code>; <code>undefined</code> if <code>array</code> is <code>notExisty</code> or empty.
    * <code>Arrays.rangeOfItems(array, range)</code>
      * Parameters:
        - <code>array</code> The <code>[Array](TODO:add-link)</code> to retrieve the range of items from
        - <code>range</code> The <code>[Range](TODO:add-link)</code> of items to be retrieved
      * Returns an immutableArray the items in the given range from the given <code>array</code>; <code>undefined</code> if <code>array</code> or <code>range</code> are <code>notExisty</code>; also returns <code>undefined</code> if <code>array</code> is empty, or if the values inside the given <code>range</code> are not valid for the given <code>array</code>.

