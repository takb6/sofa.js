# iauTr

```js
rt = IAU.tr(r)
```

Transpose an r-matrix.

## Given:
```
   r        double[3][3]    r-matrix
```

## Returned:
```
   rt       double[3][3]    transpose
```

## Note:
```
   It is permissible for r and rt to be the same array.
```

## Called:
```
   iauCr        copy r-matrix
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.