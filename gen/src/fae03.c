/* Generate Test Data for fae03 */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  printf("var fae03_results = [\n");
  for (t0 = 2451545.0 - 7750.0 * 100.0; t0 <= 2451545.0 + 7750.0 * 100.0; t0 += 7750.0) {


    printf("  [");
    printf("%.28e", t0);
    printf(", ");
    printf("%.28e", iauFae03(t0));
    printf("  ],\n");

  }

  printf("];\n");
}
