/* Generate Test Data for aper */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  printf("var aper_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {

    iauASTROM res0 = {0};
    printf("  [");
    printf("%.28e", t0);
    printf(", ");
    iauAper(t0, &res0);
    exportASTROM(res0);
    printf("  ],\n");

  }

  printf("];\n");
}
