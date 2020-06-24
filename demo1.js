import { of, interval } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { flatMap, catchError } from 'rxjs/operators';

const data$ = fromFetch('https://api.github.com/users?per_page=5').pipe(
 flatMap(response => {
   if (response.ok) {
     // OK return data
     return response.json();
   } else {
     // Server is returning a status requiring the client to try something else.
     return of({ error: true, message: `Error ${response.status}` });
   }
 }),
 catchError(err => {
   // Network or other error, handle appropriately
   console.error(err);
   return of({ error: true, message: err.message })
 })
);

data$.subscribe({
 next: result => console.log(result),
 complete: () => console.log('done')
});