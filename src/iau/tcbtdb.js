function iauTcbtdb(tcb1, tcb2)
/*
**  - - - - - - - - - -
**   i a u T c b t d b
**  - - - - - - - - - -
**
**  Time scale transformation:  Barycentric Coordinate Time, TCB, to
**  Barycentric Dynamical Time, TDB.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  canonical.
**
**  Given:
**     tcb1,tcb2  double    TCB as a 2-part Julian Date
**
**  Returned:
**     tdb1,tdb2  double    TDB as a 2-part Julian Date
**
**  Returned (function value):
**                int       status:  0 = OK
**
**  Notes:
**
**  1) tcb1+tcb2 is Julian Date, apportioned in any convenient way
**     between the two arguments, for example where tcb1 is the Julian
**     Day Number and tcb2 is the fraction of a day.  The returned
**     tdb1,tdb2 follow suit.
**
**  2) The 2006 IAU General Assembly introduced a conventional linear
**     transformation between TDB and TCB.  This transformation
**     compensates for the drift between TCB and terrestrial time TT,
**     and keeps TDB approximately centered on TT.  Because the
**     relationship between TT and TCB depends on the adopted solar
**     system ephemeris, the degree of alignment between TDB and TT over
**     long intervals will vary according to which ephemeris is used.
**     Former definitions of TDB attempted to avoid this problem by
**     stipulating that TDB and TT should differ only by periodic
**     effects.  This is a good description of the nature of the
**     relationship but eluded precise mathematical formulation.  The
**     conventional linear relationship adopted in 2006 sidestepped
**     these difficulties whilst delivering a TDB that in practice was
**     consistent with values before that date.
**
**  3) TDB is essentially the same as Teph, the time argument for the
**     JPL solar system ephemerides.
**
**  Reference:
**
**     IAU 2006 Resolution B3
**
**  This revision:  2013 June 18
**
**  SOFA release 2016-05-03
**
**  Copyright (C) 2016 IAU SOFA Board.  See notes at end.
*/
{
   var tdb1 = 0.0;;
   var tdb2 = 0.0;;


/* 1977 Jan 1 00:00:32.184 TT, as two-part JD */
   var t77td = DJM0 + DJM77;
   var t77tf = TTMTAI/DAYSEC;

/* TDB (days) at TAI 1977 Jan 1.0 */
   var tdb0 = TDB0/DAYSEC;

   var d;


/* Result, safeguarding precision. */
   if ( tcb1 > tcb2 ) {
      d = tcb1 - t77td;
      tdb1 = tcb1;
      tdb2 = tcb2 + tdb0 - ( d + ( tcb2 - t77tf ) ) * ELB;
   } else {
      d = tcb2 - t77td;
      tdb1 = tcb1 + tdb0 - ( d + ( tcb1 - t77tf ) ) * ELB;
      tdb2 = tcb2;
   }

/* Status (always OK). */
   return [ 0, tdb1, tdb2 ];

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
}
