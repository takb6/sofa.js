function iauAticqn(ri, di, astrom, n, b)
/*
**  - - - - - - - - -
**   i a u A t i c q n
**  - - - - - - - - -
**
**  Quick CIRS to ICRS astrometric place transformation, given the star-
**  independent astrometry parameters plus a list of light-deflecting
**  bodies.
**
**  Use of this function is appropriate when efficiency is important and
**  where many star positions are all to be transformed for one date.
**  The star-independent astrometry parameters can be obtained by
**  calling one of the functions iauApci[13], iauApcg[13], iauApco[13]
**  or iauApcs[13].
*
*  If the only light-deflecting body to be taken into account is the
*  Sun, the iauAticq function can be used instead.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     ri,di  double      CIRS RA,Dec (radians)
**     astrom iauASTROM*  star-independent astrometry parameters:
**      pmt    double       PM time interval (SSB, Julian years)
**      eb     double[3]    SSB to observer (vector, au)
**      eh     double[3]    Sun to observer (unit vector)
**      em     double       distance from Sun to observer (au)
**      v      double[3]    barycentric observer velocity (vector, c)
**      bm1    double       sqrt(1-|v|^2): reciprocal of Lorenz factor
**      bpn    double[3][3] bias-precession-nutation matrix
**      along  double       longitude + s' (radians)
**      xpl    double       polar motion xp wrt local meridian (radians)
**      ypl    double       polar motion yp wrt local meridian (radians)
**      sphi   double       sine of geodetic latitude
**      cphi   double       cosine of geodetic latitude
**      diurab double       magnitude of diurnal aberration vector
**      eral   double       "local" Earth rotation angle (radians)
**      refa   double       refraction constant A (radians)
**      refb   double       refraction constant B (radians)
**      n     int           number of bodies (Note 3)
**      b     iauLDBODY[n] data for each of the n bodies (Notes 3,4):
**       bm    double       mass of the body (solar masses, Note 5)
**       dl    double       deflection limiter (Note 6)
**       pv    [2][3]       barycentric PV of the body (au, au/day)
**
**  Returned:
**     rc,dc  double     ICRS astrometric RA,Dec (radians)
**
**  Notes:
**
**  1) Iterative techniques are used for the aberration and light
**     deflection corrections so that the functions iauAticqn and
**     iauAtciqn are accurate inverses; even at the edge of the Sun's
**     disk the discrepancy is only about 1 nanoarcsecond.
**
**  2) If the only light-deflecting body to be taken into account is the
**     Sun, the iauAticq function can be used instead.
**
**  3) The struct b contains n entries, one for each body to be
**     considered.  If n = 0, no gravitational light deflection will be
**     applied, not even for the Sun.
**
**  4) The struct b should include an entry for the Sun as well as for
**     any planet or other body to be taken into account.  The entries
**     should be in the order in which the light passes the body.
**
**  5) In the entry in the b struct for body i, the mass parameter
**     b[i].bm can, as required, be adjusted in order to allow for such
**     effects as quadrupole field.
**
**  6) The deflection limiter parameter b[i].dl is phi^2/2, where phi is
**     the angular separation (in radians) between star and body at
**     which limiting is applied.  As phi shrinks below the chosen
**     threshold, the deflection is artificially reduced, reaching zero
**     for phi = 0.   Example values suitable for a terrestrial
**     observer, together with masses, are as follows:
**
**        body i     b[i].bm        b[i].dl
**
**        Sun        1.0            6e-6
**        Jupiter    0.00095435     3e-9
**        Saturn     0.00028574     3e-10
**
**  7) For efficiency, validation of the contents of the b array is
**     omitted.  The supplied masses must be greater than zero, the
**     position and velocity vectors must be right, and the deflection
**     limiter greater than zero.
**
**  Called:
**     iauS2c       spherical coordinates to unit vector
**     iauTrxp      product of transpose of r-matrix and p-vector
**     iauZp        zero p-vector
**     iauAb        stellar aberration
**     iauLdn       light deflection by n bodies
**     iauC2s       p-vector to spherical
**     iauAnp       normalize angle into range +/- pi
**
**  This revision:   2013 October 9
**
**  SOFA release 2016-05-03
**
**  Copyright (C) 2016 IAU SOFA Board.  See notes at end.
*/
{
   var rc = 0.0;;
   var dc = 0.0;;
   var _rv7;

   var j, i;
   var pi = [], ppr = [], pnat = [], pco = [], w, d = [], before = [], r2, r, after = [];


/* CIRS RA,Dec to Cartesian. */
   pi = iauS2c(ri, di);

/* Bias-precession-nutation, giving GCRS proper direction. */
   ppr = iauTrxp(astrom.bpn, pi);

/* Aberration, giving GCRS natural direction. */
   d = iauZp(d);
   for (j = 0; j < 2; j++) {
      r2 = 0.0;
      for (i = 0; i < 3; i++) {
         w = ppr[i] - d[i];
         before[i] = w;
         r2 += w*w;
      }
      r = Math.sqrt(r2);
      for (i = 0; i < 3; i++) {
         before[i] /= r;
      }
      after = iauAb(before, astrom.v, astrom.em, astrom.bm1);
      r2 = 0.0;
      for (i = 0; i < 3; i++) {
         d[i] = after[i] - before[i];
         w = ppr[i] - d[i];
         pnat[i] = w;
         r2 += w*w;
      }
      r = Math.sqrt(r2);
      for (i = 0; i < 3; i++) {
         pnat[i] /= r;
      }
   }

/* Light deflection, giving BCRS coordinate direction. */
   d = iauZp(d);
   for (j = 0; j < 5; j++) {
      r2 = 0.0;
      for (i = 0; i < 3; i++) {
         w = pnat[i] - d[i];
         before[i] = w;
         r2 += w*w;
      }
      r = Math.sqrt(r2);
      for (i = 0; i < 3; i++) {
         before[i] /= r;
      }
      after = iauLdn(n, b, astrom.eb, before);
      r2 = 0.0;
      for (i = 0; i < 3; i++) {
         d[i] = after[i] - before[i];
         w = pnat[i] - d[i];
         pco[i] = w;
         r2 += w*w;
      }
      r = Math.sqrt(r2);
      for (i = 0; i < 3; i++) {
         pco[i] /= r;
      }
   }

/* ICRS astrometric RA,Dec. */
   (_rv7 = iauC2s(pco))[0];
   w = _rv7[0];
   dc = _rv7[1];
   rc = iauAnp(w);

/* Finished. */

/*
 *+----------------------------------------------------------------------
 *
 *  IAU SOFA functions converted to JS
 *  http:://www.github.com/mgreter/sofa.js
 *  2016 by Marcel Greter
 *
 *  The conversion is done by a custom hacked perl script.
 *  Automatically generates QUnit tests for all functions.
 *
 *  Please read notice below, as all rights go to the Standards
 *  Of Fundamental Astronomy (SOFA) Review Board of the International
 *  Astronomical Union, as far as applicable. There is no guarantee
 *  that the conversion is bug free and I give no warranty of
 *  usability or correctness whatsoever.
 *
 *  The agreement below (3c/d) says that functions should
 *  be renamed. From the preface I guess this only applies
 *  if the function behavior was changed in any way. Since
 *  this is a one-to-one conversion, it shouldn't apply?
 *
 *+----------------------------------------------------------------------
 * SOFA-Issue: 2016-05-03
 *+----------------------------------------------------------------------
 *
 *  Copyright (C) 2016
 *  Standards Of Fundamental Astronomy Review Board
 *  of the International Astronomical Union.
 *
 *  =====================
 *  SOFA Software License
 *  =====================
 *
 *  NOTICE TO USER:
 *
 *  BY USING THIS SOFTWARE YOU ACCEPT THE FOLLOWING TERMS AND CONDITIONS
 *  WHICH APPLY TO ITS USE.
 *
 *  1. The Software is owned by the IAU SOFA Review Board ("the Board").
 *
 *  2. Permission is granted to anyone to use the SOFA software for any
 *     purpose, including commercial applications, free of charge and
 *     without payment of royalties, subject to the conditions and
 *     restrictions listed below.
 *
 *  3. You (the user) may copy and adapt the SOFA software and its
 *     algorithms for your own purposes and you may copy and distribute
 *     a resulting "derived work" to others on a world-wide, royalty-free
 *     basis, provided that the derived work complies with the following
 *     requirements:
 *
 *     a) Your work shall be marked or carry a statement that it (i) uses
 *        routines and computations derived by you from software provided
 *        by SOFA under license to you; and (ii) does not contain
 *        software provided by SOFA or software that has been distributed
 *        by or endorsed by SOFA.
 *
 *     b) The source code of your derived work must contain descriptions
 *        of how the derived work is based upon and/or differs from the
 *        original SOFA software.
 *
 *     c) The name(s) of all routine(s) that you distribute shall differ
 *        from the SOFA names, even when the SOFA content has not been
 *        otherwise changed.
 *
 *     d) The routine-naming prefix "iau" shall not be used.
 *
 *     e) The origin of the SOFA components of your derived work must not
 *        be misrepresented;  you must not claim that you wrote the
 *        original software, nor file a patent application for SOFA
 *        software or algorithms embedded in the SOFA software.
 *
 *     f) These requirements must be reproduced intact in any source
 *        distribution and shall apply to anyone to whom you have granted
 *        a further right to modify the source code of your derived work.
 *
 *  4. In any published work or commercial products which includes
 *     results achieved by using the SOFA software, you shall acknowledge
 *     that the SOFA software was used in obtaining those results.
 *
 *  5. You shall not cause the SOFA software to be brought into
 *     disrepute, either by misuse, or use for inappropriate tasks, or by
 *     inappropriate modification.
 *
 *  6. The SOFA software is provided "as is" and the Board makes no
 *     warranty as to its use or performance.   The Board does not and
 *     cannot warrant the performance or results which the user may obtain
 *     by using the SOFA software.  The Board makes no warranties, express
 *     or implied, as to non-infringement of third party rights,
 *     merchantability, or fitness for any particular purpose.  In no
 *     event will the Board be liable to the user for any consequential,
 *     incidental, or special damages, including any lost profits or lost
 *     savings, even if a Board representative has been advised of such
 *     damages, or for any claim by any third party.
 *
 *  7. The provision of any version of the SOFA software under the terms
 *     and conditions specified herein does not imply that future
 *     versions will also be made available under the same terms and
 *     conditions.

 *  Correspondence concerning SOFA software should be addressed as
 *  follows:
 *
 *     Internet email: sofa@rl.ac.uk
 *     Postal address: IAU SOFA Center
 *                     Rutherford Appleton Laboratory
 *                     Chilton, Didcot, Oxon OX11 0QX
 *                     United Kingdom
 *
 *-----------------------------------------------------------------------
*/

return [rc, dc];
}