import { HttpParameterCodec, HttpParams } from '@angular/common/http';

import forIn from 'lodash-es/forIn';
import toString from 'lodash-es/toString';

export const parseQueryParams = (
  params: any,
  encoder?: HttpParameterCodec
): HttpParams => {
  let queryParams = encoder ? new HttpParams({ encoder }) : new HttpParams();

  forIn(params, (value, key) => {
    const appendValue = toString(value);
    if (!appendValue) {
      return;
    }
    queryParams = queryParams.append(key, appendValue);
  });

  return queryParams;
};
