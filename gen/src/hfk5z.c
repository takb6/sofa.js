/* Generate Test Data for hfk5z */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  double t3;
  unsigned long long modulo = 0;
  printf("var hfk5z_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {

          double res0 = {0};
          double res1 = {0};
          double res2 = {0};
          double res3 = {0};
          modulo = modulo > 4
            ? 0 : modulo + 1;
          if (modulo != 1) continue;
          printf("  [");
          printf("%.28e", t0);
          printf(", ");
          printf("%.28e", t1);
          printf(", ");
          printf("%.28e", t2);
          printf(", ");
          printf("%.28e", t3);
          printf(", ");
          iauHfk5z(t0, t1, t2, t3, &res0, &res1, &res2, &res3);
          printf("%.28e", res0);
          printf(", ");
          printf("%.28e", res1);
          printf(", ");
          printf("%.28e", res2);
          printf(", ");
          printf("%.28e", res3);
          printf("  ],\n");

        }
      }
    }
  }

  printf("];\n");
}
