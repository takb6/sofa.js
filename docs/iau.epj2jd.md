# iauEpj2jd

```js
[djm0, djm] = IAU.epj2jd(epj)
```

Julian Epoch to Julian Date.

## Given:
```
   epj      double    Julian Epoch (e.g. 1996.8)
```

## Returned:
```
   djm0     double    MJD zero-point: always 2400000.5
   djm      double    Modified Julian Date
```

## Note:

```
   The Julian Date is returned in two pieces, in the usual SOFA
   manner, which is designed to preserve time resolution.  The
   Julian Date is available as a single number by adding djm0 and
   djm.
```

## Reference:

   Lieske, J.H., 1979, Astron.Astrophys. 73, 282.

This revision:  2013 August 7

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.